let baseURL = "";
if (process.env.NODE_ENV === "development") {
  // // 设置默认本地开发
  baseURL = "http://139.155.69.214:8083";
  // baseURL = "http://127.0.0.1:8083";
} else {
  baseURL = "http://139.155.69.214:8083";
}

export default baseURL;
