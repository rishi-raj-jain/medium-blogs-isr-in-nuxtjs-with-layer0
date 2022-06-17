const { parse } = require('rss-to-json')
const { Router } = require('express')

const router = Router()

router.use('/blogs/:username.json', async (req, res) => {
  const slug = req.params.username
  let errorResponse = (res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        code: 0,
      })
    )
  }
  try {
    let rss = await parse(`https://medium.com/feed/@${slug}`)
    let resp = JSON.stringify(rss, null, 3)
    if (!resp) {
      return errorResponse(res)
    }
    resp = JSON.parse(resp)
    // Generate the time of the response to verify ISR
    resp['random']= new Date().getTime().toString()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        resp,
        code: 1,
      })
    )
  } catch {
    return errorResponse(res)
  }
})

module.exports = router
