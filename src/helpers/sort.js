const quick_sort_bids = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    let el = arr.splice(0, 1)[0];
    let less = arr.filter(
      (x) =>
        x.amount < el.amount || (x.amount === el.amount && x.user > el.user)
    );
    let greater = arr.filter(
      (x) =>
        x.amount > el.amount || (x.amount === el.amount && x.user < el.user)
    );
    return [...quick_sort_bids(greater), el, ...quick_sort_bids(less)];
  }
};

module.exports = {
  quick_sort_bids,
};
