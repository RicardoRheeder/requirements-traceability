//Select working browser install
const BROWSER = "firefox";

//change these to working credentials
//const USERNAME = "ExampleName";
//const PASSWORD = "ExamplePassword";

//Login page values
const LOGIN_PAGE_PATH = "Login.jsx"; //Path to login page
//const LOGIN_USERFIELD_ID = "username-field";
//const LOGIN_PASSFIELD_ID = "password-field";
const LOGIN_BUTTON_ID = "LogInButton";

//Navigate to Home
const NAV_HOME_BUTTON_ID = "NavToHome";

//Navigate to Editor
const NAV_EDITOR_BUTTON_ID = "NavToEditor";

const { Builder, By, Key, util } = require("selenium-webdriver");
async function smokeTest() {
  try {
    //Initiate driver for desired browser
    let driver = await new Builder().forBrowser(BROWSER).build();

    //Enter credentials to log in
    await driver.get(LOGIN_PAGE_PATH);
    //await driver.findElement(By.id(LOGIN_USERFIELD_ID)).sendKeys(USERNAME);
    //await driver.findElement(By.id(LOGIN_PASSFIELD_ID)).sendKeys(PASSWORD);
    await driver.takeSnapshot();
    await driver.findElement(By.id(LOGIN_BUTTON_ID)).click();
    await driver.takeSnapshot();

    //Navigate to Editor
    await driver.findElement(By.id(NAV_EDITOR_BUTTON_ID)).click();
    await driver.takeSnapshot();

    //Navigate to Home
    await driver.findElement(By.id(NAV_HOME_BUTTON_ID)).click();
    await driver.takeSnapshot();

  } catch (e) {
    webdriverErrorHandler(e, driver);
  }

  driver.quit();

}

function webdriverErrorHandler(err, driver) {
  console.error("Unhandled exception: " + err.message);
}
smokeTest();
