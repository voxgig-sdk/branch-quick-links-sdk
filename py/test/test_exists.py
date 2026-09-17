# BranchQuickLinks SDK exists test

import pytest
from branchquicklinks_sdk import BranchQuickLinksSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BranchQuickLinksSDK.test(None, None)
        assert testsdk is not None
