---
title: New Office Setup
date: 2026-05-20
---

Use this when opening a new site that needs NPA publisher infrastructure and initial application access.

## Prompt

```text
We are opening a new London office. Plan the NPA setup: publisher, local broker, upgrade profile, initial apps, policy group, and alert recipients. Start read-only by checking existing publishers, upgrade profiles, policy groups, SCIM groups, and alerts. Do not create anything until I approve the plan.
```

## Tool sequence

1. `listPublishers`
2. `listLocalBrokers`
3. `listUpgradeProfiles`
4. `listPolicyGroups`
5. `searchGroups`
6. `getAlertConfig`
7. `createPublisher`
8. `generatePublisherRegistrationToken`
9. `createLocalBroker`
10. `createUpgradeProfile` or `assignPublishersToProfile`
11. `createPrivateApp`
12. `createPolicyRule`
13. `updateAlertConfig`

## Approval checkpoint

Require the assistant to show:

- Publisher name and location
- Local broker name and hostname
- Upgrade profile schedule
- App names, hosts, protocols, and publisher IDs
- Policy group and SCIM group names
- Alert recipients

Then approve only the specific write steps you want executed.
