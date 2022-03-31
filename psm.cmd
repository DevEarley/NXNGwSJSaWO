echo off
git submodule foreach git add .
git submodule foreach git commit -m "From Root: %*"
git submodule foreach git push
start "" cnp.cmd %*