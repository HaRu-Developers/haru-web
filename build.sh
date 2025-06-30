#!/bin/sh

# 스크립트 위치 기준으로 작업 디렉토리 변경 (haru-web으로 이동)
cd "$(dirname "$0")"
cd ../

# Vercel 배포 시 불필요한 빌드 산출물만 정리
rm -rf .DS_Store .next storybook-static
