import duplexify from 'duplexify';
import mkdirp from 'mkdirp';
import { createWriteStream } from 'fs';

export const log = (name) => {
	const d = duplexify();
	mkdirp('logs', function (err) {
		const w = createWriteStream('logs/' + name + '.log');
		d.setWritable(w);
	});
	return d;
};
