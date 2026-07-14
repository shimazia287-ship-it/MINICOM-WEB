(function(t) {
    "use strict";

    function i(t) {
        return RegExp("(^|\\s+)" + t + "(\\s+|$)")
    }

    function e(t, e) {
        (o(t, e) ? r : n)(t, e)
    }
    var o, n, r = "classList" in document.documentElement ? (o = function(t, e) {
            return t.classList.contains(e)
        }, n = function(t, e) {
            t.classList.add(e)
        }, function(t, e) {
            t.classList.remove(e)
        }) : (o = function(t, e) {
            return i(e).test(t.className)
        }, n = function(t, e) {
            o(t, e) || (t.className = t.className + " " + e)
        }, function(t, e) {
            t.className = t.className.replace(i(e), " ")
        }),
        s = {
            hasClass: o,
            addClass: n,
            removeClass: r,
            toggleClass: e,
            has: o,
            add: n,
            remove: r,
            toggle: e
        };
    "function" == typeof define && define.amd ? define(s) : "object" == typeof exports ? module.exports = s : t.classie = s
})(window),
function(i) {
    "use strict";

    function o(t) {
        var e = i.event;
        return e.target = e.target || e.srcElement || t, e
    }
    var t = document.documentElement,
        e = function() {};
    t.addEventListener ? e = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : t.attachEvent && (e = function(e, t, i) {
        e[t + i] = i.handleEvent ? function() {
            var t = o(e);
            i.handleEvent.call(i, t)
        } : function() {
            var t = o(e);
            i.call(e, t)
        }, e.attachEvent("on" + t, e[t + i])
    });
    var n = function() {};
    t.removeEventListener ? n = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : t.detachEvent && (n = function(e, i, o) {
        e.detachEvent("on" + i, e[i + o]);
        try {
            delete e[i + o]
        } catch (t) {
            e[i + o] = void 0
        }
    });
    var r = {
        bind: e,
        unbind: n
    };
    "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? module.exports = r : i.eventie = r
}(this),
function(e) {
    "use strict";

    function i(t) {
        "function" == typeof t && (i.isReady ? t() : s.push(t))
    }

    function o(t) {
        var e = "readystatechange" === t.type && "complete" !== r.readyState;
        i.isReady || e || n()
    }

    function n() {
        i.isReady = !0;
        for (var t = 0, e = s.length; t < e; t++) {
            (0, s[t])()
        }
    }

    function t(t) {
        return "complete" === r.readyState ? n() : (t.bind(r, "DOMContentLoaded", o), t.bind(r, "readystatechange", o), t.bind(e, "load", o)), i
    }
    var r = e.document,
        s = [];
    i.isReady = !1, "function" == typeof define && define.amd ? define(["eventie/eventie"], t) : "object" == typeof exports ? module.exports = t(require("eventie")) : e.docReady = t(e.eventie)
}(window),
function(t) {
    "use strict";

    function e(t) {
        if (t) {
            if ("string" == typeof r[t]) return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, i = 0, o = n.length; i < o; i++)
                if (e = n[i] + t, "string" == typeof r[e]) return e
        }
    }
    var n = "Webkit Moz ms Ms O".split(" "),
        r = document.documentElement.style;
    "function" == typeof define && define.amd ? define(function() {
        return e
    }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window),
function(a) {
    "use strict";

    function I(t) {
        var e = parseFloat(t);
        return -1 === t.indexOf("%") && !isNaN(e) && e
    }

    function t(r) {
        function v() {
            var e, t, i, o, n;
            s || (s = !0, e = a.getComputedStyle, n = e ? function(t) {
                return e(t, null)
            } : function(t) {
                return t.currentStyle
            }, b = function(t) {
                var e = n(t);
                return e || u("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizeiframe"), e
            }, (x = r("boxSizing")) && ((t = document.createElement("div")).style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[x] = "border-box", (i = document.body || document.documentElement).appendChild(t), o = b(t), w = 200 === I(o.width), i.removeChild(t)))
        }
        var b, x, w, s = !1;
        return function(t) {
            if (v(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var e = b(t);
                if ("none" === e.display) return function() {
                    for (var t = {
                            width: 0,
                            height: 0,
                            innerWidth: 0,
                            innerHeight: 0,
                            outerWidth: 0,
                            outerHeight: 0
                        }, e = 0, i = _.length; e < i; e++) {
                        t[_[e]] = 0
                    }
                    return t
                }();
                var i = {};
                i.width = t.offsetWidth, i.height = t.offsetHeight;
                for (var o = i.isBorderBox = !(!x || !e[x] || "border-box" !== e[x]), n = 0, r = _.length; n < r; n++) {
                    var s = _[n],
                        a = function(t, e) {
                            if (getComputedStyle || -1 === e.indexOf("%")) return e;
                            var i = t.style,
                                o = i.left,
                                n = t.runtimeStyle,
                                r = n && n.left;
                            return r && (n.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = o, r && (n.left = r), e
                        }(t, a = e[s]),
                        u = parseFloat(a);
                    i[s] = isNaN(u) ? 0 : u
                }
                var h = i.paddingLeft + i.paddingRight,
                    p = i.paddingTop + i.paddingBottom,
                    c = i.marginLeft + i.marginRight,
                    l = i.marginTop + i.marginBottom,
                    f = i.borderLeftWidth + i.borderRightWidth,
                    d = i.borderTopWidth + i.borderBottomWidth,
                    m = o && w,
                    y = I(e.width);
                !1 !== y && (i.width = y + (m ? 0 : h + f));
                var g = I(e.height);
                return !1 !== g && (i.height = g + (m ? 0 : p + d)), i.innerWidth = i.width - (h + f), i.innerHeight = i.height - (p + d), i.outerWidth = i.width + c, i.outerHeight = i.height + l, i
            }
        }
    }
    var u = "undefined" == typeof console ? noop : function(t) {
            console.error(t)
        },
        _ = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define(["get-style-property/get-style-property"], t) : "object" == typeof exports ? module.exports = t(require("desandro-get-style-property")) : a.getSize = t(a.getStyleProperty)
}(window),
function() {
    "use strict";

    function t() {}

    function r(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function e(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var i = t.prototype,
        o = this,
        n = o.EventEmitter;
    i.getListeners = function(t) {
        var e, i, o = this._getEvents();
        if (t instanceof RegExp)
            for (i in e = {}, o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i]);
        else e = o[t] || (o[t] = []);
        return e
    }, i.flattenListeners = function(t) {
        for (var e = [], i = 0; t.length > i; i += 1) e.push(t[i].listener);
        return e
    }, i.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && ((e = {})[t] = i), e || i
    }, i.addListener = function(t, e) {
        var i, o = this.getListenersAsObject(t),
            n = "object" == typeof e;
        for (i in o) o.hasOwnProperty(i) && -1 === r(o[i], e) && o[i].push(n ? e : {
            listener: e,
            once: !1
        });
        return this
    }, i.on = e("addListener"), i.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, i.once = e("addOnceListener"), i.defineEvent = function(t) {
        return this.getListeners(t), this
    }, i.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, i.removeListener = function(t, e) {
        var i, o, n = this.getListenersAsObject(t);
        for (o in n) n.hasOwnProperty(o) && (-1 !== (i = r(n[o], e)) && n[o].splice(i, 1));
        return this
    }, i.off = e("removeListener"), i.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function(t, e, i) {
        var o, n, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (o = i.length; o--;) r.call(this, e, i[o]);
        else
            for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
        return this
    }, i.removeEvent = function(t) {
        var e, i = typeof t,
            o = this._getEvents();
        if ("string" == i) delete o[t];
        else if (t instanceof RegExp)
            for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this
    }, i.removeAllListeners = e("removeEvent"), i.emitEvent = function(t, e) {
        var i, o, n, r = this.getListenersAsObject(t);
        for (n in r)
            if (r.hasOwnProperty(n))
                for (o = r[n].length; o--;) !0 === (i = r[n][o]).once && this.removeListener(t, i.listener), i.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, i.trigger = e("emitEvent"), i.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function() {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return o.EventEmitter = n, t
    }, "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
}.call(this),
    function(i, o) {
        "use strict";
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(t, e) {
            return o(i, t, e)
        }) : "object" == typeof exports ? module.exports = o(i, require("wolfy87-eventemitter"), require("eventie")) : i.imagesLoaded = o(i, i.EventEmitter, i.eventie)
    }(window, function(t, e, i) {
        "use strict";

        function n(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function r(t) {
            var e, i = [];
            if (e = t, "[object Array]" === c.call(e)) i = t;
            else if ("number" == typeof t.length)
                for (var o = 0, n = t.length; o < n; o++) i.push(t[o]);
            else i.push(t);
            return i
        }

        function s(t, e, i) {
            if (!(this instanceof s)) return new s(t, e);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = r(t), this.options = n({}, this.options), "function" == typeof e ? i = e : n(this.options, e), i && this.on("always", i), this.getImages(), u && (this.jqDeferred = new u.Deferred);
            var o = this;
            setTimeout(function() {
                o.check()
            })
        }

        function o(t) {
            this.img = t
        }

        function a(t) {
            this.src = t, l[t] = this
        }
        var u = t.jQuery,
            h = t.console,
            p = void 0 !== h,
            c = Object.prototype.toString;
        (s.prototype = new e).options = {}, s.prototype.getImages = function() {
            this.images = [];
            for (var t = 0, e = this.elements.length; t < e; t++) {
                var i = this.elements[t];
                "IMG" === i.nodeName && this.addImage(i);
                var o = i.nodeType;
                if (o && (1 === o || 9 === o || 11 === o))
                    for (var n = i.querySelectorAll("img"), r = 0, s = n.length; r < s; r++) {
                        var a = n[r];
                        this.addImage(a)
                    }
            }
        }, s.prototype.addImage = function(t) {
            var e = new o(t);
            this.images.push(e)
        }, s.prototype.check = function() {
            function t(t, e) {
                return i.options.debug && p && h.log("confirm", t, e), i.progress(t), ++o === n && i.complete(), !0
            }
            var i = this,
                o = 0,
                n = this.images.length;
            if (this.hasAnyBroken = !1, n)
                for (var e = 0; e < n; e++) {
                    var r = this.images[e];
                    r.on("confirm", t), r.check()
                } else this.complete()
        }, s.prototype.progress = function(t) {
            this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
            var e = this;
            setTimeout(function() {
                e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t)
            })
        }, s.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var i = this;
            setTimeout(function() {
                var t;
                i.emit(e, i), i.emit("always", i), i.jqDeferred && (t = i.hasAnyBroken ? "reject" : "resolve", i.jqDeferred[t](i))
            })
        }, u && (u.fn.imagesLoaded = function(t, e) {
            return new s(this, t, e).jqDeferred.promise(u(this))
        }), (o.prototype = new e).check = function() {
            var i, t = l[this.img.src] || new a(this.img.src);
            t.isConfirmed ? this.confirm(t.isLoaded, "cached was confirmed") : this.img.complete && void 0 !== this.img.naturalWidth ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (i = this, t.on("confirm", function(t, e) {
                return i.confirm(t.isLoaded, e), !0
            }), t.check())
        }, o.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emit("confirm", this, e)
        };
        var l = {};
        return (a.prototype = new e).check = function() {
            var t;
            this.isChecked || (t = new Image, i.bind(t, "load", this), i.bind(t, "error", this), t.src = this.src, this.isChecked = !0)
        }, a.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.onload = function(t) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(t)
        }, a.prototype.onerror = function(t) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
        }, a.prototype.confirm = function(t, e) {
            this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
        }, a.prototype.unbindProxyEvents = function(t) {
            i.unbind(t.target, "load", this), i.unbind(t.target, "error", this)
        }, s
    }),
    function(n) {
        "use strict";

        function i(t, e) {
            return t[o](e)
        }

        function r(t) {
            t.parentNode || document.createDocumentFragment().appendChild(t)
        }
        var t, o = function() {
            if (n.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], e = 0, i = t.length; e < i; e++) {
                var o = t[e] + "MatchesSelector";
                if (n[o]) return o
            }
        }();
        t = o ? i(document.createElement("div"), "div") ? i : function(t, e) {
            return r(t), i(t, e)
        } : function(t, e) {
            r(t);
            for (var i = t.parentNode.querySelectorAll(e), o = 0, n = i.length; o < n; o++)
                if (i[o] === t) return !0;
            return !1
        }, "function" == typeof define && define.amd ? define(function() {
            return t
        }) : "object" == typeof exports ? module.exports = t : window.matchesSelector = t
    }(Element.prototype),
    function(t) {
        "use strict";

        function e(t, e, r) {
            function i(t, e) {
                t && (this.element = t, this.layout = e, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }
            var o = r("transition"),
                n = r("transform"),
                s = o && n,
                a = !!r("perspective"),
                u = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                }[o],
                h = ["transform", "transition", "transitionDuration", "transitionProperty"],
                p = function() {
                    for (var t = {}, e = 0, i = h.length; e < i; e++) {
                        var o = h[e],
                            n = r(o);
                        n && n !== o && (t[o] = n)
                    }
                    return t
                }();
            (function(t, e) {
                for (var i in e) t[i] = e[i]
            })(i.prototype, t.prototype), i.prototype._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, i.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, i.prototype.getSize = function() {
                this.size = e(this.element)
            }, i.prototype.css = function(t) {
                var e = this.element.style;
                for (var i in t) {
                    e[p[i] || i] = t[i]
                }
            }, i.prototype.getPosition = function() {
                var t = m(this.element),
                    e = this.layout.options,
                    i = e.isOriginLeft,
                    o = e.isOriginTop,
                    n = parseInt(t[i ? "left" : "right"], 10),
                    r = parseInt(t[o ? "top" : "bottom"], 10),
                    n = isNaN(n) ? 0 : n,
                    r = isNaN(r) ? 0 : r,
                    s = this.layout.size;
                n -= i ? s.paddingLeft : s.paddingRight, r -= o ? s.paddingTop : s.paddingBottom, this.position.x = n, this.position.y = r
            }, i.prototype.layoutPosition = function() {
                var t = this.layout.size,
                    e = this.layout.options,
                    i = {};
                e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
            };
            var c = a ? function(t, e) {
                return "translate3d(" + t + "px, " + e + "px, 0)"
            } : function(t, e) {
                return "translate(" + t + "px, " + e + "px)"
            };
            i.prototype._transitionTo = function(t, e) {
                this.getPosition();
                var i, o, n, r, s = this.position.x,
                    a = this.position.y,
                    u = parseInt(t, 10),
                    h = parseInt(e, 10),
                    p = u === this.position.x && h === this.position.y;
                this.setPosition(t, e), !p || this.isTransitioning ? (n = t - s, r = e - a, i = {}, n = (o = this.layout.options).isOriginLeft ? n : -n, r = o.isOriginTop ? r : -r, i.transform = c(n, r), this.transition({
                    to: i,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })) : this.layoutPosition()
            }, i.prototype.goTo = function(t, e) {
                this.setPosition(t, e), this.layoutPosition()
            }, i.prototype.moveTo = s ? i.prototype._transitionTo : i.prototype.goTo, i.prototype.setPosition = function(t, e) {
                this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
            }, i.prototype._nonTransition = function(t) {
                for (var e in this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd) t.onTransitionEnd[e].call(this)
            }, i.prototype._transition = function(t) {
                if (parseFloat(this.layout.options.transitionDuration)) {
                    var e = this._transn;
                    for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                    for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                    t.from && (this.css(t.from), this.element.offsetHeight, 0), this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
                } else this._nonTransition(t)
            };
            var l = n && n.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            }) + ",opacity";
            i.prototype.enableTransition = function() {
                this.isTransitioning || (this.css({
                    transitionProperty: l,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(u, this, !1))
            }, i.prototype.transition = i.prototype[o ? "_transition" : "_nonTransition"], i.prototype.onwebkitTransitionEnd = function(t) {
                this.ontransitionend(t)
            }, i.prototype.onotransitionend = function(t) {
                this.ontransitionend(t)
            };
            var f = {
                "-webkit-transform": "transform",
                "-moz-transform": "transform",
                "-o-transform": "transform"
            };
            i.prototype.ontransitionend = function(t) {
                var e, i;
                t.target === this.element && (e = this._transn, i = f[t.propertyName] || t.propertyName, delete e.ingProperties[i], function(t) {
                    for (var e in t) return;
                    return 1
                }(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd && (e.onEnd[i].call(this), delete e.onEnd[i]), this.emitEvent("transitionEnd", [this]))
            }, i.prototype.disableTransition = function() {
                this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
            }, i.prototype._removeStyles = function(t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e)
            };
            var d = {
                transitionProperty: "",
                transitionDuration: ""
            };
            return i.prototype.removeTransitionStyles = function() {
                this.css(d)
            }, i.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
            }, i.prototype.remove = function() {
                var t;
                o && parseFloat(this.layout.options.transitionDuration) ? ((t = this).on("transitionEnd", function() {
                    return t.removeElem(), !0
                }), this.hide()) : this.removeElem()
            }, i.prototype.reveal = function() {
                delete this.isHidden, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0
                })
            }, i.prototype.hide = function() {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: {
                        opacity: function() {
                            this.isHidden && this.css({
                                display: "none"
                            })
                        }
                    }
                })
            }, i.prototype.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, i
        }
        var i = t.getComputedStyle,
            m = i ? function(t) {
                return i(t, null)
            } : function(t) {
                return t.currentStyle
            };
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], e) : "object" == typeof exports ? module.exports = e(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EventEmitter, t.getSize, t.getStyleProperty))
    }(window),
    function(u) {
        "use strict";

        function c(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function p(t) {
            var e, i = [];
            if (e = t, "[object Array]" === r.call(e)) i = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; o < n; o++) i.push(t[o]);
            else i.push(t);
            return i
        }

        function l(t, e) {
            var i = o(e, t); - 1 !== i && e.splice(i, 1)
        }

        function t(t, e, i, n, h, o) {
            function r(t, e) {
                var i;
                "string" == typeof t && (t = d.querySelector(t)), t && g(t) ? (this.element = t, this.options = c({}, this.constructor.defaults), this.option(e), i = ++s, this.element.outlayerGUID = i, (a[i] = this)._create(), this.options.isInitLayout && this.layout()) : m && m.error("Bad " + this.constructor.namespace + " element: " + t)
            }
            var s = 0,
                a = {};
            return r.namespace = "outlayer", r.Item = o, r.defaults = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                isResizingContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, c(r.prototype, i.prototype), r.prototype.option = function(t) {
                c(this.options, t)
            }, r.prototype._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), c(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, r.prototype.reloadItems = function() {
                this.items = this._itemize(this.element.children)
            }, r.prototype._itemize = function(t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; n < r; n++) {
                    var s = new i(e[n], this);
                    o.push(s)
                }
                return o
            }, r.prototype._filterFindItemElements = function(t) {
                t = p(t);
                for (var e = this.options.itemSelector, i = [], o = 0, n = t.length; o < n; o++) {
                    var r = t[o];
                    if (g(r))
                        if (e) {
                            h(r, e) && i.push(r);
                            for (var s = r.querySelectorAll(e), a = 0, u = s.length; a < u; a++) i.push(s[a])
                        } else i.push(r)
                }
                return i
            }, r.prototype.getItemElements = function() {
                for (var t = [], e = 0, i = this.items.length; e < i; e++) t.push(this.items[e].element);
                return t
            }, r.prototype._init = r.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, t), this._isLayoutInited = !0
            }, r.prototype._resetLayout = function() {
                this.getSize()
            }, r.prototype.getSize = function() {
                this.size = n(this.element)
            }, r.prototype._getMeasurement = function(t, e) {
                var i, o = this.options[t];
                o ? ("string" == typeof o ? i = this.element.querySelector(o) : g(o) && (i = o), this[t] = i ? n(i)[e] : o) : this[t] = 0
            }, r.prototype.layoutItems = function(t, e) {
                t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
            }, r.prototype._getItemsForLayout = function(t) {
                for (var e = [], i = 0, o = t.length; i < o; i++) {
                    var n = t[i];
                    n.isIgnored || e.push(n)
                }
                return e
            }, r.prototype._layoutItems = function(t, e) {
                function i() {
                    o.emitEvent("layoutComplete", [o, t])
                }
                var o = this;
                if (t && t.length) {
                    this._itemsOn(t, "layout", i);
                    for (var n = [], r = 0, s = t.length; r < s; r++) {
                        var a = t[r],
                            u = this._getItemLayoutPosition(a);
                        u.item = a, u.isInstant = e || a.isLayoutInstant, n.push(u)
                    }
                    this._processLayoutQueue(n)
                } else i()
            }, r.prototype._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }, r.prototype._processLayoutQueue = function(t) {
                for (var e = 0, i = t.length; e < i; e++) {
                    var o = t[e];
                    this._positionItem(o.item, o.x, o.y, o.isInstant)
                }
            }, r.prototype._positionItem = function(t, e, i, o) {
                o ? t.goTo(e, i) : t.moveTo(e, i)
            }, r.prototype._postLayout = function() {
                this.resizeContainer()
            }, r.prototype.resizeContainer = function() {
                var t;
                !this.options.isResizingContainer || (t = this._getContainerSize()) && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }, r.prototype._getContainerSize = f, r.prototype._setContainerMeasure = function(t, e) {
                var i;
                void 0 !== t && ((i = this.size).isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px")
            }, r.prototype._itemsOn = function(t, e, i) {
                function o() {
                    return ++n === r && i.call(s), !0
                }
                for (var n = 0, r = t.length, s = this, a = 0, u = t.length; a < u; a++) {
                    t[a].on(e, o)
                }
            }, r.prototype.ignore = function(t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }, r.prototype.unignore = function(t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }, r.prototype.stamp = function(t) {
                if (t = this._find(t)) {
                    this.stamps = this.stamps.concat(t);
                    for (var e = 0, i = t.length; e < i; e++) {
                        var o = t[e];
                        this.ignore(o)
                    }
                }
            }, r.prototype.unstamp = function(t) {
                if (t = this._find(t))
                    for (var e = 0, i = t.length; e < i; e++) {
                        var o = t[e];
                        l(o, this.stamps), this.unignore(o)
                    }
            }, r.prototype._find = function(t) {
                return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = p(t)) : void 0
            }, r.prototype._manageStamps = function() {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var t = 0, e = this.stamps.length; t < e; t++) {
                        var i = this.stamps[t];
                        this._manageStamp(i)
                    }
                }
            }, r.prototype._getBoundingRect = function() {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                }
            }, r.prototype._manageStamp = f, r.prototype._getElementOffset = function(t) {
                var e = t.getBoundingClientRect(),
                    i = this._boundingRect,
                    o = n(t);
                return {
                    left: e.left - i.left - o.marginLeft,
                    top: e.top - i.top - o.marginTop,
                    right: i.right - e.right - o.marginRight,
                    bottom: i.bottom - e.bottom - o.marginBottom
                }
            }, r.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, r.prototype.bindResize = function() {
                this.isResizeBound || (t.bind(u, "resize", this), this.isResizeBound = !0)
            }, r.prototype.unbindResize = function() {
                this.isResizeBound && t.unbind(u, "resize", this), this.isResizeBound = !1
            }, r.prototype.onresize = function() {
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var t = this;
                this.resizeTimeout = setTimeout(function() {
                    t.resize(), delete t.resizeTimeout
                }, 100)
            }, r.prototype.resize = function() {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, r.prototype.needsResizeLayout = function() {
                var t = n(this.element);
                return this.size && t && t.innerWidth !== this.size.innerWidth
            }, r.prototype.addItems = function(t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e
            }, r.prototype.appended = function(t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e))
            }, r.prototype.prepended = function(t) {
                var e, i = this._itemize(t);
                i.length && (e = this.items.slice(0), this.items = i.concat(e), this._resetLayout(), this._manageStamps(), this.layoutItems(i, !0), this.reveal(i), this.layoutItems(e))
            }, r.prototype.reveal = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; i < e; i++) {
                        t[i].reveal()
                    }
            }, r.prototype.hide = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; i < e; i++) {
                        t[i].hide()
                    }
            }, r.prototype.getItem = function(t) {
                for (var e = 0, i = this.items.length; e < i; e++) {
                    var o = this.items[e];
                    if (o.element === t) return o
                }
            }, r.prototype.getItems = function(t) {
                if (t && t.length) {
                    for (var e = [], i = 0, o = t.length; i < o; i++) {
                        var n = t[i],
                            r = this.getItem(n);
                        r && e.push(r)
                    }
                    return e
                }
            }, r.prototype.remove = function(t) {
                t = p(t);
                var e = this.getItems(t);
                if (e && e.length) {
                    this._itemsOn(e, "remove", function() {
                        this.emitEvent("removeComplete", [this, e])
                    });
                    for (var i = 0, o = e.length; i < o; i++) {
                        var n = e[i];
                        n.remove(), l(n, this.items)
                    }
                }
            }, r.prototype.destroy = function() {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "";
                for (var e = 0, i = this.items.length; e < i; e++) {
                    this.items[e].destroy()
                }
                this.unbindResize();
                var o = this.element.outlayerGUID;
                delete a[o], delete this.element.outlayerGUID, y && y.removeData(this.element, this.constructor.namespace)
            }, r.data = function(t) {
                var e = t && t.outlayerGUID;
                return e && a[e]
            }, r.create = function(h, t) {
                function p() {
                    r.apply(this, arguments)
                }
                return Object.create ? p.prototype = Object.create(r.prototype) : c(p.prototype, r.prototype), (p.prototype.constructor = p).defaults = c({}, r.defaults), c(p.defaults, t), p.prototype.settings = {}, p.namespace = h, p.data = r.data, (p.Item = function() {
                    o.apply(this, arguments)
                }).prototype = new o, e(function() {
                    for (var t = h.replace(/(.)([A-Z])/g, function(t, e, i) {
                            return e + "-" + i
                        }).toLowerCase(), e = d.querySelectorAll(".js-" + t), i = "data-" + t + "-options", o = 0, n = e.length; o < n; o++) {
                        var r, s = e[o],
                            a = s.getAttribute(i);
                        try {
                            r = a && JSON.parse(a)
                        } catch (t) {
                            m && m.error("Error parsing " + i + " on " + s.nodeName.toLowerCase() + (s.id ? "#" + s.id : "") + ": " + t);
                            continue
                        }
                        var u = new p(s, r);
                        y && y.data(s, h, u)
                    }
                }), y && y.bridget && y.bridget(h, p), p
            }, r.Item = o, r
        }

        function f() {}
        var d = u.document,
            m = u.console,
            y = u.jQuery,
            r = Object.prototype.toString,
            g = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
                return t instanceof HTMLElement
            } : function(t) {
                return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
            },
            o = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; i < o; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define(["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], t) : "object" == typeof exports ? module.exports = t(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : u.Outlayer = t(u.eventie, u.docReady, u.EventEmitter, u.getSize, u.matchesSelector, u.Outlayer.Item)
    }(window),
    function(t) {
        "use strict";

        function e(t, h) {
            var e = t.create("masonry");
            return e.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var t = this.cols;
                for (this.colYs = []; t--;) this.colYs.push(0);
                this.maxY = 0
            }, e.prototype.measureColumns = function() {
                var t, e;
                this.getContainerWidth(), this.columnWidth || (e = (t = this.items[0]) && t.element, this.columnWidth = e && h(e).outerWidth || this.containerWidth), this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, e.prototype.getContainerWidth = function() {
                var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                    e = h(t);
                this.containerWidth = e && e.innerWidth
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                for (var e = t.size.outerWidth % this.columnWidth, i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth), i = Math.min(i, this.cols), o = this._getColGroup(i), n = Math.min.apply(Math, o), r = p(o, n), s = {
                        x: this.columnWidth * r,
                        y: n
                    }, a = n + t.size.outerHeight, u = this.cols + 1 - o.length, h = 0; h < u; h++) this.colYs[r + h] = a;
                return s
            }, e.prototype._getColGroup = function(t) {
                if (t < 2) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) {
                    var n = this.colYs.slice(o, o + t);
                    e[o] = Math.max.apply(Math, n)
                }
                return e
            }, e.prototype._manageStamp = function(t) {
                var e = h(t),
                    i = this._getElementOffset(t),
                    o = this.options.isOriginLeft ? i.left : i.right,
                    n = o + e.outerWidth,
                    r = Math.floor(o / this.columnWidth),
                    r = Math.max(0, r),
                    s = Math.floor(n / this.columnWidth);
                s -= n % this.columnWidth ? 0 : 1, s = Math.min(this.cols - 1, s);
                for (var a = (this.options.isOriginTop ? i.top : i.bottom) + e.outerHeight, u = r; u <= s; u++) this.colYs[u] = Math.max(a, this.colYs[u])
            }, e.prototype._getContainerSize = function() {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {
                    height: this.maxY
                };
                return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
            }, e.prototype._getContainerFitWidth = function() {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
                return (this.cols - t) * this.columnWidth - this.gutter
            }, e.prototype.needsResizeLayout = function() {
                var t = this.containerWidth;
                return this.getContainerWidth(), t !== this.containerWidth
            }, e
        }
        var p = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, o = t.length; i < o; i++) {
                if (t[i] === e) return i
            }
            return -1
        };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            function e() {
                t.Item.apply(this, arguments)
            }(e.prototype = new t.Item)._create = function() {
                this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
            }, e.prototype.updateSortData = function() {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var o = e[i];
                        this.sortData[i] = o(this.element, this)
                    }
                }
            };
            var i = e.prototype.destroy;
            return e.prototype.destroy = function() {
                i.apply(this, arguments), this.css({
                    display: ""
                })
            }, e
        }
        "function" == typeof define && define.amd ? define(["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window),
    function(t) {
        "use strict";

        function e(e, n) {
            function r(t) {
                (this.isotope = t) && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
            }
            return function() {
                for (var t = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], e = 0, i = t.length; e < i; e++) {
                    var o = t[e];
                    r.prototype[o] = function(t) {
                        return function() {
                            return n.prototype[t].apply(this.isotope, arguments)
                        }
                    }(o)
                }
            }(), r.prototype.needsVerticalResizeLayout = function() {
                var t = e(this.isotope.element);
                return this.isotope.size && t && t.innerHeight !== this.isotope.size.innerHeight
            }, r.prototype._getMeasurement = function() {
                this.isotope._getMeasurement.apply(this, arguments)
            }, r.prototype.getColumnWidth = function() {
                this.getSegmentSize("column", "Width")
            }, r.prototype.getRowHeight = function() {
                this.getSegmentSize("row", "Height")
            }, r.prototype.getSegmentSize = function(t, e) {
                var i, o = t + e,
                    n = "outer" + e;
                this._getMeasurement(o, n), this[o] || (i = this.getFirstItemSize(), this[o] = i && i[n] || this.isotope.size["inner" + e])
            }, r.prototype.getFirstItemSize = function() {
                var t = this.isotope.filteredItems[0];
                return t && t.element && e(t.element)
            }, r.prototype.layout = function() {
                this.isotope.layout.apply(this.isotope, arguments)
            }, r.prototype.getSize = function() {
                this.isotope.getSize(), this.size = this.isotope.size
            }, r.modes = {}, r.create = function(t, e) {
                function i() {
                    r.apply(this, arguments)
                }
                return i.prototype = new r, e && (i.options = e), r.modes[i.prototype.namespace = t] = i
            }, r
        }
        "function" == typeof define && define.amd ? define(["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window),
    function(t) {
        "use strict";

        function p(t) {
            var e, i = [];
            if (e = t, "[object Array]" === r.call(e)) i = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; o < n; o++) i.push(t[o]);
            else i.push(t);
            return i
        }

        function e(o, t, i, e, n) {
            var h = o.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
            h.Item = e, h.LayoutMode = n, h.prototype._create = function() {
                for (var t in this.itemGUID = 0, this._sorters = {}, this._getSorters(), o.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], n.modes) this._initLayoutMode(t)
            }, h.prototype.reloadItems = function() {
                this.itemGUID = 0, o.prototype.reloadItems.call(this)
            }, h.prototype._itemize = function() {
                for (var t = o.prototype._itemize.apply(this, arguments), e = 0, i = t.length; e < i; e++) {
                    t[e].id = this.itemGUID++
                }
                return this._updateItemsSortData(t), t
            }, h.prototype._initLayoutMode = function(t) {
                var e = n.modes[t],
                    i = this.options[t] || {};
                this.options[t] = e.options ? function(t, e) {
                    for (var i in e) t[i] = e[i];
                    return t
                }(e.options, i) : i, this.modes[t] = new e(this)
            }, h.prototype.layout = function() {
                return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
            }, h.prototype._layout = function() {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
            }, h.prototype.arrange = function(t) {
                this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
            }, h.prototype._init = h.prototype.arrange, h.prototype._getIsInstant = function() {
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                return this._isInstant = t
            }, h.prototype._filter = function(t) {
                function e() {
                    c.reveal(n), c.hide(r)
                }
                for (var i = (i = this.options.filter) || "*", o = [], n = [], r = [], s = this._getFilterTest(i), a = 0, u = t.length; a < u; a++) {
                    var h, p = t[a];
                    p.isIgnored || ((h = s(p)) && o.push(p), h && p.isHidden ? n.push(p) : h || p.isHidden || r.push(p))
                }
                var c = this;
                return this._isInstant ? this._noTransition(e) : e(), o
            }, h.prototype._getFilterTest = function(e) {
                return s && this.options.isJQueryFiltering ? function(t) {
                    return s(t.element).is(e)
                } : "function" == typeof e ? function(t) {
                    return e(t.element)
                } : function(t) {
                    return i(t.element, e)
                }
            }, h.prototype.updateSortData = function(t) {
                var e = t ? (t = p(t), this.getItems(t)) : this.items;
                this._getSorters(), this._updateItemsSortData(e)
            }, h.prototype._getSorters = function() {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = r(i)
                }
            }, h.prototype._updateItemsSortData = function(t) {
                for (var e = t && t.length, i = 0; e && i < e; i++) {
                    t[i].updateSortData()
                }
            };
            var r = function(t) {
                if ("string" != typeof t) return t;
                var e, i, o = c(t).split(" "),
                    n = o[0],
                    r = n.match(/^\[(.+)\]$/),
                    s = r && r[1],
                    a = (i = n, (e = s) ? function(t) {
                        return t.getAttribute(e)
                    } : function(t) {
                        var e = t.querySelector(i);
                        return e && l(e)
                    }),
                    u = h.sortDataParsers[o[1]];
                return u ? function(t) {
                    return t && u(a(t))
                } : function(t) {
                    return t && a(t)
                }
            };
            h.sortDataParsers = {
                parseInt: function(t) {
                    return parseInt(t, 10)
                },
                parseFloat: function(t) {
                    return parseFloat(t)
                }
            }, h.prototype._sort = function() {
                var t, e, a, u, i = this.options.sortBy;
                i && (t = [].concat.apply(i, this.sortHistory), a = t, u = this.options.sortAscending, e = function(t, e) {
                    for (var i = 0, o = a.length; i < o; i++) {
                        var n = a[i],
                            r = t.sortData[n],
                            s = e.sortData[n];
                        if (s < r || r < s) return (s < r ? 1 : -1) * ((void 0 !== u[n] ? u[n] : u) ? 1 : -1)
                    }
                    return 0
                }, this.filteredItems.sort(e), i !== this.sortHistory[0] && this.sortHistory.unshift(i))
            }, h.prototype._mode = function() {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw Error("No layout mode: " + t);
                return e.options = this.options[t], e
            }, h.prototype._resetLayout = function() {
                o.prototype._resetLayout.call(this), this._mode()._resetLayout()
            }, h.prototype._getItemLayoutPosition = function(t) {
                return this._mode()._getItemLayoutPosition(t)
            }, h.prototype._manageStamp = function(t) {
                this._mode()._manageStamp(t)
            }, h.prototype._getContainerSize = function() {
                return this._mode()._getContainerSize()
            }, h.prototype.needsResizeLayout = function() {
                return this._mode().needsResizeLayout()
            }, h.prototype.appended = function(t) {
                var e, i = this.addItems(t);
                i.length && (e = this._filterRevealAdded(i), this.filteredItems = this.filteredItems.concat(e))
            }, h.prototype.prepended = function(t) {
                var e, i, o = this._itemize(t);
                o.length && (e = this.items.slice(0), this.items = o.concat(e), this._resetLayout(), this._manageStamps(), i = this._filterRevealAdded(o), this.layoutItems(e), this.filteredItems = i.concat(this.filteredItems))
            }, h.prototype._filterRevealAdded = function(t) {
                var e = this._noTransition(function() {
                    return this._filter(t)
                });
                return this.layoutItems(e, !0), this.reveal(e), t
            }, h.prototype.insert = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    for (var i, o = e.length, n = 0; n < o; n++) i = e[n], this.element.appendChild(i.element);
                    var r = this._filter(e);
                    for (this._noTransition(function() {
                            this.hide(r)
                        }), n = 0; n < o; n++) e[n].isLayoutInstant = !0;
                    for (this.arrange(), n = 0; n < o; n++) delete e[n].isLayoutInstant;
                    this.reveal(r)
                }
            };
            var u = h.prototype.remove;
            return h.prototype.remove = function(t) {
                t = p(t);
                var e, i, o, n = this.getItems(t);
                if (u.call(this, t), n && n.length)
                    for (var r = 0, s = n.length; r < s; r++) {
                        var a = n[r];
                        e = a, i = this.filteredItems, -1 !== (o = f(i, e)) && i.splice(o, 1)
                    }
            }, h.prototype.shuffle = function() {
                for (var t = 0, e = this.items.length; t < e; t++) {
                    this.items[t].sortData.random = Math.random()
                }
                this.options.sortBy = "random", this._sort(), this._layout()
            }, h.prototype._noTransition = function(t) {
                var e = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var i = t.call(this);
                return this.options.transitionDuration = e, i
            }, h.prototype.getFilteredItemElements = function() {
                for (var t = [], e = 0, i = this.filteredItems.length; e < i; e++) t.push(this.filteredItems[e].element);
                return t
            }, h
        }
        var s = t.jQuery,
            c = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            l = document.documentElement.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            r = Object.prototype.toString,
            f = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; i < o; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "./item", "./layout-mode", "./layout-modes/masonry", "./layout-modes/fit-rows", "./layout-modes/vertical"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = e(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("vertical", {
                horizontalAlignment: 0
            });
            return e.prototype._resetLayout = function() {
                this.y = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return this.y += t.size.outerHeight, {
                    x: e,
                    y: i
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.y
                }
            }, e
        }
        "function" == typeof define && define.amd ? define(["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("fitRows");
            return e.prototype._resetLayout = function() {
                this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter,
                    i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
                var o = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.maxY
                }
            }, e
        }
        "function" == typeof define && define.amd ? define(["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            var i = t.create("masonry"),
                o = i.prototype._getElementOffset,
                n = i.prototype.layout,
                r = i.prototype._getMeasurement;
            (function(t, e) {
                for (var i in e) t[i] = e[i]
            })(i.prototype, e.prototype), i.prototype._getElementOffset = o, i.prototype.layout = n, i.prototype._getMeasurement = r;
            var s = i.prototype.measureColumns;
            i.prototype.measureColumns = function() {
                this.items = this.isotope.filteredItems, s.call(this)
            };
            var a = i.prototype._manageStamp;
            return i.prototype._manageStamp = function() {
                this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, a.apply(this, arguments)
            }, i
        }
        "function" == typeof define && define.amd ? define(["../layout-mode", "masonry/masonry"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("cellsByColumn");
            return e.prototype._resetLayout = function() {
                this.itemIndex = 0, this.getColumnWidth(), this.getRowHeight(), this.rows = Math.floor(this.isotope.size.innerHeight / this.rowHeight), this.rows = Math.max(this.rows, 1)
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = Math.floor(this.itemIndex / this.rows),
                    i = this.itemIndex % this.rows,
                    o = (e + .5) * this.columnWidth - t.size.outerWidth / 2,
                    n = (.5 + i) * this.rowHeight - t.size.outerHeight / 2;
                return this.itemIndex++, {
                    x: o,
                    y: n
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    width: Math.ceil(this.itemIndex / this.rows) * this.columnWidth
                }
            }, e.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("cellsByRow");
            return e.prototype._resetLayout = function() {
                this.itemIndex = 0, this.getColumnWidth(), this.getRowHeight(), this.cols = Math.floor(this.isotope.size.innerWidth / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = this.itemIndex % this.cols,
                    i = Math.floor(this.itemIndex / this.cols),
                    o = (.5 + e) * this.columnWidth - t.size.outerWidth / 2,
                    n = (i + .5) * this.rowHeight - t.size.outerHeight / 2;
                return this.itemIndex++, {
                    x: o,
                    y: n
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    height: Math.ceil(this.itemIndex / this.cols) * this.rowHeight
                }
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("fitColumns");
            return e.prototype._resetLayout = function() {
                this.x = 0, this.y = 0, this.maxX = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize(), 0 !== this.y && t.size.outerHeight + this.y > this.isotope.size.innerHeight && (this.y = 0, this.x = this.maxX);
                var e = {
                    x: this.x,
                    y: this.y
                };
                return this.maxX = Math.max(this.maxX, this.x + t.size.outerWidth), this.y += t.size.outerHeight, e
            }, e.prototype._getContainerSize = function() {
                return {
                    width: this.maxX
                }
            }, e.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("horizontal", {
                verticalAlignment: 0
            });
            return e.prototype._resetLayout = function() {
                this.x = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerHeight - t.size.outerHeight) * this.options.verticalAlignment,
                    i = this.x;
                return this.x += t.size.outerWidth, {
                    x: i,
                    y: e
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    width: this.x
                }
            }, e.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(h, t) {
            var e = t.create("masonryHorizontal");
            return e.prototype._resetLayout = function() {
                this.getRowHeight(), this._getMeasurement("gutter", "outerHeight"), this.rowHeight += this.gutter, this.rows = Math.floor((this.isotope.size.innerHeight + this.gutter) / this.rowHeight), this.rows = Math.max(this.rows, 1);
                var t = this.rows;
                for (this.rowXs = []; t--;) this.rowXs.push(0);
                this.maxX = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                for (var e = Math.ceil(t.size.outerHeight / this.rowHeight), e = Math.min(e, this.rows), i = this._getRowGroup(e), o = Math.min.apply(Math, i), n = p(i, o), r = {
                        x: o,
                        y: this.rowHeight * n
                    }, s = o + t.size.outerWidth, a = this.rows + 1 - i.length, u = 0; u < a; u++) this.rowXs[n + u] = s;
                return r
            }, e.prototype._getRowGroup = function(t) {
                if (t < 2) return this.rowXs;
                for (var e = [], i = this.rows + 1 - t, o = 0; o < i; o++) {
                    var n = this.rowXs.slice(o, o + t);
                    e[o] = Math.max.apply(Math, n)
                }
                return e
            }, e.prototype._manageStamp = function(t) {
                for (var e = h(t), i = this.isotope._getElementOffset(t), o = this.isotope.options.isOriginTop ? i.top : i.bottom, n = o + e.outerHeight, r = Math.floor(o / this.rowHeight), r = Math.max(0, r), s = Math.floor(n / this.rowHeight), s = Math.min(this.rows - 1, s), a = (this.isotope.options.isOriginLeft ? i.left : i.right) + e.outerWidth, u = r; u <= s; u++) this.rowXs[u] = Math.max(a, this.rowXs[u])
            }, e.prototype._getContainerSize = function() {
                return this.maxX = Math.max.apply(Math, this.rowXs), {
                    width: this.maxX
                }
            }, e.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, e
        }
        var p = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, o = t.length; i < o; i++) {
                if (t[i] === e) return i
            }
            return -1
        };
        "function" == typeof define && define.amd ? define(["get-size/get-size", "isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("isotope-layout/js/layout-mode")) : e(t.getSize, t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e() {
            function a(t) {
                for (var e in a.defaults) this[e] = a.defaults[e];
                for (e in t) this[e] = t[e]
            }
            return (i.Rect = a).defaults = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }, a.prototype.contains = function(t) {
                var e = t.width || 0,
                    i = t.height || 0;
                return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i
            }, a.prototype.overlaps = function(t) {
                var e = this.x + this.width,
                    i = this.y + this.height,
                    o = t.x + t.width,
                    n = t.y + t.height;
                return o > this.x && e > t.x && n > this.y && i > t.y
            }, a.prototype.getMaximalFreeRects = function(t) {
                if (!this.overlaps(t)) return !1;
                var e, i = [],
                    o = this.x + this.width,
                    n = this.y + this.height,
                    r = t.x + t.width,
                    s = t.y + t.height;
                return this.y < t.y && (e = new a({
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: t.y - this.y
                }), i.push(e)), r < o && (e = new a({
                    x: r,
                    y: this.y,
                    width: o - r,
                    height: this.height
                }), i.push(e)), s < n && (e = new a({
                    x: this.x,
                    y: s,
                    width: this.width,
                    height: n - s
                }), i.push(e)), this.x < t.x && (e = new a({
                    x: this.x,
                    y: this.y,
                    width: t.x - this.x,
                    height: this.height
                }), i.push(e)), i
            }, a.prototype.canFit = function(t) {
                return this.width >= t.width && this.height >= t.height
            }, a
        }
        var i = t.Packery = function() {};
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : (t.Packery = t.Packery || {}, t.Packery.Rect = e())
    }(window),
    function(t) {
        "use strict";

        function e(e) {
            function t(t, e, i) {
                this.width = t || 0, this.height = e || 0, this.sortDirection = i || "downwardLeftToRight", this.reset()
            }
            t.prototype.reset = function() {
                this.spaces = [], this.newSpaces = [];
                var t = new e({
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height
                });
                this.spaces.push(t), this.sorter = i[this.sortDirection] || i.downwardLeftToRight
            }, t.prototype.pack = function(t) {
                for (var e = 0, i = this.spaces.length; e < i; e++) {
                    var o = this.spaces[e];
                    if (o.canFit(t)) {
                        this.placeInSpace(t, o);
                        break
                    }
                }
            }, t.prototype.placeInSpace = function(t, e) {
                t.x = e.x, t.y = e.y, this.placed(t)
            }, t.prototype.placed = function(t) {
                for (var e = [], i = 0, o = this.spaces.length; i < o; i++) {
                    var n = this.spaces[i],
                        r = n.getMaximalFreeRects(t);
                    r ? e.push.apply(e, r) : e.push(n)
                }
                this.spaces = e, this.mergeSortSpaces()
            }, t.prototype.mergeSortSpaces = function() {
                t.mergeRects(this.spaces), this.spaces.sort(this.sorter)
            }, t.prototype.addSpace = function(t) {
                this.spaces.push(t), this.mergeSortSpaces()
            }, t.mergeRects = function(t) {
                for (var e = 0, i = t.length; e < i; e++) {
                    var o = t[e];
                    if (o) {
                        var n = t.slice(0);
                        n.splice(e, 1);
                        for (var r = 0, s = 0, a = n.length; s < a; s++) {
                            var u = n[s],
                                h = s < e ? 0 : 1;
                            o.contains(u) && (t.splice(s + h - r, 1), r++)
                        }
                    }
                }
                return t
            };
            var i = {
                downwardLeftToRight: function(t, e) {
                    return t.y - e.y || t.x - e.x
                },
                rightwardTopToBottom: function(t, e) {
                    return t.x - e.x || t.y - e.y
                }
            };
            return t
        }
        var i;
        "function" == typeof define && define.amd ? define(["./rect"], e) : "object" == typeof exports ? module.exports = e(require("./rect")) : (i = t.Packery = t.Packery || {}).Packer = e(i.Rect)
    }(window),
    function(t) {
        "use strict";

        function e(t, e, i) {
            function o() {
                e.Item.apply(this, arguments)
            }
            var n = t("transform"),
                r = (o.prototype = new e.Item)._create;
            return o.prototype._create = function() {
                r.call(this), this.rect = new i, this.placeRect = new i
            }, o.prototype.dragStart = function() {
                this.getPosition(), this.removeTransitionStyles(), this.isTransitioning && n && (this.element.style[n] = "none"), this.getSize(), this.isPlacing = !0, this.needsPositioning = !1, this.positionPlaceRect(this.position.x, this.position.y), this.isTransitioning = !1, this.didDrag = !1
            }, o.prototype.dragMove = function(t, e) {
                this.didDrag = !0;
                var i = this.layout.size;
                t -= i.paddingLeft, e -= i.paddingTop, this.positionPlaceRect(t, e)
            }, o.prototype.dragStop = function() {
                this.getPosition();
                var t = this.position.x !== this.placeRect.x,
                    e = this.position.y !== this.placeRect.y;
                this.needsPositioning = t || e, this.didDrag = !1
            }, o.prototype.positionPlaceRect = function(t, e, i) {
                this.placeRect.x = this.getPlaceRectCoord(t, !0), this.placeRect.y = this.getPlaceRectCoord(e, !1, i)
            }, o.prototype.getPlaceRectCoord = function(t, e, i) {
                var o, n, r, s = e ? "Width" : "Height",
                    a = this.size["outer" + s],
                    u = this.layout[e ? "columnWidth" : "rowHeight"],
                    h = this.layout.size["inner" + s];
                return e || (h = Math.max(h, this.layout.maxY), this.layout.rowHeight || (h -= this.layout.gutter)), r = u ? (u += this.layout.gutter, h += e ? this.layout.gutter : 0, t = Math.round(t / u), o = this.layout.options.isHorizontal ? e ? "ceil" : "floor" : e ? "floor" : "ceil", n = Math[o](h / u), n -= Math.ceil(a / u)) : h - a, t = i ? t : Math.min(t, r), t *= u || 1, Math.max(0, t)
            }, o.prototype.copyPlaceRectPosition = function() {
                this.rect.x = this.placeRect.x, this.rect.y = this.placeRect.y
            }, o.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this])
            }, o
        }
        "function" == typeof define && define.amd ? define(["get-style-property/get-style-property", "outlayer/outlayer", "./rect"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property"), require("outlayer"), require("./rect")) : t.Packery.Item = e(t.getStyleProperty, t.Outlayer, t.Packery.Rect)
    }(window),
    function(t) {
        "use strict";

        function e(s, a, t, n, e, i) {
            function o(t, e) {
                return t.position.y - e.position.y || t.position.x - e.position.x
            }

            function r(t, e) {
                return t.position.x - e.position.x || t.position.y - e.position.y
            }
            var u = t.create("packery");
            return u.Item = i, u.prototype._create = function() {
                t.prototype._create.call(this), this.packer = new e, this.stamp(this.options.stamped);
                var i = this;
                this.handleDraggabilly = {
                    dragStart: function(t) {
                        i.itemDragStart(t.element)
                    },
                    dragMove: function(t) {
                        i.itemDragMove(t.element, t.position.x, t.position.y)
                    },
                    dragEnd: function(t) {
                        i.itemDragEnd(t.element)
                    }
                }, this.handleUIDraggable = {
                    start: function(t) {
                        i.itemDragStart(t.currentTarget)
                    },
                    drag: function(t, e) {
                        i.itemDragMove(t.currentTarget, e.position.left, e.position.top)
                    },
                    stop: function(t) {
                        i.itemDragEnd(t.currentTarget)
                    }
                }
            }, u.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurements();
                var t = this.packer;
                this.options.isHorizontal ? (t.width = Number.POSITIVE_INFINITY, t.height = this.size.innerHeight + this.gutter, t.sortDirection = "rightwardTopToBottom") : (t.width = this.size.innerWidth + this.gutter, t.height = Number.POSITIVE_INFINITY, t.sortDirection = "downwardLeftToRight"), t.reset(), this.maxY = 0, this.maxX = 0
            }, u.prototype._getMeasurements = function() {
                this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width")
            }, u.prototype._getItemLayoutPosition = function(t) {
                return this._packItem(t), t.rect
            }, u.prototype._packItem = function(t) {
                this._setRectSize(t.element, t.rect), this.packer.pack(t.rect), this._setMaxXY(t.rect)
            }, u.prototype._setMaxXY = function(t) {
                this.maxX = Math.max(t.x + t.width, this.maxX), this.maxY = Math.max(t.y + t.height, this.maxY)
            }, u.prototype._setRectSize = function(t, e) {
                var i, o, n = a(t),
                    r = n.outerWidth,
                    s = n.outerHeight;
                (r || s) && (i = this.columnWidth + this.gutter, o = this.rowHeight + this.gutter, r = this.columnWidth ? Math.ceil(r / i) * i : r + this.gutter, s = this.rowHeight ? Math.ceil(s / o) * o : s + this.gutter), e.width = Math.min(r, this.packer.width), e.height = Math.min(s, this.packer.height)
            }, u.prototype._getContainerSize = function() {
                return this.options.isHorizontal ? {
                    width: this.maxX - this.gutter
                } : {
                    height: this.maxY - this.gutter
                }
            }, u.prototype._manageStamp = function(t) {
                var e, i, o = this.getItem(t);
                i = o && o.isPlacing ? o.placeRect : (e = this._getElementOffset(t), new n({
                    x: this.options.isOriginLeft ? e.left : e.right,
                    y: this.options.isOriginTop ? e.top : e.bottom
                })), this._setRectSize(t, i), this.packer.placed(i), this._setMaxXY(i)
            }, u.prototype.sortItemsByPosition = function() {
                var t = this.options.isHorizontal ? r : o;
                this.items.sort(t)
            }, u.prototype.fit = function(t, e, i) {
                var o = this.getItem(t);
                o && (this._getMeasurements(), this.stamp(o.element), o.getSize(), o.isPlacing = !0, e = void 0 === e ? o.rect.x : e, i = void 0 === i ? o.rect.y : i, o.positionPlaceRect(e, i, !0), this._bindFitEvents(o), o.moveTo(o.placeRect.x, o.placeRect.y), this.layout(), this.unstamp(o.element), this.sortItemsByPosition(), o.isPlacing = !1, o.copyPlaceRectPosition())
            }, u.prototype._bindFitEvents = function(t) {
                function e() {
                    2 === ++o && i.emitEvent("fitComplete", [i, t])
                }
                var i = this,
                    o = 0;
                t.on("layout", function() {
                    return e(), !0
                }), this.on("layoutComplete", function() {
                    return e(), !0
                })
            }, u.prototype.resize = function() {
                var t = a(this.element),
                    e = this.size && t,
                    i = this.options.isHorizontal ? "innerHeight" : "innerWidth";
                e && t[i] === this.size[i] || this.layout()
            }, u.prototype.itemDragStart = function(t) {
                this.stamp(t);
                var e = this.getItem(t);
                e && e.dragStart()
            }, u.prototype.itemDragMove = function(t, e, i) {
                var o = this.getItem(t);
                o && o.dragMove(e, i);
                var n = this;
                this.clearDragTimeout(), this.dragTimeout = setTimeout(function() {
                    n.layout(), delete n.dragTimeout
                }, 40)
            }, u.prototype.clearDragTimeout = function() {
                this.dragTimeout && clearTimeout(this.dragTimeout)
            }, u.prototype.itemDragEnd = function(t) {
                var e, i, o = this.getItem(t);
                o && (e = o.didDrag, o.dragStop()), o && (e || o.needsPositioning) ? (s.add(o.element, "is-positioning-post-drag"), i = this._getDragEndLayoutComplete(t, o), o.needsPositioning ? (o.on("layout", i), o.moveTo(o.placeRect.x, o.placeRect.y)) : o && o.copyPlaceRectPosition(), this.clearDragTimeout(), this.on("layoutComplete", i), this.layout()) : this.unstamp(t)
            }, u.prototype._getDragEndLayoutComplete = function(t, e) {
                var i = e && e.needsPositioning,
                    o = 0,
                    n = i ? 2 : 1,
                    r = this;
                return function() {
                    return ++o !== n || (e && (s.remove(e.element, "is-positioning-post-drag"), e.isPlacing = !1, e.copyPlaceRectPosition()), r.unstamp(t), r.sortItemsByPosition(), i && r.emitEvent("dragItemPositioned", [r, e])), !0
                }
            }, u.prototype.bindDraggabillyEvents = function(t) {
                t.on("dragStart", this.handleDraggabilly.dragStart), t.on("dragMove", this.handleDraggabilly.dragMove), t.on("dragEnd", this.handleDraggabilly.dragEnd)
            }, u.prototype.bindUIDraggableEvents = function(t) {
                t.on("dragstart", this.handleUIDraggable.start).on("drag", this.handleUIDraggable.drag).on("dragstop", this.handleUIDraggable.stop)
            }, u.Rect = n, u.Packer = e, u
        }
        "function" == typeof define && define.amd ? define(["classie/classie", "get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], e) : "object" == typeof exports ? module.exports = e(require("desandro-classie"), require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : t.Packery = e(t.classie, t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item)
    }(window),
    function(t) {
        "use strict";

        function e(t, e, o) {
            var i = t.create("packery"),
                n = i.prototype._getElementOffset,
                r = i.prototype._getMeasurement;
            (function(t, e) {
                for (var i in e) t[i] = e[i]
            })(i.prototype, e.prototype), i.prototype._getElementOffset = n, i.prototype._getMeasurement = r;
            var s = i.prototype._resetLayout;
            i.prototype._resetLayout = function() {
                this.packer = this.packer || new e.Packer, s.apply(this, arguments)
            };
            var a = i.prototype._getItemLayoutPosition;
            i.prototype._getItemLayoutPosition = function(t) {
                return t.rect = t.rect || new e.Rect, a.call(this, t)
            };
            var u = i.prototype._manageStamp;
            return i.prototype._manageStamp = function() {
                this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments)
            }, i.prototype.needsResizeLayout = function() {
                var t = o(this.element),
                    e = this.size && t,
                    i = this.options.isHorizontal ? "innerHeight" : "innerWidth";
                return e && t[i] !== this.size[i]
            }, i
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode", "packery/js/packery", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode"), require("packery"), require("get-size")) : e(t.Isotope.LayoutMode, t.Packery, t.getSize)
    }(window),
    function(t) {
        "use strict";

        function e() {}

        function i(h) {
            if (h) {
                var p = "undefined" == typeof console ? e : function(t) {
                    console.error(t)
                };
                return h.bridget = function(t, e) {
                    var a, u, i;
                    (i = e).prototype.option || (i.prototype.option = function(t) {
                        h.isPlainObject(t) && (this.options = h.extend(!0, this.options, t))
                    }), a = t, u = e, h.fn[a] = function(e) {
                        if ("string" != typeof e) return this.each(function() {
                            var t = h.data(this, a);
                            t ? (t.option(e), t._init()) : (t = new u(this, e), h.data(this, a, t))
                        });
                        for (var t = c.call(arguments, 1), i = 0, o = this.length; i < o; i++) {
                            var n = this[i],
                                r = h.data(n, a);
                            if (r)
                                if (h.isFunction(r[e]) && "_" !== e.charAt(0)) {
                                    var s = r[e].apply(r, t);
                                    if (void 0 !== s) return s
                                } else p("no such method '" + e + "' for " + a + " instance");
                            else p("cannot call methods on " + a + " prior to initialization; attempted to call '" + e + "'")
                        }
                        return this
                    }
                }, h.bridget
            }
        }
        var c = Array.prototype.slice;
        "function" == typeof define && define.amd ? define(["jquery"], i) : "object" == typeof exports ? i(require("jquery")) : i(t.jQuery)
    }(window);
var hljs = new function() {
    function v(t) {
        return t.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function c(t) {
        return t.nodeName.toLowerCase()
    }

    function b(t, e) {
        var i = t && t.exec(e);
        return i && 0 == i.index
    }

    function p(t, e) {
        var i = {};
        for (var o in t) i[o] = t[o];
        if (e)
            for (var o in e) i[o] = e[o];
        return i
    }

    function a(t) {
        var n = [];
        return function t(e, i) {
            for (var o = e.firstChild; o; o = o.nextSibling) 3 == o.nodeType ? i += o.nodeValue.length : "br" == c(o) ? i += 1 : 1 == o.nodeType && (n.push({
                event: "start",
                offset: i,
                node: o
            }), i = t(o, i), n.push({
                event: "stop",
                offset: i,
                node: o
            }));
            return i
        }(t, 0), n
    }

    function u(t, e, i) {
        function o() {
            return t.length && e.length ? t[0].offset != e[0].offset ? t[0].offset < e[0].offset ? t : e : "start" == e[0].event ? t : e : t.length ? t : e
        }

        function n(t) {
            u += "<" + c(t) + Array.prototype.map.call(t.attributes, function(t) {
                return " " + t.nodeName + '="' + v(t.value) + '"'
            }).join("") + ">"
        }

        function r(t) {
            u += "</" + c(t) + ">"
        }

        function s(t) {
            ("start" == t.event ? n : r)(t.node)
        }
        for (var a = 0, u = "", h = []; t.length || e.length;) {
            var p = o();
            if (u += v(i.substr(a, p[0].offset - a)), a = p[0].offset, p == t) {
                for (h.reverse().forEach(r); s(p.splice(0, 1)[0]), (p = o()) == t && p.length && p[0].offset == a;);
                h.reverse().forEach(n)
            } else "start" == p[0].event ? h.push(p[0].node) : h.pop(), s(p.splice(0, 1)[0])
        }
        return u + v(i.substr(a))
    }

    function x(a) {
        function u(t) {
            return t && t.source || t
        }

        function h(t, e) {
            return RegExp(u(t), "m" + (a.cI ? "i" : "") + (e ? "g" : ""))
        }! function e(i, t) {
            function o(i, t) {
                a.cI && (t = t.toLowerCase()), t.split(" ").forEach(function(t) {
                    var e = t.split("|");
                    n[e[0]] = [i, e[1] ? Number(e[1]) : 1]
                })
            }
            var n, r, s;
            i.compiled || (i.compiled = !0, i.k = i.k || i.bK, i.k && (n = {}, "string" == typeof i.k ? o("keyword", i.k) : Object.keys(i.k).forEach(function(t) {
                o(t, i.k[t])
            }), i.k = n), i.lR = h(i.l || /\b[A-Za-z0-9_]+\b/, !0), t && (i.bK && (i.b = i.bK.split(" ").join("|")), i.b || (i.b = /\B|\b/), i.bR = h(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = h(i.e)), i.tE = u(i.e) || "", i.eW && t.tE && (i.tE += (i.e ? "|" : "") + t.tE)), i.i && (i.iR = h(i.i)), void 0 === i.r && (i.r = 1), i.c || (i.c = []), r = [], i.c.forEach(function(e) {
                e.v ? e.v.forEach(function(t) {
                    r.push(p(e, t))
                }) : r.push("self" == e ? i : e)
            }), i.c = r, i.c.forEach(function(t) {
                e(t, i)
            }), i.starts && e(i.starts, t), s = i.c.map(function(t) {
                return t.bK ? "\\.?\\b(" + t.b + ")\\b\\.?" : t.b
            }).concat([i.tE]).concat([i.i]).map(u).filter(Boolean), i.t = s.length ? h(s.join("|"), !0) : {
                exec: function() {
                    return null
                }
            }, i.continuation = {})
        }(a)
    }

    function w(t, e, a, i) {
        function u(t, e, i, o) {
            var n = '<span class="' + (o ? "" : z.classPrefix);
            return (n += t + '">') + e + (i ? "" : "</span>")
        }

        function o() {
            var t = v(d);
            if (!l.k) return t;
            var e = "",
                i = 0;
            l.lR.lastIndex = 0;
            for (var o, n, r, s = l.lR.exec(t); s;) {
                e += t.substr(i, s.index - i);
                var a = (o = l, n = s, r = c.cI ? n[0].toLowerCase() : n[0], o.k.hasOwnProperty(r) && o.k[r]);
                a ? (m += a[1], e += u(a[0], s[0])) : e += s[0], i = l.lR.lastIndex, s = l.lR.exec(t)
            }
            return e + t.substr(i)
        }

        function h() {
            return (void 0 !== l.sL ? function() {
                if (l.sL && !L[l.sL]) return v(d);
                var t = l.sL ? w(l.sL, d, !0, l.continuation.top) : I(d);
                return 0 < l.r && (m += t.r), "continuous" == l.subLanguageMode && (l.continuation.top = t.top), u(t.language, t.value, !1, !0)
            } : o)()
        }

        function p(t, e) {
            var i = t.cN ? u(t.cN, "", !0) : "";
            d = t.rB ? (f += i, "") : t.eB ? (f += v(e) + i, "") : (f += i, e), l = Object.create(t, {
                parent: {
                    value: l
                }
            })
        }

        function n(t, e) {
            if (d += t, void 0 === e) return f += h(), 0;
            var i = function(t, e) {
                for (var i = 0; e.c.length > i; i++)
                    if (b(e.c[i].bR, t)) return e.c[i]
            }(e, l);
            if (i) return f += h(), p(i, e), i.rB ? 0 : e.length;
            var o, n, r = function t(e, i) {
                return b(e.eR, i) ? e : e.eW ? t(e.parent, i) : void 0
            }(l, e);
            if (r) {
                var s = l;
                for (s.rE || s.eE || (d += e), f += h(); l.cN && (f += "</span>"), m += l.r, (l = l.parent) != r.parent;);
                return s.eE && (f += v(e)), d = "", r.starts && p(r.starts, ""), s.rE ? 0 : e.length
            }
            if (o = e, n = l, !a && b(n.iR, o)) throw Error('Illegal lexeme "' + e + '" for mode "' + (l.cN || "<unnamed>") + '"');
            return d += e, e.length || 1
        }
        var c = _(t);
        if (!c) throw Error('Unknown language: "' + t + '"');
        x(c);
        for (var l = i || c, f = "", r = l; r != c; r = r.parent) r.cN && (f = u(r.cN, f, !0));
        var d = "",
            m = 0;
        try {
            for (var s, y, g = 0; l.t.lastIndex = g, s = l.t.exec(e);) y = n(e.substr(g, s.index - g), s[0]), g = s.index + y;
            n(e.substr(g));
            for (r = l; r.parent; r = r.parent) r.cN && (f += "</span>");
            return {
                r: m,
                value: f,
                language: t,
                top: l
            }
        } catch (t) {
            if (-1 != t.message.indexOf("Illegal")) return {
                r: 0,
                value: v(e)
            };
            throw t
        }
    }

    function I(i, t) {
        t = t || z.languages || Object.keys(L);
        var o = {
                r: 0,
                value: v(i)
            },
            n = o;
        return t.forEach(function(t) {
            var e;
            _(t) && ((e = w(t, i, !1)).language = t, e.r > n.r && (n = e), e.r > o.r && (n = o, o = e))
        }), n.language && (o.second_best = n), o
    }

    function h(t) {
        return z.tabReplace && (t = t.replace(/^((<[^>]+>|\t)+)/gm, function(t, e) {
            return e.replace(/\t/g, z.tabReplace)
        })), z.useBR && (t = t.replace(/\n/g, "<br>")), t
    }

    function e(t) {
        var e, i, o, n, r = function e(t) {
                return Array.prototype.map.call(t.childNodes, function(t) {
                    return 3 == t.nodeType ? z.useBR ? t.nodeValue.replace(/\n/g, "") : t.nodeValue : "br" == c(t) ? "\n" : e(t)
                }).join("")
            }(t),
            s = ((e = t).className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/).map(function(t) {
                return t.replace(/^language-/, "")
            }).filter(function(t) {
                return _(t) || "no-highlight" == t
            })[0];
        "no-highlight" != s && (i = s ? w(s, r, !0) : I(r), (o = a(t)).length && ((n = document.createElementNS("http://www.w3.org/1999/xhtml", "pre")).innerHTML = i.value, i.value = u(o, a(n), r)), i.value = h(i.value), t.innerHTML = i.value, t.className += " hljs " + (!s && i.language || ""), t.result = {
            language: i.language,
            re: i.r
        }, i.second_best && (t.second_best = {
            language: i.second_best.language,
            re: i.second_best.r
        }))
    }

    function i() {
        var t;
        i.called || (i.called = !0, t = document.querySelectorAll("pre code"), Array.prototype.forEach.call(t, e))
    }

    function _(t) {
        return L[t] || L[o[t]]
    }
    var z = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        L = {},
        o = {};
    this.highlight = w, this.highlightAuto = I, this.fixMarkup = h, this.highlightBlock = e, this.configure = function(t) {
        z = p(z, t)
    }, this.initHighlighting = i, this.initHighlightingOnLoad = function() {
        addEventListener("DOMContentLoaded", i, !1), addEventListener("load", i, !1)
    }, this.registerLanguage = function(e, t) {
        var i = L[e] = t(this);
        i.aliases && i.aliases.forEach(function(t) {
            o[t] = e
        })
    }, this.getLanguage = _, this.inherit = p, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [this.BE]
    }, this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [this.BE]
    }, this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$"
    }, this.CBLCLM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/"
    }, this.HCM = {
        cN: "comment",
        b: "#",
        e: "$"
    }, this.NM = {
        cN: "number",
        b: this.NR,
        r: 0
    }, this.CNM = {
        cN: "number",
        b: this.CNR,
        r: 0
    }, this.BNM = {
        cN: "number",
        b: this.BNR,
        r: 0
    }, this.REGEXP_MODE = {
        cN: "regexp",
        b: /\//,
        e: /\/[gim]*/,
        i: /\n/,
        c: [this.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [this.BE]
        }]
    }, this.TM = {
        cN: "title",
        b: this.IR,
        r: 0
    }, this.UTM = {
        cN: "title",
        b: this.UIR,
        r: 0
    }
};
hljs.registerLanguage("javascript", function(t) {
        return {
            aliases: ["js"],
            k: {
                keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
            },
            c: [{
                cN: "pi",
                b: /^\s*('|")use strict('|")/,
                r: 10
            }, t.ASM, t.QSM, t.CLCM, t.CBLCLM, t.CNM, {
                b: "(" + t.RSR + "|\\b(case|return|throw)\\b)\\s*",
                k: "return throw case",
                c: [t.CLCM, t.CBLCLM, t.REGEXP_MODE, {
                    b: /</,
                    e: />;/,
                    r: 0,
                    sL: "xml"
                }],
                r: 0
            }, {
                cN: "function",
                bK: "function",
                e: /\{/,
                c: [t.inherit(t.TM, {
                    b: /[A-Za-z$_][0-9A-Za-z$_]*/
                }), {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    c: [t.CLCM, t.CBLCLM],
                    i: /["'\(]/
                }],
                i: /\[|%/
            }, {
                b: /\$[(.]/
            }, {
                b: "\\." + t.IR,
                r: 0
            }]
        }
    }),
    function(n, r) {
        "use strict";

        function s(t) {
            this.element = t, this.originalY = this.element.getBoundingClientRect().top + n.pageYOffset, eventie.bind(n, "scroll", this), this.isFixed = !1, this.onscroll()
        }
        var a = n.ID = {};
        a.pages = {};
        var u, h = n.getSize,
            t = n.Isotope;
        r.bridget("isotope", t);
        var e = n.getComputedStyle,
            p = e ? function(t) {
                return e(t, null)
            } : function(t) {
                return t.currentStyle
            };
        docReady(function() {
            u = document.querySelector("#notification"), r(".js-radio-button-group").radioButtonGroup();
            var t = document.body.getAttribute("data-page");
            t && "function" == typeof a[t] && a[t]();
            var e, i = document.querySelector("head"),
                o = p(i).fontFamily.replace(/['"]/g, "");
            "desktop-ish" !== o && "tablet-ish" !== o || (e = document.querySelector("#page-nav")) && (h(e).outerHeight >= n.innerHeight || new s(e))
        }), a.getSomeItemElements = function() {
            for (var t = document.createDocumentFragment(), e = [], i = 0; i < 3; i++) {
                var o = document.createElement("div"),
                    n = Math.random(),
                    r = .85 < n ? "w4" : .7 < n ? "w2" : "",
                    s = Math.random(),
                    a = .85 < s ? "h4" : .7 < s ? "h2" : "";
                o.className = "item " + r + " " + a, t.appendChild(o), e.push(o)
            }
        };
        var o, i, c, l, f, d, m = void 0 !== document.documentElement.textContent ? "textContent" : "innerText",
            y = getStyleProperty("transition"),
            g = y ? 1e3 : 1500;
        a.notify = function(t, e) {
            var i;
            i = t, u[m] = i, y && (u.style[y] = "none"), u.style.display = "block", u.style.opacity = "1", e && (o && clearTimeout(o), o = setTimeout(a.hideNotify, g))
        }, a.hideNotify = function() {
            y ? (u.style[y] = "opacity 1.0s", u.style.opacity = "0") : u.style.display = "none"
        }, r.fn.radioButtonGroup = function() {
            return this.each(function(t, e) {
                var i = r(e);
                i.find(":checked").parent().addClass("is-checked"), i.on("click", "input, button", function() {
                    i.find(".is-checked").removeClass("is-checked");
                    var t = r(this);
                    (t.hasClass("button") ? t : t.parents(".button")).addClass("is-checked")
                })
            }), this
        }, hljs.configure({
            classPrefix: ""
        }), r.fn.displayIsotopeCode = function(t, e) {
            var i = "$container.isotope({ " + t + ": " + (e = "string" == typeof e && -1 === e.indexOf("function") ? "'" + e + "'" : e) + " })",
                i = hljs.highlight("js", i).value;
            this.html(i)
        }, s.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, s.prototype.onscroll = function() {
            var t = n.pageYOffset >= this.originalY;
            t !== this.isFixed && (classie.toggle(this.element, "is-fixed"), this.isFixed = t)
        }, l = 50, f = (i = s).prototype[c = "onscroll"], d = c + "Timeout", i.prototype[c] = function() {
            var t;
            this[d] || (f.apply(this, arguments), (t = this)[d] = setTimeout(function() {
                f.apply(t, arguments), delete t[d]
            }, l || 100))
        }
    }(window, jQuery),
    function() {
        "use strict";
        var t = window.ID,
            s = getStyleProperty("transition"),
            a = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[s];
        t.appendix = function() {
            var r, t;
            (t = $("#animate-item-size .isotope").isotope({
                masonry: {
                    columnWidth: 60
                }
            })).on("click", ".item", function() {
                $(this).toggleClass("is-expanded"), t.isotope("layout")
            }), (r = $("#animate-item-size-responsive .isotope").isotope({
                itemSelector: ".item",
                masonry: {
                    columnWidth: ".grid-sizer"
                }
            })).on("click", ".item-content", function() {
                var t = this,
                    e = getSize(t);
                t.style[s] = "none", t.style.width = e.width + "px", t.style.height = e.height + "px";
                var i = t.parentNode;
                classie.toggleClass(i, "is-expanded");
                var o;
                t.offsetWidth;
                t.style[s] = "", s && (o = function() {
                    t.style.width = "", t.style.height = "", t.removeEventListener(a, o, !1)
                }, t.addEventListener(a, o, !1));
                var n = getSize(i);
                t.style.width = n.width + "px", t.style.height = n.height + "px", r.isotope("layout")
            })
        }
    }(),
    function(t, i) {
        "use strict";

        function o(t) {
            var e, i, o;
            n.notify(t + " at " + (e = new Date, i = (i = e.getMinutes()) < 10 ? "0" + i : i, o = (o = e.getSeconds()) < 10 ? "0" + o : o, [e.getHours(), i, o].join(":")), !0)
        }
        var n = t.ID;
        n.events = function() {
            var t, e;
            (e = i("#layout-complete-demo .isotope").isotope({
                masonry: {
                    columnWidth: 50
                }
            })).isotope("on", "layoutComplete", function(t, e) {
                o("Isotope layout completed on " + e.length + " items")
            }), e.on("click", ".mini-item", function() {
                i(this).toggleClass("gigante"), e.isotope("layout")
            }), (t = i("#remove-complete-demo .isotope").isotope({
                masonry: {
                    columnWidth: 50
                }
            })).isotope("on", "removeComplete", function(t, e) {
                o("Removed " + e.length + " items")
            }), t.on("click", ".mini-item", function() {
                t.isotope("remove", this).isotope("layout")
            })
        }
    }(window, jQuery),
    function(t, p) {
        "use strict";
        t.ID.filtering = function() {
            var t, n, r, s, o, a, u, h;
            o = p("#filtering-demo .isotope").isotope({
                itemSelector: ".element-item",
                layoutMode: "fitRows",
                transitionDuration: "0.6s"
            }), a = {
                numberGreaterThan50: function() {
                    var t = p(this).find(".number").text();
                    return 50 < parseInt(t, 10)
                },
                ium: function() {
                    return p(this).find(".name").text().match(/ium$/)
                }
            }, u = {
                numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}",
                ium: "function() {\n  var name = $(this).find('.name').text();\n  return name.match( /ium$/ );\n}"
            }, h = p("#filtering-demo .code-display code"), p("#filtering-demo .button-group").on("click", "button", function() {
                var t = p(this).attr("data-filter"),
                    e = a[t] || t,
                    i = u[t] || t;
                o.isotope({
                    filter: e
                }), h.displayIsotopeCode("filter", i)
            }), t = p("#combination-filters-demo"), n = t.find(".isotope").isotope({
                itemSelector: ".color-shape",
                columnWidth: 80,
                transitionDuration: "0.6s"
            }), r = t.find("pre code"), s = {}, t.on("click", ".button", function() {
                var t = p(this),
                    e = t.parents(".button-group").attr("data-filter-group");
                s[e] = t.attr("data-filter");
                var i = "";
                for (var o in s) i += s[o];
                n.isotope({
                    filter: i
                }), r.displayIsotopeCode("filter", i)
            })
        }
    }(window, jQuery),
    function(t, u) {
        "use strict";
        t.ID.index = function() {
            var o, n, r, s, a;
            n = u("#hero .isotope").isotope({
                itemSelector: ".element-item",
                layoutMode: "fitRows",
                transitionDuration: "0.6s",
                getSortData: {
                    name: ".name",
                    symbol: ".symbol",
                    number: ".number parseInt",
                    category: "[data-category]",
                    weight: function(t) {
                        var e = u(t).find(".weight").text();
                        return parseFloat(e.replace(/[\(\)]/g, ""))
                    }
                }
            }), r = {
                numberGreaterThan50: function() {
                    var t = u(this).find(".number").text();
                    return 50 < parseInt(t, 10)
                },
                ium: function() {
                    return u(this).find(".name").text().match(/ium$/)
                }
            }, s = {
                numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}",
                ium: "function() {\n  var name = $(this).find('.name').text();\n  return name.match( /ium$/ );\n}"
            }, a = u("#hero .code-display code"), u("#hero .sort-by").on("click", "button", function() {
                var t = u(this).attr("data-sort-by");
                n.isotope({
                    sortBy: t
                }), a.displayIsotopeCode("sortBy", t)
            }), u("#hero .filters").on("click", "button", function() {
                var t = u(this).attr("data-filter"),
                    e = r[t] || t,
                    i = s[t] || t;
                n.isotope({
                    filter: e
                }), a.displayIsotopeCode("filter", i)
            }), (o = u("#in-use-container")).find(".in-use-item").hide(), o.isotope({
                itemSelector: "none",
                masonry: {
                    columnWidth: ".grid-sizer",
                    gutter: ".gutter-sizer"
                }
            }), o.isotope("option", {
                itemSelector: ".in-use-item"
            }), o.imagesLoaded().progress(function(t, e) {
                var i = u(e.img).parents(".in-use-item");
                i.show(), o.isotope("appended", i)
            })
        }
    }(window, jQuery),
    function(t, a) {
        "use strict";
        var e = t.ID,
            u = a(t);
        e["layout-modes"] = function() {
            var n, r, s;
            n = a("#layout-modes-demo .isotope").isotope({
                itemSelector: ".element-item",
                layoutMode: "masonry",
                transitionDuration: "0.6s",
                masonry: {
                    columnWidth: 110
                },
                cellsByRow: {
                    columnWidth: 220,
                    rowHeight: 220
                },
                masonryHorizontal: {
                    rowHeight: 110
                },
                cellsByColumn: {
                    columnWidth: 220,
                    rowHeight: 220
                }
            }), r = !1, s = a("#layout-modes-demo .code-display code"), a("#layout-modes-demo .button-group").on("click", "button", function() {
                var t, e = a(this),
                    i = !!e.attr("data-is-horizontal");
                r !== i && (t = i ? {
                    height: .7 * u.height()
                } : {
                    width: "auto"
                }, n.css(t), r = i);
                var o = e.attr("data-layout-mode-value");
                n.isotope({
                    layoutMode: o
                }), s.displayIsotopeCode("layoutMode", o)
            })
        }
    }(window, jQuery),
    function(t, v) {
        "use strict";

        function b() {
            var t = document.createElement("div"),
                e = Math.random(),
                i = Math.random(),
                o = .8 < e ? "w3" : .6 < e ? "w2" : "",
                n = .8 < i ? "h3" : .5 < i ? "h2" : "";
            return t.className = "mini-item " + o + " " + n, t
        }
        t.ID.methods = function() {
            var t, e, i, o, n, r, s, a, u, h, p, c, l, f, d, m, y, g;
            y = v("#appended-demo"), g = y.find(".isotope").isotope({
                masonry: {
                    columnWidth: 50
                }
            }), y.find("button").on("click", function() {
                for (var t = [], e = 0; e < 3; e++) {
                    var i = b();
                    t.push(i)
                }
                g.append(t).isotope("appended", t)
            }), l = v("#destroy-demo"), f = {
                masonry: {
                    columnWidth: 50
                }
            }, d = l.find(".isotope").isotope(f), m = !0, l.find("button").on("click", function() {
                m ? d.isotope("destroy") : d.isotope(f), m = !m
            }), p = v("#insert-demo"), c = p.find(".isotope").isotope({
                masonry: {
                    columnWidth: 50
                },
                filter: function() {
                    var t = v(this).find(".number").text();
                    return parseInt(t, 10) % 2
                },
                sortBy: "number",
                getSortData: {
                    number: ".number parseInt"
                }
            }), p.find("button").on("click", function() {
                for (var t = [], e = 0; e < 3; e++) {
                    var i = b(),
                        o = Math.floor(100 * Math.random());
                    v(i).append('<p class="number">' + o + "</p>"), t.push(i)
                }
                c.isotope("insert", t)
            }), (h = v("#layout-demo .isotope").isotope({
                masonry: {
                    columnWidth: 50
                }
            })).on("click", ".mini-item", function() {
                v(this).toggleClass("gigante"), h.isotope("layout")
            }), a = v("#prepended-demo"), u = a.find(".isotope").isotope({
                masonry: {
                    columnWidth: 50
                }
            }), a.find("button").on("click", function() {
                for (var t = [], e = 0; e < 3; e++) {
                    var i = b();
                    t.push(i)
                }
                u.prepend(t).isotope("prepended", t)
            }), r = v("#shuffle-demo"), s = r.find(".isotope").isotope({
                masonry: {
                    columnWidth: 50
                }
            }), r.find(".button").on("click", function() {
                s.isotope("shuffle")
            }), e = v("#stamp-demo"), i = e.find(".isotope").isotope({
                itemSelector: ".mini-item",
                masonry: {
                    columnWidth: 50
                }
            }), o = e.find(".stamp"), n = !1, e.find("button").on("click", function() {
                n ? i.isotope("unstamp", o) : i.isotope("stamp", o), i.isotope("layout"), n = !n
            }), (t = v("#remove-demo .isotope").isotope({
                masonry: {
                    columnWidth: 50
                }
            })).on("click", ".mini-item", function() {
                t.isotope("remove", this).isotope("layout")
            })
        }
    }(window, jQuery),
    function(t, r) {
        "use strict";
        t.ID.sorting = function() {
            var t, e, i, o, n;
            i = r("#sorting-demo .button-group"), o = r("#sorting-demo .isotope").isotope({
                itemSelector: ".element-item",
                layoutMode: "fitRows",
                transitionDuration: "0.6s",
                getSortData: {
                    name: ".name",
                    symbol: ".symbol",
                    number: ".number parseInt",
                    category: "[data-category]",
                    weight: function(t) {
                        var e = r(t).find(".weight").text();
                        return parseFloat(e.replace(/[\(\)]/g, ""))
                    }
                }
            }), n = r("#sorting-demo .code-display code"), i.on("click", "button", function() {
                var t = r(this).attr("data-sort-by");
                o.isotope({
                    sortBy: t
                }), n.displayIsotopeCode("sortBy", t)
            }), t = r("#multiple-sort-by-demo .button-group"), e = r("#multiple-sort-by-demo .isotope").isotope({
                layoutMode: "fitRows",
                itemSelector: ".mini-item",
                getSortData: {
                    color: "[data-color]",
                    number: ".number parseInt"
                },
                sortBy: ["color", "number"]
            }), t.on("click", "button", function() {
                e.isotope({
                    sortBy: this.getAttribute("data-sort-by").split(",")
                })
            })
        }
    }(window, jQuery),
    function(t, i) {
        "use strict";
        t.ID.vertical = function() {
            var e;
            e = i("#vertical-feature-demo .isotope").isotope({
                itemSelector: "li",
                layoutMode: "vertical",
                transitionDuration: "0.6s",
                getSortData: {
                    name: ".name",
                    symbol: ".symbol",
                    number: ".number parseInt",
                    category: ".category",
                    weight: function(t) {
                        var e = i(t).find(".weight").text();
                        return parseFloat(e.replace(/[\(\)]/g, ""))
                    }
                }
            }), i("#vertical-feature-demo .button-group").on("click", "button", function() {
                var t = i(this).attr("data-sort-by");
                e.isotope({
                    sortBy: t
                })
            })
        }
    }(window, jQuery);