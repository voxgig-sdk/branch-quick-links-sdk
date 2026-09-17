
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { BranchQuickLinksSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await BranchQuickLinksSDK.test()
    equal(null !== testsdk, true)
  })

})
