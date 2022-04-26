set -e

# 进入生成的文件夹
cd dist
echo 'youky.top' > CNAME
# 发布到github
git init
git remote add origin git@github.com:Youky1/youth-values.git
git add .
git commit -m 'deploy'

git checkout -b gh-page
git push -f origin gh-page

cd -