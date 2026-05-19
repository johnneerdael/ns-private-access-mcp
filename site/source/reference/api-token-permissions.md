---
title: API Token Permissions
date: 2026-05-20
---

Required permissions depend on which NPA workflows you enable.

Use least privilege:

- Read publishers, private apps, policies, local brokers, SCIM groups, upgrade profiles, steering, and alerts for assessment workflows.
- Add create/update permissions only for workflows that need to change NPA configuration.
- Add delete permissions only for tightly controlled cleanup workflows.

The project documentation in `docs/architecture/api-client.md` lists endpoint-level permission details for the current server implementation.
