const ORIGINAL_SETTINGS = {
  title: "QUnit Discourse Tests",
  site_logo_url: "/assets/logo.png",
  site_logo_url: "/assets/logo.png",
  site_logo_small_url: "/assets/logo-single.png",
  site_mobile_logo_url: "",
  site_favicon_url: "/images/discourse-logo-sketch-small.png",
  allow_user_locale: false,
  suggested_topics: 7,
  ga_universal_tracking_code: "",
  ga_universal_domain_name: "auto",
  top_menu: "latest|new|unread|categories|top",
  post_menu: "like|share|flag|edit|bookmark|delete|admin|reply",
  post_menu_hidden_items: "flag|bookmark|edit|delete|admin",
  share_links: "twitter|facebook|email",
  allow_username_in_share_links: true,
  category_colors:
    "BF1E2E|F1592A|F7941D|9EB83B|3AB54A|12A89D|25AAE2|0E76BD|652D90|92278F|ED207B|8C6238|231F20|27AA5B|B3B5B4|E45735",
  enable_mobile_theme: true,
  relative_date_duration: 14,
  fixed_category_positions: false,
  enable_badges: true,
  invite_only: false,
  login_required: false,
  must_approve_users: false,
  enable_local_logins: true,
  allow_new_registrations: true,
  enable_google_logins: true,
  enable_google_oauth2_logins: false,
  enable_twitter_logins: true,
  enable_facebook_logins: true,
  enable_github_logins: true,
  enable_discourse_connect: false,
  min_username_length: 3,
  max_username_length: 20,
  min_password_length: 8,
  enable_names: true,
  invites_shown: 30,
  delete_user_max_post_age: 60,
  delete_all_posts_max: 15,
  min_post_length: 20,
  min_personal_message_post_length: 10,
  max_post_length: 32000,
  min_topic_title_length: 15,
  max_topic_title_length: 255,
  min_personal_message_title_length: 2,
  allow_uncategorized_topics: true,
  min_title_similar_length: 10,
  edit_history_visible_to_public: true,
  delete_removed_posts_after: 24,
  traditional_markdown_linebreaks: false,
  suppress_reply_directly_below: true,
  suppress_reply_directly_above: true,
  newuser_max_embedded_media: 0,
  newuser_max_attachments: 0,
  display_name_on_posts: true,
  short_progress_text_threshold: 10000,
  default_code_lang: "auto",
  autohighlight_all_code: false,
  email_in: false,
  authorized_extensions: ".jpg|.jpeg|.png|.gif|.svg|.txt|.ico|.yml",
  authorized_extensions_for_staff: "",
  max_image_width: 690,
  max_image_height: 500,
  allow_profile_backgrounds: true,
  allow_uploaded_avatars: "0",
  tl1_requires_read_posts: 30,
  polling_interval: 3000,
  anon_polling_interval: 30000,
  flush_timings_secs: 5,
  enable_user_directory: true,
  tos_url: "",
  privacy_policy_url: "",
  tos_accept_required: false,
  faq_url: "",
  allow_restore: false,
  maximum_backups: 5,
  version_checks: true,
  suppress_uncategorized_badge: true,
  min_search_term_length: 3,
  topic_views_heat_low: 1000,
  topic_views_heat_medium: 2000,
  topic_views_heat_high: 5000,
  global_notice: "",
  show_create_topics_notice: true,
  available_locales:
    "cs|da|de|en|es|fr|he|id|it|ja|ko|nb_NO|nl|pl_PL|pt|pt_BR|ru|sv|uk|zh_CN|zh_TW",
  highlighted_languages:
    "apache|bash|cs|cpp|css|coffeescript|diff|xml|http|ini|json|java|javascript|makefile|markdown|nginx|objectivec|ruby|perl|php|python|sql|handlebars",
  enable_emoji: true,
  enable_emoji_shortcuts: true,
  emoji_set: "google_classic",
  enable_emoji_shortcuts: true,
  enable_inline_emoji_translation: false,
  desktop_category_page_style: "categories_and_latest_topics",
  enable_mentions: true,
  enable_personal_messages: true,
  personal_message_enabled_groups: "11", // TL1 group
  unicode_usernames: false,
  secure_media: false,
  external_emoji_url: "",
  remove_muted_tags_from_latest: "always",
  enable_group_directory: true,
};

let siteSettings = Object.assign({}, ORIGINAL_SETTINGS);

export function currentSettings() {
  return siteSettings;
}

// In debug mode, Ember will decorate objects with setters that remind you to use
// this.set() because they are bound (even if you use `unbound` or `readonly` in templates!).
// Site settings are only ever changed in tests and these warnings are not wanted, so we'll
// strip them when resetting our settings between tests.
function setValue(k, v) {
  let desc = Object.getOwnPropertyDescriptor(siteSettings, k);
  if (desc && !desc.writable) {
    Object.defineProperty(siteSettings, k, { writable: true });
  }
  siteSettings[k] = v;
}

export function mergeSettings(other) {
  for (let p in other) {
    if (other.hasOwnProperty(p)) {
      setValue(p, other[p]);
    }
  }
  return siteSettings;
}

export function resetSettings() {
  for (let p in siteSettings) {
    if (siteSettings.hasOwnProperty(p)) {
      let v = ORIGINAL_SETTINGS[p];
      typeof v !== "undefined" ? setValue(p, v) : delete siteSettings[p];
    }
  }
  return siteSettings;
}
