import net from 'net';
import crypto from 'crypto';

const VPN_PORT = 5005;
const PROXY_PORT = 5000;

const algorithm = 'aes-256-cbc';
const sharedSecret = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);

net
	.createServer(function (stream) {
		stream
			.pipe(crypto.createDecipheriv(algorithm, sharedSecret, initVector))
			.pipe(net.connect(PROXY_PORT, 'localhost'))
			.pipe(crypto.createCipheriv(algorithm, sharedSecret, initVector))
			.pipe(stream);
	})
	.listen(VPN_PORT);

console.log(`VPN server running on port localhost${VPN_PORT}`);
