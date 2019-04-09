#!/usr/bin/env bash

cd /tmp/treasure-hunt-dist

git init

git remote add origin git@github.com:jaapmengers/treasure-hunt.git

git checkout -b "gh-pages"

git add . 

git commit -am "New deployment"

git fetch

git branch -u origin/gh-pages

git pull --no-edit

git push -u

