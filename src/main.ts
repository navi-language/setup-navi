import * as core from '@actions/core';
import { exec } from '@actions/exec';
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
        await exec(
          'curl', [`-sSL https://navi-lang.org/install | sh -s -- v${versionSpec}`]
        );
      } else {
        // download latest
        await exec('curl', ['-L https://navi-lang.org/install | sh']);
      }
    }

    core.addPath(toolPath);
  } catch (error) {
    // unhandled
    core.setFailed(error.message);
  }
}
