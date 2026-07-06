#!/usr/bin/env node

import { build } from 'vite'

const command = process.argv[2]

if (command !== 'build') {
  console.error('This shim only supports `vitepress build`.')
  process.exit(1)
}

try {
  await build()
} catch (error) {
  console.error(error)
  process.exit(1)
}