import { exec } from 'child_process';
import { Log } from './utils/colors.mjs';

// Command line argument
const mode = process.argv.slice(2)[0] === 'prod'
  ? 'production' 
  : 'development';

console.log(`${Log.fg.magenta}Running application in ${mode} mode...${Log.reset}`);

// Run application
const dockerCmd = mode === 'production' 
  ? 'docker compose -f docker-compose.yaml up --build' // Production mode
  : 'docker compose up --build' // Development mode
const child = exec(dockerCmd);

// Listens for and logs output from child process
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
  console.log(data.trim());
});
