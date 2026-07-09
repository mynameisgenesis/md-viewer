---
title: Kubernetes Aliases Legend
description: Legend of Kubernetes aliases
---

# Kubernetes Aliases Legend

## Pods

**`podz <keyword>`** — Find pods by name
| NAMESPACE | NAME | READY | STATUS | RESTARTS | AGE |
|-----------|------|-------|--------|----------|-----|

**`podzw <keyword>`** — Pods with node/IP info (wide output)
| NAMESPACE | NAME | READY | STATUS | RESTARTS | AGE | IP | NODE | NOMINATED NODE | READINESS GATES |
|-----------|------|-------|--------|----------|-----|----|------|----------------|-----------------|

**`podsr <keyword>`** — Pods sorted by start time
| NAMESPACE | NAME | READY | STATUS | RESTARTS | AGE |
|-----------|------|-------|--------|----------|-----|

**`podsf <keyword>`** — Failed pods only
| NAMESPACE | NAME | READY | STATUS | RESTARTS | AGE |
|-----------|------|-------|--------|----------|-----|

**`podsp <keyword>`** — Pending pods only
| NAMESPACE | NAME | READY | STATUS | RESTARTS | AGE |
|-----------|------|-------|--------|----------|-----|

**`podw <keyword>`** — Watch pods (live updates)
| NAMESPACE | NAME | READY | STATUS | RESTARTS | AGE |
|-----------|------|-------|--------|----------|-----|

---

## Containers & Images

**`imgz <keyword>`** — Find container images/versions
| NAMESPACE | POD NAME | IMAGE |
|-----------|----------|-------|

**`contz <keyword>`** — Find container names within pods
| NAMESPACE | POD NAME | CONTAINER NAMES |
|-----------|----------|-----------------|

---

## Services

**`svcz <keyword>`** — Find services
| NAMESPACE | NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE |
|-----------|------|------|------------|-------------|---------|-----|

**`svcwz <keyword>`** — Services wide output
| NAMESPACE | NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE | SELECTOR |
|-----------|------|------|------------|-------------|---------|-----|----------|

**`epsz <keyword>`** — Find endpoints
| NAMESPACE | NAME | ENDPOINTS | AGE |
|-----------|------|-----------|-----|

---

## Deployments & Workloads

**`depz <keyword>`** — Find deployments
| NAMESPACE | NAME | READY | UP-TO-DATE | AVAILABLE | AGE |
|-----------|------|-------|------------|-----------|-----|

**`depwz <keyword>`** — Deployments wide output
| NAMESPACE | NAME | READY | UP-TO-DATE | AVAILABLE | AGE | CONTAINERS | IMAGES | SELECTOR |
|-----------|------|-------|------------|-----------|-----|------------|--------|----------|

**`ssz <keyword>`** — Find statefulsets
| NAMESPACE | NAME | READY | AGE |
|-----------|------|-------|-----|

**`dsz <keyword>`** — Find daemonsets
| NAMESPACE | NAME | DESIRED | CURRENT | READY | UP-TO-DATE | AVAILABLE | NODE SELECTOR | AGE |
|-----------|------|---------|---------|-------|------------|-----------|---------------|-----|

---

## Config

**`cmz <keyword>`** — Find configmaps
| NAMESPACE | NAME | DATA | AGE |
|-----------|------|------|-----|

**`secz <keyword>`** — Find secrets
| NAMESPACE | NAME | TYPE | DATA | AGE |
|-----------|------|------|------|-----|

---

## Jobs

**`jobz <keyword>`** — Find jobs
| NAMESPACE | NAME | COMPLETIONS | DURATION | AGE |
|-----------|------|-------------|----------|-----|

**`cronz <keyword>`** — Find cronjobs
| NAMESPACE | NAME | SCHEDULE | SUSPEND | ACTIVE | LAST SCHEDULE | AGE |
|-----------|------|----------|---------|--------|---------------|-----|

---

## Networking

**`ingz <keyword>`** — Find ingress
| NAMESPACE | NAME | CLASS | HOSTS | ADDRESS | PORTS | AGE |
|-----------|------|-------|-------|---------|-------|-----|

**`netz <keyword>`** — Find network policies
| NAMESPACE | NAME | POD-SELECTOR | AGE |
|-----------|------|--------------|-----|

---

## Nodes

**`nodez <keyword>`** — Find nodes
| NAME | STATUS | ROLES | AGE | VERSION | INTERNAL-IP | EXTERNAL-IP | OS-IMAGE | KERNEL-VERSION | CONTAINER-RUNTIME |
|------|--------|-------|-----|---------|-------------|-------------|----------|----------------|-------------------|

---

## Events

**`evtz <keyword>`** — Find events (sorted by time)
| NAMESPACE | LAST SEEN | TYPE | REASON | OBJECT | MESSAGE |
|-----------|-----------|------|--------|--------|---------|

---

## Namespaces & CRDs

**`nsz <keyword>`** — Find namespaces
| NAME | STATUS | AGE |
|------|--------|-----|

**`crdz <keyword>`** — Find CRDs
| NAME | CREATED AT |
|------|------------|

---

## Resource Usage

**`topp <keyword>`** — Pod CPU/memory usage
| NAMESPACE | NAME | CPU(cores) | MEMORY(bytes) |
|-----------|------|------------|---------------|

**`topn`** — Node resource usage (no keyword needed)
| NAME | CPU(cores) | CPU% | MEMORY(bytes) | MEMORY% |
|------|------------|------|---------------|---------|

---

## Interactive Commands (no grep)

| Alias | Usage | Description |
|-------|-------|-------------|
| `logz` | `logz <ns> <pod>` | View pod logs |
| `logzf` | `logzf <ns> <pod>` | Tail/follow pod logs |
| `descpod` | `descpod <ns> <pod>` | Describe a pod |
| `descsvc` | `descsvc <ns> <svc>` | Describe a service |
| `descdep` | `descdep <ns> <deploy>` | Describe a deployment |
| `execz` | `execz <ns> <pod> -- sh` | Shell into a pod |
| `kctx` | `kctx` | Show current context |
| `kctxs` | `kctxs` | List all contexts |
| `kns` | `kns <namespace>` | Switch default namespace |
| `rollz` | `rollz <ns> deployment/<name>` | Rollout status |
| `rollhz` | `rollhz <ns> deployment/<name>` | Rollout history |
| `rollrz` | `rollrz <ns> deployment/<name>` | Restart deployment |
