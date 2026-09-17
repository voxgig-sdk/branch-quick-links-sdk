package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/branch-quick-links-sdk/go"
	"github.com/voxgig-sdk/branch-quick-links-sdk/go/core"

	vs "github.com/voxgig-sdk/branch-quick-links-sdk/go/utility/struct"
)

func TestBulkEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Bulk(nil)
		if ent == nil {
			t.Fatal("expected non-nil BulkEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := bulkBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bulk." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set BRANCH_QUICK_LINKS_TEST_BULK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		bulkRef01Ent := client.Bulk(nil)
		bulkRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "bulk"}), "bulk_ref01"))
		bulkRef01Data["branch_key"] = setup.idmap["branch_key01"]

		bulkRef01DataResult, err := bulkRef01Ent.Create(bulkRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		bulkRef01Data = core.ToMapAny(entityData(bulkRef01DataResult))
		if bulkRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if bulkRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

	})
}

func bulkBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bulk", "BulkTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bulk test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bulk test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"bulk01", "bulk02", "bulk03", "branch_key01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("BRANCH_QUICK_LINKS_TEST_BULK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"BRANCH_QUICK_LINKS_TEST_BULK_ENTID": idmap,
		"BRANCH_QUICK_LINKS_TEST_LIVE":      "FALSE",
		"BRANCH_QUICK_LINKS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["BRANCH_QUICK_LINKS_TEST_BULK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["BRANCH_QUICK_LINKS_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewBranchQuickLinksSDK(core.ToMapAny(mergedOpts))
	}

	live := env["BRANCH_QUICK_LINKS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["BRANCH_QUICK_LINKS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
