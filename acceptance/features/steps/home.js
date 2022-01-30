const {Given, When, Then} = require("cucumber");
const openUrl = require("../support/action/openUrl");
const checkUrl = require("../support/check/checkUrl");
const checkElementExists = require("../support/check/checkElementExists");
const checkAttribute = require("../support/check/checkAttribute")
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