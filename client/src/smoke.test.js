//Select working browser install
const BROWSER = "firefox";

//change these to working credentials
//const USERNAME = "ExampleName";
//const PASSWORD = "ExamplePassword";

//Login page values
const APP_PATH = "http://localhost:9090/"; //Path to application
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
    let driver = new Builder().forBrowser(BROWSER).build();

    //Navigate to app path
    driver.get(APP_PATH);

    //Enter credentials to log in
    //driver.findElement(By.id(LOGIN_USERFIELD_ID)).sendKeys(USERNAME);
    //driver.findElement(By.id(LOGIN_PASSFIELD_ID)).sendKeys(PASSWORD);
    
    describe('login button', () => {
      test('exists', () => {
        expect(driver.findElement(By.id(LOGIN_BUTTON_ID))).toBeInstanceOf(WebElement);
      })
      driver.findElement(By.id(LOGIN_BUTTON_ID)).click();

      test('works', () => {
        //wait for home page to load, then verify
      })
    })

    describe('navigate to editor button', () => {
      test('exists', () => {
        expect(driver.findElement(By.id(NAV_EDITOR_BUTTON_ID))).toBeInstanceOf(WebElement);
      })
      driver.findElement(By.id(NAV_EDITOR_BUTTON_ID)).click();

      test('works', () => {
        //wait for editor page to load, then verify
      })
    })

    describe('navigate to home button', () => {
      test('exists', () => {
        expect(driver.findElement(By.id(NAV_HOME_BUTTON_ID))).toBeInstanceOf(WebElement);
      })
      driver.findElement(By.id(NAV_HOME_BUTTON_ID)).click();

      test('works', () => {
        //wait for home page to load, then verify
      })
    })
    

    //Navigate to Editor
    //driver.findElement(By.id(NAV_EDITOR_BUTTON_ID)).click();
    //driver.takeSnapshot();

    //Navigate to Home
    //await driver.findElement(By.id(NAV_HOME_BUTTON_ID)).click();
    //await driver.takeSnapshot();

  } catch (e) {
    webdriverErrorHandler(e, driver);
  }

  driver.quit();

}

function webdriverErrorHandler(err, driver) {
  console.error("Unhandled exception: " + err.message);
  driver.takeScreenshot().then(function(data){
    var base64Data = data.replace(/^data:image\/png;base64,/,"")
    fs.writeFile("../../test_reports/" + err.message + ".png", base64Data, 'base64', function(err) {
      if(err) console.log(err);
    });
  });
}

smokeTest();
