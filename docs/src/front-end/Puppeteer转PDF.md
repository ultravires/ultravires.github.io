---
title: 利用 Puppeteer 实现 HTML 转 PDF
date: 2025-10-09 15:13:50
---

Puppeteer 可以实现服务端渲染 HTML 并将其转为 PDF。

---

::: code-group

```typescript [index.ts]
import express from 'express';
import { html2pdf } from '@/handlers/html2pdf.js';

const app = express();
const port = process.env.PORT || 9010;

app.get('/export/pdf/:id', async (req, res) => {
  try {
    // html 数据可以是接口请求传递的内容
    // 也可以是通过接口查询出来的数据
    // 也可以是服务端渲染后的 HTML
    const html = '<html><body><h1>Hello, World!</h1></body></html>';

    const buffer = await html2pdf(html);

    // 返回PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', buffer.length);
    if (!!req.query.download) {
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="document.pdf"'
      );
    } else {
      res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
    }
    res.send(buffer);
  } catch (error) {
    console.error('导出失败:', error);
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`服务运行在端口 ${port}`);
});
```

```typescript [html2pdf.ts]
import puppeteer from 'puppeteer';
import { setTimeout } from 'node:timers/promises';
import { PDF_CONFIG } from '@/shared/config.js';

/**
 * HTML转PDF处理器
 * @param html - 要转换的 HTML 内容
 * @returns 生成的 PDF buffer
 */
export const html2pdf = async (html: string): Promise<Buffer> => {
  // 使用Puppeteer生成PDF
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(processedHtml, {
    waitUntil: 'networkidle0'
  });
  await setTimeout(1000); // 等待布局稳定

  const pdfBuffer = await page.pdf(PDF_CONFIG);
  await browser.close();

  return Buffer.from(pdfBuffer);
};
```

```typescript [config.ts]
import type { PDFOptions } from 'puppeteer';

export const PDF_CONFIG: PDFOptions = {
  format: 'A4',
  printBackground: true,
  margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
};
```

:::
