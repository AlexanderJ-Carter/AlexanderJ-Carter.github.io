/**
 * 用于将Formspree收到的评论同步到GitHub Issues
 * 可以设置为Formspree的Webhook或定期手动运行
 */

// 注意：这个文件不需要部署到网站上，仅作为参考或本地使用

async function syncCommentsToGitHub() {
  // 从Formspree导出的评论数据
  const comments = [
    /* 这里会是你从Formspree导出的评论数据 */
  ];

  for (const comment of comments) {
    try {
      // 使用GitHub API创建issues
      const response = await fetch(
        "https://api.github.com/repos/Alex-hwang/blog-comments/issues",
        {
          method: "POST",
          headers: {
            Authorization: "token YOUR_GITHUB_TOKEN",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: `Comment on ${comment.articleId} by ${comment.name}`,
            body: `
**评论者**: ${comment.name}
**电子邮件**: ${comment.email}
**文章**: ${comment.articleId}
**日期**: ${new Date().toLocaleString("zh-CN")}

---

${comment.comment}
            `,
            labels: ["comment", comment.articleId],
          }),
        }
      );

      if (response.ok) {
        console.log(
          `成功创建评论issue: ${comment.name} on ${comment.articleId}`
        );
      } else {
        console.error(`创建issue失败: ${await response.text()}`);
      }
    } catch (error) {
      console.error(`处理评论时出错: ${error.message}`);
    }
  }
}

// 如果直接运行此脚本，则执行同步
if (require.main === module) {
  syncCommentsToGitHub().catch(console.error);
}
