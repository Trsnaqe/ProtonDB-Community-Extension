const newItems = getNewItems();
if (newItems.length > 0) {
  newItems.forEach((item) => {
    addElementsToItems(item);
  });
}
startObservers();
