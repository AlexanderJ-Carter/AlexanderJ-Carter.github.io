/**
 * 处理博客评论表单提交
 */

document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.querySelector(".comment-form");

  if (commentForm) {
    // 页面加载时，从localStorage恢复保存的用户信息
    const savedName = localStorage.getItem("comment_name");
    const savedEmail = localStorage.getItem("comment_email");

    if (savedName) {
      commentForm.querySelector('input[type="text"]').value = savedName;
    }

    if (savedEmail) {
      commentForm.querySelector('input[type="email"]').value = savedEmail;
    }

    if (savedName || savedEmail) {
      commentForm.querySelector("#saveInfo").checked = true;
    }

    // 表单提交处理
    commentForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // 获取表单数据
      const commentText = this.querySelector("textarea").value.trim();
      const name = this.querySelector('input[type="text"]').value.trim();
      const email = this.querySelector('input[type="email"]').value.trim();
      const saveInfo = this.querySelector("#saveInfo").checked;

      // 获取当前文章ID
      const articleId =
        document.querySelector('meta[name="article-id"]')?.content ||
        window.location.pathname.split("/").pop().replace(".html", "");

      if (!commentText || !name || !email) {
        alert("请填写所有必填字段");
        return;
      }

      // 禁用提交按钮
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = "提交中...";

      try {
        // 提交评论到自定义API端点
        const response = await fetch(
          "https://formspree.io/f/your-formspree-id",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              article_id: articleId,
              name: name,
              email: email,
              comment: commentText,
              _subject: `博客评论: ${articleId}`,
            }),
          }
        );

        if (response.ok) {
          // 保存用户信息(如果选择了保存)
          if (saveInfo) {
            localStorage.setItem("comment_name", name);
            localStorage.setItem("comment_email", email);
          } else {
            localStorage.removeItem("comment_name");
            localStorage.removeItem("comment_email");
          }

          // 显示成功消息
          const successMessage = this.querySelector(".comment-success-message");
          if (successMessage) {
            successMessage.classList.remove("d-none");
            // 5秒后隐藏成功消息
            setTimeout(() => {
              successMessage.classList.add("d-none");
            }, 5000);
          } else {
            alert("感谢您的评论！我们会在审核后显示您的评论。");
          }

          // 重置表单
          this.reset();

          // 恢复保存的信息(如果需要)
          if (saveInfo) {
            this.querySelector('input[type="text"]').value = name;
            this.querySelector('input[type="email"]').value = email;
            this.querySelector("#saveInfo").checked = true;
          }
        } else {
          throw new Error("提交表单失败");
        }
      } catch (error) {
        console.error("评论提交错误:", error);
        alert(
          "提交评论失败，请稍后再试。您也可以通过电子邮件联系我们提交评论。"
        );
      } finally {
        // 恢复提交按钮
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
});
