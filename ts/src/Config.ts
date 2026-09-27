
import { BaseFeature } from './feature/base/BaseFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'BranchQuickLinks',
        slug: "branch-quick-links",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api2.branch.io/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        bulk: {
        },
  
        url: {
        },
  
    }
  }


  entity = {
    "bulk": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "bulk",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/url/bulk/{branch_key}",
              "segments": [
                {
                  "lit": "url"
                },
                {
                  "lit": "bulk"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "url",
                "bulk",
                "{id}"
              ],
              "rename": {
                "param": {
                  "branch_key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "branch_key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "key_live_xxxx"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "url": {
      "fields": [
        {
          "name": "alias",
          "title": "Alias",
          "type": "`$STRING`",
          "short": "Instead of our standard encoded short url, you can specify the vanity alias."
        },
        {
          "name": "analytics",
          "title": "Analytics",
          "type": "`$OBJECT`"
        },
        {
          "name": "branch_key",
          "title": "Branch Key",
          "type": "`$STRING`",
          "req": true,
          "short": "The Branch Key of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard."
        },
        {
          "name": "branch_secret",
          "title": "Branch Secret",
          "type": "`$STRING`",
          "req": true,
          "short": "The Branch Secret of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard"
        },
        {
          "name": "campaign",
          "title": "Campaign",
          "type": "`$STRING`",
          "short": "Campaign name"
        },
        {
          "name": "channel",
          "title": "Channel",
          "type": "`$STRING`",
          "short": "Deep link channel"
        },
        {
          "name": "data",
          "title": "Data",
          "type": "`$OBJECT`"
        },
        {
          "name": "deleted",
          "title": "Deleted",
          "type": "`$BOOLEAN`",
          "short": "Deletion status"
        },
        {
          "name": "duration",
          "title": "Duration",
          "type": "`$INTEGER`",
          "short": "In seconds."
        },
        {
          "name": "feature",
          "title": "Feature",
          "type": "`$STRING`",
          "short": "Deep link feature set"
        },
        {
          "name": "qr_code_settings",
          "title": "Qr Code Settings",
          "type": "`$OBJECT`",
          "short": "QR code customization settings."
        },
        {
          "name": "stage",
          "title": "Stage",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "title": "Tags",
          "type": "`$ARRAY`",
          "short": "Social media tags"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$INTEGER`",
          "short": "Set to 2 in order to see Branch Deep Link URLs in the Branch Dashboard (must also set `$marketing_title`)."
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "Generated URL"
        }
      ],
      "name": "url",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/url",
              "segments": [
                {
                  "lit": "url"
                }
              ],
              "parts": [
                "url"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/url",
              "segments": [
                {
                  "lit": "url"
                }
              ],
              "parts": [
                "url"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "url",
                    "orig": "url",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "https://example.app.link/{UNIQUE_PATH_HERE}"
                  }
                ]
              },
              "select": {
                "exist": [
                  "url"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

