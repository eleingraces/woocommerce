Feature: Wholesale price functionality
  - Validate the display of wholesale prices per page.
  - Validate the wholesale price computation.

  Scenario: Validate that the wholesale price of a product is displayed in Shop list page
    Given the user clicks the "Shop" menu
    Then they should see "Grace Chair" in the list of products
    And they should see its “Wholesale Price:” label and Wholesale price value are displayed

  Scenario: Validate the wholesale price per product in the Product page
    Given the user is on the homepage
    When they search "Grace Chair" in the Search bar
    Then they should see "Grace chair" product in the Product page
    And they should see its Wholesale price value is displayed in Product page correctly

  Scenario: Validate that the wholesale price of a product is displayed in the Cart page
    Given the user is on the homepage
    And the user clicks the "Shop" menu
    And they should see "Grace Chair" in the list of products
    When they click “Add to cart” button
    And they click “View cart”
    Then they should see its Wholesale price value is displayed in Cart page correctly

  Scenario: Validate the total price of wholesale product/s in the Cart page
    Given the user is on the homepage
    And the user clicks the "Shop" menu
    And they should see "Grace Chair" in the list of products
    When they click “Add to cart” button
    And they click “View cart”
    And they add 5 quantities of the same wholesale product
    Then they should see correct total price of the wholesale product in Cart page

  Scenario: Validate the wholesale price per product in the Order Summary
    Given the user is on the Cart page
    When the user proceeds to Checkout
    Then they should see its Wholesale price value is displayed in Order Summary correctly

  Scenario: Validate the total price of wholesale product/s in the Order Summary
    Given the user is on the Checkout page
    Then they should see correct total price of the wholesale product in Order Summary




 