import split from 'split2';
import through from 'through2';

let wordCount = 0;

process.stdin.pipe(split(/\s+/)).pipe(through(write, end));

function write(buf, enc, next) {
	console.log('word=', buf.toString());
	wordCount++;
	next();
}

function end(next) {
	console.log('wordCount=', wordCount);
	next();
}
