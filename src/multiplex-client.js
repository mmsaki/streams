import net from 'net';
import multiplex from 'multiplex';
import rpc from 'rpc-stream';

const plex = multiplex(function (stream, id) {
	if (/^file-/.test(id)) {
		console.log('RECEIVED FILE ' + id.replace(/^file-/, ''));
		stream.pipe(process.stdout);
	}
});
plex.pipe(net.connect(5000)).pipe(plex);

const client = rpc();
client.pipe(plex.createSharedStream('rpc')).pipe(client);

const remote = client.wrap(['read']);
remote.read(process.argv[2], function (err) {
	if (err) console.error(err);
});
