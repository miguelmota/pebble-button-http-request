(function() {
  'use strict';

  var HOSTNAME = '192.168.1.0';
  var PORT = '5468';
  var PROTOCOL = 'http://';
  var PATH = '/data';

  var button_map = {
    '0': 'BACK',
    '1': 'UP',
    '2': 'SELECT',
    '3': 'DOWN'
  };

  Pebble.addEventListener('ready', function(event) {
    console.log('ready');
  });

  Pebble.addEventListener('appmessage', function(event) {
    var payload = typeof event.payload === 'object' ? event.payload : {};
    var ip = payload.ip;
    var message = payload.message;

    console.log('payload', JSON.stringify(payload));

    if (Array.isArray(ip)) {
      HOSTNAME = ip.join('.');
    }

    var xhr = new XMLHttpRequest();
    var button = button_map[message];
    var params = '';

    if (typeof button !== 'undefined') {
      params = 'button=' + button;
    }

    var HOST = PROTOCOL + HOSTNAME + ':' + PORT + PATH;

    xhr.open('POST', HOST);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Content-length', params.length);
    xhr.setRequestHeader('Connection', 'close');
    xhr.send(params);
  });
})();
