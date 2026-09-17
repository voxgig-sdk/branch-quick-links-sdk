<?php
declare(strict_types=1);

// BranchQuickLinks SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BranchQuickLinksMakeContext
{
    public static function call(array $ctxmap, ?BranchQuickLinksContext $basectx): BranchQuickLinksContext
    {
        return new BranchQuickLinksContext($ctxmap, $basectx);
    }
}
