---
title: Maintenance And Upgrades
date: 2026-05-20
---

Use this for publisher version checks, upgrade profile review, and planned maintenance.

## Prompt

```text
Audit publisher software versions, compare them with available releases, and identify publishers without an upgrade profile. Do not start upgrades. Recommend a staged maintenance plan.
```

## Tool sequence

1. `listPublishers`
2. `getReleases`
3. `listUpgradeProfiles`
4. `getUpgradeProfile`
5. `getPrivateApps`
6. `immediateUpgradePublishers` or `assignPublishersToProfile`

## Approval checkpoint

For upgrades, require:

- Publisher IDs and names
- Current and target versions
- Affected private apps
- Maintenance window
- Rollback or pause plan
