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
