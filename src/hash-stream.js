import { createHash } from 'crypto';

process.stdin
	.pipe(createHash('sha256', { encoding: 'hex' }))
	.pipe(process.stdout);
