/* global describe, it */

'use strict';

import ioCep from '../es6/index';

describe('Consulta', function() {

  describe('valid', function() {
    this.timeout(5000);
    it('should be return success true', function() {
      return ioCep('04653-055')
        .then(function(res){
          res.success.should.be.True;
          res.logradouro.should.be.equal('Rua Amália Cerelo Godespoti');
        });
    });
  });

  describe('invalid', function() {
    this.timeout(5000);
    it('should be return success false', function() {
      return ioCep('00000-000')
        .then(function(res){
          res.success.should.be.False;
          res.message.should.be.equal('CEP not found or parse error');
        });
    });
  });

  describe('typeof', function() {
    it('should be return TypeError', function() {
      return ioCep(1310940)
        .catch(function(err){
          err.message.should.be.equal('CEP must be a string');
        });
    });
  });

});
