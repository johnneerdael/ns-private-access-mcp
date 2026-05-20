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
