---
title: Local Broker Tools
date: 2026-05-20
---

Local broker tools manage broker objects, configuration, and registration for NPA connectivity.

| Tool | Use it for |
|------|------------|
| `listLocalBrokers` | Inventory brokers. |
| `createLocalBroker` | Create a broker object. |
| `getLocalBroker` | Inspect one broker. |
| `updateLocalBroker` | Patch broker fields. |
| `deleteLocalBroker` | Remove a broker. |
| `getLocalBrokerConfig` | Read broker config. |
| `updateLocalBrokerConfig` | Change broker config. |
| `generateLocalBrokerRegistrationToken` | Generate registration material. |

## Safe prompts

```text
List local brokers, summarize their configuration, and flag anything that looks inconsistent. Do not make changes.
```

## Change prompts

```text
Plan a local broker for the London office. Show name, hostname, registration-token step, and what existing private apps should use it. Do not execute writes yet.
```
