export default class StationType {
  constructor({
    id = "",
    created_at = "",
    update_at = "",
    name = "",
    color = ""
  } = {}) {
    this.id = id;
    this.created_at = created_at;
    this.update_at = update_at;
    this.name = name;
    this.color = color;
  }

  create(json = null) {
    const model = StationType.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    let model = new StationType(json);

    model.id = json["id"] ? parseInt(json["id"]) : "";
    model.created_at = json["created_at"] ? json["created_at"] : "";
    model.update_at = json["update_at"] ? json["update_at"] : "";
    model.name = json["name"] ? json["name"] : "";
    model.color = json["color"] ? json["color"] : "";
    
    return model;
  }
}
