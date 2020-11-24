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

  it('should create new document', function() {
    const ADD_BUTTON = $('button=Add')
    ADD_BUTTON.click()
    const MODAL_INPUT = $('.modal-input')
    MODAL_INPUT.click()
    MODAL_INPUT.addValue("TestDocument")
    const SUBMIT_BUTTON = $('.modal-button')
    SUBMIT_BUTTON.click()
  })

  it('should have document with current version number', function() {
    const DROPDOWN = $('.Dropdown-control')
    DROPDOWN.click()
    const VERSION = $('div=0.0')
    expect(VERSION).toExist()
  })

  it('should navigate to new document', function() {
    const DOCUMENT = $('.document-panel-component')
    DOCUMENT.doubleClick()
    const EDITOR_ROOT = $('.editor-root')
    expect(EDITOR_ROOT).toExist()
  })

  it('should select node and change name in hierarchy', function() {
    const EDITOR_HIERARCHY_NODE = $('.row_inputfield').$('input')
    EDITOR_HIERARCHY_NODE.click()
    EDITOR_HIERARCHY_NODE.setValue(' edited')
    expect(EDITOR_HIERARCHY_NODE).toHaveValue('Title of your requirement. (1) edited')
  })

  it('should select node and change name in editor', function() {
    const EDITOR_MAIN_NODE = $('.selected').$('textarea')
    EDITOR_MAIN_NODE.click()
    EDITOR_MAIN_NODE.addValue(' edited')
    expect(EDITOR_MAIN_NODE).toHaveValue('Type contents of requirement here... edited')
  })

  it('should find edited requirement via search', function() {
    const SEARCH_PANEL = $('.search-panel').$('input')
    SEARCH_PANEL.click()
    SEARCH_PANEL.setValue('edited')
    const SEARCH_SELECTED = $('.rstcustom__rowSearchMatch')
    expect(SEARCH_SELECTED).toExist()
  })

  it('should commit changes', function() {
    const COMMIT_BUTTON = $('button=COMMIT')
    COMMIT_BUTTON.click()
    const MODAL_INPUT = $('.modal-input')
    MODAL_INPUT.click()
    MODAL_INPUT.addValue("1.0.0")
    const SUBMIT_BUTTON = $('.modal-button')
    SUBMIT_BUTTON.click()
  })

  it('should navigate to home', function() {
    const HOME_BUTTON = $('#NavToHome').$('.nav-link')
    HOME_BUTTON.click()
    const HOME_ROOT = $('.home-root')
    expect(HOME_ROOT).toExist()
  })

  it('should have document with new version number', function() {
    const DROPDOWN = $('.Dropdown-control')
    DROPDOWN.click()
    const VERSION = $('div=1.0.0')
    expect(VERSION).toExist()
  })

  it('should delete document', function() {
    const DOCUMENT = $('.document-panel-component')
    DOCUMENT.click()
    const REMOVE_BUTTON = $('button=Remove')
    REMOVE_BUTTON.click()
    const MODAL_INPUT = $('.modal-input')
    MODAL_INPUT.click()
    MODAL_INPUT.addValue("TestDocument")
    const SUBMIT_BUTTON = $('.modal-button')
    SUBMIT_BUTTON.click()
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
