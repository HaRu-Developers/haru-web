const fs = require('fs');
// const path = require('path');

const rawCommitMsgFilePath = process.argv[2];
const commitMsgFilePath = rawCommitMsgFilePath
  ? rawCommitMsgFilePath.replace(/^{/, '').replace(/}$/, '')
  : undefined;

if (!commitMsgFilePath) {
  console.error('Error: Commit message file path not provided.');
  process.exit(1);
}

try {
  if (!fs.existsSync(commitMsgFilePath)) {
    console.error(`Error: Commit message file not found at ${commitMsgFilePath}`);
    console.error(`(Original raw path: ${rawCommitMsgFilePath})`);
    process.exit(1);
  }

  let commitMessage = fs.readFileSync(commitMsgFilePath, 'utf8').trim();
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

  fs.writeFileSync(commitMsgFilePath, commitMessage.trim(), 'utf8');
  console.log('Commit message prefix handled successfully.');
} catch (error) {
  console.error('Failed to modify commit message:', error);
  process.exit(1);
}
