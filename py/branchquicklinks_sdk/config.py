# BranchQuickLinks SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "BranchQuickLinks",
            "slug": "branch-quick-links",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api2.branch.io/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bulk": {},
                "url": {},
            },
        },
        "entity": {
      "bulk": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "bulk",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "key_live_xxxx",
                      "kind": "param",
                      "name": "id",
                      "orig": "branch_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/url/bulk/{branch_key}",
                "rename": {
                  "param": {
                    "branch_key": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "url",
                  },
                  {
                    "lit": "bulk",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "url",
                  "bulk",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "url": {
        "fields": [
          {
            "name": "alias",
            "short": "Instead of our standard encoded short url, you can specify the vanity alias.",
            "type": "`$STRING`",
          },
          {
            "name": "analytics",
            "type": "`$OBJECT`",
          },
          {
            "name": "branch_key",
            "req": True,
            "short": "The Branch Key of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard.",
            "type": "`$STRING`",
          },
          {
            "name": "branch_secret",
            "req": True,
            "short": "The Branch Secret of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard",
            "type": "`$STRING`",
          },
          {
            "name": "campaign",
            "short": "Campaign name",
            "type": "`$STRING`",
          },
          {
            "name": "channel",
            "short": "Deep link channel",
            "type": "`$STRING`",
          },
          {
            "name": "data",
            "type": "`$OBJECT`",
          },
          {
            "name": "deleted",
            "short": "Deletion status",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "duration",
            "short": "In seconds.",
            "type": "`$INTEGER`",
          },
          {
            "name": "feature",
            "short": "Deep link feature set",
            "type": "`$STRING`",
          },
          {
            "name": "qr_code_settings",
            "short": "QR code customization settings.",
            "type": "`$OBJECT`",
          },
          {
            "name": "stage",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "short": "Social media tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "short": "Set to 2 in order to see Branch Deep Link URLs in the Branch Dashboard (must also set `$marketing_title`).",
            "type": "`$INTEGER`",
          },
          {
            "name": "url",
            "short": "Generated URL",
            "type": "`$STRING`",
          },
        ],
        "name": "url",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/url",
                "segments": [
                  {
                    "lit": "url",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "url",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "https://example.app.link/{UNIQUE_PATH_HERE}",
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/url",
                "segments": [
                  {
                    "lit": "url",
                  },
                ],
                "select": {
                  "exist": [
                    "url",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "url",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
