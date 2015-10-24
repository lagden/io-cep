/* global describe, it */
'use strict';

const assert = require('assert');
const ioCep = require('../');

describe('ioCep', () => {
	it('ok', done => {
		ioCep('75569970').then(r => {
			assert.ok(r.success);
			assert.equal(r.logradouro, 'Praça Três Poderes');
			done();
		});
	});

	it('not found', done => {
		ioCep('00000-000').then(r => {
			assert.strictEqual(r.success, false);
			assert.equal(r.message, 'CEP não encontrado ou erro de análise');
			done();
		});
	});

	it('string', done => {
		ioCep(13109400).catch(err => {
			assert.equal(err, 'Utilize string');
			done();
		});
	});

	it('format', done => {
		ioCep('1310').catch(err => {
			assert.equal(err, 'Formato inválido');
			done();
		});
	});

	it('falha', done => {
		ioCep('04653055', 2, 1).catch(err => {
			assert.strictEqual(err.success, false);
			assert.strictEqual(err.message.code, 'ETIMEDOUT');
			done();
		});
	});
});
