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
  "home_page_takeover_sizer",
  "eventbbcodeparser_Link_3I3zk",
  "game_area_dlc_row",
  "broadcast_embeddable_PopOutVideoTitleText_27rIe"
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
  "fullscreen-bg",
  "notice_box_content_blue_box",
  "bundle_contents_preview_position",
  "game_area_purchase_game_dropdown_description",
  "cart_item_img",
  "cart_item_desc",
  "notice_box_content",
  "salepreviewwidgets_PreviewItem_2-qCG",
];

const RelativeClassCheck = ["Focusable","sale_capsule with_microtrailer"];

const ParentRelativeClassCheck = ["salepreviewwidgets_StoreSaleWidgetHalfLeft_2Va3O"];
