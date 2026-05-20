---
title: SCIM Tools
date: 2026-05-20
---

SCIM tools resolve and validate identity data before policy changes.

| Tool | Use it for |
|------|------------|
| `listUsers` | List SCIM users. |
| `searchUsers` | Search users by criteria. |
| `listGroups` | List SCIM groups. |
| `searchGroups` | Search groups by name or filter. |
| `getAdminUsers` | List admin users for notifications or review. |

## Safe prompts

```text
Find SCIM groups for the Finance and HR teams and show their IDs and member counts. Do not change policies.
```

```text
Before creating any NPA policy, validate that the requested user and group names exist in SCIM.
```
