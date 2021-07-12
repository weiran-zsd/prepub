import filesChecker from './files-checker.js';

export default function (pkg, opts = {}) {
	opts.cwd = opts.cwd || process.cwd();

	const problems = [];

	problems.push(...filesChecker.check(pkg, opts));
	return problems;
}
