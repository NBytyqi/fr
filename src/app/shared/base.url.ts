// STATIC API AND BASE URL STRINGS
export class DataURLS {

  private static _BASE_URL: string;
  public static get BASE_URL() {
    if (!this._BASE_URL) {
      return window.location.origin; // defulat to windows address
    }
    return this._BASE_URL;
  }
  public static set BASE_URL(val) {
    this._BASE_URL = val;
  }

  private static _API_VERSION: string;
  public static get API_VERSION() {
    if (!this._API_VERSION) {
      this._API_VERSION = 'api/1.0';
    }
    return this._API_VERSION;
  }
  public static set API_VERSION(val) {
    this._API_VERSION = val;
  }
}
