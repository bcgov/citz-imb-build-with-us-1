import { exec } from 'child_process';
import { Log } from './utils/colors.mjs';

// Command line argument
const dir = process.argv.slice(2)[0];

console.log(`${Log.fg.magenta}Reinstalling dependencies in ${dir}...${Log.reset}`);

// Reinstall dependencies
const clean = () => {
  const rmNodeModules = exec(`rm -rf ${dir}/node_modules`);
  const install = exec('npm i', { cwd: dir });

  // Listens for and logs output from install process
  install.stdout.setEncoding('utf8');
  install.stdout.on('data', function(data) {
    console.log(data.trim());
  });

  const payload = { rmNodeModules, install };
  return payload;
}

clean();
