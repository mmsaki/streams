import net from 'net';
import rpc from 'rpc-stream';

net
	.createServer(function (stream) {
		stream
			.pipe(
				rpc({
					hello: function (name, callback) {
						callback(null, 'howdy ' + name);
					},
				})
			)
			.pipe(stream);
	})
	.listen(5000);
