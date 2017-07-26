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
    
}
