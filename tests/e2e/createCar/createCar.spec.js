import {expect} from "@playwright/test";
import {test} from "../../../src/fixtures/myFixture.js"
import {CARS} from "../../../src/data/cars.js";

test.describe('User', ()=>{
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
    test('login and create car (event listener)', async ({userGaragePageWithStorage})=>{
        const {page} = userGaragePageWithStorage
        page.on('request', (request)=>{
            console.log(request.url())
        })
        page.on('response',async (response)=>{
            console.log((await response.body()).toString())
        })

        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillFormAndSubmit(CARS.PORSCHE_911.brand,CARS.PORSCHE_911.model,CARS.PORSCHE_911.mileage)

        // await expect(page.locator('//div[@class="car jumbotron"]')).toBeVisible()
    })
    test('login and create car ()', async ({userGaragePageWithStorage})=>{
        const {page} = userGaragePageWithStorage
        await page.route('/api/cars/brands', route=>{
            route.abort()
        })

        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillFormAndSubmit(CARS.PORSCHE_911.brand,CARS.PORSCHE_911.model,CARS.PORSCHE_911.mileage)

        // await expect(page.locator('//div[@class="car jumbotron"]')).toBeVisible()
    })
})