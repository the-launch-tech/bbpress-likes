<?php

class BBPLikesApp {

  public static function instance() {
    static $inst = null;
    if ($inst === null) {
      $inst = new BBPLikesApp();
    }
    return $inst;
  }

  public function __construct() {
    add_action('wp_enqueue_scripts', 'BBPLikesApp::enqueueAssets');
    add_action('rest_api_init', function () {
      $Controller = new BBPLikesController();
      $Controller->register_routes();
    });
  }

  public function enqueueAssets() {
    wp_enqueue_style('bbpLikes-style-bundle', plugin_dir_url(__FILE__) . 'dist/main.css');
    wp_enqueue_style('bbpLikes-script-bundle', plugin_dir_url(__FILE__) . 'dist/index.js');
    wp_localize_script(
      'bbpLikes-script-bundle',
      'BbpLikeReply',
      [
        'url' => admin_url( 'admin-ajax.php' ),
        'security' => wp_create_nonce(self::ACTION),
        'action' => self::ACTION,
      ]
    );
  }
}
