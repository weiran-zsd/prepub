/**
 * @fileoverview 检查 package.json 中的files/bin/main/module 是否存在
 * @author 唯然<weiran.zsd@outlook.com>
 */
import fs from 'fs';
import path from 'path';
import globby from 'globby';

function exsitsFile(filepath, cwd) {
	const fpath = cwd ? path.join(cwd, filepath) : filepath;
	return fs.existsSync(fpath) && fs.statSync(fpath).isFile();
}

function check(pkg, opts) {
	const problems = [];
	pkg.files &&
		pkg.files.forEach(pattern => {
			// skip patterns like "!foo"
			if (!pattern.startsWith('!')) {
				const matchedFiles = globby.sync(pattern, { cwd: opts.cwd });
				if (matchedFiles.length === 0) {
					problems.push({
						message: `❌ cannot found file "${pattern}"(pkg.files).`
					});
				}
			}
		});

	if (pkg.bin) {
		const bins =
			typeof pkg.bin === 'string'
				? [pkg.bin]
				: Object.keys(pkg.bin).map(it => pkg.bin[it]);
		bins.forEach(it => {
			!exsitsFile(it, opts.cwd) &&
				problems.push({
					message: `❌ cannot found file "${it}"(pkg.bin).`
				});
		});
	}

	if (pkg.main) {
		!exsitsFile(pkg.main, opts.cwd) &&
			problems.push({
				message: `❌ cannot found file "${pkg.main}"(pkg.main).`
			});
	}

	return problems;
}

export default {
	meta: {
		fix: false
	},
	check
};
