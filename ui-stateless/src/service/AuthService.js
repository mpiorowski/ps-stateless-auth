import {API_BASE_URL} from "../config/config";
import {request} from "./request";

export function serviceGetUser() {
  return request({
    url: API_BASE_URL + "/auth/user",
    method: "GET"
  })
}

export function serviceLogIn(values) {
  return request({
    url: API_BASE_URL + "/auth/log",
    method: "POST",
    body: JSON.stringify(values)
  });
}