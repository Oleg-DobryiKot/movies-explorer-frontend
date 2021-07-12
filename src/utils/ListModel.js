export default class ListModel {
  viewList;

  _initialList;
  _filteredList;
  _defaultViewListLength;
  _viewListLength;
  _listSortFn;
  _listSearchFn;
  _listFilterFn;
  _handlers = [];

  constructor(list, defaultViewListLength) {
    this._initialList = list;
    this._defaultViewListLength = defaultViewListLength;
    this._viewListLength = defaultViewListLength;

    this._updateViewList();
  }

  get canShowMore() {
    return this.viewList.length !== this._filteredList.length;
  }

  updateInitialList(list) {
    this._initialList = list;
    this._updateViewList();
  }

  showMore(length) {
    this._viewListLength += length;
    this._updateViewList();
  }

  setSortFn(sortFn) {
    this._listSortFn = sortFn;
    this._updateViewList();
  }

  setSearchFn(searchFn) {
    this._listSearchFn = searchFn;
    this._updateViewList();
  }

  setFilterFn(filterFn) {
    this._listFilterFn = filterFn;
    this._updateViewList();
  }

  removeFilterFn(filterFn) {
    this._listFilterFn = this._listFilterFn.filter(fn => fn !== filterFn);
    this._updateViewList();
  }

  getFullList() {
    return this._initialList;
  }

  changeItem(findOldItem, newItem) {
    const oldItemIndex = this._initialList.findIndex(findOldItem);

    this._initialList = [
      ...this._initialList.slice(0, oldItemIndex),
      newItem,
      ...this._initialList.slice(oldItemIndex + 1),
    ];

    this._updateViewList();
  }

  onViewListChange(handler) {
    this._handlers.push(handler);
    return () => {
      this._handlers = this._handlers.filter(fn => fn !== handler);
    };
  }

  _updateViewList() {   
    this._filteredList = this._initialList
      .filter(this._listFilterFn || (() => true))
      .filter(this._listSearchFn || (() => true))
      .sort(this._listSortFn || (() => 0));
    
    this.viewList = this._filteredList.slice(0, this._viewListLength);

    this._handlers.forEach(handler => handler(this.viewList));
  }
};