#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://anastl.github.io/React-Watchlist
git push -f git@github.com:anastl/React-Watchlist.git main:gh-pages

cd -
