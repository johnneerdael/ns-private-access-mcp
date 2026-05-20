---
title: Policy Tools
date: 2026-05-20
---

Policy tools manage policy groups and policy rules. Use SCIM and search tools first so rules reference valid users, groups, and private apps.

| Tool | Use it for |
|------|------------|
| `listPolicyGroups` | List policy groups. |
| `getPolicyGroup` | Inspect one policy group. |
| `createPolicyGroup` | Create a policy group. |
| `updatePolicyGroup` | Update a policy group. |
| `deletePolicyGroup` | Delete a policy group. |
| `listPolicyRules` | List policy rules. |
| `getPolicyRule` | Inspect one rule. |
| `createPolicyRule` | Create an access rule. |
| `updatePolicyRule` | Update a rule. |
| `deletePolicyRule` | Delete a rule. |

## Safe prompts

```text
Audit policies for private apps tagged production. Show which SCIM groups are referenced and flag missing or suspicious references. Do not change anything.
```

## Change prompts

```text
Plan a policy rule that allows the Engineering group to access the dev apps only. Validate SCIM groups and app names first, then show the proposed rule before creating it.
```

## Typical sequence

1. `searchPrivateApps`
2. `searchGroups`
3. `listPolicyGroups`
4. `createPolicyRule` or `updatePolicyRule`
