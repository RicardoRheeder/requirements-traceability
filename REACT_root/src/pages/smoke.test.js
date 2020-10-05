//Select working browser install
const BROWSER = "firefox";

//change these to working credentials
const USERNAME = "ExampleName";
const PASSWORD = "ExamplePassword";

//Sample text examples
const DOCUMENT_NAME = "Example Document";
const NODE_NAME = "Example Requirement";
const NODE_DESCRIPTION = "Example description for new requirement";

//Login page values
const LOGIN_PAGE_PATH = "Login.jsx"; //Path to login page
const LOGIN_USERFIELD_ID = "username-field";
const LOGIN_PASSFIELD_ID = "password-field";
const LOGIN_BUTTON_ID = "login-button";

//Choose/New document page values (this page doesn't exist as of yet)
const NEW_DOCUMENT_BUTTON_ID = "new-document-button";
const NEW_DOCUMENT_NAMEFIELD_ID = "new-document-name";
const NEW_DOCUMENT_CONFIRM_BUTTON_ID = "new-document-name";

//SplitPane page values (assumes clicking on empty pane will create new requirement node)
const SPLITPANE_NODES_ID = "node-pane";
const SPLITPANE_NEW_NODE_NAMEFIELD_ID = "node-name-field";
const SPLITPANE_NEW_NODE_DESCFIELD_ID = "node-description-field";
const SPLITPANE_NEW_NODE_CONFIRM_BUTTON_ID = "node-confirm--button";

const { Builder, By, Key, util } = require("selenium-webdriver");
async function smokeTest() {
  try {
    //Initiate driver for desired browser
    let driver = await new Builder().forBrowser(BROWSER).build();

    //Enter credentials to log in
    await driver.get(LOGIN_PAGE_PATH);
    await driver.findElement(By.id(LOGIN_USERFIELD_ID)).sendKeys(USERNAME);
    await driver.findElement(By.id(LOGIN_PASSFIELD_ID)).sendKeys(PASSWORD);
    await driver.takeSnapshot();
    await driver.findElement(By.id(LOGIN_BUTTON_ID)).click();

    //Create a new requirements document
    await driver.findElement(By.id(NEW_DOCUMENT_BUTTON_ID)).click();
    await driver
      .findElement(By.id(NEW_DOCUMENT_NAMEFIELD_ID))
      .sendKeys(DOCUMENT_NAME);
    await driver.takeSnapshot();
    await driver.findElement(By.id(NEW_DOCUMENT_CONFIRM_BUTTON_ID)).click();

    //Create a new requirement node in splitpane
    await driver.findElement(By.id(SPLITPANE_NODES_ID)).click();
    await driver
      .findElement(By.id(SPLITPANE_NEW_NODE_NAMEFIELD_ID))
      .sendKeys(NODE_NAME);
    await driver
      .findElement(By.id(SPLITPANE_NEW_NODE_DESCFIELD_ID))
      .sendKeys(NODE_DESCRIPTION);
    await driver.takeSnapshot();
    await driver
      .findElement(By.id(SPLITPANE_NEW_NODE_CONFIRM_BUTTON_ID))
      .click();
  } catch (e) {
    webdriverErrorHandler(e, driver);
  }
}

function webdriverErrorHandler(err, driver) {
  console.error("Unhandled exception: " + err.message);
}
smokeTest();
