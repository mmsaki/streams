import net from 'net';
import crypto from 'crypto';
import pump from 'pump';

const VPN_PORT = 5005;
const PROXY_PORT = 5000;

const algorithm = 'aes-256-cbc';
const sharedSecret = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);

net
	.createServer(function (stream) {
		pump(
			stream,
			crypto.createDecipheriv(algorithm, sharedSecret, initVector),
			net.connect(PROXY_PORT, 'localhost'),
			crypto.createCipheriv(algorithm, sharedSecret, initVector),
			stream,
			function (err) {
				console.error(err);
			}
		);
	})
	.listen(VPN_PORT);

console.log(`VPN server running on port localhost${VPN_PORT}`);
