#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')

const src = path.join(process.cwd(), process.argv[2] ? process.argv[2] : 'mapping')
const target = path.join(src, 'exports')

async function compile() {
  await fs.remove(target)
  await fs.ensureDir(target)

  const files = await fs.readdir(src)
  const mappings = files.filter((file) => file.includes('.mapping.js'))

  const promises = mappings.map((file) => {
    const { mapping } = require(path.join(src, file))
    const data = JSON.stringify(mapping, null, 2)

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(target, `${file.replace('.js', '')}.json`), data, (err) => {
        if (err) reject(err)
        resolve()
      })
    }) 
  })

  await Promise.all(promises)
  console.log(`created mappings`)
}

compile()
