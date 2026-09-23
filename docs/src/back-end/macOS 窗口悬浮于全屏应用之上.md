---
title: macOS 让窗口悬浮在全屏应用之上
date: 2026-09-23
categories:
  - macOS
  - 后端领域
---

开发悬浮歌词、提词器、屏幕批注、系统监视条这类工具时，经常需要让自家窗口浮在其它应用之上——包括其它应用**进入全屏**之后。网上流传的经典配方（`window.level = .screenSaver` + `canJoinAllSpaces`）在 macOS 26 上实测已经失效，本文记录真正可行的方案及集成时要踩平的坑。

---

## 为什么 `window.level` 解决不了问题

先厘清两个概念：

- **`window.level`（窗口层级）**：只决定窗口在**同一个 Space（空间）内**的前后顺序。
- **`collectionBehavior`（集合行为）**：决定窗口**能出现在哪些 Space**。

其它应用全屏时，macOS 会切换到一个全新的全屏 Space。没有声明能加入该 Space 的窗口会留在桌面 Space——对用户而言就是"浮窗消失了"。所以层级调得再高（`.screenSaver`、`.statusBar`）都没有用：窗口根本不在那个 Space 里。

## 实测：常见组合全部失效

我写了对照实验：每种配置创建一个纯色窗口，再把另一个窗口切全屏并截图，观察谁能留在全屏画面上：

| 窗口类型 | styleMask | level | collectionBehavior | 结果 |
| --- | --- | --- | --- | --- |
| NSWindow | borderless | .screenSaver | canJoinAllSpaces | ❌ |
| NSWindow | borderless | .screenSaver | canJoinAllSpaces + stationary | ❌ |
| NSWindow | borderless | .floating | canJoinAllSpaces + fullScreenAuxiliary | ❌ |
| NSWindow | borderless | .statusBar | canJoinAllSpaces + fullScreenAuxiliary | ❌ |
| NSPanel | borderless | .floating | canJoinAllSpaces + fullScreenAuxiliary | ❌ |
| **NSPanel** | **+ nonactivatingPanel** | .screenSaver | canJoinAllSpaces | ✅ |
| **NSPanel** | **+ nonactivatingPanel** | .statusBar | canJoinAllSpaces + fullScreenAuxiliary | ✅ |

结论很干脆：**关键不是 level，也不是 collectionBehavior，而是窗口必须是带 `.nonactivatingPanel` 的 `NSPanel`**。少了 `nonactivatingPanel` 的 NSPanel 同样失败；有了它之后 level 高低、是否加 `fullScreenAuxiliary` 都无所谓。

实测环境：macOS 26.6.2。早期系统上 `NSWindow` + 高层级 reportedly 可行，但至少在当前系统上不要再浪费时间尝试了。

## 核心代码

```swift
let panel = NSPanel(
    contentRect: NSRect(x: 0, y: 0, width: 800, height: 96),
    styleMask: [.titled, .resizable, .fullSizeContentView, .nonactivatingPanel],
    backing: .buffered,
    defer: false
)

// 关键三件套
panel.level = .screenSaver   // NSPanel + nonactivating 下，.floating / .statusBar 也行
panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
panel.isFloatingPanel = true

// 常规浮窗外观与行为（按需）
panel.isOpaque = false
panel.backgroundColor = .clear
panel.hasShadow = false
panel.titleVisibility = .hidden
panel.titlebarAppearsTransparent = true
panel.isMovableByWindowBackground = true
panel.hidesOnDeactivate = false    // App 失焦时保持显示
panel.isReleasedWhenClosed = false // close 后不销毁，便于再次显示

panel.orderFrontRegardless() // nonactivating 面板用它显示，不抢焦点
```

几个要点：

- `canJoinAllSpaces` 让窗口加入所有 Space（含全屏 Space）；`fullScreenAuxiliary` 声明窗口可以与全屏窗口同屏显示。实测只写前者就够，两个都写更保险。
- 显示用 `orderFrontRegardless()` 而不是 `makeKeyAndOrderFront(_:)`：nonactivating 面板的定位就是不激活 App、不抢键盘焦点。
- 需要反复显示/隐藏时务必 `isReleasedWhenClosed = false`，之后 `orderFrontRegardless()` 即可重新显示。
- `.screenSaver` 只是习惯用法，层级高意味着在桌面 Space 它也能盖住菜单栏区域；介意的话降到 `.statusBar` 或 `.floating`，只要 NSPanel + nonactivating 不变，压全屏的能力不变。

### nonactivating 的交互影响

- 鼠标点击、悬停、拖拽全部正常，且**不会激活你的 App**——用户全屏看视频时点你的浮窗，不会跳出全屏 Space。对悬浮工具这正是想要的行为。
- 键盘输入默认进不了面板。如果浮窗里有搜索框之类需要键盘的控件，可以设置 `becomesKeyOnlyIfNeeded = true`，点击文本框时面板会临时成为 key；重度键盘输入的浮窗则不适合这套方案。

## 在 SwiftUI App 中集成

SwiftUI 的 `WindowGroup` / `Window` 场景只能创建 `NSWindow`，所以浮窗必须绕开场景体系，由 AppDelegate 手工创建，内容用 `NSHostingView` 托管：

```swift
final class AppDelegate: NSObject, NSApplicationDelegate {
    /// 全局访问点（原因见坑二）
    nonisolated(unsafe) private(set) static var shared: AppDelegate?

    private var floatingPanel: NSPanel?

    override init() {
        super.init()
        AppDelegate.shared = self
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        let panel = NSPanel(
            contentRect: NSRect(x: 0, y: 0, width: 800, height: 96),
            styleMask: [.titled, .resizable, .fullSizeContentView, .nonactivatingPanel],
            backing: .buffered,
            defer: false
        )
        panel.contentView = NSHostingView(rootView: FloatingBarView())
        panel.level = .screenSaver
        panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
        panel.hidesOnDeactivate = false
        panel.isReleasedWhenClosed = false
        panel.orderFrontRegardless()
        floatingPanel = panel
    }

    /// 供设置界面等入口重新显示浮窗
    func showFloatingPanel() {
        floatingPanel?.orderFrontRegardless()
    }
}
```

下面三个坑都是实测踩出来的。

### 坑一：启动时自动弹出 Settings 窗口

浮窗不再是场景窗口后，通过 LaunchServices 启动（`open` 命令、访达双击）时，AppKit 处理 `oapp` 事件发现"启动后没有任何场景窗口"，会走 `_doOpenUntitled`，由 SwiftUI 内部默认实现把 **Settings 场景窗口**打开——表现就是"每次启动自动弹出设置窗口"。直接在终端执行二进制则不会触发（没有 LaunchServices 事件），调试时注意这个差异。

解决办法是在 `applicationWillFinishLaunching` 里接管 `oapp` AppleEvent，只做激活：

```swift
func applicationWillFinishLaunching(_ notification: Notification) {
    NSAppleEventManager.shared().setEventHandler(
        self,
        andSelector: #selector(handleOpenApplicationEvent(_:withReply:)),
        forEventClass: AEEventClass(kCoreEventClass),
        andEventID: AEEventID(kAEOpenApplication)
    )
}

@objc private func handleOpenApplicationEvent(_ event: NSAppleEventDescriptor,
                                              withReply reply: NSAppleEventDescriptor) {
    NSApp.activate(ignoringOtherApps: true)
}
```

Dock 图标点击、重复打开走的是 `rapp`（`kAEReopenApplication`），不受接管影响，`applicationShouldHandleReopen` 照常工作。若编译时报找不到 `kCoreEventClass` / `kAEOpenApplication`，`import Carbon` 即可。

### 坑二：视图里拿不到 AppDelegate

`NSApp.delegate as? AppDelegate` 永远返回 `nil`——SwiftUI 会用内部代理对象充当 delegate。而 `@NSApplicationDelegateAdaptor` 在脱离场景层级的 `NSHostingView` 中会解析出一个**新的** AppDelegate 实例，写上去的属性别处根本读不到。

解决办法就是上面代码里的静态访问点：`init()` 里记录 `AppDelegate.shared = self`，视图里统一使用 `AppDelegate.shared`。

### 坑三（好消息）：场景 Action 仍然可用

手工创建的 `NSHostingView` 不属于任何 SwiftUI 场景，但实测（macOS 26）其中视图的 `@Environment(\.openWindow)`、`@Environment(\.openSettings)` 依然能正常打开 `WindowGroup` / Settings 场景的窗口。浮窗里的按钮可以放心调 `openWindow(id:)`。

## 怎么验证"真的浮上去了"

目测容易误判，推荐两个可编程的验证手段：

1. **`CGWindowListCopyWindowInfo` 看窗口属性**：浮窗的 `kCGWindowLayer` 应等于设置的 level（`.screenSaver` 对应 1000）；其它 App 全屏时，`kCGWindowIsOnscreen` 应为 true。用 owner PID 过滤即可定位自家窗口。
2. **截图看终局结果**：写个测试 App 把自己的窗口 `toggleFullScreen(_:)`，延迟几秒后调 `/usr/sbin/screencapture -x out.png`，直接看图里有没有浮窗。窗口属性可能说谎，像素不会。

## 注意事项

- 悬浮工具在 Mac App Store 是常见形态，这套方案不需要特殊 entitlement，与沙盒兼容。
- 该面板加入所有 Space，意味着 Mission Control、切换桌面时它都跟着；想让切换 Space 时窗口保持不动，可以在 `collectionBehavior` 里追加 `.stationary`。
- 拖拽移动用 `isMovableByWindowBackground = true` 即可，nonactivating 不影响拖拽。
