#!/bin/sh
# Script to render plantuml diagrams when file is changed
# Needs plantuml installed or change to plantuml jar
# Kill via htop or similar

file=$1
img="${file%.*}"

last_stat="$(stat -c%Y $file)"

while true; do
  sleep .5
  new_stat="$(stat -c%Y $file)"
  if [ "$last_stat" != "$new_stat" ]; then
    plantuml "$file"
    mimeopen "$img.png"
  fi
  last_stat="$new_stat"
done
