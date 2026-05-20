---
title: Prompt Cookbook
date: 2026-05-20
---

Use these prompt patterns to keep the assistant predictable.

## Discover tools

```text
List the Netskope NPA MCP tools you can access. Group them by operational area and do not call any write tools.
```

## Read-only first

```text
Use Netskope NPA MCP read-only tools to summarize publisher health, private app coverage, and policy dependencies. Do not create, update, or delete anything.
```

## Plan before writes

```text
Plan the exact NPA changes needed for this request. Show the tools, parameters, affected resources, risks, and rollback plan. Wait for approval before executing write tools.
```

## Execute approved writes

```text
Execute only the approved changes from the plan. Before each write tool call, restate the resource ID or name being changed.
```

## Verify after writes

```text
Verify the changes using read-only tools and summarize the final state, including any warnings or follow-up tasks.
```
