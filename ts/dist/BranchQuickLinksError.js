"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchQuickLinksError = void 0;
class BranchQuickLinksError extends Error {
    isBranchQuickLinksError = true;
    sdk = 'BranchQuickLinks';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.BranchQuickLinksError = BranchQuickLinksError;
//# sourceMappingURL=BranchQuickLinksError.js.map