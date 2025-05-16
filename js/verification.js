/**
 * 验证功能相关脚本
 * 用于处理Cloudflare Turnstile人机验证
 * 每次访问受保护页面都需要验证
 */

// 设置一次性验证标记，仅对当前会话有效
function setVerified(key) {
    // 使用sessionStorage确保浏览器关闭后验证失效
    // 并且每个页面使用不同的验证标记
    sessionStorage.setItem(key, 'true');
    return true;
}

// 检查是否已经验证通过
function isVerified(key) {
    try {
        // 获取验证状态并立即删除，确保每次都需要验证
        const verified = sessionStorage.getItem(key) === 'true';
        sessionStorage.removeItem(key); // 立即删除验证状态
        return verified;
    } catch (e) {
        console.error('验证状态检查失败:', e);
        return false;
    }
}

// 清除验证状态
function clearVerification(key) {
    sessionStorage.removeItem(key);
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
