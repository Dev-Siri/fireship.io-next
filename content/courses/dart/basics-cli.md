---
title: Dart CLI
description: Run and compile Dart programs from the command line
weight: 12
lastmod: 2021-10-08T11:11:30-09:00
draft: false
vimeo: 629642700
emoji: 🔨
video_length: 3:02
---

## Create a New Dart Project

Learn about the available commands and how to use them.

<File name="command line">
  <Terminal />
</File>
```bash
dart --help
```

Create a new project.

<File name="command line">
  <Terminal />
</File>
```bash
dart create -t console-simple my_app

# OR use the current directory (if it's empty)

dart create -t console-simple . --force

````

Run the application.

<File name="command line">
  <Terminal />
</File>
```bash
dart run
````

## Compile Dart Code

Compile dart code to an executable.

<File name="command line">
  <Terminal />
</File>
```bash
dart compile exe bin/dart.dart
bin/dart.exe
```

Compile your code to JavaScript and run it with Node.js.

<File name="command line">
  <Terminal />
</File>
```bash
dart compile js bin/dart.dart
node out.js
```
