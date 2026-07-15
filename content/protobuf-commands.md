---
title: Protobuf Commands
description: protoc commands, schema rules, and practical Protocol Buffers notes.
---

# Protobuf Commands

## Mental Model

A `.proto` file is like a shipping label template. The field names help humans, but the field numbers are what travel on the wire. Once other systems use the label numbers, changing or reusing them can send packages to the wrong shelf.

## Install and Check Versions

| Task | Command |
| --- | --- |
| Check compiler version | `protoc --version` |
| Show compiler help | `protoc --help` |
| macOS install | `brew install protobuf` |
| Ubuntu install | `sudo apt-get install protobuf-compiler` |
| Check Go plugin | `protoc-gen-go --version` |

```bash
protoc --version
protoc --help
which protoc
```

## Basic File Layout

```proto
syntax = "proto3";

package cheatsheets.v1;

option go_package = "github.com/acme/cheatsheets/gen/cheatsheetspb;cheatsheetspb";
option java_package = "com.acme.cheatsheets.v1";
option java_multiple_files = true;

message Cheatsheet {
  string id = 1;
  string title = 2;
  repeated Command commands = 3;
}

message Command {
  string label = 1;
  string command = 2;
  optional string notes = 3;
}
```

## Generate Code

| Language | Command |
| --- | --- |
| Go | `protoc --proto_path=proto --go_out=gen/go proto/cheatsheets/v1/*.proto` |
| Go + gRPC | `protoc -I proto --go_out=gen/go --go-grpc_out=gen/go proto/cheatsheets/v1/*.proto` |
| Java | `protoc -I proto --java_out=gen/java proto/cheatsheets/v1/*.proto` |
| Python | `protoc -I proto --python_out=gen/python proto/cheatsheets/v1/*.proto` |
| TypeScript plugin example | `protoc -I proto --ts_out=gen/ts proto/cheatsheets/v1/*.proto` |
| Descriptor set | `protoc -I proto --include_imports --descriptor_set_out=build/schema.pb proto/**/*.proto` |

```bash
mkdir -p gen/go gen/java gen/python build

protoc -I proto \
  --go_out=gen/go \
  --go-grpc_out=gen/go \
  proto/cheatsheets/v1/*.proto
```

## Useful protoc Flags

| Flag | Use |
| --- | --- |
| `-I` / `--proto_path` | Adds a directory where imports are resolved. |
| `--go_out=DIR` | Generates Go message types. Requires `protoc-gen-go`. |
| `--go-grpc_out=DIR` | Generates Go gRPC service bindings. Requires `protoc-gen-go-grpc`. |
| `--java_out=DIR` | Generates Java classes. |
| `--python_out=DIR` | Generates Python classes. |
| `--descriptor_set_out=FILE` | Emits a binary descriptor file for tooling. |
| `--include_imports` | Includes imported files in the descriptor set. |
| `--include_source_info` | Includes comments/source locations in descriptors. |
| `--decode=TYPE` | Decodes binary protobuf from stdin using a message type. |
| `--decode_raw` | Decodes unknown binary protobuf without a schema. |

```bash
protoc -I proto \
  --include_imports \
  --include_source_info \
  --descriptor_set_out=build/cheatsheets.desc \
  proto/cheatsheets/v1/*.proto
```

## Decode and Debug Payloads

Decode with a known schema:

```bash
cat payload.bin \
  | protoc -I proto --decode=cheatsheets.v1.Cheatsheet proto/cheatsheets/v1/cheatsheet.proto
```

Decode raw wire data when you do not have the schema:

```bash
cat payload.bin | protoc --decode_raw
```

Encode text format into binary:

```bash
cat payload.textproto \
  | protoc -I proto --encode=cheatsheets.v1.Cheatsheet proto/cheatsheets/v1/cheatsheet.proto \
  > payload.bin
```

## Find Proto Files and Symbols

```bash
find proto -name '*.proto' -print
grep -RIn 'message Cheatsheet' proto
grep -RIn 'service .*Service' proto
grep -RIn 'reserved ' proto
grep -RIn 'optional ' proto
```

## Go Plugin Setup

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

export PATH="$PATH:$(go env GOPATH)/bin"
protoc-gen-go --version
```

## npm / TypeScript Plugin Pattern

Different TypeScript protobuf libraries use different plugins and flags. The pattern is the same: install the plugin, make sure it is on `PATH`, then pass its matching `--*_out` flag.

```bash
npm install --save-dev @bufbuild/protoc-gen-es

protoc -I proto \
  --plugin=protoc-gen-es=./node_modules/.bin/protoc-gen-es \
  --es_out=gen/ts \
  proto/cheatsheets/v1/*.proto
```

## buf Workflow Commands

`buf` is common in modern protobuf repos because it adds linting, breaking-change checks, and generation config.

```bash
buf lint
buf format -w
buf breaking --against '.git#branch=main'
buf generate
```

Typical files:

```yaml
# buf.yaml
version: v2
lint:
  use:
    - STANDARD
breaking:
  use:
    - FILE
```

```yaml
# buf.gen.yaml
version: v2
plugins:
  - remote: buf.build/protocolbuffers/go
    out: gen/go
    opt: paths=source_relative
```

## Field Number Rules

| Rule | Why |
| --- | --- |
| Never reuse a field number | Old data can decode as the wrong field. |
| Reserve deleted field numbers | Blocks accidental reuse later. |
| Reserve deleted field names | Helps JSON/TextFormat compatibility. |
| Use `1` through `15` for frequent fields | These field numbers encode smaller on the wire. |
| Avoid field numbers `19000` through `19999` | Reserved by Protocol Buffers. |

```proto
message User {
  reserved 4, 8, 12;
  reserved "legacy_status", "old_email";

  string id = 1;
  string email = 2;
  optional string display_name = 3;
}
```

## Safe Schema Evolution

Generally safe:

- Add a new field with a new number.
- Rename a field while keeping the same number, if JSON/TextFormat names are not part of your contract.
- Add enum values, as long as old clients can tolerate unknown values.
- Change comments.

Dangerous:

- Reuse field numbers.
- Change a field number.
- Change a scalar field to an incompatible type.
- Move fields into or out of a `oneof` after clients depend on them.
- Delete a field without reserving its number and name.

## Presence and Defaults

Proto3 scalar fields without `optional` use default values when unset, so a missing `int32 count` and an explicit `count = 0` can look the same.

```proto
message InventoryItem {
  string sku = 1;
  optional int32 quantity = 2;
}
```

Use `optional` when your code needs to know the difference between “not provided” and “provided as the default value.”

## Enums

Start enums with a zero value. Treat it as unknown or unspecified.

```proto
enum ItemState {
  ITEM_STATE_UNSPECIFIED = 0;
  ITEM_STATE_ACTIVE = 1;
  ITEM_STATE_ARCHIVED = 2;
}
```

Good to know:

- Prefix enum values with the enum name or domain to avoid name collisions.
- Do not reorder enum numbers just to make the list look cleaner.
- Reserve removed enum numbers and names.

## oneof

Use `oneof` when exactly one of several fields should be set.

```proto
message SearchTarget {
  oneof target {
    string sku = 1;
    string barcode = 2;
    string serial_number = 3;
  }
}
```

Good to know:

- Setting one field clears the other fields in the same `oneof`.
- Be careful changing existing fields into a `oneof`; it can break old clients.

## Maps

```proto
message Labels {
  map<string, string> values = 1;
}
```

Good to know:

- Map order is not a stable API contract.
- Map keys can be integral or string types, but not floating-point, bytes, message, or enum types.

## Packages and Imports

```proto
import "google/protobuf/timestamp.proto";

message AuditEntry {
  string id = 1;
  google.protobuf.Timestamp created_at = 2;
}
```

Good to know:

- Use a package name to avoid type collisions.
- Keep import paths stable.
- Generated language package options are separate from the protobuf package.

## Well-Known Types

| Type | Use |
| --- | --- |
| `google.protobuf.Timestamp` | Point in time. |
| `google.protobuf.Duration` | Time span. |
| `google.protobuf.Empty` | Empty request or response. |
| `google.protobuf.Struct` | Dynamic JSON-like data. |
| `google.protobuf.Any` | Carries arbitrary typed messages. Use sparingly. |
| Wrapper types | Legacy nullable scalar pattern; prefer `optional` for new proto3 scalar presence. |

## JSON Mapping Notes

- Binary protobuf uses field numbers; JSON uses field names.
- Protobuf JSON names are usually lowerCamelCase.
- Unknown fields can behave differently in JSON than in binary.
- Do not assume JSON serialization is byte-for-byte stable.

## Common Errors

| Error | Likely Fix |
| --- | --- |
| `protoc-gen-go: program not found` | Install the plugin and add `$(go env GOPATH)/bin` to `PATH`. |
| `File not found` for imports | Add the correct `-I` directory. |
| Generated files in weird paths | Check `go_package`, package options, and plugin `paths` options. |
| Old clients read wrong data | Check whether a field number was reused or type-changed. |
| Missing zero enum value | Add an `_UNSPECIFIED = 0` value. |

## Good Defaults

- Put one API version in each package, such as `inventory.v1`.
- Prefer `optional` for scalar fields where presence matters.
- Reserve deleted fields immediately.
- Use comments on messages, fields, services, and RPCs.
- Generate code in CI to catch plugin drift.
- Use a breaking-change checker before merging schema changes.

## Official Docs

- [Protocol Buffers Tutorials](https://protobuf.dev/getting-started/)
- [Language Guide proto3](https://protobuf.dev/programming-guides/proto3/)
- [Language Guide editions](https://protobuf.dev/programming-guides/editions/)
- [Proto Best Practices](https://protobuf.dev/best-practices/dos-donts/)
- [Style Guide](https://protobuf.dev/programming-guides/style/)
