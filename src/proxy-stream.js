import net from 'net';

const PROXY_PORT = 5003;
const CLIENT_PORT = 5000;

net
	.createServer(function (stream) {
		stream.pipe(net.connect(CLIENT_PORT, 'localhost')).pipe(stream);
	})
	.listen(PROXY_PORT);

console.log(`proxy running on localhost:${PROXY_PORT}`);
