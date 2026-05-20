---
title: Application Onboarding
date: 2026-05-20
---

Use this when adding a new private application or reviewing an existing app before changes.

## Prompt

```text
Onboard app.internal.example.com as a private app on HTTPS 443. First check whether it already exists, find suitable publishers, validate the name, and show the proposed createPrivateApp payload. Do not create or update anything until I approve.
```

## Tool sequence

1. `searchPrivateApps`
2. `searchPublishers`
3. `validateName`
4. `listPrivateAppTags`
5. `createPrivateApp`
6. `createPrivateAppTags`
7. `updatePrivateAppPublishers`
8. `getPolicyInUse`

## Good assistant behavior

The assistant should distinguish:

- App discovery from app creation
- Host/protocol validation from policy creation
- Publisher association from policy authorization

For existing apps, use `getPrivateApp`, `analyzePrivateAppPolicyDependencies`, and `updatePrivateApp` instead of blindly creating duplicates.
