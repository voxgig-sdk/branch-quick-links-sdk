

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BranchQuickLinksSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BulkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRANCH_QUICK_LINKS_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRANCH_QUICK_LINKS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BranchQuickLinksSDK.test()
    const ent = testsdk.Bulk()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRANCH_QUICK_LINKS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bulk.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"bulk","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /url/bulk/{branch_key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"key_live_xxxx","k":"param","n":"id","or":"branch_key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/url/bulk/{branch_key}","q":{"exist":["id"]},"r":{"param":{"branch_key":"id"}},"s":[{"lit":"url"},{"lit":"bulk"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"bulk","name__orig":"bulk","Name":"Bulk","name_":"bulk","name-":"bulk","NAME":"BULK","index$":0}, {"active":true,"entity":"bulk","key$":"BasicBulkFlow","kind":"basic","name":"BasicBulkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bulk_ref01"},"m":{"branch_key":"branch_key01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Bulk', {"POST /url/bulk/{branch_key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"array","items":{"type":"object","required":["branch_key"],"properties":{"channel":{"type":"string","description":"Deep link channel","example":"facebook"},"feature":{"type":"string","description":"Deep link feature set","example":"onboarding"},"campaign":{"type":"string","description":"Campaign name","example":"new product"},"stage":{"type":"string","description":"","example":"new user"},"tags":{"type":"array","description":"Social media tags","items":{"type":"string","example":"one"}},"data":{"type":"object","properties":{"$marketing_title":{"type":"string","description":"Set the marketing title to see the Branch Deep Link in the Branch Dashboard (must also set `type` to 2)."},"$fallback_url":{"type":"string","description":"Change the redirect endpoint for all platforms - so you don't have to enable it by platform. Note that Branch will forward all robots to this URL, which overrides any OG tags entered in the link. System-wide Default URL (set in Link Settings)","example":""},"$fallback_url_xx":{"type":"string","description":"Change the redirect endpoint for all platforms based on a lower-case Alpha-2 country code.","example":""},"$desktop_url":{"type":"string","description":"Redirect URL for desktop devices - mobile users will default to the app store.","example":""},"$ios_url":{"type":"string","description":"Change the redirect endpoint for iOS App Store page for your app (set in Link Settings)","example":""},"$ios_url_xx":{"type":"string","description":"Change the redirect endpoint for iOS based on a lower-case Alpha-2 country code. For example, $ios_url_de=\"...\" would redirect Germany deep link clicks.","example":""},"$ipad_url":{"type":"string","description":"Change the redirect endpoint for iPads $ios_url value","example":""},"$android_url":{"type":"string","description":"Change the redirect endpoint for Android Play Store page for your app (set in Link Settings)","example":""},"$android_url_xx":{"type":"string","description":"Change the redirect endpoint for Android based on a lower-case Alpha-2 country code. For example, $android_url_de=\"...\" would redirect Germany deep link clicks.","example":""},"$samsung_url":{"type":"string","description":"Redirect to Samsung Galaxy Store on Samsung devices. Only link level control. Format should be http://www.samsungapps.com/appquery/appDetail.as?appId={PACKAGE_NAME_HERE}","example":""},"$huawei_url":{"type":"string","description":"Redirect to the Huawei App Gallery on Huawei devices. Only link level control. Format should be https://appgallery.huawei.com/app/{HUAWEI_APP_GALLERY_ID_HERE}","example":""},"$windows_phone_url":{"type":"string","description":"Change the redirect endpoint for Windows OS Windows Phone default URL (set in Link Settings)","example":""},"$blackberry_url":{"type":"string","description":"Change the redirect endpoint for Blackberry OS BlackBerry default URL (set in Link Settings) Deep link channel","example":""},"$fire_url":{"type":"string","description":"Change the redirect endpoint for Amazon Fire OS Fire default URL (set in Link Settings)","example":""},"$ios_wechat_url":{"type":"string","description":"Change the redirect endpoint for WeChat on iOS devices $ios_url value","example":""},"$android_wechat_url":{"type":"string","description":"Change the redirect endpoint for WeChat on Android devices $android_url value","example":""},"$web_only":{"type":"boolean","description":"Force to open the $fallback_url instead of the app","example":"false"},"$desktop_web_only":{"type":"boolean","description":"Force to open the $windows_desktop_url, $mac_desktop_url, $desktop_url, or $fallback_url in this order of precedence instead of the app","example":"false"},"$mobile_web_only":{"type":"boolean","description":"Force to open the $ios_url, $android_url, or $fallback_url in this order of precedence instead of the app","example":"false"},"$after_click_url":{"type":"string","description":"When a user returns to the browser after going to the app, take them to this URL. iOS only; Android coming soon","example":""},"$afterclick_desktop_url":{"type":"boolean","description":"When a user on desktop returns to the desktop browser after going to the desktop app, take them to this URL.","example":"false"}}},"alias":{"type":"string","description":"Instead of our standard encoded short url, you can specify the vanity alias. For example, instead of a random string of characters/integers, you can set the vanity alias as .app.link/devonaustin.","example":""},"type":{"type":"integer","description":"Set type to 2 to see the Branch Deep Link in the Branch Dashboard (must also set `$marketing_title`).","example":"2"},"duration":{"type":"integer","description":"In seconds. Only set this key if you want to override the match duration for deep link matching. This is the time that Branch allows a click to remain outstanding and be eligible to be matched with a new app session. This is default set to 7200 (2 hours).","example":"7200"},"analytics":{"type":"object","properties":{"~channel":{"type":"string","description":"Use channel to tag the route that your link reaches users. For example, tag links with 'Facebook' or 'LinkedIn' to help track clicks and installs through those paths separately","example":""},"~feature":{"type":"string","description":"This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature 'referral'","example":""},"~campaign":{"type":"string","description":"Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that","example":""},"~campaign_id":{"type":"string","description":"Use this field to organize the links by actual campaign id. For example, if you launched a new feature or product and want to run a campaign around that","example":""},"~customer_campaign":{"type":"string","description":"The customer campaign specified for the last attributed touch. can be specified on links by the client.","example":""},"~stage":{"type":"string","description":"Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter","example":""},"~tags":{"type":"array","description":"This is a free form entry with unlimited values ['string']. Use it to organize your link data with labels that don't fit within the bounds of the above","items":{}},"~secondary_publisher":{"type":"string","description":"secondary publisher specified for the last attributed touch. passed by the ad network.","example":""},"~customer_secondary_publisher":{"type":"string","description":"The ID of the secondary publisher specified for the last attributed touch. can be specified on links by the client.","example":""},"~creative_name":{"type":"string","description":"The creative name specified for the last attributed touch.","example":""},"~creative_id":{"type":"string","description":"The creative ID specified for the last attributed touch.","example":""},"~ad_set_name":{"type":"string","description":"The ad set name specified for the last attributed touch.","example":""},"~ad_set_id":{"type":"string","description":"The ad set ID specified for the last attributed touch.","example":""},"~customer_ad_set_name":{"type":"string","description":"The customer ad set name specified for the last attributed touch. can be specified on links by the client.","example":""},"~ad_name":{"type":"string","description":"The ad name specified for the last attributed touch.","example":""},"~ad_id":{"type":"string","description":"The ad ID specified for the last attributed touch.","example":""},"~customer_ad_name":{"type":"string","description":"The customer ad name specified for the last attributed touch. can be specified on the link by the client.","example":""},"~keyword":{"type":"string","description":"The keyword specified for the last attributed touch.","example":""},"~keyword_id":{"type":"string","description":"The unique ID for keyword of the last touch","example":""},"~customer_keyword":{"type":"string","description":"The customer keyword of the last touch. Can be specified on links by the client.","example":""},"~placement":{"type":"string","description":"The placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns.","example":""},"~placement_id":{"type":"string","description":"The ID of placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns.","example":""},"~customer_placement":{"type":"string","description":"The customer specified placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. Can be specified on the link by the client.","example":""},"~sub_site_name":{"type":"string","description":"Reference to the site where the ad was displayed.","example":""},"~customer_sub_site_name":{"type":"string","description":"Customer reference to the site where the ad was displayed. Can be specified on links by the client.","example":""}}}},"x-ref":"#/components/schemas/create_bulk_url_object"},"x-ref":"#/components/schemas/create_bulk_url_request_array_body","index$":1}}}},"parameters":[{"name":"branch_key","in":"path","description":"The Branch Key of the originating app, found in the Settings tab of your Branch Dashboard\n","required":"true","schema":{"type":"string","example":"key_live_xxxx"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const bulk_ref01_ent = client.Bulk()
    let bulk_ref01_data = setup.data.new.bulk['bulk_ref01']
    bulk_ref01_data['branch_key'] = setup.idmap['branch_key01']

    bulk_ref01_data = (await bulk_ref01_ent.create(bulk_ref01_data)).data()
    assert(null != bulk_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bulk/BulkTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BranchQuickLinksSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['bulk01','bulk02','bulk03','branch_key01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRANCH_QUICK_LINKS_TEST_BULK_ENTID': idmap,
    'BRANCH_QUICK_LINKS_TEST_LIVE': 'FALSE',
    'BRANCH_QUICK_LINKS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRANCH_QUICK_LINKS_TEST_BULK_ENTID']

  const live = 'TRUE' === env.BRANCH_QUICK_LINKS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRANCH_QUICK_LINKS_TEST_BULK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BranchQuickLinksSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
