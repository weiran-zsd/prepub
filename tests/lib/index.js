import fs from 'fs';
import globby from 'globby';
import check from '../../lib/check.js';
import { success, error } from '../../utils/log.js';
import { createRequire } from 'module';

process.exitCode = 0;

const shouldUpdate = process.argv.includes('--update');
const fixturesPath = new URL('../fixtures/*', import.meta.url);
const require = createRequire(import.meta.url);
const pkgs = globby.sync(fixturesPath.pathname, { onlyDirectories: true });

pkgs.map(pkgPath => {
	const resultPath = pkgPath + '/result.md';
	const pkg = require(pkgPath + '/package.json');
	const problems = check(pkg, { cwd: pkgPath });
	const result = problems2md(problems);

	if (shouldUpdate) {
		fs.writeFileSync(resultPath, result, 'utf-8');
	} else {
		const $result = fs.readFileSync(resultPath, 'utf-8');
		if (result !== $result) {
			error(`the result of file ${pkgPath} has changed!`);
			process.exitCode += 1;
		}
	}
});

if (process.exitCode === 0) success('all the tests passed.');

function problems2md(problems) {
	let md = '```txt\n';
	problems.forEach(it => (md += it.message + '\n'));
	md += '```';
	return md;
}
