*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem

*** Variables ***
${BROWSER}    chrome
${URL}    https://www.example.com
${HEADLESS}    ${TRUE}    # Set to ${FALSE} for local headed execution
${TIMEOUT}    30s

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
Example Test
    Open Chrome Browser
    Title Should Be    Example Domain
    Close Browser



