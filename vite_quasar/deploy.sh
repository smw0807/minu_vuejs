#!/usr/bin/env/ sh

#에러 발생시 스크립트 실행 중지
set -e

#앱 빌드
npm run build

#빌드된 파일이 존재하는 dist 디렉터리로 이동
cd dist

git init
# git checkout -b main
# git branch -M main
git add -A
git commit -m 'deploy'

#배포
#git push -f git@github.com:smw0807/smw0807.github.io.git main
git push -f git@github.com:smw0807/vite_vue3.github.io.git main
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

cd -

