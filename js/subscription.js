/**
 * 使用GitHub Issues处理邮件订阅
 */

document.addEventListener("DOMContentLoaded", function () {
  const subscriptionForm = document.querySelector(".subscription-form");

  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email) {
        // 禁用提交按钮，防止重复提交
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = "处理中...";

        // 构建表单数据
        const formData = new FormData();
        formData.append("issue[title]", `订阅请求: ${email}`);
        formData.append(
          "issue[body]",
          `
**邮箱**: ${email}
**日期**: ${new Date().toLocaleString("zh-CN")}
**来源**: ${window.location.href}
        `
        );
        formData.append("issue[labels][]", "subscription");

        // 发送到GitHub表单处理
        fetch("https://github.com/Alex-hwang/blog-comments/issues/new", {
          method: "POST",
          body: formData,
        })
          .then(() => {
            alert("感谢您的订阅！我们会定期发送最新内容到您的邮箱。");
            emailInput.value = "";
          })
          .catch((error) => {
            console.error("订阅时出错:", error);
            alert(
              "订阅失败，请稍后再试。或直接前往 GitHub 提交 Issue: https://github.com/Alex-hwang/blog-comments/issues/new"
            );
          })
          .finally(() => {
            // 恢复提交按钮状态
            submitButton.disabled = false;
            submitButton.innerHTML = "订阅";
          });
      }
    });
  }
});
