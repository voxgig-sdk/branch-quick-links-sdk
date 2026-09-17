import { BranchQuickLinksEntityBase } from '../BranchQuickLinksEntityBase';
import type { BranchQuickLinksSDK } from '../BranchQuickLinksSDK';
import type { Control } from '../types';
import type { Url, UrlCreateData, UrlUpdateData } from '../BranchQuickLinksTypes';
declare class UrlEntity extends BranchQuickLinksEntityBase<Url> {
    constructor(client: BranchQuickLinksSDK, entopts: any);
    make(this: UrlEntity): UrlEntity;
    create(this: any, reqdata?: UrlCreateData, ctrl?: Control): Promise<UrlEntity>;
    update(this: any, reqdata?: UrlUpdateData, ctrl?: Control): Promise<UrlEntity>;
}
export { UrlEntity };
