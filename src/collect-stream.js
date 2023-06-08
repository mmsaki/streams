import collect from 'collect-stream';
import split from 'split2';

const sp = process.stdin.pipe(split(JSON.parse)).pipe(process.stdout);
collect(sp, { encoding: 'object' }, function (err, rows) {
	if (err) console.error(err);
	else console.log(rows.toString());
});
