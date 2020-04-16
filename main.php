<?php

/**
 * Plugin Name:       BBPress Likes
 * Plugin URI:        https://pennerwebdesign.com
 * Description:       Allows for integrated likes with auth tracking on BBPress replies
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Daniel Griffiths
 * Author URI:        https://pennerwebdesign.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

require_once(plugin_dir_path(__FILE__) . 'BBPLikesController.php');
require_once(plugin_dir_path(__FILE__) . 'BBPLikesRouter.php');
require_once(plugin_dir_path(__FILE__) . 'BBPLikesApp.php');

BBPLikesApp::instance();
