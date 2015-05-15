/* global describe, it */

'use strict';

import ioCep from '../es6/index';

describe('Consulta', function consulta() {

  describe('valid', function valid() {
    this.timeout(5000);
    it('should be return success true', function beTrue() {
      return ioCep('04653-055')
        .then((res) => {
          res.success.should.be.True;
          res.logradouro.should.be.equal('Rua Amália Cerelo Godespoti');
        });
    });
  });

  describe('invalid', function invalid() {
    this.timeout(5000);
    it('should be return success false', function beFalse() {
      return ioCep('00000-000')
        .then((res) => {
          res.success.should.be.False;
          res.message.should.be.equal('CEP not found or parse error');
        });
    });
  });

  describe('string', function str() {
    it('should be return Error', function errStr() {
      return ioCep(1310940)
        .catch((err) => {
          err.message.should.be.equal('Must be a string');
        });
    });
  });

  describe('format', function fmt() {
    it('should be return Error', function errFmt() {
      return ioCep('1310')
        .catch((err) => {
          err.message.should.be.equal('Invalid format');
        });
    });
  });

});
