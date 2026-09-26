import { chromium } from 'playwright'


export class DomSensor {

  async scan(url: string) {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(url)

    return page
  }

}