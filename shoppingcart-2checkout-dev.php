<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;


/**
 * Class Shoppingcart2checkoutDevPlugin
 * @package Grav\Plugin
 */
class Shoppingcart2checkoutDevPlugin extends Plugin
{
    protected $plugin_name = 'shoppingcart-2checkout-dev';

    protected $gateway;
    
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0]
        ];
    }
    /**
     * Loading assets
     */
    public function onTwigSiteVariables()
    {
        $this->grav['assets']->addJs('https://www.2checkout.com/static/checkout/javascript/direct.min.js');
        $this->grav['assets']->addJs('plugin://' . $this->plugin_name . '/gateway/2checkout/script.js');


    }
    public function mergeShoppingCartPluginConfig()
    {
        $config = $this->config->get('plugins.' . $this->plugin_name);
        unset($config['enabled']);
        $this->config->set('plugins.shoppingcart', array_replace_recursive($this->config->get('plugins.shoppingcart'), $config));
        
        
    }
    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized()
    {

        // Don't proceed if we are in the admin plugin
        if (!$this->isAdmin()) {
           $this->mergeShoppingCartPluginConfig();
        }

        // Enable the main event we are interested in
        $this->enable([
            'onTwigSiteVariables' => ['onTwigSiteVariables', 0],
            'onShoppingCartPay' => ['onShoppingCartPay', 0],
//            'onPageContentRaw' => ['onPageContentRaw', 0],
            
        ]);
    }

    protected function requireGateway()
    {
        $path = realpath(__DIR__ . '/../shoppingcart/classes/gateway.php');
        if (!file_exists($path)) {
            $path = realpath(__DIR__ . '/../grav-plugin-shoppingcart/classes/gateway.php');
        }
        require_once($path);
    }
    
        public function getGateway()
    {
        if (!$this->gateway) {
            $this->requireGateway();
            require_once __DIR__ . '/gateways/2checkout/gateway.php';
            $this->gateway = new ShoppingCart\Gateway2checkout();
        }

        return $this->gateway;
    }
    /**
     * Do some work for this event, full details of events can be found
     * on the learn site: http://learn.getgrav.org/plugins/event-hooks
     *
     * @param Event $e
     */
//    public function onPageContentRaw(Event $e)
//    {
//        // Get a variable from the plugin configuration
//        $text = $this->grav['config']->get('plugins.shoppingcart-2checkout-dev.payment.methods.twocheckout.description');
//
//        // Get the current raw content
//        $content = $e['page']->getRawContent();
//
//        // Prepend the output with the custom text and set back on the page
//        $e['page']->setRawContent($text . "\n\n" . $content);
//    }
}
