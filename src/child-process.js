import { spawn } from 'child_process';
const ps = spawn('grep', ['potato']);

ps.stdout.pipe(process.stdout);
ps.stdin.write('cheese\n');
ps.stdin.write('carrots\n');
ps.stdin.write('carrot potato\n');
ps.stdin.write('potato!\n');
ps.stdin.end();
