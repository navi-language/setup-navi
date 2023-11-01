import * as core from '@actions/core';
import { execSync } from 'child_process';
import * as cache from './cache';

export async function run() {
  try {
    let versionSpec = core.getInput('navi-version');
    if (versionSpec.startsWith('v')) {
      versionSpec = versionSpec.slice(1);
    }

    // check in the VMs cache first
    let toolPath: string = await cache.find(versionSpec);

    if (!toolPath) {
      if (versionSpec) {
        execSync(
          `curl -sSL https://navi-lang.org/install | sh -s -- v${versionSpec}`
        );
      } else {
        // download latest
        execSync('curl -L https://navi-lang.org/install | sh');
      }
    }

    core.addPath(toolPath);
  } catch (error) {
    // unhandled
    core.setFailed(error.message);
  }
}
