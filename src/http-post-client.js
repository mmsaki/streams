import http from 'http';

const req = http.request(
	{ method: 'POST', host: 'localhost', port: 3000, url: '/' },
	function (res) {
		console.log(res.statusCode);
		res.pipe(process.stdout);
	}
);
req.write('HELLO\n');
req.end();
