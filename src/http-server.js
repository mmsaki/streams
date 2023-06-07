import http from 'http';
import fs from 'fs';

const server = http.createServer(function (req, res) {
	if (req.method == 'POST') {
		req.pipe(process.stdout);
		req.once('end', function () {
			res.end('ok\n');
		});
	} else {
		res.setHeader('content-type', 'text/plain');
		fs.createReadStream('greets.txt').pipe(res);
	}
});

server.listen(3000);
