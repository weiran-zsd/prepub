#!/usr/bin/env node

/**
 * prepublish
 * A tool to help finding potential problems before publish.
 *
 * @author weiran <https://github.com/aladdin-add>
 */

import check from './lib/check.js';
import cli from './utils/cli.js';
import { error, success } from './utils/log.js';

const input = cli.input;
const flags = cli.flags; // eslint-disable-line no-unused-vars

(async () => {
	input.includes(`help`) && cli.showHelp(0);
	const problems = check({});
	problems.length
		? problems.forEach(problem => error(problem.message))
		: success('awesome! no problems found!🎉🎉🎉');
	process.exitCode = problems.length;
})();
