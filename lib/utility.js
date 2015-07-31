'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function parse(html) {
  var $ = undefined,
      $respostas = undefined,
      tmp = undefined,
      tmpKeys = undefined;

  $ = _cheerio2['default'].load(html);
  tmp = {};
  $respostas = $('.resposta');

  Array.prototype.forEach.call($respostas, function (resposta) {
    var keys = undefined,
        values = undefined;
    var $el = $(resposta);
    var key = $el.text().trim().replace(':', '').replace('/', '-');
    var value = $el.next('.respostadestaque').text().trim();
    if (key.indexOf('Localidade') !== -1) {
      keys = key.split('-');
      values = value.replace(/[\n\t]+/g, '').split('/');
      tmp[keys[0].trim().toLowerCase()] = values[0].trim();
      tmp[keys[1].trim().toLowerCase()] = values[1].trim();
    } else {
      tmp[key.toLowerCase()] = value;
    }
  });

  tmpKeys = Object.keys(tmp);
  return tmpKeys.length > 0 ? tmp : null;
}

function cleanup(data, key) {
  if (data.hasOwnProperty(key)) {
    data[key] = data[key].split(/(, [\d]+)|( - de )|( - lado )/)[0];
  }
  return data;
}

exports.parse = parse;
exports.cleanup = cleanup;