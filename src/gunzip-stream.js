import { createGunzip } from 'zlib';
import { createHash } from 'crypto';

process.stdin
	.pipe(createGunzip())
	.pipe(createHash('sha512', { encoding: 'hex' }))
	.pipe(process.stdout);
