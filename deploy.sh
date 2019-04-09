#!/usr/bin/env bash

rm -rf /tmp/treasure-hunt-dist

vue-cli-service build --dest /tmp/treasure-hunt-dist

cd /tmp/treasure-hunt-dist

git init
git remote add origin git@github.com:jaapmengers/treasure-hunt.git
git fetch
git checkout gh-pages
git pull

git add .

git commit -am "Deployment"
git push -u

