const { Router } = require('express')
const https = require('https')
const router = Router()

const httpGet = url => {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        res.setEncoding('utf8')
        let body = ''
        res.on('data', chunk => (body += chunk))
        res.on('end', () => resolve(body))
      })
      .on('error', reject)
  })
}

router.use('/blogs/:username.json', async (req, res) => {
  const slug = req.params.username
  let resp = await httpGet(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${slug}`
  )
  console.log(resp)
  if (!resp) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        code: 0
      })
    )
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      resp,
      code: 1
    })
  )
})

module.exports = router
