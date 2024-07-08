import './style.css';
import { getCurrentInstance as Ti, defineComponent as kn, inject as zi, ref as A, computed as Yt, watch as Y, onBeforeUnmount as Rn, onMounted as Hn, useSlots as _i, openBlock as $e, createElementBlock as Be, normalizeClass as an, normalizeStyle as Le, renderSlot as $n, createCommentVNode as Ci, provide as Mi, onBeforeMount as Di, nextTick as Tt, withDirectives as Pi, createVNode as Oi, vShow as Ai } from "vue";
function ki(e) {
  let t = 0, n;
  for (let i = 0, o = e.length; i < o; i++)
    n = e[i].y + e[i].h, n > t && (t = n);
  return t;
}
function We(e) {
  const t = Array(e.length);
  for (let n = 0, i = e.length; n < i; n++)
    t[n] = Ri(e[n]);
  return t;
}
function Ri(e) {
  return JSON.parse(JSON.stringify(e));
}
function Bn(e, t) {
  return !(e === t || e.x + e.w <= t.x || e.x >= t.x + t.w || e.y + e.h <= t.y || e.y >= t.y + t.h);
}
function qt(e, t, n) {
  const i = Wn(e), o = Fn(e), r = Array(e.length);
  for (let a = 0, s = o.length; a < s; a++) {
    let c = o[a];
    c.static || (c = Hi(i, c, t, n), i.push(c)), r[e.indexOf(c)] = c, c.moved = !1;
  }
  return r;
}
function Hi(e, t, n, i) {
  if (n)
    for (; t.y > 0 && !ne(e, t); )
      t.y--;
  else if (i) {
    const r = i[t.i].y;
    for (; t.y > r && !ne(e, t); )
      t.y--;
  }
  let o;
  for (; o = ne(e, t); )
    t.y = o.y + o.h;
  return t;
}
function $i(e, t) {
  const n = Wn(e);
  for (let i = 0, o = e.length; i < o; i++) {
    const r = e[i];
    if (r.x + r.w > t.cols && (r.x = t.cols - r.w), r.x < 0 && (r.x = 0, r.w = t.cols), !r.static)
      n.push(r);
    else
      for (; ne(n, r); )
        r.y++;
  }
  return e;
}
function ln(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (e[n].i === t)
      return e[n];
}
function ne(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (Bn(e[n], t))
      return e[n];
}
function Ln(e, t) {
  return e.filter((n) => Bn(n, t));
}
function Wn(e) {
  return e.filter((t) => t.static);
}
function Fe(e, t, n, i, o, r) {
  if (t.static)
    return e;
  const a = t.x, s = t.y, c = i && t.y > i;
  typeof n == "number" && (t.x = n), typeof i == "number" && (t.y = i), t.moved = !0;
  let l = Fn(e);
  c && (l = l.reverse());
  const u = Ln(l, t);
  if (r && u.length)
    return t.x = a, t.y = s, t.moved = !1, e;
  for (let f = 0, h = u.length; f < h; f++) {
    const m = u[f];
    m.moved || t.y > m.y && t.y - m.y > m.h / 4 || (m.static ? e = cn(e, m, t, o) : e = cn(e, t, m, o));
  }
  return e;
}
function cn(e, t, n, i) {
  if (i) {
    const r = {
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
      i: "-1"
    };
    if (r.y = Math.max(t.y - n.h, 0), !ne(e, r))
      return Fe(e, n, void 0, r.y, !1);
  }
  return Fe(e, n, void 0, n.y + 1, !1);
}
function Bi(e, t, n, i) {
  const o = "translate3d(" + t + "px," + e + "px, 0)";
  return {
    transform: o,
    WebkitTransform: o,
    MozTransform: o,
    msTransform: o,
    OTransform: o,
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Li(e, t, n, i) {
  const o = "translate3d(" + t * -1 + "px," + e + "px, 0)";
  return {
    transform: o,
    WebkitTransform: o,
    MozTransform: o,
    msTransform: o,
    OTransform: o,
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Wi(e, t, n, i) {
  return {
    top: e + "px",
    left: t + "px",
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Fi(e, t, n, i) {
  return {
    top: e + "px",
    right: t + "px",
    width: n + "px",
    height: i + "px",
    position: "absolute"
  };
}
function Fn(e) {
  return [].concat(e).sort(function(n, i) {
    return n.y === i.y && n.x === i.x ? 0 : n.y > i.y || n.y === i.y && n.x > i.x ? 1 : -1;
  });
}
function Ni(e, t) {
  t = t || "Layout";
  const n = ["x", "y", "w", "h"], i = [];
  if (!Array.isArray(e))
    throw new Error(t + " must be an array!");
  for (let o = 0, r = e.length; o < r; o++) {
    const a = e[o];
    for (let s = 0; s < n.length; s++)
      if (typeof a[n[s]] != "number")
        throw new Error(
          "VueGridLayout: " + t + "[" + o + "]." + n[s] + " must be a number!"
        );
    if (a.i === void 0 || a.i === null)
      throw new Error("VueGridLayout: " + t + "[" + o + "].i cannot be null!");
    if (typeof a.i != "number" && typeof a.i != "string")
      throw new Error("VueGridLayout: " + t + "[" + o + "].i must be a string or number!");
    if (i.indexOf(a.i) >= 0)
      throw new Error("VueGridLayout: " + t + "[" + o + "].i must be unique!");
    if (i.push(a.i), a.static !== void 0 && typeof a.static != "boolean")
      throw new Error("VueGridLayout: " + t + "[" + o + "].static must be a boolean!");
  }
}
function un(e) {
  return ji(e);
}
function ji(e) {
  const t = e.target, n = t.offsetParent || document.body, i = t.offsetParent === document.body ? { left: 0, top: 0 } : n.getBoundingClientRect(), o = e.clientX + n.scrollLeft - i.left, r = e.clientY + n.scrollTop - i.top;
  return { x: o, y: r };
}
function fn(e, t, n, i) {
  return Xi(e) ? {
    deltaX: n - e,
    deltaY: i - t,
    lastX: e,
    lastY: t,
    x: n,
    y: i
  } : {
    deltaX: 0,
    deltaY: 0,
    lastX: n,
    lastY: i,
    x: n,
    y: i
  };
}
function Xi(e) {
  return typeof e == "number" && !isNaN(e);
}
function Yi(e, t) {
  const n = Nn(e);
  let i = n[0];
  for (let o = 1, r = n.length; o < r; o++) {
    const a = n[o];
    t > e[a] && (i = a);
  }
  return i;
}
function Ne(e, t) {
  if (!t[e])
    throw new Error(
      "ResponsiveGridLayout: `cols` entry for breakpoint " + e + " is missing!"
    );
  return t[e];
}
function Gi(e, t, n, i, o, r, a) {
  if (t[i])
    return We(t[i]);
  let s = e;
  const c = Nn(n), l = c.slice(c.indexOf(i));
  for (let u = 0, f = l.length; u < f; u++) {
    const h = l[u];
    if (t[h]) {
      s = t[h];
      break;
    }
  }
  return s = We(s || []), qt($i(s, { cols: r }), a);
}
function Nn(e) {
  return Object.keys(e).sort(function(n, i) {
    return e[n] - e[i];
  });
}
let qi = "auto";
function Ui() {
  return typeof document < "u";
}
function jn() {
  return typeof window < "u";
}
function dn() {
  return Ui() ? typeof document.dir < "u" ? document.dir : document.getElementsByTagName("html")[0].getAttribute("dir") || "auto" : qi;
}
function Vi(e, t) {
  return jn ? (window.addEventListener(e, t), !0) : (t(), !1);
}
function Ki(e, t) {
  !jn || window.removeEventListener(e, t);
}
const K = {
  init: Ji,
  document: null,
  DocumentFragment: null,
  SVGElement: null,
  SVGSVGElement: null,
  SVGElementInstance: null,
  Element: null,
  HTMLElement: null,
  Event: null,
  Touch: null,
  PointerEvent: null
};
function Gt() {
}
function Ji(e) {
  const t = e;
  K.document = t.document, K.DocumentFragment = t.DocumentFragment || Gt, K.SVGElement = t.SVGElement || Gt, K.SVGSVGElement = t.SVGSVGElement || Gt, K.SVGElementInstance = t.SVGElementInstance || Gt, K.Element = t.Element || Gt, K.HTMLElement = t.HTMLElement || K.Element, K.Event = t.Event, K.Touch = t.Touch || Gt, K.PointerEvent = t.PointerEvent || t.MSPointerEvent;
}
var Xn = (e) => !!(e && e.Window) && e instanceof e.Window;
let Yn, At;
function Gn(e) {
  Yn = e;
  const t = e.document.createTextNode("");
  t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), At = e;
}
typeof window < "u" && !!window && Gn(window);
function Ft(e) {
  return Xn(e) ? e : (e.ownerDocument || e).defaultView || At.window;
}
const Zi = (e) => e === At || Xn(e), Qi = (e) => Se(e) && e.nodeType === 11, Se = (e) => !!e && typeof e == "object", qn = (e) => typeof e == "function", to = (e) => typeof e == "number", eo = (e) => typeof e == "boolean", no = (e) => typeof e == "string", io = (e) => {
  if (!e || typeof e != "object")
    return !1;
  const t = Ft(e) || At;
  return /object|function/.test(typeof Element) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
}, oo = (e) => Se(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString()), ro = (e) => Se(e) && typeof e.length < "u" && qn(e.splice);
var g = {
  window: Zi,
  docFrag: Qi,
  object: Se,
  func: qn,
  number: to,
  bool: eo,
  string: no,
  element: io,
  plainObject: oo,
  array: ro
};
const Q = {
  init: so,
  supportsTouch: null,
  supportsPointerEvent: null,
  isIOS7: null,
  isIOS: null,
  isIe9: null,
  isOperaMobile: null,
  prefixedMatchesSelector: null,
  pEventTypes: null,
  wheelEvent: null
};
function so(e) {
  const t = K.Element, n = e.navigator || {};
  Q.supportsTouch = "ontouchstart" in e || g.func(e.DocumentTouch) && K.document instanceof e.DocumentTouch, Q.supportsPointerEvent = n.pointerEnabled !== !1 && !!K.PointerEvent, Q.isIOS = /iP(hone|od|ad)/.test(n.platform), Q.isIOS7 = /iP(hone|od|ad)/.test(n.platform) && /OS 7[^\d]/.test(n.appVersion), Q.isIe9 = /MSIE 9/.test(n.userAgent), Q.isOperaMobile = n.appName === "Opera" && Q.supportsTouch && /Presto/.test(n.userAgent), Q.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", Q.pEventTypes = Q.supportsPointerEvent ? K.PointerEvent === e.MSPointerEvent ? {
    up: "MSPointerUp",
    down: "MSPointerDown",
    over: "mouseover",
    out: "mouseout",
    move: "MSPointerMove",
    cancel: "MSPointerCancel"
  } : {
    up: "pointerup",
    down: "pointerdown",
    over: "pointerover",
    out: "pointerout",
    move: "pointermove",
    cancel: "pointercancel"
  } : null, Q.wheelEvent = K.document && "onmousewheel" in K.document ? "mousewheel" : "wheel";
}
function Lt(e, t) {
  if (e.contains)
    return e.contains(t);
  for (; t; ) {
    if (t === e)
      return !0;
    t = t.parentNode;
  }
  return !1;
}
function Un(e, t) {
  for (; g.element(e); ) {
    if (Nt(e, t))
      return e;
    e = kt(e);
  }
  return null;
}
function kt(e) {
  let t = e.parentNode;
  if (g.docFrag(t)) {
    for (; (t = t.host) && g.docFrag(t); )
      ;
    return t;
  }
  return t;
}
function Nt(e, t) {
  return At !== Yn && (t = t.replace(/\/deep\//g, " ")), e[Q.prefixedMatchesSelector](t);
}
function je(e, t, n) {
  for (; g.element(e); ) {
    if (Nt(e, t))
      return !0;
    if (e = kt(e), e === n)
      return Nt(e, t);
  }
  return !1;
}
function hn(e) {
  return e.correspondingUseElement || e;
}
function ao(e) {
  return e = e || At, {
    x: e.scrollX || e.document.documentElement.scrollLeft,
    y: e.scrollY || e.document.documentElement.scrollTop
  };
}
function Ue(e) {
  const t = e instanceof K.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
  return t && {
    left: t.left,
    right: t.right,
    top: t.top,
    bottom: t.bottom,
    width: t.width || t.right - t.left,
    height: t.height || t.bottom - t.top
  };
}
function Ve(e) {
  const t = Ue(e);
  if (!Q.isIOS7 && t) {
    const n = ao(Ft(e));
    t.left += n.x, t.right += n.x, t.top += n.y, t.bottom += n.y;
  }
  return t;
}
function pn(e) {
  return g.string(e) ? (K.document.querySelector(e), !0) : !1;
}
function M(e, t) {
  for (const i in t)
    e[i] = t[i];
  return e;
}
function re(e, t) {
  let n = !1;
  return function() {
    return n || (At.console.warn(t), n = !0), e.apply(this, arguments);
  };
}
function Vn(e, t) {
  return e.name = t.name, e.axis = t.axis, e.edges = t.edges, e;
}
function lo(e) {
  const {
    Interactable: t
  } = e;
  t.prototype.getAction = function(i, o, r, a) {
    const s = co(this, o, r, a, e);
    return this.options.actionChecker ? this.options.actionChecker(i, o, s, this, a, r) : s;
  }, t.prototype.ignoreFrom = re(function(n) {
    return this._backCompatOption("ignoreFrom", n);
  }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = re(function(n) {
    return this._backCompatOption("allowFrom", n);
  }, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), t.prototype.actionChecker = fo, t.prototype.styleCursor = uo;
}
function co(e, t, n, i, o) {
  const r = e.getRect(i), a = t.buttons || {
    0: 1,
    1: 4,
    3: 8,
    4: 16
  }[t.button], s = {
    action: null,
    interactable: e,
    interaction: n,
    element: i,
    rect: r,
    buttons: a
  };
  return o.fire("auto-start:check", s), s.action;
}
function uo(e) {
  return g.bool(e) ? (this.options.styleCursor = e, this) : e === null ? (delete this.options.styleCursor, this) : this.options.styleCursor;
}
function fo(e) {
  return g.func(e) ? (this.options.actionChecker = e, this) : e === null ? (delete this.options.actionChecker, this) : this.options.actionChecker;
}
var ho = {
  id: "auto-start/interactableMethods",
  install: lo
};
function po(e) {
  const {
    interactStatic: t,
    defaults: n
  } = e;
  e.usePlugin(ho), n.base.actionChecker = null, n.base.styleCursor = !0, M(n.perAction, {
    manualStart: !1,
    max: 1 / 0,
    maxPerElement: 1,
    allowFrom: null,
    ignoreFrom: null,
    mouseButtons: 1
  }), t.maxInteractions = (i) => Qn(i, e), e.autoStart = {
    maxInteractions: 1 / 0,
    withinInteractionLimit: Ie,
    cursorElement: null
  };
}
function go(e, t) {
  let {
    interaction: n,
    pointer: i,
    event: o,
    eventTarget: r
  } = e;
  if (n.interacting())
    return;
  const a = Jn(n, i, o, r, t);
  Zn(n, a, t);
}
function vo(e, t) {
  let {
    interaction: n,
    pointer: i,
    event: o,
    eventTarget: r
  } = e;
  if (n.pointerType !== "mouse" || n.pointerIsDown || n.interacting())
    return;
  const a = Jn(n, i, o, r, t);
  Zn(n, a, t);
}
function mo(e, t) {
  const {
    interaction: n
  } = e;
  if (!n.pointerIsDown || n.interacting() || !n.pointerWasMoved || !n.prepared.name)
    return;
  t.fire("autoStart:before-start", e);
  const {
    interactable: i
  } = n, o = n.prepared.name;
  o && i && (i.options[o].manualStart || !Ie(i, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, i, n.element), ti(n, t)));
}
function yo(e, t) {
  let {
    interaction: n
  } = e;
  const {
    interactable: i
  } = n;
  i && i.options.styleCursor && Xe(n.element, "", t);
}
function Kn(e, t, n, i, o) {
  return t.testIgnoreAllow(t.options[e.name], n, i) && t.options[e.name].enabled && Ie(t, n, e, o) ? e : null;
}
function bo(e, t, n, i, o, r, a) {
  for (let s = 0, c = i.length; s < c; s++) {
    const l = i[s], u = o[s], f = l.getAction(t, n, e, u);
    if (!f)
      continue;
    const h = Kn(f, l, u, r, a);
    if (h)
      return {
        action: h,
        interactable: l,
        element: u
      };
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function Jn(e, t, n, i, o) {
  let r = [], a = [], s = i;
  function c(l) {
    r.push(l), a.push(s);
  }
  for (; g.element(s); ) {
    r = [], a = [], o.interactables.forEachMatch(s, c);
    const l = bo(e, t, n, r, a, i, o);
    if (l.action && !l.interactable.options[l.action.name].manualStart)
      return l;
    s = kt(s);
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function Zn(e, t, n) {
  let {
    action: i,
    interactable: o,
    element: r
  } = t;
  i = i || {
    name: null
  }, e.interactable = o, e.element = r, Vn(e.prepared, i), e.rect = o && i.name ? o.getRect(r) : null, ti(e, n), n.fire("autoStart:prepared", {
    interaction: e
  });
}
function Ie(e, t, n, i) {
  const o = e.options, r = o[n.name].max, a = o[n.name].maxPerElement, s = i.autoStart.maxInteractions;
  let c = 0, l = 0, u = 0;
  if (!(r && a && s))
    return !1;
  for (const f of i.interactions.list) {
    const h = f.prepared.name;
    if (!!f.interacting()) {
      if (c++, c >= s)
        return !1;
      if (f.interactable === e && (l += h === n.name ? 1 : 0, l >= r || f.element === t && (u++, h === n.name && u >= a)))
        return !1;
    }
  }
  return s > 0;
}
function Qn(e, t) {
  return g.number(e) ? (t.autoStart.maxInteractions = e, this) : t.autoStart.maxInteractions;
}
function Xe(e, t, n) {
  const {
    cursorElement: i
  } = n.autoStart;
  i && i !== e && (i.style.cursor = ""), e.ownerDocument.documentElement.style.cursor = t, e.style.cursor = t, n.autoStart.cursorElement = t ? e : null;
}
function ti(e, t) {
  const {
    interactable: n,
    element: i,
    prepared: o
  } = e;
  if (!(e.pointerType === "mouse" && n && n.options.styleCursor)) {
    t.autoStart.cursorElement && Xe(t.autoStart.cursorElement, "", t);
    return;
  }
  let r = "";
  if (o.name) {
    const a = n.options[o.name].cursorChecker;
    g.func(a) ? r = a(o, n, i, e._interacting) : r = t.actions.map[o.name].getCursor(o);
  }
  Xe(e.element, r || "", t);
}
const Ke = {
  id: "auto-start/base",
  before: ["actions"],
  install: po,
  listeners: {
    "interactions:down": go,
    "interactions:move": (e, t) => {
      vo(e, t), mo(e, t);
    },
    "interactions:stop": yo
  },
  maxInteractions: Qn,
  withinInteractionLimit: Ie,
  validateAction: Kn
};
function xo(e, t) {
  let {
    interaction: n,
    eventTarget: i,
    dx: o,
    dy: r
  } = e;
  if (n.prepared.name !== "drag")
    return;
  const a = Math.abs(o), s = Math.abs(r), c = n.interactable.options.drag, l = c.startAxis, u = a > s ? "x" : a < s ? "y" : "xy";
  if (n.prepared.axis = c.lockAxis === "start" ? u[0] : c.lockAxis, u !== "xy" && l !== "xy" && l !== u) {
    n.prepared.name = null;
    let f = i;
    const h = function(m) {
      if (m === n.interactable)
        return;
      const b = n.interactable.options.drag;
      if (!b.manualStart && m.testIgnoreAllow(b, f, i)) {
        const I = m.getAction(n.downPointer, n.downEvent, n, f);
        if (I && I.name === "drag" && wo(u, m) && Ke.validateAction(I, m, f, i, t))
          return m;
      }
    };
    for (; g.element(f); ) {
      const m = t.interactables.forEachMatch(f, h);
      if (m) {
        n.prepared.name = "drag", n.interactable = m, n.element = f;
        break;
      }
      f = kt(f);
    }
  }
}
function wo(e, t) {
  if (!t)
    return !1;
  const n = t.options.drag.startAxis;
  return e === "xy" || n === "xy" || n === e;
}
var Eo = {
  id: "auto-start/dragAxis",
  listeners: {
    "autoStart:before-start": xo
  }
};
function So(e) {
  const {
    defaults: t
  } = e;
  e.usePlugin(Ke), t.perAction.hold = 0, t.perAction.delay = 0;
}
function Pe(e) {
  const t = e.prepared && e.prepared.name;
  if (!t)
    return null;
  const n = e.interactable.options;
  return n[t].hold || n[t].delay;
}
const Io = {
  id: "auto-start/hold",
  install: So,
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.autoStartHoldTimer = null;
    },
    "autoStart:prepared": (e) => {
      let {
        interaction: t
      } = e;
      const n = Pe(t);
      n > 0 && (t.autoStartHoldTimer = setTimeout(() => {
        t.start(t.prepared, t.interactable, t.element);
      }, n));
    },
    "interactions:move": (e) => {
      let {
        interaction: t,
        duplicate: n
      } = e;
      t.autoStartHoldTimer && t.pointerWasMoved && !n && (clearTimeout(t.autoStartHoldTimer), t.autoStartHoldTimer = null);
    },
    "autoStart:before-start": (e) => {
      let {
        interaction: t
      } = e;
      Pe(t) > 0 && (t.prepared.name = null);
    }
  },
  getHoldDuration: Pe
};
var To = {
  id: "auto-start",
  install(e) {
    e.usePlugin(Ke), e.usePlugin(Io), e.usePlugin(Eo);
  }
};
const ei = (e, t) => {
  for (const n of t)
    e.push(n);
  return e;
}, ni = (e) => ei([], e), Te = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (t(e[n], n, e))
      return n;
  return -1;
}, me = (e, t) => e[Te(e, t)];
function Vt(e) {
  const t = {};
  for (const n in e) {
    const i = e[n];
    g.plainObject(i) ? t[n] = Vt(i) : g.array(i) ? t[n] = ni(i) : t[n] = i;
  }
  return t;
}
let gn = 0, zt, Bt;
function zo(e) {
  if (zt = e.requestAnimationFrame, Bt = e.cancelAnimationFrame, !zt) {
    const t = ["ms", "moz", "webkit", "o"];
    for (const n of t)
      zt = e[`${n}RequestAnimationFrame`], Bt = e[`${n}CancelAnimationFrame`] || e[`${n}CancelRequestAnimationFrame`];
  }
  zt = zt && zt.bind(e), Bt = Bt && Bt.bind(e), zt || (zt = (t) => {
    const n = Date.now(), i = Math.max(0, 16 - (n - gn)), o = e.setTimeout(() => {
      t(n + i);
    }, i);
    return gn = n + i, o;
  }, Bt = (t) => clearTimeout(t));
}
var Ut = {
  request: (e) => zt(e),
  cancel: (e) => Bt(e),
  init: zo
};
function Wt(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (o) => !0, i = arguments.length > 3 ? arguments[3] : void 0;
  if (i = i || {}, g.string(e) && e.search(" ") !== -1 && (e = vn(e)), g.array(e))
    return e.forEach((o) => Wt(o, t, n, i)), i;
  if (g.object(e) && (t = e, e = ""), g.func(t) && n(e))
    i[e] = i[e] || [], i[e].push(t);
  else if (g.array(t))
    for (const o of t)
      Wt(e, o, n, i);
  else if (g.object(t))
    for (const o in t) {
      const r = vn(o).map((a) => `${e}${a}`);
      Wt(r, t[o], n, i);
    }
  return i;
}
function vn(e) {
  return e.trim().split(/ +/);
}
function mn(e, t) {
  for (const n of t) {
    if (e.immediatePropagationStopped)
      break;
    n(e);
  }
}
class ii {
  constructor(t) {
    this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = M({}, t || {});
  }
  fire(t) {
    let n;
    const i = this.global;
    (n = this.types[t.type]) && mn(t, n), !t.propagationStopped && i && (n = i[t.type]) && mn(t, n);
  }
  on(t, n) {
    const i = Wt(t, n);
    for (t in i)
      this.types[t] = ei(this.types[t] || [], i[t]);
  }
  off(t, n) {
    const i = Wt(t, n);
    for (t in i) {
      const o = this.types[t];
      if (!(!o || !o.length))
        for (const r of i[t]) {
          const a = o.indexOf(r);
          a !== -1 && o.splice(a, 1);
        }
    }
  }
  getRect(t) {
    return null;
  }
}
const _o = ["webkit", "moz"];
function oi(e, t) {
  e.__set || (e.__set = {});
  for (const n in t)
    _o.some((i) => n.indexOf(i) === 0) || typeof e[n] != "function" && n !== "__set" && Object.defineProperty(e, n, {
      get() {
        return n in e.__set ? e.__set[n] : e.__set[n] = t[n];
      },
      set(i) {
        e.__set[n] = i;
      },
      configurable: !0
    });
  return e;
}
var ze = (e, t) => Math.sqrt(e * e + t * t);
function Oe(e, t) {
  e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
}
function Co(e, t, n) {
  e.page.x = n.page.x - t.page.x, e.page.y = n.page.y - t.page.y, e.client.x = n.client.x - t.client.x, e.client.y = n.client.y - t.client.y, e.timeStamp = n.timeStamp - t.timeStamp;
}
function Mo(e, t) {
  const n = Math.max(t.timeStamp / 1e3, 1e-3);
  e.page.x = t.page.x / n, e.page.y = t.page.y / n, e.client.x = t.client.x / n, e.client.y = t.client.y / n, e.timeStamp = n;
}
function Do(e) {
  e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
}
function ri(e) {
  return e instanceof K.Event || e instanceof K.Touch;
}
function be(e, t, n) {
  return n = n || {}, e = e || "page", n.x = t[e + "X"], n.y = t[e + "Y"], n;
}
function Po(e, t) {
  return t = t || {
    x: 0,
    y: 0
  }, Q.isOperaMobile && ri(e) ? (be("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : be("page", e, t), t;
}
function Oo(e, t) {
  return t = t || {}, Q.isOperaMobile && ri(e) ? be("screen", e, t) : be("client", e, t), t;
}
function xe(e) {
  return g.number(e.pointerId) ? e.pointerId : e.identifier;
}
function Ao(e, t, n) {
  const i = t.length > 1 ? si(t) : t[0];
  Po(i, e.page), Oo(i, e.client), e.timeStamp = n;
}
function Je(e) {
  const t = [];
  return g.array(e) ? (t[0] = e[0], t[1] = e[1]) : e.type === "touchend" ? e.touches.length === 1 ? (t[0] = e.touches[0], t[1] = e.changedTouches[0]) : e.touches.length === 0 && (t[0] = e.changedTouches[0], t[1] = e.changedTouches[1]) : (t[0] = e.touches[0], t[1] = e.touches[1]), t;
}
function si(e) {
  const t = {
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    screenX: 0,
    screenY: 0
  };
  for (const n of e)
    for (const i in t)
      t[i] += n[i];
  for (const n in t)
    t[n] /= e.length;
  return t;
}
function ko(e) {
  if (!e.length)
    return null;
  const t = Je(e), n = Math.min(t[0].pageX, t[1].pageX), i = Math.min(t[0].pageY, t[1].pageY), o = Math.max(t[0].pageX, t[1].pageX), r = Math.max(t[0].pageY, t[1].pageY);
  return {
    x: n,
    y: i,
    left: n,
    top: i,
    right: o,
    bottom: r,
    width: o - n,
    height: r - i
  };
}
function Ro(e, t) {
  const n = t + "X", i = t + "Y", o = Je(e), r = o[0][n] - o[1][n], a = o[0][i] - o[1][i];
  return ze(r, a);
}
function Ho(e, t) {
  const n = t + "X", i = t + "Y", o = Je(e), r = o[1][n] - o[0][n], a = o[1][i] - o[0][i];
  return 180 * Math.atan2(a, r) / Math.PI;
}
function $o(e) {
  return g.string(e.pointerType) ? e.pointerType : g.number(e.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][e.pointerType] : /touch/.test(e.type || "") || e instanceof K.Touch ? "touch" : "mouse";
}
function ai(e) {
  const t = g.func(e.composedPath) ? e.composedPath() : e.path;
  return [hn(t ? t[0] : e.target), hn(e.currentTarget)];
}
function Jt() {
  return {
    page: {
      x: 0,
      y: 0
    },
    client: {
      x: 0,
      y: 0
    },
    timeStamp: 0
  };
}
function Bo(e) {
  var t;
  const n = [], i = {}, o = [], r = {
    add: a,
    remove: s,
    addDelegate: c,
    removeDelegate: l,
    delegateListener: u,
    delegateUseCapture: f,
    delegatedEvents: i,
    documents: o,
    targets: n,
    supportsOptions: !1,
    supportsPassive: !1
  };
  (t = e.document) == null || t.createElement("div").addEventListener("test", null, {
    get capture() {
      return r.supportsOptions = !0;
    },
    get passive() {
      return r.supportsPassive = !0;
    }
  }), e.events = r;
  function a(h, m, b, I) {
    if (!h.addEventListener)
      return;
    const y = Zt(I);
    let z = me(n, (T) => T.eventTarget === h);
    z || (z = {
      eventTarget: h,
      events: {}
    }, n.push(z)), z.events[m] || (z.events[m] = []), me(z.events[m], (T) => T.func === b && ge(T.options, y)) || (h.addEventListener(m, b, r.supportsOptions ? y : y.capture), z.events[m].push({
      func: b,
      options: y
    }));
  }
  function s(h, m, b, I) {
    if (!h.addEventListener || !h.removeEventListener)
      return;
    const y = Te(n, (v) => v.eventTarget === h), z = n[y];
    if (!z || !z.events)
      return;
    if (m === "all") {
      for (m in z.events)
        z.events.hasOwnProperty(m) && s(h, m, "all");
      return;
    }
    let T = !1;
    const _ = z.events[m];
    if (_)
      if (b === "all") {
        for (let v = _.length - 1; v >= 0; v--) {
          const d = _[v];
          s(h, m, d.func, d.options);
        }
        return;
      } else {
        const v = Zt(I);
        for (let d = 0; d < _.length; d++) {
          const C = _[d];
          if (C.func === b && ge(C.options, v)) {
            h.removeEventListener(m, b, r.supportsOptions ? v : v.capture), _.splice(d, 1), _.length === 0 && (delete z.events[m], T = !0);
            break;
          }
        }
      }
    T && !Object.keys(z.events).length && n.splice(y, 1);
  }
  function c(h, m, b, I, y) {
    const z = Zt(y);
    if (!i[b]) {
      i[b] = [];
      for (const v of o)
        a(v, b, u), a(v, b, f, !0);
    }
    const T = i[b];
    let _ = me(T, (v) => v.selector === h && v.context === m);
    _ || (_ = {
      selector: h,
      context: m,
      listeners: []
    }, T.push(_)), _.listeners.push({
      func: I,
      options: z
    });
  }
  function l(h, m, b, I, y) {
    const z = Zt(y), T = i[b];
    let _ = !1, v;
    if (!!T)
      for (v = T.length - 1; v >= 0; v--) {
        const d = T[v];
        if (d.selector === h && d.context === m) {
          const {
            listeners: C
          } = d;
          for (let w = C.length - 1; w >= 0; w--) {
            const W = C[w];
            if (W.func === I && ge(W.options, z)) {
              C.splice(w, 1), C.length || (T.splice(v, 1), s(m, b, u), s(m, b, f, !0)), _ = !0;
              break;
            }
          }
          if (_)
            break;
        }
      }
  }
  function u(h, m) {
    const b = Zt(m), I = new Lo(h), y = i[h.type], [z] = ai(h);
    let T = z;
    for (; g.element(T); ) {
      for (let _ = 0; _ < y.length; _++) {
        const v = y[_], {
          selector: d,
          context: C
        } = v;
        if (Nt(T, d) && Lt(C, z) && Lt(C, T)) {
          const {
            listeners: w
          } = v;
          I.currentTarget = T;
          for (const W of w)
            ge(W.options, b) && W.func(I);
        }
      }
      T = kt(T);
    }
  }
  function f(h) {
    return u.call(this, h, !0);
  }
  return r;
}
class Lo {
  constructor(t) {
    this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = t, oi(this, t);
  }
  preventOriginalDefault() {
    this.originalEvent.preventDefault();
  }
  stopPropagation() {
    this.originalEvent.stopPropagation();
  }
  stopImmediatePropagation() {
    this.originalEvent.stopImmediatePropagation();
  }
}
function Zt(e) {
  return g.object(e) ? {
    capture: !!e.capture,
    passive: !!e.passive
  } : {
    capture: !!e,
    passive: !1
  };
}
function ge(e, t) {
  return e === t ? !0 : typeof e == "boolean" ? !!t.capture === e && !t.passive : !!e.capture == !!t.capture && !!e.passive == !!t.passive;
}
var Wo = {
  id: "events",
  install: Bo
};
const Fo = function(t) {
  return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t, this) : g.bool(t) ? (this.options.preventDefault = t ? "always" : "never", this) : this.options.preventDefault;
};
function No(e, t, n) {
  const i = e.options.preventDefault;
  if (i !== "never") {
    if (i === "always") {
      n.preventDefault();
      return;
    }
    if (t.events.supportsPassive && /^touch(start|move)$/.test(n.type)) {
      const o = Ft(n.target).document, r = t.getDocOptions(o);
      if (!(r && r.events) || r.events.passive !== !1)
        return;
    }
    /^(mouse|pointer|touch)*(down|start)/i.test(n.type) || g.element(n.target) && Nt(n.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n.preventDefault();
  }
}
function jo(e) {
  let {
    interaction: t,
    event: n
  } = e;
  t.interactable && t.interactable.checkAndPreventDefault(n);
}
function Xo(e) {
  const {
    Interactable: t
  } = e;
  t.prototype.preventDefault = Fo, t.prototype.checkAndPreventDefault = function(n) {
    return No(this, e, n);
  }, e.interactions.docEvents.push({
    type: "dragstart",
    listener(n) {
      for (const i of e.interactions.list)
        if (i.element && (i.element === n.target || Lt(i.element, n.target))) {
          i.interactable.checkAndPreventDefault(n);
          return;
        }
    }
  });
}
var Yo = {
  id: "core/interactablePreventDefault",
  install: Xo,
  listeners: ["down", "move", "up", "cancel"].reduce((e, t) => (e[`interactions:${t}`] = jo, e), {})
};
function li(e, t, n) {
  return e === "parent" ? kt(n) : e === "self" ? t.getRect(n) : Un(n, e);
}
function se(e, t, n, i) {
  let o = e;
  return g.string(o) ? o = li(o, t, n) : g.func(o) && (o = o(...i)), g.element(o) && (o = Ve(o)), o;
}
function _e(e) {
  return e && {
    x: "x" in e ? e.x : e.left,
    y: "y" in e ? e.y : e.top
  };
}
function Go(e) {
  return e && !("left" in e && "top" in e) && (e = M({}, e), e.left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
}
function yn(e) {
  return e && !("x" in e && "y" in e) && (e = M({}, e), e.x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
}
function Ze(e, t, n) {
  e.left && (t.left += n.x), e.right && (t.right += n.x), e.top && (t.top += n.y), e.bottom && (t.bottom += n.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
}
function Qe(e, t, n) {
  const i = n && e.options[n], r = i && i.origin || e.options.origin, a = se(r, e, t, [e && t]);
  return _e(a) || {
    x: 0,
    y: 0
  };
}
class ci {
  constructor(t) {
    this.immediatePropagationStopped = !1, this.propagationStopped = !1, this._interaction = t;
  }
  preventDefault() {
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  }
}
Object.defineProperty(ci.prototype, "interaction", {
  get() {
    return this._interaction._proxy;
  },
  set() {
  }
});
const ui = {
  base: {
    preventDefault: "auto",
    deltaSource: "page"
  },
  perAction: {
    enabled: !1,
    origin: {
      x: 0,
      y: 0
    }
  },
  actions: {}
};
class tn extends ci {
  constructor(t, n, i, o, r, a, s) {
    super(t), this.relatedTarget = null, this.screenX = void 0, this.screenY = void 0, this.button = void 0, this.buttons = void 0, this.ctrlKey = void 0, this.shiftKey = void 0, this.altKey = void 0, this.metaKey = void 0, this.page = void 0, this.client = void 0, this.delta = void 0, this.rect = void 0, this.x0 = void 0, this.y0 = void 0, this.t0 = void 0, this.dt = void 0, this.duration = void 0, this.clientX0 = void 0, this.clientY0 = void 0, this.velocity = void 0, this.speed = void 0, this.swipe = void 0, this.axes = void 0, this.preEnd = void 0, r = r || t.element;
    const c = t.interactable, l = (c && c.options || ui).deltaSource, u = Qe(c, r, i), f = o === "start", h = o === "end", m = f ? this : t.prevEvent, b = f ? t.coords.start : h ? {
      page: m.page,
      client: m.client,
      timeStamp: t.coords.cur.timeStamp
    } : t.coords.cur;
    this.page = M({}, b.page), this.client = M({}, b.client), this.rect = M({}, t.rect), this.timeStamp = b.timeStamp, h || (this.page.x -= u.x, this.page.y -= u.y, this.client.x -= u.x, this.client.y -= u.y), this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.button = n.button, this.buttons = n.buttons, this.target = r, this.currentTarget = r, this.preEnd = a, this.type = s || i + (o || ""), this.interactable = c, this.t0 = f ? t.pointers[t.pointers.length - 1].downTime : m.t0, this.x0 = t.coords.start.page.x - u.x, this.y0 = t.coords.start.page.y - u.y, this.clientX0 = t.coords.start.client.x - u.x, this.clientY0 = t.coords.start.client.y - u.y, f || h ? this.delta = {
      x: 0,
      y: 0
    } : this.delta = {
      x: this[l].x - m[l].x,
      y: this[l].y - m[l].y
    }, this.dt = t.coords.delta.timeStamp, this.duration = this.timeStamp - this.t0, this.velocity = M({}, t.coords.velocity[l]), this.speed = ze(this.velocity.x, this.velocity.y), this.swipe = h || o === "inertiastart" ? this.getSwipe() : null;
  }
  getSwipe() {
    const t = this._interaction;
    if (t.prevEvent.speed < 600 || this.timeStamp - t.prevEvent.timeStamp > 150)
      return null;
    let n = 180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX) / Math.PI;
    const i = 22.5;
    n < 0 && (n += 360);
    const o = 135 - i <= n && n < 225 + i, r = 225 - i <= n && n < 315 + i, a = !o && (315 - i <= n || n < 45 + i), s = !r && 45 - i <= n && n < 135 + i;
    return {
      up: r,
      down: s,
      left: o,
      right: a,
      angle: n,
      speed: t.prevEvent.speed,
      velocity: {
        x: t.prevEvent.velocityX,
        y: t.prevEvent.velocityY
      }
    };
  }
  preventDefault() {
  }
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
Object.defineProperties(tn.prototype, {
  pageX: {
    get() {
      return this.page.x;
    },
    set(e) {
      this.page.x = e;
    }
  },
  pageY: {
    get() {
      return this.page.y;
    },
    set(e) {
      this.page.y = e;
    }
  },
  clientX: {
    get() {
      return this.client.x;
    },
    set(e) {
      this.client.x = e;
    }
  },
  clientY: {
    get() {
      return this.client.y;
    },
    set(e) {
      this.client.y = e;
    }
  },
  dx: {
    get() {
      return this.delta.x;
    },
    set(e) {
      this.delta.x = e;
    }
  },
  dy: {
    get() {
      return this.delta.y;
    },
    set(e) {
      this.delta.y = e;
    }
  },
  velocityX: {
    get() {
      return this.velocity.x;
    },
    set(e) {
      this.velocity.x = e;
    }
  },
  velocityY: {
    get() {
      return this.velocity.y;
    },
    set(e) {
      this.velocity.y = e;
    }
  }
});
class qo {
  constructor(t, n, i, o, r) {
    this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = t, this.pointer = n, this.event = i, this.downTime = o, this.downTarget = r;
  }
}
let Uo = /* @__PURE__ */ function(e) {
  return e.interactable = "", e.element = "", e.prepared = "", e.pointerIsDown = "", e.pointerWasMoved = "", e._proxy = "", e;
}({}), Vo = /* @__PURE__ */ function(e) {
  return e.start = "", e.move = "", e.end = "", e.stop = "", e.interacting = "", e;
}({}), Ko = 0;
class Jo {
  get pointerMoveTolerance() {
    return 1;
  }
  constructor(t) {
    this.interactable = null, this.element = null, this.rect = null, this._rects = void 0, this.edges = null, this._scopeFire = void 0, this.prepared = {
      name: null,
      axis: null,
      edges: null
    }, this.pointerType = void 0, this.pointers = [], this.downEvent = null, this.downPointer = {}, this._latestPointer = {
      pointer: null,
      event: null,
      eventTarget: null
    }, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = re(function(r) {
      this.move(r);
    }, "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
      start: Jt(),
      prev: Jt(),
      cur: Jt(),
      delta: Jt(),
      velocity: Jt()
    }, this._id = Ko++;
    let {
      pointerType: n,
      scopeFire: i
    } = t;
    this._scopeFire = i, this.pointerType = n;
    const o = this;
    this._proxy = {};
    for (const r in Uo)
      Object.defineProperty(this._proxy, r, {
        get() {
          return o[r];
        }
      });
    for (const r in Vo)
      Object.defineProperty(this._proxy, r, {
        value: function() {
          return o[r](...arguments);
        }
      });
    this._scopeFire("interactions:new", {
      interaction: this
    });
  }
  pointerDown(t, n, i) {
    const o = this.updatePointer(t, n, i, !0), r = this.pointers[o];
    this._scopeFire("interactions:down", {
      pointer: t,
      event: n,
      eventTarget: i,
      pointerIndex: o,
      pointerInfo: r,
      type: "down",
      interaction: this
    });
  }
  start(t, n, i) {
    return this.interacting() || !this.pointerIsDown || this.pointers.length < (t.name === "gesture" ? 2 : 1) || !n.options[t.name].enabled ? !1 : (Vn(this.prepared, t), this.interactable = n, this.element = i, this.rect = n.getRect(i), this.edges = this.prepared.edges ? M({}, this.prepared.edges) : {
      left: !0,
      right: !0,
      top: !0,
      bottom: !0
    }, this._stopped = !1, this._interacting = this._doPhase({
      interaction: this,
      event: this.downEvent,
      phase: "start"
    }) && !this._stopped, this._interacting);
  }
  pointerMove(t, n, i) {
    !this.simulation && !(this.modification && this.modification.endResult) && this.updatePointer(t, n, i, !1);
    const o = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
    let r, a;
    this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, a = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = ze(r, a) > this.pointerMoveTolerance);
    const s = this.getPointerIndex(t), c = {
      pointer: t,
      pointerIndex: s,
      pointerInfo: this.pointers[s],
      event: n,
      type: "move",
      eventTarget: i,
      dx: r,
      dy: a,
      duplicate: o,
      interaction: this
    };
    o || Mo(this.coords.velocity, this.coords.delta), this._scopeFire("interactions:move", c), !o && !this.simulation && (this.interacting() && (c.type = null, this.move(c)), this.pointerWasMoved && Oe(this.coords.prev, this.coords.cur));
  }
  move(t) {
    (!t || !t.event) && Do(this.coords.delta), t = M({
      pointer: this._latestPointer.pointer,
      event: this._latestPointer.event,
      eventTarget: this._latestPointer.eventTarget,
      interaction: this
    }, t || {}), t.phase = "move", this._doPhase(t);
  }
  pointerUp(t, n, i, o) {
    let r = this.getPointerIndex(t);
    r === -1 && (r = this.updatePointer(t, n, i, !1));
    const a = /cancel$/i.test(n.type) ? "cancel" : "up";
    this._scopeFire(`interactions:${a}`, {
      pointer: t,
      pointerIndex: r,
      pointerInfo: this.pointers[r],
      event: n,
      eventTarget: i,
      type: a,
      curEventTarget: o,
      interaction: this
    }), this.simulation || this.end(n), this.removePointer(t, n);
  }
  documentBlur(t) {
    this.end(t), this._scopeFire("interactions:blur", {
      event: t,
      type: "blur",
      interaction: this
    });
  }
  end(t) {
    this._ending = !0, t = t || this._latestPointer.event;
    let n;
    this.interacting() && (n = this._doPhase({
      event: t,
      interaction: this,
      phase: "end"
    })), this._ending = !1, n === !0 && this.stop();
  }
  currentAction() {
    return this._interacting ? this.prepared.name : null;
  }
  interacting() {
    return this._interacting;
  }
  stop() {
    this._scopeFire("interactions:stop", {
      interaction: this
    }), this.interactable = this.element = null, this._interacting = !1, this._stopped = !0, this.prepared.name = this.prevEvent = null;
  }
  getPointerIndex(t) {
    const n = xe(t);
    return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : Te(this.pointers, (i) => i.id === n);
  }
  getPointerInfo(t) {
    return this.pointers[this.getPointerIndex(t)];
  }
  updatePointer(t, n, i, o) {
    const r = xe(t);
    let a = this.getPointerIndex(t), s = this.pointers[a];
    return o = o === !1 ? !1 : o || /(down|start)$/i.test(n.type), s ? s.pointer = t : (s = new qo(r, t, n, null, null), a = this.pointers.length, this.pointers.push(s)), Ao(this.coords.cur, this.pointers.map((c) => c.pointer), this._now()), Co(this.coords.delta, this.coords.prev, this.coords.cur), o && (this.pointerIsDown = !0, s.downTime = this.coords.cur.timeStamp, s.downTarget = i, oi(this.downPointer, t), this.interacting() || (Oe(this.coords.start, this.coords.cur), Oe(this.coords.prev, this.coords.cur), this.downEvent = n, this.pointerWasMoved = !1)), this._updateLatestPointer(t, n, i), this._scopeFire("interactions:update-pointer", {
      pointer: t,
      event: n,
      eventTarget: i,
      down: o,
      pointerInfo: s,
      pointerIndex: a,
      interaction: this
    }), a;
  }
  removePointer(t, n) {
    const i = this.getPointerIndex(t);
    if (i === -1)
      return;
    const o = this.pointers[i];
    this._scopeFire("interactions:remove-pointer", {
      pointer: t,
      event: n,
      eventTarget: null,
      pointerIndex: i,
      pointerInfo: o,
      interaction: this
    }), this.pointers.splice(i, 1), this.pointerIsDown = !1;
  }
  _updateLatestPointer(t, n, i) {
    this._latestPointer.pointer = t, this._latestPointer.event = n, this._latestPointer.eventTarget = i;
  }
  destroy() {
    this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null;
  }
  _createPreparedEvent(t, n, i, o) {
    return new tn(this, t, this.prepared.name, n, this.element, i, o);
  }
  _fireEvent(t) {
    var n;
    (n = this.interactable) == null || n.fire(t), (!this.prevEvent || t.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = t);
  }
  _doPhase(t) {
    const {
      event: n,
      phase: i,
      preEnd: o,
      type: r
    } = t, {
      rect: a
    } = this;
    if (a && i === "move" && (Ze(this.edges, a, this.coords.delta[this.interactable.options.deltaSource]), a.width = a.right - a.left, a.height = a.bottom - a.top), this._scopeFire(`interactions:before-action-${i}`, t) === !1)
      return !1;
    const c = t.iEvent = this._createPreparedEvent(n, i, o, r);
    return this._scopeFire(`interactions:action-${i}`, t), i === "start" && (this.prevEvent = c), this._fireEvent(c), this._scopeFire(`interactions:after-action-${i}`, t), !0;
  }
  _now() {
    return Date.now();
  }
}
const Ye = {
  methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
  search(e) {
    for (const t of Ye.methodOrder) {
      const n = Ye[t](e);
      if (n)
        return n;
    }
    return null;
  },
  simulationResume(e) {
    let {
      pointerType: t,
      eventType: n,
      eventTarget: i,
      scope: o
    } = e;
    if (!/down|start/i.test(n))
      return null;
    for (const r of o.interactions.list) {
      let a = i;
      if (r.simulation && r.simulation.allowResume && r.pointerType === t)
        for (; a; ) {
          if (a === r.element)
            return r;
          a = kt(a);
        }
    }
    return null;
  },
  mouseOrPen(e) {
    let {
      pointerId: t,
      pointerType: n,
      eventType: i,
      scope: o
    } = e;
    if (n !== "mouse" && n !== "pen")
      return null;
    let r;
    for (const a of o.interactions.list)
      if (a.pointerType === n) {
        if (a.simulation && !bn(a, t))
          continue;
        if (a.interacting())
          return a;
        r || (r = a);
      }
    if (r)
      return r;
    for (const a of o.interactions.list)
      if (a.pointerType === n && !(/down/i.test(i) && a.simulation))
        return a;
    return null;
  },
  hasPointer(e) {
    let {
      pointerId: t,
      scope: n
    } = e;
    for (const i of n.interactions.list)
      if (bn(i, t))
        return i;
    return null;
  },
  idle(e) {
    let {
      pointerType: t,
      scope: n
    } = e;
    for (const i of n.interactions.list) {
      if (i.pointers.length === 1) {
        const o = i.interactable;
        if (o && !(o.options.gesture && o.options.gesture.enabled))
          continue;
      } else if (i.pointers.length >= 2)
        continue;
      if (!i.interacting() && t === i.pointerType)
        return i;
    }
    return null;
  }
};
function bn(e, t) {
  return e.pointers.some((n) => {
    let {
      id: i
    } = n;
    return i === t;
  });
}
const fi = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];
function Zo(e) {
  const t = {};
  for (const r of fi)
    t[r] = di(r, e);
  const n = Q.pEventTypes;
  let i;
  K.PointerEvent ? i = [{
    type: n.down,
    listener: o
  }, {
    type: n.down,
    listener: t.pointerDown
  }, {
    type: n.move,
    listener: t.pointerMove
  }, {
    type: n.up,
    listener: t.pointerUp
  }, {
    type: n.cancel,
    listener: t.pointerUp
  }] : i = [{
    type: "mousedown",
    listener: t.pointerDown
  }, {
    type: "mousemove",
    listener: t.pointerMove
  }, {
    type: "mouseup",
    listener: t.pointerUp
  }, {
    type: "touchstart",
    listener: o
  }, {
    type: "touchstart",
    listener: t.pointerDown
  }, {
    type: "touchmove",
    listener: t.pointerMove
  }, {
    type: "touchend",
    listener: t.pointerUp
  }, {
    type: "touchcancel",
    listener: t.pointerUp
  }], i.push({
    type: "blur",
    listener(r) {
      for (const a of e.interactions.list)
        a.documentBlur(r);
    }
  }), e.prevTouchTime = 0, e.Interaction = class extends Jo {
    get pointerMoveTolerance() {
      return e.interactions.pointerMoveTolerance;
    }
    set pointerMoveTolerance(r) {
      e.interactions.pointerMoveTolerance = r;
    }
    _now() {
      return e.now();
    }
  }, e.interactions = {
    list: [],
    new(r) {
      r.scopeFire = (s, c) => e.fire(s, c);
      const a = new e.Interaction(r);
      return e.interactions.list.push(a), a;
    },
    listeners: t,
    docEvents: i,
    pointerMoveTolerance: 1
  };
  function o() {
    for (const r of e.interactions.list)
      if (!(!r.pointerIsDown || r.pointerType !== "touch" || r._interacting))
        for (const a of r.pointers)
          e.documents.some((s) => {
            let {
              doc: c
            } = s;
            return Lt(c, a.downTarget);
          }) || r.removePointer(a.pointer, a.event);
  }
  e.usePlugin(Yo);
}
function di(e, t) {
  return function(n) {
    const i = t.interactions.list, o = $o(n), [r, a] = ai(n), s = [];
    if (/^touch/.test(n.type)) {
      t.prevTouchTime = t.now();
      for (const c of n.changedTouches) {
        const l = c, u = xe(l), f = {
          pointer: l,
          pointerId: u,
          pointerType: o,
          eventType: n.type,
          eventTarget: r,
          curEventTarget: a,
          scope: t
        }, h = xn(f);
        s.push([f.pointer, f.eventTarget, f.curEventTarget, h]);
      }
    } else {
      let c = !1;
      if (!Q.supportsPointerEvent && /mouse/.test(n.type)) {
        for (let l = 0; l < i.length && !c; l++)
          c = i[l].pointerType !== "mouse" && i[l].pointerIsDown;
        c = c || t.now() - t.prevTouchTime < 500 || n.timeStamp === 0;
      }
      if (!c) {
        const l = {
          pointer: n,
          pointerId: xe(n),
          pointerType: o,
          eventType: n.type,
          curEventTarget: a,
          eventTarget: r,
          scope: t
        }, u = xn(l);
        s.push([l.pointer, l.eventTarget, l.curEventTarget, u]);
      }
    }
    for (const [c, l, u, f] of s)
      f[e](c, n, l, u);
  };
}
function xn(e) {
  const {
    pointerType: t,
    scope: n
  } = e, o = {
    interaction: Ye.search(e),
    searchDetails: e
  };
  return n.fire("interactions:find", o), o.interaction || n.interactions.new({
    pointerType: t
  });
}
function Ae(e, t) {
  let {
    doc: n,
    scope: i,
    options: o
  } = e;
  const {
    interactions: {
      docEvents: r
    },
    events: a
  } = i, s = a[t];
  i.browser.isIOS && !o.events && (o.events = {
    passive: !1
  });
  for (const l in a.delegatedEvents)
    s(n, l, a.delegateListener), s(n, l, a.delegateUseCapture, !0);
  const c = o && o.events;
  for (const {
    type: l,
    listener: u
  } of r)
    s(n, l, u, c);
}
const Qo = {
  id: "core/interactions",
  install: Zo,
  listeners: {
    "scope:add-document": (e) => Ae(e, "add"),
    "scope:remove-document": (e) => Ae(e, "remove"),
    "interactable:unset": (e, t) => {
      let {
        interactable: n
      } = e;
      for (let i = t.interactions.list.length - 1; i >= 0; i--) {
        const o = t.interactions.list[i];
        o.interactable === n && (o.stop(), t.fire("interactions:destroy", {
          interaction: o
        }), o.destroy(), t.interactions.list.length > 2 && t.interactions.list.splice(i, 1));
      }
    }
  },
  onDocSignal: Ae,
  doOnInteractions: di,
  methodNames: fi
};
function ae(e, t) {
  if (t.phaselessTypes[e])
    return !0;
  for (const n in t.map)
    if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases)
      return !0;
  return !1;
}
var Ot = /* @__PURE__ */ function(e) {
  return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
}(Ot || {});
class tr {
  get _defaults() {
    return {
      base: {},
      perAction: {},
      actions: {}
    };
  }
  constructor(t, n, i, o) {
    this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new ii(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || i, this._win = Ft(pn(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = o, this.set(n);
  }
  setOnEvents(t, n) {
    return g.func(n.onstart) && this.on(`${t}start`, n.onstart), g.func(n.onmove) && this.on(`${t}move`, n.onmove), g.func(n.onend) && this.on(`${t}end`, n.onend), g.func(n.oninertiastart) && this.on(`${t}inertiastart`, n.oninertiastart), this;
  }
  updatePerActionListeners(t, n, i) {
    var o;
    const r = (o = this._actions.map[t]) == null ? void 0 : o.filterEventType, a = (s) => (r == null || r(s)) && ae(s, this._actions);
    (g.array(n) || g.object(n)) && this._onOff(Ot.Off, t, n, void 0, a), (g.array(i) || g.object(i)) && this._onOff(Ot.On, t, i, void 0, a);
  }
  setPerAction(t, n) {
    const i = this._defaults;
    for (const o in n) {
      const r = o, a = this.options[t], s = n[r];
      r === "listeners" && this.updatePerActionListeners(t, a.listeners, s), g.array(s) ? a[r] = ni(s) : g.plainObject(s) ? (a[r] = M(a[r] || {}, Vt(s)), g.object(i.perAction[r]) && "enabled" in i.perAction[r] && (a[r].enabled = s.enabled !== !1)) : g.bool(s) && g.object(i.perAction[r]) ? a[r].enabled = s : a[r] = s;
    }
  }
  getRect(t) {
    return t = t || (g.element(this.target) ? this.target : null), g.string(this.target) && (t = t || this._context.querySelector(this.target)), Ve(t);
  }
  rectChecker(t) {
    return g.func(t) ? (this.getRect = (n) => {
      const i = M({}, t.apply(this, n));
      return "width" in i || (i.width = i.right - i.left, i.height = i.bottom - i.top), i;
    }, this) : t === null ? (delete this.getRect, this) : this.getRect;
  }
  _backCompatOption(t, n) {
    if (pn(n) || g.object(n)) {
      this.options[t] = n;
      for (const i in this._actions.map)
        this.options[i][t] = n;
      return this;
    }
    return this.options[t];
  }
  origin(t) {
    return this._backCompatOption("origin", t);
  }
  deltaSource(t) {
    return t === "page" || t === "client" ? (this.options.deltaSource = t, this) : this.options.deltaSource;
  }
  getAllElements() {
    const {
      target: t
    } = this;
    return g.string(t) ? Array.from(this._context.querySelectorAll(t)) : g.func(t) && t.getAllElements ? t.getAllElements() : g.element(t) ? [t] : [];
  }
  context() {
    return this._context;
  }
  inContext(t) {
    return this._context === t.ownerDocument || Lt(this._context, t);
  }
  testIgnoreAllow(t, n, i) {
    return !this.testIgnore(t.ignoreFrom, n, i) && this.testAllow(t.allowFrom, n, i);
  }
  testAllow(t, n, i) {
    return t ? g.element(i) ? g.string(t) ? je(i, t, n) : g.element(t) ? Lt(t, i) : !1 : !1 : !0;
  }
  testIgnore(t, n, i) {
    return !t || !g.element(i) ? !1 : g.string(t) ? je(i, t, n) : g.element(t) ? Lt(t, i) : !1;
  }
  fire(t) {
    return this.events.fire(t), this;
  }
  _onOff(t, n, i, o, r) {
    g.object(n) && !g.array(n) && (o = i, i = null);
    const a = Wt(n, i, r);
    for (let s in a) {
      s === "wheel" && (s = Q.wheelEvent);
      for (const c of a[s])
        ae(s, this._actions) ? this.events[t === Ot.On ? "on" : "off"](s, c) : g.string(this.target) ? this._scopeEvents[t === Ot.On ? "addDelegate" : "removeDelegate"](this.target, this._context, s, c, o) : this._scopeEvents[t === Ot.On ? "add" : "remove"](this.target, s, c, o);
    }
    return this;
  }
  on(t, n, i) {
    return this._onOff(Ot.On, t, n, i);
  }
  off(t, n, i) {
    return this._onOff(Ot.Off, t, n, i);
  }
  set(t) {
    const n = this._defaults;
    g.object(t) || (t = {}), this.options = Vt(n.base);
    for (const i in this._actions.methodDict) {
      const o = i, r = this._actions.methodDict[o];
      this.options[o] = {}, this.setPerAction(o, M(M({}, n.perAction), n.actions[o])), this[r](t[o]);
    }
    for (const i in t) {
      if (i === "getRect") {
        this.rectChecker(t.getRect);
        continue;
      }
      g.func(this[i]) && this[i](t[i]);
    }
    return this;
  }
  unset() {
    if (g.string(this.target))
      for (const t in this._scopeEvents.delegatedEvents) {
        const n = this._scopeEvents.delegatedEvents[t];
        for (let i = n.length - 1; i >= 0; i--) {
          const {
            selector: o,
            context: r,
            listeners: a
          } = n[i];
          o === this.target && r === this._context && n.splice(i, 1);
          for (let s = a.length - 1; s >= 0; s--)
            this._scopeEvents.removeDelegate(this.target, this._context, t, a[s][0], a[s][1]);
        }
      }
    else
      this._scopeEvents.remove(this.target, "all");
  }
}
class er {
  constructor(t) {
    this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = t, t.addListeners({
      "interactable:unset": (n) => {
        let {
          interactable: i
        } = n;
        const {
          target: o
        } = i, r = g.string(o) ? this.selectorMap[o] : o[this.scope.id], a = Te(r, (s) => s === i);
        r.splice(a, 1);
      }
    });
  }
  new(t, n) {
    n = M(n || {}, {
      actions: this.scope.actions
    });
    const i = new this.scope.Interactable(t, n, this.scope.document, this.scope.events);
    return this.scope.addDocument(i._doc), this.list.push(i), g.string(t) ? (this.selectorMap[t] || (this.selectorMap[t] = []), this.selectorMap[t].push(i)) : (i.target[this.scope.id] || Object.defineProperty(t, this.scope.id, {
      value: [],
      configurable: !0
    }), t[this.scope.id].push(i)), this.scope.fire("interactable:new", {
      target: t,
      options: n,
      interactable: i,
      win: this.scope._win
    }), i;
  }
  getExisting(t, n) {
    const i = n && n.context || this.scope.document, o = g.string(t), r = o ? this.selectorMap[t] : t[this.scope.id];
    if (!!r)
      return me(r, (a) => a._context === i && (o || a.inContext(t)));
  }
  forEachMatch(t, n) {
    for (const i of this.list) {
      let o;
      if ((g.string(i.target) ? g.element(t) && Nt(t, i.target) : t === i.target) && i.inContext(t) && (o = n(i)), o !== void 0)
        return o;
    }
  }
}
function nr(e) {
  const t = (n, i) => {
    let o = e.interactables.getExisting(n, i);
    return o || (o = e.interactables.new(n, i), o.events.global = t.globalEvents), o;
  };
  return t.getPointerAverage = si, t.getTouchBBox = ko, t.getTouchDistance = Ro, t.getTouchAngle = Ho, t.getElementRect = Ve, t.getElementClientRect = Ue, t.matchesSelector = Nt, t.closest = Un, t.globalEvents = {}, t.version = "1.10.27", t.scope = e, t.use = function(n, i) {
    return this.scope.usePlugin(n, i), this;
  }, t.isSet = function(n, i) {
    return !!this.scope.interactables.get(n, i && i.context);
  }, t.on = re(function(i, o, r) {
    if (g.string(i) && i.search(" ") !== -1 && (i = i.trim().split(/ +/)), g.array(i)) {
      for (const a of i)
        this.on(a, o, r);
      return this;
    }
    if (g.object(i)) {
      for (const a in i)
        this.on(a, i[a], o);
      return this;
    }
    return ae(i, this.scope.actions) ? this.globalEvents[i] ? this.globalEvents[i].push(o) : this.globalEvents[i] = [o] : this.scope.events.add(this.scope.document, i, o, {
      options: r
    }), this;
  }, "The interact.on() method is being deprecated"), t.off = re(function(i, o, r) {
    if (g.string(i) && i.search(" ") !== -1 && (i = i.trim().split(/ +/)), g.array(i)) {
      for (const a of i)
        this.off(a, o, r);
      return this;
    }
    if (g.object(i)) {
      for (const a in i)
        this.off(a, i[a], o);
      return this;
    }
    if (ae(i, this.scope.actions)) {
      let a;
      i in this.globalEvents && (a = this.globalEvents[i].indexOf(o)) !== -1 && this.globalEvents[i].splice(a, 1);
    } else
      this.scope.events.remove(this.scope.document, i, o, r);
    return this;
  }, "The interact.off() method is being deprecated"), t.debug = function() {
    return this.scope;
  }, t.supportsTouch = function() {
    return Q.supportsTouch;
  }, t.supportsPointerEvent = function() {
    return Q.supportsPointerEvent;
  }, t.stop = function() {
    for (const n of this.scope.interactions.list)
      n.stop();
    return this;
  }, t.pointerMoveTolerance = function(n) {
    return g.number(n) ? (this.scope.interactions.pointerMoveTolerance = n, this) : this.scope.interactions.pointerMoveTolerance;
  }, t.addDocument = function(n, i) {
    this.scope.addDocument(n, i);
  }, t.removeDocument = function(n) {
    this.scope.removeDocument(n);
  }, t;
}
class ir {
  constructor() {
    this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = Q, this.defaults = Vt(ui), this.Eventable = ii, this.actions = {
      map: {},
      phases: {
        start: !0,
        move: !0,
        end: !0
      },
      methodDict: {},
      phaselessTypes: {}
    }, this.interactStatic = nr(this), this.InteractEvent = tn, this.Interactable = void 0, this.interactables = new er(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = {
      list: [],
      map: {}
    }, this.onWindowUnload = (n) => this.removeDocument(n.target);
    const t = this;
    this.Interactable = class extends tr {
      get _defaults() {
        return t.defaults;
      }
      set(n) {
        return super.set(n), t.fire("interactable:set", {
          options: n,
          interactable: this
        }), this;
      }
      unset() {
        super.unset();
        const n = t.interactables.list.indexOf(this);
        n < 0 || (t.interactables.list.splice(n, 1), t.fire("interactable:unset", {
          interactable: this
        }));
      }
    };
  }
  addListeners(t, n) {
    this.listenerMaps.push({
      id: n,
      map: t
    });
  }
  fire(t, n) {
    for (const {
      map: {
        [t]: i
      }
    } of this.listenerMaps)
      if (!!i && i(n, this, t) === !1)
        return !1;
  }
  init(t) {
    return this.isInitialized ? this : or(this, t);
  }
  pluginIsInstalled(t) {
    const {
      id: n
    } = t;
    return n ? !!this._plugins.map[n] : this._plugins.list.indexOf(t) !== -1;
  }
  usePlugin(t, n) {
    if (!this.isInitialized)
      return this;
    if (this.pluginIsInstalled(t))
      return this;
    if (t.id && (this._plugins.map[t.id] = t), this._plugins.list.push(t), t.install && t.install(this, n), t.listeners && t.before) {
      let i = 0;
      const o = this.listenerMaps.length, r = t.before.reduce((a, s) => (a[s] = !0, a[wn(s)] = !0, a), {});
      for (; i < o; i++) {
        const a = this.listenerMaps[i].id;
        if (a && (r[a] || r[wn(a)]))
          break;
      }
      this.listenerMaps.splice(i, 0, {
        id: t.id,
        map: t.listeners
      });
    } else
      t.listeners && this.listenerMaps.push({
        id: t.id,
        map: t.listeners
      });
    return this;
  }
  addDocument(t, n) {
    if (this.getDocIndex(t) !== -1)
      return !1;
    const i = Ft(t);
    n = n ? M({}, n) : {}, this.documents.push({
      doc: t,
      options: n
    }), this.events.documents.push(t), t !== this.document && this.events.add(i, "unload", this.onWindowUnload), this.fire("scope:add-document", {
      doc: t,
      window: i,
      scope: this,
      options: n
    });
  }
  removeDocument(t) {
    const n = this.getDocIndex(t), i = Ft(t), o = this.documents[n].options;
    this.events.remove(i, "unload", this.onWindowUnload), this.documents.splice(n, 1), this.events.documents.splice(n, 1), this.fire("scope:remove-document", {
      doc: t,
      window: i,
      scope: this,
      options: o
    });
  }
  getDocIndex(t) {
    for (let n = 0; n < this.documents.length; n++)
      if (this.documents[n].doc === t)
        return n;
    return -1;
  }
  getDocOptions(t) {
    const n = this.getDocIndex(t);
    return n === -1 ? null : this.documents[n].options;
  }
  now() {
    return (this.window.Date || Date).now();
  }
}
function or(e, t) {
  return e.isInitialized = !0, g.window(t) && Gn(t), K.init(t), Q.init(t), Ut.init(t), e.window = t, e.document = t.document, e.usePlugin(Qo), e.usePlugin(Wo), e;
}
function wn(e) {
  return e && e.replace(/\/.*$/, "");
}
const hi = new ir(), Ct = hi.interactStatic, rr = typeof globalThis < "u" ? globalThis : window;
hi.init(rr);
Ct.use(To);
function sr(e) {
  const {
    defaults: t,
    actions: n
  } = e;
  e.autoScroll = O, O.now = () => e.now(), n.phaselessTypes.autoscroll = !0, t.perAction.autoScroll = O.defaults;
}
const O = {
  defaults: {
    enabled: !1,
    margin: 60,
    container: null,
    speed: 300
  },
  now: Date.now,
  interaction: null,
  i: 0,
  x: 0,
  y: 0,
  isScrolling: !1,
  prevTime: 0,
  margin: 0,
  speed: 0,
  start(e) {
    O.isScrolling = !0, Ut.cancel(O.i), e.autoScroll = O, O.interaction = e, O.prevTime = O.now(), O.i = Ut.request(O.scroll);
  },
  stop() {
    O.isScrolling = !1, O.interaction && (O.interaction.autoScroll = null), Ut.cancel(O.i);
  },
  scroll() {
    const {
      interaction: e
    } = O, {
      interactable: t,
      element: n
    } = e, i = e.prepared.name, o = t.options[i].autoScroll, r = En(o.container, t, n), a = O.now(), s = (a - O.prevTime) / 1e3, c = o.speed * s;
    if (c >= 1) {
      const l = {
        x: O.x * c,
        y: O.y * c
      };
      if (l.x || l.y) {
        const u = Sn(r);
        g.window(r) ? r.scrollBy(l.x, l.y) : r && (r.scrollLeft += l.x, r.scrollTop += l.y);
        const f = Sn(r), h = {
          x: f.x - u.x,
          y: f.y - u.y
        };
        (h.x || h.y) && t.fire({
          type: "autoscroll",
          target: n,
          interactable: t,
          delta: h,
          interaction: e,
          container: r
        });
      }
      O.prevTime = a;
    }
    O.isScrolling && (Ut.cancel(O.i), O.i = Ut.request(O.scroll));
  },
  check(e, t) {
    var n;
    return (n = e.options[t].autoScroll) == null ? void 0 : n.enabled;
  },
  onInteractionMove(e) {
    let {
      interaction: t,
      pointer: n
    } = e;
    if (!(t.interacting() && O.check(t.interactable, t.prepared.name)))
      return;
    if (t.simulation) {
      O.x = O.y = 0;
      return;
    }
    let i, o, r, a;
    const {
      interactable: s,
      element: c
    } = t, l = t.prepared.name, u = s.options[l].autoScroll, f = En(u.container, s, c);
    if (g.window(f))
      a = n.clientX < O.margin, i = n.clientY < O.margin, o = n.clientX > f.innerWidth - O.margin, r = n.clientY > f.innerHeight - O.margin;
    else {
      const h = Ue(f);
      a = n.clientX < h.left + O.margin, i = n.clientY < h.top + O.margin, o = n.clientX > h.right - O.margin, r = n.clientY > h.bottom - O.margin;
    }
    O.x = o ? 1 : a ? -1 : 0, O.y = r ? 1 : i ? -1 : 0, O.isScrolling || (O.margin = u.margin, O.speed = u.speed, O.start(t));
  }
};
function En(e, t, n) {
  return (g.string(e) ? li(e, t, n) : e) || Ft(n);
}
function Sn(e) {
  return g.window(e) && (e = window.document.body), {
    x: e.scrollLeft,
    y: e.scrollTop
  };
}
const ar = {
  id: "auto-scroll",
  install: sr,
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.autoScroll = null;
    },
    "interactions:destroy": (e) => {
      let {
        interaction: t
      } = e;
      t.autoScroll = null, O.stop(), O.interaction && (O.interaction = null);
    },
    "interactions:stop": O.stop,
    "interactions:action-move": (e) => O.onInteractionMove(e)
  }
};
Ct.use(ar);
function lr(e) {
  const {
    actions: t,
    Interactable: n,
    defaults: i
  } = e;
  n.prototype.draggable = ye.draggable, t.map.drag = ye, t.methodDict.drag = "draggable", i.actions.drag = ye.defaults;
}
function ke(e) {
  let {
    interaction: t
  } = e;
  if (t.prepared.name !== "drag")
    return;
  const n = t.prepared.axis;
  n === "x" ? (t.coords.cur.page.y = t.coords.start.page.y, t.coords.cur.client.y = t.coords.start.client.y, t.coords.velocity.client.y = 0, t.coords.velocity.page.y = 0) : n === "y" && (t.coords.cur.page.x = t.coords.start.page.x, t.coords.cur.client.x = t.coords.start.client.x, t.coords.velocity.client.x = 0, t.coords.velocity.page.x = 0);
}
function In(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "drag")
    return;
  const i = n.prepared.axis;
  if (i === "x" || i === "y") {
    const o = i === "x" ? "y" : "x";
    t.page[o] = n.coords.start.page[o], t.client[o] = n.coords.start.client[o], t.delta[o] = 0;
  }
}
const cr = function(t) {
  return g.object(t) ? (this.options.drag.enabled = t.enabled !== !1, this.setPerAction("drag", t), this.setOnEvents("drag", t), /^(xy|x|y|start)$/.test(t.lockAxis) && (this.options.drag.lockAxis = t.lockAxis), /^(xy|x|y)$/.test(t.startAxis) && (this.options.drag.startAxis = t.startAxis), this) : g.bool(t) ? (this.options.drag.enabled = t, this) : this.options.drag;
}, ye = {
  id: "actions/drag",
  install: lr,
  listeners: {
    "interactions:before-action-move": ke,
    "interactions:action-resume": ke,
    "interactions:action-move": In,
    "auto-start:check": (e) => {
      const {
        interaction: t,
        interactable: n,
        buttons: i
      } = e, o = n.options.drag;
      if (!(!(o && o.enabled) || t.pointerIsDown && /mouse|pointer/.test(t.pointerType) && (i & n.options.drag.mouseButtons) === 0))
        return e.action = {
          name: "drag",
          axis: o.lockAxis === "start" ? o.startAxis : o.lockAxis
        }, !1;
    }
  },
  draggable: cr,
  beforeMove: ke,
  move: In,
  defaults: {
    startAxis: "xy",
    lockAxis: "xy"
  },
  getCursor() {
    return "move";
  },
  filterEventType: (e) => e.search("drag") === 0
};
Ct.use(ye);
function ur(e) {
  const {
    actions: t,
    browser: n,
    Interactable: i,
    defaults: o
  } = e;
  _t.cursors = pr(n), _t.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, i.prototype.resizable = function(r) {
    return dr(this, r, e);
  }, t.map.resize = _t, t.methodDict.resize = "resizable", o.actions.resize = _t.defaults;
}
function fr(e) {
  const {
    interaction: t,
    interactable: n,
    element: i,
    rect: o,
    buttons: r
  } = e;
  if (!o)
    return;
  const a = M({}, t.coords.cur.page), s = n.options.resize;
  if (!(!(s && s.enabled) || t.pointerIsDown && /mouse|pointer/.test(t.pointerType) && (r & s.mouseButtons) === 0)) {
    if (g.object(s.edges)) {
      const c = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      };
      for (const l in c)
        c[l] = hr(l, s.edges[l], a, t._latestPointer.eventTarget, i, o, s.margin || _t.defaultMargin);
      c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
        name: "resize",
        edges: c
      });
    } else {
      const c = s.axis !== "y" && a.x > o.right - _t.defaultMargin, l = s.axis !== "x" && a.y > o.bottom - _t.defaultMargin;
      (c || l) && (e.action = {
        name: "resize",
        axes: (c ? "x" : "") + (l ? "y" : "")
      });
    }
    return e.action ? !1 : void 0;
  }
}
function dr(e, t, n) {
  return g.object(t) ? (e.options.resize.enabled = t.enabled !== !1, e.setPerAction("resize", t), e.setOnEvents("resize", t), g.string(t.axis) && /^x$|^y$|^xy$/.test(t.axis) ? e.options.resize.axis = t.axis : t.axis === null && (e.options.resize.axis = n.defaults.actions.resize.axis), g.bool(t.preserveAspectRatio) ? e.options.resize.preserveAspectRatio = t.preserveAspectRatio : g.bool(t.square) && (e.options.resize.square = t.square), e) : g.bool(t) ? (e.options.resize.enabled = t, e) : e.options.resize;
}
function hr(e, t, n, i, o, r, a) {
  if (!t)
    return !1;
  if (t === !0) {
    const s = g.number(r.width) ? r.width : r.right - r.left, c = g.number(r.height) ? r.height : r.bottom - r.top;
    if (a = Math.min(a, Math.abs((e === "left" || e === "right" ? s : c) / 2)), s < 0 && (e === "left" ? e = "right" : e === "right" && (e = "left")), c < 0 && (e === "top" ? e = "bottom" : e === "bottom" && (e = "top")), e === "left") {
      const l = s >= 0 ? r.left : r.right;
      return n.x < l + a;
    }
    if (e === "top") {
      const l = c >= 0 ? r.top : r.bottom;
      return n.y < l + a;
    }
    if (e === "right")
      return n.x > (s >= 0 ? r.right : r.left) - a;
    if (e === "bottom")
      return n.y > (c >= 0 ? r.bottom : r.top) - a;
  }
  return g.element(i) ? g.element(t) ? t === i : je(i, t, o) : !1;
}
function pr(e) {
  return e.isIe9 ? {
    x: "e-resize",
    y: "s-resize",
    xy: "se-resize",
    top: "n-resize",
    left: "w-resize",
    bottom: "s-resize",
    right: "e-resize",
    topleft: "se-resize",
    bottomright: "se-resize",
    topright: "ne-resize",
    bottomleft: "ne-resize"
  } : {
    x: "ew-resize",
    y: "ns-resize",
    xy: "nwse-resize",
    top: "ns-resize",
    left: "ew-resize",
    bottom: "ns-resize",
    right: "ew-resize",
    topleft: "nwse-resize",
    bottomright: "nwse-resize",
    topright: "nesw-resize",
    bottomleft: "nesw-resize"
  };
}
function gr(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.prepared.edges)
    return;
  const i = t, o = n.rect;
  n._rects = {
    start: M({}, o),
    corrected: M({}, o),
    previous: M({}, o),
    delta: {
      left: 0,
      right: 0,
      width: 0,
      top: 0,
      bottom: 0,
      height: 0
    }
  }, i.edges = n.prepared.edges, i.rect = n._rects.corrected, i.deltaRect = n._rects.delta;
}
function vr(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.prepared.edges)
    return;
  const i = t, r = n.interactable.options.resize.invert, a = r === "reposition" || r === "negate", s = n.rect, {
    start: c,
    corrected: l,
    delta: u,
    previous: f
  } = n._rects;
  if (M(f, l), a) {
    if (M(l, s), r === "reposition") {
      if (l.top > l.bottom) {
        const h = l.top;
        l.top = l.bottom, l.bottom = h;
      }
      if (l.left > l.right) {
        const h = l.left;
        l.left = l.right, l.right = h;
      }
    }
  } else
    l.top = Math.min(s.top, c.bottom), l.bottom = Math.max(s.bottom, c.top), l.left = Math.min(s.left, c.right), l.right = Math.max(s.right, c.left);
  l.width = l.right - l.left, l.height = l.bottom - l.top;
  for (const h in l)
    u[h] = l[h] - f[h];
  i.edges = n.prepared.edges, i.rect = l, i.deltaRect = u;
}
function mr(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.prepared.edges)
    return;
  const i = t;
  i.edges = n.prepared.edges, i.rect = n._rects.corrected, i.deltaRect = n._rects.delta;
}
function Tn(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  if (n.prepared.name !== "resize" || !n.resizeAxes)
    return;
  const i = n.interactable.options, o = t;
  i.resize.square ? (n.resizeAxes === "y" ? o.delta.x = o.delta.y : o.delta.y = o.delta.x, o.axes = "xy") : (o.axes = n.resizeAxes, n.resizeAxes === "x" ? o.delta.y = 0 : n.resizeAxes === "y" && (o.delta.x = 0));
}
const _t = {
  id: "actions/resize",
  before: ["actions/drag"],
  install: ur,
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.resizeAxes = "xy";
    },
    "interactions:action-start": (e) => {
      gr(e), Tn(e);
    },
    "interactions:action-move": (e) => {
      vr(e), Tn(e);
    },
    "interactions:action-end": mr,
    "auto-start:check": fr
  },
  defaults: {
    square: !1,
    preserveAspectRatio: !1,
    axis: "xy",
    margin: NaN,
    edges: null,
    invert: "none"
  },
  cursors: null,
  getCursor(e) {
    let {
      edges: t,
      axis: n,
      name: i
    } = e;
    const o = _t.cursors;
    let r = null;
    if (n)
      r = o[i + n];
    else if (t) {
      let a = "";
      for (const s of ["top", "bottom", "left", "right"])
        t[s] && (a += s);
      r = o[a];
    }
    return r;
  },
  filterEventType: (e) => e.search("resize") === 0,
  defaultMargin: null
};
Ct.use(_t);
var yr = () => {
}, br = () => {
}, xr = (e) => {
  const t = [["x", "y"], ["left", "top"], ["right", "bottom"], ["width", "height"]].filter((i) => {
    let [o, r] = i;
    return o in e || r in e;
  }), n = (i, o) => {
    const {
      range: r,
      limits: a = {
        left: -1 / 0,
        right: 1 / 0,
        top: -1 / 0,
        bottom: 1 / 0
      },
      offset: s = {
        x: 0,
        y: 0
      }
    } = e, c = {
      range: r,
      grid: e,
      x: null,
      y: null
    };
    for (const [l, u] of t) {
      const f = Math.round((i - s.x) / e[l]), h = Math.round((o - s.y) / e[u]);
      c[l] = Math.max(a.left, Math.min(a.right, f * e[l] + s.x)), c[u] = Math.max(a.top, Math.min(a.bottom, h * e[u] + s.y));
    }
    return c;
  };
  return n.grid = e, n.coordFields = t, n;
}, wr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  edgeTarget: yr,
  elements: br,
  grid: xr
});
const Er = {
  id: "snappers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    t.snappers = M(t.snappers || {}, wr), t.createSnapGrid = t.snappers.grid;
  }
};
class pi {
  constructor(t) {
    this.states = [], this.startOffset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = ve(), this.edges = {
      left: !1,
      right: !1,
      top: !1,
      bottom: !1
    };
  }
  start(t, n) {
    let {
      phase: i
    } = t;
    const {
      interaction: o
    } = this, r = Sr(o);
    this.prepareStates(r), this.startEdges = M({}, o.edges), this.edges = M({}, this.startEdges), this.startOffset = Ir(o.rect, n), this.startDelta = {
      x: 0,
      y: 0
    };
    const a = this.fillArg({
      phase: i,
      pageCoords: n,
      preEnd: !1
    });
    return this.result = ve(), this.startAll(a), this.result = this.setAll(a);
  }
  fillArg(t) {
    const {
      interaction: n
    } = this;
    return t.interaction = n, t.interactable = n.interactable, t.element = n.element, t.rect || (t.rect = n.rect), t.edges || (t.edges = this.startEdges), t.startOffset = this.startOffset, t;
  }
  startAll(t) {
    for (const n of this.states)
      n.methods.start && (t.state = n, n.methods.start(t));
  }
  setAll(t) {
    const {
      phase: n,
      preEnd: i,
      skipModifiers: o,
      rect: r,
      edges: a
    } = t;
    t.coords = M({}, t.pageCoords), t.rect = M({}, r), t.edges = M({}, a);
    const s = o ? this.states.slice(o) : this.states, c = ve(t.coords, t.rect);
    for (const h of s) {
      var l;
      const {
        options: m
      } = h, b = M({}, t.coords);
      let I = null;
      (l = h.methods) != null && l.set && this.shouldDo(m, i, n) && (t.state = h, I = h.methods.set(t), Ze(t.edges, t.rect, {
        x: t.coords.x - b.x,
        y: t.coords.y - b.y
      })), c.eventProps.push(I);
    }
    M(this.edges, t.edges), c.delta.x = t.coords.x - t.pageCoords.x, c.delta.y = t.coords.y - t.pageCoords.y, c.rectDelta.left = t.rect.left - r.left, c.rectDelta.right = t.rect.right - r.right, c.rectDelta.top = t.rect.top - r.top, c.rectDelta.bottom = t.rect.bottom - r.bottom;
    const u = this.result.coords, f = this.result.rect;
    if (u && f) {
      const h = c.rect.left !== f.left || c.rect.right !== f.right || c.rect.top !== f.top || c.rect.bottom !== f.bottom;
      c.changed = h || u.x !== c.coords.x || u.y !== c.coords.y;
    }
    return c;
  }
  applyToInteraction(t) {
    const {
      interaction: n
    } = this, {
      phase: i
    } = t, o = n.coords.cur, r = n.coords.start, {
      result: a,
      startDelta: s
    } = this, c = a.delta;
    i === "start" && M(this.startDelta, a.delta);
    for (const [f, h] of [[r, s], [o, c]])
      f.page.x += h.x, f.page.y += h.y, f.client.x += h.x, f.client.y += h.y;
    const {
      rectDelta: l
    } = this.result, u = t.rect || n.rect;
    u.left += l.left, u.right += l.right, u.top += l.top, u.bottom += l.bottom, u.width = u.right - u.left, u.height = u.bottom - u.top;
  }
  setAndApply(t) {
    const {
      interaction: n
    } = this, {
      phase: i,
      preEnd: o,
      skipModifiers: r
    } = t, a = this.setAll(this.fillArg({
      preEnd: o,
      phase: i,
      pageCoords: t.modifiedCoords || n.coords.cur.page
    }));
    if (this.result = a, !a.changed && (!r || r < this.states.length) && n.interacting())
      return !1;
    if (t.modifiedCoords) {
      const {
        page: s
      } = n.coords.cur, c = {
        x: t.modifiedCoords.x - s.x,
        y: t.modifiedCoords.y - s.y
      };
      a.coords.x += c.x, a.coords.y += c.y, a.delta.x += c.x, a.delta.y += c.y;
    }
    this.applyToInteraction(t);
  }
  beforeEnd(t) {
    const {
      interaction: n,
      event: i
    } = t, o = this.states;
    if (!o || !o.length)
      return;
    let r = !1;
    for (const a of o) {
      t.state = a;
      const {
        options: s,
        methods: c
      } = a, l = c.beforeEnd && c.beforeEnd(t);
      if (l)
        return this.endResult = l, !1;
      r = r || !r && this.shouldDo(s, !0, t.phase, !0);
    }
    r && n.move({
      event: i,
      preEnd: !0
    });
  }
  stop(t) {
    const {
      interaction: n
    } = t;
    if (!this.states || !this.states.length)
      return;
    const i = M({
      states: this.states,
      interactable: n.interactable,
      element: n.element,
      rect: null
    }, t);
    this.fillArg(i);
    for (const o of this.states)
      i.state = o, o.methods.stop && o.methods.stop(i);
    this.states = null, this.endResult = null;
  }
  prepareStates(t) {
    this.states = [];
    for (let n = 0; n < t.length; n++) {
      const {
        options: i,
        methods: o,
        name: r
      } = t[n];
      this.states.push({
        options: i,
        methods: o,
        index: n,
        name: r
      });
    }
    return this.states;
  }
  restoreInteractionCoords(t) {
    let {
      interaction: {
        coords: n,
        rect: i,
        modification: o
      }
    } = t;
    if (!o.result)
      return;
    const {
      startDelta: r
    } = o, {
      delta: a,
      rectDelta: s
    } = o.result, c = [[n.start, r], [n.cur, a]];
    for (const [l, u] of c)
      l.page.x -= u.x, l.page.y -= u.y, l.client.x -= u.x, l.client.y -= u.y;
    i.left -= s.left, i.right -= s.right, i.top -= s.top, i.bottom -= s.bottom;
  }
  shouldDo(t, n, i, o) {
    return !(!t || t.enabled === !1 || o && !t.endOnly || t.endOnly && !n || i === "start" && !t.setStart);
  }
  copyFrom(t) {
    this.startOffset = t.startOffset, this.startDelta = t.startDelta, this.startEdges = t.startEdges, this.edges = t.edges, this.states = t.states.map((n) => Vt(n)), this.result = ve(M({}, t.result.coords), M({}, t.result.rect));
  }
  destroy() {
    for (const t in this)
      this[t] = null;
  }
}
function ve(e, t) {
  return {
    rect: t,
    coords: e,
    delta: {
      x: 0,
      y: 0
    },
    rectDelta: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventProps: [],
    changed: !0
  };
}
function Sr(e) {
  const t = e.interactable.options[e.prepared.name], n = t.modifiers;
  return n && n.length ? n : ["snap", "snapSize", "snapEdges", "restrict", "restrictEdges", "restrictSize"].map((i) => {
    const o = t[i];
    return o && o.enabled && {
      options: o,
      methods: o._methods
    };
  }).filter((i) => !!i);
}
function Ir(e, t) {
  return e ? {
    left: t.x - e.left,
    top: t.y - e.top,
    right: e.right - t.x,
    bottom: e.bottom - t.y
  } : {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
}
function Rt(e, t) {
  const {
    defaults: n
  } = e, i = {
    start: e.start,
    set: e.set,
    beforeEnd: e.beforeEnd,
    stop: e.stop
  }, o = (r) => {
    const a = r || {};
    a.enabled = a.enabled !== !1;
    for (const c in n)
      c in a || (a[c] = n[c]);
    const s = {
      options: a,
      methods: i,
      name: t,
      enable: () => (a.enabled = !0, s),
      disable: () => (a.enabled = !1, s)
    };
    return s;
  };
  return t && typeof t == "string" && (o._defaults = n, o._methods = i), o;
}
function Re(e) {
  let {
    iEvent: t,
    interaction: n
  } = e;
  const i = n.modification.result;
  i && (t.modifiers = i.eventProps);
}
const Tr = {
  id: "modifiers/base",
  before: ["actions"],
  install: (e) => {
    e.defaults.perAction.modifiers = [];
  },
  listeners: {
    "interactions:new": (e) => {
      let {
        interaction: t
      } = e;
      t.modification = new pi(t);
    },
    "interactions:before-action-start": (e) => {
      const {
        interaction: t
      } = e, n = e.interaction.modification;
      n.start(e, t.coords.start.page), t.edges = n.edges, n.applyToInteraction(e);
    },
    "interactions:before-action-move": (e) => {
      const {
        interaction: t
      } = e, {
        modification: n
      } = t, i = n.setAndApply(e);
      return t.edges = n.edges, i;
    },
    "interactions:before-action-end": (e) => {
      const {
        interaction: t
      } = e, {
        modification: n
      } = t, i = n.beforeEnd(e);
      return t.edges = n.startEdges, i;
    },
    "interactions:action-start": Re,
    "interactions:action-move": Re,
    "interactions:action-end": Re,
    "interactions:after-action-start": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:after-action-move": (e) => e.interaction.modification.restoreInteractionCoords(e),
    "interactions:stop": (e) => e.interaction.modification.stop(e)
  }
}, zr = {
  start(e) {
    const {
      state: t,
      rect: n,
      edges: i,
      pageCoords: o
    } = e;
    let {
      ratio: r,
      enabled: a
    } = t.options;
    const {
      equalDelta: s,
      modifiers: c
    } = t.options;
    r === "preserve" && (r = n.width / n.height), t.startCoords = M({}, o), t.startRect = M({}, n), t.ratio = r, t.equalDelta = s;
    const l = t.linkedEdges = {
      top: i.top || i.left && !i.bottom,
      left: i.left || i.top && !i.right,
      bottom: i.bottom || i.right && !i.top,
      right: i.right || i.bottom && !i.left
    };
    if (t.xIsPrimaryAxis = !!(i.left || i.right), t.equalDelta) {
      const f = (l.left ? 1 : -1) * (l.top ? 1 : -1);
      t.edgeSign = {
        x: f,
        y: f
      };
    } else
      t.edgeSign = {
        x: l.left ? -1 : 1,
        y: l.top ? -1 : 1
      };
    if (a !== !1 && M(i, l), !(c != null && c.length))
      return;
    const u = new pi(e.interaction);
    u.copyFrom(e.interaction.modification), u.prepareStates(c), t.subModification = u, u.startAll({
      ...e
    });
  },
  set(e) {
    const {
      state: t,
      rect: n,
      coords: i
    } = e, {
      linkedEdges: o
    } = t, r = M({}, i), a = t.equalDelta ? _r : Cr;
    if (M(e.edges, o), a(t, t.xIsPrimaryAxis, i, n), !t.subModification)
      return null;
    const s = M({}, n);
    Ze(o, s, {
      x: i.x - r.x,
      y: i.y - r.y
    });
    const c = t.subModification.setAll({
      ...e,
      rect: s,
      edges: o,
      pageCoords: i,
      prevCoords: i,
      prevRect: s
    }), {
      delta: l
    } = c;
    if (c.changed) {
      const u = Math.abs(l.x) > Math.abs(l.y);
      a(t, u, c.coords, c.rect), M(i, c.coords);
    }
    return c.eventProps;
  },
  defaults: {
    ratio: "preserve",
    equalDelta: !1,
    modifiers: [],
    enabled: !1
  }
};
function _r(e, t, n) {
  let {
    startCoords: i,
    edgeSign: o
  } = e;
  t ? n.y = i.y + (n.x - i.x) * o.y : n.x = i.x + (n.y - i.y) * o.x;
}
function Cr(e, t, n, i) {
  let {
    startRect: o,
    startCoords: r,
    ratio: a,
    edgeSign: s
  } = e;
  if (t) {
    const c = i.width / a;
    n.y = r.y + (c - o.height) * s.y;
  } else {
    const c = i.height * a;
    n.x = r.x + (c - o.width) * s.x;
  }
}
var Mr = Rt(zr, "aspectRatio");
function Dr(e) {
  let {
    rect: t,
    startOffset: n,
    state: i,
    interaction: o,
    pageCoords: r
  } = e;
  const {
    options: a
  } = i, {
    elementRect: s
  } = a, c = M({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }, a.offset || {});
  if (t && s) {
    const l = jt(a.restriction, o, r);
    if (l) {
      const u = l.right - l.left - t.width, f = l.bottom - l.top - t.height;
      u < 0 && (c.left += u, c.right += u), f < 0 && (c.top += f, c.bottom += f);
    }
    c.left += n.left - t.width * s.left, c.top += n.top - t.height * s.top, c.right += n.right - t.width * (1 - s.right), c.bottom += n.bottom - t.height * (1 - s.bottom);
  }
  i.offset = c;
}
function Pr(e) {
  let {
    coords: t,
    interaction: n,
    state: i
  } = e;
  const {
    options: o,
    offset: r
  } = i, a = jt(o.restriction, n, t);
  if (!a)
    return;
  const s = Go(a);
  t.x = Math.max(Math.min(s.right - r.right, t.x), s.left + r.left), t.y = Math.max(Math.min(s.bottom - r.bottom, t.y), s.top + r.top);
}
function jt(e, t, n) {
  return g.func(e) ? se(e, t.interactable, t.element, [n.x, n.y, t]) : se(e, t.interactable, t.element);
}
const Or = {
  restriction: null,
  elementRect: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, we = {
  start: Dr,
  set: Pr,
  defaults: Or
};
var Ar = Rt(we, "restrict");
const gi = {
  top: 1 / 0,
  left: 1 / 0,
  bottom: -1 / 0,
  right: -1 / 0
}, vi = {
  top: -1 / 0,
  left: -1 / 0,
  bottom: 1 / 0,
  right: 1 / 0
};
function kr(e) {
  let {
    interaction: t,
    startOffset: n,
    state: i
  } = e;
  const {
    options: o
  } = i;
  let r;
  if (o) {
    const a = jt(o.offset, t, t.coords.start.page);
    r = _e(a);
  }
  r = r || {
    x: 0,
    y: 0
  }, i.offset = {
    top: r.y + n.top,
    left: r.x + n.left,
    bottom: r.y - n.bottom,
    right: r.x - n.right
  };
}
function Rr(e) {
  let {
    coords: t,
    edges: n,
    interaction: i,
    state: o
  } = e;
  const {
    offset: r,
    options: a
  } = o;
  if (!n)
    return;
  const s = M({}, t), c = jt(a.inner, i, s) || {}, l = jt(a.outer, i, s) || {};
  zn(c, gi), zn(l, vi), n.top ? t.y = Math.min(Math.max(l.top + r.top, s.y), c.top + r.top) : n.bottom && (t.y = Math.max(Math.min(l.bottom + r.bottom, s.y), c.bottom + r.bottom)), n.left ? t.x = Math.min(Math.max(l.left + r.left, s.x), c.left + r.left) : n.right && (t.x = Math.max(Math.min(l.right + r.right, s.x), c.right + r.right));
}
function zn(e, t) {
  for (const n of ["top", "left", "bottom", "right"])
    n in e || (e[n] = t[n]);
  return e;
}
const Hr = {
  inner: null,
  outer: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, ie = {
  noInner: gi,
  noOuter: vi,
  start: kr,
  set: Rr,
  defaults: Hr
};
var $r = Rt(ie, "restrictEdges");
const Br = M({
  get elementRect() {
    return {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1
    };
  },
  set elementRect(e) {
  }
}, we.defaults), Lr = {
  start: we.start,
  set: we.set,
  defaults: Br
};
var Wr = Rt(Lr, "restrictRect");
const Fr = {
  width: -1 / 0,
  height: -1 / 0
}, Nr = {
  width: 1 / 0,
  height: 1 / 0
};
function jr(e) {
  return ie.start(e);
}
function Xr(e) {
  const {
    interaction: t,
    state: n,
    rect: i,
    edges: o
  } = e, {
    options: r
  } = n;
  if (!o)
    return;
  const a = yn(jt(r.min, t, e.coords)) || Fr, s = yn(jt(r.max, t, e.coords)) || Nr;
  n.options = {
    endOnly: r.endOnly,
    inner: M({}, ie.noInner),
    outer: M({}, ie.noOuter)
  }, o.top ? (n.options.inner.top = i.bottom - a.height, n.options.outer.top = i.bottom - s.height) : o.bottom && (n.options.inner.bottom = i.top + a.height, n.options.outer.bottom = i.top + s.height), o.left ? (n.options.inner.left = i.right - a.width, n.options.outer.left = i.right - s.width) : o.right && (n.options.inner.right = i.left + a.width, n.options.outer.right = i.left + s.width), ie.set(e), n.options = r;
}
const Yr = {
  min: null,
  max: null,
  endOnly: !1,
  enabled: !1
}, Gr = {
  start: jr,
  set: Xr,
  defaults: Yr
};
var qr = Rt(Gr, "restrictSize");
function Ur(e) {
  const {
    interaction: t,
    interactable: n,
    element: i,
    rect: o,
    state: r,
    startOffset: a
  } = e, {
    options: s
  } = r, c = s.offsetWithOrigin ? Kr(e) : {
    x: 0,
    y: 0
  };
  let l;
  if (s.offset === "startCoords")
    l = {
      x: t.coords.start.page.x,
      y: t.coords.start.page.y
    };
  else {
    const f = se(s.offset, n, i, [t]);
    l = _e(f) || {
      x: 0,
      y: 0
    }, l.x += c.x, l.y += c.y;
  }
  const {
    relativePoints: u
  } = s;
  r.offsets = o && u && u.length ? u.map((f, h) => ({
    index: h,
    relativePoint: f,
    x: a.left - o.width * f.x + l.x,
    y: a.top - o.height * f.y + l.y
  })) : [{
    index: 0,
    relativePoint: null,
    x: l.x,
    y: l.y
  }];
}
function Vr(e) {
  const {
    interaction: t,
    coords: n,
    state: i
  } = e, {
    options: o,
    offsets: r
  } = i, a = Qe(t.interactable, t.element, t.prepared.name), s = M({}, n), c = [];
  o.offsetWithOrigin || (s.x -= a.x, s.y -= a.y);
  for (const u of r) {
    const f = s.x - u.x, h = s.y - u.y;
    for (let m = 0, b = o.targets.length; m < b; m++) {
      const I = o.targets[m];
      let y;
      g.func(I) ? y = I(f, h, t._proxy, u, m) : y = I, y && c.push({
        x: (g.number(y.x) ? y.x : f) + u.x,
        y: (g.number(y.y) ? y.y : h) + u.y,
        range: g.number(y.range) ? y.range : o.range,
        source: I,
        index: m,
        offset: u
      });
    }
  }
  const l = {
    target: null,
    inRange: !1,
    distance: 0,
    range: 0,
    delta: {
      x: 0,
      y: 0
    }
  };
  for (const u of c) {
    const f = u.range, h = u.x - s.x, m = u.y - s.y, b = ze(h, m);
    let I = b <= f;
    f === 1 / 0 && l.inRange && l.range !== 1 / 0 && (I = !1), (!l.target || (I ? l.inRange && f !== 1 / 0 ? b / f < l.distance / l.range : f === 1 / 0 && l.range !== 1 / 0 || b < l.distance : !l.inRange && b < l.distance)) && (l.target = u, l.distance = b, l.range = f, l.inRange = I, l.delta.x = h, l.delta.y = m);
  }
  return l.inRange && (n.x = l.target.x, n.y = l.target.y), i.closest = l, l;
}
function Kr(e) {
  const {
    element: t
  } = e.interaction;
  return _e(se(e.state.options.origin, null, null, [t])) || Qe(e.interactable, t, e.interaction.prepared.name);
}
const Jr = {
  range: 1 / 0,
  targets: null,
  offset: null,
  offsetWithOrigin: !0,
  origin: null,
  relativePoints: null,
  endOnly: !1,
  enabled: !1
}, en = {
  start: Ur,
  set: Vr,
  defaults: Jr
};
var Zr = Rt(en, "snap");
function Qr(e) {
  const {
    state: t,
    edges: n
  } = e, {
    options: i
  } = t;
  if (!n)
    return null;
  e.state = {
    options: {
      targets: null,
      relativePoints: [{
        x: n.left ? 0 : 1,
        y: n.top ? 0 : 1
      }],
      offset: i.offset || "self",
      origin: {
        x: 0,
        y: 0
      },
      range: i.range
    }
  }, t.targetFields = t.targetFields || [["width", "height"], ["x", "y"]], en.start(e), t.offsets = e.state.offsets, e.state = t;
}
function ts(e) {
  const {
    interaction: t,
    state: n,
    coords: i
  } = e, {
    options: o,
    offsets: r
  } = n, a = {
    x: i.x - r[0].x,
    y: i.y - r[0].y
  };
  n.options = M({}, o), n.options.targets = [];
  for (const c of o.targets || []) {
    let l;
    if (g.func(c) ? l = c(a.x, a.y, t) : l = c, !!l) {
      for (const [u, f] of n.targetFields)
        if (u in l || f in l) {
          l.x = l[u], l.y = l[f];
          break;
        }
      n.options.targets.push(l);
    }
  }
  const s = en.set(e);
  return n.options = o, s;
}
const es = {
  range: 1 / 0,
  targets: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Ee = {
  start: Qr,
  set: ts,
  defaults: es
};
var ns = Rt(Ee, "snapSize");
function is(e) {
  const {
    edges: t
  } = e;
  return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Ee.start(e)) : null;
}
const os = {
  start: is,
  set: Ee.set,
  defaults: M(Vt(Ee.defaults), {
    targets: void 0,
    range: void 0,
    offset: {
      x: 0,
      y: 0
    }
  })
};
var rs = Rt(os, "snapEdges");
const te = () => {
};
te._defaults = {};
var He = {
  aspectRatio: Mr,
  restrictEdges: $r,
  restrict: Ar,
  restrictRect: Wr,
  restrictSize: qr,
  snapEdges: rs,
  snap: Zr,
  snapSize: ns,
  spring: te,
  avoid: te,
  transform: te,
  rubberband: te
};
const ss = {
  id: "modifiers",
  install(e) {
    const {
      interactStatic: t
    } = e;
    e.usePlugin(Tr), e.usePlugin(Er), t.modifiers = He;
    for (const n in He) {
      const {
        _defaults: i,
        _methods: o
      } = He[n];
      i._methods = o, e.defaults.perAction[n] = i;
    }
  }
};
Ct.use(ss);
var oe = /* @__PURE__ */ function(e) {
  return e.touchAction = "touchAction", e.boxSizing = "boxSizing", e.noListeners = "noListeners", e;
}(oe || {});
const Ge = "[interact.js] ", qe = {
  touchAction: "https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",
  boxSizing: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"
};
function as(e) {
  let {
    logger: t
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    Interactable: n,
    defaults: i
  } = e;
  e.logger = t || console, i.base.devTools = {
    ignore: {}
  }, n.prototype.devTools = function(r) {
    return r ? (M(this.options.devTools, r), this) : this.options.devTools;
  };
  const {
    _onOff: o
  } = n.prototype;
  n.prototype._onOff = function(r, a, s, c, l) {
    if (g.string(this.target) || this.target.addEventListener)
      return o.call(this, r, a, s, c, l);
    g.object(a) && !g.array(a) && (c = s, s = null);
    const u = Wt(a, s, l);
    for (const f in u)
      ae(f, e.actions) || e.logger.warn(Ge + `Can't add native "${f}" event listener to target without \`addEventListener(type, listener, options)\` prop.`);
    return o.call(this, r, u, c);
  };
}
const _n = [{
  name: oe.touchAction,
  perform(e) {
    let {
      element: t
    } = e;
    return !!t && !ls(t, "touchAction", /pan-|pinch|none/);
  },
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, qe.touchAction];
  },
  text: `Consider adding CSS "touch-action: none" to this element
`
}, {
  name: oe.boxSizing,
  perform(e) {
    const {
      element: t
    } = e;
    return e.prepared.name === "resize" && t instanceof K.HTMLElement && !mi(t, "boxSizing", /border-box/);
  },
  text: 'Consider adding CSS "box-sizing: border-box" to this resizable element',
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, qe.boxSizing];
  }
}, {
  name: oe.noListeners,
  perform(e) {
    var t;
    const n = e.prepared.name;
    return !(((t = e.interactable) == null ? void 0 : t.events.types[`${n}move`]) || []).length;
  },
  getInfo(e) {
    return [e.prepared.name, e.interactable];
  },
  text: "There are no listeners set for this action"
}];
function mi(e, t, n) {
  const i = e.style[t] || At.getComputedStyle(e)[t];
  return n.test((i || "").toString());
}
function ls(e, t, n) {
  let i = e;
  for (; g.element(i); ) {
    if (mi(i, t, n))
      return !0;
    i = kt(i);
  }
  return !1;
}
const cs = "dev-tools", us = {
  id: cs,
  install: as,
  listeners: {
    "interactions:action-start": (e, t) => {
      let {
        interaction: n
      } = e;
      for (const i of _n) {
        const o = n.interactable && n.interactable.options;
        !(o && o.devTools && o.devTools.ignore[i.name]) && i.perform(n) && t.logger.warn(Ge + i.text, ...i.getInfo(n));
      }
    }
  },
  checks: _n,
  CheckName: oe,
  links: qe,
  prefix: Ge
};
Ct.use(us);
function fs() {
  const { appContext: e, proxy: t } = Ti(), n = e.config.globalProperties;
  return {
    proxy: t,
    appContext: e,
    globalProperties: n
  };
}
const ds = {
  name: "GridItem"
}, yi = /* @__PURE__ */ kn({
  ...ds,
  props: {
    isDraggable: { type: [Boolean, null], default: null },
    isResizable: { type: [Boolean, null], default: null },
    isBounded: { type: [Boolean, null], default: null },
    static: { type: Boolean, default: !1 },
    minH: { default: 1 },
    minW: { default: 1 },
    maxH: { default: 1 / 0 },
    maxW: { default: 1 / 0 },
    x: {},
    y: {},
    w: {},
    h: {},
    i: {},
    selected: { type: Boolean, default: !1 },
    selectedItems: { default: () => [] },
    dragIgnoreFrom: { default: "a, button" },
    dragAllowFrom: { default: null },
    resizeIgnoreFrom: { default: "a, button" },
    preserveAspectRatio: { type: Boolean, default: !1 },
    dragOption: { default: () => ({}) },
    resizeOption: { default: () => ({}) }
  },
  emits: ["container-resized", "resize", "resized", "move", "moved", "dragging", "dragend"],
  setup(e, { expose: t, emit: n }) {
    const { proxy: i } = fs(), o = i == null ? void 0 : i.$parent, r = zi("eventBus"), a = n, s = e, c = A({}), l = A(1), u = A(100), f = A(30), h = A([10, 10]), m = A(1 / 0), b = A(null), I = A(null), y = A(1), z = A(!0), T = A(!0), _ = A(!1), v = A(null), d = A(!1), C = A(null), w = A(NaN), W = A(NaN), it = A(NaN), F = A(NaN), J = A({}), R = A(!1), N = A(!1), E = A(!1), H = A(null), q = A(null), st = A(null), tt = A(null), G = A(s.x), D = A(s.y), et = A(s.w), rt = A(s.h), dt = A(null), U = A(null), vt = Yt(() => I.value && !s.static), mt = Yt(() => (b.value || I.value) && !s.static), Ce = Yt(() => navigator.userAgent.toLowerCase().indexOf("android") !== -1), ct = Yt(() => o != null && o.isMirrored ? !R.value : R.value), S = Yt(() => ({
      "vue-resizable": vt.value,
      static: s.static,
      "grid-item-selected": s.selected,
      resizing: d.value,
      "vue-draggable-dragging": _.value,
      cssTransforms: z.value,
      "render-rtl": ct.value,
      "disable-userselect": _.value,
      "no-touch": Ce.value && mt.value
    })), B = Yt(() => ct.value ? "vue-resizable-handle vue-rtl-resizable-handle" : "vue-resizable-handle");
    Y(
      () => s.isDraggable,
      (p) => {
        b.value = p;
      }
    ), Y(
      () => s.static,
      () => {
        sn(), Et();
      }
    ), Y(b, () => {
      sn();
    }), Y(
      () => s.isResizable,
      (p) => {
        I.value = p;
      }
    ), Y(
      () => s.isBounded,
      (p) => {
        dt.value = p;
      }
    ), Y(I, () => {
      Et();
    }), Y(f, () => {
      nt(), xt();
    }), Y(l, () => {
      Et(), nt(), xt();
    }), Y(u, () => {
      Et(), nt();
    }), Y(
      () => s.x,
      (p) => {
        G.value = p, nt();
      }
    ), Y(
      () => s.y,
      (p) => {
        D.value = p, nt();
      }
    ), Y(
      () => s.h,
      (p) => {
        rt.value = p, nt();
      }
    ), Y(
      () => s.w,
      (p) => {
        et.value = p, nt();
      }
    ), Y(ct, () => {
      Et(), nt();
    }), Y(
      () => s.minH,
      () => {
        Et();
      }
    ), Y(
      () => s.maxH,
      () => {
        Et();
      }
    ), Y(
      () => s.minW,
      () => {
        Et();
      }
    ), Y(
      () => s.maxW,
      () => {
        Et();
      }
    ), Y(
      () => o == null ? void 0 : o.margin,
      (p) => {
        !p || p[0] == h.value[0] && p[1] == h.value[1] || (h.value = p.map((x) => Number(x)), nt(), xt());
      }
    );
    function V(p) {
      Kt(p);
    }
    function ht(p) {
      pe();
    }
    function yt(p) {
      s.isDraggable === null && (b.value = p);
    }
    function St(p) {
      s.isResizable === null && (I.value = p);
    }
    function It(p) {
      s.isBounded === null && (dt.value = p);
    }
    function at(p) {
      y.value = p;
    }
    function X(p) {
      f.value = p;
    }
    function ut(p) {
      m.value = p;
    }
    function bt() {
      R.value = dn() === "rtl", pe();
    }
    function pt(p) {
      const x = p.toString();
      l.value = parseInt(x);
    }
    r.on("updateWidth", V), r.on("compact", ht), r.on("setDraggable", yt), r.on("setResizable", St), r.on("setBounded", It), r.on("setTransformScale", at), r.on("setRowHeight", X), r.on("setMaxRows", ut), r.on("directionchange", bt), r.on("setColNum", pt), R.value = dn() === "rtl", Rn(() => {
      r.off("updateWidth", V), r.off("compact", ht), r.off("setDraggable", yt), r.off("setResizable", St), r.off("setBounded", It), r.off("setTransformScale", at), r.off("setRowHeight", X), r.off("setMaxRows", ut), r.off("directionchange", bt), r.off("setColNum", pt), U.value && U.value.unset();
    }), Hn(() => {
      (o == null ? void 0 : o.responsive) && o.lastBreakpoint ? l.value = Ne(o.lastBreakpoint, o == null ? void 0 : o.cols) : l.value = o == null ? void 0 : o.colNum, f.value = o == null ? void 0 : o.rowHeight, u.value = (o == null ? void 0 : o.width) !== null ? o == null ? void 0 : o.width : 100, h.value = (o == null ? void 0 : o.margin) !== void 0 ? o.margin : [10, 10], m.value = o == null ? void 0 : o.maxRows, s.isDraggable === null ? b.value = o == null ? void 0 : o.isDraggable : b.value = s.isDraggable, s.isResizable === null ? I.value = o == null ? void 0 : o.isResizable : I.value = s.isResizable, s.isBounded === null ? dt.value = o == null ? void 0 : o.isBounded : dt.value = s.isBounded, y.value = o == null ? void 0 : o.transformScale, z.value = o == null ? void 0 : o.useCssTransforms, T.value = o == null ? void 0 : o.useStyleCursor, nt();
    });
    function nt() {
      var k, $, P, j, lt;
      s.x + s.w > l.value ? (G.value = 0, et.value = s.w > l.value ? l.value : s.w) : (G.value = s.x, et.value = s.w);
      let p = ft(G.value, D.value, et.value, rt.value);
      _.value && (p.top = (k = v.value) == null ? void 0 : k.top, ct.value ? p.right = ($ = v.value) == null ? void 0 : $.left : p.left = (P = v.value) == null ? void 0 : P.left), d.value && (p.width = (j = C.value) == null ? void 0 : j.width, p.height = (lt = C.value) == null ? void 0 : lt.height);
      let x;
      z.value ? ct.value ? x = Li(p.top, p.right, p.width, p.height) : x = Bi(p.top, p.left, p.width, p.height) : ct.value ? x = Fi(p.top, p.right, p.width, p.height) : x = Wi(p.top, p.left, p.width, p.height), J.value = x;
    }
    function xt() {
      let p = {};
      for (let x of ["width", "height"]) {
        let $ = J.value[x].match(/^(\d+)px$/);
        if (!$)
          return;
        p[x] = $[1];
      }
      a("container-resized", s.i, s.h, s.w, p.height, p.width);
    }
    function le(p) {
      var x, k, $;
      {
        if (s.static)
          return;
        const P = un(p);
        if (P == null)
          return;
        const { x: j, y: lt } = P, Z = { width: 0, height: 0 };
        let L;
        switch (p.type) {
          case "resizestart": {
            Et(), H.value = et.value, q.value = rt.value, L = ft(G.value, D.value, et.value, rt.value), Z.width = L.width, Z.height = L.height, C.value = Z, d.value = !0;
            break;
          }
          case "resizemove": {
            const Mt = fn(it.value, F.value, j, lt);
            ct.value ? Z.width = Number((x = C.value) == null ? void 0 : x.width) - Mt.deltaX / y.value : Z.width = Number((k = C.value) == null ? void 0 : k.width) + Mt.deltaX / y.value, Z.height = Number(($ = C.value) == null ? void 0 : $.height) + Mt.deltaY / y.value, C.value = Z;
            break;
          }
          case "resizeend": {
            L = ft(G.value, D.value, et.value, rt.value), Z.width = L.width, Z.height = L.height, C.value = null, d.value = !1;
            break;
          }
        }
        L = he(Z.height, Z.width), L.w < s.minW && (L.w = s.minW), L.w > s.maxW && (L.w = s.maxW), L.h < s.minH && (L.h = s.minH), L.h > s.maxH && (L.h = s.maxH), L.h < 1 && (L.h = 1), L.w < 1 && (L.w = 1), it.value = j, F.value = lt, (et.value !== L.w || rt.value !== L.h) && a("resize", s.i, L.h, L.w, Z.height, Z.width), p.type === "resizeend" && (H.value !== et.value || q.value !== rt.value) && a("resized", s.i, L.h, L.w, Z.height, Z.width);
        const Xt = {
          eventType: p.type,
          i: s.i,
          x: G.value,
          y: D.value,
          h: L.h,
          w: L.w
        };
        r.emit("resizeEvent", Xt);
      }
    }
    function Ht(p, x) {
      if (!x && s.selected && s.selectedItems.length > 1 && s.selectedItems.filter((lt) => lt !== s.i).forEach((lt) => {
        r.emit("dragSelected", {
          event: p,
          i: lt
        });
      }), s.static || d.value)
        return;
      const k = un(p);
      if (k === null)
        return;
      const { x: $, y: P } = k;
      let j = {
        top: 0,
        left: 0
      };
      switch (p.type) {
        case "dragstart": {
          j = ce();
          break;
        }
        case "dragend": {
          if (!_.value)
            return;
          j = fe(p);
          break;
        }
        case "dragmove": {
          j = ue(p, k);
          break;
        }
      }
      ot(j, $, P, p);
    }
    function ce() {
      const p = {
        top: 0,
        left: 0
      };
      st.value = G.value, tt.value = D.value;
      const x = c.value;
      let $ = x.offsetParent.getBoundingClientRect(), P = x.getBoundingClientRect();
      const j = P.left / y.value, lt = $.left / y.value, Z = P.right / y.value, L = $.right / y.value, Xt = P.top / y.value, Mt = $.top / y.value;
      return ct.value ? p.left = (Z - L) * -1 : p.left = j - lt, p.top = Xt - Mt, v.value = p, _.value = !0, p;
    }
    function ue(p, x) {
      var lt, Z, L;
      const { x: k, y: $ } = x, P = {
        top: 0,
        left: 0
      };
      a("dragging", p, s.i);
      const j = fn(w.value, W.value, k, $);
      if (ct.value ? P.left = Number((lt = v.value) == null ? void 0 : lt.left) - j.deltaX / y.value : P.left = Number((Z = v.value) == null ? void 0 : Z.left) + j.deltaX / y.value, P.top = Number((L = v.value) == null ? void 0 : L.top) + j.deltaY / y.value, dt.value) {
        const De = p.target.offsetParent.clientHeight - de(s.h, f.value, h.value[1]);
        P.top = $t(P.top, 0, De);
        const Si = gt(), Ii = u.value - de(s.w, Si, h.value[0]);
        P.left = $t(P.left, 0, Ii);
      }
      return v.value = P, P;
    }
    function fe(p) {
      const x = {
        top: 0,
        left: 0
      };
      a("dragend", p, s.i);
      const k = c.value;
      let P = k.offsetParent.getBoundingClientRect(), j = k.getBoundingClientRect();
      const lt = j.left / y.value, Z = P.left / y.value, L = j.right / y.value, Xt = P.right / y.value, Mt = j.top / y.value, De = P.top / y.value;
      return ct.value ? x.left = (L - Xt) * -1 : x.left = lt - Z, x.top = Mt - De, v.value = null, _.value = !1, x;
    }
    function ot(p, x, k, $) {
      let P;
      ct.value, P = wt(p.top, p.left), w.value = x, W.value = k, (G.value !== P.x || D.value !== P.y) && a("move", s.i, P.x, P.y), $.type === "dragend" && (st.value !== G.value || tt.value !== D.value) && a("moved", s.i, P.x, P.y);
      const j = {
        eventType: $.type,
        i: s.i,
        x: P.x,
        y: P.y,
        h: rt.value,
        w: et.value
      };
      r.emit("dragEvent", j);
    }
    function ft(p, x, k, $) {
      const P = gt();
      let j;
      return ct.value ? j = {
        right: Math.round(P * p + (p + 1) * h.value[0]),
        top: Math.round(f.value * x + (x + 1) * h.value[1]),
        width: k === 1 / 0 ? k : Math.round(P * k + Math.max(0, k - 1) * h.value[0]),
        height: $ === 1 / 0 ? $ : Math.round(f.value * $ + Math.max(0, $ - 1) * h.value[1])
      } : j = {
        left: Math.round(P * p + (p + 1) * h.value[0]),
        top: Math.round(f.value * x + (x + 1) * h.value[1]),
        width: k === 1 / 0 ? k : Math.round(P * k + Math.max(0, k - 1) * h.value[0]),
        height: $ === 1 / 0 ? $ : Math.round(f.value * $ + Math.max(0, $ - 1) * h.value[1])
      }, j;
    }
    function wt(p, x) {
      const k = gt();
      let $ = Math.round((x - h.value[0]) / (k + h.value[0])), P = Math.round((p - h.value[1]) / (f.value + h.value[1]));
      return $ = Math.max(Math.min($, l.value - et.value), 0), P = Math.max(Math.min(P, m.value - rt.value), 0), { x: $, y: P };
    }
    function gt() {
      return (u.value - h.value[0] * (l.value + 1)) / l.value;
    }
    function de(p, x, k) {
      return Number.isFinite(p) ? Math.round(x * p + Math.max(0, p - 1) * k) : p;
    }
    function $t(p, x, k) {
      return Math.max(Math.min(p, k), x);
    }
    function he(p, x, k = !1) {
      const $ = gt();
      let P = Math.round((x + h.value[0]) / ($ + h.value[0])), j = 0;
      return k ? j = Math.ceil((p + h.value[1]) / (f.value + h.value[1])) : j = Math.round((p + h.value[1]) / (f.value + h.value[1])), P = Math.max(Math.min(P, l.value - G.value), 0), j = Math.max(Math.min(j, m.value - D.value), 0), { w: P, h: j };
    }
    function Kt(p, x) {
      u.value = p, x != null && (l.value = x);
    }
    function pe(p) {
      nt();
    }
    function sn() {
      if ((U.value === null || U.value === void 0) && (U.value = Ct(c.value), T.value || U.value.styleCursor(!1)), b.value && !s.static) {
        const p = {
          ignoreFrom: s.dragIgnoreFrom,
          allowFrom: s.dragAllowFrom,
          ...s.dragOption
        };
        U.value.draggable(p), N.value || (N.value = !0, U.value.on("dragstart dragmove dragend", function(x) {
          Ht(x);
        }), r.on("dragSelected", ({ event: x, i: k }) => {
          k === s.i && Ht(x, !0);
        }));
      } else
        U.value.draggable({
          enabled: !1
        });
    }
    function Et() {
      if ((U.value === null || U.value === void 0) && (U.value = Ct(c.value), T.value || U.value.styleCursor(!1)), I.value && !s.static) {
        let p = ft(0, 0, s.maxW, s.maxH), x = ft(0, 0, s.minW, s.minH);
        const k = {
          edges: {
            left: !1,
            right: "." + B.value.trim().replace(" ", "."),
            bottom: "." + B.value.trim().replace(" ", "."),
            top: !1
          },
          ignoreFrom: s.resizeIgnoreFrom,
          restrictSize: {
            min: {
              height: x.height * y.value,
              width: x.width * y.value
            },
            max: {
              height: p.height * y.value,
              width: p.width * y.value
            }
          },
          ...s.resizeOption
        };
        s.preserveAspectRatio && (k.modifiers = [
          Ct.modifiers.aspectRatio({
            ratio: "preserve"
          })
        ]), U.value.resizable(k), E.value || (E.value = !0, U.value.on("resizestart resizemove resizeend", function($) {
          le($);
        }));
      } else
        U.value.resizable({
          enabled: !1
        });
    }
    const Me = _i();
    function Ei() {
      H.value = et.value, q.value = rt.value;
      let p = Me == null ? void 0 : Me.default[0].elm.getBoundingClientRect(), x = he(p.height, p.width, !0);
      if (x.w < s.minW && (x.w = s.minW), x.w > s.maxW && (x.w = s.maxW), x.h < s.minH && (x.h = s.minH), x.h > s.maxH && (x.h = s.maxH), x.h < 1 && (x.h = 1), x.w < 1 && (x.w = 1), (et.value !== x.w || rt.value !== x.h) && a("resize", s.i, x.h, x.w, p.height, p.width), H.value !== x.w || q.value !== x.h) {
        a("resized", s.i, x.h, x.w, p.height, p.width);
        const k = {
          eventType: "resizeend",
          i: s.i,
          x: G.value,
          y: D.value,
          h: x.h,
          w: x.w
        };
        r.emit("resizeEvent", k);
      }
    }
    return t({
      autoSize: Ei,
      calcXY: wt,
      dragging: v,
      ...s
    }), (p, x) => ($e(), Be("div", {
      ref_key: "this$refsItem",
      ref: c,
      class: an(["vue-grid-item", S.value]),
      style: Le(J.value)
    }, [
      $n(p.$slots, "default", {
        style: Le(J.value)
      }),
      vt.value ? ($e(), Be("span", {
        key: 0,
        ref: "handle",
        class: an(B.value)
      }, null, 2)) : Ci("", !0)
    ], 6));
  }
});
function hs(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(t, n) {
    var i = e.get(t);
    i ? i.push(n) : e.set(t, [n]);
  }, off: function(t, n) {
    var i = e.get(t);
    i && (n ? i.splice(i.indexOf(n) >>> 0, 1) : e.set(t, []));
  }, emit: function(t, n) {
    var i = e.get(t);
    i && i.slice().map(function(o) {
      o(n);
    }), (i = e.get("*")) && i.slice().map(function(o) {
      o(t, n);
    });
  } };
}
var nn = { exports: {} }, ps = nn.exports = {};
ps.forEach = function(e, t) {
  for (var n = 0; n < e.length; n++) {
    var i = t(e[n]);
    if (i)
      return i;
  }
};
var gs = function(e) {
  var t = e.stateHandler.getState;
  function n(a) {
    var s = t(a);
    return s && !!s.isDetectable;
  }
  function i(a) {
    t(a).isDetectable = !0;
  }
  function o(a) {
    return !!t(a).busy;
  }
  function r(a, s) {
    t(a).busy = !!s;
  }
  return {
    isDetectable: n,
    markAsDetectable: i,
    isBusy: o,
    markBusy: r
  };
}, vs = function(e) {
  var t = {};
  function n(a) {
    var s = e.get(a);
    return s === void 0 ? [] : t[s] || [];
  }
  function i(a, s) {
    var c = e.get(a);
    t[c] || (t[c] = []), t[c].push(s);
  }
  function o(a, s) {
    for (var c = n(a), l = 0, u = c.length; l < u; ++l)
      if (c[l] === s) {
        c.splice(l, 1);
        break;
      }
  }
  function r(a) {
    var s = n(a);
    !s || (s.length = 0);
  }
  return {
    get: n,
    add: i,
    removeListener: o,
    removeAllListeners: r
  };
}, ms = function() {
  var e = 1;
  function t() {
    return e++;
  }
  return {
    generate: t
  };
}, ys = function(e) {
  var t = e.idGenerator, n = e.stateHandler.getState;
  function i(r) {
    var a = n(r);
    return a && a.id !== void 0 ? a.id : null;
  }
  function o(r) {
    var a = n(r);
    if (!a)
      throw new Error("setId required the element to have a resize detection state.");
    var s = t.generate();
    return a.id = s, s;
  }
  return {
    get: i,
    set: o
  };
}, bs = function(e) {
  function t() {
  }
  var n = {
    log: t,
    warn: t,
    error: t
  };
  if (!e && window.console) {
    var i = function(o, r) {
      o[r] = function() {
        var s = console[r];
        if (s.apply)
          s.apply(console, arguments);
        else
          for (var c = 0; c < arguments.length; c++)
            s(arguments[c]);
      };
    };
    i(n, "log"), i(n, "warn"), i(n, "error");
  }
  return n;
}, on = { exports: {} }, bi = on.exports = {};
bi.isIE = function(e) {
  function t() {
    var i = navigator.userAgent.toLowerCase();
    return i.indexOf("msie") !== -1 || i.indexOf("trident") !== -1 || i.indexOf(" edge/") !== -1;
  }
  if (!t())
    return !1;
  if (!e)
    return !0;
  var n = function() {
    var i, o = 3, r = document.createElement("div"), a = r.getElementsByTagName("i");
    do
      r.innerHTML = "<!--[if gt IE " + ++o + "]><i></i><![endif]-->";
    while (a[0]);
    return o > 4 ? o : i;
  }();
  return e === n;
};
bi.isLegacyOpera = function() {
  return !!window.opera;
};
var xi = { exports: {} }, xs = xi.exports = {};
xs.getOption = ws;
function ws(e, t, n) {
  var i = e[t];
  return i == null && n !== void 0 ? n : i;
}
var Cn = xi.exports, Es = function(t) {
  t = t || {};
  var n = t.reporter, i = Cn.getOption(t, "async", !0), o = Cn.getOption(t, "auto", !0);
  o && !i && (n && n.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), i = !0);
  var r = Mn(), a, s = !1;
  function c(b, I) {
    !s && o && i && r.size() === 0 && f(), r.add(b, I);
  }
  function l() {
    for (s = !0; r.size(); ) {
      var b = r;
      r = Mn(), b.process();
    }
    s = !1;
  }
  function u(b) {
    s || (b === void 0 && (b = i), a && (h(a), a = null), b ? f() : l());
  }
  function f() {
    a = m(l);
  }
  function h(b) {
    var I = clearTimeout;
    return I(b);
  }
  function m(b) {
    var I = function(y) {
      return setTimeout(y, 0);
    };
    return I(b);
  }
  return {
    add: c,
    force: u
  };
};
function Mn() {
  var e = {}, t = 0, n = 0, i = 0;
  function o(s, c) {
    c || (c = s, s = 0), s > n ? n = s : s < i && (i = s), e[s] || (e[s] = []), e[s].push(c), t++;
  }
  function r() {
    for (var s = i; s <= n; s++)
      for (var c = e[s], l = 0; l < c.length; l++) {
        var u = c[l];
        u();
      }
  }
  function a() {
    return t;
  }
  return {
    add: o,
    process: r,
    size: a
  };
}
var rn = "_erd";
function Ss(e) {
  return e[rn] = {}, wi(e);
}
function wi(e) {
  return e[rn];
}
function Is(e) {
  delete e[rn];
}
var Ts = {
  initState: Ss,
  getState: wi,
  cleanState: Is
}, Qt = on.exports, zs = function(e) {
  e = e || {};
  var t = e.reporter, n = e.batchProcessor, i = e.stateHandler.getState;
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  function o(l, u) {
    function f() {
      u(l);
    }
    if (Qt.isIE(8))
      i(l).object = {
        proxy: f
      }, l.attachEvent("onresize", f);
    else {
      var h = s(l);
      if (!h)
        throw new Error("Element is not detectable by this strategy.");
      h.contentDocument.defaultView.addEventListener("resize", f);
    }
  }
  function r(l) {
    var u = e.important ? " !important; " : "; ";
    return (l.join(u) + u).trim();
  }
  function a(l, u, f) {
    f || (f = u, u = l, l = null), l = l || {}, l.debug;
    function h(m, b) {
      var I = r(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]), y = !1, z = window.getComputedStyle(m), T = m.offsetWidth, _ = m.offsetHeight;
      i(m).startSize = {
        width: T,
        height: _
      };
      function v() {
        function d() {
          if (z.position === "static") {
            m.style.setProperty("position", "relative", l.important ? "important" : "");
            var W = function(it, F, J, R) {
              function N(H) {
                return H.replace(/[^-\d\.]/g, "");
              }
              var E = J[R];
              E !== "auto" && N(E) !== "0" && (it.warn("An element that is positioned static has style." + R + "=" + E + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + R + " will be set to 0. Element: ", F), F.style.setProperty(R, "0", l.important ? "important" : ""));
            };
            W(t, m, z, "top"), W(t, m, z, "right"), W(t, m, z, "bottom"), W(t, m, z, "left");
          }
        }
        function C() {
          y || d();
          function W(F, J) {
            if (!F.contentDocument) {
              var R = i(F);
              R.checkForObjectDocumentTimeoutId && window.clearTimeout(R.checkForObjectDocumentTimeoutId), R.checkForObjectDocumentTimeoutId = setTimeout(function() {
                R.checkForObjectDocumentTimeoutId = 0, W(F, J);
              }, 100);
              return;
            }
            J(F.contentDocument);
          }
          var it = this;
          W(it, function(J) {
            b(m);
          });
        }
        z.position !== "" && (d(), y = !0);
        var w = document.createElement("object");
        w.style.cssText = I, w.tabIndex = -1, w.type = "text/html", w.setAttribute("aria-hidden", "true"), w.onload = C, Qt.isIE() || (w.data = "about:blank"), i(m) && (m.appendChild(w), i(m).object = w, Qt.isIE() && (w.data = "about:blank"));
      }
      n ? n.add(v) : v();
    }
    Qt.isIE(8) ? f(u) : h(u, f);
  }
  function s(l) {
    return i(l).object;
  }
  function c(l) {
    if (!!i(l)) {
      var u = s(l);
      !u || (Qt.isIE(8) ? l.detachEvent("onresize", u.proxy) : l.removeChild(u), i(l).checkForObjectDocumentTimeoutId && window.clearTimeout(i(l).checkForObjectDocumentTimeoutId), delete i(l).object);
    }
  }
  return {
    makeDetectable: a,
    addListener: o,
    uninstall: c
  };
}, _s = nn.exports.forEach, Cs = function(e) {
  e = e || {};
  var t = e.reporter, n = e.batchProcessor, i = e.stateHandler.getState;
  e.stateHandler.hasState;
  var o = e.idHandler;
  if (!n)
    throw new Error("Missing required dependency: batchProcessor");
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  var r = u(), a = "erd_scroll_detection_scrollbar_style", s = "erd_scroll_detection_container";
  function c(v) {
    f(v, a, s);
  }
  c(window.document);
  function l(v) {
    var d = e.important ? " !important; " : "; ";
    return (v.join(d) + d).trim();
  }
  function u() {
    var v = 500, d = 500, C = document.createElement("div");
    C.style.cssText = l(["position: absolute", "width: " + v * 2 + "px", "height: " + d * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var w = document.createElement("div");
    w.style.cssText = l(["position: absolute", "width: " + v + "px", "height: " + d + "px", "overflow: scroll", "visibility: none", "top: " + -v * 3 + "px", "left: " + -d * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]), w.appendChild(C), document.body.insertBefore(w, document.body.firstChild);
    var W = v - w.clientWidth, it = d - w.clientHeight;
    return document.body.removeChild(w), {
      width: W,
      height: it
    };
  }
  function f(v, d, C) {
    function w(J, R) {
      R = R || function(E) {
        v.head.appendChild(E);
      };
      var N = v.createElement("style");
      return N.innerHTML = J, N.id = d, R(N), N;
    }
    if (!v.getElementById(d)) {
      var W = C + "_animation", it = C + "_animation_active", F = `/* Created by the element-resize-detector library. */
`;
      F += "." + C + " > div::-webkit-scrollbar { " + l(["display: none"]) + ` }

`, F += "." + it + " { " + l(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + W, "animation-name: " + W]) + ` }
`, F += "@-webkit-keyframes " + W + ` { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
`, F += "@keyframes " + W + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", w(F);
    }
  }
  function h(v) {
    v.className += " " + s + "_animation_active";
  }
  function m(v, d, C) {
    if (v.addEventListener)
      v.addEventListener(d, C);
    else if (v.attachEvent)
      v.attachEvent("on" + d, C);
    else
      return t.error("[scroll] Don't know how to add event listeners.");
  }
  function b(v, d, C) {
    if (v.removeEventListener)
      v.removeEventListener(d, C);
    else if (v.detachEvent)
      v.detachEvent("on" + d, C);
    else
      return t.error("[scroll] Don't know how to remove event listeners.");
  }
  function I(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[0];
  }
  function y(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[1];
  }
  function z(v, d) {
    var C = i(v).listeners;
    if (!C.push)
      throw new Error("Cannot add listener to an element that is not detectable.");
    i(v).listeners.push(d);
  }
  function T(v, d, C) {
    C || (C = d, d = v, v = null), v = v || {};
    function w() {
      if (v.debug) {
        var S = Array.prototype.slice.call(arguments);
        if (S.unshift(o.get(d), "Scroll: "), t.log.apply)
          t.log.apply(null, S);
        else
          for (var B = 0; B < S.length; B++)
            t.log(S[B]);
      }
    }
    function W(S) {
      function B(V) {
        var ht = V.getRootNode && V.getRootNode().contains(V);
        return V === V.ownerDocument.body || V.ownerDocument.body.contains(V) || ht;
      }
      return !B(S) || window.getComputedStyle(S) === null;
    }
    function it(S) {
      var B = i(S).container.childNodes[0], V = window.getComputedStyle(B);
      return !V.width || V.width.indexOf("px") === -1;
    }
    function F() {
      var S = window.getComputedStyle(d), B = {};
      return B.position = S.position, B.width = d.offsetWidth, B.height = d.offsetHeight, B.top = S.top, B.right = S.right, B.bottom = S.bottom, B.left = S.left, B.widthCSS = S.width, B.heightCSS = S.height, B;
    }
    function J() {
      var S = F();
      i(d).startSize = {
        width: S.width,
        height: S.height
      }, w("Element start size", i(d).startSize);
    }
    function R() {
      i(d).listeners = [];
    }
    function N() {
      if (w("storeStyle invoked."), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var S = F();
      i(d).style = S;
    }
    function E(S, B, V) {
      i(S).lastWidth = B, i(S).lastHeight = V;
    }
    function H(S) {
      return I(S).childNodes[0];
    }
    function q() {
      return 2 * r.width + 1;
    }
    function st() {
      return 2 * r.height + 1;
    }
    function tt(S) {
      return S + 10 + q();
    }
    function G(S) {
      return S + 10 + st();
    }
    function D(S) {
      return S * 2 + q();
    }
    function et(S) {
      return S * 2 + st();
    }
    function rt(S, B, V) {
      var ht = I(S), yt = y(S), St = tt(B), It = G(V), at = D(B), X = et(V);
      ht.scrollLeft = St, ht.scrollTop = It, yt.scrollLeft = at, yt.scrollTop = X;
    }
    function dt() {
      var S = i(d).container;
      if (!S) {
        S = document.createElement("div"), S.className = s, S.style.cssText = l(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), i(d).container = S, h(S), d.appendChild(S);
        var B = function() {
          i(d).onRendered && i(d).onRendered();
        };
        m(S, "animationstart", B), i(d).onAnimationStart = B;
      }
      return S;
    }
    function U() {
      function S() {
        var ot = i(d).style;
        if (ot.position === "static") {
          d.style.setProperty("position", "relative", v.important ? "important" : "");
          var ft = function(wt, gt, de, $t) {
            function he(pe) {
              return pe.replace(/[^-\d\.]/g, "");
            }
            var Kt = de[$t];
            Kt !== "auto" && he(Kt) !== "0" && (wt.warn("An element that is positioned static has style." + $t + "=" + Kt + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + $t + " will be set to 0. Element: ", gt), gt.style[$t] = 0);
          };
          ft(t, d, ot, "top"), ft(t, d, ot, "right"), ft(t, d, ot, "bottom"), ft(t, d, ot, "left");
        }
      }
      function B(ot, ft, wt, gt) {
        return ot = ot ? ot + "px" : "0", ft = ft ? ft + "px" : "0", wt = wt ? wt + "px" : "0", gt = gt ? gt + "px" : "0", ["left: " + ot, "top: " + ft, "right: " + gt, "bottom: " + wt];
      }
      if (w("Injecting elements"), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      S();
      var V = i(d).container;
      V || (V = dt());
      var ht = r.width, yt = r.height, St = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]), It = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(B(-(1 + ht), -(1 + yt), -yt, -ht))), at = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), X = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), ut = l(["position: absolute", "left: 0", "top: 0"]), bt = l(["position: absolute", "width: 200%", "height: 200%"]), pt = document.createElement("div"), nt = document.createElement("div"), xt = document.createElement("div"), le = document.createElement("div"), Ht = document.createElement("div"), ce = document.createElement("div");
      pt.dir = "ltr", pt.style.cssText = St, pt.className = s, nt.className = s, nt.style.cssText = It, xt.style.cssText = at, le.style.cssText = ut, Ht.style.cssText = X, ce.style.cssText = bt, xt.appendChild(le), Ht.appendChild(ce), nt.appendChild(xt), nt.appendChild(Ht), pt.appendChild(nt), V.appendChild(pt);
      function ue() {
        var ot = i(d);
        ot && ot.onExpand ? ot.onExpand() : w("Aborting expand scroll handler: element has been uninstalled");
      }
      function fe() {
        var ot = i(d);
        ot && ot.onShrink ? ot.onShrink() : w("Aborting shrink scroll handler: element has been uninstalled");
      }
      m(xt, "scroll", ue), m(Ht, "scroll", fe), i(d).onExpandScroll = ue, i(d).onShrinkScroll = fe;
    }
    function vt() {
      function S(at, X, ut) {
        var bt = H(at), pt = tt(X), nt = G(ut);
        bt.style.setProperty("width", pt + "px", v.important ? "important" : ""), bt.style.setProperty("height", nt + "px", v.important ? "important" : "");
      }
      function B(at) {
        var X = d.offsetWidth, ut = d.offsetHeight, bt = X !== i(d).lastWidth || ut !== i(d).lastHeight;
        w("Storing current size", X, ut), E(d, X, ut), n.add(0, function() {
          if (!!bt) {
            if (!i(d)) {
              w("Aborting because element has been uninstalled");
              return;
            }
            if (!V()) {
              w("Aborting because element container has not been initialized");
              return;
            }
            if (v.debug) {
              var nt = d.offsetWidth, xt = d.offsetHeight;
              (nt !== X || xt !== ut) && t.warn(o.get(d), "Scroll: Size changed before updating detector elements.");
            }
            S(d, X, ut);
          }
        }), n.add(1, function() {
          if (!i(d)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!V()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          rt(d, X, ut);
        }), bt && at && n.add(2, function() {
          if (!i(d)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!V()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          at();
        });
      }
      function V() {
        return !!i(d).container;
      }
      function ht() {
        function at() {
          return i(d).lastNotifiedWidth === void 0;
        }
        w("notifyListenersIfNeeded invoked");
        var X = i(d);
        if (at() && X.lastWidth === X.startSize.width && X.lastHeight === X.startSize.height)
          return w("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        if (X.lastWidth === X.lastNotifiedWidth && X.lastHeight === X.lastNotifiedHeight)
          return w("Not notifying: Size already notified");
        w("Current size not notified, notifying..."), X.lastNotifiedWidth = X.lastWidth, X.lastNotifiedHeight = X.lastHeight, _s(i(d).listeners, function(ut) {
          ut(d);
        });
      }
      function yt() {
        if (w("startanimation triggered."), it(d)) {
          w("Ignoring since element is still unrendered...");
          return;
        }
        w("Element rendered.");
        var at = I(d), X = y(d);
        (at.scrollLeft === 0 || at.scrollTop === 0 || X.scrollLeft === 0 || X.scrollTop === 0) && (w("Scrollbars out of sync. Updating detector elements..."), B(ht));
      }
      function St() {
        if (w("Scroll detected."), it(d)) {
          w("Scroll event fired while unrendered. Ignoring...");
          return;
        }
        B(ht);
      }
      if (w("registerListenersAndPositionElements invoked."), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      i(d).onRendered = yt, i(d).onExpand = St, i(d).onShrink = St;
      var It = i(d).style;
      S(d, It.width, It.height);
    }
    function mt() {
      if (w("finalizeDomMutation invoked."), !i(d)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var S = i(d).style;
      E(d, S.width, S.height), rt(d, S.width, S.height);
    }
    function Ce() {
      C(d);
    }
    function ct() {
      w("Installing..."), R(), J(), n.add(0, N), n.add(1, U), n.add(2, vt), n.add(3, mt), n.add(4, Ce);
    }
    w("Making detectable..."), W(d) ? (w("Element is detached"), dt(), w("Waiting until element is attached..."), i(d).onRendered = function() {
      w("Element is now attached"), ct();
    }) : ct();
  }
  function _(v) {
    var d = i(v);
    !d || (d.onExpandScroll && b(I(v), "scroll", d.onExpandScroll), d.onShrinkScroll && b(y(v), "scroll", d.onShrinkScroll), d.onAnimationStart && b(d.container, "animationstart", d.onAnimationStart), d.container && v.removeChild(d.container));
  }
  return {
    makeDetectable: T,
    addListener: z,
    uninstall: _,
    initDocument: c
  };
}, ee = nn.exports.forEach, Ms = gs, Ds = vs, Ps = ms, Os = ys, As = bs, Dn = on.exports, ks = Es, Dt = Ts, Rs = zs, Hs = Cs;
function Pn(e) {
  return Array.isArray(e) || e.length !== void 0;
}
function On(e) {
  if (Array.isArray(e))
    return e;
  var t = [];
  return ee(e, function(n) {
    t.push(n);
  }), t;
}
function An(e) {
  return e && e.nodeType === 1;
}
var $s = function(e) {
  e = e || {};
  var t;
  if (e.idHandler)
    t = {
      get: function(T) {
        return e.idHandler.get(T, !0);
      },
      set: e.idHandler.set
    };
  else {
    var n = Ps(), i = Os({
      idGenerator: n,
      stateHandler: Dt
    });
    t = i;
  }
  var o = e.reporter;
  if (!o) {
    var r = o === !1;
    o = As(r);
  }
  var a = Pt(e, "batchProcessor", ks({ reporter: o })), s = {};
  s.callOnAdd = !!Pt(e, "callOnAdd", !0), s.debug = !!Pt(e, "debug", !1);
  var c = Ds(t), l = Ms({
    stateHandler: Dt
  }), u, f = Pt(e, "strategy", "object"), h = Pt(e, "important", !1), m = {
    reporter: o,
    batchProcessor: a,
    stateHandler: Dt,
    idHandler: t,
    important: h
  };
  if (f === "scroll" && (Dn.isLegacyOpera() ? (o.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), f = "object") : Dn.isIE(9) && (o.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), f = "object")), f === "scroll")
    u = Hs(m);
  else if (f === "object")
    u = Rs(m);
  else
    throw new Error("Invalid strategy name: " + f);
  var b = {};
  function I(T, _, v) {
    function d(J) {
      var R = c.get(J);
      ee(R, function(E) {
        E(J);
      });
    }
    function C(J, R, N) {
      c.add(R, N), J && N(R);
    }
    if (v || (v = _, _ = T, T = {}), !_)
      throw new Error("At least one element required.");
    if (!v)
      throw new Error("Listener required.");
    if (An(_))
      _ = [_];
    else if (Pn(_))
      _ = On(_);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    var w = 0, W = Pt(T, "callOnAdd", s.callOnAdd), it = Pt(T, "onReady", function() {
    }), F = Pt(T, "debug", s.debug);
    ee(_, function(R) {
      Dt.getState(R) || (Dt.initState(R), t.set(R));
      var N = t.get(R);
      if (F && o.log("Attaching listener to element", N, R), !l.isDetectable(R)) {
        if (F && o.log(N, "Not detectable."), l.isBusy(R)) {
          F && o.log(N, "System busy making it detectable"), C(W, R, v), b[N] = b[N] || [], b[N].push(function() {
            w++, w === _.length && it();
          });
          return;
        }
        return F && o.log(N, "Making detectable..."), l.markBusy(R, !0), u.makeDetectable({ debug: F, important: h }, R, function(H) {
          if (F && o.log(N, "onElementDetectable"), Dt.getState(H)) {
            l.markAsDetectable(H), l.markBusy(H, !1), u.addListener(H, d), C(W, H, v);
            var q = Dt.getState(H);
            if (q && q.startSize) {
              var st = H.offsetWidth, tt = H.offsetHeight;
              (q.startSize.width !== st || q.startSize.height !== tt) && d(H);
            }
            b[N] && ee(b[N], function(G) {
              G();
            });
          } else
            F && o.log(N, "Element uninstalled before being detectable.");
          delete b[N], w++, w === _.length && it();
        });
      }
      F && o.log(N, "Already detecable, adding listener."), C(W, R, v), w++;
    }), w === _.length && it();
  }
  function y(T) {
    if (!T)
      return o.error("At least one element is required.");
    if (An(T))
      T = [T];
    else if (Pn(T))
      T = On(T);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    ee(T, function(_) {
      c.removeAllListeners(_), u.uninstall(_), Dt.cleanState(_);
    });
  }
  function z(T) {
    u.initDocument && u.initDocument(T);
  }
  return {
    listenTo: I,
    removeListener: c.removeListener,
    removeAllListeners: c.removeAllListeners,
    uninstall: y,
    initDocument: z
  };
};
function Pt(e, t, n) {
  var i = e[t];
  return i == null && n !== void 0 ? n : i;
}
const Bs = {
  name: "GridLayout"
}, Ls = /* @__PURE__ */ kn({
  ...Bs,
  props: {
    autoSize: { type: Boolean, default: !0 },
    colNum: { default: 12 },
    rowHeight: { default: 100 },
    maxRows: { default: 1 / 0 },
    margin: { default: () => [10, 10] },
    isDraggable: { type: Boolean, default: !0 },
    isResizable: { type: Boolean, default: !0 },
    isMirrored: { type: Boolean, default: !1 },
    isBounded: { type: Boolean, default: !1 },
    useCssTransforms: { type: Boolean, default: !0 },
    verticalCompact: { type: Boolean, default: !0 },
    restoreOnDrag: { type: Boolean, default: !1 },
    layout: {},
    responsive: { type: Boolean, default: !1 },
    responsiveLayouts: { default: () => ({}) },
    transformScale: { default: 1 },
    breakpoints: { default: () => ({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }) },
    cols: { default: () => ({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }) },
    preventCollision: { type: [Boolean, Function], default: !1 },
    useStyleCursor: { type: Boolean, default: !0 }
  },
  emits: ["layout-created", "layout-before-mount", "layout-mounted", "layout-updated", "layout-ready", "update:layout", "breakpoint-changed", "reset-selected"],
  setup(e, { expose: t, emit: n }) {
    const i = e, o = A(null), r = A({}), a = A(0), s = A(!1), c = A({ x: 0, y: 0, w: 0, h: 0, i: -1 }), l = A({}), u = A(null), f = A(null), h = A(null), m = A(), b = A({}), I = A(), y = hs();
    Mi("eventBus", y);
    const z = n;
    function T(E) {
      if (!E)
        F();
      else {
        const { eventType: H, i: q, x: st, y: tt, h: G, w: D } = E;
        F(H, q, st, tt, G, D);
      }
    }
    function _(E) {
      if (!E)
        W();
      else {
        const { eventType: H, i: q, x: st, y: tt, h: G, w: D } = E;
        W(H, q, st, tt);
      }
    }
    y.on("resizeEvent", T), y.on("dragEvent", _), z("layout-created", i.layout), Rn(() => {
      y.off("resizeEvent", T), y.off("dragEvent", _), Ki("resize", C), h.value && h.value.uninstall(b.value);
    }), Di(() => {
      z("layout-before-mount", i.layout);
    }), Hn(() => {
      z("layout-mounted", i.layout), Tt(function() {
        Ni(i.layout), f.value = i.layout, Tt(() => {
          R(), C(), Vi("resize", C), qt(i.layout, i.verticalCompact), z("layout-updated", i.layout), d(), Tt(() => {
            h.value = $s({
              strategy: "scroll",
              callOnAdd: !1
            }), h.value.listenTo(b.value, function() {
              C();
            });
          });
        });
      });
    }), Y(o, (E, H) => {
      Tt(() => {
        y.emit("updateWidth", E), H === null && Tt(() => {
          z("layout-ready", i.layout);
        }), d();
      });
    }), Y(
      () => i.layout,
      () => {
        v();
      }
    ), Y(
      () => i.layout.length,
      () => {
        v();
      }
    ), Y(
      () => i.colNum,
      (E) => {
        y.emit("setColNum", E);
      }
    ), Y(
      () => i.rowHeight,
      (E) => {
        y.emit("setRowHeight", E);
      }
    ), Y(
      () => i.isDraggable,
      (E) => {
        y.emit("setDraggable", E);
      }
    ), Y(
      () => i.isResizable,
      (E) => {
        y.emit("setResizable", E);
      }
    ), Y(
      () => i.isBounded,
      (E) => {
        y.emit("setBounded", E);
      }
    ), Y(
      () => i.transformScale,
      (E) => {
        y.emit("setTransformScale", E);
      }
    ), Y(
      () => i.responsive,
      (E) => {
        E || (z("update:layout", f.value || []), y.emit("setColNum", i.colNum)), C();
      }
    ), Y(
      () => i.maxRows,
      (E) => {
        y.emit("setMaxRows", E);
      }
    ), Y(
      () => i.margin,
      () => {
        d();
      }
    );
    function v() {
      if (i.layout !== void 0 && f.value !== null) {
        if (i.layout.length !== f.value.length) {
          let E = N(i.layout, f.value);
          E.length > 0 && (i.layout.length > f.value.length ? f.value = f.value.concat(E) : f.value = f.value.filter((H) => !E.some((q) => H.i === q.i))), a.value = i.layout.length, R();
        }
        qt(i.layout, i.verticalCompact), y.emit("updateWidth", o.value), d(), z("layout-updated", i.layout);
      }
    }
    function d() {
      r.value = {
        height: w()
      };
    }
    function C() {
      b.value !== null && b.value !== void 0 && (o.value = b.value.offsetWidth), y.emit("resizeEvent");
    }
    function w() {
      return i.autoSize ? ki(i.layout) * (i.rowHeight + i.margin[1]) + i.margin[1] + "px" : "";
    }
    function W(E, H, q, st, tt, G) {
      let D = ln(i.layout, H);
      D != null && D.selected || z("reset-selected"), D == null && (D = { x: 0, y: 0 }), E === "dragstart" && !i.verticalCompact && (m.value = i.layout.reduce(
        (dt, { i: U, x: vt, y: mt }) => ({
          ...dt,
          [U]: { x: vt, y: mt }
        }),
        {}
      )), E === "dragmove" || E === "dragstart" ? (Tt(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : Tt(function() {
        s.value = !1;
      });
      const et = it(D), rt = Fe(i.layout, D, q, st, !0, et);
      z("update:layout", rt), i.restoreOnDrag ? (D.static = !0, qt(i.layout, i.verticalCompact, m.value), D.static = !1) : qt(i.layout, i.verticalCompact), y.emit("compact"), d(), E === "dragend" && (m.value = void 0, z("layout-updated", rt));
    }
    function it(E) {
      return typeof i.preventCollision == "function" ? i.preventCollision({
        layout: i.layout,
        layoutItem: E
      }) : i.preventCollision;
    }
    function F(E, H, q, st, tt, G) {
      let D = ln(i.layout, H);
      D == null && (D = { h: 0, w: 0 }), G = Number(G), tt = Number(tt);
      let et;
      if (it(D)) {
        const dt = Ln(i.layout, { ...D, w: G, h: tt }).filter(
          (U) => U.i !== (D == null ? void 0 : D.i)
        );
        if (et = dt.length > 0, et) {
          let U = 1 / 0, vt = 1 / 0;
          dt.forEach((mt) => {
            mt.x > Number(D == null ? void 0 : D.x) && (U = Math.min(U, mt.x)), mt.y > Number(D == null ? void 0 : D.y) && (vt = Math.min(vt, mt.y));
          }), Number.isFinite(U) && (D.w = U - D.x), Number.isFinite(vt) && (D.h = vt - D.y);
        }
      }
      et || (D.w = G, D.h = tt), E === "resizestart" || E === "resizemove" ? (c.value.i = H, c.value.x = q, c.value.y = st, c.value.w = D.w, c.value.h = D.h, Tt(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : Tt(function() {
        s.value = !1;
      }), i.responsive && J(), qt(i.layout, i.verticalCompact), y.emit("compact"), d(), E === "resizeend" && z("layout-updated", i.layout);
    }
    function J() {
      let E = Yi(i.breakpoints, o.value), H = Ne(E, i.cols);
      u.value != null && !l.value[u.value] && (l.value[u.value] = We(i.layout));
      let q = Gi(
        f.value,
        l.value,
        i.breakpoints,
        E,
        u.value,
        H,
        i.verticalCompact
      );
      l.value[E] = q, u.value !== E && z("breakpoint-changed", E, q), z("update:layout", q), u.value = E, y.emit("setColNum", Ne(E, i.cols));
    }
    function R() {
      l.value = Object.assign({}, i.responsiveLayouts);
    }
    function N(E, H) {
      let q = E.filter(function(tt) {
        return !H.some(function(G) {
          return tt.i === G.i;
        });
      }), st = H.filter(function(tt) {
        return !E.some(function(G) {
          return tt.i === G.i;
        });
      });
      return q.concat(st);
    }
    return t({
      ...i,
      width: o,
      mergeStyle: r,
      lastLayoutLength: a,
      isDragging: s,
      placeholder: c,
      layouts: l,
      lastBreakpoint: u,
      originalLayout: f,
      erd: h,
      defaultGridItem: I,
      dragEvent: W
    }), (E, H) => ($e(), Be("div", {
      ref_key: "this$refsLayout",
      ref: b,
      class: "vue-grid-layout",
      style: Le(r.value)
    }, [
      $n(E.$slots, "default"),
      Pi(Oi(yi, {
        ref_key: "defaultGridItem",
        ref: I,
        class: "vue-grid-placeholder",
        x: c.value.x,
        y: c.value.y,
        w: c.value.w,
        h: c.value.h,
        i: c.value.i
      }, null, 8, ["x", "y", "w", "h", "i"]), [
        [Ai, s.value]
      ])
    ], 4));
  }
});
const Ws = [Ls, yi], Ns = {
  install(e) {
    Ws.forEach((t) => {
      e.component(t.name, t);
    });
  }
};
export {
  yi as GridItem,
  Ls as GridLayout,
  Ns as default
};
