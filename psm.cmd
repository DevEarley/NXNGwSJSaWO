echo off
git submodule foreach "git add . || :"
git submodule foreach "git commit -m \"%*\"  || :"
git submodule foreach "git push || :"

git add .
git commit -m "%*"
git push