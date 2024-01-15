import {request, test as base} from "@playwright/test";
import WelcomePage from "../pageObjects/WelcomePage/WelcomePage.js";
import {USERS} from "../data/users.js";
import {STORAGE_STATE_USER_PATH} from "../data/constants/storageState.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";

export const test = base.extend({
    userGaragePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        const signInPopup = await welcomePage.clickSigningButtonAndOpenPopup()
        const garagePage = await signInPopup.loginWithCredentials(USERS.TONNY_PEPPERONY.email, USERS.TONNY_PEPPERONY.password)

        await use(garagePage)

        await page.close()
    },
    userGaragePageWithStorage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.visit()

        await use(garagePage)

        await ctx.close()
    },
    apiClient: async ({browser}, use)=>{
        const client = await request.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        await use(client)

        await client.dispose()
    }
})