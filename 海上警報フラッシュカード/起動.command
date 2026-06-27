#!/bin/bash

# この起動.command が置かれているフォルダに移動
cd "$(dirname "$0")" || exit 1

# index.html をChromeで開く
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ -x "$CHROME" ]; then
  "$CHROME" --new-window "index.html" >/dev/null 2>&1 &
else
  open "index.html"
fi

# 少し待ってから終了
sleep 1
exit 0
