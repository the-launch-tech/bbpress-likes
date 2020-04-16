<?php

class BBPLikesApp {

  const BBPRESS_WRAPPER = '#bbpress-forums';
  const BBPRESS_TOPIC_ID_GETTER = '.forums.bbp-replies';
  const BBPRESS_HEADER = '.bbp-reply-header';
  const BBPRESS_META = '.bbp-meta';
  const BBPRESS_LIKE = '.bbp-reply-like';

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
      $Router->getInitialStateRoute();
    });
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
        'baseUrl' => get_site_url(),
        'authId' => get_current_user_id(),
        'nonce' => wp_create_nonce('wp_rest'),
        'dom' => [
          'forumWrapperEl' => self::BBPRESS_WRAPPER,
          'topicIdEl' => self::BBPRESS_TOPIC_ID_GETTER,
          'replyHeaderEl' => self::BBPRESS_HEADER,
          'replyHeaderMetaEl' => self::BBPRESS_META,
          'appendedReplyLikeEl' => self::BBPRESS_LIKE,
        ]
      ]
    );
  }
}
