/* global module, require */

'use strict';

var cheerio = require('cheerio');
var request = require('request');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('iso-8859-1', 'utf-8');

function parse(html) {
  var $, $respostas, tmp, tmpKeys;

  $ = cheerio.load(html);
  tmp = {};
  $respostas = $('.resposta');

  for (var i = 0, len = $respostas.length; i < len; i++) {
    var $el = $($respostas[i]);
    var key = String($el.text()).trim().replace(':', '').replace('/', '-');
    var value = String($el.next('.respostadestaque').text()).trim();
    if (key.indexOf('Localidade') !== -1) {
      var keys = key.split('-');
      var values = value.replace(/[\n\t]+/g, '').split('/');
      tmp[keys[0].trim().toLowerCase()] = values[0].trim();
      tmp[keys[1].trim().toLowerCase()] = values[1].trim();
    } else {
      tmp[key.toLowerCase()] = value;
    }
  }
  tmpKeys = Object.keys(tmp);
  return (tmpKeys.length > 0) ? tmp : null;
}

module.exports = function(cep, callback) {
  var formData = {
    'form': {
      'cepEntrada': cep,
      'tipoCep': '',
      'cepTemp': '',
      'metodo': 'buscarCep'
    },
    'encoding': null
  };
  request.post(
    'http://m.correios.com.br/movel/buscaCepConfirma.do',
    formData,
    function(err, res, body) {
      if (!err && res.statusCode === 200) {
        var buf = iconv.convert(body).toString('utf-8');
        var data = parse(buf);
        if (data) {
          callback(null, data);
        } else {
          callback(new Error('Falha no parse'), null);
        }
      } else {
        callback(err, null);
      }
    }
  );
};
