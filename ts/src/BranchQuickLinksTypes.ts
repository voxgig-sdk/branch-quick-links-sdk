// Typed models for the BranchQuickLinks SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bulk {
  id?: string
}

export interface BulkCreateData {
  id: string
}

export interface Url {
  alias?: string
  analytics?: Record<string, any>
  branch_key: string
  branch_secret: string
  campaign?: string
  channel?: string
  data?: Record<string, any>
  deleted?: boolean
  duration?: number
  feature?: string
  qr_code_settings?: Record<string, any>
  stage?: string
  tags?: any[]
  type?: number
  url?: string
}

export interface UrlCreateData {
  alias?: string
  analytics?: Record<string, any>
  branch_key: string
  branch_secret: string
  campaign?: string
  channel?: string
  data?: Record<string, any>
  deleted?: boolean
  duration?: number
  feature?: string
  qr_code_settings?: Record<string, any>
  stage?: string
  tags?: any[]
  type?: number
  url?: string
}

export interface UrlUpdateData {
  url: string
  alias?: string
  analytics?: Record<string, any>
  branch_key?: string
  branch_secret?: string
  campaign?: string
  channel?: string
  data?: Record<string, any>
  deleted?: boolean
  duration?: number
  feature?: string
  qr_code_settings?: Record<string, any>
  stage?: string
  tags?: any[]
  type?: number
}

