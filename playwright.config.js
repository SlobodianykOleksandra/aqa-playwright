// @ts-check
import { defineConfig, devices } from '@playwright/test'
import {config as testConfig} from './config/config.js'

const config = defineConfig({

  testMatch: '/tests/**/*.spec.js',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  //reporter: './tests/my-awesome-reporter.ts',
  reporter: 'html',

  use: {
    acceptDownloads: false,
    actionTimeout: 3_000,
    headless: true,

    baseURL: testConfig.baseURL,

    httpCredentials: testConfig.httpCredentials

    // launchOptions:{
    //   slowMo: 500
    // }
  },

  projects:[
    {
      name: 'setup',
      testMatch: 'tests/setups/*.setup.js',
    },
    {
      name: 'teardown',
      testMatch: 'tests/setups/*.teardown.js'
    },
    {
      name: 'e2e test',
      // grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      teardown: 'teardown',
      testMatch: '/tests/e2e/**/*.spec.js'
    },
    {
      name: 'API-tests',
      // grep: /@smoke/,
      testMatch: '/tests/api/**/*.spec.js'
    }
    // {
    //   name: 'regression',
    //   grep: /@regression/,
    //   use: { ...devices['Desktop Chrome'] },
    //   dependencies: ['setup'],
    //   teardown: 'teardown'
    // }
  ],


  outputDir: 'test-results',
  // globalSetup: 'tests/setups/mySet.setup.js',
  // globalTeardown: 'tests/setups/mySet.teardown.js',
  // timeout: 7_000
});
export default config
