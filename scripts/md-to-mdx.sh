#!/bin/bash

SOURCE_PATH="./content/lessons"

for file in "$SOURCE_PATH"/*.md
do
  file_name=$(basename "${file%.*}")

  mv "$file" "$SOURCE_PATH/$file_name.mdx"
done
