
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BranchQuickLinksSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BranchQuickLinksSDK.test()
    equal(testsdk instanceof BranchQuickLinksSDK, true,
      'BranchQuickLinksSDK.test() must return a client synchronously')
  })

})
