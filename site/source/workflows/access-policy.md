---
title: Access Policy Changes
date: 2026-05-20
---

Use this when granting, changing, or removing access to private apps.

## Prompt

```text
Plan access for the Finance Users SCIM group to reach the finance reporting app. Validate the group and app first, identify the right policy group, and show the proposed rule before creating it.
```

## Tool sequence

1. `searchGroups`
2. `searchPrivateApps`
3. `listPolicyGroups`
4. `getPolicyGroup`
5. `listPolicyRules`
6. `createPolicyRule` or `updatePolicyRule`

## Guardrails

Ask the assistant to report:

- Exact SCIM group matched
- Exact private apps matched
- Whether multiple similar apps or groups exist
- Policy group target
- Action: allow or deny
- Any time, risk, or device conditions

Do not approve writes until ambiguity is resolved.
