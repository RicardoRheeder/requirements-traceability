const {Builder, By, Key, util} = require("selenium-webdriver");
async function test() {
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("src/pages/Login.jsx");
    await driver.findElement(By.linkText("Log In")).click;
}
test();