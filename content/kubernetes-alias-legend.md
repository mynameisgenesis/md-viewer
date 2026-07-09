---
title: Kubernetes Aliases Legend
description: Legend of Kubernetes aliases
---

# Kubernetes Aliases Legend

## Pods

**`pods <keyword>`** — Find pods by name
| NAMESPACE | NAME | READY | STATUS | RESTARTS | AGE |
|-----------|------|-------|--------|----------|-----|

**`podsw <keyword>`** — Pods with node/IP info (wide output)
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

**`imgs <keyword>`** — Find container images/versions
| NAMESPACE | POD NAME | IMAGE |
|-----------|----------|-------|

**`conts <keyword>`** — Find container names within pods
| NAMESPACE | POD NAME | CONTAINER NAMES |
|-----------|----------|-----------------|

---

## Services

**`svcs <keyword>`** — Find services
| NAMESPACE | NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE |
|-----------|------|------|------------|-------------|---------|-----|

**`svcsw <keyword>`** — Services wide output
| NAMESPACE | NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE | SELECTOR |
|-----------|------|------|------------|-------------|---------|-----|----------|

**`epss <keyword>`** — Find endpoints
| NAMESPACE | NAME | ENDPOINTS | AGE |
|-----------|------|-----------|-----|

---

## Deployments & Workloads

**`deps <keyword>`** — Find deployments
| NAMESPACE | NAME | READY | UP-TO-DATE | AVAILABLE | AGE |
|-----------|------|-------|------------|-----------|-----|

**`depsw <keyword>`** — Deployments wide output
| NAMESPACE | NAME | READY | UP-TO-DATE | AVAILABLE | AGE | CONTAINERS | IMAGES | SELECTOR |
|-----------|------|-------|------------|-----------|-----|------------|--------|----------|

**`sss <keyword>`** — Find statefulsets
| NAMESPACE | NAME | READY | AGE |
|-----------|------|-------|-----|

**`dss <keyword>`** — Find daemonsets
| NAMESPACE | NAME | DESIRED | CURRENT | READY | UP-TO-DATE | AVAILABLE | NODE SELECTOR | AGE |
|-----------|------|---------|---------|-------|------------|-----------|---------------|-----|

---

## Config

**`cms <keyword>`** — Find configmaps
| NAMESPACE | NAME | DATA | AGE |
|-----------|------|------|-----|

**`secs <keyword>`** — Find secrets
| NAMESPACE | NAME | TYPE | DATA | AGE |
|-----------|------|------|------|-----|

---

## Jobs

**`jobs <keyword>`** — Find jobs
| NAMESPACE | NAME | COMPLETIONS | DURATION | AGE |
|-----------|------|-------------|----------|-----|

**`crons <keyword>`** — Find cronjobs
| NAMESPACE | NAME | SCHEDULE | SUSPEND | ACTIVE | LAST SCHEDULE | AGE |
|-----------|------|----------|---------|--------|---------------|-----|

---

## Networking

**`ings <keyword>`** — Find ingress
| NAMESPACE | NAME | CLASS | HOSTS | ADDRESS | PORTS | AGE |
|-----------|------|-------|-------|---------|-------|-----|

**`nets <keyword>`** — Find network policies
| NAMESPACE | NAME | POD-SELECTOR | AGE |
|-----------|------|--------------|-----|

---

## Nodes

**`nodes <keyword>`** — Find nodes
| NAME | STATUS | ROLES | AGE | VERSION | INTERNAL-IP | EXTERNAL-IP | OS-IMAGE | KERNEL-VERSION | CONTAINER-RUNTIME |
|------|--------|-------|-----|---------|-------------|-------------|----------|----------------|-------------------|

---

## Events

**`evts <keyword>`** — Find events (sorted by time)
| NAMESPACE | LAST SEEN | TYPE | REASON | OBJECT | MESSAGE |
|-----------|-----------|------|--------|--------|---------|

---

## Namespaces & CRDs

**`nss <keyword>`** — Find namespaces
| NAME | STATUS | AGE |
|------|--------|-----|

**`crds <keyword>`** — Find CRDs
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
| `logs` | `logs <ns> <pod>` | View pod logs |
| `logsf` | `logsf <ns> <pod>` | Tail/follow pod logs |
| `descpod` | `descpod <ns> <pod>` | Describe a pod |
| `descsvc` | `descsvc <ns> <svc>` | Describe a service |
| `descdep` | `descdep <ns> <deploy>` | Describe a deployment |
| `execs` | `execs <ns> <pod> -- sh` | Shell into a pod |
| `kctx` | `kctx` | Show current context |
| `kctxs` | `kctxs` | List all contexts |
| `kns` | `kns <namespace>` | Switch default namespace |
| `rolls` | `rollz <ns> deployment/<name>` | Rollout status |
| `rollsh` | `rollhz <ns> deployment/<name>` | Rollout history |
| `rollsr` | `rollrz <ns> deployment/<name>` | Restart deployment |
