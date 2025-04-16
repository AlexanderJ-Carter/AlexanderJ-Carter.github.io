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
      commentForm.querySelector('input[name="name"]').value = savedName;
    }

    if (savedEmail) {
      commentForm.querySelector('input[name="email"]').value = savedEmail;
    }

    if (savedName || savedEmail) {
      commentForm.querySelector("#saveInfo").checked = true;
    }

    // 设置文章ID
    const articleId =
      document.querySelector('meta[name="article-id"]')?.content ||
      window.location.pathname.split("/").pop().replace(".html", "");

    const articleIdInput = commentForm.querySelector('input[name="articleId"]');
    if (articleIdInput) {
      articleIdInput.value = articleId;
    }

    // 设置重定向URL
    const redirectInput = commentForm.querySelector('input[name="_next"]');
    if (redirectInput) {
      redirectInput.value = window.location.href;
    }

    // 添加表单提交处理
    commentForm.addEventListener("submit", function (e) {
      // 允许表单正常提交到Formspree

      const name = commentForm.querySelector('input[name="name"]').value.trim();
      const email = commentForm
        .querySelector('input[name="email"]')
        .value.trim();
      const saveInfo = this.querySelector("#saveInfo")?.checked;

      if (saveInfo) {
        localStorage.setItem("comment_name", name);
        localStorage.setItem("comment_email", email);
      } else {
        localStorage.removeItem("comment_name");
        localStorage.removeItem("comment_email");
      }
    });
  }
});
