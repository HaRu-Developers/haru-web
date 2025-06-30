const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rawCommitMsgFilePath = process.argv[2];

console.log(`DEBUG: commit-msg hook: Raw commitMsgFilePath = "${rawCommitMsgFilePath}"`);

if (!rawCommitMsgFilePath) {
	console.error('Error: Commit message file path not provided to commit-msg hook.');
	process.exit(1);
}

const cleanedPath = rawCommitMsgFilePath.replace(/^{/, '').replace(/}$/, '');

const absoluteCommitMsgFilePath = path.join(process.cwd(), cleanedPath);

console.log(
	`DEBUG: commit-msg hook: Cleaned and Absolute commitMsgFilePath = "${absoluteCommitMsgFilePath}"`,
);

if (!fs.existsSync(absoluteCommitMsgFilePath)) {
	console.error(`Error: Final commit message file not found at ${absoluteCommitMsgFilePath}`);
	console.error(`(Original raw path: ${rawCommitMsgFilePath})`);
	process.exit(1);
}

try {
	execSync(`npx commitlint --edit "${absoluteCommitMsgFilePath}"`, {
		stdio: 'inherit',
	});
	console.log('Commit message linted successfully.');
} catch (error) {
	console.error('Commitlint failed:', error.message);
	process.exit(1);
}
