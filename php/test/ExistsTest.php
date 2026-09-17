<?php
declare(strict_types=1);

// BranchQuickLinks SDK exists test

require_once __DIR__ . '/../branchquicklinks_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = BranchQuickLinksSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
