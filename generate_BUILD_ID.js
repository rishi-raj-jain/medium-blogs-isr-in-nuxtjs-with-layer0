const fs = require('fs')

fs.writeFile('BUILD_ID.js', `export const BUILD_ID= '${new Date().getTime().toString()}'`, (err) => {
  if (err) console.log(err)
  else {
    console.log('File written successfully.')
  }
})
