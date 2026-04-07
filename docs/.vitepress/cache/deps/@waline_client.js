import {
  Fragment,
  computed,
  createApp,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  isRef,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  resolveComponent,
  shallowReadonly,
  shallowRef,
  toDisplayString,
  toRef,
  toValue,
  unref,
  useTemplateRef,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withDirectives
} from "./chunk-IOEMVRGB.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/.pnpm/recaptcha-v3@1.11.3/node_modules/recaptcha-v3/dist/ReCaptchaInstance.js
var require_ReCaptchaInstance = __commonJS({
  "node_modules/.pnpm/recaptcha-v3@1.11.3/node_modules/recaptcha-v3/dist/ReCaptchaInstance.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve) {
          resolve(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _2 = { label: 0, sent: function() {
        if (t2[0] & 1) throw t2[1];
        return t2[1];
      }, trys: [], ops: [] }, f2, y3, t2, g2;
      return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
        return this;
      }), g2;
      function verb(n2) {
        return function(v3) {
          return step([n2, v3]);
        };
      }
      function step(op) {
        if (f2) throw new TypeError("Generator is already executing.");
        while (g2 && (g2 = 0, op[0] && (_2 = 0)), _2) try {
          if (f2 = 1, y3 && (t2 = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t2 = y3["return"]) && t2.call(y3), 0) : y3.next) && !(t2 = t2.call(y3, op[1])).done) return t2;
          if (y3 = 0, t2) op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _2.label++;
              return { value: op[1], done: false };
            case 5:
              _2.label++;
              y3 = op[1];
              op = [0];
              continue;
            case 7:
              op = _2.ops.pop();
              _2.trys.pop();
              continue;
            default:
              if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _2.label = op[1];
                break;
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2];
                _2.ops.push(op);
                break;
              }
              if (t2[2]) _2.ops.pop();
              _2.trys.pop();
              continue;
          }
          op = body.call(thisArg, _2);
        } catch (e2) {
          op = [6, e2];
          y3 = 0;
        } finally {
          f2 = t2 = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = void 0;
    var ReCaptchaInstance = function() {
      function ReCaptchaInstance2(siteKey, recaptchaID, recaptcha) {
        this.siteKey = siteKey;
        this.recaptchaID = recaptchaID;
        this.recaptcha = recaptcha;
        this.styleContainer = null;
      }
      ReCaptchaInstance2.prototype.execute = function(action) {
        return __awaiter(this, void 0, void 0, function() {
          var _a3;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                if (!this.recaptcha.enterprise) return [3, 2];
                return [4, this.recaptcha.enterprise.execute(this.recaptchaID, { action })];
              case 1:
                _a3 = _b.sent();
                return [3, 4];
              case 2:
                return [4, this.recaptcha.execute(this.recaptchaID, { action })];
              case 3:
                _a3 = _b.sent();
                _b.label = 4;
              case 4:
                return [2, _a3];
            }
          });
        });
      };
      ReCaptchaInstance2.prototype.getSiteKey = function() {
        return this.siteKey;
      };
      ReCaptchaInstance2.prototype.hideBadge = function() {
        if (this.styleContainer !== null) {
          return;
        }
        this.styleContainer = document.createElement("style");
        this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}";
        document.head.appendChild(this.styleContainer);
      };
      ReCaptchaInstance2.prototype.showBadge = function() {
        if (this.styleContainer === null) {
          return;
        }
        document.head.removeChild(this.styleContainer);
        this.styleContainer = null;
      };
      return ReCaptchaInstance2;
    }();
    exports.ReCaptchaInstance = ReCaptchaInstance;
  }
});

// node_modules/.pnpm/recaptcha-v3@1.11.3/node_modules/recaptcha-v3/dist/ReCaptchaLoader.js
var require_ReCaptchaLoader = __commonJS({
  "node_modules/.pnpm/recaptcha-v3@1.11.3/node_modules/recaptcha-v3/dist/ReCaptchaLoader.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t2) {
        for (var s, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
          s = arguments[i2];
          for (var p2 in s) if (Object.prototype.hasOwnProperty.call(s, p2))
            t2[p2] = s[p2];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInstance = exports.load = void 0;
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    var ELoadingState;
    (function(ELoadingState2) {
      ELoadingState2[ELoadingState2["NOT_LOADED"] = 0] = "NOT_LOADED";
      ELoadingState2[ELoadingState2["LOADING"] = 1] = "LOADING";
      ELoadingState2[ELoadingState2["LOADED"] = 2] = "LOADED";
    })(ELoadingState || (ELoadingState = {}));
    var ReCaptchaLoader = function() {
      function ReCaptchaLoader2() {
      }
      ReCaptchaLoader2.load = function(siteKey, options) {
        if (options === void 0) {
          options = {};
        }
        if (typeof document === "undefined") {
          return Promise.reject(new Error("This is a library for the browser!"));
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADED) {
          if (ReCaptchaLoader2.instance.getSiteKey() === siteKey) {
            return Promise.resolve(ReCaptchaLoader2.instance);
          } else {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADING) {
          if (siteKey !== ReCaptchaLoader2.instanceSiteKey) {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
          return new Promise(function(resolve, reject) {
            ReCaptchaLoader2.successfulLoadingConsumers.push(function(instance) {
              return resolve(instance);
            });
            ReCaptchaLoader2.errorLoadingRunnable.push(function(reason) {
              return reject(reason);
            });
          });
        }
        ReCaptchaLoader2.instanceSiteKey = siteKey;
        ReCaptchaLoader2.setLoadingState(ELoadingState.LOADING);
        var loader = new ReCaptchaLoader2();
        return new Promise(function(resolve, reject) {
          loader.loadScript(siteKey, options.useRecaptchaNet || false, options.useEnterprise || false, options.renderParameters ? options.renderParameters : {}, options.customUrl).then(function() {
            ReCaptchaLoader2.setLoadingState(ELoadingState.LOADED);
            var widgetID = loader.doExplicitRender(grecaptcha, siteKey, options.explicitRenderParameters ? options.explicitRenderParameters : {}, options.useEnterprise || false);
            var instance = new ReCaptchaInstance_1.ReCaptchaInstance(siteKey, widgetID, grecaptcha);
            ReCaptchaLoader2.successfulLoadingConsumers.forEach(function(v3) {
              return v3(instance);
            });
            ReCaptchaLoader2.successfulLoadingConsumers = [];
            if (options.autoHideBadge) {
              instance.hideBadge();
            }
            ReCaptchaLoader2.instance = instance;
            resolve(instance);
          }).catch(function(error) {
            ReCaptchaLoader2.errorLoadingRunnable.forEach(function(v3) {
              return v3(error);
            });
            ReCaptchaLoader2.errorLoadingRunnable = [];
            reject(error);
          });
        });
      };
      ReCaptchaLoader2.getInstance = function() {
        return ReCaptchaLoader2.instance;
      };
      ReCaptchaLoader2.setLoadingState = function(state) {
        ReCaptchaLoader2.loadingState = state;
      };
      ReCaptchaLoader2.getLoadingState = function() {
        if (ReCaptchaLoader2.loadingState === null) {
          return ELoadingState.NOT_LOADED;
        } else {
          return ReCaptchaLoader2.loadingState;
        }
      };
      ReCaptchaLoader2.prototype.loadScript = function(siteKey, useRecaptchaNet, useEnterprise, renderParameters, customUrl) {
        var _this = this;
        if (useRecaptchaNet === void 0) {
          useRecaptchaNet = false;
        }
        if (useEnterprise === void 0) {
          useEnterprise = false;
        }
        if (renderParameters === void 0) {
          renderParameters = {};
        }
        if (customUrl === void 0) {
          customUrl = "";
        }
        var scriptElement = document.createElement("script");
        scriptElement.setAttribute("recaptcha-v3-script", "");
        scriptElement.setAttribute("async", "");
        scriptElement.setAttribute("defer", "");
        var scriptBase = "https://www.google.com/recaptcha/api.js";
        if (useRecaptchaNet) {
          if (useEnterprise) {
            scriptBase = "https://recaptcha.net/recaptcha/enterprise.js";
          } else {
            scriptBase = "https://recaptcha.net/recaptcha/api.js";
          }
        } else if (useEnterprise) {
          scriptBase = "https://www.google.com/recaptcha/enterprise.js";
        }
        if (customUrl) {
          scriptBase = customUrl;
        }
        if (renderParameters.render) {
          renderParameters.render = void 0;
        }
        var parametersQuery = this.buildQueryString(renderParameters);
        scriptElement.src = scriptBase + "?render=explicit" + parametersQuery;
        return new Promise(function(resolve, reject) {
          scriptElement.addEventListener("load", _this.waitForScriptToLoad(function() {
            resolve(scriptElement);
          }, useEnterprise), false);
          scriptElement.onerror = function(error) {
            ReCaptchaLoader2.setLoadingState(ELoadingState.NOT_LOADED);
            reject(error);
          };
          document.head.appendChild(scriptElement);
        });
      };
      ReCaptchaLoader2.prototype.buildQueryString = function(parameters) {
        var parameterKeys = Object.keys(parameters);
        if (parameterKeys.length < 1) {
          return "";
        }
        return "&" + Object.keys(parameters).filter(function(parameterKey) {
          return !!parameters[parameterKey];
        }).map(function(parameterKey) {
          return parameterKey + "=" + parameters[parameterKey];
        }).join("&");
      };
      ReCaptchaLoader2.prototype.waitForScriptToLoad = function(callback, useEnterprise) {
        var _this = this;
        return function() {
          if (window.grecaptcha === void 0) {
            setTimeout(function() {
              _this.waitForScriptToLoad(callback, useEnterprise);
            }, ReCaptchaLoader2.SCRIPT_LOAD_DELAY);
          } else {
            if (useEnterprise) {
              window.grecaptcha.enterprise.ready(function() {
                callback();
              });
            } else {
              window.grecaptcha.ready(function() {
                callback();
              });
            }
          }
        };
      };
      ReCaptchaLoader2.prototype.doExplicitRender = function(grecaptcha2, siteKey, parameters, isEnterprise) {
        var augmentedParameters = __assign({ sitekey: siteKey }, parameters);
        if (parameters.container) {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(parameters.container, augmentedParameters);
          } else {
            return grecaptcha2.render(parameters.container, augmentedParameters);
          }
        } else {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(augmentedParameters);
          } else {
            return grecaptcha2.render(augmentedParameters);
          }
        }
      };
      ReCaptchaLoader2.loadingState = null;
      ReCaptchaLoader2.instance = null;
      ReCaptchaLoader2.instanceSiteKey = null;
      ReCaptchaLoader2.successfulLoadingConsumers = [];
      ReCaptchaLoader2.errorLoadingRunnable = [];
      ReCaptchaLoader2.SCRIPT_LOAD_DELAY = 25;
      return ReCaptchaLoader2;
    }();
    exports.load = ReCaptchaLoader.load;
    exports.getInstance = ReCaptchaLoader.getInstance;
  }
});

// node_modules/.pnpm/recaptcha-v3@1.11.3/node_modules/recaptcha-v3/dist/ReCaptcha.js
var require_ReCaptcha = __commonJS({
  "node_modules/.pnpm/recaptcha-v3@1.11.3/node_modules/recaptcha-v3/dist/ReCaptcha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = exports.getInstance = exports.load = void 0;
    var ReCaptchaLoader_1 = require_ReCaptchaLoader();
    Object.defineProperty(exports, "load", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.load;
    } });
    Object.defineProperty(exports, "getInstance", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.getInstance;
    } });
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    Object.defineProperty(exports, "ReCaptchaInstance", { enumerable: true, get: function() {
      return ReCaptchaInstance_1.ReCaptchaInstance;
    } });
  }
});

// node_modules/.pnpm/@waline+api@1.1.0/node_modules/@waline/api/dist/api.js
var d = { "Content-Type": "application/json" };
var i = (e2) => `${e2.replace(/\/?$/, "/")}api/`;
var c = (e2, n2 = "") => {
  if (typeof e2 == "object" && e2.errno) throw new TypeError(`${n2} failed with ${e2.errno}: ${e2.errmsg}`);
  return e2;
};
var m = ({ serverURL: e2, lang: n2, paths: o2, type: a, signal: t2 }) => fetch(`${i(e2)}article?path=${encodeURIComponent(o2.join(","))}&type=${encodeURIComponent(a.join(","))}&lang=${n2}`, { signal: t2 }).then((r2) => r2.json()).then((r2) => c(r2, "Get counter").data);
var p = ({ serverURL: e2, lang: n2, path: o2, type: a, action: t2 }) => fetch(`${i(e2)}article?lang=${n2}`, { method: "POST", headers: d, body: JSON.stringify({ path: o2, type: a, action: t2 }) }).then((r2) => r2.json()).then((r2) => c(r2, "Update counter").data);
var $ = ({ serverURL: e2, lang: n2, path: o2, page: a, pageSize: t2, sortBy: r2, signal: l, token: s }) => {
  const h2 = {};
  return s && (h2.Authorization = `Bearer ${s}`), fetch(`${i(e2)}comment?path=${encodeURIComponent(o2)}&pageSize=${t2}&page=${a}&lang=${n2}&sortBy=${r2}`, { signal: l, headers: h2 }).then((g2) => g2.json()).then((g2) => c(g2, "Get comment data").data);
};
var u = ({ serverURL: e2, lang: n2, token: o2, comment: a }) => {
  const t2 = { "Content-Type": "application/json" };
  return o2 && (t2.Authorization = `Bearer ${o2}`), fetch(`${i(e2)}comment?lang=${n2}`, { method: "POST", headers: t2, body: JSON.stringify(a) }).then((r2) => r2.json());
};
var y = ({ serverURL: e2, lang: n2, token: o2, objectId: a }) => fetch(`${i(e2)}comment/${a}?lang=${n2}`, { method: "DELETE", headers: { Authorization: `Bearer ${o2}` } }).then((t2) => t2.json()).then((t2) => c(t2, "Delete comment"));
var f = ({ serverURL: e2, lang: n2, token: o2, objectId: a, comment: t2 }) => fetch(`${i(e2)}comment/${a}?lang=${n2}`, { method: "PUT", headers: { ...d, Authorization: `Bearer ${o2}` }, body: JSON.stringify(t2) }).then((r2) => r2.json()).then((r2) => c(r2, "Update comment"));
var U = ({ serverURL: e2, lang: n2, paths: o2, signal: a }) => fetch(`${i(e2)}comment?type=count&url=${encodeURIComponent(o2.join(","))}&lang=${n2}`, { signal: a }).then((t2) => t2.json()).then((t2) => c(t2, "Get comment count").data);
var R = () => {
  const e2 = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e2);
};
var w = ({ lang: e2, serverURL: n2 }) => {
  const o2 = (window.innerWidth - 450) / 2, a = (window.innerHeight - 450) / 2;
  if (R()) return location.href = `${n2.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e2)}&redirect=${encodeURIComponent(location.href)}`, new Promise(() => {
  });
  const t2 = window.open(`${n2.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e2)}`, "_blank", `width=450,height=450,left=${o2},top=${a},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
  return t2 == null ? void 0 : t2.postMessage({ type: "TOKEN", data: null }, "*"), new Promise((r2) => {
    const l = ({ data: s }) => {
      !s || typeof s != "object" || s.type !== "userInfo" || s.data.token && (t2 == null ? void 0 : t2.close(), window.removeEventListener("message", l), r2(s.data));
    };
    window.addEventListener("message", l);
  });
};
var C = ({ serverURL: e2, lang: n2, paths: o2, signal: a }) => m({ serverURL: e2, lang: n2, paths: o2, type: ["time"], signal: a });
var j = (e2) => p({ ...e2, type: "time", action: "inc" });
var v = ({ serverURL: e2, lang: n2, count: o2, signal: a, token: t2 }) => {
  const r2 = {};
  return t2 && (r2.Authorization = `Bearer ${t2}`), fetch(`${i(e2)}comment?type=recent&count=${o2}&lang=${n2}`, { signal: a, headers: r2 }).then((l) => l.json());
};
var L = ({ serverURL: e2, signal: n2, pageSize: o2, lang: a }) => fetch(`${i(e2)}user?pageSize=${o2}&lang=${a}`, { signal: n2 }).then((t2) => t2.json()).then((t2) => c(t2, "user list")).then((t2) => t2.data);

// node_modules/.pnpm/@vueuse+shared@14.2.1_vue@3.5.32_typescript@5.9.3_/node_modules/@vueuse/shared/dist/index.js
function tryOnScopeDispose(fn2, failSilently) {
  if (getCurrentScope()) {
    onScopeDispose(fn2, failSilently);
    return true;
  }
  return false;
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _window, _window2, _window3;
  return isClient && !!((_window = window) === null || _window === void 0 || (_window = _window.navigator) === null || _window === void 0 ? void 0 : _window.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.navigator) === null || _window2 === void 0 ? void 0 : _window2.maxTouchPoints) > 2 && /iPad|Macintosh/.test((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent));
}
function toRef2(...args) {
  if (args.length !== 1) return toRef(...args);
  const r2 = args[0];
  return typeof r2 === "function" ? readonly(customRef(() => ({
    get: r2,
    set: noop
  }))) : ref(r2);
}
function createFilterWrapper(filter, fn2) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn2.apply(this, args), {
        fn: fn2,
        thisArg: this,
        args
      })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = (invoke$1) => {
  return invoke$1();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer$1) => {
    clearTimeout(timer$1);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke$1) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer) _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = void 0;
      }
      return Promise.resolve(invoke$1());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke$1;
      if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
        if (timer) _clearTimeout(timer);
        maxTimer = void 0;
        resolve(lastInvoker());
      }, maxDuration);
      timer = setTimeout(() => {
        if (maxTimer) _clearTimeout(maxTimer);
        maxTimer = void 0;
        resolve(invoke$1());
      }, duration);
    });
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter, options = {}) {
  const { initialState = "active" } = options;
  const isActive = toRef2(initialState === "active");
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value) extendFilter(...args);
  };
  return {
    isActive: readonly(isActive),
    pause,
    resume,
    eventFilter
  };
}
function identity(arg) {
  return arg;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function cacheStringFunction(fn2) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    return cache[str] || (cache[str] = fn2(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function useDebounceFn(fn2, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn2);
}
function watchWithFilter(source, cb, options = {}) {
  const { eventFilter = bypassFilter, ...watchOptions } = options;
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
function watchPausable(source, cb, options = {}) {
  const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
  return {
    stop: watchWithFilter(source, cb, {
      ...watchOptions,
      eventFilter
    }),
    pause,
    resume,
    isActive
  };
}
function tryOnMounted(fn2, sync = true, target) {
  if (getLifeCycleTarget(target)) onMounted(fn2, target);
  else if (sync) fn2();
  else nextTick(fn2);
}
function tryOnUnmounted(fn2, target) {
  if (getLifeCycleTarget(target)) onUnmounted(fn2, target);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const { immediate = true, immediateCallback = false } = options;
  let timer = null;
  const isActive = shallowRef(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0) return;
    isActive.value = true;
    if (immediateCallback) cb();
    clean();
    if (isActive.value) timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient) resume();
  if (isRef(interval) || typeof interval === "function") tryOnScopeDispose(watch(interval, () => {
    if (isActive.value && isClient) resume();
  }));
  tryOnScopeDispose(pause);
  return {
    isActive: shallowReadonly(isActive),
    pause,
    resume
  };
}
function watchImmediate(source, cb, options) {
  return watch(source, cb, {
    ...options,
    immediate: true
  });
}

// node_modules/.pnpm/@vueuse+core@14.2.1_vue@3.5.32_typescript@5.9.3_/node_modules/@vueuse/core/dist/index.js
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function unrefElement(elRef) {
  var _$el;
  const plain = toValue(elRef);
  return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
  const register = (el2, event, listener, options) => {
    el2.addEventListener(event, listener, options);
    return () => el2.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e2) => e2 != null);
    return test.every((e2) => typeof e2 !== "string") ? test : void 0;
  });
  return watchImmediate(() => {
    var _firstParamTargets$va, _firstParamTargets$va2;
    return [
      (_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e2) => unrefElement(e2))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e2) => e2 != null),
      toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
      toArray(unref(firstParamTargets.value ? args[2] : args[1])),
      toValue(firstParamTargets.value ? args[3] : args[2])
    ];
  }, ([raw_targets, raw_events, raw_listeners, raw_options], _2, onCleanup) => {
    if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
    const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
    const cleanups = raw_targets.flatMap((el2) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el2, event, listener, optionsClone))));
    onCleanup(() => {
      cleanups.forEach((fn2) => fn2());
    });
  }, { flush: "post" });
}
function useRafFn(fn2, options = {}) {
  const { immediate = true, fpsLimit = null, window: window$1 = defaultWindow, once = false } = options;
  const isActive = shallowRef(false);
  const intervalLimit = computed(() => {
    const limit = toValue(fpsLimit);
    return limit ? 1e3 / limit : null;
  });
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp$1) {
    if (!isActive.value || !window$1) return;
    if (!previousFrameTimestamp) previousFrameTimestamp = timestamp$1;
    const delta = timestamp$1 - previousFrameTimestamp;
    if (intervalLimit.value && delta < intervalLimit.value) {
      rafId = window$1.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp$1;
    fn2({
      delta,
      timestamp: timestamp$1
    });
    if (once) {
      isActive.value = false;
      rafId = null;
      return;
    }
    rafId = window$1.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window$1) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window$1.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window$1) {
      window$1.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate) resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
  boolean: {
    read: (v3) => v3 === "true",
    write: (v3) => String(v3)
  },
  object: {
    read: (v3) => JSON.parse(v3),
    write: (v3) => JSON.stringify(v3)
  },
  number: {
    read: (v3) => Number.parseFloat(v3),
    write: (v3) => String(v3)
  },
  any: {
    read: (v3) => v3,
    write: (v3) => String(v3)
  },
  string: {
    read: (v3) => v3,
    write: (v3) => String(v3)
  },
  map: {
    read: (v3) => new Map(JSON.parse(v3)),
    write: (v3) => JSON.stringify(Array.from(v3.entries()))
  },
  set: {
    read: (v3) => new Set(JSON.parse(v3)),
    write: (v3) => JSON.stringify(Array.from(v3))
  },
  date: {
    read: (v3) => new Date(v3),
    write: (v3) => v3.toISOString()
  }
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults$1, storage, options = {}) {
  var _options$serializer;
  const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window: window$1 = defaultWindow, eventFilter, onError = (e2) => {
    console.error(e2);
  }, initOnMounted } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults$1 === "function" ? defaults$1() : defaults$1);
  const keyComputed = computed(() => toValue(key));
  if (!storage) try {
    storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
  } catch (e2) {
    onError(e2);
  }
  if (!storage) return data;
  const rawInit = toValue(defaults$1);
  const type = guessSerializerType(rawInit);
  const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, (newValue) => write(newValue), {
    flush,
    deep,
    eventFilter
  });
  watch(keyComputed, () => update(), { flush });
  let firstMounted = false;
  const onStorageEvent = (ev) => {
    if (initOnMounted && !firstMounted) return;
    update(ev);
  };
  const onStorageCustomEvent = (ev) => {
    if (initOnMounted && !firstMounted) return;
    updateFromCustomEvent(ev);
  };
  if (window$1 && listenToStorageChanges) if (storage instanceof Storage) useEventListener(window$1, "storage", onStorageEvent, { passive: true });
  else useEventListener(window$1, customStorageEventName, onStorageCustomEvent);
  if (initOnMounted) tryOnMounted(() => {
    firstMounted = true;
    update();
  });
  else update();
  function dispatchWriteEvent(oldValue, newValue) {
    if (window$1) {
      const payload = {
        key: keyComputed.value,
        oldValue,
        newValue,
        storageArea: storage
      };
      window$1.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
    }
  }
  function write(v3) {
    try {
      const oldValue = storage.getItem(keyComputed.value);
      if (v3 == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(keyComputed.value);
      } else {
        const serialized = serializer.write(v3);
        if (oldValue !== serialized) {
          storage.setItem(keyComputed.value, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e2) {
      onError(e2);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value)) return {
        ...rawInit,
        ...value
      };
      return value;
    } else if (typeof rawValue !== "string") return rawValue;
    else return serializer.read(rawValue);
  }
  function update(event) {
    if (event && event.storageArea !== storage) return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== keyComputed.value) return;
    pauseWatch();
    try {
      const serializedData = serializer.write(data.value);
      if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
    } catch (e2) {
      onError(e2);
    } finally {
      if (event) nextTick(resumeWatch);
      else resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
function getDefaultScheduler$5(options) {
  if ("interval" in options || "immediate" in options) {
    const { interval = "requestAnimationFrame", immediate = true } = options;
    return interval === "requestAnimationFrame" ? (fn2) => useRafFn(fn2, { immediate }) : (fn2) => useIntervalFn(fn2, interval, options);
  }
  return useRafFn;
}
function useNow(options = {}) {
  const { controls: exposeControls = false, scheduler = getDefaultScheduler$5(options) } = options;
  const now = ref(/* @__PURE__ */ new Date());
  const update = () => now.value = /* @__PURE__ */ new Date();
  const controls = scheduler(update);
  if (exposeControls) return {
    now,
    ...controls
  };
  else return now;
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
function useScriptTag(src, onLoaded = noop, options = {}) {
  const { immediate = true, manual = false, type = "text/javascript", async = true, crossOrigin, referrerPolicy, noModule, defer, document: document$1 = defaultDocument, attrs = {}, nonce = void 0 } = options;
  const scriptTag = shallowRef(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve, reject) => {
    const resolveWithElement = (el$1) => {
      scriptTag.value = el$1;
      resolve(el$1);
      return el$1;
    };
    if (!document$1) {
      resolve(false);
      return;
    }
    let shouldAppend = false;
    let el2 = document$1.querySelector(`script[src="${toValue(src)}"]`);
    if (!el2) {
      el2 = document$1.createElement("script");
      el2.type = type;
      el2.async = async;
      el2.src = toValue(src);
      if (defer) el2.defer = defer;
      if (crossOrigin) el2.crossOrigin = crossOrigin;
      if (noModule) el2.noModule = noModule;
      if (referrerPolicy) el2.referrerPolicy = referrerPolicy;
      if (nonce) el2.nonce = nonce;
      Object.entries(attrs).forEach(([name, value]) => el2 === null || el2 === void 0 ? void 0 : el2.setAttribute(name, value));
      shouldAppend = true;
    } else if (el2.hasAttribute("data-loaded")) resolveWithElement(el2);
    const listenerOptions = { passive: true };
    useEventListener(el2, "error", (event) => reject(event), listenerOptions);
    useEventListener(el2, "abort", (event) => reject(event), listenerOptions);
    useEventListener(el2, "load", () => {
      el2.setAttribute("data-loaded", "true");
      onLoaded(el2);
      resolveWithElement(el2);
    }, listenerOptions);
    if (shouldAppend) el2 = document$1.head.appendChild(el2);
    if (!waitForScriptLoad) resolveWithElement(el2);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise) _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document$1) return;
    _promise = null;
    if (scriptTag.value) scriptTag.value = null;
    const el2 = document$1.querySelector(`script[src="${toValue(src)}"]`);
    if (el2) document$1.head.removeChild(el2);
  };
  if (immediate && !manual) tryOnMounted(load);
  if (!manual) tryOnUnmounted(unload);
  return {
    scriptTag,
    load,
    unload
  };
}
var _id = 0;
function useStyleTag(css, options = {}) {
  const isLoaded = shallowRef(false);
  const { document: document$1 = defaultDocument, immediate = true, manual = false, id = `vueuse_styletag_${++_id}` } = options;
  const cssRef = shallowRef(css);
  let stop = () => {
  };
  const load = () => {
    if (!document$1) return;
    const el2 = document$1.getElementById(id) || document$1.createElement("style");
    if (!el2.isConnected) {
      el2.id = id;
      if (options.nonce) el2.nonce = options.nonce;
      if (options.media) el2.media = options.media;
      document$1.head.appendChild(el2);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, (value) => {
      el2.textContent = value;
    }, { immediate: true });
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document$1 || !isLoaded.value) return;
    stop();
    document$1.head.removeChild(document$1.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load);
  if (!manual) tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
var DEFAULT_UNITS = [
  {
    max: 6e4,
    value: 1e3,
    name: "second"
  },
  {
    max: 276e4,
    value: 6e4,
    name: "minute"
  },
  {
    max: 72e6,
    value: 36e5,
    name: "hour"
  },
  {
    max: 5184e5,
    value: 864e5,
    name: "day"
  },
  {
    max: 24192e5,
    value: 6048e5,
    name: "week"
  },
  {
    max: 28512e6,
    value: 2592e6,
    name: "month"
  },
  {
    max: Number.POSITIVE_INFINITY,
    value: 31536e6,
    name: "year"
  }
];
var _TransitionPresets = {
  easeInSine: [
    0.12,
    0,
    0.39,
    0
  ],
  easeOutSine: [
    0.61,
    1,
    0.88,
    1
  ],
  easeInOutSine: [
    0.37,
    0,
    0.63,
    1
  ],
  easeInQuad: [
    0.11,
    0,
    0.5,
    0
  ],
  easeOutQuad: [
    0.5,
    1,
    0.89,
    1
  ],
  easeInOutQuad: [
    0.45,
    0,
    0.55,
    1
  ],
  easeInCubic: [
    0.32,
    0,
    0.67,
    0
  ],
  easeOutCubic: [
    0.33,
    1,
    0.68,
    1
  ],
  easeInOutCubic: [
    0.65,
    0,
    0.35,
    1
  ],
  easeInQuart: [
    0.5,
    0,
    0.75,
    0
  ],
  easeOutQuart: [
    0.25,
    1,
    0.5,
    1
  ],
  easeInOutQuart: [
    0.76,
    0,
    0.24,
    1
  ],
  easeInQuint: [
    0.64,
    0,
    0.78,
    0
  ],
  easeOutQuint: [
    0.22,
    1,
    0.36,
    1
  ],
  easeInOutQuint: [
    0.83,
    0,
    0.17,
    1
  ],
  easeInExpo: [
    0.7,
    0,
    0.84,
    0
  ],
  easeOutExpo: [
    0.16,
    1,
    0.3,
    1
  ],
  easeInOutExpo: [
    0.87,
    0,
    0.13,
    1
  ],
  easeInCirc: [
    0.55,
    0,
    1,
    0.45
  ],
  easeOutCirc: [
    0,
    0.55,
    0.45,
    1
  ],
  easeInOutCirc: [
    0.85,
    0,
    0.15,
    1
  ],
  easeInBack: [
    0.36,
    0,
    0.66,
    -0.56
  ],
  easeOutBack: [
    0.34,
    1.56,
    0.64,
    1
  ],
  easeInOutBack: [
    0.68,
    -0.6,
    0.32,
    1.6
  ]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);

// node_modules/.pnpm/autosize@6.0.1/node_modules/autosize/dist/autosize.esm.js
var e = /* @__PURE__ */ new Map();
function t(t2) {
  var o2 = e.get(t2);
  o2 && o2.destroy();
}
function o(t2) {
  var o2 = e.get(t2);
  o2 && o2.update();
}
var r = null;
"undefined" == typeof window ? ((r = function(e2) {
  return e2;
}).destroy = function(e2) {
  return e2;
}, r.update = function(e2) {
  return e2;
}) : ((r = function(t2, o2) {
  return t2 && Array.prototype.forEach.call(t2.length ? t2 : [t2], function(t3) {
    return function(t4) {
      if (t4 && t4.nodeName && "TEXTAREA" === t4.nodeName && !e.has(t4)) {
        var o3, r2 = null, n2 = window.getComputedStyle(t4), i2 = (o3 = t4.value, function() {
          a({ testForHeightReduction: "" === o3 || !t4.value.startsWith(o3), restoreTextAlign: null }), o3 = t4.value;
        }), l = (function(o4) {
          t4.removeEventListener("autosize:destroy", l), t4.removeEventListener("autosize:update", s), t4.removeEventListener("input", i2), window.removeEventListener("resize", s), Object.keys(o4).forEach(function(e2) {
            return t4.style[e2] = o4[e2];
          }), e.delete(t4);
        }).bind(t4, { height: t4.style.height, resize: t4.style.resize, textAlign: t4.style.textAlign, overflowY: t4.style.overflowY, overflowX: t4.style.overflowX, wordWrap: t4.style.wordWrap });
        t4.addEventListener("autosize:destroy", l), t4.addEventListener("autosize:update", s), t4.addEventListener("input", i2), window.addEventListener("resize", s), t4.style.overflowX = "hidden", t4.style.wordWrap = "break-word", e.set(t4, { destroy: l, update: s }), s();
      }
      function a(e2) {
        var o4, i3, l2 = e2.restoreTextAlign, s2 = void 0 === l2 ? null : l2, d2 = e2.testForHeightReduction, u4 = void 0 === d2 || d2, c2 = n2.overflowY;
        if (0 !== t4.scrollHeight && ("vertical" === n2.resize ? t4.style.resize = "none" : "both" === n2.resize && (t4.style.resize = "horizontal"), u4 && (o4 = function(e3) {
          for (var t5 = []; e3 && e3.parentNode && e3.parentNode instanceof Element; ) e3.parentNode.scrollTop && t5.push([e3.parentNode, e3.parentNode.scrollTop]), e3 = e3.parentNode;
          return function() {
            return t5.forEach(function(e4) {
              var t6 = e4[0], o5 = e4[1];
              t6.style.scrollBehavior = "auto", t6.scrollTop = o5, t6.style.scrollBehavior = null;
            });
          };
        }(t4), t4.style.height = ""), i3 = "content-box" === n2.boxSizing ? t4.scrollHeight - (parseFloat(n2.paddingTop) + parseFloat(n2.paddingBottom)) : t4.scrollHeight + parseFloat(n2.borderTopWidth) + parseFloat(n2.borderBottomWidth), "none" !== n2.maxHeight && i3 > parseFloat(n2.maxHeight) ? ("hidden" === n2.overflowY && (t4.style.overflow = "scroll"), i3 = parseFloat(n2.maxHeight)) : "hidden" !== n2.overflowY && (t4.style.overflow = "hidden"), t4.style.height = i3 + "px", s2 && (t4.style.textAlign = s2), o4 && o4(), r2 !== i3 && (t4.dispatchEvent(new Event("autosize:resized", { bubbles: true })), r2 = i3), c2 !== n2.overflow && !s2)) {
          var v3 = n2.textAlign;
          "hidden" === n2.overflow && (t4.style.textAlign = "start" === v3 ? "end" : "start"), a({ restoreTextAlign: v3, testForHeightReduction: true });
        }
      }
      function s() {
        a({ testForHeightReduction: true, restoreTextAlign: null });
      }
    }(t3);
  }), t2;
}).destroy = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], t), e2;
}, r.update = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], o), e2;
});
var n = r;
var autosize_esm_default = n;

// node_modules/.pnpm/marked@17.0.6/node_modules/marked/lib/marked.esm.js
function M() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var O = M();
function G(u4) {
  O = u4;
}
var _ = { exec: () => null };
function k(u4, e2 = "") {
  let t2 = typeof u4 == "string" ? u4 : u4.source, n2 = { replace: (r2, i2) => {
    let s = typeof i2 == "string" ? i2 : i2.source;
    return s = s.replace(m2.caret, "$1"), t2 = t2.replace(r2, s), n2;
  }, getRegex: () => new RegExp(t2, e2) };
  return n2;
}
var be = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return false;
  }
})();
var m2 = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u4) => new RegExp(`^( {0,3}${u4})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}#`), htmlBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}<(?:[a-z].*>|!--)`, "i"), blockquoteBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}>`) };
var Re = /^(?:[ \t]*(?:\n|$))+/;
var Oe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Te = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var C2 = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var we = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var Q = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
var se = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var ie = k(se).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var ye = k(se).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var j2 = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var Pe = /^[^\n]+/;
var F = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var Se = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", F).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var $e = k(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Q).getRegex();
var v2 = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var U2 = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var _e = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U2).replace("tag", v2).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var oe = k(j2).replace("hr", C2).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v2).getRegex();
var Le = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", oe).getRegex();
var K = { blockquote: Le, code: Oe, def: Se, fences: Te, heading: we, hr: C2, html: _e, lheading: ie, list: $e, newline: Re, paragraph: oe, table: _, text: Pe };
var ne = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", C2).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v2).getRegex();
var Me = { ...K, lheading: ye, table: ne, paragraph: k(j2).replace("hr", C2).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ne).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v2).getRegex() };
var ze = { ...K, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U2).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: _, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(j2).replace("hr", C2).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
var Ee = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var Ie = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var ae = /^( {2,}|\\)\n(?!\s*$)/;
var Ae = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var z = /[\p{P}\p{S}]/u;
var H = /[\s\p{P}\p{S}]/u;
var W = /[^\s\p{P}\p{S}]/u;
var Ce = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, H).getRegex();
var le = /(?!~)[\p{P}\p{S}]/u;
var Be = /(?!~)[\s\p{P}\p{S}]/u;
var De = /(?:[^\s\p{P}\p{S}]|~)/u;
var qe = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", be ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var ue = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
var ve = k(ue, "u").replace(/punct/g, z).getRegex();
var He = k(ue, "u").replace(/punct/g, le).getRegex();
var pe = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var Ze = k(pe, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex();
var Ge = k(pe, "gu").replace(/notPunctSpace/g, De).replace(/punctSpace/g, Be).replace(/punct/g, le).getRegex();
var Ne = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex();
var Qe = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, z).getRegex();
var je = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)";
var Fe = k(je, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex();
var Ue = k(/\\(punct)/, "gu").replace(/punct/g, z).getRegex();
var Ke = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var We = k(U2).replace("(?:-->|$)", "-->").getRegex();
var Xe = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", We).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/;
var Je = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var ce = k(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", F).getRegex();
var he = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", F).getRegex();
var Ve = k("reflink|nolink(?!\\()", "g").replace("reflink", ce).replace("nolink", he).getRegex();
var re = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var X = { _backpedal: _, anyPunctuation: Ue, autolink: Ke, blockSkip: qe, br: ae, code: Ie, del: _, delLDelim: _, delRDelim: _, emStrongLDelim: ve, emStrongRDelimAst: Ze, emStrongRDelimUnd: Ne, escape: Ee, link: Je, nolink: he, punctuation: Ce, reflink: ce, reflinkSearch: Ve, tag: Xe, text: Ae, url: _ };
var Ye = { ...X, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
var N = { ...X, emStrongRDelimAst: Ge, emStrongLDelim: He, delLDelim: Qe, delRDelim: Fe, url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", re).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", re).getRegex() };
var et = { ...N, br: k(ae).replace("{2,}", "*").getRegex(), text: k(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
var B = { normal: K, gfm: Me, pedantic: ze };
var E = { normal: X, gfm: N, breaks: et, pedantic: Ye };
var tt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var ke = (u4) => tt[u4];
function T(u4, e2) {
  if (e2) {
    if (m2.escapeTest.test(u4)) return u4.replace(m2.escapeReplace, ke);
  } else if (m2.escapeTestNoEncode.test(u4)) return u4.replace(m2.escapeReplaceNoEncode, ke);
  return u4;
}
function J(u4) {
  try {
    u4 = encodeURI(u4).replace(m2.percentDecode, "%");
  } catch {
    return null;
  }
  return u4;
}
function V(u4, e2) {
  var _a3;
  let t2 = u4.replace(m2.findPipe, (i2, s, a) => {
    let o2 = false, l = s;
    for (; --l >= 0 && a[l] === "\\"; ) o2 = !o2;
    return o2 ? "|" : " |";
  }), n2 = t2.split(m2.splitPipe), r2 = 0;
  if (n2[0].trim() || n2.shift(), n2.length > 0 && !((_a3 = n2.at(-1)) == null ? void 0 : _a3.trim()) && n2.pop(), e2) if (n2.length > e2) n2.splice(e2);
  else for (; n2.length < e2; ) n2.push("");
  for (; r2 < n2.length; r2++) n2[r2] = n2[r2].trim().replace(m2.slashPipe, "|");
  return n2;
}
function I(u4, e2, t2) {
  let n2 = u4.length;
  if (n2 === 0) return "";
  let r2 = 0;
  for (; r2 < n2; ) {
    let i2 = u4.charAt(n2 - r2 - 1);
    if (i2 === e2 && !t2) r2++;
    else if (i2 !== e2 && t2) r2++;
    else break;
  }
  return u4.slice(0, n2 - r2);
}
function de(u4, e2) {
  if (u4.indexOf(e2[1]) === -1) return -1;
  let t2 = 0;
  for (let n2 = 0; n2 < u4.length; n2++) if (u4[n2] === "\\") n2++;
  else if (u4[n2] === e2[0]) t2++;
  else if (u4[n2] === e2[1] && (t2--, t2 < 0)) return n2;
  return t2 > 0 ? -2 : -1;
}
function ge(u4, e2 = 0) {
  let t2 = e2, n2 = "";
  for (let r2 of u4) if (r2 === "	") {
    let i2 = 4 - t2 % 4;
    n2 += " ".repeat(i2), t2 += i2;
  } else n2 += r2, t2++;
  return n2;
}
function fe(u4, e2, t2, n2, r2) {
  let i2 = e2.href, s = e2.title || null, a = u4[1].replace(r2.other.outputLinkReplace, "$1");
  n2.state.inLink = true;
  let o2 = { type: u4[0].charAt(0) === "!" ? "image" : "link", raw: t2, href: i2, title: s, text: a, tokens: n2.inlineTokens(a) };
  return n2.state.inLink = false, o2;
}
function nt(u4, e2, t2) {
  let n2 = u4.match(t2.other.indentCodeCompensation);
  if (n2 === null) return e2;
  let r2 = n2[1];
  return e2.split(`
`).map((i2) => {
    let s = i2.match(t2.other.beginningSpace);
    if (s === null) return i2;
    let [a] = s;
    return a.length >= r2.length ? i2.slice(r2.length) : i2;
  }).join(`
`);
}
var w2 = class {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "rules");
    __publicField(this, "lexer");
    this.options = e2 || O;
  }
  space(e2) {
    let t2 = this.rules.block.newline.exec(e2);
    if (t2 && t2[0].length > 0) return { type: "space", raw: t2[0] };
  }
  code(e2) {
    let t2 = this.rules.block.code.exec(e2);
    if (t2) {
      let n2 = t2[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t2[0], codeBlockStyle: "indented", text: this.options.pedantic ? n2 : I(n2, `
`) };
    }
  }
  fences(e2) {
    let t2 = this.rules.block.fences.exec(e2);
    if (t2) {
      let n2 = t2[0], r2 = nt(n2, t2[3] || "", this.rules);
      return { type: "code", raw: n2, lang: t2[2] ? t2[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t2[2], text: r2 };
    }
  }
  heading(e2) {
    let t2 = this.rules.block.heading.exec(e2);
    if (t2) {
      let n2 = t2[2].trim();
      if (this.rules.other.endingHash.test(n2)) {
        let r2 = I(n2, "#");
        (this.options.pedantic || !r2 || this.rules.other.endingSpaceChar.test(r2)) && (n2 = r2.trim());
      }
      return { type: "heading", raw: t2[0], depth: t2[1].length, text: n2, tokens: this.lexer.inline(n2) };
    }
  }
  hr(e2) {
    let t2 = this.rules.block.hr.exec(e2);
    if (t2) return { type: "hr", raw: I(t2[0], `
`) };
  }
  blockquote(e2) {
    let t2 = this.rules.block.blockquote.exec(e2);
    if (t2) {
      let n2 = I(t2[0], `
`).split(`
`), r2 = "", i2 = "", s = [];
      for (; n2.length > 0; ) {
        let a = false, o2 = [], l;
        for (l = 0; l < n2.length; l++) if (this.rules.other.blockquoteStart.test(n2[l])) o2.push(n2[l]), a = true;
        else if (!a) o2.push(n2[l]);
        else break;
        n2 = n2.slice(l);
        let p2 = o2.join(`
`), c2 = p2.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r2 = r2 ? `${r2}
${p2}` : p2, i2 = i2 ? `${i2}
${c2}` : c2;
        let d2 = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(c2, s, true), this.lexer.state.top = d2, n2.length === 0) break;
        let h2 = s.at(-1);
        if ((h2 == null ? void 0 : h2.type) === "code") break;
        if ((h2 == null ? void 0 : h2.type) === "blockquote") {
          let R2 = h2, f2 = R2.raw + `
` + n2.join(`
`), S = this.blockquote(f2);
          s[s.length - 1] = S, r2 = r2.substring(0, r2.length - R2.raw.length) + S.raw, i2 = i2.substring(0, i2.length - R2.text.length) + S.text;
          break;
        } else if ((h2 == null ? void 0 : h2.type) === "list") {
          let R2 = h2, f2 = R2.raw + `
` + n2.join(`
`), S = this.list(f2);
          s[s.length - 1] = S, r2 = r2.substring(0, r2.length - h2.raw.length) + S.raw, i2 = i2.substring(0, i2.length - R2.raw.length) + S.raw, n2 = f2.substring(s.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r2, tokens: s, text: i2 };
    }
  }
  list(e2) {
    var _a3, _b;
    let t2 = this.rules.block.list.exec(e2);
    if (t2) {
      let n2 = t2[1].trim(), r2 = n2.length > 1, i2 = { type: "list", raw: "", ordered: r2, start: r2 ? +n2.slice(0, -1) : "", loose: false, items: [] };
      n2 = r2 ? `\\d{1,9}\\${n2.slice(-1)}` : `\\${n2}`, this.options.pedantic && (n2 = r2 ? n2 : "[*+-]");
      let s = this.rules.other.listItemRegex(n2), a = false;
      for (; e2; ) {
        let l = false, p2 = "", c2 = "";
        if (!(t2 = s.exec(e2)) || this.rules.block.hr.test(e2)) break;
        p2 = t2[0], e2 = e2.substring(p2.length);
        let d2 = ge(t2[2].split(`
`, 1)[0], t2[1].length), h2 = e2.split(`
`, 1)[0], R2 = !d2.trim(), f2 = 0;
        if (this.options.pedantic ? (f2 = 2, c2 = d2.trimStart()) : R2 ? f2 = t2[1].length + 1 : (f2 = d2.search(this.rules.other.nonSpaceChar), f2 = f2 > 4 ? 1 : f2, c2 = d2.slice(f2), f2 += t2[1].length), R2 && this.rules.other.blankLine.test(h2) && (p2 += h2 + `
`, e2 = e2.substring(h2.length + 1), l = true), !l) {
          let S = this.rules.other.nextBulletRegex(f2), Y2 = this.rules.other.hrRegex(f2), ee = this.rules.other.fencesBeginRegex(f2), te = this.rules.other.headingBeginRegex(f2), me = this.rules.other.htmlBeginRegex(f2), xe = this.rules.other.blockquoteBeginRegex(f2);
          for (; e2; ) {
            let Z = e2.split(`
`, 1)[0], A;
            if (h2 = Z, this.options.pedantic ? (h2 = h2.replace(this.rules.other.listReplaceNesting, "  "), A = h2) : A = h2.replace(this.rules.other.tabCharGlobal, "    "), ee.test(h2) || te.test(h2) || me.test(h2) || xe.test(h2) || S.test(h2) || Y2.test(h2)) break;
            if (A.search(this.rules.other.nonSpaceChar) >= f2 || !h2.trim()) c2 += `
` + A.slice(f2);
            else {
              if (R2 || d2.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ee.test(d2) || te.test(d2) || Y2.test(d2)) break;
              c2 += `
` + h2;
            }
            R2 = !h2.trim(), p2 += Z + `
`, e2 = e2.substring(Z.length + 1), d2 = A.slice(f2);
          }
        }
        i2.loose || (a ? i2.loose = true : this.rules.other.doubleBlankLine.test(p2) && (a = true)), i2.items.push({ type: "list_item", raw: p2, task: !!this.options.gfm && this.rules.other.listIsTask.test(c2), loose: false, text: c2, tokens: [] }), i2.raw += p2;
      }
      let o2 = i2.items.at(-1);
      if (o2) o2.raw = o2.raw.trimEnd(), o2.text = o2.text.trimEnd();
      else return;
      i2.raw = i2.raw.trimEnd();
      for (let l of i2.items) {
        if (this.lexer.state.top = false, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
          if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), ((_a3 = l.tokens[0]) == null ? void 0 : _a3.type) === "text" || ((_b = l.tokens[0]) == null ? void 0 : _b.type) === "paragraph") {
            l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let c2 = this.lexer.inlineQueue.length - 1; c2 >= 0; c2--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c2].src)) {
              this.lexer.inlineQueue[c2].src = this.lexer.inlineQueue[c2].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let p2 = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (p2) {
            let c2 = { type: "checkbox", raw: p2[0] + " ", checked: p2[0] !== "[ ]" };
            l.checked = c2.checked, i2.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c2.raw + l.tokens[0].raw, l.tokens[0].text = c2.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c2)) : l.tokens.unshift({ type: "paragraph", raw: c2.raw, text: c2.raw, tokens: [c2] }) : l.tokens.unshift(c2);
          }
        }
        if (!i2.loose) {
          let p2 = l.tokens.filter((d2) => d2.type === "space"), c2 = p2.length > 0 && p2.some((d2) => this.rules.other.anyLine.test(d2.raw));
          i2.loose = c2;
        }
      }
      if (i2.loose) for (let l of i2.items) {
        l.loose = true;
        for (let p2 of l.tokens) p2.type === "text" && (p2.type = "paragraph");
      }
      return i2;
    }
  }
  html(e2) {
    let t2 = this.rules.block.html.exec(e2);
    if (t2) return { type: "html", block: true, raw: t2[0], pre: t2[1] === "pre" || t2[1] === "script" || t2[1] === "style", text: t2[0] };
  }
  def(e2) {
    let t2 = this.rules.block.def.exec(e2);
    if (t2) {
      let n2 = t2[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r2 = t2[2] ? t2[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i2 = t2[3] ? t2[3].substring(1, t2[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t2[3];
      return { type: "def", tag: n2, raw: t2[0], href: r2, title: i2 };
    }
  }
  table(e2) {
    var _a3;
    let t2 = this.rules.block.table.exec(e2);
    if (!t2 || !this.rules.other.tableDelimiter.test(t2[2])) return;
    let n2 = V(t2[1]), r2 = t2[2].replace(this.rules.other.tableAlignChars, "").split("|"), i2 = ((_a3 = t2[3]) == null ? void 0 : _a3.trim()) ? t2[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t2[0], header: [], align: [], rows: [] };
    if (n2.length === r2.length) {
      for (let a of r2) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < n2.length; a++) s.header.push({ text: n2[a], tokens: this.lexer.inline(n2[a]), header: true, align: s.align[a] });
      for (let a of i2) s.rows.push(V(a, s.header.length).map((o2, l) => ({ text: o2, tokens: this.lexer.inline(o2), header: false, align: s.align[l] })));
      return s;
    }
  }
  lheading(e2) {
    let t2 = this.rules.block.lheading.exec(e2);
    if (t2) {
      let n2 = t2[1].trim();
      return { type: "heading", raw: t2[0], depth: t2[2].charAt(0) === "=" ? 1 : 2, text: n2, tokens: this.lexer.inline(n2) };
    }
  }
  paragraph(e2) {
    let t2 = this.rules.block.paragraph.exec(e2);
    if (t2) {
      let n2 = t2[1].charAt(t2[1].length - 1) === `
` ? t2[1].slice(0, -1) : t2[1];
      return { type: "paragraph", raw: t2[0], text: n2, tokens: this.lexer.inline(n2) };
    }
  }
  text(e2) {
    let t2 = this.rules.block.text.exec(e2);
    if (t2) return { type: "text", raw: t2[0], text: t2[0], tokens: this.lexer.inline(t2[0]) };
  }
  escape(e2) {
    let t2 = this.rules.inline.escape.exec(e2);
    if (t2) return { type: "escape", raw: t2[0], text: t2[1] };
  }
  tag(e2) {
    let t2 = this.rules.inline.tag.exec(e2);
    if (t2) return !this.lexer.state.inLink && this.rules.other.startATag.test(t2[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t2[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t2[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t2[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t2[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t2[0] };
  }
  link(e2) {
    let t2 = this.rules.inline.link.exec(e2);
    if (t2) {
      let n2 = t2[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n2)) {
        if (!this.rules.other.endAngleBracket.test(n2)) return;
        let s = I(n2.slice(0, -1), "\\");
        if ((n2.length - s.length) % 2 === 0) return;
      } else {
        let s = de(t2[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let o2 = (t2[0].indexOf("!") === 0 ? 5 : 4) + t2[1].length + s;
          t2[2] = t2[2].substring(0, s), t2[0] = t2[0].substring(0, o2).trim(), t2[3] = "";
        }
      }
      let r2 = t2[2], i2 = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(r2);
        s && (r2 = s[1], i2 = s[3]);
      } else i2 = t2[3] ? t2[3].slice(1, -1) : "";
      return r2 = r2.trim(), this.rules.other.startAngleBracket.test(r2) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n2) ? r2 = r2.slice(1) : r2 = r2.slice(1, -1)), fe(t2, { href: r2 && r2.replace(this.rules.inline.anyPunctuation, "$1"), title: i2 && i2.replace(this.rules.inline.anyPunctuation, "$1") }, t2[0], this.lexer, this.rules);
    }
  }
  reflink(e2, t2) {
    let n2;
    if ((n2 = this.rules.inline.reflink.exec(e2)) || (n2 = this.rules.inline.nolink.exec(e2))) {
      let r2 = (n2[2] || n2[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i2 = t2[r2.toLowerCase()];
      if (!i2) {
        let s = n2[0].charAt(0);
        return { type: "text", raw: s, text: s };
      }
      return fe(n2, i2, n2[0], this.lexer, this.rules);
    }
  }
  emStrong(e2, t2, n2 = "") {
    let r2 = this.rules.inline.emStrongLDelim.exec(e2);
    if (!r2 || !r2[1] && !r2[2] && !r2[3] && !r2[4] || r2[4] && n2.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(r2[1] || r2[3] || "") || !n2 || this.rules.inline.punctuation.exec(n2)) {
      let s = [...r2[0]].length - 1, a, o2, l = s, p2 = 0, c2 = r2[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + s); (r2 = c2.exec(t2)) !== null; ) {
        if (a = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6], !a) continue;
        if (o2 = [...a].length, r2[3] || r2[4]) {
          l += o2;
          continue;
        } else if ((r2[5] || r2[6]) && s % 3 && !((s + o2) % 3)) {
          p2 += o2;
          continue;
        }
        if (l -= o2, l > 0) continue;
        o2 = Math.min(o2, o2 + l + p2);
        let d2 = [...r2[0]][0].length, h2 = e2.slice(0, s + r2.index + d2 + o2);
        if (Math.min(s, o2) % 2) {
          let f2 = h2.slice(1, -1);
          return { type: "em", raw: h2, text: f2, tokens: this.lexer.inlineTokens(f2) };
        }
        let R2 = h2.slice(2, -2);
        return { type: "strong", raw: h2, text: R2, tokens: this.lexer.inlineTokens(R2) };
      }
    }
  }
  codespan(e2) {
    let t2 = this.rules.inline.code.exec(e2);
    if (t2) {
      let n2 = t2[2].replace(this.rules.other.newLineCharGlobal, " "), r2 = this.rules.other.nonSpaceChar.test(n2), i2 = this.rules.other.startingSpaceChar.test(n2) && this.rules.other.endingSpaceChar.test(n2);
      return r2 && i2 && (n2 = n2.substring(1, n2.length - 1)), { type: "codespan", raw: t2[0], text: n2 };
    }
  }
  br(e2) {
    let t2 = this.rules.inline.br.exec(e2);
    if (t2) return { type: "br", raw: t2[0] };
  }
  del(e2, t2, n2 = "") {
    let r2 = this.rules.inline.delLDelim.exec(e2);
    if (!r2) return;
    if (!(r2[1] || "") || !n2 || this.rules.inline.punctuation.exec(n2)) {
      let s = [...r2[0]].length - 1, a, o2, l = s, p2 = this.rules.inline.delRDelim;
      for (p2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + s); (r2 = p2.exec(t2)) !== null; ) {
        if (a = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6], !a || (o2 = [...a].length, o2 !== s)) continue;
        if (r2[3] || r2[4]) {
          l += o2;
          continue;
        }
        if (l -= o2, l > 0) continue;
        o2 = Math.min(o2, o2 + l);
        let c2 = [...r2[0]][0].length, d2 = e2.slice(0, s + r2.index + c2 + o2), h2 = d2.slice(s, -s);
        return { type: "del", raw: d2, text: h2, tokens: this.lexer.inlineTokens(h2) };
      }
    }
  }
  autolink(e2) {
    let t2 = this.rules.inline.autolink.exec(e2);
    if (t2) {
      let n2, r2;
      return t2[2] === "@" ? (n2 = t2[1], r2 = "mailto:" + n2) : (n2 = t2[1], r2 = n2), { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
    }
  }
  url(e2) {
    var _a3;
    let t2;
    if (t2 = this.rules.inline.url.exec(e2)) {
      let n2, r2;
      if (t2[2] === "@") n2 = t2[0], r2 = "mailto:" + n2;
      else {
        let i2;
        do
          i2 = t2[0], t2[0] = ((_a3 = this.rules.inline._backpedal.exec(t2[0])) == null ? void 0 : _a3[0]) ?? "";
        while (i2 !== t2[0]);
        n2 = t2[0], t2[1] === "www." ? r2 = "http://" + t2[0] : r2 = t2[0];
      }
      return { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
    }
  }
  inlineText(e2) {
    let t2 = this.rules.inline.text.exec(e2);
    if (t2) {
      let n2 = this.lexer.state.inRawBlock;
      return { type: "text", raw: t2[0], text: t2[0], escaped: n2 };
    }
  }
};
var x = class u2 {
  constructor(e2) {
    __publicField(this, "tokens");
    __publicField(this, "options");
    __publicField(this, "state");
    __publicField(this, "inlineQueue");
    __publicField(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e2 || O, this.options.tokenizer = this.options.tokenizer || new w2(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    let t2 = { other: m2, block: B.normal, inline: E.normal };
    this.options.pedantic ? (t2.block = B.pedantic, t2.inline = E.pedantic) : this.options.gfm && (t2.block = B.gfm, this.options.breaks ? t2.inline = E.breaks : t2.inline = E.gfm), this.tokenizer.rules = t2;
  }
  static get rules() {
    return { block: B, inline: E };
  }
  static lex(e2, t2) {
    return new u2(t2).lex(e2);
  }
  static lexInline(e2, t2) {
    return new u2(t2).inlineTokens(e2);
  }
  lex(e2) {
    e2 = e2.replace(m2.carriageReturn, `
`), this.blockTokens(e2, this.tokens);
    for (let t2 = 0; t2 < this.inlineQueue.length; t2++) {
      let n2 = this.inlineQueue[t2];
      this.inlineTokens(n2.src, n2.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e2, t2 = [], n2 = false) {
    var _a3, _b, _c;
    for (this.tokenizer.lexer = this, this.options.pedantic && (e2 = e2.replace(m2.tabCharGlobal, "    ").replace(m2.spaceLine, "")); e2; ) {
      let r2;
      if ((_b = (_a3 = this.options.extensions) == null ? void 0 : _a3.block) == null ? void 0 : _b.some((s) => (r2 = s.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(r2.raw.length), t2.push(r2), true) : false)) continue;
      if (r2 = this.tokenizer.space(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s = t2.at(-1);
        r2.raw.length === 1 && s !== void 0 ? s.raw += `
` : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.code(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s = t2.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s.text += `
` + r2.text, this.inlineQueue.at(-1).src = s.text) : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.fences(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.heading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.hr(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.blockquote(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.list(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.html(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.def(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s = t2.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s.text += `
` + r2.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r2.tag] || (this.tokens.links[r2.tag] = { href: r2.href, title: r2.title }, t2.push(r2));
        continue;
      }
      if (r2 = this.tokenizer.table(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.lheading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      let i2 = e2;
      if ((_c = this.options.extensions) == null ? void 0 : _c.startBlock) {
        let s = 1 / 0, a = e2.slice(1), o2;
        this.options.extensions.startBlock.forEach((l) => {
          o2 = l.call({ lexer: this }, a), typeof o2 == "number" && o2 >= 0 && (s = Math.min(s, o2));
        }), s < 1 / 0 && s >= 0 && (i2 = e2.substring(0, s + 1));
      }
      if (this.state.top && (r2 = this.tokenizer.paragraph(i2))) {
        let s = t2.at(-1);
        n2 && (s == null ? void 0 : s.type) === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t2.push(r2), n2 = i2.length !== e2.length, e2 = e2.substring(r2.raw.length);
        continue;
      }
      if (r2 = this.tokenizer.text(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s = t2.at(-1);
        (s == null ? void 0 : s.type) === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t2.push(r2);
        continue;
      }
      if (e2) {
        let s = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else throw new Error(s);
      }
    }
    return this.state.top = true, t2;
  }
  inline(e2, t2 = []) {
    return this.inlineQueue.push({ src: e2, tokens: t2 }), t2;
  }
  inlineTokens(e2, t2 = []) {
    var _a3, _b, _c, _d, _e3;
    this.tokenizer.lexer = this;
    let n2 = e2, r2 = null;
    if (this.tokens.links) {
      let o2 = Object.keys(this.tokens.links);
      if (o2.length > 0) for (; (r2 = this.tokenizer.rules.inline.reflinkSearch.exec(n2)) !== null; ) o2.includes(r2[0].slice(r2[0].lastIndexOf("[") + 1, -1)) && (n2 = n2.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + n2.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r2 = this.tokenizer.rules.inline.anyPunctuation.exec(n2)) !== null; ) n2 = n2.slice(0, r2.index) + "++" + n2.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i2;
    for (; (r2 = this.tokenizer.rules.inline.blockSkip.exec(n2)) !== null; ) i2 = r2[2] ? r2[2].length : 0, n2 = n2.slice(0, r2.index + i2) + "[" + "a".repeat(r2[0].length - i2 - 2) + "]" + n2.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n2 = ((_b = (_a3 = this.options.hooks) == null ? void 0 : _a3.emStrongMask) == null ? void 0 : _b.call({ lexer: this }, n2)) ?? n2;
    let s = false, a = "";
    for (; e2; ) {
      s || (a = ""), s = false;
      let o2;
      if ((_d = (_c = this.options.extensions) == null ? void 0 : _c.inline) == null ? void 0 : _d.some((p2) => (o2 = p2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(o2.raw.length), t2.push(o2), true) : false)) continue;
      if (o2 = this.tokenizer.escape(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.tag(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.link(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.reflink(e2, this.tokens.links)) {
        e2 = e2.substring(o2.raw.length);
        let p2 = t2.at(-1);
        o2.type === "text" && (p2 == null ? void 0 : p2.type) === "text" ? (p2.raw += o2.raw, p2.text += o2.text) : t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.emStrong(e2, n2, a)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.codespan(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.br(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.del(e2, n2, a)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.autolink(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (!this.state.inLink && (o2 = this.tokenizer.url(e2))) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      let l = e2;
      if ((_e3 = this.options.extensions) == null ? void 0 : _e3.startInline) {
        let p2 = 1 / 0, c2 = e2.slice(1), d2;
        this.options.extensions.startInline.forEach((h2) => {
          d2 = h2.call({ lexer: this }, c2), typeof d2 == "number" && d2 >= 0 && (p2 = Math.min(p2, d2));
        }), p2 < 1 / 0 && p2 >= 0 && (l = e2.substring(0, p2 + 1));
      }
      if (o2 = this.tokenizer.inlineText(l)) {
        e2 = e2.substring(o2.raw.length), o2.raw.slice(-1) !== "_" && (a = o2.raw.slice(-1)), s = true;
        let p2 = t2.at(-1);
        (p2 == null ? void 0 : p2.type) === "text" ? (p2.raw += o2.raw, p2.text += o2.text) : t2.push(o2);
        continue;
      }
      if (e2) {
        let p2 = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(p2);
          break;
        } else throw new Error(p2);
      }
    }
    return t2;
  }
};
var y2 = class {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "parser");
    this.options = e2 || O;
  }
  space(e2) {
    return "";
  }
  code({ text: e2, lang: t2, escaped: n2 }) {
    var _a3;
    let r2 = (_a3 = (t2 || "").match(m2.notSpaceStart)) == null ? void 0 : _a3[0], i2 = e2.replace(m2.endingNewline, "") + `
`;
    return r2 ? '<pre><code class="language-' + T(r2) + '">' + (n2 ? i2 : T(i2, true)) + `</code></pre>
` : "<pre><code>" + (n2 ? i2 : T(i2, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e2 }) {
    return `<blockquote>
${this.parser.parse(e2)}</blockquote>
`;
  }
  html({ text: e2 }) {
    return e2;
  }
  def(e2) {
    return "";
  }
  heading({ tokens: e2, depth: t2 }) {
    return `<h${t2}>${this.parser.parseInline(e2)}</h${t2}>
`;
  }
  hr(e2) {
    return `<hr>
`;
  }
  list(e2) {
    let t2 = e2.ordered, n2 = e2.start, r2 = "";
    for (let a = 0; a < e2.items.length; a++) {
      let o2 = e2.items[a];
      r2 += this.listitem(o2);
    }
    let i2 = t2 ? "ol" : "ul", s = t2 && n2 !== 1 ? ' start="' + n2 + '"' : "";
    return "<" + i2 + s + `>
` + r2 + "</" + i2 + `>
`;
  }
  listitem(e2) {
    return `<li>${this.parser.parse(e2.tokens)}</li>
`;
  }
  checkbox({ checked: e2 }) {
    return "<input " + (e2 ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: e2 }) {
    return `<p>${this.parser.parseInline(e2)}</p>
`;
  }
  table(e2) {
    let t2 = "", n2 = "";
    for (let i2 = 0; i2 < e2.header.length; i2++) n2 += this.tablecell(e2.header[i2]);
    t2 += this.tablerow({ text: n2 });
    let r2 = "";
    for (let i2 = 0; i2 < e2.rows.length; i2++) {
      let s = e2.rows[i2];
      n2 = "";
      for (let a = 0; a < s.length; a++) n2 += this.tablecell(s[a]);
      r2 += this.tablerow({ text: n2 });
    }
    return r2 && (r2 = `<tbody>${r2}</tbody>`), `<table>
<thead>
` + t2 + `</thead>
` + r2 + `</table>
`;
  }
  tablerow({ text: e2 }) {
    return `<tr>
${e2}</tr>
`;
  }
  tablecell(e2) {
    let t2 = this.parser.parseInline(e2.tokens), n2 = e2.header ? "th" : "td";
    return (e2.align ? `<${n2} align="${e2.align}">` : `<${n2}>`) + t2 + `</${n2}>
`;
  }
  strong({ tokens: e2 }) {
    return `<strong>${this.parser.parseInline(e2)}</strong>`;
  }
  em({ tokens: e2 }) {
    return `<em>${this.parser.parseInline(e2)}</em>`;
  }
  codespan({ text: e2 }) {
    return `<code>${T(e2, true)}</code>`;
  }
  br(e2) {
    return "<br>";
  }
  del({ tokens: e2 }) {
    return `<del>${this.parser.parseInline(e2)}</del>`;
  }
  link({ href: e2, title: t2, tokens: n2 }) {
    let r2 = this.parser.parseInline(n2), i2 = J(e2);
    if (i2 === null) return r2;
    e2 = i2;
    let s = '<a href="' + e2 + '"';
    return t2 && (s += ' title="' + T(t2) + '"'), s += ">" + r2 + "</a>", s;
  }
  image({ href: e2, title: t2, text: n2, tokens: r2 }) {
    r2 && (n2 = this.parser.parseInline(r2, this.parser.textRenderer));
    let i2 = J(e2);
    if (i2 === null) return T(n2);
    e2 = i2;
    let s = `<img src="${e2}" alt="${T(n2)}"`;
    return t2 && (s += ` title="${T(t2)}"`), s += ">", s;
  }
  text(e2) {
    return "tokens" in e2 && e2.tokens ? this.parser.parseInline(e2.tokens) : "escaped" in e2 && e2.escaped ? e2.text : T(e2.text);
  }
};
var $2 = class {
  strong({ text: e2 }) {
    return e2;
  }
  em({ text: e2 }) {
    return e2;
  }
  codespan({ text: e2 }) {
    return e2;
  }
  del({ text: e2 }) {
    return e2;
  }
  html({ text: e2 }) {
    return e2;
  }
  text({ text: e2 }) {
    return e2;
  }
  link({ text: e2 }) {
    return "" + e2;
  }
  image({ text: e2 }) {
    return "" + e2;
  }
  br() {
    return "";
  }
  checkbox({ raw: e2 }) {
    return e2;
  }
};
var b = class u3 {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "renderer");
    __publicField(this, "textRenderer");
    this.options = e2 || O, this.options.renderer = this.options.renderer || new y2(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $2();
  }
  static parse(e2, t2) {
    return new u3(t2).parse(e2);
  }
  static parseInline(e2, t2) {
    return new u3(t2).parseInline(e2);
  }
  parse(e2) {
    var _a3, _b;
    this.renderer.parser = this;
    let t2 = "";
    for (let n2 = 0; n2 < e2.length; n2++) {
      let r2 = e2[n2];
      if ((_b = (_a3 = this.options.extensions) == null ? void 0 : _a3.renderers) == null ? void 0 : _b[r2.type]) {
        let s = r2, a = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (a !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(s.type)) {
          t2 += a || "";
          continue;
        }
      }
      let i2 = r2;
      switch (i2.type) {
        case "space": {
          t2 += this.renderer.space(i2);
          break;
        }
        case "hr": {
          t2 += this.renderer.hr(i2);
          break;
        }
        case "heading": {
          t2 += this.renderer.heading(i2);
          break;
        }
        case "code": {
          t2 += this.renderer.code(i2);
          break;
        }
        case "table": {
          t2 += this.renderer.table(i2);
          break;
        }
        case "blockquote": {
          t2 += this.renderer.blockquote(i2);
          break;
        }
        case "list": {
          t2 += this.renderer.list(i2);
          break;
        }
        case "checkbox": {
          t2 += this.renderer.checkbox(i2);
          break;
        }
        case "html": {
          t2 += this.renderer.html(i2);
          break;
        }
        case "def": {
          t2 += this.renderer.def(i2);
          break;
        }
        case "paragraph": {
          t2 += this.renderer.paragraph(i2);
          break;
        }
        case "text": {
          t2 += this.renderer.text(i2);
          break;
        }
        default: {
          let s = 'Token with "' + i2.type + '" type was not found.';
          if (this.options.silent) return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return t2;
  }
  parseInline(e2, t2 = this.renderer) {
    var _a3, _b;
    this.renderer.parser = this;
    let n2 = "";
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i2 = e2[r2];
      if ((_b = (_a3 = this.options.extensions) == null ? void 0 : _a3.renderers) == null ? void 0 : _b[i2.type]) {
        let a = this.options.extensions.renderers[i2.type].call({ parser: this }, i2);
        if (a !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i2.type)) {
          n2 += a || "";
          continue;
        }
      }
      let s = i2;
      switch (s.type) {
        case "escape": {
          n2 += t2.text(s);
          break;
        }
        case "html": {
          n2 += t2.html(s);
          break;
        }
        case "link": {
          n2 += t2.link(s);
          break;
        }
        case "image": {
          n2 += t2.image(s);
          break;
        }
        case "checkbox": {
          n2 += t2.checkbox(s);
          break;
        }
        case "strong": {
          n2 += t2.strong(s);
          break;
        }
        case "em": {
          n2 += t2.em(s);
          break;
        }
        case "codespan": {
          n2 += t2.codespan(s);
          break;
        }
        case "br": {
          n2 += t2.br(s);
          break;
        }
        case "del": {
          n2 += t2.del(s);
          break;
        }
        case "text": {
          n2 += t2.text(s);
          break;
        }
        default: {
          let a = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return n2;
  }
};
var _a;
var P = (_a = class {
  constructor(e2) {
    __publicField(this, "options");
    __publicField(this, "block");
    this.options = e2 || O;
  }
  preprocess(e2) {
    return e2;
  }
  postprocess(e2) {
    return e2;
  }
  processAllTokens(e2) {
    return e2;
  }
  emStrongMask(e2) {
    return e2;
  }
  provideLexer(e2 = this.block) {
    return e2 ? x.lex : x.lexInline;
  }
  provideParser(e2 = this.block) {
    return e2 ? b.parse : b.parseInline;
  }
}, __publicField(_a, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), __publicField(_a, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a);
var D = class {
  constructor(...e2) {
    __publicField(this, "defaults", M());
    __publicField(this, "options", this.setOptions);
    __publicField(this, "parse", this.parseMarkdown(true));
    __publicField(this, "parseInline", this.parseMarkdown(false));
    __publicField(this, "Parser", b);
    __publicField(this, "Renderer", y2);
    __publicField(this, "TextRenderer", $2);
    __publicField(this, "Lexer", x);
    __publicField(this, "Tokenizer", w2);
    __publicField(this, "Hooks", P);
    this.use(...e2);
  }
  walkTokens(e2, t2) {
    var _a3, _b;
    let n2 = [];
    for (let r2 of e2) switch (n2 = n2.concat(t2.call(this, r2)), r2.type) {
      case "table": {
        let i2 = r2;
        for (let s of i2.header) n2 = n2.concat(this.walkTokens(s.tokens, t2));
        for (let s of i2.rows) for (let a of s) n2 = n2.concat(this.walkTokens(a.tokens, t2));
        break;
      }
      case "list": {
        let i2 = r2;
        n2 = n2.concat(this.walkTokens(i2.items, t2));
        break;
      }
      default: {
        let i2 = r2;
        ((_b = (_a3 = this.defaults.extensions) == null ? void 0 : _a3.childTokens) == null ? void 0 : _b[i2.type]) ? this.defaults.extensions.childTokens[i2.type].forEach((s) => {
          let a = i2[s].flat(1 / 0);
          n2 = n2.concat(this.walkTokens(a, t2));
        }) : i2.tokens && (n2 = n2.concat(this.walkTokens(i2.tokens, t2)));
      }
    }
    return n2;
  }
  use(...e2) {
    let t2 = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e2.forEach((n2) => {
      let r2 = { ...n2 };
      if (r2.async = this.defaults.async || r2.async || false, n2.extensions && (n2.extensions.forEach((i2) => {
        if (!i2.name) throw new Error("extension name required");
        if ("renderer" in i2) {
          let s = t2.renderers[i2.name];
          s ? t2.renderers[i2.name] = function(...a) {
            let o2 = i2.renderer.apply(this, a);
            return o2 === false && (o2 = s.apply(this, a)), o2;
          } : t2.renderers[i2.name] = i2.renderer;
        }
        if ("tokenizer" in i2) {
          if (!i2.level || i2.level !== "block" && i2.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s = t2[i2.level];
          s ? s.unshift(i2.tokenizer) : t2[i2.level] = [i2.tokenizer], i2.start && (i2.level === "block" ? t2.startBlock ? t2.startBlock.push(i2.start) : t2.startBlock = [i2.start] : i2.level === "inline" && (t2.startInline ? t2.startInline.push(i2.start) : t2.startInline = [i2.start]));
        }
        "childTokens" in i2 && i2.childTokens && (t2.childTokens[i2.name] = i2.childTokens);
      }), r2.extensions = t2), n2.renderer) {
        let i2 = this.defaults.renderer || new y2(this.defaults);
        for (let s in n2.renderer) {
          if (!(s in i2)) throw new Error(`renderer '${s}' does not exist`);
          if (["options", "parser"].includes(s)) continue;
          let a = s, o2 = n2.renderer[a], l = i2[a];
          i2[a] = (...p2) => {
            let c2 = o2.apply(i2, p2);
            return c2 === false && (c2 = l.apply(i2, p2)), c2 || "";
          };
        }
        r2.renderer = i2;
      }
      if (n2.tokenizer) {
        let i2 = this.defaults.tokenizer || new w2(this.defaults);
        for (let s in n2.tokenizer) {
          if (!(s in i2)) throw new Error(`tokenizer '${s}' does not exist`);
          if (["options", "rules", "lexer"].includes(s)) continue;
          let a = s, o2 = n2.tokenizer[a], l = i2[a];
          i2[a] = (...p2) => {
            let c2 = o2.apply(i2, p2);
            return c2 === false && (c2 = l.apply(i2, p2)), c2;
          };
        }
        r2.tokenizer = i2;
      }
      if (n2.hooks) {
        let i2 = this.defaults.hooks || new P();
        for (let s in n2.hooks) {
          if (!(s in i2)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let a = s, o2 = n2.hooks[a], l = i2[a];
          P.passThroughHooks.has(s) ? i2[a] = (p2) => {
            if (this.defaults.async && P.passThroughHooksRespectAsync.has(s)) return (async () => {
              let d2 = await o2.call(i2, p2);
              return l.call(i2, d2);
            })();
            let c2 = o2.call(i2, p2);
            return l.call(i2, c2);
          } : i2[a] = (...p2) => {
            if (this.defaults.async) return (async () => {
              let d2 = await o2.apply(i2, p2);
              return d2 === false && (d2 = await l.apply(i2, p2)), d2;
            })();
            let c2 = o2.apply(i2, p2);
            return c2 === false && (c2 = l.apply(i2, p2)), c2;
          };
        }
        r2.hooks = i2;
      }
      if (n2.walkTokens) {
        let i2 = this.defaults.walkTokens, s = n2.walkTokens;
        r2.walkTokens = function(a) {
          let o2 = [];
          return o2.push(s.call(this, a)), i2 && (o2 = o2.concat(i2.call(this, a))), o2;
        };
      }
      this.defaults = { ...this.defaults, ...r2 };
    }), this;
  }
  setOptions(e2) {
    return this.defaults = { ...this.defaults, ...e2 }, this;
  }
  lexer(e2, t2) {
    return x.lex(e2, t2 ?? this.defaults);
  }
  parser(e2, t2) {
    return b.parse(e2, t2 ?? this.defaults);
  }
  parseMarkdown(e2) {
    return (n2, r2) => {
      let i2 = { ...r2 }, s = { ...this.defaults, ...i2 }, a = this.onError(!!s.silent, !!s.async);
      if (this.defaults.async === true && i2.async === false) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n2 > "u" || n2 === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof n2 != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n2) + ", string expected"));
      if (s.hooks && (s.hooks.options = s, s.hooks.block = e2), s.async) return (async () => {
        let o2 = s.hooks ? await s.hooks.preprocess(n2) : n2, p2 = await (s.hooks ? await s.hooks.provideLexer(e2) : e2 ? x.lex : x.lexInline)(o2, s), c2 = s.hooks ? await s.hooks.processAllTokens(p2) : p2;
        s.walkTokens && await Promise.all(this.walkTokens(c2, s.walkTokens));
        let h2 = await (s.hooks ? await s.hooks.provideParser(e2) : e2 ? b.parse : b.parseInline)(c2, s);
        return s.hooks ? await s.hooks.postprocess(h2) : h2;
      })().catch(a);
      try {
        s.hooks && (n2 = s.hooks.preprocess(n2));
        let l = (s.hooks ? s.hooks.provideLexer(e2) : e2 ? x.lex : x.lexInline)(n2, s);
        s.hooks && (l = s.hooks.processAllTokens(l)), s.walkTokens && this.walkTokens(l, s.walkTokens);
        let c2 = (s.hooks ? s.hooks.provideParser(e2) : e2 ? b.parse : b.parseInline)(l, s);
        return s.hooks && (c2 = s.hooks.postprocess(c2)), c2;
      } catch (o2) {
        return a(o2);
      }
    };
  }
  onError(e2, t2) {
    return (n2) => {
      if (n2.message += `
Please report this to https://github.com/markedjs/marked.`, e2) {
        let r2 = "<p>An error occurred:</p><pre>" + T(n2.message + "", true) + "</pre>";
        return t2 ? Promise.resolve(r2) : r2;
      }
      if (t2) return Promise.reject(n2);
      throw n2;
    };
  }
};
var L2 = new D();
function g(u4, e2) {
  return L2.parse(u4, e2);
}
g.options = g.setOptions = function(u4) {
  return L2.setOptions(u4), g.defaults = L2.defaults, G(g.defaults), g;
};
g.getDefaults = M;
g.defaults = O;
g.use = function(...u4) {
  return L2.use(...u4), g.defaults = L2.defaults, G(g.defaults), g;
};
g.walkTokens = function(u4, e2) {
  return L2.walkTokens(u4, e2);
};
g.parseInline = L2.parseInline;
g.Parser = b;
g.parser = b.parse;
g.Renderer = y2;
g.TextRenderer = $2;
g.Lexer = x;
g.lexer = x.lex;
g.Tokenizer = w2;
g.Hooks = P;
g.parse = g;
var Qt = g.options;
var jt = g.setOptions;
var Ft = g.use;
var Ut = g.walkTokens;
var Kt = g.parseInline;
var Xt = b.parse;
var Jt = x.lex;

// node_modules/.pnpm/marked-highlight@2.2.3_marked@17.0.6/node_modules/marked-highlight/src/index.js
function markedHighlight(options) {
  if (typeof options === "function") {
    options = {
      highlight: options
    };
  }
  if (!options || typeof options.highlight !== "function") {
    throw new Error("Must provide highlight function");
  }
  if (typeof options.langPrefix !== "string") {
    options.langPrefix = "language-";
  }
  if (typeof options.emptyLangClass !== "string") {
    options.emptyLangClass = "";
  }
  return {
    async: !!options.async,
    walkTokens(token) {
      if (token.type !== "code") {
        return;
      }
      const lang = getLang(token.lang);
      if (options.async) {
        return Promise.resolve(options.highlight(token.text, lang, token.lang || "")).then(updateToken(token));
      }
      const code = options.highlight(token.text, lang, token.lang || "");
      if (code instanceof Promise) {
        throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");
      }
      updateToken(token)(code);
    },
    useNewRenderer: true,
    renderer: {
      code(code, infoString, escaped) {
        if (typeof code === "object") {
          escaped = code.escaped;
          infoString = code.lang;
          code = code.text;
        }
        const lang = getLang(infoString);
        const classValue = lang ? options.langPrefix + escape(lang) : options.emptyLangClass;
        const classAttr = classValue ? ` class="${classValue}"` : "";
        code = code.replace(/\n$/, "");
        return `<pre><code${classAttr}>${escaped ? code : escape(code, true)}
</code></pre>`;
      }
    }
  };
}
function getLang(lang) {
  return (lang || "").match(/\S*/)[0];
}
function updateToken(token) {
  return (code) => {
    if (typeof code === "string" && code !== token.text) {
      token.escaped = true;
      token.text = code;
    }
  };
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}

// node_modules/.pnpm/@waline+client@3.13.0_typescript@5.9.3/node_modules/@waline/client/dist/slim.js
var import_recaptcha_v3 = __toESM(require_ReCaptcha());
var oa = /* @__PURE__ */ new Set(["nick", "mail", "link"]);
var Xe2 = (e2) => e2.filter((a) => oa.has(a));
var Ye2 = ["//unpkg.com/@waline/emojis@1.1.0/weibo"];
var ia = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"];
var sa = (e2) => new Promise((a, t2) => {
  if (e2.size > 128 * 1e3) {
    t2(new Error("File too large! File size limit 128KB"));
    return;
  }
  const l = new FileReader();
  l.readAsDataURL(e2), l.addEventListener("load", () => {
    a(l.result);
  }), l.addEventListener("error", t2);
});
var ca = (e2) => e2 ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>';
var ua = (e2) => {
  const a = (t2, l = {}) => fetch(`https://api.giphy.com/v1/gifs/${t2}?${new URLSearchParams({ lang: e2, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...l }).toString()}`).then((n2) => n2.json()).then(({ data: n2 }) => n2.map((i2) => ({ title: i2.title, src: i2.images.downsized_medium.url })));
  return { search: (t2) => a("search", { q: t2, offset: "0" }), default: () => a("trending", {}), more: (t2, l = 0) => a("search", { q: t2, offset: l.toString() }) };
};
var ma = /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF\u0400-\u04FF]+|\w+/;
var va = /</;
var da = /(?:^|\s)\/\/(.+?)$/gm;
var pa = /\/\*([\S\s]*?)\*\//gm;
var ga = new RegExp(`(${ma.source}|${va.source})|((?:${da.source})|(?:${pa.source}))`, "gmi");
var Je2 = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
var ze2 = {};
var ha = (e2) => {
  let a = 0;
  return e2.replace(ga, (t2, l, n2) => {
    if (n2) return `<span style="color: slategray">${n2}</span>`;
    if (l === "<") return "&lt;";
    let i2;
    ze2[l] ? i2 = ze2[l] : (i2 = Je2[a], ze2[l] = i2);
    const p2 = `<span style="color: #${i2}">${l}</span>`;
    return a = ++a % Je2.length, p2;
  });
};
var fa = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle", "commentUnderReview", "subPostComment", "subSiteComment", "subscribeToReplies"];
var Y = (e2) => Object.fromEntries(e2.map((a, t2) => [fa[t2], a]));
var wa = Y(["Benutzername", "Der Benutzername darf nicht weniger als 3 Bytes umfassen.", "E-Mail", "Bitte bestätigen Sie Ihre E-Mail-Adresse.", "Webseite", "Optional", "Kommentieren Sie hier...", "Noch keine Kommentare.", "Senden", "Gefällt mir", "Gefällt mir nicht mehr", "Antworten", "Antwort abbrechen", "Kommentare", "Aktualisieren", "Mehr laden...", "Vorschau", "Emoji", "Ein Bild hochladen", "Vor einigen Sekunden", "Vor einigen Minuten", "Vor einigen Stunden", "Vor einigen Tagen", "Gerade eben", "Hochladen läuft", "Anmelden", "Abmelden", "Admin", "Angeheftet", "Wörter", "Bitte geben Sie Kommentare zwischen $0 und $1 Wörtern ein! Aktuelle Anzahl der Wörter: $2", "Anonym", "Zwerge", "Hobbits", "Ents", "Magier", "Elfen", "Maïar", "GIF", "Nach einem GIF suchen", "Profil", "Genehmigt", "Ausstehend", "Spam", "Lösen", "Älteste", "Neueste", "Am beliebtesten", "Was denken Sie?", "Ihr Kommentar wird überprüft und ist derzeit nur für Sie sichtbar. Nach der Genehmigung wird er öffentlich angezeigt.", "Abonnieren Sie die Kommentare zu diesem Beitrag", "Abonnieren Sie die Kommentare auf dieser Seite", "Abonnieren Sie die Antworten auf Ihre Kommentare"]);
var Qe2 = Y(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", `Please input comments between $0 and $1 words!
 Current word number: $2`, "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?", "Your comment is under review and is currently only visible to you. It will be publicly visible after approval.", "Subscribe to comments of this post", "Subscribe to comments of this site", "Subscribe to replies of your comments"]);
var et2 = Y(["Nombre de usuario", "El nombre de usuario no puede tener menos de 3 bytes.", "Correo electrónico", "Por favor confirma tu dirección de correo electrónico.", "Sitio web", "Opcional", "Comenta aquí...", "Sin comentarios todavía.", "Enviar", "Like", "Anular like", "Responder", "Anular respuesta", "Comentarios", "Recargar", "Cargar Más...", "Previsualizar", "Emoji", "Subir Imagen", "segundos atrás", "minutos atrás", "horas atrás", "días atrás", "justo ahora", "Subiendo", "Iniciar sesión", "cerrar sesión", "Admin", "Fijado", "Palabras", `Por favor escriba entre $0 y $1 palabras!
 El número actual de palabras: $2`, "Anónimo", "Enanos", "Hobbits", "Ents", "Magos", "Elfos", "Maiar", "GIF", "Buscar GIF", "Perfil", "Aprobado", "Esperando", "Spam", "Desfijar", "Más antiguos", "Más recientes", "Más vistos", "¿Qué piensas?", "Tu comentario está en revisión y actualmente solo es visible para ti. Será visible públicamente después de la aprobación.", "Suscribirse a los comentarios de esta publicación", "Suscribirse a los comentarios de este sitio", "Suscribirse a las respuestas de tus comentarios"]);
var tt2 = Y(["Pseudo", "Le pseudo ne peut pas faire moins de 3 octets.", "E-mail", "Veuillez confirmer votre adresse e-mail.", "Site Web", "Optionnel", "Commentez ici...", "Aucun commentaire pour l'instant.", "Envoyer", "J'aime", "Annuler le j'aime", "Répondre", "Annuler la réponse", "Commentaires", "Actualiser", "Charger plus...", "Aperçu", "Emoji", "Télécharger une image", "Il y a quelques secondes", "Il y a quelques minutes", "Il y a quelques heures", "Il y a quelques jours", "À l'instant", "Téléchargement en cours", "Connexion", "Déconnexion", "Admin", "Épinglé", "Mots", `Veuillez saisir des commentaires entre $0 et $1 mots !
 Nombre actuel de mots : $2`, "Anonyme", "Nains", "Hobbits", "Ents", "Mages", "Elfes", "Maïar", "GIF", "Rechercher un GIF", "Profil", "Approuvé", "En attente", "Indésirable", "Détacher", "Le plus ancien", "Dernier", "Le plus populaire", "Qu'en pensez-vous ?", "Votre commentaire est en cours de révision et n'est actuellement visible que par vous. Il sera visible publiquement après approbation.", "S’abonner aux commentaires de ce post", "S’abonner aux commentaires de ce site", "S’abonner aux réponses de vos commentaires"]);
var at = Y(["Nickname", "Il nickname non può avere meno di 3 caratteri.", "E-mail", "Per favore conferma il tuo indirizzo e-mail.", "Sito web", "Facoltativo", "Scrivi un commento...", "Ancora nessun commento.", "Invia", "Mi piace", "Annulla mi piace", "Rispondi", "Annulla risposta", "Commenti", "Aggiorna", "Carica altri...", "Anteprima", "Emoji", "Carica immagine", "secondi fa", "minuti fa", "ore fa", "giorni fa", "adesso", "Caricamento in corso...", "Accedi", "Esci", "Admin", "In evidenza", "Parole", `Inserisci un commento tra $0 e $1 parole!
 Numero attuale di parole: $2`, "Anonimo", "Nano", "Hobbit", "Ent", "Mago", "Elfo", "Maiar", "GIF", "Cerca GIF", "Profilo", "Approvato", "In attesa", "Spam", "Rimuovi evidenza", "Più vecchi", "Più recenti", "Più popolari", "Cosa ne pensi?", "Il tuo commento è in fase di revisione ed è attualmente visibile solo a te. Sarà visibile pubblicamente dopo l'approvazione.", "Iscriviti ai commenti di questo post", "Iscriviti ai commenti di questo sito", "Iscriviti alle risposte dei tuoi commenti"]);
var nt2 = Y(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", `コメントは $0 から $1 ワードの間でなければなりません!
 現在の単語番号: $2`, "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？", "あなたのコメントは審査中で、現在はあなただけに表示されています。承認後に公開されます。", "この投稿のコメントを購読する", "このサイトのコメントを購読する", "あなたのコメントの返信を購読する"]);
var lt = Y(["닉네임", "닉네임은 3바이트 이상이어야 합니다.", "이메일", "이메일 주소를 확인해 주세요.", "웹사이트", "선택사항", "여기에 댓글을 입력하세요...", "아직 댓글이 없습니다.", "제출", "좋아요", "좋아요 취소", "답글", "답글 취소", "댓글", "새로고침", "더 보기...", "미리보기", "이모지", "이미지 업로드", "초 전", "분 전", "시간 전", "일 전", "방금 전", "업로드 중", "로그인", "로그아웃", "관리자", "고정", "글자 수", `댓글은 $0자에서 $1자 사이여야 합니다!
현재 글자 수: $2`, "익명", "난쟁이", "호빗", "엔트", "마법사", "엘프", "마이아", "GIF", "GIF 검색", "프로필", "승인됨", "대기 중", "스팸", "고정 해제", "오래된 순", "최신 순", "인기순", "어떻게 생각하시나요?", "댓글이 검토 중이며 현재 본인만 볼 수 있습니다. 승인 후 공개됩니다.", "이 게시물의 댓글 구독", "이 사이트의 댓글 구독", "댓글에 대한 답글 구독"]);
var ya = Y(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", `Favor enviar comentário com $0 a $1 palavras!
 Número de palavras atuais: $2`, "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?", "Seu comentário está em revisão e atualmente está visível apenas para você. Ele será visível publicamente após a aprovação.", "Assinar os comentários deste post", "Assinar os comentários deste site", "Assinar as respostas dos seus comentários"]);
var rt = Y(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", `Пожалуйста, введите комментарии от $0 до $1 слов!
Номер текущего слова: $2`, "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?", "Ваш комментарий находится на рассмотрении и в настоящее время виден только вам. После одобрения он станет общедоступным.", "Подписаться на комментарии к этому посту", "Подписаться на комментарии этого сайта", "Подписаться на ответы ваших комментариев"]);
var ot = Y(["Tên", "Tên không được nhỏ hơn 3 ký tự.", "E-Mail", "Vui lòng xác nhập địa chỉ email của bạn.", "Website", "Tùy chọn", "Hãy bình luận có văn hoá!", "Chưa có bình luận", "Gửi", "Thích", "Bỏ thích", "Trả lời", "Hủy bỏ", "bình luận", "Làm mới", "Tải thêm...", "Xem trước", "Emoji", "Tải lên hình ảnh", "giây trước", "phút trước", "giờ trước", "ngày trước", "Vừa xong", "Đang tải lên", "Đăng nhập", "đăng xuất", "Quản trị viên", "Dính", "từ", `Bình luận phải có độ dài giữa $0 và $1 từ!
 Số từ hiện tại: $2`, "Vô danh", "Người lùn", "Người tí hon", "Thần rừng", "Pháp sư", "Tiên tộc", "Maiar", "Ảnh GIF", "Tìm kiếm ảnh GIF", "thông tin cá nhân", "Đã được phê duyệt", "Đang chờ đợi", "Thư rác", "Không dính", "lâu đời nhất", "muộn nhất", "nóng nhất", "What do you think?", "Bình luận của bạn đang được xem xét và hiện chỉ hiển thị với bạn. Nó sẽ được công khai sau khi được phê duyệt.", "Đăng ký nhận xét của bài viết này", "Đăng ký nhận xét của trang web này", "Đăng ký nhận xét của bạn"]);
var it = Y(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", `评论字数应在 $0 到 $1 字之间！
当前字数：$2`, "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？", "评论正在审核中，当前仅自己可见，审核通过后公开可见。", "订阅本文评论", "订阅本站评论", "订阅你的评论回复"]);
var ba = Y(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎留言", "來發留言吧~", "送出", "喜歡", "取消喜歡", "回覆", "取消回覆", "留言", "重整", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登入", "登出", "管理者", "置頂", "字", `留言字數應在 $0 到 $1 字之間！
目前字數：$2`, "匿名", "潛水", "冒泡", "吐槽", "活躍", "多話", "傳說", "表情包", "搜尋表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "最早", "最新", "熱門", "你認為這篇文章怎麼樣？", "您的評論正在審核中，目前僅您可見。審核通過後將公開顯示。", "訂閱此文章的評論", "訂閱本站的評論", "訂閱您的評論回覆"]);
var st = "en-US";
var ke2 = { zh: it, "zh-cn": it, "zh-tw": ba, en: Qe2, "en-us": Qe2, fr: tt2, "fr-fr": tt2, it: at, "it-it": at, jp: nt2, "jp-jp": nt2, ko: lt, "ko-kr": lt, "pt-br": ya, ru: rt, "ru-ru": rt, vi: ot, "vi-vn": ot, de: wa, es: et2, "es-mx": et2 };
var ct = (e2) => ke2[e2.toLowerCase()] ?? ke2[st.toLowerCase()];
var ut = (e2) => Object.keys(ke2).includes(e2.toLowerCase()) ? e2 : st;
var mt = { latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc" };
var ka = Object.keys(mt);
var Ce2 = Symbol("waline-config");
var vt = (e2) => {
  try {
    return decodeURI(e2);
  } catch {
    return e2;
  }
};
var dt = (e2 = "") => e2.replace(/\/$/u, "");
var pt = (e2) => /^(https?:)?\/\//.test(e2);
var $e2 = (e2) => {
  const a = dt(e2);
  return pt(a) ? a : `https://${a}`;
};
var Ca = (e2) => Array.isArray(e2) ? e2 : typeof e2 == "number" ? [0, e2] : false;
var de2 = (e2, a) => e2 == null || e2 === true ? a : e2 === false ? null : e2;
var $a = ({ serverURL: e2, path: a = location.pathname, lang: t2 = typeof navigator > "u" ? "en-US" : navigator.language, locale: l, meta: n2 = ["nick", "mail", "link"], requiredMeta: i2 = [], dark: p2 = false, pageSize: r2 = 10, wordLimit: s, noCopyright: S = false, noRss: u4 = false, login: h2 = "enable", recaptchaV3Key: M2 = "", turnstileKey: j3 = "", commentSorting: f2 = "latest", emoji: E2 = Ye2, imageUploader: R2, highlighter: m3, texRenderer: _2, search: T2, reaction: I2, ...z2 }) => ({ serverURL: $e2(e2), path: vt(a), lang: ut(t2), locale: { ...ct(ut(t2)), ...typeof l == "object" ? l : {} }, wordLimit: Ca(s), meta: Xe2(n2), requiredMeta: Xe2(i2), dark: p2, pageSize: r2, commentSorting: f2, login: h2, noCopyright: S, noRss: u4, recaptchaV3Key: M2, turnstileKey: j3, ...z2, reaction: I2 === true ? ia : I2 || null, imageUploader: de2(R2, sa), highlighter: de2(m3, ha), texRenderer: de2(_2, ca), emoji: de2(E2, Ye2), search: de2(T2, ua(t2)) });
var ue2 = (e2) => typeof e2 == "string";
var Ue2 = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}";
var La = (e2) => ue2(e2) ? e2 === "auto" ? `@media(prefers-color-scheme:dark){body${Ue2}}` : `${e2}${Ue2}` : e2 === true ? `:root${Ue2}` : "";
var _e2 = (e2, a) => {
  let t2 = e2.toString();
  for (; t2.length < a; ) t2 = `0${t2}`;
  return t2;
};
var Sa = (e2) => {
  const a = _e2(e2.getDate(), 2), t2 = _e2(e2.getMonth() + 1, 2);
  return `${_e2(e2.getFullYear(), 2)}-${t2}-${a}`;
};
var Ra = (e2, a, t2) => {
  if (!e2) return "";
  const l = ue2(e2) ? new Date(e2.includes(" ") ? e2.replaceAll("-", "/") : e2) : e2, n2 = a.getTime() - l.getTime(), i2 = Math.floor(n2 / (24 * 3600 * 1e3));
  if (i2 === 0) {
    const p2 = n2 % 864e5, r2 = Math.floor(p2 / (3600 * 1e3));
    if (r2 === 0) {
      const s = p2 % 36e5, S = Math.floor(s / (60 * 1e3));
      if (S === 0) {
        const u4 = s % 6e4;
        return `${Math.round(u4 / 1e3)} ${t2.seconds}`;
      }
      return `${S} ${t2.minutes}`;
    }
    return `${r2} ${t2.hours}`;
  }
  return i2 < 0 ? t2.now : i2 < 8 ? `${i2} ${t2.days}` : Sa(l);
};
var Ia = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Ea = (e2) => Ia.test(e2);
var Aa = "WALINE_EMOJI";
var gt = useStorage(Aa, {});
var Ma = (e2) => /@[0-9]+\.[0-9]+\.[0-9]+/.test(e2);
var xa = (e2) => {
  const a = Ma(e2);
  if (a) {
    const t2 = gt.value[e2];
    if (t2) return Promise.resolve(t2);
  }
  return fetch(`${e2}/info.json`).then((t2) => t2.json()).then((t2) => {
    const l = { folder: e2, ...t2 };
    return a && (gt.value[e2] = l), l;
  });
};
var ht = (e2, a = "", t2 = "", l = "") => `${a ? `${a}/` : ""}${t2}${e2}${l ? `.${l}` : ""}`;
var za = (e2) => Promise.all(e2 ? e2.map((a) => ue2(a) ? xa(dt(a)) : Promise.resolve(a)) : []).then((a) => {
  const t2 = { tabs: [], map: {} };
  return a.forEach((l) => {
    const { name: n2, folder: i2, icon: p2, prefix: r2 = "", type: s, items: S } = l;
    t2.tabs.push({ name: n2, icon: ht(p2, i2, r2, s), items: S.map((u4) => {
      const h2 = `${r2}${u4}`;
      return t2.map[h2] = ht(u4, i2, r2, s), h2;
    }) });
  }), t2;
});
var ft = (e2) => {
  e2.name !== "AbortError" && console.error(e2.message);
};
var Le2 = (e2) => e2 instanceof HTMLElement ? e2 : ue2(e2) ? document.querySelector(e2) : null;
var wt = (e2) => {
  const a = [...e2].find((t2) => t2.type.includes("image"));
  return a ? a.getAsFile() : null;
};
var Ua = /\$.*?\$/;
var _a2 = /^\$(.*?)\$/;
var ja = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;
var Va = (e2) => [{ name: "blockMath", level: "block", tokenizer(a) {
  const t2 = ja.exec(a);
  if (t2 != null) return { type: "html", raw: t2[0], text: e2(true, t2[1]) };
} }, { name: "inlineMath", level: "inline", start(a) {
  const t2 = a.search(Ua);
  return t2 === -1 ? a.length : t2;
}, tokenizer(a) {
  const t2 = _a2.exec(a);
  if (t2 != null) return { type: "html", raw: t2[0], text: e2(false, t2[1]) };
} }];
var yt = (e2 = "", a = {}) => e2.replaceAll(/:(.+?):/g, (t2, l) => a[l] ? `<img class="wl-emoji" src="${a[l]}" alt="${l}">` : t2);
var Ha = (e2, { emojiMap: a, highlighter: t2, texRenderer: l }) => {
  const n2 = new D();
  if (n2.setOptions({ breaks: true }), t2 && n2.use(markedHighlight({ highlight: t2 })), l) {
    const i2 = Va(l);
    n2.use({ extensions: i2 });
  }
  return n2.parse(yt(e2, a));
};
var je2 = (e2) => {
  const { path: a } = e2.dataset;
  return a != null && a.length ? a : null;
};
var Fa = (e2) => e2.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu);
var Ta = (e2) => e2.match(/[\u4E00-\u9FD5]/gu);
var Na = (e2) => {
  var a, t2;
  return (((a = Fa(e2)) == null ? void 0 : a.reduce((l, n2) => l + (["", ",", "."].includes(n2.trim()) ? 0 : n2.trim().split(/\s+/u).length), 0)) ?? 0) + (((t2 = Ta(e2)) == null ? void 0 : t2.length) ?? 0);
};
var Ba = async () => {
  const { userAgentData: e2 } = navigator;
  let a = navigator.userAgent;
  if ((e2 == null ? void 0 : e2.platform) !== "Windows") return a;
  const { platformVersion: t2 } = await e2.getHighEntropyValues(["platformVersion"]);
  return t2 && Number.parseInt(t2.split(".")[0], 10) >= 13 && (a = a.replace("Windows NT 10.0", "Windows NT 11.0")), a;
};
var bt = ({ serverURL: e2, path: a = window.location.pathname, selector: t2 = ".waline-comment-count", lang: l = navigator.language }) => {
  const n2 = new AbortController(), i2 = document.querySelectorAll(t2);
  return i2.length > 0 && U({ serverURL: $e2(e2), paths: Array.from(i2, (p2) => vt(je2(p2) ?? a)), lang: l, signal: n2.signal }).then((p2) => {
    i2.forEach((r2, s) => {
      r2.textContent = p2[s].toString();
    });
  }).catch(ft), n2.abort.bind(n2);
};
var kt = ({ size: e2 }) => h("svg", { class: "wl-close-icon", viewBox: "0 0 1024 1024", width: e2, height: e2 }, [h("path", { d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z", fill: "currentColor" }), h("path", { d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z", fill: "#888" })]);
var Pa = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z", fill: "red" }));
var Wa = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z", fill: "currentColor" }));
var Da = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z", fill: "currentColor" }), h("path", { d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z", fill: "currentColor" })]);
var qa = ({ active: e2 = false }) => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e2 ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`, fill: e2 ? "red" : "currentColor" })]);
var Ga = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0", fill: "currentColor" }), h("path", { d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0", fill: "currentColor" })]);
var Oa = () => h("svg", { width: "16", height: "16", ariaHidden: "true" }, h("path", { d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z", fill: "currentColor" }));
var Ka = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z", fill: "currentColor" }));
var Za = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z", fill: "currentColor" }));
var Xa = () => h("svg", { class: "verified-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, h("path", { d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z", fill: "#27ae60" }));
var Ya = () => h("svg", { class: "administrator-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, [h("path", { d: "M461.6 129.56C489.6 105.96 534.8 105.96 562.4 129.56L625.6 183.96C637.6 194.36 660.4 202.76 676 202.76H744C786.4 202.76 821.2 237.56 821.2 279.96V347.96C821.2 363.96 829.6 386.36 840 398.36L894.4 461.56C918 489.16 918 534.76 894.8 562.36L840.4 625.56C830 637.56 821.6 660.36 821.6 675.96V743.96C821.6 786.36 786.8 821.16 744.4 821.16H676.4C660.4 821.16 638 829.56 626 839.96L562.8 894.36C534.8 917.96 489.6 917.96 462 894.36L398.8 839.96C386.8 829.56 364 821.16 348.4 821.16H279.2C236.8 821.16 202 786.36 202 743.96V675.56C201.999 659.96 193.6 637.56 183.6 625.56L129.6 561.96C106.4 534.36 106.4 489.56 129.6 461.96L183.6 398.36C193.6 386.359 202 363.959 202 348.36V279.96C202 237.56 236.8 202.76 279.2 202.76H348.4C364 202.76 386.8 194.36 398.8 184.36L461.6 129.56ZM549.567 331.896C530.047 303.082 486.645 306.12 471.433 337.412L442.175 396.526C435.587 409.848 422.856 419.097 408.146 421.226L342.706 430.726C340.776 431 338.884 431.397 336.993 431.946C303.482 441.361 292.756 483.493 317.671 507.812L364.975 553.96C375.623 564.321 380.507 579.299 377.991 593.954L366.917 659.102C366.595 661.03 366.355 662.967 366.279 664.923C364.906 699.688 401.683 722.937 432.514 706.738L491.05 675.966C504.217 669.068 519.954 669.069 533.121 675.966L591.675 706.738C593.406 707.645 595.174 708.432 597.028 709.104C629.666 721.205 663.139 693.382 657.273 659.102L646.069 593.954C643.42 579.176 648.24 564.083 659.001 553.6L706.315 507.461C707.687 506.118 708.994 504.66 710.215 503.127C731.779 475.809 715.737 435.41 681.281 430.365L615.839 420.874C601.13 418.745 588.4 409.486 581.821 396.174L552.562 337.052C551.644 335.284 550.674 333.551 549.567 331.896Z", fill: "#f59831" })]);
var pe2 = ({ size: e2 = 100 }) => h("svg", { width: e2, height: e2, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, h("circle", { cx: 50, cy: 50, fill: "none", stroke: "currentColor", strokeWidth: "4", r: "40", "stroke-dasharray": "85 30" }, h("animateTransform", { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 50 50;360 50 50", keyTimes: "0;1" })));
var Ja = () => h("svg", { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" }, [h("path", { style: "transform: translateY(0.5px)", d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z" }), h("path", { d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z" })]);
var Ct = () => h("svg", { width: "16", height: "16", viewBox: "0 0 24 24" }, h("g", { transform: "translate(0 -1028.4)" }, h("g", {}, [h("path", { d: "m4 1031.4c-1.1046 0-2 0.9-2 2v16c0 1.1 0.8954 2 2 2h16c1.105 0 2-0.9 2-2v-16c0-1.1-0.895-2-2-2h-16z", fill: "#d35400" }), h("path", { d: "m4 2c-1.1046 0-2 0.8954-2 2v16c0 1.105 0.8954 2 2 2h16c1.105 0 2-0.895 2-2v-16c0-1.1046-0.895-2-2-2h-16z", transform: "translate(0 1028.4)", fill: "#e67e22" }), h("path", { d: "m5 1034.4v2.3c6.443 0 11.667 5.2 11.667 11.7h2.333c0-7.8-6.268-14-14-14zm0 4.6v2.4c3.866 0 7 3.1 7 7h2.333c0-5.2-4.178-9.4-9.333-9.4zm2.0417 5.3c-1.1276 0-2.0417 0.9-2.0417 2s0.9141 2.1 2.0417 2.1c1.1275 0 2.0416-1 2.0416-2.1s-0.9141-2-2.0416-2z", fill: "#d35400" }), h("path", { d: "m5 1033.4v2.3c6.443 0 11.667 5.2 11.667 11.7h2.333c0-7.8-6.268-14-14-14zm0 4.6v2.4c3.866 0 7 3.1 7 7h2.333c0-5.2-4.178-9.4-9.333-9.4zm2.0417 5.3c-1.1276 0-2.0417 0.9-2.0417 2s0.9141 2.1 2.0417 2.1c1.1275 0 2.0416-1 2.0416-2.1s-0.9141-2-2.0416-2z", fill: "#ecf0f1" })])));
var Qa = () => h("svg", { fill: "currentColor", width: "24", height: "24", viewBox: "-3 0 19 19", class: "cf-icon-svg" }, h("path", { d: "M.926 12.818a1.403 1.403 0 1 1 0 1.984 1.402 1.402 0 0 1 0-1.984zm10.531 2.357a1.03 1.03 0 0 1-1.029-1.03 8.775 8.775 0 0 0-.694-3.438A8.826 8.826 0 0 0 1.591 5.31a1.03 1.03 0 1 1 0-2.059 10.817 10.817 0 0 1 4.24.857 10.893 10.893 0 0 1 3.463 2.334 10.867 10.867 0 0 1 3.19 7.703 1.027 1.027 0 0 1-1.027 1.029zm-4.538 0a1.03 1.03 0 0 1-1.029-1.03 4.297 4.297 0 0 0-4.299-4.298 1.03 1.03 0 0 1 0-2.059 6.362 6.362 0 0 1 5.857 3.883 6.298 6.298 0 0 1 .5 2.475 1.03 1.03 0 0 1-1.029 1.029z" }));
var en = () => useStorage("WALINE_USER_META", { nick: "", mail: "", link: "" });
var tn = () => useStorage("WALINE_COMMENT_BOX_EDITOR", "");
var an = "WALINE_LIKE";
var nn = useStorage(an, []);
var $t = () => nn;
var ln = "WALINE_REACTION";
var rn = useStorage(ln, {});
var Lt = () => rn;
var St = {};
var on = (e2) => {
  const a = St[e2] ?? (St[e2] = (0, import_recaptcha_v3.load)(e2, { useRecaptchaNet: true, autoHideBadge: true }));
  return { execute: (t2) => a.then((l) => l.execute(t2)) };
};
var sn = (e2) => ({ execute: async (a) => {
  const { load: t2 } = useScriptTag("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, { async: false });
  await t2();
  const { turnstile: l } = window;
  return new Promise((n2) => {
    l == null || l.ready(() => {
      l.render(".wl-captcha-container", { sitekey: e2, action: a, size: "compact", callback: n2 });
    });
  });
} });
var cn = "WALINE_USER";
var un = useStorage(cn, {});
var Se2 = () => un;
var mn = { key: 0, class: "wl-reaction" };
var vn = ["textContent"];
var dn = { class: "wl-reaction-list" };
var pn = ["onClick"];
var gn = { class: "wl-reaction-img" };
var hn = ["src", "alt"];
var fn = ["textContent"];
var wn = ["textContent"];
var yn = defineComponent({ __name: "ArticleReaction", setup(e2) {
  const a = Lt(), t2 = inject(Ce2), l = ref(-1), n2 = ref([]), i2 = computed(() => t2.value.locale), p2 = computed(() => {
    const { reaction: h2 } = t2.value;
    return h2 != null && h2.length ? h2 : null;
  }), r2 = computed(() => {
    var h2;
    const { path: M2 } = t2.value;
    return ((h2 = p2.value) == null ? void 0 : h2.map((j3, f2) => ({ icon: j3, desc: i2.value[`reaction${f2}`], active: a.value[M2] === f2 }))) ?? null;
  });
  let s;
  const S = async () => {
    const { serverURL: h2, lang: M2, path: j3 } = t2.value;
    if (!p2.value) return;
    const f2 = new AbortController();
    s = f2.abort.bind(f2);
    const [E2] = await m({ serverURL: h2, lang: M2, paths: [j3], type: p2.value.map((R2, m3) => `reaction${m3}`), signal: f2.signal });
    n2.value = p2.value.map((R2, m3) => E2[`reaction${m3}`]);
  }, u4 = async (h2) => {
    if (l.value !== -1) return;
    const { serverURL: M2, lang: j3, path: f2 } = t2.value, E2 = a.value[f2];
    l.value = h2, E2 != null && (await p({ serverURL: M2, lang: j3, path: f2, type: `reaction${E2}`, action: "desc" }), n2.value[E2] = Math.max(n2.value[E2] - 1, 0)), E2 !== h2 && (await p({ serverURL: M2, lang: j3, path: f2, type: `reaction${h2}` }), n2.value[h2] = (n2.value[h2] || 0) + 1), E2 === h2 ? delete a.value[f2] : a.value[f2] = h2, l.value = -1;
  };
  return onMounted(() => {
    watchImmediate(() => [t2.value.serverURL, t2.value.path], () => S());
  }), onUnmounted(() => {
    s == null || s();
  }), (h2, M2) => r2.value ? (openBlock(), createElementBlock("div", mn, [createBaseVNode("div", { class: "wl-reaction-title", textContent: toDisplayString(i2.value.reactionTitle) }, null, 8, vn), createBaseVNode("ul", dn, [(openBlock(true), createElementBlock(Fragment, null, renderList(r2.value, ({ active: j3, icon: f2, desc: E2 }, R2) => (openBlock(), createElementBlock("li", { key: R2, class: normalizeClass(["wl-reaction-item", { active: j3 }]), onClick: (m3) => u4(R2) }, [createBaseVNode("div", gn, [createBaseVNode("img", { src: f2, alt: E2 }, null, 8, hn), l.value === R2 ? (openBlock(), createBlock(unref(pe2), { key: 0, class: "wl-reaction-loading" })) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-reaction-votes", textContent: toDisplayString(n2.value[R2] || 0) }, null, 8, fn))]), createBaseVNode("div", { class: "wl-reaction-text", textContent: toDisplayString(E2) }, null, 8, wn)], 10, pn))), 128))])])) : createCommentVNode("v-if", true);
} });
var bn = ["data-index"];
var kn = ["src", "title", "onClick"];
var Cn = defineComponent({ __name: "ImageWall", props: { items: { default: () => [] }, columnWidth: { default: 300 }, gap: { default: 0 } }, emits: ["insert"], setup(e2) {
  let a = null;
  const t2 = useTemplateRef("wall"), l = ref({}), n2 = ref([]), i2 = () => {
    const u4 = Math.floor((t2.value.getBoundingClientRect().width + e2.gap) / (e2.columnWidth + e2.gap));
    return u4 > 0 ? u4 : 1;
  }, p2 = (u4) => Array.from({ length: u4 }, () => []), r2 = async (u4) => {
    var h2;
    if (u4 >= e2.items.length) return;
    await nextTick();
    const M2 = [...((h2 = t2.value) == null ? void 0 : h2.children) ?? []].reduce((j3, f2) => f2.getBoundingClientRect().height < j3.getBoundingClientRect().height ? f2 : j3);
    n2.value[Number(M2.dataset.index)].push(u4), await r2(u4 + 1);
  }, s = async (u4 = false) => {
    if (n2.value.length === i2() && !u4) return;
    n2.value = p2(i2());
    const { scrollY: h2 } = window;
    await r2(0), window.scrollTo({ top: h2 });
  }, S = (u4) => {
    l.value[u4.target.src] = true;
  };
  return onMounted(() => {
    s(true), a = new ResizeObserver(() => {
      s();
    }), a.observe(t2.value), watch(() => [e2.items], () => {
      l.value = {}, s(true);
    }), watch(() => [e2.columnWidth, e2.gap], () => {
      s();
    });
  }), onBeforeUnmount(() => {
    a.unobserve(t2.value);
  }), (u4, h2) => (openBlock(), createElementBlock("div", { ref_key: "wall", ref: t2, class: "wl-gallery", style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n2.value, (M2, j3) => (openBlock(), createElementBlock("div", { key: j3, class: "wl-gallery-column", "data-index": j3, style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(M2, (f2) => (openBlock(), createElementBlock(Fragment, { key: f2 }, [l.value[e2.items[f2].src] ? createCommentVNode("v-if", true) : (openBlock(), createBlock(unref(pe2), { key: 0, size: 36, style: { margin: "20px auto" } })), createBaseVNode("img", { class: "wl-gallery-item", src: e2.items[f2].src, title: e2.items[f2].title, loading: "lazy", onLoad: S, onClick: (E2) => u4.$emit("insert", `![](${e2.items[f2].src})`) }, null, 40, kn)], 64))), 128))], 12, bn))), 128))], 4));
} });
var $n = { key: 0, class: "wl-login-info" };
var Ln = { class: "wl-avatar" };
var Sn = ["title"];
var Rn = ["title"];
var In = ["src"];
var En = ["title", "textContent"];
var An = { class: "wl-panel" };
var Mn = ["for", "textContent"];
var xn = ["id", "onUpdate:modelValue", "name", "type"];
var zn = ["placeholder"];
var Un = { class: "wl-preview" };
var _n = ["innerHTML"];
var jn = { class: "wl-footer" };
var Vn = { class: "wl-actions" };
var Hn = { href: "https://guides.github.com/features/mastering-markdown/", title: "Markdown Guide", "aria-label": "Markdown is supported", class: "wl-action", target: "_blank", rel: "noopener noreferrer" };
var Fn = ["title"];
var Tn = ["title"];
var Nn = ["title", "aria-label"];
var Bn = ["title"];
var Pn = { class: "wl-info" };
var Wn = { class: "wl-text-number" };
var Dn = { key: 0 };
var qn = ["textContent"];
var Gn = ["textContent"];
var On = ["disabled"];
var Kn = ["placeholder"];
var Zn = { key: 1, class: "wl-loading" };
var Xn = ["title", "onClick", "onMouseenter"];
var Yn = ["src", "alt"];
var Jn = ["src"];
var Qn = { key: 0, class: "wl-tabs" };
var el = ["onClick"];
var tl = ["src", "alt", "title"];
var al = ["title"];
var Rt = defineComponent({ __name: "CommentBox", props: { edit: {}, rootId: {}, replyId: {}, replyUser: {} }, emits: ["log", "cancelEdit", "cancelReply", "submit"], setup(e2, { emit: a }) {
  const t2 = e2, l = a, n2 = inject(Ce2), i2 = tn(), p2 = en(), r2 = Se2(), s = ref({}), S = useTemplateRef("textarea"), u4 = useTemplateRef("image-uploader"), h2 = useTemplateRef("emoji-button"), M2 = useTemplateRef("emoji-popup"), j3 = useTemplateRef("gif-button"), f2 = useTemplateRef("gif-popup"), E2 = useTemplateRef("gif-search"), R2 = ref({ tabs: [], map: {} }), m3 = ref(0), _2 = ref(false), T2 = ref(""), I2 = ref({});
  let z2;
  const le2 = (g2, c2) => {
    clearTimeout(z2), T2.value = c2;
    const y3 = g2.currentTarget, H2 = M2.value;
    if (y3 && H2) {
      const w3 = y3.getBoundingClientRect(), D2 = H2.getBoundingClientRect();
      I2.value = { left: `${w3.left - D2.left + w3.width / 2}px`, top: `${w3.top - D2.top}px`, transform: "translate(-50%, -100%)" };
    }
  }, re2 = () => {
    z2 = setTimeout(() => {
      T2.value = "";
    }, 50);
  }, J2 = ref(false), oe2 = ref(false), me = ref(""), k2 = ref(0), C3 = reactive({ loading: true, list: [] }), U3 = ref(0), V2 = ref(false), O2 = ref(""), P2 = ref(false), ae2 = ref(false), F2 = computed(() => n2.value.locale), ie2 = computed(() => !!r2.value.token), ge2 = computed(() => n2.value.imageUploader != null), Re2 = (g2) => {
    const c2 = S.value, y3 = c2.selectionStart, H2 = c2.selectionEnd || 0, { scrollTop: w3 } = c2;
    i2.value = c2.value.slice(0, y3) + g2 + c2.value.slice(H2), c2.focus(), c2.selectionStart = y3 + g2.length, c2.selectionEnd = y3 + g2.length, c2.scrollTop = w3;
  }, zt = ({ key: g2, ctrlKey: c2, metaKey: y3 }) => {
    P2.value || (c2 || y3) && g2 === "Enter" && He2();
  }, Ie2 = async (g2) => {
    const c2 = `![${n2.value.locale.uploading} ${g2.name}]()`;
    Re2(c2), P2.value = true;
    try {
      const y3 = await n2.value.imageUploader(g2);
      i2.value = i2.value.replace(c2, `\r
![${g2.name}](${y3})`);
    } catch (y3) {
      alert(y3.message), i2.value = i2.value.replace(c2, "");
    } finally {
      P2.value = false;
    }
  }, Ut2 = (g2) => {
    var c2;
    if ((c2 = g2.dataTransfer) != null && c2.items) {
      const y3 = wt(g2.dataTransfer.items);
      y3 && ge2.value && (Ie2(y3), g2.preventDefault());
    }
  }, _t = (g2) => {
    if (g2.clipboardData) {
      const c2 = wt(g2.clipboardData.items);
      c2 && ge2.value && Ie2(c2);
    }
  }, jt2 = () => {
    const g2 = u4.value;
    g2.files && ge2.value && Ie2(g2.files[0]).then(() => {
      g2.value = "";
    });
  }, He2 = async () => {
    var g2;
    const { serverURL: c2, lang: y3, login: H2, wordLimit: w3, requiredMeta: D2, recaptchaV3Key: q2, turnstileKey: X2 } = n2.value, N2 = { comment: O2.value, nick: p2.value.nick, mail: p2.value.mail, link: p2.value.link, url: n2.value.path, ua: await Ba() };
    if (!t2.edit) if (r2.value.token) N2.nick = r2.value.display_name, N2.mail = r2.value.email, N2.link = r2.value.url;
    else {
      if (H2 === "force") return;
      if (D2.includes("nick") && !N2.nick) {
        s.value.nick.focus(), alert(F2.value.nickError);
        return;
      }
      if (D2.includes("mail") && !N2.mail || N2.mail && !Ea(N2.mail)) {
        s.value.mail.focus(), alert(F2.value.mailError);
        return;
      }
      N2.nick || (N2.nick = F2.value.anonymous);
    }
    if (!N2.comment) {
      S.value.focus();
      return;
    }
    if (!V2.value) {
      alert(F2.value.wordHint.replace("$0", w3[0].toString()).replace("$1", w3[1].toString()).replace("$2", k2.value.toString()));
      return;
    }
    N2.comment = yt(N2.comment, R2.value.map), t2.replyId && t2.rootId && (N2.pid = t2.replyId, N2.rid = t2.rootId, N2.at = t2.replyUser), P2.value = true;
    try {
      q2 && (N2.recaptchaV3 = await on(q2).execute("social")), X2 && (N2.turnstile = await sn(X2).execute("social"));
      const he2 = { serverURL: c2, lang: y3, token: r2.value.token, comment: N2 }, Ee2 = await (t2.edit ? f({ objectId: t2.edit.objectId, ...he2 }) : u(he2));
      if (P2.value = false, Ee2.errmsg) {
        alert(Ee2.errmsg);
        return;
      }
      l("submit", Ee2.data), i2.value = "", me.value = "", await nextTick(), t2.replyId && l("cancelReply"), (g2 = t2.edit) != null && g2.objectId && l("cancelEdit");
    } catch (he2) {
      P2.value = false, alert(he2.message);
    }
  }, Vt = (g2) => {
    g2.preventDefault();
    const { lang: c2, serverURL: y3 } = n2.value;
    w({ serverURL: y3, lang: c2 }).then((H2) => {
      r2.value = H2, (H2.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(H2)), l("log");
    });
  }, Ht = () => {
    r2.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), l("log");
  }, Fe2 = (g2) => {
    g2.preventDefault();
    const { lang: c2, serverURL: y3 } = n2.value, H2 = 800, w3 = 800, D2 = (window.innerWidth - H2) / 2, q2 = (window.innerHeight - w3) / 2, X2 = new URLSearchParams({ lng: c2, token: r2.value.token }), N2 = window.open(`${y3}/ui/profile?${X2.toString()}`, "_blank", `width=${H2},height=${w3},left=${D2},top=${q2},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
    N2 == null || N2.postMessage({ type: "TOKEN", data: r2.value.token }, "*");
  }, Ft2 = (g2) => {
    var c2, y3, H2, w3;
    !((c2 = h2.value) != null && c2.contains(g2.target)) && !((y3 = M2.value) != null && y3.contains(g2.target)) && (_2.value = false), !((H2 = j3.value) != null && H2.contains(g2.target)) && !((w3 = f2.value) != null && w3.contains(g2.target)) && (J2.value = false);
  }, Te2 = async (g2) => {
    var c2;
    const { scrollTop: y3, clientHeight: H2, scrollHeight: w3 } = g2.target, D2 = (H2 + y3) / w3, q2 = n2.value.search, X2 = ((c2 = E2.value) == null ? void 0 : c2.value) ?? "";
    D2 < 0.9 || C3.loading || ae2.value || (C3.loading = true, (q2.more && C3.list.length > 0 ? await q2.more(X2, C3.list.length) : await q2.search(X2)).length > 0 ? C3.list = [...C3.list, ...q2.more && C3.list.length > 0 ? await q2.more(X2, C3.list.length) : await q2.search(X2)] : ae2.value = true, C3.loading = false, setTimeout(() => {
      g2.target.scrollTop = y3;
    }, 50));
  }, Ne2 = useDebounceFn((g2) => {
    C3.list = [], ae2.value = false, Te2(g2);
  }, 300);
  return useEventListener("click", Ft2), useEventListener("message", ({ data: g2 }) => {
    (g2 == null ? void 0 : g2.type) === "profile" && (r2.value = { ...r2.value, ...g2.data }, [localStorage, sessionStorage].filter((c2) => c2.getItem("WALINE_USER")).forEach((c2) => {
      c2.setItem("WALINE_USER", JSON.stringify(r2));
    }));
  }), watchImmediate([n2, k2], ([g2, c2]) => {
    const { wordLimit: y3 } = g2;
    y3 ? c2 < y3[0] && y3[0] !== 0 ? ([U3.value] = y3, V2.value = false) : c2 > y3[1] ? ([, U3.value] = y3, V2.value = false) : ([, U3.value] = y3, V2.value = true) : (U3.value = 0, V2.value = true);
  }), watch(J2, async (g2) => {
    var c2;
    if (!g2) return;
    const y3 = n2.value.search;
    E2.value && (E2.value.value = ""), C3.loading = true, C3.list = await (((c2 = y3.default) == null ? void 0 : c2.call(y3)) ?? y3.search("")), C3.loading = false;
  }), onMounted(() => {
    var g2;
    (g2 = t2.edit) != null && g2.objectId && (i2.value = t2.edit.orig), watchImmediate(() => i2.value, (c2) => {
      const { highlighter: y3, texRenderer: H2 } = n2.value;
      O2.value = c2, me.value = Ha(c2, { emojiMap: R2.value.map, highlighter: y3, texRenderer: H2 }), k2.value = Na(c2), c2 ? autosize_esm_default(S.value) : autosize_esm_default.destroy(S.value);
    }), watchImmediate(() => n2.value.emoji, async (c2) => {
      R2.value = await za(c2);
    });
  }), (g2, c2) => {
    var y3, H2;
    return openBlock(), createElementBlock("div", { key: unref(r2).token, class: "wl-comment" }, [unref(n2).login !== "disable" && ie2.value && !((y3 = e2.edit) != null && y3.objectId) ? (openBlock(), createElementBlock("div", $n, [createBaseVNode("div", Ln, [createBaseVNode("button", { type: "submit", class: "wl-logout-btn", title: F2.value.logout, onClick: Ht }, [createVNode(unref(kt), { size: 14 })], 8, Sn), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: F2.value.profile, onClick: Fe2 }, [createBaseVNode("img", { src: unref(r2).avatar, alt: "avatar" }, null, 8, In)], 8, Rn)]), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: F2.value.profile, onClick: Fe2, textContent: toDisplayString(unref(r2).display_name) }, null, 8, En)])) : createCommentVNode("v-if", true), createBaseVNode("div", An, [unref(n2).login !== "force" && unref(n2).meta.length && !ie2.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["wl-header", `item${unref(n2).meta.length}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(n2).meta, (w3) => (openBlock(), createElementBlock("div", { key: w3, class: "wl-header-item" }, [createBaseVNode("label", { for: `wl-${w3}`, textContent: toDisplayString(F2.value[w3] + (unref(n2).requiredMeta.includes(w3) || !unref(n2).requiredMeta.length ? "" : `(${F2.value.optional})`)) }, null, 8, Mn), withDirectives(createBaseVNode("input", { id: `wl-${w3}`, ref_for: true, ref: (D2) => {
      D2 && (s.value[w3] = D2);
    }, "onUpdate:modelValue": (D2) => unref(p2)[w3] = D2, class: normalizeClass(["wl-input", `wl-${w3}`]), name: w3, type: w3 === "mail" ? "email" : "text" }, null, 10, xn), [[vModelDynamic, unref(p2)[w3]]])]))), 128))], 2)) : createCommentVNode("v-if", true), withDirectives(createBaseVNode("textarea", { id: "wl-edit", ref: "textarea", "onUpdate:modelValue": c2[0] || (c2[0] = (w3) => isRef(i2) ? i2.value = w3 : null), class: "wl-editor", placeholder: e2.replyUser ? `@${e2.replyUser}` : F2.value.placeholder, onKeydown: zt, onDrop: Ut2, onPaste: _t }, null, 40, zn), [[vModelText, unref(i2)]]), withDirectives(createBaseVNode("div", Un, [c2[7] || (c2[7] = createBaseVNode("hr", null, null, -1)), createBaseVNode("h4", null, toDisplayString(F2.value.preview) + ":", 1), createBaseVNode("div", { class: "wl-content", innerHTML: me.value }, null, 8, _n)], 512), [[vShow, oe2.value]]), createBaseVNode("div", jn, [createBaseVNode("div", Vn, [createBaseVNode("a", Hn, [createVNode(unref(Oa))]), withDirectives(createBaseVNode("button", { ref: "emoji-button", type: "button", class: normalizeClass(["wl-action", { active: _2.value }]), title: F2.value.emoji, onClick: c2[1] || (c2[1] = (w3) => _2.value = !_2.value) }, [createVNode(unref(Wa))], 10, Fn), [[vShow, R2.value.tabs.length]]), unref(n2).search ? (openBlock(), createElementBlock("button", { key: 0, ref: "gif-button", type: "button", class: normalizeClass(["wl-action", { active: J2.value }]), title: F2.value.gif, onClick: c2[2] || (c2[2] = (w3) => J2.value = !J2.value) }, [createVNode(unref(Ja))], 10, Tn)) : createCommentVNode("v-if", true), createBaseVNode("input", { id: "wl-image-upload", ref: "image-uploader", class: "upload", "aria-hidden": "true", type: "file", accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif", onChange: jt2 }, null, 544), ge2.value ? (openBlock(), createElementBlock("label", { key: 1, for: "wl-image-upload", class: "wl-action", title: F2.value.uploadImage, "aria-label": F2.value.uploadImage }, [createVNode(unref(Da))], 8, Nn)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-action", { active: oe2.value }]), title: F2.value.preview, onClick: c2[3] || (c2[3] = (w3) => oe2.value = !oe2.value) }, [createVNode(unref(Ga))], 10, Bn)]), createBaseVNode("div", Pn, [c2[9] || (c2[9] = createBaseVNode("div", { class: "wl-captcha-container" }, null, -1)), createBaseVNode("div", Wn, [createTextVNode(toDisplayString(k2.value) + " ", 1), unref(n2).wordLimit ? (openBlock(), createElementBlock("span", Dn, [c2[8] || (c2[8] = createTextVNode("  /  ", -1)), createBaseVNode("span", { class: normalizeClass({ illegal: !V2.value }), textContent: toDisplayString(U3.value) }, null, 10, qn)])) : createCommentVNode("v-if", true), createTextVNode("  " + toDisplayString(F2.value.word), 1)]), unref(n2).login !== "disable" && !ie2.value ? (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-btn", onClick: Vt, textContent: toDisplayString(F2.value.login) }, null, 8, Gn)) : createCommentVNode("v-if", true), unref(n2).login !== "force" || ie2.value ? (openBlock(), createElementBlock("button", { key: 1, type: "submit", class: "primary wl-btn", title: "Cmd|Ctrl + Enter", disabled: P2.value, onClick: He2 }, [P2.value ? (openBlock(), createBlock(unref(pe2), { key: 0, size: 16 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(F2.value.submit), 1)], 64))], 8, On)) : createCommentVNode("v-if", true)]), createBaseVNode("div", { ref: "gif-popup", class: normalizeClass(["wl-gif-popup", { display: J2.value }]) }, [createBaseVNode("input", { ref: "gif-search", type: "text", placeholder: F2.value.gifSearchPlaceholder, onInput: c2[4] || (c2[4] = (...w3) => unref(Ne2) && unref(Ne2)(...w3)) }, null, 40, Kn), C3.list.length ? (openBlock(), createBlock(Cn, { key: 0, items: C3.list, "column-width": 200, gap: 6, onInsert: c2[5] || (c2[5] = (w3) => Re2(w3)), onScroll: Te2 }, null, 8, ["items"])) : createCommentVNode("v-if", true), C3.loading ? (openBlock(), createElementBlock("div", Zn, [createVNode(unref(pe2), { size: 30 })])) : createCommentVNode("v-if", true)], 2), createBaseVNode("div", { ref: "emoji-popup", class: normalizeClass(["wl-emoji-popup", { display: _2.value }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(R2.value.tabs, (w3, D2) => (openBlock(), createElementBlock(Fragment, { key: w3.name }, [D2 === m3.value ? (openBlock(), createElementBlock("div", { key: 0, class: "wl-tab-wrapper", onScroll: re2 }, [(openBlock(true), createElementBlock(Fragment, null, renderList(w3.items, (q2) => (openBlock(), createElementBlock("button", { key: q2, type: "button", title: q2, onClick: (X2) => Re2(`:${q2}:`), onMouseenter: (X2) => le2(X2, q2), onMouseleave: re2 }, [_2.value ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-emoji", src: R2.value.map[q2], alt: q2, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Yn)) : createCommentVNode("v-if", true)], 40, Xn))), 128))], 32)) : createCommentVNode("v-if", true)], 64))), 128)), createBaseVNode("div", null, [T2.value ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-emoji-preview", src: R2.value.map[T2.value], alt: "preview", loading: "lazy", referrerPolicy: "no-referrer", style: normalizeStyle(I2.value) }, null, 12, Jn)) : createCommentVNode("v-if", true)]), R2.value.tabs.length > 1 ? (openBlock(), createElementBlock("div", Qn, [(openBlock(true), createElementBlock(Fragment, null, renderList(R2.value.tabs, (w3, D2) => (openBlock(), createElementBlock("button", { key: w3.name, type: "button", class: normalizeClass(["wl-tab", { active: m3.value === D2 }]), onClick: (q2) => m3.value = D2 }, [createBaseVNode("img", { class: "wl-emoji", src: w3.icon, alt: w3.name, title: w3.name, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, tl)], 10, el))), 128))])) : createCommentVNode("v-if", true)], 2)])]), e2.replyId || (H2 = e2.edit) != null && H2.objectId ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-close", title: F2.value.cancelReply, onClick: c2[6] || (c2[6] = (w3) => e2.replyId ? l("cancelReply") : l("cancelEdit")) }, [createVNode(unref(kt), { size: 24 })], 8, al)) : createCommentVNode("v-if", true)]);
  };
} });
var nl = ["id"];
var ll = { class: "wl-user", "aria-hidden": "true" };
var rl = ["src"];
var ol = { class: "wl-card" };
var il = { class: "wl-head" };
var sl = ["href"];
var cl = { key: 1, class: "wl-nick" };
var ul = ["textContent"];
var ml = ["textContent"];
var vl = ["textContent"];
var dl = ["textContent"];
var pl = { class: "wl-comment-actions" };
var gl = ["title", "href"];
var hl = ["title"];
var fl = ["title"];
var wl = { class: "wl-meta", "aria-hidden": "true" };
var yl = ["data-value", "textContent"];
var bl = { key: 0, class: "wl-warning", "aria-hidden": "true" };
var kl = { key: 1, class: "wl-content" };
var Cl = { key: 0, class: "wl-reply-to" };
var $l = ["href"];
var Ll = ["innerHTML"];
var Sl = { key: 2, class: "wl-admin-actions" };
var Rl = { class: "wl-comment-status" };
var Il = ["disabled", "onClick", "textContent"];
var El = { key: 4, class: "wl-quote" };
var Al = defineComponent({ __name: "CommentCard", props: { comment: {}, edit: {}, rootId: {}, reply: {} }, emits: ["log", "submit", "delete", "like", "sticky", "edit", "reply", "status"], setup(e2, { emit: a }) {
  const t2 = a, l = ["approved", "waiting", "spam"], n2 = inject(Ce2), i2 = $t(), p2 = useNow(), r2 = Se2(), s = computed(() => n2.value.locale), S = computed(() => {
    const { link: R2 } = e2.comment;
    return R2 ? pt(R2) ? R2 : `https://${R2}` : "";
  }), u4 = computed(() => i2.value.includes(e2.comment.objectId)), h2 = computed(() => Ra(new Date(e2.comment.time), p2.value, s.value)), M2 = computed(() => r2.value.type === "administrator"), j3 = computed(() => e2.comment.user_id && r2.value.objectId === e2.comment.user_id), f2 = computed(() => {
    var R2;
    return e2.comment.objectId === ((R2 = e2.reply) == null ? void 0 : R2.objectId);
  }), E2 = computed(() => {
    var R2;
    return e2.comment.objectId === ((R2 = e2.edit) == null ? void 0 : R2.objectId);
  });
  return (R2, m3) => {
    var _2;
    const T2 = resolveComponent("CommentCard", true);
    return openBlock(), createElementBlock("div", { id: e2.comment.objectId.toString(), class: "wl-card-item" }, [createBaseVNode("div", ll, [e2.comment.avatar ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-user-avatar", src: e2.comment.avatar, alt: "" }, null, 8, rl)) : createCommentVNode("v-if", true), e2.comment.type === "guest" ? (openBlock(), createBlock(unref(Xa), { key: 1 })) : createCommentVNode("v-if", true), e2.comment.type === "administrator" ? (openBlock(), createBlock(unref(Ya), { key: 2 })) : createCommentVNode("v-if", true)]), createBaseVNode("div", ol, [createBaseVNode("div", il, [S.value ? (openBlock(), createElementBlock("a", { key: 0, class: "wl-nick", href: S.value, target: "_blank", rel: "nofollow noopener noreferrer" }, toDisplayString(e2.comment.nick), 9, sl)) : (openBlock(), createElementBlock("span", cl, toDisplayString(e2.comment.nick), 1)), e2.comment.label ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-badge", textContent: toDisplayString(e2.comment.label) }, null, 8, ul)) : createCommentVNode("v-if", true), e2.comment.sticky ? (openBlock(), createElementBlock("span", { key: 3, class: "wl-badge", textContent: toDisplayString(s.value.sticky) }, null, 8, ml)) : createCommentVNode("v-if", true), typeof e2.comment.level == "number" ? (openBlock(), createElementBlock("span", { key: 4, class: normalizeClass(`wl-badge level${e2.comment.level}`), textContent: toDisplayString(s.value[`level${e2.comment.level}`] || `Level ${e2.comment.level}`) }, null, 10, vl)) : createCommentVNode("v-if", true), createBaseVNode("span", { class: "wl-time", textContent: toDisplayString(h2.value) }, null, 8, dl), createBaseVNode("div", pl, [M2.value || j3.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("button", { type: "button", class: "wl-edit", onClick: m3[0] || (m3[0] = (I2) => t2("edit", e2.comment)) }, [createVNode(unref(Za))]), createBaseVNode("button", { type: "button", class: "wl-delete", onClick: m3[1] || (m3[1] = (I2) => t2("delete", e2.comment)) }, [createVNode(unref(Pa))])], 64)) : createCommentVNode("v-if", true), j3.value && !unref(n2).noRss ? (openBlock(), createElementBlock("a", { key: 1, role: "button", class: "wl-rss", title: s.value.subscribeToReplies, href: `${unref(n2).serverURL}/api/comment/rss?user_id=${e2.comment.user_id}`, target: "_blank", rel: "noopener noreferrer" }, [createVNode(unref(Qa))], 8, gl)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: "wl-like", title: u4.value ? s.value.cancelLike : s.value.like, onClick: m3[2] || (m3[2] = (I2) => t2("like", e2.comment)) }, [createVNode(unref(qa), { active: u4.value }, null, 8, ["active"]), createTextVNode(" " + toDisplayString("like" in e2.comment ? e2.comment.like : ""), 1)], 8, hl), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-reply", { active: f2.value }]), title: f2.value ? s.value.cancelReply : s.value.reply, onClick: m3[3] || (m3[3] = (I2) => t2("reply", f2.value ? null : e2.comment)) }, [createVNode(unref(Ka))], 10, fl)])]), createBaseVNode("div", wl, [(openBlock(), createElementBlock(Fragment, null, renderList(["addr", "browser", "os"], (I2) => (openBlock(), createElementBlock(Fragment, null, [e2.comment[I2] ? (openBlock(), createElementBlock("span", { key: I2, class: normalizeClass(`wl-${I2}`), "data-value": e2.comment[I2], textContent: toDisplayString(e2.comment[I2]) }, null, 10, yl)) : createCommentVNode("v-if", true)], 64))), 64))]), e2.comment.status === "waiting" && !M2.value ? (openBlock(), createElementBlock("div", bl, toDisplayString(s.value.commentUnderReview), 1)) : createCommentVNode("v-if", true), E2.value ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", kl, ["reply_user" in e2.comment && e2.comment.reply_user ? (openBlock(), createElementBlock("div", Cl, [createBaseVNode("a", { href: "#" + e2.comment.pid }, "@" + toDisplayString(e2.comment.reply_user.nick), 9, $l), m3[17] || (m3[17] = createBaseVNode("span", null, ": ", -1))])) : createCommentVNode("v-if", true), createBaseVNode("div", { innerHTML: e2.comment.comment }, null, 8, Ll)])), M2.value && !E2.value ? (openBlock(), createElementBlock("div", Sl, [createBaseVNode("span", Rl, [(openBlock(), createElementBlock(Fragment, null, renderList(l, (I2) => createBaseVNode("button", { key: I2, type: "submit", class: normalizeClass(`wl-btn wl-${I2}`), disabled: e2.comment.status === I2, onClick: (z2) => t2("status", { status: I2, comment: e2.comment }), textContent: toDisplayString(s.value[I2]) }, null, 10, Il)), 64))]), M2.value && !("rid" in e2.comment) ? (openBlock(), createElementBlock("button", { key: 0, type: "submit", class: "wl-btn wl-sticky", onClick: m3[4] || (m3[4] = (I2) => t2("sticky", e2.comment)) }, toDisplayString(e2.comment.sticky ? s.value.unsticky : s.value.sticky), 1)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), f2.value || E2.value ? (openBlock(), createElementBlock("div", { key: 3, class: normalizeClass({ "wl-reply-wrapper": f2.value, "wl-edit-wrapper": E2.value }) }, [createVNode(Rt, { edit: e2.edit, "reply-id": (_2 = e2.reply) == null ? void 0 : _2.objectId, "reply-user": e2.comment.nick, "root-id": e2.rootId, onLog: m3[5] || (m3[5] = (I2) => t2("log")), onCancelReply: m3[6] || (m3[6] = (I2) => t2("reply", null)), onCancelEdit: m3[7] || (m3[7] = (I2) => t2("edit", null)), onSubmit: m3[8] || (m3[8] = (I2) => t2("submit", I2)) }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : createCommentVNode("v-if", true), "children" in e2.comment ? (openBlock(), createElementBlock("div", El, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.comment.children, (I2) => (openBlock(), createBlock(T2, { key: I2.objectId, comment: I2, reply: e2.reply, edit: e2.edit, "root-id": e2.rootId, onLog: m3[9] || (m3[9] = (z2) => t2("log")), onDelete: m3[10] || (m3[10] = (z2) => t2("delete", z2)), onEdit: m3[11] || (m3[11] = (z2) => t2("edit", z2)), onLike: m3[12] || (m3[12] = (z2) => t2("like", z2)), onReply: m3[13] || (m3[13] = (z2) => t2("reply", z2)), onStatus: m3[14] || (m3[14] = (z2) => t2("status", z2)), onSticky: m3[15] || (m3[15] = (z2) => t2("sticky", z2)), onSubmit: m3[16] || (m3[16] = (z2) => t2("submit", z2)) }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : createCommentVNode("v-if", true)])], 8, nl);
  };
} });
var It = "3.13.0";
var Ml = { "data-waline": "" };
var xl = { class: "wl-meta-head" };
var zl = { class: "wl-count" };
var Ul = ["textContent"];
var _l = { class: "wl-sort" };
var jl = ["onClick"];
var Vl = { class: "wl-cards" };
var Hl = { key: 1, class: "wl-operation" };
var Fl = ["textContent"];
var Tl = { key: 2, class: "wl-loading" };
var Nl = ["textContent"];
var Bl = { key: 4, class: "wl-operation" };
var Pl = ["textContent"];
var Wl = { key: 5, class: "wl-meta-foot" };
var Dl = { key: 0, class: "wl-rss" };
var ql = ["href", "alt"];
var Gl = ["textContent"];
var Ol = ["href", "alt"];
var Kl = ["textContent"];
var Zl = { key: 1, class: "wl-power" };
var Xl = defineComponent({ __name: "WalineComment", props: { serverURL: {}, path: {}, meta: {}, requiredMeta: {}, wordLimit: {}, pageSize: {}, lang: {}, locale: {}, commentSorting: {}, dark: { type: [String, Boolean] }, login: {}, noCopyright: { type: Boolean }, noRss: { type: Boolean }, recaptchaV3Key: {}, turnstileKey: {}, reaction: { type: [Array, Boolean] }, emoji: {}, search: {}, highlighter: { type: Function }, imageUploader: { type: Function }, texRenderer: { type: Function } }, setup(e2) {
  const a = e2, t2 = Se2(), l = $t(), n2 = ref("loading"), i2 = ref(0), p2 = ref(1), r2 = ref(0), s = computed(() => $a(a)), S = ref(s.value.commentSorting), u4 = ref([]), h2 = ref(null), M2 = ref(null), j3 = computed(() => La(s.value.dark)), f2 = computed(() => s.value.locale);
  useStyleTag(j3, { id: "waline-darkmode" });
  let E2 = null;
  const R2 = (k2) => {
    const { serverURL: C3, path: U3, pageSize: V2 } = s.value, O2 = new AbortController();
    n2.value = "loading", E2 == null || E2(), $({ serverURL: C3, lang: s.value.lang, path: U3, pageSize: V2, sortBy: mt[S.value], page: k2, signal: O2.signal, token: t2.value.token }).then((P2) => {
      n2.value = "success", i2.value = P2.count, u4.value.push(...P2.data), p2.value = k2, r2.value = P2.totalPages;
    }).catch((P2) => {
      P2.name !== "AbortError" && (console.error(P2.message), n2.value = "error");
    }), E2 = O2.abort.bind(O2);
  }, m3 = () => {
    R2(p2.value + 1);
  }, _2 = () => {
    i2.value = 0, u4.value = [], R2(1);
  }, T2 = (k2) => {
    S.value !== k2 && (S.value = k2, _2());
  }, I2 = (k2) => {
    h2.value = k2;
  }, z2 = (k2) => {
    M2.value = k2;
  }, le2 = (k2) => {
    if (M2.value) M2.value.comment = k2.comment, M2.value.orig = k2.orig;
    else if ("rid" in k2) {
      const C3 = u4.value.find(({ objectId: U3 }) => U3 === k2.rid);
      if (!C3) return;
      Array.isArray(C3.children) || (C3.children = []), C3.children.push(k2);
    } else u4.value.unshift(k2), i2.value += 1;
  }, re2 = async ({ comment: k2, status: C3 }) => {
    if (k2.status === C3) return;
    const { serverURL: U3, lang: V2 } = s.value;
    await f({ serverURL: U3, lang: V2, token: t2.value.token, objectId: k2.objectId, comment: { status: C3 } }), k2.status = C3;
  }, J2 = async (k2) => {
    if ("rid" in k2) return;
    const { serverURL: C3, lang: U3 } = s.value;
    await f({ serverURL: C3, lang: U3, token: t2.value.token, objectId: k2.objectId, comment: { sticky: k2.sticky ? 0 : 1 } }), k2.sticky = !k2.sticky;
  }, oe2 = async ({ objectId: k2 }) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    const { serverURL: C3, lang: U3 } = s.value;
    await y({ serverURL: C3, lang: U3, token: t2.value.token, objectId: k2 }), u4.value.some((V2, O2) => V2.objectId === k2 ? (u4.value = u4.value.filter((P2, ae2) => ae2 !== O2), true) : V2.children.some((P2, ae2) => P2.objectId === k2 ? (u4.value[O2].children = V2.children.filter((F2, ie2) => ie2 !== ae2), true) : false));
  }, me = async (k2) => {
    const { serverURL: C3, lang: U3 } = s.value, { objectId: V2 } = k2, O2 = l.value.includes(V2);
    await f({ serverURL: C3, lang: U3, objectId: V2, token: t2.value.token, comment: { like: !O2 } }), O2 ? l.value = l.value.filter((P2) => P2 !== V2) : (l.value = [...l.value, V2], l.value.length > 50 && (l.value = l.value.slice(-50))), k2.like = Math.max(0, (k2.like || 0) + (O2 ? -1 : 1));
  };
  return provide(Ce2, s), onMounted(async () => {
    var k2;
    watchImmediate(() => [a.serverURL, a.path], () => {
      _2();
    });
    const C3 = new URLSearchParams(location.search).get("token");
    if (!C3) return;
    const U3 = await fetch(`${s == null ? void 0 : s.value.serverURL}/token`, { headers: { Authorization: `Bearer ${C3}` } }).then((O2) => O2.json()).catch((O2) => (console.error(O2), {}));
    !U3.errno && (k2 = U3 == null ? void 0 : U3.data) != null && k2.objectId && (t2.value = { ...U3.data, token: C3 });
    const V2 = new URL(window.location.href);
    V2.searchParams.delete("token"), history.replaceState(null, "", V2.pathname + (V2.searchParams.toString() ? `?${V2.searchParams.toString()}` : "") + V2.hash);
  }), onUnmounted(() => {
    E2 == null || E2();
  }), (k2, C3) => (openBlock(), createElementBlock("div", Ml, [createVNode(yn), !h2.value && !M2.value ? (openBlock(), createBlock(Rt, { key: 0, onLog: _2, onSubmit: le2 })) : createCommentVNode("v-if", true), createBaseVNode("div", xl, [createBaseVNode("div", zl, [i2.value ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-num", textContent: toDisplayString(i2.value) }, null, 8, Ul)) : createCommentVNode("v-if", true), createTextVNode(" " + toDisplayString(f2.value.comment), 1)]), createBaseVNode("ul", _l, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(ka), (U3) => (openBlock(), createElementBlock("li", { key: U3, class: normalizeClass([U3 === S.value ? "active" : ""]), onClick: (V2) => T2(U3) }, toDisplayString(f2.value[U3]), 11, jl))), 128))])]), createBaseVNode("div", Vl, [(openBlock(true), createElementBlock(Fragment, null, renderList(u4.value, (U3) => (openBlock(), createBlock(Al, { key: U3.objectId, "root-id": U3.objectId, comment: U3, reply: h2.value, edit: M2.value, onLog: _2, onReply: I2, onEdit: z2, onSubmit: le2, onStatus: re2, onDelete: oe2, onSticky: J2, onLike: me }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), n2.value === "error" ? (openBlock(), createElementBlock("div", Hl, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: _2, textContent: toDisplayString(f2.value.refresh) }, null, 8, Fl)])) : n2.value === "loading" ? (openBlock(), createElementBlock("div", Tl, [createVNode(unref(pe2), { size: 30 })])) : u4.value.length ? p2.value < r2.value ? (openBlock(), createElementBlock("div", Bl, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: m3, textContent: toDisplayString(f2.value.more) }, null, 8, Pl)])) : createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 3, class: "wl-empty", textContent: toDisplayString(f2.value.sofa) }, null, 8, Nl)), u4.value.length || n2.value !== "loading" ? (openBlock(), createElementBlock("div", Wl, [s.value.noRss ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", Dl, [createBaseVNode("a", { href: `${s.value.serverURL}/api/comment/rss?path=${encodeURIComponent(s.value.path)}`, target: "_blank", rel: "noopener noreferrer", alt: f2.value.subPostComment }, [createVNode(unref(Ct)), createBaseVNode("span", { textContent: toDisplayString(f2.value.subPostComment) }, null, 8, Gl)], 8, ql), createBaseVNode("a", { href: `${s.value.serverURL}/api/comment/rss`, target: "_blank", rel: "noopener noreferrer", alt: f2.value.subSiteComment }, [createVNode(unref(Ct)), createBaseVNode("span", { textContent: toDisplayString(f2.value.subSiteComment) }, null, 8, Kl)], 8, Ol)])), s.value.noCopyright ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", Zl, [C3[0] || (C3[0] = createTextVNode(" Powered by ", -1)), C3[1] || (C3[1] = createBaseVNode("a", { href: "https://github.com/walinejs/waline", target: "_blank", rel: "noopener noreferrer" }, " Waline ", -1)), createTextVNode(" v" + toDisplayString(unref(It)), 1)]))])) : createCommentVNode("v-if", true)]));
} });
var Et = (e2, a) => {
  a.forEach((t2, l) => {
    const n2 = e2[l].time;
    typeof n2 == "number" && (t2.textContent = n2.toString());
  });
};
var At = ({ serverURL: e2, path: a = window.location.pathname, selector: t2 = ".waline-pageview-count", update: l = true, lang: n2 = navigator.language }) => {
  const i2 = new AbortController(), p2 = [...document.querySelectorAll(t2)], r2 = (S) => {
    const u4 = je2(S);
    return u4 != null && a !== u4;
  }, s = (S) => C({ serverURL: $e2(e2), paths: S.map((u4) => je2(u4) ?? a), lang: n2, signal: i2.signal }).then((u4) => {
    Et(u4, S);
  }).catch(ft);
  if (l) {
    const S = p2.filter((h2) => !r2(h2)), u4 = p2.filter((h2) => r2(h2));
    j({ serverURL: $e2(e2), path: a, lang: n2 }).then((h2) => {
      Et(h2, S);
    }), u4.length > 0 && s(u4);
  } else s(p2);
  return i2.abort.bind(i2);
};
var Yl = ({ el: e2 = "#waline", path: a = window.location.pathname, comment: t2 = false, pageview: l = false, ...n2 }) => {
  const i2 = e2 ? Le2(e2) : null;
  if (e2 && !i2) throw new Error("Option 'el' do not match any domElement!");
  if (!n2.serverURL) throw new Error("Option 'serverURL' is missing!");
  const p2 = reactive({ ...n2 }), r2 = reactive({ comment: t2, pageview: l, path: a }), s = () => {
    r2.comment && bt({ serverURL: p2.serverURL, path: r2.path, ...ue2(r2.comment) ? { selector: r2.comment } : {} });
  }, S = () => {
    r2.pageview && At({ serverURL: p2.serverURL, path: r2.path, ...ue2(r2.pageview) ? { selector: r2.pageview } : {} });
  };
  let u4 = null;
  i2 && (u4 = createApp(() => h(Xl, { path: r2.path, ...p2 })), u4.mount(i2));
  const h2 = watchEffect(s), M2 = watchEffect(S);
  return { el: i2, update: ({ comment: j3, pageview: f2, path: E2 = window.location.pathname, ...R2 } = {}) => {
    Object.entries(R2).forEach(([m3, _2]) => {
      p2[m3] = _2;
    }), r2.path = E2, j3 != null && (r2.comment = j3), f2 != null && (r2.pageview = f2);
  }, destroy: () => {
    u4 == null || u4.unmount(), h2(), M2();
  } };
};
var Jl = ({ el: e2, serverURL: a, count: t2, lang: l = navigator.language }) => {
  const n2 = Se2(), i2 = Le2(e2), p2 = new AbortController();
  return v({ serverURL: a, count: t2, lang: l, signal: p2.signal, token: n2.value.token }).then((r2) => i2 && r2.length > 0 ? (i2.innerHTML = `<ul class="wl-recent-list">${r2.map((s) => `<li class="wl-recent-item"><a href="${s.url}">${s.nick}</a>：${s.comment}</li>`).join("")}</ul>`, { comments: r2, destroy: () => {
    p2.abort(), i2.innerHTML = "";
  } }) : { comments: r2, destroy: () => {
    p2.abort();
  } });
};
var Ql = ({ el: e2, serverURL: a, count: t2, locale: l, lang: n2 = navigator.language, mode: i2 = "list" }) => {
  const p2 = Le2(e2), r2 = new AbortController();
  return L({ serverURL: a, pageSize: t2, lang: n2, signal: r2.signal }).then((s) => {
    if (!p2 || s.length === 0) return { users: s, destroy: () => {
      r2.abort();
    } };
    const S = { ...ct(n2), ...typeof l == "object" ? l : {} };
    return p2.innerHTML = `<ul class="wl-user-${i2}">${s.map((u4, h2) => [`<li class="wl-user-item" aria-label="${u4.nick}">`, u4.link ? `<a href="${u4.link}" target="_blank">` : "", '<div class="wl-user-avatar">', `<img src="${u4.avatar}" alt="${u4.nick}">`, `<span class="wl-user-badge">${h2 + 1}</span>`, "</div>", '<div class="wl-user-meta">', '<div class="wl-user-name">', u4.nick, typeof u4.level == "number" ? `<span class="wl-badge">${S[`level${u4.level}`] ?? `Level ${u4.level}`}</span>` : "", u4.label ? `<span class="wl-badge">${u4.label}</span>` : "", "</div>", u4.link, "</div>", u4.link ? "</a>" : "", "</li>"].filter(Boolean).join("")).join("")}</ul>`, { users: s, destroy: () => {
      r2.abort(), p2.innerHTML = "";
    } };
  });
};
var er = async ({ serverURL: e2, lang: a, path: t2 }) => {
  const l = [1, 2, 3, 4, 5], n2 = new AbortController(), i2 = n2.abort.bind(n2), [p2] = await m({ serverURL: e2, lang: a, paths: [t2], type: Array.from({ length: 5 }, (r2, s) => `reaction${s}`), signal: n2.signal });
  return { value: l.map((r2, s) => p2[`reaction${s}`]), abort: i2 };
};
var Ve2 = (e2) => {
  if (Number.isNaN(e2)) return 0;
  const a = Math.round(e2);
  return Math.min(5, Math.max(0, a));
};
var Mt = (e2 = []) => Array.from({ length: 5 }, (a, t2) => {
  const l = e2[t2] ?? 0;
  return typeof l == "number" && l > 0 ? l : 0;
});
var tr = defineComponent({ name: "WalineStarDisplay", props: { score: { type: Number, default: 0 } }, setup(e2) {
  const a = computed(() => Ve2(e2.score));
  return { displayScore: a, displayClass: (t2) => a.value >= t2 ? "wl-star-solid" : "wl-star-outline" };
} });
var xt = (e2, a) => {
  const t2 = e2.__vccOpts || e2;
  for (const [l, n2] of a) t2[l] = n2;
  return t2;
};
var ar = { class: "wl-star-icon", viewBox: "0 0 24 24" };
function nr(e2, a, t2, l, n2, i2) {
  return openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4, 5], (p2) => createBaseVNode("span", { key: p2, class: "wl-star-item" }, [(openBlock(), createElementBlock("svg", ar, [createBaseVNode("path", { class: normalizeClass(e2.displayClass(p2)), d: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" }, null, 2)]))])), 64);
}
var lr = xt(tr, [["render", nr]]);
var rr = defineComponent({ name: "WalineStarWidget", components: { StarDisplay: lr }, props: { path: { type: String, default: "" }, serverURL: { type: String, default: "" }, lang: { type: String, default: "" } }, emits: ["rate"], setup(e2, { emit: a }) {
  const t2 = ref(null), l = Lt(), n2 = ref(Ve2((l.value[e2.path] ?? 0) + 1)), i2 = ref(null), p2 = ref(Mt([])), r2 = ref(false);
  onMounted(() => {
    watchImmediate(() => [e2.serverURL, e2.path], async () => {
      try {
        const m3 = await er({ serverURL: e2.serverURL, path: e2.path, lang: e2.lang });
        p2.value = Mt(m3.value);
      } catch (m3) {
        console.error("Failed to fetch reaction data:", m3);
      }
    });
  });
  const s = computed(() => i2.value ?? n2.value), S = computed(() => p2.value.reduce((m3, _2) => m3 + _2, 0)), u4 = computed(() => p2.value.map((m3) => S.value ? m3 / S.value : 0)), h2 = (m3) => {
    if (!t2.value) return 0;
    const { firstElementChild: _2, lastElementChild: T2 } = t2.value;
    if (!_2 || !T2) return 0;
    const { left: I2 } = _2.getBoundingClientRect(), { right: z2 } = T2.getBoundingClientRect(), le2 = z2 - I2, re2 = (m3.clientX - I2) / le2, J2 = Math.min(1, Math.max(0, re2)) * 5;
    return Ve2(J2);
  }, M2 = (m3) => {
    i2.value = h2(m3);
  }, j3 = () => {
    i2.value = null;
  }, f2 = async (m3) => {
    const _2 = i2.value ?? h2(m3);
    if (_2 === n2.value || r2.value) return;
    r2.value = true;
    const T2 = n2.value, I2 = { serverURL: e2.serverURL, lang: e2.lang, path: e2.path };
    try {
      T2 && (await p({ ...I2, type: `reaction${T2 - 1}`, action: "desc" }), p2.value[T2 - 1] = Math.max(0, (p2.value[T2 - 1] ?? 0) - 1)), n2.value = _2;
      const z2 = _2 - 1;
      l.value[e2.path] = z2, await p({ serverURL: e2.serverURL, lang: e2.lang, path: e2.path, type: `reaction${z2}`, action: "inc" }), p2.value[z2] = (p2.value[z2] ?? 0) + 1, a("rate", _2);
    } catch (z2) {
      n2.value = T2, T2 ? l.value[e2.path] = T2 - 1 : delete l.value[e2.path], console.error("[Waline] Failed to update reaction counter", z2);
    } finally {
      r2.value = false;
    }
  };
  function E2(m3) {
    return p2.value[m3 - 1] ?? 0;
  }
  function R2(m3) {
    return `${((u4.value[m3 - 1] ?? 0) * 100).toFixed(1)}%`;
  }
  return { ratingArea: t2, displayScore: s, onMouseMove: M2, onMouseLeave: j3, onClick: f2, countFor: E2, percentText: R2 };
} });
var or = { class: "wl-star" };
var ir = { class: "wl-star-score" };
var sr = { class: "wl-star-rate" };
var cr = { class: "wl-star-progress" };
var ur = ["data-count"];
var mr = { class: "wl-star-percent" };
function vr(e2, a, t2, l, n2, i2) {
  const p2 = resolveComponent("StarDisplay");
  return openBlock(), createElementBlock("div", or, [createBaseVNode("div", { ref: "ratingArea", class: "wl-star-rate", onMousemove: a[0] || (a[0] = (...r2) => e2.onMouseMove && e2.onMouseMove(...r2)), onMouseleave: a[1] || (a[1] = (...r2) => e2.onMouseLeave && e2.onMouseLeave(...r2)), onClick: a[2] || (a[2] = (...r2) => e2.onClick && e2.onClick(...r2)) }, [createVNode(p2, { score: e2.displayScore }, null, 8, ["score"])], 544), createBaseVNode("div", ir, [(openBlock(), createElementBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (r2) => createBaseVNode("div", { key: r2, class: "wl-star-row" }, [createBaseVNode("div", sr, [createVNode(p2, { score: r2 }, null, 8, ["score"])]), createBaseVNode("div", cr, [createBaseVNode("div", { class: "wl-star-progress-bar", style: normalizeStyle({ width: e2.percentText(r2) }), "data-count": e2.countFor(r2).toString() }, null, 12, ur)]), createBaseVNode("span", mr, toDisplayString(e2.percentText(r2)), 1)])), 64))])]);
}
var dr = xt(rr, [["render", vr]]);
var pr = ({ el: e2, path: a, lang: t2 = navigator.language, serverURL: l, onRate: n2 }) => {
  const i2 = Le2(e2);
  if (!i2) return { destroy: () => {
  } };
  const p2 = createApp(dr, { path: a, lang: t2, serverURL: l, onRate: n2 });
  return p2.mount(i2), { destroy: () => {
    p2.unmount(), i2.innerHTML = "";
  } };
};
export {
  Jl as RecentComments,
  pr as Star,
  Ql as UserList,
  u as addComment,
  bt as commentCount,
  ke2 as defaultLocales,
  y as deleteComment,
  U as fetchCommentCount,
  m as getArticleCounter,
  $ as getComment,
  C as getPageview,
  v as getRecentComment,
  L as getUserList,
  Yl as init,
  w as login,
  At as pageviewCount,
  p as updateArticleCounter,
  f as updateComment,
  j as updatePageview,
  It as version
};
//# sourceMappingURL=@waline_client.js.map
