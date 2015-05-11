/* global describe, it */

'use strict';
var assert = require('assert');
var ioCep = require('./');

describe('Consulta', function() {
  describe('valid CEP', function() {
    it('should return a success true', function(done) {
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
    it('should return a success false', function(done) {
      ioCep('00000-000', function(err, res) {
        assert.ok(!res.success);
        assert.strictEqual(res.message, 'CEP not found or parse error');
        done();
      });
    });
  });

  describe('missing Callback', function() {
    it('should return a TypeError', function() {
      assert.throws(ioCep.bind('01310-940'), TypeError );
    });
  });

  describe('CEP as number', function() {
    it('should return a TypeError', function() {
      assert.throws(ioCep.bind(1310940), TypeError );
    });
  });
});
