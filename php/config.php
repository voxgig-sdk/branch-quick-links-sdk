<?php
declare(strict_types=1);

// BranchQuickLinks SDK configuration

class BranchQuickLinksConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "BranchQuickLinks",
                "slug" => "branch-quick-links",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "debug" => [
          'options' => [
            'active' => false,
            'max' => 100,
            'redact' => [
              'authorization',
              'cookie',
              'set-cookie',
              'api-key',
              'apikey',
              'x-api-key',
              'idempotency-key',
            ],
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'onEntry' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "idempotency" => [
          'options' => [
            'active' => false,
            'header' => 'Idempotency-Key',
            'methods' => [
              'POST',
              'PUT',
              'PATCH',
              'DELETE',
            ],
            'ops' => [
              'create',
              'update',
              'remove',
            ],
          ],
          'optspec' => [
            'keygen' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "metrics" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "paging" => [
          'options' => [
            'active' => false,
            'afterVar' => 'after',
            'cursorParam' => 'cursor',
            'firstVar' => 'first',
            'limitParam' => 'limit',
            'pageParam' => 'page',
            'startPage' => 1,
          ],
          'optspec' => [
            'limit' => '`$NUMBER`',
            'ops' => '`$LIST`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api2.branch.io/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "bulk" => [],
                    "url" => [],
                ],
            ],
            "entity" => [
        'bulk' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'bulk',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/url/bulk/{branch_key}',
                  'segments' => [
                    [
                      'lit' => 'url',
                    ],
                    [
                      'lit' => 'bulk',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'url',
                    'bulk',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'branch_key' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'branch_key',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'key_live_xxxx',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'url' => [
          'fields' => [
            [
              'name' => 'alias',
              'title' => 'Alias',
              'type' => '`$STRING`',
              'short' => 'Instead of our standard encoded short url, you can specify the vanity alias.',
            ],
            [
              'name' => 'analytics',
              'title' => 'Analytics',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'branch_key',
              'title' => 'Branch Key',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The Branch Key of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard.',
            ],
            [
              'name' => 'branch_secret',
              'title' => 'Branch Secret',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The Branch Secret of the originating app, found in the [Settings](https://help.branch.io/using-branch/docs/profile-settings) tab of your Branch Dashboard',
            ],
            [
              'name' => 'campaign',
              'title' => 'Campaign',
              'type' => '`$STRING`',
              'short' => 'Campaign name',
            ],
            [
              'name' => 'channel',
              'title' => 'Channel',
              'type' => '`$STRING`',
              'short' => 'Deep link channel',
            ],
            [
              'name' => 'data',
              'title' => 'Data',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'deleted',
              'title' => 'Deleted',
              'type' => '`$BOOLEAN`',
              'short' => 'Deletion status',
            ],
            [
              'name' => 'duration',
              'title' => 'Duration',
              'type' => '`$INTEGER`',
              'short' => 'In seconds.',
            ],
            [
              'name' => 'feature',
              'title' => 'Feature',
              'type' => '`$STRING`',
              'short' => 'Deep link feature set',
            ],
            [
              'name' => 'qr_code_settings',
              'title' => 'Qr Code Settings',
              'type' => '`$OBJECT`',
              'short' => 'QR code customization settings.',
            ],
            [
              'name' => 'stage',
              'title' => 'Stage',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tags',
              'title' => 'Tags',
              'type' => '`$ARRAY`',
              'short' => 'Social media tags',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$INTEGER`',
              'short' => 'Set to 2 in order to see Branch Deep Link URLs in the Branch Dashboard (must also set `$marketing_title`).',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'short' => 'Generated URL',
            ],
          ],
          'name' => 'url',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/url',
                  'segments' => [
                    [
                      'lit' => 'url',
                    ],
                  ],
                  'parts' => [
                    'url',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/url',
                  'segments' => [
                    [
                      'lit' => 'url',
                    ],
                  ],
                  'parts' => [
                    'url',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'url',
                        'orig' => 'url',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'https://example.app.link/{UNIQUE_PATH_HERE}',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'url',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return BranchQuickLinksFeatures::make_feature($name);
    }
}
