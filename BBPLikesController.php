<?php

class BBPLikesController extends WP_REST_Controller {

  public function handleLike($request) {
    $replyId = $request['reply_id'];
    $authId = $request['auth_id'];

    $likes = [];
    $likeList = get_field('likes', $replyId);

    if (strlen($likeList) > 0) {
      $likes = array_map('trim', explode(',', $likeList));
    }

    if (in_array($authId, $likes)) {
      $index = array_search($authId, $likes);
      array_splice($likes, $index, 1);
      $authLiked = 0;
    } else {
      $likes[] = $authId;
      $authLiked = 1;
    }

    $currentLikes = count($likes);

    update_field('field_5e97053777c1e', implode(',', $likes), $replyId);

    $response = new WP_REST_Response([
      'authLiked' => $authLiked,
      'currentLikes' => $currentLikes
    ]);

    $response->set_status(200);

    return $response;
  }

  public function getInitialState($request) {
    $topicId = $request['topic_id'];
    $nicename = $request['nicename'];
    $authId = $request['auth_id'];
    $returnArr = [];

    $args = [
      'post_type' => 'reply',
      'posts_per_page' => -1,
      'fields' => 'ids'
    ];

    if (((int)$topicId === 0 || $topicId === '0') && $nicename) {
      $user = get_user_by('login', $nicename);
      $args['author'] = $user->ID;
    } else if ((int)$topicId > 0) {
      $args['meta_key'] = '_bbp_topic_id';
      $args['meta_value'] = (int)$topicId;
    }

    $replies = get_posts($args);

    if (!$replies) {
      return new WP_Error('no_reply', 'Unable to get replies', ['status' => 500]);
    }

    foreach ($replies as $id) {
      $likes = [];
      $likeList = get_field('likes', $id);
      if (strlen($likeList) > 0) {
        $likes = array_map('trim', explode(',', $likeList));
      }
      $returnArr[] = [
        'currentLikes' => count($likes),
        'authLiked' => in_array($authId, $likes),
        'replyId' => $id
      ];
    }

    $response = new WP_REST_Response([
      'replies' => $returnArr
    ]);

    $response->set_status(200);

    return $response;

  }

}
