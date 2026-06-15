import { nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vitepress';

const STORAGE_KEY = 'vitepress:local-search-filter';
const HIGHLIGHT_CLASS = 'search-highlight';

function escapeRegExp(str: string): string {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

/**
 * Walk all text nodes within a root element, skipping excluded elements.
 */
function walkTextNodes(
  root: Node,
  callback: (node: Text) => void,
  exclude: string[] = []
): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node: Node): number {
      // Skip empty text nodes
      if (!node.textContent || !node.textContent.trim()) {
        return NodeFilter.FILTER_REJECT;
      }
      // Check if any ancestor matches an exclude selector
      let parent = node.parentElement;
      while (parent && parent !== (root as Element)) {
        for (const sel of exclude) {
          if (parent.matches(sel)) {
            return NodeFilter.FILTER_REJECT;
          }
        }
        parent = parent.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    callback(node);
  }
}

/**
 * Remove all search highlights from the DOM, restoring original text.
 */
function unmark(root: Element): void {
  const marks = root.querySelectorAll(`mark.${HIGHLIGHT_CLASS}`);
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      // Replace the <mark> element with its text content
      parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
      // Merge adjacent text nodes
      parent.normalize();
    }
  });
}

/**
 * Highlight search terms in the article content after navigating from search.
 * Reads the search query from sessionStorage (set by VitePress's local search),
 * then wraps matching text in <mark class="search-highlight"> elements.
 */
export function useSearchHighlight() {
  const route = useRoute();

  async function highlightSearchTerms() {
    await nextTick();

    const query = sessionStorage.getItem(STORAGE_KEY);
    if (!query || !query.trim()) return;

    const articleEl = document.getElementById('article');
    if (!articleEl) return;

    const terms = query.trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return;

    // Clear the stored query so highlights don't persist across page navigations
    sessionStorage.removeItem(STORAGE_KEY);

    // Remove any existing highlights
    unmark(articleEl);

    // Build regex from search terms
    const regex = new RegExp(
      terms
        .sort((a, b) => b.length - a.length)
        .map((term) => `(${escapeRegExp(term)})`)
        .join('|'),
      'gi'
    );

    // Walk text nodes and wrap matches
    walkTextNodes(articleEl, (textNode) => {
      const text = textNode.textContent || '';
      if (!regex.test(text)) return;
      regex.lastIndex = 0;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        // Append text before the match
        if (match.index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, match.index))
          );
        }
        // Append the highlighted match
        const mark = document.createElement('mark');
        mark.className = HIGHLIGHT_CLASS;
        mark.textContent = match[0];
        fragment.appendChild(mark);
        lastIndex = regex.lastIndex;

        // Prevent infinite loop on zero-length matches
        if (match[0].length === 0) {
          regex.lastIndex++;
        }
      }
      // Append remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex))
        );
      }

      textNode.parentNode?.replaceChild(fragment, textNode);
    }, [
      'pre',
      'code',
      'script',
      'style',
      `.${HIGHLIGHT_CLASS}`
    ]);
  }

  function clearHighlights() {
    const articleEl = document.getElementById('article');
    if (articleEl) {
      unmark(articleEl);
    }
    sessionStorage.removeItem(STORAGE_KEY);
  }

  onMounted(() => {
    highlightSearchTerms();
  });

  // Re-run on client-side navigation
  watch(
    () => route.path,
    () => {
      nextTick(() => highlightSearchTerms());
    }
  );

  onBeforeUnmount(() => {
    clearHighlights();
  });

  return {
    clearHighlights
  };
}
