const { parse } = require('rss-to-json')
const { Router } = require('express')
const router = Router()

router.use('/blogs/:username.json', async (req, res) => {
  const slug = req.params.username
  let rss = await parse(`https://medium.com/feed/@${slug}`)
  let resp = JSON.stringify(rss, null, 3)
  if (!resp) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        code: 0,
      })
    )
  }
  resp = JSON.parse(resp)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      resp,
      code: 1,
    })
  )
})

module.exports = router
