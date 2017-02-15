/*! touchjs.min v0.2.14  2014-08-05 */
"use strict";
! function(a, b) { "function" == typeof define && (define.amd || define.cmd) ? define(b) : a.touch = b() }(this, function() {
    function a() {
        var a = "mouseup mousedown mousemove mouseout",
            c = "touchstart touchmove touchend touchcancel",
            d = b.hasTouch ? c : a;
        d.split(" ").forEach(function(a) { document.addEventListener(a, A, !1) }) }
    var b = {};
    b.PCevts = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", touchcancel: "mouseout" }, b.hasTouch = "ontouchstart" in window, b.getType = function(a) {
        return Object.prototype.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase() }, b.getSelector = function(a) {
        if (a.id) {
            return "#" + a.id }
        if (a.className) {
            var b = a.className.split(/\s+/);
            return "." + b.join(".") }
        return a === document ? "body" : a.tagName.toLowerCase() }, b.matchSelector = function(a, b) {
        return a.webkitMatchesSelector(b) }, b.getEventListeners = function(a) {
        return a.listeners }, b.getPCevts = function(a) {
        return this.PCevts[a] || a }, b.forceReflow = function() {
        var a = "reflowDivBlock",
            b = document.getElementById(a);
        b || (b = document.createElement("div"), b.id = a, document.body.appendChild(b));
        var c = b.parentNode,
            d = b.nextSibling;
        c.removeChild(b), c.insertBefore(b, d) }, b.simpleClone = function(a) {
        return Object.create(a) }, b.getPosOfEvent = function(a) {
        if (this.hasTouch) {
            for (var b = [], c = null, d = 0, e = a.touches.length; e > d; d++) { c = a.touches[d], b.push({ x: c.pageX, y: c.pageY }) }
            return b }
        return [{ x: a.pageX, y: a.pageY }] }, b.getDistance = function(a, b) {
        var c = b.x - a.x,
            d = b.y - a.y;
        return Math.sqrt(c * c + d * d) }, b.getFingers = function(a) {
        return a.touches ? a.touches.length : 1 }, b.calScale = function(a, b) {
        if (a.length >= 2 && b.length >= 2) {
            var c = this.getDistance(a[1], a[0]),
                d = this.getDistance(b[1], b[0]);
            return d / c }
        return 1 }, b.getAngle = function(a, b) {
        return 180 * Math.atan2(b.y - a.y, b.x - a.x) / Math.PI }, b.getAngle180 = function(a, b) {
        var c = Math.atan(-1 * (b.y - a.y) / (b.x - a.x)) * (180 / Math.PI);
        return 0 > c ? c + 180 : c }, b.getDirectionFromAngle = function(a) {
        var b = { up: -45 > a && a > -135, down: a >= 45 && 135 > a, left: a >= 135 || -135 >= a, right: a >= -45 && 45 >= a };
        for (var c in b) {
            if (b[c]) {
                return c } }
        return null
    }, b.getXYByElement = function(a) {
        for (var b = 0, c = 0; a.offsetParent;) { b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent }
        return { left: b, top: c } }, b.reset = function() { h = i = j = null, q = o = k = l = !1, m = !1, f = {}, t = !1 }, b.isTouchMove = function(a) {
        return "touchmove" === a.type || "mousemove" === a.type }, b.isTouchEnd = function(a) {
        return "touchend" === a.type || "mouseup" === a.type || "touchcancel" === a.type }, b.env = function() {
        var a = {},
            b = navigator.userAgent,
            c = b.match(/(Android)[\s\/]+([\d\.]+)/),
            d = b.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
            e = b.match(/(Windows\s+Phone)\s([\d\.]+)/),
            f = /WebKit\/[\d.]+/i.test(b),
            g = d ? navigator.standalone ? f : /Safari/i.test(b) && !/CriOS/i.test(b) && !/MQQBrowser/i.test(b) : !1;
        return c && (a.android = !0, a.version = c[2]), d && (a.ios = !0, a.version = d[2].replace(/_/g, "."), a.ios7 = /^7/.test(a.version), "iPad" === d[1] ? a.ipad = !0 : "iPhone" === d[1] ? (a.iphone = !0, a.iphone5 = 568 == screen.height) : "iPod" === d[1] && (a.ipod = !0)), e && (a.wp = !0, a.version = e[2], a.wp8 = /^8/.test(a.version)), f && (a.webkit = !0), g && (a.safari = !0), a }();
    var c = {
            proxyid: 0,
            proxies: [],
            trigger: function(a, b, c) { c = c || {};
                var d, e = { bubbles: !0, cancelable: !0, detail: c };
                try { "undefined" != typeof CustomEvent ? (d = new CustomEvent(b, e), a && a.dispatchEvent(d)) : (d = document.createEvent("CustomEvent"), d.initCustomEvent(b, !0, !0, c), a && a.dispatchEvent(d)) } catch (f) { console.warn("Touch.js is not supported by environment.") } },
            bind: function(a, c, d) { a.listeners = a.listeners || {}, a.listeners[c] ? a.listeners[c].push(d) : a.listeners[c] = [d];
                var e = function(a) { b.env.ios7 && b.forceReflow(), a.originEvent = a;
                    for (var c in a.detail) { "type" !== c && (a[c] = a.detail[c]) }
                    a.startRotate = function() { t = !0 };
                    var e = d.call(a.target, a); "undefined" == typeof e || e || (a.stopPropagation(), a.preventDefault()) };
                d.proxy = d.proxy || {}, d.proxy[c] ? d.proxy[c].push(this.proxyid++) : d.proxy[c] = [this.proxyid++], this.proxies.push(e), a.addEventListener && a.addEventListener(c, e, !1) },
            unbind: function(a, b, c) {
                if (c) {
                    var d = c.proxy[b];
                    d && d.length && d.forEach(function() { a.removeEventListener && a.removeEventListener(b, this.proxies[this.proxyid], !1) }) } else {
                    var e = a.listeners[b];
                    e && e.length && e.forEach(function(c) { a.removeEventListener(b, c, !1) })
                }
            },
            delegate: function(a, c, d, e) {
                var f = function(c) {
                    var f, g;
                    c.originEvent = c;
                    for (var h in c.detail) { "type" !== h && (c[h] = c.detail[h]) }
                    c.startRotate = function() { t = !0 };
                    var i = b.getSelector(a) + " " + d,
                        j = b.matchSelector(c.target, i),
                        k = b.matchSelector(c.target, i + " " + c.target.nodeName);
                    if (!j && k) {
                        for (b.env.ios7 && b.forceReflow(), f = c.target; !b.matchSelector(f, i);) { f = f.parentNode }
                        g = e.call(c.target, c), "undefined" == typeof g || g || (c.stopPropagation(), c.preventDefault()) } else { b.env.ios7 && b.forceReflow(), (j || k) && (g = e.call(c.target, c), "undefined" == typeof g || g || (c.stopPropagation(), c.preventDefault())) } };
                e.proxy = e.proxy || {}, e.proxy[c] ? e.proxy[c].push(this.proxyid++) : e.proxy[c] = [this.proxyid++], this.proxies.push(f), a.listeners = a.listeners || {}, a.listeners[c] ? a.listeners[c].push(f) : a.listeners[c] = [f], a.addEventListener && a.addEventListener(c, f, !1) },
            undelegate: function(a, b, c, d) {
                if (d) {
                    var e = d.proxy[b];
                    e.length && e.forEach(function() { a.removeEventListener && a.removeEventListener(b, this.proxies[this.proxyid], !1) }) } else {
                    var f = a.listeners[b];
                    f.forEach(function(c) { a.removeEventListener(b, c, !1) }) } }
        },
        d = { tap: !0, doubleTap: !0, tapMaxDistance: 10, hold: !0, tapTime: 200, holdTime: 650, maxDoubleTapInterval: 300, swipe: !0, swipeTime: 300, swipeMinDistance: 18, swipeFactor: 5, drag: !0, pinch: !0, minScaleRate: 0, minRotationAngle: 0 },
        e = { TOUCH_START: "touchstart", TOUCH_MOVE: "touchmove", TOUCH_END: "touchend", TOUCH_CANCEL: "touchcancel", MOUSE_DOWN: "mousedown", MOUSE_MOVE: "mousemove", MOUSE_UP: "mouseup", CLICK: "click", PINCH_START: "pinchstart", PINCH_END: "pinchend", PINCH: "pinch", PINCH_IN: "pinchin", PINCH_OUT: "pinchout", ROTATION_LEFT: "rotateleft", ROTATION_RIGHT: "rotateright", ROTATION: "rotate", SWIPE_START: "swipestart", SWIPING: "swiping", SWIPE_END: "swipeend", SWIPE_LEFT: "swipeleft", SWIPE_RIGHT: "swiperight", SWIPE_UP: "swipeup", SWIPE_DOWN: "swipedown", SWIPE: "swipe", DRAG: "drag", DRAGSTART: "dragstart", DRAGEND: "dragend", HOLD: "hold", TAP: "tap", DOUBLE_TAP: "doubletap" },
        f = { start: null, move: null, end: null },
        g = 0,
        h = null,
        i = null,
        j = null,
        k = !1,
        l = !1,
        m = !1,
        n = {},
        o = !1,
        p = null,
        q = !1,
        r = null,
        s = 1,
        t = !1,
        u = [],
        v = 0,
        w = 0,
        x = 0,
        y = null,
        z = {
            getAngleDiff: function(a) {
                for (var c = parseInt(v - b.getAngle180(a[0], a[1]), 10), d = 0; Math.abs(c - w) > 90 && d++ < 50;) { 0 > w ? c -= 180 : c += 180 }
                return w = parseInt(c, 10)
            },
            pinch: function(a) {
                var g = a.target;
                if (d.pinch) {
                    if (!o) {
                        return }
                    if (b.getFingers(a) < 2 && !b.isTouchEnd(a)) {
                        return }
                    var h = b.calScale(f.start, f.move),
                        i = this.getAngleDiff(f.move),
                        j = { type: "", originEvent: a, scale: h, rotation: i, direction: i > 0 ? "right" : "left", fingersCount: b.getFingers(a) };
                    if (l ? b.isTouchMove(a) ? (j.fingerStatus = "move", c.trigger(g, e.PINCH, j)) : b.isTouchEnd(a) && (j.fingerStatus = "end", c.trigger(g, e.PINCH_END, j), b.reset()) : (l = !0, j.fingerStatus = "start", c.trigger(g, e.PINCH_START, j)), Math.abs(1 - h) > d.minScaleRate) {
                        var k = b.simpleClone(j),
                            m = 1e-11;
                        h > s ? (s = h - m, c.trigger(g, e.PINCH_OUT, k, !1)) : s > h && (s = h + m, c.trigger(g, e.PINCH_IN, k, !1)), b.isTouchEnd(a) && (s = 1) }
                    if (Math.abs(i) > d.minRotationAngle) {
                        var n, p = b.simpleClone(j);
                        n = i > 0 ? e.ROTATION_RIGHT : e.ROTATION_LEFT, c.trigger(g, n, p, !1), c.trigger(g, e.ROTATION, j) } } },
            rotateSingleFinger: function(a) {
                var d = a.target;
                if (t && b.getFingers(a) < 2) {
                    if (!f.move) {
                        return }
                    if (u.length < 2) {
                        var g = b.getXYByElement(d);
                        u = [{ x: g.left + d.offsetWidth / 2, y: g.top + d.offsetHeight / 2 }, f.move[0]], v = parseInt(b.getAngle180(u[0], u[1]), 10) }
                    var h = [u[0], f.move[0]],
                        i = this.getAngleDiff(h),
                        j = { type: "", originEvent: a, rotation: i, direction: i > 0 ? "right" : "left", fingersCount: b.getFingers(a) };
                    b.isTouchMove(a) ? j.fingerStatus = "move" : (b.isTouchEnd(a) || "mouseout" === a.type) && (j.fingerStatus = "end", c.trigger(d, e.PINCH_END, j), b.reset());
                    var k = i > 0 ? e.ROTATION_RIGHT : e.ROTATION_LEFT;
                    c.trigger(d, k, j), c.trigger(d, e.ROTATION, j) } },
            swipe: function(a) {
                var h = a.target;
                if (o && f.move && !(b.getFingers(a) > 1)) {
                    var i = Date.now(),
                        j = i - g,
                        l = b.getDistance(f.start[0], f.move[0]),
                        p = { x: f.move[0].x - n.left, y: f.move[0].y - n.top },
                        q = b.getAngle(f.start[0], f.move[0]),
                        r = b.getDirectionFromAngle(q),
                        s = j / 1000,
                        t = 10 * (10 - d.swipeFactor) * s * s,
                        u = { type: e.SWIPE, originEvent: a, position: p, direction: r, distance: l, distanceX: f.move[0].x - f.start[0].x, distanceY: f.move[0].y - f.start[0].y, x: f.move[0].x - f.start[0].x, y: f.move[0].y - f.start[0].y, angle: q, duration: j, fingersCount: b.getFingers(a), factor: t };
                    if (d.swipe) {
                        var v = function() {
                            var a = e;
                            switch (r) {
                                case "up":
                                    c.trigger(h, a.SWIPE_UP, u);
                                    break;
                                case "down":
                                    c.trigger(h, a.SWIPE_DOWN, u);
                                    break;
                                case "left":
                                    c.trigger(h, a.SWIPE_LEFT, u);
                                    break;
                                case "right":
                                    c.trigger(h, a.SWIPE_RIGHT, u) }
                        };
                        k ? b.isTouchMove(a) ? (u.fingerStatus = u.swipe = "move", c.trigger(h, e.SWIPING, u), j > d.swipeTime && j < d.swipeTime + 50 && l > d.swipeMinDistance && (v(), c.trigger(h, e.SWIPE, u, !1))) : (b.isTouchEnd(a) || "mouseout" === a.type) && (u.fingerStatus = u.swipe = "end", c.trigger(h, e.SWIPE_END, u), d.swipeTime > j && l > d.swipeMinDistance && (v(), c.trigger(h, e.SWIPE, u, !1))) : (u.fingerStatus = u.swipe = "start", k = !0, c.trigger(h, e.SWIPE_START, u))
                    }
                    d.drag && (m ? b.isTouchMove(a) ? (u.fingerStatus = u.swipe = "move", c.trigger(h, e.DRAG, u)) : b.isTouchEnd(a) && (u.fingerStatus = u.swipe = "end", c.trigger(h, e.DRAGEND, u)) : (u.fingerStatus = u.swipe = "start", m = !0, c.trigger(h, e.DRAGSTART, u)))
                }
            },
            tap: function(a) {
                var h = a.target;
                if (d.tap) {
                    var i = Date.now(),
                        j = i - g,
                        k = b.getDistance(f.start[0], f.move ? f.move[0] : f.start[0]);
                    clearTimeout(p);
                    var l = function() {
                        if (y && d.doubleTap && g - x < d.maxDoubleTapInterval) {
                            var a = b.getDistance(y, f.start[0]);
                            if (16 > a) {
                                return !0 } }
                        return !1 }();
                    if (l) {
                        return clearTimeout(r), void c.trigger(h, e.DOUBLE_TAP, { type: e.DOUBLE_TAP, originEvent: a, position: f.start[0] }) }
                    if (d.tapMaxDistance < k) {
                        return }
                    d.holdTime > j && b.getFingers(a) <= 1 && (q = !0, x = i, y = f.start[0], r = setTimeout(function() { c.trigger(h, e.TAP, { type: e.TAP, originEvent: a, fingersCount: b.getFingers(a), position: y }) }, d.tapTime)) } },
            hold: function(a) {
                var e = a.target;
                d.hold && (clearTimeout(p), p = setTimeout(function() {
                    if (f.start) {
                        var g = b.getDistance(f.start[0], f.move ? f.move[0] : f.start[0]);
                        d.tapMaxDistance < g || q || c.trigger(e, "hold", { type: "hold", originEvent: a, fingersCount: b.getFingers(a), position: f.start[0] }) } }, d.holdTime)) }
        },
        A = function(a) {
            var c = a.target;
            switch (a.type) {
                case "touchstart":
                case "mousedown":
                    u = [], o = !0, (!f.start || f.start.length < 2) && (f.start = b.getPosOfEvent(a)), b.getFingers(a) >= 2 && (v = parseInt(b.getAngle180(f.start[0], f.start[1]), 10)), g = Date.now(), h = a, n = {};
                    var d = c.getBoundingClientRect(),
                        e = document.documentElement;
                    n = { top: d.top + (window.pageYOffset || e.scrollTop) - (e.clientTop || 0), left: d.left + (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0) }, z.hold(a);
                    break;
                case "touchmove":
                case "mousemove":
                    if (!o || !f.start) {
                        return }
                    f.move = b.getPosOfEvent(a), b.getFingers(a) >= 2 ? z.pinch(a) : t ? z.rotateSingleFinger(a) : z.swipe(a);
                    break;
                case "touchend":
                case "touchcancel":
                case "mouseup":
                case "mouseout":
                    if (!o) {
                        return }
                    j = a, l ? z.pinch(a) : t ? z.rotateSingleFinger(a) : k ? z.swipe(a) : z.tap(a), b.reset(), v = 0, w = 0, a.touches && 1 === a.touches.length && (o = !0, t = !0)
            }
        },
        B = function() {
            function a(a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function(b) { c.delegate(b, a, h, g[a]) }) }

            function d(a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function(b) { c.bind(b, a, g[a]) }) }
            var e, f, g, h, i = arguments;
            if (i.length < 2 || i > 4) {
                return console.error("unexpected arguments!") }
            var j = "string" === b.getType(i[0]) ? document.querySelectorAll(i[0]) : i[0];
            if (j = j.length ? Array.prototype.slice.call(j) : [j], 3 === i.length && "string" === b.getType(i[1])) {
                return e = i[1].split(" "), f = i[2], void e.forEach(function(a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function(b) { c.bind(b, a, f) }) }) }
            if (3 !== i.length || "object" !== b.getType(i[1])) {
                if (2 !== i.length || "object" !== b.getType(i[1])) {
                    if (4 === i.length && "object" === b.getType(i[2])) {
                        return e = i[1].split(" "), f = i[3], void e.forEach(function(a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function(b) { c.bind(b, a, f) }) }) }
                    if (4 === i.length) {
                        var k = j[0];
                        return e = i[1].split(" "), h = i[2], f = i[3], void e.forEach(function(a) { b.hasTouch || (a = b.getPCevts(a)), c.delegate(k, a, h, f) }) } } else { g = i[1];
                    for (var l in g) { d(l) } } } else { g = i[1], h = i[2];
                for (var m in g) { a(m) } } },
        C = function() {
            var a, d, e = arguments;
            if (e.length < 1 || e.length > 4) {
                return console.error("unexpected arguments!") }
            var f = "string" === b.getType(e[0]) ? document.querySelectorAll(e[0]) : e[0];
            if (f = f.length ? Array.prototype.slice.call(f) : [f], 1 === e.length || 2 === e.length) {
                return void f.forEach(function(d) { a = e[1] ? e[1].split(" ") : Object.keys(d.listeners), a.length && a.forEach(function(a) { b.hasTouch || (a = b.getPCevts(a)), c.unbind(d, a), c.undelegate(d, a) }) }) }
            if (3 === e.length && "function" === b.getType(e[2])) {
                return d = e[2], void f.forEach(function(f) {
                    a = e[1].split(" "), a.forEach(function(a) {
                        b.hasTouch || (a = b.getPCevts(a)), c.unbind(f, a, d)
                    })
                })
            }
            if (3 === e.length && "string" === b.getType(e[2])) {
                var g = e[2];
                return void f.forEach(function(d) { a = e[1].split(" "), a.forEach(function(a) { b.hasTouch || (a = b.getPCevts(a)), c.undelegate(d, a, g) }) }) }
            return 4 === e.length ? (d = e[3], void f.forEach(function(f) { a = e[1].split(" "), a.forEach(function(a) { b.hasTouch || (a = b.getPCevts(a)), c.undelegate(f, a, g, d) }) })) : void 0
        },
        D = function(a, d, e) {
            var f = arguments;
            b.hasTouch || (d = b.getPCevts(d));
            var g = "string" === b.getType(f[0]) ? document.querySelectorAll(f[0]) : f[0];
            g = g.length ? Array.prototype.call(g) : [g], g.forEach(function(a) { c.trigger(a, d, e) }) };
    a();
    var E = {};
    return E.on = E.bind = E.live = B, E.off = E.unbind = E.die = C, E.config = d, E.trigger = D, E
});
! function() {
    function e(e) { e.fn.swiper = function(a) {
            var r;
            return e(this).each(function() {
                var e = new t(this, a);
                r || (r = e) }), r } }
    var a, t = function(e, s) {
        function i() {
            return "horizontal" === w.params.direction }

        function n(e) {
            return Math.floor(e) }

        function o() { w.autoplayTimeoutId = setTimeout(function() { w.params.loop ? (w.fixLoop(), w._slideNext()) : w.isEnd ? s.autoplayStopOnLast ? w.stopAutoplay() : w._slideTo(0) : w._slideNext() }, w.params.autoplay) }

        function l(e, t) {
            var r = a(e.target);
            if (!r.is(t)) {
                if ("string" == typeof t) { r = r.parents(t) } else {
                    if (t.nodeType) {
                        var s;
                        return r.parents().each(function(e, a) { a === t && (s = t) }), s ? t : void 0 } } }
            return 0 === r.length ? void 0 : r[0] }

        function d(e, a) { a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                r = new t(function(e) { e.forEach(function(e) { w.onResize(!0), w.emit("onObserverUpdate", w, e) }) });
            r.observe(e, { attributes: "undefined" == typeof a.attributes ? !0 : a.attributes, childList: "undefined" == typeof a.childList ? !0 : a.childList, characterData: "undefined" == typeof a.characterData ? !0 : a.characterData }), w.observers.push(r) }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!w.params.allowSwipeToNext && (i() && 39 === a || !i() && 40 === a)) {
                return !1 }
            if (!w.params.allowSwipeToPrev && (i() && 37 === a || !i() && 38 === a)) {
                return !1 }
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (w.container.parents(".swiper-slide").length > 0 && 0 === w.container.parents(".swiper-slide-active").length) {
                        return }
                    var r = { left: window.pageXOffset, top: window.pageYOffset },
                        s = window.innerWidth,
                        n = window.innerHeight,
                        o = w.container.offset();
                    w.rtl && (o.left = o.left - w.container[0].scrollLeft);
                    for (var l = [
                            [o.left, o.top],
                            [o.left + w.width, o.top],
                            [o.left, o.top + w.height],
                            [o.left + w.width, o.top + w.height]
                        ], d = 0; d < l.length; d++) {
                        var p = l[d];
                        p[0] >= r.left && p[0] <= r.left + s && p[1] >= r.top && p[1] <= r.top + n && (t = !0)
                    }
                    if (!t) {
                        return }
                }
                i() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !w.rtl || 37 === a && w.rtl) && w.slideNext(), (37 === a && !w.rtl || 39 === a && w.rtl) && w.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && w.slideNext(), 38 === a && w.slidePrev())
            }
        }

        function u(e) { e.originalEvent && (e = e.originalEvent);
            var a = w.mousewheel.event,
                t = 0;
            if (e.detail) { t = -e.detail } else {
                if ("mousewheel" === a) {
                    if (w.params.mousewheelForceToAxis) {
                        if (i()) {
                            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) {
                                return }
                            t = e.wheelDeltaX } else {
                            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) {
                                return }
                            t = e.wheelDeltaY } } else { t = e.wheelDelta } } else {
                    if ("DOMMouseScroll" === a) { t = -e.detail } else {
                        if ("wheel" === a) {
                            if (w.params.mousewheelForceToAxis) {
                                if (i()) {
                                    if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) {
                                        return }
                                    t = -e.deltaX } else {
                                    if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) {
                                        return }
                                    t = -e.deltaY } } else { t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY } } } } }
            if (w.params.mousewheelInvert && (t = -t), w.params.freeMode) {
                var r = w.getWrapperTranslate() + t;
                if (r > 0 && (r = 0), r < w.maxTranslate() && (r = w.maxTranslate()), w.setWrapperTransition(0), w.setWrapperTranslate(r), w.updateProgress(), w.updateActiveIndex(), w.params.freeModeSticky && (clearTimeout(w.mousewheel.timeout), w.mousewheel.timeout = setTimeout(function() { w.slideReset() }, 300)), 0 === r || r === w.maxTranslate()) {
                    return } } else {
                if ((new window.Date).getTime() - w.mousewheel.lastScrollTime > 60) {
                    if (0 > t) {
                        if (w.isEnd) {
                            if (w.params.mousewheelReleaseOnEdges) {
                                return !0 } } else { w.slideNext() } } else {
                        if (w.isBeginning) {
                            if (w.params.mousewheelReleaseOnEdges) {
                                return !0 } } else { w.slidePrev() } } }
                w.mousewheel.lastScrollTime = (new window.Date).getTime() }
            return w.params.autoplay && w.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1 }

        function c(e, t) {
            e = a(e);
            var r, s, n;
            r = e.attr("data-swiper-parallax") || "0", s = e.attr("data-swiper-parallax-x"), n = e.attr("data-swiper-parallax-y"), s || n ? (s = s || "0", n = n || "0") : i() ? (s = r, n = "0") : (n = r, s = "0"), s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t + "%" : n * t + "px", e.transform("translate3d(" + s + ", " + n + ",0px)")
        }

        function m(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e }
        if (!(this instanceof t)) {
            return new t(e, s) }
        var f = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeSticky: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: 0.94 }, fade: { crossFade: !1 }, parallax: !1, scrollbar: null, scrollbarHide: !0, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, hashnav: !1, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: 0.5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, resistance: !0, resistanceRatio: 0.85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationHiddenClass: "swiper-pagination-hidden", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
            h = s && s.virtualTranslate;
        s = s || {};
        for (var g in f) {
            if ("undefined" == typeof s[g]) { s[g] = f[g] } else {
                if ("object" == typeof s[g]) {
                    for (var v in f[g]) { "undefined" == typeof s[g][v] && (s[g][v] = f[g][v]) } } } }
        var w = this;
        if (w.version = "3.1.0", w.params = s, w.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (w.$ = a, w.container = a(e), 0 !== w.container.length)) {
            if (w.container.length > 1) {
                return void w.container.each(function() { new t(this, s) }) }
            w.container[0].swiper = w, w.container.data("swiper", w), w.classNames.push("swiper-container-" + w.params.direction), w.params.freeMode && w.classNames.push("swiper-container-free-mode"), w.support.flexbox || (w.classNames.push("swiper-container-no-flexbox"), w.params.slidesPerColumn = 1), (w.params.parallax || w.params.watchSlidesVisibility) && (w.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(w.params.effect) >= 0 && (w.support.transforms3d ? (w.params.watchSlidesProgress = !0, w.classNames.push("swiper-container-3d")) : w.params.effect = "slide"), "slide" !== w.params.effect && w.classNames.push("swiper-container-" + w.params.effect), "cube" === w.params.effect && (w.params.resistanceRatio = 0, w.params.slidesPerView = 1, w.params.slidesPerColumn = 1, w.params.slidesPerGroup = 1, w.params.centeredSlides = !1, w.params.spaceBetween = 0, w.params.virtualTranslate = !0, w.params.setWrapperSize = !1), "fade" === w.params.effect && (w.params.slidesPerView = 1, w.params.slidesPerColumn = 1, w.params.slidesPerGroup = 1, w.params.watchSlidesProgress = !0, w.params.spaceBetween = 0, "undefined" == typeof h && (w.params.virtualTranslate = !0)), w.params.grabCursor && w.support.touch && (w.params.grabCursor = !1), w.wrapper = w.container.children("." + w.params.wrapperClass), w.params.pagination && (w.paginationContainer = a(w.params.pagination), w.params.paginationClickable && w.paginationContainer.addClass("swiper-pagination-clickable")), w.rtl = i() && ("rtl" === w.container[0].dir.toLowerCase() || "rtl" === w.container.css("direction")), w.rtl && w.classNames.push("swiper-container-rtl"), w.rtl && (w.wrongRTL = "-webkit-box" === w.wrapper.css("display")), w.params.slidesPerColumn > 1 && w.classNames.push("swiper-container-multirow"), w.device.android && w.classNames.push("swiper-container-android"), w.container.addClass(w.classNames.join(" ")), w.translate = 0, w.progress = 0, w.velocity = 0, w.lockSwipeToNext = function() {
                w.params.allowSwipeToNext = !1
            }, w.lockSwipeToPrev = function() { w.params.allowSwipeToPrev = !1 }, w.lockSwipes = function() { w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !1 }, w.unlockSwipeToNext = function() { w.params.allowSwipeToNext = !0 }, w.unlockSwipeToPrev = function() { w.params.allowSwipeToPrev = !0 }, w.unlockSwipes = function() { w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !0 }, w.params.grabCursor && (w.container[0].style.cursor = "move", w.container[0].style.cursor = "-webkit-grab", w.container[0].style.cursor = "-moz-grab", w.container[0].style.cursor = "grab"), w.imagesToLoad = [], w.imagesLoaded = 0, w.loadImage = function(e, a, t, r) {
                function s() { r && r() }
                var i;
                e.complete && t ? s() : a ? (i = new window.Image, i.onload = s, i.onerror = s, i.src = a) : s() }, w.preloadImages = function() {
                function e() { "undefined" != typeof w && null !== w && (void 0 !== w.imagesLoaded && w.imagesLoaded++, w.imagesLoaded === w.imagesToLoad.length && (w.params.updateOnImagesReady && w.update(), w.emit("onImagesReady", w))) }
                w.imagesToLoad = w.container.find("img");
                for (var a = 0; a < w.imagesToLoad.length; a++) { w.loadImage(w.imagesToLoad[a], w.imagesToLoad[a].currentSrc || w.imagesToLoad[a].getAttribute("src"), !0, e) } }, w.autoplayTimeoutId = void 0, w.autoplaying = !1, w.autoplayPaused = !1, w.startAutoplay = function() {
                return "undefined" != typeof w.autoplayTimeoutId ? !1 : w.params.autoplay ? w.autoplaying ? !1 : (w.autoplaying = !0, w.emit("onAutoplayStart", w), void o()) : !1 }, w.stopAutoplay = function(e) { w.autoplayTimeoutId && (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId), w.autoplaying = !1, w.autoplayTimeoutId = void 0, w.emit("onAutoplayStop", w)) }, w.pauseAutoplay = function(e) { w.autoplayPaused || (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId), w.autoplayPaused = !0, 0 === e ? (w.autoplayPaused = !1, o()) : w.wrapper.transitionEnd(function() { w && (w.autoplayPaused = !1, w.autoplaying ? o() : w.stopAutoplay()) })) }, w.minTranslate = function() {
                return -w.snapGrid[0] }, w.maxTranslate = function() {
                return -w.snapGrid[w.snapGrid.length - 1] }, w.updateContainerSize = function() {
                var e, a;
                e = "undefined" != typeof w.params.width ? w.params.width : w.container[0].clientWidth, a = "undefined" != typeof w.params.height ? w.params.height : w.container[0].clientHeight, 0 === e && i() || 0 === a && !i() || (e = e - parseInt(w.container.css("padding-left"), 10) - parseInt(w.container.css("padding-right"), 10), a = a - parseInt(w.container.css("padding-top"), 10) - parseInt(w.container.css("padding-bottom"), 10), w.width = e, w.height = a, w.size = i() ? w.width : w.height)
            }, w.updateSlidesSize = function() {
                w.slides = w.wrapper.children("." + w.params.slideClass), w.snapGrid = [], w.slidesGrid = [], w.slidesSizesGrid = [];
                var e, a = w.params.spaceBetween,
                    t = -w.params.slidesOffsetBefore,
                    r = 0,
                    s = 0;
                "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * w.size), w.virtualSize = -a, w.slides.css(w.rtl ? { marginLeft: "", marginTop: "" } : { marginRight: "", marginBottom: "" });
                var o;
                w.params.slidesPerColumn > 1 && (o = Math.floor(w.slides.length / w.params.slidesPerColumn) === w.slides.length / w.params.slidesPerColumn ? w.slides.length : Math.ceil(w.slides.length / w.params.slidesPerColumn) * w.params.slidesPerColumn);
                var l, d = w.params.slidesPerColumn,
                    p = o / d,
                    u = p - (w.params.slidesPerColumn * p - w.slides.length);
                for (e = 0; e < w.slides.length; e++) { l = 0;
                    var c = w.slides.eq(e);
                    if (w.params.slidesPerColumn > 1) {
                        var m, f, h; "column" === w.params.slidesPerColumnFill ? (f = Math.floor(e / d), h = e - f * d, (f > u || f === u && h === d - 1) && ++h >= d && (h = 0, f++), m = f + h * o / d, c.css({ "-webkit-box-ordinal-group": m, "-moz-box-ordinal-group": m, "-ms-flex-order": m, "-webkit-order": m, order: m })) : (h = Math.floor(e / p), f = e - h * p), c.css({ "margin-top": 0 !== h && w.params.spaceBetween && w.params.spaceBetween + "px" }).attr("data-swiper-column", f).attr("data-swiper-row", h) } "none" !== c.css("display") && ("auto" === w.params.slidesPerView ? (l = i() ? c.outerWidth(!0) : c.outerHeight(!0), w.params.roundLengths && (l = n(l))) : (l = (w.size - (w.params.slidesPerView - 1) * a) / w.params.slidesPerView, w.params.roundLengths && (l = n(l)), i() ? w.slides[e].style.width = l + "px" : w.slides[e].style.height = l + "px"), w.slides[e].swiperSlideSize = l, w.slidesSizesGrid.push(l), w.params.centeredSlides ? (t = t + l / 2 + r / 2 + a, 0 === e && (t = t - w.size / 2 - a), Math.abs(t) < 0.001 && (t = 0), s % w.params.slidesPerGroup === 0 && w.snapGrid.push(t), w.slidesGrid.push(t)) : (s % w.params.slidesPerGroup === 0 && w.snapGrid.push(t), w.slidesGrid.push(t), t = t + l + a), w.virtualSize += l + a, r = l, s++) }
                w.virtualSize = Math.max(w.virtualSize, w.size) + w.params.slidesOffsetAfter;
                var g;
                if (w.rtl && w.wrongRTL && ("slide" === w.params.effect || "coverflow" === w.params.effect) && w.wrapper.css({ width: w.virtualSize + w.params.spaceBetween + "px" }), (!w.support.flexbox || w.params.setWrapperSize) && w.wrapper.css(i() ? { width: w.virtualSize + w.params.spaceBetween + "px" } : { height: w.virtualSize + w.params.spaceBetween + "px" }), w.params.slidesPerColumn > 1 && (w.virtualSize = (l + w.params.spaceBetween) * o, w.virtualSize = Math.ceil(w.virtualSize / w.params.slidesPerColumn) - w.params.spaceBetween, w.wrapper.css({ width: w.virtualSize + w.params.spaceBetween + "px" }), w.params.centeredSlides)) {
                    for (g = [], e = 0; e < w.snapGrid.length; e++) { w.snapGrid[e] < w.virtualSize + w.snapGrid[0] && g.push(w.snapGrid[e]) }
                    w.snapGrid = g
                }
                if (!w.params.centeredSlides) {
                    for (g = [], e = 0; e < w.snapGrid.length; e++) { w.snapGrid[e] <= w.virtualSize - w.size && g.push(w.snapGrid[e]) }
                    w.snapGrid = g, Math.floor(w.virtualSize - w.size) > Math.floor(w.snapGrid[w.snapGrid.length - 1]) && w.snapGrid.push(w.virtualSize - w.size) }
                0 === w.snapGrid.length && (w.snapGrid = [0]), 0 !== w.params.spaceBetween && w.slides.css(i() ? w.rtl ? { marginLeft: a + "px" } : { marginRight: a + "px" } : { marginBottom: a + "px" }), w.params.watchSlidesProgress && w.updateSlidesOffset()
            }, w.updateSlidesOffset = function() {
                for (var e = 0; e < w.slides.length; e++) { w.slides[e].swiperSlideOffset = i() ? w.slides[e].offsetLeft : w.slides[e].offsetTop } }, w.updateSlidesProgress = function(e) {
                if ("undefined" == typeof e && (e = w.translate || 0), 0 !== w.slides.length) { "undefined" == typeof w.slides[0].swiperSlideOffset && w.updateSlidesOffset();
                    var a = w.params.centeredSlides ? -e + w.size / 2 : -e;
                    w.rtl && (a = w.params.centeredSlides ? e - w.size / 2 : e);
                    w.container[0].getBoundingClientRect(), i() ? "left" : "top", i() ? "right" : "bottom";
                    w.slides.removeClass(w.params.slideVisibleClass);
                    for (var t = 0; t < w.slides.length; t++) {
                        var r = w.slides[t],
                            s = w.params.centeredSlides === !0 ? r.swiperSlideSize / 2 : 0,
                            n = (a - r.swiperSlideOffset - s) / (r.swiperSlideSize + w.params.spaceBetween);
                        if (w.params.watchSlidesVisibility) {
                            var o = -(a - r.swiperSlideOffset - s),
                                l = o + w.slidesSizesGrid[t],
                                d = o >= 0 && o < w.size || l > 0 && l <= w.size || 0 >= o && l >= w.size;
                            d && w.slides.eq(t).addClass(w.params.slideVisibleClass) }
                        r.progress = w.rtl ? -n : n } } }, w.updateProgress = function(e) { "undefined" == typeof e && (e = w.translate || 0);
                var a = w.maxTranslate() - w.minTranslate();
                0 === a ? (w.progress = 0, w.isBeginning = w.isEnd = !0) : (w.progress = (e - w.minTranslate()) / a, w.isBeginning = w.progress <= 0, w.isEnd = w.progress >= 1), w.isBeginning && w.emit("onReachBeginning", w), w.isEnd && w.emit("onReachEnd", w), w.params.watchSlidesProgress && w.updateSlidesProgress(e), w.emit("onProgress", w, w.progress) }, w.updateActiveIndex = function() {
                var e, a, t, r = w.rtl ? w.translate : -w.translate;
                for (a = 0; a < w.slidesGrid.length; a++) { "undefined" != typeof w.slidesGrid[a + 1] ? r >= w.slidesGrid[a] && r < w.slidesGrid[a + 1] - (w.slidesGrid[a + 1] - w.slidesGrid[a]) / 2 ? e = a : r >= w.slidesGrid[a] && r < w.slidesGrid[a + 1] && (e = a + 1) : r >= w.slidesGrid[a] && (e = a) }(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / w.params.slidesPerGroup), t >= w.snapGrid.length && (t = w.snapGrid.length - 1), e !== w.activeIndex && (w.snapIndex = t, w.previousIndex = w.activeIndex, w.activeIndex = e, w.updateClasses())
            }, w.updateClasses = function() { w.slides.removeClass(w.params.slideActiveClass + " " + w.params.slideNextClass + " " + w.params.slidePrevClass);
                var e = w.slides.eq(w.activeIndex);
                if (e.addClass(w.params.slideActiveClass), e.next("." + w.params.slideClass).addClass(w.params.slideNextClass), e.prev("." + w.params.slideClass).addClass(w.params.slidePrevClass), w.bullets && w.bullets.length > 0) { w.bullets.removeClass(w.params.bulletActiveClass);
                    var t;
                    w.params.loop ? (t = Math.ceil(w.activeIndex - w.loopedSlides) / w.params.slidesPerGroup, t > w.slides.length - 1 - 2 * w.loopedSlides && (t -= w.slides.length - 2 * w.loopedSlides), t > w.bullets.length - 1 && (t -= w.bullets.length)) : t = "undefined" != typeof w.snapIndex ? w.snapIndex : w.activeIndex || 0, w.paginationContainer.length > 1 ? w.bullets.each(function() { a(this).index() === t && a(this).addClass(w.params.bulletActiveClass) }) : w.bullets.eq(t).addClass(w.params.bulletActiveClass) }
                w.params.loop || (w.params.prevButton && (w.isBeginning ? (a(w.params.prevButton).addClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.disable(a(w.params.prevButton))) : (a(w.params.prevButton).removeClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.enable(a(w.params.prevButton)))), w.params.nextButton && (w.isEnd ? (a(w.params.nextButton).addClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.disable(a(w.params.nextButton))) : (a(w.params.nextButton).removeClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.enable(a(w.params.nextButton))))) }, w.updatePagination = function() {
                if (w.params.pagination && w.paginationContainer && w.paginationContainer.length > 0) {
                    for (var e = "", a = w.params.loop ? Math.ceil((w.slides.length - 2 * w.loopedSlides) / w.params.slidesPerGroup) : w.snapGrid.length, t = 0; a > t; t++) { e += w.params.paginationBulletRender ? w.params.paginationBulletRender(t, w.params.bulletClass) : "<" + w.params.paginationElement + ' class="' + w.params.bulletClass + '"></' + w.params.paginationElement + ">" }
                    w.paginationContainer.html(e), w.bullets = w.paginationContainer.find("." + w.params.bulletClass), w.params.paginationClickable && w.params.a11y && w.a11y && w.a11y.initPagination()
                }
            }, w.update = function(e) {
                function a() { r = Math.min(Math.max(w.translate, w.maxTranslate()), w.minTranslate()), w.setWrapperTranslate(r), w.updateActiveIndex(), w.updateClasses() }
                if (w.updateContainerSize(), w.updateSlidesSize(), w.updateProgress(), w.updatePagination(), w.updateClasses(), w.params.scrollbar && w.scrollbar && w.scrollbar.set(), e) {
                    var t, r;
                    w.controller && w.controller.spline && (w.controller.spline = void 0), w.params.freeMode ? a() : (t = ("auto" === w.params.slidesPerView || w.params.slidesPerView > 1) && w.isEnd && !w.params.centeredSlides ? w.slideTo(w.slides.length - 1, 0, !1, !0) : w.slideTo(w.activeIndex, 0, !1, !0), t || a()) } }, w.onResize = function(e) {
                var a = w.params.allowSwipeToPrev,
                    t = w.params.allowSwipeToNext;
                if (w.params.allowSwipeToPrev = w.params.allowSwipeToNext = !0, w.updateContainerSize(), w.updateSlidesSize(), ("auto" === w.params.slidesPerView || w.params.freeMode || e) && w.updatePagination(), w.params.scrollbar && w.scrollbar && w.scrollbar.set(), w.controller && w.controller.spline && (w.controller.spline = void 0), w.params.freeMode) {
                    var r = Math.min(Math.max(w.translate, w.maxTranslate()), w.minTranslate());
                    w.setWrapperTranslate(r), w.updateActiveIndex(), w.updateClasses() } else { w.updateClasses(), ("auto" === w.params.slidesPerView || w.params.slidesPerView > 1) && w.isEnd && !w.params.centeredSlides ? w.slideTo(w.slides.length - 1, 0, !1, !0) : w.slideTo(w.activeIndex, 0, !1, !0) }
                w.params.allowSwipeToPrev = a, w.params.allowSwipeToNext = t };
            var y = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? y = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (y = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), w.touchEvents = { start: w.support.touch || !w.params.simulateTouch ? "touchstart" : y[0], move: w.support.touch || !w.params.simulateTouch ? "touchmove" : y[1], end: w.support.touch || !w.params.simulateTouch ? "touchend" : y[2] }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === w.params.touchEventsTarget ? w.container : w.wrapper).addClass("swiper-wp8-" + w.params.direction), w.initEvents = function(e) {
                var t = e ? "off" : "on",
                    r = e ? "removeEventListener" : "addEventListener",
                    i = "container" === w.params.touchEventsTarget ? w.container[0] : w.wrapper[0],
                    n = w.support.touch ? i : document,
                    o = w.params.nested ? !0 : !1;
                w.browser.ie ? (i[r](w.touchEvents.start, w.onTouchStart, !1), n[r](w.touchEvents.move, w.onTouchMove, o), n[r](w.touchEvents.end, w.onTouchEnd, !1)) : (w.support.touch && (i[r](w.touchEvents.start, w.onTouchStart, !1), i[r](w.touchEvents.move, w.onTouchMove, o), i[r](w.touchEvents.end, w.onTouchEnd, !1)), !s.simulateTouch || w.device.ios || w.device.android || (i[r]("mousedown", w.onTouchStart, !1), document[r]("mousemove", w.onTouchMove, o), document[r]("mouseup", w.onTouchEnd, !1))), window[r]("resize", w.onResize), w.params.nextButton && (a(w.params.nextButton)[t]("click", w.onClickNext), w.params.a11y && w.a11y && a(w.params.nextButton)[t]("keydown", w.a11y.onEnterKey)), w.params.prevButton && (a(w.params.prevButton)[t]("click", w.onClickPrev), w.params.a11y && w.a11y && a(w.params.prevButton)[t]("keydown", w.a11y.onEnterKey)), w.params.pagination && w.params.paginationClickable && (a(w.paginationContainer)[t]("click", "." + w.params.bulletClass, w.onClickIndex), w.params.a11y && w.a11y && a(w.paginationContainer)[t]("keydown", "." + w.params.bulletClass, w.a11y.onEnterKey)), (w.params.preventClicks || w.params.preventClicksPropagation) && i[r]("click", w.preventClicks, !0)
            }, w.attachEvents = function(e) { w.initEvents() }, w.detachEvents = function() { w.initEvents(!0) }, w.allowClick = !0, w.preventClicks = function(e) { w.allowClick || (w.params.preventClicks && e.preventDefault(), w.params.preventClicksPropagation && w.animating && (e.stopPropagation(), e.stopImmediatePropagation())) }, w.onClickNext = function(e) {
             e.preventDefault(), (!w.isEnd || w.params.loop) && w.slideNext() }, 
             w.onClickPrev = function(e) { 
             	e.preventDefault(), 
             	(!w.isBeginning || w.params.loop) && w.slidePrev() 
             },
              w.onClickIndex = function(e) { e.preventDefault();
                var t = a(this).index() * w.params.slidesPerGroup;
                w.params.loop && (t += w.loopedSlides), w.slideTo(t) 
                console.log("阻止默认是事件2")
            	return false;
            }, w.updateClickedSlide = function(e) {
                var t = l(e, "." + w.params.slideClass),
                    r = !1;
                if (t) {
                    for (var s = 0; s < w.slides.length; s++) { w.slides[s] === t && (r = !0) } }
                if (!t || !r) {
                    return w.clickedSlide = void 0, void(w.clickedIndex = void 0) }
                if (w.clickedSlide = t, w.clickedIndex = a(t).index(), w.params.slideToClickedSlide && void 0 !== w.clickedIndex && w.clickedIndex !== w.activeIndex) {
                    var i, n = w.clickedIndex;
                    if (w.params.loop) {
                        if (i = a(w.clickedSlide).attr("data-swiper-slide-index"), n > w.slides.length - w.params.slidesPerView) { w.fixLoop(), n = w.wrapper.children("." + w.params.slideClass + '[data-swiper-slide-index="' + i + '"]').eq(0).index(), setTimeout(function() { w.slideTo(n) }, 0) } else {
                            if (n < w.params.slidesPerView - 1) { w.fixLoop();
                                var o = w.wrapper.children("." + w.params.slideClass + '[data-swiper-slide-index="' + i + '"]');
                                n = o.eq(o.length - 1).index(), setTimeout(function() { w.slideTo(n) }, 0) } else { w.slideTo(n) } } } else { w.slideTo(n) }
                }
            };
            var b, x, T, S, C, M, E, P, z, I = "input, select, textarea, button",
                k = Date.now(),
                L = [];
            w.animating = !1, w.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };
            var D, B;
            if (w.onTouchStart = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), D = "touchstart" === e.type, D || !("which" in e) || 3 !== e.which) {
                        if (w.params.noSwiping && l(e, "." + w.params.noSwipingClass)) {
                            return void(w.allowClick = !0) }
                        if (!w.params.swipeHandler || l(e, w.params.swipeHandler)) {
                            if (b = !0, x = !1, S = void 0, B = void 0, w.touches.startX = w.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, w.touches.startY = w.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, T = Date.now(), w.allowClick = !0, w.updateContainerSize(), w.swipeDirection = void 0, w.params.threshold > 0 && (E = !1), "touchstart" !== e.type) {
                                var t = !0;
                                a(e.target).is(I) && (t = !1), document.activeElement && a(document.activeElement).is(I) && document.activeElement.blur(), t && e.preventDefault() }
                            w.emit("onTouchStart", w, e) } } }, w.onTouchMove = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), !(D && "mousemove" === e.type || e.preventedByNestedSwiper)) {
                        if (w.params.onlyExternal) {
                            return w.allowClick = !1, void(b && (w.touches.startX = w.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, w.touches.startY = w.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, T = Date.now())) }
                        if (D && document.activeElement && e.target === document.activeElement && a(e.target).is(I)) {
                            return x = !0, void(w.allowClick = !1) }
                        if (w.emit("onTouchMove", w, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (w.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, w.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof S) {
                                var t = 180 * Math.atan2(Math.abs(w.touches.currentY - w.touches.startY), Math.abs(w.touches.currentX - w.touches.startX)) / Math.PI;
                                S = i() ? t > w.params.touchAngle : 90 - t > w.params.touchAngle
                            }
                            if (S && w.emit("onTouchMoveOpposite", w, e), "undefined" == typeof B && w.browser.ieTouch && (w.touches.currentX !== w.touches.startX || w.touches.currentY !== w.touches.startY) && (B = !0), b) {
                                if (S) {
                                    return void(b = !1) }
                                if (B || !w.browser.ieTouch) {
                                    w.allowClick = !1, w.emit("onSliderMove", w, e), e.preventDefault(), w.params.touchMoveStopPropagation && !w.params.nested && e.stopPropagation(), x || (s.loop && w.fixLoop(), M = w.getWrapperTranslate(), w.setWrapperTransition(0), w.animating && w.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), w.params.autoplay && w.autoplaying && (w.params.autoplayDisableOnInteraction ? w.stopAutoplay() : w.pauseAutoplay()), z = !1, w.params.grabCursor && (w.container[0].style.cursor = "move", w.container[0].style.cursor = "-webkit-grabbing", w.container[0].style.cursor = "-moz-grabbin", w.container[0].style.cursor = "grabbing")), x = !0;
                                    var r = w.touches.diff = i() ? w.touches.currentX - w.touches.startX : w.touches.currentY - w.touches.startY;
                                    r *= w.params.touchRatio, w.rtl && (r = -r), w.swipeDirection = r > 0 ? "prev" : "next", C = r + M;
                                    var n = !0;
                                    if (r > 0 && C > w.minTranslate() ? (n = !1, w.params.resistance && (C = w.minTranslate() - 1 + Math.pow(-w.minTranslate() + M + r, w.params.resistanceRatio))) : 0 > r && C < w.maxTranslate() && (n = !1, w.params.resistance && (C = w.maxTranslate() + 1 - Math.pow(w.maxTranslate() - M - r, w.params.resistanceRatio))), n && (e.preventedByNestedSwiper = !0), !w.params.allowSwipeToNext && "next" === w.swipeDirection && M > C && (C = M), !w.params.allowSwipeToPrev && "prev" === w.swipeDirection && C > M && (C = M), w.params.followFinger) {
                                        if (w.params.threshold > 0) {
                                            if (!(Math.abs(r) > w.params.threshold || E)) {
                                                return void(C = M) }
                                            if (!E) {
                                                return E = !0, w.touches.startX = w.touches.currentX, w.touches.startY = w.touches.currentY, C = M, void(w.touches.diff = i() ? w.touches.currentX - w.touches.startX : w.touches.currentY - w.touches.startY) } }(w.params.freeMode || w.params.watchSlidesProgress) && w.updateActiveIndex(), w.params.freeMode && (0 === L.length && L.push({ position: w.touches[i() ? "startX" : "startY"], time: T }), L.push({ position: w.touches[i() ? "currentX" : "currentY"], time: (new window.Date).getTime() })), w.updateProgress(C), w.setWrapperTranslate(C)
                                    }
                                }
                            }
                        }
                    }
                }, w.onTouchEnd = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), w.emit("onTouchEnd", w, e), b) {
                        w.params.grabCursor && x && b && (w.container[0].style.cursor = "move", w.container[0].style.cursor = "-webkit-grab", w.container[0].style.cursor = "-moz-grab", w.container[0].style.cursor = "grab");
                        var t = Date.now(),
                            r = t - T;
                        if (w.allowClick && (w.updateClickedSlide(e), w.emit("onTap", w, e), 300 > r && t - k > 300 && (P && clearTimeout(P), P = setTimeout(function() { w && (w.params.paginationHide && w.paginationContainer.length > 0 && !a(e.target).hasClass(w.params.bulletClass) && w.paginationContainer.toggleClass(w.params.paginationHiddenClass), w.emit("onClick", w, e)) }, 300)), 300 > r && 300 > t - k && (P && clearTimeout(P), w.emit("onDoubleTap", w, e))), k = Date.now(), setTimeout(function() { w && (w.allowClick = !0) }, 0), !b || !x || !w.swipeDirection || 0 === w.touches.diff || C === M) {
                            return void(b = x = !1) }
                        b = x = !1;
                        var s;
                        if (s = w.params.followFinger ? w.rtl ? w.translate : -w.translate : -C, w.params.freeMode) {
                            if (s < -w.minTranslate()) {
                                return void w.slideTo(w.activeIndex) }
                            if (s > -w.maxTranslate()) {
                                return void w.slideTo(w.slides.length < w.snapGrid.length ? w.snapGrid.length - 1 : w.slides.length - 1) }
                            if (w.params.freeModeMomentum) {
                                if (L.length > 1) {
                                    var i = L.pop(),
                                        n = L.pop(),
                                        o = i.position - n.position,
                                        l = i.time - n.time;
                                    w.velocity = o / l, w.velocity = w.velocity / 2, Math.abs(w.velocity) < 0.02 && (w.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (w.velocity = 0) } else { w.velocity = 0 }
                                L.length = 0;
                                var d = 1000 * w.params.freeModeMomentumRatio,
                                    p = w.velocity * d,
                                    u = w.translate + p;
                                w.rtl && (u = -u);
                                var c, m = !1,
                                    f = 20 * Math.abs(w.velocity) * w.params.freeModeMomentumBounceRatio;
                                if (u < w.maxTranslate()) { w.params.freeModeMomentumBounce ? (u + w.maxTranslate() < -f && (u = w.maxTranslate() - f), c = w.maxTranslate(), m = !0, z = !0) : u = w.maxTranslate() } else {
                                    if (u > w.minTranslate()) { w.params.freeModeMomentumBounce ? (u - w.minTranslate() > f && (u = w.minTranslate() + f), c = w.minTranslate(), m = !0, z = !0) : u = w.minTranslate() } else {
                                        if (w.params.freeModeSticky) {
                                            var h, g = 0;
                                            for (g = 0; g < w.snapGrid.length; g += 1) {
                                                if (w.snapGrid[g] > -u) { h = g;
                                                    break } }
                                            u = Math.abs(w.snapGrid[h] - u) < Math.abs(w.snapGrid[h - 1] - u) || "next" === w.swipeDirection ? w.snapGrid[h] : w.snapGrid[h - 1], w.rtl || (u = -u)
                                        }
                                    }
                                }
                                if (0 !== w.velocity) { d = Math.abs(w.rtl ? (-u - w.translate) / w.velocity : (u - w.translate) / w.velocity) } else {
                                    if (w.params.freeModeSticky) {
                                        return void w.slideReset() } }
                                w.params.freeModeMomentumBounce && m ? (w.updateProgress(c), w.setWrapperTransition(d), w.setWrapperTranslate(u), w.onTransitionStart(), w.animating = !0, w.wrapper.transitionEnd(function() { w && z && (w.emit("onMomentumBounce", w), w.setWrapperTransition(w.params.speed), w.setWrapperTranslate(c), w.wrapper.transitionEnd(function() { w && w.onTransitionEnd() })) })) : w.velocity ? (w.updateProgress(u), w.setWrapperTransition(d), w.setWrapperTranslate(u), w.onTransitionStart(), w.animating || (w.animating = !0, w.wrapper.transitionEnd(function() { w && w.onTransitionEnd() }))) : w.updateProgress(u), w.updateActiveIndex()
                            }
                            return void((!w.params.freeModeMomentum || r >= w.params.longSwipesMs) && (w.updateProgress(), w.updateActiveIndex()))
                        }
                        var v, y = 0,
                            S = w.slidesSizesGrid[0];
                        for (v = 0; v < w.slidesGrid.length; v += w.params.slidesPerGroup) { "undefined" != typeof w.slidesGrid[v + w.params.slidesPerGroup] ? s >= w.slidesGrid[v] && s < w.slidesGrid[v + w.params.slidesPerGroup] && (y = v, S = w.slidesGrid[v + w.params.slidesPerGroup] - w.slidesGrid[v]) : s >= w.slidesGrid[v] && (y = v, S = w.slidesGrid[w.slidesGrid.length - 1] - w.slidesGrid[w.slidesGrid.length - 2]) }
                        var E = (s - w.slidesGrid[y]) / S;
                        if (r > w.params.longSwipesMs) {
                            if (!w.params.longSwipes) {
                                return void w.slideTo(w.activeIndex) } "next" === w.swipeDirection && w.slideTo(E >= w.params.longSwipesRatio ? y + w.params.slidesPerGroup : y), "prev" === w.swipeDirection && w.slideTo(E > 1 - w.params.longSwipesRatio ? y + w.params.slidesPerGroup : y) } else {
                            if (!w.params.shortSwipes) {
                                return void w.slideTo(w.activeIndex) } "next" === w.swipeDirection && w.slideTo(y + w.params.slidesPerGroup), "prev" === w.swipeDirection && w.slideTo(y) }
                    }
                }, w._slideTo = function(e, a) {
                    return w.slideTo(e, a, !0, !0) }, w.slideTo = function(e, a, t, r) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), w.snapIndex = Math.floor(e / w.params.slidesPerGroup), w.snapIndex >= w.snapGrid.length && (w.snapIndex = w.snapGrid.length - 1);
                    var s = -w.snapGrid[w.snapIndex];
                    if (!w.params.allowSwipeToNext && s < w.translate && s < w.minTranslate()) {
                        return !1 }
                    if (!w.params.allowSwipeToPrev && s > w.translate && s > w.maxTranslate()) {
                        return !1 }
                    w.params.autoplay && w.autoplaying && (r || !w.params.autoplayDisableOnInteraction ? w.pauseAutoplay(a) : w.stopAutoplay()), w.updateProgress(s);
                    for (var n = 0; n < w.slidesGrid.length; n++) {-Math.floor(100 * s) >= Math.floor(100 * w.slidesGrid[n]) && (e = n) }
                    if ("undefined" == typeof a && (a = w.params.speed), w.previousIndex = w.activeIndex || 0, w.activeIndex = e, s === w.translate) {
                        return w.updateClasses(), !1 }
                    w.updateClasses(), w.onTransitionStart(t);
                    i() ? s : 0, i() ? 0 : s;
                    return 0 === a ? (w.setWrapperTransition(0), w.setWrapperTranslate(s), w.onTransitionEnd(t)) : (w.setWrapperTransition(a), w.setWrapperTranslate(s), w.animating || (w.animating = !0, w.wrapper.transitionEnd(function() { w && w.onTransitionEnd(t) }))), !0
                }, w.onTransitionStart = function(e) { "undefined" == typeof e && (e = !0), w.lazy && w.lazy.onTransitionStart(), e && (w.emit("onTransitionStart", w), w.activeIndex !== w.previousIndex && w.emit("onSlideChangeStart", w)) }, w.onTransitionEnd = function(e) { w.animating = !1, w.setWrapperTransition(0), "undefined" == typeof e && (e = !0), w.lazy && w.lazy.onTransitionEnd(), e && (w.emit("onTransitionEnd", w), w.activeIndex !== w.previousIndex && w.emit("onSlideChangeEnd", w)), w.params.hashnav && w.hashnav && w.hashnav.setHash() }, w.slideNext = function(e, a, t) {
                    if (w.params.loop) {
                        if (w.animating) {
                            return !1 }
                        w.fixLoop();
                        w.container[0].clientLeft;
                        return w.slideTo(w.activeIndex + w.params.slidesPerGroup, a, e, t) }
                    return w.slideTo(w.activeIndex + w.params.slidesPerGroup, a, e, t) }, w._slideNext = function(e) {
                    return w.slideNext(!0, e, !0) }, w.slidePrev = function(e, a, t) {
                    if (w.params.loop) {
                        if (w.animating) {
                            return !1 }
                        w.fixLoop();
                        w.container[0].clientLeft;
                        return w.slideTo(w.activeIndex - 1, a, e, t) }
                    return w.slideTo(w.activeIndex - 1, a, e, t) }, w._slidePrev = function(e) {
                    return w.slidePrev(!0, e, !0) }, w.slideReset = function(e, a, t) {
                    return w.slideTo(w.activeIndex, a, e) }, w.setWrapperTransition = function(e, a) {
                    w.wrapper.transition(e), "slide" !== w.params.effect && w.effects[w.params.effect] && w.effects[w.params.effect].setTransition(e), w.params.parallax && w.parallax && w.parallax.setTransition(e), w.params.scrollbar && w.scrollbar && w.scrollbar.setTransition(e), w.params.control && w.controller && w.controller.setTransition(e, a), w.emit("onSetTransition", w, e)
                }, w.setWrapperTranslate = function(e, a, t) {
                    var r = 0,
                        s = 0,
                        n = 0;
                    i() ? r = w.rtl ? -e : e : s = e, w.params.virtualTranslate || w.wrapper.transform(w.support.transforms3d ? "translate3d(" + r + "px, " + s + "px, " + n + "px)" : "translate(" + r + "px, " + s + "px)"), w.translate = i() ? r : s, a && w.updateActiveIndex(), "slide" !== w.params.effect && w.effects[w.params.effect] && w.effects[w.params.effect].setTranslate(w.translate), w.params.parallax && w.parallax && w.parallax.setTranslate(w.translate), w.params.scrollbar && w.scrollbar && w.scrollbar.setTranslate(w.translate), w.params.control && w.controller && w.controller.setTranslate(w.translate, t), w.emit("onSetTranslate", w, w.translate) }, w.getTranslate = function(e, a) {
                    var t, r, s, i;
                    return "undefined" == typeof a && (a = "x"), w.params.virtualTranslate ? w.rtl ? -w.translate : w.translate : (s = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? i = new window.WebKitCSSMatrix("none" === s.webkitTransform ? "" : s.webkitTransform) : (i = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? i.m41 : parseFloat(16 === t.length ? t[12] : t[4])), "y" === a && (r = window.WebKitCSSMatrix ? i.m42 : parseFloat(16 === t.length ? t[13] : t[5])), w.rtl && r && (r = -r), r || 0) }, w.getWrapperTranslate = function(e) {
                    return "undefined" == typeof e && (e = i() ? "x" : "y"), w.getTranslate(w.wrapper[0], e) }, w.observers = [], w.initObservers = function() {
                    if (w.params.observeParents) {
                        for (var e = w.container.parents(), a = 0; a < e.length; a++) { d(e[a]) } }
                    d(w.container[0], { childList: !1 }), d(w.wrapper[0], { attributes: !1 }) }, w.disconnectObservers = function() {
                    for (var e = 0; e < w.observers.length; e++) { w.observers[e].disconnect() }
                    w.observers = [] }, w.createLoop = function() {
                    w.wrapper.children("." + w.params.slideClass + "." + w.params.slideDuplicateClass).remove();
                    var e = w.wrapper.children("." + w.params.slideClass);
                    w.loopedSlides = parseInt(w.params.loopedSlides || w.params.slidesPerView, 10), w.loopedSlides = w.loopedSlides + w.params.loopAdditionalSlides, w.loopedSlides > e.length && (w.loopedSlides = e.length);
                    var t, r = [],
                        s = [];
                    for (e.each(function(t, i) {
                            var n = a(this);
                            t < w.loopedSlides && s.push(i), t < e.length && t >= e.length - w.loopedSlides && r.push(i), n.attr("data-swiper-slide-index", t) }), t = 0; t < s.length; t++) { w.wrapper.append(a(s[t].cloneNode(!0)).addClass(w.params.slideDuplicateClass)) }
                    for (t = r.length - 1; t >= 0; t--) { w.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(w.params.slideDuplicateClass)) }
                }, w.destroyLoop = function() { w.wrapper.children("." + w.params.slideClass + "." + w.params.slideDuplicateClass).remove(), w.slides.removeAttr("data-swiper-slide-index") }, w.fixLoop = function() {
                    var e;
                    w.activeIndex < w.loopedSlides ? (e = w.slides.length - 3 * w.loopedSlides + w.activeIndex, e += w.loopedSlides, w.slideTo(e, 0, !1, !0)) : ("auto" === w.params.slidesPerView && w.activeIndex >= 2 * w.loopedSlides || w.activeIndex > w.slides.length - 2 * w.params.slidesPerView) && (e = -w.slides.length + w.activeIndex + w.loopedSlides, e += w.loopedSlides, w.slideTo(e, 0, !1, !0)) }, w.appendSlide = function(e) {
                    if (w.params.loop && w.destroyLoop(), "object" == typeof e && e.length) {
                        for (var a = 0; a < e.length; a++) { e[a] && w.wrapper.append(e[a]) } } else { w.wrapper.append(e) }
                    w.params.loop && w.createLoop(), w.params.observer && w.support.observer || w.update(!0) }, w.prependSlide = function(e) { w.params.loop && w.destroyLoop();
                    var a = w.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) { e[t] && w.wrapper.prepend(e[t]) }
                        a = w.activeIndex + e.length } else { w.wrapper.prepend(e) }
                    w.params.loop && w.createLoop(), w.params.observer && w.support.observer || w.update(!0), w.slideTo(a, 0, !1) }, w.removeSlide = function(e) { w.params.loop && (w.destroyLoop(), w.slides = w.wrapper.children("." + w.params.slideClass));
                    var a, t = w.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++) { a = e[r], w.slides[a] && w.slides.eq(a).remove(), t > a && t-- }
                        t = Math.max(t, 0) } else { a = e, w.slides[a] && w.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0) }
                    w.params.loop && w.createLoop(), w.params.observer && w.support.observer || w.update(!0), w.params.loop ? w.slideTo(t + w.loopedSlides, 0, !1) : w.slideTo(t, 0, !1) }, w.removeAllSlides = function() {
                    for (var e = [], a = 0; a < w.slides.length; a++) { e.push(a) }
                    w.removeSlide(e)
                }, w.effects = {
                    fade: { setTranslate: function() {
                            for (var e = 0; e < w.slides.length; e++) {
                                var a = w.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    r = -t;
                                w.params.virtualTranslate || (r -= w.translate);
                                var s = 0;
                                i() || (s = r, r = 0);
                                var n = w.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({ opacity: n }).transform("translate3d(" + r + "px, " + s + "px, 0px)") } }, setTransition: function(e) {
                            if (w.slides.transition(e), w.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                w.slides.transitionEnd(function() {
                                    if (!a && w) { a = !0, w.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) { w.wrapper.trigger(e[t]) } } }) } } },
                    cube: {
                        setTranslate: function() {
                            var e, t = 0;
                            w.params.cube.shadow && (i() ? (e = w.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), w.wrapper.append(e)), e.css({ height: w.width + "px" })) : (e = w.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), w.container.append(e))));
                            for (var r = 0; r < w.slides.length; r++) {
                                var s = w.slides.eq(r),
                                    n = 90 * r,
                                    o = Math.floor(n / 360);
                                w.rtl && (n = -n, o = Math.floor(-n / 360));
                                var l = Math.max(Math.min(s[0].progress, 1), -1),
                                    d = 0,
                                    p = 0,
                                    u = 0;
                                r % 4 === 0 ? (d = 4 * -o * w.size, u = 0) : (r - 1) % 4 === 0 ? (d = 0, u = 4 * -o * w.size) : (r - 2) % 4 === 0 ? (d = w.size + 4 * o * w.size, u = w.size) : (r - 3) % 4 === 0 && (d = -w.size, u = 3 * w.size + 4 * w.size * o), w.rtl && (d = -d), i() || (p = d, d = 0);
                                var c = "rotateX(" + (i() ? 0 : -n) + "deg) rotateY(" + (i() ? n : 0) + "deg) translate3d(" + d + "px, " + p + "px, " + u + "px)";
                                if (1 >= l && l > -1 && (t = 90 * r + 90 * l, w.rtl && (t = 90 * -r - 90 * l)), s.transform(c), w.params.cube.slideShadows) {
                                    var m = s.find(i() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        f = s.find(i() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") + '"></div>'), s.append(m)), 0 === f.length && (f = a('<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'), s.append(f));
                                    s[0].progress;
                                    m.length && (m[0].style.opacity = -s[0].progress), f.length && (f[0].style.opacity = s[0].progress)
                                }
                            }
                            if (w.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + w.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + w.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + w.size / 2 + "px", "transform-origin": "50% 50% -" + w.size / 2 + "px" }), w.params.cube.shadow) {
                                if (i()) { e.transform("translate3d(0px, " + (w.width / 2 + w.params.cube.shadowOffset) + "px, " + -w.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + w.params.cube.shadowScale + ")") } else {
                                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                        v = w.params.cube.shadowScale,
                                        y = w.params.cube.shadowScale / g,
                                        b = w.params.cube.shadowOffset;
                                    e.transform("scale3d(" + v + ", 1, " + y + ") translate3d(0px, " + (w.height / 2 + b) + "px, " + -w.height / 2 / y + "px) rotateX(-90deg)") } }
                            var x = w.isSafari || w.isUiWebView ? -w.size / 2 : 0;
                            w.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (i() ? 0 : t) + "deg) rotateY(" + (i() ? -t : 0) + "deg)")
                        },
                        setTransition: function(e) { w.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), w.params.cube.shadow && !i() && w.container.find(".swiper-cube-shadow").transition(e) }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var e = w.translate, t = i() ? -e + w.width / 2 : -e + w.height / 2, r = i() ? w.params.coverflow.rotate : -w.params.coverflow.rotate, s = w.params.coverflow.depth, n = 0, o = w.slides.length; o > n; n++) {
                                var l = w.slides.eq(n),
                                    d = w.slidesSizesGrid[n],
                                    p = l[0].swiperSlideOffset,
                                    u = (t - p - d / 2) / d * w.params.coverflow.modifier,
                                    c = i() ? r * u : 0,
                                    m = i() ? 0 : r * u,
                                    f = -s * Math.abs(u),
                                    h = i() ? 0 : w.params.coverflow.stretch * u,
                                    g = i() ? w.params.coverflow.stretch * u : 0;
                                Math.abs(g) < 0.001 && (g = 0), Math.abs(h) < 0.001 && (h = 0), Math.abs(f) < 0.001 && (f = 0), Math.abs(c) < 0.001 && (c = 0), Math.abs(m) < 0.001 && (m = 0);
                                var v = "translate3d(" + g + "px," + h + "px," + f + "px)  rotateX(" + m + "deg) rotateY(" + c + "deg)";
                                if (l.transform(v), l[0].style.zIndex = -Math.abs(Math.round(u)) + 1, w.params.coverflow.slideShadows) {
                                    var y = l.find(i() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        b = l.find(i() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === y.length && (y = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") + '"></div>'), l.append(y)), 0 === b.length && (b = a('<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'), l.append(b)), y.length && (y[0].style.opacity = u > 0 ? u : 0), b.length && (b[0].style.opacity = -u > 0 ? -u : 0)
                                }
                            }
                            if (w.browser.ie) {
                                var x = w.wrapper[0].style;
                                x.perspectiveOrigin = t + "px 50%" }
                        },
                        setTransition: function(e) { w.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e) }
                    }
                }, w.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== w.slides.length)) {
                            var r = w.slides.eq(e),
                                s = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || s.add(r[0]), 0 !== s.length && s.each(function() {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var s = e.attr("data-background"),
                                    i = e.attr("data-src");
                                w.loadImage(e[0], i || s, !1, function() {
                                    if (s ? (e.css("background-image", "url(" + s + ")"), e.removeAttr("data-background")) : (e.attr("src", i), e.removeAttr("data-src")), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), w.params.loop && t) {
                                        var a = r.attr("data-swiper-slide-index");
                                        if (r.hasClass(w.params.slideDuplicateClass)) {
                                            var n = w.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + w.params.slideDuplicateClass + ")");
                                            w.lazy.loadImageInSlide(n.index(), !1) } else {
                                            var o = w.wrapper.children("." + w.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            w.lazy.loadImageInSlide(o.index(), !1) } }
                                    w.emit("onLazyImageReady", w, r[0], e[0]) }), w.emit("onLazyImageLoad", w, r[0], e[0]) }) } },
                    load: function() {
                        var e;
                        if (w.params.watchSlidesVisibility) { w.wrapper.children("." + w.params.slideVisibleClass).each(function() { w.lazy.loadImageInSlide(a(this).index()) }) } else {
                            if (w.params.slidesPerView > 1) {
                                for (e = w.activeIndex; e < w.activeIndex + w.params.slidesPerView; e++) { w.slides[e] && w.lazy.loadImageInSlide(e) }
                            } else { w.lazy.loadImageInSlide(w.activeIndex) }
                        }
                        if (w.params.lazyLoadingInPrevNext) {
                            if (w.params.slidesPerView > 1) {
                                for (e = w.activeIndex + w.params.slidesPerView; e < w.activeIndex + w.params.slidesPerView + w.params.slidesPerView; e++) { w.slides[e] && w.lazy.loadImageInSlide(e) }
                                for (e = w.activeIndex - w.params.slidesPerView; e < w.activeIndex; e++) { w.slides[e] && w.lazy.loadImageInSlide(e) } } else {
                                var t = w.wrapper.children("." + w.params.slideNextClass);
                                t.length > 0 && w.lazy.loadImageInSlide(t.index());
                                var r = w.wrapper.children("." + w.params.slidePrevClass);
                                r.length > 0 && w.lazy.loadImageInSlide(r.index()) } }
                    },
                    onTransitionStart: function() { w.params.lazyLoading && (w.params.lazyLoadingOnTransitionStart || !w.params.lazyLoadingOnTransitionStart && !w.lazy.initialImageLoaded) && w.lazy.load() },
                    onTransitionEnd: function() { w.params.lazyLoading && !w.params.lazyLoadingOnTransitionStart && w.lazy.load() }
                }, w.scrollbar = {
                    set: function() {
                        if (w.params.scrollbar) {
                            var e = w.scrollbar;
                            e.track = a(w.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = i() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = w.size / w.virtualSize, e.moveDivider = e.divider * (e.trackSize / w.size), e.dragSize = e.trackSize * e.divider, i() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display = e.divider >= 1 ? "none" : "", w.params.scrollbarHide && (e.track[0].style.opacity = 0) } },
                    setTranslate: function() {
                        if (w.params.scrollbar) {
                            var e, a = w.scrollbar,
                                t = (w.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * w.progress, w.rtl && i() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), i() ? (a.drag.transform(w.support.transforms3d ? "translate3d(" + e + "px, 0, 0)" : "translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (a.drag.transform(w.support.transforms3d ? "translate3d(0px, " + e + "px, 0)" : "translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), w.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1000))
                        }
                    },
                    setTransition: function(e) { w.params.scrollbar && w.scrollbar.drag.transition(e) }
                }, w.controller = { LinearSpline: function(e, a) { this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, r;
                        this.x.length;
                        this.interpolate = function(e) {
                            return e ? (r = s(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0 };
                        var s = function() {
                            var e, a, t;
                            return function(r, s) {
                                for (a = -1, e = r.length; e - a > 1;) { r[t = e + a >> 1] <= s ? a = t : e = t }
                                return e } }() }, getInterpolateFunction: function(e) { w.controller.spline || (w.controller.spline = w.params.loop ? new w.controller.LinearSpline(w.slidesGrid, e.slidesGrid) : new w.controller.LinearSpline(w.snapGrid, e.snapGrid)) }, setTranslate: function(e, a) {
                        function r(a) { e = a.rtl && "horizontal" === a.params.direction ? -w.translate : w.translate, "slide" === w.params.controlBy && (w.controller.getInterpolateFunction(a), i = -w.controller.spline.interpolate(-e)), i && "container" !== w.params.controlBy || (s = (a.maxTranslate() - a.minTranslate()) / (w.maxTranslate() - w.minTranslate()), i = (e - w.minTranslate()) * s + a.minTranslate()), w.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, w), a.updateActiveIndex() }
                        var s, i, n = w.params.control;
                        if (w.isArray(n)) {
                            for (var o = 0; o < n.length; o++) { n[o] !== a && n[o] instanceof t && r(n[o]) } } else { n instanceof t && a !== n && r(n) } }, setTransition: function(e, a) {
                        function r(a) { a.setWrapperTransition(e, w), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() { i && (a.params.loop && "slide" === w.params.controlBy && a.fixLoop(), a.onTransitionEnd()) })) }
                        var s, i = w.params.control;
                        if (w.isArray(i)) {
                            for (s = 0; s < i.length; s++) { i[s] !== a && i[s] instanceof t && r(i[s]) } } else { i instanceof t && a !== i && r(i) } } }, w.hashnav = {
                    init: function() {
                        if (w.params.hashnav) { w.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e) {
                                for (var a = 0, t = 0, r = w.slides.length; r > t; t++) {
                                    var s = w.slides.eq(t),
                                        i = s.attr("data-hash");
                                    if (i === e && !s.hasClass(w.params.slideDuplicateClass)) {
                                        var n = s.index();
                                        w.slideTo(n, a, w.params.runCallbacksOnInit, !0) } } } } },
                    setHash: function() {
                        w.hashnav.initialized && w.params.hashnav && (document.location.hash = w.slides.eq(w.activeIndex).attr("data-hash") || "")
                    }
                }, w.disableKeyboardControl = function() { a(document).off("keydown", p) }, w.enableKeyboardControl = function() { a(document).on("keydown", p) }, w.mousewheel = { event: !1, lastScrollTime: (new window.Date).getTime() }, w.params.mousewheelControl) {
                if (void 0 !== document.onmousewheel && (w.mousewheel.event = "mousewheel"), !w.mousewheel.event) {
                    try { new window.WheelEvent("wheel"), w.mousewheel.event = "wheel" } catch (G) {} }
                w.mousewheel.event || (w.mousewheel.event = "DOMMouseScroll") }
            w.disableMousewheelControl = function() {
                return w.mousewheel.event ? (w.container.off(w.mousewheel.event, u), !0) : !1 }, w.enableMousewheelControl = function() {
                return w.mousewheel.event ? (w.container.on(w.mousewheel.event, u), !0) : !1 }, w.parallax = { setTranslate: function() { w.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() { c(this, w.progress) }), w.slides.each(function() {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            c(this, a) }) }) }, setTransition: function(e) { "undefined" == typeof e && (e = w.params.speed), w.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = a(this),
                            r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (r = 0), t.transition(r) }) } }, w._plugins = [];
            for (var O in w.plugins) {
                var A = w.plugins[O](w, w.params[O]);
                A && w._plugins.push(A) }
            return w.callPlugins = function(e) {
                for (var a = 0; a < w._plugins.length; a++) { e in w._plugins[a] && w._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) } }, w.emitterEventListeners = {}, w.emit = function(e) {
                w.params[e] && w.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (w.emitterEventListeners[e]) {
                    for (a = 0; a < w.emitterEventListeners[e].length; a++) { w.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) } }
                w.callPlugins && w.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, w.on = function(e, a) {
                return e = m(e), w.emitterEventListeners[e] || (w.emitterEventListeners[e] = []), w.emitterEventListeners[e].push(a), w }, w.off = function(e, a) {
                var t;
                if (e = m(e), "undefined" == typeof a) {
                    return w.emitterEventListeners[e] = [], w }
                if (w.emitterEventListeners[e] && 0 !== w.emitterEventListeners[e].length) {
                    for (t = 0; t < w.emitterEventListeners[e].length; t++) { w.emitterEventListeners[e][t] === a && w.emitterEventListeners[e].splice(t, 1) }
                    return w } }, w.once = function(e, a) { e = m(e);
                var t = function() { a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), w.off(e, t) };
                return w.on(e, t), w }, w.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e },
                addRole: function(e, a) {
                    return e.attr("role", a), e },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e },
                onEnterKey: function(e) { 13 === e.keyCode && (a(e.target).is(w.params.nextButton) ? (w.onClickNext(e), w.a11y.notify(w.isEnd ? w.params.lastSlideMessage : w.params.nextSlideMessage)) : a(e.target).is(w.params.prevButton) && (w.onClickPrev(e), w.a11y.notify(w.isBeginning ? w.params.firstSlideMessage : w.params.prevSlideMessage)), a(e.target).is("." + w.params.bulletClass) && a(e.target)[0].click()) },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = w.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e)) },
                init: function() {
                    if (w.params.nextButton) {
                        var e = a(w.params.nextButton);
                        w.a11y.makeFocusable(e), w.a11y.addRole(e, "button"), w.a11y.addLabel(e, w.params.nextSlideMessage) }
                    if (w.params.prevButton) {
                        var t = a(w.params.prevButton);
                        w.a11y.makeFocusable(t), w.a11y.addRole(t, "button"), w.a11y.addLabel(t, w.params.prevSlideMessage) }
                    a(w.container).append(w.a11y.liveRegion) },
                initPagination: function() {
                    w.params.pagination && w.params.paginationClickable && w.bullets && w.bullets.length && w.bullets.each(function() {
                        var e = a(this);
                        w.a11y.makeFocusable(e), w.a11y.addRole(e, "button"), w.a11y.addLabel(e, w.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function() { w.a11y.liveRegion && w.a11y.liveRegion.length > 0 && w.a11y.liveRegion.remove() }
            }, w.init = function() { w.params.loop && w.createLoop(), w.updateContainerSize(), w.updateSlidesSize(), w.updatePagination(), w.params.scrollbar && w.scrollbar && w.scrollbar.set(), "slide" !== w.params.effect && w.effects[w.params.effect] && (w.params.loop || w.updateProgress(), w.effects[w.params.effect].setTranslate()), w.params.loop ? w.slideTo(w.params.initialSlide + w.loopedSlides, 0, w.params.runCallbacksOnInit) : (w.slideTo(w.params.initialSlide, 0, w.params.runCallbacksOnInit), 0 === w.params.initialSlide && (w.parallax && w.params.parallax && w.parallax.setTranslate(), w.lazy && w.params.lazyLoading && (w.lazy.load(), w.lazy.initialImageLoaded = !0))), w.attachEvents(), w.params.observer && w.support.observer && w.initObservers(), w.params.preloadImages && !w.params.lazyLoading && w.preloadImages(), w.params.autoplay && w.startAutoplay(), w.params.keyboardControl && w.enableKeyboardControl && w.enableKeyboardControl(), w.params.mousewheelControl && w.enableMousewheelControl && w.enableMousewheelControl(), w.params.hashnav && w.hashnav && w.hashnav.init(), w.params.a11y && w.a11y && w.a11y.init(), w.emit("onInit", w) }, w.cleanupStyles = function() {
                w.container.removeClass(w.classNames.join(" ")).removeAttr("style"), w.wrapper.removeAttr("style"), w.slides && w.slides.length && w.slides.removeClass([w.params.slideVisibleClass, w.params.slideActiveClass, w.params.slideNextClass, w.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), w.paginationContainer && w.paginationContainer.length && w.paginationContainer.removeClass(w.params.paginationHiddenClass), w.bullets && w.bullets.length && w.bullets.removeClass(w.params.bulletActiveClass), w.params.prevButton && a(w.params.prevButton).removeClass(w.params.buttonDisabledClass), w.params.nextButton && a(w.params.nextButton).removeClass(w.params.buttonDisabledClass), w.params.scrollbar && w.scrollbar && (w.scrollbar.track && w.scrollbar.track.length && w.scrollbar.track.removeAttr("style"), w.scrollbar.drag && w.scrollbar.drag.length && w.scrollbar.drag.removeAttr("style"))
            }, w.destroy = function(e, a) { w.detachEvents(), w.stopAutoplay(), w.params.loop && w.destroyLoop(), a && w.cleanupStyles(), w.disconnectObservers(), w.params.keyboardControl && w.disableKeyboardControl && w.disableKeyboardControl(), w.params.mousewheelControl && w.disableMousewheelControl && w.disableMousewheelControl(), w.params.a11y && w.a11y && w.a11y.destroy(), w.emit("onDestroy"), e !== !1 && (w = null) }, w.init(), w
        }
    };
    t.prototype = { isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0 }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent), isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e) }, browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled, ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1 }, device: function() {
            var e = navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                s = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return { ios: t || s || r, android: a } }(), support: { touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e }(), flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
                    if (a[t] in e) {
                        return !0 } } }(), observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window }() }, plugins: {} };
    for (var r = (function() {
            var e = function(e) {
                    var a = this,
                        t = 0;
                    for (t = 0; t < e.length; t++) { a[t] = e[t] }
                    return a.length = e.length, this
                },
                a = function(a, t) {
                    var r = [],
                        s = 0;
                    if (a && !t && a instanceof e) {
                        return a }
                    if (a) {
                        if ("string" == typeof a) {
                            var i, n, o = a.trim();
                            if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                                var l = "div";
                                for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, s = 0; s < n.childNodes.length; s++) { r.push(n.childNodes[s]) } } else {
                                for (i = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], s = 0; s < i.length; s++) { i[s] && r.push(i[s]) } } } else {
                            if (a.nodeType || a === window || a === document) { r.push(a) } else {
                                if (a.length > 0 && a[0].nodeType) {
                                    for (s = 0; s < a.length; s++) { r.push(a[s]) } } } } }
                    return new e(r) };
            return e.prototype = {
                addClass: function(e) {
                    if ("undefined" == typeof e) {
                        return this }
                    for (var a = e.split(" "), t = 0; t < a.length; t++) {
                        for (var r = 0; r < this.length; r++) { this[r].classList.add(a[t]) } }
                    return this },
                removeClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++) {
                        for (var r = 0; r < this.length; r++) { this[r].classList.remove(a[t]) } }
                    return this },
                hasClass: function(e) {
                    return this[0] ? this[0].classList.contains(e) : !1 },
                toggleClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++) {
                        for (var r = 0; r < this.length; r++) { this[r].classList.toggle(a[t]) } }
                    return this },
                attr: function(e, a) {
                    if (1 === arguments.length && "string" == typeof e) {
                        return this[0] ? this[0].getAttribute(e) : void 0 }
                    for (var t = 0; t < this.length; t++) {
                        if (2 === arguments.length) { this[t].setAttribute(e, a) } else {
                            for (var r in e) { this[t][r] = e[r], this[t].setAttribute(r, e[r]) } } }
                    return this },
                removeAttr: function(e) {
                    for (var a = 0; a < this.length; a++) { this[a].removeAttribute(e) }
                    return this },
                data: function(e, a) {
                    if ("undefined" == typeof a) {
                        if (this[0]) {
                            var t = this[0].getAttribute("data-" + e);
                            return t ? t : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0 }
                        return void 0 }
                    for (var r = 0; r < this.length; r++) {
                        var s = this[r];
                        s.dom7ElementDataStorage || (s.dom7ElementDataStorage = {}), s.dom7ElementDataStorage[e] = a }
                    return this
                },
                transform: function(e) {
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e }
                    return this },
                transition: function(e) { "string" != typeof e && (e += "ms");
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e }
                    return this },
                on: function(e, t, r, s) {
                    function i(e) {
                        var s = e.target;
                        if (a(s).is(t)) { r.call(s, e) } else {
                            for (var i = a(s).parents(), n = 0; n < i.length; n++) { a(i[n]).is(t) && r.call(i[n], e) } } }
                    var n, o, l = e.split(" ");
                    for (n = 0; n < this.length; n++) {
                        if ("function" == typeof t || t === !1) {
                            for ("function" == typeof t && (r = arguments[1], s = arguments[2] || !1), o = 0; o < l.length; o++) { this[n].addEventListener(l[o], r, s) } } else {
                            for (o = 0; o < l.length; o++) { this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({ listener: r, liveListener: i }), this[n].addEventListener(l[o], i, s) } } }
                    return this },
                off: function(e, a, t, r) {
                    for (var s = e.split(" "), i = 0; i < s.length; i++) {
                        for (var n = 0; n < this.length; n++) {
                            if ("function" == typeof a || a === !1) { "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(s[i], t, r) } else {
                                if (this[n].dom7LiveListeners) {
                                    for (var o = 0; o < this[n].dom7LiveListeners.length; o++) { this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(s[i], this[n].dom7LiveListeners[o].liveListener, r) } } } } }
                    return this },
                once: function(e, a, t, r) {
                    function s(n) { t(n), i.off(e, a, s, r) }
                    var i = this; "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), i.on(e, a, s, r) },
                trigger: function(e, a) {
                    for (var t = 0; t < this.length; t++) {
                        var r;
                        try { r = new window.CustomEvent(e, { detail: a, bubbles: !0, cancelable: !0 }) } catch (s) { r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a }
                        this[t].dispatchEvent(r) }
                    return this },
                transitionEnd: function(e) {
                    function a(i) {
                        if (i.target === this) {
                            for (e.call(this, i), t = 0; t < r.length; t++) { s.off(r[t], a) }
                        }
                    }
                    var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                        s = this;
                    if (e) {
                        for (t = 0; t < r.length; t++) { s.on(r[t], a) } }
                    return this
                },
                width: function() {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null },
                outerWidth: function(e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null },
                height: function() {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null },
                outerHeight: function(e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null },
                offset: function() {
                    if (this.length > 0) {
                        var e = this[0],
                            a = e.getBoundingClientRect(),
                            t = document.body,
                            r = e.clientTop || t.clientTop || 0,
                            s = e.clientLeft || t.clientLeft || 0,
                            i = window.pageYOffset || e.scrollTop,
                            n = window.pageXOffset || e.scrollLeft;
                        return { top: a.top + i - r, left: a.left + n - s } }
                    return null },
                css: function(e, a) {
                    var t;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (t = 0; t < this.length; t++) {
                                for (var r in e) { this[t].style[r] = e[r] } }
                            return this }
                        if (this[0]) {
                            return window.getComputedStyle(this[0], null).getPropertyValue(e) } }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (t = 0; t < this.length; t++) { this[t].style[e] = a }
                        return this }
                    return this },
                each: function(e) {
                    for (var a = 0; a < this.length; a++) { e.call(this[a], a, this[a]) }
                    return this },
                html: function(e) {
                    if ("undefined" == typeof e) {
                        return this[0] ? this[0].innerHTML : void 0 }
                    for (var a = 0; a < this.length; a++) { this[a].innerHTML = e }
                    return this },
                is: function(t) {
                    if (!this[0]) {
                        return !1 }
                    var r, s;
                    if ("string" == typeof t) {
                        var i = this[0];
                        if (i === document) {
                            return t === document }
                        if (i === window) {
                            return t === window }
                        if (i.matches) {
                            return i.matches(t) }
                        if (i.webkitMatchesSelector) {
                            return i.webkitMatchesSelector(t) }
                        if (i.mozMatchesSelector) {
                            return i.mozMatchesSelector(t) }
                        if (i.msMatchesSelector) {
                            return i.msMatchesSelector(t) }
                        for (r = a(t), s = 0; s < r.length; s++) {
                            if (r[s] === this[0]) {
                                return !0
                            }
                        }
                        return !1
                    }
                    if (t === document) {
                        return this[0] === document }
                    if (t === window) {
                        return this[0] === window }
                    if (t.nodeType || t instanceof e) {
                        for (r = t.nodeType ? [t] : t, s = 0; s < r.length; s++) {
                            if (r[s] === this[0]) {
                                return !0 } }
                        return !1 }
                    return !1
                },
                index: function() {
                    if (this[0]) {
                        for (var e = this[0], a = 0; null !== (e = e.previousSibling);) { 1 === e.nodeType && a++ }
                        return a }
                    return void 0 },
                eq: function(a) {
                    if ("undefined" == typeof a) {
                        return this }
                    var t, r = this.length;
                    return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]]) },
                append: function(a) {
                    var t, r;
                    for (t = 0; t < this.length; t++) {
                        if ("string" == typeof a) {
                            var s = document.createElement("div");
                            for (s.innerHTML = a; s.firstChild;) { this[t].appendChild(s.firstChild) } } else {
                            if (a instanceof e) {
                                for (r = 0; r < a.length; r++) { this[t].appendChild(a[r]) } } else { this[t].appendChild(a) } } }
                    return this },
                prepend: function(a) {
                    var t, r;
                    for (t = 0; t < this.length; t++) {
                        if ("string" == typeof a) {
                            var s = document.createElement("div");
                            for (s.innerHTML = a, r = s.childNodes.length - 1; r >= 0; r--) { this[t].insertBefore(s.childNodes[r], this[t].childNodes[0]) } } else {
                            if (a instanceof e) {
                                for (r = 0; r < a.length; r++) { this[t].insertBefore(a[r], this[t].childNodes[0]) } } else { this[t].insertBefore(a, this[t].childNodes[0]) } } }
                    return this },
                insertBefore: function(e) {
                    for (var t = a(e), r = 0; r < this.length; r++) {
                        if (1 === t.length) { t[0].parentNode.insertBefore(this[r], t[0]) } else {
                            if (t.length > 1) {
                                for (var s = 0; s < t.length; s++) { t[s].parentNode.insertBefore(this[r].cloneNode(!0), t[s]) } } } } },
                insertAfter: function(e) {
                    for (var t = a(e), r = 0; r < this.length; r++) {
                        if (1 === t.length) { t[0].parentNode.insertBefore(this[r], t[0].nextSibling) } else {
                            if (t.length > 1) {
                                for (var s = 0; s < t.length; s++) { t[s].parentNode.insertBefore(this[r].cloneNode(!0), t[s].nextSibling) } } } } },
                next: function(t) {
                    return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : []) },
                nextAll: function(t) {
                    var r = [],
                        s = this[0];
                    if (!s) {
                        return new e([]) }
                    for (; s.nextElementSibling;) {
                        var i = s.nextElementSibling;
                        t ? a(i).is(t) && r.push(i) : r.push(i), s = i
                    }
                    return new e(r)
                },
                prev: function(t) {
                    return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : []) },
                prevAll: function(t) {
                    var r = [],
                        s = this[0];
                    if (!s) {
                        return new e([]) }
                    for (; s.previousElementSibling;) {
                        var i = s.previousElementSibling;
                        t ? a(i).is(t) && r.push(i) : r.push(i), s = i }
                    return new e(r) },
                parent: function(e) {
                    for (var t = [], r = 0; r < this.length; r++) { e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode) }
                    return a(a.unique(t)) },
                parents: function(e) {
                    for (var t = [], r = 0; r < this.length; r++) {
                        for (var s = this[r].parentNode; s;) { e ? a(s).is(e) && t.push(s) : t.push(s), s = s.parentNode } }
                    return a(a.unique(t)) },
                find: function(a) {
                    for (var t = [], r = 0; r < this.length; r++) {
                        for (var s = this[r].querySelectorAll(a), i = 0; i < s.length; i++) { t.push(s[i]) } }
                    return new e(t) },
                children: function(t) {
                    for (var r = [], s = 0; s < this.length; s++) {
                        for (var i = this[s].childNodes, n = 0; n < i.length; n++) { t ? 1 === i[n].nodeType && a(i[n]).is(t) && r.push(i[n]) : 1 === i[n].nodeType && r.push(i[n]) } }
                    return new e(a.unique(r)) },
                remove: function() {
                    for (var e = 0; e < this.length; e++) { this[e].parentNode && this[e].parentNode.removeChild(this[e]) }
                    return this },
                add: function() {
                    var e, t, r = this;
                    for (e = 0; e < arguments.length; e++) {
                        var s = a(arguments[e]);
                        for (t = 0; t < s.length; t++) { r[r.length] = s[t], r.length++ } }
                    return r }
            }, a.fn = e.prototype, a.unique = function(e) {
                for (var a = [], t = 0; t < e.length; t++) {-1 === a.indexOf(e[t]) && a.push(e[t]) }
                return a }, a
        }()), s = ["jQuery", "Zepto", "Dom7"], i = 0; i < s.length; i++) { window[s[i]] && e(window[s[i]]) }
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function(e) {
        function a(i) {
            if (i.target === this) {
                for (e.call(this, i), t = 0; t < r.length; t++) { s.off(r[t], a) } } }
        var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            s = this;
        if (e) {
            for (t = 0; t < r.length; t++) { s.on(r[t], a) } }
        return this }), "transform" in n.fn || (n.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e }
        return this
    }), "transition" in n.fn || (n.fn.transition = function(e) { "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e }
        return this })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    return window.Swiper });
/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
(function(window, document, Math) {
    var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) };
    var utils = (function() {
        var me = {};
        var _elementStyle = document.createElement("div").style;
        var _vendor = (function() {
            var vendors = ["t", "webkitT", "MozT", "msT", "OT"],
                transform, i = 0,
                l = vendors.length;
            for (; i < l; i++) { transform = vendors[i] + "ransform";
                if (transform in _elementStyle) {
                    return vendors[i].substr(0, vendors[i].length - 1) } }
            return false })();

        function _prefixStyle(style) {
            if (_vendor === false) {
                return false }
            if (_vendor === "") {
                return style }
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1) }
        me.getTime = Date.now || function getTime() {
            return new Date().getTime() };
        me.extend = function(target, obj) {
            for (var i in obj) { target[i] = obj[i] } };
        me.addEvent = function(el, type, fn, capture) { el.addEventListener(type, fn, !!capture) };
        me.removeEvent = function(el, type, fn, capture) { el.removeEventListener(type, fn, !!capture) };
        me.prefixPointerEvent = function(pointerEvent) {
            return window.MSPointerEvent ? "MSPointer" + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) : pointerEvent };
        me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
            var distance = current - start,
                speed = Math.abs(distance) / time,
                destination, duration;
            deceleration = deceleration === undefined ? 0.0006 : deceleration;
            destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
            duration = speed / deceleration;
            if (destination < lowerMargin) { destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed } else {
                if (destination > 0) { destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
                    distance = Math.abs(current) + destination;
                    duration = distance / speed } }
            return { destination: Math.round(destination), duration: duration } };
        var _transform = _prefixStyle("transform");
        me.extend(me, { hasTransform: _transform !== false, hasPerspective: _prefixStyle("perspective") in _elementStyle, hasTouch: "ontouchstart" in window, hasPointer: !!(window.PointerEvent || window.MSPointerEvent), hasTransition: _prefixStyle("transition") in _elementStyle });
        me.isBadAndroid = (function() {
            var appVersion = window.navigator.appVersion;
            if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
                var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
                if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
                    return parseFloat(safariVersion[1]) < 535.19 } else {
                    return true } } else {
                return false } })();
        me.extend(me.style = {}, { transform: _transform, transitionTimingFunction: _prefixStyle("transitionTimingFunction"), transitionDuration: _prefixStyle("transitionDuration"), transitionDelay: _prefixStyle("transitionDelay"), transformOrigin: _prefixStyle("transformOrigin") });
        me.hasClass = function(e, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
            return re.test(e.className) };
        me.addClass = function(e, c) {
            if (me.hasClass(e, c)) {
                return }
            var newclass = e.className.split(" ");
            newclass.push(c);
            e.className = newclass.join(" ") };
        me.removeClass = function(e, c) {
            if (!me.hasClass(e, c)) {
                return }
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
            e.className = e.className.replace(re, " ") };
        me.offset = function(el) {
            var left = -el.offsetLeft,
                top = -el.offsetTop;
            while (el = el.offsetParent) { left -= el.offsetLeft;
                top -= el.offsetTop }
            return { left: left, top: top } };
        me.preventDefaultException = function(el, exceptions) {
            for (var i in exceptions) {
                if (exceptions[i].test(el[i])) {
                    return true } }
            return false };
        me.extend(me.eventType = {}, { touchstart: 1, touchmove: 1, touchend: 1, mousedown: 2, mousemove: 2, mouseup: 2, pointerdown: 3, pointermove: 3, pointerup: 3, MSPointerDown: 3, MSPointerMove: 3, MSPointerUp: 3 });
        me.extend(me.ease = {}, {
            quadratic: { style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(k) {
                    return k * (2 - k) } },
            circular: { style: "cubic-bezier(0.1, 0.57, 0.1, 1)", fn: function(k) {
                    return Math.sqrt(1 - (--k * k)) } },
            back: {
                style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                fn: function(k) {
                    var b = 4;
                    return (k = k - 1) * k * ((b + 1) * k + b) + 1
                }
            },
            bounce: { style: "", fn: function(k) {
                    if ((k /= 1) < (1 / 2.75)) {
                        return 7.5625 * k * k } else {
                        if (k < (2 / 2.75)) {
                            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75 } else {
                            if (k < (2.5 / 2.75)) {
                                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375 } else {
                                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375 } } } } },
            elastic: { style: "", fn: function(k) {
                    var f = 0.22,
                        e = 0.4;
                    if (k === 0) {
                        return 0 }
                    if (k == 1) {
                        return 1 }
                    return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1) } }
        });
        me.tap = function(e, eventName) {
            var ev = document.createEvent("Event");
            ev.initEvent(eventName, true, true);
            ev.pageX = e.pageX;
            ev.pageY = e.pageY;
            e.target.dispatchEvent(ev) };
        me.click = function(e) {
            var target = e.target,
                ev;
            if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) { ev = document.createEvent(window.MouseEvent ? "MouseEvents" : "Event");
                ev.initEvent("click", true, true);
                ev.view = e.view || window;
                ev.detail = 1;
                ev.screenX = target.screenX || 0;
                ev.screenY = target.screenY || 0;
                ev.clientX = target.clientX || 0;
                ev.clientY = target.clientY || 0;
                ev.ctrlKey = !!e.ctrlKey;
                ev.altKey = !!e.altKey;
                ev.shiftKey = !!e.shiftKey;
                ev.metaKey = !!e.metaKey;
                ev.button = 0;
                ev.relatedTarget = null;
                ev._constructed = true;
                target.dispatchEvent(ev) } };
        return me
    })();

    function IScroll(el, options) {
        this.wrapper = typeof el == "string" ? document.querySelector(el) : el;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;
        this.options = { resizeScrollbars: true, mouseWheelSpeed: 20, snapThreshold: 0.334, disablePointer: !utils.hasPointer, disableTouch: utils.hasPointer || !utils.hasTouch, disableMouse: utils.hasPointer || utils.hasTouch, startX: 0, startY: 0, scrollY: true, directionLockThreshold: 5, momentum: true, bounce: true, bounceTime: 600, bounceEasing: "", preventDefault: true, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, HWCompositing: true, useTransition: true, useTransform: true, bindToWrapper: typeof window.onmousedown === "undefined" };
        for (var i in options) { this.options[i] = options[i] }
        this.translateZ = this.options.HWCompositing && utils.hasPerspective ? " translateZ(0)" : "";
        this.options.useTransition = utils.hasTransition && this.options.useTransition;
        this.options.useTransform = utils.hasTransform && this.options.useTransform;
        this.options.eventPassthrough = this.options.eventPassthrough === true ? "vertical" : this.options.eventPassthrough;
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
        this.options.scrollY = this.options.eventPassthrough == "vertical" ? false : this.options.scrollY;
        this.options.scrollX = this.options.eventPassthrough == "horizontal" ? false : this.options.scrollX;
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
        this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
        this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
        if (this.options.tap === true) { this.options.tap = "tap" }
        if (!this.options.useTransition && !this.options.useTransform) {
            if (!(/relative|absolute/i).test(this.scrollerStyle.position)) { this.scrollerStyle.position = "relative" } }
        if (this.options.shrinkScrollbars == "scale") { this.options.useTransition = false }
        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};
        this._init();
        this.refresh();
        this.scrollTo(this.options.startX, this.options.startY);
        this.enable()
    }
    IScroll.prototype = {
        version: "5.2.0",
        _init: function() { this._initEvents();
            if (this.options.scrollbars || this.options.indicators) { this._initIndicators() }
            if (this.options.mouseWheel) { this._initWheel() }
            if (this.options.snap) { this._initSnap() }
            if (this.options.keyBindings) { this._initKeys() } },
        destroy: function() { this._initEvents(true);
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = null;
            this._execEvent("destroy") },
        _transitionEnd: function(e) {
            if (e.target != this.scroller || !this.isInTransition) {
                return }
            this._transitionTime();
            if (!this.resetPosition(this.options.bounceTime)) {
                this.isInTransition = false;
                this._execEvent("scrollEnd")
            }
        },
        _start: function(e) {
            if (utils.eventType[e.type] != 1) {
                var button;
                if (!e.which) { button = (e.button < 2) ? 0 : ((e.button == 4) ? 1 : 2) } else { button = e.button }
                if (button !== 0) {
                    return } }
            if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
                return }
            if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) { e.preventDefault() }
            var point = e.touches ? e.touches[0] : e,
                pos;
            this.initiated = utils.eventType[e.type];
            this.moved = false;
            this.distX = 0;
            this.distY = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;
            this.startTime = utils.getTime();
            if (this.options.useTransition && this.isInTransition) { this._transitionTime();
                this.isInTransition = false;
                pos = this.getComputedPosition();
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this._execEvent("scrollEnd") } else {
                if (!this.options.useTransition && this.isAnimating) { this.isAnimating = false;
                    this._execEvent("scrollEnd") } }
            this.startX = this.x;
            this.startY = this.y;
            this.absStartX = this.x;
            this.absStartY = this.y;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this._execEvent("beforeScrollStart") },
        _move: function(e) {
            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                return }
            if (this.options.preventDefault) { e.preventDefault() }
            var point = e.touches ? e.touches[0] : e,
                deltaX = point.pageX - this.pointX,
                deltaY = point.pageY - this.pointY,
                timestamp = utils.getTime(),
                newX, newY, absDistX, absDistY;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this.distX += deltaX;
            this.distY += deltaY;
            absDistX = Math.abs(this.distX);
            absDistY = Math.abs(this.distY);
            if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
                return }
            if (!this.directionLocked && !this.options.freeScroll) {
                if (absDistX > absDistY + this.options.directionLockThreshold) { this.directionLocked = "h" } else {
                    if (absDistY >= absDistX + this.options.directionLockThreshold) { this.directionLocked = "v" } else { this.directionLocked = "n" } } }
            if (this.directionLocked == "h") {
                if (this.options.eventPassthrough == "vertical") { e.preventDefault() } else {
                    if (this.options.eventPassthrough == "horizontal") {
                        this.initiated = false;
                        return
                    }
                }
                deltaY = 0
            } else {
                if (this.directionLocked == "v") {
                    if (this.options.eventPassthrough == "horizontal") { e.preventDefault() } else {
                        if (this.options.eventPassthrough == "vertical") { this.initiated = false;
                            return } }
                    deltaX = 0 } }
            deltaX = this.hasHorizontalScroll ? deltaX : 0;
            deltaY = this.hasVerticalScroll ? deltaY : 0;
            newX = this.x + deltaX;
            newY = this.y + deltaY;
            if (newX > 0 || newX < this.maxScrollX) { newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX }
            if (newY > 0 || newY < this.maxScrollY) { newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY }
            this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
            if (!this.moved) { this._execEvent("scrollStart") }
            this.moved = true;
            this._translate(newX, newY);
            if (timestamp - this.startTime > 300) { this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y }
        },
        _end: function(e) {
            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                return }
            if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) { e.preventDefault() }
            var point = e.changedTouches ? e.changedTouches[0] : e,
                momentumX, momentumY, duration = utils.getTime() - this.startTime,
                newX = Math.round(this.x),
                newY = Math.round(this.y),
                distanceX = Math.abs(newX - this.startX),
                distanceY = Math.abs(newY - this.startY),
                time = 0,
                easing = "";
            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = utils.getTime();
            if (this.resetPosition(this.options.bounceTime)) {
                return }
            this.scrollTo(newX, newY);
            if (!this.moved) {
                if (this.options.tap) { utils.tap(e, this.options.tap) }
                if (this.options.click) { utils.click(e) }
                this._execEvent("scrollCancel");
                return }
            if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) { this._execEvent("flick");
                return }
            if (this.options.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
                momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1
            }
            if (this.options.snap) {
                var snap = this._nearestSnap(newX, newY);
                this.currentPage = snap;
                time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
                newX = snap.x;
                newY = snap.y;
                this.directionX = 0;
                this.directionY = 0;
                easing = this.options.bounceEasing }
            if (newX != this.x || newY != this.y) {
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) { easing = utils.ease.quadratic }
                this.scrollTo(newX, newY, time, easing);
                return }
            this._execEvent("scrollEnd")
        },
        _resize: function() {
            var that = this;
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(function() { that.refresh() }, this.options.resizePolling) },
        resetPosition: function(time) {
            var x = this.x,
                y = this.y;
            time = time || 0;
            if (!this.hasHorizontalScroll || this.x > 0) { x = 0 } else {
                if (this.x < this.maxScrollX) { x = this.maxScrollX } }
            if (!this.hasVerticalScroll || this.y > 0) { y = 0 } else {
                if (this.y < this.maxScrollY) { y = this.maxScrollY } }
            if (x == this.x && y == this.y) {
                return false }
            this.scrollTo(x, y, time, this.options.bounceEasing);
            return true },
        disable: function() { this.enabled = false },
        enable: function() { this.enabled = true },
        refresh: function() {
            var rf = this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth;
            this.wrapperHeight = this.wrapper.clientHeight;
            this.scrollerWidth = this.scroller.offsetWidth;
            this.scrollerHeight = this.scroller.offsetHeight;
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
            if (!this.hasHorizontalScroll) { this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth }
            if (!this.hasVerticalScroll) { this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight }
            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.wrapperOffset = utils.offset(this.wrapper);
            this._execEvent("refresh");
            this.resetPosition() },
        on: function(type, fn) {
            if (!this._events[type]) {
                this._events[type] = []
            }
            this._events[type].push(fn)
        },
        off: function(type, fn) {
            if (!this._events[type]) {
                return }
            var index = this._events[type].indexOf(fn);
            if (index > -1) { this._events[type].splice(index, 1) } },
        _execEvent: function(type) {
            if (!this._events[type]) {
                return }
            var i = 0,
                l = this._events[type].length;
            if (!l) {
                return }
            for (; i < l; i++) { this._events[type][i].apply(this, [].slice.call(arguments, 1)) } },
        scrollBy: function(x, y, time, easing) { x = this.x + x;
            y = this.y + y;
            time = time || 0;
            this.scrollTo(x, y, time, easing) },
        scrollTo: function(x, y, time, easing) { easing = easing || utils.ease.circular;
            this.isInTransition = this.options.useTransition && time > 0;
            var transitionType = this.options.useTransition && easing.style;
            if (!time || transitionType) {
                if (transitionType) { this._transitionTimingFunction(easing.style);
                    this._transitionTime(time) }
                this._translate(x, y) } else { this._animate(x, y, time, easing.fn) } },
        scrollToElement: function(el, time, offsetX, offsetY, easing) { el = el.nodeType ? el : this.scroller.querySelector(el);
            if (!el) {
                return }
            var pos = utils.offset(el);
            pos.left -= this.wrapperOffset.left;
            pos.top -= this.wrapperOffset.top;
            if (offsetX === true) { offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2) }
            if (offsetY === true) { offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2) }
            pos.left -= offsetX || 0;
            pos.top -= offsetY || 0;
            pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
            pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;
            time = time === undefined || time === null || time === "auto" ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;
            this.scrollTo(pos.left, pos.top, time, easing) },
        _transitionTime: function(time) {
            if (!this.options.useTransition) {
                return }
            time = time || 0;
            var durationProp = utils.style.transitionDuration;
            if (!durationProp) {
                return }
            this.scrollerStyle[durationProp] = time + "ms";
            if (!time && utils.isBadAndroid) { this.scrollerStyle[durationProp] = "0.0001ms";
                var self = this;
                rAF(function() {
                    if (self.scrollerStyle[durationProp] === "0.0001ms") { self.scrollerStyle[durationProp] = "0s" } }) }
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].transitionTime(time)
                }
            }
        },
        _transitionTimingFunction: function(easing) { this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) { this.indicators[i].transitionTimingFunction(easing) } } },
        _translate: function(x, y) {
            if (this.options.useTransform) { this.scrollerStyle[utils.style.transform] = "translate(" + x + "px," + y + "px)" + this.translateZ } else { x = Math.round(x);
                y = Math.round(y);
                this.scrollerStyle.left = x + "px";
                this.scrollerStyle.top = y + "px" }
            this.x = x;
            this.y = y;
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) { this.indicators[i].updatePosition() } } },
        _initEvents: function(remove) {
            var eventType = remove ? utils.removeEvent : utils.addEvent,
                target = this.options.bindToWrapper ? this.wrapper : window;
            eventType(window, "orientationchange", this);
            eventType(window, "resize", this);
            if (this.options.click) { eventType(this.wrapper, "click", this, true) }
            if (!this.options.disableMouse) { eventType(this.wrapper, "mousedown", this);
                eventType(target, "mousemove", this);
                eventType(target, "mousecancel", this);
                eventType(target, "mouseup", this) }
            if (utils.hasPointer && !this.options.disablePointer) { eventType(this.wrapper, utils.prefixPointerEvent("pointerdown"), this);
                eventType(target, utils.prefixPointerEvent("pointermove"), this);
                eventType(target, utils.prefixPointerEvent("pointercancel"), this);
                eventType(target, utils.prefixPointerEvent("pointerup"), this) }
            if (utils.hasTouch && !this.options.disableTouch) { eventType(this.wrapper, "touchstart", this);
                eventType(target, "touchmove", this);
                eventType(target, "touchcancel", this);
                eventType(target, "touchend", this) }
            eventType(this.scroller, "transitionend", this);
            eventType(this.scroller, "webkitTransitionEnd", this);
            eventType(this.scroller, "oTransitionEnd", this);
            eventType(this.scroller, "MSTransitionEnd", this) },
        getComputedPosition: function() {
            var matrix = window.getComputedStyle(this.scroller, null),
                x, y;
            if (this.options.useTransform) { matrix = matrix[utils.style.transform].split(")")[0].split(", ");
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]) } else {
                x = +matrix.left.replace(/[^-\d.]/g, "");
                y = +matrix.top.replace(/[^-\d.]/g, "")
            }
            return { x: x, y: y }
        },
        _initIndicators: function() {
            var interactive = this.options.interactiveScrollbars,
                customStyle = typeof this.options.scrollbars != "string",
                indicators = [],
                indicator;
            var that = this;
            this.indicators = [];
            if (this.options.scrollbars) {
                if (this.options.scrollY) { indicator = { el: createDefaultScrollbar("v", interactive, this.options.scrollbars), interactive: interactive, defaultScrollbars: true, customStyle: customStyle, resize: this.options.resizeScrollbars, shrink: this.options.shrinkScrollbars, fade: this.options.fadeScrollbars, listenX: false };
                    this.wrapper.appendChild(indicator.el);
                    indicators.push(indicator) }
                if (this.options.scrollX) { indicator = { el: createDefaultScrollbar("h", interactive, this.options.scrollbars), interactive: interactive, defaultScrollbars: true, customStyle: customStyle, resize: this.options.resizeScrollbars, shrink: this.options.shrinkScrollbars, fade: this.options.fadeScrollbars, listenY: false };
                    this.wrapper.appendChild(indicator.el);
                    indicators.push(indicator) } }
            if (this.options.indicators) { indicators = indicators.concat(this.options.indicators) }
            for (var i = indicators.length; i--;) { this.indicators.push(new Indicator(this, indicators[i])) }

            function _indicatorsMap(fn) {
                if (that.indicators) {
                    for (var i = that.indicators.length; i--;) { fn.call(that.indicators[i]) } } }
            if (this.options.fadeScrollbars) { this.on("scrollEnd", function() { _indicatorsMap(function() { this.fade() }) });
                this.on("scrollCancel", function() { _indicatorsMap(function() { this.fade() }) });
                this.on("scrollStart", function() { _indicatorsMap(function() { this.fade(1) }) });
                this.on("beforeScrollStart", function() { _indicatorsMap(function() { this.fade(1, true) }) }) }
            this.on("refresh", function() { _indicatorsMap(function() { this.refresh() }) });
            this.on("destroy", function() { _indicatorsMap(function() { this.destroy() });
                delete this.indicators }) },
        _initWheel: function() {
            utils.addEvent(this.wrapper, "wheel", this);
            utils.addEvent(this.wrapper, "mousewheel", this);
            utils.addEvent(this.wrapper, "DOMMouseScroll", this);
            this.on("destroy", function() {
                clearTimeout(this.wheelTimeout);
                this.wheelTimeout = null;
                utils.removeEvent(this.wrapper, "wheel", this);
                utils.removeEvent(this.wrapper, "mousewheel", this);
                utils.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(e) {
            if (!this.enabled) {
                return }
            e.preventDefault();
            var wheelDeltaX, wheelDeltaY, newX, newY, that = this;
            if (this.wheelTimeout === undefined) { that._execEvent("scrollStart") }
            clearTimeout(this.wheelTimeout);
            this.wheelTimeout = setTimeout(function() {
                if (!that.options.snap) { that._execEvent("scrollEnd") }
                that.wheelTimeout = undefined }, 400);
            if ("deltaX" in e) {
                if (e.deltaMode === 1) { wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
                    wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed } else { wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY } } else {
                if ("wheelDeltaX" in e) { wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
                    wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed } else {
                    if ("wheelDelta" in e) { wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed } else {
                        if ("detail" in e) { wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed } else {
                            return } } } }
            wheelDeltaX *= this.options.invertWheelDirection;
            wheelDeltaY *= this.options.invertWheelDirection;
            if (!this.hasVerticalScroll) { wheelDeltaX = wheelDeltaY;
                wheelDeltaY = 0 }
            if (this.options.snap) { newX = this.currentPage.pageX;
                newY = this.currentPage.pageY;
                if (wheelDeltaX > 0) { newX-- } else {
                    if (wheelDeltaX < 0) { newX++ } }
                if (wheelDeltaY > 0) { newY-- } else {
                    if (wheelDeltaY < 0) { newY++ } }
                this.goToPage(newX, newY);
                return }
            newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
            newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
            this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
            this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;
            if (newX > 0) { newX = 0 } else {
                if (newX < this.maxScrollX) { newX = this.maxScrollX } }
            if (newY > 0) { newY = 0 } else {
                if (newY < this.maxScrollY) { newY = this.maxScrollY } }
            this.scrollTo(newX, newY, 0) },
        _initSnap: function() {
            this.currentPage = {};
            if (typeof this.options.snap == "string") { this.options.snap = this.scroller.querySelectorAll(this.options.snap) }
            this.on("refresh", function() {
                var i = 0,
                    l, m = 0,
                    n, cx, cy, x = 0,
                    y, stepX = this.options.snapStepX || this.wrapperWidth,
                    stepY = this.options.snapStepY || this.wrapperHeight,
                    el;
                this.pages = [];
                if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
                    return }
                if (this.options.snap === true) { cx = Math.round(stepX / 2);
                    cy = Math.round(stepY / 2);
                    while (x > -this.scrollerWidth) { this.pages[i] = [];
                        l = 0;
                        y = 0;
                        while (y > -this.scrollerHeight) { this.pages[i][l] = { x: Math.max(x, this.maxScrollX), y: Math.max(y, this.maxScrollY), width: stepX, height: stepY, cx: x - cx, cy: y - cy };
                            y -= stepY;
                            l++ }
                        x -= stepX;
                        i++ } } else { el = this.options.snap;
                    l = el.length;
                    n = -1;
                    for (; i < l; i++) {
                        if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) { m = 0;
                            n++ }
                        if (!this.pages[m]) { this.pages[m] = [] }
                        x = Math.max(-el[i].offsetLeft, this.maxScrollX);
                        y = Math.max(-el[i].offsetTop, this.maxScrollY);
                        cx = x - Math.round(el[i].offsetWidth / 2);
                        cy = y - Math.round(el[i].offsetHeight / 2);
                        this.pages[m][n] = { x: x, y: y, width: el[i].offsetWidth, height: el[i].offsetHeight, cx: cx, cy: cy };
                        if (x > this.maxScrollX) { m++ } } }
                this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
                if (this.options.snapThreshold % 1 === 0) { this.snapThresholdX = this.options.snapThreshold;
                    this.snapThresholdY = this.options.snapThreshold } else { this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
                    this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold) }
            });
            this.on("flick", function() {
                var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time) })
        },
        _nearestSnap: function(x, y) {
            if (!this.pages.length) {
                return { x: 0, y: 0, pageX: 0, pageY: 0 } }
            var i = 0,
                l = this.pages.length,
                m = 0;
            if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
                return this.currentPage }
            if (x > 0) { x = 0 } else {
                if (x < this.maxScrollX) { x = this.maxScrollX } }
            if (y > 0) { y = 0 } else {
                if (y < this.maxScrollY) { y = this.maxScrollY } }
            for (; i < l; i++) {
                if (x >= this.pages[i][0].cx) { x = this.pages[i][0].x;
                    break } }
            l = this.pages[i].length;
            for (; m < l; m++) {
                if (y >= this.pages[0][m].cy) { y = this.pages[0][m].y;
                    break } }
            if (i == this.currentPage.pageX) { i += this.directionX;
                if (i < 0) { i = 0 } else {
                    if (i >= this.pages.length) { i = this.pages.length - 1 } }
                x = this.pages[i][0].x }
            if (m == this.currentPage.pageY) { m += this.directionY;
                if (m < 0) { m = 0 } else {
                    if (m >= this.pages[0].length) { m = this.pages[0].length - 1 } }
                y = this.pages[0][m].y }
            return { x: x, y: y, pageX: i, pageY: m }
        },
        goToPage: function(x, y, time, easing) { easing = easing || this.options.bounceEasing;
            if (x >= this.pages.length) { x = this.pages.length - 1 } else {
                if (x < 0) { x = 0 } }
            if (y >= this.pages[x].length) { y = this.pages[x].length - 1 } else {
                if (y < 0) { y = 0 } }
            var posX = this.pages[x][y].x,
                posY = this.pages[x][y].y;
            time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;
            this.currentPage = { x: posX, y: posY, pageX: x, pageY: y };
            this.scrollTo(posX, posY, time, easing) },
        next: function(time, easing) {
            var x = this.currentPage.pageX,
                y = this.currentPage.pageY;
            x++;
            if (x >= this.pages.length && this.hasVerticalScroll) { x = 0;
                y++ }
            this.goToPage(x, y, time, easing) },
        prev: function(time, easing) {
            var x = this.currentPage.pageX,
                y = this.currentPage.pageY;
            x--;
            if (x < 0 && this.hasVerticalScroll) { x = 0;
                y-- }
            this.goToPage(x, y, time, easing) },
        _initKeys: function(e) {
            var keys = { pageUp: 33, pageDown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40 };
            var i;
            if (typeof this.options.keyBindings == "object") {
                for (i in this.options.keyBindings) {
                    if (typeof this.options.keyBindings[i] == "string") { this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0) } } } else { this.options.keyBindings = {} }
            for (i in keys) { this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i] }
            utils.addEvent(window, "keydown", this);
            this.on("destroy", function() { utils.removeEvent(window, "keydown", this) }) },
        _key: function(e) {
            if (!this.enabled) {
                return }
            var snap = this.options.snap,
                newX = snap ? this.currentPage.pageX : this.x,
                newY = snap ? this.currentPage.pageY : this.y,
                now = utils.getTime(),
                prevTime = this.keyTime || 0,
                acceleration = 0.25,
                pos;
            if (this.options.useTransition && this.isInTransition) {
                pos = this.getComputedPosition();
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this.isInTransition = false
            }
            this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
            switch (e.keyCode) {
                case this.options.keyBindings.pageUp:
                    if (this.hasHorizontalScroll && !this.hasVerticalScroll) { newX += snap ? 1 : this.wrapperWidth } else { newY += snap ? 1 : this.wrapperHeight }
                    break;
                case this.options.keyBindings.pageDown:
                    if (this.hasHorizontalScroll && !this.hasVerticalScroll) { newX -= snap ? 1 : this.wrapperWidth } else { newY -= snap ? 1 : this.wrapperHeight }
                    break;
                case this.options.keyBindings.end:
                    newX = snap ? this.pages.length - 1 : this.maxScrollX;
                    newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
                    break;
                case this.options.keyBindings.home:
                    newX = 0;
                    newY = 0;
                    break;
                case this.options.keyBindings.left:
                    newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.up:
                    newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.right:
                    newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.down:
                    newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                default:
                    return }
            if (snap) { this.goToPage(newX, newY);
                return }
            if (newX > 0) { newX = 0;
                this.keyAcceleration = 0 } else {
                if (newX < this.maxScrollX) { newX = this.maxScrollX;
                    this.keyAcceleration = 0 } }
            if (newY > 0) { newY = 0;
                this.keyAcceleration = 0 } else {
                if (newY < this.maxScrollY) { newY = this.maxScrollY;
                    this.keyAcceleration = 0 } }
            this.scrollTo(newX, newY, 0);
            this.keyTime = now
        },
        _animate: function(destX, destY, duration, easingFn) {
            var that = this,
                startX = this.x,
                startY = this.y,
                startTime = utils.getTime(),
                destTime = startTime + duration;

            function step() {
                var now = utils.getTime(),
                    newX, newY, easing;
                if (now >= destTime) { that.isAnimating = false;
                    that._translate(destX, destY);
                    if (!that.resetPosition(that.options.bounceTime)) { that._execEvent("scrollEnd") }
                    return }
                now = (now - startTime) / duration;
                easing = easingFn(now);
                newX = (destX - startX) * easing + startX;
                newY = (destY - startY) * easing + startY;
                that._translate(newX, newY);
                if (that.isAnimating) { rAF(step) } }
            this.isAnimating = true;
            step() },
        handleEvent: function(e) {
            switch (e.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(e);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(e);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(e);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(e);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(e);
                    break;
                case "keydown":
                    this._key(e);
                    break;
                case "click":
                    if (this.enabled && !e._constructed) { e.preventDefault();
                        e.stopPropagation() }
                    break
            }
        }
    };

    function createDefaultScrollbar(direction, interactive, type) {
        var scrollbar = document.createElement("div"),
            indicator = document.createElement("div");
        if (type === true) { scrollbar.style.cssText = "position:absolute;z-index:9999";
            indicator.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px" }
        indicator.className = "iScrollIndicator";
        if (direction == "h") {
            if (type === true) { scrollbar.style.cssText += ";height:7px;left:2px;right:2px;bottom:0";
                indicator.style.height = "100%" }
            scrollbar.className = "iScrollHorizontalScrollbar" } else {
            if (type === true) { scrollbar.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px";
                indicator.style.width = "100%" }
            scrollbar.className = "iScrollVerticalScrollbar" }
        scrollbar.style.cssText += ";overflow:hidden";
        if (!interactive) { scrollbar.style.pointerEvents = "none" }
        scrollbar.appendChild(indicator);
        return scrollbar }

    function Indicator(scroller, options) {
        this.wrapper = typeof options.el == "string" ? document.querySelector(options.el) : options.el;
        this.wrapperStyle = this.wrapper.style;
        this.indicator = this.wrapper.children[0];
        this.indicatorStyle = this.indicator.style;
        this.scroller = scroller;
        this.options = { listenX: true, listenY: true, interactive: false, resize: true, defaultScrollbars: false, shrink: false, fade: false, speedRatioX: 0, speedRatioY: 0 };
        for (var i in options) {
            this.options[i] = options[i]
        }
        this.sizeRatioX = 1;
        this.sizeRatioY = 1;
        this.maxPosX = 0;
        this.maxPosY = 0;
        if (this.options.interactive) {
            if (!this.options.disableTouch) { utils.addEvent(this.indicator, "touchstart", this);
                utils.addEvent(window, "touchend", this) }
            if (!this.options.disablePointer) { utils.addEvent(this.indicator, utils.prefixPointerEvent("pointerdown"), this);
                utils.addEvent(window, utils.prefixPointerEvent("pointerup"), this) }
            if (!this.options.disableMouse) { utils.addEvent(this.indicator, "mousedown", this);
                utils.addEvent(window, "mouseup", this) } }
        if (this.options.fade) { this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
            var durationProp = utils.style.transitionDuration;
            if (!durationProp) {
                return }
            this.wrapperStyle[durationProp] = utils.isBadAndroid ? "0.0001ms" : "0ms";
            var self = this;
            if (utils.isBadAndroid) { rAF(function() {
                    if (self.wrapperStyle[durationProp] === "0.0001ms") { self.wrapperStyle[durationProp] = "0s" } }) }
            this.wrapperStyle.opacity = "0" }
    }
    Indicator.prototype = {
        handleEvent: function(e) {
            switch (e.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(e);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(e);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(e);
                    break } },
        destroy: function() {
            if (this.options.fadeScrollbars) { clearTimeout(this.fadeTimeout);
                this.fadeTimeout = null }
            if (this.options.interactive) { utils.removeEvent(this.indicator, "touchstart", this);
                utils.removeEvent(this.indicator, utils.prefixPointerEvent("pointerdown"), this);
                utils.removeEvent(this.indicator, "mousedown", this);
                utils.removeEvent(window, "touchmove", this);
                utils.removeEvent(window, utils.prefixPointerEvent("pointermove"), this);
                utils.removeEvent(window, "mousemove", this);
                utils.removeEvent(window, "touchend", this);
                utils.removeEvent(window, utils.prefixPointerEvent("pointerup"), this);
                utils.removeEvent(window, "mouseup", this) }
            if (this.options.defaultScrollbars) {
                this.wrapper.parentNode.removeChild(this.wrapper)
            }
        },
        _start: function(e) {
            var point = e.touches ? e.touches[0] : e;
            e.preventDefault();
            e.stopPropagation();
            this.transitionTime();
            this.initiated = true;
            this.moved = false;
            this.lastPointX = point.pageX;
            this.lastPointY = point.pageY;
            this.startTime = utils.getTime();
            if (!this.options.disableTouch) { utils.addEvent(window, "touchmove", this) }
            if (!this.options.disablePointer) { utils.addEvent(window, utils.prefixPointerEvent("pointermove"), this) }
            if (!this.options.disableMouse) { utils.addEvent(window, "mousemove", this) }
            this.scroller._execEvent("beforeScrollStart") },
        _move: function(e) {
            var point = e.touches ? e.touches[0] : e,
                deltaX, deltaY, newX, newY, timestamp = utils.getTime();
            if (!this.moved) { this.scroller._execEvent("scrollStart") }
            this.moved = true;
            deltaX = point.pageX - this.lastPointX;
            this.lastPointX = point.pageX;
            deltaY = point.pageY - this.lastPointY;
            this.lastPointY = point.pageY;
            newX = this.x + deltaX;
            newY = this.y + deltaY;
            this._pos(newX, newY);
            e.preventDefault();
            e.stopPropagation() },
        _end: function(e) {
            if (!this.initiated) {
                return }
            this.initiated = false;
            e.preventDefault();
            e.stopPropagation();
            utils.removeEvent(window, "touchmove", this);
            utils.removeEvent(window, utils.prefixPointerEvent("pointermove"), this);
            utils.removeEvent(window, "mousemove", this);
            if (this.scroller.options.snap) {
                var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
                var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);
                if (this.scroller.x != snap.x || this.scroller.y != snap.y) { this.scroller.directionX = 0;
                    this.scroller.directionY = 0;
                    this.scroller.currentPage = snap;
                    this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing) } }
            if (this.moved) { this.scroller._execEvent("scrollEnd") } },
        transitionTime: function(time) {
            time = time || 0;
            var durationProp = utils.style.transitionDuration;
            if (!durationProp) {
                return }
            this.indicatorStyle[durationProp] = time + "ms";
            if (!time && utils.isBadAndroid) {
                this.indicatorStyle[durationProp] = "0.0001ms";
                var self = this;
                rAF(function() {
                    if (self.indicatorStyle[durationProp] === "0.0001ms") {
                        self.indicatorStyle[durationProp] = "0s"
                    }
                })
            }
        },
        transitionTimingFunction: function(easing) { this.indicatorStyle[utils.style.transitionTimingFunction] = easing },
        refresh: function() {
            this.transitionTime();
            if (this.options.listenX && !this.options.listenY) { this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" } else {
                if (this.options.listenY && !this.options.listenX) { this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" } else { this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none" } }
            if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) { utils.addClass(this.wrapper, "iScrollBothScrollbars");
                utils.removeClass(this.wrapper, "iScrollLoneScrollbar");
                if (this.options.defaultScrollbars && this.options.customStyle) {
                    if (this.options.listenX) { this.wrapper.style.right = "8px" } else { this.wrapper.style.bottom = "8px" } } } else { utils.removeClass(this.wrapper, "iScrollBothScrollbars");
                utils.addClass(this.wrapper, "iScrollLoneScrollbar");
                if (this.options.defaultScrollbars && this.options.customStyle) {
                    if (this.options.listenX) { this.wrapper.style.right = "2px" } else { this.wrapper.style.bottom = "2px" } } }
            var r = this.wrapper.offsetHeight;
            if (this.options.listenX) { this.wrapperWidth = this.wrapper.clientWidth;
                if (this.options.resize) { this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
                    this.indicatorStyle.width = this.indicatorWidth + "px" } else { this.indicatorWidth = this.indicator.clientWidth }
                this.maxPosX = this.wrapperWidth - this.indicatorWidth;
                if (this.options.shrink == "clip") { this.minBoundaryX = -this.indicatorWidth + 8;
                    this.maxBoundaryX = this.wrapperWidth - 8 } else { this.minBoundaryX = 0;
                    this.maxBoundaryX = this.maxPosX }
                this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX)) }
            if (this.options.listenY) {
                this.wrapperHeight = this.wrapper.clientHeight;
                if (this.options.resize) {
                    this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
                    this.indicatorStyle.height = this.indicatorHeight + "px"
                } else { this.indicatorHeight = this.indicator.clientHeight }
                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                if (this.options.shrink == "clip") { this.minBoundaryY = -this.indicatorHeight + 8;
                    this.maxBoundaryY = this.wrapperHeight - 8 } else { this.minBoundaryY = 0;
                    this.maxBoundaryY = this.maxPosY }
                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY))
            }
            this.updatePosition()
        },
        updatePosition: function() {
            var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
                y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
            if (!this.options.ignoreBoundaries) {
                if (x < this.minBoundaryX) {
                    if (this.options.shrink == "scale") { this.width = Math.max(this.indicatorWidth + x, 8);
                        this.indicatorStyle.width = this.width + "px" }
                    x = this.minBoundaryX } else {
                    if (x > this.maxBoundaryX) {
                        if (this.options.shrink == "scale") { this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
                            this.indicatorStyle.width = this.width + "px";
                            x = this.maxPosX + this.indicatorWidth - this.width } else { x = this.maxBoundaryX } } else {
                        if (this.options.shrink == "scale" && this.width != this.indicatorWidth) { this.width = this.indicatorWidth;
                            this.indicatorStyle.width = this.width + "px" } } }
                if (y < this.minBoundaryY) {
                    if (this.options.shrink == "scale") { this.height = Math.max(this.indicatorHeight + y * 3, 8);
                        this.indicatorStyle.height = this.height + "px" }
                    y = this.minBoundaryY } else {
                    if (y > this.maxBoundaryY) {
                        if (this.options.shrink == "scale") { this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
                            this.indicatorStyle.height = this.height + "px";
                            y = this.maxPosY + this.indicatorHeight - this.height } else { y = this.maxBoundaryY } } else {
                        if (this.options.shrink == "scale" && this.height != this.indicatorHeight) { this.height = this.indicatorHeight;
                            this.indicatorStyle.height = this.height + "px" } } } }
            this.x = x;
            this.y = y;
            if (this.scroller.options.useTransform) { this.indicatorStyle[utils.style.transform] = "translate(" + x + "px," + y + "px)" + this.scroller.translateZ } else {
                this.indicatorStyle.left = x + "px";
                this.indicatorStyle.top = y + "px"
            }
        },
        _pos: function(x, y) {
            if (x < 0) { x = 0 } else {
                if (x > this.maxPosX) { x = this.maxPosX } }
            if (y < 0) { y = 0 } else {
                if (y > this.maxPosY) { y = this.maxPosY } }
            x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
            y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
            this.scroller.scrollTo(x, y) },
        fade: function(val, hold) {
            if (hold && !this.visible) {
                return }
            clearTimeout(this.fadeTimeout);
            this.fadeTimeout = null;
            var time = val ? 250 : 500,
                delay = val ? 0 : 300;
            val = val ? "1" : "0";
            this.wrapperStyle[utils.style.transitionDuration] = time + "ms";
            this.fadeTimeout = setTimeout((function(val) { this.wrapperStyle.opacity = val;
                this.visible = +val }).bind(this, val), delay) }
    };
    IScroll.utils = utils;
    if (typeof module != "undefined" && module.exports) { module.exports = IScroll } else {
        if (typeof define == "function" && define.amd) { define(function() {
                return IScroll }) } else { window.IScroll = IScroll } }
})(window, document, Math);


// dialog
$(function() {
    var $win = $(window);
    var $body = $("body");
    var $wrapper = $body;

    function string2json() {
        var str = $.trim(arguments[0]);
        var obj = {};
        if (str.length != 0) {
            var param = str.split(";");
            for (var i = 0; i < param.length; i++) {
                if (param[i].length > 0) {
                    var o = param[i].split(":");
                    obj[o[0]] = o[1] } } }
        return obj }

    function showDialog(option) {
        console.log("测试")
        var slide;
        var _tpl = ['<div class="second-page">', '<div class="logo"></div>', '<div class="menu"></div>', '<div class="page-content">', '<a href="javascript:;" class="close"></a>', '<div class="title"></div>', '<div class="control">', '<a href="javascript:;" class="prev"></a>', '<a href="javascript:;" class="next"></a>', "</div>", '<div class="slide">', '<div class="swiper-container">', '<div class="swiper-wrapper">', "</div>", "</div>", "</div>", '<div class="down"></div>', "</div>", "</div>"].join("");
        var $dialog = $(_tpl);
        $dialog.appendTo($wrapper);
        var slide_html = [];
        for (var i = 1; i <= option.number; i++) {
            var imgUrl = option.type + "/" + i;
            slide_html.push(['<div class="swiper-slide">', '<img src="./mobile/images/dialog/' + imgUrl + '.png" alt="">', "</div>"].join("")) 
        }
        $dialog.find(".swiper-wrapper").html(slide_html.join(""));
        $dialog.show("fast", function() {
            var $prev = $(".prev", $dialog);
            var $next = $(".next", $dialog);
            if (option.number > 1) {
            	slide = new Swiper($(".swiper-container", $dialog), {
            		prevButton: ".second-page .control .prev",
            		nextButton: ".second-page .control .next",
            		loop: true,
            		onInit: function(swiper) {

            		},
            		onSlideChangeStart: function(swiper) {
            			$(".pageNumber", $dialog).find(".cur").text(swiper.activeIndex + 1);
                        $dialog.scrollTop(0) },
                    onSlideChangeEnd: function(swiper) {
                    	console.log(option)
                    		if(option.initNumber!=1 && option.bol=="true"){
                    			if(swiper.activeIndex!=option.initNumber){
                    				return;
                    			}
	                    		if(option.type=="p2-1"){
		                    		//技术卖点 动力革新
		                    		if(option.initNumber==2 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'Engine',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		                    		}else if(option.initNumber==3){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'IPU',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		                    		}else if(option.initNumber==1 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'CVT',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		                    		}
		                    		console.log(1,swiper.activeIndex,option.initNumber)

		                    	}else if(option.type=="p2-4"){
		                    		//技术卖点智导互联

		                    		if(option.initNumber==2 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-IV', 'MMwaveRadar',     {'dimension3': 'accord-sporthybrid', 'metric5': 1});
		                    		}else if(option.initNumber==1 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-IV', 'FrontCam',     {'dimension3': 'accord-sporthybrid', 'metric5': 1});
		                    		}

		                    		console.log(1,swiper.activeIndex,option.initNumber)

		                    	}else if(option.type=="p3"){
		                    		//车型外观
		                    		if(option.initNumber==5){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'SharkFin',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if(option.initNumber==2 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'WingHeadlight',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if(option.initNumber==4){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'PlumpFence',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if (option.initNumber==7) {
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'StrengthRim',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if(option.initNumber==1 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'HybridIcon',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}
		                    		console.log(1,swiper.activeIndex,option.initNumber)

		                    	}else if(option.type=="p4"){
		                    		//车型内饰
		                    		if(option.initNumber==4){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'Purifier',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}else if(option.initNumber==5 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'Dashboard',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}else if(option.initNumber==3 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'DecelerationSelector',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}else if(option.initNumber==1){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'SBWShift',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}
		                    		console.log(1,swiper.activeIndex,option.initNumber)
		                    	}
		                    	option.bol="false";
	                    	}else if((option.initNumber==1 && option.bol=="true" && option.bool=="true") || option.bol=="false" ){
	                    		if(option.type=="p2-1"){
		                    		//技术卖点 动力革新
		                    		if(swiper.activeIndex==2 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'Engine',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		                    		}else if(swiper.activeIndex==3){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'IPU',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		                    		}else if(swiper.activeIndex==1 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'CVT',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		                    		}
		                    		console.log(2,swiper.activeIndex)

		                    	}else if(option.type=="p2-4"){
		                    		//技术卖点智导互联

		                    		if(swiper.activeIndex==2 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-IV', 'MMwaveRadar',     {'dimension3': 'accord-sporthybrid', 'metric5': 1});
		                    		}else if(swiper.activeIndex==1 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Technology-IV', 'FrontCam',     {'dimension3': 'accord-sporthybrid', 'metric5': 1});
		                    		}

		                    		console.log(2,swiper.activeIndex)

		                    	}else if(option.type=="p3"){
		                    		//车型外观
		                    		if(swiper.activeIndex==5){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'SharkFin',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if(swiper.activeIndex==2 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'WingHeadlight',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if(swiper.activeIndex==4){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'PlumpFence',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if (swiper.activeIndex==7) {
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'StrengthRim',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}else if(swiper.activeIndex==1 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'HybridIcon',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		                    		}
		                    		console.log(2,swiper.activeIndex)

		                    	}else if(option.type=="p4"){
		                    		//车型内饰
		                    		if(swiper.activeIndex==4){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'Purifier',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}else if(swiper.activeIndex==5 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'Dashboard',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}else if(swiper.activeIndex==3 ){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'DecelerationSelector',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}else if(swiper.activeIndex==1){
		                    			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'SBWShift',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		                    		}
		                    		console.log(2,swiper.activeIndex)

		                    	}
		                    	option.bol="false";
	                    	}
                    	
                    } });
                $(".pageNumber", $dialog).find(".cur").text(option.initNumber);
                $(".pageNumber", $dialog).find(".total").text(option.number);
                if (option.initNumber) { slide.slideTo(parseInt(option.initNumber), 0) } } else { $prev.add($next).hide() } });
        $dialog.on("click", ".down", function() { $dialog.remove();
            if (option.number > 1) { slide.destroy(true);
                slide = null } })
                 }

    $("body").on("click", "[data-dialog]", function(e) {
     $(".second-page").remove();
        var $this = $(this);
        var param = string2json($this.data("dialog"));
        showDialog(param) 
		console.log("阻止默认是事件1")
    	return false;
    }) });
