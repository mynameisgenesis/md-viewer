---
title: Kubernetes Cluster Search
description: Advanced kubectl, grep, jq, yq, and log searches for finding content in a cluster.
---

# Kubernetes Cluster Search

## Mental Model

Think of the cluster like a huge filing cabinet. `kubectl` opens drawers, selectors narrow the folders, JSONPath or `jq` pulls exact fields, and `grep` finds words inside the paperwork.

## Before You Search

| Task | Command |
| --- | --- |
| Current context | `kubectl config current-context` |
| Current namespace | `kubectl config view --minify --output 'jsonpath={..namespace}'` |
| List namespaces | `kubectl get ns` |
| Search all namespaces | Add `-A` or `--all-namespaces` |
| Show resource API names | `kubectl api-resources` |

```bash
kubectl config current-context
kubectl get pods -A
kubectl api-resources --verbs=list --namespaced=true
```

## Fast Object Discovery

| Goal | Command |
| --- | --- |
| Find resources by name | `kubectl get all -A | grep -i 'checkout'` |
| Find pods by broad text | `kubectl get pods -A -o wide | grep -i 'imagepull'` |
| Find non-running pods | `kubectl get pods -A --field-selector=status.phase!=Running` |
| Find pods on a node | `kubectl get pods -A --field-selector spec.nodeName=worker-1` |
| Find services by exposed port | `kubectl get svc -A | grep ':443'` |
| Find all ingress hosts | `kubectl get ingress -A` |

```bash
kubectl get all -A | grep -Ei 'checkout|payment|billing'
kubectl get pods -A --field-selector=status.phase=Pending
kubectl get events -A --sort-by=.lastTimestamp | tail -50
```

## Label Selectors

Labels are like tags on boxes. Use them when the app is labeled consistently.

| Goal | Command |
| --- | --- |
| Match exact label | `kubectl get pods -l app=checkout` |
| Match multiple labels | `kubectl get pods -l app=checkout,tier=api` |
| Match label exists | `kubectl get pods -l 'app'` |
| Match label not equal | `kubectl get pods -l 'env!=prod'` |
| Match set | `kubectl get pods -l 'env in (prod,staging)'` |

```bash
kubectl get deploy,svc,pods -A -l app.kubernetes.io/name=checkout
kubectl get pods -A -l 'app in (checkout,payment),tier=api'
```

## Field Selectors

Field selectors filter by Kubernetes object fields, not your custom labels.

| Goal | Command |
| --- | --- |
| Pods on one node | `kubectl get pods -A --field-selector spec.nodeName=worker-1` |
| Running pods only | `kubectl get pods -A --field-selector status.phase=Running` |
| Failed pods | `kubectl get pods -A --field-selector status.phase=Failed` |
| Events for one object | `kubectl get events --field-selector involvedObject.name=my-pod` |
| Non-normal events | `kubectl get events -A --field-selector type!=Normal` |

```bash
kubectl get events -A \
  --field-selector type!=Normal \
  --sort-by=.lastTimestamp
```

## Grep Through YAML

Use YAML output when you do not know where a value lives.

```bash
kubectl get deploy -A -o yaml | grep -n -i 'image:'
kubectl get pods -A -o yaml | grep -n -i 'serviceAccountName'
kubectl get ingress -A -o yaml | grep -n -Ei 'host:|path:|service:'
kubectl get cm -A -o yaml | grep -n -i 'feature_flag'
```

Add context around matches:

```bash
kubectl get deploy -A -o yaml | grep -n -C 3 -i 'checkout-api'
kubectl get pods -A -o yaml | grep -n -B 5 -A 8 -i 'crashloop'
```

## Search Images

```bash
kubectl get pods -A \
  -o jsonpath='{range .items[*]}{.metadata.namespace}{"/"}{.metadata.name}{"\t"}{range .spec.containers[*]}{.image}{" "}{end}{"\n"}{end}' \
  | grep -i 'nginx'
```

With `jq`:

```bash
kubectl get pods -A -o json \
  | jq -r '.items[] | [.metadata.namespace, .metadata.name, (.spec.containers[].image)] | @tsv' \
  | grep -i 'redis'
```

## Search Environment Variables

```bash
kubectl get deploy -A -o json \
  | jq -r '
    .items[]
    | .metadata.namespace as $ns
    | .metadata.name as $name
    | .spec.template.spec.containers[]
    | select(.env != null)
    | .env[]
    | [$ns, $name, .name, (.value // "valueFrom")] | @tsv
  ' \
  | grep -i 'database'
```

## Search ConfigMaps and Secrets

ConfigMaps are normal text. Secrets are base64-encoded and may contain credentials.

```bash
kubectl get cm -A -o yaml | grep -n -i 'spring.profiles.active'
kubectl get cm -A -o json \
  | jq -r '.items[] | [.metadata.namespace, .metadata.name, (.data | keys[]?)] | @tsv'
```

Search secret keys without printing values:

```bash
kubectl get secret -A -o json \
  | jq -r '.items[] | [.metadata.namespace, .metadata.name, (.data | keys[]?)] | @tsv' \
  | grep -i 'password'
```

Decode one known key only when you are allowed to view it:

```bash
kubectl get secret app-secret -n prod \
  -o jsonpath='{.data.DATABASE_URL}' \
  | base64 --decode
```

## Search Logs

| Goal | Command |
| --- | --- |
| One pod | `kubectl logs pod/my-pod` |
| One container | `kubectl logs pod/my-pod -c api` |
| Previous crashed container | `kubectl logs pod/my-pod --previous` |
| Label-selected pods | `kubectl logs -l app=checkout --all-containers=true` |
| Recent logs | `kubectl logs deploy/checkout --since=30m` |
| Stream and grep | `kubectl logs -f deploy/checkout | grep -i 'error'` |

```bash
kubectl logs -n prod deploy/checkout --since=2h \
  | grep -Ei 'error|exception|timeout|refused'
```

Across pods selected by label:

```bash
kubectl logs -n prod -l app=checkout --all-containers=true --since=1h \
  | grep -Ei '500|panic|fatal|oom'
```

## Search Events and Failure Reasons

```bash
kubectl get events -A --sort-by=.lastTimestamp \
  | grep -Ei 'failed|backoff|unhealthy|killing|pull'
```

Detailed waiting reasons:

```bash
kubectl get pods -A -o json \
  | jq -r '
    .items[]
    | .metadata.namespace as $ns
    | .metadata.name as $pod
    | .status.containerStatuses[]?
    | select(.state.waiting != null)
    | [$ns, $pod, .name, .state.waiting.reason, .state.waiting.message] | @tsv
  '
```

## Search Owners and Rollouts

```bash
kubectl get rs -A -o wide | grep -i 'checkout'
kubectl rollout status deploy/checkout -n prod
kubectl rollout history deploy/checkout -n prod
kubectl describe deploy checkout -n prod | grep -n -Ei 'image|replicas|condition|strategy'
```

Find pods controlled by a deployment:

```bash
kubectl get pods -n prod -l app=checkout \
  -o custom-columns='NAME:.metadata.name,NODE:.spec.nodeName,PHASE:.status.phase,IP:.status.podIP'
```

## JSONPath Quick Patterns

| Goal | Command |
| --- | --- |
| Pod names | `kubectl get pods -o jsonpath='{.items[*].metadata.name}'` |
| Names with newlines | `kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}'` |
| Pod images | `kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.spec.containers[*].image}{"\n"}{end}'` |
| Service cluster IPs | `kubectl get svc -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.spec.clusterIP}{"\n"}{end}'` |

```bash
kubectl get pods -A \
  -o jsonpath='{range .items[*]}{.metadata.namespace}{"/"}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
```

## Custom Columns

Custom columns are easier to read than long JSONPath when you want a table.

```bash
kubectl get pods -A \
  -o custom-columns='NS:.metadata.namespace,NAME:.metadata.name,NODE:.spec.nodeName,PHASE:.status.phase'
```

```bash
kubectl get deploy -A \
  -o custom-columns='NS:.metadata.namespace,NAME:.metadata.name,READY:.status.readyReplicas,IMAGE:.spec.template.spec.containers[*].image'
```

## yq Searches

`yq` is useful when you prefer YAML pipelines.

```bash
kubectl get deploy -A -o yaml \
  | yq '.items[] | {ns: .metadata.namespace, name: .metadata.name, images: [.spec.template.spec.containers[].image]}'
```

```bash
kubectl get ingress -A -o yaml \
  | yq '.items[] | {ns: .metadata.namespace, name: .metadata.name, hosts: [.spec.rules[].host]}'
```

## Cluster-Wide Content Search Recipe

Use this flow when you only know a word, host, image, label, or config key.

```bash
# 1. Search visible object tables first.
kubectl get all,ingress,cm,secret -A | grep -i 'checkout'

# 2. Search labels when tables are not enough.
kubectl get pods -A --show-labels | grep -i 'checkout'

# 3. Search YAML for exact content.
kubectl get deploy,sts,ds,svc,ingress,cm -A -o yaml | grep -n -C 3 -i 'checkout'

# 4. Search logs for runtime symptoms.
kubectl logs -n prod -l app=checkout --all-containers=true --since=1h \
  | grep -Ei 'error|timeout|exception'
```

## Edge Cases and Safety

- `grep` sees text, not Kubernetes structure. Use `jq`, `yq`, JSONPath, labels, or field selectors when exact fields matter.
- `kubectl get all` does not literally include every resource type. Add specific resources like `ingress`, `cm`, `secret`, `pvc`, `job`, and CRDs when needed.
- Searching Secrets can expose sensitive data. Prefer searching secret names and keys, not decoded values.
- Use `--since`, labels, and namespaces for logs in busy clusters, or the command can be slow and noisy.
- On macOS, BSD `grep` is more limited than GNU `grep`. Prefer portable flags like `-i`, `-n`, `-C`, `-A`, `-B`, and `-E`.
- If a resource type is unknown, run `kubectl api-resources | grep -i '<word>'`.

## Official Docs

- [kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)
- [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
- [Field Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/)
- [JSONPath Support](https://kubernetes.io/docs/reference/kubectl/jsonpath/)
