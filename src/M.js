let id = 0;
const M = {
  install: function (Vue) {
    // 捕获 异步 错误
    window.onerror = function (msg, url, row, col, error) {
      console.log("w2", typeof url);
      let path = url.replace(/(\.)|(=)/g, "-");
      let e = {
        id: ++id,
        type: "异步报错",
        href: location.href,
        msg: error.toString(),
        path,
      };
      console.log("e", e);
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
      // console.log(err.toString());
      // console.log(vm);
      // console.log(info);
      // console.log("ee", e);
      // {info: 'setup function',href, msg: 'ReferenceError: err is not defined'}

      // 错误信息
      // const data = {
      //   message: err.message,
      //   stack: err.stack,
      //   info,
      //   href: location.href
      // }
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
      // console.log(event);
      // console.info(`UNHANDLED PROMISE REJECTION: ${event.reason.name}`);
      // console.log("pr", JSON.stringify(event));
      // for (let o in event.reason) {
      //   console.log("o", o);
      // }
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
const idsPoll = [];
function add(data) {
  // let id = data.id;
  console.log("go", data);
  if (!data.id) return;
  // if (idsPoll.includes(id)) {
  //   return;
  // } else {
  // idsPoll.push(id);
  const blob = new Blob([JSON.stringify(data)], {
    // const blob = new Blob([JSON.stringify(data)], {
    type: "application/x-www-form-urlencoded",
  });
  navigator.sendBeacon("http://139.155.69.214:8083/add1", blob);
  // navigator.sendBeacon("http://127.0.0.1:8083/add1", blob);
  // }
}
export { M };
export default M;

/**
 * img 404 fetch 发送邮件
 * native event handler
 * promise reject
 * setup function
 * AxiosError
 */
