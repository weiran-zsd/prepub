import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `prepublish`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags,
	importMeta: import.meta
};

export default meow(helpText, options);
