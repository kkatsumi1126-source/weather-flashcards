#!/bin/bash

cd "$(dirname "$0")" || exit 1

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ -x "$CHROME" ]; then
  "$CHROME" --new-window "index.html" >/dev/null 2>&1 &
else
  open "index.html"
fi

sleep 1
exit 0
