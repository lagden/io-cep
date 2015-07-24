'use strict';

import request from 'request';
import iconv   from 'iconv-lite';
import {parse, cleanup} from './lib/utility';

/**
 * Consulta.
 *
 * @param {string} cep - Zip code of the location.
 */
function consulta(cep) {
  return new Promise((resolve, reject) => {
    if (typeof cep !== 'string') {
      throw new Error('Must be a string');
    }
    if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
      throw new Error('Invalid format');
    }
    let formData = {
      form: {
        cepEntrada: cep,
        tipoCep: '',
        cepTemp: '',
        metodo: 'buscarCep',
      },
      encoding: null,
      timeout: 5000,
    };
    request.post(
      'http://m.correios.com.br/movel/buscaCepConfirma.do',
      formData,
      (err, res, body) => {
        if (!err && res.statusCode === 200) {
          let data = parse(iconv.decode(body, 'ISO-8859-1'));
          if (data) {
            data.success = true;
            data = cleanup(data, 'logradouro');
            data = cleanup(data, 'endere\u00E7o');
            if (data.hasOwnProperty('endere\u00E7o')) {
              data.logradouro = data['endere\u00E7o'];
            }
            resolve(data);
          } else {
            resolve({
              success: false,
              message: 'CEP not found or parse error',
              cep: cep,
            });
          }
        } else {
          resolve({
            success: false,
            message: 'Request timemout',
            cep: cep,
          });
        }
      }
    );
  });
}

export default consulta;
