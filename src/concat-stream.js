import concat from 'concat-stream';
import through from 'through2';
import http from 'http';
import qs from 'querystring';

const count = (body) => {
	console.log(body.length);
};

const stdinStream = () => {
	return process.stdin.pipe(concat(count));
};

// stdinStream();

const server = http.createServer(function (req, res) {
	req.pipe(counter()).pipe(concat({ encoding: 'string' }, onBody));
	// counts number of bytes, stops if sent more than 20
	function counter() {
		var size = 0;
		return through(function (buf, enc, next) {
			size += buf.length;
			if (size > 20) {
				// next(null, null);
				res.end('Message too big\n');
			} else next(null, buf);
		});
	}

	function onBody(body) {
		const params = qs.parse(body);
		console.log(params);
		res.end('ok\n');
	}
});

server.listen(5000);
