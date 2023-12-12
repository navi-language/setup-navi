import * as core from "@actions/core";
import { execSync } from "child_process";

export async function run() {
  try {
    let versionSpec = core.getInput("navi-version");
    if (!versionSpec.startsWith("v")) {
      // 1.0 -> v1.0
      if (versionSpec.match(/\d+\./)) {
        versionSpec = `v${versionSpec}`;
      }
    }

    // check in the VMs cache first
    if (versionSpec) {
      execSync(
        `curl -sSL https://navi-lang.org/install | bash -s -- ${versionSpec}`
      );
    } else {
      // download latest
      execSync("curl -L https://navi-lang.org/install | bash");
    }

    let toolPath = `${process.env.HOME}/.navi`;
    core.addPath(toolPath);
    execSync(`navi -V`);
  } catch (error) {
    // unhandled
    core.setFailed(error.message);
  }
}
