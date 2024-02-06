(function() {
  var C = C || {};
  C.scope = {}, C.ASSUME_ES5 = !1, C.ASSUME_NO_NATIVE_MAP = !1, C.ASSUME_NO_NATIVE_SET = !1, C.SIMPLE_FROUND_POLYFILL = !1, C.ISOLATE_POLYFILLS = !1, C.FORCE_POLYFILL_PROMISE = !1, C.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1, C.defineProperty = C.ASSUME_ES5 || typeof Object.defineProperties == "function" ? Object.defineProperty : function(t, e, i) {
    return t == Array.prototype || t == Object.prototype || (t[e] = i.value), t;
  }, C.getGlobal = function(t) {
    t = [
      typeof globalThis == "object" && globalThis,
      t,
      typeof window == "object" && window,
      typeof self == "object" && self,
      typeof global == "object" && global
    ];
    for (var e = 0; e < t.length; ++e) {
      var i = t[e];
      if (i && i.Math == Math)
        return i;
    }
    throw Error("Cannot find global object");
  }, C.global = C.getGlobal(this), C.IS_SYMBOL_NATIVE = typeof Symbol == "function" && typeof Symbol("x") == "symbol", C.TRUST_ES6_POLYFILLS = !C.ISOLATE_POLYFILLS || C.IS_SYMBOL_NATIVE, C.polyfills = {}, C.propertyToPolyfillSymbol = {}, C.POLYFILL_PREFIX = "$jscp$", C.polyfill = function(t, e, i, s) {
    e && (C.ISOLATE_POLYFILLS ? C.polyfillIsolated(t, e, i, s) : C.polyfillUnisolated(t, e, i, s));
  }, C.polyfillUnisolated = function(t, e, i, s) {
    for (i = C.global, t = t.split("."), s = 0; s < t.length - 1; s++) {
      var r = t[s];
      if (!(r in i))
        return;
      i = i[r];
    }
    t = t[t.length - 1], s = i[t], e = e(s), e != s && e != null && C.defineProperty(i, t, {
      configurable: !0,
      writable: !0,
      value: e
    });
  }, C.polyfillIsolated = function(t, e, i, s) {
    var r = t.split(".");
    t = r.length === 1, s = r[0], s = !t && s in C.polyfills ? C.polyfills : C.global;
    for (var _ = 0; _ < r.length - 1; _++) {
      var o = r[_];
      if (!(o in s))
        return;
      s = s[o];
    }
    r = r[r.length - 1], i = C.IS_SYMBOL_NATIVE && i === "es6" ? s[r] : null, e = e(i), e != null && (t ? C.defineProperty(C.polyfills, r, {
      configurable: !0,
      writable: !0,
      value: e
    }) : e !== i && (C.propertyToPolyfillSymbol[r] === void 0 && (i = 1e9 * Math.random() >>> 0, C.propertyToPolyfillSymbol[r] = C.IS_SYMBOL_NATIVE ? C.global.Symbol(r) : C.POLYFILL_PREFIX + i + "$" + r), C.defineProperty(
      s,
      C.propertyToPolyfillSymbol[r],
      { configurable: !0, writable: !0, value: e }
    )));
  }, C.polyfill(
    "globalThis",
    function(t) {
      return t || C.global;
    },
    "es_2020",
    "es3"
  ), C.polyfill(
    "String.prototype.trimRight",
    function(t) {
      function e() {
        return this.replace(/[\s\xa0]+$/, "");
      }
      return t || e;
    },
    "es_2019",
    "es3"
  ), C.arrayIteratorImpl = function(t) {
    var e = 0;
    return function() {
      return e < t.length ? { done: !1, value: t[e++] } : { done: !0 };
    };
  }, C.arrayIterator = function(t) {
    return { next: C.arrayIteratorImpl(t) };
  }, C.initSymbol = function() {
  }, C.iteratorPrototype = function(t) {
    return t = { next: t }, t[Symbol.iterator] = function() {
      return this;
    }, t;
  }, C.polyfill(
    "Object.fromEntries",
    function(t) {
      return t || function(e) {
        var i = {};
        if (!(Symbol.iterator in e))
          throw new TypeError("" + e + " is not iterable");
        e = e[Symbol.iterator].call(e);
        for (var s = e.next(); !s.done; s = e.next()) {
          if (s = s.value, Object(s) !== s)
            throw new TypeError(
              "iterable for fromEntries should yield objects"
            );
          i[s[0]] = s[1];
        }
        return i;
      };
    },
    "es_2019",
    "es3"
  );
  var b = 2, I = 16, z = 32, L = 64, N = 128, y = 256, K = 512, tt = 2048, G = 8192, V = 16384, m = 32768, qt = 65536, rt = 262144, D = 524288, k = 1048576, j = 2097152, Gt = 4194304, q = 8388608, Ae = 512, ar = 2, dr = 0, cr = 3, ft = 17, Ee = 1 << ft, ur = 32, pr = 0, lr = 1, fr = 3, mr = 5, gr = 15, yr = 13, vr = 25, wr = 32768, _e = 49152, br = 1431127377, xi = 900, Ie = 1024, Yt = 0, Qt = 1, Wt = 2, Xe = 0, xe = 1, Re = 2;
  function kr(t, e) {
    function i(A) {
      return A = A.toString(16), "#" + "0".repeat(6 - A.length) + A;
    }
    function s(A, O, st, $) {
      A.style.width = "", A.style.height = "", $ && (A.style.transform = "");
      var lt = A.getBoundingClientRect();
      $ ? A.style.transform = (O === 1 ? "" : " scaleX(" + O + ")") + (st === 1 ? "" : " scaleY(" + st + ")") : (O % 1 === 0 && st % 1 === 0 ? (r.style.imageRendering = "crisp-edges", r.style.imageRendering = "pixelated", r.style["-ms-interpolation-mode"] = "nearest-neighbor") : (r.style.imageRendering = "", r.style["-ms-interpolation-mode"] = ""), $ = window.devicePixelRatio || 1, $ % 1 !== 0 && (O /= $, st /= $)), O !== 1 && (A.style.width = lt.width * O + "px"), st !== 1 && (A.style.height = lt.height * st + "px");
    }
    console.assert(t, "1st argument must be a DOM container");
    var r = t.getElementsByTagName("canvas")[0], _ = r.getContext("2d", { alpha: !1 }), o = t.getElementsByTagName("div")[0], a = document.createElement("div"), d, c, u = 1, p = 1, g = 1, f, w = !1, S, E, H, ot = !1, mt = this;
    t = new Uint16Array([
      8962,
      199,
      252,
      233,
      226,
      228,
      224,
      229,
      231,
      234,
      235,
      232,
      239,
      238,
      236,
      196,
      197,
      201,
      230,
      198,
      244,
      246,
      242,
      251,
      249,
      255,
      214,
      220,
      162,
      163,
      165,
      8359,
      402,
      225,
      237,
      243,
      250,
      241,
      209,
      170,
      186,
      191,
      8976,
      172,
      189,
      188,
      161,
      171,
      187,
      9617,
      9618,
      9619,
      9474,
      9508,
      9569,
      9570,
      9558,
      9557,
      9571,
      9553,
      9559,
      9565,
      9564,
      9563,
      9488,
      9492,
      9524,
      9516,
      9500,
      9472,
      9532,
      9566,
      9567,
      9562,
      9556,
      9577,
      9574,
      9568,
      9552,
      9580,
      9575,
      9576,
      9572,
      9573,
      9561,
      9560,
      9554,
      9555,
      9579,
      9578,
      9496,
      9484,
      9608,
      9604,
      9612,
      9616,
      9600,
      945,
      223,
      915,
      960,
      931,
      963,
      181,
      964,
      934,
      920,
      937,
      948,
      8734,
      966,
      949,
      8745,
      8801,
      177,
      8805,
      8804,
      8992,
      8993,
      247,
      8776,
      176,
      8729,
      183,
      8730,
      8319,
      178,
      9632,
      160
    ]);
    for (var Ii = new Uint16Array([
      32,
      9786,
      9787,
      9829,
      9830,
      9827,
      9824,
      8226,
      9688,
      9675,
      9689,
      9794,
      9792,
      9834,
      9835,
      9788,
      9658,
      9668,
      8597,
      8252,
      182,
      167,
      9644,
      8616,
      8593,
      8595,
      8594,
      8592,
      8735,
      8596,
      9650,
      9660
    ]), je = [], rr, Ft = 0; 256 > Ft; Ft++)
      rr = 126 < Ft ? t[Ft - 127] : 32 > Ft ? Ii[Ft] : Ft, je[Ft] = String.fromCharCode(rr);
    _.imageSmoothingEnabled = !1, a.style.position = "absolute", a.style.backgroundColor = "#ccc", a.style.width = "7px", a.style.display = "inline-block", o.style.display = "block", r.style.display = "none", this.bus = e, e.register(
      "screen-set-mode",
      function(A) {
        this.set_mode(A);
      },
      this
    ), e.register(
      "screen-fill-buffer-end",
      function(A) {
        this.update_buffer(A);
      },
      this
    ), e.register(
      "screen-put-char",
      function(A) {
        this.put_char(A[0], A[1], A[2], A[3], A[4]);
      },
      this
    ), e.register(
      "screen-update-cursor",
      function(A) {
        this.update_cursor(A[0], A[1]);
      },
      this
    ), e.register(
      "screen-update-cursor-scanline",
      function(A) {
        this.update_cursor_scanline(A[0], A[1]);
      },
      this
    ), e.register(
      "screen-clear",
      function() {
        this.clear_screen();
      },
      this
    ), e.register(
      "screen-set-size-text",
      function(A) {
        this.set_size_text(A[0], A[1]);
      },
      this
    ), e.register(
      "screen-set-size-graphical",
      function(A) {
        this.set_size_graphical(A[0], A[1], A[2], A[3]);
      },
      this
    ), this.init = function() {
      this.set_size_text(80, 25), this.timer();
    }, this.make_screenshot = function() {
      const A = new Image();
      if (w)
        A.src = r.toDataURL("image/png");
      else {
        const O = [9, 16], st = document.createElement("canvas");
        st.width = E * O[0], st.height = H * O[1];
        const $ = st.getContext("2d");
        $.imageSmoothingEnabled = !1, $.font = window.getComputedStyle(o).font, $.textBaseline = "top";
        for (let lt = 0; lt < E; lt++)
          for (let kt = 0; kt < H; kt++) {
            const Bt = 3 * (kt * E + lt);
            $.fillStyle = i(S[Bt + 1]), $.fillRect(lt * O[0], kt * O[1], O[0], O[1]), $.fillStyle = i(S[Bt + 2]), $.fillText(je[S[Bt]], lt * O[0], kt * O[1]);
          }
        a.style.display !== "none" && ($.fillStyle = a.style.backgroundColor, $.fillRect(
          c * O[0],
          d * O[1] + parseInt(a.style.marginTop, 10) - 1,
          parseInt(a.style.width, 10),
          parseInt(a.style.height, 10)
        )), A.src = st.toDataURL("image/png");
      }
      return A;
    }, this.put_char = function(A, O, st, $, lt) {
      A < H && O < E && (O = 3 * (A * E + O), S[O] = st, S[O + 1] = $, S[O + 2] = lt, f[A] = 1);
    }, this.timer = function() {
      ot || requestAnimationFrame(w ? o_ : n_);
    };
    var n_ = (function() {
      for (var A = 0; A < H; A++)
        f[A] && (mt.text_update_row(A), f[A] = 0);
      this.timer();
    }).bind(this), o_ = (function() {
      this.bus.send("screen-fill-buffer"), this.timer();
    }).bind(this);
    this.destroy = function() {
      ot = !0;
    }, this.set_mode = function(A) {
      (w = A) ? (o.style.display = "none", r.style.display = "block") : (o.style.display = "block", r.style.display = "none");
    }, this.clear_screen = function() {
      _.fillStyle = "#000", _.fillRect(0, 0, r.width, r.height);
    }, this.set_size_text = function(A, O) {
      if (A !== E || O !== H) {
        for (f = new Int8Array(O), S = new Int32Array(A * O * 3), E = A, H = O; o.childNodes.length > O; )
          o.removeChild(o.firstChild);
        for (; o.childNodes.length < O; )
          o.appendChild(document.createElement("div"));
        for (A = 0; A < O; A++)
          this.text_update_row(A);
        s(o, u, p, !0);
      }
    }, this.set_size_graphical = function(A, O, st, $) {
      r.style.display = "block", r.width = A, r.height = O, g = 640 >= A && 2 * A < window.innerWidth * window.devicePixelRatio && 2 * O < window.innerHeight * window.devicePixelRatio ? 2 : 1, s(r, u * g, p * g, !1);
    }, this.set_scale = function(A, O) {
      u = A, p = O, s(o, u, p, !0), s(r, u * g, p * g, !1);
    }, this.set_scale(u, p), this.update_cursor_scanline = function(A, O) {
      A & 32 ? a.style.display = "none" : (a.style.display = "inline", a.style.height = Math.min(15, O - A) + "px", a.style.marginTop = Math.min(15, A) + "px");
    }, this.update_cursor = function(A, O) {
      (A !== d || O !== c) && (f[A] = 1, f[d] = 1, d = A, c = O);
    }, this.text_update_row = function(A) {
      for (var O = 3 * A * E, st, $ = o.childNodes[A], lt = document.createElement("div"), kt = 0; kt < E; ) {
        var Bt = document.createElement("span"), nr = S[O + 1], or = S[O + 2];
        for (Bt.style.backgroundColor = i(nr), Bt.style.color = i(or), st = ""; kt < E && S[O + 1] === nr && S[O + 2] === or; ) {
          var _r = S[O];
          if (st += je[_r], je[_r], kt++, O += 3, A === d) {
            if (kt === c)
              break;
            if (kt === c + 1) {
              lt.appendChild(a);
              break;
            }
          }
        }
        Bt.textContent = st, lt.appendChild(Bt);
      }
      $.parentNode.replaceChild(lt, $);
    }, this.update_buffer = function(A) {
      A.forEach((O) => {
        _.putImageData(
          O.image_data,
          O.screen_x - O.buffer_x,
          O.screen_y - O.buffer_y,
          O.buffer_x,
          O.buffer_y,
          O.buffer_width,
          O.buffer_height
        );
      });
    }, this.init();
  }
  const Ar = 0, Er = 254;
  var Rt = 1, Ht = 2, Ri = 17, Ti = 95, Ke = 39, Ir = 1, xr = 2, Rr = 4, Tr = 8, Sr = 16, Or = 32, Cr = 64, Dr = 128, qr = 256;
  const Mr = 0, Ye = 1, Zt = 2, Si = Object.freeze(["shared", "exclusive", "unlock"]), Oi = 0, Lr = 1;
  var Ur = -1, Te = 1, Qe = 2;
  function At(t, e, i) {
    this.fs = t, this.bus = i, this.configspace_tagname = [104, 111, 115, 116, 57, 112], this.configspace_taglen = this.configspace_tagname.length, this.VERSION = "9P2000.L", this.msize = this.BLOCKSIZE = 8192, this.replybuffer = new Uint8Array(2 * this.msize), this.replybuffersize = 0, this.fids = [], this.virtio = new dt(e, {
      name: "virtio-9p",
      pci_id: 48,
      device_id: 4169,
      subsystem_device_id: 9,
      common: {
        initial_port: 43008,
        queues: [{ size_supported: 32, notify_offset: 0 }],
        features: [
          Ar,
          zs,
          Ps,
          Us
        ],
        on_driver_ok: () => {
        }
      },
      notification: {
        initial_port: 43264,
        single_handler: !1,
        handlers: [
          (s) => {
            if (s === 0) {
              for (; this.virtqueue.has_request(); )
                s = this.virtqueue.pop_request(), this.ReceiveRequest(s);
              this.virtqueue.notify_me_after(0);
            }
          }
        ]
      },
      isr_status: { initial_port: 42752 },
      device_specific: {
        initial_port: 42496,
        struct: [
          {
            bytes: 2,
            name: "mount tag length",
            read: () => this.configspace_taglen,
            write: (s) => {
            }
          }
        ].concat(
          l.range(Er).map((s) => ({
            bytes: 1,
            name: "mount tag name " + s,
            read: () => this.configspace_tagname[s] || 0,
            write: (r) => {
            }
          }))
        )
      }
    }), this.virtqueue = this.virtio.queues[0];
  }
  At.prototype.get_state = function() {
    var t = [];
    return t[0] = this.configspace_tagname, t[1] = this.configspace_taglen, t[2] = this.virtio, t[3] = this.VERSION, t[4] = this.BLOCKSIZE, t[5] = this.msize, t[6] = this.replybuffer, t[7] = this.replybuffersize, t[8] = this.fids.map(function(e) {
      return [e.inodeid, e.type, e.uid, e.dbg_name];
    }), t[9] = this.fs, t;
  }, At.prototype.set_state = function(t) {
    this.configspace_tagname = t[0], this.configspace_taglen = t[1], this.virtio.set_state(t[2]), this.virtqueue = this.virtio.queues[0], this.VERSION = t[3], this.BLOCKSIZE = t[4], this.msize = t[5], this.replybuffer = t[6], this.replybuffersize = t[7], this.fids = t[8].map(function(e) {
      return { inodeid: e[0], type: e[1], uid: e[2], dbg_name: e[3] };
    }), this.fs.set_state(t[9]);
  }, At.prototype.Createfid = function(t, e, i, s) {
    return { inodeid: t, type: e, uid: i, dbg_name: s };
  }, At.prototype.update_dbg_name = function(t, e) {
    for (const i of this.fids)
      i.inodeid === t && (i.dbg_name = e);
  }, At.prototype.Reset = function() {
    this.fids = [];
  }, At.prototype.BuildReply = function(t, e, i) {
    P.Marshall(
      ["w", "b", "h"],
      [i + 7, t + 1, e],
      this.replybuffer,
      0
    ), i + 7 >= this.replybuffer.length && B.Debug("Error in 9p: payloadsize exceeds maximum length"), this.replybuffersize = i + 7;
  }, At.prototype.SendError = function(t, e, i) {
    e = P.Marshall(["w"], [i], this.replybuffer, 7), this.BuildReply(6, t, e);
  }, At.prototype.SendReply = function(t) {
    0 <= this.replybuffersize, t.set_next_blob(this.replybuffer.subarray(0, this.replybuffersize)), this.virtqueue.push_reply(t), this.virtqueue.flush_replies();
  }, At.prototype.ReceiveRequest = async function(t) {
    var e = new Uint8Array(t.length_readable);
    t.get_next_blob(e);
    var i = { offset: 0 }, s = P.Unmarshall(["w", "b", "h"], e, i), r = s[0], _ = s[1], o = s[2];
    switch (_) {
      case 8:
        r = this.fs.GetTotalSize(), e = this.fs.GetSpace(), s = [16914839], s[1] = this.BLOCKSIZE, s[2] = Math.floor(e / s[1]), s[3] = s[2] - Math.floor(r / s[1]), s[4] = s[2] - Math.floor(r / s[1]), s[5] = this.fs.CountUsedInodes(), s[6] = this.fs.CountFreeInodes(), s[7] = 0, s[8] = 256, r = P.Marshall(
          "wwddddddw".split(""),
          s,
          this.replybuffer,
          7
        ), this.BuildReply(_, o, r), this.SendReply(t);
        break;
      case 112:
      case 12:
        s = P.Unmarshall(["w", "w"], e, i);
        var a = s[0];
        i = s[1], B.Debug("[open] fid=" + a + ", mode=" + i), e = this.fids[a].inodeid;
        var d = this.fs.GetInode(e);
        B.Debug("file open " + this.fids[a].dbg_name), s = this.fs.OpenInode(e, i), this.fs.AddEvent(
          this.fids[a].inodeid,
          (function() {
            B.Debug(
              "file opened " + this.fids[a].dbg_name + " tag:" + o
            );
            var g = [];
            g[0] = d.qid, g[1] = this.msize - 24, P.Marshall(["Q", "w"], g, this.replybuffer, 7), this.BuildReply(_, o, 17), this.SendReply(t);
          }).bind(this)
        );
        break;
      case 70:
        if (s = P.Unmarshall(["w", "w", "s"], e, i), e = s[0], a = s[1], r = s[2], B.Debug("[link] dfid=" + e + ", name=" + r), s = this.fs.Link(this.fids[e].inodeid, this.fids[a].inodeid, r), 0 > s) {
          r = "", s === -Rt ? r = "Operation not permitted" : (r = "Unknown error: " + -s, void 0), this.SendError(o, r, -s), this.SendReply(t);
          break;
        }
        this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 16:
        s = P.Unmarshall(["w", "s", "s", "w"], e, i), a = s[0], r = s[1], e = s[2], s = s[3], B.Debug(
          "[symlink] fid=" + a + ", name=" + r + ", symgt=" + e + ", gid=" + s
        ), e = this.fs.CreateSymlink(r, this.fids[a].inodeid, e), d = this.fs.GetInode(e), d.uid = this.fids[a].uid, d.gid = s, P.Marshall(["Q"], [d.qid], this.replybuffer, 7), this.BuildReply(_, o, 13), this.SendReply(t);
        break;
      case 18:
        s = P.Unmarshall("wswwww".split(""), e, i), a = s[0], r = s[1], i = s[2], e = s[3];
        var c = s[4];
        s = s[5], B.Debug(
          "[mknod] fid=" + a + ", name=" + r + ", major=" + e + ", minor=" + c
        ), e = this.fs.CreateNode(r, this.fids[a].inodeid, e, c), d = this.fs.GetInode(e), d.mode = i, d.uid = this.fids[a].uid, d.gid = s, P.Marshall(["Q"], [d.qid], this.replybuffer, 7), this.BuildReply(_, o, 13), this.SendReply(t);
        break;
      case 22:
        s = P.Unmarshall(["w"], e, i), a = s[0], d = this.fs.GetInode(this.fids[a].inodeid), B.Debug(
          "[readlink] fid=" + a + " name=" + this.fids[a].dbg_name + " target=" + d.symlink
        ), r = P.Marshall(["s"], [d.symlink], this.replybuffer, 7), this.BuildReply(_, o, r), this.SendReply(t);
        break;
      case 72:
        s = P.Unmarshall(["w", "s", "w", "w"], e, i), a = s[0], r = s[1], i = s[2], s = s[3], B.Debug(
          "[mkdir] fid=" + a + ", name=" + r + ", mode=" + i + ", gid=" + s
        ), e = this.fs.CreateDirectory(r, this.fids[a].inodeid), d = this.fs.GetInode(e), d.mode = i | bt, d.uid = this.fids[a].uid, d.gid = s, P.Marshall(["Q"], [d.qid], this.replybuffer, 7), this.BuildReply(_, o, 13), this.SendReply(t);
        break;
      case 14:
        s = P.Unmarshall(["w", "s", "w", "w", "w"], e, i), a = s[0], r = s[1], e = s[2], i = s[3], s = s[4], this.bus.send("9p-create", [r, this.fids[a].inodeid]), B.Debug(
          "[create] fid=" + a + ", name=" + r + ", flags=" + e + ", mode=" + i + ", gid=" + s
        ), e = this.fs.CreateFile(r, this.fids[a].inodeid), this.fids[a].inodeid = e, this.fids[a].type = Te, this.fids[a].dbg_name = r, d = this.fs.GetInode(e), d.uid = this.fids[a].uid, d.gid = s, d.mode = i, P.Marshall(
          ["Q", "w"],
          [d.qid, this.msize - 24],
          this.replybuffer,
          7
        ), this.BuildReply(_, o, 17), this.SendReply(t);
        break;
      case 52:
        s = P.Unmarshall("wbwddws".split(""), e, i), a = s[0], e = s[2], r = s[4] === 0 ? 1 / 0 : s[4], r = this.fs.DescribeLock(s[1], s[3], r, s[5], s[6]), B.Debug(
          "[lock] fid=" + a + ", type=" + Si[r.type] + ", start=" + r.start + ", length=" + r.length + ", proc_id=" + r.proc_id
        ), s = this.fs.Lock(this.fids[a].inodeid, r, e), P.Marshall(["b"], [s], this.replybuffer, 7), this.BuildReply(_, o, 1), this.SendReply(t);
        break;
      case 54:
        s = P.Unmarshall("wbddws".split(""), e, i), a = s[0], r = s[3] === 0 ? 1 / 0 : s[3], r = this.fs.DescribeLock(s[1], s[2], r, s[4], s[5]), B.Debug(
          "[getlock] fid=" + a + ", type=" + Si[r.type] + ", start=" + r.start + ", length=" + r.length + ", proc_id=" + r.proc_id
        ), s = this.fs.GetLock(this.fids[a].inodeid, r), s || (s = r, s.type = Zt), r = P.Marshall(
          ["b", "d", "d", "w", "s"],
          [
            s.type,
            s.start,
            s.length === 1 / 0 ? 0 : s.length,
            s.proc_id,
            s.client_id
          ],
          this.replybuffer,
          7
        ), this.BuildReply(_, o, r), this.SendReply(t);
        break;
      case 24:
        if (s = P.Unmarshall(["w", "d"], e, i), a = s[0], d = this.fs.GetInode(this.fids[a].inodeid), B.Debug(
          "[getattr]: fid=" + a + " name=" + this.fids[a].dbg_name + " request mask=" + s[1]
        ), !d || d.status === Ve) {
          B.Debug("getattr: unlinked"), this.SendError(o, "No such file or directory", Ht), this.SendReply(t);
          break;
        }
        s[0] |= 4096, s[0] = s[1], s[1] = d.qid, s[2] = d.mode, s[3] = d.uid, s[4] = d.gid, s[5] = d.nlinks, s[6] = d.major << 8 | d.minor, s[7] = d.size, s[8] = this.BLOCKSIZE, s[9] = Math.floor(d.size / 512 + 1), s[10] = d.atime, s[11] = 0, s[12] = d.mtime, s[13] = 0, s[14] = d.ctime, s[15] = 0, s[16] = 0, s[17] = 0, s[18] = 0, s[19] = 0, P.Marshall(
          "dQwwwddddddddddddddd".split(""),
          s,
          this.replybuffer,
          7
        ), this.BuildReply(_, o, 153), this.SendReply(t);
        break;
      case 26:
        s = P.Unmarshall("wwwwwddddd".split(""), e, i), a = s[0], d = this.fs.GetInode(this.fids[a].inodeid), B.Debug(
          "[setattr]: fid=" + a + " request mask=" + s[1] + " name=" + this.fids[a].dbg_name
        ), s[1] & Ir && (d.mode = s[2]), s[1] & xr && (d.uid = s[3]), s[1] & Rr && (d.gid = s[4]), s[1] & Sr && (d.atime = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3)), s[1] & Or && (d.mtime = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3)), s[1] & Cr && (d.ctime = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3)), s[1] & Dr && (d.atime = s[6]), s[1] & qr && (d.mtime = s[8]), s[1] & Tr && await this.fs.ChangeSize(this.fids[a].inodeid, s[5]), this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 50:
        s = P.Unmarshall(["w", "d"], e, i), a = s[0], this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 40:
      case 116:
        if (s = P.Unmarshall(["w", "d", "w"], e, i), a = s[0], r = s[1], c = s[2], d = this.fs.GetInode(this.fids[a].inodeid), _ == 40 && B.Debug(
          "[treaddir]: fid=" + a + " offset=" + r + " count=" + c
        ), _ == 116 && B.Debug(
          "[read]: fid=" + a + " (" + this.fids[a].dbg_name + ") offset=" + r + " count=" + c + " fidtype=" + this.fids[a].type
        ), !d || d.status === Ve) {
          B.Debug("read/treaddir: unlinked"), this.SendError(o, "No such file or directory", Ht), this.SendReply(t);
          break;
        }
        if (this.fids[a].type == Qe)
          for (d.caps.length < r + c && (c = d.caps.length - r), s = 0; s < c; s++)
            this.replybuffer[11 + s] = d.caps[r + s];
        else
          this.fs.OpenInode(this.fids[a].inodeid, void 0), s = this.fids[a].inodeid, c = Math.min(c, this.replybuffer.length - 11), d.size < r + c ? c = d.size - r : _ == 40 && (c = this.fs.RoundToDirentry(s, r + c) - r), r > d.size && (c = 0), this.bus.send("9p-read-start", [this.fids[a].dbg_name]), s = await this.fs.Read(s, r, c), this.bus.send("9p-read-end", [
            this.fids[a].dbg_name,
            c
          ]), s && this.replybuffer.set(s, 11);
        P.Marshall(["w"], [c], this.replybuffer, 7), this.BuildReply(_, o, 4 + c), this.SendReply(t);
        break;
      case 118:
        if (s = P.Unmarshall(["w", "d", "w"], e, i), a = s[0], r = s[1], c = s[2], s = this.fids[a].dbg_name, B.Debug(
          "[write]: fid=" + a + " (" + s + ") offset=" + r + " count=" + c + " fidtype=" + this.fids[a].type
        ), this.fids[a].type === Qe) {
          this.SendError(o, "Setxattr not supported", Ti), this.SendReply(t);
          break;
        } else
          await this.fs.Write(
            this.fids[a].inodeid,
            r,
            c,
            e.subarray(i.offset)
          );
        this.bus.send("9p-write-end", [s, c]), P.Marshall(["w"], [c], this.replybuffer, 7), this.BuildReply(_, o, 4), this.SendReply(t);
        break;
      case 74:
        if (s = P.Unmarshall(["w", "s", "w", "s"], e, i), i = s[0], c = s[1], r = s[2], e = s[3], B.Debug("[renameat]: oldname=" + c + " newname=" + e), s = await this.fs.Rename(
          this.fids[i].inodeid,
          c,
          this.fids[r].inodeid,
          e
        ), 0 > s) {
          r = "", s === -Ht ? r = "No such file or directory" : s === -Rt ? r = "Operation not permitted" : s === -Ke ? r = "Directory not empty" : (r = "Unknown error: " + -s, void 0), this.SendError(o, r, -s), this.SendReply(t);
          break;
        }
        this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 76:
        if (s = P.Unmarshall(["w", "s", "w"], e, i), i = s[0], r = s[1], e = s[2], B.Debug(
          "[unlink]: dirfd=" + i + " name=" + r + " flags=" + e
        ), a = this.fs.Search(this.fids[i].inodeid, r), a == -1) {
          this.SendError(o, "No such file or directory", Ht), this.SendReply(t);
          break;
        }
        if (s = this.fs.Unlink(this.fids[i].inodeid, r), 0 > s) {
          r = "", s === -Ke ? r = "Directory not empty" : s === -Rt ? r = "Operation not permitted" : (r = "Unknown error: " + -s, void 0), this.SendError(o, r, -s), this.SendReply(t);
          break;
        }
        this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 100:
        s = P.Unmarshall(["w", "s"], e, i), B.Debug("[version]: msize=" + s[0] + " version=" + s[1]), this.msize = s[0], r = P.Marshall(
          ["w", "s"],
          [this.msize, this.VERSION],
          this.replybuffer,
          7
        ), this.BuildReply(_, o, r), this.SendReply(t);
        break;
      case 104:
        s = P.Unmarshall(["w", "w", "s", "s", "w"], e, i), a = s[0], r = s[4], B.Debug(
          "[attach]: fid=" + a + " afid=" + i_(s[1]) + " uname=" + s[2] + " aname=" + s[3]
        ), this.fids[a] = this.Createfid(0, Te, r, ""), d = this.fs.GetInode(this.fids[a].inodeid), P.Marshall(["Q"], [d.qid], this.replybuffer, 7), this.BuildReply(_, o, 13), this.SendReply(t), this.bus.send("9p-attach");
        break;
      case 108:
        s = P.Unmarshall(["h"], e, i), B.Debug("[flush] " + o), this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 110:
        s = P.Unmarshall(["w", "w", "h"], e, i), a = s[0], c = s[1];
        var u = s[2];
        if (B.Debug(
          "[walk]: fid=" + s[0] + " nwfid=" + s[1] + " nwname=" + u
        ), u == 0) {
          this.fids[c] = this.Createfid(
            this.fids[a].inodeid,
            Te,
            this.fids[a].uid,
            this.fids[a].dbg_name
          ), P.Marshall(["h"], [0], this.replybuffer, 7), this.BuildReply(_, o, 2), this.SendReply(t);
          break;
        }
        for (r = [], s = 0; s < u; s++)
          r.push("s");
        i = P.Unmarshall(r, e, i), e = this.fids[a].inodeid, r = 9;
        var p = 0;
        for (B.Debug(
          "walk in dir " + this.fids[a].dbg_name + " to: " + i.toString()
        ), s = 0; s < u; s++) {
          if (e = this.fs.Search(e, i[s]), e == -1) {
            B.Debug("Could not find: " + i[s]);
            break;
          }
          r += P.Marshall(
            ["Q"],
            [this.fs.GetInode(e).qid],
            this.replybuffer,
            r
          ), p++, this.fids[c] = this.Createfid(
            e,
            Te,
            this.fids[a].uid,
            i[s]
          );
        }
        P.Marshall(["h"], [p], this.replybuffer, 7), this.BuildReply(_, o, r - 7), this.SendReply(t);
        break;
      case 120:
        s = P.Unmarshall(["w"], e, i), B.Debug("[clunk]: fid=" + s[0]), this.fids[s[0]] && 0 <= this.fids[s[0]].inodeid && (await this.fs.CloseInode(this.fids[s[0]].inodeid), this.fids[s[0]].inodeid = -1, this.fids[s[0]].type = Ur), this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 32:
        s = P.Unmarshall(["w", "s", "d", "w"], e, i), a = s[0], r = s[1], i = s[2], e = s[3], B.Debug(
          "[txattrcreate]: fid=" + a + " name=" + r + " attr_size=" + i + " flags=" + e
        ), this.fids[a].type = Qe, this.BuildReply(_, o, 0), this.SendReply(t);
        break;
      case 30:
        s = P.Unmarshall(["w", "w", "s"], e, i), a = s[0], r = s[2], B.Debug(
          "[xattrwalk]: fid=" + s[0] + " newfid=" + s[1] + " name=" + s[2]
        ), this.SendError(o, "Setxattr not supported", Ti), this.SendReply(t);
        break;
      default:
        B.Debug(
          "Error in Virtio9p: Unknown id " + _ + " received"
        );
    }
  };
  var Pr = !1, Jt = !1, zr = 1, Nr = 1e6;
  function et(t) {
    this.ports = [], this.cpu = t;
    for (var e = 0; 65536 > e; e++)
      this.ports[e] = this.create_empty_entry();
    var i = t.memory_size[0];
    for (e = 0; e << ft < i; e++)
      t.memory_map_read8[e] = t.memory_map_write8[e] = void 0, t.memory_map_read32[e] = t.memory_map_write32[e] = void 0;
    this.mmap_register(
      i,
      4294967296 - i,
      function(s) {
        return n(
          "Read from unmapped memory space, addr=" + h(s >>> 0, 8),
          z
        ), 255;
      },
      function(s, r) {
        n(
          "Write to unmapped memory space, addr=" + h(s >>> 0, 8) + " value=" + h(r, 2),
          z
        );
      },
      function(s) {
        return n(
          "Read from unmapped memory space, addr=" + h(s >>> 0, 8),
          z
        ), -1;
      },
      function(s, r) {
        n(
          "Write to unmapped memory space, addr=" + h(s >>> 0, 8) + " value=" + h(r >>> 0, 8),
          z
        );
      }
    );
  }
  et.prototype.create_empty_entry = function() {
    return {
      read8: this.empty_port_read8,
      read16: this.empty_port_read16,
      read32: this.empty_port_read32,
      write8: this.empty_port_write,
      write16: this.empty_port_write,
      write32: this.empty_port_write,
      device: void 0
    };
  }, et.prototype.empty_port_read8 = function() {
    return 255;
  }, et.prototype.empty_port_read16 = function() {
    return 65535;
  }, et.prototype.empty_port_read32 = function() {
    return -1;
  }, et.prototype.empty_port_write = function(t) {
  }, et.prototype.register_read = function(t, e, i, s, r) {
    i && (this.ports[t].read8 = i), s && (this.ports[t].read16 = s), r && (this.ports[t].read32 = r), this.ports[t].device = e;
  }, et.prototype.register_write = function(t, e, i, s, r) {
    i && (this.ports[t].write8 = i), s && (this.ports[t].write16 = s), r && (this.ports[t].write32 = r), this.ports[t].device = e;
  }, et.prototype.register_read_consecutive = function(t, e, i, s, r, _) {
    function o() {
      return i.call(this) | s.call(this) << 8;
    }
    function a() {
      return r.call(this) | _.call(this) << 8;
    }
    function d() {
      return i.call(this) | s.call(this) << 8 | r.call(this) << 16 | _.call(this) << 24;
    }
    r && _ ? (this.register_read(t, e, i, o, d), this.register_read(t + 1, e, s), this.register_read(t + 2, e, r, a), this.register_read(t + 3, e, _)) : (this.register_read(t, e, i, o), this.register_read(t + 1, e, s));
  }, et.prototype.register_write_consecutive = function(t, e, i, s, r, _) {
    function o(c) {
      i.call(this, c & 255), s.call(this, c >> 8 & 255);
    }
    function a(c) {
      r.call(this, c & 255), _.call(this, c >> 8 & 255);
    }
    function d(c) {
      i.call(this, c & 255), s.call(this, c >> 8 & 255), r.call(this, c >> 16 & 255), _.call(this, c >>> 24);
    }
    r && _ ? (this.register_write(t, e, i, o, d), this.register_write(t + 1, e, s), this.register_write(t + 2, e, r, a), this.register_write(t + 3, e, _)) : (this.register_write(t, e, i, o), this.register_write(t + 1, e, s));
  }, et.prototype.mmap_read32_shim = function(t) {
    var e = this.cpu.memory_map_read8[t >>> ft];
    return e(t) | e(t + 1) << 8 | e(t + 2) << 16 | e(t + 3) << 24;
  }, et.prototype.mmap_write32_shim = function(t, e) {
    var i = this.cpu.memory_map_write8[t >>> ft];
    i(t, e & 255), i(t + 1, e >> 8 & 255), i(t + 2, e >> 16 & 255), i(t + 3, e >>> 24);
  }, et.prototype.mmap_register = function(t, e, i, s, r, _) {
    for (n(
      "mmap_register addr=" + h(t >>> 0, 8) + " size=" + h(e, 8),
      z
    ), r || (r = this.mmap_read32_shim.bind(this)), _ || (_ = this.mmap_write32_shim.bind(this)), t >>>= ft; 0 < e; t++)
      this.cpu.memory_map_read8[t] = i, this.cpu.memory_map_write8[t] = s, this.cpu.memory_map_read32[t] = r, this.cpu.memory_map_write32[t] = _, e -= Ee;
  }, et.prototype.port_write8 = function(t, e) {
    var i = this.ports[t];
    return (i.write8 === this.empty_port_write || Jt) && n(
      "write8 port #" + h(t, 4) + " <- " + h(e, 2) + this.get_port_description(t),
      z
    ), i.write8.call(i.device, e);
  }, et.prototype.port_write16 = function(t, e) {
    var i = this.ports[t];
    return (i.write16 === this.empty_port_write || Jt) && n(
      "write16 port #" + h(t, 4) + " <- " + h(e, 4) + this.get_port_description(t),
      z
    ), i.write16.call(i.device, e);
  }, et.prototype.port_write32 = function(t, e) {
    var i = this.ports[t];
    return (i.write32 === this.empty_port_write || Jt) && n(
      "write32 port #" + h(t, 4) + " <- " + h(e >>> 0, 8) + this.get_port_description(t),
      z
    ), i.write32.call(i.device, e);
  }, et.prototype.port_read8 = function(t) {
    var e = this.ports[t];
    return (e.read8 === this.empty_port_read8 || Jt) && n(
      "read8 port  #" + h(t, 4) + this.get_port_description(t),
      z
    ), e = e.read8.call(e.device), 256 > e && 0 <= e, "" + h(t), e;
  }, et.prototype.port_read16 = function(t) {
    var e = this.ports[t];
    return (e.read16 === this.empty_port_read16 || Jt) && n(
      "read16 port  #" + h(t, 4) + this.get_port_description(t),
      z
    ), e = e.read16.call(e.device), 65536 > e && 0 <= e, "" + h(t), e;
  }, et.prototype.port_read32 = function(t) {
    var e = this.ports[t];
    return (e.read32 === this.empty_port_read32 || Jt) && n(
      "read32 port  #" + h(t, 4) + this.get_port_description(t),
      z
    ), t = e.read32.call(e.device), t;
  };
  var Ci = {
    4: "PORT_DMA_ADDR_2",
    5: "PORT_DMA_CNT_2",
    10: "PORT_DMA1_MASK_REG",
    11: "PORT_DMA1_MODE_REG",
    12: "PORT_DMA1_CLEAR_FF_REG",
    13: "PORT_DMA1_MASTER_CLEAR",
    32: "PORT_PIC1_CMD",
    33: "PORT_PIC1_DATA",
    64: "PORT_PIT_COUNTER0",
    65: "PORT_PIT_COUNTER1",
    66: "PORT_PIT_COUNTER2",
    67: "PORT_PIT_MODE",
    96: "PORT_PS2_DATA",
    97: "PORT_PS2_CTRLB",
    100: "PORT_PS2_STATUS",
    112: "PORT_CMOS_INDEX",
    113: "PORT_CMOS_DATA",
    128: "PORT_DIAG",
    129: "PORT_DMA_PAGE_2",
    146: "PORT_A20",
    160: "PORT_PIC2_CMD",
    161: "PORT_PIC2_DATA",
    178: "PORT_SMI_CMD",
    179: "PORT_SMI_STATUS",
    212: "PORT_DMA2_MASK_REG",
    214: "PORT_DMA2_MODE_REG",
    218: "PORT_DMA2_MASTER_CLEAR",
    240: "PORT_MATH_CLEAR",
    368: "PORT_ATA2_CMD_BASE",
    496: "PORT_ATA1_CMD_BASE",
    632: "PORT_LPT2",
    744: "PORT_SERIAL4",
    760: "PORT_SERIAL2",
    884: "PORT_ATA2_CTRL_BASE",
    888: "PORT_LPT1",
    1e3: "PORT_SERIAL3",
    1008: "PORT_FD_BASE",
    1010: "PORT_FD_DOR",
    1012: "PORT_FD_STATUS",
    1013: "PORT_FD_DATA",
    1014: "PORT_HD_DATA",
    1015: "PORT_FD_DIR",
    1016: "PORT_SERIAL1",
    3320: "PORT_PCI_CMD",
    3321: "PORT_PCI_REBOOT",
    3324: "PORT_PCI_DATA",
    1026: "PORT_BIOS_DEBUG",
    1296: "PORT_QEMU_CFG_CTL",
    1297: "PORT_QEMU_CFG_DATA",
    45056: "PORT_ACPI_PM_BASE",
    45312: "PORT_SMB_BASE",
    35072: "PORT_BIOS_APM"
  };
  et.prototype.get_port_description = function(t) {
    return Ci[t] ? "  (" + Ci[t] + ")" : "";
  };
  function W(t, e) {
    this.stopping = this.running = !1, this.tick_counter = 0, this.worker = null, this.cpu = new U(t, e, () => {
      this.idle && this.next_tick(0);
    }), this.bus = t, t.register("cpu-init", this.init, this), t.register("cpu-run", this.run, this), t.register("cpu-stop", this.stop, this), t.register("cpu-restart", this.restart, this), this.register_yield();
  }
  if (W.prototype.run = function() {
    this.stopping = !1, this.running || (this.running = !0, this.bus.send("emulator-started")), this.next_tick(0);
  }, W.prototype.do_tick = function() {
    if (this.stopping || !this.running)
      this.stopping = this.running = !1, this.bus.send("emulator-stopped");
    else {
      this.idle = !1;
      var t = this.cpu.main_run();
      this.next_tick(t);
    }
  }, W.prototype.next_tick = function(t) {
    const e = ++this.tick_counter;
    this.idle = !0, this.yield(t, e);
  }, W.prototype.yield_callback = function(t) {
    t === this.tick_counter && this.do_tick();
  }, W.prototype.stop = function() {
    this.running && (this.stopping = !0);
  }, W.prototype.destroy = function() {
    this.unregister_yield();
  }, W.prototype.restart = function() {
    this.cpu.reset_cpu(), this.cpu.load_bios();
  }, W.prototype.init = function(t) {
    this.cpu.init(t, this.bus), this.bus.send("emulator-ready");
  }, typeof process < "u")
    W.prototype.yield = function(t, e) {
      1 > t ? global.setImmediate((i) => this.yield_callback(i), e) : setTimeout((i) => this.yield_callback(i), t, e);
    }, W.prototype.register_yield = function() {
    }, W.prototype.unregister_yield = function() {
    };
  else if (typeof Worker < "u") {
    let t = function() {
      globalThis.onmessage = function(e) {
        const i = e.data.t;
        1 > i ? postMessage(e.data.tick) : setTimeout(() => postMessage(e.data.tick), i);
      };
    };
    W.prototype.register_yield = function() {
      const e = URL.createObjectURL(
        new Blob(["(" + t.toString() + ")()"], {
          type: "text/javascript"
        })
      );
      this.worker = new Worker(e), this.worker.onmessage = (i) => this.yield_callback(i.data), URL.revokeObjectURL(e);
    }, W.prototype.yield = function(e, i) {
      this.worker.postMessage({ t: e, tick: i });
    }, W.prototype.unregister_yield = function() {
      this.worker && this.worker.terminate(), this.worker = null;
    };
  } else
    W.prototype.yield = function(t) {
      setTimeout(() => {
        this.do_tick();
      }, t);
    }, W.prototype.register_yield = function() {
    }, W.prototype.unregister_yield = function() {
    };
  if (W.prototype.save_state = function() {
    return this.cpu.save_state();
  }, W.prototype.restore_state = function(t) {
    return this.cpu.restore_state(t);
  }, typeof performance == "object" && performance.now)
    W.microtick = performance.now.bind(performance);
  else if (typeof require == "function") {
    const { performance: t } = require("perf_hooks");
    W.microtick = t.now.bind(t);
  } else
    W.microtick = typeof process == "object" && process.hrtime ? function() {
      var t = process.hrtime();
      return 1e3 * t[0] + t[1] / 1e6;
    } : Date.now;
  var X = X || {};
  X.exportSymbol = function() {
  }, X.exportProperty = function() {
  };
  var l = l || {};
  l.pads = function(t, e) {
    return (t || t === 0 ? t + "" : "").padEnd(e, " ");
  }, l.pad0 = function(t, e) {
    return (t || t === 0 ? t + "" : "").padStart(e, "0");
  }, l.zeros = function(t) {
    return Array(t).fill(0);
  }, l.range = function(t) {
    return Array.from(Array(t).keys());
  }, l.view = function(t, e, i, s) {
    return new Proxy(
      {},
      {
        get: function(r, _, o) {
          return r = new t(e.buffer, i, s), o = r[_], typeof o == "function" ? o.bind(r) : o;
        },
        set: function(r, _, o, a) {
          return new t(e.buffer, i, s)[_] = o, !0;
        }
      }
    );
  };
  function h(t, e) {
    return t = t ? t.toString(16) : "", "0x" + l.pad0(t.toUpperCase(), e || 1);
  }
  if (typeof crypto < "u" && crypto.getRandomValues) {
    let t = new Int32Array(1);
    l.get_rand_int = function() {
      return crypto.getRandomValues(t), t[0];
    };
  } else if (typeof require < "u") {
    const t = require("crypto");
    l.get_rand_int = function() {
      return t.randomBytes(4).readInt32LE(0);
    };
  }
  (function() {
    if (typeof Math.clz32 == "function")
      l.int_log2_byte = function(s) {
        return 31 - Math.clz32(s);
      }, l.int_log2 = function(s) {
        return 31 - Math.clz32(s);
      };
    else {
      for (var t = new Int8Array(256), e = 0, i = -2; 256 > e; e++)
        e & e - 1 || i++, t[e] = i;
      l.int_log2_byte = function(s) {
        return t[s];
      }, l.int_log2 = function(s) {
        s >>>= 0;
        var r = s >>> 16;
        if (r) {
          var _ = r >>> 8;
          return _ ? 24 + t[_] : 16 + t[r];
        }
        return (_ = s >>> 8) ? 8 + t[_] : t[s];
      };
    }
  })();
  function he(t) {
    var e = new Uint8Array(t), i, s;
    this.length = 0, this.push = function(r) {
      this.length !== t && this.length++, e[s] = r, s = s + 1 & t - 1;
    }, this.shift = function() {
      if (this.length) {
        var r = e[i];
        return i = i + 1 & t - 1, this.length--, r;
      }
      return -1;
    }, this.peek = function() {
      return this.length ? e[i] : -1;
    }, this.clear = function() {
      this.length = s = i = 0;
    }, this.clear();
  }
  function Vt(t) {
    this.size = t, this.data = new Float32Array(t), this.length = this.end = this.start = 0;
  }
  Vt.prototype.push = function(t) {
    this.length === this.size ? this.start = this.start + 1 & this.size - 1 : this.length++, this.data[this.end] = t, this.end = this.end + 1 & this.size - 1;
  }, Vt.prototype.shift = function() {
    if (this.length) {
      var t = this.data[this.start];
      return this.start = this.start + 1 & this.size - 1, this.length--, t;
    }
  }, Vt.prototype.shift_block = function(t) {
    var e = new Float32Array(t);
    t > this.length && (t = this.length);
    var i = this.start + t, s = this.data.subarray(this.start, i);
    return e.set(s), i >= this.size && (i -= this.size, e.set(this.data.subarray(0, i), s.length)), this.start = i, this.length -= t, e;
  }, Vt.prototype.peek = function() {
    if (this.length)
      return this.data[this.start];
  }, Vt.prototype.clear = function() {
    this.length = this.end = this.start = 0;
  }, l.Bitmap = function(t) {
    typeof t == "number" ? this.view = new Uint8Array(t + 7 >> 3) : t instanceof ArrayBuffer ? this.view = new Uint8Array(t) : void 0;
  }, l.Bitmap.prototype.set = function(t, e) {
    const i = t >> 3;
    t = 1 << (t & 7), this.view[i] = e ? this.view[i] | t : this.view[i] & ~t;
  }, l.Bitmap.prototype.get = function(t) {
    return this.view[t >> 3] >> (t & 7) & 1;
  }, l.Bitmap.prototype.get_buffer = function() {
    return this.view.buffer;
  }, l.load_file = typeof XMLHttpRequest > "u" ? Fr : Di;
  function Di(t, e, i) {
    function s() {
      const d = i || 0;
      setTimeout(
        () => {
          Di(t, e, d + 1);
        },
        1e3 * ([1, 1, 2, 3, 5, 8, 13, 21][d] || 34)
      );
    }
    var r = new XMLHttpRequest();
    if (r.open(e.method || "get", t, !0), r.responseType = e.as_json ? "json" : "arraybuffer", e.headers)
      for (var _ = Object.keys(e.headers), o = 0; o < _.length; o++) {
        var a = _[o];
        r.setRequestHeader(a, e.headers[a]);
      }
    e.range && (_ = e.range.start, r.setRequestHeader(
      "Range",
      "bytes=" + _ + "-" + (_ + e.range.length - 1)
    ), r.onreadystatechange = function() {
      r.status === 200 && r.abort();
    }), r.onload = function(d) {
      r.readyState === 4 && (r.status !== 200 && r.status !== 206 ? (console.error(
        "Loading the image " + t + " failed (status %d)",
        r.status
      ), 500 <= r.status && 600 > r.status && s()) : r.response && e.done && e.done(r.response, r));
    }, r.onerror = function(d) {
      console.error("Loading the image " + t + " failed", d), s();
    }, e.progress && (r.onprogress = function(d) {
      e.progress(d);
    }), r.send(null);
  }
  function Fr(t, e) {
    let i = require("fs");
    e.range ? (e.as_json, i.open(t, "r", (s, r) => {
      if (s)
        throw s;
      let _ = e.range.length;
      var o = Buffer.allocUnsafe(_);
      i.read(r, o, 0, _, e.range.start, (a, d) => {
        if (a)
          throw a;
        e.done && e.done(new Uint8Array(o)), i.close(r, (c) => {
          if (c)
            throw c;
        });
      });
    })) : i.readFile(
      t,
      { encoding: e.as_json ? "utf-8" : null },
      function(s, r) {
        s ? console.log("Could not read file:", t, s) : (s = r, s = e.as_json ? JSON.parse(s) : new Uint8Array(s).buffer, e.done(s));
      }
    );
  }
  l.read_sized_string_from_mem = function(t, e, i) {
    return String.fromCharCode(
      ...new Uint8Array(t.buffer, e >>> 0, i >>> 0)
    );
  }, function() {
    function t(o) {
      this.buffer = o, this.byteLength = o.byteLength, this.onprogress = this.onload = void 0;
    }
    function e(o, a, d) {
      this.filename = o, this.byteLength = a, this.block_cache = /* @__PURE__ */ new Map(), this.block_cache_is_write = /* @__PURE__ */ new Set(), this.fixed_chunk_size = d, this.cache_reads = !!d, this.onprogress = this.onload = void 0;
    }
    function i(o, a, d, c, u) {
      const p = o.match(/\.[^\.]+(\.zst)?$/);
      this.extension = p ? p[0] : "", this.basename = o.substring(0, o.length - this.extension.length), this.is_zstd = this.extension.endsWith(".zst"), this.basename.endsWith("/") || (this.basename += "-"), this.block_cache = /* @__PURE__ */ new Map(), this.block_cache_is_write = /* @__PURE__ */ new Set(), this.byteLength = a, this.fixed_chunk_size = d, this.partfile_alt_format = !!c, this.zstd_decompress = u, this.cache_reads = !!d, this.onprogress = this.onload = void 0;
    }
    function s(o) {
      this.file = o, this.byteLength = o.size, 1073741824 < o.size && console.warn(
        "SyncFileBuffer: Allocating buffer of " + (o.size >> 20) + " MB ..."
      ), this.buffer = new ArrayBuffer(o.size), this.onprogress = this.onload = void 0;
    }
    function r(o) {
      this.file = o, this.byteLength = o.size, this.block_cache = /* @__PURE__ */ new Map(), this.block_cache_is_write = /* @__PURE__ */ new Set(), this.onprogress = this.onload = void 0;
    }
    l.SyncBuffer = t, l.AsyncXHRBuffer = e, l.AsyncXHRPartfileBuffer = i, l.AsyncFileBuffer = r, l.SyncFileBuffer = s, l.buffer_from_object = function(o, a) {
      if (o.buffer instanceof ArrayBuffer)
        return new l.SyncBuffer(o.buffer);
      if (typeof File < "u" && o.buffer instanceof File)
        return a = o.async, a === void 0 && (a = 268435456 <= o.buffer.size), a ? new l.AsyncFileBuffer(o.buffer) : new l.SyncFileBuffer(o.buffer);
      if (o.url)
        return o.use_parts ? new l.AsyncXHRPartfileBuffer(
          o.url,
          o.size,
          o.fixed_chunk_size,
          !1,
          a
        ) : new l.AsyncXHRBuffer(
          o.url,
          o.size,
          o.fixed_chunk_size
        );
      n("Ignored file: url=" + o.url + " buffer=" + o.buffer);
    }, t.prototype.load = function() {
      this.onload && this.onload({ buffer: this.buffer });
    }, t.prototype.get = function(o, a, d) {
      o + a <= this.byteLength, d(new Uint8Array(this.buffer, o, a));
    }, t.prototype.set = function(o, a, d) {
      o + a.byteLength <= this.byteLength, new Uint8Array(this.buffer, o, a.byteLength).set(a), d();
    }, t.prototype.get_buffer = function(o) {
      o(this.buffer);
    }, t.prototype.get_state = function() {
      const o = [];
      return o[0] = this.byteLength, o[1] = new Uint8Array(this.buffer), o;
    }, t.prototype.set_state = function(o) {
      this.byteLength = o[0], this.buffer = o[1].slice().buffer;
    }, e.prototype.load = function() {
      this.byteLength !== void 0 ? this.onload && this.onload(/* @__PURE__ */ Object.create(null)) : _(this.filename, (o, a) => {
        if (o)
          throw Error("Cannot use: " + this.filename + ". " + o);
        this.byteLength = a, this.onload && this.onload(/* @__PURE__ */ Object.create(null));
      });
    }, e.prototype.get_from_cache = function(o, a) {
      var d = a / 256;
      o /= 256;
      for (var c = 0; c < d; c++)
        if (!this.block_cache.get(o + c))
          return;
      if (d === 1)
        return this.block_cache.get(o);
      for (a = new Uint8Array(a), c = 0; c < d; c++)
        a.set(this.block_cache.get(o + c), 256 * c);
      return a;
    }, e.prototype.get = function(o, a, d) {
      o + a <= this.byteLength;
      var c = this.get_from_cache(o, a);
      if (c)
        d(c);
      else {
        var u = o, p = a;
        this.fixed_chunk_size && (u = o - o % this.fixed_chunk_size, p = Math.ceil((o - u + a) / this.fixed_chunk_size) * this.fixed_chunk_size), l.load_file(this.filename, {
          done: (function(g) {
            g = new Uint8Array(g), this.handle_read(u, p, g), d(u === o && p === a ? g : g.subarray(o - u, o - u + a));
          }).bind(this),
          range: { start: u, length: p }
        });
      }
    }, e.prototype.set = function(o, a, d) {
      var c = a.length;
      o + a.byteLength <= this.byteLength, o /= 256, c /= 256;
      for (var u = 0; u < c; u++) {
        var p = this.block_cache.get(o + u);
        if (p === void 0)
          p = a.slice(256 * u, 256 * (u + 1)), this.block_cache.set(o + u, p);
        else {
          const g = a.subarray(256 * u, 256 * (u + 1));
          p.byteLength, g.length, p.set(g);
        }
        this.block_cache_is_write.add(o + u);
      }
      d();
    }, e.prototype.handle_read = function(o, a, d) {
      o /= 256, a /= 256;
      for (var c = 0; c < a; c++) {
        const u = this.block_cache.get(o + c);
        u ? d.set(u, 256 * c) : this.cache_reads && this.block_cache.set(
          o + c,
          d.slice(256 * c, 256 * (c + 1))
        );
      }
    }, e.prototype.get_buffer = function(o) {
      o();
    }, e.prototype.get_state = function() {
      const o = [], a = [];
      for (let [d, c] of this.block_cache)
        this.block_cache_is_write.has(d) && a.push([d, c]);
      return o[0] = a, o;
    }, e.prototype.set_state = function(o) {
      o = o[0], this.block_cache.clear(), this.block_cache_is_write.clear();
      for (let [a, d] of o)
        this.block_cache.set(a, d), this.block_cache_is_write.add(a);
    }, i.prototype.load = function() {
      this.byteLength === void 0 && void 0, this.onload && this.onload(/* @__PURE__ */ Object.create(null));
    }, i.prototype.get = function(o, a, d) {
      o + a <= this.byteLength;
      var c = this.get_from_cache(o, a);
      if (c)
        d(c);
      else if (this.fixed_chunk_size) {
        const p = Math.floor(o / this.fixed_chunk_size), g = o - p * this.fixed_chunk_size, f = Math.ceil((g + a) / this.fixed_chunk_size), w = new Uint8Array(f * this.fixed_chunk_size);
        let S = 0;
        for (let E = 0; E < f; E++) {
          var u = (p + E) * this.fixed_chunk_size;
          c = this.partfile_alt_format ? this.basename + (p + E + "").padStart(8, "0") + this.extension : this.basename + u + "-" + (u + this.fixed_chunk_size) + this.extension, (u = this.get_from_cache(u, this.fixed_chunk_size)) ? (w.set(u, E * this.fixed_chunk_size), S++, S === f && d(w.subarray(g, g + a))) : l.load_file(c, {
            done: (async function(H) {
              H = new Uint8Array(H), this.is_zstd && (H = await this.zstd_decompress(
                this.fixed_chunk_size,
                H
              ), H = new Uint8Array(H)), w.set(H, E * this.fixed_chunk_size), this.handle_read(
                (p + E) * this.fixed_chunk_size,
                this.fixed_chunk_size | 0,
                H
              ), S++, S === f && d(w.subarray(g, g + a));
            }).bind(this)
          });
        }
      } else
        l.load_file(
          this.basename + o + "-" + (o + a) + this.extension,
          {
            done: (function(p) {
              p.byteLength, p = new Uint8Array(p), this.handle_read(o, a, p), d(p);
            }).bind(this)
          }
        );
    }, i.prototype.get_from_cache = e.prototype.get_from_cache, i.prototype.set = e.prototype.set, i.prototype.handle_read = e.prototype.handle_read, i.prototype.get_state = e.prototype.get_state, i.prototype.set_state = e.prototype.set_state, s.prototype.load = function() {
      this.load_next(0);
    }, s.prototype.load_next = function(o) {
      var a = new FileReader();
      if (a.onload = (function(c) {
        c = new Uint8Array(c.target.result), new Uint8Array(this.buffer, o).set(c), this.load_next(o + 4194304);
      }).bind(this), this.onprogress && this.onprogress({
        loaded: o,
        total: this.byteLength,
        lengthComputable: !0
      }), o < this.byteLength) {
        var d = this.file.slice(
          o,
          Math.min(o + 4194304, this.byteLength)
        );
        a.readAsArrayBuffer(d);
      } else
        this.file = void 0, this.onload && this.onload({ buffer: this.buffer });
    }, s.prototype.get = t.prototype.get, s.prototype.set = t.prototype.set, s.prototype.get_buffer = t.prototype.get_buffer, s.prototype.get_state = t.prototype.get_state, s.prototype.set_state = t.prototype.set_state, r.prototype.load = function() {
      this.onload && this.onload(/* @__PURE__ */ Object.create(null));
    }, r.prototype.get = function(o, a, d) {
      var c = this.get_from_cache(o, a);
      c ? d(c) : (c = new FileReader(), c.onload = (function(u) {
        u = new Uint8Array(u.target.result), this.handle_read(o, a, u), d(u);
      }).bind(this), c.readAsArrayBuffer(this.file.slice(o, o + a)));
    }, r.prototype.get_from_cache = e.prototype.get_from_cache, r.prototype.set = e.prototype.set, r.prototype.handle_read = e.prototype.handle_read, r.prototype.get_state = e.prototype.get_state, r.prototype.set_state = e.prototype.set_state, r.prototype.get_buffer = function(o) {
      o();
    }, r.prototype.get_as_file = function(o) {
      for (var a = [], d = Array.from(this.block_cache.keys()).sort(
        function(f, w) {
          return f - w;
        }
      ), c = 0, u = 0; u < d.length; u++) {
        var p = d[u], g = this.block_cache.get(p);
        p *= 256, p !== c && (a.push(this.file.slice(c, p)), c = p), a.push(g), c += g.length;
      }
      return c !== this.file.size && a.push(this.file.slice(c)), o = new File(a, o), o.size, this.file.size, o;
    };
    var _ = typeof XMLHttpRequest > "u" ? function(o, a) {
      require("fs").stat(o, (d, c) => {
        d ? a(d) : a(null, c.size);
      });
    } : function(o, a) {
      l.load_file(o, {
        done: (d, c) => {
          d = c.getResponseHeader("Content-Range") || "", (c = d.match(/\/(\d+)\s*$/)) ? a(null, +c[1]) : a(
            "`Range: bytes=...` header not supported (Got `" + d + "`)"
          );
        },
        headers: { Range: "bytes=0-0" }
      });
    };
  }();
  var Br = 2048, Gr = 512;
  function _t(t, e, i, s, r, _) {
    this.master = new F(this, t, e, s, r, 0, _), this.slave = new F(this, t, i, !1, r, 1, _), this.current_interface = this.master, this.cpu = t, r === 0 ? (this.ata_port = 496, this.irq = 14, this.pci_id = 240) : r === 1 ? (this.ata_port = 368, this.irq = 15, this.pci_id = 248) : void 0, this.ata_port_high = this.ata_port | 516, this.master_port = 46080, this.pci_space = [
      134,
      128,
      16,
      112,
      5,
      0,
      160,
      2,
      0,
      128,
      1,
      1,
      0,
      0,
      0,
      0,
      this.ata_port & 255 | 1,
      this.ata_port >> 8,
      0,
      0,
      this.ata_port_high & 255 | 1,
      this.ata_port_high >> 8,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      this.master_port & 255 | 1,
      this.master_port >> 8,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      67,
      16,
      212,
      130,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      this.irq,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ], this.pci_bars = [{ size: 8 }, { size: 4 }, void 0, void 0, { size: 16 }], this.name = "ide" + r, this.device_control = 2, t.io.register_read(this.ata_port | 7, this, function() {
      return n("lower irq", m), this.cpu.device_lower_irq(this.irq), this.read_status();
    }), t.io.register_read(this.ata_port_high | 2, this, this.read_status), t.io.register_write(this.ata_port_high | 2, this, this.write_control), t.io.register_read(
      this.ata_port | 0,
      this,
      function() {
        return this.current_interface.read_data(1);
      },
      function() {
        return this.current_interface.read_data(2);
      },
      function() {
        return this.current_interface.read_data(4);
      }
    ), t.io.register_read(this.ata_port | 1, this, function() {
      return n(
        "Read error: " + h(this.current_interface.error & 255) + " slave=" + (this.current_interface === this.slave),
        m
      ), this.current_interface.error & 255;
    }), t.io.register_read(this.ata_port | 2, this, function() {
      return n(
        "Read bytecount: " + h(this.current_interface.bytecount & 255),
        m
      ), this.current_interface.bytecount & 255;
    }), t.io.register_read(this.ata_port | 3, this, function() {
      return n(
        "Read sector: " + h(this.current_interface.sector & 255),
        m
      ), this.current_interface.sector & 255;
    }), t.io.register_read(this.ata_port | 4, this, function() {
      return n(
        "Read 1F4: " + h(this.current_interface.cylinder_low & 255),
        m
      ), this.current_interface.cylinder_low & 255;
    }), t.io.register_read(this.ata_port | 5, this, function() {
      return n(
        "Read 1F5: " + h(this.current_interface.cylinder_high & 255),
        m
      ), this.current_interface.cylinder_high & 255;
    }), t.io.register_read(this.ata_port | 6, this, function() {
      return n("Read 1F6", m), this.current_interface.drive_head & 255;
    }), t.io.register_write(
      this.ata_port | 0,
      this,
      function(o) {
        this.current_interface.write_data_port8(o);
      },
      function(o) {
        this.current_interface.write_data_port16(o);
      },
      function(o) {
        this.current_interface.write_data_port32(o);
      }
    ), t.io.register_write(this.ata_port | 1, this, function(o) {
      n("1F1/lba_count: " + h(o), m), this.master.lba_count = (this.master.lba_count << 8 | o) & 65535, this.slave.lba_count = (this.slave.lba_count << 8 | o) & 65535;
    }), t.io.register_write(this.ata_port | 2, this, function(o) {
      n("1F2/bytecount: " + h(o), m), this.master.bytecount = (this.master.bytecount << 8 | o) & 65535, this.slave.bytecount = (this.slave.bytecount << 8 | o) & 65535;
    }), t.io.register_write(this.ata_port | 3, this, function(o) {
      n("1F3/sector: " + h(o), m), this.master.sector = (this.master.sector << 8 | o) & 65535, this.slave.sector = (this.slave.sector << 8 | o) & 65535;
    }), t.io.register_write(this.ata_port | 4, this, function(o) {
      n("1F4/sector low: " + h(o), m), this.master.cylinder_low = (this.master.cylinder_low << 8 | o) & 65535, this.slave.cylinder_low = (this.slave.cylinder_low << 8 | o) & 65535;
    }), t.io.register_write(this.ata_port | 5, this, function(o) {
      n("1F5/sector high: " + h(o), m), this.master.cylinder_high = (this.master.cylinder_high << 8 | o) & 65535, this.slave.cylinder_high = (this.slave.cylinder_high << 8 | o) & 65535;
    }), t.io.register_write(this.ata_port | 6, this, function(o) {
      var a = o & 16;
      n("1F6/drive: " + h(o, 2), m), a ? (n("Slave", m), this.current_interface = this.slave) : this.current_interface = this.master, this.master.drive_head = o, this.slave.drive_head = o, this.master.is_lba = this.slave.is_lba = o >> 6 & 1, this.master.head = this.slave.head = o & 15;
    }), this.dma_command = this.dma_status = this.prdt_addr = 0, t.io.register_write(this.ata_port | 7, this, function(o) {
      n("lower irq", m), this.cpu.device_lower_irq(this.irq), this.current_interface.ata_command(o);
    }), t.io.register_read(
      this.master_port | 4,
      this,
      void 0,
      void 0,
      this.dma_read_addr
    ), t.io.register_write(
      this.master_port | 4,
      this,
      void 0,
      void 0,
      this.dma_set_addr
    ), t.io.register_read(
      this.master_port,
      this,
      this.dma_read_command8,
      void 0,
      this.dma_read_command
    ), t.io.register_write(
      this.master_port,
      this,
      this.dma_write_command8,
      void 0,
      this.dma_write_command
    ), t.io.register_read(this.master_port | 2, this, this.dma_read_status), t.io.register_write(this.master_port | 2, this, this.dma_write_status), t.io.register_read(this.master_port | 8, this, function() {
      return n("DMA read 0x8", m), 0;
    }), t.io.register_read(this.master_port | 10, this, function() {
      return n("DMA read 0xA", m), 0;
    }), t.devices.pci.register_device(this);
  }
  _t.prototype.read_status = function() {
    if (this.current_interface.buffer) {
      var t = this.current_interface.status;
      return n("ATA read status: " + h(t, 2), m), t;
    }
    return 0;
  }, _t.prototype.write_control = function(t) {
    n(
      "set device control: " + h(t, 2) + " interrupts " + (t & 2 ? "disabled" : "enabled"),
      m
    ), t & 4 && (n("Reset via control port", m), this.cpu.device_lower_irq(this.irq), this.master.device_reset(), this.slave.device_reset()), this.device_control = t;
  }, _t.prototype.dma_read_addr = function() {
    return n("dma get address: " + h(this.prdt_addr, 8), m), this.prdt_addr;
  }, _t.prototype.dma_set_addr = function(t) {
    n("dma set address: " + h(t, 8), m), this.prdt_addr = t;
  }, _t.prototype.dma_read_status = function() {
    return n("DMA read status: " + h(this.dma_status), m), this.dma_status;
  }, _t.prototype.dma_write_status = function(t) {
    n("DMA set status: " + h(t), m), this.dma_status &= ~(t & 6);
  }, _t.prototype.dma_read_command = function() {
    return this.dma_read_command8() | this.dma_read_status() << 16;
  }, _t.prototype.dma_read_command8 = function() {
    return n("DMA read command: " + h(this.dma_command), m), this.dma_command;
  }, _t.prototype.dma_write_command = function(t) {
    n("DMA write command: " + h(t), m), this.dma_write_command8(t & 255), this.dma_write_status(t >> 16 & 255);
  }, _t.prototype.dma_write_command8 = function(t) {
    n("DMA write command8: " + h(t), m);
    let e = this.dma_command;
    if (this.dma_command = t & 9, (e & 1) !== (t & 1))
      if (!(t & 1))
        this.dma_status &= -2;
      else
        switch (this.dma_status |= 1, this.current_interface.current_command) {
          case 37:
          case 200:
            this.current_interface.do_ata_read_sectors_dma();
            break;
          case 202:
          case 53:
            this.current_interface.do_ata_write_sectors_dma();
            break;
          case 160:
            this.current_interface.do_atapi_dma();
            break;
          default:
            n(
              "Spurious dma command write, current command: " + h(this.current_interface.current_command),
              m
            );
        }
  }, _t.prototype.push_irq = function() {
    !(this.device_control & 2) && (n("push irq", m), this.dma_status |= 4, this.cpu.device_raise_irq(this.irq));
  }, _t.prototype.get_state = function() {
    var t = [];
    return t[0] = this.master, t[1] = this.slave, t[2] = this.ata_port, t[3] = this.irq, t[4] = this.pci_id, t[5] = this.ata_port_high, t[6] = this.master_port, t[7] = this.name, t[8] = this.device_control, t[9] = this.prdt_addr, t[10] = this.dma_status, t[11] = this.current_interface === this.master, t[12] = this.dma_command, t;
  }, _t.prototype.set_state = function(t) {
    this.master.set_state(t[0]), this.slave.set_state(t[1]), this.ata_port = t[2], this.irq = t[3], this.pci_id = t[4], this.ata_port_high = t[5], this.master_port = t[6], this.name = t[7], this.device_control = t[8], this.prdt_addr = t[9], this.dma_status = t[10], this.current_interface = t[11] ? this.master : this.slave, this.dma_command = t[12];
  };
  function F(t, e, i, s, r, _, o) {
    this.device = t, this.bus = o, this.nr = r, this.cpu = e, this.buffer = i, this.sector_size = s ? Br : Gr, this.is_atapi = s, this.cylinder_count = this.sectors_per_track = this.head_count = this.sector_count = 0, this.buffer && (this.sector_count = this.buffer.byteLength / this.sector_size, this.sector_count !== (this.sector_count | 0) && (n(
      "Warning: Disk size not aligned with sector size",
      m
    ), this.sector_count = Math.ceil(this.sector_count)), s ? (this.head_count = 1, this.sectors_per_track = 0) : (this.head_count = 16, this.sectors_per_track = 63), this.cylinder_count = this.sector_count / this.head_count / this.sectors_per_track, this.cylinder_count !== (this.cylinder_count | 0) && (n(
      "Warning: Rounding up cylinder count. Choose different head number",
      m
    ), this.cylinder_count = Math.floor(this.cylinder_count)), t = e.devices.rtc, t.cmos_write(
      Gi,
      t.cmos_read(Gi) | 1 << 4 * this.nr
    ), t.cmos_write(
      Bi,
      t.cmos_read(Bi) & 15 | 240
    ), e = on, t.cmos_write(e + 0, this.cylinder_count & 255), t.cmos_write(e + 1, this.cylinder_count >> 8 & 255), t.cmos_write(e + 2, this.head_count & 255), t.cmos_write(e + 3, 255), t.cmos_write(e + 4, 255), t.cmos_write(e + 5, 200), t.cmos_write(e + 6, this.cylinder_count & 255), t.cmos_write(e + 7, this.cylinder_count >> 8 & 255), t.cmos_write(e + 8, this.sectors_per_track & 255)), this.stats = {
      sectors_read: 0,
      sectors_written: 0,
      bytes_read: 0,
      bytes_written: 0,
      loading: !1
    }, this.buffer = i, this.drive_head = this.head = this.cylinder_high = this.cylinder_low = this.lba_count = this.sector = this.bytecount = this.is_lba = 0, this.status = 80, this.sectors_per_drq = 128, this.data_pointer = this.error = 0, this.data = new Uint8Array(65536), this.data16 = new Uint16Array(this.data.buffer), this.data32 = new Int32Array(this.data.buffer), this.data_end = this.data_length = 0, this.current_atapi_command = this.current_command = -1, this.last_io_id = this.write_dest = 0, this.in_progress_io_ids = /* @__PURE__ */ new Set(), this.cancelled_io_ids = /* @__PURE__ */ new Set(), Object.seal(this);
  }
  F.prototype.device_reset = function() {
    this.is_atapi ? (this.status = 0, this.sector = this.error = this.bytecount = 1, this.cylinder_low = 20, this.cylinder_high = 235) : (this.status = 81, this.sector = this.error = this.bytecount = 1, this.cylinder_high = this.cylinder_low = 0), this.cancel_io_operations();
  }, F.prototype.push_irq = function() {
    this.device.push_irq();
  }, F.prototype.ata_command = function(t) {
    if (n(
      "ATA Command: " + h(t) + " slave=" + (this.drive_head >> 4 & 1),
      m
    ), this.buffer)
      switch (this.current_command = t, this.error = 0, t) {
        case 8:
          n("ATA device reset", m), this.data_length = this.data_end = this.data_pointer = 0, this.device_reset(), this.push_irq();
          break;
        case 16:
          this.status = 80, this.cylinder_low = 0, this.push_irq();
          break;
        case 248:
          this.status = 80, t = this.sector_count - 1, this.sector = t & 255, this.cylinder_low = t >> 8 & 255, this.cylinder_high = t >> 16 & 255, this.drive_head = this.drive_head & 240 | t >> 24 & 15, this.push_irq();
          break;
        case 39:
          this.status = 80, t = this.sector_count - 1, this.sector = t & 255, this.cylinder_low = t >> 8 & 255, this.cylinder_high = t >> 16 & 255, this.sector |= t >> 24 << 8 & 65280, this.push_irq();
          break;
        case 32:
        case 36:
        case 41:
        case 196:
          this.ata_read_sectors(t);
          break;
        case 48:
        case 52:
        case 57:
        case 197:
          this.ata_write_sectors(t);
          break;
        case 144:
          this.push_irq(), this.error = 257, this.status = 80;
          break;
        case 145:
          this.status = 80, this.push_irq();
          break;
        case 160:
          this.is_atapi && (this.status = 88, this.data_allocate(12), this.data_end = 12, this.bytecount = 1, this.push_irq());
          break;
        case 161:
          n("ATA identify packet device", m), this.is_atapi ? (this.create_identify_packet(), this.status = 88, this.cylinder_low = 20, this.cylinder_high = 235) : this.status = 65, this.push_irq();
          break;
        case 198:
          n(
            "Logical sectors per DRQ Block: " + h(this.bytecount & 255),
            m
          ), this.sectors_per_drq = this.bytecount & 255, this.status = 80, this.push_irq();
          break;
        case 37:
        case 200:
          this.ata_read_sectors_dma(t);
          break;
        case 53:
        case 202:
          this.ata_write_sectors_dma(t);
          break;
        case 64:
          n("read verify sectors", m), this.status = 80, this.push_irq();
          break;
        case 218:
          n("Unimplemented: get media status", m), this.status = 65, this.error = 4, this.push_irq();
          break;
        case 224:
          n("ATA standby immediate", m), this.status = 80, this.push_irq();
          break;
        case 225:
          n("ATA idle immediate", m), this.status = 80, this.push_irq();
          break;
        case 231:
          n("ATA flush cache", m), this.status = 80, this.push_irq();
          break;
        case 236:
          if (n("ATA identify device", m), this.is_atapi) {
            this.status = 65, this.error = 4, this.push_irq();
            break;
          }
          this.create_identify_packet(), this.status = 88, this.push_irq();
          break;
        case 234:
          n("flush cache ext", m), this.status = 80, this.push_irq();
          break;
        case 239:
          n(
            "set features: " + h(this.bytecount & 255),
            m
          ), this.status = 80, this.push_irq();
          break;
        case 222:
          this.status = 80, this.push_irq();
          break;
        case 245:
          n("security freeze lock", m), this.status = 80, this.push_irq();
          break;
        case 249:
          n("Unimplemented: set max address", m), this.status = 65, this.error = 4;
          break;
        default:
          "" + h(t), this.status = 65, this.error = 4;
      }
    else
      n("abort: No buffer", m), this.error = 4, this.status = 65, this.push_irq();
  }, F.prototype.atapi_handle = function() {
    switch (n(
      "ATAPI Command: " + h(this.data[0]) + " slave=" + (this.drive_head >> 4 & 1),
      m
    ), this.data_pointer = 0, this.current_atapi_command = this.data[0], this.current_atapi_command) {
      case 0:
        n("test unit ready", m), this.data_allocate(0), this.data_end = this.data_length, this.status = 80;
        break;
      case 3:
        this.data_allocate(this.data[4]), this.data_end = this.data_length, this.status = 88, this.data[0] = 240, this.data[2] = 5, this.data[7] = 8;
        break;
      case 18:
        var t = this.data[4];
        this.status = 88, n(
          "inquiry: " + h(this.data[1], 2) + " length=" + t,
          m
        ), this.data.set([
          5,
          128,
          1,
          49,
          31,
          0,
          0,
          0,
          83,
          79,
          78,
          89,
          32,
          32,
          32,
          32,
          67,
          68,
          45,
          82,
          79,
          77,
          32,
          67,
          68,
          85,
          45,
          49,
          48,
          48,
          48,
          32,
          49,
          46,
          49,
          97
        ]), this.data_end = this.data_length = Math.min(36, t);
        break;
      case 26:
        this.data_allocate(this.data[4]), this.data_end = this.data_length, this.status = 88;
        break;
      case 30:
        this.data_allocate(0), this.data_end = this.data_length, this.status = 80;
        break;
      case 37:
        t = this.sector_count - 1, this.data_set(
          new Uint8Array([
            t >> 24 & 255,
            t >> 16 & 255,
            t >> 8 & 255,
            t & 255,
            0,
            0,
            this.sector_size >> 8 & 255,
            this.sector_size & 255
          ])
        ), this.data_end = this.data_length, this.status = 88;
        break;
      case 40:
        this.lba_count & 1 ? this.atapi_read_dma(this.data) : this.atapi_read(this.data);
        break;
      case 66:
        t = this.data[8], this.data_allocate(Math.min(8, t)), this.data_end = this.data_length, n("read q subcode: length=" + t, m), this.status = 88;
        break;
      case 67:
        t = this.data[8] | this.data[7] << 8;
        var e = this.data[9] >> 6;
        this.data_allocate(t), this.data_end = this.data_length, n(
          "read toc: " + h(e, 2) + " length=" + t + " " + (this.data[1] & 2) + " " + h(this.data[6]),
          m
        ), e === 0 ? (t = this.sector_count, this.data.set(
          new Uint8Array([
            0,
            18,
            1,
            1,
            0,
            20,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            22,
            170,
            0,
            t >> 24,
            t >> 16 & 255,
            t >> 8 & 255,
            t & 255
          ])
        )) : e === 1 ? this.data.set(
          new Uint8Array([0, 10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0])
        ) : void 0, this.status = 88;
        break;
      case 70:
        t = this.data[8] | this.data[7] << 8, t = Math.min(t, 32), this.data_allocate(t), this.data_end = this.data_length, this.data[0] = t - 4 >> 24 & 255, this.data[1] = t - 4 >> 16 & 255, this.data[2] = t - 4 >> 8 & 255, this.data[3] = t - 4 & 255, this.data[6] = 8, this.data[10] = 3, this.status = 88;
        break;
      case 81:
        this.data_allocate(0), this.data_end = this.data_length, this.status = 80;
        break;
      case 82:
        n(
          "Unimplemented ATAPI command: " + h(this.data[0]),
          m
        ), this.status = 81, this.data_length = 0, this.error = 80;
        break;
      case 90:
        t = this.data[8] | this.data[7] << 8, e = this.data[2], n("mode sense: " + h(e) + " length=" + t, m), e === 42 && this.data_allocate(Math.min(30, t)), this.data_end = this.data_length, this.status = 88;
        break;
      case 189:
        this.data_allocate(this.data[9] | this.data[8] << 8), this.data_end = this.data_length, this.data[5] = 1, this.status = 88;
        break;
      case 74:
        this.status = 81, this.data_length = 0, this.error = 80, n(
          "Unimplemented ATAPI command: " + h(this.data[0]),
          m
        );
        break;
      case 190:
        n(
          "Unimplemented ATAPI command: " + h(this.data[0]),
          m
        ), this.data_allocate(0), this.data_end = this.data_length, this.status = 80;
        break;
      default:
        this.status = 81, this.data_length = 0, this.error = 80, n(
          "Unimplemented ATAPI command: " + h(this.data[0]),
          m
        );
    }
    this.bytecount = this.bytecount & -8 | 2, !(this.status & 128) && this.push_irq(), !(this.status & 128) && this.data_length === 0 && (this.bytecount |= 1, this.status &= -9);
  }, F.prototype.do_write = function() {
    this.status = 80, this.data_length <= this.data.length;
    var t = this.data.subarray(0, this.data_length);
    this.data_length % 512, this.ata_advance(this.current_command, this.data_length / 512), this.push_irq(), this.buffer.set(this.write_dest, t, function() {
    }), this.report_write(this.data_length);
  }, F.prototype.atapi_read = function(t) {
    var e = t[2] << 24 | t[3] << 16 | t[4] << 8 | t[5], i = t[7] << 8 | t[8];
    t = t[1];
    var s = i * this.sector_size, r = e * this.sector_size;
    n(
      "CD read lba=" + h(e) + " lbacount=" + h(i) + " bytecount=" + h(s) + " flags=" + h(t),
      m
    ), this.data_length = 0;
    var _ = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
    n(
      h(this.cylinder_high, 2) + " " + h(this.cylinder_low, 2),
      m
    ), this.cylinder_low = this.cylinder_high = 0, _ === 65535 && _--, _ > s && (_ = s), r >= this.buffer.byteLength ? ("" + h(r + s) + h(this.buffer.byteLength), this.status = 255, this.push_irq()) : s === 0 ? (this.status = 80, this.data_pointer = 0) : (s = Math.min(s, this.buffer.byteLength - r), this.status = 208, this.report_read_start(), this.read_buffer(r, s, (o) => {
      n("cd read: data arrived", m), this.data_set(o), this.status = 88, this.bytecount = this.bytecount & -8 | 2, this.push_irq(), this.data_end = _ &= -4, this.data_end > this.data_length && (this.data_end = this.data_length), this.cylinder_low = this.data_end & 255, this.cylinder_high = this.data_end >> 8 & 255, this.report_read_end(s);
    }));
  }, F.prototype.atapi_read_dma = function(t) {
    var e = t[2] << 24 | t[3] << 16 | t[4] << 8 | t[5], i = t[7] << 8 | t[8];
    t = t[1];
    var s = i * this.sector_size, r = e * this.sector_size;
    n(
      "CD read DMA lba=" + h(e) + " lbacount=" + h(i) + " bytecount=" + h(s) + " flags=" + h(t),
      m
    ), r >= this.buffer.byteLength ? ("" + h(r + s) + h(this.buffer.byteLength), this.status = 255, this.push_irq()) : (this.status = 208, this.report_read_start(), this.read_buffer(r, s, (_) => {
      n("atapi_read_dma: Data arrived"), this.report_read_end(s), this.status = 88, this.bytecount = this.bytecount & -8 | 2, this.data_set(_), this.do_atapi_dma();
    }));
  }, F.prototype.do_atapi_dma = function() {
    if (!(this.device.dma_status & 1))
      n("do_atapi_dma: Status not set", m);
    else if (!(this.status & 8))
      n("do_atapi_dma: DRQ not set", m);
    else {
      n("atapi dma transfer len=" + this.data_length, m);
      var t = this.device.prdt_addr, e = 0, i = this.data;
      do {
        var s = this.cpu.read32s(t), r = this.cpu.read16(t + 4), _ = this.cpu.read8(t + 7) & 128;
        if (r || (r = 65536), n(
          "dma read dest=" + h(s) + " count=" + h(r) + " datalen=" + h(this.data_length),
          m
        ), this.cpu.write_blob(
          i.subarray(e, Math.min(e + r, this.data_length)),
          s
        ), e += r, t += 8, e >= this.data_length && !_) {
          n(
            "leave early end=" + +_ + " offset=" + h(e) + " data_length=" + h(this.data_length) + " cmd=" + h(this.current_command),
            m
          );
          break;
        }
      } while (!_);
      n("end offset=" + e, m), this.status = 80, this.device.dma_status &= -2, this.bytecount = this.bytecount & -8 | 3, this.push_irq();
    }
  }, F.prototype.read_data = function(t) {
    if (this.data_pointer < this.data_end) {
      this.data_pointer + t - 1 < this.data_end, this.data_pointer % t, h(this.data_pointer) + "" + t;
      var e = t === 1 ? this.data[this.data_pointer] : t === 2 ? this.data16[this.data_pointer >>> 1] : this.data32[this.data_pointer >>> 2];
      return this.data_pointer += t, !(this.data_pointer & (this.data_end & 4095 ? 255 : 4095)) && n(
        "Read 1F0: " + h(this.data[this.data_pointer], 2) + " cur=" + h(this.data_pointer) + " cnt=" + h(this.data_length),
        m
      ), this.data_pointer >= this.data_end && this.read_end(), e;
    }
    return n("Read 1F0: empty", m), this.data_pointer += t, 0;
  }, F.prototype.read_end = function() {
    if (n(
      "read_end cmd=" + h(this.current_command) + " data_pointer=" + h(this.data_pointer) + " end=" + h(this.data_end) + " length=" + h(this.data_length),
      m
    ), this.current_command === 160)
      if (this.data_end === this.data_length)
        this.status = 80, this.bytecount = this.bytecount & -8 | 3, this.push_irq();
      else {
        this.status = 88, this.bytecount = this.bytecount & -8 | 2, this.push_irq();
        var t = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
        this.data_end + t > this.data_length ? (this.cylinder_low = this.data_length - this.data_end & 255, this.cylinder_high = this.data_length - this.data_end >> 8 & 255, this.data_end = this.data_length) : this.data_end += t, n("data_end=" + h(this.data_end), m);
      }
    else
      this.error = 0, this.data_pointer >= this.data_length ? this.status = 80 : (this.current_command === 196 || this.current_command === 41 ? (t = Math.min(
        this.sectors_per_drq,
        (this.data_length - this.data_end) / 512
      ), void 0) : (this.current_command === 32 || this.current_command, t = 1), this.ata_advance(this.current_command, t), this.data_end += 512 * t, this.status = 88), this.push_irq();
  }, F.prototype.write_data_port = function(t, e) {
    this.data_pointer % e, this.data_pointer >= this.data_end ? n(
      "Redundant write to data port: " + h(t) + " count=" + h(this.data_end) + " cur=" + h(this.data_pointer),
      m
    ) : ((!(this.data_pointer + e & (this.data_end & 4095 ? 255 : 4095)) || 20 > this.data_end) && n(
      "Data port: " + h(t >>> 0) + " count=" + h(this.data_end) + " cur=" + h(this.data_pointer),
      m
    ), e === 1 ? this.data[this.data_pointer++] = t : e === 2 ? (this.data16[this.data_pointer >>> 1] = t, this.data_pointer += 2) : (this.data32[this.data_pointer >>> 2] = t, this.data_pointer += 4), this.data_pointer <= this.data_end, this.data_pointer === this.data_end && this.write_end());
  }, F.prototype.write_data_port8 = function(t) {
    this.write_data_port(t, 1);
  }, F.prototype.write_data_port16 = function(t) {
    this.write_data_port(t, 2);
  }, F.prototype.write_data_port32 = function(t) {
    this.write_data_port(t, 4);
  }, F.prototype.write_end = function() {
    this.current_command === 160 ? this.atapi_handle() : (n(
      "write_end data_pointer=" + h(this.data_pointer) + " data_length=" + h(this.data_length),
      m
    ), this.data_pointer >= this.data_length ? this.do_write() : (this.current_command === 48 || this.current_command === 52 || this.current_command, "" + h(this.current_command), this.status = 88, this.data_end += 512, this.push_irq()));
  }, F.prototype.ata_advance = function(t, e) {
    n(
      "Advance sectors=" + e + " old_bytecount=" + this.bytecount,
      m
    ), this.bytecount -= e, t === 36 || t === 41 || t === 52 || t === 57 || t === 37 || t === 53 ? (t = e + this.get_lba48(), this.sector = t & 255 | t >> 16 & 65280, this.cylinder_low = t >> 8 & 255, this.cylinder_high = t >> 16 & 255) : this.is_lba ? (t = e + this.get_lba28(), this.sector = t & 255, this.cylinder_low = t >> 8 & 255, this.cylinder_high = t >> 16 & 255, this.head = this.head & -16 | t & 15) : (t = e + this.get_chs(), e = t / (this.head_count * this.sectors_per_track) | 0, this.cylinder_low = e & 255, this.cylinder_high = e >> 8 & 255, this.head = (t / this.sectors_per_track | 0) % this.head_count & 15, this.sector = t % this.sectors_per_track + 1 & 255, this.get_chs(), void 0);
  }, F.prototype.ata_read_sectors = function(t) {
    var e = t === 36 || t === 41, i = this.get_count(e);
    e = this.get_lba(e);
    var s = t === 32 || t === 36, r = i * this.sector_size, _ = e * this.sector_size;
    n(
      "ATA read cmd=" + h(t) + " mode=" + (this.is_lba ? "lba" : "chs") + " lba=" + h(e) + " lbacount=" + h(i) + " bytecount=" + h(r),
      m
    ), _ + r > this.buffer.byteLength ? (this.status = 255, this.push_irq()) : (this.status = 192, this.report_read_start(), this.read_buffer(_, r, (o) => {
      n("ata_read: Data arrived", m), this.data_set(o), this.status = 88, this.data_end = s ? 512 : Math.min(r, 512 * this.sectors_per_drq), this.ata_advance(
        t,
        s ? 1 : Math.min(i, this.sectors_per_track)
      ), this.push_irq(), this.report_read_end(r);
    }));
  }, F.prototype.ata_read_sectors_dma = function(t) {
    var e = t === 37;
    t = this.get_count(e), e = this.get_lba(e);
    var i = t * this.sector_size, s = e * this.sector_size;
    n(
      "ATA DMA read lba=" + h(e) + " lbacount=" + h(t) + " bytecount=" + h(i),
      m
    ), s + i > this.buffer.byteLength ? (this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1);
  }, F.prototype.do_ata_read_sectors_dma = function() {
    var t = this.current_command === 37, e = this.get_count(t);
    t = this.get_lba(t);
    var i = e * this.sector_size, s = t * this.sector_size;
    t < this.buffer.byteLength, this.report_read_start(), this.device.prdt_addr, this.read_buffer(s, i, (r) => {
      n("do_ata_read_sectors_dma: Data arrived", m);
      var _ = this.device.prdt_addr, o = 0;
      do {
        var a = this.cpu.read32s(_), d = this.cpu.read16(_ + 4), c = this.cpu.read8(_ + 7) & 128;
        d || (d = 65536, n("dma: prd count was 0", m)), n(
          "dma read transfer dest=" + h(a) + " prd_count=" + h(d),
          m
        ), this.cpu.write_blob(r.subarray(o, o + d), a), o += d, _ += 8;
      } while (!c);
      this.ata_advance(this.current_command, e), this.status = 80, this.device.dma_status &= -2, this.current_command = -1, this.push_irq(), this.report_read_end(i);
    });
  }, F.prototype.ata_write_sectors = function(t) {
    var e = t === 52 || t === 57, i = this.get_count(e);
    e = this.get_lba(e), t = t === 48 || t === 52;
    var s = i * this.sector_size, r = e * this.sector_size;
    n(
      "ATA write lba=" + h(e) + " mode=" + (this.is_lba ? "lba" : "chs") + " lbacount=" + h(i) + " bytecount=" + h(s),
      m
    ), r + s > this.buffer.byteLength ? (this.status = 255, this.push_irq()) : (this.status = 88, this.data_allocate_noclear(s), this.data_end = t ? 512 : Math.min(s, 512 * this.sectors_per_drq), this.write_dest = r);
  }, F.prototype.ata_write_sectors_dma = function(t) {
    var e = t === 53;
    t = this.get_count(e), e = this.get_lba(e);
    var i = t * this.sector_size, s = e * this.sector_size;
    n(
      "ATA DMA write lba=" + h(e) + " lbacount=" + h(t) + " bytecount=" + h(i),
      m
    ), s + i > this.buffer.byteLength ? (this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1);
  }, F.prototype.do_ata_write_sectors_dma = function() {
    var t = this.current_command === 53, e = this.get_count(t), i = this.get_lba(t);
    t = e * this.sector_size, i *= this.sector_size;
    var s = this.device.prdt_addr, r = 0;
    n("prdt addr: " + h(s, 8), m);
    const _ = new Uint8Array(t);
    do {
      var o = this.cpu.read32s(s), a = this.cpu.read16(s + 4), d = this.cpu.read8(s + 7) & 128;
      a || (a = 65536, n("dma: prd count was 0", m)), n(
        "dma write transfer dest=" + h(o) + " prd_count=" + h(a),
        m
      ), o = this.cpu.mem8.subarray(o, o + a), o.length, _.set(o, r), r += a, s += 8;
    } while (!d);
    _.length, this.buffer.set(i, _, () => {
      n("dma write completed", m), this.ata_advance(this.current_command, e), this.status = 80, this.push_irq(), this.device.dma_status &= -2, this.current_command = -1;
    }), this.report_write(t);
  }, F.prototype.get_chs = function() {
    var t = this.cylinder_low & 255 | this.cylinder_high << 8 & 65280, e = this.head, i = this.sector & 255;
    return n("get_chs: c=" + t + " h=" + e + " s=" + i, m), (t * this.head_count + e) * this.sectors_per_track + i - 1;
  }, F.prototype.get_lba28 = function() {
    return this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | (this.head & 15) << 24;
  }, F.prototype.get_lba48 = function() {
    return (this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | this.sector >> 8 << 24 & 4278190080) >>> 0;
  }, F.prototype.get_lba = function(t) {
    return t ? this.get_lba48() : this.is_lba ? this.get_lba28() : this.get_chs();
  }, F.prototype.get_count = function(t) {
    return t ? (t = this.bytecount, t === 0 && (t = 65536)) : (t = this.bytecount & 255, t === 0 && (t = 256)), t;
  }, F.prototype.create_identify_packet = function() {
    if (this.drive_head & 16)
      this.data_allocate(0);
    else {
      for (var t = 0; 512 > t; t++)
        this.data[t] = 0;
      t = Math.min(16383, this.cylinder_count), this.data_set([
        64,
        this.is_atapi ? 133 : 0,
        t,
        t >> 8,
        0,
        0,
        this.head_count,
        this.head_count >> 8,
        this.sectors_per_track / 512,
        this.sectors_per_track / 512 >> 8,
        0,
        2,
        this.sectors_per_track,
        this.sectors_per_track >> 8,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        0,
        0,
        2,
        4,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        56,
        118,
        32,
        54,
        68,
        72,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        128,
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        0,
        2,
        0,
        2,
        7,
        0,
        t,
        t >> 8,
        this.head_count,
        this.head_count >> 8,
        this.sectors_per_track,
        0,
        this.sector_count & 255,
        this.sector_count >> 8 & 255,
        this.sector_count >> 16 & 255,
        this.sector_count >> 24 & 255,
        0,
        0,
        this.sector_count & 255,
        this.sector_count >> 8 & 255,
        this.sector_count >> 16 & 255,
        this.sector_count >> 24 & 255,
        0,
        0,
        this.current_command === 160 ? 0 : 7,
        this.current_command === 160 ? 0 : 4,
        0,
        0,
        30,
        0,
        30,
        0,
        30,
        0,
        30,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        126,
        0,
        0,
        0,
        0,
        0,
        0,
        116,
        0,
        64,
        0,
        64,
        0,
        116,
        0,
        64,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        96,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        this.sector_count & 255,
        this.sector_count >> 8 & 255,
        this.sector_count >> 16 & 255,
        this.sector_count >> 24 & 255
      ]), this.data_end = this.data_length = 512;
    }
  }, F.prototype.data_allocate = function(t) {
    this.data_allocate_noclear(t);
    for (var e = 0; e < t + 3 >> 2; e++)
      this.data32[e] = 0;
  }, F.prototype.data_allocate_noclear = function(t) {
    this.data.length < t && (this.data = new Uint8Array(t + 3 & -4), this.data16 = new Uint16Array(this.data.buffer), this.data32 = new Int32Array(this.data.buffer)), this.data_length = t, this.data_pointer = 0;
  }, F.prototype.data_set = function(t) {
    this.data_allocate_noclear(t.length), this.data.set(t);
  }, F.prototype.report_read_start = function() {
    this.stats.loading = !0, this.bus.send("ide-read-start");
  }, F.prototype.report_read_end = function(t) {
    this.stats.loading = !1;
    var e = t / this.sector_size | 0;
    this.stats.sectors_read += e, this.stats.bytes_read += t, this.bus.send("ide-read-end", [this.nr, t, e]);
  }, F.prototype.report_write = function(t) {
    var e = t / this.sector_size | 0;
    this.stats.sectors_written += e, this.stats.bytes_written += t, this.bus.send("ide-write-end", [this.nr, t, e]);
  }, F.prototype.read_buffer = function(t, e, i) {
    const s = this.last_io_id++;
    this.in_progress_io_ids.add(s), this.buffer.get(t, e, (r) => {
      this.cancelled_io_ids.delete(s) ? (this.in_progress_io_ids.has(s), void 0) : (this.in_progress_io_ids.delete(s), i(r));
    });
  }, F.prototype.cancel_io_operations = function() {
    for (const t of this.in_progress_io_ids)
      this.cancelled_io_ids.add(t);
    this.in_progress_io_ids.clear();
  }, F.prototype.get_state = function() {
    var t = [];
    return t[0] = this.bytecount, t[1] = this.cylinder_count, t[2] = this.cylinder_high, t[3] = this.cylinder_low, t[4] = this.data_pointer, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = this.drive_head, t[10] = this.error, t[11] = this.head, t[12] = this.head_count, t[13] = this.is_atapi, t[14] = this.is_lba, t[15] = this.lba_count, t[16] = this.data, t[17] = this.data_length, t[18] = this.sector, t[19] = this.sector_count, t[20] = this.sector_size, t[21] = this.sectors_per_drq, t[22] = this.sectors_per_track, t[23] = this.status, t[24] = this.write_dest, t[25] = this.current_command, t[26] = this.data_end, t[27] = this.current_atapi_command, t[28] = this.buffer, t;
  }, F.prototype.set_state = function(t) {
    this.bytecount = t[0], this.cylinder_count = t[1], this.cylinder_high = t[2], this.cylinder_low = t[3], this.data_pointer = t[4], this.drive_head = t[9], this.error = t[10], this.head = t[11], this.head_count = t[12], this.is_atapi = t[13], this.is_lba = t[14], this.lba_count = t[15], this.data = t[16], this.data_length = t[17], this.sector = t[18], this.sector_count = t[19], this.sector_size = t[20], this.sectors_per_drq = t[21], this.sectors_per_track = t[22], this.status = t[23], this.write_dest = t[24], this.current_command = t[25], this.data_end = t[26], this.current_atapi_command = t[27], this.data16 = new Uint16Array(this.data.buffer), this.data32 = new Int32Array(this.data.buffer), this.buffer && this.buffer.set_state(t[28]);
  };
  var qi = 3320, ae = 3324;
  function yt(t) {
    this.pci_addr = new Uint8Array(4), this.pci_value = new Uint8Array(4), this.pci_response = new Uint8Array(4), this.pci_status = new Uint8Array(4), this.pci_addr32 = new Int32Array(this.pci_addr.buffer), this.pci_value32 = new Int32Array(this.pci_value.buffer), this.pci_response32 = new Int32Array(this.pci_response.buffer), this.pci_status32 = new Int32Array(this.pci_status.buffer), this.device_spaces = [], this.devices = [], this.cpu = t;
    for (var e = 0; 256 > e; e++)
      this.device_spaces[e] = void 0, this.devices[e] = void 0;
    this.io = t.io, t.io.register_write(
      ae,
      this,
      function(i) {
        this.pci_write8(this.pci_addr32[0], i);
      },
      function(i) {
        this.pci_write16(this.pci_addr32[0], i);
      },
      function(i) {
        this.pci_write32(this.pci_addr32[0], i);
      }
    ), t.io.register_write(ae + 1, this, function(i) {
      this.pci_write8(this.pci_addr32[0] + 1 | 0, i);
    }), t.io.register_write(
      ae + 2,
      this,
      function(i) {
        this.pci_write8(this.pci_addr32[0] + 2 | 0, i);
      },
      function(i) {
        this.pci_write16(this.pci_addr32[0] + 2 | 0, i);
      }
    ), t.io.register_write(ae + 3, this, function(i) {
      this.pci_write8(this.pci_addr32[0] + 3 | 0, i);
    }), t.io.register_read_consecutive(
      ae,
      this,
      function() {
        return this.pci_response[0];
      },
      function() {
        return this.pci_response[1];
      },
      function() {
        return this.pci_response[2];
      },
      function() {
        return this.pci_response[3];
      }
    ), t.io.register_read_consecutive(
      qi,
      this,
      function() {
        return this.pci_status[0];
      },
      function() {
        return this.pci_status[1];
      },
      function() {
        return this.pci_status[2];
      },
      function() {
        return this.pci_status[3];
      }
    ), t.io.register_write_consecutive(
      qi,
      this,
      function(i) {
        this.pci_addr[0] = i & 252;
      },
      function(i) {
        (this.pci_addr[1] & 6) === 2 && (i & 6) === 6 ? (n("CPU reboot via PCI"), t.reboot_internal()) : this.pci_addr[1] = i;
      },
      function(i) {
        this.pci_addr[2] = i;
      },
      function(i) {
        this.pci_addr[3] = i, this.pci_query();
      }
    ), this.register_device({
      pci_id: 0,
      pci_space: [
        134,
        128,
        55,
        18,
        0,
        0,
        0,
        0,
        2,
        0,
        0,
        6,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        16,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      pci_bars: [],
      name: "82441FX PMC"
    }), this.isa_bridge = {
      pci_id: 8,
      pci_space: [
        134,
        128,
        0,
        112,
        7,
        0,
        0,
        2,
        0,
        0,
        1,
        6,
        0,
        0,
        128,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      pci_bars: [],
      name: "82371SB PIIX3 ISA"
    }, this.isa_bridge_space = this.register_device(this.isa_bridge), this.isa_bridge_space8 = new Uint8Array(this.isa_bridge_space.buffer);
  }
  yt.prototype.get_state = function() {
    for (var t = [], e = 0; 256 > e; e++)
      t[e] = this.device_spaces[e];
    return t[256] = this.pci_addr, t[257] = this.pci_value, t[258] = this.pci_response, t[259] = this.pci_status, t;
  }, yt.prototype.set_state = function(t) {
    for (var e = 0; 256 > e; e++) {
      var i = this.devices[e], s = t[e];
      if (i && s) {
        for (var r = 0; r < i.pci_bars.length; r++) {
          var _ = s[4 + r];
          if (_ & 1) {
            var o = i.pci_bars[r];
            this.set_io_bars(o, o.original_bar & 65534, _ & 65534);
          }
        }
        this.device_spaces[e].set(s);
      } else
        i && n(
          "Warning: While restoring PCI device: Device exists in current configuration but not in snapshot (" + i.name + ")"
        ), s && n(
          "Warning: While restoring PCI device: Device doesn't exist in current configuration but does in snapshot (device " + h(e, 2) + ")"
        );
    }
    this.pci_addr.set(t[256]), this.pci_value.set(t[257]), this.pci_response.set(t[258]), this.pci_status.set(t[259]);
  }, yt.prototype.pci_query = function() {
    var t = this.pci_addr[2] << 8 | this.pci_addr[1], e = this.pci_addr[0] & 252, i = t >> 3 & 31, s = "query enabled=" + (this.pci_addr[3] >> 7) + (" bdf=" + h(t, 4));
    s += " dev=" + h(i, 2), s += " addr=" + h(e, 2), i = this.device_spaces[t], i !== void 0 ? (this.pci_status32[0] = -2147483648, this.pci_response32[0] = e < i.byteLength ? i[e >> 2] : 0, s += " " + h(this.pci_addr32[0] >>> 0, 8) + " -> " + h(this.pci_response32[0] >>> 0, 8), e >= i.byteLength && (s += " (undef)"), s += " (" + this.devices[t].name + ")", n(s, tt)) : (this.pci_response32[0] = -1, this.pci_status32[0] = 0);
  }, yt.prototype.pci_write8 = function(t, e) {
    var i = t >> 8 & 65535;
    t &= 255;
    var s = new Uint8Array(this.device_spaces[i].buffer), r = this.devices[i];
    s && (16 <= t && 44 > t || 48 <= t && 52 > t, "" + h(t), n(
      "PCI write8 dev=" + h(i >> 3, 2) + " (" + r.name + ") addr=" + h(t, 4) + " value=" + h(e, 2),
      tt
    ), s[t] = e);
  }, yt.prototype.pci_write16 = function(t, e) {
    var i = t >> 8 & 65535;
    t &= 255;
    var s = new Uint16Array(this.device_spaces[i].buffer), r = this.devices[i];
    s && (16 <= t && 44 > t ? n(
      "Warning: PCI: Expected 32-bit write, got 16-bit (addr: " + h(t) + ")"
    ) : (48 <= t && 52 > t, "" + h(t), n(
      "PCI writ16 dev=" + h(i >> 3, 2) + " (" + r.name + ") addr=" + h(t, 4) + " value=" + h(e, 4),
      tt
    ), s[t >>> 1] = e));
  }, yt.prototype.pci_write32 = function(t, e) {
    var i = t >> 8 & 65535;
    t &= 255;
    var s = this.device_spaces[i], r = this.devices[i];
    if (s)
      if (16 <= t && 40 > t) {
        var _ = t - 16 >> 2, o = r.pci_bars[_];
        n(
          "BAR" + _ + " exists=" + (o ? "y" : "n") + " changed to " + h(e >>> 0) + " dev=" + h(i >> 3, 2) + " (" + r.name + ") ",
          tt
        ), o ? (o.size & o.size - 1, i = t >> 2, r = s[i] & 1, (e | 3 | o.size - 1) === -1 ? (e = ~(o.size - 1) | r, r === 0 && (s[i] = e)) : r === 0 && (_ = o.original_bar, (e & -16) !== (_ & -16) && n(
          "Warning: Changing memory bar not supported, ignored",
          tt
        ), s[i] = _), r === 1 && (r = s[i] & 65534, _ = e & 65534, n(
          "io bar changed from " + h(r >>> 0, 8) + " to " + h(_ >>> 0, 8) + " size=" + o.size,
          tt
        ), this.set_io_bars(o, r, _), s[i] = e | 1)) : s[t >> 2] = 0, n("BAR effective value: " + h(s[t >> 2] >>> 0), tt);
      } else
        t === 48 ? (n(
          "PCI write rom address dev=" + h(i >> 3, 2) + " (" + r.name + ") value=" + h(e >>> 0, 8),
          tt
        ), s[t >> 2] = r.pci_rom_size ? (e | 2047) === -1 ? -r.pci_rom_size | 0 : r.pci_rom_address | 0 : 0) : t === 4 ? n(
          "PCI write dev=" + h(i >> 3, 2) + " (" + r.name + ") addr=" + h(t, 4) + " value=" + h(e >>> 0, 8),
          tt
        ) : (n(
          "PCI write dev=" + h(i >> 3, 2) + " (" + r.name + ") addr=" + h(t, 4) + " value=" + h(e >>> 0, 8),
          tt
        ), s[t >>> 2] = e);
  }, yt.prototype.register_device = function(t) {
    t.pci_id, t.pci_space, t.pci_bars;
    var e = t.pci_id;
    n("PCI register bdf=" + h(e) + " (" + t.name + ")", tt), this.devices[e], 64 <= t.pci_space.length, e < this.devices.length;
    var i = new Int32Array(64);
    i.set(new Int32Array(new Uint8Array(t.pci_space).buffer)), this.device_spaces[e] = i, this.devices[e] = t, e = i.slice(4, 10);
    for (var s = 0; s < t.pci_bars.length; s++) {
      var r = t.pci_bars[s];
      if (r) {
        var _ = e[s], o = _ & 1;
        if (r.original_bar = _, r.entries = [], o !== 0)
          for (_ &= -2, o = 0; o < r.size; o++)
            r.entries[o] = this.io.ports[_ + o];
      }
    }
    return i;
  }, yt.prototype.set_io_bars = function(t, e, i) {
    var s = t.size;
    n(
      "Move io bars: from=" + h(e) + " to=" + h(i) + " count=" + s,
      tt
    );
    for (var r = this.io.ports, _ = 0; _ < s; _++) {
      var o = r[e + _];
      4096 <= e + _ && (r[e + _] = this.io.create_empty_entry()), o.read8 === this.io.empty_port_read8 && o.read16 === this.io.empty_port_read16 && o.read32 === this.io.empty_port_read32 && o.write8 === this.io.empty_port_write && o.write16 === this.io.empty_port_write && o.write32 === this.io.empty_port_write && n(
        "Warning: Bad IO bar: Source not mapped, port=" + h(e + _, 4),
        tt
      ), o = t.entries[_];
      var a = r[i + _];
      4096 <= i + _ && (r[i + _] = o), a.read8 !== this.io.empty_port_read8 && a.read16 !== this.io.empty_port_read16 && a.read32 !== this.io.empty_port_read32 && a.write8 !== this.io.empty_port_write && a.write16 !== this.io.empty_port_write && a.write32 !== this.io.empty_port_write || n(
        "Warning: Bad IO bar: Target already mapped, port=" + h(i + _, 4),
        tt
      );
    }
  }, yt.prototype.raise_irq = function(t) {
    var e = this.device_spaces[t];
    this.cpu.device_raise_irq(
      this.isa_bridge_space8[96 + ((e[15] >> 8 & 255) - 1 + ((t >> 3) - 1 & 255) & 3)]
    );
  }, yt.prototype.lower_irq = function(t) {
    var e = this.device_spaces[t];
    this.cpu.device_lower_irq(
      this.isa_bridge_space8[96 + ((e[15] >> 8 & 255) + (t >> 3 & 255) - 2 & 3)]
    );
  };
  const Mi = 128, Ze = 1, Je = 4;
  function J(t, e, i) {
    this.io = t.io, this.cpu = t, this.dma = t.devices.dma, this.bytes_expecting = 0, this.receiving_command = new Uint8Array(10), this.receiving_index = 0, this.next_command = null, this.response_data = new Uint8Array(10), this.last_head = this.last_cylinder = this.drive = this.status_reg2 = this.status_reg1 = this.status_reg0 = this.response_length = this.response_index = 0, this.last_sector = 1, this.dir = this.dor = 0, this.fdb_image = this.fda_image = null, e ? this.set_fda(e) : (this.eject_fda(), this.cpu.devices.rtc.cmos_write(Fi, 64)), this.io.register_read(1008, this, this.port3F0_read), this.io.register_read(1010, this, this.port3F2_read), this.io.register_read(1012, this, this.port3F4_read), this.io.register_read(1013, this, this.port3F5_read), this.io.register_read(1015, this, this.port3F7_read), this.io.register_write(1010, this, this.port3F2_write), this.io.register_write(1012, this, this.port3F4_write), this.io.register_write(1013, this, this.port3F5_write);
  }
  J.prototype.eject_fda = function() {
    this.fda_image = null, this.number_of_cylinders = this.number_of_heads = this.sectors_per_track = 0, this.dir = Mi;
  }, J.prototype.set_fda = function(t) {
    var e = {
      163840: { type: 1, tracks: 40, sectors: 8, heads: 1 },
      184320: { type: 1, tracks: 40, sectors: 9, heads: 1 },
      204800: { type: 1, tracks: 40, sectors: 10, heads: 1 },
      327680: { type: 1, tracks: 40, sectors: 8, heads: 2 },
      368640: { type: 1, tracks: 40, sectors: 9, heads: 2 },
      409600: { type: 1, tracks: 40, sectors: 10, heads: 2 },
      737280: { type: 3, tracks: 80, sectors: 9, heads: 2 },
      1228800: { type: 2, tracks: 80, sectors: 15, heads: 2 },
      1474560: { type: 4, tracks: 80, sectors: 18, heads: 2 },
      1763328: { type: 5, tracks: 82, sectors: 21, heads: 2 },
      2949120: { type: 5, tracks: 80, sectors: 36, heads: 2 },
      512: { type: 1, tracks: 1, sectors: 1, heads: 1 }
    };
    let i = t.byteLength, s = e[i];
    s || (i = 1474560 < t.byteLength ? 2949120 : 1474560, s = e[i], n(
      "Warning: Unkown floppy size: " + t.byteLength + ", assuming " + i
    )), this.sectors_per_track = s.sectors, this.number_of_heads = s.heads, this.number_of_cylinders = s.tracks, this.fda_image = t, this.dir = Mi, this.cpu.devices.rtc.cmos_write(Fi, s.type << 4);
  }, J.prototype.get_state = function() {
    var t = [];
    return t[0] = this.bytes_expecting, t[1] = this.receiving_command, t[2] = this.receiving_index, t[4] = this.response_data, t[5] = this.response_index, t[6] = this.response_length, t[8] = this.status_reg0, t[9] = this.status_reg1, t[10] = this.status_reg2, t[11] = this.drive, t[12] = this.last_cylinder, t[13] = this.last_head, t[14] = this.last_sector, t[15] = this.dor, t[16] = this.sectors_per_track, t[17] = this.number_of_heads, t[18] = this.number_of_cylinders, t;
  }, J.prototype.set_state = function(t) {
    this.bytes_expecting = t[0], this.receiving_command = t[1], this.receiving_index = t[2], this.next_command = t[3], this.response_data = t[4], this.response_index = t[5], this.response_length = t[6], this.status_reg0 = t[8], this.status_reg1 = t[9], this.status_reg2 = t[10], this.drive = t[11], this.last_cylinder = t[12], this.last_head = t[13], this.last_sector = t[14], this.dor = t[15], this.sectors_per_track = t[16], this.number_of_heads = t[17], this.number_of_cylinders = t[18];
  }, J.prototype.port3F0_read = function() {
    return n("3F0 read", G), 0;
  }, J.prototype.port3F4_read = function() {
    n("3F4 read", G);
    var t = 128;
    return this.response_index < this.response_length && (t |= 80), !(this.dor & 8) && (t |= 32), t;
  }, J.prototype.port3F7_read = function() {
    return n("3F7 read", G), this.dir;
  }, J.prototype.port3F5_read = function() {
    return this.response_index < this.response_length ? (n(
      "3F5 read: " + this.response_data[this.response_index],
      G
    ), this.cpu.device_lower_irq(6), this.response_data[this.response_index++]) : (n("3F5 read, empty", G), 255);
  }, J.prototype.port3F4_write = function(t) {
    n("3F4/data rate write: " + h(t), G), t & 128 && (n("dsr reset", G), this.status_reg0 = 192, this.cpu.device_raise_irq(6));
  }, J.prototype.port3F5_write = function(t) {
    if (n("3F5 write " + h(t), G), 0 < this.bytes_expecting)
      this.receiving_command[this.receiving_index++] = t, this.bytes_expecting--, this.bytes_expecting === 0 && this.next_command.call(this, this.receiving_command);
    else {
      switch (t) {
        case 3:
          this.next_command = this.fix_drive_data, this.bytes_expecting = 2;
          break;
        case 19:
          this.next_command = this.configure, this.bytes_expecting = 3;
          break;
        case 4:
          this.next_command = this.check_drive_status, this.bytes_expecting = 1;
          break;
        case 5:
        case 69:
        case 197:
          this.next_command = function(e) {
            this.do_sector(!0, e);
          }, this.bytes_expecting = 8;
          break;
        case 6:
        case 70:
        case 230:
          this.next_command = function(e) {
            this.do_sector(!1, e);
          }, this.bytes_expecting = 8;
          break;
        case 7:
          this.next_command = this.calibrate, this.bytes_expecting = 1;
          break;
        case 8:
          this.check_interrupt_status();
          break;
        case 74:
          this.next_command = this.read_sector_id, this.bytes_expecting = 1;
          break;
        case 15:
          this.bytes_expecting = 2, this.next_command = this.seek;
          break;
        case 14:
        case 16:
          n(
            t === 14 ? "dump registers" : "determine controller version",
            G
          ), this.status_reg0 = 128, this.response_data[0] = this.status_reg0, this.response_index = 0, this.response_length = 1, this.bytes_expecting = 0;
          break;
        default:
          "" + h(t);
      }
      this.receiving_index = 0;
    }
  }, J.prototype.port3F2_read = function() {
    return n("read 3F2: DOR", G), this.dor;
  }, J.prototype.port3F2_write = function(t) {
    (t & 4) === 4 && !(this.dor & 4) && (this.status_reg0 = 192, this.cpu.device_raise_irq(6)), n("start motors: " + h(t >> 4), G), n("enable dma/irq: " + !!(t & 8), G), n("reset fdc: " + !!(t & 4), G), n("drive select: " + (t & 3), G), t & 3 && n("guest: fdb not implemented"), n("DOR = " + h(t), G), this.dor = t;
  }, J.prototype.check_drive_status = function(t) {
    n("check drive status", G), this.status_reg1 = this.fda_image ? 0 : Je | Ze, this.response_index = 0, this.response_length = 1, this.response_data[0] = 0;
  }, J.prototype.seek = function(t) {
    if (n("seek", G), t[0] & 3)
      n("seek on fdb");
    else {
      var e = t[1];
      t = t[0] >> 2 & 1, e !== this.last_cylinder && (this.dir = 0), this.status_reg1 = this.fda_image ? 0 : Je | Ze, this.status_reg0 = 32, this.last_cylinder = e, this.last_head = t;
    }
    this.raise_irq();
  }, J.prototype.calibrate = function(t) {
    n("floppy calibrate", G), this.seek([t[0], 0]);
  }, J.prototype.check_interrupt_status = function() {
    n("floppy check interrupt status", G), this.response_index = 0, this.response_length = 2, this.response_data[0] = this.status_reg0, this.response_data[1] = this.last_cylinder;
  }, J.prototype.do_sector = function(t, e) {
    var i = e[2], s = e[1], r = e[3], _ = 128 << e[4], o = e[5] - e[3] + 1, a = ((i + this.number_of_heads * s) * this.sectors_per_track + r - 1) * _;
    n("Floppy " + (t ? "Write" : "Read"), G), n("from " + h(a) + " length " + h(o * _), G), n(s + " / " + i + " / " + r, G), e[4] || n(
      "FDC: sector count is zero, use data length instead",
      G
    ), this.fda_image ? (this.status_reg1 = 0, t ? this.dma.do_write(
      this.fda_image,
      a,
      o * _,
      2,
      this.done.bind(this, e, s, i, r)
    ) : this.dma.do_read(
      this.fda_image,
      a,
      o * _,
      2,
      this.done.bind(this, e, s, i, r)
    )) : this.status_reg1 = Je | Ze;
  }, J.prototype.done = function(t, e, i, s, r) {
    r || (s++, s > this.sectors_per_track && (s = 1, i++, i >= this.number_of_heads && (i = 0, e++)), e !== this.last_cylinder && (this.dir = 0), this.status_reg0 = 32, this.last_cylinder = e, this.last_head = i, this.last_sector = s, this.response_index = 0, this.response_length = 7, this.response_data[0] = i << 2 | 32, this.response_data[1] = 0, this.response_data[2] = 0, this.response_data[3] = e, this.response_data[4] = i, this.response_data[5] = s, this.response_data[6] = t[4], this.raise_irq());
  }, J.prototype.fix_drive_data = function(t) {
    n(
      "floppy fix drive data " + t.slice(0, this.bytes_expecting),
      G
    );
  }, J.prototype.configure = function(t) {
    n(
      "floppy configure " + t.slice(0, this.bytes_expecting),
      G
    );
  }, J.prototype.read_sector_id = function(t) {
    n("floppy read sector id " + t, G), this.response_index = 0, this.response_length = 7, this.response_data[0] = 0, this.response_data[1] = 0, this.response_data[2] = 0, this.response_data[3] = 0, this.response_data[4] = 0, this.response_data[5] = 0, this.response_data[6] = 0, this.raise_irq();
  }, J.prototype.raise_irq = function() {
    this.dor & 8 && this.cpu.device_raise_irq(6);
  }, U.prototype.mmap_read8 = function(t) {
    return t = this.memory_map_read8[t >>> ft](t), t;
  }, U.prototype.mmap_write8 = function(t, e) {
    this.memory_map_write8[t >>> ft](t, e);
  }, U.prototype.mmap_read16 = function(t) {
    var e = this.memory_map_read8[t >>> ft];
    return t = e(t) | e(t + 1 | 0) << 8, t;
  }, U.prototype.mmap_write16 = function(t, e) {
    var i = this.memory_map_write8[t >>> ft];
    i(t, e & 255), i(t + 1 | 0, e >> 8);
  }, U.prototype.mmap_read32 = function(t) {
    return this.memory_map_read32[t >>> ft](t);
  }, U.prototype.mmap_write32 = function(t, e) {
    this.memory_map_write32[t >>> ft](t, e);
  }, U.prototype.mmap_write64 = function(t, e, i) {
    var s = t >>> ft;
    s = this.memory_map_write32[s], s(t, e), s(t + 4, i);
  }, U.prototype.mmap_write128 = function(t, e, i, s, r) {
    var _ = t >>> ft;
    _ = this.memory_map_write32[_], _(t, e), _(t + 4, i), _(t + 8, s), _(t + 12, r);
  }, U.prototype.write_blob = function(t, e) {
    t && 0 <= t.length, t.length && (this.in_mapped_range(e), this.in_mapped_range(e + t.length - 1), this.jit_dirty_cache(e, e + t.length), this.mem8.set(t, e));
  }, U.prototype.read_blob = function(t, e) {
    return e && (this.in_mapped_range(t), this.in_mapped_range(t + e - 1), void 0), this.mem8.subarray(t, t + e);
  };
  function Y(t) {
    this.cpu = t, this.channel_page = new Uint8Array(8), this.channel_pagehi = new Uint8Array(8), this.channel_addr = new Uint16Array(8), this.channel_addr_init = new Uint16Array(8), this.channel_count = new Uint16Array(8), this.channel_count_init = new Uint16Array(8), this.channel_mask = new Uint8Array(8), this.channel_mode = new Uint8Array(8), this.unmask_listeners = [], this.lsb_msb_flipflop = 0, t = t.io, t.register_write(0, this, this.port_addr_write.bind(this, 0)), t.register_write(2, this, this.port_addr_write.bind(this, 1)), t.register_write(4, this, this.port_addr_write.bind(this, 2)), t.register_write(6, this, this.port_addr_write.bind(this, 3)), t.register_write(1, this, this.port_count_write.bind(this, 0)), t.register_write(3, this, this.port_count_write.bind(this, 1)), t.register_write(5, this, this.port_count_write.bind(this, 2)), t.register_write(7, this, this.port_count_write.bind(this, 3)), t.register_read(0, this, this.port_addr_read.bind(this, 0)), t.register_read(2, this, this.port_addr_read.bind(this, 1)), t.register_read(4, this, this.port_addr_read.bind(this, 2)), t.register_read(6, this, this.port_addr_read.bind(this, 3)), t.register_read(1, this, this.port_count_read.bind(this, 0)), t.register_read(3, this, this.port_count_read.bind(this, 1)), t.register_read(5, this, this.port_count_read.bind(this, 2)), t.register_read(7, this, this.port_count_read.bind(this, 3)), t.register_write(192, this, this.port_addr_write.bind(this, 4)), t.register_write(196, this, this.port_addr_write.bind(this, 5)), t.register_write(200, this, this.port_addr_write.bind(this, 6)), t.register_write(204, this, this.port_addr_write.bind(this, 7)), t.register_write(194, this, this.port_count_write.bind(this, 4)), t.register_write(198, this, this.port_count_write.bind(this, 5)), t.register_write(202, this, this.port_count_write.bind(this, 6)), t.register_write(206, this, this.port_count_write.bind(this, 7)), t.register_read(192, this, this.port_addr_read.bind(this, 4)), t.register_read(196, this, this.port_addr_read.bind(this, 5)), t.register_read(200, this, this.port_addr_read.bind(this, 6)), t.register_read(204, this, this.port_addr_read.bind(this, 7)), t.register_read(194, this, this.port_count_read.bind(this, 4)), t.register_read(198, this, this.port_count_read.bind(this, 5)), t.register_read(202, this, this.port_count_read.bind(this, 6)), t.register_read(206, this, this.port_count_read.bind(this, 7)), t.register_write(135, this, this.port_page_write.bind(this, 0)), t.register_write(131, this, this.port_page_write.bind(this, 1)), t.register_write(129, this, this.port_page_write.bind(this, 2)), t.register_write(130, this, this.port_page_write.bind(this, 3)), t.register_write(143, this, this.port_page_write.bind(this, 4)), t.register_write(139, this, this.port_page_write.bind(this, 5)), t.register_write(137, this, this.port_page_write.bind(this, 6)), t.register_write(138, this, this.port_page_write.bind(this, 7)), t.register_read(135, this, this.port_page_read.bind(this, 0)), t.register_read(131, this, this.port_page_read.bind(this, 1)), t.register_read(129, this, this.port_page_read.bind(this, 2)), t.register_read(130, this, this.port_page_read.bind(this, 3)), t.register_read(143, this, this.port_page_read.bind(this, 4)), t.register_read(139, this, this.port_page_read.bind(this, 5)), t.register_read(137, this, this.port_page_read.bind(this, 6)), t.register_read(138, this, this.port_page_read.bind(this, 7)), t.register_write(1159, this, this.port_pagehi_write.bind(this, 0)), t.register_write(1155, this, this.port_pagehi_write.bind(this, 1)), t.register_write(1153, this, this.port_pagehi_write.bind(this, 2)), t.register_write(1154, this, this.port_pagehi_write.bind(this, 3)), t.register_write(1163, this, this.port_pagehi_write.bind(this, 5)), t.register_write(1161, this, this.port_pagehi_write.bind(this, 6)), t.register_write(1162, this, this.port_pagehi_write.bind(this, 7)), t.register_read(1159, this, this.port_pagehi_read.bind(this, 0)), t.register_read(1155, this, this.port_pagehi_read.bind(this, 1)), t.register_read(1153, this, this.port_pagehi_read.bind(this, 2)), t.register_read(1154, this, this.port_pagehi_read.bind(this, 3)), t.register_read(1163, this, this.port_pagehi_read.bind(this, 5)), t.register_read(1161, this, this.port_pagehi_read.bind(this, 6)), t.register_read(1162, this, this.port_pagehi_read.bind(this, 7)), t.register_write(10, this, this.port_singlemask_write.bind(this, 0)), t.register_write(212, this, this.port_singlemask_write.bind(this, 4)), t.register_write(15, this, this.port_multimask_write.bind(this, 0)), t.register_write(222, this, this.port_multimask_write.bind(this, 4)), t.register_read(15, this, this.port_multimask_read.bind(this, 0)), t.register_read(222, this, this.port_multimask_read.bind(this, 4)), t.register_write(11, this, this.port_mode_write.bind(this, 0)), t.register_write(214, this, this.port_mode_write.bind(this, 4)), t.register_write(12, this, this.portC_write), t.register_write(216, this, this.portC_write);
  }
  Y.prototype.get_state = function() {
    return [
      this.channel_page,
      this.channel_pagehi,
      this.channel_addr,
      this.channel_addr_init,
      this.channel_count,
      this.channel_count_init,
      this.channel_mask,
      this.channel_mode,
      this.lsb_msb_flipflop
    ];
  }, Y.prototype.set_state = function(t) {
    this.channel_page = t[0], this.channel_pagehi = t[1], this.channel_addr = t[2], this.channel_addr_init = t[3], this.channel_count = t[4], this.channel_count_init = t[5], this.channel_mask = t[6], this.channel_mode = t[7], this.lsb_msb_flipflop = t[8];
  }, Y.prototype.port_count_write = function(t, e) {
    n("count write [" + t + "] = " + h(e), I), this.channel_count[t] = this.flipflop_get(this.channel_count[t], e, !1), this.channel_count_init[t] = this.flipflop_get(
      this.channel_count_init[t],
      e,
      !0
    );
  }, Y.prototype.port_count_read = function(t) {
    return n(
      "count read [" + t + "] -> " + h(this.channel_count[t]),
      I
    ), this.flipflop_read(this.channel_count[t]);
  }, Y.prototype.port_addr_write = function(t, e) {
    n("addr write [" + t + "] = " + h(e), I), this.channel_addr[t] = this.flipflop_get(this.channel_addr[t], e, !1), this.channel_addr_init[t] = this.flipflop_get(
      this.channel_addr_init[t],
      e,
      !0
    );
  }, Y.prototype.port_addr_read = function(t) {
    return n("addr read [" + t + "] -> " + h(this.channel_addr[t]), I), this.flipflop_read(this.channel_addr[t]);
  }, Y.prototype.port_pagehi_write = function(t, e) {
    n("pagehi write [" + t + "] = " + h(e), I), this.channel_pagehi[t] = e;
  }, Y.prototype.port_pagehi_read = function(t) {
    return n("pagehi read [" + t + "]", I), this.channel_pagehi[t];
  }, Y.prototype.port_page_write = function(t, e) {
    n("page write [" + t + "] = " + h(e), I), this.channel_page[t] = e;
  }, Y.prototype.port_page_read = function(t) {
    return n("page read [" + t + "]", I), this.channel_page[t];
  }, Y.prototype.port_singlemask_write = function(t, e) {
    t = (e & 3) + t, e = e & 4 ? 1 : 0, n("singlechannel mask write [" + t + "] = " + e, I), this.update_mask(t, e);
  }, Y.prototype.port_multimask_write = function(t, e) {
    n("multichannel mask write: " + h(e), I);
    for (var i = 0; 4 > i; i++)
      this.update_mask(t + i, e & 1 << i);
  }, Y.prototype.port_multimask_read = function(t) {
    var e = 0 | this.channel_mask[t + 0];
    return e |= this.channel_mask[t + 1] << 1, e |= this.channel_mask[t + 2] << 2, e |= this.channel_mask[t + 3] << 3, n("multichannel mask read: " + h(e), I), e;
  }, Y.prototype.port_mode_write = function(t, e) {
    t = (e & 3) + t, n("mode write [" + t + "] = " + h(e), I), this.channel_mode[t] = e;
  }, Y.prototype.portC_write = function(t) {
    n("flipflop reset", I), this.lsb_msb_flipflop = 0;
  }, Y.prototype.on_unmask = function(t, e) {
    this.unmask_listeners.push({ fn: t, this_value: e });
  }, Y.prototype.update_mask = function(t, e) {
    if (this.channel_mask[t] !== e && (this.channel_mask[t] = e, !e))
      for (n("firing on_unmask(" + t + ")", I), e = 0; e < this.unmask_listeners.length; e++)
        this.unmask_listeners[e].fn.call(
          this.unmask_listeners[e].this_value,
          t
        );
  }, Y.prototype.do_read = function(t, e, i, s, r) {
    var _ = this.count_get_8bit(s), o = this.address_get_8bit(s);
    if (n("DMA write channel " + s, I), n("to " + h(o) + " len " + h(_), I), i < _ && n(
      "DMA should read more than provided: " + h(i) + " " + h(_),
      I
    ), e + _ > t.byteLength)
      n("DMA read outside of buffer", I), r(!0);
    else {
      var a = this.cpu;
      this.channel_addr[s] += _, t.get(e, _, function(d) {
        a.write_blob(d, o), r(!1);
      });
    }
  }, Y.prototype.do_write = function(t, e, i, s, r) {
    var _ = this.channel_count[s] + 1 & 65535, o = 5 <= s ? 2 : 1, a = _ * o, d = this.address_get_8bit(s), c = !1, u = !1, p = this.channel_mode[s] & 16;
    n("DMA write channel " + s, I), n("to " + h(d) + " len " + h(a), I), i < a ? (n("DMA should read more than provided", I), _ = Math.floor(i / o), a = _ * o, c = !0) : i > a && (n("DMA attempted to read more than provided", I), u = !0), e + a > t.byteLength ? (n("DMA write outside of buffer", I), r(!0)) : (this.channel_addr[s] += _, this.channel_count[s] -= _, !c && p && (n("DMA autoinit", I), this.channel_addr[s] = this.channel_addr_init[s], this.channel_count[s] = this.channel_count_init[s]), t.set(e, this.cpu.mem8.subarray(d, d + a), () => {
      u && p ? (n("DMA continuing from start", I), this.do_write(t, e + a, i - a, s, r)) : r(!1);
    }));
  }, Y.prototype.address_get_8bit = function(t) {
    var e = this.channel_addr[t];
    return 5 <= t && (e <<= 1), e = e & 65535 | this.channel_page[t] << 16, e |= this.channel_pagehi[t] << 24;
  }, Y.prototype.count_get_8bit = function(t) {
    var e = this.channel_count[t] + 1;
    return 5 <= t && (e *= 2), e;
  }, Y.prototype.flipflop_get = function(t, e, i) {
    return i || (this.lsb_msb_flipflop ^= 1), this.lsb_msb_flipflop ? t & -256 | e : t & -65281 | e << 8;
  }, Y.prototype.flipflop_read = function(t) {
    return (this.lsb_msb_flipflop ^= 1) ? t & 255 : t >> 8 & 255;
  };
  var jt = 1193.1816666;
  function Et(t, e) {
    this.cpu = t, this.bus = e, this.counter_start_time = new Float64Array(3), this.counter_start_value = new Uint16Array(3), this.counter_next_low = new Uint8Array(4), this.counter_enabled = new Uint8Array(4), this.counter_mode = new Uint8Array(4), this.counter_read_mode = new Uint8Array(4), this.counter_latch = new Uint8Array(4), this.counter_latch_value = new Uint16Array(3), this.counter_reload = new Uint16Array(3), t.io.register_read(97, this, function() {
      var i = W.microtick(), s = 66.66666666666667 * i & 1;
      return i = this.did_rollover(2, i), s << 4 | i << 5;
    }), t.io.register_write(97, this, function(i) {
      i & 1 ? this.bus.send("pcspeaker-enable") : this.bus.send("pcspeaker-disable");
    }), t.io.register_read(64, this, function() {
      return this.counter_read(0);
    }), t.io.register_read(65, this, function() {
      return this.counter_read(1);
    }), t.io.register_read(66, this, function() {
      return this.counter_read(2);
    }), t.io.register_write(64, this, function(i) {
      this.counter_write(0, i);
    }), t.io.register_write(65, this, function(i) {
      this.counter_write(1, i);
    }), t.io.register_write(66, this, function(i) {
      this.counter_write(2, i), this.bus.send("pcspeaker-update", [
        this.counter_mode[2],
        this.counter_reload[2]
      ]);
    }), t.io.register_write(67, this, this.port43_write);
  }
  Et.prototype.get_state = function() {
    var t = [];
    return t[0] = this.counter_next_low, t[1] = this.counter_enabled, t[2] = this.counter_mode, t[3] = this.counter_read_mode, t[4] = this.counter_latch, t[5] = this.counter_latch_value, t[6] = this.counter_reload, t[7] = this.counter_start_time, t[8] = this.counter_start_value, t;
  }, Et.prototype.set_state = function(t) {
    this.counter_next_low = t[0], this.counter_enabled = t[1], this.counter_mode = t[2], this.counter_read_mode = t[3], this.counter_latch = t[4], this.counter_latch_value = t[5], this.counter_reload = t[6], this.counter_start_time = t[7], this.counter_start_value = t[8];
  }, Et.prototype.timer = function(t, e) {
    var i = 100;
    return e || (this.counter_enabled[0] && this.did_rollover(0, t) ? (this.counter_start_value[0] = this.get_counter_value(0, t), this.counter_start_time[0] = t, n(
      "pit interrupt. new value: " + this.counter_start_value[0],
      K
    ), this.cpu.device_lower_irq(0), this.cpu.device_raise_irq(0), this.counter_mode[0] === 0 && (this.counter_enabled[0] = 0)) : this.cpu.device_lower_irq(0), this.counter_enabled[0] && (i = (this.counter_start_value[0] - Math.floor(
      (t - this.counter_start_time[0]) * jt
    )) / jt)), i;
  }, Et.prototype.get_counter_value = function(t, e) {
    if (!this.counter_enabled[t])
      return 0;
    var i = e - this.counter_start_time[t], s = Math.floor(i * jt);
    return e = this.counter_start_value[t] - s, n(
      "diff=" + i + " dticks=" + s + " value=" + e + " reload=" + this.counter_reload[t],
      K
    ), i = this.counter_reload[t], e >= i ? (n(
      "Warning: Counter" + t + " value " + e + " is larger than reload " + i,
      K
    ), e %= i) : 0 > e && (e = e % i + i), e;
  }, Et.prototype.did_rollover = function(t, e) {
    return e -= this.counter_start_time[t], 0 > e ? (n(
      "Warning: PIT timer difference is negative, resetting (timer " + t + ")"
    ), !0) : this.counter_start_value[t] < Math.floor(e * jt);
  }, Et.prototype.counter_read = function(t) {
    var e = this.counter_latch[t];
    return e ? (this.counter_latch[t]--, e === 2 ? this.counter_latch_value[t] & 255 : this.counter_latch_value[t] >> 8) : (e = this.counter_next_low[t], this.counter_mode[t] === 3 && (this.counter_next_low[t] ^= 1), t = this.get_counter_value(t, W.microtick()), e ? t & 255 : t >> 8);
  }, Et.prototype.counter_write = function(t, e) {
    this.counter_reload[t] = this.counter_next_low[t] ? this.counter_reload[t] & -256 | e : this.counter_reload[t] & 255 | e << 8, this.counter_read_mode[t] === 3 && this.counter_next_low[t] || (this.counter_reload[t] || (this.counter_reload[t] = 65535), this.counter_start_value[t] = this.counter_reload[t], this.counter_enabled[t] = !0, this.counter_start_time[t] = W.microtick(), n(
      "counter" + t + " reload=" + h(this.counter_reload[t]) + " tick=" + (this.counter_reload[t] || 65536) / jt + "ms",
      K
    )), this.counter_read_mode[t] === 3 && (this.counter_next_low[t] ^= 1);
  }, Et.prototype.port43_write = function(t) {
    var e = t >> 1 & 7, i = t & 1, s = t >> 6 & 3;
    t = t >> 4 & 3, s === 1 && n("Unimplemented timer1", K), s === 3 ? n("Unimplemented read back", K) : t === 0 ? (this.counter_latch[s] = 2, e = this.get_counter_value(s, W.microtick()), n("latch: " + e, K), this.counter_latch_value[s] = e ? e - 1 : 0) : (6 <= e && (e &= -5), n(
      "Control: mode=" + e + " ctr=" + s + " read_mode=" + t + " bcd=" + i,
      K
    ), this.counter_next_low[s] = t === 1 ? 0 : 1, s === 0 && this.cpu.device_lower_irq(0), e !== 0 && e !== 3 && e !== 2 && n("Unimplemented counter mode: " + h(e), K), this.counter_mode[s] = e, this.counter_read_mode[s] = t, s === 2 && this.bus.send("pcspeaker-update", [
      this.counter_mode[2],
      this.counter_reload[2]
    ]));
  }, Et.prototype.dump = function() {
    const t = this.counter_reload[0];
    n(
      "counter0 ticks every " + (t || 65536) / jt + "ms (reload=" + t + ")"
    );
  };
  var ct = 65536, Se = 2560, Oe = 1600, Wr = 32, de = 3758096384, ce = 8 * ct, Li = 4 * ct, Ui = Uint32Array.from([
    655360,
    655360,
    720896,
    753664
  ]), $e = Uint32Array.from([
    131072,
    65536,
    32768,
    32768
  ]);
  function T(t, e, i) {
    this.cpu = t, this.bus = e, this.vga_memory_size = i, this.cursor_address = 0, this.cursor_scanline_start = 14, this.cursor_scanline_end = 15, this.max_cols = 80, this.max_rows = 25, this.virtual_height = this.virtual_width = this.screen_height = this.screen_width = 0, this.layers = [], this.start_address_latched = this.start_address = 0, this.crtc = new Uint8Array(25), this.line_compare = this.offset_register = this.preset_row_scan = this.underline_location_register = this.vertical_blank_start = this.vertical_display_enable_end = this.horizontal_blank_start = this.horizontal_display_enable_end = this.crtc_mode = 0, this.graphical_mode_is_linear = !0, this.graphical_mode = !1, setTimeout(() => {
      e.send("screen-set-mode", this.graphical_mode);
    }, 0), this.vga256_palette = new Int32Array(256), this.latch_dword = 0, this.svga_version = 45253, this.svga_height = this.svga_width = 0, this.svga_enabled = !1, this.svga_bpp = 32, this.svga_offset = this.svga_bank_offset = 0, this.pci_space = [
      52,
      18,
      17,
      17,
      3,
      1,
      0,
      0,
      0,
      0,
      0,
      3,
      0,
      0,
      0,
      0,
      8,
      de >>> 8,
      de >>> 16,
      de >>> 24,
      0,
      0,
      0,
      0,
      0,
      0,
      191,
      254,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      244,
      26,
      0,
      17,
      0,
      0,
      190,
      254,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ], this.pci_id = 144, this.pci_bars = [{ size: i }], this.pci_rom_size = 65536, this.pci_rom_address = 4272947200, this.name = "vga", this.stats = { is_graphical: !1, res_x: 0, res_y: 0, bpp: 0 }, this.dac_state = this.dac_color_index_read = this.dac_color_index_write = this.index_crtc = 0, this.dac_mask = 255, this.dac_map = new Uint8Array(16), this.attribute_controller_index = -1, this.palette_source = 32, this.color_select = this.horizontal_panning = this.color_plane_enable = this.attribute_mode = 0, this.sequencer_index = -1, this.plane_write_bm = 15, this.clocking_mode = this.sequencer_memory_mode = 0, this.graphics_index = -1, this.planar_rotate_reg = this.planar_mode = this.plane_read = 0, this.planar_bitmap = 255, this.max_scan_line = this.color_dont_care = this.color_compare = this.miscellaneous_graphics_register = this.planar_setreset_enable = this.planar_setreset = 0, this.port_3DA_value = this.miscellaneous_output_register = 255, i = t.io, i.register_write(960, this, this.port3C0_write), i.register_read(960, this, this.port3C0_read, this.port3C0_read16), i.register_read(961, this, this.port3C1_read), i.register_write(962, this, this.port3C2_write), i.register_write_consecutive(
      964,
      this,
      this.port3C4_write,
      this.port3C5_write
    ), i.register_read(964, this, this.port3C4_read), i.register_read(965, this, this.port3C5_read), i.register_write_consecutive(
      974,
      this,
      this.port3CE_write,
      this.port3CF_write
    ), i.register_read(974, this, this.port3CE_read), i.register_read(975, this, this.port3CF_read), i.register_read(966, this, this.port3C6_read), i.register_write(966, this, this.port3C6_write), i.register_write(967, this, this.port3C7_write), i.register_read(967, this, this.port3C7_read), i.register_write(968, this, this.port3C8_write), i.register_read(968, this, this.port3C8_read), i.register_write(969, this, this.port3C9_write), i.register_read(969, this, this.port3C9_read), i.register_read(972, this, this.port3CC_read), i.register_write_consecutive(
      980,
      this,
      this.port3D4_write,
      this.port3D5_write
    ), i.register_read(980, this, this.port3D4_read), i.register_read(981, this, this.port3D5_read, () => (n("Warning: 16-bit read from 3D5", y), this.port3D5_read())), i.register_read(970, this, function() {
      return n("3CA read", y), 0;
    }), i.register_read(986, this, this.port3DA_read), i.register_read(954, this, this.port3DA_read), this.dispi_index = -1, this.dispi_enable_value = 0, i.register_write(462, this, void 0, this.port1CE_write), i.register_write(463, this, void 0, this.port1CF_write), i.register_read(463, this, void 0, this.port1CF_read), this.vga_memory_size === void 0 || this.vga_memory_size < Li ? (this.vga_memory_size = Li, n(
      "vga memory size rounded up to " + this.vga_memory_size,
      y
    )) : this.vga_memory_size & ct - 1 && (this.vga_memory_size |= ct - 1, this.vga_memory_size++);
    const s = t.svga_allocate_memory(this.vga_memory_size);
    this.svga_memory = l.view(
      Uint8Array,
      t.wasm_memory,
      s,
      this.vga_memory_size
    ), this.diff_addr_min = this.vga_memory_size, this.diff_addr_max = 0, this.diff_plot_min = this.vga_memory_size, this.diff_plot_max = 0, this.image_data = null, e.register(
      "screen-fill-buffer",
      function() {
        this.screen_fill_buffer();
      },
      this
    ), this.vga_memory = new Uint8Array(4 * ct), this.plane0 = new Uint8Array(
      this.vga_memory.buffer,
      0 * ct,
      ct
    ), this.plane1 = new Uint8Array(
      this.vga_memory.buffer,
      1 * ct,
      ct
    ), this.plane2 = new Uint8Array(
      this.vga_memory.buffer,
      2 * ct,
      ct
    ), this.plane3 = new Uint8Array(
      this.vga_memory.buffer,
      3 * ct,
      ct
    ), this.pixel_buffer = new Uint8Array(ce);
    var r = this;
    i.mmap_register(
      655360,
      131072,
      function(_) {
        return r.vga_memory_read(_);
      },
      function(_, o) {
        r.vga_memory_write(_, o);
      }
    ), t.devices.pci.register_device(this);
  }
  T.prototype.get_state = function() {
    var t = [];
    return t[0] = this.vga_memory_size, t[1] = this.cursor_address, t[2] = this.cursor_scanline_start, t[3] = this.cursor_scanline_end, t[4] = this.max_cols, t[5] = this.max_rows, t[6] = this.vga_memory, t[7] = this.dac_state, t[8] = this.start_address, t[9] = this.graphical_mode, t[10] = this.vga256_palette, t[11] = this.latch_dword, t[12] = this.color_compare, t[13] = this.color_dont_care, t[14] = this.miscellaneous_graphics_register, t[15] = this.svga_width, t[16] = this.svga_height, t[17] = this.crtc_mode, t[18] = this.svga_enabled, t[19] = this.svga_bpp, t[20] = this.svga_bank_offset, t[21] = this.svga_offset, t[22] = this.index_crtc, t[23] = this.dac_color_index_write, t[24] = this.dac_color_index_read, t[25] = this.dac_map, t[26] = this.sequencer_index, t[27] = this.plane_write_bm, t[28] = this.sequencer_memory_mode, t[29] = this.graphics_index, t[30] = this.plane_read, t[31] = this.planar_mode, t[32] = this.planar_rotate_reg, t[33] = this.planar_bitmap, t[34] = this.max_scan_line, t[35] = this.miscellaneous_output_register, t[36] = this.port_3DA_value, t[37] = this.dispi_index, t[38] = this.dispi_enable_value, t[39] = this.svga_memory, t[40] = this.graphical_mode_is_linear, t[41] = this.attribute_controller_index, t[42] = this.offset_register, t[43] = this.planar_setreset, t[44] = this.planar_setreset_enable, t[45] = this.start_address_latched, t[46] = this.crtc, t[47] = this.horizontal_display_enable_end, t[48] = this.horizontal_blank_start, t[49] = this.vertical_display_enable_end, t[50] = this.vertical_blank_start, t[51] = this.underline_location_register, t[52] = this.preset_row_scan, t[53] = this.offset_register, t[54] = this.palette_source, t[55] = this.attribute_mode, t[56] = this.color_plane_enable, t[57] = this.horizontal_panning, t[58] = this.color_select, t[59] = this.clocking_mode, t[60] = this.line_compare, t[61] = this.pixel_buffer, t[62] = this.dac_mask, t;
  }, T.prototype.set_state = function(t) {
    this.vga_memory_size = t[0], this.cursor_address = t[1], this.cursor_scanline_start = t[2], this.cursor_scanline_end = t[3], this.max_cols = t[4], this.max_rows = t[5], t[6] && this.vga_memory.set(t[6]), this.dac_state = t[7], this.start_address = t[8], this.graphical_mode = t[9], this.vga256_palette = t[10], this.latch_dword = t[11], this.color_compare = t[12], this.color_dont_care = t[13], this.miscellaneous_graphics_register = t[14], this.svga_width = t[15], this.svga_height = t[16], this.crtc_mode = t[17], this.svga_enabled = t[18], this.svga_bpp = t[19], this.svga_bank_offset = t[20], this.svga_offset = t[21], this.index_crtc = t[22], this.dac_color_index_write = t[23], this.dac_color_index_read = t[24], this.dac_map = t[25], this.sequencer_index = t[26], this.plane_write_bm = t[27], this.sequencer_memory_mode = t[28], this.graphics_index = t[29], this.plane_read = t[30], this.planar_mode = t[31], this.planar_rotate_reg = t[32], this.planar_bitmap = t[33], this.max_scan_line = t[34], this.miscellaneous_output_register = t[35], this.port_3DA_value = t[36], this.dispi_index = t[37], this.dispi_enable_value = t[38], this.svga_memory.set(t[39]), this.graphical_mode_is_linear = t[40], this.attribute_controller_index = t[41], this.offset_register = t[42], this.planar_setreset = t[43], this.planar_setreset_enable = t[44], this.start_address_latched = t[45], this.crtc.set(t[46]), this.horizontal_display_enable_end = t[47], this.horizontal_blank_start = t[48], this.vertical_display_enable_end = t[49], this.vertical_blank_start = t[50], this.underline_location_register = t[51], this.preset_row_scan = t[52], this.offset_register = t[53], this.palette_source = t[54], this.attribute_mode = t[55], this.color_plane_enable = t[56], this.horizontal_panning = t[57], this.color_select = t[58], this.clocking_mode = t[59], this.line_compare = t[60], t[61] && this.pixel_buffer.set(t[61]), this.dac_mask = t[62] === void 0 ? 255 : t[62], this.bus.send("screen-set-mode", this.graphical_mode), this.graphical_mode ? (this.screen_height = this.screen_width = 0, this.svga_enabled ? (this.set_size_graphical(
      this.svga_width,
      this.svga_height,
      this.svga_bpp,
      this.svga_width,
      this.svga_height
    ), this.update_layers()) : (this.update_vga_size(), this.update_layers(), this.complete_replot())) : (this.set_size_text(this.max_cols, this.max_rows), this.update_cursor_scanline(), this.update_cursor()), this.complete_redraw();
  }, T.prototype.vga_memory_read = function(t) {
    if (this.svga_enabled && this.graphical_mode_is_linear)
      return this.cpu.read8(
        (t - 655360 | this.svga_bank_offset) + de | 0
      );
    var e = this.miscellaneous_graphics_register >> 2 & 3;
    return t -= Ui[e], 0 > t || t >= $e[e] ? (n("vga read outside memory space: addr:" + h(t), y), 0) : (this.latch_dword = this.plane0[t], this.latch_dword |= this.plane1[t] << 8, this.latch_dword |= this.plane2[t] << 16, this.latch_dword |= this.plane3[t] << 24, this.planar_mode & 8 ? (e = 255, this.color_dont_care & 1 && (e &= this.plane0[t] ^ ~(this.color_compare & 1 ? 255 : 0)), this.color_dont_care & 2 && (e &= this.plane1[t] ^ ~(this.color_compare & 2 ? 255 : 0)), this.color_dont_care & 4 && (e &= this.plane2[t] ^ ~(this.color_compare & 4 ? 255 : 0)), this.color_dont_care & 8 && (e &= this.plane3[t] ^ ~(this.color_compare & 8 ? 255 : 0)), e) : (e = this.plane_read, this.graphical_mode ? this.sequencer_memory_mode & 8 ? (e = t & 3, t &= -4) : this.planar_mode & 16 && (e = t & 1, t &= -2) : e = 0, this.vga_memory[e << 16 | t]));
  }, T.prototype.vga_memory_write = function(t, e) {
    if (this.svga_enabled && this.graphical_mode && this.graphical_mode_is_linear)
      this.cpu.write8(
        (t - 655360 | this.svga_bank_offset) + de | 0,
        e
      );
    else {
      var i = this.miscellaneous_graphics_register >> 2 & 3;
      t -= Ui[i], 0 > t || t >= $e[i] ? n(
        "vga write outside memory space: addr:" + h(t) + ", value:" + h(e),
        y
      ) : this.graphical_mode ? this.vga_memory_write_graphical(t, e) : this.plane_write_bm & 3 && this.vga_memory_write_text_mode(t, e);
    }
  }, T.prototype.vga_memory_write_graphical = function(t, e) {
    var i = this.planar_mode & 3, s = this.apply_feed(this.planar_bitmap), r = this.apply_expand(this.planar_setreset), _ = this.apply_expand(this.planar_setreset_enable);
    switch (i) {
      case 0:
        e = this.apply_rotate(e);
        var o = this.apply_feed(e);
        o = this.apply_setreset(o, _), o = this.apply_logical(o, this.latch_dword), o = this.apply_bitmask(o, s);
        break;
      case 1:
        o = this.latch_dword;
        break;
      case 2:
        o = this.apply_expand(e), o = this.apply_logical(o, this.latch_dword), o = this.apply_bitmask(o, s);
        break;
      case 3:
        e = this.apply_rotate(e), s &= this.apply_feed(e), o = this.apply_bitmask(r, s);
    }
    switch (e = 15, this.sequencer_memory_mode & 12) {
      case 0:
        e = 5 << (t & 1), t &= -2;
        break;
      case 8:
      case 12:
        e = 1 << (t & 3), t &= -4;
    }
    e &= this.plane_write_bm, e & 1 && (this.plane0[t] = o >> 0 & 255), e & 2 && (this.plane1[t] = o >> 8 & 255), e & 4 && (this.plane2[t] = o >> 16 & 255), e & 8 && (this.plane3[t] = o >> 24 & 255), t = this.vga_addr_to_pixel(t), this.partial_replot(t, t + 7);
  }, T.prototype.apply_feed = function(t) {
    return t | t << 8 | t << 16 | t << 24;
  }, T.prototype.apply_expand = function(t) {
    return (t & 1 ? 255 : 0) | (t & 2 ? 255 : 0) << 8 | (t & 4 ? 255 : 0) << 16 | (t & 8 ? 255 : 0) << 24;
  }, T.prototype.apply_rotate = function(t) {
    return (t | t << 8) >>> (this.planar_rotate_reg & 7) & 255;
  }, T.prototype.apply_setreset = function(t, e) {
    var i = this.apply_expand(this.planar_setreset);
    return (t | e & i) & (~e | i);
  }, T.prototype.apply_logical = function(t, e) {
    switch (this.planar_rotate_reg & 24) {
      case 8:
        return t & e;
      case 16:
        return t | e;
      case 24:
        return t ^ e;
    }
    return t;
  }, T.prototype.apply_bitmask = function(t, e) {
    return e & t | ~e & this.latch_dword;
  }, T.prototype.text_mode_redraw = function() {
    for (var t = this.start_address << 1, e, i, s = 0; s < this.max_rows; s++)
      for (var r = 0; r < this.max_cols; r++)
        e = this.vga_memory[t], i = this.vga_memory[t | 1], this.bus.send("screen-put-char", [
          s,
          r,
          e,
          this.vga256_palette[this.dac_mask & this.dac_map[i >> 4 & 15]],
          this.vga256_palette[this.dac_mask & this.dac_map[i & 15]]
        ]), t += 2;
  }, T.prototype.vga_memory_write_text_mode = function(t, e) {
    var i = (t >> 1) - this.start_address, s = i / this.max_cols | 0;
    if (i %= this.max_cols, t & 1)
      var r = e, _ = this.vga_memory[t & -2];
    else
      _ = e, r = this.vga_memory[t | 1];
    this.bus.send("screen-put-char", [
      s,
      i,
      _,
      this.vga256_palette[this.dac_mask & this.dac_map[r >> 4 & 15]],
      this.vga256_palette[this.dac_mask & this.dac_map[r & 15]]
    ]), this.vga_memory[t] = e;
  }, T.prototype.update_cursor = function() {
    var t = (this.cursor_address - this.start_address) / this.max_cols | 0, e = (this.cursor_address - this.start_address) % this.max_cols;
    t = Math.min(this.max_rows - 1, t), this.bus.send("screen-update-cursor", [t, e]);
  }, T.prototype.complete_redraw = function() {
    n("complete redraw", y), this.graphical_mode ? this.svga_enabled ? this.cpu.svga_mark_dirty() : (this.diff_addr_min = 0, this.diff_addr_max = ce) : this.text_mode_redraw();
  }, T.prototype.complete_replot = function() {
    n("complete replot", y), this.graphical_mode && !this.svga_enabled && (this.diff_plot_min = 0, this.diff_plot_max = ce, this.complete_redraw());
  }, T.prototype.partial_redraw = function(t, e) {
    t < this.diff_addr_min && (this.diff_addr_min = t), e > this.diff_addr_max && (this.diff_addr_max = e);
  }, T.prototype.partial_replot = function(t, e) {
    t < this.diff_plot_min && (this.diff_plot_min = t), e > this.diff_plot_max && (this.diff_plot_max = e), this.partial_redraw(t, e);
  }, T.prototype.reset_diffs = function() {
    this.diff_addr_min = this.vga_memory_size, this.diff_addr_max = 0, this.diff_plot_min = this.vga_memory_size, this.diff_plot_max = 0;
  }, T.prototype.destroy = function() {
  }, T.prototype.vga_bytes_per_line = function() {
    var t = this.offset_register << 2;
    return this.underline_location_register & 64 ? t <<= 1 : this.crtc_mode & 64 && (t >>>= 1), t;
  }, T.prototype.vga_addr_shift_count = function() {
    var t = 128 + (~this.underline_location_register & this.crtc_mode & 64);
    return t -= this.underline_location_register & 64, t -= this.attribute_mode & 64, t >>> 6;
  }, T.prototype.vga_addr_to_pixel = function(t) {
    var e = this.vga_addr_shift_count();
    if (~this.crtc_mode & 3) {
      var i = t - this.start_address;
      i &= this.crtc_mode << 13 | -24577, i <<= e;
      var s = i / this.virtual_width | 0;
      switch (i %= this.virtual_width, this.crtc_mode & 3) {
        case 2:
          s = s << 1 | t >> 13 & 1;
          break;
        case 1:
          s = s << 1 | t >> 14 & 1;
          break;
        case 0:
          s = s << 2 | t >> 13 & 3;
      }
      return s * this.virtual_width + i + (this.start_address << e);
    }
    return t << e;
  }, T.prototype.scan_line_to_screen_row = function(t) {
    return this.max_scan_line & 128 && (t >>>= 1), t = Math.ceil(t / (1 + (this.max_scan_line & 31))), this.crtc_mode & 1 || (t <<= 1), this.crtc_mode & 2 || (t <<= 1), t;
  }, T.prototype.set_size_text = function(t, e) {
    this.max_cols = t, this.max_rows = e, this.bus.send("screen-set-size-text", [t, e]);
  }, T.prototype.set_size_graphical = function(t, e, i, s, r) {
    if (!this.stats.is_graphical || this.stats.bpp !== i || this.screen_width !== t || this.screen_height !== e || this.virtual_width !== s || this.virtual_height !== r) {
      if (this.screen_width = t, this.screen_height = e, this.virtual_width = s, this.virtual_height = r, this.stats.bpp = i, this.stats.is_graphical = !0, this.stats.res_x = t, this.stats.res_y = e, typeof ImageData < "u") {
        const _ = s * r, o = this.cpu.svga_allocate_dest_buffer(_) >>> 0;
        this.dest_buffet_offset = o, this.image_data = new ImageData(
          new Uint8ClampedArray(
            this.cpu.wasm_memory.buffer,
            o,
            4 * _
          ),
          s,
          r
        ), this.cpu.svga_mark_dirty();
      }
      this.bus.send("screen-set-size-graphical", [t, e, s, r, i]);
    }
  }, T.prototype.update_vga_size = function() {
    if (!this.svga_enabled) {
      var t = Math.min(
        1 + this.horizontal_display_enable_end,
        this.horizontal_blank_start
      ), e = Math.min(
        1 + this.vertical_display_enable_end,
        this.vertical_blank_start
      );
      if (t && e)
        if (this.graphical_mode) {
          t <<= 3;
          var i = this.offset_register << 4;
          this.attribute_mode & 64 && (t >>>= 1, i >>>= 1), e = this.scan_line_to_screen_row(e);
          var s = Math.ceil(
            $e[0] / this.vga_bytes_per_line()
          );
          this.set_size_graphical(t, e, 8, i, s), this.update_vertical_retrace(), this.update_layers();
        } else
          this.max_scan_line & 128 && (e >>>= 1), i = e / (1 + (this.max_scan_line & 31)) | 0, t && i && this.set_size_text(t, i);
    }
  }, T.prototype.update_layers = function() {
    if (this.graphical_mode || this.text_mode_redraw(), this.svga_enabled)
      this.layers = [];
    else if (this.virtual_width && this.screen_width)
      if (!this.palette_source || this.clocking_mode & 32)
        this.layers = [], this.bus.send("screen-clear");
      else {
        var t = this.start_address_latched, e = this.horizontal_panning;
        this.attribute_mode & 64 && (e >>>= 1);
        var i = this.preset_row_scan >> 5 & 3, s = this.vga_addr_to_pixel(t + i);
        t = s / this.virtual_width | 0;
        var r = s % this.virtual_width + e;
        s = this.scan_line_to_screen_row(1 + this.line_compare), s = Math.min(s, this.screen_height);
        var _ = this.screen_height - s;
        this.layers = [], r = -r;
        for (var o = 0; r < this.screen_width; r += this.virtual_width, o++)
          this.layers.push({
            image_data: this.image_data,
            screen_x: r,
            screen_y: 0,
            buffer_x: 0,
            buffer_y: t + o,
            buffer_width: this.virtual_width,
            buffer_height: s
          });
        for (t = 0, this.attribute_mode & 32 || (t = this.vga_addr_to_pixel(i) + e), r = -t, o = 0; r < this.screen_width; r += this.virtual_width, o++)
          this.layers.push({
            image_data: this.image_data,
            screen_x: r,
            screen_y: s,
            buffer_x: 0,
            buffer_y: o,
            buffer_width: this.virtual_width,
            buffer_height: _
          });
      }
  }, T.prototype.update_vertical_retrace = function() {
    this.port_3DA_value |= 8, this.start_address_latched !== this.start_address && (this.start_address_latched = this.start_address, this.update_layers());
  }, T.prototype.update_cursor_scanline = function() {
    this.bus.send("screen-update-cursor-scanline", [
      this.cursor_scanline_start,
      this.cursor_scanline_end
    ]);
  }, T.prototype.port3C0_write = function(t) {
    if (this.attribute_controller_index === -1)
      n("attribute controller index register: " + h(t), y), this.attribute_controller_index = t & 31, n(
        "attribute actual index: " + h(this.attribute_controller_index),
        y
      ), this.palette_source !== (t & 32) && (this.palette_source = t & 32, this.update_layers());
    else {
      if (16 > this.attribute_controller_index)
        n(
          "internal palette: " + h(this.attribute_controller_index) + " -> " + h(t),
          y
        ), this.dac_map[this.attribute_controller_index] = t, this.attribute_mode & 64 || this.complete_redraw();
      else
        switch (this.attribute_controller_index) {
          case 16:
            if (n(
              "3C0 / attribute mode control: " + h(t),
              y
            ), this.attribute_mode !== t) {
              var e = this.attribute_mode;
              this.attribute_mode = t;
              var i = 0 < (t & 1);
              this.svga_enabled || this.graphical_mode === i || (this.graphical_mode = i, this.bus.send(
                "screen-set-mode",
                this.graphical_mode
              )), (e ^ t) & 64 && this.complete_replot(), this.update_vga_size(), this.complete_redraw();
            }
            break;
          case 18:
            n("3C0 / color plane enable: " + h(t), y), this.color_plane_enable !== t && (this.color_plane_enable = t, this.complete_redraw());
            break;
          case 19:
            n("3C0 / horizontal panning: " + h(t), y), this.horizontal_panning !== t && (this.horizontal_panning = t & 15, this.update_layers());
            break;
          case 20:
            n("3C0 / color select: " + h(t), y), this.color_select !== t && (this.color_select = t, this.complete_redraw());
            break;
          default:
            n(
              "3C0 / attribute controller write " + h(this.attribute_controller_index) + ": " + h(t),
              y
            );
        }
      this.attribute_controller_index = -1;
    }
  }, T.prototype.port3C0_read = function() {
    return n("3C0 read", y), (this.attribute_controller_index | this.palette_source) & 255;
  }, T.prototype.port3C0_read16 = function() {
    return n("3C0 read16", y), this.port3C0_read() | this.port3C1_read() << 8 & 65280;
  }, T.prototype.port3C1_read = function() {
    if (16 > this.attribute_controller_index)
      return n(
        "3C1 / internal palette read: " + h(this.attribute_controller_index) + " -> " + h(this.dac_map[this.attribute_controller_index]),
        y
      ), this.dac_map[this.attribute_controller_index] & 255;
    switch (this.attribute_controller_index) {
      case 16:
        return n(
          "3C1 / attribute mode read: " + h(this.attribute_mode),
          y
        ), this.attribute_mode;
      case 18:
        return n(
          "3C1 / color plane enable read: " + h(this.color_plane_enable),
          y
        ), this.color_plane_enable;
      case 19:
        return n(
          "3C1 / horizontal panning read: " + h(this.horizontal_panning),
          y
        ), this.horizontal_panning;
      case 20:
        return n(
          "3C1 / color select read: " + h(this.color_select),
          y
        ), this.color_select;
      default:
        n(
          "3C1 / attribute controller read " + h(this.attribute_controller_index),
          y
        );
    }
    return 255;
  }, T.prototype.port3C2_write = function(t) {
    n("3C2 / miscellaneous output register = " + h(t), y), this.miscellaneous_output_register = t;
  }, T.prototype.port3C4_write = function(t) {
    this.sequencer_index = t;
  }, T.prototype.port3C4_read = function() {
    return this.sequencer_index;
  }, T.prototype.port3C5_write = function(t) {
    switch (this.sequencer_index) {
      case 1:
        n("clocking mode: " + h(t), y);
        var e = this.clocking_mode;
        this.clocking_mode = t, (e ^ t) & 32 && this.update_layers();
        break;
      case 2:
        n("plane write mask: " + h(t), y), this.plane_write_bm = t;
        break;
      case 4:
        n("sequencer memory mode: " + h(t), y), this.sequencer_memory_mode = t;
        break;
      default:
        n(
          "3C5 / sequencer write " + h(this.sequencer_index) + ": " + h(t),
          y
        );
    }
  }, T.prototype.port3C5_read = function() {
    switch (n("3C5 / sequencer read " + h(this.sequencer_index), y), this.sequencer_index) {
      case 1:
        return this.clocking_mode;
      case 2:
        return this.plane_write_bm;
      case 4:
        return this.sequencer_memory_mode;
      case 6:
        return 18;
    }
    return 0;
  }, T.prototype.port3C6_write = function(t) {
    this.dac_mask = t;
  }, T.prototype.port3C6_read = function() {
    return this.dac_mask;
  }, T.prototype.port3C7_write = function(t) {
    n("3C7 write: " + h(t), y), this.dac_color_index_read = 3 * t, this.dac_state &= 0;
  }, T.prototype.port3C7_read = function() {
    return this.dac_state;
  }, T.prototype.port3C8_write = function(t) {
    this.dac_color_index_write = 3 * t, this.dac_state |= 3;
  }, T.prototype.port3C8_read = function() {
    return this.dac_color_index_write / 3 & 255;
  }, T.prototype.port3C9_write = function(t) {
    var e = this.dac_color_index_write / 3 | 0, i = this.dac_color_index_write % 3, s = this.vga256_palette[e];
    if (!(this.dispi_enable_value & 32)) {
      t &= 63;
      const r = t & 1;
      t = t << 2 | r << 1 | r;
    }
    i === 0 ? s = s & -16711681 | t << 16 : i === 1 ? s = s & -65281 | t << 8 : (s = s & -256 | t, n(
      "dac set color, index=" + h(e) + " value=" + h(s),
      y
    )), this.vga256_palette[e] !== s && (this.vga256_palette[e] = s, this.complete_redraw()), this.dac_color_index_write++;
  }, T.prototype.port3C9_read = function() {
    n("3C9 read", y);
    var t = this.vga256_palette[this.dac_color_index_read / 3 | 0] >> 8 * (2 - this.dac_color_index_read % 3) & 255;
    return this.dac_color_index_read++, this.dispi_enable_value & 32 ? t : t >> 2;
  }, T.prototype.port3CC_read = function() {
    return n("3CC read", y), this.miscellaneous_output_register;
  }, T.prototype.port3CE_write = function(t) {
    this.graphics_index = t;
  }, T.prototype.port3CE_read = function() {
    return this.graphics_index;
  }, T.prototype.port3CF_write = function(t) {
    switch (this.graphics_index) {
      case 0:
        this.planar_setreset = t, n("plane set/reset: " + h(t), y);
        break;
      case 1:
        this.planar_setreset_enable = t, n("plane set/reset enable: " + h(t), y);
        break;
      case 2:
        this.color_compare = t, n("color compare: " + h(t), y);
        break;
      case 3:
        this.planar_rotate_reg = t, n("plane rotate: " + h(t), y);
        break;
      case 4:
        this.plane_read = t, n("plane read: " + h(t), y);
        break;
      case 5:
        var e = this.planar_mode;
        this.planar_mode = t, n("planar mode: " + h(t), y), (e ^ t) & 96 && this.complete_replot();
        break;
      case 6:
        n("miscellaneous graphics register: " + h(t), y), this.miscellaneous_graphics_register !== t && (this.miscellaneous_graphics_register = t, this.update_vga_size());
        break;
      case 7:
        this.color_dont_care = t, n("color don't care: " + h(t), y);
        break;
      case 8:
        this.planar_bitmap = t, n("planar bitmap: " + h(t), y);
        break;
      default:
        n(
          "3CF / graphics write " + h(this.graphics_index) + ": " + h(t),
          y
        );
    }
  }, T.prototype.port3CF_read = function() {
    switch (n("3CF / graphics read " + h(this.graphics_index), y), this.graphics_index) {
      case 0:
        return this.planar_setreset;
      case 1:
        return this.planar_setreset_enable;
      case 2:
        return this.color_compare;
      case 3:
        return this.planar_rotate_reg;
      case 4:
        return this.plane_read;
      case 5:
        return this.planar_mode;
      case 6:
        return this.miscellaneous_graphics_register;
      case 7:
        return this.color_dont_care;
      case 8:
        return this.planar_bitmap;
    }
    return 0;
  }, T.prototype.port3D4_write = function(t) {
    n("3D4 / crtc index: " + t, y), this.index_crtc = t;
  }, T.prototype.port3D4_read = function() {
    return n("3D4 read / crtc index: " + this.index_crtc, y), this.index_crtc;
  }, T.prototype.port3D5_write = function(t) {
    switch (this.index_crtc) {
      case 1:
        n("3D5 / hdisp enable end write: " + h(t), y), this.horizontal_display_enable_end !== t && (this.horizontal_display_enable_end = t, this.update_vga_size());
        break;
      case 2:
        this.horizontal_blank_start !== t && (this.horizontal_blank_start = t, this.update_vga_size());
        break;
      case 7:
        n("3D5 / overflow register write: " + h(t), y);
        var e = this.vertical_display_enable_end;
        this.vertical_display_enable_end &= 255, this.vertical_display_enable_end = this.vertical_display_enable_end | t << 3 & 512 | t << 7 & 256, e != this.vertical_display_enable_end && this.update_vga_size(), this.line_compare = this.line_compare & 767 | t << 4 & 256, e = this.vertical_blank_start, this.vertical_blank_start = this.vertical_blank_start & 767 | t << 5 & 256, e !== this.vertical_blank_start && this.update_vga_size(), this.update_layers();
        break;
      case 8:
        n("3D5 / preset row scan write: " + h(t), y), this.preset_row_scan = t, this.update_layers();
        break;
      case 9:
        n("3D5 / max scan line write: " + h(t), y), this.max_scan_line = t, this.line_compare = this.line_compare & 511 | t << 3 & 512, e = this.vertical_blank_start, this.vertical_blank_start = this.vertical_blank_start & 511 | t << 4 & 512, e !== this.vertical_blank_start && this.update_vga_size(), this.update_layers();
        break;
      case 10:
        n("3D5 / cursor scanline start write: " + h(t), y), this.cursor_scanline_start = t, this.update_cursor_scanline();
        break;
      case 11:
        n("3D5 / cursor scanline end write: " + h(t), y), this.cursor_scanline_end = t, this.update_cursor_scanline();
        break;
      case 12:
        (this.start_address >> 8 & 255) !== t && (this.start_address = this.start_address & 255 | t << 8, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot()), n(
          "3D5 / start addr hi write: " + h(t) + " -> " + h(this.start_address, 4),
          y
        );
        break;
      case 13:
        (this.start_address & 255) !== t && (this.start_address = this.start_address & 65280 | t, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot()), n(
          "3D5 / start addr lo write: " + h(t) + " -> " + h(this.start_address, 4),
          y
        );
        break;
      case 14:
        n("3D5 / cursor address hi write: " + h(t), y), this.cursor_address = this.cursor_address & 255 | t << 8, this.update_cursor();
        break;
      case 15:
        n("3D5 / cursor address lo write: " + h(t), y), this.cursor_address = this.cursor_address & 65280 | t, this.update_cursor();
        break;
      case 18:
        n("3D5 / vdisp enable end write: " + h(t), y), (this.vertical_display_enable_end & 255) !== t && (this.vertical_display_enable_end = this.vertical_display_enable_end & 768 | t, this.update_vga_size());
        break;
      case 19:
        n("3D5 / offset register write: " + h(t), y), this.offset_register !== t && (this.offset_register = t, this.update_vga_size(), ~this.crtc_mode & 3 && this.complete_replot());
        break;
      case 20:
        n("3D5 / underline location write: " + h(t), y), this.underline_location_register !== t && (e = this.underline_location_register, this.underline_location_register = t, this.update_vga_size(), (e ^ t) & 64 && this.complete_replot());
        break;
      case 21:
        n("3D5 / vertical blank start write: " + h(t), y), (this.vertical_blank_start & 255) !== t && (this.vertical_blank_start = this.vertical_blank_start & 768 | t, this.update_vga_size());
        break;
      case 23:
        n("3D5 / crtc mode write: " + h(t), y), this.crtc_mode !== t && (e = this.crtc_mode, this.crtc_mode = t, this.update_vga_size(), (e ^ t) & 67 && this.complete_replot());
        break;
      case 24:
        n("3D5 / line compare write: " + h(t), y), this.line_compare = this.line_compare & 768 | t, this.update_layers();
        break;
      default:
        this.index_crtc < this.crtc.length && (this.crtc[this.index_crtc] = t), n(
          "3D5 / CRTC write " + h(this.index_crtc) + ": " + h(t),
          y
        );
    }
  }, T.prototype.port3D5_read = function() {
    switch (n("3D5 read " + h(this.index_crtc), y), this.index_crtc) {
      case 1:
        return this.horizontal_display_enable_end;
      case 2:
        return this.horizontal_blank_start;
      case 7:
        return this.vertical_display_enable_end >> 7 & 2 | this.vertical_blank_start >> 5 & 8 | this.line_compare >> 4 & 16 | this.vertical_display_enable_end >> 3 & 64;
      case 8:
        return this.preset_row_scan;
      case 9:
        return this.max_scan_line;
      case 10:
        return this.cursor_scanline_start;
      case 11:
        return this.cursor_scanline_end;
      case 12:
        return this.start_address & 255;
      case 13:
        return this.start_address >> 8;
      case 14:
        return this.cursor_address >> 8;
      case 15:
        return this.cursor_address & 255;
      case 18:
        return this.vertical_display_enable_end & 255;
      case 19:
        return this.offset_register;
      case 20:
        return this.underline_location_register;
      case 21:
        return this.vertical_blank_start & 255;
      case 23:
        return this.crtc_mode;
      case 24:
        return this.line_compare & 255;
    }
    return this.index_crtc < this.crtc.length ? this.crtc[this.index_crtc] : 0;
  }, T.prototype.port3DA_read = function() {
    n("3DA read - status 1 and clear attr index", y);
    var t = this.port_3DA_value;
    return this.graphical_mode ? (this.port_3DA_value ^= 1, this.port_3DA_value &= 1) : (this.port_3DA_value & 1 && (this.port_3DA_value ^= 8), this.port_3DA_value ^= 1), this.attribute_controller_index = -1, t;
  }, T.prototype.port1CE_write = function(t) {
    this.dispi_index = t;
  }, T.prototype.port1CF_write = function(t) {
    switch (n(
      "1CF / dispi write " + h(this.dispi_index) + ": " + h(t),
      y
    ), this.dispi_index) {
      case 0:
        45248 <= t && 45253 >= t ? this.svga_version = t : n("Invalid version value: " + h(t), y);
        break;
      case 1:
        this.svga_width = t, this.svga_width > Se && (n(
          "svga_width reduced from " + this.svga_width + " to " + Se,
          y
        ), this.svga_width = Se);
        break;
      case 2:
        this.svga_height = t, this.svga_height > Oe && (n(
          "svga_height reduced from " + this.svga_height + " to " + Oe,
          y
        ), this.svga_height = Oe);
        break;
      case 3:
        this.svga_bpp = t;
        break;
      case 4:
        this.svga_enabled = (t & 1) === 1, this.dispi_enable_value = t;
        break;
      case 5:
        n("SVGA bank offset: " + h(t << 16), y), this.svga_bank_offset = t << 16;
        break;
      case 9:
        const e = t * this.svga_width;
        n("SVGA offset: " + h(e) + " y=" + h(t), y), this.svga_offset !== e && (this.svga_offset = e, this.complete_redraw());
    }
    !this.svga_enabled || this.svga_width && this.svga_height || (n(
      "SVGA: disabled because of invalid width/height: " + this.svga_width + "x" + this.svga_height,
      y
    ), this.svga_enabled = !1), this.svga_bpp, this.svga_bpp === 4 || this.svga_bpp === 8 || this.svga_bpp === 15 || this.svga_bpp === 16 || this.svga_bpp === 24 || this.svga_bpp, "" + this.svga_bpp, n(
      "SVGA: enabled=" + this.svga_enabled + ", " + this.svga_width + "x" + this.svga_height + "x" + this.svga_bpp,
      y
    ), this.svga_enabled && this.dispi_index === 4 && (this.set_size_graphical(
      this.svga_width,
      this.svga_height,
      this.svga_bpp,
      this.svga_width,
      this.svga_height
    ), this.bus.send("screen-set-mode", !0), this.graphical_mode_is_linear = this.graphical_mode = !0), this.svga_enabled || (this.svga_bank_offset = 0), this.update_layers();
  }, T.prototype.port1CF_read = function() {
    return n("1CF / dispi read " + h(this.dispi_index), y), this.svga_register_read(this.dispi_index);
  }, T.prototype.svga_register_read = function(t) {
    switch (t) {
      case 0:
        return this.svga_version;
      case 1:
        return this.dispi_enable_value & 2 ? Se : this.svga_width;
      case 2:
        return this.dispi_enable_value & 2 ? Oe : this.svga_height;
      case 3:
        return this.dispi_enable_value & 2 ? Wr : this.svga_bpp;
      case 4:
        return this.dispi_enable_value;
      case 5:
        return this.svga_bank_offset >>> 16;
      case 6:
        return this.screen_width ? this.screen_width : 1;
      case 8:
        return 0;
      case 10:
        return this.vga_memory_size / ct | 0;
    }
    return 255;
  }, T.prototype.vga_replot = function() {
    for (var t = this.diff_plot_min & -16, e = Math.min(
      this.diff_plot_max | 15,
      ce - 1
    ), i = this.vga_addr_shift_count(), s = ~this.crtc_mode & 3, r = this.planar_mode & 96, _ = this.attribute_mode & 64; t <= e; ) {
      var o = t >>> i;
      if (s) {
        var a = t / this.virtual_width | 0, d = t - this.virtual_width * a;
        switch (s) {
          case 1:
            o = (a & 1) << 13, a >>>= 1;
            break;
          case 2:
            o = (a & 1) << 14, a >>>= 1;
            break;
          case 3:
            o = (a & 3) << 13, a >>>= 2;
        }
        o |= (a * this.virtual_width + d >>> i) + this.start_address;
      }
      a = this.plane0[o], d = this.plane1[o];
      var c = this.plane2[o], u = this.plane3[o];
      switch (o = new Uint8Array(8), r) {
        case 0:
          a <<= 0, d <<= 1, c <<= 2, u <<= 3;
          for (var p = 7; 0 <= p; p--)
            o[7 - p] = a >> p & 1 | d >> p & 2 | c >> p & 4 | u >> p & 8;
          break;
        case 32:
          o[0] = a >> 6 & 3 | c >> 4 & 12, o[1] = a >> 4 & 3 | c >> 2 & 12, o[2] = a >> 2 & 3 | c >> 0 & 12, o[3] = a >> 0 & 3 | c << 2 & 12, o[4] = d >> 6 & 3 | u >> 4 & 12, o[5] = d >> 4 & 3 | u >> 2 & 12, o[6] = d >> 2 & 3 | u >> 0 & 12, o[7] = d >> 0 & 3 | u << 2 & 12;
          break;
        case 64:
        case 96:
          o[0] = a >> 4 & 15, o[1] = a >> 0 & 15, o[2] = d >> 4 & 15, o[3] = d >> 0 & 15, o[4] = c >> 4 & 15, o[5] = c >> 0 & 15, o[6] = u >> 4 & 15, o[7] = u >> 0 & 15;
      }
      if (_)
        for (a = p = 0; 4 > p; p++, t++, a += 2)
          this.pixel_buffer[t] = o[a] << 4 | o[a + 1];
      else
        for (p = 0; 8 > p; p++, t++)
          this.pixel_buffer[t] = o[p];
    }
  }, T.prototype.vga_redraw = function() {
    var t = this.diff_addr_min, e = Math.min(this.diff_addr_max, ce - 1);
    const i = new Int32Array(
      this.cpu.wasm_memory.buffer,
      this.dest_buffet_offset,
      this.virtual_width * this.virtual_height
    );
    var s = 255, r = 0;
    if (this.attribute_mode & 128 && (s &= 207, r |= this.color_select << 4 & 48), this.attribute_mode & 64)
      for (; t <= e; t++) {
        var _ = this.pixel_buffer[t] & s | r;
        _ = this.vga256_palette[_], i[t] = _ & 65280 | _ << 16 | _ >> 16 | 4278190080;
      }
    else
      for (s &= 63, r |= this.color_select << 4 & 192; t <= e; t++)
        _ = this.dac_map[this.pixel_buffer[t] & this.color_plane_enable] & s | r, _ = this.vga256_palette[_], i[t] = _ & 65280 | _ << 16 | _ >> 16 | 4278190080;
  }, T.prototype.screen_fill_buffer = function() {
    if (this.graphical_mode) {
      if (this.image_data.data.byteLength === 0) {
        var t = new Uint8ClampedArray(
          this.cpu.wasm_memory.buffer,
          this.dest_buffet_offset,
          4 * this.virtual_width * this.virtual_height
        );
        this.image_data = new ImageData(
          t,
          this.virtual_width,
          this.virtual_height
        ), this.update_layers();
      }
      if (this.svga_enabled) {
        t = 0;
        let s = this.svga_height;
        if (this.svga_bpp === 8) {
          const r = new Int32Array(
            this.cpu.wasm_memory.buffer,
            this.dest_buffet_offset,
            this.screen_width * this.screen_height
          ), _ = new Uint8Array(
            this.cpu.wasm_memory.buffer,
            this.svga_memory.byteOffset,
            this.vga_memory_size
          );
          for (var e = 0; e < r.length; e++) {
            var i = this.vga256_palette[_[e]];
            r[e] = i & 65280 | i << 16 | i >> 16 | 4278190080;
          }
        } else
          this.cpu.svga_fill_pixel_buffer(
            this.svga_bpp,
            this.svga_offset
          ), e = this.svga_bpp === 15 ? 2 : this.svga_bpp / 8, t = ((this.cpu.svga_dirty_bitmap_min_offset[0] / e | 0) - this.svga_offset) / this.svga_width | 0, s = (((this.cpu.svga_dirty_bitmap_max_offset[0] / e | 0) - this.svga_offset) / this.svga_width | 0) + 1;
        t < s && (t = Math.max(t, 0), s = Math.min(s, this.svga_height), this.bus.send("screen-fill-buffer-end", [
          {
            image_data: this.image_data,
            screen_x: 0,
            screen_y: t,
            buffer_x: 0,
            buffer_y: t,
            buffer_width: this.svga_width,
            buffer_height: s - t
          }
        ]));
      } else
        this.vga_replot(), this.vga_redraw(), this.bus.send("screen-fill-buffer-end", this.layers);
      this.reset_diffs();
    }
    this.update_vertical_retrace();
  };
  function ht(t, e) {
    this.cpu = t, this.bus = e, this.use_mouse = this.enable_mouse_stream = !1, this.have_mouse = !0, this.mouse_clicks = this.mouse_delta_y = this.mouse_delta_x = 0, this.have_keyboard = !0, this.next_read_resolution = this.next_read_rate = this.next_handle_scan_code_set = this.next_read_led = this.next_read_sample = this.next_is_mouse_command = this.enable_keyboard_stream = !1, this.kbd_buffer = new he(1024), this.last_port60_byte = 0, this.sample_rate = 100, this.mouse_id = this.mouse_detect_state = 0, this.mouse_reset_workaround = !1, this.wheel_movement = 0, this.resolution = 4, this.scaling2 = !1, this.last_mouse_packet = -1, this.mouse_buffer = new he(1024), this.next_byte_is_aux = this.next_byte_is_ready = !1, this.bus.register(
      "keyboard-code",
      function(i) {
        this.kbd_send_code(i);
      },
      this
    ), this.bus.register(
      "mouse-click",
      function(i) {
        this.mouse_send_click(i[0], i[1], i[2]);
      },
      this
    ), this.bus.register(
      "mouse-delta",
      function(i) {
        this.mouse_send_delta(i[0], i[1]);
      },
      this
    ), this.bus.register(
      "mouse-wheel",
      function(i) {
        this.wheel_movement -= i[0], this.wheel_movement -= 2 * i[1], this.wheel_movement = Math.min(
          7,
          Math.max(-8, this.wheel_movement)
        ), this.send_mouse_packet(0, 0);
      },
      this
    ), this.command_register = 5, this.controller_output_port = 0, this.read_controller_output_port = this.read_command_register = this.read_output_register = !1, t.io.register_read(96, this, this.port60_read), t.io.register_read(100, this, this.port64_read), t.io.register_write(96, this, this.port60_write), t.io.register_write(100, this, this.port64_write);
  }
  ht.prototype.get_state = function() {
    var t = [];
    return t[0] = this.enable_mouse_stream, t[1] = this.use_mouse, t[2] = this.have_mouse, t[3] = this.mouse_delta_x, t[4] = this.mouse_delta_y, t[5] = this.mouse_clicks, t[6] = this.have_keyboard, t[7] = this.enable_keyboard_stream, t[8] = this.next_is_mouse_command, t[9] = this.next_read_sample, t[10] = this.next_read_led, t[11] = this.next_handle_scan_code_set, t[12] = this.next_read_rate, t[13] = this.next_read_resolution, t[15] = this.last_port60_byte, t[16] = this.sample_rate, t[17] = this.resolution, t[18] = this.scaling2, t[20] = this.command_register, t[21] = this.read_output_register, t[22] = this.read_command_register, t[23] = this.controller_output_port, t[24] = this.read_controller_output_port, t[25] = this.mouse_id, t[26] = this.mouse_detect_state, t[27] = this.mouse_reset_workaround, t;
  }, ht.prototype.set_state = function(t) {
    this.enable_mouse_stream = t[0], this.use_mouse = t[1], this.have_mouse = t[2], this.mouse_delta_x = t[3], this.mouse_delta_y = t[4], this.mouse_clicks = t[5], this.have_keyboard = t[6], this.enable_keyboard_stream = t[7], this.next_is_mouse_command = t[8], this.next_read_sample = t[9], this.next_read_led = t[10], this.next_handle_scan_code_set = t[11], this.next_read_rate = t[12], this.next_read_resolution = t[13], this.last_port60_byte = t[15], this.sample_rate = t[16], this.resolution = t[17], this.scaling2 = t[18], this.command_register = t[20], this.read_output_register = t[21], this.read_command_register = t[22], this.controller_output_port = t[23], this.read_controller_output_port = t[24], this.mouse_id = t[25] || 0, this.mouse_detect_state = t[26] || 0, this.mouse_reset_workaround = t[27] || !1, this.next_byte_is_aux = this.next_byte_is_ready = !1, this.kbd_buffer.clear(), this.mouse_buffer.clear(), this.bus.send("mouse-enable", this.use_mouse);
  }, ht.prototype.raise_irq = function() {
    this.next_byte_is_ready || (this.kbd_buffer.length ? this.kbd_irq() : this.mouse_buffer.length && this.mouse_irq());
  }, ht.prototype.mouse_irq = function() {
    this.next_byte_is_aux = this.next_byte_is_ready = !0, this.command_register & 2 && (n("Mouse irq", L), this.cpu.device_lower_irq(12), this.cpu.device_raise_irq(12));
  }, ht.prototype.kbd_irq = function() {
    this.next_byte_is_ready = !0, this.next_byte_is_aux = !1, this.command_register & 1 && (n("Keyboard irq", L), this.cpu.device_lower_irq(1), this.cpu.device_raise_irq(1));
  }, ht.prototype.kbd_send_code = function(t) {
    this.enable_keyboard_stream && (n("adding kbd code: " + h(t), L), this.kbd_buffer.push(t), this.raise_irq());
  }, ht.prototype.mouse_send_delta = function(t, e) {
    if (this.have_mouse && this.use_mouse) {
      var i = this.resolution * this.sample_rate / 80;
      this.mouse_delta_x += t * i, this.mouse_delta_y += e * i, this.enable_mouse_stream && (t = this.mouse_delta_x | 0, e = this.mouse_delta_y | 0, t || e) && (this.mouse_delta_x -= t, this.mouse_delta_y -= e, this.send_mouse_packet(t, e));
    }
  }, ht.prototype.mouse_send_click = function(t, e, i) {
    this.have_mouse && this.use_mouse && (this.mouse_clicks = t | i << 1 | e << 2, this.enable_mouse_stream && this.send_mouse_packet(0, 0));
  }, ht.prototype.send_mouse_packet = function(t, e) {
    var i = (0 > e) << 5 | (0 > t) << 4 | 8 | this.mouse_clicks;
    this.last_mouse_packet = Date.now(), this.mouse_buffer.push(i), this.mouse_buffer.push(t), this.mouse_buffer.push(e), this.mouse_id === 4 ? (this.mouse_buffer.push(0 | this.wheel_movement & 15), this.wheel_movement = 0) : this.mouse_id === 3 && (this.mouse_buffer.push(this.wheel_movement & 255), this.wheel_movement = 0), this.raise_irq();
  }, ht.prototype.apply_scaling2 = function(t) {
    var e = t >> 31;
    switch (Math.abs(t)) {
      case 0:
      case 1:
      case 3:
        return t;
      case 2:
        return e;
      case 4:
        return 6 * e;
      case 5:
        return 9 * e;
      default:
        return t << 1;
    }
  }, ht.prototype.port60_read = function() {
    return this.next_byte_is_ready = !1, !this.kbd_buffer.length && !this.mouse_buffer.length ? (n("Port 60 read: Empty", L), this.last_port60_byte) : (this.next_byte_is_aux ? (this.cpu.device_lower_irq(12), this.last_port60_byte = this.mouse_buffer.shift(), n(
      "Port 60 read (mouse): " + h(this.last_port60_byte),
      L
    )) : (this.cpu.device_lower_irq(1), this.last_port60_byte = this.kbd_buffer.shift(), n(
      "Port 60 read (kbd)  : " + h(this.last_port60_byte),
      L
    )), (this.kbd_buffer.length || this.mouse_buffer.length) && this.raise_irq(), this.last_port60_byte);
  }, ht.prototype.port64_read = function() {
    var t = 16;
    return this.next_byte_is_ready && (t |= 1), this.next_byte_is_aux && (t |= 32), n("port 64 read: " + h(t), L), t;
  }, ht.prototype.port60_write = function(t) {
    if (n("port 60 write: " + h(t), L), this.read_command_register)
      this.command_register = t, this.read_command_register = !1, n(
        "Keyboard command register = " + h(this.command_register),
        L
      );
    else if (this.read_output_register)
      this.read_output_register = !1, this.mouse_buffer.clear(), this.mouse_buffer.push(t), this.mouse_irq();
    else if (this.next_read_sample) {
      switch (this.next_read_sample = !1, this.mouse_buffer.clear(), this.mouse_buffer.push(250), this.sample_rate = t, this.mouse_detect_state) {
        case -1:
          t === 60 ? (this.mouse_reset_workaround = !0, this.mouse_detect_state = 0) : (this.mouse_reset_workaround = !1, this.mouse_detect_state = t === 200 ? 1 : 0);
          break;
        case 0:
          t === 200 && (this.mouse_detect_state = 1);
          break;
        case 1:
          this.mouse_detect_state = t === 100 ? 2 : t === 200 ? 3 : 0;
          break;
        case 2:
          t === 80 && (this.mouse_id = 3), this.mouse_detect_state = -1;
          break;
        case 3:
          t === 80 && (this.mouse_id = 4), this.mouse_detect_state = -1;
      }
      n(
        "mouse sample rate: " + h(t) + ", mouse id: " + h(this.mouse_id),
        L
      ), this.sample_rate || (n("invalid sample rate, reset to 100", L), this.sample_rate = 100), this.mouse_irq();
    } else if (this.next_read_resolution)
      this.next_read_resolution = !1, this.mouse_buffer.clear(), this.mouse_buffer.push(250), 3 < t ? (this.resolution = 4, n("invalid resolution, resetting to 4", L)) : (this.resolution = 1 << t, n("resolution: " + this.resolution, L)), this.mouse_irq();
    else if (this.next_read_led)
      this.next_read_led = !1, this.kbd_buffer.push(250), this.kbd_irq();
    else if (this.next_handle_scan_code_set)
      this.next_handle_scan_code_set = !1, this.kbd_buffer.push(250), this.kbd_irq(), t || this.kbd_buffer.push(2);
    else if (this.next_read_rate)
      this.next_read_rate = !1, this.kbd_buffer.push(250), this.kbd_irq();
    else if (this.next_is_mouse_command) {
      if (this.next_is_mouse_command = !1, n("Port 60 data register write: " + h(t), L), this.have_mouse) {
        switch (this.kbd_buffer.clear(), this.mouse_buffer.clear(), this.mouse_buffer.push(250), t) {
          case 230:
            n("Scaling 1:1", L), this.scaling2 = !1;
            break;
          case 231:
            n("Scaling 2:1", L), this.scaling2 = !0;
            break;
          case 232:
            this.next_read_resolution = !0;
            break;
          case 233:
            this.send_mouse_packet(0, 0);
            break;
          case 235:
            n("unimplemented request single packet", L), this.send_mouse_packet(0, 0);
            break;
          case 242:
            n("required id: " + h(this.mouse_id), L), this.mouse_buffer.push(this.mouse_id), this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0, this.raise_irq();
            break;
          case 243:
            this.next_read_sample = !0;
            break;
          case 244:
            this.use_mouse = this.enable_mouse_stream = !0, this.bus.send("mouse-enable", !0), this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
            break;
          case 245:
            this.enable_mouse_stream = !1;
            break;
          case 246:
            this.enable_mouse_stream = !1, this.sample_rate = 100, this.scaling2 = !1, this.resolution = 4;
            break;
          case 255:
            n("Mouse reset", L), this.mouse_buffer.push(170), this.mouse_buffer.push(0), this.use_mouse = !0, this.bus.send("mouse-enable", !0), this.enable_mouse_stream = !1, this.sample_rate = 100, this.scaling2 = !1, this.resolution = 4, this.mouse_reset_workaround || (this.mouse_id = 0), this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
            break;
          default:
            n("Unimplemented mouse command: " + h(t), L);
        }
        this.mouse_irq();
      }
    } else if (this.read_controller_output_port)
      this.read_controller_output_port = !1, this.controller_output_port = t;
    else {
      switch (n("Port 60 data register write: " + h(t), L), this.mouse_buffer.clear(), this.kbd_buffer.clear(), this.kbd_buffer.push(250), t) {
        case 237:
          this.next_read_led = !0;
          break;
        case 240:
          this.next_handle_scan_code_set = !0;
          break;
        case 242:
          this.kbd_buffer.push(171), this.kbd_buffer.push(83);
          break;
        case 243:
          this.next_read_rate = !0;
          break;
        case 244:
          n("kbd enable scanning", L), this.enable_keyboard_stream = !0;
          break;
        case 245:
          n("kbd disable scanning", L), this.enable_keyboard_stream = !1;
          break;
        case 246:
          break;
        case 255:
          this.kbd_buffer.clear(), this.kbd_buffer.push(250), this.kbd_buffer.push(170), this.kbd_buffer.push(0);
          break;
        default:
          n("Unimplemented keyboard command: " + h(t), L);
      }
      this.kbd_irq();
    }
  }, ht.prototype.port64_write = function(t) {
    switch (n("port 64 write: " + h(t), L), t) {
      case 32:
        this.kbd_buffer.clear(), this.mouse_buffer.clear(), this.kbd_buffer.push(this.command_register), this.kbd_irq();
        break;
      case 96:
        this.read_command_register = !0;
        break;
      case 209:
        this.read_controller_output_port = !0;
        break;
      case 211:
        this.read_output_register = !0;
        break;
      case 212:
        this.next_is_mouse_command = !0;
        break;
      case 167:
        n("Disable second port", L), this.command_register |= 32;
        break;
      case 168:
        n("Enable second port", L), this.command_register &= -33;
        break;
      case 169:
        this.kbd_buffer.clear(), this.mouse_buffer.clear(), this.kbd_buffer.push(0), this.kbd_irq();
        break;
      case 170:
        this.kbd_buffer.clear(), this.mouse_buffer.clear(), this.kbd_buffer.push(85), this.kbd_irq();
        break;
      case 171:
        this.kbd_buffer.clear(), this.mouse_buffer.clear(), this.kbd_buffer.push(0), this.kbd_irq();
        break;
      case 173:
        n("Disable Keyboard", L), this.command_register |= 16;
        break;
      case 174:
        n("Enable Keyboard", L), this.command_register &= -17;
        break;
      case 254:
        n("CPU reboot via PS2"), this.cpu.reboot_internal();
        break;
      default:
        n("port 64: Unimplemented command byte: " + h(t), L);
    }
  };
  var ti = !1;
  function It(t, e) {
    this.irq_value = this.irr = this.isr = this.irq_map = this.irq_mask = 0, this.requested_irq = -1, this.master = e, this.is_master = this.master === void 0, this.slave = void 0, this.name = this.is_master ? "master" : "slave ", this.expect_icw4 = !1, this.read_isr = this.state = 0, this.auto_eoi = 1, this.elcr = this.special_mask_mode = 0, this.cpu = t, this.is_master ? (this.slave = new It(this.cpu, this), this.check_irqs = function() {
      if (0 <= this.requested_irq)
        this.cpu.handle_irqs();
      else {
        var i = this.irr & this.irq_mask;
        if (i) {
          i &= -i;
          var s = this.special_mask_mode ? this.irq_mask : -1;
          this.isr && (this.isr & -this.isr & s) <= i ? n(
            "master> higher prio: isr=" + h(this.isr, 2) + " mask=" + h(this.irq_mask & 255, 2) + " irq=" + h(i, 2),
            N
          ) : (s = l.int_log2_byte(i), this.requested_irq = s, this.cpu.handle_irqs());
        }
      }
    }, this.acknowledge_irq = function() {
      if (this.requested_irq !== -1)
        if (this.irr === 0)
          this.requested_irq = -1;
        else {
          this.irr, 0 <= this.requested_irq;
          var i = 1 << this.requested_irq;
          !(this.elcr & i) && (this.irr &= ~i), this.auto_eoi || (this.isr |= i), this.requested_irq === 2 ? this.slave.acknowledge_irq() : this.cpu.pic_call_irq(
            this.irq_map | this.requested_irq
          ), this.requested_irq = -1, this.check_irqs();
        }
    }) : (this.check_irqs = function() {
      if (0 <= this.requested_irq)
        this.cpu.handle_irqs();
      else {
        var i = this.irr & this.irq_mask;
        if (i) {
          i &= -i;
          var s = this.special_mask_mode ? this.irq_mask : -1;
          this.isr && (this.isr & -this.isr & s) <= i || (s = l.int_log2_byte(i), this.requested_irq = s, this.master.set_irq(2));
        }
      }
    }, this.acknowledge_irq = function() {
      if (this.requested_irq !== -1)
        if (this.irr === 0)
          this.requested_irq = -1, this.master.irq_value &= -5, this.cpu.pic_call_irq(this.irq_map | 7);
        else {
          this.irr, 0 <= this.requested_irq;
          var i = 1 << this.requested_irq;
          !(this.elcr & i) && (this.irr &= ~i), this.auto_eoi || (this.isr |= i), this.master.irq_value &= -5, this.cpu.pic_call_irq(
            this.irq_map | this.requested_irq
          ), this.requested_irq = -1, this.check_irqs();
        }
    }), this.dump = function() {
      n("mask: " + h(this.irq_mask & 255), N), n("base: " + h(this.irq_map), N), n("requested: " + h(this.irr), N), n("serviced: " + h(this.isr), N), this.is_master && this.slave.dump();
    }, this.is_master ? (t = 32, e = 1232) : (t = 160, e = 1233), this.cpu.io.register_write(t, this, this.port20_write), this.cpu.io.register_read(t, this, this.port20_read), this.cpu.io.register_write(t | 1, this, this.port21_write), this.cpu.io.register_read(t | 1, this, this.port21_read), this.cpu.io.register_write(e, this, this.port4D0_write), this.cpu.io.register_read(e, this, this.port4D0_read), this.is_master ? (this.set_irq = function(i) {
      if (8 <= i)
        this.slave.set_irq(i - 8);
      else {
        var s = 1 << i;
        this.irq_value & s || (this.irr |= s, this.irq_value |= s, this.check_irqs());
      }
    }, this.clear_irq = function(i) {
      8 <= i ? this.slave.clear_irq(i - 8) : (i = 1 << i, this.irq_value & i && (this.irq_value &= ~i, this.irr &= ~i, this.check_irqs()));
    }) : (this.set_irq = function(i) {
      var s = 1 << i;
      this.irq_value & s || (this.irr |= s, this.irq_value |= s, this.check_irqs());
    }, this.clear_irq = function(i) {
      i = 1 << i, this.irq_value & i && (this.irq_value &= ~i, this.irr &= ~i, this.check_irqs());
    }), this.get_isr = function() {
      return this.isr;
    };
  }
  It.prototype.get_state = function() {
    var t = [];
    return t[0] = this.irq_mask, t[1] = this.irq_map, t[2] = this.isr, t[3] = this.irr, t[4] = this.is_master, t[5] = this.slave, t[6] = this.expect_icw4, t[7] = this.state, t[8] = this.read_isr, t[9] = this.auto_eoi, t[10] = this.elcr, t;
  }, It.prototype.set_state = function(t) {
    this.irq_mask = t[0], this.irq_map = t[1], this.isr = t[2], this.irr = t[3], this.is_master = t[4], this.slave && this.slave.set_state(t[5]), this.expect_icw4 = t[6], this.state = t[7], this.read_isr = t[8], this.auto_eoi = t[9], this.elcr = t[10];
  }, It.prototype.port20_write = function(t) {
    if (t & 16)
      n("icw1 = " + h(t), N), this.irq_value = this.irq_mask = this.irr = this.isr = 0, this.auto_eoi = 1, this.requested_irq = -1, this.expect_icw4 = t & 1, this.state = 1;
    else if (t & 8)
      n("ocw3: " + h(t), N), t & 2 && (this.read_isr = t & 1), t & 64 && (this.special_mask_mode = (t & 32) === 32, n(
        "special mask mode: " + this.special_mask_mode,
        N
      ));
    else {
      n("eoi: " + h(t) + " (" + this.name + ")", N);
      var e = t >> 5;
      e === 1 ? (this.isr &= this.isr - 1, n("new isr: " + h(this.isr, 2), N)) : e === 3 ? this.isr &= ~(1 << (t & 7)) : (t & 200) === 192 ? n("lowest priority: " + h(t & 7), N) : (n("Unknown eoi: " + h(t), N), this.isr &= this.isr - 1), this.check_irqs();
    }
  }, It.prototype.port20_read = function() {
    return this.read_isr ? (n("read port 20h (isr): " + h(this.isr), N), this.isr) : (n("read port 20h (irr): " + h(this.irr), N), this.irr);
  }, It.prototype.port21_write = function(t) {
    this.state === 0 ? this.expect_icw4 ? (this.expect_icw4 = !1, this.auto_eoi = t & 2, n(
      "icw4: " + h(t) + " autoeoi=" + this.auto_eoi,
      N
    ), !(t & 1) && void 0) : (this.irq_mask = ~t, this.check_irqs()) : this.state === 1 ? (this.irq_map = t, n(
      "interrupts are mapped to " + h(this.irq_map) + " (" + this.name + ")",
      N
    ), this.state++) : this.state === 2 && (this.state = 0, n("icw3: " + h(t), N));
  }, It.prototype.port21_read = function() {
    return n("21h read " + h(~this.irq_mask & 255), N), ~this.irq_mask & 255;
  }, It.prototype.port4D0_read = function() {
    return n("elcr read: " + h(this.elcr, 2), N), this.elcr;
  }, It.prototype.port4D0_write = function(t) {
    n("elcr write: " + h(t, 2), N), this.elcr = t;
  };
  var Hr = 0, Pi = 1, Vr = 2, zi = 3, jr = 4, Ni = 5, Xr = 7, Kr = 8, Yr = 9, Qr = 10, Zr = 11, Jr = 12, $r = 13, Fi = 16, Bi = 18, tn = 20, en = 21, sn = 22, rn = 23, nn = 24, on = 27, _n = 48, hn = 49, an = 50, dn = 52, cn = 53, un = 56, Gi = 57, pn = 61, ln = 91, fn = 92, mn = 93, gn = 95;
  const Wi = 291, yn = 786, vn = 801;
  function gt(t) {
    this.cpu = t, this.cmos_index = 0, this.cmos_data = new Uint8Array(128), this.last_update = this.rtc_time = Date.now(), this.next_interrupt_alarm = this.next_interrupt = 0, this.periodic_interrupt = !1, this.periodic_interrupt_time = 0.9765625, this.cmos_a = 38, this.cmos_b = 2, this.nmi_disabled = this.cmos_c = 0, t.io.register_write(112, this, function(e) {
      this.cmos_index = e & 127, this.nmi_disabled = e >> 7;
    }), t.io.register_write(113, this, this.cmos_port_write), t.io.register_read(113, this, this.cmos_port_read);
  }
  gt.prototype.get_state = function() {
    var t = [];
    return t[0] = this.cmos_index, t[1] = this.cmos_data, t[2] = this.rtc_time, t[3] = this.last_update, t[4] = this.next_interrupt, t[5] = this.next_interrupt_alarm, t[6] = this.periodic_interrupt, t[7] = this.periodic_interrupt_time, t[8] = this.cmos_a, t[9] = this.cmos_b, t[10] = this.cmos_c, t[11] = this.nmi_disabled, t;
  }, gt.prototype.set_state = function(t) {
    this.cmos_index = t[0], this.cmos_data = t[1], this.rtc_time = t[2], this.last_update = t[3], this.next_interrupt = t[4], this.next_interrupt_alarm = t[5], this.periodic_interrupt = t[6], this.periodic_interrupt_time = t[7], this.cmos_a = t[8], this.cmos_b = t[9], this.cmos_c = t[10], this.nmi_disabled = t[11];
  }, gt.prototype.timer = function(t, e) {
    return t = Date.now(), this.rtc_time += t - this.last_update, this.last_update = t, this.periodic_interrupt && this.next_interrupt < t ? (this.cpu.device_raise_irq(8), this.cmos_c |= 192, this.next_interrupt += this.periodic_interrupt_time * Math.ceil(
      (t - this.next_interrupt) / this.periodic_interrupt_time
    )) : this.next_interrupt_alarm && this.next_interrupt_alarm < t && (this.cpu.device_raise_irq(8), this.cmos_c |= 160, this.next_interrupt_alarm = 0), e = 100, this.periodic_interrupt && this.next_interrupt && (e = Math.min(e, Math.max(0, this.next_interrupt - t))), this.next_interrupt_alarm && (e = Math.min(e, Math.max(0, this.next_interrupt_alarm - t))), e;
  }, gt.prototype.bcd_pack = function(t) {
    for (var e = 0, i = 0, s; t; )
      s = t % 10, i |= s << 4 * e, e++, t = (t - s) / 10;
    return i;
  }, gt.prototype.bcd_unpack = function(t) {
    const e = t & 15, i = t >> 4 & 15;
    return e + 10 * i;
  }, gt.prototype.encode_time = function(t) {
    return this.cmos_b & 4 ? t : this.bcd_pack(t);
  }, gt.prototype.decode_time = function(t) {
    return this.cmos_b & 4 ? t : this.bcd_unpack(t);
  }, gt.prototype.cmos_port_read = function() {
    var t = this.cmos_index;
    switch (t) {
      case Hr:
        return this.encode_time(new Date(this.rtc_time).getUTCSeconds());
      case Vr:
        return this.encode_time(new Date(this.rtc_time).getUTCMinutes());
      case jr:
        return this.encode_time(new Date(this.rtc_time).getUTCHours());
      case Xr:
        return this.encode_time(new Date(this.rtc_time).getUTCDate());
      case Kr:
        return this.encode_time(
          new Date(this.rtc_time).getUTCMonth() + 1
        );
      case Yr:
        return this.encode_time(
          new Date(this.rtc_time).getUTCFullYear() % 100
        );
      case Qr:
        return 999 <= W.microtick() % 1e3 ? this.cmos_a | 128 : this.cmos_a;
      case Zr:
        return this.cmos_b;
      case Jr:
        return this.cpu.device_lower_irq(8), n("cmos reg C read", qt), t = this.cmos_c, this.cmos_c &= -241, t;
      case $r:
        return 0;
      case an:
        return this.encode_time(
          new Date(this.rtc_time).getUTCFullYear() / 100 | 0
        );
      default:
        return n("cmos read from index " + h(t), qt), this.cmos_data[this.cmos_index];
    }
  }, gt.prototype.cmos_port_write = function(t) {
    switch (this.cmos_index) {
      case 10:
        this.cmos_a = t & 127, this.periodic_interrupt_time = 1e3 / (32768 >> (this.cmos_a & 15) - 1), n(
          "Periodic interrupt, a=" + h(this.cmos_a, 2) + " t=" + this.periodic_interrupt_time,
          qt
        );
        break;
      case 11:
        if (this.cmos_b = t, this.cmos_b & 64 && (this.next_interrupt = Date.now()), this.cmos_b & 32) {
          t = /* @__PURE__ */ new Date();
          const e = this.decode_time(
            this.cmos_data[Pi]
          ), i = this.decode_time(
            this.cmos_data[zi]
          ), s = this.decode_time(
            this.cmos_data[Ni]
          ), r = new Date(
            Date.UTC(
              t.getUTCFullYear(),
              t.getUTCMonth(),
              t.getUTCDate(),
              s,
              i,
              e
            )
          );
          n(
            "RTC alarm scheduled for " + r + " hh:mm:ss=" + s + ":" + i + ":" + e + " ms_from_now=" + (r - t),
            qt
          ), this.next_interrupt_alarm = +r;
        }
        this.cmos_b & 16 && n("Unimplemented: updated interrupt", qt), n("cmos b=" + h(this.cmos_b, 2), qt);
        break;
      case Pi:
      case zi:
      case Ni:
        this.cmos_write(this.cmos_index, t);
        break;
      default:
        n(
          "cmos write index " + h(this.cmos_index) + ": " + h(t),
          qt
        );
    }
    this.periodic_interrupt = (this.cmos_b & 64) === 64 && 0 < (this.cmos_a & 15);
  }, gt.prototype.cmos_read = function(t) {
    return this.cmos_data[t];
  }, gt.prototype.cmos_write = function(t, e) {
    n("cmos " + h(t) + " <- " + h(e), qt), this.cmos_data[t] = e;
  };
  var Ce = 128, wn = 8, bn = 2, Hi = 1, Vi = 0, ji = 1, Tt = 2, De = 4, qe = 12, Xi = 1, kn = 32, An = 64;
  function vt(t, e, i) {
    switch (this.bus = i, this.cpu = t, this.ints = 1 << Tt, this.line_control = this.baud_rate = 0, this.lsr = An | kn, this.ier = this.fifo_control = 0, this.iir = ji, this.irq = this.scratch_register = this.modem_status = this.modem_control = 0, this.input = [], this.current_line = "", e) {
      case 1016:
        this.com = 0, this.irq = 4;
        break;
      case 760:
        this.com = 1, this.irq = 3;
        break;
      case 1e3:
        this.com = 2, this.irq = 4;
        break;
      case 744:
        this.irq = this.com = 3;
        break;
      default:
        n("Invalid serial port: " + h(e), V), this.com = 0, this.irq = 4;
    }
    this.bus.register(
      "serial" + this.com + "-input",
      function(s) {
        this.data_received(s);
      },
      this
    ), t = t.io, t.register_write(
      e,
      this,
      function(s) {
        this.write_data(s);
      },
      function(s) {
        this.write_data(s & 255), this.write_data(s >> 8);
      }
    ), t.register_write(e | 1, this, function(s) {
      this.line_control & Ce ? (this.baud_rate = this.baud_rate & 255 | s << 8, n("baud rate: " + h(this.baud_rate), V)) : (!(this.ier & Tt) && s & Tt && this.ThrowInterrupt(Tt), this.ier = s & 15, n("interrupt enable: " + h(s), V), this.CheckInterrupt());
    }), t.register_read(e, this, function() {
      if (this.line_control & Ce)
        return this.baud_rate & 255;
      let s = 0;
      return this.input.length === 0 ? (n("Read input empty", V), this.lsr &= ~Xi, this.ClearInterrupt(qe), this.ClearInterrupt(De)) : (s = this.input.shift(), n("Read input: " + h(s), V)), s;
    }), t.register_read(e | 1, this, function() {
      return this.line_control & Ce ? this.baud_rate >> 8 : this.ier & 15;
    }), t.register_read(e | 2, this, function() {
      var s = this.iir & 15;
      return n("read interrupt identification: " + h(this.iir), V), this.iir == Tt && this.ClearInterrupt(Tt), this.fifo_control & 1 && (s |= 192), s;
    }), t.register_write(e | 2, this, function(s) {
      n("fifo control: " + h(s), V), this.fifo_control = s;
    }), t.register_read(e | 3, this, function() {
      return n("read line control: " + h(this.line_control), V), this.line_control;
    }), t.register_write(e | 3, this, function(s) {
      n("line control: " + h(s), V), this.line_control = s;
    }), t.register_read(e | 4, this, function() {
      return this.modem_control;
    }), t.register_write(e | 4, this, function(s) {
      n("modem control: " + h(s), V), this.modem_control = s;
    }), t.register_read(e | 5, this, function() {
      return n("read line status: " + h(this.lsr), V), this.lsr;
    }), t.register_write(e | 5, this, function(s) {
      n("Factory test write", V);
    }), t.register_read(e | 6, this, function() {
      return n("read modem status: " + h(this.modem_status), V), this.modem_status;
    }), t.register_write(e | 6, this, function(s) {
      n("Unkown register write (base+6)", V);
    }), t.register_read(e | 7, this, function() {
      return this.scratch_register;
    }), t.register_write(e | 7, this, function(s) {
      this.scratch_register = s;
    });
  }
  vt.prototype.get_state = function() {
    var t = [];
    return t[0] = this.ints, t[1] = this.baud_rate, t[2] = this.line_control, t[3] = this.lsr, t[4] = this.fifo_control, t[5] = this.ier, t[6] = this.iir, t[7] = this.modem_control, t[8] = this.modem_status, t[9] = this.scratch_register, t[10] = this.irq, t;
  }, vt.prototype.set_state = function(t) {
    this.ints = t[0], this.baud_rate = t[1], this.line_control = t[2], this.lsr = t[3], this.fifo_control = t[4], this.ier = t[5], this.iir = t[6], this.modem_control = t[7], this.modem_status = t[8], this.scratch_register = t[9], this.irq = t[10];
  }, vt.prototype.CheckInterrupt = function() {
    this.ints & 1 << qe && this.ier & Hi ? (this.iir = qe, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << De && this.ier & Hi ? (this.iir = De, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << Tt && this.ier & bn ? (this.iir = Tt, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << Vi && this.ier & wn ? (this.iir = Vi, this.cpu.device_raise_irq(this.irq)) : (this.iir = ji, this.cpu.device_lower_irq(this.irq));
  }, vt.prototype.ThrowInterrupt = function(t) {
    this.ints |= 1 << t, this.CheckInterrupt();
  }, vt.prototype.ClearInterrupt = function(t) {
    this.ints &= ~(1 << t), this.CheckInterrupt();
  }, vt.prototype.data_received = function(t) {
    n("input: " + h(t), V), this.input.push(t), this.lsr |= Xi, this.fifo_control & 1 ? this.ThrowInterrupt(qe) : this.ThrowInterrupt(De);
  }, vt.prototype.write_data = function(t) {
    this.line_control & Ce ? this.baud_rate = this.baud_rate & -256 | t : (n("data: " + h(t), V), this.ThrowInterrupt(Tt), t = String.fromCharCode(t), this.bus.send("serial" + this.com + "-output-char", t));
  };
  var Ki = 3579545;
  function ue(t) {
    this.cpu = t;
    var e = t.io;
    t.devices.pci.register_device({
      pci_id: 56,
      pci_space: [
        134,
        128,
        19,
        113,
        7,
        0,
        128,
        2,
        8,
        0,
        128,
        6,
        0,
        0,
        128,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        9,
        1,
        0,
        0
      ],
      pci_bars: [],
      name: "acpi"
    }), this.timer_imprecision_offset = this.timer_last_value = 0, this.status = 1, this.pm1_enable = this.pm1_status = 0, this.last_timer = this.get_timer(W.microtick()), this.gpe = new Uint8Array(4), e.register_read(45056, this, void 0, function() {
      return n("ACPI pm1_status read", rt), this.pm1_status;
    }), e.register_write(45056, this, void 0, function(i) {
      n("ACPI pm1_status write: " + h(i, 4), rt), this.pm1_status &= ~i;
    }), e.register_read(45058, this, void 0, function() {
      return n("ACPI pm1_enable read", rt), this.pm1_enable;
    }), e.register_write(45058, this, void 0, function(i) {
      n("ACPI pm1_enable write: " + h(i), rt), this.pm1_enable = i;
    }), e.register_read(45060, this, void 0, function() {
      return n("ACPI status read", rt), this.status;
    }), e.register_write(45060, this, void 0, function(i) {
      n("ACPI status write: " + h(i), rt), this.status = i;
    }), e.register_read(45064, this, void 0, void 0, function() {
      return this.get_timer(W.microtick()) & 16777215;
    }), e.register_read(45024, this, function() {
      return n("Read gpe#0", rt), this.gpe[0];
    }), e.register_read(45025, this, function() {
      return n("Read gpe#1", rt), this.gpe[1];
    }), e.register_read(45026, this, function() {
      return n("Read gpe#2", rt), this.gpe[2];
    }), e.register_read(45027, this, function() {
      return n("Read gpe#3", rt), this.gpe[3];
    }), e.register_write(45024, this, function(i) {
      n("Write gpe#0: " + h(i), rt), this.gpe[0] = i;
    }), e.register_write(45025, this, function(i) {
      n("Write gpe#1: " + h(i), rt), this.gpe[1] = i;
    }), e.register_write(45026, this, function(i) {
      n("Write gpe#2: " + h(i), rt), this.gpe[2] = i;
    }), e.register_write(45027, this, function(i) {
      n("Write gpe#3: " + h(i), rt), this.gpe[3] = i;
    });
  }
  ue.prototype.timer = function(t) {
    t = this.get_timer(t);
    var e = ((t ^ this.last_timer) & 8388608) !== 0;
    return this.pm1_enable & 1 && e ? (n("ACPI raise irq", rt), this.pm1_status |= 1, this.cpu.device_raise_irq(9)) : this.cpu.device_lower_irq(9), this.last_timer = t, 100;
  }, ue.prototype.get_timer = function(t) {
    return t = Math.round(Ki / 1e3 * t), t === this.timer_last_value ? this.timer_imprecision_offset < Ki / 1e3 && this.timer_imprecision_offset++ : (t > this.timer_last_value, this.timer_last_value + this.timer_imprecision_offset <= t ? (this.timer_imprecision_offset = 0, this.timer_last_value = t) : n(
      "Warning: Overshot pmtimer, waiting; current=" + t + " last=" + this.timer_last_value + " offset=" + this.timer_imprecision_offset,
      rt
    )), this.timer_last_value + this.timer_imprecision_offset;
  }, ue.prototype.get_state = function() {
    var t = [];
    return t[0] = this.status, t[1] = this.pm1_status, t[2] = this.pm1_enable, t[3] = this.gpe, t;
  }, ue.prototype.set_state = function(t) {
    this.status = t[0], this.pm1_status = t[1], this.pm1_enable = t[2], this.gpe = t[3];
  };
  var Me = !1, ei = 4276092928, En = 393216, In = 0, xn = 131072, Yi = "Fixed (0);Lowest Prio (1);SMI (2);Reserved (3);NMI (4);INIT (5);Reserved (6);ExtINT (7)".split(
    ";"
  ), Qi = ["physical", "logical"];
  function nt(t) {
    this.cpu = t, this.timer_divider = this.apic_id = 0, this.timer_divider_shift = 1, this.timer_current_count = this.timer_initial_count = 0, this.next_tick = W.microtick(), this.lvt_error = this.lvt_int1 = this.lvt_int0 = this.lvt_perf_counter = this.lvt_timer = Xt, this.icr1 = this.icr0 = this.tpr = 0, this.irr = new Int32Array(8), this.isr = new Int32Array(8), this.tmr = new Int32Array(8), this.spurious_vector = 254, this.destination_format = -1, this.read_error = this.error = this.local_destination = 0, t.io.mmap_register(
      ei,
      1048576,
      (e) => {
        n("Unsupported read8 from apic: " + h(e >>> 0), D);
        var i = e & 3;
        return this.read32(e & -4) >> 8 * i & 255;
      },
      (e, i) => {
        n(
          "Unsupported write8 from apic: " + h(e) + " <- " + h(i),
          D
        );
      },
      (e) => this.read32(e),
      (e, i) => this.write32(e, i)
    );
  }
  nt.prototype.read32 = function(t) {
    switch (t = t - ei | 0, t) {
      case 32:
        return n("APIC read id", D), this.apic_id;
      case 48:
        return n("APIC read version", D), 327700;
      case 128:
        return this.tpr;
      case 208:
        return n("Read local destination", D), this.local_destination;
      case 224:
        return n("Read destination format", D), this.destination_format;
      case 240:
        return this.spurious_vector;
      case 256:
      case 272:
      case 288:
      case 304:
      case 320:
      case 336:
      case 352:
      case 368:
        return t = t - 256 >> 4, n(
          "Read isr " + t + ": " + h(this.isr[t] >>> 0, 8),
          D
        ), this.isr[t];
      case 384:
      case 400:
      case 416:
      case 432:
      case 448:
      case 464:
      case 480:
      case 496:
        return t = t - 384 >> 4, n(
          "Read tmr " + t + ": " + h(this.tmr[t] >>> 0, 8),
          D
        ), this.tmr[t];
      case 512:
      case 528:
      case 544:
      case 560:
      case 576:
      case 592:
      case 608:
      case 624:
        return t = t - 512 >> 4, n(
          "Read irr " + t + ": " + h(this.irr[t] >>> 0, 8),
          D
        ), this.irr[t];
      case 640:
        return n(
          "Read error: " + h(this.read_error >>> 0, 8),
          D
        ), this.read_error;
      case 768:
        return this.icr0;
      case 784:
        return n("APIC read icr1", D), this.icr1;
      case 800:
        return n("read timer lvt", D), this.lvt_timer;
      case 832:
        return n("read lvt perf counter", D), this.lvt_perf_counter;
      case 848:
        return n("read lvt int0", D), this.lvt_int0;
      case 864:
        return n("read lvt int1", D), this.lvt_int1;
      case 880:
        return n("read lvt error", D), this.lvt_error;
      case 992:
        return n("read timer divider", D), this.timer_divider;
      case 896:
        return n("read timer initial count", D), this.timer_initial_count;
      case 912:
        return n(
          "read timer current count: " + h(this.timer_current_count >>> 0, 8),
          D
        ), this.timer_current_count;
      default:
        return n("APIC read " + h(t), D), 0;
    }
  }, nt.prototype.write32 = function(t, e) {
    switch (t = t - ei | 0, t) {
      case 48:
        n(
          "APIC write version: " + h(e >>> 0, 8) + ", ignored",
          D
        );
        break;
      case 128:
        this.tpr = e & 255, this.check_vector();
        break;
      case 176:
        t = this.highest_isr(), t !== -1 ? (this.register_clear_bit(this.isr, t), this.register_get_bit(this.tmr, t) && this.cpu.devices.ioapic.remote_eoi(t), this.check_vector()) : n("Bad eoi: No isr set", D);
        break;
      case 208:
        n("Set local destination: " + h(e >>> 0, 8), D), this.local_destination = e & 4278190080;
        break;
      case 224:
        n("Set destination format: " + h(e >>> 0, 8), D), this.destination_format = e | 16777215;
        break;
      case 240:
        n("Set spurious vector: " + h(e >>> 0, 8), D), this.spurious_vector = e;
        break;
      case 640:
        n("Write error: " + h(e >>> 0, 8), D), this.read_error = this.error, this.error = 0;
        break;
      case 768:
        t = e & 255;
        var i = e >> 8 & 7, s = e >> 11 & 1, r = e >> 15 & 1, _ = e >> 18 & 3, o = this.icr1 >>> 24;
        n(
          "APIC write icr0: " + h(e, 8) + " vector=" + h(t, 2) + " destination_mode=" + Qi[s] + " delivery_mode=" + Yi[i] + " destination_shorthand=" + ["no", "self", "all with self", "all without self"][_],
          D
        ), this.icr0 = e & -4097, _ === 0 ? this.route(t, i, r, o, s) : _ === 1 ? this.deliver(t, Ue, r) : _ === 2 ? this.deliver(t, i, r) : _ !== 3 && void 0;
        break;
      case 784:
        n("APIC write icr1: " + h(e >>> 0, 8), D), this.icr1 = e;
        break;
      case 800:
        n("timer lvt: " + h(e >>> 0, 8), D), this.lvt_timer = e;
        break;
      case 832:
        n("lvt perf counter: " + h(e >>> 0, 8), D), this.lvt_perf_counter = e;
        break;
      case 848:
        n("lvt int0: " + h(e >>> 0, 8), D), this.lvt_int0 = e;
        break;
      case 864:
        n("lvt int1: " + h(e >>> 0, 8), D), this.lvt_int1 = e;
        break;
      case 880:
        n("lvt error: " + h(e >>> 0, 8), D), this.lvt_error = e;
        break;
      case 992:
        n("timer divider: " + h(e >>> 0, 8), D), this.timer_divider = e, e = e & 3 | (e & 8) >> 1, this.timer_divider_shift = e === 7 ? 0 : e + 1;
        break;
      case 896:
        n("timer initial: " + h(e >>> 0, 8), D), this.timer_initial_count = e >>> 0, this.timer_current_count = e >>> 0, this.next_tick = W.microtick(), this.timer_active = !0;
        break;
      case 912:
        n("timer current: " + h(e >>> 0, 8), D);
        break;
      default:
        n(
          "APIC write32 " + h(t) + " <- " + h(e >>> 0, 8),
          D
        );
    }
  }, nt.prototype.timer = function(t) {
    if (this.timer_current_count === 0)
      return 100;
    const e = Nr / (1 << this.timer_divider_shift);
    return t = (t - this.next_tick) * e >>> 0, this.next_tick += t / e, this.timer_current_count -= t, 0 >= this.timer_current_count && (t = this.lvt_timer & En, t === xn ? (this.timer_current_count %= this.timer_initial_count, 0 >= this.timer_current_count && (this.timer_current_count += this.timer_initial_count), this.timer_current_count, !(this.lvt_timer & Xt) && this.deliver(
      this.lvt_timer & 255,
      Ue,
      !1
    )) : t === In && (this.timer_current_count = 0, n("APIC timer one shot end", D), !(this.lvt_timer & Xt) && this.deliver(
      this.lvt_timer & 255,
      Ue,
      !1
    ))), Math.max(0, this.timer_current_count / e);
  }, nt.prototype.route = function(t, e, i, s, r) {
    this.deliver(t, e, i);
  }, nt.prototype.deliver = function(t, e, i) {
    e !== On && e !== Sn && (this.register_get_bit(this.irr, t) ? n(
      "Not delivered: irr already set, vector=" + h(t, 2),
      D
    ) : (this.register_set_bit(this.irr, t), i ? this.register_set_bit(this.tmr, t) : this.register_clear_bit(this.tmr, t), this.check_vector()));
  }, nt.prototype.highest_irr = function() {
    var t = this.register_get_highest_bit(this.irr);
    return t;
  }, nt.prototype.highest_isr = function() {
    var t = this.register_get_highest_bit(this.isr);
    return t;
  }, nt.prototype.check_vector = function() {
    var t = this.highest_irr();
    if (t !== -1) {
      var e = this.highest_isr();
      e >= t || (t & 240) <= (this.tpr & 240) || this.cpu.handle_irqs();
    }
  }, nt.prototype.acknowledge_irq = function() {
    var t = this.highest_irr();
    if (t !== -1) {
      var e = this.highest_isr();
      e >= t || (t & 240) <= (this.tpr & 240) || (this.register_clear_bit(this.irr, t), this.register_set_bit(this.isr, t), this.cpu.pic_call_irq(t), this.check_vector());
    }
  }, nt.prototype.get_state = function() {
    var t = [];
    return t[0] = this.apic_id, t[1] = this.timer_divider, t[2] = this.timer_divider_shift, t[3] = this.timer_initial_count, t[4] = this.timer_current_count, t[5] = this.next_tick, t[6] = this.lvt_timer, t[7] = this.lvt_perf_counter, t[8] = this.lvt_int0, t[9] = this.lvt_int1, t[10] = this.lvt_error, t[11] = this.tpr, t[12] = this.icr0, t[13] = this.icr1, t[14] = this.irr, t[15] = this.isr, t[16] = this.tmr, t[17] = this.spurious_vector, t[18] = this.destination_format, t[19] = this.local_destination, t[20] = this.error, t[21] = this.read_error, t;
  }, nt.prototype.set_state = function(t) {
    this.apic_id = t[0], this.timer_divider = t[1], this.timer_divider_shift = t[2], this.timer_initial_count = t[3], this.timer_current_count = t[4], this.next_tick = t[5], this.lvt_timer = t[6], this.lvt_perf_counter = t[7], this.lvt_int0 = t[8], this.lvt_int1 = t[9], this.lvt_error = t[10], this.tpr = t[11], this.icr0 = t[12], this.icr1 = t[13], this.irr = t[14], this.isr = t[15], this.tmr = t[16], this.spurious_vector = t[17], this.destination_format = t[18], this.local_destination = t[19], this.error = t[20], this.read_error = t[21];
  }, nt.prototype.register_get_bit = function(t, e) {
    return t[e >> 5] >> (e & 31) & 1;
  }, nt.prototype.register_set_bit = function(t, e) {
    t[e >> 5] |= 1 << (e & 31);
  }, nt.prototype.register_clear_bit = function(t, e) {
    t[e >> 5] &= ~(1 << (e & 31));
  }, nt.prototype.register_get_highest_bit = function(t) {
    for (var e = 7; 0 <= e; e--) {
      var i = t[e];
      if (i)
        return l.int_log2(i >>> 0) | e << 5;
    }
    return -1;
  };
  var Le = 4273995776, Zi = 0, pe = 16, Mt = 24, Rn = 0, le = 32768, Xt = 65536, Ji = 4096, fe = 16384, $i = fe | Ji | 4294836224, Ue = 0, Tn = 1, Sn = 4, On = 5;
  function St(t) {
    this.cpu = t, this.ioredtbl_config = new Int32Array(Mt), this.ioredtbl_destination = new Int32Array(Mt);
    for (var e = 0; e < this.ioredtbl_config.length; e++)
      this.ioredtbl_config[e] = Xt;
    this.ioregsel = 0, this.ioapic_id = Rn, this.irq_value = this.irr = 0, t.io.mmap_register(
      Le,
      Ee,
      (i) => (i = i - Le | 0, i >= pe && i < pe + 4 ? (i -= pe, n(
        "ioapic read8 byte " + i + " " + h(this.ioregsel),
        D
      ), this.read(this.ioregsel) >> 8 * i & 255) : (n(
        "Unexpected IOAPIC register read: " + h(i >>> 0),
        D
      ), 0)),
      (i, s) => {
        "" + h(i >>> 0);
      },
      (i) => (i = i - Le | 0, i === Zi ? this.ioregsel : i === pe ? this.read(this.ioregsel) : (n(
        "Unexpected IOAPIC register read: " + h(i >>> 0),
        D
      ), 0)),
      (i, s) => {
        i = i - Le | 0, i === Zi ? this.ioregsel = s : i === pe ? this.write(this.ioregsel, s) : (n(
          "Unexpected IOAPIC register write: " + h(i >>> 0) + " <- " + h(s >>> 0, 8),
          D
        ), void 0);
      }
    );
  }
  St.prototype.remote_eoi = function(t) {
    for (var e = 0; e < Mt; e++) {
      var i = this.ioredtbl_config[e];
      (i & 255) === t && i & fe && (n("Clear remote IRR for irq=" + h(e), D), this.ioredtbl_config[e] &= ~fe, this.check_irq(e));
    }
  }, St.prototype.check_irq = function(t) {
    var e = 1 << t;
    if (this.irr & e) {
      var i = this.ioredtbl_config[t];
      if (!(i & Xt)) {
        var s = i >> 8 & 7, r = i >> 11 & 1, _ = i & 255, o = this.ioredtbl_destination[t] >>> 24, a = (i & le) === le;
        if (!(i & le))
          this.irr &= ~e;
        else if (this.ioredtbl_config[t] |= fe, i & fe) {
          n(
            "No route: level interrupt and remote IRR still set",
            D
          );
          return;
        }
        s === Ue || s === Tn ? this.cpu.devices.apic.route(_, s, a, o, r) : void 0, this.ioredtbl_config[t] &= ~Ji;
      }
    }
  }, St.prototype.set_irq = function(t) {
    if (!(t >= Mt)) {
      var e = 1 << t;
      !(this.irq_value & e) && (this.irq_value |= e, (this.ioredtbl_config[t] & (le | Xt)) !== Xt && (this.irr |= e, this.check_irq(t)));
    }
  }, St.prototype.clear_irq = function(t) {
    if (!(t >= Mt)) {
      var e = 1 << t;
      (this.irq_value & e) === e && (this.irq_value &= ~e, this.ioredtbl_config[t] & le && (this.irr &= ~e));
    }
  }, St.prototype.read = function(t) {
    if (t === 0)
      return n("IOAPIC Read id", D), this.ioapic_id << 24;
    if (t === 1)
      return n("IOAPIC Read version", D), 17 | Mt - 1 << 16;
    if (t === 2)
      return n("IOAPIC Read arbitration id", D), this.ioapic_id << 24;
    if (16 <= t && t < 16 + 2 * Mt) {
      var e = t - 16 >> 1;
      return t & 1 ? (t = this.ioredtbl_destination[e], n(
        "IOAPIC Read destination irq=" + h(e) + " -> " + h(t, 8),
        D
      )) : (t = this.ioredtbl_config[e], n(
        "IOAPIC Read config irq=" + h(e) + " -> " + h(t, 8),
        D
      )), t;
    }
    return n("IOAPIC register read outside of range " + h(t), D), 0;
  }, St.prototype.write = function(t, e) {
    if (t === 0)
      this.ioapic_id = e >>> 24 & 15;
    else if (t === 1 || t === 2)
      n("Invalid write: " + t, D);
    else if (16 <= t && t < 16 + 2 * Mt) {
      var i = t - 16 >> 1;
      if (t & 1)
        this.ioredtbl_destination[i] = e & 4278190080, n(
          "Write destination " + h(e >>> 0, 8) + " irq=" + h(i) + " dest=" + h(e >>> 24, 2),
          D
        );
      else {
        this.ioredtbl_config[i] = e & ~$i | this.ioredtbl_config[i] & $i, t = e & 255;
        var s = e >> 8 & 7, r = e >> 11 & 1, _ = e >> 15 & 1, o = e >> 16 & 1;
        n(
          "Write config " + h(e >>> 0, 8) + " irq=" + h(i) + " vector=" + h(t, 2) + " deliverymode=" + Yi[s] + " destmode=" + Qi[r] + " is_level=" + _ + " disabled=" + o,
          D
        ), this.check_irq(i);
      }
    } else
      n(
        "IOAPIC register write outside of range " + h(t) + ": " + h(e >>> 0, 8),
        D
      );
  }, St.prototype.get_state = function() {
    var t = [];
    return t[0] = this.ioredtbl_config, t[1] = this.ioredtbl_destination, t[2] = this.ioregsel, t[3] = this.ioapic_id, t[4] = this.irr, t[5] = this.irq_value, t;
  }, St.prototype.set_state = function(t) {
    this.ioredtbl_config = t[0], this.ioredtbl_destination = t[1], this.ioregsel = t[2], this.ioapic_id = t[3], this.irr = t[4], this.irq_value = t[5];
  };
  var ii = 6, ts = -2039052682, si = 0, ri = 1, ni = 2, es = 3, Lt = 16;
  const Cn = 4247762216;
  function $t(t) {
    this.message = t;
  }
  $t.prototype = Error();
  const Dn = {
    Uint8Array,
    Int8Array,
    Uint16Array,
    Int16Array,
    Uint32Array,
    Int32Array,
    Float32Array,
    Float64Array
  };
  function oi(t, e) {
    if (typeof t != "object" || t === null)
      return t;
    if (t instanceof Array)
      return t.map((_) => oi(_, e));
    if (t.constructor === Object && (console.log(t), t.constructor, void 0), t.BYTES_PER_ELEMENT) {
      var i = new Uint8Array(
        t.buffer,
        t.byteOffset,
        t.length * t.BYTES_PER_ELEMENT
      );
      return t = t.constructor.name.replace("bound ", ""), { __state_type__: t, buffer_id: e.push(i) - 1 };
    }
    i = t.get_state(), t = [];
    for (var s = 0; s < i.length; s++) {
      var r = i[s];
      t[s] = oi(r, e);
    }
    return t;
  }
  function _i(t, e) {
    if (typeof t != "object" || t === null)
      return t;
    if (t instanceof Array) {
      for (var i = 0; i < t.length; i++)
        t[i] = _i(t[i], e);
      return t;
    }
    i = t.__state_type__;
    const s = Dn[i];
    return new s(e[t.buffer_id]);
  }
  U.prototype.save_state = function() {
    for (var t = [], e = oi(this, t), i = [], s = 0, r = 0; r < t.length; r++) {
      var _ = t[r].byteLength;
      i[r] = { offset: s, length: _ }, s += _, s = s + 3 & -4;
    }
    e = JSON.stringify({ buffer_infos: i, state: e }), e = new TextEncoder().encode(e), r = Lt + e.length, r = r + 3 & -4;
    var o = r + s;
    s = new ArrayBuffer(o);
    var a = new Int32Array(s, 0, Lt / 4);
    for (new Uint8Array(s, Lt, e.length).set(e), _ = new Uint8Array(s, r), a[si] = ts, a[ri] = ii, a[ni] = o, a[es] = e.length, r = 0; r < t.length; r++)
      o = t[r], o.constructor, _.set(o, i[r].offset);
    return n("State: json size " + (e.byteLength >> 10) + "k"), n("State: Total buffers size " + (_.byteLength >> 10) + "k"), s;
  }, U.prototype.restore_state = function(t) {
    function e(g, f) {
      const w = g.length;
      if (w < Lt)
        throw new $t("Invalid length: " + w);
      if (g = new Int32Array(g.buffer, g.byteOffset, 4), g[si] !== ts)
        throw new $t(
          "Invalid header: " + h(g[si] >>> 0)
        );
      if (g[ri] !== ii)
        throw new $t(
          "Version mismatch: dump=" + g[ri] + " we=" + ii
        );
      if (f && g[ni] !== w)
        throw new $t(
          "Length doesn't match header: real=" + w + " header=" + g[ni]
        );
      return g[es];
    }
    function i(g) {
      return g = new TextDecoder().decode(g), JSON.parse(g);
    }
    if (t = new Uint8Array(t), new Uint32Array(t.buffer, 0, 1)[0] === Cn) {
      var s = this.zstd_create_ctx(t.length);
      new Uint8Array(
        this.wasm_memory.buffer,
        this.zstd_get_src_ptr(s),
        t.length
      ).set(t);
      var r = this.zstd_read(s, 16), _ = new Uint8Array(this.wasm_memory.buffer, r, 16), o = e(_, !1);
      this.zstd_read_free(r, 16), r = this.zstd_read(s, o), _ = new Uint8Array(this.wasm_memory.buffer, r, o), _ = i(_), this.zstd_read_free(r, o), r = _.state;
      var a = _.buffer_infos;
      _ = [], o = Lt + o;
      for (var d of a) {
        if (a = (o + 3 & -4) - o, 1048576 < d.length) {
          var c = this.zstd_read(s, a);
          this.zstd_read_free(c, a), c = new Uint8Array(d.length), _.push(c.buffer);
          for (var u = 0; u < d.length; ) {
            var p = d.length - u;
            p = Math.min(p, 1048576);
            const g = this.zstd_read(s, p);
            c.set(new Uint8Array(this.wasm_memory.buffer, g, p), u), this.zstd_read_free(g, p), u += p;
          }
        } else
          c = this.zstd_read(s, a + d.length), u = c + a, _.push(this.wasm_memory.buffer.slice(u, u + d.length)), this.zstd_read_free(c, a + d.length);
        o += a + d.length;
      }
      r = _i(r, _), this.set_state(r), this.zstd_free_ctx(s);
    } else {
      if (s = e(t, !0), 0 > s || s + 12 >= t.length)
        throw new $t("Invalid info block length: " + s);
      d = t.subarray(Lt, Lt + s), r = i(d), d = r.state, r = r.buffer_infos;
      let g = Lt + s;
      g = g + 3 & -4, s = r.map((f) => {
        const w = g + f.offset;
        return t.buffer.slice(w, w + f.length);
      }), d = _i(d, s), this.set_state(d);
    }
  };
  var is = 0, ss = 1, rs = 2, ns = 3, qn = 4, Mn = 4, os = 5, _s = 6, hs = 7, as = 8, ds = 9, cs = 10, us = 11, Ln = 12, Un = 12, Pn = 13, zn = 13, Nn = 14, Fn = 14, Bn = 15, Gn = 15, ps = 16, ls = 31, Wn = 1, Hn = 2, hi = 64, Vn = 128, jn = 1, fs = 64, Xn = 76, ai = 128;
  function ms(t, e, i) {
    t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && (n("Replace mac in eth destination field", k), t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5]), t[6] === e[0] && t[7] === e[1] && t[8] === e[2] && t[9] === e[3] && t[10] === e[4] && t[11] === e[5] && (n("Replace mac in eth source field", k), t[6] = i[0], t[7] = i[1], t[8] = i[2], t[9] = i[3], t[10] = i[4], t[11] = i[5]);
    var s = t[12] << 8 | t[13];
    if (s === 2048) {
      if (t = t.subarray(14), s = t[0] >> 4, s !== 4)
        n("Expected ipv4.version==4 but got: " + s, k);
      else if (t[0] & 15, t[9] === 17) {
        t = t.subarray(20), s = t[0] << 8 | t[1];
        var r = t[2] << 8 | t[3];
        if (n(
          "udp srcport=" + s + " dstport=" + r + " checksum=" + h(t[6] << 8 | t[7], 4),
          k
        ), s === 67 || r === 67)
          if (s = t.subarray(8), r = s[236] << 24 | s[237] << 16 | s[238] << 8 | s[239], r !== 1669485411)
            n(
              "dhcp packet didn't match magic: " + h(r, 8)
            );
          else
            for (s[28] === e[0] && s[29] === e[1] && s[30] === e[2] && s[31] === e[3] && s[32] === e[4] && s[33] === e[5] && (n(
              "Replace mac in dhcp.chaddr",
              k
            ), s[28] = i[0], s[29] = i[1], s[30] = i[2], s[31] = i[3], s[32] = i[4], s[33] = i[5], t[6] = t[7] = 0), r = 240; r < s.length; ) {
              const _ = s[r++];
              if (_ === 255)
                break;
              const o = s[r++];
              _ === 61 && s[r + 0] === 1 && s[r + 1] === e[0] && s[r + 2] === e[1] && s[r + 3] === e[2] && s[r + 4] === e[3] && s[r + 5] === e[4] && s[r + 6] === e[5] && (n(
                "Replace mac in dhcp.clientidentifier",
                k
              ), s[r + 1] = i[0], s[r + 2] = i[1], s[r + 3] = i[2], s[r + 4] = i[3], s[r + 5] = i[4], s[r + 6] = i[5], t[6] = t[7] = 0), r += o;
            }
      }
    } else
      s === 2054 && (t = t.subarray(14), n(
        "arp oper=" + t[7] + " " + me(t.subarray(8, 14)) + " " + me(t.subarray(18, 24)),
        k
      ), t[8] === e[0] && t[9] === e[1] && t[10] === e[2] && t[11] === e[3] && t[12] === e[4] && t[13] === e[5] && (n("Replace mac in arp.sha", k), t[8] = i[0], t[9] = i[1], t[10] = i[2], t[11] = i[3], t[12] = i[4], t[13] = i[5]));
  }
  function me(t) {
    return [
      t[0].toString(16).padStart(2, "0"),
      t[1].toString(16).padStart(2, "0"),
      t[2].toString(16).padStart(2, "0"),
      t[3].toString(16).padStart(2, "0"),
      t[4].toString(16).padStart(2, "0"),
      t[5].toString(16).padStart(2, "0")
    ].join(":");
  }
  function ut(t, e, i, s) {
    for (this.cpu = t, this.pci = t.devices.pci, this.preserve_mac_from_state_image = i, this.mac_address_translation = s, this.bus = e, this.bus.register(
      "net0-receive",
      function(r) {
        this.receive(r);
      },
      this
    ), this.port = 768, this.name = "ne2k", this.pci_space = [
      236,
      16,
      41,
      128,
      3,
      1,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      this.port & 255 | 1,
      this.port >> 8,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      244,
      26,
      0,
      17,
      0,
      0,
      184,
      254,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0
    ], this.pci_id = 40, this.pci_bars = [{ size: 32 }], this.imr = this.isr = 0, this.cr = 1, this.tpsr = this.tcnt = this.rcnt = this.dcfg = 0, this.memory = new Uint8Array(32768), this.txcr = this.rxcr = 0, this.tsr = 1, this.mac = new Uint8Array([
      0,
      34,
      21,
      255 * Math.random() | 0,
      255 * Math.random() | 0,
      255 * Math.random() | 0
    ]), this.mac_address_in_state = null, e = 0; 6 > e; e++)
      this.memory[e << 1] = this.memory[e << 1 | 1] = this.mac[e];
    this.memory[28] = this.memory[29] = 87, this.memory[30] = this.memory[31] = 87, n("Mac: " + me(this.mac), k), this.rsar = 0, this.pstart = fs, this.pstop = ai, this.boundary = this.curpg = Xn, e = t.io, e.register_read(this.port | is, this, function() {
      return n("Read cmd", k), this.cr;
    }), e.register_write(this.port | is, this, function(r) {
      this.cr = r, n(
        "Write command: " + h(r, 2) + " newpg=" + (this.cr >> 6) + " txcr=" + h(this.txcr, 2),
        k
      ), this.cr & 1 || (r & 24 && this.rcnt === 0 && this.do_interrupt(hi), r & 4 && (r = this.tpsr << 8, r = this.memory.subarray(r, r + this.tcnt), this.mac_address_in_state && (r = new Uint8Array(r), ms(
        r,
        this.mac_address_in_state,
        this.mac
      )), this.bus.send("net0-send", r), this.bus.send("eth-transmit-end", [r.length]), this.cr &= -5, this.do_interrupt(Hn), n(
        "Command: Transfer. length=" + h(r.byteLength),
        k
      )));
    }), e.register_read(this.port | zn, this, function() {
      return n("Read counter0", k), 0;
    }), e.register_read(
      this.port | Fn,
      this,
      function() {
        return n("Read8 counter1", k), 0;
      },
      function() {
        return n("Read16 counter1", k), 0;
      }
    ), e.register_read(this.port | Gn, this, function() {
      return n("Read counter2", k), 0;
    }), e.register_read(this.port | ls, this, function() {
      return this.get_page(), n("Read reset", k), this.do_interrupt(Vn), 0;
    }), e.register_write(this.port | ls, this, function(r) {
      this.get_page(), n("Write reset: " + h(r, 2), k);
    }), e.register_read(this.port | ss, this, function() {
      var r = this.get_page();
      return r === 0 ? this.pstart : r === 1 ? (n("Read pg1/01 (mac[0])", k), this.mac[0]) : r === 2 ? this.pstart : (n("Read pg" + r + "/01"), 0);
    }), e.register_write(this.port | ss, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("start page: " + h(r, 2), k), this.pstart = r) : _ === 1 ? (n("mac[0] = " + h(r), k), this.mac[0] = r) : _ === 3 ? n(
        "Unimplemented: Write pg3/01 (9346CR): " + h(r),
        k
      ) : (n("Write pg" + _ + "/01: " + h(r), k), void 0);
    }), e.register_read(this.port | rs, this, function() {
      var r = this.get_page();
      return r === 0 ? this.pstop : r === 1 ? (n("Read pg1/02 (mac[1])", k), this.mac[1]) : r === 2 ? this.pstop : (n("Read pg" + r + "/02", k), 0);
    }), e.register_write(this.port | rs, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("stop page: " + h(r, 2), k), r > this.memory.length >> 8 && (r = this.memory.length >> 8, n("XXX: Adjusting stop page to " + h(r), k)), this.pstop = r) : _ === 1 ? (n("mac[1] = " + h(r), k), this.mac[1] = r) : (n("Write pg" + _ + "/02: " + h(r), k), void 0);
    }), e.register_read(this.port | hs, this, function() {
      var r = this.get_page();
      if (r === 0)
        return n("Read isr: " + h(this.isr, 2), k), this.isr;
      if (r === 1)
        return n("Read curpg: " + h(this.curpg, 2), k), this.curpg;
    }), e.register_write(this.port | hs, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write isr: " + h(r, 2), k), this.isr &= ~r, this.update_irq()) : _ === 1 ? (n("Write curpg: " + h(r, 2), k), this.curpg = r) : void 0;
    }), e.register_write(this.port | Pn, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (this.txcr = r, n("Write tx config: " + h(r, 2), k)) : n(
        "Unimplemented: Write pg" + _ + "/0d " + h(r, 2),
        k
      );
    }), e.register_write(this.port | Nn, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write data configuration: " + h(r, 2), k), this.dcfg = r) : n(
        "Unimplemented: Write pg" + _ + "/0e " + h(r, 2),
        k
      );
    }), e.register_read(this.port | cs, this, function() {
      return this.get_page() === 0 ? (n("Read pg0/0a", k), 80) : 0;
    }), e.register_write(this.port | cs, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write remote byte count low: " + h(r, 2), k), this.rcnt = this.rcnt & 65280 | r & 255) : n(
        "Unimplemented: Write pg" + _ + "/0a " + h(r, 2),
        k
      );
    }), e.register_read(this.port | us, this, function() {
      return this.get_page() === 0 ? (n("Read pg0/0b", k), 67) : 0;
    }), e.register_write(this.port | us, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write remote byte count high: " + h(r, 2), k), this.rcnt = this.rcnt & 255 | r << 8 & 65280) : n(
        "Unimplemented: Write pg" + _ + "/0b " + h(r, 2),
        k
      );
    }), e.register_read(this.port | as, this, function() {
      var r = this.get_page();
      if (r === 0)
        return n("Read remote start address low", k), this.rsar & 255;
      n("Unimplemented: Read pg" + r + "/08", k);
    }), e.register_write(this.port | as, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n(
        "Write remote start address low: " + h(r, 2),
        k
      ), this.rsar = this.rsar & 65280 | r & 255) : n(
        "Unimplemented: Write pg" + _ + "/08 " + h(r, 2),
        k
      );
    }), e.register_read(this.port | ds, this, function() {
      var r = this.get_page();
      if (r === 0)
        return n("Read remote start address high", k), this.rsar >> 8 & 255;
      n("Unimplemented: Read pg" + r + "/09", k);
    }), e.register_write(this.port | ds, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n(
        "Write remote start address low: " + h(r, 2),
        k
      ), this.rsar = this.rsar & 255 | r << 8 & 65280) : n(
        "Unimplemented: Write pg" + _ + "/09 " + h(r, 2),
        k
      );
    }), e.register_write(this.port | Bn, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n(
        "Write interrupt mask register: " + h(r, 2) + " isr=" + h(this.isr, 2),
        k
      ), this.imr = r, this.update_irq()) : n(
        "Unimplemented: Write pg" + _ + "/0f " + h(r, 2),
        k
      );
    }), e.register_read(this.port | ns, this, function() {
      var r = this.get_page();
      return r === 0 ? (n("Read boundary: " + h(this.boundary, 2), k), this.boundary) : r === 1 ? (n("Read pg1/03 (mac[2])", k), this.mac[2]) : (r === 3 ? n("Unimplemented: Read pg3/03 (CONFIG0)", k) : (n("Read pg" + r + "/03", k), void 0), 0);
    }), e.register_write(this.port | ns, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write boundary: " + h(r, 2), k), this.boundary = r) : _ === 1 ? (n("mac[2] = " + h(r), k), this.mac[2] = r) : (n("Write pg" + _ + "/03: " + h(r), k), void 0);
    }), e.register_read(this.port | qn, this, function() {
      var r = this.get_page();
      return r === 0 ? this.tsr : r === 1 ? (n("Read pg1/04 (mac[3])", k), this.mac[3]) : (n("Read pg" + r + "/04", k), 0);
    }), e.register_write(this.port | Mn, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write tpsr: " + h(r, 2), k), this.tpsr = r) : _ === 1 ? (n("mac[3] = " + h(r), k), this.mac[3] = r) : (n("Write pg" + _ + "/04: " + h(r), k), void 0);
    }), e.register_read(this.port | os, this, function() {
      var r = this.get_page();
      return r === 0 ? (n(
        "Unimplemented: Read pg0/05 (NCR: Number of Collisions Register)",
        k
      ), 0) : r === 1 ? (n("Read pg1/05 (mac[4])", k), this.mac[4]) : (r === 3 ? n("Unimplemented: Read pg3/05 (CONFIG2)", k) : (n("Read pg" + r + "/05", k), void 0), 0);
    }), e.register_write(this.port | os, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write tcnt low: " + h(r, 2), k), this.tcnt = this.tcnt & -256 | r) : _ === 1 ? (n("mac[4] = " + h(r), k), this.mac[4] = r) : _ === 3 ? n(
        "Unimplemented: Write pg3/05 (CONFIG2): " + h(r),
        k
      ) : (n("Write pg" + _ + "/05: " + h(r), k), void 0);
    }), e.register_read(this.port | _s, this, function() {
      var r = this.get_page();
      return r === 0 ? 0 : r === 1 ? (n("Read pg1/06 (mac[5])", k), this.mac[5]) : (r === 3 ? n("Unimplemented: Read pg3/06 (CONFIG3)", k) : (n("Read pg" + r + "/06", k), void 0), 0);
    }), e.register_write(this.port | _s, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("Write tcnt high: " + h(r, 2), k), this.tcnt = this.tcnt & 255 | r << 8) : _ === 1 ? (n("mac[5] = " + h(r), k), this.mac[5] = r) : _ === 3 ? n(
        "Unimplemented: Write pg3/06 (CONFIG3): " + h(r),
        k
      ) : (n("Write pg" + _ + "/06: " + h(r), k), void 0);
    }), e.register_read(this.port | Ln, this, function() {
      var r = this.get_page();
      return r === 0 ? 9 : (n("Unimplemented: Read pg" + r + "/0c", k), 0);
    }), e.register_write(this.port | Un, this, function(r) {
      var _ = this.get_page();
      _ === 0 ? (n("RX configuration reg write: " + h(r, 2), k), this.rxcr = r) : n(
        "Unimplemented: Write pg" + _ + "/0c: " + h(r),
        k
      );
    }), e.register_read(
      this.port | ps | 0,
      this,
      this.data_port_read8,
      this.data_port_read16,
      this.data_port_read32
    ), e.register_write(
      this.port | ps | 0,
      this,
      this.data_port_write16,
      this.data_port_write16,
      this.data_port_write32
    ), t.devices.pci.register_device(this);
  }
  ut.prototype.get_state = function() {
    var t = [];
    return t[0] = this.isr, t[1] = this.imr, t[2] = this.cr, t[3] = this.dcfg, t[4] = this.rcnt, t[5] = this.tcnt, t[6] = this.tpsr, t[7] = this.rsar, t[8] = this.pstart, t[9] = this.curpg, t[10] = this.boundary, t[11] = this.pstop, t[12] = this.rxcr, t[13] = this.txcr, t[14] = this.tsr, t[15] = this.mac, t[16] = this.memory, t;
  }, ut.prototype.set_state = function(t) {
    this.isr = t[0], this.imr = t[1], this.cr = t[2], this.dcfg = t[3], this.rcnt = t[4], this.tcnt = t[5], this.tpsr = t[6], this.rsar = t[7], this.pstart = t[8], this.curpg = t[9], this.boundary = t[10], this.pstop = t[11], this.rxcr = t[12], this.txcr = t[13], this.tsr = t[14], this.preserve_mac_from_state_image ? (this.mac = t[15], this.memory = t[16]) : this.mac_address_translation && (this.mac_address_in_state = t[15], this.memory = t[16], n(
      "Using mac address translation guest_os_mac=" + me(this.mac_address_in_state) + " real_mac=" + me(this.mac),
      k
    ));
  }, ut.prototype.do_interrupt = function(t) {
    n("Do interrupt " + h(t, 2), k), this.isr |= t, this.update_irq();
  }, ut.prototype.update_irq = function() {
    this.imr & this.isr ? this.pci.raise_irq(this.pci_id) : this.pci.lower_irq(this.pci_id);
  }, ut.prototype.data_port_write = function(t) {
    (16 >= this.rsar || this.rsar >= fs << 8 && this.rsar < ai << 8) && (this.memory[this.rsar] = t), this.rsar++, this.rcnt--, this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8), this.rcnt === 0 && this.do_interrupt(hi);
  }, ut.prototype.data_port_write16 = function(t) {
    this.data_port_write(t), this.dcfg & 1 && this.data_port_write(t >> 8);
  }, ut.prototype.data_port_write32 = function(t) {
    this.data_port_write(t), this.data_port_write(t >> 8), this.data_port_write(t >> 16), this.data_port_write(t >> 24);
  }, ut.prototype.data_port_read = function() {
    let t = 0;
    return this.rsar < ai << 8 && (t = this.memory[this.rsar]), this.rsar++, this.rcnt--, this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8), this.rcnt === 0 && this.do_interrupt(hi), t;
  }, ut.prototype.data_port_read8 = function() {
    return this.data_port_read16() & 255;
  }, ut.prototype.data_port_read16 = function() {
    return this.dcfg & 1 ? this.data_port_read() | this.data_port_read() << 8 : this.data_port_read();
  }, ut.prototype.data_port_read32 = function() {
    return this.data_port_read() | this.data_port_read() << 8 | this.data_port_read() << 16 | this.data_port_read() << 24;
  }, ut.prototype.receive = function(t) {
    if (!(this.cr & 1) && (this.bus.send("eth-receive-end", [t.length]), this.rxcr & 16 || this.rxcr & 4 && t[0] === 255 && t[1] === 255 && t[2] === 255 && t[3] === 255 && t[4] === 255 && t[5] === 255 || !(this.rxcr & 8 && (t[0] & 1) === 1 || t[0] !== this.mac[0] || t[1] !== this.mac[1] || t[2] !== this.mac[2] || t[3] !== this.mac[3] || t[4] !== this.mac[4] || t[5] !== this.mac[5]))) {
      this.mac_address_in_state && (t = new Uint8Array(t), ms(t, this.mac, this.mac_address_in_state));
      var e = this.curpg << 8, i = Math.max(60, t.length) + 4, s = e + 4, r = this.curpg + 1 + (i >> 8), _ = e + i, o = 1 + (i >> 8), a = this.boundary > this.curpg ? this.boundary - this.curpg : this.pstop - this.curpg + this.boundary - this.pstart;
      a < o && this.boundary !== 0 ? n(
        "Buffer full, dropping packet pstart=" + h(this.pstart) + " pstop=" + h(this.pstop) + " curpg=" + h(this.curpg) + " needed=" + h(o) + " boundary=" + h(this.boundary) + " available=" + h(a),
        k
      ) : (_ > this.pstop << 8 ? (60 <= t.length, _ = (this.pstop << 8) - s, this.memory.set(t.subarray(0, _), s), this.memory.set(t.subarray(_), this.pstart << 8), n("rcv cut=" + h(_), k)) : (this.memory.set(t, s), 60 > t.length && this.memory.fill(0, s + t.length, s + 60)), r >= this.pstop && (r += this.pstart - this.pstop), this.memory[e] = jn, this.memory[e + 1] = r, this.memory[e + 2] = i, this.memory[e + 3] = i >> 8, this.curpg = r, n(
        "rcv offset=" + h(e) + " len=" + h(i) + " next=" + h(r),
        k
      ), this.do_interrupt(Wn));
    }
  }, ut.prototype.get_page = function() {
    return this.cr >> 6 & 3;
  };
  var gs = "COPYRIGHT (C) CREATIVE TECHNOLOGY LTD, 1992.", Pe = 0, di = 64, ys = 65536, Kn = 65536, Yn = 1024, vs = 0, ci = 1, ws = 3, ui = 5, bs = 6, ks = 7, As = 2, pi = 5, Es = 7, Is = 10, Kt = 1, xs = 2, Rs = new Uint8Array(256), Ts = [], ze = [], Ne = [], Ss = new Uint8Array(256), li = [];
  function R(t, e) {
    this.cpu = t, this.bus = e, this.write_buffer = new he(di), this.read_buffer = new he(di), this.read_buffer_lastvalue = 0, this.command = Pe, this.mixer_current_address = this.command_size = 0, this.mixer_registers = new Uint8Array(256), this.mixer_reset(), this.dummy_speaker_enabled = !1, this.test_register = 0, this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1, this.dac_buffers = [
      new Vt(ys),
      new Vt(ys)
    ], this.dma = t.devices.dma, this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0, this.dma_channel_8bit = ci, this.dma_channel_16bit = ui, this.dma_autoinit = !1, this.dma_buffer = new ArrayBuffer(Kn), this.dma_buffer_int8 = new Int8Array(this.dma_buffer), this.dma_buffer_uint8 = new Uint8Array(this.dma_buffer), this.dma_buffer_int16 = new Int16Array(this.dma_buffer), this.dma_buffer_uint16 = new Uint16Array(this.dma_buffer), this.dma_syncbuffer = new l.SyncBuffer(this.dma_buffer), this.dma_paused = this.dma_waiting_transfer = !1, this.sampling_rate = 22050, e.send("dac-tell-sampling-rate", this.sampling_rate), this.bytes_per_sample = 1, this.e2_value = 170, this.e2_count = 0, this.asp_registers = new Uint8Array(256), this.mpu_read_buffer = new he(di), this.fm_current_address1 = this.fm_current_address0 = this.mpu_read_buffer_lastvalue = 0, this.fm_waveform_select_enable = !1, this.irq = pi, this.irq_triggered = new Uint8Array(16), t.io.register_read_consecutive(
      544,
      this,
      this.port2x0_read,
      this.port2x1_read,
      this.port2x2_read,
      this.port2x3_read
    ), t.io.register_read_consecutive(
      904,
      this,
      this.port2x0_read,
      this.port2x1_read
    ), t.io.register_read_consecutive(
      548,
      this,
      this.port2x4_read,
      this.port2x5_read
    ), t.io.register_read(550, this, this.port2x6_read), t.io.register_read(551, this, this.port2x7_read), t.io.register_read(552, this, this.port2x8_read), t.io.register_read(553, this, this.port2x9_read), t.io.register_read(554, this, this.port2xA_read), t.io.register_read(555, this, this.port2xB_read), t.io.register_read(556, this, this.port2xC_read), t.io.register_read(557, this, this.port2xD_read), t.io.register_read_consecutive(
      558,
      this,
      this.port2xE_read,
      this.port2xF_read
    ), t.io.register_write_consecutive(
      544,
      this,
      this.port2x0_write,
      this.port2x1_write,
      this.port2x2_write,
      this.port2x3_write
    ), t.io.register_write_consecutive(
      904,
      this,
      this.port2x0_write,
      this.port2x1_write
    ), t.io.register_write_consecutive(
      548,
      this,
      this.port2x4_write,
      this.port2x5_write
    ), t.io.register_write(550, this, this.port2x6_write), t.io.register_write(551, this, this.port2x7_write), t.io.register_write_consecutive(
      552,
      this,
      this.port2x8_write,
      this.port2x9_write
    ), t.io.register_write(554, this, this.port2xA_write), t.io.register_write(555, this, this.port2xB_write), t.io.register_write(556, this, this.port2xC_write), t.io.register_write(557, this, this.port2xD_write), t.io.register_write(558, this, this.port2xE_write), t.io.register_write(559, this, this.port2xF_write), t.io.register_read_consecutive(
      816,
      this,
      this.port3x0_read,
      this.port3x1_read
    ), t.io.register_write_consecutive(
      816,
      this,
      this.port3x0_write,
      this.port3x1_write
    ), this.dma.on_unmask(this.dma_on_unmask, this), e.register(
      "dac-request-data",
      function() {
        this.dac_handle_request();
      },
      this
    ), e.register(
      "speaker-has-initialized",
      function() {
        this.mixer_reset();
      },
      this
    ), e.send("speaker-confirm-initialized"), this.dsp_reset();
  }
  R.prototype.dsp_reset = function() {
    this.write_buffer.clear(), this.read_buffer.clear(), this.command = Pe, this.command_size = 0, this.dummy_speaker_enabled = !1, this.test_register = 0, this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1, this.dac_buffers[0].clear(), this.dac_buffers[1].clear(), this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0, this.dma_autoinit = !1, this.dma_buffer_uint8.fill(0), this.dma_paused = this.dma_waiting_transfer = !1, this.e2_value = 170, this.e2_count = 0, this.sampling_rate = 22050, this.bytes_per_sample = 1, this.lower_irq(Kt), this.irq_triggered.fill(0), this.asp_registers.fill(0), this.asp_registers[5] = 1, this.asp_registers[9] = 248;
  }, R.prototype.get_state = function() {
    var t = [];
    return t[2] = this.read_buffer_lastvalue, t[3] = this.command, t[4] = this.command_size, t[5] = this.mixer_current_address, t[6] = this.mixer_registers, t[7] = this.dummy_speaker_enabled, t[8] = this.test_register, t[9] = this.dsp_highspeed, t[10] = this.dsp_stereo, t[11] = this.dsp_16bit, t[12] = this.dsp_signed, t[15] = this.dma_sample_count, t[16] = this.dma_bytes_count, t[17] = this.dma_bytes_left, t[18] = this.dma_bytes_block, t[19] = this.dma_irq, t[20] = this.dma_channel, t[21] = this.dma_channel_8bit, t[22] = this.dma_channel_16bit, t[23] = this.dma_autoinit, t[24] = this.dma_buffer_uint8, t[25] = this.dma_waiting_transfer, t[26] = this.dma_paused, t[27] = this.sampling_rate, t[28] = this.bytes_per_sample, t[29] = this.e2_value, t[30] = this.e2_count, t[31] = this.asp_registers, t[33] = this.mpu_read_buffer_last_value, t[34] = this.irq, t[35] = this.irq_triggered, t;
  }, R.prototype.set_state = function(t) {
    this.read_buffer_lastvalue = t[2], this.command = t[3], this.command_size = t[4], this.mixer_current_address = t[5], this.mixer_registers = t[6], this.mixer_full_update(), this.dummy_speaker_enabled = t[7], this.test_register = t[8], this.dsp_highspeed = t[9], this.dsp_stereo = t[10], this.dsp_16bit = t[11], this.dsp_signed = t[12], this.dma_sample_count = t[15], this.dma_bytes_count = t[16], this.dma_bytes_left = t[17], this.dma_bytes_block = t[18], this.dma_irq = t[19], this.dma_channel = t[20], this.dma_channel_8bit = t[21], this.dma_channel_16bit = t[22], this.dma_autoinit = t[23], this.dma_buffer_uint8 = t[24], this.dma_waiting_transfer = t[25], this.dma_paused = t[26], this.sampling_rate = t[27], this.bytes_per_sample = t[28], this.e2_value = t[29], this.e2_count = t[30], this.asp_registers = t[31], this.mpu_read_buffer_last_value = t[33], this.irq = t[34], this.irq_triggered = t[35], this.dma_buffer = this.dma_buffer_uint8.buffer, this.dma_buffer_int8 = new Int8Array(this.dma_buffer), this.dma_buffer_int16 = new Int16Array(this.dma_buffer), this.dma_buffer_uint16 = new Uint16Array(this.dma_buffer), this.dma_syncbuffer = new l.SyncBuffer(this.dma_buffer), this.dma_paused ? this.bus.send("dac-disable") : this.bus.send("dac-enable");
  }, R.prototype.port2x0_read = function() {
    return n("220 read: fm music status port (unimplemented)", q), 255;
  }, R.prototype.port2x1_read = function() {
    return n("221 read: fm music data port (write only)", q), 255;
  }, R.prototype.port2x2_read = function() {
    return n(
      "222 read: advanced fm music status port (unimplemented)",
      q
    ), 255;
  }, R.prototype.port2x3_read = function() {
    return n("223 read: advanced music data port (write only)", q), 255;
  }, R.prototype.port2x4_read = function() {
    return n("224 read: mixer address port", q), this.mixer_current_address;
  }, R.prototype.port2x5_read = function() {
    return n("225 read: mixer data port", q), this.mixer_read(this.mixer_current_address);
  }, R.prototype.port2x6_read = function() {
    return n("226 read: (write only)", q), 255;
  }, R.prototype.port2x7_read = function() {
    return n("227 read: undocumented", q), 255;
  }, R.prototype.port2x8_read = function() {
    return n("228 read: fm music status port (unimplemented)", q), 255;
  }, R.prototype.port2x9_read = function() {
    return n("229 read: fm music data port (write only)", q), 255;
  }, R.prototype.port2xA_read = function() {
    return n("22A read: read data", q), this.read_buffer.length && (this.read_buffer_lastvalue = this.read_buffer.shift()), n(
      " <- " + this.read_buffer_lastvalue + " " + h(this.read_buffer_lastvalue) + " '" + String.fromCharCode(this.read_buffer_lastvalue) + "'",
      q
    ), this.read_buffer_lastvalue;
  }, R.prototype.port2xB_read = function() {
    return n("22B read: undocumented", q), 255;
  }, R.prototype.port2xC_read = function() {
    return n("22C read: write-buffer status", q), 127;
  }, R.prototype.port2xD_read = function() {
    return n("22D read: undocumented", q), 255;
  }, R.prototype.port2xE_read = function() {
    return n("22E read: read-buffer status / irq 8bit ack.", q), this.irq_triggered[Kt] && this.lower_irq(Kt), (this.read_buffer.length && !this.dsp_highspeed) << 7 | 127;
  }, R.prototype.port2xF_read = function() {
    return n("22F read: irq 16bit ack", q), this.lower_irq(xs), 0;
  }, R.prototype.port2x0_write = function(t) {
    n(
      "220 write: (unimplemented) fm register 0 address = " + h(t),
      q
    ), this.fm_current_address0 = 0;
  }, R.prototype.port2x1_write = function(t) {
    n(
      "221 write: (unimplemented) fm register 0 data = " + h(t),
      q
    );
    var e = li[this.fm_current_address0];
    e || (e = this.fm_default_write), e.call(this, t, 0, this.fm_current_address0);
  }, R.prototype.port2x2_write = function(t) {
    n(
      "222 write: (unimplemented) fm register 1 address = " + h(t),
      q
    ), this.fm_current_address1 = 0;
  }, R.prototype.port2x3_write = function(t) {
    n(
      "223 write: (unimplemented) fm register 1 data =" + h(t),
      q
    );
    var e = li[this.fm_current_address1];
    e || (e = this.fm_default_write), e.call(this, t, 1, this.fm_current_address1);
  }, R.prototype.port2x4_write = function(t) {
    n("224 write: mixer address = " + h(t), q), this.mixer_current_address = t;
  }, R.prototype.port2x5_write = function(t) {
    n("225 write: mixer data = " + h(t), q), this.mixer_write(this.mixer_current_address, t);
  }, R.prototype.port2x6_write = function(t) {
    n("226 write: reset = " + h(t), q), this.dsp_highspeed ? (n(" -> exit highspeed", q), this.dsp_highspeed = !1) : t && (n(" -> reset", q), this.dsp_reset()), this.read_buffer.clear(), this.read_buffer.push(170);
  }, R.prototype.port2x7_write = function(t) {
    n("227 write: undocumented", q);
  }, R.prototype.port2x8_write = function(t) {
    n("228 write: fm music register port (unimplemented)", q);
  }, R.prototype.port2x9_write = function(t) {
    n("229 write: fm music data port (unimplemented)", q);
  }, R.prototype.port2xA_write = function(t) {
    n("22A write: dsp read data port (read only)", q);
  }, R.prototype.port2xB_write = function(t) {
    n("22B write: undocumented", q);
  }, R.prototype.port2xC_write = function(t) {
    n("22C write: write command/data", q), this.command === Pe ? (n("22C write: command = " + h(t), q), this.command = t, this.write_buffer.clear(), this.command_size = Rs[t]) : (n("22C write: data: " + h(t), q), this.write_buffer.push(t)), this.write_buffer.length >= this.command_size && this.command_do();
  }, R.prototype.port2xD_write = function(t) {
    n("22D write: undocumented", q);
  }, R.prototype.port2xE_write = function(t) {
    n("22E write: dsp read buffer status (read only)", q);
  }, R.prototype.port2xF_write = function(t) {
    n("22F write: undocumented", q);
  }, R.prototype.port3x0_read = function() {
    return n("330 read: mpu data", q), this.mpu_read_buffer.length && (this.mpu_read_buffer_lastvalue = this.mpu_read_buffer.shift()), n(" <- " + h(this.mpu_read_buffer_lastvalue), q), this.mpu_read_buffer_lastvalue;
  }, R.prototype.port3x0_write = function(t) {
    n("330 write: mpu data (unimplemented) : " + h(t), q);
  }, R.prototype.port3x1_read = function() {
    return n("331 read: mpu status", q), 0 | 128 * !this.mpu_read_buffer.length;
  }, R.prototype.port3x1_write = function(t) {
    n("331 write: mpu command: " + h(t), q), t == 255 && (this.mpu_read_buffer.clear(), this.mpu_read_buffer.push(254));
  }, R.prototype.command_do = function() {
    var t = Ts[this.command];
    t || (t = this.dsp_default_handler), t.call(this), this.command = Pe, this.command_size = 0, this.write_buffer.clear();
  }, R.prototype.dsp_default_handler = function() {
    n("Unhandled command: " + h(this.command), q);
  };
  function M(t, e, i) {
    i || (i = R.prototype.dsp_default_handler);
    for (var s = 0; s < t.length; s++)
      Rs[t[s]] = e, Ts[t[s]] = i;
  }
  function Os(t) {
    for (var e = [], i = 0; 16 > i; i++)
      e.push(t + i);
    return e;
  }
  M([14], 2, function() {
    this.asp_registers[this.write_buffer.shift()] = this.write_buffer.shift();
  }), M([15], 1, function() {
    this.read_buffer.clear(), this.read_buffer.push(this.asp_registers[this.write_buffer.shift()]);
  }), M([16], 1, function() {
    var t = Cs(this.write_buffer.shift(), 127.5, -1);
    this.dac_buffers[0].push(t), this.dac_buffers[1].push(t), this.bus.send("dac-enable");
  }), M([20, 21], 2, function() {
    this.dma_irq = Kt, this.dma_channel = this.dma_channel_8bit, this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = this.dma_autoinit = !1, this.dma_transfer_size_set(), this.dma_transfer_start();
  }), M([22], 2), M([23], 2), M([28], 0, function() {
    this.dma_irq = Kt, this.dma_channel = this.dma_channel_8bit, this.dma_autoinit = !0, this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = !1, this.dma_transfer_start();
  }), M([31], 0), M([32], 0, function() {
    this.read_buffer.clear(), this.read_buffer.push(127);
  }), M([36], 2), M([44], 0), M([48], 0), M([49], 0), M([52], 0), M([53], 0), M([54], 0), M([55], 0), M([56], 0), M([64], 1, function() {
    this.sampling_rate_change(
      1e6 / (256 - this.write_buffer.shift()) / this.get_channel_count()
    );
  }), M([65, 66], 2, function() {
    this.sampling_rate_change(
      this.write_buffer.shift() << 8 | this.write_buffer.shift()
    );
  }), M([72], 2, function() {
    this.dma_transfer_size_set();
  }), M([116], 2), M([117], 2), M([118], 2), M([119], 2), M([125], 0), M([127], 0), M([128], 2), M([144], 0, function() {
    this.dma_irq = Kt, this.dma_channel = this.dma_channel_8bit, this.dma_autoinit = !0, this.dsp_signed = !1, this.dsp_highspeed = !0, this.dsp_16bit = !1, this.dma_transfer_start();
  }), M([145], 0), M([152], 0), M([153], 0), M([160], 0), M([168], 0), M(Os(176), 3, function() {
    if (this.command & 8)
      this.dsp_default_handler();
    else {
      var t = this.write_buffer.shift();
      this.dma_irq = xs, this.dma_channel = this.dma_channel_16bit, this.dma_autoinit = !!(this.command & 4), this.dsp_signed = !!(t & 16), this.dsp_stereo = !!(t & 32), this.dsp_16bit = !0, this.dma_transfer_size_set(), this.dma_transfer_start();
    }
  }), M(Os(192), 3, function() {
    if (this.command & 8)
      this.dsp_default_handler();
    else {
      var t = this.write_buffer.shift();
      this.dma_irq = Kt, this.dma_channel = this.dma_channel_8bit, this.dma_autoinit = !!(this.command & 4), this.dsp_signed = !!(t & 16), this.dsp_stereo = !!(t & 32), this.dsp_16bit = !1, this.dma_transfer_size_set(), this.dma_transfer_start();
    }
  }), M([208], 0, function() {
    this.dma_paused = !0, this.bus.send("dac-disable");
  }), M([209], 0, function() {
    this.dummy_speaker_enabled = !0;
  }), M([211], 0, function() {
    this.dummy_speaker_enabled = !1;
  }), M([212], 0, function() {
    this.dma_paused = !1, this.bus.send("dac-enable");
  }), M([213], 0, function() {
    this.dma_paused = !0, this.bus.send("dac-disable");
  }), M([214], 0, function() {
    this.dma_paused = !1, this.bus.send("dac-enable");
  }), M([216], 0, function() {
    this.read_buffer.clear(), this.read_buffer.push(255 * this.dummy_speaker_enabled);
  }), M([217, 218], 0, function() {
    this.dma_autoinit = !1;
  }), M([224], 1, function() {
    this.read_buffer.clear(), this.read_buffer.push(~this.write_buffer.shift());
  }), M([225], 0, function() {
    this.read_buffer.clear(), this.read_buffer.push(4), this.read_buffer.push(5);
  }), M([226], 1), M([227], 0, function() {
    this.read_buffer.clear();
    for (var t = 0; t < gs.length; t++)
      this.read_buffer.push(gs.charCodeAt(t));
    this.read_buffer.push(0);
  }), M([228], 1, function() {
    this.test_register = this.write_buffer.shift();
  }), M([232], 0, function() {
    this.read_buffer.clear(), this.read_buffer.push(this.test_register);
  }), M([242, 243], 0, function() {
    this.raise_irq();
  });
  var Fe = new Uint8Array(256);
  Fe[14] = 255, Fe[15] = 7, Fe[55] = 56, M([249], 1, function() {
    var t = this.write_buffer.shift();
    n("dsp 0xf9: unknown function. input: " + t, q), this.read_buffer.clear(), this.read_buffer.push(Fe[t]);
  }), R.prototype.mixer_read = function(t) {
    var e = ze[t];
    return e ? e = e.call(this) : (e = this.mixer_registers[t], n(
      "unhandled mixer register read. addr:" + h(t) + " data:" + h(e),
      q
    )), e;
  }, R.prototype.mixer_write = function(t, e) {
    var i = Ne[t];
    i ? i.call(this, e) : n(
      "unhandled mixer register write. addr:" + h(t) + " data:" + h(e),
      q
    );
  }, R.prototype.mixer_default_read = function() {
    return n(
      "mixer register read. addr:" + h(this.mixer_current_address),
      q
    ), this.mixer_registers[this.mixer_current_address];
  }, R.prototype.mixer_default_write = function(t) {
    n(
      "mixer register write. addr:" + h(this.mixer_current_address) + " data:" + h(t),
      q
    ), this.mixer_registers[this.mixer_current_address] = t;
  }, R.prototype.mixer_reset = function() {
    this.mixer_registers[4] = 204, this.mixer_registers[34] = 204, this.mixer_registers[38] = 204, this.mixer_registers[40] = 0, this.mixer_registers[46] = 0, this.mixer_registers[10] = 0, this.mixer_registers[48] = 192, this.mixer_registers[49] = 192, this.mixer_registers[50] = 192, this.mixer_registers[51] = 192, this.mixer_registers[52] = 192, this.mixer_registers[53] = 192, this.mixer_registers[54] = 0, this.mixer_registers[55] = 0, this.mixer_registers[56] = 0, this.mixer_registers[57] = 0, this.mixer_registers[59] = 0, this.mixer_registers[60] = 31, this.mixer_registers[61] = 21, this.mixer_registers[62] = 11, this.mixer_registers[63] = 0, this.mixer_registers[64] = 0, this.mixer_registers[65] = 0, this.mixer_registers[66] = 0, this.mixer_registers[67] = 0, this.mixer_registers[68] = 128, this.mixer_registers[69] = 128, this.mixer_registers[70] = 128, this.mixer_registers[71] = 128, this.mixer_full_update();
  }, R.prototype.mixer_full_update = function() {
    for (var t = 1; t < this.mixer_registers.length; t++)
      Ss[t] || this.mixer_write(t, this.mixer_registers[t]);
  };
  function wt(t, e) {
    e || (e = R.prototype.mixer_default_read), ze[t] = e;
  }
  function xt(t, e) {
    e || (e = R.prototype.mixer_default_write), Ne[t] = e;
  }
  function ge(t, e, i) {
    Ss[t] = 1, ze[t] = function() {
      return this.mixer_registers[e] & 240 | this.mixer_registers[i] >>> 4;
    }, Ne[t] = function(s) {
      this.mixer_registers[t] = s;
      var r = s << 4 & 240 | this.mixer_registers[i] & 15;
      this.mixer_write(e, s & 240 | this.mixer_registers[e] & 15), this.mixer_write(i, r);
    };
  }
  function Be(t, e, i) {
    ze[t] = R.prototype.mixer_default_read, Ne[t] = function(s) {
      this.mixer_registers[t] = s, this.bus.send("mixer-volume", [e, i, (s >>> 2) - 62]);
    };
  }
  wt(0, function() {
    return this.mixer_reset(), 0;
  }), xt(0), ge(4, 50, 51), ge(34, 48, 49), ge(38, 52, 53), ge(40, 54, 55), ge(46, 56, 57), Be(48, Xe, Yt), Be(49, Xe, Qt), Be(50, Re, Yt), Be(51, Re, Qt), wt(59), xt(59, function(t) {
    this.mixer_registers[59] = t, this.bus.send("mixer-volume", [
      xe,
      Wt,
      6 * (t >>> 6) - 18
    ]);
  }), wt(65), xt(65, function(t) {
    this.mixer_registers[65] = t, this.bus.send("mixer-gain-left", 6 * (t >>> 6));
  }), wt(66), xt(66, function(t) {
    this.mixer_registers[66] = t, this.bus.send("mixer-gain-right", 6 * (t >>> 6));
  }), wt(68), xt(68, function(t) {
    this.mixer_registers[68] = t, t >>>= 3, this.bus.send("mixer-treble-left", t - (16 > t ? 14 : 16));
  }), wt(69), xt(69, function(t) {
    this.mixer_registers[69] = t, t >>>= 3, this.bus.send("mixer-treble-right", t - (16 > t ? 14 : 16));
  }), wt(70), xt(70, function(t) {
    this.mixer_registers[70] = t, t >>>= 3, this.bus.send("mixer-bass-right", t - (16 > t ? 14 : 16));
  }), wt(71), xt(71, function(t) {
    this.mixer_registers[71] = t, t >>>= 3, this.bus.send("mixer-bass-right", t - (16 > t ? 14 : 16));
  }), wt(128, function() {
    switch (this.irq) {
      case As:
        return 1;
      case pi:
        return 2;
      case Es:
        return 4;
      case Is:
        return 8;
      default:
        return 0;
    }
  }), xt(128, function(t) {
    t & 1 && (this.irq = As), t & 2 && (this.irq = pi), t & 4 && (this.irq = Es), t & 8 && (this.irq = Is);
  }), wt(129, function() {
    var t = 0;
    switch (this.dma_channel_8bit) {
      case vs:
        t |= 1;
        break;
      case ci:
        t |= 2;
        break;
      case ws:
        t |= 8;
    }
    switch (this.dma_channel_16bit) {
      case ui:
        t |= 32;
        break;
      case bs:
        t |= 64;
        break;
      case ks:
        t |= 128;
    }
    return t;
  }), xt(129, function(t) {
    t & 1 && (this.dma_channel_8bit = vs), t & 2 && (this.dma_channel_8bit = ci), t & 8 && (this.dma_channel_8bit = ws), t & 32 && (this.dma_channel_16bit = ui), t & 64 && (this.dma_channel_16bit = bs), t & 128 && (this.dma_channel_16bit = ks);
  }), wt(130, function() {
    for (var t = 32, e = 0; 16 > e; e++)
      t |= e * this.irq_triggered[e];
    return t;
  }), R.prototype.fm_default_write = function(t, e, i) {
    n(
      "unhandled fm register write. addr:" + e + "|" + h(i) + " data:" + h(t),
      q
    );
  };
  function at(t, e) {
    e || (e = R.prototype.fm_default_write);
    for (var i = 0; i < t.length; i++)
      li[t[i]] = e;
  }
  function Ut(t, e) {
    for (var i = []; t <= e; t++)
      i.push(t);
    return i;
  }
  var it = new Uint8Array(32);
  it[0] = 0, it[1] = 1, it[2] = 2, it[3] = 3, it[4] = 4, it[5] = 5, it[8] = 6, it[9] = 7, it[10] = 8, it[11] = 9, it[12] = 10, it[13] = 11, it[16] = 12, it[17] = 13, it[18] = 14, it[19] = 15, it[20] = 16, it[21] = 17;
  function ye(t, e) {
    return 18 * t + it[e];
  }
  at([1], function(t, e, i) {
    this.fm_waveform_select_enable[e] = t & 1, this.fm_update_waveforms();
  }), at([2]), at([3]), at([4], function(t, e, i) {
  }), at([5], function(t, e, i) {
    e === 0 && this.fm_default_write(t, e, i);
  }), at([8], function(t, e, i) {
  }), at(Ut(32, 53), function(t, e, i) {
    ye(e, i - 32);
  }), at(Ut(64, 85), function(t, e, i) {
    ye(e, i - 64);
  }), at(Ut(96, 117), function(t, e, i) {
    ye(e, i - 96);
  }), at(Ut(128, 149), function(t, e, i) {
    ye(e, i - 128);
  }), at(Ut(160, 168), function(t, e, i) {
  }), at(Ut(176, 184), function(t, e, i) {
  }), at([189], function(t, e, i) {
  }), at(Ut(192, 200), function(t, e, i) {
  }), at(Ut(224, 245), function(t, e, i) {
    ye(e, i - 224);
  }), R.prototype.fm_update_waveforms = function() {
  }, R.prototype.sampling_rate_change = function(t) {
    this.sampling_rate = t, this.bus.send("dac-tell-sampling-rate", t);
  }, R.prototype.get_channel_count = function() {
    return this.dsp_stereo ? 2 : 1;
  }, R.prototype.dma_transfer_size_set = function() {
    this.dma_sample_count = 1 + (this.write_buffer.shift() << 0) + (this.write_buffer.shift() << 8);
  }, R.prototype.dma_transfer_start = function() {
    n("begin dma transfer", q), this.bytes_per_sample = 1, this.dsp_16bit && (this.bytes_per_sample *= 2), this.dma_bytes_count = this.dma_sample_count * this.bytes_per_sample, this.dma_bytes_block = Yn * this.bytes_per_sample, this.dma_bytes_block = Math.min(
      Math.max(this.dma_bytes_count >> 2 & -4, 32),
      this.dma_bytes_block
    ), this.dma_waiting_transfer = !0, this.dma.channel_mask[this.dma_channel] || this.dma_on_unmask(this.dma_channel);
  }, R.prototype.dma_on_unmask = function(t) {
    t === this.dma_channel && this.dma_waiting_transfer && (this.dma_waiting_transfer = !1, this.dma_bytes_left = this.dma_bytes_count, this.dma_paused = !1, this.bus.send("dac-enable"));
  }, R.prototype.dma_transfer_next = function() {
    n("dma transfering next block", q);
    var t = Math.min(this.dma_bytes_left, this.dma_bytes_block), e = Math.floor(t / this.bytes_per_sample);
    this.dma.do_write(this.dma_syncbuffer, 0, t, this.dma_channel, (i) => {
      n(
        "dma block transfer " + (i ? "unsuccessful" : "successful"),
        q
      ), i || (this.dma_to_dac(e), this.dma_bytes_left -= t, this.dma_bytes_left || (this.raise_irq(this.dma_irq), this.dma_autoinit && (this.dma_bytes_left = this.dma_bytes_count)));
    });
  }, R.prototype.dma_to_dac = function(t) {
    for (var e = this.dsp_16bit ? 32767.5 : 127.5, i = this.dsp_signed ? 0 : -1, s = this.dsp_stereo ? 1 : 2, r = this.dsp_16bit ? this.dsp_signed ? this.dma_buffer_int16 : this.dma_buffer_uint16 : this.dsp_signed ? this.dma_buffer_int8 : this.dma_buffer_uint8, _ = 0, o = 0; o < t; o++)
      for (var a = Cs(r[o], e, i), d = 0; d < s; d++)
        this.dac_buffers[_].push(a), _ ^= 1;
    this.dac_send();
  }, R.prototype.dac_handle_request = function() {
    !this.dma_bytes_left || this.dma_paused ? this.dac_send() : this.dma_transfer_next();
  }, R.prototype.dac_send = function() {
    if (this.dac_buffers[0].length) {
      var t = this.dac_buffers[0].shift_block(this.dac_buffers[0].length), e = this.dac_buffers[1].shift_block(this.dac_buffers[1].length);
      this.bus.send("dac-send-data", [t, e], [t.buffer, e.buffer]);
    }
  }, R.prototype.raise_irq = function(t) {
    n("raise irq", q), this.irq_triggered[t] = 1, this.cpu.device_raise_irq(this.irq);
  }, R.prototype.lower_irq = function(t) {
    n("lower irq", q), this.irq_triggered[t] = 0, this.cpu.device_lower_irq(this.irq);
  };
  function Cs(t, e, i) {
    return Qn(t / e + i, -1, 1);
  }
  function Qn(t, e, i) {
    return (t < e) * e + (t > i) * i + (e <= t && t <= i) * t;
  }
  const Ge = 6900, Ds = 9, qs = 16, Zn = 1, Jn = 2, $n = 3, to = 4, eo = 5, io = 1, so = 2, ve = 4, Ms = 8, fi = 64, ro = 128, Ls = 1, no = 2, Us = 28, Ps = 29, zs = 32, te = 16, Ns = 2, mi = 8, oo = 65535, _o = 1, ho = 2, ao = 4, co = 1;
  function dt(t, e) {
    this.cpu = t, this.pci = t.devices.pci, this.device_id = e.device_id, this.pci_space = [
      Ge & 255,
      Ge >> 8,
      e.device_id & 255,
      e.device_id >> 8,
      7,
      5,
      16,
      0,
      1,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      1,
      168,
      0,
      0,
      0,
      16,
      191,
      254,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      Ge & 255,
      Ge >> 8,
      e.subsystem_device_id & 255,
      e.subsystem_device_id >> 8,
      0,
      0,
      0,
      0,
      64,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0
    ], this.pci_space = this.pci_space.concat(
      l.zeros(256 - this.pci_space.length)
    ), this.pci_id = e.pci_id, this.pci_bars = [], this.name = e.name, this.driver_feature_select = this.device_feature_select = 0, this.device_feature = new Uint32Array(4), this.driver_feature = new Uint32Array(4);
    for (var i of e.common.features)
      0 <= i, "" + this.name, 128 > i, "" + this.name, this.device_feature[i >>> 5] |= 1 << (i & 31), this.driver_feature[i >>> 5] |= 1 << (i & 31);
    e.common.features.includes(zs), "" + this.name, this.features_ok = !0, this.device_status = 0, this.config_has_changed = !1, this.config_generation = 0, this.queues = [];
    for (var s of e.common.queues)
      this.queues.push(new Q(t, this, s));
    this.queue_select = 0, this.queue_selected = this.queues[0], this.isr_status = 0;
    var r;
    r = [], r.push(this.create_common_capability(e.common)), r.push(this.create_notification_capability(e.notification)), r.push(this.create_isr_capability(e.isr_status)), e.device_specific && r.push(this.create_device_specific_capability(e.device_specific)), this.init_capabilities(r), t.devices.pci.register_device(this), this.reset();
  }
  dt.prototype.create_common_capability = function(t) {
    return {
      type: Zn,
      bar: 0,
      port: t.initial_port,
      use_mmio: !1,
      offset: 0,
      extra: new Uint8Array(0),
      struct: [
        {
          bytes: 4,
          name: "device_feature_select",
          read: () => this.device_feature_select,
          write: (e) => {
            this.device_feature_select = e;
          }
        },
        {
          bytes: 4,
          name: "device_feature",
          read: () => this.device_feature[this.device_feature_select] || 0,
          write: (e) => {
          }
        },
        {
          bytes: 4,
          name: "driver_feature_select",
          read: () => this.driver_feature_select,
          write: (e) => {
            this.driver_feature_select = e;
          }
        },
        {
          bytes: 4,
          name: "driver_feature",
          read: () => this.driver_feature[this.driver_feature_select] || 0,
          write: (e) => {
            const i = this.device_feature[this.driver_feature_select];
            this.driver_feature_select < this.driver_feature.length && (this.driver_feature[this.driver_feature_select] = e & i), this.features_ok = this.features_ok && !(e & ~i);
          }
        },
        {
          bytes: 2,
          name: "msix_config",
          read: () => (n("No msi-x capability supported.", j), 65535),
          write: (e) => {
            n("No msi-x capability supported.", j);
          }
        },
        {
          bytes: 2,
          name: "num_queues",
          read: () => this.queues.length,
          write: (e) => {
          }
        },
        {
          bytes: 1,
          name: "device_status",
          read: () => this.device_status,
          write: (e) => {
            e === 0 ? (n(
              "Reset device<" + this.name + ">",
              j
            ), this.reset()) : e & ro ? n(
              "Warning: Device<" + this.name + "> status failed",
              j
            ) : n(
              "Device<" + this.name + "> status: " + (e & io ? "ACKNOWLEDGE " : "") + (e & so ? "DRIVER " : "") + (e & ve ? "DRIVER_OK" : "") + (e & Ms ? "FEATURES_OK " : "") + (e & fi ? "DEVICE_NEEDS_RESET" : ""),
              j
            ), e & ~this.device_status & ve && this.device_status & fi && this.notify_config_changes(), this.features_ok || (e &= ~Ms), this.device_status = e, e & ~this.device_status & ve && t.on_driver_ok();
          }
        },
        {
          bytes: 1,
          name: "config_generation",
          read: () => this.config_generation,
          write: (e) => {
          }
        },
        {
          bytes: 2,
          name: "queue_select",
          read: () => this.queue_select,
          write: (e) => {
            this.queue_select = e, this.queue_selected = this.queue_select < this.queues.length ? this.queues[this.queue_select] : null;
          }
        },
        {
          bytes: 2,
          name: "queue_size",
          read: () => this.queue_selected ? this.queue_selected.size : 0,
          write: (e) => {
            this.queue_selected && (e & e - 1 && (n(
              "Warning: dev<" + this.name + "> Given queue size was not a power of 2. Rounding up to next power of 2.",
              j
            ), e = 1 << l.int_log2(e - 1) + 1), e > this.queue_selected.size_supported && (n(
              "Warning: dev<" + this.name + "> Trying to set queue size greater than supported. Clamping to supported size.",
              j
            ), e = this.queue_selected.size_supported), this.queue_selected.set_size(e));
          }
        },
        {
          bytes: 2,
          name: "queue_msix_vector",
          read: () => (n("No msi-x capability supported.", j), 65535),
          write: (e) => {
            n("No msi-x capability supported.", j);
          }
        },
        {
          bytes: 2,
          name: "queue_enable",
          read: () => this.queue_selected ? this.queue_selected.enabled | 0 : 0,
          write: (e) => {
            this.queue_selected && (e === 1 ? this.queue_selected.is_configured() ? this.queue_selected.enable() : n(
              "Driver bug: tried enabling unconfigured queue",
              j
            ) : e === 0 && n(
              "Driver bug: tried writing 0 to queue_enable",
              j
            ));
          }
        },
        {
          bytes: 2,
          name: "queue_notify_off",
          read: () => this.queue_selected ? this.queue_selected.notify_offset : 0,
          write: (e) => {
          }
        },
        {
          bytes: 4,
          name: "queue_desc (low dword)",
          read: () => this.queue_selected ? this.queue_selected.desc_addr : 0,
          write: (e) => {
            this.queue_selected && (this.queue_selected.desc_addr = e);
          }
        },
        {
          bytes: 4,
          name: "queue_desc (high dword)",
          read: () => 0,
          write: (e) => {
            n(
              "Warning: High dword of 64 bit queue_desc ignored",
              j
            );
          }
        },
        {
          bytes: 4,
          name: "queue_avail (low dword)",
          read: () => this.queue_selected ? this.queue_selected.avail_addr : 0,
          write: (e) => {
            this.queue_selected && (this.queue_selected.avail_addr = e);
          }
        },
        {
          bytes: 4,
          name: "queue_avail (high dword)",
          read: () => 0,
          write: (e) => {
            n(
              "Warning: High dword of 64 bit queue_avail ignored",
              j
            );
          }
        },
        {
          bytes: 4,
          name: "queue_used (low dword)",
          read: () => this.queue_selected ? this.queue_selected.used_addr : 0,
          write: (e) => {
            this.queue_selected && (this.queue_selected.used_addr = e);
          }
        },
        {
          bytes: 4,
          name: "queue_used (high dword)",
          read: () => 0,
          write: (e) => {
            n(
              "Warning: High dword of 64 bit queue_used ignored",
              j
            );
          }
        }
      ]
    };
  }, dt.prototype.create_notification_capability = function(t) {
    const e = [];
    let i;
    t.single_handler ? (t.handlers.length, "" + this.name, i = 0) : i = 2;
    for (const [s, r] of t.handlers.entries())
      e.push({
        bytes: 2,
        name: "notify" + s,
        read: () => 65535,
        write: r || ((_) => {
        })
      });
    return {
      type: Jn,
      bar: 1,
      port: t.initial_port,
      use_mmio: !1,
      offset: 0,
      extra: new Uint8Array([
        i & 255,
        i >> 8 & 255,
        i >> 16 & 255,
        i >> 24
      ]),
      struct: e
    };
  }, dt.prototype.create_isr_capability = function(t) {
    return {
      type: $n,
      bar: 2,
      port: t.initial_port,
      use_mmio: !1,
      offset: 0,
      extra: new Uint8Array(0),
      struct: [
        {
          bytes: 1,
          name: "isr_status",
          read: () => {
            const e = this.isr_status;
            return this.lower_irq(), e;
          },
          write: (e) => {
          }
        }
      ]
    };
  }, dt.prototype.create_device_specific_capability = function(t) {
    return ~t.offset & 3, "" + this.name, {
      type: to,
      bar: 3,
      port: t.initial_port,
      use_mmio: !1,
      offset: 0,
      extra: new Uint8Array(0),
      struct: t.struct
    };
  }, dt.prototype.init_capabilities = function(t) {
    let e = this.pci_space[52] = 64;
    var i = e;
    for (const r of t) {
      t = qs + r.extra.length, i = e, e = i + t, 256 >= e, "" + this.name, 0 <= r.bar && 6 > r.bar, "" + this.name;
      var s = r.struct.reduce((_, o) => _ + o.bytes, 0);
      s += r.offset, s = 16 > s ? 16 : 1 << l.int_log2(s - 1) + 1, r.port & s - 1, "" + this.name, this.pci_bars[r.bar] = { size: s }, this.pci_space[i] = Ds, this.pci_space[i + 1] = e, this.pci_space[i + 2] = t, this.pci_space[i + 3] = r.type, this.pci_space[i + 4] = r.bar, this.pci_space[i + 5] = 0, this.pci_space[i + 6] = 0, this.pci_space[i + 7] = 0, this.pci_space[i + 8] = r.offset & 255, this.pci_space[i + 9] = r.offset >>> 8 & 255, this.pci_space[i + 10] = r.offset >>> 16 & 255, this.pci_space[i + 11] = r.offset >>> 24, this.pci_space[i + 12] = s & 255, this.pci_space[i + 13] = s >>> 8 & 255, this.pci_space[i + 14] = s >>> 16 & 255, this.pci_space[i + 15] = s >>> 24;
      for (const [_, o] of r.extra.entries())
        this.pci_space[i + 16 + _] = o;
      i = 16 + 4 * r.bar, this.pci_space[i] = r.port & 254 | !r.use_mmio, this.pci_space[i + 1] = r.port >>> 8 & 255, this.pci_space[i + 2] = r.port >>> 16 & 255, this.pci_space[i + 3] = r.port >>> 24 & 255, i = r.port + r.offset;
      for (const _ of r.struct) {
        let o = _.read;
        if (t = _.write, r.use_mmio)
          "" + this.name;
        else {
          s = function(d) {
            return n(
              "Warning: 8-bit read from 16-bit virtio port",
              j
            ), o(d & -2) >> ((d & 1) << 3) & 255;
          };
          const a = function(d) {
            return n(
              "Warning: 8-bit read from 32-bit virtio port",
              j
            ), o(d & -4) >> ((d & 3) << 3) & 255;
          };
          switch (_.bytes) {
            case 4:
              this.cpu.io.register_read(i, this, a, void 0, o), this.cpu.io.register_write(
                i,
                this,
                void 0,
                void 0,
                t
              );
              break;
            case 2:
              this.cpu.io.register_read(i, this, s, o), this.cpu.io.register_write(i, this, void 0, t);
              break;
            case 1:
              this.cpu.io.register_read(i, this, o), this.cpu.io.register_write(i, this, t);
              break;
            default:
              "" + this.name + _.bytes;
          }
        }
        i += _.bytes;
      }
    }
    i = qs + 4, 256 >= e + i, "" + this.name, this.pci_space[e] = Ds, this.pci_space[e + 1] = 0, this.pci_space[e + 2] = i, this.pci_space[e + 3] = eo, this.pci_space[e + 4] = 0, this.pci_space[e + 5] = 0, this.pci_space[e + 6] = 0, this.pci_space[e + 7] = 0, this.pci_space[e + 8] = 0, this.pci_space[e + 9] = 0, this.pci_space[e + 10] = 0, this.pci_space[e + 11] = 0, this.pci_space[e + 12] = 0, this.pci_space[e + 13] = 0, this.pci_space[e + 14] = 0, this.pci_space[e + 15] = 0, this.pci_space[e + 16] = 0, this.pci_space[e + 17] = 0, this.pci_space[e + 18] = 0, this.pci_space[e + 19] = 0;
  }, dt.prototype.get_state = function() {
    let t = [];
    return t[0] = this.device_feature_select, t[1] = this.driver_feature_select, t[2] = this.device_feature, t[3] = this.driver_feature, t[4] = this.features_ok, t[5] = this.device_status, t[6] = this.config_has_changed, t[7] = this.config_generation, t[8] = this.isr_status, t[9] = this.queue_select, t = t.concat(this.queues);
  }, dt.prototype.set_state = function(t) {
    this.device_feature_select = t[0], this.driver_feature_select = t[1], this.device_feature = t[2], this.driver_feature = t[3], this.features_ok = t[4], this.device_status = t[5], this.config_has_changed = t[6], this.config_generation = t[7], this.isr_status = t[8], this.queue_select = t[9];
    let e = 0;
    for (let i of t.slice(10))
      this.queues[e].set_state(i), e++;
    this.queue_selected = this.queues[this.queue_select] || null;
  }, dt.prototype.reset = function() {
    this.driver_feature_select = this.device_feature_select = 0, this.driver_feature.set(this.device_feature), this.features_ok = !0, this.queue_select = this.device_status = 0, this.queue_selected = this.queues[0];
    for (const t of this.queues)
      t.reset();
    this.config_has_changed = !1, this.config_generation = 0, this.lower_irq();
  }, dt.prototype.notify_config_changes = function() {
    this.config_has_changed = !0, this.device_status & ve ? this.raise_irq(no) : ("" + this.name, void 0);
  }, dt.prototype.update_config_generation = function() {
    this.config_has_changed && (this.config_generation++, this.config_generation &= 255, this.config_has_changed = !1);
  }, dt.prototype.is_feature_negotiated = function(t) {
    return 0 < (this.driver_feature[t >>> 5] & 1 << (t & 31));
  }, dt.prototype.needs_reset = function() {
    n(
      "Device<" + this.name + "> experienced error - requires reset",
      j
    ), this.device_status |= fi, this.device_status & ve && this.notify_config_changes();
  }, dt.prototype.raise_irq = function(t) {
    n("Raise irq " + h(t), j), this.isr_status |= t, this.pci.raise_irq(this.pci_id);
  }, dt.prototype.lower_irq = function() {
    n("Lower irq ", j), this.isr_status = 0, this.pci.lower_irq(this.pci_id);
  };
  function Q(t, e, i) {
    this.cpu = t, this.virtio = e, this.size_supported = this.size = i.size_supported, this.mask = this.size - 1, this.enabled = !1, this.notify_offset = i.notify_offset, this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0, this.reset();
  }
  Q.prototype.get_state = function() {
    const t = [];
    return t[0] = this.size, t[1] = this.size_supported, t[2] = this.enabled, t[3] = this.notify_offset, t[4] = this.desc_addr, t[5] = this.avail_addr, t[6] = this.avail_last_idx, t[7] = this.used_addr, t[8] = this.num_staged_replies, t;
  }, Q.prototype.set_state = function(t) {
    this.size = t[0], this.size_supported = t[1], this.enabled = t[2], this.notify_offset = t[3], this.desc_addr = t[4], this.avail_addr = t[5], this.avail_last_idx = t[6], this.used_addr = t[7], this.num_staged_replies = t[8], this.mask = this.size - 1;
  }, Q.prototype.reset = function() {
    this.enabled = !1, this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0, this.set_size(this.size_supported);
  }, Q.prototype.is_configured = function() {
    return this.desc_addr && this.avail_addr && this.used_addr;
  }, Q.prototype.enable = function() {
    this.is_configured(), this.enabled = !0;
  }, Q.prototype.set_size = function(t) {
    t <= this.size_supported, this.size = t, this.mask = t - 1;
  }, Q.prototype.count_requests = function() {
    return this.avail_addr, this.avail_get_idx() - this.avail_last_idx & this.mask;
  }, Q.prototype.has_request = function() {
    return this.avail_addr, (this.avail_get_idx() & this.mask) !== this.avail_last_idx;
  }, Q.prototype.pop_request = function() {
    this.avail_addr, this.has_request();
    var t = this.avail_get_entry(this.avail_last_idx);
    return n(
      "Pop request: avail_last_idx=" + this.avail_last_idx + " desc_idx=" + t,
      j
    ), t = new gi(this, t), this.avail_last_idx = this.avail_last_idx + 1 & this.mask, t;
  }, Q.prototype.push_reply = function(t) {
    this.used_addr, this.num_staged_replies < this.size;
    const e = this.used_get_idx() + this.num_staged_replies & this.mask;
    n(
      "Push reply: used_idx=" + e + " desc_idx=" + t.head_idx,
      j
    ), this.used_set_entry(e, t.head_idx, t.length_written), this.num_staged_replies++;
  }, Q.prototype.flush_replies = function() {
    if (this.used_addr, this.num_staged_replies === 0)
      n("flush_replies: Nothing to flush", j);
    else {
      n(
        "Flushing " + this.num_staged_replies + " replies",
        j
      );
      var t = this.used_get_idx() + this.num_staged_replies & oo;
      this.used_set_idx(t), this.num_staged_replies = 0, this.virtio.is_feature_negotiated(Ps) ? (this.avail_get_used_event(), this.virtio.raise_irq(Ls)) : ~this.avail_get_flags() & co && this.virtio.raise_irq(Ls);
    }
  }, Q.prototype.notify_me_after = function(t) {
    t = this.avail_get_idx() + t & 65535, this.used_set_avail_event(t);
  }, Q.prototype.get_descriptor = function(t, e) {
    return {
      addr_low: this.cpu.read32s(t + e * te),
      addr_high: this.cpu.read32s(t + e * te + 4),
      len: this.cpu.read32s(t + e * te + 8),
      flags: this.cpu.read16(t + e * te + 12),
      next: this.cpu.read16(t + e * te + 14)
    };
  }, Q.prototype.avail_get_flags = function() {
    return this.cpu.read16(this.avail_addr);
  }, Q.prototype.avail_get_idx = function() {
    return this.cpu.read16(this.avail_addr + 2);
  }, Q.prototype.avail_get_entry = function(t) {
    return this.cpu.read16(this.avail_addr + 4 + Ns * t);
  }, Q.prototype.avail_get_used_event = function() {
    return this.cpu.read16(
      this.avail_addr + 4 + Ns * this.size
    );
  }, Q.prototype.used_get_flags = function() {
    return this.cpu.read16(this.used_addr);
  }, Q.prototype.used_set_flags = function(t) {
    this.cpu.write16(this.used_addr, t);
  }, Q.prototype.used_get_idx = function() {
    return this.cpu.read16(this.used_addr + 2);
  }, Q.prototype.used_set_idx = function(t) {
    this.cpu.write16(this.used_addr + 2, t);
  }, Q.prototype.used_set_entry = function(t, e, i) {
    this.cpu.write32(this.used_addr + 4 + mi * t, e), this.cpu.write32(this.used_addr + 8 + mi * t, i);
  }, Q.prototype.used_set_avail_event = function(t) {
    this.cpu.write16(
      this.used_addr + 4 + mi * this.size,
      t
    );
  };
  function gi(t, e) {
    this.cpu = t.cpu, this.virtio = t.virtio, this.head_idx = e, this.read_buffers = [], this.length_readable = this.read_buffer_offset = this.read_buffer_idx = 0, this.write_buffers = [], this.length_writable = this.length_written = this.write_buffer_offset = this.write_buffer_idx = 0;
    let i = t.desc_addr, s = 0, r = t.size, _ = !1;
    const o = this.virtio.is_feature_negotiated(Us);
    n("<<< Descriptor chain start", j);
    do {
      const a = t.get_descriptor(i, e);
      if (n(
        "descriptor: idx=" + e + " addr=" + h(a.addr_high, 8) + ":" + h(a.addr_low, 8) + " len=" + h(a.len, 8) + " flags=" + h(a.flags, 4) + " next=" + h(a.next, 4),
        j
      ), o && a.flags & ao)
        i = a.addr_low, s = e = 0, r = a.len / te, n("start indirect", j);
      else {
        if (a.flags & ho)
          _ = !0, this.write_buffers.push(a), this.length_writable += a.len;
        else {
          if (_) {
            n(
              "Driver bug: readonly buffer after writeonly buffer within chain",
              j
            );
            break;
          }
          this.read_buffers.push(a), this.length_readable += a.len;
        }
        if (s++, s > r) {
          n(
            "Driver bug: descriptor chain cycle detected",
            j
          );
          break;
        }
        if (a.flags & _o)
          e = a.next;
        else
          break;
      }
    } while (1);
    n("Descriptor chain end >>>", j);
  }
  gi.prototype.get_next_blob = function(t) {
    let e = 0, i = t.length;
    for (; i; ) {
      if (this.read_buffer_idx === this.read_buffers.length) {
        n(
          "Device<" + this.virtio.name + "> Read more than device-readable buffers has",
          j
        );
        break;
      }
      var s = this.read_buffers[this.read_buffer_idx];
      const r = s.addr_low + this.read_buffer_offset;
      s = s.len - this.read_buffer_offset, s > i ? (s = i, this.read_buffer_offset += i) : (this.read_buffer_idx++, this.read_buffer_offset = 0), t.set(this.cpu.read_blob(r, s), e), e += s, i -= s;
    }
    return e;
  }, gi.prototype.set_next_blob = function(t) {
    let e = 0, i = t.length;
    for (; i; ) {
      if (this.write_buffer_idx === this.write_buffers.length) {
        n(
          "Device<" + this.virtio.name + "> Write more than device-writable capacity",
          j
        );
        break;
      }
      var s = this.write_buffers[this.write_buffer_idx];
      const r = s.addr_low + this.write_buffer_offset;
      s = s.len - this.write_buffer_offset, s > i ? (s = i, this.write_buffer_offset += i) : (this.write_buffer_idx++, this.write_buffer_offset = 0), this.cpu.write_blob(t.subarray(e, e + s), r), e += s, i -= s;
    }
    return this.length_written += e, e;
  };
  var Fs = {};
  function ee() {
    this.listeners = {}, this.pair = void 0;
  }
  ee.prototype.register = function(t, e, i) {
    var s = this.listeners[t];
    s === void 0 && (s = this.listeners[t] = []), s.push({ fn: e, this_value: i });
  }, ee.prototype.unregister = function(t, e) {
    var i = this.listeners[t];
    i !== void 0 && (this.listeners[t] = i.filter(function(s) {
      return s.fn !== e;
    }));
  }, ee.prototype.send = function(t, e, i) {
    if (this.pair && (t = this.pair.listeners[t], t !== void 0))
      for (i = 0; i < t.length; i++) {
        var s = t[i];
        s.fn.call(s.this_value, e);
      }
  }, ee.prototype.send_async = function(t, e) {
    setTimeout(this.send.bind(this, t, e), 0);
  }, Fs.create = function() {
    var t = new ee(), e = new ee();
    return t.pair = e, e.pair = t, [t, e];
  };
  var n = function() {
    return function() {
    };
  }();
  function u_(t, e, i) {
  }
  function U(t, e, i) {
    this.next_tick_immediately = i, this.wm = e, this.wasm_patch(), this.create_jit_imports(), this.wasm_memory = e = this.wm.exports.memory, this.memory_size = l.view(Uint32Array, e, 812, 1), this.mem8 = new Uint8Array(0), this.mem32s = new Int32Array(this.mem8.buffer), this.segment_is_null = l.view(Uint8Array, e, 724, 8), this.segment_offsets = l.view(Int32Array, e, 736, 8), this.segment_limits = l.view(Uint32Array, e, 768, 8), this.protected_mode = l.view(Int32Array, e, 800, 1), this.idtr_size = l.view(Int32Array, e, 564, 1), this.idtr_offset = l.view(Int32Array, e, 568, 1), this.gdtr_size = l.view(Int32Array, e, 572, 1), this.gdtr_offset = l.view(Int32Array, e, 576, 1), this.tss_size_32 = l.view(Int32Array, e, 1128, 1), this.page_fault = l.view(Uint32Array, e, 540, 8), this.cr = l.view(Int32Array, e, 580, 8), this.cpl = l.view(Uint8Array, e, 612, 1), this.is_32 = l.view(Int32Array, e, 804, 1), this.stack_size_32 = l.view(Int32Array, e, 808, 1), this.in_hlt = l.view(Uint8Array, e, 616, 1), this.last_virt_eip = l.view(Int32Array, e, 620, 1), this.eip_phys = l.view(Int32Array, e, 624, 1), this.sysenter_cs = l.view(Int32Array, e, 636, 1), this.sysenter_esp = l.view(Int32Array, e, 640, 1), this.sysenter_eip = l.view(Int32Array, e, 644, 1), this.prefixes = l.view(Int32Array, e, 648, 1), this.flags = l.view(Int32Array, e, 120, 1), this.flags_changed = l.view(Int32Array, e, 100, 1), this.last_op_size = l.view(Int32Array, e, 96, 1), this.last_op1 = l.view(Int32Array, e, 104, 1), this.last_result = l.view(Int32Array, e, 112, 1), this.current_tsc = l.view(Uint32Array, e, 960, 2), this.devices = {}, this.instruction_pointer = l.view(Int32Array, e, 556, 1), this.previous_ip = l.view(Int32Array, e, 560, 1), this.apic_enabled = l.view(Uint8Array, e, 548, 1), this.acpi_enabled = l.view(Uint8Array, e, 552, 1), this.memory_map_read8 = [], this.memory_map_write8 = [], this.memory_map_read32 = [], this.memory_map_write32 = [], this.bios = { main: null, vga: null }, this.instruction_counter = l.view(Uint32Array, e, 664, 1), this.reg32 = l.view(Int32Array, e, 64, 8), this.fpu_st = l.view(Int32Array, e, 1152, 32), this.fpu_stack_empty = l.view(Uint8Array, e, 816, 1), this.fpu_stack_empty[0] = 255, this.fpu_stack_ptr = l.view(Uint8Array, e, 1032, 1), this.fpu_stack_ptr[0] = 0, this.fpu_control_word = l.view(Uint16Array, e, 1036, 1), this.fpu_control_word[0] = 895, this.fpu_status_word = l.view(Uint16Array, e, 1040, 1), this.fpu_status_word[0] = 0, this.fpu_ip = l.view(Int32Array, e, 1048, 1), this.fpu_ip[0] = 0, this.fpu_ip_selector = l.view(Int32Array, e, 1052, 1), this.fpu_ip_selector[0] = 0, this.fpu_opcode = l.view(Int32Array, e, 1044, 1), this.fpu_opcode[0] = 0, this.fpu_dp = l.view(Int32Array, e, 1056, 1), this.fpu_dp[0] = 0, this.fpu_dp_selector = l.view(Int32Array, e, 1060, 1), this.fpu_dp_selector[0] = 0, this.reg_xmm32s = l.view(Int32Array, e, 832, 32), this.mxcsr = l.view(Int32Array, e, 824, 1), this.sreg = l.view(Uint16Array, e, 668, 8), this.dreg = l.view(Int32Array, e, 684, 8), this.reg_pdpte = l.view(Int32Array, e, 968, 8), this.svga_dirty_bitmap_min_offset = l.view(Uint32Array, e, 716, 1), this.svga_dirty_bitmap_max_offset = l.view(Uint32Array, e, 720, 1), this.fw_value = [], this.fw_pointer = 0, this.option_roms = [], this.io = void 0, this.bus = t, this.set_tsc(0, 0), this.debug_init();
  }
  U.prototype.clear_opstats = function() {
    new Uint8Array(this.wasm_memory.buffer, 32768, 131072).fill(0), this.wm.exports.profiler_init();
  }, U.prototype.create_jit_imports = function() {
    const t = /* @__PURE__ */ Object.create(null);
    t.m = this.wm.exports.memory;
    for (let e of Object.keys(this.wm.exports))
      e.startsWith("_") || e.startsWith("zstd") || e.endsWith("_js") || (t[e] = this.wm.exports[e]);
    this.jit_imports = t;
  }, U.prototype.wasm_patch = function() {
    const t = (i) => this.wm.exports[i], e = (i) => {
      const s = t(i);
      return console.assert(s, "Missing import: " + i), s;
    };
    this.reset_cpu = e("reset_cpu"), this.getiopl = e("getiopl"), this.get_eflags = e("get_eflags"), this.get_eflags_no_arith = e("get_eflags_no_arith"), this.pic_call_irq = e("pic_call_irq"), this.do_many_cycles_native = e("do_many_cycles_native"), this.do_many_cycles_native_nojit = e("do_many_cycles_native_nojit"), this.read8 = e("read8"), this.read16 = e("read16"), this.read32s = e("read32s"), this.write8 = e("write8"), this.write16 = e("write16"), this.write32 = e("write32"), this.in_mapped_range = e("in_mapped_range"), this.fpu_load_tag_word = e("fpu_load_tag_word"), this.fpu_load_status_word = e("fpu_load_status_word"), this.fpu_get_sti_f64 = e("fpu_get_sti_f64"), this.translate_address_system_read = e(
      "translate_address_system_read_js"
    ), this.get_seg_cs = e("get_seg_cs"), this.get_real_eip = e("get_real_eip"), this.clear_tlb = e("clear_tlb"), this.full_clear_tlb = e("full_clear_tlb"), this.update_state_flags = e("update_state_flags"), this.set_tsc = e("set_tsc"), this.store_current_tsc = e("store_current_tsc"), this.set_cpuid_level = e("set_cpuid_level"), this.jit_clear_cache = e("jit_clear_cache_js"), this.jit_dirty_cache = e("jit_dirty_cache"), this.codegen_finalize_finished = e("codegen_finalize_finished"), this.allocate_memory = e("allocate_memory"), this.zero_memory = e("zero_memory"), this.svga_allocate_memory = e("svga_allocate_memory"), this.svga_allocate_dest_buffer = e("svga_allocate_dest_buffer"), this.svga_fill_pixel_buffer = e("svga_fill_pixel_buffer"), this.svga_mark_dirty = e("svga_mark_dirty"), this.zstd_create_ctx = e("zstd_create_ctx"), this.zstd_get_src_ptr = e("zstd_get_src_ptr"), this.zstd_free_ctx = e("zstd_free_ctx"), this.zstd_read = e("zstd_read"), this.zstd_read_free = e("zstd_read_free");
  }, U.prototype.jit_force_generate = function(t) {
    this.jit_force_generate_unsafe ? this.jit_force_generate_unsafe(t) : void 0;
  }, U.prototype.jit_clear_func = function(t) {
    this.wm.wasm_table.set(t + Ie, null);
  }, U.prototype.jit_clear_all_funcs = function() {
    const t = this.wm.wasm_table;
    for (let e = 0; e < xi; e++)
      t.set(Ie + e, null);
  }, U.prototype.get_state = function() {
    var t = [];
    t[0] = this.memory_size[0], t[1] = this.segment_is_null, t[2] = this.segment_offsets, t[3] = this.segment_limits, t[4] = this.protected_mode[0], t[5] = this.idtr_offset[0], t[6] = this.idtr_size[0], t[7] = this.gdtr_offset[0], t[8] = this.gdtr_size[0], t[9] = this.page_fault[0], t[10] = this.cr, t[11] = this.cpl[0], t[13] = this.is_32[0], t[16] = this.stack_size_32[0], t[17] = this.in_hlt[0], t[18] = this.last_virt_eip[0], t[19] = this.eip_phys[0], t[22] = this.sysenter_cs[0], t[23] = this.sysenter_eip[0], t[24] = this.sysenter_esp[0], t[25] = this.prefixes[0], t[26] = this.flags[0], t[27] = this.flags_changed[0], t[28] = this.last_op1[0], t[30] = this.last_op_size[0], t[37] = this.instruction_pointer[0], t[38] = this.previous_ip[0], t[39] = this.reg32, t[40] = this.sreg, t[41] = this.dreg, t[42] = this.reg_pdpte, this.store_current_tsc(), t[43] = this.current_tsc, t[45] = this.devices.virtio_9p, t[46] = this.devices.apic, t[47] = this.devices.rtc, t[48] = this.devices.pci, t[49] = this.devices.dma, t[50] = this.devices.acpi, t[51] = this.devices.hpet, t[52] = this.devices.vga, t[53] = this.devices.ps2, t[54] = this.devices.uart0, t[55] = this.devices.fdc, t[56] = this.devices.cdrom, t[57] = this.devices.hda, t[58] = this.devices.pit, t[59] = this.devices.net, t[60] = this.devices.pic, t[61] = this.devices.sb16, t[62] = this.fw_value, t[63] = this.devices.ioapic, t[64] = this.tss_size_32[0], t[66] = this.reg_xmm32s, t[67] = this.fpu_st, t[68] = this.fpu_stack_empty[0], t[69] = this.fpu_stack_ptr[0], t[70] = this.fpu_control_word[0], t[71] = this.fpu_ip[0], t[72] = this.fpu_ip_selector[0], t[73] = this.fpu_dp[0], t[74] = this.fpu_dp_selector[0], t[75] = this.fpu_opcode[0];
    const { packed_memory: e, bitmap: i } = this.pack_memory();
    return t[77] = e, t[78] = new Uint8Array(i.get_buffer()), t[79] = this.devices.uart1, t[80] = this.devices.uart2, t[81] = this.devices.uart3, t;
  }, U.prototype.set_state = function(t) {
    this.memory_size[0] = t[0], this.mem8.length !== this.memory_size[0] && console.warn(
      "Note: Memory size mismatch. we=" + this.mem8.length + " state=" + this.memory_size[0]
    ), this.segment_is_null.set(t[1]), this.segment_offsets.set(t[2]), this.segment_limits.set(t[3]), this.protected_mode[0] = t[4], this.idtr_offset[0] = t[5], this.idtr_size[0] = t[6], this.gdtr_offset[0] = t[7], this.gdtr_size[0] = t[8], this.page_fault[0] = t[9], this.cr.set(t[10]), this.cpl[0] = t[11], this.is_32[0] = t[13], this.stack_size_32[0] = t[16], this.in_hlt[0] = t[17], this.last_virt_eip[0] = t[18], this.eip_phys[0] = t[19], this.sysenter_cs[0] = t[22], this.sysenter_eip[0] = t[23], this.sysenter_esp[0] = t[24], this.prefixes[0] = t[25], this.flags[0] = t[26], this.flags_changed[0] = t[27], this.last_op1[0] = t[28], this.last_op_size[0] = t[30], this.instruction_pointer[0] = t[37], this.previous_ip[0] = t[38], this.reg32.set(t[39]), this.sreg.set(t[40]), this.dreg.set(t[41]), t[42] && this.reg_pdpte.set(t[42]), this.set_tsc(t[43][0], t[43][1]), this.devices.virtio_9p && this.devices.virtio_9p.set_state(t[45]), this.devices.apic && this.devices.apic.set_state(t[46]), this.devices.rtc && this.devices.rtc.set_state(t[47]), this.devices.pci && this.devices.pci.set_state(t[48]), this.devices.dma && this.devices.dma.set_state(t[49]), this.devices.acpi && this.devices.acpi.set_state(t[50]), this.devices.hpet && this.devices.hpet.set_state(t[51]), this.devices.vga && this.devices.vga.set_state(t[52]), this.devices.ps2 && this.devices.ps2.set_state(t[53]), this.devices.uart0 && this.devices.uart0.set_state(t[54]), this.devices.fdc && this.devices.fdc.set_state(t[55]), this.devices.cdrom && this.devices.cdrom.set_state(t[56]), this.devices.hda && this.devices.hda.set_state(t[57]), this.devices.pit && this.devices.pit.set_state(t[58]), this.devices.net && this.devices.net.set_state(t[59]), this.devices.pic && this.devices.pic.set_state(t[60]), this.devices.sb16 && this.devices.sb16.set_state(t[61]), this.devices.uart1 && this.devices.uart1.set_state(t[79]), this.devices.uart2 && this.devices.uart2.set_state(t[80]), this.devices.uart3 && this.devices.uart3.set_state(t[81]), this.fw_value = t[62], this.devices.ioapic && this.devices.ioapic.set_state(t[63]), this.tss_size_32[0] = t[64], this.reg_xmm32s.set(t[66]), this.fpu_st.set(t[67]), this.fpu_stack_empty[0] = t[68], this.fpu_stack_ptr[0] = t[69], this.fpu_control_word[0] = t[70], this.fpu_ip[0] = t[71], this.fpu_ip_selector[0] = t[72], this.fpu_dp[0] = t[73], this.fpu_dp_selector[0] = t[74], this.fpu_opcode[0] = t[75];
    const e = new l.Bitmap(t[78].buffer);
    this.unpack_memory(e, t[77]), this.update_state_flags(), this.full_clear_tlb(), this.jit_clear_cache();
  }, U.prototype.pack_memory = function() {
    this.mem8.length & 4095;
    for (var t = this.mem8.length >> 12, e = [], i = 0; i < t; i++) {
      var s = i << 12;
      s = this.mem32s.subarray(s >> 2, s + 4096 >> 2);
      let r = !0;
      for (let _ = 0; _ < s.length; _++)
        if (s[_] !== 0) {
          r = !1;
          break;
        }
      r || e.push(i);
    }
    t = new l.Bitmap(t), i = new Uint8Array(e.length << 12);
    for (let [r, _] of e.entries())
      t.set(_, 1), e = _ << 12, e = this.mem8.subarray(e, e + 4096), i.set(e, r << 12);
    return { bitmap: t, packed_memory: i };
  }, U.prototype.unpack_memory = function(t, e) {
    this.zero_memory(this.memory_size[0]);
    const i = this.memory_size[0] >> 12;
    let s = 0;
    for (let _ = 0; _ < i; _++)
      if (t.get(_)) {
        var r = s << 12;
        r = e.subarray(r, r + 4096), this.mem8.set(r, _ << 12), s++;
      }
  }, U.prototype.main_run = function() {
    if (this.in_hlt[0]) {
      var t = this.hlt_loop();
      if (this.in_hlt[0])
        return t;
    }
    let e = t = W.microtick();
    for (; e - t < zr; ) {
      this.do_many_cycles(), e = W.microtick();
      const i = this.run_hardware_timers(e);
      if (this.handle_irqs(), this.in_hlt[0])
        return i;
    }
    return 0;
  }, U.prototype.reboot_internal = function() {
    this.reset_cpu(), this.fw_value = [], this.devices.virtio && this.devices.virtio.reset(), this.load_bios();
  }, U.prototype.reset_memory = function() {
    this.mem8.fill(0);
  }, U.prototype.create_memory = function(t) {
    1048576 > t ? t = 1048576 : 0 > (t | 0) && (t = Math.pow(2, 31) - Ee), t = (t - 1 | Ee - 1) + 1 | 0, console.assert(
      this.memory_size[0] === 0,
      "Expected uninitialised memory"
    ), this.memory_size[0] = t;
    const e = this.allocate_memory(t);
    this.mem8 = l.view(Uint8Array, this.wasm_memory, e, t), this.mem32s = l.view(Uint32Array, this.wasm_memory, e, t >> 2);
  }, X.exportProperty(
    U.prototype,
    "create_memory",
    U.prototype.create_memory
  ), U.prototype.init = function(t, e) {
    typeof t.log_level == "number" && t.log_level, this.create_memory(
      typeof t.memory_size == "number" ? t.memory_size : 67108864
    ), t.disable_jit && (this.do_many_cycles_native = this.do_many_cycles_native_nojit), t.cpuid_level && this.set_cpuid_level(t.cpuid_level), this.acpi_enabled[0] = +t.acpi, this.reset_cpu();
    var i = new et(this);
    if (this.io = i, this.bios.main = t.bios, this.bios.vga = t.vga_bios, this.load_bios(), t.bzimage) {
      const { option_rom: r } = Fo(
        this.mem8,
        t.bzimage,
        t.initrd,
        t.cmdline || ""
      );
      r && this.option_roms.push(r);
    }
    i.register_read(179, this, function() {
      return n("port 0xB3 read"), 0;
    });
    var s = 0;
    i.register_read(146, this, function() {
      return s;
    }), i.register_write(146, this, function(r) {
      s = r;
    }), i.register_read(1297, this, function() {
      return this.fw_pointer < this.fw_value.length ? this.fw_value[this.fw_pointer++] : 0;
    }), i.register_write(1296, this, void 0, function(r) {
      function _(d) {
        return new Uint8Array(new Int32Array([d]).buffer);
      }
      function o(d) {
        return d >> 8 | d << 8 & 65280;
      }
      function a(d) {
        return d << 24 | d << 8 & 16711680 | d >> 8 & 65280 | d >>> 24;
      }
      if (n("bios config port, index=" + h(r)), this.fw_pointer = 0, r === pr)
        this.fw_value = _(br);
      else if (r === lr)
        this.fw_value = _(0);
      else if (r === fr)
        this.fw_value = _(this.memory_size[0]);
      else if (r === mr)
        this.fw_value = _(1);
      else if (r === gr)
        this.fw_value = _(1);
      else if (r === yr)
        this.fw_value = new Uint8Array(16);
      else if (r === vr) {
        r = new Int32Array(4 + 64 * this.option_roms.length);
        const d = new Uint8Array(r.buffer);
        r[0] = a(this.option_roms.length);
        for (let c = 0; c < this.option_roms.length; c++) {
          const { name: u, data: p } = this.option_roms[c], g = 4 + 64 * c;
          r[g + 0 >> 2] = a(p.length), r[g + 4 >> 2] = o(_e + c), 56 > u.length;
          for (let f = 0; f < u.length; f++)
            d[g + 8 + f] = u.charCodeAt(f);
        }
        this.fw_value = d;
      } else
        r >= wr && r < _e ? this.fw_value = _(0) : r >= _e && r - _e < this.option_roms.length ? this.fw_value = this.option_roms[r - _e].data : (n("Warning: Unimplemented fw index: " + h(r)), this.fw_value = _(0));
    }), this.devices = {}, t.load_devices && (this.devices.pic = new It(this), this.devices.pci = new yt(this), this.acpi_enabled[0] && (this.devices.ioapic = new St(this), this.devices.apic = new nt(this), this.devices.acpi = new ue(this)), this.devices.rtc = new gt(this), this.fill_cmos(this.devices.rtc, t), this.devices.dma = new Y(this), this.devices.vga = new T(
      this,
      e,
      t.vga_memory_size || 8388608
    ), this.devices.ps2 = new ht(this, e), this.devices.uart0 = new vt(this, 1016, e), t.uart1 && (this.devices.uart1 = new vt(this, 760, e)), t.uart2 && (this.devices.uart2 = new vt(this, 1e3, e)), t.uart3 && (this.devices.uart3 = new vt(this, 744, e)), this.devices.fdc = new J(this, t.fda, t.fdb), i = 0, t.hda && (this.devices.hda = new _t(
      this,
      t.hda,
      t.hdb,
      !1,
      i++,
      e
    )), t.cdrom && (this.devices.cdrom = new _t(
      this,
      t.cdrom,
      void 0,
      !0,
      i++,
      e
    )), this.devices.pit = new Et(this, e), t.enable_ne2k && (this.devices.net = new ut(
      this,
      e,
      t.preserve_mac_from_state_image,
      t.mac_address_translation
    )), t.fs9p && (this.devices.virtio_9p = new At(t.fs9p, this, e)), this.devices.sb16 = new R(this, e)), t.multiboot && this.load_multiboot(t.multiboot);
  }, U.prototype.load_multiboot = function(t) {
    if (n("Trying multiboot from buffer of size " + t.byteLength, b), 8192 > t.byteLength) {
      var e = new Int32Array(2048);
      new Uint8Array(e.buffer).set(new Uint8Array(t));
    } else
      e = new Int32Array(t, 0, 2048);
    for (var i = 0; 8192 > i; i += 4)
      if (e[i >> 2] === 464367618) {
        var s = e[i + 4 >> 2];
        if (464367618 + s + e[i + 8 >> 2] | 0)
          n("Multiboot checksum check failed", b);
        else {
          n(
            "Multiboot magic found, flags: " + h(s >>> 0, 8),
            b
          ), this.reg32[dr] = 732803074, this.reg32[cr] = 31744, this.write32(31744, 0), this.cr[0] = 1, this.protected_mode[0] = 1, this.flags[0] = ar, this.is_32[0] = 1, this.stack_size_32[0] = 1;
          for (var r = 0; 6 > r; r++)
            this.segment_is_null[r] = 0, this.segment_offsets[r] = 0, this.segment_limits[r] = 4294967295, this.sreg[r] = 45058;
          if (s & 65536) {
            n(
              "Multiboot specifies its own address table",
              b
            ), r = e[i + 12 >> 2];
            var _ = e[i + 16 >> 2];
            s = e[i + 20 >> 2];
            var o = e[i + 24 >> 2];
            e = e[i + 28 >> 2], n(
              "header=" + h(r, 8) + " load=" + h(_, 8) + " load_end=" + h(s, 8) + " bss_end=" + h(o, 8) + " entry=" + h(e, 8)
            ), i -= r - _, s === 0 ? s = void 0 : s -= _, t = new Uint8Array(t, i, s), this.write_blob(t, _), this.instruction_pointer[0] = this.get_seg_cs() + e | 0;
          } else if (e[0] === 1179403647) {
            n("Multiboot image is in elf format", b), i = lo(t), this.instruction_pointer[0] = this.get_seg_cs() + i.header.entry | 0;
            for (_ of i.program_headers)
              _.type !== 0 && (_.type === 1 ? (_.paddr, _.vaddr, _.filesz <= _.memsz, _.paddr + _.memsz < this.memory_size[0] ? _.filesz && (i = new Uint8Array(
                t,
                _.offset,
                _.filesz
              ), this.write_blob(i, _.paddr)) : n(
                "Warning: Skipped loading section, paddr=" + h(_.paddr) + " memsz=" + _.memsz,
                b
              )) : _.type !== 2 && _.type !== 3 && _.type !== 4 && _.type !== 6 && _.type !== 1685382480 && _.type !== 1685382481 && _.type !== 1685382483 && ("" + h(_.type), void 0));
          }
          this.io.register_write_consecutive(
            244,
            this,
            function(a) {
              throw console.log("Test exited with code " + h(a, 2)), "HALT";
            },
            function() {
            },
            function() {
            },
            function() {
            }
          );
          for (let a = 0; 15 >= a; a++) {
            let d = function(c) {
              n(
                "kvm-unit-test: Set irq " + h(a) + " to " + h(c, 2)
              ), c ? this.device_raise_irq(a) : this.device_lower_irq(a);
            };
            this.io.register_write(8192 + a, this, d, d, d);
          }
          this.update_state_flags(), n("Starting multiboot kernel at:", b), this.debug.dump_state(), this.debug.dump_regs();
          break;
        }
      }
  }, U.prototype.fill_cmos = function(t, e) {
    var i = e.boot_order || Wi;
    t.cmos_write(un, 1 | i >> 4 & 240), t.cmos_write(pn, i & 255), t.cmos_write(en, 128), t.cmos_write(sn, 2), i = 0, 1048576 <= this.memory_size[0] && (i = this.memory_size[0] - 1048576 >> 10, i = Math.min(i, 65535)), t.cmos_write(rn, i & 255), t.cmos_write(nn, i >> 8 & 255), t.cmos_write(_n, i & 255), t.cmos_write(hn, i >> 8 & 255), i = 0, 16777216 <= this.memory_size[0] && (i = this.memory_size[0] - 16777216 >> 16, i = Math.min(i, 65535)), t.cmos_write(dn, i & 255), t.cmos_write(cn, i >> 8 & 255), t.cmos_write(ln, 0), t.cmos_write(fn, 0), t.cmos_write(mn, 0), t.cmos_write(tn, 47), t.cmos_write(gn, 0), e.fastboot && t.cmos_write(63, 1);
  }, U.prototype.load_bios = function() {
    var t = this.bios.main, e = this.bios.vga;
    if (t) {
      var i = new Uint8Array(t);
      if (this.write_blob(i, 1048576 - t.byteLength), e) {
        var s = new Uint8Array(e);
        this.write_blob(s, 786432), this.io.mmap_register(
          4272947200,
          1048576,
          function(r) {
            return r = r - 4272947200 | 0, r < s.length ? s[r] : 0;
          },
          function(r, _) {
          }
        );
      } else
        n("Warning: No VGA BIOS");
      this.io.mmap_register(
        4293918720,
        1048576,
        (function(r) {
          return this.mem8[r & 1048575];
        }).bind(this),
        (function(r, _) {
          this.mem8[r & 1048575] = _;
        }).bind(this)
      );
    } else
      n("Warning: No BIOS");
  }, U.prototype.do_many_cycles = function() {
    this.do_many_cycles_native();
  }, U.prototype.codegen_finalize = function(t, e, i, s, r) {
    s >>>= 0, r >>>= 0;
    const _ = new Uint8Array(this.wasm_memory.buffer, s, r);
    s = WebAssembly.instantiate(_, { e: this.jit_imports }).then((o) => {
      this.wm.wasm_table.set(t + Ie, o.instance.exports.f), this.codegen_finalize_finished(t, e, i), this.test_hook_did_finalize_wasm && this.test_hook_did_finalize_wasm(_);
    });
  }, U.prototype.log_uncompiled_code = function(t, e) {
  }, U.prototype.dump_function_code = function(t, e) {
  }, U.prototype.hlt_loop = function() {
    if (this.get_eflags_no_arith() & Ae) {
      const t = this.run_hardware_timers(W.microtick());
      return this.handle_irqs(), t;
    }
    return 100;
  }, U.prototype.run_hardware_timers = function(t) {
    var e, i, s;
    e = this.devices.pit.timer(t, !1), i = this.devices.rtc.timer(t, !1), s = 100;
    let r = 100, _ = 100;
    return this.acpi_enabled[0] && (r = this.devices.acpi.timer(t), _ = this.devices.apic.timer(t)), Math.min(e, i, s, r, _);
  }, U.prototype.hlt_op = function() {
    !(this.get_eflags_no_arith() & Ae) && this.bus.send("cpu-event-halt"), this.in_hlt[0] = 1, this.hlt_loop();
  }, U.prototype.handle_irqs = function() {
    this.get_eflags_no_arith() & Ae && (this.pic_acknowledge(), this.next_tick_immediately());
  }, U.prototype.pic_acknowledge = function() {
    this.get_eflags_no_arith() & Ae, this.devices.pic && this.devices.pic.acknowledge_irq(), this.devices.apic && this.devices.apic.acknowledge_irq();
  }, U.prototype.device_raise_irq = function(t) {
    this.devices.pic && this.devices.pic.set_irq(t), this.devices.ioapic && this.devices.ioapic.set_irq(t);
  }, U.prototype.device_lower_irq = function(t) {
    this.devices.pic && this.devices.pic.clear_irq(t), this.devices.ioapic && this.devices.ioapic.clear_irq(t);
  }, typeof window < "u" ? window.CPU = U : typeof module < "u" && typeof module.exports < "u" ? module.exports.CPU = U : typeof importScripts == "function" && (self.CPU = U), U.prototype.debug_init = function() {
    function t(d) {
    }
    function e() {
    }
    function i(d, c, u) {
    }
    var s = this, r = {};
    this.debug = r, r.init = function() {
    }, r.get_regs_short = e, r.dump_regs = function() {
    }, r.get_state = t, r.dump_state = function(d) {
    }, r.dump_stack = function(d, c) {
    }, r.dump_page_structures = function() {
      if (s.cr[4] & ur) {
        n("PAE enabled");
        for (var d = 0; 4 > d; d++)
          s.read32s(s.cr[3] + 8 * d);
      } else
        n("PAE disabled"), s.cr[3];
    }, r.dump_gdt_ldt = function() {
    }, r.dump_idt = function() {
    }, r.get_memory_dump = function(d, c) {
    }, r.memory_hex_dump = function(d, c) {
    }, r.used_memory_dump = function() {
    }, r.debug_interrupt = function(d) {
    };
    let _, o;
    r.dump_code = function(d, c, u) {
      if (!o) {
        if (_ === void 0 && (_ = typeof require == "function" ? require("./capstone-x86.min.js") : window.cs, _ === void 0)) {
          n(
            "Warning: Missing capstone library, disassembly not available"
          );
          return;
        }
        o = [
          new _.Capstone(_.ARCH_X86, _.MODE_16),
          new _.Capstone(_.ARCH_X86, _.MODE_32)
        ];
      }
      try {
        o[d].disasm(c, u).forEach(function(p) {
          n(
            h(p.address >>> 0) + ": " + l.pads(
              p.bytes.map((g) => h(g, 2).slice(-2)).join(" "),
              20
            ) + " " + p.mnemonic + " " + p.op_str
          );
        }), n("");
      } catch {
        n(
          "Could not disassemble: " + Array.from(c).map((g) => h(g, 2)).join(" ")
        );
      }
    };
    let a;
    r.dump_wasm = function(d) {
      if (a === void 0 && (a = typeof require == "function" ? require("./libwabt.js") : new window.WabtModule(), a === void 0)) {
        n("Warning: Missing libwabt, wasm dump not available");
        return;
      }
      d = d.slice();
      try {
        var c = a.readWasm(d, { readDebugNames: !1 });
        c.generateNames(), c.applyNames();
        const g = c.toText({ foldExprs: !0, inlineExport: !0 });
        n(g);
      } catch (g) {
        var u = new Blob([d]), p = document.createElement("a");
        p.download = "failed.wasm", p.href = window.URL.createObjectURL(u), p.dataset.downloadurl = [
          "application/octet-stream",
          p.download,
          p.href
        ].join(":"), p.click(), window.URL.revokeObjectURL(p.src), console.log(g.toString());
      } finally {
        c && c.destroy();
      }
    };
  };
  const uo = 1179403647;
  let ie = DataView.prototype, we = { size: 1, get: ie.getUint8, set: ie.setUint8 }, Pt = { size: 2, get: ie.getUint16, set: ie.setUint16 }, Z = { size: 4, get: ie.getUint32, set: ie.setUint32 }, po = function(t) {
    return { size: t, get: (e) => -1 };
  }, Bs = yi([
    { magic: Z },
    { class: we },
    { data: we },
    { version0: we },
    { osabi: we },
    { abiversion: we },
    { pad0: po(7) },
    { type: Pt },
    { machine: Pt },
    { version1: Z },
    { entry: Z },
    { phoff: Z },
    { shoff: Z },
    { flags: Z },
    { ehsize: Pt },
    { phentsize: Pt },
    { phnum: Pt },
    { shentsize: Pt },
    { shnum: Pt },
    { shstrndx: Pt }
  ]);
  console.assert(Bs.reduce((t, e) => t + e.size, 0) === 52);
  let Gs = yi([
    { type: Z },
    { offset: Z },
    { vaddr: Z },
    { paddr: Z },
    { filesz: Z },
    { memsz: Z },
    { flags: Z },
    { align: Z }
  ]);
  console.assert(Gs.reduce((t, e) => t + e.size, 0) === 32);
  let Ws = yi([
    { name: Z },
    { type: Z },
    { flags: Z },
    { addr: Z },
    { offset: Z },
    { size: Z },
    { link: Z },
    { info: Z },
    { addralign: Z },
    { entsize: Z }
  ]);
  console.assert(Ws.reduce((t, e) => t + e.size, 0) === 40);
  function yi(t) {
    return t.map(function(e) {
      var i = Object.keys(e);
      return console.assert(i.length === 1), i = i[0], e = e[i], console.assert(0 < e.size), { name: i, type: e, size: e.size, get: e.get, set: e.set };
    });
  }
  function lo(t) {
    t = new DataView(t);
    let [e, i] = Hs(t, Bs);
    console.assert(i === 52);
    var s;
    return console.assert(e.magic === uo, "Bad magic"), console.assert(e.class === 1, "Unimplemented: 64 bit elf"), console.assert(e.data === 1, "Unimplemented: big endian"), console.assert(e.version0 === 1, "Bad version0"), console.assert(e.type === 2, "Unimplemented type"), console.assert(e.version1 === 1, "Bad version1"), console.assert(e.ehsize === 52, "Bad header size"), console.assert(e.phentsize === 32, "Bad program header size"), console.assert(e.shentsize === 40, "Bad section header size"), [s] = Vs(
      vi(t, e.phoff, e.phentsize * e.phnum),
      Gs,
      e.phnum
    ), [t] = Vs(
      vi(t, e.shoff, e.shentsize * e.shnum),
      Ws,
      e.shnum
    ), { header: e, program_headers: s, sections_headers: t };
  }
  function Hs(t, e) {
    let i = {}, s = 0;
    for (let r of e)
      e = r.get.call(t, s, !0), console.assert(i[r.name] === void 0), i[r.name] = e, s += r.size;
    return [i, s];
  }
  function Vs(t, e, i) {
    let s = [], r = 0;
    for (var _ = 0; _ < i; _++) {
      let [o, a] = Hs(vi(t, r), e);
      s.push(o), r += a;
    }
    return [s, r];
  }
  function vi(t, e, i) {
    return new DataView(t.buffer, t.byteOffset + e, i);
  }
  const fo = 497, mo = 506, go = 510, js = 514, yo = 518, vo = 528, Xs = 529, wo = 532, bo = 536, ko = 540, Ao = 548, Eo = 552, Io = 556, xo = 560, Ro = 564, To = 565, So = 566, Oo = 568, Co = 584, Do = 588, Ks = 600, qo = 608, Mo = 43605, Lo = 1400005704, Uo = 255, Po = 32, zo = 64, No = 128;
  function Fo(t, e, i, s) {
    n("Trying to load kernel of size " + e.byteLength);
    var r = new Uint8Array(e);
    const _ = new Uint16Array(e), o = new Uint32Array(e);
    var a = r[fo] || 4, d = _[go >> 1];
    if (d !== Mo)
      n("Bad checksum1: " + h(d));
    else if (d = _[js >> 1] | _[js + 2 >> 1] << 16, d !== Lo)
      n("Bad checksum2: " + h(d));
    else {
      d = _[yo >> 1];
      var c = r[Xs], u = _[So >> 1], p = o[Io >> 2], g = o[xo >> 2], f = r[Ro], w = r[To], S = o[Oo >> 2], E = o[Co >> 2], H = o[Do >> 2], ot = o[Ks >> 2], mt = o[Ks + 4 >> 2], Ii = o[qo >> 2];
      for (n("kernel boot protocol version: " + h(d)), n("flags=" + h(c) + " xflags=" + h(u)), n("code32_start=" + h(o[wo >> 2])), n("initrd_addr_max=" + h(p)), n("kernel_alignment=" + h(g)), n("relocatable=" + f), n("min_alignment=" + h(w)), n("cmdline max=" + h(S)), n("payload offset=" + h(E) + " size=" + h(H)), n("pref_address=" + h(mt) + ":" + h(ot)), n("init_size=" + h(Ii)), r[vo] = Uo, r[Xs] = c & ~Po & ~zo | No, _[Ao >> 1] = 56832, _[mo >> 1] = 65535, n("heap_end_ptr=" + h(56832)), s += "\0", s.length < S, n("cmd_line_ptr=" + h(581632)), o[Eo >> 2] = 581632, r = 0; r < s.length; r++)
        t[581632 + r] = s.charCodeAt(r);
      return a = 512 * (a + 1), n("prot_mode_kernel_start=" + h(a)), s = new Uint8Array(e, 0, a), e = new Uint8Array(e, a), r = a = 0, i && (a = 67108864, r = i.byteLength, 1048576 + e.length < a, t.set(new Uint8Array(i), a)), o[bo >> 2] = a, o[ko >> 2] = r, 655360 > 524288 + s.length, t.set(s, 524288), t.set(e, 1048576), {
        option_rom: {
          name: "genroms/kernel.bin",
          data: Bo(32768, 57344)
        }
      };
    }
  }
  function Bo(t, e) {
    const i = new Uint8Array(256);
    new Uint16Array(i.buffer)[0] = 43605, i[2] = 1;
    var s = 3;
    for (i[s++] = 250, i[s++] = 184, i[s++] = t >> 0, i[s++] = t >> 8, i[s++] = 142, i[s++] = 192, i[s++] = 142, i[s++] = 216, i[s++] = 142, i[s++] = 224, i[s++] = 142, i[s++] = 232, i[s++] = 142, i[s++] = 208, i[s++] = 188, i[s++] = e >> 0, i[s++] = e >> 8, i[s++] = 234, i[s++] = 0, i[s++] = 0, i[s++] = t + 32 >> 0, i[s++] = t + 32 >> 8, t = s, e = i[t] = 0, s = 0; s < i.length; s++)
      e += i[s];
    return i[t] = -e, i;
  }
  var Ys = 42, Go = 128;
  function Wo(t) {
    function e(f) {
      return !f.altKey && a[56] && _(56, !1), r(f, !1);
    }
    function i(f) {
      return !f.altKey && a[56] && _(56, !1), r(f, !0);
    }
    function s(f) {
      f = Object.keys(a);
      for (var w, S = 0; S < f.length; S++)
        w = +f[S], a[w] && _(w, !1);
      a = {};
    }
    function r(f, w) {
      var S;
      if ((S = d.bus) && (S = f.shiftKey && f.ctrlKey && (f.keyCode === 73 || f.keyCode === 74 || f.keyCode === 75) || !d.emu_enabled ? !1 : f.target ? f.target.classList.contains("phone_keyboard") || f.target.nodeName !== "INPUT" && f.target.nodeName !== "TEXTAREA" : !0), S) {
        t: {
          if (f.code !== void 0 && (S = g[f.code], S !== void 0))
            break t;
          S = c[f.keyCode];
        }
        if (S)
          return _(S, w, f.repeat), f.preventDefault && f.preventDefault(), !1;
        console.log(
          "Missing char in map: keyCode=" + (f.keyCode || -1).toString(16) + " code=" + f.code
        );
      }
    }
    function _(f, w, S) {
      if (w)
        a[f] && !S && _(f, !1);
      else if (!a[f])
        return;
      (a[f] = w) || (f |= 128), 255 < f ? (o(f >> 8), o(f & 255)) : o(f);
    }
    function o(f) {
      d.bus.send("keyboard-code", f);
    }
    var a = {}, d = this;
    this.emu_enabled = !0;
    var c = new Uint16Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      14,
      15,
      0,
      0,
      0,
      28,
      0,
      0,
      42,
      29,
      56,
      0,
      58,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      57,
      57417,
      57425,
      57423,
      57415,
      57419,
      57416,
      57421,
      80,
      0,
      0,
      0,
      0,
      82,
      83,
      0,
      11,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      0,
      39,
      0,
      13,
      0,
      0,
      0,
      30,
      48,
      46,
      32,
      18,
      33,
      34,
      35,
      23,
      36,
      37,
      38,
      50,
      49,
      24,
      25,
      16,
      19,
      31,
      20,
      22,
      47,
      17,
      45,
      21,
      44,
      57435,
      57436,
      57437,
      0,
      0,
      82,
      79,
      80,
      81,
      75,
      76,
      77,
      71,
      72,
      73,
      0,
      0,
      0,
      0,
      0,
      0,
      59,
      60,
      61,
      62,
      63,
      64,
      65,
      66,
      67,
      68,
      87,
      88,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      69,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      12,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      39,
      13,
      51,
      12,
      52,
      53,
      41,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      26,
      43,
      27,
      40,
      0,
      57435,
      57400,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]), u = {
      8: 8,
      10: 13,
      32: 32,
      39: 222,
      44: 188,
      45: 189,
      46: 190,
      47: 191,
      48: 48,
      49: 49,
      50: 50,
      51: 51,
      52: 52,
      53: 53,
      54: 54,
      55: 55,
      56: 56,
      57: 57,
      59: 186,
      61: 187,
      91: 219,
      92: 220,
      93: 221,
      96: 192,
      97: 65,
      98: 66,
      99: 67,
      100: 68,
      101: 69,
      102: 70,
      103: 71,
      104: 72,
      105: 73,
      106: 74,
      107: 75,
      108: 76,
      109: 77,
      110: 78,
      111: 79,
      112: 80,
      113: 81,
      114: 82,
      115: 83,
      116: 84,
      117: 85,
      118: 86,
      119: 87,
      120: 88,
      121: 89,
      122: 90
    }, p = {
      33: 49,
      34: 222,
      35: 51,
      36: 52,
      37: 53,
      38: 55,
      40: 57,
      41: 48,
      42: 56,
      43: 187,
      58: 186,
      60: 188,
      62: 190,
      63: 191,
      64: 50,
      65: 65,
      66: 66,
      67: 67,
      68: 68,
      69: 69,
      70: 70,
      71: 71,
      72: 72,
      73: 73,
      74: 74,
      75: 75,
      76: 76,
      77: 77,
      78: 78,
      79: 79,
      80: 80,
      81: 81,
      82: 82,
      83: 83,
      84: 84,
      85: 85,
      86: 86,
      87: 87,
      88: 88,
      89: 89,
      90: 90,
      94: 54,
      95: 189,
      123: 219,
      124: 220,
      125: 221,
      126: 192
    }, g = {
      Escape: 1,
      Digit1: 2,
      Digit2: 3,
      Digit3: 4,
      Digit4: 5,
      Digit5: 6,
      Digit6: 7,
      Digit7: 8,
      Digit8: 9,
      Digit9: 10,
      Digit0: 11,
      Minus: 12,
      Equal: 13,
      Backspace: 14,
      Tab: 15,
      KeyQ: 16,
      KeyW: 17,
      KeyE: 18,
      KeyR: 19,
      KeyT: 20,
      KeyY: 21,
      KeyU: 22,
      KeyI: 23,
      KeyO: 24,
      KeyP: 25,
      BracketLeft: 26,
      BracketRight: 27,
      Enter: 28,
      ControlLeft: 29,
      KeyA: 30,
      KeyS: 31,
      KeyD: 32,
      KeyF: 33,
      KeyG: 34,
      KeyH: 35,
      KeyJ: 36,
      KeyK: 37,
      KeyL: 38,
      Semicolon: 39,
      Quote: 40,
      Backquote: 41,
      ShiftLeft: 42,
      Backslash: 43,
      KeyZ: 44,
      KeyX: 45,
      KeyC: 46,
      KeyV: 47,
      KeyB: 48,
      KeyN: 49,
      KeyM: 50,
      Comma: 51,
      Period: 52,
      Slash: 53,
      IntlRo: 53,
      ShiftRight: 54,
      NumpadMultiply: 55,
      AltLeft: 56,
      Space: 57,
      CapsLock: 58,
      F1: 59,
      F2: 60,
      F3: 61,
      F4: 62,
      F5: 63,
      F6: 64,
      F7: 65,
      F8: 66,
      F9: 67,
      F10: 68,
      NumLock: 69,
      ScrollLock: 70,
      Numpad7: 71,
      Numpad8: 72,
      Numpad9: 73,
      NumpadSubtract: 74,
      Numpad4: 75,
      Numpad5: 76,
      Numpad6: 77,
      NumpadAdd: 78,
      Numpad1: 79,
      Numpad2: 80,
      Numpad3: 81,
      Numpad0: 82,
      NumpadDecimal: 83,
      IntlBackslash: 86,
      F11: 87,
      F12: 88,
      NumpadEnter: 57372,
      ControlRight: 57373,
      NumpadDivide: 57397,
      AltRight: 57400,
      Home: 57415,
      ArrowUp: 57416,
      PageUp: 57417,
      ArrowLeft: 57419,
      ArrowRight: 57421,
      End: 57423,
      ArrowDown: 57424,
      PageDown: 57425,
      Insert: 57426,
      Delete: 57427,
      OSLeft: 57435,
      OSRight: 57436,
      ContextMenu: 57437
    };
    this.bus = t, this.destroy = function() {
      typeof window < "u" && (window.removeEventListener("keyup", e, !1), window.removeEventListener("keydown", i, !1), window.removeEventListener("blur", s, !1));
    }, this.init = function() {
      typeof window < "u" && (this.destroy(), window.addEventListener("keyup", e, !1), window.addEventListener("keydown", i, !1), window.addEventListener("blur", s, !1));
    }, this.init(), this.simulate_press = function(f) {
      f = { keyCode: f }, r(f, !0), r(f, !1);
    }, this.simulate_char = function(f) {
      var w = f.charCodeAt(0);
      w in u ? this.simulate_press(u[w]) : w in p ? (o(Ys), this.simulate_press(p[w]), o(Ys | Go)) : console.log("ascii -> keyCode not found: ", w, f);
    };
  }
  function Ho(t, e) {
    function i(E) {
      if (!S.enabled || !S.emu_enabled)
        return !1;
      var H = e || document.body, ot;
      if (!(ot = document.pointerLockElement))
        t: {
          for (E = E.target; E.parentNode; ) {
            if (E === H) {
              ot = !0;
              break t;
            }
            E = E.parentNode;
          }
          ot = !1;
        }
      return ot;
    }
    function s(E) {
      i(E) && (E = E.changedTouches) && E.length && (E = E[E.length - 1], f = E.clientX, w = E.clientY);
    }
    function r(E) {
      (u || g || p) && (S.bus.send("mouse-click", [!1, !1, !1]), u = g = p = !1);
    }
    function _(E) {
      if (S.bus && i(E) && S.is_running) {
        var H = 0, ot = 0, mt = E.changedTouches;
        mt ? mt.length && (mt = mt[mt.length - 1], H = mt.clientX - f, ot = mt.clientY - w, f = mt.clientX, w = mt.clientY, E.preventDefault()) : typeof E.movementX == "number" ? (H = E.movementX, ot = E.movementY) : typeof E.webkitMovementX == "number" ? (H = E.webkitMovementX, ot = E.webkitMovementY) : typeof E.mozMovementX == "number" ? (H = E.mozMovementX, ot = E.mozMovementY) : (H = E.clientX - f, ot = E.clientY - w, f = E.clientX, w = E.clientY), S.bus.send("mouse-delta", [0.15 * H, -(0.15 * ot)]), e && S.bus.send("mouse-absolute", [
          E.pageX - e.offsetLeft,
          E.pageY - e.offsetTop,
          e.offsetWidth,
          e.offsetHeight
        ]);
      }
    }
    function o(E) {
      i(E) && d(E, !0);
    }
    function a(E) {
      i(E) && d(E, !1);
    }
    function d(E, H) {
      S.bus && (E.which === 1 ? u = H : E.which === 2 ? g = H : E.which === 3 ? p = H : n("Unknown event.which: " + E.which), S.bus.send("mouse-click", [u, g, p]), E.preventDefault());
    }
    function c(E) {
      if (i(E)) {
        var H = E.wheelDelta || -E.detail;
        0 > H ? H = -1 : 0 < H && (H = 1), S.bus.send("mouse-wheel", [H, 0]), E.preventDefault();
      }
    }
    var u = !1, p = !1, g = !1, f = 0, w = 0, S = this;
    this.enabled = !1, this.emu_enabled = !0, this.bus = t, this.bus.register(
      "mouse-enable",
      function(E) {
        this.enabled = E;
      },
      this
    ), this.is_running = !1, this.bus.register(
      "emulator-stopped",
      function() {
        this.is_running = !1;
      },
      this
    ), this.bus.register(
      "emulator-started",
      function() {
        this.is_running = !0;
      },
      this
    ), this.destroy = function() {
      typeof window < "u" && (window.removeEventListener("touchstart", s, !1), window.removeEventListener("touchend", r, !1), window.removeEventListener("touchmove", _, !1), window.removeEventListener("mousemove", _, !1), window.removeEventListener("mousedown", o, !1), window.removeEventListener("mouseup", a, !1), window.removeEventListener("wheel", c, { passive: !1 }));
    }, this.init = function() {
      typeof window < "u" && (this.destroy(), window.addEventListener("touchstart", s, !1), window.addEventListener("touchend", r, !1), window.addEventListener("touchmove", _, !1), window.addEventListener("mousemove", _, !1), window.addEventListener("mousedown", o, !1), window.addEventListener("mouseup", a, !1), window.addEventListener("wheel", c, { passive: !1 }));
    }, this.init();
  }
  var Qs = 0.2, Vo = 8e3;
  function Zs(t) {
    if (typeof window < "u")
      if (window.AudioContext || window.webkitAudioContext) {
        var e = window.AudioWorklet ? wi : bi;
        this.bus = t, this.audio_context = window.AudioContext ? new AudioContext() : new webkitAudioContext(), this.mixer = new se(t, this.audio_context), this.pcspeaker = new Js(
          t,
          this.audio_context,
          this.mixer
        ), this.dac = new e(t, this.audio_context, this.mixer), this.pcspeaker.start(), t.register(
          "emulator-stopped",
          function() {
            this.audio_context.suspend();
          },
          this
        ), t.register(
          "emulator-started",
          function() {
            this.audio_context.resume();
          },
          this
        ), t.register(
          "speaker-confirm-initialized",
          function() {
            t.send("speaker-has-initialized");
          },
          this
        ), t.send("speaker-has-initialized");
      } else
        console.warn("Web browser doesn't support Web Audio API");
  }
  Zs.prototype.destroy = function() {
    this.audio_context && this.audio_context.close(), this.audio_context = null, this.dac && this.dac.node_processor && this.dac.node_processor.port.close(), this.dac = null;
  };
  function se(t, e) {
    function i(s) {
      return function(r) {
        s.gain.setValueAtTime(r, this.audio_context.currentTime);
      };
    }
    this.audio_context = e, this.sources = /* @__PURE__ */ new Map(), this.gain_right = this.gain_left = this.volume_right = this.volume_left = this.volume_both = 1, this.node_treble_left = this.audio_context.createBiquadFilter(), this.node_treble_right = this.audio_context.createBiquadFilter(), this.node_treble_left.type = "highshelf", this.node_treble_right.type = "highshelf", this.node_treble_left.frequency.setValueAtTime(
      2e3,
      this.audio_context.currentTime
    ), this.node_treble_right.frequency.setValueAtTime(
      2e3,
      this.audio_context.currentTime
    ), this.node_bass_left = this.audio_context.createBiquadFilter(), this.node_bass_right = this.audio_context.createBiquadFilter(), this.node_bass_left.type = "lowshelf", this.node_bass_right.type = "lowshelf", this.node_bass_left.frequency.setValueAtTime(
      200,
      this.audio_context.currentTime
    ), this.node_bass_right.frequency.setValueAtTime(
      200,
      this.audio_context.currentTime
    ), this.node_gain_left = this.audio_context.createGain(), this.node_gain_right = this.audio_context.createGain(), this.node_merger = this.audio_context.createChannelMerger(2), this.input_left = this.node_treble_left, this.input_right = this.node_treble_right, this.node_treble_left.connect(this.node_bass_left), this.node_bass_left.connect(this.node_gain_left), this.node_gain_left.connect(this.node_merger, 0, 0), this.node_treble_right.connect(this.node_bass_right), this.node_bass_right.connect(this.node_gain_right), this.node_gain_right.connect(this.node_merger, 0, 1), this.node_merger.connect(this.audio_context.destination), t.register(
      "mixer-connect",
      function(s) {
        this.connect_source(s[0], s[1]);
      },
      this
    ), t.register(
      "mixer-disconnect",
      function(s) {
        this.disconnect_source(s[0], s[1]);
      },
      this
    ), t.register(
      "mixer-volume",
      function(s) {
        var r = s[0], _ = s[1];
        s = Math.pow(10, s[2] / 20);
        var o = r === Xe ? this : this.sources.get(r);
        o === void 0 ? void 0 : o.set_volume(s, _);
      },
      this
    ), t.register(
      "mixer-gain-left",
      function(s) {
        this.gain_left = Math.pow(10, s / 20), this.update();
      },
      this
    ), t.register(
      "mixer-gain-right",
      function(s) {
        this.gain_right = Math.pow(10, s / 20), this.update();
      },
      this
    ), t.register("mixer-treble-left", i(this.node_treble_left), this), t.register("mixer-treble-right", i(this.node_treble_right), this), t.register("mixer-bass-left", i(this.node_bass_left), this), t.register("mixer-bass-right", i(this.node_bass_right), this);
  }
  se.prototype.add_source = function(t, e) {
    return t = new re(
      this.audio_context,
      t,
      this.input_left,
      this.input_right
    ), this.sources.has(e), this.sources.set(e, t), t;
  }, se.prototype.connect_source = function(t, e) {
    var i = this.sources.get(t);
    i === void 0 ? void 0 : i.connect(e);
  }, se.prototype.disconnect_source = function(t, e) {
    var i = this.sources.get(t);
    i === void 0 ? void 0 : i.disconnect(e);
  }, se.prototype.set_volume = function(t, e) {
    switch (e === void 0 && (e = Wt), e) {
      case Yt:
        this.volume_left = t;
        break;
      case Qt:
        this.volume_right = t;
        break;
      case Wt:
        this.volume_both = t;
        break;
      default:
        return;
    }
    this.update();
  }, se.prototype.update = function() {
    var t = this.volume_both * this.volume_right * this.gain_right;
    this.node_gain_left.gain.setValueAtTime(
      this.volume_both * this.volume_left * this.gain_left,
      this.audio_context.currentTime
    ), this.node_gain_right.gain.setValueAtTime(
      t,
      this.audio_context.currentTime
    );
  };
  function re(t, e, i, s) {
    this.audio_context = t, this.connected_right = this.connected_left = !0, this.volume_right = this.volume_left = this.volume_both = this.gain_hidden = 1, this.node_splitter = t.createChannelSplitter(2), this.node_gain_left = t.createGain(), this.node_gain_right = t.createGain(), e.connect(this.node_splitter), this.node_splitter.connect(this.node_gain_left, 0), this.node_gain_left.connect(i), this.node_splitter.connect(this.node_gain_right, 1), this.node_gain_right.connect(s);
  }
  re.prototype.update = function() {
    var t = this.connected_right * this.gain_hidden * this.volume_both * this.volume_right;
    this.node_gain_left.gain.setValueAtTime(
      this.connected_left * this.gain_hidden * this.volume_both * this.volume_left,
      this.audio_context.currentTime
    ), this.node_gain_right.gain.setValueAtTime(
      t,
      this.audio_context.currentTime
    );
  }, re.prototype.connect = function(t) {
    var e = !t || t === Wt;
    (e || t === Yt) && (this.connected_left = !0), (e || t === Qt) && (this.connected_right = !0), this.update();
  }, re.prototype.disconnect = function(t) {
    var e = !t || t === Wt;
    (e || t === Yt) && (this.connected_left = !1), (e || t === Qt) && (this.connected_right = !1), this.update();
  }, re.prototype.set_volume = function(t, e) {
    switch (e === void 0 && (e = Wt), e) {
      case Yt:
        this.volume_left = t;
        break;
      case Qt:
        this.volume_right = t;
        break;
      case Wt:
        this.volume_both = t;
        break;
      default:
        return;
    }
    this.update();
  }, re.prototype.set_gain_hidden = function(t) {
    this.gain_hidden = t;
  };
  function Js(t, e, i) {
    this.node_oscillator = e.createOscillator(), this.node_oscillator.type = "square", this.node_oscillator.frequency.setValueAtTime(440, e.currentTime), this.mixer_connection = i.add_source(
      this.node_oscillator,
      xe
    ), this.mixer_connection.disconnect(), t.register(
      "pcspeaker-enable",
      function() {
        i.connect_source(xe);
      },
      this
    ), t.register(
      "pcspeaker-disable",
      function() {
        i.disconnect_source(xe);
      },
      this
    ), t.register(
      "pcspeaker-update",
      function(s) {
        var r = s[1], _ = 0;
        s[0] === 3 && (_ = 1e3 * jt / r, _ = Math.min(_, this.node_oscillator.frequency.maxValue), _ = Math.max(_, 0)), this.node_oscillator.frequency.setValueAtTime(_, e.currentTime);
      },
      this
    );
  }
  Js.prototype.start = function() {
    this.node_oscillator.start();
  };
  function wi(t, e, i) {
    this.bus = t, this.audio_context = e, this.enabled = !1, this.sampling_rate = 48e3, e = (function() {
      function o(c) {
        return c === 0 ? 1 : (c *= Math.PI, Math.sin(c) / c);
      }
      function a() {
        var c = Reflect.construct(AudioWorkletProcessor, [], a);
        return c.kernel_size = 3, c.queue_data = Array(1024), c.queue_start = 0, c.queue_end = 0, c.queue_length = 0, c.queue_size = c.queue_data.length, c.queued_samples = 0, c.source_buffer_previous = d, c.source_buffer_current = d, c.source_samples_per_destination = 1, c.source_block_start = 0, c.source_time = 0, c.source_offset = 0, c.port.onmessage = (u) => {
          switch (u.data.type) {
            case "queue":
              c.queue_push(u.data.value);
              break;
            case "sampling-rate":
              c.source_samples_per_destination = u.data.value / sampleRate;
          }
        }, c;
      }
      var d = [new Float32Array(256), new Float32Array(256)];
      Reflect.setPrototypeOf(a.prototype, AudioWorkletProcessor.prototype), Reflect.setPrototypeOf(a, AudioWorkletProcessor), a.prototype.process = a.prototype.process = function(c, u, p) {
        for (c = 0; c < u[0][0].length; c++) {
          for (var g = p = 0, f = this.source_offset + this.kernel_size, w = this.source_offset - this.kernel_size + 1; w <= f; w++) {
            var S = this.source_block_start + w;
            p += this.get_sample(S, 0) * this.kernel(this.source_time - w), g += this.get_sample(S, 1) * this.kernel(this.source_time - w);
          }
          (isNaN(p) || isNaN(g)) && (p = g = 0, this.dbg_log("ERROR: NaN values! Ignoring for now.")), u[0][0][c] = p, u[0][1][c] = g, this.source_time += this.source_samples_per_destination, this.source_offset = Math.floor(this.source_time);
        }
        return u = this.source_offset, u += this.kernel_size + 2, this.source_time -= this.source_offset, this.source_block_start += this.source_offset, this.source_offset = 0, this.ensure_enough_data(u), !0;
      }, a.prototype.kernel = function(c) {
        return o(c) * o(c / this.kernel_size);
      }, a.prototype.get_sample = function(c, u) {
        return 0 > c ? (c += this.source_buffer_previous[0].length, this.source_buffer_previous[u][c]) : this.source_buffer_current[u][c];
      }, a.prototype.ensure_enough_data = function(c) {
        var u = this.source_buffer_current[0].length;
        u - this.source_block_start < c && (this.prepare_next_buffer(), this.source_block_start -= u);
      }, a.prototype.prepare_next_buffer = function() {
        256 > this.queued_samples && this.queue_length && this.dbg_log(
          "Not enough samples - should not happen during midway of playback"
        ), this.source_buffer_previous = this.source_buffer_current, this.source_buffer_current = this.queue_shift();
        var c = this.source_buffer_current[0].length;
        if (256 > c) {
          for (var u = this.queue_start, p = 0; 256 > c && p < this.queue_length; )
            c += this.queue_data[u][0].length, u = u + 1 & this.queue_size - 1, p++;
          c = Math.max(c, 256), c = [new Float32Array(c), new Float32Array(c)], c[0].set(this.source_buffer_current[0]), c[1].set(this.source_buffer_current[1]), u = this.source_buffer_current[0].length;
          for (var g = 0; g < p; g++) {
            var f = this.queue_shift();
            c[0].set(f[0], u), c[1].set(f[1], u), u += f[0].length;
          }
          this.source_buffer_current = c;
        }
        this.pump();
      }, a.prototype.pump = function() {
        1024 > this.queued_samples / this.source_samples_per_destination && this.port.postMessage({ type: "pump" });
      }, a.prototype.queue_push = function(c) {
        this.queue_length < this.queue_size && (this.queue_data[this.queue_end] = c, this.queue_end = this.queue_end + 1 & this.queue_size - 1, this.queue_length++, this.queued_samples += c[0].length, this.pump());
      }, a.prototype.queue_shift = function() {
        if (!this.queue_length)
          return d;
        var c = this.queue_data[this.queue_start];
        return this.queue_data[this.queue_start] = null, this.queue_start = this.queue_start + 1 & this.queue_size - 1, this.queue_length--, this.queued_samples -= c[0].length, c;
      }, a.prototype.dbg_log = function(c) {
      }, registerProcessor("dac-processor", a);
    }).toString();
    var s = e.indexOf("{") + 1, r = e.lastIndexOf("}");
    e = e.substring(s, r), e = new Blob([e], { type: "application/javascript" });
    var _ = URL.createObjectURL(e);
    this.node_processor = null, this.node_output = this.audio_context.createGain(), this.audio_context.audioWorklet.addModule(_).then(() => {
      URL.revokeObjectURL(_), this.node_processor = new AudioWorkletNode(
        this.audio_context,
        "dac-processor",
        {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [2],
          parameterData: {},
          processorOptions: {}
        }
      ), this.node_processor.port.postMessage({
        type: "sampling-rate",
        value: this.sampling_rate
      }), this.node_processor.port.onmessage = (o) => {
        switch (o.data.type) {
          case "pump":
            this.pump();
            break;
          case "debug-log":
            n("SpeakerWorkletDAC - Worklet: " + o.data.value);
        }
      }, this.node_processor.connect(this.node_output);
    }), this.mixer_connection = i.add_source(this.node_output, Re), this.mixer_connection.set_gain_hidden(3), t.register(
      "dac-send-data",
      function(o) {
        this.queue(o);
      },
      this
    ), t.register(
      "dac-enable",
      function(o) {
        this.enabled = !0;
      },
      this
    ), t.register(
      "dac-disable",
      function() {
        this.enabled = !1;
      },
      this
    ), t.register(
      "dac-tell-sampling-rate",
      function(o) {
        this.sampling_rate = o, this.node_processor && this.node_processor.port.postMessage({
          type: "sampling-rate",
          value: o
        });
      },
      this
    );
  }
  wi.prototype.queue = function(t) {
    this.node_processor && this.node_processor.port.postMessage({ type: "queue", value: t }, [
      t[0].buffer,
      t[1].buffer
    ]);
  }, wi.prototype.pump = function() {
    this.enabled && this.bus.send("dac-request-data");
  };
  function bi(t, e, i) {
    this.bus = t, this.audio_context = e, this.enabled = !1, this.sampling_rate = 22050, this.buffered_time = 0, this.rate_ratio = 1, this.node_lowpass = this.audio_context.createBiquadFilter(), this.node_lowpass.type = "lowpass", this.node_output = this.node_lowpass, this.mixer_connection = i.add_source(this.node_output, Re), this.mixer_connection.set_gain_hidden(3), t.register(
      "dac-send-data",
      function(s) {
        this.queue(s);
      },
      this
    ), t.register(
      "dac-enable",
      function(s) {
        this.enabled = !0, this.pump();
      },
      this
    ), t.register(
      "dac-disable",
      function() {
        this.enabled = !1;
      },
      this
    ), t.register(
      "dac-tell-sampling-rate",
      function(s) {
        this.sampling_rate = s, this.rate_ratio = Math.ceil(
          Vo / s
        ), this.node_lowpass.frequency.setValueAtTime(
          s / 2,
          this.audio_context.currentTime
        );
      },
      this
    );
  }
  bi.prototype.queue = function(t) {
    var e = t[0].length, i = e / this.sampling_rate;
    if (1 < this.rate_ratio)
      for (var s = this.audio_context.createBuffer(
        2,
        e * this.rate_ratio,
        this.sampling_rate * this.rate_ratio
      ), r = s.getChannelData(0), _ = s.getChannelData(1), o = 0, a = 0; a < e; a++)
        for (var d = 0; d < this.rate_ratio; d++, o++)
          r[o] = t[0][a], _[o] = t[1][a];
    else
      s = this.audio_context.createBuffer(2, e, this.sampling_rate), s.copyToChannel ? (s.copyToChannel(t[0], 0), s.copyToChannel(t[1], 1)) : (s.getChannelData(0).set(t[0]), s.getChannelData(1).set(t[1]));
    if (t = this.audio_context.createBufferSource(), t.buffer = s, t.connect(this.node_lowpass), t.addEventListener("ended", this.pump.bind(this)), s = this.audio_context.currentTime, this.buffered_time < s)
      for (n(
        "Speaker DAC - Creating/Recreating reserve - shouldn't occur frequently during playback"
      ), this.buffered_time = s, s = Qs - i, e = 0; e <= s; )
        e += i, this.buffered_time += i, setTimeout(() => this.pump(), 1e3 * e);
    t.start(this.buffered_time), this.buffered_time += i, setTimeout(() => this.pump(), 0);
  }, bi.prototype.pump = function() {
    this.enabled && (this.buffered_time - this.audio_context.currentTime > Qs || this.bus.send("dac-request-data"));
  };
  function jo(t, e) {
    function i(a) {
      o.bus && o.enabled && (o.send_char(a.which), a.preventDefault());
    }
    function s(a) {
      var d = a.which;
      d === 8 ? (o.send_char(127), a.preventDefault()) : d === 9 && (o.send_char(9), a.preventDefault());
    }
    function r(a) {
      if (o.enabled) {
        for (var d = a.clipboardData.getData("text/plain"), c = 0; c < d.length; c++)
          o.send_char(d.charCodeAt(c));
        a.preventDefault();
      }
    }
    function _(a) {
      a.target !== t && t.blur();
    }
    var o = this;
    this.enabled = !0, this.bus = e, this.text = "", this.text_new_line = !1, this.last_update = 0, this.bus.register(
      "serial0-output-char",
      function(a) {
        this.show_char(a);
      },
      this
    ), this.destroy = function() {
      t.removeEventListener("keypress", i, !1), t.removeEventListener("keydown", s, !1), t.removeEventListener("paste", r, !1), window.removeEventListener("mousedown", _, !1);
    }, this.init = function() {
      this.destroy(), t.style.display = "block", t.addEventListener("keypress", i, !1), t.addEventListener("keydown", s, !1), t.addEventListener("paste", r, !1), window.addEventListener("mousedown", _, !1);
    }, this.init(), this.show_char = function(a) {
      a === "\b" ? (this.text = this.text.slice(0, -1), this.update()) : a !== "\r" && (this.text += a, a === `
` && (this.text_new_line = !0), this.update());
    }, this.update = function() {
      var a = Date.now(), d = a - this.last_update;
      16 > d ? this.update_timer === void 0 && (this.update_timer = setTimeout(() => {
        this.update_timer = void 0;
        var c = Date.now();
        15 <= c - this.last_update, this.last_update = c, this.render();
      }, 16 - d)) : (this.update_timer !== void 0 && (clearTimeout(this.update_timer), this.update_timer = void 0), this.last_update = a, this.render());
    }, this.render = function() {
      t.value = this.text, this.text_new_line && (this.text_new_line = !1, t.scrollTop = 1e9);
    }, this.send_char = function(a) {
      o.bus && o.bus.send("serial0-input", a);
    };
  }
  function $s(t, e) {
    if (this.element = t, window.Terminal) {
      var i = this.term = new window.Terminal({ logLevel: "off" });
      i.write(
        "This is the serial console. Whatever you type or paste here will be sent to COM1"
      );
      var s = i.onData(function(r) {
        for (let _ = 0; _ < r.length; _++)
          e.send("serial0-input", r.charCodeAt(_));
      });
      e.register(
        "serial0-output-char",
        function(r) {
          i.write(r);
        },
        this
      ), this.destroy = function() {
        s.dispose(), i.dispose();
      };
    }
  }
  $s.prototype.show = function() {
    this.term && this.term.open(this.element);
  };
  function Ot(t, e) {
    this.bus = e, this.socket = void 0, this.send_queue = [], this.url = t, this.reconnect_interval = 1e4, this.last_connect_attempt = Date.now() - this.reconnect_interval, this.send_queue_limit = 64, this.bus.register(
      "net0-send",
      function(i) {
        this.send(i);
      },
      this
    );
  }
  Ot.prototype.handle_message = function(t) {
    this.bus && this.bus.send("net0-receive", new Uint8Array(t.data));
  }, Ot.prototype.handle_close = function(t) {
    this.connect(), setTimeout(this.connect.bind(this), this.reconnect_interval);
  }, Ot.prototype.handle_open = function(t) {
    for (t = 0; t < this.send_queue.length; t++)
      this.send(this.send_queue[t]);
    this.send_queue = [];
  }, Ot.prototype.handle_error = function(t) {
  }, Ot.prototype.destroy = function() {
    this.socket && this.socket.close();
  }, Ot.prototype.connect = function() {
    if (typeof WebSocket < "u") {
      if (this.socket) {
        var t = this.socket.readyState;
        if (t === 0 || t === 1)
          return;
      }
      t = Date.now(), this.last_connect_attempt + this.reconnect_interval > t || (this.last_connect_attempt = Date.now(), this.socket = new WebSocket(this.url), this.socket.binaryType = "arraybuffer", this.socket.onopen = this.handle_open.bind(this), this.socket.onmessage = this.handle_message.bind(this), this.socket.onclose = this.handle_close.bind(this), this.socket.onerror = this.handle_error.bind(this));
    }
  }, Ot.prototype.send = function(t) {
    this.socket && this.socket.readyState === 1 ? this.socket.send(t) : (this.send_queue.push(t), this.send_queue.length > 2 * this.send_queue_limit && (this.send_queue = this.send_queue.slice(
      -this.send_queue_limit
    )), this.connect());
  }, Ot.prototype.change_proxy = function(t) {
    this.url = t, this.socket && (this.socket.onclose = function() {
    }, this.socket.onerror = function() {
    }, this.socket.close(), this.socket = void 0);
  };
  function v(t) {
    this.cpu_is_running = !1;
    var e = Fs.create();
    this.bus = e[0], this.emulator_bus = e[1];
    var i, s;
    const r = new WebAssembly.Table({
      element: "anyfunc",
      initial: xi + Ie
    });
    e = {
      cpu_exception_hook: (o) => this.cpu_exception_hook && this.cpu_exception_hook(o),
      hlt_op: function() {
        return i.hlt_op();
      },
      abort: function() {
      },
      microtick: W.microtick,
      get_rand_int: function() {
        return l.get_rand_int();
      },
      pic_acknowledge: function() {
        i.pic_acknowledge();
      },
      io_port_read8: function(o) {
        return i.io.port_read8(o);
      },
      io_port_read16: function(o) {
        return i.io.port_read16(o);
      },
      io_port_read32: function(o) {
        return i.io.port_read32(o);
      },
      io_port_write8: function(o, a) {
        i.io.port_write8(o, a);
      },
      io_port_write16: function(o, a) {
        i.io.port_write16(o, a);
      },
      io_port_write32: function(o, a) {
        i.io.port_write32(o, a);
      },
      mmap_read8: function(o) {
        return i.mmap_read8(o);
      },
      mmap_read16: function(o) {
        return i.mmap_read16(o);
      },
      mmap_read32: function(o) {
        return i.mmap_read32(o);
      },
      mmap_write8: function(o, a) {
        i.mmap_write8(o, a);
      },
      mmap_write16: function(o, a) {
        i.mmap_write16(o, a);
      },
      mmap_write32: function(o, a) {
        i.mmap_write32(o, a);
      },
      mmap_write64: function(o, a, d) {
        i.mmap_write64(o, a, d);
      },
      mmap_write128: function(o, a, d, c, u) {
        i.mmap_write128(o, a, d, c, u);
      },
      log_from_wasm: function(o, a) {
        o = l.read_sized_string_from_mem(s, o, a), n(o, b);
      },
      console_log_from_wasm: function(o, a) {
        o = l.read_sized_string_from_mem(s, o, a), console.error(o);
      },
      dbg_trace_from_wasm: function() {
      },
      codegen_finalize: (o, a, d, c, u) => {
        i.codegen_finalize(o, a, d, c, u);
      },
      jit_clear_func: (o) => i.jit_clear_func(o),
      jit_clear_all_funcs: () => i.jit_clear_all_funcs(),
      __indirect_function_table: r
    };
    let _ = t.wasm_fn;
    _ || (_ = (o) => new Promise((a) => {
      let d = "v86.wasm", c = "v86-fallback.wasm";
      if (t.wasm_path) {
        d = t.wasm_path;
        const u = d.lastIndexOf("/");
        c = (u === -1 ? "" : d.substr(0, u)) + "/" + c;
      } else
        typeof window > "u" && typeof __dirname == "string" ? (d = __dirname + "/" + d, c = __dirname + "/" + c) : (d = "build/" + d, c = "build/" + c);
      l.load_file(d, {
        done: async (u) => {
          try {
            const { instance: p } = await WebAssembly.instantiate(u, o);
            this.wasm_source = u, a(p.exports);
          } catch {
            l.load_file(c, {
              done: async (g) => {
                const { instance: f } = await WebAssembly.instantiate(g, o);
                this.wasm_source = g, a(f.exports);
              }
            });
          }
        },
        progress: (u) => {
          this.emulator_bus.send("download-progress", {
            file_index: 0,
            file_count: 1,
            file_name: d,
            lengthComputable: u.lengthComputable,
            total: u.total,
            loaded: u.loaded
          });
        }
      });
    })), _({ env: e }).then((o) => {
      s = o.memory, o.rust_init(), o = this.v86 = new W(this.emulator_bus, {
        exports: o,
        wasm_table: r
      }), i = o.cpu, this.continue_init(o, t);
    }), this.zstd_worker = null, this.zstd_worker_request_id = 0;
  }
  v.prototype.continue_init = async function(t, e) {
    function i(f, w) {
      switch (f) {
        case "hda":
          r.hda = this.disk_images.hda = w;
          break;
        case "hdb":
          r.hdb = this.disk_images.hdb = w;
          break;
        case "cdrom":
          r.cdrom = this.disk_images.cdrom = w;
          break;
        case "fda":
          r.fda = this.disk_images.fda = w;
          break;
        case "fdb":
          r.fdb = this.disk_images.fdb = w;
          break;
        case "multiboot":
          r.multiboot = this.disk_images.multiboot = w.buffer;
          break;
        case "bzimage":
          r.bzimage = this.disk_images.bzimage = w.buffer;
          break;
        case "initrd":
          r.initrd = this.disk_images.initrd = w.buffer;
          break;
        case "bios":
          r.bios = w.buffer;
          break;
        case "vga_bios":
          r.vga_bios = w.buffer;
          break;
        case "initial_state":
          r.initial_state = w.buffer;
          break;
        case "fs9p_json":
          r.fs9p_json = w;
          break;
      }
    }
    async function s() {
      if (r.fs9p && r.fs9p_json) {
        if (r.initial_state ? n(
          "Filesystem basefs ignored: Overridden by state image"
        ) : r.fs9p.load_from_json(r.fs9p_json), e.bzimage_initrd_from_filesystem) {
          const { bzimage_path: f, initrd_path: w } = this.get_bzimage_initrd_from_filesystem(r.fs9p);
          n("Found bzimage: " + f + " and initrd: " + w);
          const [S, E] = await Promise.all([
            r.fs9p.read_file(w),
            r.fs9p.read_file(f)
          ]);
          i.call(this, "initrd", new l.SyncBuffer(S.buffer)), i.call(this, "bzimage", new l.SyncBuffer(E.buffer));
        }
      } else
        e.bzimage_initrd_from_filesystem;
      this.serial_adapter && this.serial_adapter.show && this.serial_adapter.show(), this.bus.send("cpu-init", r), r.initial_state && (t.restore_state(r.initial_state), r.initial_state = void 0), e.autostart && this.bus.send("cpu-run"), this.emulator_bus.send("emulator-loaded");
    }
    this.bus.register(
      "emulator-stopped",
      function() {
        this.cpu_is_running = !1;
      },
      this
    ), this.bus.register(
      "emulator-started",
      function() {
        this.cpu_is_running = !0;
      },
      this
    );
    var r = {};
    this.disk_images = {
      fda: void 0,
      fdb: void 0,
      hda: void 0,
      hdb: void 0,
      cdrom: void 0
    };
    var _ = e.boot_order ? e.boot_order : e.fda ? vn : e.hda ? yn : Wi;
    r.acpi = e.acpi, r.disable_jit = e.disable_jit, r.load_devices = !0, r.log_level = e.log_level, r.memory_size = e.memory_size || 67108864, r.vga_memory_size = e.vga_memory_size || 8388608, r.boot_order = _, r.fastboot = e.fastboot || !1, r.fda = void 0, r.fdb = void 0, r.uart1 = e.uart1, r.uart2 = e.uart2, r.uart3 = e.uart3, r.cmdline = e.cmdline, r.preserve_mac_from_state_image = e.preserve_mac_from_state_image, r.mac_address_translation = e.mac_address_translation, r.cpuid_level = e.cpuid_level, e.network_adapter ? this.network_adapter = e.network_adapter(this.bus) : e.network_relay_url && (this.network_adapter = new Ot(
      e.network_relay_url,
      this.bus
    )), r.enable_ne2k = !0, e.disable_keyboard || (this.keyboard_adapter = new Wo(this.bus)), e.disable_mouse || (this.mouse_adapter = new Ho(
      this.bus,
      e.screen_container
    )), e.screen_container ? this.screen_adapter = new kr(
      e.screen_container,
      this.bus
    ) : e.screen_dummy && (this.screen_adapter = new Xo(this.bus)), e.serial_container && (this.serial_adapter = new jo(
      e.serial_container,
      this.bus
    )), e.serial_container_xtermjs && (this.serial_adapter = new $s(
      e.serial_container_xtermjs,
      this.bus
    )), e.disable_speaker || (this.speaker_adapter = new Zs(this.bus));
    var o = [];
    _ = (f, w) => {
      w && (w.get && w.set && w.load ? o.push({ name: f, loadable: w }) : ((f === "bios" || f === "vga_bios" || f === "initial_state" || f === "multiboot" || f === "bzimage" || f === "initrd") && (w.async = !1), w.url && !w.async ? o.push({ name: f, url: w.url, size: w.size }) : o.push({
        name: f,
        loadable: l.buffer_from_object(
          w,
          this.zstd_decompress_worker.bind(this)
        )
      })));
    }, e.state && console.warn(
      "Warning: Unknown option 'state'. Did you mean 'initial_state'?"
    );
    for (var a = "bios vga_bios cdrom hda hdb fda fdb initial_state multiboot bzimage initrd".split(
      " "
    ), d = 0; d < a.length; d++)
      _(a[d], e[a[d]]);
    if (e.filesystem && (_ = e.filesystem.basefs, a = e.filesystem.baseurl, d = new Nt(), a && (d = new Ct(d, a)), r.fs9p = this.fs9p = new x(d), _)) {
      if (typeof _ == "object") {
        var c = _.size;
        _ = _.url;
      }
      o.push({ name: "fs9p_json", url: _, size: c, as_json: !0 });
    }
    var u = this, p = o.length, g = (function(f) {
      if (f === p)
        setTimeout(s.bind(this), 0);
      else {
        var w = o[f];
        w.loadable ? (w.loadable.onload = (function(S) {
          i.call(this, w.name, w.loadable), g(f + 1);
        }).bind(this), w.loadable.load()) : l.load_file(w.url, {
          done: (function(S) {
            w.url.endsWith(".zst") && w.name !== "initial_state" && (w.size, S = this.zstd_decompress(
              w.size,
              new Uint8Array(S)
            )), i.call(
              this,
              w.name,
              w.as_json ? S : new l.SyncBuffer(S)
            ), g(f + 1);
          }).bind(this),
          progress: function(S) {
            S.target.status === 200 ? u.emulator_bus.send(
              "download-progress",
              {
                file_index: f,
                file_count: p,
                file_name: w.url,
                lengthComputable: S.lengthComputable,
                total: S.total || w.size,
                loaded: S.loaded
              }
            ) : u.emulator_bus.send("download-error", {
              file_index: f,
              file_count: p,
              file_name: w.url,
              request: S.target
            });
          },
          as_json: w.as_json
        });
      }
    }).bind(this);
    g(0);
  }, v.prototype.zstd_decompress = function(t, e) {
    const i = this.v86.cpu;
    this.zstd_context, this.zstd_context = i.zstd_create_ctx(e.length), new Uint8Array(i.wasm_memory.buffer).set(
      e,
      i.zstd_get_src_ptr(this.zstd_context)
    ), e = i.zstd_read(this.zstd_context, t);
    const s = i.wasm_memory.buffer.slice(e, e + t);
    return i.zstd_read_free(e, t), i.zstd_free_ctx(this.zstd_context), this.zstd_context = null, s;
  }, v.prototype.zstd_decompress_worker = async function(t, e) {
    if (!this.zstd_worker) {
      const i = URL.createObjectURL(
        new Blob(
          [
            "(" + (function() {
              let s;
              globalThis.onmessage = function(r) {
                if (s) {
                  var {
                    src: _,
                    decompressed_size: o,
                    id: a
                  } = r.data;
                  r = s.exports;
                  var d = r.zstd_create_ctx(_.length);
                  new Uint8Array(r.memory.buffer).set(
                    _,
                    r.zstd_get_src_ptr(d)
                  );
                  var c = r.zstd_read(d, o), u = r.memory.buffer.slice(c, c + o);
                  r.zstd_read_free(c, o), r.zstd_free_ctx(d), postMessage({ result: u, id: a }, [u]);
                } else
                  d = Object.fromEntries(
                    "cpu_exception_hook hlt_op microtick get_rand_int pic_acknowledge io_port_read8 io_port_read16 io_port_read32 io_port_write8 io_port_write16 io_port_write32 mmap_read8 mmap_read16 mmap_read32 mmap_write8 mmap_write16 mmap_write32 mmap_write64 mmap_write128 codegen_finalize jit_clear_func jit_clear_all_funcs".split(" ").map((p) => [
                      p,
                      () => console.error(
                        "zstd worker unexpectedly called " + p
                      )
                    ])
                  ), d.__indirect_function_table = new WebAssembly.Table({
                    element: "anyfunc",
                    initial: 1024
                  }), d.abort = () => {
                    throw Error(
                      "zstd worker aborted"
                    );
                  }, d.log_from_wasm = d.console_log_from_wasm = (p, g) => {
                    console.log(
                      String.fromCharCode(
                        ...new Uint8Array(
                          s.exports.memory.buffer,
                          p,
                          g
                        )
                      )
                    );
                  }, d.dbg_trace_from_wasm = () => console.trace(), s = new WebAssembly.Instance(
                    new WebAssembly.Module(r.data),
                    { env: d }
                  );
              };
            }).toString() + ")()"
          ],
          { type: "text/javascript" }
        )
      );
      this.zstd_worker = new Worker(i), URL.revokeObjectURL(i), this.zstd_worker.postMessage(this.wasm_source, [this.wasm_source]);
    }
    return new Promise((i) => {
      const s = this.zstd_worker_request_id++, r = async (_) => {
        _.data.id === s && (this.zstd_worker.removeEventListener("message", r), _.data.result.byteLength, i(_.data.result));
      };
      this.zstd_worker.addEventListener("message", r), this.zstd_worker.postMessage(
        { src: e, decompressed_size: t, id: s },
        [e.buffer]
      );
    });
  }, v.prototype.get_bzimage_initrd_from_filesystem = function(t) {
    const e = (t.read_dir("/") || []).map((r) => "/" + r);
    t = (t.read_dir("/boot/") || []).map((r) => "/boot/" + r);
    let i, s;
    for (let r of [].concat(e, t)) {
      const _ = /old/i.test(r) || /fallback/i.test(r), o = /vmlinuz/i.test(r) || /bzimage/i.test(r), a = /initrd/i.test(r) || /initramfs/i.test(r);
      !o || s && _ || (s = r), !a || i && _ || (i = r);
    }
    return i && s || (console.log(
      "Failed to find bzimage or initrd in filesystem. Files:"
    ), console.log(e.join(" ")), console.log(t.join(" "))), { initrd_path: i, bzimage_path: s };
  }, v.prototype.run = async function() {
    this.bus.send("cpu-run");
  }, X.exportProperty(v.prototype, "run", v.prototype.run), v.prototype.stop = async function() {
    this.cpu_is_running && await new Promise((t) => {
      const e = () => {
        this.remove_listener("emulator-stopped", e), t();
      };
      this.add_listener("emulator-stopped", e), this.bus.send("cpu-stop");
    });
  }, X.exportProperty(v.prototype, "stop", v.prototype.stop), v.prototype.destroy = async function() {
    await this.stop(), this.v86.destroy(), this.keyboard_adapter && this.keyboard_adapter.destroy(), this.network_adapter && this.network_adapter.destroy(), this.mouse_adapter && this.mouse_adapter.destroy(), this.screen_adapter && this.screen_adapter.destroy(), this.serial_adapter && this.serial_adapter.destroy(), this.speaker_adapter && this.speaker_adapter.destroy();
  }, X.exportProperty(
    v.prototype,
    "destroy",
    v.prototype.destroy
  ), v.prototype.restart = function() {
    this.bus.send("cpu-restart");
  }, X.exportProperty(
    v.prototype,
    "restart",
    v.prototype.restart
  ), v.prototype.add_listener = function(t, e) {
    this.bus.register(t, e, this);
  }, X.exportProperty(
    v.prototype,
    "add_listener",
    v.prototype.add_listener
  ), v.prototype.remove_listener = function(t, e) {
    this.bus.unregister(t, e);
  }, X.exportProperty(
    v.prototype,
    "remove_listener",
    v.prototype.remove_listener
  ), v.prototype.restore_state = async function(t) {
    this.v86.restore_state(t);
  }, X.exportProperty(
    v.prototype,
    "restore_state",
    v.prototype.restore_state
  ), v.prototype.save_state = async function() {
    return this.v86.save_state();
  }, X.exportProperty(
    v.prototype,
    "save_state",
    v.prototype.save_state
  ), v.prototype.get_statistics = function() {
    console.warn(
      "V86Starter.prototype.get_statistics is deprecated. Use events instead."
    );
    var t = { cpu: { instruction_counter: this.get_instruction_counter() } };
    if (!this.v86)
      return t;
    var e = this.v86.cpu.devices;
    return e.hda && (t.hda = e.hda.stats), e.cdrom && (t.cdrom = e.cdrom.stats), e.ps2 && (t.mouse = { enabled: e.ps2.use_mouse }), e.vga && (t.vga = { is_graphical: e.vga.stats.is_graphical }), t;
  }, X.exportProperty(
    v.prototype,
    "get_statistics",
    v.prototype.get_statistics
  ), v.prototype.get_instruction_counter = function() {
    return this.v86 ? this.v86.cpu.instruction_counter[0] >>> 0 : 0;
  }, X.exportProperty(
    v.prototype,
    "get_instruction_counter",
    v.prototype.get_instruction_counter
  ), v.prototype.is_running = function() {
    return this.cpu_is_running;
  }, X.exportProperty(
    v.prototype,
    "is_running",
    v.prototype.is_running
  ), v.prototype.set_fda = async function(t) {
    if (t.url && !t.async)
      l.load_file(t.url, {
        done: (e) => {
          this.v86.cpu.devices.fdc.set_fda(new l.SyncBuffer(e));
        }
      });
    else {
      const e = l.buffer_from_object(
        t,
        this.zstd_decompress_worker.bind(this)
      );
      e.onload = () => {
        this.v86.cpu.devices.fdc.set_fda(e);
      }, await e.load();
    }
  }, X.exportProperty(
    v.prototype,
    "set_fda",
    v.prototype.set_fda
  ), v.prototype.eject_fda = function() {
    this.v86.cpu.devices.fdc.eject_fda();
  }, X.exportProperty(
    v.prototype,
    "eject_fda",
    v.prototype.eject_fda
  ), v.prototype.keyboard_send_scancodes = function(t) {
    for (var e = 0; e < t.length; e++)
      this.bus.send("keyboard-code", t[e]);
  }, X.exportProperty(
    v.prototype,
    "keyboard_send_scancodes",
    v.prototype.keyboard_send_scancodes
  ), v.prototype.keyboard_send_keys = function(t) {
    for (var e = 0; e < t.length; e++)
      this.keyboard_adapter.simulate_press(t[e]);
  }, X.exportProperty(
    v.prototype,
    "keyboard_send_keys",
    v.prototype.keyboard_send_keys
  ), v.prototype.keyboard_send_text = function(t) {
    for (var e = 0; e < t.length; e++)
      this.keyboard_adapter.simulate_char(t[e]);
  }, X.exportProperty(
    v.prototype,
    "keyboard_send_text",
    v.prototype.keyboard_send_text
  ), v.prototype.screen_make_screenshot = function() {
    return this.screen_adapter ? this.screen_adapter.make_screenshot() : null;
  }, X.exportProperty(
    v.prototype,
    "screen_make_screenshot",
    v.prototype.screen_make_screenshot
  ), v.prototype.screen_set_scale = function(t, e) {
    this.screen_adapter && this.screen_adapter.set_scale(t, e);
  }, X.exportProperty(
    v.prototype,
    "screen_set_scale",
    v.prototype.screen_set_scale
  ), v.prototype.screen_go_fullscreen = function() {
    if (this.screen_adapter) {
      var t = document.getElementById("screen_container");
      if (t) {
        var e = t.requestFullScreen || t.webkitRequestFullscreen || t.mozRequestFullScreen || t.msRequestFullScreen;
        e && (e.call(t), (t = document.getElementsByClassName("phone_keyboard")[0]) && t.focus());
        try {
          navigator.keyboard.lock();
        } catch {
        }
        this.lock_mouse();
      }
    }
  }, X.exportProperty(
    v.prototype,
    "screen_go_fullscreen",
    v.prototype.screen_go_fullscreen
  ), v.prototype.lock_mouse = function() {
    var t = document.body, e = t.requestPointerLock || t.mozRequestPointerLock || t.webkitRequestPointerLock;
    e && e.call(t);
  }, X.exportProperty(
    v.prototype,
    "lock_mouse",
    v.prototype.lock_mouse
  ), v.prototype.mouse_set_status = function(t) {
    this.mouse_adapter && (this.mouse_adapter.emu_enabled = t);
  }, v.prototype.keyboard_set_status = function(t) {
    this.keyboard_adapter && (this.keyboard_adapter.emu_enabled = t);
  }, X.exportProperty(
    v.prototype,
    "keyboard_set_status",
    v.prototype.keyboard_set_status
  ), v.prototype.serial0_send = function(t) {
    for (var e = 0; e < t.length; e++)
      this.bus.send("serial0-input", t.charCodeAt(e));
  }, X.exportProperty(
    v.prototype,
    "serial0_send",
    v.prototype.serial0_send
  ), v.prototype.serial_send_bytes = function(t, e) {
    for (var i = 0; i < e.length; i++)
      this.bus.send("serial" + t + "-input", e[i]);
  }, X.exportProperty(
    v.prototype,
    "serial_send_bytes",
    v.prototype.serial_send_bytes
  ), v.prototype.mount_fs = async function(t, e, i, s) {
    let r = new Nt();
    e && (r = new Ct(r, e));
    const _ = new x(r, this.fs9p.qidcounter), o = () => {
      const a = this.fs9p.Mount(t, _);
      s && (a === -Ht ? s(new We()) : a === -Ri ? s(new tr()) : 0 > a ? s(Error("Failed to mount. Error number: " + -a)) : s(null));
    };
    e ? _.load_from_json(i, () => o()) : o();
  }, X.exportProperty(
    v.prototype,
    "mount_fs",
    v.prototype.mount_fs
  ), v.prototype.create_file = async function(t, e) {
    var i = this.fs9p;
    if (i) {
      var s = t.split("/");
      s = s[s.length - 1];
      var r = i.SearchPath(t).parentid;
      if (s !== "" && r !== -1)
        await i.CreateBinaryFile(s, r, e);
      else
        return Promise.reject(new We());
    }
  }, X.exportProperty(
    v.prototype,
    "create_file",
    v.prototype.create_file
  ), v.prototype.read_file = async function(t) {
    var e = this.fs9p;
    if (e)
      return (e = await e.read_file(t)) ? e : Promise.reject(new We());
  }, X.exportProperty(
    v.prototype,
    "read_file",
    v.prototype.read_file
  ), v.prototype.automatically = function(t) {
    const e = (i) => {
      const s = i[0];
      if (s) {
        var r = i.slice(1);
        if (s.sleep)
          setTimeout(() => e(r), 1e3 * s.sleep);
        else if (s.vga_text) {
          const _ = this.screen_adapter.get_text_screen();
          for (let o of _)
            if (o.includes(s.vga_text)) {
              e(r);
              return;
            }
          setTimeout(() => e(i), 1e3);
        } else
          s.keyboard_send ? (s.keyboard_send instanceof Array ? this.keyboard_send_scancodes(s.keyboard_send) : (s.keyboard_send, this.keyboard_send_text(s.keyboard_send)), e(r)) : s.call ? (s.call(), e(r)) : void 0;
      }
    };
    e(t);
  }, v.prototype.read_memory = function(t, e) {
    return this.v86.cpu.read_blob(t, e);
  }, v.prototype.write_memory = function(t, e) {
    this.v86.cpu.write_blob(t, e);
  };
  function tr(t) {
    this.message = t || "File already exists";
  }
  tr.prototype = Error.prototype;
  function We(t) {
    this.message = t || "File not found";
  }
  We.prototype = Error.prototype, typeof window < "u" ? (window.V86Starter = v, window.V86 = v) : typeof module < "u" && typeof module.exports < "u" ? (module.exports.V86Starter = v, module.exports.V86 = v) : typeof importScripts == "function" && (self.V86Starter = v, self.V86 = v);
  function Xo(t) {
    var e, i, s;
    this.bus = t, t.register(
      "screen-set-mode",
      function(r) {
        this.set_mode(r);
      },
      this
    ), t.register(
      "screen-fill-buffer-end",
      function(r) {
        this.update_buffer(r[0], r[1]);
      },
      this
    ), t.register(
      "screen-put-char",
      function(r) {
        this.put_char(r[0], r[1], r[2], r[3], r[4]);
      },
      this
    ), t.register(
      "screen-text-scroll",
      function(r) {
        console.log("scroll", r);
      },
      this
    ), t.register(
      "screen-update-cursor",
      function(r) {
        this.update_cursor(r[0], r[1]);
      },
      this
    ), t.register(
      "screen-update-cursor-scanline",
      function(r) {
        this.update_cursor_scanline(r[0], r[1]);
      },
      this
    ), t.register(
      "screen-set-size-text",
      function(r) {
        this.set_size_text(r[0], r[1]);
      },
      this
    ), t.register(
      "screen-set-size-graphical",
      function(r) {
        this.set_size_graphical(r[0], r[1]);
      },
      this
    ), this.put_char = function(r, _, o, a, d) {
      r < s && _ < i && (r = 3 * (r * i + _), e[r] = o, e[r + 1] = a, e[r + 2] = d);
    }, this.destroy = function() {
    }, this.set_mode = function(r) {
    }, this.clear_screen = function() {
    }, this.set_size_text = function(r, _) {
      (r !== i || _ !== s) && (e = new Int32Array(r * _ * 3), i = r, s = _);
    }, this.set_size_graphical = function(r, _) {
    }, this.set_scale = function(r, _) {
    }, this.update_cursor_scanline = function(r, _) {
    }, this.update_cursor = function(r, _) {
    }, this.update_buffer = function(r, _) {
    }, this.get_text_screen = function() {
      for (var r = [], _ = 0; _ < s; _++)
        r.push(this.get_text_row(_));
      return r;
    }, this.get_text_row = function(r) {
      var _ = "";
      r = 3 * r * i;
      for (var o = 0; o < i; o++)
        _ += String.fromCharCode(e[r + 3 * o]);
      return _;
    };
  }
  const zt = {
    stats_to_string: function(t) {
      return zt.print_misc_stats(t) + zt.print_instruction_counts(t);
    },
    print_misc_stats: function(t) {
      let e = "";
      var i = "COMPILE COMPILE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_WRONG_ADDRESS_SPACE COMPILE_CUT_OFF_AT_END_OF_PAGE COMPILE_WITH_LOOP_SAFETY COMPILE_PAGE COMPILE_PAGE/COMPILE COMPILE_BASIC_BLOCK COMPILE_DUPLICATED_BASIC_BLOCK COMPILE_WASM_BLOCK COMPILE_WASM_LOOP COMPILE_DISPATCHER COMPILE_ENTRY_POINT COMPILE_WASM_TOTAL_BYTES COMPILE_WASM_TOTAL_BYTES/COMPILE_PAGE RUN_INTERPRETED RUN_INTERPRETED_NEW_PAGE RUN_INTERPRETED_PAGE_HAS_CODE RUN_INTERPRETED_PAGE_HAS_ENTRY_AFTER_PAGE_WALK RUN_INTERPRETED_NEAR_END_OF_PAGE RUN_INTERPRETED_DIFFERENT_STATE RUN_INTERPRETED_DIFFERENT_STATE_CPL3 RUN_INTERPRETED_DIFFERENT_STATE_FLAT RUN_INTERPRETED_DIFFERENT_STATE_IS32 RUN_INTERPRETED_DIFFERENT_STATE_SS32 RUN_INTERPRETED_MISSED_COMPILED_ENTRY_RUN_INTERPRETED RUN_INTERPRETED_STEPS RUN_FROM_CACHE RUN_FROM_CACHE_STEPS RUN_FROM_CACHE_STEPS/RUN_FROM_CACHE RUN_FROM_CACHE_STEPS/RUN_INTERPRETED_STEPS DIRECT_EXIT INDIRECT_JUMP INDIRECT_JUMP_NO_ENTRY NORMAL_PAGE_CHANGE NORMAL_FALLTHRU NORMAL_FALLTHRU_WITH_TARGET_BLOCK NORMAL_BRANCH NORMAL_BRANCH_WITH_TARGET_BLOCK CONDITIONAL_JUMP CONDITIONAL_JUMP_PAGE_CHANGE CONDITIONAL_JUMP_EXIT CONDITIONAL_JUMP_FALLTHRU CONDITIONAL_JUMP_FALLTHRU_WITH_TARGET_BLOCK CONDITIONAL_JUMP_BRANCH CONDITIONAL_JUMP_BRANCH_WITH_TARGET_BLOCK DISPATCHER_SMALL DISPATCHER_LARGE LOOP LOOP_SAFETY CONDITION_OPTIMISED CONDITION_UNOPTIMISED CONDITION_UNOPTIMISED_PF CONDITION_UNOPTIMISED_UNHANDLED_L CONDITION_UNOPTIMISED_UNHANDLED_LE FAILED_PAGE_CHANGE SAFE_READ_FAST SAFE_READ_SLOW_PAGE_CROSSED SAFE_READ_SLOW_NOT_VALID SAFE_READ_SLOW_NOT_USER SAFE_READ_SLOW_IN_MAPPED_RANGE SAFE_WRITE_FAST SAFE_WRITE_SLOW_PAGE_CROSSED SAFE_WRITE_SLOW_NOT_VALID SAFE_WRITE_SLOW_NOT_USER SAFE_WRITE_SLOW_IN_MAPPED_RANGE SAFE_WRITE_SLOW_READ_ONLY SAFE_WRITE_SLOW_HAS_CODE SAFE_READ_WRITE_FAST SAFE_READ_WRITE_SLOW_PAGE_CROSSED SAFE_READ_WRITE_SLOW_NOT_VALID SAFE_READ_WRITE_SLOW_NOT_USER SAFE_READ_WRITE_SLOW_IN_MAPPED_RANGE SAFE_READ_WRITE_SLOW_READ_ONLY SAFE_READ_WRITE_SLOW_HAS_CODE PAGE_FAULT TLB_MISS DO_MANY_CYCLES CYCLE_INTERNAL INVALIDATE_ALL_MODULES_NO_FREE_WASM_INDICES INVALIDATE_MODULE_WRITTEN_WHILE_COMPILED INVALIDATE_MODULE_UNUSED_AFTER_OVERWRITE INVALIDATE_MODULE_DIRTY_PAGE INVALIDATE_PAGE_HAD_CODE INVALIDATE_PAGE_HAD_ENTRY_POINTS DIRTY_PAGE_DID_NOT_HAVE_CODE RUN_FROM_CACHE_EXIT_SAME_PAGE RUN_FROM_CACHE_EXIT_NEAR_END_OF_PAGE RUN_FROM_CACHE_EXIT_DIFFERENT_PAGE CLEAR_TLB FULL_CLEAR_TLB TLB_FULL TLB_GLOBAL_FULL MODRM_SIMPLE_REG MODRM_SIMPLE_REG_WITH_OFFSET MODRM_SIMPLE_CONST_OFFSET MODRM_COMPLEX SEG_OFFSET_OPTIMISED SEG_OFFSET_NOT_OPTIMISED SEG_OFFSET_NOT_OPTIMISED_ES SEG_OFFSET_NOT_OPTIMISED_FS SEG_OFFSET_NOT_OPTIMISED_GS SEG_OFFSET_NOT_OPTIMISED_NOT_FLAT".split(
        " "
      ), s = 0;
      const r = {};
      for (let o = 0; o < i.length; o++) {
        const a = i[o];
        var _ = void 0;
        if (a.includes("/")) {
          s++;
          const [d, c] = a.split("/");
          _ = r[d] / r[c];
        } else
          _ = r[a] = t.wm.exports.profiler_stat_get(o - s), _ = 1e8 <= _ ? Math.round(_ / 1e6) + "m" : 1e5 <= _ ? Math.round(_ / 1e3) + "k" : _;
        e += a + "=" + _ + `
`;
      }
      return e += `
`, i = t.wm.exports.get_valid_tlb_entries_count(), s = t.wm.exports.get_valid_global_tlb_entries_count(), e = e + ("TLB_ENTRIES=" + i + " (" + s + " global, " + (i - s) + ` non-global)
WASM_TABLE_FREE=`) + (t.wm.exports.jit_get_wasm_table_index_free_list_count() + `
`), e += "JIT_CACHE_SIZE=" + t.wm.exports.jit_get_cache_size() + `
`, e += "FLAT_SEGMENTS=" + t.wm.exports.has_flat_segmentation() + `
`, e += "do_many_cycles avg: " + (t.do_many_cycles_total / t.do_many_cycles_count || 0) + `
`, e += "wasm memory size: " + (t.wasm_memory.buffer.byteLength >> 20) + `m
`, e = e + `Config:
MAX_PAGES=` + (t.wm.exports.get_jit_config(0) + `
`), e += "JIT_USE_LOOP_SAFETY=" + !!t.wm.exports.get_jit_config(1) + `
`, e += "MAX_EXTRA_BASIC_BLOCKS=" + t.wm.exports.get_jit_config(2) + `
`;
    },
    print_instruction_counts: function(t) {
      return [
        zt.print_instruction_counts_offset(t, !1, !1, !1, !1),
        zt.print_instruction_counts_offset(t, !0, !1, !1, !1),
        zt.print_instruction_counts_offset(t, !1, !0, !1, !1),
        zt.print_instruction_counts_offset(t, !1, !1, !0, !1),
        zt.print_instruction_counts_offset(t, !1, !1, !1, !0)
      ].join(`

`);
    },
    print_instruction_counts_offset: function(t, e, i, s, r) {
      let _ = "";
      var o = [], a = e ? "compiled" : i ? "jit exit" : s ? "unguarded register" : r ? "wasm size" : "executed";
      for (let u = 0; 256 > u; u++)
        for (let p = 0; 8 > p; p++)
          for (let g of [!1, !0]) {
            var d = t.wm.exports.get_opstats_buffer(
              e,
              i,
              s,
              r,
              u,
              !1,
              g,
              p
            );
            o.push({ opcode: u, count: d, is_mem: g, fixed_g: p }), d = t.wm.exports.get_opstats_buffer(
              e,
              i,
              s,
              r,
              u,
              !0,
              g,
              p
            ), o.push({
              opcode: 3840 | u,
              count: d,
              is_mem: g,
              fixed_g: p
            });
          }
      t = 0, e = /* @__PURE__ */ new Set([38, 46, 54, 62, 100, 101, 102, 103, 240, 242, 243]);
      for (let { count: u, opcode: p } of o)
        e.has(p) || (t += u);
      if (t === 0)
        return "";
      i = new Uint32Array(256), e = new Uint32Array(256);
      for (let { opcode: u, count: p } of o)
        (u & 65280) == 3840 ? e[u & 255] += p : i[u & 255] += p;
      _ = _ + `------------------
Total: ` + (t + `
`);
      const c = 1e7 < t ? 1e3 : 1;
      for (s = Math.max.apply(
        Math,
        o.map(({ count: u }) => Math.round(u / c))
      ), s = String(s).length, _ += `Instruction counts ${a} (in ${c}):
`, r = 0; 256 > r; r++)
        _ += r.toString(16).padStart(2, "0") + ":" + l.pads(Math.round(i[r] / c), s), _ = r % 16 == 15 ? _ + `
` : _ + " ";
      for (_ = _ + `
Instruction counts ${a} (0f, in ${c}):
`, a = 0; 256 > a; a++)
        _ += (a & 255).toString(16).padStart(2, "0") + ":" + l.pads(Math.round(e[a] / c), s), _ = a % 16 == 15 ? _ + `
` : _ + " ";
      _ += `
`, o = o.filter(({ count: u }) => u).sort(({ count: u }, { count: p }) => p - u);
      for (let { opcode: u, is_mem: p, fixed_g: g, count: f } of o.slice(
        0,
        200
      ))
        o = u.toString(16) + "_" + g + (p ? "_m" : "_r"), _ += o + ":" + (f / t * 100).toFixed(2) + " ";
      return _ + `
`;
    }
  };
  typeof module < "u" && typeof module.exports < "u" && (module.exports.print_stats = zt);
  function Nt() {
    this.filedata = /* @__PURE__ */ new Map();
  }
  Nt.prototype.read = async function(t, e, i) {
    return (t = this.filedata.get(t)) ? t.subarray(e, e + i) : null;
  }, Nt.prototype.cache = async function(t, e) {
    this.filedata.set(t, e);
  }, Nt.prototype.uncache = function(t) {
    this.filedata.delete(t);
  };
  function Ct(t, e) {
    this.storage = t, this.baseurl = e;
  }
  Ct.prototype.load_from_server = function(t) {
    return new Promise((e, i) => {
      l.load_file(this.baseurl + t, {
        done: async (s) => {
          s = new Uint8Array(s), await this.cache(t, s), e(s);
        }
      });
    });
  }, Ct.prototype.read = async function(t, e, i) {
    const s = await this.storage.read(t, e, i);
    return s || (await this.load_from_server(t)).subarray(e, e + i);
  }, Ct.prototype.cache = async function(t, e) {
    return await this.storage.cache(t, e);
  }, Ct.prototype.uncache = function(t) {
    this.storage.uncache(t);
  }, typeof window < "u" ? (window.MemoryFileStorage = Nt, window.ServerFileStorageWrapper = Ct) : typeof module < "u" && typeof module.exports < "u" ? (module.exports.MemoryFileStorage = Nt, module.exports.ServerFileStorageWrapper = Ct) : typeof importScripts == "function" && (self.MemoryFileStorage = Nt, self.ServerFileStorageWrapper = Ct);
  var pt = 61440, He = 49152, be = 40960, ne = 32768, bt = 16384, ki = -1, er = 0, oe = 2, Ve = 4, ir = 5, Ko = 3, Yo = 0, Qo = 1, Zo = 2, Jo = 3, $o = 4, t_ = 5, sr = 6, e_ = 6;
  function x(t, e) {
    this.inodes = [], this.events = [], this.storage = t, this.qidcounter = e || { last_qidnumber: 0 }, this.inodedata = {}, this.total_size = 274877906944, this.used_size = 0, this.mounts = [], this.CreateDirectory("", -1);
  }
  x.prototype.get_state = function() {
    let t = [];
    t[0] = this.inodes, t[1] = this.qidcounter.last_qidnumber, t[2] = [];
    for (const [e, i] of Object.entries(this.inodedata))
      !(this.inodes[e].mode & bt) && t[2].push([e, i]);
    return t[3] = this.total_size, t[4] = this.used_size, t = t.concat(this.mounts);
  }, x.prototype.set_state = function(t) {
    this.inodes = t[0].map((e) => {
      const i = new ke(0);
      return i.set_state(e), i;
    }), this.qidcounter.last_qidnumber = t[1], this.inodedata = {};
    for (let [e, i] of t[2])
      i.buffer.byteLength !== i.byteLength && (i = i.slice()), this.inodedata[e] = i;
    this.total_size = t[3], this.used_size = t[4], this.mounts = t.slice(5);
  }, x.prototype.AddEvent = function(t, e) {
    var i = this.inodes[t];
    i.status == er || i.status == oe ? e() : this.is_forwarder(i) ? this.follow_fs(i).AddEvent(i.foreign_id, e) : this.events.push({ id: t, OnEvent: e });
  }, x.prototype.HandleEvent = function(t) {
    var e = this.inodes[t];
    this.is_forwarder(e) && this.follow_fs(e).HandleEvent(e.foreign_id), e = [];
    for (var i = 0; i < this.events.length; i++)
      this.events[i].id == t ? this.events[i].OnEvent() : e.push(this.events[i]);
    this.events = e;
  }, x.prototype.load_from_json = function(t, e) {
    if (t.version !== Ko)
      throw "The filesystem JSON format has changed. Please update your fs2json (https://github.com/copy/fs2json) and recreate the filesystem JSON.";
    var i = t.fsroot;
    for (this.used_size = t.size, t = 0; t < i.length; t++)
      this.LoadRecursive(i[t], 0);
    e && e();
  }, x.prototype.LoadRecursive = function(t, e) {
    var i = this.CreateInode();
    const s = t[Yo];
    i.size = t[Qo], i.mtime = t[Zo], i.ctime = i.mtime, i.atime = i.mtime, i.mode = t[Jo], i.uid = t[$o], i.gid = t[t_];
    var r = i.mode & pt;
    r === bt ? (this.PushInode(i, e, s), this.LoadDir(this.inodes.length - 1, t[sr])) : r === ne ? (i.status = oe, i.sha256sum = t[e_], i.sha256sum, this.PushInode(i, e, s)) : r === be ? (i.symlink = t[sr], this.PushInode(i, e, s)) : r !== He && n("Unexpected ifmt: " + h(r) + " (" + s + ")");
  }, x.prototype.LoadDir = function(t, e) {
    for (var i = 0; i < e.length; i++)
      this.LoadRecursive(e[i], t);
  }, x.prototype.should_be_linked = function(t) {
    return !this.is_forwarder(t) || t.foreign_id === 0;
  }, x.prototype.link_under_dir = function(t, e, i) {
    const s = this.inodes[e], r = this.inodes[t];
    this.is_forwarder(r), this.IsDirectory(t), this.should_be_linked(s), 0 <= s.nlinks, "" + s.nlinks, r.direntries.has(i), r.direntries.set(i, e), s.nlinks++, this.IsDirectory(e) && (s.direntries.has(".."), s.direntries.has(".") || s.nlinks++, s.direntries.set(".", e), s.direntries.set("..", t), r.nlinks++);
  }, x.prototype.unlink_from_dir = function(t, e) {
    const i = this.Search(t, e), s = this.inodes[i], r = this.inodes[t];
    this.is_forwarder(r), this.IsDirectory(t), r.direntries.delete(e) ? (s.nlinks--, this.IsDirectory(i) && (s.direntries.get(".."), s.direntries.delete(".."), r.nlinks--), 0 <= s.nlinks, "" + s.nlinks, void 0) : void 0;
  }, x.prototype.PushInode = function(t, e, i) {
    e != -1 ? (this.inodes.push(t), t.fid = this.inodes.length - 1, this.link_under_dir(e, t.fid, i)) : this.inodes.length == 0 ? (this.inodes.push(t), t.direntries.set(".", 0), t.direntries.set("..", 0), t.nlinks = 2) : (B.Debug(
      "Error in Filesystem: Pushed inode with name = " + i + " has no parent"
    ), B.Abort());
  };
  function ke(t) {
    this.direntries = /* @__PURE__ */ new Map(), this.minor = this.major = this.mtime = this.atime = this.ctime = this.fid = this.gid = this.uid = this.size = this.status = 0, this.symlink = "", this.mode = 493, this.qid = { type: 0, version: 0, path: t }, this.caps = void 0, this.nlinks = 0, this.sha256sum = "", this.locks = [], this.foreign_id = this.mount_id = -1;
  }
  ke.prototype.get_state = function() {
    const t = [];
    return t[0] = this.mode, t[1] = (this.mode & pt) === bt ? [...this.direntries] : (this.mode & pt) === ne ? this.sha256sum : (this.mode & pt) === be ? this.symlink : (this.mode & pt) === He ? [this.minor, this.major] : null, t[2] = this.locks, t[3] = this.status, t[4] = this.size, t[5] = this.uid, t[6] = this.gid, t[7] = this.fid, t[8] = this.ctime, t[9] = this.atime, t[10] = this.mtime, t[11] = this.qid.version, t[12] = this.qid.path, t[13] = this.nlinks, t;
  }, ke.prototype.set_state = function(t) {
    if (this.mode = t[0], (this.mode & pt) === bt) {
      this.direntries = /* @__PURE__ */ new Map();
      for (const [e, i] of t[1])
        this.direntries.set(e, i);
    } else
      (this.mode & pt) === ne ? this.sha256sum = t[1] : (this.mode & pt) === be ? this.symlink = t[1] : (this.mode & pt) === He && ([this.minor, this.major] = t[1]);
    this.locks = [];
    for (const e of t[2]) {
      const i = new Dt();
      i.set_state(e), this.locks.push(i);
    }
    this.status = t[3], this.size = t[4], this.uid = t[5], this.gid = t[6], this.fid = t[7], this.ctime = t[8], this.atime = t[9], this.mtime = t[10], this.qid.type = (this.mode & pt) >> 8, this.qid.version = t[11], this.qid.path = t[12], this.nlinks = t[13];
  }, x.prototype.divert = function(t, e) {
    const i = this.Search(t, e), s = this.inodes[i], r = new ke(-1);
    this.IsDirectory(i) || 1 >= s.nlinks, "" + e + s.nlinks, Object.assign(r, s);
    const _ = this.inodes.length;
    if (this.inodes.push(r), r.fid = _, this.is_forwarder(s) && this.mounts[s.mount_id].backtrack.set(s.foreign_id, _), this.should_be_linked(s) && (this.unlink_from_dir(t, e), this.link_under_dir(t, _, e)), this.IsDirectory(i) && !this.is_forwarder(s))
      for (const [o, a] of r.direntries)
        o !== "." && o !== ".." && this.IsDirectory(a) && this.inodes[a].direntries.set("..", _);
    return this.inodedata[_] = this.inodedata[i], delete this.inodedata[i], s.direntries = /* @__PURE__ */ new Map(), s.nlinks = 0, _;
  }, x.prototype.copy_inode = function(t, e) {
    Object.assign(e, t, {
      fid: e.fid,
      direntries: e.direntries,
      nlinks: e.nlinks
    });
  }, x.prototype.CreateInode = function() {
    const t = Math.round(Date.now() / 1e3), e = new ke(++this.qidcounter.last_qidnumber);
    return e.atime = e.ctime = e.mtime = t, e;
  }, x.prototype.CreateDirectory = function(t, e) {
    var i = this.inodes[e];
    return 0 <= e && this.is_forwarder(i) ? (e = i.foreign_id, t = this.follow_fs(i).CreateDirectory(t, e), this.create_forwarder(i.mount_id, t)) : (i = this.CreateInode(), i.mode = 511 | bt, 0 <= e && (i.uid = this.inodes[e].uid, i.gid = this.inodes[e].gid, i.mode = this.inodes[e].mode & 511 | bt), i.qid.type = bt >> 8, this.PushInode(i, e, t), this.NotifyListeners(this.inodes.length - 1, "newdir"), this.inodes.length - 1);
  }, x.prototype.CreateFile = function(t, e) {
    var i = this.inodes[e];
    return this.is_forwarder(i) ? (e = i.foreign_id, t = this.follow_fs(i).CreateFile(t, e), this.create_forwarder(i.mount_id, t)) : (i = this.CreateInode(), i.uid = this.inodes[e].uid, i.gid = this.inodes[e].gid, i.qid.type = ne >> 8, i.mode = this.inodes[e].mode & 438 | ne, this.PushInode(i, e, t), this.NotifyListeners(this.inodes.length - 1, "newfile"), this.inodes.length - 1);
  }, x.prototype.CreateNode = function(t, e, i, s) {
    var r = this.inodes[e];
    return this.is_forwarder(r) ? (e = r.foreign_id, t = this.follow_fs(r).CreateNode(t, e, i, s), this.create_forwarder(r.mount_id, t)) : (r = this.CreateInode(), r.major = i, r.minor = s, r.uid = this.inodes[e].uid, r.gid = this.inodes[e].gid, r.qid.type = He >> 8, r.mode = this.inodes[e].mode & 438, this.PushInode(r, e, t), this.inodes.length - 1);
  }, x.prototype.CreateSymlink = function(t, e, i) {
    var s = this.inodes[e];
    return this.is_forwarder(s) ? (e = s.foreign_id, t = this.follow_fs(s).CreateSymlink(t, e, i), this.create_forwarder(s.mount_id, t)) : (s = this.CreateInode(), s.uid = this.inodes[e].uid, s.gid = this.inodes[e].gid, s.qid.type = be >> 8, s.symlink = i, s.mode = be, this.PushInode(s, e, t), this.inodes.length - 1);
  }, x.prototype.CreateTextFile = async function(t, e, i) {
    var s = this.inodes[e];
    if (this.is_forwarder(s))
      return e = s.foreign_id, i = await this.follow_fs(s).CreateTextFile(t, e, i), this.create_forwarder(s.mount_id, i);
    for (s = this.CreateFile(t, e), e = this.inodes[s], t = new Uint8Array(i.length), e.size = i.length, e = 0; e < i.length; e++)
      t[e] = i.charCodeAt(e);
    return await this.set_data(s, t), s;
  }, x.prototype.CreateBinaryFile = async function(t, e, i) {
    var s = this.inodes[e];
    return this.is_forwarder(s) ? (e = s.foreign_id, i = await this.follow_fs(s).CreateBinaryFile(t, e, i), this.create_forwarder(s.mount_id, i)) : (s = this.CreateFile(t, e), t = this.inodes[s], e = new Uint8Array(i.length), e.set(i), await this.set_data(s, e), t.size = i.length, s);
  }, x.prototype.OpenInode = function(t, e) {
    var i = this.inodes[t];
    return this.is_forwarder(i) ? this.follow_fs(i).OpenInode(i.foreign_id, e) : ((i.mode & pt) == bt && this.FillDirectory(t), !0);
  }, x.prototype.CloseInode = async function(t) {
    var e = this.inodes[t];
    if (this.is_forwarder(e))
      return await this.follow_fs(e).CloseInode(e.foreign_id);
    e.status === oe && this.storage.uncache(e.sha256sum), e.status == Ve && (e.status = ki, await this.DeleteData(t));
  }, x.prototype.Rename = async function(t, e, i, s) {
    if (t == i && e == s)
      return 0;
    var r = this.Search(t, e);
    if (r === -1)
      return -Ht;
    var _ = this.GetFullPath(t) + "/" + e;
    if (this.Search(i, s) != -1) {
      var o = this.Unlink(i, s);
      if (0 > o)
        return o;
    }
    var a = this.inodes[r], d = this.inodes[t];
    if (o = this.inodes[i], this.is_forwarder(d) || this.is_forwarder(o))
      if (this.is_forwarder(d) && d.mount_id === o.mount_id) {
        if (t = await this.follow_fs(d).Rename(
          d.foreign_id,
          e,
          o.foreign_id,
          s
        ), 0 > t)
          return t;
      } else {
        if (this.is_a_root(r))
          return n(
            "XXX: Attempted to move mountpoint (" + e + ") - skipped",
            Gt
          ), -Rt;
        if (!this.IsDirectory(r) && 1 < this.GetInode(r).nlinks)
          return n(
            "XXX: Attempted to move hardlinked file (" + e + ") across filesystems - skipped",
            Gt
          ), -Rt;
        d = this.divert(t, e);
        const c = this.GetInode(r), u = await this.Read(d, 0, c.size);
        if (this.is_forwarder(o) ? (i = this.follow_fs(o), s = this.IsDirectory(d) ? i.CreateDirectory(s, o.foreign_id) : i.CreateFile(s, o.foreign_id), i = i.GetInode(s), this.copy_inode(c, i), this.set_forwarder(r, o.mount_id, s)) : (this.delete_forwarder(a), this.copy_inode(c, a), this.link_under_dir(i, r, s)), await this.ChangeSize(r, c.size), u && u.length && await this.Write(r, 0, u.length, u), this.IsDirectory(r)) {
          for (const p of this.GetChildren(d))
            if (o = await this.Rename(d, p, r, p), 0 > o)
              return o;
        }
        if (await this.DeleteData(d), t = this.Unlink(t, e), 0 > t)
          return t;
      }
    else
      this.unlink_from_dir(t, e), this.link_under_dir(i, r, s), a.qid.version++;
    return this.NotifyListeners(r, "rename", { oldpath: _ }), 0;
  }, x.prototype.Write = async function(t, e, i, s) {
    this.NotifyListeners(t, "write");
    var r = this.inodes[t];
    if (this.is_forwarder(r))
      t = r.foreign_id, await this.follow_fs(r).Write(t, e, i, s);
    else {
      var _ = await this.get_buffer(t);
      !_ || _.length < e + i ? (await this.ChangeSize(t, Math.floor(3 * (e + i) / 2)), r.size = e + i, _ = await this.get_buffer(t)) : r.size < e + i && (r.size = e + i), s && _.set(s.subarray(0, i), e), await this.set_data(t, _);
    }
  }, x.prototype.Read = async function(t, e, i) {
    const s = this.inodes[t];
    return this.is_forwarder(s) ? (t = s.foreign_id, await this.follow_fs(s).Read(t, e, i)) : await this.get_data(t, e, i);
  }, x.prototype.Search = function(t, e) {
    if (t = this.inodes[t], this.is_forwarder(t)) {
      const i = t.foreign_id;
      return e = this.follow_fs(t).Search(i, e), e === -1 ? -1 : this.get_forwarder(t.mount_id, e);
    }
    return e = t.direntries.get(e), e === void 0 ? -1 : e;
  }, x.prototype.CountUsedInodes = function() {
    let t = this.inodes.length;
    for (const { fs: e, backtrack: i } of this.mounts)
      t += e.CountUsedInodes(), t -= i.size;
    return t;
  }, x.prototype.CountFreeInodes = function() {
    let t = 1048576;
    for (const { fs: e } of this.mounts)
      t += e.CountFreeInodes();
    return t;
  }, x.prototype.GetTotalSize = function() {
    let t = this.used_size;
    for (const { fs: e } of this.mounts)
      t += e.GetTotalSize();
    return t;
  }, x.prototype.GetSpace = function() {
    let t = this.total_size;
    for (const { fs: e } of this.mounts)
      t += e.GetSpace();
    return this.total_size;
  }, x.prototype.GetDirectoryName = function(t) {
    const e = this.inodes[this.GetParent(t)];
    if (this.is_forwarder(e))
      return this.follow_fs(e).GetDirectoryName(this.inodes[t].foreign_id);
    if (!e)
      return "";
    for (const [i, s] of e.direntries)
      if (s === t)
        return i;
    return "";
  }, x.prototype.GetFullPath = function(t) {
    this.IsDirectory(t);
    for (var e = ""; t != 0; )
      e = "/" + this.GetDirectoryName(t) + e, t = this.GetParent(t);
    return e.substring(1);
  }, x.prototype.Link = function(t, e, i) {
    if (this.IsDirectory(e))
      return -Rt;
    const s = this.inodes[t], r = this.inodes[e];
    return this.is_forwarder(s) ? this.is_forwarder(r) && r.mount_id === s.mount_id ? this.follow_fs(s).Link(s.foreign_id, r.foreign_id, i) : (n(
      "XXX: Attempted to hardlink a file into a child filesystem - skipped",
      Gt
    ), -Rt) : this.is_forwarder(r) ? (n(
      "XXX: Attempted to hardlink file across filesystems - skipped",
      Gt
    ), -Rt) : (this.link_under_dir(t, e, i), 0);
  }, x.prototype.Unlink = function(t, e) {
    if (e === "." || e === "..")
      return -Rt;
    const i = this.Search(t, e), s = this.inodes[i], r = this.inodes[t];
    return this.is_forwarder(r) ? (this.is_forwarder(s), t = r.foreign_id, this.follow_fs(r).Unlink(t, e)) : this.IsDirectory(i) && !this.IsEmpty(i) ? -Ke : (this.unlink_from_dir(t, e), s.nlinks === 0 && (s.status = Ve, this.NotifyListeners(i, "delete")), 0);
  }, x.prototype.DeleteData = async function(t) {
    const e = this.inodes[t];
    this.is_forwarder(e) ? await this.follow_fs(e).DeleteData(e.foreign_id) : (e.size = 0, delete this.inodedata[t]);
  }, x.prototype.get_buffer = async function(t) {
    const e = this.inodes[t];
    return this.inodedata[t] ? this.inodedata[t] : e.status === oe ? (e.sha256sum, await this.storage.read(e.sha256sum, 0, e.size)) : null;
  }, x.prototype.get_data = async function(t, e, i) {
    const s = this.inodes[t];
    return this.inodedata[t] ? this.inodedata[t].subarray(e, e + i) : s.status === oe ? (s.sha256sum, await this.storage.read(s.sha256sum, e, i)) : null;
  }, x.prototype.set_data = async function(t, e) {
    this.inodedata[t] = e, this.inodes[t].status === oe && (this.inodes[t].status = er, this.storage.uncache(this.inodes[t].sha256sum));
  }, x.prototype.GetInode = function(t) {
    return 0 <= t && t < this.inodes.length, t = this.inodes[t], this.is_forwarder(t) ? this.follow_fs(t).GetInode(t.foreign_id) : t;
  }, x.prototype.ChangeSize = async function(t, e) {
    var i = this.GetInode(t), s = await this.get_data(t, 0, i.size);
    if (e != i.size) {
      var r = new Uint8Array(e);
      i.size = e, s && r.set(s.subarray(0, Math.min(s.length, i.size)), 0), await this.set_data(t, r);
    }
  }, x.prototype.SearchPath = function(t) {
    t = t.replace("//", "/"), t = t.split("/"), 0 < t.length && t[t.length - 1].length === 0 && t.pop(), 0 < t.length && t[0].length === 0 && t.shift();
    const e = t.length;
    var i = -1, s = 0;
    let r = null;
    for (var _ = 0; _ < e; _++)
      if (i = s, s = this.Search(i, t[_]), !r && this.is_forwarder(this.inodes[i]) && (r = "/" + t.slice(_).join("/")), s == -1)
        return _ < e - 1 ? { id: -1, parentid: -1, name: t[_], forward_path: r } : { id: -1, parentid: i, name: t[_], forward_path: r };
    return { id: s, parentid: i, name: t[_], forward_path: r };
  }, x.prototype.GetRecursiveList = function(t, e) {
    if (this.is_forwarder(this.inodes[t])) {
      const i = this.follow_fs(this.inodes[t]), s = this.inodes[t].mount_id, r = e.length;
      for (i.GetRecursiveList(this.inodes[t].foreign_id, e), t = r; t < e.length; t++)
        e[t].parentid = this.get_forwarder(s, e[t].parentid);
    } else
      for (const [i, s] of this.inodes[t].direntries)
        i !== "." && i !== ".." && (e.push({ parentid: t, name: i }), this.IsDirectory(s) && this.GetRecursiveList(s, e));
  }, x.prototype.RecursiveDelete = function(t) {
    var e = [];
    if (t = this.SearchPath(t), t.id !== -1)
      for (this.GetRecursiveList(t.id, e), t = e.length - 1; 0 <= t; t--) {
        const i = this.Unlink(e[t].parentid, e[t].name);
        "" + e[t].parentid + e[t].name + -i;
      }
  }, x.prototype.DeleteNode = function(t) {
    var e = this.SearchPath(t);
    e.id != -1 && ((this.inodes[e.id].mode & pt) == ne ? (t = this.Unlink(e.parentid, e.name), void 0) : (this.inodes[e.id].mode & pt) == bt && (this.RecursiveDelete(t), t = this.Unlink(e.parentid, e.name), void 0));
  }, x.prototype.NotifyListeners = function(t, e, i) {
  }, x.prototype.Check = function() {
    for (var t = 1; t < this.inodes.length; t++)
      if (this.inodes[t].status != ki) {
        var e = this.GetInode(t);
        if (0 > e.nlinks && B.Debug(
          "Error in filesystem: negative nlinks=" + e.nlinks + " at id =" + t
        ), this.IsDirectory(t)) {
          e = this.GetInode(t), this.IsDirectory(t) && 0 > this.GetParent(t) && B.Debug(
            "Error in filesystem: negative parent id " + t
          );
          for (const [i, s] of e.direntries) {
            i.length === 0 && B.Debug(
              "Error in filesystem: inode with no name and id " + s
            );
            for (const r of i)
              32 > r && B.Debug(
                "Error in filesystem: Unallowed char in filename"
              );
          }
        }
      }
  }, x.prototype.FillDirectory = function(t) {
    var e = this.inodes[t];
    if (this.is_forwarder(e))
      this.follow_fs(e).FillDirectory(e.foreign_id);
    else {
      var i = 0;
      for (const s of e.direntries.keys())
        i += 24 + Ei.UTF8Length(s);
      t = this.inodedata[t] = new Uint8Array(i), e.size = i, i = 0;
      for (const [s, r] of e.direntries)
        e = this.GetInode(r), i += P.Marshall(
          ["Q", "d", "b", "s"],
          [
            e.qid,
            i + 13 + 8 + 1 + 2 + Ei.UTF8Length(s),
            e.mode >> 12,
            s
          ],
          t,
          i
        );
    }
  }, x.prototype.RoundToDirentry = function(t, e) {
    const i = this.inodedata[t];
    if (i.length, e >= i.length)
      return i.length;
    for (t = 0; ; ) {
      const s = P.Unmarshall(["Q", "d"], i, { offset: t })[1];
      if (s > e)
        break;
      t = s;
    }
    return t;
  }, x.prototype.IsDirectory = function(t) {
    return t = this.inodes[t], this.is_forwarder(t) ? this.follow_fs(t).IsDirectory(t.foreign_id) : (t.mode & pt) === bt;
  }, x.prototype.IsEmpty = function(t) {
    if (t = this.inodes[t], this.is_forwarder(t))
      return this.follow_fs(t).IsDirectory(t.foreign_id);
    for (const e of t.direntries.keys())
      if (e !== "." && e !== "..")
        return !1;
    return !0;
  }, x.prototype.GetChildren = function(t) {
    if (this.IsDirectory(t), t = this.inodes[t], this.is_forwarder(t))
      return this.follow_fs(t).GetChildren(t.foreign_id);
    const e = [];
    for (const i of t.direntries.keys())
      i !== "." && i !== ".." && e.push(i);
    return e;
  }, x.prototype.GetParent = function(t) {
    if (this.IsDirectory(t), t = this.inodes[t], this.should_be_linked(t))
      return t.direntries.get("..");
    const e = this.follow_fs(t).GetParent(t.foreign_id);
    return this.get_forwarder(t.mount_id, e);
  }, x.prototype.PrepareCAPs = function(t) {
    return t = this.GetInode(t), t.caps || (t.caps = new Uint8Array(20), t.caps[0] = 0, t.caps[1] = 0, t.caps[2] = 0, t.caps[3] = 2, t.caps[4] = 255, t.caps[5] = 255, t.caps[6] = 255, t.caps[7] = 255, t.caps[8] = 255, t.caps[9] = 255, t.caps[10] = 255, t.caps[11] = 255, t.caps[12] = 63, t.caps[13] = 0, t.caps[14] = 0, t.caps[15] = 0, t.caps[16] = 63, t.caps[17] = 0, t.caps[18] = 0, t.caps[19] = 0), t.caps.length;
  };
  function Ai(t) {
    this.fs = t, this.backtrack = /* @__PURE__ */ new Map();
  }
  Ai.prototype.get_state = function() {
    const t = [];
    return t[0] = this.fs, t[1] = [...this.backtrack], t;
  }, Ai.prototype.set_state = function(t) {
    this.fs = t[0], this.backtrack = new Map(t[1]);
  }, x.prototype.set_forwarder = function(t, e, i) {
    const s = this.inodes[t];
    s.nlinks, this.is_forwarder(s) && this.mounts[s.mount_id].backtrack.delete(s.foreign_id), s.status = ir, s.mount_id = e, s.foreign_id = i, this.mounts[e].backtrack.set(i, t);
  }, x.prototype.create_forwarder = function(t, e) {
    const i = this.CreateInode(), s = this.inodes.length;
    return this.inodes.push(i), i.fid = s, this.set_forwarder(s, t, e), s;
  }, x.prototype.is_forwarder = function(t) {
    return t.status === ir;
  }, x.prototype.is_a_root = function(t) {
    return this.GetInode(t).fid === 0;
  }, x.prototype.get_forwarder = function(t, e) {
    var i = this.mounts[t];
    return i = i.backtrack.get(e), i === void 0 ? this.create_forwarder(t, e) : i;
  }, x.prototype.delete_forwarder = function(t) {
    this.is_forwarder(t), t.status = ki, this.mounts[t.mount_id].backtrack.delete(t.foreign_id);
  }, x.prototype.follow_fs = function(t) {
    const e = this.mounts[t.mount_id];
    return this.is_forwarder(t), "" + t.fid, e.fs;
  }, x.prototype.Mount = function(t, e) {
    e.qidcounter, this.qidcounter;
    var i = this.SearchPath(t);
    return i.parentid === -1 ? (n(
      "Mount failed: parent for path not found: " + t,
      Gt
    ), -Ht) : i.id !== -1 ? (n(
      "Mount failed: file already exists at path: " + t,
      Gt
    ), -Ri) : i.forward_path ? (t = this.inodes[i.parentid], i = this.follow_fs(t).Mount(i.forward_path, e), 0 > i ? i : this.get_forwarder(t.mount_id, i)) : (t = this.mounts.length, this.mounts.push(new Ai(e)), e = this.create_forwarder(t, 0), this.link_under_dir(i.parentid, e, i.name), e);
  };
  function Dt() {
    this.type = Zt, this.start = 0, this.length = 1 / 0, this.proc_id = -1, this.client_id = "";
  }
  Dt.prototype.get_state = function() {
    const t = [];
    return t[0] = this.type, t[1] = this.start, t[2] = this.length === 1 / 0 ? 0 : this.length, t[3] = this.proc_id, t[4] = this.client_id, t;
  }, Dt.prototype.set_state = function(t) {
    this.type = t[0], this.start = t[1], this.length = t[2] === 0 ? 1 / 0 : t[2], this.proc_id = t[3], this.client_id = t[4];
  }, Dt.prototype.clone = function() {
    const t = new Dt();
    return t.set_state(this.get_state()), t;
  }, Dt.prototype.conflicts_with = function(t) {
    return !(this.proc_id === t.proc_id && this.client_id === t.client_id || this.type === Zt || t.type === Zt || this.type !== Ye && t.type !== Ye || this.start + this.length <= t.start || t.start + t.length <= this.start);
  }, Dt.prototype.is_alike = function(t) {
    return t.proc_id === this.proc_id && t.client_id === this.client_id && t.type === this.type;
  }, Dt.prototype.may_merge_after = function(t) {
    return this.is_alike(t) && t.start + t.length === this.start;
  }, x.prototype.DescribeLock = function(t, e, i, s, r) {
    const _ = new Dt();
    return _.type = t, _.start = e, _.length = i, _.proc_id = s, _.client_id = r, _;
  }, x.prototype.GetLock = function(t, e) {
    if (t = this.inodes[t], this.is_forwarder(t)) {
      var i = t.foreign_id;
      return this.follow_fs(t).GetLock(i, e);
    }
    for (i of t.locks)
      if (e.conflicts_with(i))
        return i.clone();
    return null;
  }, x.prototype.Lock = function(t, e, i) {
    const s = this.inodes[t];
    if (this.is_forwarder(s))
      return t = s.foreign_id, this.follow_fs(s).Lock(t, e, i);
    if (e = e.clone(), e.type !== Zt && this.GetLock(t, e))
      return Lr;
    for (i = 0; i < s.locks.length; i++) {
      if (t = s.locks[i], 0 < t.length, "" + t.length, t.type === Mr || t.type, "" + t.type, !s.locks[i - 1] || s.locks[i - 1].start <= t.start, t.start + t.length <= e.start)
        continue;
      if (e.start + e.length <= t.start)
        break;
      if (t.proc_id !== e.proc_id || t.client_id !== e.client_id) {
        t.conflicts_with(e);
        continue;
      }
      var r = e.start + e.length;
      const _ = e.start - t.start, o = t.start + t.length - r;
      if (0 < _ && 0 < o && t.type === e.type)
        return Oi;
      if (0 < _ && (t.length = _), 0 >= _ && 0 < o)
        t.start = r, t.length = o;
      else if (0 < o) {
        for (; i < s.locks.length && s.locks[i].start < r; )
          i++;
        s.locks.splice(
          i,
          0,
          this.DescribeLock(t.type, r, o, t.proc_id, t.client_id)
        );
      } else
        0 >= _ && (s.locks.splice(i, 1), i--);
    }
    if (e.type !== Zt) {
      for (i = e, t = !1, r = 0; r < s.locks.length && (i.may_merge_after(s.locks[r]) && (s.locks[r].length += e.length, i = s.locks[r], t = !0), !(e.start <= s.locks[r].start)); r++)
        ;
      for (t || (s.locks.splice(r, 0, i), r++); r < s.locks.length; r++)
        if (s.locks[r].is_alike(i)) {
          s.locks[r].may_merge_after(i) && (i.length += s.locks[r].length, s.locks.splice(r, 1));
          break;
        }
    }
    return Oi;
  }, x.prototype.read_dir = function(t) {
    if (t = this.SearchPath(t), t.id !== -1)
      return t = this.GetInode(t.id), Array.from(t.direntries.keys()).filter(
        (e) => e !== "." && e !== ".."
      );
  }, x.prototype.read_file = function(t) {
    if (t = this.SearchPath(t), t.id === -1)
      return Promise.resolve(null);
    const e = this.GetInode(t.id);
    return this.Read(t.id, 0, e.size);
  };
  function i_(t) {
    return h(t);
  }
  var B = {
    Debug: function(t) {
      n([].slice.apply(arguments).join(" "), Gt);
    },
    Abort: function() {
    }
  }, P = {
    Marshall: function(t, e, i, s) {
      for (var r, _ = 0, o = 0; o < t.length; o++)
        switch (r = e[o], t[o]) {
          case "w":
            i[s++] = r & 255, i[s++] = r >> 8 & 255, i[s++] = r >> 16 & 255, i[s++] = r >> 24 & 255, _ += 4;
            break;
          case "d":
            i[s++] = r & 255, i[s++] = r >> 8 & 255, i[s++] = r >> 16 & 255, i[s++] = r >> 24 & 255, i[s++] = 0, i[s++] = 0, i[s++] = 0, i[s++] = 0, _ += 8;
            break;
          case "h":
            i[s++] = r & 255, i[s++] = r >> 8, _ += 2;
            break;
          case "b":
            i[s++] = r, _ += 1;
            break;
          case "s":
            var a = s, d = 0;
            i[s++] = 0, i[s++] = 0, _ += 2;
            for (var c of r)
              r_(c.charCodeAt(0)).forEach(
                function(u) {
                  i[s++] = u, _ += 1, d++;
                }
              );
            i[a + 0] = d & 255, i[a + 1] = d >> 8 & 255;
            break;
          case "Q":
            P.Marshall(
              ["b", "w", "d"],
              [r.type, r.version, r.path],
              i,
              s
            ), s += 13, _ += 13;
            break;
          default:
            B.Debug("Marshall: Unknown type=" + t[o]);
        }
      return _;
    },
    Unmarshall: function(t, e, i) {
      let s = i.offset;
      for (var r = [], _ = 0; _ < t.length; _++)
        switch (t[_]) {
          case "w":
            var o = e[s++];
            o += e[s++] << 8, o += e[s++] << 16, o += e[s++] << 24 >>> 0, r.push(o);
            break;
          case "d":
            o = e[s++], o += e[s++] << 8, o += e[s++] << 16, o += e[s++] << 24 >>> 0, s += 4, r.push(o);
            break;
          case "h":
            o = e[s++], r.push(o + (e[s++] << 8));
            break;
          case "b":
            r.push(e[s++]);
            break;
          case "s":
            o = e[s++], o += e[s++] << 8;
            for (var a = "", d = new s_(), c = 0; c < o; c++) {
              var u = d.Put(e[s++]);
              u != -1 && (a += String.fromCharCode(u));
            }
            r.push(a);
            break;
          case "Q":
            i.offset = s, o = P.Unmarshall(["b", "w", "d"], e, i), s = i.offset, r.push({ type: o[0], version: o[1], path: o[2] });
            break;
          default:
            B.Debug(
              "Error in Unmarshall: Unknown type=" + t[_]
            );
        }
      return i.offset = s, r;
    }
  }, Ei = {};
  function s_() {
    this.stream = new Uint8Array(5), this.ofs = 0, this.Put = function(t) {
      switch (this.stream[this.ofs] = t, this.ofs++, this.ofs) {
        case 1:
          if (128 > this.stream[0])
            return this.ofs = 0, this.stream[0];
          break;
        case 2:
          if ((this.stream[0] & 224) == 192 && (this.stream[1] & 192) == 128)
            return this.ofs = 0, (this.stream[0] & 31) << 6 | this.stream[1] & 63;
      }
      return -1;
    };
  }
  function r_(t) {
    if (128 > t)
      return [t];
    if (2048 > t)
      return [192 | t >> 6 & 31, 128 | t & 63];
  }
  Ei.UTF8Length = function(t) {
    for (var e = 0, i = 0; i < t.length; i++) {
      var s = t.charCodeAt(i);
      e += 128 > s ? 1 : 2;
    }
    return e;
  };
}).call(globalThis);
const __ = V86Starter, h_ = new Error("request for lock canceled");
var a_ = function(C, b, I, z) {
  function L(N) {
    return N instanceof I ? N : new I(function(y) {
      y(N);
    });
  }
  return new (I || (I = Promise))(function(N, y) {
    function K(V) {
      try {
        G(z.next(V));
      } catch (m) {
        y(m);
      }
    }
    function tt(V) {
      try {
        G(z.throw(V));
      } catch (m) {
        y(m);
      }
    }
    function G(V) {
      V.done ? N(V.value) : L(V.value).then(K, tt);
    }
    G((z = z.apply(C, b || [])).next());
  });
};
class d_ {
  constructor(b, I = h_) {
    this._value = b, this._cancelError = I, this._weightedQueues = [], this._weightedWaiters = [];
  }
  acquire(b = 1) {
    if (b <= 0)
      throw new Error(`invalid weight ${b}: must be positive`);
    return new Promise((I, z) => {
      this._weightedQueues[b - 1] || (this._weightedQueues[b - 1] = []), this._weightedQueues[b - 1].push({ resolve: I, reject: z }), this._dispatch();
    });
  }
  runExclusive(b, I = 1) {
    return a_(this, void 0, void 0, function* () {
      const [z, L] = yield this.acquire(I);
      try {
        return yield b(z);
      } finally {
        L();
      }
    });
  }
  waitForUnlock(b = 1) {
    if (b <= 0)
      throw new Error(`invalid weight ${b}: must be positive`);
    return new Promise((I) => {
      this._weightedWaiters[b - 1] || (this._weightedWaiters[b - 1] = []), this._weightedWaiters[b - 1].push(I), this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(b) {
    this._value = b, this._dispatch();
  }
  release(b = 1) {
    if (b <= 0)
      throw new Error(`invalid weight ${b}: must be positive`);
    this._value += b, this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((b) => b.forEach((I) => I.reject(this._cancelError))), this._weightedQueues = [];
  }
  _dispatch() {
    var b;
    for (let I = this._value; I > 0; I--) {
      const z = (b = this._weightedQueues[I - 1]) === null || b === void 0 ? void 0 : b.shift();
      if (!z)
        continue;
      const L = this._value, N = I;
      this._value -= I, I = this._value + 1, z.resolve([L, this._newReleaser(N)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(b) {
    let I = !1;
    return () => {
      I || (I = !0, this.release(b));
    };
  }
  _drainUnlockWaiters() {
    for (let b = this._value; b > 0; b--)
      this._weightedWaiters[b - 1] && (this._weightedWaiters[b - 1].forEach((I) => I()), this._weightedWaiters[b - 1] = []);
  }
}
var c_ = function(C, b, I, z) {
  function L(N) {
    return N instanceof I ? N : new I(function(y) {
      y(N);
    });
  }
  return new (I || (I = Promise))(function(N, y) {
    function K(V) {
      try {
        G(z.next(V));
      } catch (m) {
        y(m);
      }
    }
    function tt(V) {
      try {
        G(z.throw(V));
      } catch (m) {
        y(m);
      }
    }
    function G(V) {
      V.done ? N(V.value) : L(V.value).then(K, tt);
    }
    G((z = z.apply(C, b || [])).next());
  });
};
class hr {
  constructor(b) {
    this._semaphore = new d_(1, b);
  }
  acquire() {
    return c_(this, void 0, void 0, function* () {
      const [, b] = yield this._semaphore.acquire();
      return b;
    });
  }
  runExclusive(b) {
    return this._semaphore.runExclusive(() => b());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    this._semaphore.isLocked() && this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
}
class p_ {
  //private serialBuffer = ""
  constructor(b, I, z) {
    if (this.config = {
      memory_size: 64 * 1024 * 1024,
      vga_memory_size: 2 * 1024 * 1024,
      disable_mouse: !0,
      autostart: !0
    }, this.prompt = "/ # ", this.mutex = new hr(), this.mutex2 = new hr(), this.config.wasm_path = b.wasm, this.config.bios = { url: b.bios }, this.config.vga_bios = { url: b.vga_bios }, this.config.cdrom = { url: b.cdrom }, I) {
      let L = I;
      L.style.whiteSpace = "pre", L.style.fontFamily = "monospace", L.style.fontSize = "18px", L.style.lineHeight = "20px";
      let N = document.createElement("div"), y = document.createElement("canvas");
      y.style.display = "none", L.appendChild(N), L.appendChild(y), this.config.screen_container = L;
    }
    typeof z < "u" && (this.serialDiv = z), typeof b.initial_state < "u" && (this.config.initial_state = { url: b.initial_state }), console.log("constructor done");
  }
  appendToSerialDiv(b) {
  }
  async send(b) {
    this.emulator.serial0_send(b), this.appendToSerialDiv(b);
  }
  wait_for(b) {
    return new Promise((I, z) => {
      let L = "", N = (y) => {
        y !== "\r" && (L += y, this.appendToSerialDiv(y)), L.endsWith(b) && (this.emulator.remove_listener(
          "serial0-output-char",
          N
        ), I());
      };
      this.emulator.add_listener("serial0-output-char", N);
    });
  }
  git(b) {
    return this.run(`git ${b}`);
  }
  async cd(b) {
    await this.run(`cd ${b}`);
  }
  async run(b) {
    await this.mutex2.acquire();
    let I = await this.run_unsafe(b), z = await this.run_unsafe("echo $?");
    if (this.mutex2.release(), z != "0")
      throw new Error(`Command '${b}' exited with code '${z}'`);
    return I;
  }
  async script(b) {
    for (let I of b)
      await this.run(I);
  }
  // Run a command via the serial port (/dev/ttyS0) and return the output.
  run_unsafe(b, I = !1, z = !0) {
    return new Promise(async (L, N) => {
      await this.mutex.acquire();
      let y = Date.now();
      this.emulator.serial0_send(b + `
`), z || this.appendToSerialDiv(b + `
`);
      var K = "", tt = (G) => {
        if (G !== "\r" && (K += G, this.appendToSerialDiv(G)), K.endsWith(this.prompt)) {
          if (I) {
            I = !1;
            return;
          }
          this.emulator.remove_listener(
            "serial0-output-char",
            tt
          ), K = K.slice(0, -this.prompt.length), z && (K = K.slice(b.length + 1)), K.endsWith(`
`) && (K = K.slice(0, -1));
          let m = Date.now() - y;
          this.appendToSerialDiv(`(${m} ms) `), this.serialDiv !== void 0 && (this.serialDiv.scrollTop = this.serialDiv.scrollHeight), L(K), this.mutex.release();
        }
      };
      this.emulator.add_listener("serial0-output-char", tt);
    });
  }
  boot() {
    return new Promise((b, I) => {
      console.log("booting"), console.log(this.config), this.emulator = new __(this.config);
      var z = setInterval(async () => {
        this.emulator.is_running() && (clearInterval(z), this.prompt = "WEB_SHELL_PROMPT> ", await this.run_unsafe(
          `export PS1='${this.prompt}'`,
          !0,
          !0
        ), await this.run_unsafe("stty cols 1000", !1, !0), await this.run_unsafe("export HOME=/root"), b());
      }, 100);
    });
  }
  type(b) {
    this.emulator.keyboard_send_text(b);
  }
  async putFile(b, I) {
    let z = I.join(`
`).replace(/'/g, "'\\''");
    await this.run(`echo '${z}' > ${b}`);
  }
  setKeyboardActive(b) {
    this.emulator.keyboard_set_status(b);
  }
}
export {
  p_ as default
};
