#!/bin/sh

# 스크립트 위치 기준으로 작업 디렉토리 변경 (haru-web로 이동)
cd "$(dirname "$0")"

# 상위 디렉토리로 이동 (frontend 레포지토리 루트로 이동)
cd ../

# output 디렉토리 초기화 (이미 존재하면 삭제 후 새로 생성)
rm -rf output
mkdir output
 디렉토리의 모든 파일을 output 디렉토리로 복사
cp -R ./haru-web/* ./output/

# output 디렉토리의 내용을 다시 haru-web 복사
cp -R ./output/* ./haru-web/

