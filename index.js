Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _libUtility = require('./lib/utility');

'use strict';

function consulta(cep) {
  return new Promise(function (resolve, reject) {
    if (typeof cep !== 'string') {
      throw new Error('Must be a string');
    }
    if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
      throw new Error('Invalid format');
    }
    var formData = {
      form: {
        cepEntrada: cep,
        tipoCep: '',
        cepTemp: '',
        metodo: 'buscarCep'
      },
      encoding: null,
      timeout: 5000
    };
    _request2.default.post('http://m.correios.com.br/movel/buscaCepConfirma.do', formData, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        var data = (0, _libUtility.parse)(_iconvLite2.default.decode(body, 'ISO-8859-1'));
        if (data) {
          data.success = true;
          data = (0, _libUtility.cleanup)(data, 'logradouro');
          data = (0, _libUtility.cleanup)(data, 'endere\u00E7o');
          if (data.hasOwnProperty('endere\u00E7o')) {
            data.logradouro = data['endere\u00E7o'];
          }
          resolve(data);
        } else {
          resolve({
            success: false,
            message: 'CEP not found or parse error',
            cep: cep
          });
        }
      } else {
        resolve({
          success: false,
          message: 'Request timemout',
          cep: cep
        });
      }
    });
  });
}

exports.default = consulta;
module.exports = exports.default;