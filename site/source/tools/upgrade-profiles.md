---
title: Upgrade Profile Tools
date: 2026-05-20
---

Upgrade profile tools manage maintenance windows and publisher upgrade scheduling.

| Tool | Use it for |
|------|------------|
| `listUpgradeProfiles` | List profiles. |
| `getUpgradeProfile` | Inspect one profile. |
| `createUpgradeProfile` | Create a maintenance profile. |
| `updateUpgradeProfile` | Modify a profile. |
| `deleteUpgradeProfile` | Remove a profile. |
| `upgradeProfileSchedule` | Work with schedule details. |
| `assignPublishersToProfile` | Assign publishers to a profile. |

## Safe prompts

```text
Show all upgrade profiles, which publishers use them, and any publishers without an upgrade profile. Do not modify anything.
```

## Change prompts

```text
Plan a Sunday 03:00 maintenance profile for APAC publishers. Show affected publisher IDs and rollback considerations before applying it.
```
