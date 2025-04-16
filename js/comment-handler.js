/**
 * 处理博客评论提交
 */

document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.querySelector(".comment-form");

  if (commentForm) {
    // 页面加载时恢复保存的用户信息
    const savedName = localStorage.getItem("comment_name");
    const savedEmail = localStorage.getItem("comment_email");

    if (savedName) {
      const nameInput = commentForm.querySelector('input[name="name"]');
      if (nameInput) nameInput.value = savedName;
    }

    if (savedEmail) {
      const emailInput = commentForm.querySelector('input[name="email"]');
      if (emailInput) emailInput.value = savedEmail;
    }

    if (savedName || savedEmail) {
      const saveCheckbox = commentForm.querySelector("#saveInfo");
      if (saveCheckbox) saveCheckbox.checked = true;
    }

    // 设置文章ID
    const articleId =
      document.querySelector('meta[name="article-id"]')?.content ||
      window.location.pathname.split("/").pop().replace(".html", "");

    const articleIdInput = commentForm.querySelector('input[name="articleId"]');
    if (articleIdInput) {
      articleIdInput.value = articleId;
    }

    // 设置表单主题
    const subjectInput = commentForm.querySelector('input[name="_subject"]');
    if (subjectInput) {
      subjectInput.value = `博客评论: ${articleId}`;
    }

    // 设置重定向URL
    const redirectInput = commentForm.querySelector('input[name="_next"]');
    if (redirectInput) {
      redirectInput.value = window.location.href;
    }

    // 使用原生表单提交方式，不使用JavaScript拦截
    // 添加表单提交前处理
    commentForm.addEventListener("submit", function (e) {
      // 允许表单继续提交，但保存用户信息
      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const saveCheckbox = this.querySelector("#saveInfo");

      if (nameInput && emailInput && saveCheckbox) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const saveInfo = saveCheckbox.checked;

        if (saveInfo) {
          localStorage.setItem("comment_name", name);
          localStorage.setItem("comment_email", email);
        } else {
          localStorage.removeItem("comment_name");
          localStorage.removeItem("comment_email");
        }
      }

      // 禁用按钮防止重复提交
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> 提交中...';
      }
    });
  }
});
