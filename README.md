# 📝 Project Overview
This repository includes a sample docker/wordpress woocommerce application and test automated scripts built on cypress/gherkins
 
# 🚀 Get Started
Clone the repository: [repository url](https://github.com/eleingraces/woocommerce.git)
 
📜 Install/Run dependencies:

To Run the woocommerce application ( wordpress-docker folder )
  - Open **terminal**, go to **wordpress-docker** directory, then type: **docker-compose up -d** ( Start and run all the services defined in your docker-compose.yml file. in the background )
  - then type: **docker cp wordpress.sql wordpress-docker-db-1:/wordpress.sql** ( s used to copy a file (wordpress.sql) from your host machine into a Docker container. )
  - then type: **docker exec -i wordpress-docker-db-1 sh -c 'MYSQL_PWD=example mysql -uroot wordpress < /wordpress.sql'** ( import a MySQL database dump (wordpress.sql) into a running MySQL 
    container.)
  - Open http://localhost:8000/ on local browser

To Run the cypress-gherkins test automation
  - **npm install && npx cypress install && npx cypress verify**


Run End to End FrontEnd test (via headless mode): **npx cypress run --spec "cypress/e2e/features/wholesale_price.feature"**
Run End to End FrontEnd test (via headed mode): **npx cypress open**

 
# 📙 Test Coverage
Test Scenario 1: Validate the display of wholesale prices per page 
  Test Case 1: Validate that the wholesale price of a product is displayed in Shop list page
  Test Case 2: Validate that the wholesale price of a product is displayed in the Cart page
  Test Case 3: Validate that the wholesale price of a product is displayed in the Product page
Test Scenario 2: Validate the wholesale price computation.
  Test Case 1: Validate the wholesale price per product in the Cart page
  Test Case 2: Validate the total price of wholesale product/s in the Cart page
  Test Case 3: Validate the wholesale price per product in the Order Summary
  Test Case 4: Validate the total price of wholesale product/s in the Order Summary

 
# ✏️ Relevant Notes
**cypress/e2e/features/wholesale_price.js** -> this is the step definitions file

**cypress/support/wholesalePrice.js** -> this is the test file where page objects are stored; all the functions used to test the applications

**cypress/e2e/features/wholesale_price.feature** -> this is the feature file where the expected behavior is described using the Gherkin language

**cypress/fixtures/test_data.json** -> this is where all the test data are stored

