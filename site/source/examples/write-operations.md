---
title: Write Operations
date: 2026-05-20
---

Write operations should be explicit and narrow.

## App creation approval

```text
Approved: create only the payroll private app with the payload you showed. Do not create policies or modify publisher associations yet. After creation, read it back and summarize the result.
```

Expected tool use:

- `createPrivateApp`
- `getPrivateApp`

## Policy approval

```text
Approved: create the single policy rule named Finance-Payroll-Access in the existing Finance policy group for the Finance Users SCIM group and payroll app. Verify the rule after creation.
```

Expected tool use:

- `createPolicyRule`
- `getPolicyRule`

## Safe delete approval

```text
Approved: run dependency-aware deletion for the retired app ID 12345 only if no policy dependencies remain. Stop and report if dependencies exist.
```

Expected tool use:

- `validatePrivateAppDeletion`
- `analyzePrivateAppPolicyDependencies`
- `deletePrivateAppSmart`
