export default class StationFilter {
  constructor({
    search = "",
    id = null,
    station_type_id = null,
    _embed = "",
    _expand = "",
  } = {}) {
    this.search = search;
    this.id = id;
    this.station_type_id = station_type_id;
    this._embed = _embed;
    this._expand = _expand;
  }
}
