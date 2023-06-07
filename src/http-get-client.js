import http from 'http';

const req = http.request(
	{ method: 'GET', host: 'localhost', port: 3000, url: '/' },
	function (res) {
		console.log(res.statusCode);
		res.pipe(process.stdout);
	}
);
req.end();
