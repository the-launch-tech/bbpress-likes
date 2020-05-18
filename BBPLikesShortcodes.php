<?php

class BBPLikesShortcodes {

  public static function adminNotificationList($atts) {
    $notifications = [];

    $authId = get_current_user_id();

    if (!$authId) {
      return '';
    }

    $admin = [];
    foreach (get_users(['role' => 'administrator']) as $user) {
      $admin[$user->ID] = [
        'display_name' => $user->display_name,
        'admin_profile' => site_url() . '/forums/users/' . $user->user_nicename
      ];
    }

    $authPosts = get_posts([
      'author' =>  $authId,
      'orderby' =>  'post_date',
      'order' =>  'ASC',
      'posts_per_page' => -1,
      'post_type' => 'reply'
    ]);

    if (!$authPosts) {
      return '';
    }

    foreach ($authPosts as $post) {
      $likes = [];
      $likeList = get_field('likes', $post->ID);
      if (strlen($likeList) > 0) {
        $likes = array_map('trim', explode(',', $likeList));
      }
      foreach ($likes as $like) {
        if ($admin[$like]) {
          $user = $admin[$like];
          $notifications[] = [
            'ID' => $like,
            'display_name' => $user['display_name'],
            'post_content' => substr($post->post_content, 0, 70) . '...',
            'edit_link' => $post->guid . 'edit',
            'admin_profile' => $user['admin_profile'],
            'post_date' => date('n-j-Y H:m:s a', strtotime($post->post_date)),
            'postId' => $post->ID
          ];
        }
      }
    }

    if (count($notifications) > 0) {
      $html = '';
      $html .= '<div class="bbpl-admin-note-list-wrapper">';
      $html .= '<h6 class="bbpl-admin-note-list-title">Moderator Reply Notifications</h6>';
      $html .= '<div class="bbpl-admin-note-list">';
      foreach ($notifications as $note) {
        $html .= '<div class="bbpl-admin-note-list-item">';
          $html .= '<span class="bbpl-admin-note-list-name">';
            $html .= '<i class="fas fa-comment"></i> <a class="bbpladmin-note-list-profile" href="'.$note['admin_profile'].'" target="_blank">'.$note["display_name"].'</a> liked your reply from '.$note["post_date"].'!';
          $html .= '</span>';
          $html .= '<div class="bbpl-admin-note-list-content">';
            $html .= $note["post_content"].' <a class="bbpl-admin-note-list-edit" href="'.$note["edit_link"].'" target="_blank">Edit Reply</a>';
          $html .= '</div>';
        $html .= '</div>';
      }
      $html .= '</div>';
      $html .= '</div>';
      return $html;
    }

    return '';
  }

}
