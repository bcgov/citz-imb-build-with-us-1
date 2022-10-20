import { execSync } from 'child_process';

// Scan npm directory for vulnerabilities
export const audit = (directory) => {
  // Directory must be frontend or backend
  if (!(directory === 'frontend' || directory === 'backend')) return 0;

  // Run audit
  const output = execSync('npm audit -s', { cmd: directory, encoding: 'utf-8', stdio : 'pipe' });
  const vulnerabilities = output.split('found ')[1].split(' vulnerabilities')[0];

  // Return number of vulnerabilities
  return vulnerabilities;
}
