/* global describe, it */

'use strict';
var assert = require('assert');
var ioCep = require('./');

describe('Consulta', function() {
  describe('valid CEP', function() {
    it('should return a valid address', function(done) {
      ioCep('04653-055', function(err, res) {
        if (err) {
          throw err;
        }
        assert.strictEqual(res.logradouro.toString(), 'Rua Am\u00E1lia Cerelo Godespoti');
        done();
      });
    });
  });

  describe('invalid CEP', function() {
    it('should return a error', function(done) {
      ioCep('00000-000', function(err, res) {
        assert.strictEqual(err.message.toString(), 'Falha no parse');
        done();
      });
    });
  });
});
