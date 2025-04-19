---
title: git stash
description: Hold on to changes without committing them
weight: 43
lastmod: 2021-09-05T10:23:30-09:00
draft: false
vimeo: 599244657
emoji: 🗃️
video_length: 1:43
---

Basic way to create and apply a stash

<File name="command line">
  <Terminal />
</File>
```bash
git stash
git stash pop
```

Manage your stashes more easily by giving them a name:

<File name="command line">
  <Terminal />
</File>
```bash
git stash save coolstuff
```

List out all stashes:

<File name="command line">
  <Terminal />
</File>
```bash
git stash list
```

Apply a stash based on its index:

<File name="command line">
  <Terminal />
</File>
```bash
git stash apply 1
```
