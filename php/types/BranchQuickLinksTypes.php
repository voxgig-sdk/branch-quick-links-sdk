<?php
declare(strict_types=1);

// Typed models for the BranchQuickLinks SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Bulk entity data model. */
class Bulk
{
    public ?string $id = null;
}

/** Request payload for Bulk#create. */
class BulkCreateData
{
    public string $id;
}

/** Url entity data model. */
class Url
{
    public ?string $alias = null;
    public ?array $analytics = null;
    public string $branch_key;
    public string $branch_secret;
    public ?string $campaign = null;
    public ?string $channel = null;
    public ?array $data = null;
    public ?bool $deleted = null;
    public ?int $duration = null;
    public ?string $feature = null;
    public ?array $qr_code_settings = null;
    public ?string $stage = null;
    public ?array $tags = null;
    public ?int $type = null;
    public ?string $url = null;
}

/** Request payload for Url#create. */
class UrlCreateData
{
    public ?string $alias = null;
    public ?array $analytics = null;
    public string $branch_key;
    public string $branch_secret;
    public ?string $campaign = null;
    public ?string $channel = null;
    public ?array $data = null;
    public ?bool $deleted = null;
    public ?int $duration = null;
    public ?string $feature = null;
    public ?array $qr_code_settings = null;
    public ?string $stage = null;
    public ?array $tags = null;
    public ?int $type = null;
    public ?string $url = null;
}

/** Request payload for Url#update. */
class UrlUpdateData
{
    public string $url;
    public ?string $alias = null;
    public ?array $analytics = null;
    public ?string $branch_key = null;
    public ?string $branch_secret = null;
    public ?string $campaign = null;
    public ?string $channel = null;
    public ?array $data = null;
    public ?bool $deleted = null;
    public ?int $duration = null;
    public ?string $feature = null;
    public ?array $qr_code_settings = null;
    public ?string $stage = null;
    public ?array $tags = null;
    public ?int $type = null;
}

