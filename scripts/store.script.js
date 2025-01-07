// Initialize colors
setColors();

const newItems = getNewItems();
if (newItems.length > 0) {
    newItems.forEach((item) => {
        if (!items.has(item) && 
            !hasAnyClass(item, ClassNamesToCheck) && 
            !hasAnyParentClass(item, ClassNamesToCheckInParent)) {
            addElementsToItems(item);
        }
    });
}

// Start the observers from utils/observers.js
startObservers();
