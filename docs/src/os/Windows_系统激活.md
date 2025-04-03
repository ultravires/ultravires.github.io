---
title: Windows 系统激活
date: 2024-07-08 22:35:00
cover:
   text: 系统激活
#   url: https://s2.loli.net/2024/11/27/ueFv9nyc2NKmZoO.webp
banner:
  image: https://s2.loli.net/2024/11/27/ueFv9nyc2NKmZoO.webp
  blur: true
  wave: true
aside: true
---

Win10 KMS 客户端安装序列号，支持 1511-1809-1903-1909 等全系列 Win10 版本。

---

## Win10 序列号

​Windows 10 Pro (专业版)：

```plain
W269N-WFGWX-YVC9B-4J6C9-T83GX
```

​Windows 10 Pro N (专业版 N)：

```plain
MH37W-N47XK-V7XM9-C7227-GCQG9
```

​Windows 10 Pro Workstations (专业工作站)：

```plain
NRG8B-VKK3Q-CXVCJ-9G2XF-6Q84J
```

​Windows 10 Pro Workstations N (专业工作站 N)：

```plain
9FNHH-K3HBT-3W4TD-6383H-6XYWF
```

​Windows 10 Pro Education (专业教育版)：

```plain
6TP4R-GNPTD-KYYHQ-7B7DP-J447Y
```

​Windows 10 Pro Education N (专业教育版 N)：

```plain
YVWGF-BXNMC-HTQYQ-CPQ99-66QFC
```

​Windows 10 Education (教育版)：

```plain
NW6C2-QMPVW-D7KKK-3GKT6-VCFB2
```

​Windows 10 Education N (教育版 N)：

```plain
2WH4N-8QGBV-H22JP-CT43Q-MDWWJ
```

​Windows 10 Enterprise (企业版)：

```plain
NPPR9-FWDCX-D2C8J-H872K-2YT43
```

​Windows 10 Enterprise N (企业版 N)：

```plain
DPH2V-TTNVB-4X9Q3-TJR4H-KHJW4
```

​Windows 10 Enterprise G (企业政府版)：

```plain
YYVX9-NTFWV-6MDM3-9PT4T-4M68B
```

​Windows 10 Enterprise G N (企业政府版 N)：

```plain
44RPN-FTY23-9VTTB-MP9BX-T84FV
```

Windows 10 企业版 LTSC 2019：

```plain
M7XTQ-FN8P6-TTKYV-9D4CC-J462D
```

Windows 10 企业版 N LTSC 2019：

```plain
2NFX-8DJQP-P6BBQ-THF9C-7CG2H
```

​Windows 10 企业版 LTSB 2016：

```plain
DCPHK-NFMTC-H88MJ-PFHPY-QJ4BJ
```

​Windows 10 企业版 N LTSB 2016：

```plain
FFDN-GRT3P-VKWWX-X7T3R-8B639
```

​Windows 10 企业版 2015 长期服务：

```plain
WNMTR-4C88C-JK8YV-HQ7T2-76DF9
```

​Windows 10 企业版 2015 长期服务 N：

```plain
2F77B-TNFGY-69QQF-B8YKP-D69TJ
```

## 激活 Windows

1. 查看 Windows 版本，以管理员方式运行 `PowerShell`;

2. 安装正确的秘钥

   ```PowerShell
   slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
   ```

3. 设置 kms 服务器

   ```PowerShell
   slmgr /skms zh.us.to
   ```

   zh.us.to 有效

   kms.03k.org 有效

   kms.chinancce.com 有效

   kms.shuax.com 有效

   kms.dwhd.org 有效

   kms.luody.info 有效

   kms.digiboy.ir 有效

   kms.lotro.cc 有效

   ss.yechiu.xin 有效

   www.zgbs.cc 有效

   cy2617.jios.org 有效

4. 激活系统

   ```PowerShell
   slmgr /ato
   ```

5. 查看激活状态

   ```PowerShell
   slmgr /xpr
   ```

---

## 参考

> - [你的 Windows 许可证即将过期，Windows10 许可证即将过期解决方法](http://www.xitongcheng.com/jiaocheng/Win10_article_52459.html)
> - [微软官方正版 Win10 VL 批量激活密钥汇总（附 KMS 激活图文步骤）](http://www.xitongcheng.com/jiaocheng/Win10_article_44613.html)
> - [可用的 kms 激活服务器有哪些 | 怎么看 kms 服务器能不能正常使用](http://www.xitongcheng.com/jiaocheng/dnrj_article_44606.html)
