/**
 * JSON HTTP Request
 */
export default class JsonRequest {
  /**
   * Constructor
   *
   * @param {String} method
   * @param {String} url
   * @param {Function} success
   * @param {Function} error
   * @param {Object} body
   * @param {Array} headers
   */
  constructor(method, url, success, error, body = null, headers = []) {
    this.method = method;
    this.url = url;
    this.success = success;
    this.error = error;
    this.request = new XMLHttpRequest();

    this.onReadyStateChange = this.onReadyStateChange.bind(this);
    this.onError = this.onError.bind(this);

    this.request.addEventListener('readystatechange', this.onReadyStateChange);
    this.request.addEventListener('error', this.onError);
    this.request.open(this.method, this.url, true);
    headers.forEach(([header, value]) => this.request.setRequestHeader(header, value))
    this.request.send(body ? JSON.stringify(body) : null);
  }

  /**
   * On ready state change
   */
  onReadyStateChange() {
    if (this.request.readyState === 4) {
      if (this.request.status === 200) {
        this.onResponse();
      } else {
        this.onError();
      }
    }
  }

  /**
   * On response
   */
  onResponse() {
    let data;

    try {
      data = JSON.parse(this.request.responseText);
    } catch (error) {
      return this.onError(error);
    }

    return this.onSuccess(data);
  }

  /**
   * On success
   *
   * @param {Object} data
   */
  onSuccess(data) {
    this.clear();
    this.success(data);
  }

  /**
   * On Error
   */
  onError() {
    const message = `Request to "${this.url}" failed with status "${this.request.status}".`;
    this.clear();
    this.error(new Error(message));
  }

  /**
   * Clear the request
   */
  clear() {
    this.request.removeEventListener('readystatechange', this.onReadyStateChange);
    this.request.removeEventListener('error', this.onError);
    this.request = null;
  }
}
