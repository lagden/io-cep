Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _libUtility = require('./lib/utility');

'use strict';

function sucesso(res, cep) {
  var data = {
    success: false,
    message: 'Status code is ' + res.statusCode,
    cep: cep
  };
  if (res.statusCode === 200) {
    data = (0, _libUtility.parse)(_iconvLite2.default.decode(res._buffer, 'iso-8859-1'));
    if (data) {
      data.success = true;
      data = (0, _libUtility.cleanup)(data, 'logradouro');
      data = (0, _libUtility.cleanup)(data, 'endere\u00E7o');
      if (data.hasOwnProperty('endere\u00E7o')) {
        data.logradouro = data['endere\u00E7o'];
      }
    } else {
      data = {
        success: false,
        message: 'CEP not found or parse error',
        cep: cep
      };
    }
  }
  return Promise.resolve(data);
}

function falha(err, cep) {
  return Promise.resolve({
    success: false,
    message: err,
    cep: cep
  });
}

function consulta(cep) {
  if (typeof cep !== 'string') {
    Promise.reject('Must be a string');
  }
  if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
    Promise.reject('Invalid format');
  }
  var formData = {
    body: {
      cepEntrada: cep,
      tipoCep: '',
      cepTemp: '',
      metodo: 'buscarCep'
    },
    timeout: 10000
  };
  return _got2.default.post('http://m.correios.com.br/movel/buscaCepConfirma.do', formData).then(function (res) {
    return sucesso(res, cep);
  }).catch(function (err) {
    return falha(err, cep);
  });
}

exports.default = consulta;
module.exports = exports.default;