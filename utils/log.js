import alert from 'cli-alerts';

export function success(msg) {
	alert({
		type: 'success',
		msg: `${msg}`
	});
}

export function info(msg) {
	alert({
		type: `info`,
		msg: `${msg}`
	});
}

export function warn(msg) {
	alert({
		type: `warning`,
		msg: `${msg}`
	});
}

export function error(msg) {
	alert({
		type: 'error',
		msg: `${msg}`
	});
}
