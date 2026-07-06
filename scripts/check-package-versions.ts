import { execFile } from "node:child_process"
import { promisify } from "node:util"

import { packageVersions } from "../packages/catalog/src/package-versions"

const execFileAsync = promisify(execFile)

async function npmViewVersion(packageName: string): Promise<string> {
  const { stdout } = await execFileAsync("npm", ["view", packageName, "version"], {
    encoding: "utf8",
  })

  return stdout.trim()
}

async function main(): Promise<void> {
  const outdated: string[] = []

  for (const [packageName, policy] of Object.entries(packageVersions)) {
    const latestVersion = await npmViewVersion(packageName)

    if (latestVersion !== policy.version) {
      outdated.push(`${packageName}: catalog ${policy.version}, npm ${latestVersion}`)
    }
  }

  if (outdated.length === 0) {
    console.log(`All ${Object.keys(packageVersions).length} catalog package versions match npm.`)
    return
  }

  console.log("Catalog package versions differ from npm:")
  for (const entry of outdated) {
    console.log(`- ${entry}`)
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
