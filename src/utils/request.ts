/**
 * @author heart
 * @description 网络请求接口
 * @Date 2022-07-01
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 * @see https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
 */

import { objectToParams } from "./shard";
import type { BaseResponse } from "./baseResponse";
enum requestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
const successCode = [200, 0];
type params = Record<string, any>;
type postType =
  | "application/x-www-form-urlencoded"
  | "application/json"
  | "multipart/form-data";
// type requestBodyType = ArrayBuffer | Blob | FormData | string | Record<string, any>
const urlArray = ["http://localhost:3363/"];
const baseUrl = urlArray[0];

function isSpecifyResponseType(contentType: string, reg: RegExp): boolean {
  return reg.test(contentType);
}
// TODO: Blob ArrayBuffer formData 的判断
// function isResponseText(contentType: string): boolean {
//   return isSpecifyResponseType(contentType, /text\/html/)
// }

function isResponseJson(contentType: string): boolean {
  return isSpecifyResponseType(contentType, /application\/json/);
}

function requestInterface(data: RequestInit) {
  const token = localStorage.getItem("token");
  if (token) {
    !data.headers && (data.headers = {});
    Reflect.set(data.headers, "TOKEN", token);
  }
}

function request<T>(
  url = "",
  data: RequestInit = { method: "GET" }
): Promise<BaseResponse<T>> {
  const pathUrl = baseUrl + url;
  // 请求拦截
  requestInterface(data);
  return new Promise((resolve, reject) => {
    fetch(pathUrl, data)
      .then((response) => {
        const ContentType = response.headers.get("content-type") || "";
        if (isResponseJson(ContentType)) {
          return response.json();
        }
        return response.text();
      })
      .then((jsonData) => {
        // 全局状态判断
        try {
          const val: BaseResponse<T> = jsonData;
          // 判断状态码
          if (successCode.includes(Number(val.code))) {
            resolve(val);
          } else {
            // 失败之后的判断等
            if (val.code === 401) {
              window.localStorage.removeItem("token");
              // history.push('/login');
              return;
            }
            return reject(val);
          }
        } catch (e) {
          // string
          console.log(pathUrl, jsonData, e);
          resolve(jsonData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

function requestMethod<T>(
  url: string,
  type: requestType,
  requestInit: RequestInit
): Promise<BaseResponse<T>> {
  return request(url, Object.assign({ method: type }, requestInit));
}

export function Get<T = undefined, U extends params = params>(
  url: string,
  params?: U,
  requestInit: RequestInit = {}
): Promise<BaseResponse<T>> {
  let enCodeParams = objectToParams(params);
  enCodeParams = enCodeParams.trim() !== "" ? `?${enCodeParams}` : "";
  const fullPath = url + enCodeParams;
  return requestMethod(fullPath, requestType.GET, requestInit);
}

function postRequest<T>(
  url: string,
  requestInit: RequestInit = {},
  ContentType?: postType
): Promise<BaseResponse<T>> {
  requestInit.headers = Object.assign({}, requestInit.headers || {}, {
    "Content-Type": ContentType,
  });
  return request(url, Object.assign({ method: requestType.POST }, requestInit));
}

export function Post<T = undefined, U extends params = params>(
  url: string,
  params?: U,
  requestInit: RequestInit = {}
): Promise<BaseResponse<T>> {
  try {
    requestInit.body = JSON.stringify(params);
  } catch (err) {
    console.log("Post params error:", err);
  }
  return postRequest(url, requestInit, "application/json");
}

export function FormDataPost<T>(
  url: string,
  params?: params,
  requestInit: RequestInit = {}
): Promise<BaseResponse<T>> {
  // formData形式
  return postRequest(url, requestInit, "application/x-www-form-urlencoded");
}
export function MultiPost<T>(
  url: string,
  params?: params,
  requestInit: RequestInit = {}
): Promise<BaseResponse<T>> {
  // new FormData形式
  return postRequest(url, requestInit, "multipart/form-data");
}
