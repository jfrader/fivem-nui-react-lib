"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NuiProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var NuiContext_1 = require("../context/NuiContext");
var eventNameFactory_1 = require("../utils/eventNameFactory");
function abortableFetch(request, opts) {
    var controller = new AbortController();
    var signal = controller.signal;
    return {
        abort: function () { return controller.abort(); },
        promise: fetch(request, __assign(__assign({}, opts), { signal: signal })),
    };
}
function getParams(resource, event, data) {
    return [
        "https://" + resource + "/" + event,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
        },
    ];
}
var DEFAULT_TIMEOUT = 10000;
var NuiProvider = function (_a) {
    var resource = _a.resource, children = _a.children, timeout = _a.timeout;
    var resourceRef = react_1.useRef(resource || "");
    var timeoutRef = react_1.useRef(timeout || DEFAULT_TIMEOUT);
    var eventListener = function (event) {
        var _a = event.data, app = _a.app, method = _a.method, data = _a.data;
        if (app && method) {
            window.dispatchEvent(new MessageEvent(eventNameFactory_1.eventNameFactory(app, method), {
                data: data,
            }));
        }
    };
    react_1.useEffect(function () {
        window.addEventListener("message", eventListener);
        return function () { return window.removeEventListener("message", eventListener); };
    }, []);
    var send = react_1.useCallback(function (event, data, res) {
        if (data === void 0) { data = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch.apply(void 0, getParams(res || resourceRef.current, event, data))];
            });
        });
    }, []);
    var sendAbortable = react_1.useCallback(function (event, data, res) {
        if (data === void 0) { data = {}; }
        return abortableFetch.apply(void 0, getParams(res || resourceRef.current, event, data));
    }, []);
    return (jsx_runtime_1.jsx(NuiContext_1.NuiContext.Provider, __assign({ value: {
            send: send,
            sendAbortable: sendAbortable,
            resource: resourceRef.current,
            callbackTimeout: timeoutRef.current,
        } }, { children: children }), void 0));
};
exports.NuiProvider = NuiProvider;
