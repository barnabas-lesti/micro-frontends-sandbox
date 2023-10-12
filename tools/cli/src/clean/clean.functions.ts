import { execSync } from 'child_process';
import * as fs from 'fs';

import { CONFIG_FILE_PATH, REMOTE_RUNNER_COMMAND } from './clean.const';

export function runClean(): void {
  try {
    const files: string[] = [];
    const globs: string[] = [];

    fs.readFileSync(CONFIG_FILE_PATH, 'utf8')
      .split('\n')
      .map((entry) => entry.replace('\r', ''))
      .filter((entry) => !!entry)
      .forEach((entry) => (entry.startsWith('**') ? globs : files).push(entry));

    const filesArgumentString = files.length > 0 ? ' ' + files.join(' ') : '';
    const globArgumentString = globs.length > 0 ? '--glob ' + globs.join(' ') : '';

    if (!filesArgumentString && !globArgumentString) {
      console.log(`No entries found in the "${CONFIG_FILE_PATH}" file, exiting command.`);
      return;
    }

    const cleanCommand = `${REMOTE_RUNNER_COMMAND} rimraf${filesArgumentString} ${globArgumentString}`;
    console.log(cleanCommand);

    execSync(cleanCommand, { stdio: 'inherit' });
  } catch (error) {
    console.log(`"${CONFIG_FILE_PATH}" file missing, exiting command.`);
  }
}
