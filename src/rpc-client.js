import net from 'net';
import rpc from 'rpc-stream';

const client = rpc();

client.pipe(net.connect(5000, 'localhost')).pipe(client);

const remote = client.wrap(['hello']);

remote.hello(process.env.USER, function (err, msg) {
	if (err) return console.error(err);
	console.log(msg);
	client.end();
});
