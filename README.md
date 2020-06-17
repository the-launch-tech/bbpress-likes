# bbPress Likes for Wordpress

## Features

- Written with Typescript, SCSS, and bundled with Webpack and Babel
- Uses REST API from Wordpress

- Tracks user-likes with user ID
- Beautiful "like" animation with bouncing heart
- No double likes
- No non-logged-in likes
- Tracks total topic likes
- Applies likes to all instances of bbPress topic display
- Includes shortcode to notify user of admin-liked replies

## Installation

- Download .zip archive
- Run `npm run prod` in root to build TS, JS, CSS assets
- Install in Wordpress

## Requirements

*** Not meant for ease of distribution ***

- Advanced Custom Fields
- Create "likes" field on `reply` post type
- Insert field ID in BBPLikesController.php

## Todo

- None, just wanted to save it for later
