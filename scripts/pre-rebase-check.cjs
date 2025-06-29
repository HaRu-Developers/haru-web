const { execSync } = require('child_process');

try {
	const branch = execSync('git symbolic-ref --short HEAD').toString().trim();
	if (['main', 'release'].includes(branch)) {
		console.error(`🚫 [${branch}] 브랜치에서는 rebase를 허용하지 않습니다.`);
		process.exit(1);
	}

	const diff = execSync('git diff --name-only').toString().trim();
	if (diff) {
		console.error('⚠️ 변경사항이 존재합니다. 커밋하거나 stash 해주세요.');
		process.exit(1);
	}

	process.exit(0);
} catch (err) {
	console.error('❌ pre-rebase 검사 중 오류 발생:', err.message);
	process.exit(1);
}
