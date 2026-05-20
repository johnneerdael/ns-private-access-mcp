---
title: Read-Only Assessment
date: 2026-05-20
---

## Publisher health

```text
List all NPA publishers, group them by status, show versions, and identify publishers that need attention. Do not change anything.
```

Expected tool use:

- `listPublishers`
- `getReleases`
- `getPrivateApps`

## App and policy coverage

```text
Find private apps that have no policy in use or no publisher association. Summarize by app owner tag if available. Do not remediate.
```

Expected tool use:

- `listPrivateApps`
- `getPolicyInUse`
- `searchPublishers`
- `validateResource`
