/**
 * 从GitHub Issues加载评论
 */

document.addEventListener("DOMContentLoaded", function () {
  const commentsList = document.querySelector(".comments-list");
  const commentsCount = document.querySelector(".comments-title");
  const noComments = document.querySelector(".no-comments");

  if (!commentsList) return;

  // 获取当前文章ID
  const articleId =
    document.querySelector('meta[name="article-id"]')?.content ||
    window.location.pathname.split("/").pop().replace(".html", "");

  // 从GitHub API加载评论
  fetch(
    `https://api.github.com/repos/AlexanderJ-Carter/blog-comments/issues?labels=comment,${articleId}`
  )
    .then((response) => response.json())
    .then((issues) => {
      // 更新评论数量
      if (commentsCount) {
        commentsCount.textContent = `读者评论 (${issues.length})`;
      }

      if (issues.length === 0) {
        if (noComments) {
          noComments.style.display = "block";
        }
        return;
      }

      // 清空现有示例评论
      commentsList.innerHTML = "";

      // 添加每条评论
      issues.forEach((issue) => {
        // 解析评论内容
        const bodyLines = issue.body.split("\n");
        let name = "匿名用户";
        let date = new Date(issue.created_at).toLocaleString("zh-CN");
        let commentText = issue.body;

        // 尝试从评论内容提取信息
        const nameMatch = issue.body.match(/\*\*评论者\*\*:\s*(.*)/);
        if (nameMatch && nameMatch[1]) {
          name = nameMatch[1].trim();
        }

        // 提取实际评论文本 (在分隔符"---"之后的部分)
        const separatorIndex = issue.body.indexOf("---");
        if (separatorIndex !== -1) {
          commentText = issue.body.substring(separatorIndex + 3).trim();
        }

        // 创建评论HTML
        const commentHTML = `
          <div class="comment-item">
            <img src="https://avatars.dicebear.com/api/initials/${encodeURIComponent(
              name
            )}.svg" alt="评论者头像" class="comment-avatar">
            <div class="comment-content">
              <div class="comment-author">${name}</div>
              <div class="comment-date">${date}</div>
              <div class="comment-text">${commentText}</div>
            </div>
          </div>
        `;

        commentsList.innerHTML += commentHTML;
      });
    })
    .catch((error) => {
      console.error("加载评论失败:", error);
      commentsList.innerHTML =
        '<div class="alert alert-warning">加载评论时出错，请刷新页面重试。</div>';
    });
});
