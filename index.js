#!/usr/bin/env node

/**
 * prepublish
 * A tool to help finding potential problems before publish.
 *
 * @author weiran <https://github.com/aladdin-add>
 */

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
})();
