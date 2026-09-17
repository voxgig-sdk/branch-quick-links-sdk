import { BulkEntity } from './entity/BulkEntity';
import { UrlEntity } from './entity/UrlEntity';
export type * from './BranchQuickLinksTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { BranchQuickLinksEntityBase } from './BranchQuickLinksEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class BranchQuickLinksSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Bulk(entopts?: Record<string, any>): BulkEntity;
    Url(entopts?: Record<string, any>): UrlEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): BranchQuickLinksSDK;
    tester(testopts?: any, sdkopts?: any): BranchQuickLinksSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof BranchQuickLinksSDK;
export { stdutil, config, BaseFeature, BranchQuickLinksEntityBase, BranchQuickLinksSDK, SDK, };
