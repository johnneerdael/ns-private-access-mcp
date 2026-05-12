#!/usr/bin/env node
import { startHttpServer } from './http.js';

async function main() {
  try {
    await startHttpServer();
  } catch (error) {
    console.error('Failed to start NPA MCP HTTP server:', error);
    process.exit(1);
  }
}

main();
