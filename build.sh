#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

REPO_URL=git@gitlab.com:alejandro.cepeda/heart-online-front.git 


cd dist
git init
git remote add origin $REPO_URL
git add .
git commit -m "deploy"
git push -f origin master:dist

cd -