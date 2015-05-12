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
    var key = $el.text().trim().replace(':', '').replace('/', '-');
    var value = $el.next('.respostadestaque').text().trim();
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

function cleanup(data, key) {
  if (data.hasOwnProperty(key)) {
    data[key] = data[key].split(/(, [\d]+)|( - de )/)[0];
  }
}

/**
 * Consulta.
 *
 * @param {string} cep - Zip code of the location.
 * @param {function} cb - Callback function.
 */
function consulta(cep, cb) {
  if (typeof cep !== 'string') {
    throw new TypeError('CEP must be a string');
  }
  if (typeof cb !== 'function') {
    throw new TypeError('Callback must be a function');
  }
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
          data.success = true;
          cleanup(data, 'logradouro');
          cleanup(data, 'endere\u00E7o');
          if (data.hasOwnProperty('endere\u00E7o')) {
            data.logradouro = data['endere\u00E7o'];
          }
          cb(null, data);
        } else {
          cb(null, {
            'success': false,
            'message': 'CEP not found or parse error'
          });
        }
      } else {
        cb(err, null);
      }
    }
  );
}

module.exports = consulta;
