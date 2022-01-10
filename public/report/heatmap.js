/*
 * heatmap.js v2.0.2 | JavaScript Heatmap Library
 *
 * Copyright 2008-2016 Patrick Wied <heatmapjs@patrick-wied.at> - All rights reserved.
 * Dual licensed under MIT and Beerware license
 *
 * :: 2016-02-04 21:25
 */
(function (a, b, c) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = c();
  } else if (typeof define === "function" && define.amd) {
    define(c);
  } else {
    b[a] = c();
  }
})("h337", this, function () {
  var a = {
    defaultRadius: 40,
    defaultRenderer: "canvas2d",
    defaultGradient: {
      0.25: "rgb(0,0,255)",
      0.55: "rgb(0,255,0)",
      0.85: "yellow",
      1: "rgb(255,0,0)",
    },
    defaultMaxOpacity: 1,
    defaultMinOpacity: 0,
    defaultBlur: 0.85,
    defaultXField: "x",
    defaultYField: "y",
    defaultValueField: "value",
    plugins: {},
  };
  var b = (function h() {
    var b = function d(a) {
      this._coordinator = {};
      this._data = [];
      this._radi = [];
      this._min = 0;
      this._max = 1;
      this._xField = a["xField"] || a.defaultXField;
      this._yField = a["yField"] || a.defaultYField;
      this._valueField = a["valueField"] || a.defaultValueField;
      if (a["radius"]) {
        this._cfgRadius = a["radius"];
      }
    };
    var c = a.defaultRadius;
    b.prototype = {
      _organiseData: function (a, b) {
        var d = a[this._xField];
        var e = a[this._yField];
        var f = this._radi;
        var g = this._data;
        var h = this._max;
        var i = this._min;
        var j = a[this._valueField] || 1;
        var k = a.radius || this._cfgRadius || c;
        if (!g[d]) {
          g[d] = [];
          f[d] = [];
        }
        if (!g[d][e]) {
          g[d][e] = j;
          f[d][e] = k;
        } else {
          g[d][e] += j;
        }
        if (g[d][e] > h) {
          if (!b) {
            this._max = g[d][e];
          } else {
            this.setDataMax(g[d][e]);
          }
          return false;
        } else {
          return { x: d, y: e, value: j, radius: k, min: i, max: h };
        }
      },
      _unOrganizeData: function () {
        var a = [];
        var b = this._data;
        var c = this._radi;
        for (var d in b) {
          for (var e in b[d]) {
            a.push({ x: d, y: e, radius: c[d][e], value: b[d][e] });
          }
        }
        return { min: this._min, max: this._max, data: a };
      },
      _onExtremaChange: function () {
        this._coordinator.emit("extremachange", {
          min: this._min,
          max: this._max,
        });
      },
      addData: function () {
        if (arguments[0].length > 0) {
          var a = arguments[0];
          var b = a.length;
          while (b--) {
            this.addData.call(this, a[b]);
          }
        } else {
          var c = this._organiseData(arguments[0], true);
          if (c) {
            this._coordinator.emit("renderpartial", {
              min: this._min,
              max: this._max,
              data: [c],
            });
          }
        }
        return this;
      },
      setData: function (a) {
        var b = a.data;
        var c = b.length;
        this._data = [];
        this._radi = [];
        for (var d = 0; d < c; d++) {
          this._organiseData(b[d], false);
        }
        this._max = a.max;
        this._min = a.min || 0;
        this._onExtremaChange();
        this._coordinator.emit("renderall", this._getInternalData());
        return this;
      },
      removeData: function () {},
      setDataMax: function (a) {
        this._max = a;
        this._onExtremaChange();
        this._coordinator.emit("renderall", this._getInternalData());
        return this;
      },
      setDataMin: function (a) {
        this._min = a;
        this._onExtremaChange();
        this._coordinator.emit("renderall", this._getInternalData());
        return this;
      },
      setCoordinator: function (a) {
        this._coordinator = a;
      },
      _getInternalData: function () {
        return {
          max: this._max,
          min: this._min,
          data: this._data,
          radi: this._radi,
        };
      },
      getData: function () {
        return this._unOrganizeData();
      },
    };
    return b;
  })();
  var c = (function i() {
    var a = function (a) {
      var b = a.gradient || a.defaultGradient;
      var c = document.createElement("canvas");
      var d = c.getContext("2d");
      c.width = 256;
      c.height = 1;
      var e = d.createLinearGradient(0, 0, 256, 1);
      for (var f in b) {
        e.addColorStop(f, b[f]);
      }
      d.fillStyle = e;
      d.fillRect(0, 0, 256, 1);
      return d.getImageData(0, 0, 256, 1).data;
    };
    var b = function (a, b) {
      var c = document.createElement("canvas");
      var d = c.getContext("2d");
      var e = a;
      var f = a;
      c.width = c.height = a * 2;
      if (b == 1) {
        d.beginPath();
        d.arc(e, f, a, 0, 2 * Math.PI, false);
        d.fillStyle = "rgba(0,0,0,1)";
        d.fill();
      } else {
        var g = d.createRadialGradient(e, f, a * b, e, f, a);
        g.addColorStop(0, "rgba(0,0,0,1)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        d.fillStyle = g;
        d.fillRect(0, 0, 2 * a, 2 * a);
      }
      return c;
    };
    var c = function (a) {
      var b = [];
      var c = a.min;
      var d = a.max;
      var e = a.radi;
      var a = a.data;
      var f = Object.keys(a);
      var g = f.length;
      while (g--) {
        var h = f[g];
        var i = Object.keys(a[h]);
        var j = i.length;
        while (j--) {
          var k = i[j];
          var l = a[h][k];
          var m = e[h][k];
          b.push({ x: h, y: k, value: l, radius: m });
        }
      }
      return { min: c, max: d, data: b };
    };
    function d(b) {
      var c = b.container;
      var d = (this.shadowCanvas = document.createElement("canvas"));
      var e = (this.canvas = b.canvas || document.createElement("canvas"));
      var f = (this._renderBoundaries = [1e4, 1e4, 0, 0]);
      var g = getComputedStyle(b.container) || {};
      e.className = "heatmap-canvas";
      this._width = e.width = d.width = b.width || +g.width.replace(/px/, "");
      this._height =
        e.height =
        d.height =
          b.height || +g.height.replace(/px/, "");
      this.shadowCtx = d.getContext("2d");
      this.ctx = e.getContext("2d");
      e.style.cssText = d.style.cssText = "position:absolute;left:0;top:0;";
      c.style.position = "relative";
      c.appendChild(e);
      this._palette = a(b);
      this._templates = {};
      this._setStyles(b);
    }
    d.prototype = {
      renderPartial: function (a) {
        if (a.data.length > 0) {
          this._drawAlpha(a);
          this._colorize();
        }
      },
      renderAll: function (a) {
        this._clear();
        if (a.data.length > 0) {
          this._drawAlpha(c(a));
          this._colorize();
        }
      },
      _updateGradient: function (b) {
        this._palette = a(b);
      },
      updateConfig: function (a) {
        if (a["gradient"]) {
          this._updateGradient(a);
        }
        this._setStyles(a);
      },
      setDimensions: function (a, b) {
        this._width = a;
        this._height = b;
        this.canvas.width = this.shadowCanvas.width = a;
        this.canvas.height = this.shadowCanvas.height = b;
      },
      _clear: function () {
        this.shadowCtx.clearRect(0, 0, this._width, this._height);
        this.ctx.clearRect(0, 0, this._width, this._height);
      },
      _setStyles: function (a) {
        this._blur = a.blur == 0 ? 0 : a.blur || a.defaultBlur;
        if (a.backgroundColor) {
          this.canvas.style.backgroundColor = a.backgroundColor;
        }
        this._width =
          this.canvas.width =
          this.shadowCanvas.width =
            a.width || this._width;
        this._height =
          this.canvas.height =
          this.shadowCanvas.height =
            a.height || this._height;
        this._opacity = (a.opacity || 0) * 255;
        this._maxOpacity = (a.maxOpacity || a.defaultMaxOpacity) * 255;
        this._minOpacity = (a.minOpacity || a.defaultMinOpacity) * 255;
        this._useGradientOpacity = !!a.useGradientOpacity;
      },
      _drawAlpha: function (a) {
        var c = (this._min = a.min);
        var d = (this._max = a.max);
        var a = a.data || [];
        var e = a.length;
        var f = 1 - this._blur;
        while (e--) {
          var g = a[e];
          var h = g.x;
          var i = g.y;
          var j = g.radius;
          var k = Math.min(g.value, d);
          var l = h - j;
          var m = i - j;
          var n = this.shadowCtx;
          var o;
          if (!this._templates[j]) {
            this._templates[j] = o = b(j, f);
          } else {
            o = this._templates[j];
          }
          var p = (k - c) / (d - c);
          n.globalAlpha = p < 0.01 ? 0.01 : p;
          n.drawImage(o, l, m);
          if (l < this._renderBoundaries[0]) {
            this._renderBoundaries[0] = l;
          }
          if (m < this._renderBoundaries[1]) {
            this._renderBoundaries[1] = m;
          }
          if (l + 2 * j > this._renderBoundaries[2]) {
            this._renderBoundaries[2] = l + 2 * j;
          }
          if (m + 2 * j > this._renderBoundaries[3]) {
            this._renderBoundaries[3] = m + 2 * j;
          }
        }
      },
      _colorize: function () {
        var a = this._renderBoundaries[0];
        var b = this._renderBoundaries[1];
        var c = this._renderBoundaries[2] - a;
        var d = this._renderBoundaries[3] - b;
        var e = this._width;
        var f = this._height;
        var g = this._opacity;
        var h = this._maxOpacity;
        var i = this._minOpacity;
        var j = this._useGradientOpacity;
        if (a < 0) {
          a = 0;
        }
        if (b < 0) {
          b = 0;
        }
        if (a + c > e) {
          c = e - a;
        }
        if (b + d > f) {
          d = f - b;
        }
        var k = this.shadowCtx.getImageData(a, b, c, d);
        var l = k.data;
        var m = l.length;
        var n = this._palette;
        for (var o = 3; o < m; o += 4) {
          var p = l[o];
          var q = p * 4;
          if (!q) {
            continue;
          }
          var r;
          if (g > 0) {
            r = g;
          } else {
            if (p < h) {
              if (p < i) {
                r = i;
              } else {
                r = p;
              }
            } else {
              r = h;
            }
          }
          l[o - 3] = n[q];
          l[o - 2] = n[q + 1];
          l[o - 1] = n[q + 2];
          l[o] = j ? n[q + 3] : r;
        }
        k.data = l;
        this.ctx.putImageData(k, a, b);
        this._renderBoundaries = [1e3, 1e3, 0, 0];
      },
      getValueAt: function (a) {
        var b;
        var c = this.shadowCtx;
        var d = c.getImageData(a.x, a.y, 1, 1);
        var e = d.data[3];
        var f = this._max;
        var g = this._min;
        b = (Math.abs(f - g) * (e / 255)) >> 0;
        return b;
      },
      getDataURL: function () {
        return this.canvas.toDataURL();
      },
    };
    return d;
  })();
  var d = (function j() {
    var b = false;
    if (a["defaultRenderer"] === "canvas2d") {
      b = c;
    }
    return b;
  })();
  var e = {
    merge: function () {
      var a = {};
      var b = arguments.length;
      for (var c = 0; c < b; c++) {
        var d = arguments[c];
        for (var e in d) {
          a[e] = d[e];
        }
      }
      return a;
    },
  };
  var f = (function k() {
    var c = (function h() {
      function a() {
        this.cStore = {};
      }
      a.prototype = {
        on: function (a, b, c) {
          var d = this.cStore;
          if (!d[a]) {
            d[a] = [];
          }
          d[a].push(function (a) {
            return b.call(c, a);
          });
        },
        emit: function (a, b) {
          var c = this.cStore;
          if (c[a]) {
            var d = c[a].length;
            for (var e = 0; e < d; e++) {
              var f = c[a][e];
              f(b);
            }
          }
        },
      };
      return a;
    })();
    var f = function (a) {
      var b = a._renderer;
      var c = a._coordinator;
      var d = a._store;
      c.on("renderpartial", b.renderPartial, b);
      c.on("renderall", b.renderAll, b);
      c.on("extremachange", function (b) {
        a._config.onExtremaChange &&
          a._config.onExtremaChange({
            min: b.min,
            max: b.max,
            gradient: a._config["gradient"] || a._config["defaultGradient"],
          });
      });
      d.setCoordinator(c);
    };
    function g() {
      var g = (this._config = e.merge(a, arguments[0] || {}));
      this._coordinator = new c();
      if (g["plugin"]) {
        var h = g["plugin"];
        if (!a.plugins[h]) {
          throw new Error(
            "Plugin '" + h + "' not found. Maybe it was not registered."
          );
        } else {
          var i = a.plugins[h];
          this._renderer = new i.renderer(g);
          this._store = new i.store(g);
        }
      } else {
        this._renderer = new d(g);
        this._store = new b(g);
      }
      f(this);
    }
    g.prototype = {
      addData: function () {
        this._store.addData.apply(this._store, arguments);
        return this;
      },
      removeData: function () {
        this._store.removeData &&
          this._store.removeData.apply(this._store, arguments);
        return this;
      },
      setData: function () {
        this._store.setData.apply(this._store, arguments);
        return this;
      },
      setDataMax: function () {
        this._store.setDataMax.apply(this._store, arguments);
        return this;
      },
      setDataMin: function () {
        this._store.setDataMin.apply(this._store, arguments);
        return this;
      },
      configure: function (a) {
        this._config = e.merge(this._config, a);
        this._renderer.updateConfig(this._config);
        this._coordinator.emit("renderall", this._store._getInternalData());
        return this;
      },
      repaint: function () {
        this._coordinator.emit("renderall", this._store._getInternalData());
        return this;
      },
      getData: function () {
        return this._store.getData();
      },
      getDataURL: function () {
        return this._renderer.getDataURL();
      },
      getValueAt: function (a) {
        if (this._store.getValueAt) {
          return this._store.getValueAt(a);
        } else if (this._renderer.getValueAt) {
          return this._renderer.getValueAt(a);
        } else {
          return null;
        }
      },
    };
    return g;
  })();
  var g = {
    create: function (a) {
      return new f(a);
    },
    register: function (b, c) {
      a.plugins[b] = c;
    },
  };
  return g;
});
