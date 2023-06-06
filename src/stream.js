import { createReadStream } from 'fs';
import through from 'through2';
const input = process.argv[2];

function rawFileContents() {
	return createReadStream(input).pipe(process.stdout);
}

function modifiedFileContentPipe() {
	return createReadStream(input).pipe(through(toUpper)).pipe(process.stdout);
}

function toUpper(buf, enc, next) {
	next(null, buf.toString().toUpperCase());
}

function stdinPipe() {
	return process.stdin.pipe(through(toUpper)).pipe(process.stdout);
}

modifiedFileContentPipe();
// rawFileContents();
// stdinPipe();

export default { rawFileContents };
