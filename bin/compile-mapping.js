#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')

const src = path.join(process.cwd(), 'mapping')
const target = path.join(src, 'exports')

fs.removeSync(target)
fs.ensureDirSync(target)

fs.readdirSync(src)
.filter((file) => file.includes('.mapping.js'))
.forEach((file) => {
  const { mapping } = require(path.join(src, file))
  const data = JSON.stringify(mapping, null, 2)

  fs.writeFileSync(path.join(target, `${file.replace('.js', '')}.json`), data)
  console.log(`created mapping for ${path.join(target, file)}`)
})
