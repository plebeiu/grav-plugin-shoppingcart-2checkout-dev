
# Shoppingcart 2checkout Dev Plugin

I wanted/needed 2checkout integration to gravcart... read a bunch of stuff... then deccided to go on with this project.
The **Shoppingcart 2checkout Dev** Plugin  for [Grav CMS](http://github.com/getgrav/grav) will add 2checkout integration to  [gravcart](https://gravcart.com/)




### Installation

To install this plugin, just download the zip version of this repository and unzip it under `/your/site/grav/user/plugins`. Then, rename the folder to `shoppingcart-2checkout-dev`.

You should now have all the plugin files under

    /your/site/grav/user/plugins/shoppingcart-2checkout-dev
	


### Configuration

Before configuring this plugin, you should copy the `user/plugins/shoppingcart-2checkout-dev/shoppingcart-2checkout-dev.yaml` to `user/config/plugins/shoppingcart-2checkout-dev.yaml` and only edit that copy.

Here is the default configuration and an explanation of available options:

```yaml
enabled: true
```
You can choose between sanbox or real 2checkout hosted standard integration within the settings. SID should be adjusted acordinly.

## *Important*
Please read 2checkout documentation at least. You could set up a testing environment on your real seller account; that is not implemented here. Maybe in future versions i'll remove the sandbox feature and will include the testing on the real account; however, I honestly don't see the need at this moment.


## Credits
1. *Fernando Castillo* fdocst[@]gmail.com
2. [gravcart](https://gravcart.com/)




