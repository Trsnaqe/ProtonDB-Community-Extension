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
  "broadcast_embeddable_PopOutVideoTitleText_27rIe",
  "curator_details",
  "dlcforyou_BaseGameCapsuleCtn_2-6Wb",
  "recommendation_link",
  "discovery_queue_overlay",
  "_3I3zkiwF6M2eVvWVHFacVj Link",
  "hardware_steamdeck_banner ds_no_flags",
  "top_promo ds_no_flags",
];

const ClassNamesToCheckInParent = [
  ".valveindex_purchase_grid",
  ".valveindex_purchase_option",
  "#devnotes_expander",
  "._27rIe5WB38Vl9FriykIcGw",
  ".gutter_item",
  ".vertical-line",
  ".home_content_reason",
  ".blockbg",
  ".package_contents",
  ".steamdb_prices",
  ".glance_details",
  ".gameDlcBlocks",
  ".itad-pricing",
  ".discoveryqueuewizard_QueueButton_19cHb",
  ".game_area_description",
  ".similar_recent_apps_container",
  ".gamehover_TextContent_2ghgg",
  ".gameslistitems_GameNameContainer_w6q9p",
  ".blotter_gamepurchase_details",
  ".greenenvelope_NotificationsMenuEntriesContainer_1UQTO",
  ".fullscreen-bg",
  ".notice_box_content_blue_box",
  ".bundle_contents_preview_position",
  ".game_area_purchase_game_dropdown_description",
  ".cart_item_img",
  ".cart_item_desc",
  ".notice_box_content",
  ".salepreviewwidgets_PreviewItem_2-qCG",
  ".dlcforyou_BaseGameCapsuleCtn_2-6Wb",
  ".salelabels_SectionTitleInnerCtn_2R3H5",
];

const shouldSkipAddingLineGlobals = {
  specificClassesToCheck: [
    "btn_blue_steamui btn_medium noicon",
    "title",
    "animated_featured_capsule_Title_3vZJE",
  ],
  specificClassesToCheckInParent: [
    "._1F4bcsKc9FjeWQ2TX8CWDe",
    ".salepreviewwidgets_TitleCtn_1F4bc",
    ".pageheader.curator_name",
  ],
};

const shouldSkipAddingIconGlobals = {
  specificClassesToCheck: [
    "btn_blue_steamui btn_medium noicon",
    "title",
    "animated_featured_capsule_Title_3vZJE",
  ],
  specificClassesToCheckInParent: [
    //".wishlist_row .capsule",
    "._2ghggL_JRFiWirIPJQaknp",
    "._2tBkjMIp5TeR9aXdd_Kj_",
    "._2Va3O50Z5ksJJcpvj-JFDI",
    ".salepreviewwidgets_TitleCtn_1F4bc",
    ".pageheader.curator_name",
    ".slideInner___2mfX9"
  ],
};

const RelativeClassCheck = [".Focusable", ".sale_capsule with_microtrailer"];

const ParentRelativeClassCheck = [
  "._2Va3O50Z5ksJJcpvj-JFDI",
  ".salepreviewwidgets_StoreSaleWidgetHalfLeft_2Va3O",
  ".salepreviewwidgets_StoreSaleWidgetLibraryAssetExtendedTop_3z02e",
];
