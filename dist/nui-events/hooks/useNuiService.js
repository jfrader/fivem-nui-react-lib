import { useEffect } from 'react';
import { eventNameFactory } from '../utils/nuiUtils';
export var useNuiService = function (options) {
    if (options === void 0) { options = {}; }
    var capture = options.capture, passive = options.passive, once = options.once;
    var eventListener = function (event) {
        var _a = event.data, app = _a.app, method = _a.method, data = _a.data;
        if (app && method) {
            window.dispatchEvent(new MessageEvent(eventNameFactory(app, method), {
                data: data,
            }));
        }
    };
    useEffect(function () {
        var opts = { capture: capture, passive: passive, once: once };
        window.addEventListener('message', eventListener, opts);
        return function () { return window.removeEventListener('message', eventListener, opts); };
    }, [capture, passive, once]);
};
