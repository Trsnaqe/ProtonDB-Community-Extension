// Browser API compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Mutation Observers
const observers = [];

// Shared Sets
const items = new Set();
const processedItems = new Set();

// Shared Colors
const colors = {};

//css classes ought to change time to time, examples given for that to remember them.

//to skip adding anything in parent
const LIST_ITEM_TITLE = "._3rrH9dPdtHVRMzAEw82AId";
const PAGE_TITLE = ".page_title_area.game_title_area.page_content";
const BUNDLE_CONTENTS = ".bundle_contents_preview";
const DLC_LIST = ".game_area_dlc_list";
const HOVER_MODAL = "._2VvFLg2irh9gPAhhxE4Kpo"; //try to find games that are hoverable with purchase option
const MINI_WIDGET_TITLE = "._9VjYX3CYMn2y-wWpAn00Y"; //check event page with stream
const FLOATING_STREAM = "._28O6dX6-Xf37oViWRRhvjz"; //check event page with stream
const PACKAGE_CONTENTS_CAPSULES = ".package_contents_capsules";
const BASE_GAME_OF_DLC = ".glance_details";
const GAME_AREA_DESCRIPTION = ".game_area_description";
const RECOMMENDATION_LINK = ".recommendation_link"; //check franchise page
const VALVE_INDEX = ".valveindex_purchase_grid";
const VALVE_INDEX_ALYX_PROMO = ".hlvr_included_sidebar";
const PURCHASE_NOTE = "#purchase_note"; //they sometimes put game hyperlink, eg: cod hq app
const DISCOVERY_QUEUE = ".discovery_queue_static";
const RECOMMENDED_GAME_REASON = ".home_content_reason"; //check game category
const BREADCRUMBS = "breadcrumbs"; // Skip breadcrumbs navigation - removed dot for class name

//to skip add anything if <a> tag has one of those classes
const RECOMMENDED_GAME_ON_STORE_BUTTON_HOVER = "btnv6_blue_hoverfade";
const RECOMMENDED_GAME_ON_STORE_BUTTON_SMALL = "btn_small_tall";
const SCREENSHOT = "screenshot";
const SIMILIAR_APP = "similarapp"; //check game page when logged in and find similiar to games you have played
const BUNDLE_ITEM = "bundle_contents_preview_item";

//Relative Classes
const PACKAGE_ITEM = ".bundle_package_item";
const STORE_SALE_WIDGET_MINI = ".StoreSaleWidgetContainer_mini";
const LARGE_GAME_ITEM = "._3DkfNrtTOLjNYd3yZliMzy"; //check ea play for this class
const IMPRESSION_TRACKED_ELEMENT = ".ImpressionTrackedElement"; //login and go category page

//banner game;
//21/07/2024
//we only need title for icon for aesthetic purposes but no icon on game cover art
const BANNER_GAME_TITLE = "_26-ICqi8UhxutiYJyQ7jw"; //check game category, prevent adding icons on game title on the right side
const BANNER_GAME_COVER_ART = "_3htJKARnLcsZPlG3Sqlvkg"; //check game category, prevent adding icons on game cover art

//skip adding icons
const HOVER_MODEL_BOTTOM_SECTION = "Xwe3c0LwQGRjmLBfrpFu6"; // hoverable games with purchase option

const ClassNamesToCheck = [
    RECOMMENDED_GAME_ON_STORE_BUTTON_HOVER,
    RECOMMENDED_GAME_ON_STORE_BUTTON_SMALL,
    SCREENSHOT,
    SIMILIAR_APP,
    BUNDLE_ITEM,
    BREADCRUMBS  // Add breadcrumbs to direct class check
];

const ClassNamesToCheckInParent = [
    LIST_ITEM_TITLE,
    PAGE_TITLE,
    BUNDLE_CONTENTS,
    DLC_LIST,
    HOVER_MODAL,
    MINI_WIDGET_TITLE,
    FLOATING_STREAM,
    PACKAGE_CONTENTS_CAPSULES,
    BASE_GAME_OF_DLC,
    GAME_AREA_DESCRIPTION,
    RECOMMENDATION_LINK,
    VALVE_INDEX,
    VALVE_INDEX_ALYX_PROMO,
    PURCHASE_NOTE,
    DISCOVERY_QUEUE,
    RECOMMENDED_GAME_REASON,
    BREADCRUMBS  // Add breadcrumbs to parent check
];

const shouldSkipAddingLineGlobals = {
    specificClassesToCheck: [BANNER_GAME_TITLE],
    specificClassesToCheckInParent: [],
};

const shouldSkipAddingIconGlobals = {
    specificClassesToCheck: [BANNER_GAME_COVER_ART, HOVER_MODEL_BOTTOM_SECTION],
    specificClassesToCheckInParent: [],
};

const RelativeClassCheck = [];

const ParentRelativeClassCheck = [
    PACKAGE_ITEM,
    STORE_SALE_WIDGET_MINI,
    LARGE_GAME_ITEM,
    IMPRESSION_TRACKED_ELEMENT,
];
