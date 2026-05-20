---
title: Local Broker Tools
date: 2026-05-20
---

Local broker tools manage broker objects, configuration, and registration for NPA connectivity.

| Tool | Use |
|---|---|
| `listLocalBrokers` | Inventory brokers. |
| `createLocalBroker` | Create a broker object with optional location, IP, label, and public-IP access metadata. |
| `getLocalBroker` | Inspect one broker. |
| `updateLocalBroker` | Update broker metadata such as location, custom IPs, labels, and public-IP access. |
| `deleteLocalBroker` | Remove a broker. |
| `getLocalBrokerConfig` | Read broker hostname config. |
| `createLocalBrokerConfig` | Create broker hostname config when no config exists yet. |
| `updateLocalBrokerConfig` | Change broker hostname config. |
| `generateLocalBrokerRegistrationToken` | Generate registration material. |

## Safe prompts

```text
List local brokers, summarize their configuration, and flag anything that looks inconsistent. Do not make changes.
```

## Change prompts

```text
Plan a local broker for the London office. Show name, hostname, city, country code, custom private IP, custom public IP, label IDs, registration-token step, and what existing private apps should use it. Do not execute writes yet.
```
