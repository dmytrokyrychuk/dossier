#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rm -r "$DIR"/dist
npm run build --browser=all
cd "$DIR"/dist/chrome || exit
zip -r "$DIR"/dist/chrome.zip ./*
