<?php
declare(strict_types=1);

// BranchQuickLinks SDK base feature

class BranchQuickLinksBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(BranchQuickLinksContext $ctx, array $options): void {}
    public function PostConstruct(BranchQuickLinksContext $ctx): void {}
    public function PostConstructEntity(BranchQuickLinksContext $ctx): void {}
    public function SetData(BranchQuickLinksContext $ctx): void {}
    public function GetData(BranchQuickLinksContext $ctx): void {}
    public function GetMatch(BranchQuickLinksContext $ctx): void {}
    public function SetMatch(BranchQuickLinksContext $ctx): void {}
    public function PrePoint(BranchQuickLinksContext $ctx): void {}
    public function PreSpec(BranchQuickLinksContext $ctx): void {}
    public function PreRequest(BranchQuickLinksContext $ctx): void {}
    public function PreResponse(BranchQuickLinksContext $ctx): void {}
    public function PreResult(BranchQuickLinksContext $ctx): void {}
    public function PreDone(BranchQuickLinksContext $ctx): void {}
    public function PreUnexpected(BranchQuickLinksContext $ctx): void {}
}
