!function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Grid = e() : t.Grid = e()
}(window, function () {
  return function (t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var o = e[r] = {i: r, l: !1, exports: {}};
      return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    return n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: r})
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o, function (e) {
        return t[e]
      }.bind(null, o));
      return r
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default
      } : function () {
        return t
      };
      return n.d(e, "a", e), e
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 17)
  }([, , function (t, e) {
    var n = {}.toString;
    t.exports = function (t, e) {
      return n.call(t) === "[object " + e + "]"
    }
  }, function (t, e, n) {
    var r = n(2), o = Array.isArray ? Array.isArray : function (t) {
      return r(t, "Array")
    };
    t.exports = o
  }, , function (t, e, n) {
    var r = n(9), o = n(3);
    t.exports = function (t, e) {
      if (t) if (o(t)) for (var n = 0, i = t.length; n < i && !1 !== e(t[n], n); n++) ; else if (r(t)) for (var u in t) if (t.hasOwnProperty(u) && !1 === e(t[u], u)) break
    }
  }, function (t, e) {
    t.exports = function (t, e) {
      if (t) for (var n in e) e.hasOwnProperty(n) && (t.style[n] = e[n]);
      return t
    }
  }, function (t, e) {
    var n = document.createElement("table"), r = document.createElement("tr"), o = /^\s*<(\w+|!)[^>]*>/, i = {
      tr: document.createElement("tbody"),
      tbody: n,
      thead: n,
      tfoot: n,
      td: r,
      th: r,
      "*": document.createElement("div")
    };
    t.exports = function (t) {
      var e = o.test(t) && RegExp.$1;
      e in i || (e = "*");
      var n = i[e];
      t = t.replace(/(^\s*)|(\s*$)/g, ""), n.innerHTML = "" + t;
      var r = n.childNodes[0];
      return n.removeChild(r), r
    }
  }, function (t, e, n) {
    var r = n(11), o = n(3), i = 5;

    function u(t, e, n, f) {
      for (var c in n = n || 0, f = f || i, e) if (e.hasOwnProperty(c)) {
        var a = e[c];
        null !== a && r(a) ? (r(t[c]) || (t[c] = {}), n < f ? u(t[c], a, n + 1, f) : t[c] = e[c]) : o(a) ? (t[c] = [], t[c] = t[c].concat(a)) : void 0 !== a && (t[c] = a)
      }
    }

    t.exports = function () {
      for (var t = new Array(arguments.length), e = t.length, n = 0; n < e; n++) t[n] = arguments[n];
      for (var r = t[0], o = 1; o < e; o++) u(r, t[o]);
      return r
    }
  }, function (t, e) {
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    t.exports = function (t) {
      var e = void 0 === t ? "undefined" : n(t);
      return null !== t && "object" === e || "function" === e
    }
  }, function (t, e) {
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    t.exports = function (t) {
      return "object" === (void 0 === t ? "undefined" : n(t)) && null !== t
    }
  }, function (t, e, n) {
    var r = n(10), o = n(2);
    t.exports = function (t) {
      if (!r(t) || !o(t, "Object")) return !1;
      if (null === Object.getPrototypeOf(t)) return !0;
      for (var e = t; null !== Object.getPrototypeOf(e);) e = Object.getPrototypeOf(e);
      return Object.getPrototypeOf(t) === e
    }
  }, , function (t, e, n) {
    var r = n(8), o = n(5), i = n(14), u = function () {
      function t(t) {
        this._cfgs = r(this.getDefaultCfg(), t)
      }

      var e = t.prototype;
      return e.getDefaultCfg = function () {
        return {}
      }, e.initPlugin = function (t) {
        var e = this;
        e.set("graph", t);
        var n = e.getEvents(), r = {};
        o(n, function (n, o) {
          var u = i(e, n);
          r[o] = u, t.on(o, u)
        }), this._events = r, this.init()
      }, e.init = function () {
      }, e.getEvents = function () {
        return {}
      }, e.get = function (t) {
        return this._cfgs[t]
      }, e.set = function (t, e) {
        this._cfgs[t] = e
      }, e.destroy = function () {
      }, e.destroyPlugin = function () {
        this.destroy();
        var t = this.get("graph"), e = this._events;
        o(e, function (e, n) {
          t.off(n, e)
        }), this._events = null, this._cfgs = null, this.destroyed = !0
      }, t
    }();
    t.exports = u
  }, function (t, e) {
    t.exports = function (t, e) {
      if (t["_wrap_" + e]) return t["_wrap_" + e];
      var n = function (n) {
        t[e](n)
      };
      return t["_wrap_" + e] = n, n
    }
  }, , , function (t, e, n) {
    var r = n(13), o = n(7), i = n(6), u = Math.max, f = Math.min, c = function (t) {
      function e() {
        return t.apply(this, arguments) || this
      }

      !function (t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
      }(e, t);
      var n = e.prototype;
      return n.init = function () {
        var t = this.get("graph"), e = t.get("minZoom"), n = t.get("container"), r = t.get("canvas").get("el"),
          u = t.get("width"), f = t.get("height"),
          c = o('<div style="position: absolute; left:0;top:0;right:0;bottom:0;overflow: hidden;z-index: -1;"></div>'),
          a = o('<div class="g6-grid" style="position:absolute;transform-origin: 0% 0% 0px; background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=)"></div>');
        c.appendChild(a), i(a, {
          width: u / e + "px",
          height: f / e + "px",
          left: -u / e / 2 + "px",
          top: -f / e / 2 + "px"
        }), n.insertBefore(c, r), this.set("container", c), this.set("gridContainer", a)
      }, n.getEvents = function () {
        return {viewportchange: "updateGrid"}
      }, n.updateGrid = function (t) {
        var e = this.get("graph"), n = this.get("gridContainer"), r = t.matrix,
          o = "matrix(" + r[0] + "," + r[1] + "," + r[3] + "," + r[4] + "," + r[6] + "," + r[7] + ")",
          c = e.get("group").getBBox();
        i(n, {
          transform: o,
          left: (f(c.minX, 0) - 20) * u(r[0], 1) + "px",
          top: (f(c.minY, 0) - 20) * u(r[4], 1) + "px"
        })
      }, n.getContainer = function () {
        return this.get("container")
      }, n.destroy = function () {
        this.get("graph").get("container").removeChild(this.get("container"))
      }, e
    }(r);
    t.exports = c
  }])
});
//# sourceMappingURL=grid.js.map
