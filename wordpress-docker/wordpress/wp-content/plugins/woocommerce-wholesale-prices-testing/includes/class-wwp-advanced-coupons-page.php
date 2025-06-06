<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WWP_Advanced_Coupons_Page' ) ) {

    /**
     * Model that houses logic related to Marketing > Advanced Coupons Page
     *
     * @since 2.1.1
     */
    class WWP_Advanced_Coupons_Page {

        /**
         * Class Properties
         */

        /**
         * Property that holds the single main instance of WWP_Advanced_Coupons_Page.
         *
         * @since 2.1.1
         * @access private
         * @var WWP_Advanced_Coupons_Page
         */
        private static $_instance;

        /**
         * Class Methods
         */

        /**
         * WWP_Advanced_Coupons_Page constructor.
         *
         * @since 2.1.1
         * @access public
         *
         * @param array $dependencies Array of instance objects of all dependencies of WWP_Advanced_Coupons_Page model.
         */
        public function __construct( $dependencies = array() ) {
            // Nothing to see here yet.
        }

        /**
         * Ensure that only one instance of WWP_Advanced_Coupons_Page is loaded or can be loaded (Singleton Pattern).
         *
         * @since 2.1.1
         * @access public
         *
         * @param array $dependencies Array of instance objects of all dependencies of WWP_Advanced_Coupons_Page model.
         * @return WWP_Advanced_Coupons_Page
         */
        public static function instance( $dependencies = array() ) {
            if ( ! self::$_instance instanceof self ) {
                self::$_instance = new self( $dependencies );
            }

            return self::$_instance;
        }

        /**
         * View for Advanced Coupons page.
         *
         * @since 2.1.1
         * @access public
         */
        public function view_advanced_coupons_page() {
            require_once WWP_VIEWS_PATH . 'view-wwp-advanced-coupons-page.php';
        }

        /**
         * Register new Advanced Coupons page menu
         *
         * @since 2.1.1
         * @access public
         */
        public function register_advanced_coupons_page_menu() {
            // Test if Advanced Coupon plugin is not installed or if it is, check if it's not active.
            if (
                ! WWP_Helper_Functions::is_acfwf_installed() ||
                ( WWP_Helper_Functions::is_acfwf_installed() && ! WWP_Helper_Functions::is_acfwf_active() )
            ) {

                // Check if Advanced Coupons page is already registered.
                if ( ! WWP_Helper_Functions::is_submenu_slug_exists( 'woocommerce-marketing', 'advanced-coupons-marketing' ) ) {
                    add_submenu_page(
                        'woocommerce-marketing',
                        __( 'Advanced Coupons', 'woocommerce-wholesale-prices-testing' ),
                        __( 'Advanced Coupons', 'woocommerce-wholesale-prices-testing' ),
                        'manage_woocommerce',
                        'advanced-coupons-marketing',
                        array( $this, 'view_advanced_coupons_page' ),
                        100
                    );
                }
            }
        }

        /**
         * Integration of WC Navigation Bar.
         *
         * @since 2.1.1
         * @access public
         */
        public function wc_navigation_bar() {
            if ( function_exists( 'wc_admin_connect_page' ) ) {
                wc_admin_connect_page(
                    array(
                        'id'        => 'wwp-advanced-coupons-marketing',
                        'screen_id' => 'wholesale_page_advanced-coupons-marketing',
                        'title'     => __( 'Advanced Coupons', 'woocommerce-wholesale-prices-testing' ),
                    )
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Execute Model
        |--------------------------------------------------------------------------
        */

        /**
         * Execute model.
         *
         * @since 2.1.1
         * @access public
         */
        public function run() {
            // Add a new submenu under the Wholesale menu for Advanced Coupons Page.
            add_action( 'admin_menu', array( $this, 'register_advanced_coupons_page_menu' ), 99 );

            // Add WC navigation bar to page.
            add_action( 'init', array( $this, 'wc_navigation_bar' ) );
        }
    }
}
