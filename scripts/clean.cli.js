const fs = require('fs');
const { execSync } = require('child_process');

try {
  const files = [];
  const globs = [];

  fs.readFileSync('.clean', 'utf8')
    .split('\n')
    .map((entry) => entry.replace('\r', ''))
    .filter((entry) => !!entry)
    .forEach((entry) => (entry.startsWith('**') ? globs : files).push(entry));

  const filesArgumentString = files.length > 0 ? ' ' + files.join(' ') : '';
  const globArgumentString = globs.length > 0 ? '--glob ' + globs.join(' ') : '';

  if (!filesArgumentString && !globArgumentString) {
    console.log('No entries found in the ".clean" file, exiting command.');
    return;
  }

  const cleanCommand = `pnpm dlx rimraf${filesArgumentString} ${globArgumentString}`;
  console.log(cleanCommand);

  execSync(cleanCommand, { stdio: 'inherit' });
} catch (error) {
  console.log('".clean" file missing, exiting command.');
}
