var WebSocket = require('ws')
var axios = require('axios')
var CircularJSON = require('circular-json')
var wss = new WebSocket.Server({
  port: 8181
})

wss.on('connection', function (ws) {
  console.log('client connected')
  ws.on('message', function (message) {
    ws.send(message)
  })
  console.log('ws', ws)
  getDataByInterval(5000, wss)
})

function getDataByInterval (interval /* number */, wss) {
  let url = 'https://data-live.flightradar24.com/zones/fcgi/feed.js'
  setInterval(function () {
    axios.get(url).then(data => {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(CircularJSON.stringify(data.data))
        }
      })
    }, err => {
      console.log(err)
    })
  }, interval)
}
