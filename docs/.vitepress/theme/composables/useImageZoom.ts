import mediumZoom, { type Zoom } from 'medium-zoom';
import { nextTick, onMounted, watch } from 'vue';
import { onContentUpdated, useRoute } from 'vitepress';

/**
 * 正文图片点击放大预览（基于 medium-zoom）。
 * 作用范围：文章页（#article）、关于页（#about-content）与时刻页（.moment-content）。
 * 仅在客户端生效；初始挂载、路由切换与内容热更新时重新绑定当前页图片。
 * 注意：时刻等自定义布局页不渲染 <Content>，onContentUpdated 不会触发，
 * 因此额外在挂载与路由变化时兜底绑定。
 */
export function useImageZoom() {
  let zoom: Zoom | null = null;
  const route = useRoute();

  const bindImages = () => {
    // 等待正文 DOM 更新完成
    setTimeout(() => {
      if (!zoom) {
        zoom = mediumZoom({
          background: 'var(--web-content-bg)', // 跟随亮/暗主题
          margin: 24
        });
      }
      // 清理上一页的绑定，避免路由切换后累积监听
      zoom.detach();
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>(
          '#article img, #about-content img, .moment-content img'
        )
        // 被链接包裹的图片保持点击跳转行为，不参与放大
      ).filter((img) => !img.closest('a'));
      zoom.attach(images);
    });
  };

  onContentUpdated(bindImages);
  onMounted(bindImages);
  watch(
    () => route.path,
    () => nextTick(bindImages)
  );
}
