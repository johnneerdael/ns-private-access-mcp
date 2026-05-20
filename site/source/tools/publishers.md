---
title: Publisher Tools
date: 2026-05-20
---

Publisher tools manage Netskope Private Access publishers: the deployed components that connect private applications to the Netskope service.

| Tool | Use it for |
|------|------------|
| `listPublishers` | Inventory publishers and status. |
| `getPublisher` | Inspect one publisher in detail. |
| `createPublisher` | Create a publisher object before field deployment. |
| `replacePublisher` | Replace the complete publisher configuration. |
| `updatePublisher` | Patch selected publisher fields. |
| `deletePublisher` | Remove a publisher after dependency checks. |
| `immediateUpgradePublishers` | Upgrade selected publishers immediately. |
| `getReleases` | List available publisher software releases. |
| `getPrivateApps` | List apps associated with a publisher. |
| `generatePublisherRegistrationToken` | Generate the field registration token. |

## Safe prompts

```text
List all NPA publishers, group them by status, and identify publishers that have not checked in recently. Do not make changes.
```

```text
Compare publisher versions against available releases and tell me which publishers need upgrades. Do not start upgrades.
```

## Change prompts

```text
Create a plan to register a new publisher for the Amsterdam office. Include the publisher name, location, upgrade profile assumption, and registration-token step. Do not execute until I approve.
```

```text
Upgrade the non-production publishers I approve to the latest stable release. Before calling any write tool, list the publisher IDs and expected impact.
```

## Typical sequence

1. `listPublishers`
2. `getPublisher`
3. `getReleases`
4. `immediateUpgradePublishers` or `generatePublisherRegistrationToken`
