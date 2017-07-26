
# Shoppingcart 2checkout Dev Plugin

As I wanted/needed 2checkout integration to gravcart... read a bunch of stuff... then deccided to go on with this project.
The **Shoppingcart 2checkout Dev** Plugin  for [Grav CMS](http://github.com/getgrav/grav) will add 2checkout integration to  [gravcart](https://gravcart.com/)



### Installation

To install this plugin, just download the zip version of this repository and unzip it under `/your/site/grav/user/plugins`. Then, rename the folder to `shoppingcart-2checkout-dev`.

You should now have all the plugin files under

    /your/site/grav/user/plugins/shoppingcart-2checkout-dev
	


### Configuration

Here is the default configuration and an explanation of available options:

```yaml
enabled: true
```
You can choose between sanbox or real 2checkout hosted standard integration within the settings. SID should be adjusted acordinly.

## *Important*
Please read 2checkout documentation at least. You could set up a testing environment on your real seller account; that is not implemented here. Maybe in future versions i'll remove the sandbox feature and will include the testing on the real account; however, I honestly don't see the need at this moment.

**Note**: The plugin ditches some gragcart features (order tracking etc) as 2checkout does provide that functionality. Currently, I implemented a custom return setup that refers to the 2checkout order number which have the following code:

```
## 
### Thank you for choosing us. <br>You will receive an email with your order details shortly.  
---
Order Number:  **{{ uri.query('order_number') }}** Shipping details:

>  **Name**: {{ uri.query('ship_name') }} <br>
> **Address**: {{ uri.query('ship_street_address') }} <br>
>  **City**: {{ uri.query('ship_city') }} <br>
>  **Zip code**: {{ uri.query('ship_zip') }}<br>
 

Feel free to **[contact us](/contact-us)** any time.<br>
We hope to see you again soon.

<script>localStorage.clear();</script>
```
You must add this manualy to your GravCMS install and make sure Direct return Settings in 2checkout are set to ```Header Redirect (Your URL)```.


## Credits
1. *Fernando Castillo* fdocst[@]gmail.com
2. [gravcart](https://gravcart.com/)




