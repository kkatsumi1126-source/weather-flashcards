#!/bin/bash

# この起動.command が置かれているフォルダに移動
cd "$(dirname "$0")"

# index.html を既定のブラウザで開く
open "index.html"

# 少し待ってから終了
sleep 1
exit 0
