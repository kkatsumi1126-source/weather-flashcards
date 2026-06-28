#!/bin/bash

DIR="$(cd "$(dirname "$0")" && pwd)"
TOP_PAGE="$DIR/index.html"

open -a "Google Chrome" "$TOP_PAGE"
exit 0
