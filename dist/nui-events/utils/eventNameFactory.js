"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventNameFactory = void 0;
var eventNameFactory = function (app, method) { return app + ":" + method; };
exports.eventNameFactory = eventNameFactory;
