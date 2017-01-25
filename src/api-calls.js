import request from 'superagent';

export function getRequest(url, callback) {
  request.get(url, callback)
  .set('Accept', 'application/json');
}

export function postRequest(url, data, callback) {
  request
  .post(url, data, callback)
  .set('Accept', 'application/json');
}

export function deleteRequest(url, data, callback) {
  request
  .delete(url, callback);
}

export function putRequest(url, data, callback) {
  request
  .put(url, data, callback)
  .set('content-type', 'application/x-www-form-urlencoded');
}
