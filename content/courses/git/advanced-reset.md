---
title: git reset
description: How to reset and deal with screw ups
weight: 40
lastmod: 2021-09-05T10:23:30-09:00
draft: false
vimeo: 599244967
emoji: 🔨
video_length: 2:32
chapter_start: Advanced
chapter_icon: 🔨
---

Unstage all staged files.

<File name="command line">
  <Terminal />
</File>
```bash
git reset
```

Rollback to a previous commit, BUT keep your changes in the working directory.

<File name="command line">
  <Terminal />
</File>
```bash
git reset <commit-ID>
```

Rollback to a previous commit AND discard all changes. Be careful with this one.

<File name="command line">
  <Terminal />
</File>
```bash
git reset <commit-ID> --hard
```
