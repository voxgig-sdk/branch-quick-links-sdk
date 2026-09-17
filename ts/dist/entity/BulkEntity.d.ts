import { BranchQuickLinksEntityBase } from '../BranchQuickLinksEntityBase';
import type { BranchQuickLinksSDK } from '../BranchQuickLinksSDK';
import type { Control } from '../types';
import type { Bulk, BulkCreateData } from '../BranchQuickLinksTypes';
declare class BulkEntity extends BranchQuickLinksEntityBase<Bulk> {
    constructor(client: BranchQuickLinksSDK, entopts: any);
    make(this: BulkEntity): BulkEntity;
    create(this: any, reqdata?: BulkCreateData, ctrl?: Control): Promise<BulkEntity>;
}
export { BulkEntity };
