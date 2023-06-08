import net from 'net';
import multiplex from 'multiplex';
import rpc from 'rpc-stream';
import fs from 'fs';

net
	.createServer(function (stream) {
		const plex = multiplex();
		stream.pipe(plex).pipe(stream);
		const client = rpc({
			read: function (name, cb) {
				if (!/^[\w-]+$/.test(name)) {
					return cb(new Error('file not allowed'));
				}

				const r = fs.createReadStream('files/' + name);
				r.on('error', cb);
				r.pipe(plex.createStream('file-' + name));
				cb(null);
			},
		});
		client.pipe(plex.createSharedStream('rpc')).pipe(client);
	})
	.listen(5000);
