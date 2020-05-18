<?php

class BBPLikesRouter extends WP_REST_Controller {

  const NAMESPACE = 'bbp-likes/v1';

  public static function authenticate() {
    return is_user_logged_in();
  }

  public function addIntArg() {
    return [
      'validate_callback' => function($param, $request, $key) {
        return is_numeric($param);
      }
    ];
  }

  public function handleLikeRoute() {
    register_rest_route(
      self::NAMESPACE,
      '/topics/(?P<topic_id>\d+)/replies/(?P<reply_id>\d+)/auth/(?P<auth_id>\d+)/profile/global',
      [
        'methods' => WP_REST_Server::EDITABLE,
        'callback' => 'BBPLikesController::handleLike',
        'permission_callback' => 'BBPLikesRouter::authenticate',
        'args' => [
          'topic_id' => $this->addIntArg(),
          'reply_id' => $this->addIntArg(),
          'auth_id' => $this->addIntArg()
        ]
      ]
    );
  }

  // Use PUT in case query string is too long for GET
  public function getRepliesState() {
    register_rest_route(
      self::NAMESPACE,
      '/state/replies',
      [
        'methods' => WP_REST_Server::EDITABLE,
        'callback' => 'BBPLikesController::getRepliesState',
      ]
    );
  }

  public function getTopicState() {
    register_rest_route(
      self::NAMESPACE,
      '/topics/(?P<topic_id>\d+)/profile/(?P<profile>[\a-zA-Zd]+)',
      [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'BBPLikesController::getTopicState'
      ]
    );
  }

}
