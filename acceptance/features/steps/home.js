const {Given, When, Then} = require("cucumber");
const openUrl = require("../support/action/openUrl");
const checkUrl = require("../support/check/checkUrl");
const checkUrlContains = require("../support/check/checkUrlContains")
const checkElementExists = require("../support/check/checkElementExists");
const assert = require("assert");

Given(/^that User goes to Video Site Project's HomePage$/, async function () {
    this.pageUrl = "http://localhost:8080/"
    await openUrl.call(this, this.pageUrl)
});

When(/^page is loaded$/, async function () {
    const not = false;
    await checkUrl.call(this, not, this.pageUrl)
    await checkElementExists.call(this, "#page-title", not)
});

Then(/^User can see some of videos' title like$/, async function (table) {
    const titles = table.rawTable.map(arr => arr[0])
    const selector = ".video-title"
    const not = false
    const elementCount = await this.page.$$eval(
        selector,
        (elements, titles) => {
            return elements.filter(element => titles.includes(element.textContent)).length
        },
        titles
    )
    assert.equal(titles.length, elementCount, `Expected "${titles.length}" to ${not ? 'equal' : 'not equal'} "${elementCount}" of element "${selector}"`)
});

Given(/^that User is on Video Site Project's HomePage$/, async function () {
    this.pageUrl = "http://localhost:8080/"
    await openUrl.call(this, this.pageUrl)
    const not = false;
    await checkUrl.call(this, not, this.pageUrl)
});

When(/^User clicks "([^"]*)" video$/, async function (title) {
    const selector = ".video-card"

    this.slug = await this.page.$$eval(
        selector,
        async (elements, title) => {
            const videoCard = elements.find(element => element.querySelector(".video-title").textContent === title)
            const button = videoCard.querySelector(".watch-button")
            const { slug } = videoCard.dataset
            await button.click()
            return slug
        },
        title
    )
});

Then(/^User should see watch url correctly$/, async function () {
    await this.page.waitForNavigation()
    const not = false
    await checkUrlContains.call(this, not, this.slug)
});

When(/^User hovers "([^"]*)" video$/, async function (title) {
    this.page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`);
    });

    const elements = await this.page.$$(".video-card");
    /*
        find and filter doesn't work on elementHandle object like this
        test works for first item in elements array (ElementHandle[])
     */
    const element = elements.find(async element => await element.$eval(".video-title", e => e.textContent) === title)
    const imageElement = await element.$("img")
    this.coverImage = await imageElement.evaluate(e => e.src)
    await imageElement.hover()
    this.hoverImage = await imageElement.evaluate(e => e.src)
});

Then(/^User should see hovered image$/, async function () {
    const { coverImage, hoverImage } = this
    assert.notEqual(coverImage, hoverImage)
});