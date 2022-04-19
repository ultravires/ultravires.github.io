export class Post extends HTMLDivElement {
  constructor(options = {}) {
    super();

    if (typeof options === '{}') {
      return;
    }

    const image = document.createElement('img');
    image.loading = 'lazy';
    image.src = 'https://www.whbwiki.com/wp-content/uploads/2021/08/u32683474932946025097fm26fmtautogp0.webp';

    const thumbnail = document.createElement('thumbnail');
    thumbnail.classList.add('gh-post__thumbnail');
    thumbnail.append(image);

    const section = document.createElement('section');
    section.classList.add('gh-post__content');
    section.innerHTML = `
      <div>
        <h3 class="title">${options.name}</h3>
        <p class="desc"></p>
      </div>
      <ul class="meta">
        <li>
          <time>2022-04-18</time>
        </li>
      </ul>
    `;

    this.classList.add('gh-post');
    this.append(thumbnail, section);
  }
}
customElements.define('gh-post', Post, { extends: 'div' });
