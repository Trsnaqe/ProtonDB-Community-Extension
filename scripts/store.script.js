

// Functions for handling items

window.onload = function () {
  const newItems = getNewItems();

  // Add newly visited items to the set
  newItems.forEach((item) => {
    items.add(item);
  });
};

startObservers();