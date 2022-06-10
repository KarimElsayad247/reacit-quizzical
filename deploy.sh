#!/usr/bin/env sh

# IMPORTANT
# Make sure to set the base property in vite.config.js

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

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:KarimElsayad247/react-quizzical.git main:gh-pages

cd -