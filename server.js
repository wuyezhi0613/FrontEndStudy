var WebSocketServer = require('ws').Server;
var axios = require('axios');
var util = require("util")
var wss = new WebSocketServer({
    port: 8181
});
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);
        ws.send(message)
    });
    console.log('ws', ws);
    getDataByInterval(2000, wss);
});


function getDataByInterval(interval /*number*/ , wss) {
    let url = "https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=42.06,38.04,114.76,118.80&faa=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1";
    setInterval(function () {
        axios.get(url).then(data=>{
            wss.clients.forEach(client => {
                client.send(stringifyJson(data));
            });
        },err=>{
            console.log(err);
        });
    }, interval);
}

function stringifyJson(json) {
    let  hasArr = [];
    let jsonResult = JSON.stringify(json);
    console.log(jsonResult);
    return jsonResult;
}