#!/bin/bash

SOURCE_PATH="./content/lessons"

for dir in "$SOURCE_PATH"/*/ do
  dir_name=$(basename "$dir")

  if [ -d "$dir/img" ]
  then
    rm -r "$dir/img"
  else
    echo "Skipping directory '$dir_name': 'img' directory not found"
  fi
done
