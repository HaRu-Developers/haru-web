/*
  이 파일은 원래 Gitmoji를 자동 추가하거나, formatting 하는 등
  commit message에 대한 변조를 진행하는 스크립트입니다.
  현재 저희는 활용하고 있지 않습니다. 단순히 trim만 진행하고 있습니다.
*/


const fs = require('fs');
// const path = require('path');

// lefthook.yml에서 node scripts/prepare-commit-msg.cjs {{1}} 실행한 것
const rawCommitMsgFilePath = process.argv[2];

const commitMsgFilePath = rawCommitMsgFilePath
  ? rawCommitMsgFilePath.replace(/^{/, '').replace(/}$/, '')
  : undefined;

if (!commitMsgFilePath) {
  console.error('❌ Error: Commit message file path was not provided. 📝');
  process.exit(1);
}

try {
  if (!fs.existsSync(commitMsgFilePath)) {
    console.error(`❌ Error: Commit message file not found at ${commitMsgFilePath} 😢`);
    console.error(`📄 Original raw path: ${rawCommitMsgFilePath})`);
    process.exit(1);
  }

  let commitMessage = fs.readFileSync(commitMsgFilePath, 'utf8').trim();

  fs.writeFileSync(commitMsgFilePath, commitMessage.trim(), 'utf8');
  console.log('✅✨ Commit message prefix handled successfully! 🎉');
} catch (error) {
  console.error('❌😱 Failed to modify commit message:', error);
  process.exit(1);
}

/*
  const gitmojiEmojis = [
    '✨',
    '🔨',
    '♻️',
    '🐛',
    '🚑️',
    '💄',
    '🎨',
    '🔧',
    '✏️',
    '📝',
    '💬',
    '📦️',
    '🔥',
    '🍻',
    '✅',
    '⚡️',
    '💚',
    '🌐',
    '🚀',
    '🔒️',
    '⬆️',
    '⬇️',
    '🚧',
    '💡',
    '🤔',
    '👷',
    '🩹',
  ];
  const allowedTypesRegexPart = [
    'Feat',
    'Fix',
    'Refactor',
    'Bug',
    'Hotfix',
    'Ui',
    'Style',
    'Config',
    'Typo',
    'Docs',
    'Comment',
    'Package',
    'Remove',
    'Chore',
    'Test',
    'Build',
    'Ci',
    'Perf',
    'Revert',
  ].join('|');

  const regexPattern = new RegExp(
    `^(${gitmojiEmojis.join('|')})\\s(${allowedTypesRegexPart})(?:\\((.*)\\))?!?: (.*)$`,
  );
*/