import wsock from 'websocket-stream';

const stream = wsock('ws://localhost:5000');
process.stdin.pipe(stream).pipe(process.stdout);
