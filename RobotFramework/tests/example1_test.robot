*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem

*** Variables ***
${BROWSER}    chrome
${URL}    https://www.example.com
${HEADLESS}    ${TRUE}    # Set to ${FALSE} for local headed execution

*** Keywords ***
Open Chrome Browser
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Run Keyword If    ${HEADLESS}    Call Method    ${chrome_options}    add_argument    --headless
    Call Method    ${chrome_options}    add_argument    --no-sandbox
    Call Method    ${chrome_options}    add_argument    --disable-dev-shm-usage
    Create Webdriver    Chrome    chrome_options=${chrome_options}
    Go To    ${URL}

Prime Browser
    Open Chrome Browser
    Close Browser

*** Test Cases ***
Browser Priming
    Prime Browser

*** Test Cases ***
Example 1 - Check Page Title
    Open Chrome Browser
    ${title}=    Get Title
    Log    Page title is: ${title}
    Should Be Equal    ${title}    Example Domain
    Close Browser

Example 1 - Check Page Content
    Open Chrome Browser
    Page Should Contain    This domain is for use in illustrative examples in documents
    Capture Page Screenshot
    Close Browser




