import fs from 'fs';
import { Transform } from 'readable-stream';
const input = process.argv[2];

function toUpper() {
	return new Transform({
		transform: function (buf, enc, next) {
			next(null, buf.toString().toUpperCase());
		},
	});
}

function stdinPipe() {
	return process.stdin.pipe(toUpper()).pipe(process.stdout);
}

stdinPipe();

export default { stdinPipe };
