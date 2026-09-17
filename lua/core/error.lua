-- BranchQuickLinks SDK error

local BranchQuickLinksError = {}
BranchQuickLinksError.__index = BranchQuickLinksError


function BranchQuickLinksError.new(code, msg, ctx)
  local self = setmetatable({}, BranchQuickLinksError)
  self.is_sdk_error = true
  self.sdk = "BranchQuickLinks"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BranchQuickLinksError:error()
  return self.msg
end


function BranchQuickLinksError:__tostring()
  return self.msg
end


return BranchQuickLinksError
