-- Typed models for the BranchQuickLinks SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Bulk
---@field id? string

---@class BulkCreateData
---@field id string

---@class Url
---@field alias? string
---@field analytics? table
---@field branch_key string
---@field branch_secret string
---@field campaign? string
---@field channel? string
---@field data? table
---@field deleted? boolean
---@field duration? number
---@field feature? string
---@field qr_code_settings? table
---@field stage? string
---@field tags? table
---@field type? number
---@field url? string

---@class UrlCreateData
---@field alias? string
---@field analytics? table
---@field branch_key string
---@field branch_secret string
---@field campaign? string
---@field channel? string
---@field data? table
---@field deleted? boolean
---@field duration? number
---@field feature? string
---@field qr_code_settings? table
---@field stage? string
---@field tags? table
---@field type? number
---@field url? string

---@class UrlUpdateData
---@field url string
---@field alias? string
---@field analytics? table
---@field branch_key? string
---@field branch_secret? string
---@field campaign? string
---@field channel? string
---@field data? table
---@field deleted? boolean
---@field duration? number
---@field feature? string
---@field qr_code_settings? table
---@field stage? string
---@field tags? table
---@field type? number

local M = {}

return M
