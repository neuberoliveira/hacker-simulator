const puppeteer = require('puppeteer-core');

const fetchInsta = (profile) => {
	return new Promise(async resolve => {
		const browser = await puppeteer.launch({
			executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			headless: true,
		});
		const page = await browser.newPage();
		await page.goto('https://www.instagram.com/' + profile);
		await page.waitFor(1000);

		const imagesElements = await page.$$("article > div > div > div a > div > div > img")
		const imagesUrl = imagesElements.map(async el => {
			const propertyHandle = await el.getProperty('src')
			const propertyValue = await propertyHandle.jsonValue()
			return propertyValue
		})

		Promise.all(imagesUrl).then(async results => {
			await browser.close()
			resolve(results)
		})
	})
}

module.exports = {
	fetchInsta,
}