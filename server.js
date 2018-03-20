var WebSocket = require('ws');
var axios = require('axios');
var CircularJSON = require('circular-json');
var wss = new WebSocket.Server({
    port: 8181
});
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);
        ws.send(message)
    });
    console.log('ws', ws);
    getDataByInterval(5000, wss);
});


function getDataByInterval(interval /*number*/ , wss) {
    let url = "https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=42.06,38.04,114.76,118.80&faa=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1";
    setInterval(function () {
        axios.get(url).then(data => {
            wss.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(CircularJSON.stringify(data));
                }
            });
        }, err => {
            console.log(err);
        });
    }, interval);
}