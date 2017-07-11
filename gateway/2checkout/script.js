jQuery(function() {
    jQuery(document).on('proceedToPayment', function(event, ShoppingCart) {
                console.log('shoppingcart 2checkout plugin loaded ')
        if (ShoppingCart.gateway != 'twocheckout') {
            return;
        }
        var amount = ShoppingCart.calculateTotalPriceIncludingTaxesAndShipping();
        var currency = ShoppingCart.settings.general.currency;

    
/* - Defning if sanbox or production - */
    if (ShoppingCart.settings.payment.methods.twocheckout.sandbox.length === 0 ){
            url = 'https://www.2checkout.com/checkout/purchase';
    }else {
            url ='https://sandbox.2checkout.com/checkout/purchase'
    }   

    cart = {
        products: storejs.get('grav-shoppingcart-basket-data'),
        data: storejs.get('grav-shoppingcart-checkout-form-data'),
        shipping: storejs.get('grav-shoppingcart-shipping-method')
    }
  
    product = [];
     formSrc = document.createElement('form');
            formSrc.setAttribute('method', 'post');
            formSrc.setAttribute('action', url);
            formSrc.setAttribute('id', 'send2co');
        input1 = document.createElement('input');
            input1.setAttribute('type', 'hidden');
            input1.setAttribute('name', 'sid');
            input1.setAttribute('value', ShoppingCart.settings.payment.methods.twocheckout.sellerID);
        input2 = document.createElement('input');
            input2.setAttribute('type', 'hidden');
            input2.setAttribute('name', 'mode');
            input2.setAttribute('value','2CO'); 
            /*add inputs to form*/    
            formSrc.appendChild(input1);
            formSrc.appendChild(input2);

        /*products in cart*/
        cart.products.forEach(function(products, i) { 
            product = document.createElement('input');
                product.setAttribute('type', 'hidden');
                product.setAttribute('name', 'li_'+i+'_type');
                product.setAttribute('value', 'product');
                formSrc.appendChild(product);

            productName = document.createElement('input');
                productName.setAttribute('type', 'hidden');
                productName.setAttribute('name', 'li_'+i+'_name');
                productName.setAttribute('value', products.product.title);
                formSrc.appendChild(productName);

            productQuantity = document.createElement('input');
                productQuantity.setAttribute('type', 'hidden');
                productQuantity.setAttribute('name', 'li_'+i+'_quantity');
                productQuantity.setAttribute('value', products.quantity);
                formSrc.appendChild(productQuantity);

            productPrice = document.createElement('input');
                productPrice.setAttribute('type', 'hidden');
                productPrice.setAttribute('name', 'li_'+i+'_price')
                productPrice.setAttribute('value', products.product.price);
                formSrc.appendChild(productPrice);

            tangible = document.createElement('input');
                tangible.setAttribute('type', 'hidden');
                tangible.setAttribute('name', 'li_'+i+'_tangible');
                tangible.setAttribute('value', 'Y');
                formSrc.appendChild(tangible);
        }, this);
     
           
        // /* - Taxes -*/
        
            productTax = document.createElement('input');
                productTax.setAttribute('type', 'hidden');
                productTax.setAttribute('name','li_'+eval(cart.products.length)+'_type');
                productTax.setAttribute('value', 'tax');
                formSrc.appendChild(productTax);    
            
            productTax1 = document.createElement('input');
                productTax1.setAttribute('type', 'hidden');
                productTax1.setAttribute('name','li_'+eval(cart.products.length)+'_name')
                productTax1.setAttribute('value', 'Total Sale Taxes');
                formSrc.appendChild(productTax1);

            productTax2 = document.createElement('input');
                productTax2.setAttribute('type', 'hidden');
                productTax2.setAttribute('name', 'li_'+eval(cart.products.length)+'_price');
                productTax2.setAttribute('value', ShoppingCart.taxesApplied);
                formSrc.appendChild(productTax2);
        /* - Shipping*/ 
        productShipping = document.createElement('input');
            productShipping.setAttribute('type', 'hidden');
            productShipping.setAttribute('name','li_'+eval(cart.products.length+1)+'_name')
            productShipping.setAttribute('value', cart.shipping.method);
            formSrc.appendChild(productShipping);
    
        productShipping1 = document.createElement('input');
            productShipping1.setAttribute('type', 'hidden');
            productShipping1.setAttribute('name','li_'+eval(cart.products.length+1)+'_price')
            productShipping1.setAttribute('value', cart.shipping.cost);
            formSrc.appendChild(productShipping1);

        productShipping2 = document.createElement('input');
            productShipping2.setAttribute('type', 'hidden');
            productShipping2.setAttribute('name','li_'+eval(cart.products.length+1)+'_type')
            productShipping2.setAttribute('value', 'shipping');
            formSrc.appendChild(productShipping2);

        productCurrency = document.createElement('input');
            productCurrency.setAttribute('type', 'hidden');
            productCurrency.setAttribute('name', 'currecy_code');
            productCurrency.setAttribute('value', currency);
            formSrc.appendChild(productCurrency);

        cardHolderName = document.createElement('input');
            cardHolderName.setAttribute('name', 'card_holder_name')
            cardHolderName.setAttribute('value', cart.data.firstname+' '+cart.data.lastname);
            
        cardAddress = document.createElement('input');
            cardAddress.setAttribute('type', 'hidden');
            cardAddress.setAttribute('name', 'street_address');
            cardAddress.setAttribute('value', cart.data.address);
            formSrc.appendChild(cardAddress);

        /* - if 'sate' exist*/

        if (typeof(cart.data.state)!= 'undefined') { 
            stateAdress = document.createElement('input');
                stateAdress.setAttribute('type', 'hidden');
                stateAdress.setAttribute('name', 'ship_state');
                stateAdress.setAttribute('value',cart.data.state);
            formSrc.appendChild(stateAdress);
        } 
        
        
        /* - if 'province' exist*/

        if (typeof(cart.data.province)!= 'undefined') { 
            stateAdress = document.createElement('input');
                stateAdress.setAttribute('type', 'hidden');
                stateAdress.setAttribute('name', 'ship_state');
                stateAdress.setAttribute('value',cart.data.province);
            formSrc.appendChild(stateAdress);
        } 
        
        

        cardZip = document.createElement('input');
            cardZip.setAttribute('type', 'hidden');
            cardZip.setAttribute('name', 'zip');
            cardZip.setAttribute('value', cart.data.zip);   
            formSrc.appendChild(cardZip);

        cardCountry = document.createElement('input');
            cardCountry.setAttribute('type', 'hidden');
            cardCountry.setAttribute('name', 'country')
            cardCountry.setAttribute('value', cart.data.country);
            formSrc.appendChild(cardCountry);

        cardEmail = document.createElement('input');
            cardEmail.setAttribute('type', 'hidden');       
            cardEmail.setAttribute('name', 'email');
            cardEmail.setAttribute('value',cart.data.email);
            formSrc.appendChild(cardEmail);
        
        cardPhone = document.createElement('input');
            cardPhone.setAttribute('type', 'hidden');
            cardPhone.setAttribute('name', 'phone')
            cardPhone.setAttribute('value', cart.data.telephone);
            formSrc.appendChild(cardPhone);


        shippingName = document.createElement('input');    
            shippingName.setAttribute('type', 'hidden');
            shippingName.setAttribute('name', 'ship_name'); 
            shippingName.setAttribute('value', cart.data.firstname+' '+cart.data.lastname);
            formSrc.appendChild(shippingName);

        shipAddress = document.createElement('input');
            shipAddress.setAttribute('type', 'hidden');
            shipAddress.setAttribute('name', 'ship_street_address');
            shipAddress.setAttribute('value', cart.data.address);
            formSrc.appendChild(shipAddress);
            
        shipCity = document.createElement('input');
            shipCity.setAttribute('type', 'hidden');
            shipCity.setAttribute('name', 'ship_city');
            shipCity.setAttribute('value', cart.data.city);
            formSrc.appendChild(shipCity)
            
        shipZip = document.createElement('input');
            shipZip.setAttribute('tye', 'hidden');        
            shipZip.setAttribute('name', 'ship_zip');
            shipZip.setAttribute('value', cart.data.zip);
            formSrc.appendChild(shipZip);

        shipCountry = document.createElement('input');
            shipCountry.setAttribute('type', 'hidden');       
            shipCountry.setAttribute('name', 'ship_country');
            shipCountry.setAttribute('value', cart.data.country);
            formSrc.appendChild(shipCountry);

// sending HTML code to page
$('body').append(formSrc);
// submit to 2checkout
$('#send2co').submit();
 console.log(formSrc)

// console.log('clear formSrc');
 formSrc = [];

});
});
