// echo server
import net from 'net';

net
	.createServer(function (stream) {
		stream.pipe(stream);
	})
	.listen(5000);
