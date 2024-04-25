(() => {
  const handleThemeChange = (mode) => {
    const globalFn = window.globalFn || {};
    const themeChange = globalFn.themeChange || {};
    if (!themeChange) {
      return;
    }

    Object.keys(themeChange).forEach((key) => {
      const themeChangeFn = themeChange[key];
      if (['disqus', 'disqusjs'].includes(key)) {
        setTimeout(() => themeChangeFn(mode), 300);
      } else {
        themeChangeFn(mode);
      }
    })
  }
  const dialog = document.createElement('dialog');
  const ul = document.createElement('ul');
  dialog.id = 'context-menu';
  dialog.classList.add('context-menus__dialog');
  ul.classList.add('context-menus');

  const menus = [{
    icon: 'iconfont icon-book-open',
    label: '阅读模式',
    hidden: !GLOBAL_CONFIG_SITE.isPost,
    onClick() {
      const $body = document.body;
      $body.classList.add('read-mode');
      
      const clickFn = () => {
        $body.classList.remove('read-mode');
        newEle.remove();
        newEle.removeEventListener('click', clickFn);
      }

      const exitReadmodeButton = document.querySelector('.exit-readmode');
      if (exitReadmodeButton) {
        $body.classList.remove('read-mode');
        exitReadmodeButton.remove();
        exitReadmodeButton.removeEventListener('click', clickFn);
        dialog.close();
        return;
      }

      const newEle = document.createElement('button');
      newEle.type = 'button';
      newEle.className = 'fas fa-sign-out-alt exit-readmode';
      $body.appendChild(newEle);

      newEle.addEventListener('click', clickFn);
      dialog.close();
    }
  }, {
    label: '切换侧栏',
    icon: 'fas fa-arrows-alt-h',
    onClick() {
      const $htmlDom = document.documentElement.classList;
      const saveStatus = $htmlDom.contains('hide-aside') ? 'show' : 'hide';
      window.saveToLocal.set('aside-status', saveStatus, 2);
      $htmlDom.toggle('hide-aside');
      dialog.close();
    }
  }, {
    label: '直达评论',
    icon: 'fas fa-comments',
    hidden: !GLOBAL_CONFIG_SITE.isPost,
    onClick() {
      const a = document.createElement('a');
      a.href = '#post-comment';
      a.click();
      dialog.close();
    }
  }, {
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
    label: '切换主题',
    onClick() {
      const willChangeMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (willChangeMode === 'dark') {
        window.activateDarkMode();
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      } else {
        window.activateLightMode();
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      }
      saveToLocal.set('theme', willChangeMode, 2);
      handleThemeChange(willChangeMode);
      dialog.close();
    }
  }, {
    icon: 'iconfont icon-language',
    label: '简繁转换',
    onClick() {
      window.translateFn.translatePage();
      dialog.close();
    }
  }];

  for (let i = 0, len = menus.length; i < len; i++) {
    const menu = menus[i];
    if (menu.hidden) {
      continue;
    }
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
      li.onclick = menu.onClick;
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