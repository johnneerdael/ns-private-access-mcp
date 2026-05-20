---
title: Private App Tools
date: 2026-05-20
---

Private app tools manage application lifecycle, tags, publisher assignments, discovery settings, and dependency checks.

| Tool | Use it for |
|------|------------|
| `createPrivateApp` | Create a new private application. |
| `updatePrivateApp` | Patch selected app fields. |
| `replacePrivateApp` | Replace the full app configuration. |
| `deletePrivateApp` | Delete an app directly. |
| `getPrivateApp` | Inspect one app by ID. |
| `listPrivateApps` | List or filter private apps. |
| `listPrivateAppTags` | Show available tags. |
| `createPrivateAppTags` | Add tags to an app. |
| `updatePrivateAppTags` | Replace tags in bulk. |
| `patchPrivateAppTags` | Patch tags on one app. |
| `updatePrivateAppPublishers` | Associate publishers to an app. |
| `removePrivateAppPublishers` | Remove publisher associations. |
| `getDiscoverySettings` | Read discovery settings. |
| `updateDiscoverySettings` | Change discovery settings. |
| `getPolicyInUse` | Find policies using an app. |
| `getTagPolicyInUse` | Find policies using tags. |
| `getTagPolicyInUseByTagName` | Find policies by tag name. |
| `validatePrivateAppDeletion` | Check delete safety. |
| `analyzePrivateAppPolicyDependencies` | Analyze app-policy dependencies. |
| `deletePrivateAppSmart` | Delete with dependency-aware handling. |

## Safe prompts

```text
Find all private apps with finance in the name or tags, show their publisher associations, and identify policy dependencies. Do not change anything.
```

```text
Check whether app.internal.example.com already exists as a private app and whether it is covered by any policy.
```

## Change prompts

```text
Plan a private app onboarding for app.internal.example.com on HTTPS 443. Resolve publisher choices first and show the exact createPrivateApp payload before executing.
```

```text
Before deleting this private app, run dependency analysis and tell me which policies or tags would be affected.
```

## Typical sequence

1. `listPrivateApps` or `searchPrivateApps`
2. `getPrivateApp`
3. `getPolicyInUse`
4. `createPrivateApp`, `updatePrivateApp`, or `deletePrivateAppSmart`
