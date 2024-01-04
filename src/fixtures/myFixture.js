import {test as base} from "@playwright/test";
import WelcomePage from "../pageObjects/WelcomePage/WelcomePage.js";
import {USERS} from "../data/users.js";

export const test = base.extend({
    userGaragePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        const signInPopup = await welcomePage.clickSigningButtonAndOpenPopup()
        const garagePage = await signInPopup.loginWithCredentials(USERS.TONNY_PEPPERONY.email, USERS.TONNY_PEPPERONY.password)

        use(garagePage)
    }
})