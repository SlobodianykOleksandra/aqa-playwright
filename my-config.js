// @ts-check
import { defineConfig, devices } from '@playwright/test'
import {config as testConfig} from './config/config.js'

const config = defineConfig({

    testMatch: '/tests/**/*.spec.js',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 1 : 2,
    reporter: './tests/my-awesome-reporter.ts',

    use: {
        actionTimeout: 10_000,
        baseURL: testConfig.baseURL,
        httpCredentials: testConfig.httpCredentials,

        launchOptions:{
          slowMo: 500
        }
    },

    projects:[
        {
            name: 'smoke',
            // grep: /@smoke/,
            use: { ...devices['Desktop Chrome'] }
            // dependencies: ['setup'],
            // teardown: 'teardown'
        }
    ],

    outputDir: 'test-results',
    timeout: 70_000
});
export default config