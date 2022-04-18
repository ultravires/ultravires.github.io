export class Menu extends HTMLUListElement {
  constructor() {
    super();
    this.classList.add('gh-menu');
  }
}
customElements.define('gh-menu', Menu, { extends: 'ul' });

export class MenuItem extends HTMLLIElement {
  constructor(options = {}) {
    super();
    this.classList.add('gh-menu-item');
    if (JSON.stringify(options) === '{}') {
      return;
    }
    const a = document.createElement('a');
    a.href = options.path;
    a.textContent = options.name;

    if (options.icon) {
      const i = document.createElement('i');
      i.classList.add('iconfont', options.icon);
      a.prepend(i);
    }

    this.appendChild(a);
  }
}
customElements.define('gh-menu-item', MenuItem, { extends: 'li' });
