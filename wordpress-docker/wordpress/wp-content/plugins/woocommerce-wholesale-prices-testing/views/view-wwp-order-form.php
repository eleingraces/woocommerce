<?php if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$wwof_is_installed = WWP_Helper_Functions::is_wwof_installed() ? ' wwof-installed' : '';
$wwof_is_active    = WWP_Helper_Functions::is_wwof_active() ? ' wwof-active' : '';

$plugin_file = 'woocommerce-wholesale-order-form/woocommerce-wholesale-order-form.bootstrap.php';

?>

<div id="wwp-wholesale-order-form-page" class="wwp-page wrap nosubsub">

    <div class="row-container">
    <img id="wws-logo" src="<?php echo esc_url( WWP_IMAGES_URL ); ?>/logo.png" alt="<?php esc_attr_e( 'Wholesale Suite', 'woocommerce-wholesale-prices-testing' ); ?>" />
    </div>

    <div class="row-container">
    <div class="one-column">

        <div class="page-title"><?php esc_html_e( 'Get More Wholesale Sales With An Optimized Ordering Form', 'woocommerce-wholesale-prices-testing' ); ?></div>

        <p class="page-description">
        <?php
        echo wp_kses_post(
            sprintf(
                // translators: %s <br /> tag.
                __( 'Wholesale Order Form is proven to get more wholesale sales than your normal shop layout.%sGive your wholesale customers searchable access to your entire catalog on one page.', 'woocommerce-wholesale-prices-testing' ),
                '<br />'
            )
        );
        ?>
        </p>

    </div>
    </div>

    <div id="box-row" class="row-container">
    <div class="two-column">
        <img class="box-image" src="<?php echo esc_url( WWP_IMAGES_URL ); ?>/upgrade-page-wwof-box.png" alt="<?php esc_attr_e( 'WooCommerce Wholesale Order Form', 'woocommerce-wholesale-prices-testing' ); ?>" />
    </div>

    <div class="two-column">
        <ul class="reasons-box">
        <li><?php esc_html_e( 'Trusted by over 20,000+ stores', 'woocommerce-wholesale-prices-testing' ); ?></li>
        <li><?php esc_html_e( '5-star customer satisfaction rating', 'woocommerce-wholesale-prices-testing' ); ?></li>
        <li><?php esc_html_e( 'Search entire catalog on one page', 'woocommerce-wholesale-prices-testing' ); ?></li>
        <li><?php esc_html_e( 'Mobile & tablet friendly', 'woocommerce-wholesale-prices-testing' ); ?></li>
        <li><?php esc_html_e( 'Easy product table', 'woocommerce-wholesale-prices-testing' ); ?></li>
        </ul>
    </div>
    </div>

    <div id="step-1" class="row-container step-container<?php echo $wwof_is_installed ? ' grayout' : ''; ?>">
    <div class="two-column">
        <span class="step-number"><?php esc_html_e( '1', 'woocommerce-wholesale-prices-testing' ); ?></span>
    </div>
    <div class="two-column">
        <h3><?php esc_html_e( 'Purchase & Install Wholesale Order Form', 'woocommerce-wholesale-prices-testing' ); ?></h3>
        <p>
        <?php
        esc_html_e(
            'Less "admin busy work" for you and your team and quicker ordering for your customers.
      Get the most efficient one-page WooCommerce order form – your wholesale customers will love it!',
            'woocommerce-wholesale-prices-testing'
        );
?>
</p>

        <p><a class="<?php echo $wwof_is_installed ? 'button-grey' : ' button-green'; ?>" href="<?php echo esc_url( WWP_Helper_Functions::get_utm_url( 'woocommerce-wholesale-order-form', 'wwp', 'upsell', 'wwofpage' ) ); ?>" target="_blank"><?php esc_html_e( 'Get Wholesale Order Form', 'woocommerce-wholesale-prices-testing' ); ?></a></p>
    </div>
    </div>

    <div id="step-2" class="row-container step-container<?php echo ! $wwof_is_installed || $wwof_is_active ? ' grayout' : ''; ?>">
    <div class="two-column">
        <span class="step-number"><?php esc_html_e( '2', 'woocommerce-wholesale-prices-testing' ); ?></span>
    </div>
    <div class="two-column">
        <h3><?php esc_html_e( 'Configure Wholesale Order Form', 'woocommerce-wholesale-prices-testing' ); ?></h3>
        <p><?php esc_html_e( 'Wholesale Order Form is easy to set up and provides your customers with your entire catalog on one page.', 'woocommerce-wholesale-prices-testing' ); ?></p>
        <p><a class="<?php echo ! $wwof_is_installed || $wwof_is_active ? 'button-grey' : ' button-green'; ?>" href="<?php echo esc_url( wp_nonce_url( 'plugins.php?action=activate&amp;plugin=' . $plugin_file . '&amp;plugin_status=all&amp;s', 'activate-plugin_' . $plugin_file ) ); ?>"><?php esc_html_e( 'Activate Plugin', 'woocommerce-wholesale-prices-testing' ); ?></a></p>
    </div>
    </div>
</div>
