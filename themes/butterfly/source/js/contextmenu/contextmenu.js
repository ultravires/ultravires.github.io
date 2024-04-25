(() => {
  const menus = [{
    icon: 'iconfont icon-book-open',
    label: '阅读模式',
    onClick() {}
  },{
    divider: true
  }, {
    icon: 'iconfont icon-privacy-policy',
    label: '隐私协议'
  }, {
    icon: 'iconfont icon-copyright',
    label: '版权协议'
  }, {
    divider: true
  }, {
    icon: 'iconfont icon-theme',
    label: '切换主题'
  }, {
    icon: 'iconfont icon-language',
    label: '语言转换'
  }];
  const dialog = document.createElement('dialog');
  const ul = document.createElement('ul');
  dialog.id = 'context-menu';
  dialog.classList.add('context-menus__dialog');
  ul.classList.add('context-menus');

  for (let i = 0, len = menus.length; i < len; i++) {
    const menu = menus[i];
    if (menu.divider === true) {
      const hr = document.createElement('hr');
      ul.appendChild(hr);
    } else {
      const li = document.createElement('li');
      const icon = document.createElement('i');
      const span = document.createElement('span');
      span.textContent = menu.label;
      icon.classList.add('context-menu__icon--prefix', ...(menu.icon?.split(' ') || []));
      li.append(icon, span);
      li.classList.add('context-menu');
      ul.appendChild(li);
    }
  }
  dialog.appendChild(ul);

  dialog.addEventListener('mousedown', (event) => {
    if (!event.composedPath().includes(ul)) {
      dialog.close();
    }
  });

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    ul.style.left = event.clientX + 'px';
    ul.style.top = event.clientY + 'px';
    document.body.appendChild(dialog);
    dialog.show();
  });
})();