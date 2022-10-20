import { execSync } from 'child_process';
import { Log } from './utils/colors.mjs';
import pkg from '../package.json' assert { type: 'json' };

console.log(`${Log.fg.cyan}Welcome to Build With Us!${Log.reset}`);
console.log(`${Log.bright}${Log.fg.cyan}${pkg.title}${Log.reset}\n`);
console.log(`${Log.fg.cyan}Wait a few moments while we set everything up.${Log.reset}\n`);

// Install dependencies
console.log(`[1/2] ${Log.fg.magenta}Installing dependencies...${Log.reset}`);
execSync('npm i', { stdio : 'pipe' }); // Root
execSync('npm i', { cwd: 'frontend', stdio : 'pipe' }); // Frontend
execSync('npm i', { cwd: 'backend', stdio : 'pipe' }); // Backend

// Generate env files
console.log(`[2/2] ${Log.fg.magenta}Generating .env files...${Log.reset}\n`);
execSync('cp .env-template .env'); // Root
execSync('cp .env-template .env', { cwd: 'frontend' }); // Frontend
execSync('cp .env-template .env', { cwd: 'backend' }); // Backend

console.log(`${Log.fg.cyan}Finished!${Log.reset}\n`);
console.log(`${Log.fg.cyan}Run ${Log.reset}npm run help ${Log.fg.cyan}for a list of commands.${Log.reset}`);
console.log(`${Log.fg.cyan}Run ${Log.reset}npm run dev ${Log.fg.cyan}to launch the application.${Log.reset}`);
