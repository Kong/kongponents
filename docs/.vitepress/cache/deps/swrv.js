import {
  getCurrentInstance,
  isReadonly,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch
} from "./chunk-V634PGSD.js";
import "./chunk-UXIASGQL.js";

// node_modules/swrv/esm/lib/hash.js
var table = /* @__PURE__ */ new WeakMap();
var counter = 0;
function hash(args) {
  if (!args.length)
    return "";
  var key = "arg";
  for (var i = 0; i < args.length; ++i) {
    var _hash = void 0;
    if (args[i] === null || typeof args[i] !== "object" && typeof args[i] !== "function") {
      if (typeof args[i] === "string") {
        _hash = '"' + args[i] + '"';
      } else {
        _hash = String(args[i]);
      }
    } else {
      if (!table.has(args[i])) {
        _hash = counter;
        table.set(args[i], counter++);
      } else {
        _hash = table.get(args[i]);
      }
    }
    key += "@" + _hash;
  }
  return key;
}

// node_modules/swrv/esm/cache/index.js
function serializeKeyDefault(key) {
  if (typeof key === "function") {
    try {
      key = key();
    } catch (err) {
      key = "";
    }
  }
  if (Array.isArray(key)) {
    key = hash(key);
  } else {
    key = String(key || "");
  }
  return key;
}
var SWRVCache = (
  /** @class */
  function() {
    function SWRVCache2(ttl) {
      if (ttl === void 0) {
        ttl = 0;
      }
      this.items = /* @__PURE__ */ new Map();
      this.ttl = ttl;
    }
    SWRVCache2.prototype.serializeKey = function(key) {
      return serializeKeyDefault(key);
    };
    SWRVCache2.prototype.get = function(k) {
      var _key = this.serializeKey(k);
      return this.items.get(_key);
    };
    SWRVCache2.prototype.set = function(k, v, ttl) {
      var _key = this.serializeKey(k);
      var timeToLive = ttl || this.ttl;
      var now = Date.now();
      var item = {
        data: v,
        createdAt: now,
        expiresAt: timeToLive ? now + timeToLive : Infinity
      };
      this.dispatchExpire(timeToLive, item, _key);
      this.items.set(_key, item);
    };
    SWRVCache2.prototype.dispatchExpire = function(ttl, item, serializedKey) {
      var _this = this;
      ttl && setTimeout(function() {
        var current = Date.now();
        var hasExpired = current >= item.expiresAt;
        if (hasExpired)
          _this.delete(serializedKey);
      }, ttl);
    };
    SWRVCache2.prototype.delete = function(serializedKey) {
      this.items.delete(serializedKey);
    };
    return SWRVCache2;
  }()
);
var cache_default = SWRVCache;

// node_modules/swrv/esm/lib/web-preset.js
function isOnline() {
  if (typeof navigator.onLine !== "undefined") {
    return navigator.onLine;
  }
  return true;
}
function isDocumentVisible() {
  if (typeof document !== "undefined" && typeof document.visibilityState !== "undefined") {
    return document.visibilityState !== "hidden";
  }
  return true;
}
var fetcher = function(url) {
  return fetch(url).then(function(res) {
    return res.json();
  });
};
var web_preset_default = {
  isOnline,
  isDocumentVisible,
  fetcher
};

// node_modules/swrv/esm/use-swrv.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var DATA_CACHE = new cache_default();
var REF_CACHE = new cache_default();
var PROMISES_CACHE = new cache_default();
var defaultConfig = {
  cache: DATA_CACHE,
  refreshInterval: 0,
  ttl: 0,
  serverTTL: 1e3,
  dedupingInterval: 2e3,
  revalidateOnFocus: true,
  revalidateDebounce: 0,
  shouldRetryOnError: true,
  errorRetryInterval: 5e3,
  errorRetryCount: 5,
  fetcher: web_preset_default.fetcher,
  isOnline: web_preset_default.isOnline,
  isDocumentVisible: web_preset_default.isDocumentVisible
};
function setRefCache(key, theRef, ttl) {
  var refCacheItem = REF_CACHE.get(key);
  if (refCacheItem) {
    refCacheItem.data.push(theRef);
  } else {
    var gracePeriod = 5e3;
    REF_CACHE.set(key, [theRef], ttl > 0 ? ttl + gracePeriod : ttl);
  }
}
function onErrorRetry(revalidate, errorRetryCount, config) {
  if (!config.isDocumentVisible()) {
    return;
  }
  if (config.errorRetryCount !== void 0 && errorRetryCount > config.errorRetryCount) {
    return;
  }
  var count = Math.min(errorRetryCount || 0, config.errorRetryCount);
  var timeout = count * config.errorRetryInterval;
  setTimeout(function() {
    revalidate(null, { errorRetryCount: count + 1, shouldRetryOnError: true });
  }, timeout);
}
var mutate = function(key, res, cache, ttl) {
  if (cache === void 0) {
    cache = DATA_CACHE;
  }
  if (ttl === void 0) {
    ttl = defaultConfig.ttl;
  }
  return __awaiter(void 0, void 0, void 0, function() {
    var data, error, isValidating, err_1, newData, stateRef, refs_1;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!isPromise(res))
            return [3, 5];
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4, res];
        case 2:
          data = _a.sent();
          return [3, 4];
        case 3:
          err_1 = _a.sent();
          error = err_1;
          return [3, 4];
        case 4:
          return [3, 6];
        case 5:
          data = res;
          _a.label = 6;
        case 6:
          isValidating = false;
          newData = { data, error, isValidating };
          if (typeof data !== "undefined") {
            try {
              cache.set(key, newData, ttl);
            } catch (err) {
              console.error("swrv(mutate): failed to set cache", err);
            }
          }
          stateRef = REF_CACHE.get(key);
          if (stateRef && stateRef.data.length) {
            refs_1 = stateRef.data.filter(function(r) {
              return r.key === key;
            });
            refs_1.forEach(function(r, idx) {
              if (typeof newData.data !== "undefined") {
                r.data = newData.data;
              }
              r.error = newData.error;
              r.isValidating = newData.isValidating;
              var isLast = idx === refs_1.length - 1;
              if (!isLast) {
                delete refs_1[idx];
              }
            });
            refs_1 = refs_1.filter(Boolean);
          }
          return [2, newData];
      }
    });
  });
};
function useSWRV() {
  var _this = this;
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var key;
  var fn;
  var config = __assign({}, defaultConfig);
  var unmounted = false;
  var isHydrated = false;
  var instance = getCurrentInstance();
  var vm = (instance === null || instance === void 0 ? void 0 : instance.proxy) || instance;
  if (!vm) {
    console.error("Could not get current instance, check to make sure that `useSwrv` is declared in the top level of the setup function.");
    return null;
  }
  var IS_SERVER = (vm === null || vm === void 0 ? void 0 : vm.$isServer) || false;
  if (args.length >= 1) {
    key = args[0];
  }
  if (args.length >= 2) {
    fn = args[1];
  }
  if (args.length > 2) {
    config = __assign(__assign({}, config), args[2]);
  }
  var ttl = IS_SERVER ? config.serverTTL : config.ttl;
  var keyRef = typeof key === "function" ? key : ref(key);
  if (typeof fn === "undefined") {
    fn = config.fetcher;
  }
  var stateRef = null;
  if (!stateRef) {
    stateRef = reactive({
      data: void 0,
      error: void 0,
      isValidating: true,
      key: null
    });
  }
  var revalidate = function(data, opts) {
    return __awaiter(_this, void 0, void 0, function() {
      var isFirstFetch, keyVal, cacheItem, newData, fetcher2, shouldRevalidate, trigger;
      var _this2 = this;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            isFirstFetch = stateRef.data === void 0;
            keyVal = keyRef.value;
            if (!keyVal) {
              return [
                2
                /*return*/
              ];
            }
            cacheItem = config.cache.get(keyVal);
            newData = cacheItem && cacheItem.data;
            stateRef.isValidating = true;
            if (newData) {
              stateRef.data = newData.data;
              stateRef.error = newData.error;
            }
            fetcher2 = data || fn;
            if (!fetcher2 || !config.isDocumentVisible() && !isFirstFetch || (opts === null || opts === void 0 ? void 0 : opts.forceRevalidate) !== void 0 && !(opts === null || opts === void 0 ? void 0 : opts.forceRevalidate)) {
              stateRef.isValidating = false;
              return [
                2
                /*return*/
              ];
            }
            if (cacheItem) {
              shouldRevalidate = Boolean(Date.now() - cacheItem.createdAt >= config.dedupingInterval || (opts === null || opts === void 0 ? void 0 : opts.forceRevalidate));
              if (!shouldRevalidate) {
                stateRef.isValidating = false;
                return [
                  2
                  /*return*/
                ];
              }
            }
            trigger = function() {
              return __awaiter(_this2, void 0, void 0, function() {
                var promiseFromCache, fetcherArgs, newPromise, shouldRetryOnError;
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      promiseFromCache = PROMISES_CACHE.get(keyVal);
                      if (!!promiseFromCache)
                        return [3, 2];
                      fetcherArgs = Array.isArray(keyVal) ? keyVal : [keyVal];
                      newPromise = fetcher2.apply(void 0, __spreadArray([], __read(fetcherArgs), false));
                      PROMISES_CACHE.set(keyVal, newPromise, config.dedupingInterval);
                      return [4, mutate(keyVal, newPromise, config.cache, ttl)];
                    case 1:
                      _a2.sent();
                      return [3, 4];
                    case 2:
                      return [4, mutate(keyVal, promiseFromCache.data, config.cache, ttl)];
                    case 3:
                      _a2.sent();
                      _a2.label = 4;
                    case 4:
                      stateRef.isValidating = false;
                      PROMISES_CACHE.delete(keyVal);
                      if (stateRef.error !== void 0) {
                        shouldRetryOnError = !unmounted && config.shouldRetryOnError && (opts ? opts.shouldRetryOnError : true);
                        if (shouldRetryOnError) {
                          onErrorRetry(revalidate, opts ? opts.errorRetryCount : 1, config);
                        }
                      }
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            if (!(newData && config.revalidateDebounce))
              return [3, 1];
            setTimeout(function() {
              return __awaiter(_this2, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      if (!!unmounted)
                        return [3, 2];
                      return [4, trigger()];
                    case 1:
                      _a2.sent();
                      _a2.label = 2;
                    case 2:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, config.revalidateDebounce);
            return [3, 3];
          case 1:
            return [4, trigger()];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  };
  var revalidateCall = function() {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, revalidate(null, { shouldRetryOnError: false })];
      });
    });
  };
  var timer = null;
  onMounted(function() {
    var tick = function() {
      return __awaiter(_this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!(!stateRef.error && config.isOnline()))
                return [3, 2];
              return [4, revalidate()];
            case 1:
              _a.sent();
              return [3, 3];
            case 2:
              if (timer) {
                clearTimeout(timer);
              }
              _a.label = 3;
            case 3:
              if (config.refreshInterval && !unmounted) {
                timer = setTimeout(tick, config.refreshInterval);
              }
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    if (config.refreshInterval) {
      timer = setTimeout(tick, config.refreshInterval);
    }
    if (config.revalidateOnFocus) {
      document.addEventListener("visibilitychange", revalidateCall, false);
      window.addEventListener("focus", revalidateCall, false);
    }
  });
  onUnmounted(function() {
    unmounted = true;
    if (timer) {
      clearTimeout(timer);
    }
    if (config.revalidateOnFocus) {
      document.removeEventListener("visibilitychange", revalidateCall, false);
      window.removeEventListener("focus", revalidateCall, false);
    }
    var refCacheItem = REF_CACHE.get(keyRef.value);
    if (refCacheItem) {
      refCacheItem.data = refCacheItem.data.filter(function(ref2) {
        return ref2 !== stateRef;
      });
    }
  });
  try {
    watch(keyRef, function(val) {
      if (!isReadonly(keyRef)) {
        keyRef.value = val;
      }
      stateRef.key = val;
      stateRef.isValidating = Boolean(val);
      setRefCache(keyRef.value, stateRef, ttl);
      if (!IS_SERVER && !isHydrated && keyRef.value) {
        revalidate();
      }
      isHydrated = false;
    }, {
      immediate: true
    });
  } catch (_a) {
  }
  var res = __assign(__assign({}, toRefs(stateRef)), { mutate: function(data, opts) {
    return revalidate(data, __assign(__assign({}, opts), { forceRevalidate: true }));
  } });
  return res;
}
function isPromise(p) {
  return p !== null && typeof p === "object" && typeof p.then === "function";
}
var use_swrv_default = useSWRV;

// node_modules/swrv/esm/index.js
var esm_default = use_swrv_default;
export {
  cache_default as SWRVCache,
  esm_default as default,
  mutate
};
//# sourceMappingURL=swrv.js.map
