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

    update_field('field_5e9593addd992', implode(',', $likes), $replyId);

    $response = new WP_REST_Response([
      'authLiked' => $authLiked,
      'currentLikes' => $currentLikes,
    ]);

    $response->set_status(200);

    return $response;
  }

  public static function getRepliesState($request) {
    $topicId = $request['topic_id'];
    $authId = $request['auth_id'];
    $replies = $request['replies'];
    $totalLikes = 0;
    $repliesState = [];

    foreach ($replies as $id) {
      $likes = [];
      $likeList = get_field('likes', $id);
      if (strlen($likeList) > 0) {
        $likes = array_map('trim', explode(',', $likeList));
      }
      $repliesState["reply-{$id}"] = [
        'currentLikes' => count($likes),
        'authLiked' => in_array($authId, $likes),
        'replyId' => $id
      ];
    }

    $response = new WP_REST_Response($repliesState);

    $response->set_status(200);

    return $response;
  }

  public static function getTopicState($request) {
    $totalLikes = 0;
    $topicId = $request['topic_id'];
    $profile = $request['profile'];

    $query = [
      'post_type' => 'reply',
      'posts_per_page' => -1,
      'post_status' => 'publish',
      'fields' => 'ids',
    ];

    if ($user = get_user_by('login', $profile)) {
      $query['author_name'] = $profile;
    } else {
      $query['meta_key'] = '_bbp_topic_id';
      $query['meta_value'] = $topicId;
    }

    if ($replies = get_posts($query)) {
      foreach ($replies as $id) {
        $likeList = get_field('likes', $id);
        if (strlen($likeList) > 0) {
          $likes = array_map('trim', explode(',', $likeList));
          $totalLikes += count($likes);
        }
      }
    }

    $response = new WP_REST_Response($totalLikes);

    $response->set_status(200);

    return $response;
  }

}
