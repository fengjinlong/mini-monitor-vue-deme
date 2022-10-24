import FT from "fmp-tti";
let id = 0;
let URL = "http://139.155.69.214:8083";
// let URL = "http://127.0.0.1:8083";
const minimonitornpm = {
  install: function (Vue) {
    const indicators = {};
    let {
      domainLookupEnd,
      domainLookupStart,
      connectEnd,
      connectStart,
      requestStart,
      responseEnd,
      responseStart,
      navigationStart,
      loadEventStart,
      loadEventEnd,
    } = performance.timing;
    indicators.dns = domainLookupEnd - domainLookupStart;
    indicators.tcp = connectEnd - connectStart;
    indicators.requestPending = responseStart - requestStart;
    indicators.documentDown = responseEnd - responseStart;
    indicators.onload = loadEventEnd - loadEventStart;
    indicators.whiteScreen = responseStart - navigationStart;
    indicators.jsmemoey =
      Math.floor(
        (performance.memory.usedJSHeapSize /
          performance.memory.totalJSHeapSize) *
          1000
      ) /
        10 +
      "%";
    // console.log("dns 解析时间", domainLookupEnd - domainLookupStart);
    // console.log("TCP建立连接时间", connectEnd - connectStart);
    // console.log("请求等待时间", responseStart - requestStart);
    // console.log("文档下载时间", responseEnd - responseStart);
    // console.log(
    //   "onload页面加载完成时间（所有的资源都解析完了）",
    //   loadEventEnd - loadEventStart
    // );
    // console.log("页面白屏时间", responseStart - navigationStart);
    // console.log(
    //   "js内存使用占比",
    //   (
    //     performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize
    //   ).toFixed(4) *
    //     100 +
    //     "%"
    // );

    FT.then(({ fcp, fmp, tti }) => {
      indicators.fcp = fcp;
      indicators.fmp = fmp;
      indicators.tti = tti;
      // console.log("首次内容绘制（FCP） - %dms", fcp);
      // console.log("首次有意义绘制（FMP） - %dms", fmp);
      // console.log("可交互时间（TTI） - %dms", tti);
      const syncRequest = (url, data = {}) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(data));
      };
      syncRequest(URL + "/saveIndicators", indicators);
    });

    // 捕获 异步 错误
    window.onerror = function (msg, url, row, col, error) {
      // console.log(msg, url, row, col, error);
      // var reportMsg = {
      //   msg: msg,
      //   url: url,
      //   row,
      //   col,
      // }; // 错误信息
      // report(reportMsg);
      // console.log("w2", typeof url);
      let path = url.replace(/(\.)|(=)/g, "-");
      let e = {
        id: ++id,
        type: "异步报错",
        href: location.href,
        msg: error.toString(),
        path,
      };
      add(e);
      return true;
    };
    Vue.config.errorHandler = function (err, vm, info) {
      let e = {
        id: ++id,
        type: info,
        href: location.href,
        msg: err.toString(),
      };
      add(e);
      // {info: 'setup function',href, msg: 'ReferenceError: err is not defined'}
    };

    // 专门 捕获404 捕获404  但不能去掉红色  报警处理
    window.addEventListener(
      "error",
      (msg, url, row, col, error) => {
        // console.log(msg, url, row, col, error);
        let e = {};

        if (msg) {
          switch (msg.target.tagName) {
            case "IMG":
              e = {
                id: ++id,
                type: "img",
                sendEmail: true,
                href: location.href,
                msg: "图片加载错误 可能是 src 找不到",
              };
              break;

            default:
              break;
          }
        }
        add(e);
      },
      true
    );
    // promise reject
    window.addEventListener("unhandledrejection", (event) => {
      let e = {};
      if (event) {
        switch (event.reason.name) {
          case "AxiosError":
            e = {
              id: ++id,
              type: "AxiosError",
              href: location.href,
              msg: event.reason.message,
            };
            break;

          default:
            e = {
              id: ++id,
              type: "promise reject",
              href: location.href,
              msg: "Promise 出现 reject",
            };
            break;
        }

        e.id && add(e);
      }

      event.preventDefault();
    });
  },
};

function add(data) {
  if (!data.id) return;

  const blob = new Blob([JSON.stringify(data)], {
    type: "application/x-www-form-urlencoded",
  });
  navigator.sendBeacon(URL + "/add1", blob);
}

// function report(paramObj, level) {
//   let paramArray = [],
//     paramString = "";
//   for (let key in paramObj) {
//     paramArray.push(key + "=" + encodeURIComponent(paramObj[key]));
//   }

//   const syncRequest = (url, data = {}) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", url, false);
//     xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
//     xhr.send(JSON.stringify(data));
//   };
//   syncRequest(URL + "/report", paramObj);
// }
export { minimonitornpm };
// export { ERROR };
export default minimonitornpm;

/**
 * img 404 fetch 发送邮件
 * native event handler
 * promise reject
 * setup function
 * AxiosError
 */
