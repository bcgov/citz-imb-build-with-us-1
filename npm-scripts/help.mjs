import { Log } from './utils/colors.mjs';
import { audit } from './utils/audit.mjs';
import * as dotenv from 'dotenv'; dotenv.config();
import pkg from '../package.json' assert { type: 'json' };
import frontendPkg from '../frontend/package.json' assert { type: 'json' };
import backendPkg from '../backend/package.json' assert { type: 'json' };

// Frontend info
const frontendDependencies = Object.keys(frontendPkg.dependencies).length;
const frontendDevDependencies = Object.keys(frontendPkg.devDependencies).length;
const frontendVulnerabilities = audit('frontend');

// Backend info
const backendDependencies = Object.keys(backendPkg.dependencies).length;
const backendDevDependencies = Object.keys(backendPkg.devDependencies).length;
const backendVulnerabilities = audit('backend');

// Project title
const title = `${Log.fg.cyan}Build With Us!${Log.reset}
${Log.bright}${Log.fg.cyan}${pkg.title}${Log.reset}\n`;

// Version numbers, number of dependencies, number of vulnerabilities
const app = 
`${Log.bright}${Log.fg.yellow}Application Info:${Log.reset}
${Log.fg.cyan}Project -${Log.reset} ${pkg.version} ${Log.fg.cyan}package version
${Log.fg.cyan}Frontend -${Log.reset} ${frontendPkg.version} ${Log.fg.cyan}package version, ${Log.reset}${frontendDependencies}${Log.fg.cyan} dependencies, ${Log.reset}${frontendDevDependencies}${Log.fg.cyan} devDependencies, ${Log.reset}${frontendVulnerabilities}${Log.fg.cyan} vulnerabilities ${Log.reset}
${Log.fg.cyan}Backend -${Log.reset} ${backendPkg.version} ${Log.fg.cyan}package version, ${Log.reset}${backendDependencies}${Log.fg.cyan} dependencies, ${Log.reset}${backendDevDependencies}${Log.fg.cyan} devDependencies, ${Log.reset}${backendVulnerabilities}${Log.fg.cyan} vulnerabilities ${Log.reset}\n`;

// Project resources
const resources = 
`${Log.bright}${Log.fg.yellow}Project Resources:${Log.reset}
${Log.fg.cyan}Repo -${Log.bright}${Log.fg.cyan} ${pkg.homepage} ${Log.reset}
${Log.fg.cyan}Frontend App -${Log.bright}${Log.fg.cyan} http://localhost:${process.env.FRONTEND_PORT ?? 8081} ${Log.reset}
${Log.fg.cyan}API Documentation -${Log.bright}${Log.fg.cyan} http://localhost:${process.env.API_PORT ?? 3000}/api ${Log.reset}\n`;

// Documentation resources
const docResources = 
`${Log.bright}${Log.fg.yellow}Documentation Resources:${Log.reset}
${Log.fg.cyan}NestJS (Backend) -${Log.bright}${Log.fg.cyan} https://docs.nestjs.com/ ${Log.reset}
${Log.fg.cyan}React (Frontend) -${Log.bright}${Log.fg.cyan} https://reactjs.org/docs/react-api.html ${Log.reset}
${Log.fg.cyan}TypeScript -${Log.bright}${Log.fg.cyan} https://www.typescriptlang.org/docs/ ${Log.reset}\n`;

// Available commands
const commands = 
`${Log.bright}${Log.fg.yellow}Commands:${Log.reset}
${Log.fg.cyan}Run ${Log.reset}npm run dev ${Log.fg.cyan}to start the application in development mode.${Log.reset}
${Log.fg.cyan}Run ${Log.reset}npm run prod ${Log.fg.cyan}to start the application in production mode.${Log.reset}
${Log.fg.cyan}Run ${Log.reset}npm run down ${Log.fg.cyan}to remove docker containers and volumes.${Log.reset}
${Log.fg.cyan}Run ${Log.reset}npm run clean ${Log.fg.cyan}to reinstall frontend and backend dependencies.${Log.reset}
${Log.fg.cyan}Run ${Log.reset}npm run clean:f ${Log.fg.cyan}to reinstall frontend dependencies.${Log.reset}
${Log.fg.cyan}Run ${Log.reset}npm run clean:b ${Log.fg.cyan}to reinstall backend dependencies.`;

// Output help command
console.log(title);
console.log(app);
console.log(resources);
console.log(docResources);
console.log(commands);
