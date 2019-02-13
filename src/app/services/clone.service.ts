export class CloneService {
  clone(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
