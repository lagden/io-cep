/* global describe, it */

'use strict';
var assert = require('assert');
var ioCep = require('./');

describe('Consulta', function() {
  describe('valid CEP', function() {
    it('should return a valid address', function(done) {
      ioCep('01310-940', function(err, res) {
        if (err) {
          throw err;
        }
        assert.ok(res.success);
        assert.strictEqual(res.logradouro, 'Avenida Paulista');
        done();
      });
    });
  });

  describe('invalid CEP', function() {
    it('should return a invalid address', function(done) {
      ioCep('00000-000', function(err, res) {
        assert.ok(!res.success);
        assert.strictEqual(res.message, 'CEP not found or parse error.');
        done();
      });
    });
  });
});
