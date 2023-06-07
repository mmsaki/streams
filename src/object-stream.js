import through from 'through2';

let size = 0;
process.stdin.pipe(through.obj(write)).pipe(through.obj(write2, end));

function write(buf, enc, next) {
	next(null, { length: buf.length, total: (size += buf.length) });
}

function write2(obj, enc, next) {
	console.log('obj=', obj);
	next();
}

function end() {
	console.log('size=', size);
}
