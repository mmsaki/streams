import net from 'net';
import crypto from 'crypto';

const VPN_PORT = 5005;
const algorithm = 'aes-256-cbc';
const sharedSecret = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);

const stream = net.connect(VPN_PORT, 'localhost');

process.stdin
	.pipe(crypto.createCipheriv(algorithm, sharedSecret, initVector))
	.pipe(stream)
	.pipe(crypto.createDecipheriv(algorithm, sharedSecret, initVector))
	.pipe(process.stdout);
