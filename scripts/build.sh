echo "🔨 ========================================="
echo "🚀 Starting build process..."
echo "🔨 ========================================="

# 현재 위치 확인
echo "📍 Current directory: $(pwd)"
echo "📁 Directory contents:"
ls -la

# output 디렉토리 초기화
echo "🧹 Cleaning output directory..."
rm -rf output
mkdir -p output

echo "📦 ========================================="
echo "📋 Copying files to output directory..."
echo "📦 ========================================="

# 프로젝트의 모든 파일을 output으로 복사 (불필요한 파일 제외)
rsync -av --progress \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='storybook-static' \
  --exclude='.DS_Store' \
  --exclude='output' \
  ./ ./output/

echo "✅ ========================================="
echo "🎉 Build completed successfully!"
echo "📊 Output directory contents:"
ls -la output/ | head -20
echo "📏 Output directory size: $(du -sh output/)"
echo "✅ ========================================="