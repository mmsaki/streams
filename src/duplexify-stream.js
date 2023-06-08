import { log } from './duplexify-log'; // duplexify-log

const stream = log();
const n = 0;
const iv = setInterval(function () {
	stream.write(Date.now() + '\n');
	if (n++ === 5) {
		clearInterval(iv);
		stream.end();
	}
}, 100);
