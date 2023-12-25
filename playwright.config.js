// @ts-check
import { defineConfig, devices } from '@playwright/test'
import {config as testConfig} from './config/config.js'

const config = defineConfig({

  testMatch: '/tests/**/*.spec.js',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  //reporter: './tests/my-awesome-reporter.ts',
  reporter: 'html',

  use: {
    acceptDownloads: false,
    actionTimeout: 3_000,
    headless: false,

    baseURL: testConfig.baseURL,

    httpCredentials: testConfig.httpCredentials

    // launchOptions:{
    //   slowMo: 500
    // }
  },

  projects:[
    // {
    //   name: 'setup',
    //   testMatch: 'tests/setups/*.setup.js',
    // },
    // {
    //   name: 'teardown',
    //   testMatch: 'tests/setups/*.teardown.js'
    // },
    {
      name: 'smoke',
      // grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] }
      // dependencies: ['setup'],
      // teardown: 'teardown'
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
