const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rawCommitMsgFilePath = process.argv[2];

console.log(`🔍 ========================================`);
console.log(`🔧 DEBUG: Raw commit message file path`);
console.log(`📄 Path: "${rawCommitMsgFilePath}"`);
console.log(`🔍 ========================================`);

if (!rawCommitMsgFilePath) {
  console.error('❌ ========================================');
  console.error('🚫 Error: Commit message file path not provided');
  console.error('💡 This script expects a file path as argument');
  console.error('❌ ========================================');
  process.exit(1);
}

const cleanedPath = rawCommitMsgFilePath.replace(/^{/, '').replace(/}$/, '');
const absoluteCommitMsgFilePath = path.join(process.cwd(), cleanedPath);

console.log(`🧹 ========================================`);
console.log(`✨ Processing commit message file path`);
console.log(`📁 Cleaned path: "${cleanedPath}"`);
console.log(`📍 Absolute path: "${absoluteCommitMsgFilePath}"`);
console.log(`🧹 ========================================`);

if (!fs.existsSync(absoluteCommitMsgFilePath)) {
  console.error(`❌ ========================================`);
  console.error(`🔍 Error: Commit message file not found`);
  console.error(`📂 Expected at: ${absoluteCommitMsgFilePath}`);
  console.error(`📝 Original path: ${rawCommitMsgFilePath}`);
  console.error(`💡 Please check if the file exists`);
  console.error(`❌ ========================================`);
  process.exit(1);
}

try {
  console.log(`🚀 ========================================`);
  console.log(`📋 Running commitlint validation...`);
  console.log(`🔍 Checking commit message format`);
  console.log(`🚀 ========================================`);

  execSync(`npx commitlint --edit "${absoluteCommitMsgFilePath}"`, {
    stdio: 'inherit',
  });

  console.log(`✅ ========================================`);
  console.log(`🎉 Commit message validation successful!`);
  console.log(`📝 Your commit message follows the rules`);
  console.log(`✅ ========================================`);
} catch (error) {
  console.error(`❌ ========================================`);
  console.error(`🚫 Commitlint validation failed!`);
  console.error(`📋 Error details: ${error.message}`);
  console.error(`💡 Please check your commit message format`);
  console.error(`📚 Expected format: type(scope): description`);
  console.error(`🔗 Examples: feat: add login, fix: resolve bug`);
  console.error(`❌ ========================================`);
  process.exit(1);
}