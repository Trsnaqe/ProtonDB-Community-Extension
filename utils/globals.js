// Mutation Observers
const observers = [];

const items = new Set();
const colors = {};

const ClassNamesToCheck = [
  "btnv6_blue_hoverfade",
  "btn_small_tall",
  "screenshot",
  "gamehover_Midline_FsH84",
  "discovery_queue_overlay",
  "home_page_takeover_sizer"
];

const ClassNamesToCheckInParent = [
  ...ClassNamesToCheck,
  "gutter_item",
  "vertical-line",
  "home_content_reason",
  "salepreviewwidgets_TitleCtn_1F4bc",
  "blockbg",
  "package_contents",
  "steamdb_prices",
  "glance_details",
  "gameDlcBlocks",
  "itad-pricing",
  "game_area_description",
  "similar_recent_apps_container",
  "gamehover_TextContent_2ghgg",
  "gameslistitems_GameNameContainer_w6q9p",
  "blotter_gamepurchase_details",
  "greenenvelope_NotificationsMenuEntriesContainer_1UQTO",
  "salepreviewwidgets_StoreSaleWidgetHalfLeft_2Va3O",
  "fullscreen-bg"
];

const RelativeClassCheck = ["Focusable"];
