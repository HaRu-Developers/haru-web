# 현재 의미가 없어 사용하지 않습니다만, 기록을 위해 남겨둡니다.

#!/bin/sh

# 스크립트 위치 기준으로 작업 디렉토리 변경 (haru-web으로 이동)
cd "$(dirname "$0")"
cd ../

# Vercel 배포 시 불필요한 빌드 산출물만 정리
rm -rf .DS_Store .next storybook-static

# output 디렉토리 초기화 (이미 존재하면 삭제 후 새로 생성)
rm -rf output
mkdir output

# 디렉토리의 모든 파일을 output 디렉토리로 복사
cp -R ./haru-web/* ./output/

# output 디렉토리의 내용을 다시 haru-web 복사
cp -R ./output/* ./haru-web/