---
title: Compliance Audit
date: 2026-05-20
---

Use this to inspect an NPA estate without making changes.

## Prompt

```text
Perform a read-only NPA compliance audit. Check publisher health, private apps without policies, stale SCIM references, apps without publisher associations, and risky discovery settings. Summarize findings by severity and propose remediations without executing them.
```

## Tool sequence

1. `listPublishers`
2. `listPrivateApps`
3. `getPolicyInUse`
4. `listPolicyRules`
5. `searchGroups`
6. `getDiscoverySettings`
7. `validateResource`
8. `getAlertConfig`

## Output format

Ask for:

- Critical issues
- High priority issues
- Medium/low improvements
- Suggested remediation tools
- Approval-needed write operations
