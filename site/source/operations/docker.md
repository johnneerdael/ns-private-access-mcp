---
title: Docker
date: 2026-05-20
---

Use Docker when you want a repeatable HTTP deployment exposing `/mcp` and `/healthz`.

Run the prebuilt image with Compose:

```bash
docker compose up -d
```

Build from local sources:

```bash
docker compose -f docker-compose.build.yml up --build
```

One-off container:

```bash
docker run --rm -p 3000:3000 ghcr.io/johnneerdael/privateaccess-mcp:latest
```

Check health:

```bash
curl http://localhost:3000/healthz
```
