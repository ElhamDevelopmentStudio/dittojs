import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

type ZipEntry = {
  archivePath: string
  data: Buffer
}

const ZIP_MIME_TYPE = "application/zip"
const UTF8_FILE_NAME_FLAG = 0x0800
const STORED_METHOD = 0

const crcTable = new Uint32Array(256)

for (let index = 0; index < 256; index += 1) {
  let value = index

  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  }

  crcTable[index] = value >>> 0
}

function crc32(data: Buffer): number {
  let crc = 0xffffffff

  for (const byte of data) {
    const tableIndex = (crc ^ byte) & 0xff
    const tableValue = crcTable[tableIndex] ?? 0

    crc = tableValue ^ (crc >>> 8)
  }

  return (crc ^ 0xffffffff) >>> 0
}

function dosDateParts(date: Date): { time: number; date: number } {
  const year = Math.max(1980, date.getFullYear())

  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
  }
}

function writeLocalFileHeader(entry: ZipEntry, date: Date): Buffer {
  const fileName = Buffer.from(entry.archivePath, "utf8")
  const header = Buffer.alloc(30 + fileName.length)
  const crc = crc32(entry.data)
  const timestamp = dosDateParts(date)

  header.writeUInt32LE(0x04034b50, 0)
  header.writeUInt16LE(20, 4)
  header.writeUInt16LE(UTF8_FILE_NAME_FLAG, 6)
  header.writeUInt16LE(STORED_METHOD, 8)
  header.writeUInt16LE(timestamp.time, 10)
  header.writeUInt16LE(timestamp.date, 12)
  header.writeUInt32LE(crc, 14)
  header.writeUInt32LE(entry.data.length, 18)
  header.writeUInt32LE(entry.data.length, 22)
  header.writeUInt16LE(fileName.length, 26)
  header.writeUInt16LE(0, 28)
  fileName.copy(header, 30)

  return header
}

function writeCentralDirectoryHeader(
  entry: ZipEntry,
  localHeaderOffset: number,
  date: Date,
): Buffer {
  const fileName = Buffer.from(entry.archivePath, "utf8")
  const header = Buffer.alloc(46 + fileName.length)
  const crc = crc32(entry.data)
  const timestamp = dosDateParts(date)

  header.writeUInt32LE(0x02014b50, 0)
  header.writeUInt16LE(20, 4)
  header.writeUInt16LE(20, 6)
  header.writeUInt16LE(UTF8_FILE_NAME_FLAG, 8)
  header.writeUInt16LE(STORED_METHOD, 10)
  header.writeUInt16LE(timestamp.time, 12)
  header.writeUInt16LE(timestamp.date, 14)
  header.writeUInt32LE(crc, 16)
  header.writeUInt32LE(entry.data.length, 20)
  header.writeUInt32LE(entry.data.length, 24)
  header.writeUInt16LE(fileName.length, 28)
  header.writeUInt16LE(0, 30)
  header.writeUInt16LE(0, 32)
  header.writeUInt16LE(0, 34)
  header.writeUInt16LE(0, 36)
  header.writeUInt32LE(0, 38)
  header.writeUInt32LE(localHeaderOffset, 42)
  fileName.copy(header, 46)

  return header
}

function writeEndOfCentralDirectory(
  entryCount: number,
  centralSize: number,
  centralOffset: number,
) {
  const header = Buffer.alloc(22)

  header.writeUInt32LE(0x06054b50, 0)
  header.writeUInt16LE(0, 4)
  header.writeUInt16LE(0, 6)
  header.writeUInt16LE(entryCount, 8)
  header.writeUInt16LE(entryCount, 10)
  header.writeUInt32LE(centralSize, 12)
  header.writeUInt32LE(centralOffset, 16)
  header.writeUInt16LE(0, 20)

  return header
}

async function collectZipEntries(directory: string, relativeDirectory = ""): Promise<ZipEntry[]> {
  const absoluteDirectory = path.join(directory, relativeDirectory)
  const entries = await readdir(absoluteDirectory, { withFileTypes: true })
  const zipEntries: ZipEntry[] = []

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const relativePath = path.join(relativeDirectory, entry.name)
    const absolutePath = path.join(directory, relativePath)

    if (entry.isDirectory()) {
      zipEntries.push(...(await collectZipEntries(directory, relativePath)))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    zipEntries.push({
      archivePath: relativePath.split(path.sep).join("/"),
      data: await readFile(absolutePath),
    })
  }

  return zipEntries
}

export async function createZipArchive(directory: string, date = new Date()): Promise<Buffer> {
  const entries = await collectZipEntries(directory)
  const localParts: Buffer[] = []
  const centralParts: Buffer[] = []
  let localOffset = 0

  for (const entry of entries) {
    const localHeader = writeLocalFileHeader(entry, date)

    localParts.push(localHeader, entry.data)
    centralParts.push(writeCentralDirectoryHeader(entry, localOffset, date))
    localOffset += localHeader.length + entry.data.length
  }

  const centralDirectory = Buffer.concat(centralParts)
  const endOfCentralDirectory = writeEndOfCentralDirectory(
    entries.length,
    centralDirectory.length,
    localOffset,
  )

  return Buffer.concat([...localParts, centralDirectory, endOfCentralDirectory])
}

export function zipMimeType(): string {
  return ZIP_MIME_TYPE
}
