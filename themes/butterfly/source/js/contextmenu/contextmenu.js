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

  function getMenus(event) {
    let menus = [{
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
      icon: 'iconfont icon-arrows-alt-h',
      onClick() {
        const $htmlDom = document.documentElement.classList;
        const saveStatus = $htmlDom.contains('hide-aside') ? 'show' : 'hide';
        window.saveToLocal.set('aside-status', saveStatus, 2);
        $htmlDom.toggle('hide-aside');
        dialog.close();
      }
    }, {
      label: '直达评论',
      icon: 'iconfont icon-comment',
      hidden: !GLOBAL_CONFIG_SITE.isPost,
      onClick() {
        const a = document.createElement('a');
        a.href = '#post-comment';
        a.click();
        dialog.close();
      }
    }, {
      label: '回到顶部',
      icon: 'iconfont icon-back-top',
      onClick() {
        btf.scrollToDest(0, 500);
        dialog.close();
      }
    }, {
      divider: true
    }, {
      label: GLOBAL_CONFIG_SITE.isPost ? '分享文章' : '分享网址',
      icon: 'iconfont icon-link-share',
      onClick() {
        window.navigator.clipboard.writeText(window.location.href);
        dialog.close();
      }
    }, {
      icon: 'iconfont icon-privacy-policy',
      label: '隐私协议'
    }, {
      icon: 'iconfont icon-copyright',
      label: '版权声明',
      onClick() {
        window.open('https://creativecommons.org/licenses/by-nc-sa/4.0/', '__blank');
        dialog.close();
      }
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
    }, {
      divider: true
    }, {
      label: '打印页面',
      icon: 'iconfont icon-print',
      onClick() {
        dialog.close(); // 打印页面前关闭菜单弹窗，避免将菜单添加到打印视图
        window.print();
      }
    }, {
      label: '系统菜单',
      onClick() {
        dialog.close();
      }
    }];
    // 如果有选中文本
    const selection = window.getSelection();
    if (selection.toString()) {
      menus.unshift(...[{
        label: '复制文本',
        icon: 'iconfont icon-copy',
        onClick() {
          window.navigator.clipboard.writeText(selection.toString());
          dialog.close();
        }
      }]);
    }

    // 如果鼠标右键目标是链接
    if (event.target instanceof HTMLAnchorElement && event.target.href) {
      menus.unshift(...[
        {
          label: '打开链接',
          icon: 'iconfont icon-link',
          onClick() {
            window.open(event.target.href, '__blank');
            dialog.close();
          }
        }
      ]);
    }

    // 如果鼠标右键目标是图像
    if (event.target instanceof HTMLImageElement && event.target.src) {
      menus.unshift(...[
        {
          label: '复制图像',
          icon: 'iconfont icon-copy',
          async onClick() {
            const blob = await fetch(
              event.target.src,
              {
                referrer: 'same-origin',
                referrerPolicy: 'no-referrer'
              }
            ).then((res) => {
              return res.blob();
            }).catch(() => {
              alert('抱歉，无法复制此图片！');
            });

            try {
              // try catch 无法直接捕获 Promise 异常，因为它是异步的。这里需要使用 async/await
              await writeImage(blob);
            } catch(err) {
              const img = document.createElement('img');
              // 跨域请求
              img.setAttribute('crossOrigin', 'Anonymous');
              img.src = window.URL.createObjectURL(blob);
              img.onload = () => {
                // Clipboard API 仅支持复制 image/png 的图片，对图片格式进行转换
                const { naturalWidth: width, naturalHeight: height } = img;
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(async (blob) => {
                  if (blob == null) {
                    throw new Error();
                  }
                  await writeImage(blob);
                }, 'image/png', .9);
              };
              img.onerror = (err) => {
                alert('抱歉，无法复制此图片！');
              }
            } finally {
              dialog.close();
            }
            
            async function writeImage(blob) {
              const clipboardItem = new ClipboardItem({
                [`${blob.type}`]: blob
              });
              return window.navigator.clipboard.write([clipboardItem]);
            }
          }
        },
        {
          label: '复制图像链接',
          onClick() {
            window.navigator.clipboard.writeText(event.target.src);
            dialog.close();
          }
        },
        {
          divider: true
        }
      ]);
    }

    // 如果鼠标右键目标可编辑
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target.isContentEditable) {
      event.target.focus();
      menus = [
        {
          label: '撤销',
          icon: 'iconfont icon-undo',
          onClick() {
            document.execCommand('undo');
          }
        },
        {
          label: '复制',
          icon: 'iconfont icon-copy',
          disabled: !selection.toString(),
          onClick() {
            window.navigator.clipboard.writeText(selection.toString());
            dialog.close();
          }
        },
        {
          label: '粘贴',
          icon: 'iconfont icon-paste-layer',
          onClick() {
            window.navigator.clipboard.readText().then((value) => {
              window.document.execCommand('insertText', false, value);
            });
          }
        }
      ];
    }


    return menus;
  }

  function createContextMenu(menus) {
    ul.innerHTML = '';
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
        icon.classList.add('context-menu__icon--prefix', ...(menu.icon?.split(' ').filter(_ => _) || []));
        li.append(icon, span);
        li.classList.add('context-menu');
        li.onclick = menu.onClick;
        ul.appendChild(li);
      }
    }
  }

  dialog.appendChild(ul);

  dialog.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (!event.composedPath().includes(ul)) {
      dialog.close();
    }
  });

  window.addEventListener('blur', () => {
    dialog.close();
  });

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    dialog.close();
    const menus = getMenus(event);
    createContextMenu(menus);
    document.body.appendChild(dialog);
    dialog.show();
    // dialog.show() 调用后才能正常获取元素的宽高
    ul.style.left = Math.min(event.clientX, window.innerWidth - ul.offsetWidth - 30) + 'px';
    ul.style.top = Math.min(event.clientY, window.innerHeight - ul.offsetHeight - 30) + 'px';
  });
})();