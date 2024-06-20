// docs/.vitepress/config.ts
import { defineConfig as defineConfig2 } from "file:///E:/workspace/ultravires.github.io/node_modules/.pnpm/vitepress@1.1.4_@types+node@20.14.6_markdown-it-mathjax3@4.3.2_postcss@8.4.38_search-insights@2.14.0_typescript@5.4.5/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/genFeed.ts
import path from "node:path";
import { writeFileSync } from "node:fs";
import { Feed } from "file:///E:/workspace/ultravires.github.io/node_modules/.pnpm/feed@4.2.2/node_modules/feed/lib/feed.js";
import { createContentLoader } from "file:///E:/workspace/ultravires.github.io/node_modules/.pnpm/vitepress@1.1.4_@types+node@20.14.6_markdown-it-mathjax3@4.3.2_postcss@8.4.38_search-insights@2.14.0_typescript@5.4.5/node_modules/vitepress/dist/node/index.js";
var baseUrl = `https://ultravires.github.io`;
async function genFeed(config) {
  const feed = new Feed({
    title: "The Vue Point",
    description: "The official blog for the Vue.js project",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    image: "https://ultravires.github.io/images/logo.png",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: "Copyright (c) 2021-present, \u5411\u6210\u6E1D and blog contributors"
  });
  const posts = await createContentLoader("posts/*.md", {
    excerpt: true,
    render: true
  }).load();
  posts.sort(
    (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  );
  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html?.replaceAll("&ZeroWidthSpace;", ""),
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.twitter ? `https://twitter.com/${frontmatter.twitter}` : void 0
        }
      ],
      date: frontmatter.date
    });
  }
  writeFileSync(path.join(config.outDir, "feed.rss"), feed.rss2());
}

// docs/.vitepress/config/zh.ts
import { defineConfig } from "file:///E:/workspace/ultravires.github.io/node_modules/.pnpm/vitepress@1.1.4_@types+node@20.14.6_markdown-it-mathjax3@4.3.2_postcss@8.4.38_search-insights@2.14.0_typescript@5.4.5/node_modules/vitepress/dist/node/index.js";
import { transformerTwoslash } from "file:///E:/workspace/ultravires.github.io/node_modules/.pnpm/@shikijs+vitepress-twoslash@1.7.0_typescript@5.4.5/node_modules/@shikijs/vitepress-twoslash/dist/index.mjs";
var zh = defineConfig({
  lang: "zh-Hans",
  title: "\u5411\u6210\u6E1D | \u4E13\u6CE8\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F",
  description: "\u5411\u6210\u6E1D\u7684\u4E2A\u4EBA\u535A\u5BA2",
  themeConfig: {
    siteTitle: "\u6D45\u5B89\u3002",
    avatar: "/minion.png",
    nav: nav(),
    footer: {
      message: "\u57FA\u4E8E MIT \u8BB8\u53EF\u53D1\u5E03",
      copyright: `\u7248\u6743\u6240\u6709 &copy; 2024-${(/* @__PURE__ */ new Date()).getFullYear()} \u5411\u6210\u6E1D`
    },
    outline: "deep",
    aside: "left",
    search: {
      provider: "algolia",
      options: {
        appId: "AKWVEI7J63",
        indexName: "ultravires.github.io",
        apiKey: "7a14faa733a46057d98726e018afe153",
        locales: {
          zh: {
            placeholder: "\u641C\u7D22\u6587\u6863",
            translations: {
              button: {
                buttonText: "\u641C\u7D22\u6587\u6863",
                buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  resetButtonAriaLabel: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  cancelButtonText: "\u53D6\u6D88",
                  cancelButtonAriaLabel: "\u53D6\u6D88"
                },
                startScreen: {
                  recentSearchesTitle: "\u641C\u7D22\u5386\u53F2",
                  noRecentSearchesText: "\u6CA1\u6709\u641C\u7D22\u5386\u53F2",
                  saveRecentSearchButtonTitle: "\u4FDD\u5B58\u81F3\u641C\u7D22\u5386\u53F2",
                  removeRecentSearchButtonTitle: "\u4ECE\u641C\u7D22\u5386\u53F2\u4E2D\u79FB\u9664",
                  favoriteSearchesTitle: "\u6536\u85CF",
                  removeFavoriteSearchButtonTitle: "\u4ECE\u6536\u85CF\u4E2D\u79FB\u9664"
                },
                errorScreen: {
                  titleText: "\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C",
                  helpText: "\u4F60\u53EF\u80FD\u9700\u8981\u68C0\u67E5\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5"
                },
                footer: {
                  selectText: "\u9009\u62E9",
                  navigateText: "\u5207\u6362",
                  closeText: "\u5173\u95ED",
                  searchByText: "\u641C\u7D22\u63D0\u4F9B\u8005"
                },
                noResultsScreen: {
                  noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                  suggestedQueryText: "\u4F60\u53EF\u4EE5\u5C1D\u8BD5\u67E5\u8BE2",
                  reportMissingResultsText: "\u4F60\u8BA4\u4E3A\u8BE5\u67E5\u8BE2\u5E94\u8BE5\u6709\u7ED3\u679C\uFF1F",
                  reportMissingResultsLinkText: "\u70B9\u51FB\u53CD\u9988"
                }
              }
            }
          }
        }
      }
    }
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    theme: {
      light: "github-light-default",
      dark: "github-dark-default"
    },
    lineNumbers: false,
    math: true,
    // require `markdown-it-mathjax3`
    image: {
      lazyLoading: false
    },
    container: {
      tipLabel: "\u63D0\u793A",
      warningLabel: "\u8B66\u544A",
      dangerLabel: "\u5371\u9669",
      infoLabel: "\u4FE1\u606F",
      detailsLabel: "\u8BE6\u7EC6\u4FE1\u606F"
    }
  }
});
function nav() {
  return [
    {
      text: "\u53CB\u94FE",
      link: "/link/",
      activeMatch: `^/link/`
    },
    {
      text: "\u4E13\u680F",
      activeMatch: `^/(life|algorithm|front-end|back-end|ai)/`,
      items: [
        {
          text: "\u7A0B\u5E8F\u4EBA\u751F",
          link: "/life/",
          activeMatch: `^/life/`
        },
        {
          text: "\u7B97\u6CD5\u9898\u89E3",
          link: "/algorithm/",
          activeMatch: `^/algorithm/`
        },
        {
          text: "\u524D\u7AEF\u9886\u57DF",
          link: "/front-end/",
          activeMatch: `^/front-end/`
        },
        {
          text: "\u540E\u7AEF\u9886\u57DF",
          link: "/back-end/",
          activeMatch: `^/back-end/`
        },
        {
          text: "\u4EBA\u5DE5\u667A\u80FD",
          link: "/ai/",
          activeMatch: `^/ai/`
        }
      ]
    },
    {
      text: "\u5173\u4E8E",
      link: "/about/",
      activeMatch: "/about/"
    }
  ];
}

// docs/.vitepress/config.ts
var config_default = defineConfig2({
  title: zh.title,
  description: zh.description,
  srcDir: "src",
  cleanUrls: true,
  buildEnd: genFeed,
  markdown: zh.markdown,
  themeConfig: zh.themeConfig,
  head: [
    ["meta", { name: "author", content: "\u5411\u6210\u6E1D" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" }],
    ["link", { rel: "preconnect", href: "https://AKWVEI7J63-dsn.algolia.net", crossorigin: "" }]
  ],
  vite: {
    define: {
      // 启用生产环境构建下激活不匹配的详细警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy50cyIsICJkb2NzLy52aXRlcHJlc3MvZ2VuRmVlZC50cyIsICJkb2NzLy52aXRlcHJlc3MvY29uZmlnL3poLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcd29ya3NwYWNlXFxcXHVsdHJhdmlyZXMuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcd29ya3NwYWNlXFxcXHVsdHJhdmlyZXMuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3dvcmtzcGFjZS91bHRyYXZpcmVzLmdpdGh1Yi5pby9kb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcclxuaW1wb3J0IHsgZ2VuRmVlZCB9IGZyb20gJy4vZ2VuRmVlZC5qcyc7XHJcbmltcG9ydCB7IHpoIH0gZnJvbSAnLi9jb25maWcvemguanMnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlcHJlc3MudnVlanMub3JnL2NvbmZpZy9hcHAtY29uZmlnc1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHRpdGxlOiB6aC50aXRsZSxcclxuICBkZXNjcmlwdGlvbjogemguZGVzY3JpcHRpb24sXHJcbiAgc3JjRGlyOiAnc3JjJyxcclxuICBjbGVhblVybHM6IHRydWUsXHJcbiAgYnVpbGRFbmQ6IGdlbkZlZWQsXHJcbiAgbWFya2Rvd246IHpoLm1hcmtkb3duLFxyXG4gIHRoZW1lQ29uZmlnOiB6aC50aGVtZUNvbmZpZyxcclxuICBoZWFkOiBbXHJcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICdhdXRob3InLCBjb250ZW50OiAnXHU1NDExXHU2MjEwXHU2RTFEJyB9XSxcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ3ZpZXdwb3J0JywgY29udGVudDogJ3dpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wLCB1c2VyLXNjYWxhYmxlPTAnIH1dLFxyXG4gICAgWydsaW5rJywgeyByZWw6ICdwcmVjb25uZWN0JywgaHJlZjogJ2h0dHBzOi8vQUtXVkVJN0o2My1kc24uYWxnb2xpYS5uZXQnLCBjcm9zc29yaWdpbjogJycgfV1cclxuICBdLFxyXG4gIHZpdGU6IHtcclxuICAgIGRlZmluZToge1xyXG4gICAgICAvLyBcdTU0MkZcdTc1MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTY3ODRcdTVFRkFcdTRFMEJcdTZGQzBcdTZEM0JcdTRFMERcdTUzMzlcdTkxNERcdTc2ODRcdThCRTZcdTdFQzZcdThCNjZcdTU0NEFcclxuICAgICAgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fOiAndHJ1ZSdcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZVxcXFx1bHRyYXZpcmVzLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZVxcXFx1bHRyYXZpcmVzLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcZ2VuRmVlZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29ya3NwYWNlL3VsdHJhdmlyZXMuZ2l0aHViLmlvL2RvY3MvLnZpdGVwcmVzcy9nZW5GZWVkLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcclxuaW1wb3J0IHsgd3JpdGVGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xyXG5pbXBvcnQgeyBGZWVkIH0gZnJvbSAnZmVlZCc7XHJcbmltcG9ydCB7IGNyZWF0ZUNvbnRlbnRMb2FkZXIsIHR5cGUgU2l0ZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XHJcblxyXG5jb25zdCBiYXNlVXJsID0gYGh0dHBzOi8vdWx0cmF2aXJlcy5naXRodWIuaW9gO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbkZlZWQoY29uZmlnOiBTaXRlQ29uZmlnKSB7XHJcbiAgY29uc3QgZmVlZCA9IG5ldyBGZWVkKHtcclxuICAgIHRpdGxlOiAnVGhlIFZ1ZSBQb2ludCcsXHJcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSBvZmZpY2lhbCBibG9nIGZvciB0aGUgVnVlLmpzIHByb2plY3QnLFxyXG4gICAgaWQ6IGJhc2VVcmwsXHJcbiAgICBsaW5rOiBiYXNlVXJsLFxyXG4gICAgbGFuZ3VhZ2U6ICdlbicsXHJcbiAgICBpbWFnZTogJ2h0dHBzOi8vdWx0cmF2aXJlcy5naXRodWIuaW8vaW1hZ2VzL2xvZ28ucG5nJyxcclxuICAgIGZhdmljb246IGAke2Jhc2VVcmx9L2Zhdmljb24uaWNvYCxcclxuICAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCAoYykgMjAyMS1wcmVzZW50LCBcdTU0MTFcdTYyMTBcdTZFMUQgYW5kIGJsb2cgY29udHJpYnV0b3JzJyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcG9zdHMgPSBhd2FpdCBjcmVhdGVDb250ZW50TG9hZGVyKCdwb3N0cy8qLm1kJywge1xyXG4gICAgZXhjZXJwdDogdHJ1ZSxcclxuICAgIHJlbmRlcjogdHJ1ZSxcclxuICB9KS5sb2FkKCk7XHJcblxyXG4gIHBvc3RzLnNvcnQoXHJcbiAgICAoYSwgYikgPT5cclxuICAgICAgK25ldyBEYXRlKGIuZnJvbnRtYXR0ZXIuZGF0ZSBhcyBzdHJpbmcpIC1cclxuICAgICAgK25ldyBEYXRlKGEuZnJvbnRtYXR0ZXIuZGF0ZSBhcyBzdHJpbmcpXHJcbiAgKTtcclxuXHJcbiAgZm9yIChjb25zdCB7IHVybCwgZXhjZXJwdCwgZnJvbnRtYXR0ZXIsIGh0bWwgfSBvZiBwb3N0cykge1xyXG4gICAgZmVlZC5hZGRJdGVtKHtcclxuICAgICAgdGl0bGU6IGZyb250bWF0dGVyLnRpdGxlLFxyXG4gICAgICBpZDogYCR7YmFzZVVybH0ke3VybH1gLFxyXG4gICAgICBsaW5rOiBgJHtiYXNlVXJsfSR7dXJsfWAsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBleGNlcnB0LFxyXG4gICAgICBjb250ZW50OiBodG1sPy5yZXBsYWNlQWxsKCcmWmVyb1dpZHRoU3BhY2U7JywgJycpLFxyXG4gICAgICBhdXRob3I6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBmcm9udG1hdHRlci5hdXRob3IsXHJcbiAgICAgICAgICBsaW5rOiBmcm9udG1hdHRlci50d2l0dGVyXHJcbiAgICAgICAgICAgID8gYGh0dHBzOi8vdHdpdHRlci5jb20vJHtmcm9udG1hdHRlci50d2l0dGVyfWBcclxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgZGF0ZTogZnJvbnRtYXR0ZXIuZGF0ZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVGaWxlU3luYyhwYXRoLmpvaW4oY29uZmlnLm91dERpciwgJ2ZlZWQucnNzJyksIGZlZWQucnNzMigpKTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZVxcXFx1bHRyYXZpcmVzLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx3b3Jrc3BhY2VcXFxcdWx0cmF2aXJlcy5naXRodWIuaW9cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFx6aC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29ya3NwYWNlL3VsdHJhdmlyZXMuZ2l0aHViLmlvL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvemgudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgRGVmYXVsdFRoZW1lIH0gZnJvbSAndml0ZXByZXNzJztcclxuaW1wb3J0IHsgdHJhbnNmb3JtZXJUd29zbGFzaCB9IGZyb20gJ0BzaGlraWpzL3ZpdGVwcmVzcy10d29zbGFzaCc7XHJcblxyXG5leHBvcnQgY29uc3QgemggPSBkZWZpbmVDb25maWcoe1xyXG4gIGxhbmc6ICd6aC1IYW5zJyxcclxuICB0aXRsZTogJ1x1NTQxMVx1NjIxMFx1NkUxRCB8IFx1NEUxM1x1NkNFOFx1OEJBMVx1N0I5N1x1NjczQVx1NzlEMVx1NUI2Nlx1NEUwRVx1NjI4MFx1NjcyRicsXHJcbiAgZGVzY3JpcHRpb246ICdcdTU0MTFcdTYyMTBcdTZFMURcdTc2ODRcdTRFMkFcdTRFQkFcdTUzNUFcdTVCQTInLFxyXG5cclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgc2l0ZVRpdGxlOiAnXHU2RDQ1XHU1Qjg5XHUzMDAyJyxcclxuICAgIGF2YXRhcjogJy9taW5pb24ucG5nJyxcclxuICAgIG5hdjogbmF2KCksXHJcbiAgICBmb290ZXI6IHtcclxuICAgICAgbWVzc2FnZTogJ1x1NTdGQVx1NEU4RSBNSVQgXHU4QkI4XHU1M0VGXHU1M0QxXHU1RTAzJyxcclxuICAgICAgY29weXJpZ2h0OiBgXHU3MjQ4XHU2NzQzXHU2MjQwXHU2NzA5ICZjb3B5OyAyMDI0LSR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBcdTU0MTFcdTYyMTBcdTZFMURgLFxyXG4gICAgfSxcclxuICAgIG91dGxpbmU6ICdkZWVwJyxcclxuICAgIGFzaWRlOiAnbGVmdCcsXHJcbiAgICBzZWFyY2g6IHtcclxuICAgICAgcHJvdmlkZXI6ICdhbGdvbGlhJyxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGFwcElkOiAnQUtXVkVJN0o2MycsXHJcbiAgICAgICAgaW5kZXhOYW1lOiAndWx0cmF2aXJlcy5naXRodWIuaW8nLFxyXG4gICAgICAgIGFwaUtleTogJzdhMTRmYWE3MzNhNDYwNTdkOTg3MjZlMDE4YWZlMTUzJyxcclxuICAgICAgICBsb2NhbGVzOiB7XHJcbiAgICAgICAgICB6aDoge1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uczoge1xyXG4gICAgICAgICAgICAgIGJ1dHRvbjoge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uVGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXHJcbiAgICAgICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbW9kYWw6IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaEJveDoge1xyXG4gICAgICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcclxuICAgICAgICAgICAgICAgICAgcmVzZXRCdXR0b25BcmlhTGFiZWw6ICdcdTZFMDVcdTk2NjRcdTY3RTVcdThCRTJcdTY3NjFcdTRFRjYnLFxyXG4gICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnXHU1M0Q2XHU2RDg4JyxcclxuICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnXHU1M0Q2XHU2RDg4JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdGFydFNjcmVlbjoge1xyXG4gICAgICAgICAgICAgICAgICByZWNlbnRTZWFyY2hlc1RpdGxlOiAnXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyJyxcclxuICAgICAgICAgICAgICAgICAgbm9SZWNlbnRTZWFyY2hlc1RleHQ6ICdcdTZDQTFcdTY3MDlcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxyXG4gICAgICAgICAgICAgICAgICBzYXZlUmVjZW50U2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRGRERcdTVCNThcdTgxRjNcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxyXG4gICAgICAgICAgICAgICAgICByZW1vdmVSZWNlbnRTZWFyY2hCdXR0b25UaXRsZTogJ1x1NEVDRVx1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMlx1NEUyRFx1NzlGQlx1OTY2NCcsXHJcbiAgICAgICAgICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ1x1NjUzNlx1ODVDRicsXHJcbiAgICAgICAgICAgICAgICAgIHJlbW92ZUZhdm9yaXRlU2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRFQ0VcdTY1MzZcdTg1Q0ZcdTRFMkRcdTc5RkJcdTk2NjQnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yU2NyZWVuOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlVGV4dDogJ1x1NjVFMFx1NkNENVx1ODNCN1x1NTNENlx1N0VEM1x1Njc5QycsXHJcbiAgICAgICAgICAgICAgICAgIGhlbHBUZXh0OiAnXHU0RjYwXHU1M0VGXHU4MEZEXHU5NzAwXHU4OTgxXHU2OEMwXHU2N0U1XHU0RjYwXHU3Njg0XHU3RjUxXHU3RURDXHU4RkRFXHU2M0E1JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXHJcbiAgICAgICAgICAgICAgICAgIG5hdmlnYXRlVGV4dDogJ1x1NTIwN1x1NjM2MicsXHJcbiAgICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1x1NTE3M1x1OTVFRCcsXHJcbiAgICAgICAgICAgICAgICAgIHNlYXJjaEJ5VGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjNEMFx1NEY5Qlx1ODAwNScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzU2NyZWVuOiB7XHJcbiAgICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY1RTBcdTZDRDVcdTYyN0VcdTUyMzBcdTc2RjhcdTUxNzNcdTdFRDNcdTY3OUMnLFxyXG4gICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRRdWVyeVRleHQ6ICdcdTRGNjBcdTUzRUZcdTRFRTVcdTVDMURcdThCRDVcdTY3RTVcdThCRTInLFxyXG4gICAgICAgICAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c1RleHQ6ICdcdTRGNjBcdThCQTRcdTRFM0FcdThCRTVcdTY3RTVcdThCRTJcdTVFOTRcdThCRTVcdTY3MDlcdTdFRDNcdTY3OUNcdUZGMUYnLFxyXG4gICAgICAgICAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c0xpbmtUZXh0OiAnXHU3MEI5XHU1MUZCXHU1M0NEXHU5OTg4JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgbWFya2Rvd246IHtcclxuICAgIGNvZGVUcmFuc2Zvcm1lcnM6IFt0cmFuc2Zvcm1lclR3b3NsYXNoKCldLFxyXG4gICAgdGhlbWU6IHtcclxuICAgICAgbGlnaHQ6ICdnaXRodWItbGlnaHQtZGVmYXVsdCcsXHJcbiAgICAgIGRhcms6ICdnaXRodWItZGFyay1kZWZhdWx0JyxcclxuICAgIH0sXHJcbiAgICBsaW5lTnVtYmVyczogZmFsc2UsXHJcbiAgICBtYXRoOiB0cnVlLCAvLyByZXF1aXJlIGBtYXJrZG93bi1pdC1tYXRoamF4M2BcclxuICAgIGltYWdlOiB7XHJcbiAgICAgIGxhenlMb2FkaW5nOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICBjb250YWluZXI6IHtcclxuICAgICAgdGlwTGFiZWw6ICdcdTYzRDBcdTc5M0EnLFxyXG4gICAgICB3YXJuaW5nTGFiZWw6ICdcdThCNjZcdTU0NEEnLFxyXG4gICAgICBkYW5nZXJMYWJlbDogJ1x1NTM3MVx1OTY2OScsXHJcbiAgICAgIGluZm9MYWJlbDogJ1x1NEZFMVx1NjA2RicsXHJcbiAgICAgIGRldGFpbHNMYWJlbDogJ1x1OEJFNlx1N0VDNlx1NEZFMVx1NjA2RicsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmF2KCk6IERlZmF1bHRUaGVtZS5OYXZJdGVtW10ge1xyXG4gIHJldHVybiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdcdTUzQ0JcdTk0RkUnLFxyXG4gICAgICBsaW5rOiAnL2xpbmsvJyxcclxuICAgICAgYWN0aXZlTWF0Y2g6IGBeL2xpbmsvYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdcdTRFMTNcdTY4MEYnLFxyXG4gICAgICBhY3RpdmVNYXRjaDogYF4vKGxpZmV8YWxnb3JpdGhtfGZyb250LWVuZHxiYWNrLWVuZHxhaSkvYCxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnXHU3QTBCXHU1RThGXHU0RUJBXHU3NTFGJyxcclxuICAgICAgICAgIGxpbms6ICcvbGlmZS8nLFxyXG4gICAgICAgICAgYWN0aXZlTWF0Y2g6IGBeL2xpZmUvYCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdcdTdCOTdcdTZDRDVcdTk4OThcdTg5RTMnLFxyXG4gICAgICAgICAgbGluazogJy9hbGdvcml0aG0vJyxcclxuICAgICAgICAgIGFjdGl2ZU1hdGNoOiBgXi9hbGdvcml0aG0vYCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdcdTUyNERcdTdBRUZcdTk4ODZcdTU3REYnLFxyXG4gICAgICAgICAgbGluazogJy9mcm9udC1lbmQvJyxcclxuICAgICAgICAgIGFjdGl2ZU1hdGNoOiBgXi9mcm9udC1lbmQvYCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdcdTU0MEVcdTdBRUZcdTk4ODZcdTU3REYnLFxyXG4gICAgICAgICAgbGluazogJy9iYWNrLWVuZC8nLFxyXG4gICAgICAgICAgYWN0aXZlTWF0Y2g6IGBeL2JhY2stZW5kL2AsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnXHU0RUJBXHU1REU1XHU2NjdBXHU4MEZEJyxcclxuICAgICAgICAgIGxpbms6ICcvYWkvJyxcclxuICAgICAgICAgIGFjdGl2ZU1hdGNoOiBgXi9haS9gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnXHU1MTczXHU0RThFJyxcclxuICAgICAgbGluazogJy9hYm91dC8nLFxyXG4gICAgICBhY3RpdmVNYXRjaDogJy9hYm91dC8nLFxyXG4gICAgfSxcclxuICBdO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyxnQkFBQUEscUJBQW9COzs7QUNBM0IsT0FBTyxVQUFVO0FBQ3hWLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsWUFBWTtBQUNyQixTQUFTLDJCQUE0QztBQUVyRCxJQUFNLFVBQVU7QUFFaEIsZUFBc0IsUUFBUSxRQUFvQjtBQUNoRCxRQUFNLE9BQU8sSUFBSSxLQUFLO0FBQUEsSUFDcEIsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUyxHQUFHLE9BQU87QUFBQSxJQUNuQixXQUFXO0FBQUEsRUFDYixDQUFDO0FBRUQs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O0FBQUEsSUFDUjtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsTUFBTTtBQUFBO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFFRCxTQUFTLE1BQThCO0FBQ3JDLFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRjs7O0FGbklBLElBQU8saUJBQVFDLGNBQWE7QUFBQSxFQUMxQixPQUFPLEdBQUc7QUFBQSxFQUNWLGFBQWEsR0FBRztBQUFBLEVBQ2hCLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFBQSxFQUNWLFVBQVUsR0FBRztBQUFBLEVBQ2IsYUFBYSxHQUFHO0FBQUEsRUFDaEIsTUFBTTtBQUFBLElBQ0osQ0FBQyxRQUFRLEVBQUUsTUFBTSxVQUFVLFNBQVMscUJBQU0sQ0FBQztBQUFBLElBQzNDLENBQUMsUUFBUSxFQUFFLE1BQU0sWUFBWSxTQUFTLDRFQUE0RSxDQUFDO0FBQUEsSUFDbkgsQ0FBQyxRQUFRLEVBQUUsS0FBSyxjQUFjLE1BQU0sc0NBQXNDLGFBQWEsR0FBRyxDQUFDO0FBQUEsRUFDN0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFFBQVE7QUFBQTtBQUFBLE1BRU4seUNBQXlDO0FBQUEsSUFDM0M7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyJdCn0K
