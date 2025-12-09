---
title: 利用 Pandoc 实现文件转换
date: 2025-11-10 15:13:50
---

在开发时经常会遇到文件导出为另外一个格式的需求，如将 HTML 导出为 WORD。 [pandoc](https://github.com/jgm/pandoc) 是一个通用的用于转换文件格式的命令行工具，很好用。

---

```typescript
app.get('/export/word/:id', async (req, res) => {
  try {
    const html = await getHTML(req.params.id as string);

    const tmpFileName = `file_${new Date().getTime()}.docx`;
    execSync(`rm -rf /tmp/${tmpFileName} || true`);
    execSync(`pandoc -f html -t docx -o /tmp/${tmpFileName}`, {
      input: html
    });

    res.on('finish', () => {
      execSync(`rm -rf /tmp/${tmpFileName}`);
    });

    res.setHeader('Content-Type', 'application/msword');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${tmpFileName}"`
    );
    res.sendFile(`/tmp/${tmpFileName}`);
  } catch (error) {
    console.error('导出 Word 失败:', error);
    res.status(500).json({ error });
  }
});
```
