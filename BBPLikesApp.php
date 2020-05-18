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
      $Router = new BBPLikesRouter();
      $Router->handleLikeRoute();
      $Router->getRepliesState();
      $Router->getTopicState();
    });
    add_shortcode('admin_like_notification_list', 'BBPLikesShortcodes::adminNotificationList');
  }

  public function enqueueAssets() {
    wp_enqueue_style('bbpLikes-vendor-fa', 'https://pro.fontawesome.com/releases/v5.12.1/css/all.css');
    wp_enqueue_style('bbpLikes-style-bundle', plugin_dir_url(__FILE__) . 'dist/main.css');
    wp_enqueue_script('bbpLikes-vendor-bundle', plugin_dir_url(__FILE__) . 'dist/1.index.js');
    wp_enqueue_script('bbpLikes-script-bundle', plugin_dir_url(__FILE__) . 'dist/index.js');
    wp_localize_script(
      'bbpLikes-script-bundle',
      '$BBPLikes',
      [
        'authId' => get_current_user_id(),
        'nonce' => wp_create_nonce('wp_rest'),
      ]
    );
  }
}
