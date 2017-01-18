/* global describe, it */
'use strict'

const assert = require('assert')
const ioCep = require('../')

describe('ioCep', () => {
	it('endereço', done => {
		ioCep('Praça Três Poderes').then(r => {
			assert.ok(r.success)
			done()
		})
	})

	it('cep', done => {
		ioCep(93010280).then(r => {
			assert.ok(r.success)
			assert.equal(r.dados[0].logradouro, 'Rua Santo Antônio')
			done()
		})
	})

	it('not found', done => {
		ioCep('00000-000').catch(err => {
			assert.strictEqual(err.success, false)
			assert.equal(err.message, 'Dados não encontrado ou erro de análise')
			done()
		})
	})

	it('falha', done => {
		ioCep('04653055', 1, 1).catch(err => {
			assert.strictEqual(err.success, false)
			assert.strictEqual(err.code, 'ETIMEDOUT')
			done()
		})
	})
})
