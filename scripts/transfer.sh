#!/bin/bash

SOURCE_PATH="./content/lessons"
DEST_PATH="./public/img/content/lessons"

for dir in "$SOURCE_PATH"/*/ do
  dir_name=$(basename "$dir")

  mkdir -p "$DEST_PATH/$dir_name"

  cp "$dir/img/"* "$DEST_PATH/$dir_name/"
done
