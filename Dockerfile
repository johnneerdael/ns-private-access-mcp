FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* tsconfig.json ./
# --ignore-scripts skips postinstall steps that ship native binaries
# (e.g. esbuild via vitest), which fail under QEMU on cross-arch builds.
# We only need typescript to run `tsc` — no native helpers required.
RUN npm install --ignore-scripts --no-audit --no-fund
COPY src ./src
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --ignore-scripts --no-audit --no-fund \
    && npm cache clean --force
COPY --from=build /app/dist ./dist
EXPOSE 3000
USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/healthz" >/dev/null 2>&1 || exit 1
CMD ["node", "dist/cli-http.js"]
