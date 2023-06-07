import net from 'net';

const PORT = 5000;

net
	.createServer(function (stream) {
		stream.pipe(stream);
	})
	.listen(5000);

console.log(`echo server on localhost:${PORT}`);
