const { quick_sort_bids } = require("./sort");

exports.GSP = (bids, itemsNumber) => {
  // base cases
  if (
    !bids ||
    !itemsNumber ||
    bids.length === 0 ||
    bids.length <= itemsNumber
  ) {
    return "No Winners";
  }

  /** NOTE:
   *    when bids come from db it will be sorted by default with amount first and username
   *    right now we 'll pass them to a sorting function to make sure they are sorted.
   *  */
  const sortedBids = quick_sort_bids(bids);

  // GSP
  const results = sortedBids.map((bid, i) => {
    if (itemsNumber > 0) {
      // set next amount
      bid.amount = sortedBids[i + 1].amount;
      itemsNumber--;
    } else {
      bid.amount = "Lost the auction";
    }

    return bid;
  });

  return results;
};
