-- BranchQuickLinks SDK exists test

local sdk = require("branch-quick-links_sdk")

describe("BranchQuickLinksSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
