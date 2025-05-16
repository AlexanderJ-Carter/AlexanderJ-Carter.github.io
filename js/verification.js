/**
 * 验证功能相关脚本
 * 用于处理Cloudflare Turnstile人机验证
 * 严格确保每次访问受保护页面都需要验证
 */

// 设置一次性验证标记，仅对当前会话有效且即刻过期
function setVerified(key) {
    // 使用sessionStorage确保浏览器关闭后验证失效
    // 并且每个页面使用不同的验证标记
    sessionStorage.setItem(key, 'true');

    // 设置一个极短的过期时间戳，确保验证状态很快就会失效
    // 这确保了几乎每次页面重新加载都需要验证
    const expirationTime = Date.now() + 5000; // 只有5秒的有效期
    sessionStorage.setItem(key + '_expiration', expirationTime.toString());

    return true;
}

// 检查是否已经验证通过
function isVerified(key) {
    try {
        // 首先检查是否存在验证状态
        const verified = sessionStorage.getItem(key) === 'true';
        if (!verified) return false;

        // 检查是否过期
        const expirationTime = parseInt(
            sessionStorage.getItem(key + '_expiration') || '0'
        );
        const now = Date.now();

        // 如果验证已过期，立即清除并返回false
        if (now > expirationTime) {
            clearVerification(key);
            return false;
        }

        // 即使验证有效，也立即清除它以确保下次访问必须重新验证
        // 这是双重保险
        clearVerification(key);

        return true;
    } catch (e) {
        console.error('验证状态检查失败:', e);
        return false;
    }
}

// 清除验证状态
function clearVerification(key) {
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(key + '_expiration');
}

// 提交验证token到服务器的函数 (示例)
function verifyTokenWithServer(token, callback) {
    // 实际应用中，应该发送到自己的后端进行验证
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/verify-turnstile', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    callback(response.success, response.message);
                } catch (e) {
                    callback(false, '验证响应解析失败');
                }
            } else {
                callback(false, '验证请求失败');
            }
        }
    };
    xhr.send(JSON.stringify({ token: token }));
}
