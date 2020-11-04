const USERNAME = "levithompson17@gmail.com";
const PASSWORD = "Ex4mple!";

const { Builder, By, Key, until } = require("selenium-webdriver");

describe('Basic functionality of app', function() {

  it('should navigate to landing page', function() {
    browser.url('http://localhost:9090')
    const LANDING_PAGE_ROOT = $('.landing-page-root')
    expect(LANDING_PAGE_ROOT).toExist()
  })

  it('should navigate to auth0 login page', function() {
    const LOGIN_BUTTON  = $('#LogInButton')
    LOGIN_BUTTON.click()
    expect(browser).toHaveUrlContaining('auth0.com')
  })

  it('should display Auth0 widget', function() {
    const AUTH0_WIDGET = $('.auth0-lock-tabs-container')
    expect(AUTH0_WIDGET).toBeDisplayed()
  })

  it('should log in successfully', function() {
    const LOGIN_FIELD = $('[name = "email"]')
    LOGIN_FIELD.click()
    LOGIN_FIELD.addValue(USERNAME)
    const PASSWORD_FIELD = $('[name = "password"]')
    PASSWORD_FIELD.click()
    PASSWORD_FIELD.addValue(PASSWORD)
    const LOGIN_BUTTON = $('[name = "submit"]')
    LOGIN_BUTTON.click()
    const HOME_ROOT = $('.home-root')
    expect(HOME_ROOT).toExist()
  })

  it('should navigate to new document', function() {
    const EDITOR_BUTTON = $('#NavToEditor').$('.nav-link')
    EDITOR_BUTTON.click()
    const EDITOR_ROOT = $('.editor-root')
    expect(EDITOR_ROOT).toExist()
  })

  it('should select node and change name in hierarchy', function() {
    const EDITOR_HIERARCHY_NODE = $('.row_inputfield');
    EDITOR_HIERARCHY_NODE.click()
    EDITOR_HIERARCHY_NODE.setValue('Example Title')
    expect(EDITOR_HIERARCHY_NODE).toHaveValue('Example Title')

  })

  it('should select node and change text in editor', function() {
    const EDITOR_MAIN_NODE = $('.editor-input');
    EDITOR_MAIN_NODE.click()
    EDITOR_MAIN_NODE.addValue(' example')
    expect(EDITOR_MAIN_NODE).toHaveValue('hlrq1 text example')
  })

  it('should navigate to home', function() {
    const HOME_BUTTON = $('#NavToHome').$('.nav-link')
    HOME_BUTTON.click()
    const HOME_ROOT = $('.home-root')
    expect(HOME_ROOT).toExist()
  })

  it('should log out', function() {
    const LOGOUT_BUTTON = $('.logout-button')
    LOGOUT_BUTTON.click()
    const LANDING_PAGE_ROOT = $('.landing-page-root')
    expect(LANDING_PAGE_ROOT).toExist()
  })

})

function webdriverErrorHandler(err, driver) {
  console.error("Unhandled exception: " + err.message);
}
