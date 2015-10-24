/* global describe, it */
'use strict';

const assert = require('assert');
const ioCep = require('../');

describe('ioCep', () => {
	it('endereço', done => {
		ioCep('Praça Três Poderes').then(r => {
			assert.ok(r.success);
			assert.equal(r.dados[0].cep, '75569970');
			done();
		});
	});

	it('cep', done => {
		ioCep('09715-295').then(r => {
			assert.ok(r.success);
			assert.equal(r.dados[0].logradouro, 'Rua Primo Modolin');
			done();
		});
	});

	it('not found', done => {
		ioCep('00000-000').then(r => {
			assert.strictEqual(r.success, false);
			assert.equal(r.message, 'Dados não encontrado ou erro de análise');
			done();
		});
	});

	it('string', done => {
		ioCep(13109400).catch(err => {
			assert.equal(err, 'Utilize string');
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
