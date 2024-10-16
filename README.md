# Multiframe https://github.com/jurajtesena/multiframe
# verzie prikazov v dockeri a v lokalnom podadresari su hlavne pre poukazanie rozdielu. Odporucam pouzivat jednoduchsie prikazy docker-compose z root adresara pre kazdu sluzbu samostante.

# 1. Newman - kolekcia API volani v mycollection.json, staci ju nahradit inou kolekciou z Postmana s rovnakym menom
cd newman
# 1.1 Newman -Vytvorenie build/image a updaty build/image s nazvom multiframe-newman z newman
docker build -t multiframe-newman .
#  1.2 Newman - Spustenie image lokalne
docker run --rm -v $(pwd)/reports:/newman/reports multiframe-newman run mycollection.json
# 1.3 Newman - Vytvorenie html reportu a ulozenie do newman/reports
docker run --rm -v $(pwd)/reports:/newman/reports multiframe-newman run mycollection.json -r htmlextra --reporter-htmlextra-export /newman/reports/report.html
# 1.4 Newman - Spustenie pomocou docker-compose z rootu projektu
docker-compose build newman
# 1.5 Newman - Spustenie pomocou docker-compose z rootu projektu bez generovania reportu v v newman/reports
docker-compose run --rm newman run mycollection.json
# 1.6 Newman - Spustenie pomocou docker-compose z rootu projektu s generovanim reportu v v newman/reports
docker-compose run --rm newman run mycollection.json -r htmlextra --reporter-htmlextra-export /newman/reports/report.html

# 2. K6 - performance testy pomocou script.js v k6/script.js. Potrebne si nastavit parametre v k6/script.js
cd k6
# 2.1 K6 - Vytvorenie build/image a updaty build/image s nazvom multiframe-k6
docker build -t multiframe-k6 .
# 2.2 K6 - Spustenie image lokalne
docker run --rm -i multiframe-k6 run script.js
# 2.3 K6 - Spustenie image lokalne s generovanim reportu do k6/html-report.html
docker run --rm -i -v ${PWD}:/k6 -e K6_WEB_DASHBOARD=true -e K6_WEB_DASHBOARD_EXPORT=/k6/html-report.html multiframe-k6 run script.js
# 2.4 K6 - Spustenie vytvorenia build/image pomocou docker-compose z rootu projektu
docker-compose build k6
# 2.5 K6 - Spustenie pomocou docker-compose z rootu projektu s generovanim reportu do k6/html-report.html
docker-compose run --rm k6 run script.js

# 3. Python39 - testy webovej stranky pomocou broken_links.py, sitemap.py v python39
cd python39
# 3.1 Python39 - Vytvorenie build/image a updaty build/image s nazvom multiframe-python39 v lokalnom projekte python39
docker-compose build python39
# 3.2 Python39 - Spustenie image lokalne, kazdej z dvoch sluzieb - trva dlhsie kym zbehne 3min. Odporucame pouzivat docker-compose v 3.3
#docker run --rm -i multiframe-python39 python broken_links.py
#docker run --rm -i multiframe-python39 python sitemap.py
# 3.3 Python39 - Spustenie kazdej zo sluzieb pomocou docker-compose z rootu projektu
#docker-compose run --rm python39 broken_links.py
#docker-compose run --rm python39 sitemap.py

# 4. Robotframework - priklad testovacieho modulu v Multiframeworku
cd robotframework
# 4.1 Robotframework - Vytvorenie build/image a updaty build/image s nazvom multiframe-robotframework v lokalnom projekte robotframework
# 4.2 Robotframework - Spustenie image lokalne
docker run --rm -i multiframe-robotframework
# 4.3 Robotframework - Spustenie pomocou docker-compose z rootu projektu
docker-compose build robotframework
# 4.4 Robotframework - Spustenie pomocou docker-compose z rootu projektu
docker-compose run --rm robotframework

# 5. Cypress - priklad plne funkcneho testovacieho modulu v Multiframeworku
cd cypress
# 5.1 Cypress - Vytvorenie build/image a updaty build/image s nazvom multiframe-cypress v lokalnom projekte cypress
docker build -t multiframe-cypress .
# 5.2 Cypress - Spustenie image lokalne
docker run --rm -v $PWD:/cypress -w /cypress multiframe-cypress npx cypress 
# 5.3 Cypress - Spustenie buildu/image pomocou docker-compose z rootu projektu s vystupom do CLI
docker-compose build cypress
# 5.4 Cypress - Spustenie pomocou docker-compose z rootu projektu s vystupom do CLI
docker-compose run --rm cypress

# 6. Playwright with typescript and axe - priklad plne funkcneho testovacieho modulu v Multiframeworku
cd playwright
# 6.1 Playwright with typescript and axe - Vytvorenie build/image a updaty build/image s nazvom multiframe-playwright v lokalnom projekte playwright
docker build -t multiframe-playwright .
# 6.2 Playwright with typescript - Spustenie image lokalne s HTML vystupmi do playwright-report/html a tiez report.json. Snimky obrazovky v playwright-report/html/data
docker run --rm -v $(pwd)/playwright-report:/app/playwright/playwright-report -v $(pwd)/tests:/app/playwright/tests multiframe-playwright npx playwright test --browser=all
# 6.3 Playwright with typescript and axe - Spustenie image lokalne s HTML AXE vystupmi do tests/fixtures
docker run --rm -v $(pwd)/playwright-report:/app/playwright/playwright-report -v $(pwd)/tests:/app/playwright/tests multiframe-playwright npx playwright test --browser=all

