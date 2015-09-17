/* global describe, it */

'use strict';

import ioCep from '../es6/index';

describe('Consulta', () => {
	describe('valid', () => {
		it('should be true and equal', done => {
			ioCep('04653-055')
				.then(res => {
					res.success.should.be.true();
					res.logradouro.should.be.equal('Rua Amália Cerelo Godespoti');
					done();
				});
		});
	});

	describe('invalid', () => {
		it('should be false and equal', done => {
			ioCep('00000-000')
				.then(res => {
					res.success.should.be.false();
					res.message.should.be.equal('CEP not found or parse error');
					done();
				});
		});
	});

	describe('string', () => {
		it('should be an error about string', done => {
			ioCep(1310940)
				.catch(err => {
					err.should.be.equal('Must be a string');
					done();
				});
		});
	});

	describe('format', () => {
		it('should be an error about format', done => {
			ioCep('1310')
				.catch(err => {
					err.should.be.equal('Invalid format');
					done();
				});
		});
	});
});
