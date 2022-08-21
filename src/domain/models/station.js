import StationType from '@/domain/models/stationType';

export default class Station {
  constructor({
    id = "",
    creat_at = "",
    update_At = "",
    name = "",
    latitude = "",
    longitude = "",
    elevation_meters = "",
    operation_start_date = "",
    operation_end_date = "",
    station_type_id = "",
    station_type = new StationType()
  } = {}) {
    this.id = id;
    this.creat_at = creat_at;
    this.update_At = update_At;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.elevation_meters = elevation_meters;
    this.operation_start_date = operation_start_date;
    this.operation_end_date = operation_end_date;
    this.station_type_id = station_type_id;
    this.station_type = station_type
  }

  create(json = null) {
    const model = Station.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    let model = new Station(json);

    model.id = json["id"] ? parseInt(json["id"]) : "";
    model.creat_at = json["creat_at"] ? json["creat_at"] : "";
    model.update_At = json["update_At"] ? json["update_At"] : "";
    model.name = json["name"] ? json["name"] : "";
    model.latitude = json["latitude"] ? json["latitude"] : "";
    model.longitude = json["longitude"] ? json["longitude"] : "";
    model.elevation_meters = json["elevation_meters"] ? json["elevation_meters"] : "";
    model.operation_start_date = json["operation_start_date"] ? json["operation_start_date"] : "";
    model.operation_end_date = json["operation_end_date"] ? json["operation_end_date"] : "";
    model.station_type_id = json["station_type_id"] ? parseInt(json["station_type_id"]) : "";
    model.station_type = json["station_type"] ? StationType.fromJson(json["station_type"]) : "";

    return model;
  }
}
