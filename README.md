### Git Setup
  git init
  git add .
  git commit -m "first commit"
  git branch -M main
  git remote add origin https://github.com/jailogix1983/HastakshepFrontend.git
  git push -u origin main

### How to create branch
git checkout main.
git pull origin main
git checkout -b sonu/implement-home-page

### How to push
git add .
git commit -m"your proper message what you have done"
git pull origin main
git push origin sonu/implement-home-page

### How to pull
git add .
git commit -m"your proper message what you have done"
git pull origin main

### How to change branch
git add .
git commit -m"your proper message what you have done"
git checkout [branch-name]

### Note
- Don't make any change in main branch.
- Before create any branch go to main branch & pull
- if any have push our code then the time of push, take pull first then push 