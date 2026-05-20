---
title: Incident Response
date: 2026-05-20
---

Use this during a suspected exposure or access-control incident.

## Prompt

```text
Incident response: assess exposure for HR and Finance private apps. Find related apps, policies, SCIM groups, and publisher associations. Do not change anything yet. Produce an emergency containment plan with exact write tools and parameters.
```

## Tool sequence

1. `searchPrivateApps`
2. `getPrivateApp`
3. `getPolicyInUse`
4. `listPolicyRules`
5. `searchGroups`
6. `getPublisher`
7. `createPolicyRule` or `updatePolicyRule`
8. `updateAlertConfig`

## Approval checkpoint

For emergency writes, require:

- Which apps are affected
- Which users/groups retain access
- Which users/groups lose access
- Whether the policy is temporary
- How to roll back the rule
- Whether alert recipients change
