import { exec } from 'child_process';
import { Log } from './utils/colors.mjs';

console.log(`${Log.fg.magenta}Removing docker containers and volumes...${Log.reset}`);

const child = exec('docker compose down -v');

// Listens for and logs output from child process
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
  console.log(data.trim());
});
