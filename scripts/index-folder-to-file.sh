#!/bin/bash

for dir in "$1"/*/ do
  dir_name=$(basename "$dir")

  if [ -f "$dir/index.md" ]
  then
    mv "$dir/index.md" "$SOURCE_PATH/$dir_name.md"
    rm -r "$dir"
  else
    echo "Skipping directory '$dir_name': 'index.md' file not found"
  fi
done
