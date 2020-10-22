//Select working browser install
const BROWSER = "firefox";

//change these to working credentials
const USERNAME = "levithompson17@gmail.com";
const PASSWORD = "Ex4mple!";

//Login page values
const APP_PATH = "http://localhost:9090/"; //Path to application
const HOME_ROOT_CLASS = "app-root"
const LOGIN_WIDGET_CLASS = "auth0-lock-widget"
const LOGIN_USERFIELD_NAME = "email";
const LOGIN_PASSFIELD_NAME = "password";
const LOGIN_BUTTON_ID = "LogInButton";
const LOGIN_AUTH_BUTTON_NAME = "submit";

//Navigate to Home
const NAV_HOME_BUTTON_ID = "NavToHome";

//Navigate to Editor
const NAV_EDITOR_BUTTON_ID = "NavToEditor";

const { Builder, By, Key, until } = require("selenium-webdriver");

//Initiate driver for desired browser
let driver = new Builder().forBrowser(BROWSER).build();

describe('Basic functionality of app', () => {

  test('navigate to landing page', async () => {
    await driver.get(APP_PATH)
    expect(await driver.findElement(By.className(HOME_ROOT_CLASS))).toBeTruthy()
  })

  test('navigate to auth0 login page', async () => {
    await driver.findElement(By.id(LOGIN_BUTTON_ID)).click();
    expect(await driver.findElement(By.className(LOGIN_WIDGET_CLASS))).toBeTruthy()
  })

  test('enter credentials', async () => {
    await driver.wait(until.elementLocated(By.className('auth0-lock-opened'),10000))
    expect(await driver.findElement(By.className('auth0-lock-opened'))).toBeTruthy()

    await driver.wait(until.elementLocated(By.className('auth0-lock-input'),10000))
    expect(await driver.findElement(By.className('auth0-lock-input'))).toBeTruthy()

    await driver.wait(until.elementLocated(By.className('auth0-lock-quiet'),10000))
    expect(await driver.findElement(By.className('auth0-lock-quiet'))).toBeTruthy()

    await driver.findElement(By.name(LOGIN_USERFIELD_NAME)).click()
    await driver.findElement(By.name(LOGIN_USERFIELD_NAME)).sendKeys(USERNAME)
    await driver.findElement(By.name(LOGIN_PASSFIELD_NAME)).click()
    await driver.findElement(By.name(LOGIN_PASSFIELD_NAME)).sendKeys(PASSWORD)
    await driver.findElement(By.name(LOGIN_AUTH_BUTTON_NAME)).click()

  })

})

function webdriverErrorHandler(err, driver) {
  console.error("Unhandled exception: " + err.message);
}
