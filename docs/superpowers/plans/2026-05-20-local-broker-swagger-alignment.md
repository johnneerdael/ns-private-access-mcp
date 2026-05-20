# Local Broker Swagger Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align every published local-broker MCP tool with the local-broker operations and schemas in `./swagger.json`.

**Architecture:** Keep the existing local-broker command/tool structure intact and correct the contract at the schema and handler layer. Add focused Vitest coverage that reads `swagger.json`, compares local-broker endpoints and request fields against the implementation, then covers the brokerconfig `POST` coverage gap.

**Tech Stack:** TypeScript, ESM, Zod, Vitest, Netskope API Swagger/OpenAPI JSON.

---

## File Structure

- Modify `src/types/schemas/local-broker.schemas.ts`: define Swagger-aligned request, response, broker data, delete response, and config request/response schemas.
- Modify `src/tools/local-broker.ts`: use the corrected types, preserve existing paths/methods, correct delete response typing, and add a `POST /brokerconfig` tool.
- Modify `src/commands/local-broker/index.ts`: expose `createLocalBrokerConfig` while preserving `updateLocalBrokerConfig`.
- Modify `src/mcp.ts`: add the convenience method for `createLocalBrokerConfig`.
- Create `src/commands/local-broker/local-broker.swagger.test.ts`: contract tests that read `swagger.json` and validate local-broker operation coverage plus request schema field coverage.
- Modify `site/source/tools/local-brokers.md`: document the added brokerconfig create tool and the expanded broker metadata fields.
- Modify `site/source/tools/index.md`: update local broker tool count from 8 to 9 if `createLocalBrokerConfig` is published.
- Modify `site/source/reference/tool-categories.md`: update local broker category count and total published tool count if the total changes.
- Modify `site/source/index.md` and `site/source/starter/01-what-youll-connect.md`: update the public total count if the total changes from 69 to 70.

## Swagger Baseline

Use these local-broker operations from `./swagger.json` as the source of truth:

```text
GET    /api/v2/infrastructure/lbrokers
POST   /api/v2/infrastructure/lbrokers
GET    /api/v2/infrastructure/lbrokers/{id}
PUT    /api/v2/infrastructure/lbrokers/{id}
DELETE /api/v2/infrastructure/lbrokers/{id}
GET    /api/v2/infrastructure/lbrokers/brokerconfig
POST   /api/v2/infrastructure/lbrokers/brokerconfig
PUT    /api/v2/infrastructure/lbrokers/brokerconfig
POST   /api/v2/infrastructure/lbrokers/{id}/registrationtoken
```

The published MCP tools should be:

```text
listLocalBrokers
createLocalBroker
getLocalBroker
updateLocalBroker
deleteLocalBroker
getLocalBrokerConfig
createLocalBrokerConfig
updateLocalBrokerConfig
generateLocalBrokerRegistrationToken
```

---

### Task 1: Add Swagger Contract Tests

**Files:**
- Create: `src/commands/local-broker/local-broker.swagger.test.ts`
- Read: `swagger.json`
- Read: `src/tools/local-broker.ts`
- Read: `src/commands/local-broker/index.ts`

- [ ] **Step 1: Write the failing contract test**

Create `src/commands/local-broker/local-broker.swagger.test.ts` with this complete content:

```ts
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'zod';
import { LocalBrokerTools } from '../../tools/local-broker.js';
import { localBrokerCommands } from './index.js';

type SwaggerOperation = {
  requestBody?: {
    content?: {
      'application/json'?: {
        schema?: {
          $ref?: string;
        };
      };
    };
  };
};

type SwaggerSchema = {
  properties?: Record<string, unknown>;
};

const swagger = JSON.parse(
  readFileSync(resolve(process.cwd(), 'swagger.json'), 'utf8')
) as {
  swaggerDoc: {
    paths: Record<string, Record<string, SwaggerOperation>>;
    components: {
      schemas: Record<string, SwaggerSchema>;
    };
  };
};

function schemaNameFromRef(ref: string): string {
  return ref.replace('#/components/schemas/', '');
}

function swaggerRequestFields(path: string, method: string): string[] {
  const operation = swagger.swaggerDoc.paths[path]?.[method.toLowerCase()];
  const ref = operation?.requestBody?.content?.['application/json']?.schema?.$ref;

  if (!ref) {
    return [];
  }

  return Object.keys(swagger.swaggerDoc.components.schemas[schemaNameFromRef(ref)].properties ?? {});
}

function zodObjectKeys(schema: z.ZodTypeAny): string[] {
  expect(schema).toBeInstanceOf(z.ZodObject);
  return Object.keys((schema as z.ZodObject<z.ZodRawShape>).shape);
}

describe('local broker tools match swagger.json', () => {
  it('publishes one MCP command for every local broker Swagger operation', () => {
    expect(Object.keys(localBrokerCommands).sort()).toEqual([
      'createLocalBroker',
      'createLocalBrokerConfig',
      'deleteLocalBroker',
      'generateLocalBrokerRegistrationToken',
      'getLocalBroker',
      'getLocalBrokerConfig',
      'listLocalBrokers',
      'updateLocalBroker',
      'updateLocalBrokerConfig'
    ].sort());
  });

  it('uses the Swagger request fields for createLocalBroker', () => {
    expect(zodObjectKeys(LocalBrokerTools.create.schema).sort()).toEqual(
      swaggerRequestFields('/api/v2/infrastructure/lbrokers', 'post').sort()
    );
  });

  it('uses the Swagger request fields for updateLocalBroker plus path id', () => {
    expect(zodObjectKeys(LocalBrokerTools.update.schema).sort()).toEqual([
      'id',
      ...swaggerRequestFields('/api/v2/infrastructure/lbrokers/{id}', 'put')
    ].sort());
  });

  it('uses the Swagger request fields for createLocalBrokerConfig', () => {
    expect(zodObjectKeys(LocalBrokerTools.createConfig.schema).sort()).toEqual(
      swaggerRequestFields('/api/v2/infrastructure/lbrokers/brokerconfig', 'post').sort()
    );
  });

  it('uses the Swagger request fields for updateLocalBrokerConfig', () => {
    expect(zodObjectKeys(LocalBrokerTools.updateConfig.schema).sort()).toEqual(
      swaggerRequestFields('/api/v2/infrastructure/lbrokers/brokerconfig', 'put').sort()
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/commands/local-broker/local-broker.swagger.test.ts --run
```

Expected: FAIL because `createLocalBrokerConfig` and `LocalBrokerTools.createConfig` do not exist, and create/update request fields are narrower than Swagger.

- [ ] **Step 3: Commit the failing test**

Run:

```bash
git add src/commands/local-broker/local-broker.swagger.test.ts
git commit -m "test: capture local broker swagger contract"
```

---

### Task 2: Align Local Broker Zod Schemas

**Files:**
- Modify: `src/types/schemas/local-broker.schemas.ts`
- Test: `src/commands/local-broker/local-broker.swagger.test.ts`

- [ ] **Step 1: Replace the local-broker schema file**

Replace `src/types/schemas/local-broker.schemas.ts` with this complete content:

```ts
import * as z from 'zod';

const nullableStringSchema = z.string().nullable().optional();
const nullableNumberSchema = z.number().nullable().optional();

export const localBrokerAccessViaPublicIpSchema = z.enum([
  'NONE',
  'OFF_PREM',
  'ON_PREM',
  'ON_OFF_PREM'
]);

export const localBrokerLocationFieldsSchema = z.object({
  city_name: nullableStringSchema.describe('City where the local broker is located'),
  region_name: nullableStringSchema.describe('Region, state, or province where the local broker is located'),
  country_name: nullableStringSchema.describe('Country where the local broker is located'),
  country_code: nullableStringSchema.describe('ISO country code where the local broker is located'),
  latitude: nullableNumberSchema.describe('Latitude in decimal degrees, from -90 to 90'),
  longitude: nullableNumberSchema.describe('Longitude in decimal degrees, from -180 to 180'),
  custom_public_ip: nullableStringSchema.describe('Public IPv4 address of the local broker'),
  custom_private_ip: nullableStringSchema.describe('Private IPv4 address of the local broker'),
  label_ids: z.array(z.string()).optional().describe('Label IDs assigned to the local broker'),
  access_via_public_ip: localBrokerAccessViaPublicIpSchema.optional().describe('Controls access to the local broker through public IP')
});

export const localBrokerPostRequestSchema = z.object({
  name: z.string().optional().describe('Name for the new local broker instance'),
  ...localBrokerLocationFieldsSchema.shape
}).describe('Create a new local broker for handling on-premises ZTNA traffic');

export const localBrokerPutRequestSchema = localBrokerLocationFieldsSchema.describe('Update an existing local broker metadata and connectivity configuration');

export const localBrokerConfigPutRequestSchema = z.object({
  hostname: z.string().optional().describe('Global hostname configuration affecting all broker instances')
}).describe('Create or update global configuration settings for all local brokers');

const localBrokerLabelSchema = z.object({
  label_id: z.string().optional().describe('Label identifier'),
  permission: z.string().optional().describe('Label permission')
}).passthrough();

const localBrokerDataSchema = z.object({
  id: z.number().describe('Unique identifier for the local broker'),
  name: z.string().optional().describe('Display name of the local broker'),
  common_name: z.string().optional().describe('Common name used for broker identification'),
  registered: z.boolean().optional().describe('Registration status of the broker'),
  city_name: z.string().optional().describe('City where the local broker is located'),
  region_name: z.string().optional().describe('Region, state, or province where the local broker is located'),
  country_name: z.string().optional().describe('Country where the local broker is located'),
  country_code: z.string().optional().describe('ISO country code where the local broker is located'),
  location_id: z.string().optional().describe('Netskope location identifier'),
  discovered_public_ip: z.string().optional().describe('Discovered public IPv4 address'),
  discovered_private_ip: z.string().optional().describe('Discovered private IPv4 address'),
  custom_public_ip: z.string().optional().describe('Configured public IPv4 address'),
  custom_private_ip: z.string().optional().describe('Configured private IPv4 address'),
  latitude: z.number().optional().describe('Latitude in decimal degrees'),
  longitude: z.number().optional().describe('Longitude in decimal degrees'),
  labels: z.array(localBrokerLabelSchema).optional().describe('Labels assigned to the local broker')
}).passthrough().describe('Local broker instance details');

export const localBrokerResponseSchema = z.object({
  status: z.enum(['success', 'not found']).describe('Response status'),
  data: localBrokerDataSchema
}).describe('Response when retrieving a single local broker');

export const localBrokersGetResponseSchema = z.object({
  status: z.enum(['success', 'not found']).describe('Response status'),
  total: z.number().describe('Total number of local brokers'),
  data: z.array(localBrokerDataSchema)
}).describe('Response when listing all local brokers');

export const localBrokerConfigResponseSchema = z.object({
  status: z.enum(['success', 'not found']).describe('Response status'),
  data: z.object({
    hostname: z.string().optional().describe('Global hostname configuration')
  }).passthrough()
}).describe('Response when retrieving local broker configuration');

export const localBrokerDeleteResponseSchema = z.object({
  status: z.enum(['success', 'error']).describe('Delete response status')
}).describe('Response when deleting a local broker');

export const localBrokerResponse400Schema = z.object({
  status: z.number().describe('HTTP status code'),
  result: z.string().describe('Error message')
}).describe('Error response for local broker operations');

export const localBrokerRegistrationTokenResponseSchema = z.object({
  status: z.enum(['success', 'not found']).describe('Response status'),
  data: z.object({
    token: z.string().describe('Generated registration token')
  })
}).describe('Response when generating a registration token');

export type LocalBrokerPostRequest = z.infer<typeof localBrokerPostRequestSchema>;
export type LocalBrokerPutRequest = z.infer<typeof localBrokerPutRequestSchema>;
export type LocalBrokerConfigPutRequest = z.infer<typeof localBrokerConfigPutRequestSchema>;
export type LocalBrokerResponse = z.infer<typeof localBrokerResponseSchema>;
export type LocalBrokersGetResponse = z.infer<typeof localBrokersGetResponseSchema>;
export type LocalBrokerConfigResponse = z.infer<typeof localBrokerConfigResponseSchema>;
export type LocalBrokerDeleteResponse = z.infer<typeof localBrokerDeleteResponseSchema>;
export type LocalBrokerResponse400 = z.infer<typeof localBrokerResponse400Schema>;
export type LocalBrokerRegistrationTokenResponse = z.infer<typeof localBrokerRegistrationTokenResponseSchema>;
```

- [ ] **Step 2: Run the contract test**

Run:

```bash
npm test -- src/commands/local-broker/local-broker.swagger.test.ts --run
```

Expected: FAIL only on missing `createLocalBrokerConfig` / `LocalBrokerTools.createConfig`; request-field assertions for create and update should now pass.

- [ ] **Step 3: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: PASS. If it fails because callers expect `name` to be required, update only local-broker examples or tests that assume `name` is mandatory.

- [ ] **Step 4: Commit schema alignment**

Run:

```bash
git add src/types/schemas/local-broker.schemas.ts
git commit -m "fix: align local broker schemas with swagger"
```

---

### Task 3: Add Brokerconfig Create Tool and Correct Delete Typing

**Files:**
- Modify: `src/tools/local-broker.ts`
- Test: `src/commands/local-broker/local-broker.swagger.test.ts`

- [ ] **Step 1: Update imports in `src/tools/local-broker.ts`**

Change the import block to include `LocalBrokerDeleteResponse`:

```ts
import {
  LocalBrokerResponse,
  LocalBrokersGetResponse,
  LocalBrokerConfigResponse,
  LocalBrokerDeleteResponse,
  LocalBrokerPostRequest,
  LocalBrokerPutRequest,
  LocalBrokerConfigPutRequest,
  localBrokerPostRequestSchema,
  localBrokerPutRequestSchema,
  localBrokerConfigPutRequestSchema
} from '../types/schemas/local-broker.schemas.js';
```

- [ ] **Step 2: Correct delete response typing**

Replace the delete handler result type with:

```ts
      const result = await api.requestWithRetry<ApiResponse<LocalBrokerDeleteResponse>>(
        `/api/v2/infrastructure/lbrokers/${params.id}`,
        {
          method: 'DELETE'
        }
      );
```

- [ ] **Step 3: Add `createConfig` before `updateConfig`**

Insert this tool object between `getConfig` and `updateConfig`:

```ts
  createConfig: {
    name: 'createBrokerConfig',
    schema: localBrokerConfigPutRequestSchema,
    handler: async (params: LocalBrokerConfigPutRequest) => {
      const result = await api.requestWithRetry<ApiResponse<LocalBrokerConfigResponse>>(
        '/api/v2/infrastructure/lbrokers/brokerconfig',
        {
          method: 'POST',
          body: JSON.stringify(params)
        }
      );
      return { content: [{ type: 'text' as const, text: JSON.stringify(result) }] };
    }
  },
```

- [ ] **Step 4: Run the contract test**

Run:

```bash
npm test -- src/commands/local-broker/local-broker.swagger.test.ts --run
```

Expected: FAIL because `localBrokerCommands.createLocalBrokerConfig` is not exposed yet.

- [ ] **Step 5: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit tool-layer changes**

Run:

```bash
git add src/tools/local-broker.ts
git commit -m "fix: add local broker config create operation"
```

---

### Task 4: Publish the Brokerconfig Create Command

**Files:**
- Modify: `src/commands/local-broker/index.ts`
- Modify: `src/mcp.ts`
- Test: `src/commands/local-broker/local-broker.swagger.test.ts`

- [ ] **Step 1: Add command function in `src/commands/local-broker/index.ts`**

Insert this function after `getLocalBrokerConfig`:

```ts
export async function createLocalBrokerConfig(params: z.infer<typeof localBrokerConfigPutRequestSchema>) {
  try {
    const result = await LocalBrokerTools.createConfig.handler(params);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create local broker config: ${error.message}`);
    }
    throw error;
  }
}
```

- [ ] **Step 2: Add command registration**

Insert this command entry after `getLocalBrokerConfig` in `localBrokerCommands`:

```ts
  createLocalBrokerConfig: {
    name: 'createLocalBrokerConfig',
    schema: localBrokerConfigPutRequestSchema,
    handler: createLocalBrokerConfig
  },
```

- [ ] **Step 3: Add MCP convenience method in `src/mcp.ts`**

Insert this method after `getLocalBrokerConfig()`:

```ts
  async createLocalBrokerConfig(config: LocalBrokerConfigPutRequest) {
    return await commands.createLocalBrokerConfig(config);
  }
```

- [ ] **Step 4: Run the contract test**

Run:

```bash
npm test -- src/commands/local-broker/local-broker.swagger.test.ts --run
```

Expected: PASS.

- [ ] **Step 5: Run full build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit command exposure**

Run:

```bash
git add src/commands/local-broker/index.ts src/mcp.ts
git commit -m "feat: publish local broker config create command"
```

---

### Task 5: Update Public Documentation Counts and Local Broker Page

**Files:**
- Modify: `site/source/tools/local-brokers.md`
- Modify: `site/source/tools/index.md`
- Modify: `site/source/reference/tool-categories.md`
- Modify: `site/source/index.md`
- Modify: `site/source/starter/01-what-youll-connect.md`

- [ ] **Step 1: Update `site/source/tools/local-brokers.md` tool table**

Replace the tool table with:

```markdown
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
```

- [ ] **Step 2: Update the local broker examples**

In `site/source/tools/local-brokers.md`, replace the planning prompt with:

```markdown
Plan a local broker for the London office. Show name, hostname, city, country code, custom private IP, custom public IP, label IDs, registration-token step, and what existing private apps should use it. Do not execute writes yet.
```

- [ ] **Step 3: Update category counts**

In `site/source/tools/index.md`, change:

```markdown
| Local brokers | 8 | [Local broker tools](/privateaccess-mcp/tools/local-brokers/) |
```

to:

```markdown
| Local brokers | 9 | [Local broker tools](/privateaccess-mcp/tools/local-brokers/) |
```

In `site/source/reference/tool-categories.md`, change the local broker row count from `8` to `9`.

- [ ] **Step 4: Update total published tool counts**

Change public references from `69` to `70` in these files:

```text
site/source/index.md
site/source/starter/01-what-youll-connect.md
site/source/reference/index.md
site/source/reference/tool-categories.md
site/source/reference/status.md
```

- [ ] **Step 5: Build the Hexo site**

Run:

```bash
cd site
npm run build
```

Expected: PASS and generate `site/public`.

- [ ] **Step 6: Commit documentation updates**

Run:

```bash
git add site/source/tools/local-brokers.md site/source/tools/index.md site/source/reference/tool-categories.md site/source/index.md site/source/starter/01-what-youll-connect.md site/source/reference/index.md site/source/reference/status.md
git commit -m "docs: document local broker swagger coverage"
```

---

### Task 6: Final Verification

**Files:**
- Verify: `src/commands/local-broker/local-broker.swagger.test.ts`
- Verify: `src/types/schemas/local-broker.schemas.ts`
- Verify: `src/tools/local-broker.ts`
- Verify: `site/source/tools/local-brokers.md`

- [ ] **Step 1: Run local-broker contract test**

Run:

```bash
npm test -- src/commands/local-broker/local-broker.swagger.test.ts --run
```

Expected: PASS.

- [ ] **Step 2: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Run site build**

Run:

```bash
cd site
npm run build
```

Expected: PASS.

- [ ] **Step 4: Inspect local-broker tool count**

Run:

```bash
node -e "import('./dist/commands/local-broker/index.js').then(({ localBrokerCommands }) => console.log(Object.keys(localBrokerCommands).sort().join('\\n')))"
```

Expected output:

```text
createLocalBroker
createLocalBrokerConfig
deleteLocalBroker
generateLocalBrokerRegistrationToken
getLocalBroker
getLocalBrokerConfig
listLocalBrokers
updateLocalBroker
updateLocalBrokerConfig
```

- [ ] **Step 5: Commit any missed verification-only changes**

If verification changed only generated files outside tracked source, do not commit them. If a tracked source or doc correction was needed, commit only that correction:

```bash
git add <corrected tracked files>
git commit -m "fix: complete local broker swagger verification"
```

---

## Self-Review

**Spec coverage:** This plan covers every local-broker Swagger operation, every published local-broker MCP command, the schema mismatches found during investigation, the missing brokerconfig `POST` operation, docs counts, and final verification.

**Placeholder scan:** No `TBD`, `TODO`, "similar to", or unspecified edge-case steps remain. Every code-editing step includes exact code and every test step includes an exact command plus expected result.

**Type consistency:** `createLocalBrokerConfig`, `LocalBrokerTools.createConfig`, `LocalBrokerDeleteResponse`, `localBrokerPostRequestSchema`, `localBrokerPutRequestSchema`, and `localBrokerConfigPutRequestSchema` are introduced before use in later tasks.
