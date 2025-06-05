const testData = 'cypress/fixtures/test_data.json'

class woocommerce {
   username = '[id|="username"]';
   password = '[id|="password"]';
   loginBtn = 'button[name="login"]';
   welcomeText = 'p strong';
   menuPage = '#modal-1-content > ul > ul > li';
   shopPage = '#wp--skip-link--target';
   homePage = 'a[rel="home"]';
   addToCartBtn = 'button[rel="nofollow"]';
   itemPrice = '.wc-block-cart-item__prices';
   searchBar = '#wp-block-search__input-2';
   searchBtn = 'button[aria-label="Search"]';
   searchItemName = '.wp-block-post-title';
   searchItemPrice = '.wp-block-woocommerce-product-price';
   quantity = '.wc-block-components-quantity-selector__input';
   productPrice = 'ins.wc-block-components-product-price__value';
   totalPrice1 = 'span.wc-block-components-product-price__value';
   orderSummary = '.wp-block-woocommerce-checkout-order-summary-block';
   orderSummaryProductPrice = 'ins.wc-block-components-product-price__value';
   orderSummaryTotalPrice = '.wc-block-formatted-money-amount';

   elements = {
      username: () => cy.get(this.username),
      password: () => cy.get(this.password),
      loginBtn: () => cy.get(this.loginBtn),
      userText: () => cy.get(this.welcomeText).eq(1),
      shopMenu: () => cy.get(this.menuPage).eq(4),
      shopPage: () => cy.get(this.shopPage).eq(0),
      homePage: () => cy.get(this.homePage),
      addToCartBtn: () => cy.get(this.addToCartBtn),
      itemPrice: () => cy.get(this.itemPrice),
      searchBar: () => cy.get(this.searchBar),
      searchBtn: () => cy.get(this.searchBtn),
      searchItemName: () => cy.get(this.searchItemName).eq(0),
      searchItemPrice: () => cy.get(this.searchItemPrice).eq(0),
      quantity: () =>  cy.get(this.quantity),
      productPrice: () => cy.get(this.productPrice),
      totalPrice1: () => cy.get(this.totalPrice1),
      orderSummary: () => cy.get(this.orderSummary), 
      orderSummaryProductPrice: () => cy.get(this.orderSummaryProductPrice).eq(0),
      orderSummaryTotalPrice: () => cy.get(this.orderSummaryTotalPrice).eq(0),
   }

  login() {
      cy.readFile(testData)
         .then(({username, password}) => { 
            this.elements.username().type(username);
            this.elements.password().type(password);
      });

      this.elements.loginBtn().click();
      cy.wait(2000);
  }

  homepageValidation() {
      cy.readFile(testData)
         .then(({username}) => { 
         this.elements.userText().should('contain.text', username)
      }); 
  }

  goToShopMenu() {
     this.elements.shopMenu().click();
  }

  validateWholesaleProductInShopPage() {
      cy.readFile(testData)
         .then(({wholesale_product}) => { 
            this.elements.shopPage().should('contain', wholesale_product);
         });    
  }

  validateWholesalePriceLabel() {
   cy.readFile(testData)
      .then(({wholesale_product, wholesale_price}) => { 
         this.elements.shopPage().contains(wholesale_product)
            .parents('li')
            .find('div')
            .eq(2)
            .should('include.text', 'Wholesale Price:')
            .and('include.text', '₱' + wholesale_price)
      });    
   }

   goToHomepage() {
      this.elements.homePage().contains('Gentle Master').click();
   }

   addToCartProduct() {
      cy.readFile(testData)
      .then(({wholesale_product}) => { 
         this.elements.shopPage().contains(wholesale_product)
         .parents('li')
         .find('div')
         .eq(4)
         .contains('cart')
         .click();
      }); 
   }

   viewCart() {
      cy.readFile(testData)
      .then(({wholesale_product}) => { 
         this.elements.shopPage().contains(wholesale_product)
         .parents('li')
         .find('div')
         .eq(4)
         .contains('View cart')
         .click();
      }); 
   }
   
   validateWholesalePriceInCart() {
      this.elements.itemPrice().then($el => {
         cy.readFile(testData)
            .then(({wholesale_price}) => { 
            const actualText = $el.text().trim();

            expect(actualText).to.include(wholesale_price);
            cy.log('✅ Item Price contains the correct Wholesale Price');
         });
      })
   }

   searchProduct() {
      cy.readFile(testData)
            .then(({wholesale_product}) => { 
               this.elements.searchBar().clear().type(wholesale_product);
               this.elements.searchBtn().click();
         });
   }

   validateWholesaleProductInProductPage() {
      cy.readFile(testData)
            .then(({wholesale_product}) => { 
               this.elements.searchItemName().should('contain.text', wholesale_product);
         });
   }

   validateWholesalePriceInProductPage() {
      this.elements.searchItemPrice().then($el => {
         cy.readFile(testData)
            .then(({wholesale_price}) => { 
            const actualText = $el.text().trim();

            expect(actualText).to.include(wholesale_price);
            cy.log('✅ Item Price contains the correct Wholesale Price');
         });
      })
   }

   addMultipleQuantitiesToCart() {
      for (let i = 1; i <= 5; i++) {
        cy.contains('button', '＋').click();
      }
   }

   validateTotalPriceInCart() {
      this.elements.quantity()
         .invoke('val')
         .then((val) => { 
            let quantityOfProduct = parseInt(val.trim(), 10);
            this.elements.productPrice()
               .invoke('text')
               .then((price) => { 
               let product = parseFloat(price.replace('₱', '').replace(',', '').trim());
                     this.elements.totalPrice1()
                        .invoke('text')
                        .then((total) => { 
                           let actualTotalPrice = parseFloat(total.replace('₱', '').replace(',', '').trim());
                           let expectedTotalPrice = (quantityOfProduct * product);
               
                           cy.log(`Expected total price: ₱${expectedTotalPrice}`);
                           cy.log(`Actual total price: ₱${actualTotalPrice}`);

                           this.elements.totalPrice1().should('contain', expectedTotalPrice.toLocaleString());
                           cy.log('✅ Actual total price is the same as expected price (which is the price of the product as it appears in the cart multiplied by the quantity)');
                     })
            })
      });
   }

   validateCartPage() {
      this.elements.shopPage().should('contain', 'Cart');
   }

   goToCheckout() {
      cy.contains('Proceed to Checkout').click();
   }

   validateWholesalePriceInOrderSummary() {
      this.elements.productPrice().then($el => {
         cy.readFile(testData)
            .then(({wholesale_price}) => { 
            const actualText = $el.text().trim();

            expect(actualText).to.include(wholesale_price);
            cy.log('✅ Item Price contains the correct Wholesale Price in Order Summary');
         });
      })
   }
   
   validateCheckoutPage() {
      this.elements.orderSummary().should('be.visible')
   }

   validateTotalPriceInOrderSummary() {
      this.elements.orderSummary()
         .find('div')
         .eq('7')
         .find('span')
         .eq(0)
         .invoke('text')
         .then((text) => { 
            let quantityOfProduct = parseInt(text.trim(), 10)
            cy.log(quantityOfProduct)
            this.elements.orderSummaryProductPrice()
               .invoke('text')
               .then((price) => { 
               let product = parseFloat(price.replace('₱', '').replace(',', '').trim());
               cy.log(product)
                     this.elements.orderSummaryTotalPrice()
                        .invoke('text')
                        .then((total) => { 
                           let actualTotalPrice = parseFloat(total.replace('₱', '').replace(',', '').trim());
                           let expectedTotalPrice = (quantityOfProduct * product);
               
                           cy.log(`Expected total price: ₱${expectedTotalPrice}`);
                           cy.log(`Actual total price: ₱${actualTotalPrice}`);

                           this.elements.totalPrice1().should('contain', expectedTotalPrice.toLocaleString());
                           cy.log('✅ Actual total price is the same as expected price (which is the price of the product as it appears in the order multiplied by the quantity)');
                     })
            })
      });
   } 

} export default woocommerce