# BranchQuickLinks SDK feature factory

from branchquicklinks_sdk.feature.base_feature import BranchQuickLinksBaseFeature
from branchquicklinks_sdk.feature.debug_feature import BranchQuickLinksDebugFeature
from branchquicklinks_sdk.feature.idempotency_feature import BranchQuickLinksIdempotencyFeature
from branchquicklinks_sdk.feature.metrics_feature import BranchQuickLinksMetricsFeature
from branchquicklinks_sdk.feature.paging_feature import BranchQuickLinksPagingFeature
from branchquicklinks_sdk.feature.ratelimit_feature import BranchQuickLinksRatelimitFeature
from branchquicklinks_sdk.feature.retry_feature import BranchQuickLinksRetryFeature
from branchquicklinks_sdk.feature.test_feature import BranchQuickLinksTestFeature
from branchquicklinks_sdk.feature.timeout_feature import BranchQuickLinksTimeoutFeature


_FEATURES = {
    "base": lambda: BranchQuickLinksBaseFeature(),
    "debug": lambda: BranchQuickLinksDebugFeature(),
    "idempotency": lambda: BranchQuickLinksIdempotencyFeature(),
    "metrics": lambda: BranchQuickLinksMetricsFeature(),
    "paging": lambda: BranchQuickLinksPagingFeature(),
    "ratelimit": lambda: BranchQuickLinksRatelimitFeature(),
    "retry": lambda: BranchQuickLinksRetryFeature(),
    "test": lambda: BranchQuickLinksTestFeature(),
    "timeout": lambda: BranchQuickLinksTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
