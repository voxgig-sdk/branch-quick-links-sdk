package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestUrlEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Url(nil)
		if ent == nil {
			t.Fatal("expected non-nil UrlEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := urlBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "url." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set BRANCH_QUICK_LINKS_TEST_URL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		urlRef01Ent := client.Url(nil)
		urlRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "url"}), "url_ref01"))

		urlRef01DataResult, err := urlRef01Ent.Create(urlRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		urlRef01Data = core.ToMapAny(entityData(urlRef01DataResult))
		if urlRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// UPDATE
		urlRef01DataUp0Up := map[string]any{
		}

		urlRef01MarkdefUp0Name := "alias"
		urlRef01MarkdefUp0Value := fmt.Sprintf("Mark01-url_ref01_%d", setup.now)
		urlRef01DataUp0Up[urlRef01MarkdefUp0Name] = urlRef01MarkdefUp0Value

		urlRef01ResdataUp0Result, err := urlRef01Ent.Update(urlRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		urlRef01ResdataUp0 := core.ToMapAny(entityData(urlRef01ResdataUp0Result))
		if urlRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if urlRef01ResdataUp0[urlRef01MarkdefUp0Name] != urlRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", urlRef01MarkdefUp0Name, urlRef01ResdataUp0[urlRef01MarkdefUp0Name])
		}

	})
}

func urlBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "url", "UrlTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read url test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse url test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"url01", "url02", "url03"},
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
	entidEnvRaw := os.Getenv("BRANCH_QUICK_LINKS_TEST_URL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"BRANCH_QUICK_LINKS_TEST_URL_ENTID": idmap,
		"BRANCH_QUICK_LINKS_TEST_LIVE":      "FALSE",
		"BRANCH_QUICK_LINKS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["BRANCH_QUICK_LINKS_TEST_URL_ENTID"])
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
