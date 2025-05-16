/**
 * 验证功能相关脚本
 * 用于处理Cloudflare Turnstile人机验证
 */

// 设置验证通过标记
function setVerified(key) {
    // 使用localStorage存储验证状态
    // 设置两小时的有效期
    const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 2小时
    const data = {
        verified: true,
        expiration: expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(data));
    return true;
}

// 检查是否已经验证通过
function isVerified(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        if (!data) return false;

        // 检查验证状态和过期时间
        if (data.verified && data.expiration > Date.now()) {
            return true;
        } else {
            // 如果已过期，清除过期的验证状态
            localStorage.removeItem(key);
            return false;
        }
    } catch (e) {
        console.error('验证状态检查失败:', e);
        return false;
    }
}

// 清除验证状态
function clearVerification(key) {
    localStorage.removeItem(key);
}

// 提交验证token到服务器的函数
// 注意：这需要服务器端支持，这里仅作为示例
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
