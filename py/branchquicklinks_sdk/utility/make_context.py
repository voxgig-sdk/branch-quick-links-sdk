# BranchQuickLinks SDK utility: make_context

from branchquicklinks_sdk.core.context import BranchQuickLinksContext


def make_context_util(ctxmap, basectx):
    return BranchQuickLinksContext(ctxmap, basectx)
