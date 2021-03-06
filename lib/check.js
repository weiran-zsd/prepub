/**
 * @fileoverview 检查 package.json 中的files/bin/main/module 是否存在
 * @author 唯然<weiran.zsd@outlook.com>
 */
import fs from 'fs';
import path from 'path';
import globby from 'globby';
import sh from 'shelljs';

export function check(pkg, opts) {
	const problems = [];

	checkPublic();
	checkBranch();
	checkMain();
	checkBin();
	checkFiles();
	checkRepo();
	checkLisence();

	return problems;

	function checkPublic() {
		if (pkg.private === true) {
			problems.push({
				message: `it is not allowed to publish a private package(pkg.private=true).`
			});
		}
	}

	// check current branch
	function checkBranch() {
		const defaultBranch = getDefaultBranch();
		const currentBranch = getCurrentBranch();
		if (currentBranch !== defaultBranch) {
			problems.push({
				message: `not allowed to publish on non-default branch ${currentBranch}`
			});
		}
	}

	// check "files" in package.json
	function checkFiles() {
		pkg.files &&
			pkg.files.forEach(pattern => {
				// skip patterns like "!foo"
				if (!pattern.startsWith('!')) {
					const matchedFiles = globby.sync(pattern, {
						cwd: opts.cwd
					});
					if (matchedFiles.length === 0) {
						problems.push({
							message: `cannot found file "${pattern}"(pkg.files).`
						});
					}
				}
			});
	}

	// check "bin" in package.json
	function checkBin() {
		if (pkg.bin) {
			const bins =
				typeof pkg.bin === 'string'
					? [pkg.bin]
					: Object.keys(pkg.bin).map(it => pkg.bin[it]);
			bins.forEach(it => {
				!exsitsFile(it, opts.cwd) &&
					problems.push({
						message: `cannot found file "${it}"(pkg.bin).`
					});
			});
		}
	}

	// check "main" in package.json
	function checkMain() {
		if (pkg.main) {
			!exsitsFile(pkg.main, opts.cwd) &&
				problems.push({
					message: `cannot found file "${pkg.main}"(pkg.main).`
				});
		}
	}

	// check "repository" in package.json
	function checkRepo() {
		if (!pkg.repository) {
			problems.push({
				message: `cannot found "repository" in package.json.`
			});
		}
	}

	// check "license" in package.json
	function checkLisence() {
		if (!pkg.license) {
			problems.push({
				message: 'cannot found "license" in package.json.'
			});
		}
	}
}

// https://stackoverflow.com/questions/28666357/git-how-to-get-default-branch
function getDefaultBranch() {
	sh.exec(`git remote set-head origin --auto`, { silent: true });
	const branchCmd = `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'`;
	const result = sh.exec(branchCmd, { silent: true });
	return result.stdout;
}

function getCurrentBranch() {
	const result = sh.exec(`git rev-parse --abbrev-ref HEAD`, { silent: true });
	return result.stdout;
}

function exsitsFile(filepath, cwd) {
	const fpath = cwd ? path.join(cwd, filepath) : filepath;
	return fs.existsSync(fpath) && fs.statSync(fpath).isFile();
}
