# Typed models for the BranchQuickLinks SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Bulk(TypedDict, total=False):
    id: str


class BulkCreateData(TypedDict):
    id: str


class UrlRequired(TypedDict):
    branch_key: str
    branch_secret: str


class Url(UrlRequired, total=False):
    alias: str
    analytics: dict
    campaign: str
    channel: str
    data: dict
    deleted: bool
    duration: int
    feature: str
    qr_code_settings: dict
    stage: str
    tags: list
    type: int
    url: str


class UrlCreateDataRequired(TypedDict):
    branch_key: str
    branch_secret: str


class UrlCreateData(UrlCreateDataRequired, total=False):
    alias: str
    analytics: dict
    campaign: str
    channel: str
    data: dict
    deleted: bool
    duration: int
    feature: str
    qr_code_settings: dict
    stage: str
    tags: list
    type: int
    url: str


class UrlUpdateDataRequired(TypedDict):
    url: str


class UrlUpdateData(UrlUpdateDataRequired, total=False):
    alias: str
    analytics: dict
    branch_key: str
    branch_secret: str
    campaign: str
    channel: str
    data: dict
    deleted: bool
    duration: int
    feature: str
    qr_code_settings: dict
    stage: str
    tags: list
    type: int
