import {expect} from "@playwright/test";
import {test} from "../../src/fixtures/myFixture.js"
import {CARS} from "../../src/data/cars.js";

test.describe.only('User', ()=>{
    test('login and create car', async ({userGaragePage, page})=>{
        const popup = await userGaragePage.openAddCarPopup()

        await popup.fillFormAndSubmit(CARS.PORSCHE_911.brand,CARS.PORSCHE_911.model,CARS.PORSCHE_911.mileage)

        await expect(page.locator('//div[@class="car jumbotron"]')).toBeVisible()
    })
    test('login and add fuel', async({userGaragePage, page})=>{
        const fuelPage = await userGaragePage.clickFuelExpensesAndRedirect()
        const popup = await fuelPage.openAnExpensePopup()

        await popup.fillExpensesAndConfirm(`${CARS.PORSCHE_911.brand} ${CARS.PORSCHE_911.model}`, 52000, 10, 600)
        await expect(page.locator('//table[@class="table expenses_table"]')).toBeVisible()

    })
})