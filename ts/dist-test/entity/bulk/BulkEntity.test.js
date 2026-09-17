"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BulkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BRANCH_QUICK_LINKS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BRANCH_QUICK_LINKS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BranchQuickLinksSDK.test();
        const ent = testsdk.Bulk();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BRANCH_QUICK_LINKS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bulk.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }], "id": { "field": "id", "name": "id" }, "name": "bulk", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "key_live_xxxx", "kind": "param", "name": "id", "orig": "branch_key", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /url/bulk/{branch_key}", "json": "{\"operationId\":\"createBulkDeepLinkUrl\",\"parameters\":[{\"description\":\"The Branch Key of the originating app, found in the Settings tab of your Branch Dashboard\\n\",\"in\":\"path\",\"name\":\"branch_key\",\"required\":\"true\",\"schema\":{\"example\":\"key_live_xxxx\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"alias\":{\"description\":\"Instead of our standard encoded short url, you can specify the vanity alias. For example, instead of a random string of characters/integers, you can set the vanity alias as .app.link/devonaustin.\",\"example\":\"\",\"type\":\"string\"},\"analytics\":{\"properties\":{\"~ad_id\":{\"description\":\"The ad ID specified for the last attributed touch.\",\"example\":\"\",\"type\":\"string\"},\"~ad_name\":{\"description\":\"The ad name specified for the last attributed touch.\",\"example\":\"\",\"type\":\"string\"},\"~ad_set_id\":{\"description\":\"The ad set ID specified for the last attributed touch.\",\"example\":\"\",\"type\":\"string\"},\"~ad_set_name\":{\"description\":\"The ad set name specified for the last attributed touch.\",\"example\":\"\",\"type\":\"string\"},\"~campaign\":{\"description\":\"Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that\",\"example\":\"\",\"type\":\"string\"},\"~campaign_id\":{\"description\":\"Use this field to organize the links by actual campaign id. For example, if you launched a new feature or product and want to run a campaign around that\",\"example\":\"\",\"type\":\"string\"},\"~channel\":{\"description\":\"Use channel to tag the route that your link reaches users. For example, tag links with 'Facebook' or 'LinkedIn' to help track clicks and installs through those paths separately\",\"example\":\"\",\"type\":\"string\"},\"~creative_id\":{\"description\":\"The creative ID specified for the last attributed touch.\",\"example\":\"\",\"type\":\"string\"},\"~creative_name\":{\"description\":\"The creative name specified for the last attributed touch.\",\"example\":\"\",\"type\":\"string\"},\"~customer_ad_name\":{\"description\":\"The customer ad name specified for the last attributed touch. can be specified on the link by the client.\",\"example\":\"\",\"type\":\"string\"},\"~customer_ad_set_name\":{\"description\":\"The customer ad set name specified for the last attributed touch. can be specified on links by the client.\",\"example\":\"\",\"type\":\"string\"},\"~customer_campaign\":{\"description\":\"The customer campaign specified for the last attributed touch. can be specified on links by the client.\",\"example\":\"\",\"type\":\"string\"},\"~customer_keyword\":{\"description\":\"The customer keyword of the last touch. Can be specified on links by the client.\",\"example\":\"\",\"type\":\"string\"},\"~customer_placement\":{\"description\":\"The customer specified placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. Can be specified on the link by the client.\",\"example\":\"\",\"type\":\"string\"},\"~customer_secondary_publisher\":{\"description\":\"The ID of the secondary publisher specified for the last attributed touch. can be specified on links by the client.\",\"example\":\"\",\"type\":\"string\"},\"~customer_sub_site_name\":{\"description\":\"Customer reference to the site where the ad was displayed. Can be specified on links by the client.\",\"example\":\"\",\"type\":\"string\"},\"~feature\":{\"description\":\"This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature 'referral'\",\"example\":\"\",\"type\":\"string\"},\"~keyword\":{\"description\":\"The keyword specified for the last attributed touch.\",\"example\":\"\",\"type\":\"string\"},\"~keyword_id\":{\"description\":\"The unique ID for keyword of the last touch\",\"example\":\"\",\"type\":\"string\"},\"~placement\":{\"description\":\"The placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns.\",\"example\":\"\",\"type\":\"string\"},\"~placement_id\":{\"description\":\"The ID of placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns.\",\"example\":\"\",\"type\":\"string\"},\"~secondary_publisher\":{\"description\":\"secondary publisher specified for the last attributed touch. passed by the ad network.\",\"example\":\"\",\"type\":\"string\"},\"~stage\":{\"description\":\"Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter\",\"example\":\"\",\"type\":\"string\"},\"~sub_site_name\":{\"description\":\"Reference to the site where the ad was displayed.\",\"example\":\"\",\"type\":\"string\"},\"~tags\":{\"description\":\"This is a free form entry with unlimited values ['string']. Use it to organize your link data with labels that don't fit within the bounds of the above\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"campaign\":{\"description\":\"Campaign name\",\"example\":\"new product\",\"type\":\"string\"},\"channel\":{\"description\":\"Deep link channel\",\"example\":\"facebook\",\"type\":\"string\"},\"data\":{\"properties\":{\"$after_click_url\":{\"description\":\"When a user returns to the browser after going to the app, take them to this URL. iOS only; Android coming soon\",\"example\":\"\",\"type\":\"string\"},\"$afterclick_desktop_url\":{\"description\":\"When a user on desktop returns to the desktop browser after going to the desktop app, take them to this URL.\",\"example\":\"false\",\"type\":\"boolean\"},\"$android_url\":{\"description\":\"Change the redirect endpoint for Android Play Store page for your app (set in Link Settings)\",\"example\":\"\",\"type\":\"string\"},\"$android_url_xx\":{\"description\":\"Change the redirect endpoint for Android based on a lower-case Alpha-2 country code. For example, $android_url_de=\\\"...\\\" would redirect Germany deep link clicks.\",\"example\":\"\",\"type\":\"string\"},\"$android_wechat_url\":{\"description\":\"Change the redirect endpoint for WeChat on Android devices $android_url value\",\"example\":\"\",\"type\":\"string\"},\"$blackberry_url\":{\"description\":\"Change the redirect endpoint for Blackberry OS BlackBerry default URL (set in Link Settings) Deep link channel\",\"example\":\"\",\"type\":\"string\"},\"$desktop_url\":{\"description\":\"Redirect URL for desktop devices - mobile users will default to the app store.\",\"example\":\"\",\"type\":\"string\"},\"$desktop_web_only\":{\"description\":\"Force to open the $windows_desktop_url, $mac_desktop_url, $desktop_url, or $fallback_url in this order of precedence instead of the app\",\"example\":\"false\",\"type\":\"boolean\"},\"$fallback_url\":{\"description\":\"Change the redirect endpoint for all platforms - so you don't have to enable it by platform. Note that Branch will forward all robots to this URL, which overrides any OG tags entered in the link. System-wide Default URL (set in Link Settings)\",\"example\":\"\",\"type\":\"string\"},\"$fallback_url_xx\":{\"description\":\"Change the redirect endpoint for all platforms based on a lower-case Alpha-2 country code.\",\"example\":\"\",\"type\":\"string\"},\"$fire_url\":{\"description\":\"Change the redirect endpoint for Amazon Fire OS Fire default URL (set in Link Settings)\",\"example\":\"\",\"type\":\"string\"},\"$huawei_url\":{\"description\":\"Redirect to the Huawei App Gallery on Huawei devices. Only link level control. Format should be https://appgallery.huawei.com/app/{HUAWEI_APP_GALLERY_ID_HERE}\",\"example\":\"\",\"type\":\"string\"},\"$ios_url\":{\"description\":\"Change the redirect endpoint for iOS App Store page for your app (set in Link Settings)\",\"example\":\"\",\"type\":\"string\"},\"$ios_url_xx\":{\"description\":\"Change the redirect endpoint for iOS based on a lower-case Alpha-2 country code. For example, $ios_url_de=\\\"...\\\" would redirect Germany deep link clicks.\",\"example\":\"\",\"type\":\"string\"},\"$ios_wechat_url\":{\"description\":\"Change the redirect endpoint for WeChat on iOS devices $ios_url value\",\"example\":\"\",\"type\":\"string\"},\"$ipad_url\":{\"description\":\"Change the redirect endpoint for iPads $ios_url value\",\"example\":\"\",\"type\":\"string\"},\"$marketing_title\":{\"description\":\"Set the marketing title to see the Branch Deep Link in the Branch Dashboard (must also set `type` to 2).\",\"type\":\"string\"},\"$mobile_web_only\":{\"description\":\"Force to open the $ios_url, $android_url, or $fallback_url in this order of precedence instead of the app\",\"example\":\"false\",\"type\":\"boolean\"},\"$samsung_url\":{\"description\":\"Redirect to Samsung Galaxy Store on Samsung devices. Only link level control. Format should be http://www.samsungapps.com/appquery/appDetail.as?appId={PACKAGE_NAME_HERE}\",\"example\":\"\",\"type\":\"string\"},\"$web_only\":{\"description\":\"Force to open the $fallback_url instead of the app\",\"example\":\"false\",\"type\":\"boolean\"},\"$windows_phone_url\":{\"description\":\"Change the redirect endpoint for Windows OS Windows Phone default URL (set in Link Settings)\",\"example\":\"\",\"type\":\"string\"}},\"type\":\"object\"},\"duration\":{\"description\":\"In seconds. Only set this key if you want to override the match duration for deep link matching. This is the time that Branch allows a click to remain outstanding and be eligible to be matched with a new app session. This is default set to 7200 (2 hours).\",\"example\":\"7200\",\"type\":\"integer\"},\"feature\":{\"description\":\"Deep link feature set\",\"example\":\"onboarding\",\"type\":\"string\"},\"stage\":{\"description\":\"\",\"example\":\"new user\",\"type\":\"string\"},\"tags\":{\"description\":\"Social media tags\",\"items\":{\"example\":\"one\",\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"description\":\"Set type to 2 to see the Branch Deep Link in the Branch Dashboard (must also set `$marketing_title`).\",\"example\":\"2\",\"type\":\"integer\"}},\"required\":[\"branch_key\"],\"type\":\"object\"},\"type\":\"array\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"url\":{\"description\":\"Generated URL\",\"example\":\"https://example.app.link/{UNIQUE_PATH_HERE}\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Ok\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"message\\\": \\\"Authentication failed !\\\",\\n        \\\"code\\\": 400\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"400\",\"type\":\"integer\"},\"message\":{\"example\":\"Authentication failed !\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication Failed\"},\"429\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"code\\\": 429,\\n        \\\"message\\\": \\\"Rate limit reached.\\\"\\n    }\\n}\"}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Rate Limit Reached\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/url/bulk/{branch_key}", "rename": { "param": { "branch_key": "id" } }, "segments": [{ "lit": "url" }, { "lit": "bulk" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "bulk", "name__orig": "bulk", "Name": "Bulk", "name_": "bulk", "name-": "bulk", "NAME": "BULK", "index$": 0 }, { "active": true, "entity": "bulk", "key$": "BasicBulkFlow", "kind": "basic", "name": "BasicBulkFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "bulk_ref01" }, "match": { "branch_key": "branch_key01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Bulk');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const bulk_ref01_ent = client.Bulk();
        let bulk_ref01_data = setup.data.new.bulk['bulk_ref01'];
        bulk_ref01_data['branch_key'] = setup.idmap['branch_key01'];
        bulk_ref01_data = (await bulk_ref01_ent.create(bulk_ref01_data)).data();
        (0, node_assert_1.default)(null != bulk_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bulk/BulkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BranchQuickLinksSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bulk01', 'bulk02', 'bulk03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BRANCH_QUICK_LINKS_TEST_BULK_ENTID': idmap,
        'BRANCH_QUICK_LINKS_TEST_LIVE': 'FALSE',
        'BRANCH_QUICK_LINKS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BRANCH_QUICK_LINKS_TEST_BULK_ENTID'];
    const live = 'TRUE' === env.BRANCH_QUICK_LINKS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BRANCH_QUICK_LINKS_TEST_BULK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BranchQuickLinksSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.BRANCH_QUICK_LINKS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BulkEntity.test.js.map