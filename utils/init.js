import welcome from 'cli-welcome';
import fs from 'fs'
import unhandled from 'cli-handle-unhandled';

const pkgUrl = new URL("../package.json", import.meta.url)
const pkg = JSON.parse(fs.readFileSync(pkgUrl, "utf8"));

export default async function ({ clear = true }) {
	unhandled();
	welcome({
		title: `prepublish`,
		tagLine: `by weiran`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
}
