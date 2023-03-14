import puppeteer from "puppeteer";

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function save_website_as_png(user_name: string): Promise<Buffer> {
    const client = await puppeteer
        .launch({
            defaultViewport: {
                width: 1200,
                height: 1800,
            },
        })

    const page = await client.newPage();
    await page.goto(`https://r6.tracker.network/profile/pc/${user_name}`);

    page.mouse.wheel({ deltaY: 230 });

    try {

        await page.click('#onetrust-accept-btn-handler')
        await page.$$eval("ot-sdk-container", els => els.forEach(el => el.remove()));


        await page.waitForTimeout(3000);
    } catch (error) {

    }

    //await page.$eval('#onetrust-accept-btn-handler', form => form.click());

    const screenshot = await page.screenshot({ "path": "nyt-puppteer.png" });
    await client.close();

    return screenshot;

}

// save_website_as_png("AdriaNn__")

export default save_website_as_png