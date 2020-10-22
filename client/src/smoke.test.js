//Select working browser install
const BROWSER = "firefox";

//change these to working credentials
const USERNAME = "levithompson17@gmail.com";
const PASSWORD = "Ex4mple!";


const APP_PATH = "http://localhost:9090/"; //Path to application
const LANDING_PAGE_ROOT_CLASS = "app-root"
const HOME_ROOT_CLASS = "home-root"
const LOGIN_WIDGET_CLASS = "auth0-lock-widget"
const LOGIN_USERFIELD_NAME = "email";
const LOGIN_PASSFIELD_NAME = "password";
const LOGIN_BUTTON_ID = "LogInButton";
const LOGIN_AUTH_BUTTON_NAME = "submit";
const NAV_HOME_BUTTON_ID = "NavToHome";
const NAV_EDITOR_BUTTON_ID = "NavToEditor";
const EDITOR_ROOT_CLASS = "editor-root";
const LOGIN_LOCK_OPENED = "auth0-lock-opened";
const LOGIN_LOCK_INPUT = "auth0-lock-input";
const LOGIN_LOCK_QUIET = "auth0-lock-quiet";
const NAV_GENERAL_LINK = "nav-link";
const EDITOR_HIERARCHY_NODE = "rstcustom__row";
const EDITOR_NODE_TITLE = "row_inputfield";
const EDITOR_MAIN_NODE = "1";
const EDITOR_MAIN_NODE_TEXT = "editor-input";
const NAV_LOGOUT_BUTTON_ID = "logout-button";


const { Builder, By, Key, until } = require("selenium-webdriver");

//Initiate driver for desired browser
let driver = new Builder().forBrowser(BROWSER).build();

describe('Basic functionality of app', () => {

  afterAll(() => {
    driver.quit()
  });

  test('navigate to landing page', async () => {
    await driver.get(APP_PATH)
    expect(await driver.findElement(By.className(LANDING_PAGE_ROOT_CLASS))).toBeTruthy()
  })

  test('navigate to auth0 login page', async () => {
    await driver.findElement(By.id(LOGIN_BUTTON_ID)).click()
    expect(await driver.findElement(By.className(LOGIN_WIDGET_CLASS))).toBeTruthy()
  })

  test('enter credentials and login', async () => {
    await driver.wait(until.elementLocated(By.className(LOGIN_LOCK_OPENED),10000))
    expect(await driver.findElement(By.className(LOGIN_LOCK_OPENED))).toBeTruthy()

    await driver.wait(until.elementLocated(By.className(LOGIN_LOCK_INPUT),10000))
    expect(await driver.findElement(By.className(LOGIN_LOCK_INPUT))).toBeTruthy()

    await driver.wait(until.elementLocated(By.className(LOGIN_LOCK_QUIET),10000))
    expect(await driver.findElement(By.className(LOGIN_LOCK_QUIET))).toBeTruthy()

    await driver.findElement(By.name(LOGIN_USERFIELD_NAME)).click()
    await driver.findElement(By.name(LOGIN_USERFIELD_NAME)).sendKeys(USERNAME)
    await driver.findElement(By.name(LOGIN_PASSFIELD_NAME)).click()
    await driver.findElement(By.name(LOGIN_PASSFIELD_NAME)).sendKeys(PASSWORD)
    await driver.findElement(By.name(LOGIN_AUTH_BUTTON_NAME)).click()
  })

  test('navigate to editor', async () => {
    await driver.wait(until.elementLocated(By.className(HOME_ROOT_CLASS),10000))
    await (await (await driver.findElement(By.id(NAV_EDITOR_BUTTON_ID))).findElement(By.className(NAV_GENERAL_LINK))).click()
    expect(await driver.findElement(By.className(EDITOR_ROOT_CLASS))).toBeTruthy()
  })

  test('select node and change name in hierarchy', async () => {
    let node1 = await driver.findElement(By.className(EDITOR_HIERARCHY_NODE))
    await node1.click()
    let node1Class = await node1.getAttribute("class")
    expect(node1Class).toMatch(/.*selected-tree-node.*/)

    let node1Label = await node1.findElement(By.className(EDITOR_NODE_TITLE))
    await node1Label.clear()
    await node1Label.sendKeys("example")
    let node1LabelValue = await node1Label.getAttribute("value")
    expect(node1LabelValue).toMatch(/example/)

    await node1Label.clear()
    await node1Label.sendKeys("HLRQ1")
    node1LabelValue = await node1Label.getAttribute("value")
    expect(node1LabelValue).toMatch(/HLRQ1/)
  })

  test('select node and change text in editor', async () => {
    let node1 = await driver.findElement(By.id(EDITOR_MAIN_NODE))
    let node1Text = await node1.findElement(By.className(EDITOR_MAIN_NODE_TEXT))
    await node1Text.clear()
    await node1Text.sendKeys("example")
    let node1TextValue = await node1Text.getText()
    expect(node1TextValue).toMatch(/example/)

    await node1Text.clear()
    await node1Text.sendKeys("hlrq1 text")
    node1TextValue = await node1Text.getText()
    expect(node1TextValue).toMatch(/hlrq1 text/)
  })

  test('navigate to home', async () => {
    await (await (await driver.findElement(By.id(NAV_HOME_BUTTON_ID))).findElement(By.className(NAV_GENERAL_LINK))).click()
    expect(await driver.findElement(By.className(HOME_ROOT_CLASS))).toBeTruthy()
  })

  test('log out', async () => {
    await (await driver.findElement(By.className(NAV_LOGOUT_BUTTON_ID))).click()
    expect(await driver.findElement(By.className(LANDING_PAGE_ROOT_CLASS))).toBeTruthy()
  })

})

function webdriverErrorHandler(err, driver) {
  console.error("Unhandled exception: " + err.message);
}
