import assert from "node:assert/strict"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import test from "node:test"

import { extractStoredZip, normalizeProjectName, parseArguments } from "../bin/create-ditto.js"

function storedZip(name, content) {
  const fileName = Buffer.from(name)
  const data = Buffer.from(content)
  const local = Buffer.alloc(30 + fileName.length)
  local.writeUInt32LE(0x04034b50, 0)
  local.writeUInt16LE(20, 4)
  local.writeUInt16LE(0, 6)
  local.writeUInt16LE(0, 8)
  local.writeUInt32LE(data.length, 18)
  local.writeUInt32LE(data.length, 22)
  local.writeUInt16LE(fileName.length, 26)
  fileName.copy(local, 30)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  return Buffer.concat([local, data, end])
}

test("parses the documented command", () => {
  assert.deepEqual(
    parseArguments(["my-app", "--template-id", "tpl_1234567890123456789012", "--no-install"]),
    {
      apiUrl: process.env.DITTO_API_URL || "https://dittojs.com",
      install: false,
      packageManager: "pnpm",
      projectName: "my-app",
      templateId: "tpl_1234567890123456789012",
    },
  )
})

test("normalizes a project name", () => {
  assert.equal(normalizeProjectName(" My Dashboard "), "my-dashboard")
  assert.throws(() => normalizeProjectName("..."))
})

test("extracts stored ZIP entries and rejects traversal", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "create-ditto-test-"))

  try {
    await extractStoredZip(storedZip("src/main.ts", "export {}\n"), directory)
    assert.equal(await readFile(path.join(directory, "src/main.ts"), "utf8"), "export {}\n")
    await assert.rejects(
      extractStoredZip(storedZip("../outside.txt", "bad"), directory),
      /unsafe path/,
    )
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
