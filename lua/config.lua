-- BranchQuickLinks SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "BranchQuickLinks",
      slug = "branch-quick-links",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api2.branch.io/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["bulk"] = {},
        ["url"] = {},
      },
    },
    entity = {
      ["bulk"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "bulk",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "key_live_xxxx",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "branch_key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/url/bulk/{branch_key}",
                ["rename"] = {
                  ["param"] = {
                    ["branch_key"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "url",
                  },
                  {
                    ["lit"] = "bulk",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "url",
                  "bulk",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["url"] = {
        ["fields"] = {
          {
            ["name"] = "alias",
            ["short"] = "Instead of our standard encoded short url, you can specify the vanity alias.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "analytics",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "branch_key",
            ["req"] = true,
            ["short"] = "The Branch Key of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "branch_secret",
            ["req"] = true,
            ["short"] = "The Branch Secret of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "campaign",
            ["short"] = "Campaign name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "channel",
            ["short"] = "Deep link channel",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "data",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "deleted",
            ["short"] = "Deletion status",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "duration",
            ["short"] = "In seconds.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "feature",
            ["short"] = "Deep link feature set",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "qr_code_settings",
            ["short"] = "QR code customization settings.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "stage",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tags",
            ["short"] = "Social media tags",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "type",
            ["short"] = "Set to 2 in order to see Branch Deep Link URLs in the Branch Dashboard (must also set `$marketing_title`).",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "url",
            ["short"] = "Generated URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "url",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/url",
                ["segments"] = {
                  {
                    ["lit"] = "url",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "url",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "https://example.app.link/{UNIQUE_PATH_HERE}",
                      ["kind"] = "query",
                      ["name"] = "url",
                      ["orig"] = "url",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/url",
                ["segments"] = {
                  {
                    ["lit"] = "url",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "url",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "url",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
