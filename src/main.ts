import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as cache from './cache';

export async function run() {
  try {
    let versionSpec = core.getInput('navi-version', { required: true });

    // check in the VMs cache first
    let toolPath: string = await cache.find(versionSpec);

    if (!toolPath) {
      await tc.downloadTool('https://navi-lang.org/install');
    }

    core.addPath(toolPath);
  } catch (error) {
    // unhandled
    core.setFailed(error.message);
  }
}
