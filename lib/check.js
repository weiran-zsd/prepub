import filesChecker from './files-checker.js';

export default function (pkg, opts) {
	const problems = [];

	problems.push(...filesChecker.check(pkg, opts));
	return problems;
}
