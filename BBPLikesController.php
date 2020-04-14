<?php

class BBPLikesController extends WP_REST_Controller {

  public function register_routes() {
    $namespace = 'bbp-likes/v1';
    $path = 'like/reply/(?P<reply_id>\d+)/(?P<user_id>\d+)/(?P<auth_id>\d+)';
    register_rest_route(
      $namespace,
      '/' . $path,
      [
        [
          'methods' => 'PUT',
          'callback' => 'BBPLikesController::update_item',
          'permission_callback' => 'BBPLikesController::get_items_permissions_check'
        ]
      ]
    );
  }

  public function update_item() {
    $args = [
      'category' => $request['category_id']
    ];
    $posts = get_posts($args);
    if (empty($posts)) {
      return new WP_Error( 'empty_category', 'there is no post in this category', array('status' => 404) );
    }
    $response = new WP_REST_Response($posts);
    $response->set_status(200);
    return $response;
  }

  public function get_items_permissions_check() {
    return current_user_can('edit_posts');
  }

}
