#!/usr/bin/env node

/**
 * prepublish
 * A tool to help finding potential problems before publish.
 *
 * @author weiran <https://github.com/aladdin-add>
 */

import fs from 'fs';
import path from 'path';
import check from './lib/check.js';
import cli from './utils/cli.js';
import { error, success } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;

flags.cwd = flags.cwd || process.cwd();

(async () => {
	input.includes(`help`) && cli.showHelp(0);

	const pkgContent = fs.readFileSync(
		path.join(flags.cwd, './package.json'),
		'utf-8'
	);
	const pkg = JSON.parse(pkgContent);

	const problems = check(pkg, flags);
	problems.length
		? problems.forEach(problem => error(problem.message))
		: success('awesome! no problems found!🎉🎉🎉');
	process.exitCode = problems.length;
})();
