import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('allowed preview and development hosts', () => {
  it.each([
    [undefined, []],
    ['', []],
    ['all', true],
    ['true', true],
    ['app.example.test, preview.example.test', ['app.example.test', 'preview.example.test']]
  ])('maps ALLOWED_HOSTS=%s to a Vite-supported policy', async (value, expected) => {
    vi.stubEnv('ALLOWED_HOSTS', value);
    const { default: config } = await import('./vite.config.js');
    expect(config.server.allowedHosts).toEqual(expected);
    expect(config.preview.allowedHosts).toEqual(expected);
  });
});
