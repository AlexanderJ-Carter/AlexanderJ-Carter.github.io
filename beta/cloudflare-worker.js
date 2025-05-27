// Cloudflare Worker - Beta用户认证系统
// 部署到 Cloudflare Workers，绑定KV命名空间为 BETA_USERS

export default {
  async fetch(request, env, ctx) {
    // 允许跨域请求
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // 路由处理
      switch (path) {
        case '/api/register':
          return await handleRegister(request, env, corsHeaders);
        case '/api/login':
          return await handleLogin(request, env, corsHeaders);
        case '/api/verify':
          return await handleVerify(request, env, corsHeaders);
        case '/api/users':
          return await handleGetUsers(request, env, corsHeaders);
        default:
          return new Response('Not Found', { 
            status: 404, 
            headers: corsHeaders 
          });
      }
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }
  }
};

// 注册用户
async function handleRegister(request, env, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  const data = await request.json();
  const { username, password, email, inviteCode } = data;
  // 验证邀请码（可选的安全措施）
  const validInviteCodes = ['beta2025', 'BETA2025', 'ALEXANDER', 'GITHUB'];
  if (inviteCode && !validInviteCodes.includes(inviteCode)) {
    return new Response(JSON.stringify({
      success: false,
      error: '无效的邀请码'
    }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  // 验证输入
  if (!username || !password || username.length < 3 || password.length < 6) {
    return new Response(JSON.stringify({
      success: false,
      error: '用户名至少3位，密码至少6位'
    }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  // 检查用户是否已存在
  const existingUser = await env.BETA_USERS.get(`user:${username}`);
  if (existingUser) {
    return new Response(JSON.stringify({
      success: false,
      error: '用户名已存在'
    }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  // 哈希密码
  const hashedPassword = await hashPassword(password);

  // 创建用户
  const user = {
    username,
    password: hashedPassword,
    email: email || '',
    createdAt: new Date().toISOString(),
    isActive: true,
    role: 'beta_user'
  };

  // 存储用户
  await env.BETA_USERS.put(`user:${username}`, JSON.stringify(user));

  // 生成访问令牌
  const token = await generateToken(username);

  return new Response(JSON.stringify({
    success: true,
    message: '注册成功',
    token,
    user: {
      username: user.username,
      email: user.email,
      role: user.role
    }
  }), {
    headers: { 
      'Content-Type': 'application/json',
      ...corsHeaders 
    }
  });
}

// 用户登录
async function handleLogin(request, env, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  const data = await request.json();
  const { username, password } = data;

  if (!username || !password) {
    return new Response(JSON.stringify({
      success: false,
      error: '请输入用户名和密码'
    }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  // 获取用户
  const userStr = await env.BETA_USERS.get(`user:${username}`);
  if (!userStr) {
    return new Response(JSON.stringify({
      success: false,
      error: '用户名或密码错误'
    }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  const user = JSON.parse(userStr);

  // 验证密码
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return new Response(JSON.stringify({
      success: false,
      error: '用户名或密码错误'
    }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  // 检查用户状态
  if (!user.isActive) {
    return new Response(JSON.stringify({
      success: false,
      error: '账户已被禁用'
    }), {
      status: 403,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  // 生成访问令牌
  const token = await generateToken(username);

  // 更新最后登录时间
  user.lastLogin = new Date().toISOString();
  await env.BETA_USERS.put(`user:${username}`, JSON.stringify(user));

  return new Response(JSON.stringify({
    success: true,
    message: '登录成功',
    token,
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin
    }
  }), {
    headers: { 
      'Content-Type': 'application/json',
      ...corsHeaders 
    }
  });
}

// 验证令牌
async function handleVerify(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({
      success: false,
      error: '未提供有效的授权令牌'
    }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  const token = authHeader.substring(7);
  const username = await verifyToken(token);

  if (!username) {
    return new Response(JSON.stringify({
      success: false,
      error: '令牌无效或已过期'
    }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  // 获取用户信息
  const userStr = await env.BETA_USERS.get(`user:${username}`);
  if (!userStr) {
    return new Response(JSON.stringify({
      success: false,
      error: '用户不存在'
    }), {
      status: 404,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }

  const user = JSON.parse(userStr);

  return new Response(JSON.stringify({
    success: true,
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin
    }
  }), {
    headers: { 
      'Content-Type': 'application/json',
      ...corsHeaders 
    }
  });
}

// 获取用户列表（管理员功能）
async function handleGetUsers(request, env, corsHeaders) {
  // 这里可以添加管理员权限检查
  
  const { keys } = await env.BETA_USERS.list({ prefix: 'user:' });
  const users = [];

  for (const key of keys) {
    const userStr = await env.BETA_USERS.get(key.name);
    if (userStr) {
      const user = JSON.parse(userStr);
      users.push({
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        isActive: user.isActive,
        role: user.role
      });
    }
  }

  return new Response(JSON.stringify({
    success: true,
    users,
    total: users.length
  }), {
    headers: { 
      'Content-Type': 'application/json',
      ...corsHeaders 
    }
  });
}

// 密码哈希函数
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'beta_salt_2025');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 密码验证函数
async function verifyPassword(password, hashedPassword) {
  const hash = await hashPassword(password);
  return hash === hashedPassword;
}

// 生成JWT令牌
async function generateToken(username) {
  const payload = {
    username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24小时过期
  };

  const secret = 'beta_jwt_secret_2025'; // 在实际部署中应该使用环境变量
  const header = { alg: 'HS256', typ: 'JWT' };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = await signHMAC(`${encodedHeader}.${encodedPayload}`, secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// 验证JWT令牌
async function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const secret = 'beta_jwt_secret_2025';

    // 验证签名
    const expectedSignature = await signHMAC(`${header}.${payload}`, secret);
    if (signature !== expectedSignature) return null;

    // 解析载荷
    const decodedPayload = JSON.parse(atob(payload));

    // 检查过期时间
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) return null;

    return decodedPayload.username;
  } catch (error) {
    return null;
  }
}

// HMAC签名函数
async function signHMAC(data, secret) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
