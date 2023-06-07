import http from 'http';
import ecstatic from 'ecstatic';
import wsock from 'websocket-stream';
import through from 'through2';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('..', import.meta.url));

const server = http.createServer(ecstatic(__dirname + '/public/'));
server.listen(5000);
console.log(`Server running on http://localhost:5000`);

wsock.createServer({ server: server }, function (stream) {
	// `stream` is a duplex stream
	stream.pipe(upper()).pipe(stream);
});

function upper() {
	return through(function (buf, enc, next) {
		next(null, buf.toString().toUpperCase());
	});
}
