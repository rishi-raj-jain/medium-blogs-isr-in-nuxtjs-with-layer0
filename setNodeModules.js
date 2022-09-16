const fs = require('fs')
const { nodeFileTrace } = require('@vercel/nft')

const setNodeModules = async () => {
  // Enter an entry point to the app, for example in Nuxt(2), the whole app inside core.js
  const files = ['./node_modules/@nuxt/core/dist/core.js']
  // Compute file trace
  const { fileList } = await nodeFileTrace(files)
  // Store set of packages
  let packages = {}
  fileList.forEach((i) => {
    if (i.includes('node_modules/')) {
      let temp = i.replace('node_modules/', '')
      temp = temp.substring(0, temp.indexOf('/'))
      packages[`node_modules/${temp}`] = true
    } else {
      packages[i] = true
    }
  })
  // Sort the set of packages to maintain differences with git
  fs.writeFileSync(
    './getNodeModules.js',
    `module.exports=${JSON.stringify(
      Object.keys(packages)
        .sort()
        .reduce((obj, key) => {
          obj[key] = packages[key]
          return obj
        }, {})
    )}`
  )
}

setNodeModules()
