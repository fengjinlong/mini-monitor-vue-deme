import request from "./index";
import URl from "./env";
// post
export function add(data) {
  const blob = new Blob([JSON.stringify(data)], {
    type: "application/x-www-form-urlencoded",
  });
  // navigator.sendBeacon("http://127.0.0.1:8083/add1", blob);
  navigator.sendBeacon("http://139.155.69.214:8083/add1", blob);
}
// get
export function findAll(params) {
  return request({
    url: "/findAll",
    method: "GET",
    params,
  });
}
export function getIndicators(params) {
  return request({
    url: "/getIndicators",
    method: "GET",
    params,
  });
}
export function del(params) {
  return request({
    url: "/delAll",
    method: "GET",
    params,
  });
}
