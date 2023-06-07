import split from 'split2';
import through from 'through2';

let lineCount = 0;

process.stdin.pipe(split()).pipe(through(write, end));

function write(buf, enc, next) {
	console.log('line=', buf.toString());
	lineCount++;
	next();
}

function end(next) {
	console.log('lineCount=', lineCount);
	next();
}
