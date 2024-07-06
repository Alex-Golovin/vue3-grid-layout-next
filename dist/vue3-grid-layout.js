import './style.css';
import { getCurrentInstance as Ti, defineComponent as kn, inject as zi, ref as A, computed as jt, watch as Y, onBeforeUnmount as Rn, onMounted as Hn, useSlots as _i, openBlock as $e, createElementBlock as Be, normalizeClass as an, normalizeStyle as Le, renderSlot as $n, createCommentVNode as Mi, provide as Di, onBeforeMount as Ci, nextTick as St, withDirectives as Pi, createVNode as Oi, vShow as Ai } from "vue";
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
function Yt(e, t, n) {
  const i = Wn(e), o = Fn(e), r = Array(e.length);
  for (let a = 0, s = o.length; a < s; a++) {
    let c = o[a];
    c.static || (c = Hi(i, c, t, n), i.push(c)), r[e.indexOf(c)] = c, c.moved = !1;
  }
  return r;
}
function Hi(e, t, n, i) {
  if (n)
    for (; t.y > 0 && !te(e, t); )
      t.y--;
  else if (i) {
    const r = i[t.i].y;
    for (; t.y > r && !te(e, t); )
      t.y--;
  }
  let o;
  for (; o = te(e, t); )
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
      for (; te(n, r); )
        r.y++;
  }
  return e;
}
function ln(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (e[n].i === t)
      return e[n];
}
function te(e, t) {
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
    if (r.y = Math.max(t.y - n.h, 0), !te(e, r))
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
  return s = We(s || []), Yt($i(s, { cols: r }), a);
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
const U = {
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
function Xt() {
}
function Ji(e) {
  const t = e;
  U.document = t.document, U.DocumentFragment = t.DocumentFragment || Xt, U.SVGElement = t.SVGElement || Xt, U.SVGSVGElement = t.SVGSVGElement || Xt, U.SVGElementInstance = t.SVGElementInstance || Xt, U.Element = t.Element || Xt, U.HTMLElement = t.HTMLElement || U.Element, U.Event = t.Event, U.Touch = t.Touch || Xt, U.PointerEvent = t.PointerEvent || t.MSPointerEvent;
}
var Xn = (e) => !!(e && e.Window) && e instanceof e.Window;
let Yn, Pt;
function Gn(e) {
  Yn = e;
  const t = e.document.createTextNode("");
  t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), Pt = e;
}
typeof window < "u" && !!window && Gn(window);
function Lt(e) {
  return Xn(e) ? e : (e.ownerDocument || e).defaultView || Pt.window;
}
const Zi = (e) => e === Pt || Xn(e), Qi = (e) => Ee(e) && e.nodeType === 11, Ee = (e) => !!e && typeof e == "object", qn = (e) => typeof e == "function", to = (e) => typeof e == "number", eo = (e) => typeof e == "boolean", no = (e) => typeof e == "string", io = (e) => {
  if (!e || typeof e != "object")
    return !1;
  const t = Lt(e) || Pt;
  return /object|function/.test(typeof Element) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
}, oo = (e) => Ee(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString()), ro = (e) => Ee(e) && typeof e.length < "u" && qn(e.splice);
var g = {
  window: Zi,
  docFrag: Qi,
  object: Ee,
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
  const t = U.Element, n = e.navigator || {};
  Q.supportsTouch = "ontouchstart" in e || g.func(e.DocumentTouch) && U.document instanceof e.DocumentTouch, Q.supportsPointerEvent = n.pointerEnabled !== !1 && !!U.PointerEvent, Q.isIOS = /iP(hone|od|ad)/.test(n.platform), Q.isIOS7 = /iP(hone|od|ad)/.test(n.platform) && /OS 7[^\d]/.test(n.appVersion), Q.isIe9 = /MSIE 9/.test(n.userAgent), Q.isOperaMobile = n.appName === "Opera" && Q.supportsTouch && /Presto/.test(n.userAgent), Q.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", Q.pEventTypes = Q.supportsPointerEvent ? U.PointerEvent === e.MSPointerEvent ? {
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
  } : null, Q.wheelEvent = U.document && "onmousewheel" in U.document ? "mousewheel" : "wheel";
}
function $t(e, t) {
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
    if (Wt(e, t))
      return e;
    e = Ot(e);
  }
  return null;
}
function Ot(e) {
  let t = e.parentNode;
  if (g.docFrag(t)) {
    for (; (t = t.host) && g.docFrag(t); )
      ;
    return t;
  }
  return t;
}
function Wt(e, t) {
  return Pt !== Yn && (t = t.replace(/\/deep\//g, " ")), e[Q.prefixedMatchesSelector](t);
}
function je(e, t, n) {
  for (; g.element(e); ) {
    if (Wt(e, t))
      return !0;
    if (e = Ot(e), e === n)
      return Wt(e, t);
  }
  return !1;
}
function hn(e) {
  return e.correspondingUseElement || e;
}
function ao(e) {
  return e = e || Pt, {
    x: e.scrollX || e.document.documentElement.scrollLeft,
    y: e.scrollY || e.document.documentElement.scrollTop
  };
}
function Ue(e) {
  const t = e instanceof U.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
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
    const n = ao(Lt(e));
    t.left += n.x, t.right += n.x, t.top += n.y, t.bottom += n.y;
  }
  return t;
}
function pn(e) {
  return g.string(e) ? (U.document.querySelector(e), !0) : !1;
}
function C(e, t) {
  for (const i in t)
    e[i] = t[i];
  return e;
}
function ie(e, t) {
  let n = !1;
  return function() {
    return n || (Pt.console.warn(t), n = !0), e.apply(this, arguments);
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
  }, t.prototype.ignoreFrom = ie(function(n) {
    return this._backCompatOption("ignoreFrom", n);
  }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = ie(function(n) {
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
  e.usePlugin(ho), n.base.actionChecker = null, n.base.styleCursor = !0, C(n.perAction, {
    manualStart: !1,
    max: 1 / 0,
    maxPerElement: 1,
    allowFrom: null,
    ignoreFrom: null,
    mouseButtons: 1
  }), t.maxInteractions = (i) => Qn(i, e), e.autoStart = {
    maxInteractions: 1 / 0,
    withinInteractionLimit: Se,
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
  o && i && (i.options[o].manualStart || !Se(i, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, i, n.element), ti(n, t)));
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
  return t.testIgnoreAllow(t.options[e.name], n, i) && t.options[e.name].enabled && Se(t, n, e, o) ? e : null;
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
    s = Ot(s);
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
function Se(e, t, n, i) {
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
  withinInteractionLimit: Se,
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
      const x = n.interactable.options.drag;
      if (!x.manualStart && m.testIgnoreAllow(x, f, i)) {
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
      f = Ot(f);
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
}, ni = (e) => ei([], e), Ie = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (t(e[n], n, e))
      return n;
  return -1;
}, ve = (e, t) => e[Ie(e, t)];
function qt(e) {
  const t = {};
  for (const n in e) {
    const i = e[n];
    g.plainObject(i) ? t[n] = qt(i) : g.array(i) ? t[n] = ni(i) : t[n] = i;
  }
  return t;
}
let gn = 0, It, Ht;
function zo(e) {
  if (It = e.requestAnimationFrame, Ht = e.cancelAnimationFrame, !It) {
    const t = ["ms", "moz", "webkit", "o"];
    for (const n of t)
      It = e[`${n}RequestAnimationFrame`], Ht = e[`${n}CancelAnimationFrame`] || e[`${n}CancelRequestAnimationFrame`];
  }
  It = It && It.bind(e), Ht = Ht && Ht.bind(e), It || (It = (t) => {
    const n = Date.now(), i = Math.max(0, 16 - (n - gn)), o = e.setTimeout(() => {
      t(n + i);
    }, i);
    return gn = n + i, o;
  }, Ht = (t) => clearTimeout(t));
}
var Gt = {
  request: (e) => It(e),
  cancel: (e) => Ht(e),
  init: zo
};
function Bt(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (o) => !0, i = arguments.length > 3 ? arguments[3] : void 0;
  if (i = i || {}, g.string(e) && e.search(" ") !== -1 && (e = vn(e)), g.array(e))
    return e.forEach((o) => Bt(o, t, n, i)), i;
  if (g.object(e) && (t = e, e = ""), g.func(t) && n(e))
    i[e] = i[e] || [], i[e].push(t);
  else if (g.array(t))
    for (const o of t)
      Bt(e, o, n, i);
  else if (g.object(t))
    for (const o in t) {
      const r = vn(o).map((a) => `${e}${a}`);
      Bt(r, t[o], n, i);
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
    this.options = void 0, this.types = {}, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.global = void 0, this.options = C({}, t || {});
  }
  fire(t) {
    let n;
    const i = this.global;
    (n = this.types[t.type]) && mn(t, n), !t.propagationStopped && i && (n = i[t.type]) && mn(t, n);
  }
  on(t, n) {
    const i = Bt(t, n);
    for (t in i)
      this.types[t] = ei(this.types[t] || [], i[t]);
  }
  off(t, n) {
    const i = Bt(t, n);
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
var Te = (e, t) => Math.sqrt(e * e + t * t);
function Oe(e, t) {
  e.page = e.page || {}, e.page.x = t.page.x, e.page.y = t.page.y, e.client = e.client || {}, e.client.x = t.client.x, e.client.y = t.client.y, e.timeStamp = t.timeStamp;
}
function Mo(e, t, n) {
  e.page.x = n.page.x - t.page.x, e.page.y = n.page.y - t.page.y, e.client.x = n.client.x - t.client.x, e.client.y = n.client.y - t.client.y, e.timeStamp = n.timeStamp - t.timeStamp;
}
function Do(e, t) {
  const n = Math.max(t.timeStamp / 1e3, 1e-3);
  e.page.x = t.page.x / n, e.page.y = t.page.y / n, e.client.x = t.client.x / n, e.client.y = t.client.y / n, e.timeStamp = n;
}
function Co(e) {
  e.page.x = 0, e.page.y = 0, e.client.x = 0, e.client.y = 0;
}
function ri(e) {
  return e instanceof U.Event || e instanceof U.Touch;
}
function ye(e, t, n) {
  return n = n || {}, e = e || "page", n.x = t[e + "X"], n.y = t[e + "Y"], n;
}
function Po(e, t) {
  return t = t || {
    x: 0,
    y: 0
  }, Q.isOperaMobile && ri(e) ? (ye("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : ye("page", e, t), t;
}
function Oo(e, t) {
  return t = t || {}, Q.isOperaMobile && ri(e) ? ye("screen", e, t) : ye("client", e, t), t;
}
function be(e) {
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
  return Te(r, a);
}
function Ho(e, t) {
  const n = t + "X", i = t + "Y", o = Je(e), r = o[1][n] - o[0][n], a = o[1][i] - o[0][i];
  return 180 * Math.atan2(a, r) / Math.PI;
}
function $o(e) {
  return g.string(e.pointerType) ? e.pointerType : g.number(e.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][e.pointerType] : /touch/.test(e.type || "") || e instanceof U.Touch ? "touch" : "mouse";
}
function ai(e) {
  const t = g.func(e.composedPath) ? e.composedPath() : e.path;
  return [hn(t ? t[0] : e.target), hn(e.currentTarget)];
}
function Vt() {
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
  function a(h, m, x, I) {
    if (!h.addEventListener)
      return;
    const y = Kt(I);
    let _ = ve(n, (T) => T.eventTarget === h);
    _ || (_ = {
      eventTarget: h,
      events: {}
    }, n.push(_)), _.events[m] || (_.events[m] = []), ve(_.events[m], (T) => T.func === x && pe(T.options, y)) || (h.addEventListener(m, x, r.supportsOptions ? y : y.capture), _.events[m].push({
      func: x,
      options: y
    }));
  }
  function s(h, m, x, I) {
    if (!h.addEventListener || !h.removeEventListener)
      return;
    const y = Ie(n, (v) => v.eventTarget === h), _ = n[y];
    if (!_ || !_.events)
      return;
    if (m === "all") {
      for (m in _.events)
        _.events.hasOwnProperty(m) && s(h, m, "all");
      return;
    }
    let T = !1;
    const M = _.events[m];
    if (M)
      if (x === "all") {
        for (let v = M.length - 1; v >= 0; v--) {
          const d = M[v];
          s(h, m, d.func, d.options);
        }
        return;
      } else {
        const v = Kt(I);
        for (let d = 0; d < M.length; d++) {
          const D = M[d];
          if (D.func === x && pe(D.options, v)) {
            h.removeEventListener(m, x, r.supportsOptions ? v : v.capture), M.splice(d, 1), M.length === 0 && (delete _.events[m], T = !0);
            break;
          }
        }
      }
    T && !Object.keys(_.events).length && n.splice(y, 1);
  }
  function c(h, m, x, I, y) {
    const _ = Kt(y);
    if (!i[x]) {
      i[x] = [];
      for (const v of o)
        a(v, x, u), a(v, x, f, !0);
    }
    const T = i[x];
    let M = ve(T, (v) => v.selector === h && v.context === m);
    M || (M = {
      selector: h,
      context: m,
      listeners: []
    }, T.push(M)), M.listeners.push({
      func: I,
      options: _
    });
  }
  function l(h, m, x, I, y) {
    const _ = Kt(y), T = i[x];
    let M = !1, v;
    if (!!T)
      for (v = T.length - 1; v >= 0; v--) {
        const d = T[v];
        if (d.selector === h && d.context === m) {
          const {
            listeners: D
          } = d;
          for (let E = D.length - 1; E >= 0; E--) {
            const F = D[E];
            if (F.func === I && pe(F.options, _)) {
              D.splice(E, 1), D.length || (T.splice(v, 1), s(m, x, u), s(m, x, f, !0)), M = !0;
              break;
            }
          }
          if (M)
            break;
        }
      }
  }
  function u(h, m) {
    const x = Kt(m), I = new Lo(h), y = i[h.type], [_] = ai(h);
    let T = _;
    for (; g.element(T); ) {
      for (let M = 0; M < y.length; M++) {
        const v = y[M], {
          selector: d,
          context: D
        } = v;
        if (Wt(T, d) && $t(D, _) && $t(D, T)) {
          const {
            listeners: E
          } = v;
          I.currentTarget = T;
          for (const F of E)
            pe(F.options, x) && F.func(I);
        }
      }
      T = Ot(T);
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
function Kt(e) {
  return g.object(e) ? {
    capture: !!e.capture,
    passive: !!e.passive
  } : {
    capture: !!e,
    passive: !1
  };
}
function pe(e, t) {
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
      const o = Lt(n.target).document, r = t.getDocOptions(o);
      if (!(r && r.events) || r.events.passive !== !1)
        return;
    }
    /^(mouse|pointer|touch)*(down|start)/i.test(n.type) || g.element(n.target) && Wt(n.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n.preventDefault();
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
        if (i.element && (i.element === n.target || $t(i.element, n.target))) {
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
  return e === "parent" ? Ot(n) : e === "self" ? t.getRect(n) : Un(n, e);
}
function oe(e, t, n, i) {
  let o = e;
  return g.string(o) ? o = li(o, t, n) : g.func(o) && (o = o(...i)), g.element(o) && (o = Ve(o)), o;
}
function ze(e) {
  return e && {
    x: "x" in e ? e.x : e.left,
    y: "y" in e ? e.y : e.top
  };
}
function Go(e) {
  return e && !("left" in e && "top" in e) && (e = C({}, e), e.left = e.x || 0, e.top = e.y || 0, e.right = e.right || e.left + e.width, e.bottom = e.bottom || e.top + e.height), e;
}
function yn(e) {
  return e && !("x" in e && "y" in e) && (e = C({}, e), e.x = e.left || 0, e.y = e.top || 0, e.width = e.width || (e.right || 0) - e.x, e.height = e.height || (e.bottom || 0) - e.y), e;
}
function Ze(e, t, n) {
  e.left && (t.left += n.x), e.right && (t.right += n.x), e.top && (t.top += n.y), e.bottom && (t.bottom += n.y), t.width = t.right - t.left, t.height = t.bottom - t.top;
}
function Qe(e, t, n) {
  const i = n && e.options[n], r = i && i.origin || e.options.origin, a = oe(r, e, t, [e && t]);
  return ze(a) || {
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
    const c = t.interactable, l = (c && c.options || ui).deltaSource, u = Qe(c, r, i), f = o === "start", h = o === "end", m = f ? this : t.prevEvent, x = f ? t.coords.start : h ? {
      page: m.page,
      client: m.client,
      timeStamp: t.coords.cur.timeStamp
    } : t.coords.cur;
    this.page = C({}, x.page), this.client = C({}, x.client), this.rect = C({}, t.rect), this.timeStamp = x.timeStamp, h || (this.page.x -= u.x, this.page.y -= u.y, this.client.x -= u.x, this.client.y -= u.y), this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.button = n.button, this.buttons = n.buttons, this.target = r, this.currentTarget = r, this.preEnd = a, this.type = s || i + (o || ""), this.interactable = c, this.t0 = f ? t.pointers[t.pointers.length - 1].downTime : m.t0, this.x0 = t.coords.start.page.x - u.x, this.y0 = t.coords.start.page.y - u.y, this.clientX0 = t.coords.start.client.x - u.x, this.clientY0 = t.coords.start.client.y - u.y, f || h ? this.delta = {
      x: 0,
      y: 0
    } : this.delta = {
      x: this[l].x - m[l].x,
      y: this[l].y - m[l].y
    }, this.dt = t.coords.delta.timeStamp, this.duration = this.timeStamp - this.t0, this.velocity = C({}, t.coords.velocity[l]), this.speed = Te(this.velocity.x, this.velocity.y), this.swipe = h || o === "inertiastart" ? this.getSwipe() : null;
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
    }, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = ie(function(r) {
      this.move(r);
    }, "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
      start: Vt(),
      prev: Vt(),
      cur: Vt(),
      delta: Vt(),
      velocity: Vt()
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
    return this.interacting() || !this.pointerIsDown || this.pointers.length < (t.name === "gesture" ? 2 : 1) || !n.options[t.name].enabled ? !1 : (Vn(this.prepared, t), this.interactable = n, this.element = i, this.rect = n.getRect(i), this.edges = this.prepared.edges ? C({}, this.prepared.edges) : {
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
    this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, a = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = Te(r, a) > this.pointerMoveTolerance);
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
    o || Do(this.coords.velocity, this.coords.delta), this._scopeFire("interactions:move", c), !o && !this.simulation && (this.interacting() && (c.type = null, this.move(c)), this.pointerWasMoved && Oe(this.coords.prev, this.coords.cur));
  }
  move(t) {
    (!t || !t.event) && Co(this.coords.delta), t = C({
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
    const n = be(t);
    return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : Ie(this.pointers, (i) => i.id === n);
  }
  getPointerInfo(t) {
    return this.pointers[this.getPointerIndex(t)];
  }
  updatePointer(t, n, i, o) {
    const r = be(t);
    let a = this.getPointerIndex(t), s = this.pointers[a];
    return o = o === !1 ? !1 : o || /(down|start)$/i.test(n.type), s ? s.pointer = t : (s = new qo(r, t, n, null, null), a = this.pointers.length, this.pointers.push(s)), Ao(this.coords.cur, this.pointers.map((c) => c.pointer), this._now()), Mo(this.coords.delta, this.coords.prev, this.coords.cur), o && (this.pointerIsDown = !0, s.downTime = this.coords.cur.timeStamp, s.downTarget = i, oi(this.downPointer, t), this.interacting() || (Oe(this.coords.start, this.coords.cur), Oe(this.coords.prev, this.coords.cur), this.downEvent = n, this.pointerWasMoved = !1)), this._updateLatestPointer(t, n, i), this._scopeFire("interactions:update-pointer", {
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
          a = Ot(a);
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
  U.PointerEvent ? i = [{
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
            return $t(c, a.downTarget);
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
        const l = c, u = be(l), f = {
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
          pointerId: be(n),
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
function re(e, t) {
  if (t.phaselessTypes[e])
    return !0;
  for (const n in t.map)
    if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases)
      return !0;
  return !1;
}
var Ct = /* @__PURE__ */ function(e) {
  return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
}(Ct || {});
class tr {
  get _defaults() {
    return {
      base: {},
      perAction: {},
      actions: {}
    };
  }
  constructor(t, n, i, o) {
    this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new ii(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || i, this._win = Lt(pn(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = o, this.set(n);
  }
  setOnEvents(t, n) {
    return g.func(n.onstart) && this.on(`${t}start`, n.onstart), g.func(n.onmove) && this.on(`${t}move`, n.onmove), g.func(n.onend) && this.on(`${t}end`, n.onend), g.func(n.oninertiastart) && this.on(`${t}inertiastart`, n.oninertiastart), this;
  }
  updatePerActionListeners(t, n, i) {
    var o;
    const r = (o = this._actions.map[t]) == null ? void 0 : o.filterEventType, a = (s) => (r == null || r(s)) && re(s, this._actions);
    (g.array(n) || g.object(n)) && this._onOff(Ct.Off, t, n, void 0, a), (g.array(i) || g.object(i)) && this._onOff(Ct.On, t, i, void 0, a);
  }
  setPerAction(t, n) {
    const i = this._defaults;
    for (const o in n) {
      const r = o, a = this.options[t], s = n[r];
      r === "listeners" && this.updatePerActionListeners(t, a.listeners, s), g.array(s) ? a[r] = ni(s) : g.plainObject(s) ? (a[r] = C(a[r] || {}, qt(s)), g.object(i.perAction[r]) && "enabled" in i.perAction[r] && (a[r].enabled = s.enabled !== !1)) : g.bool(s) && g.object(i.perAction[r]) ? a[r].enabled = s : a[r] = s;
    }
  }
  getRect(t) {
    return t = t || (g.element(this.target) ? this.target : null), g.string(this.target) && (t = t || this._context.querySelector(this.target)), Ve(t);
  }
  rectChecker(t) {
    return g.func(t) ? (this.getRect = (n) => {
      const i = C({}, t.apply(this, n));
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
    return this._context === t.ownerDocument || $t(this._context, t);
  }
  testIgnoreAllow(t, n, i) {
    return !this.testIgnore(t.ignoreFrom, n, i) && this.testAllow(t.allowFrom, n, i);
  }
  testAllow(t, n, i) {
    return t ? g.element(i) ? g.string(t) ? je(i, t, n) : g.element(t) ? $t(t, i) : !1 : !1 : !0;
  }
  testIgnore(t, n, i) {
    return !t || !g.element(i) ? !1 : g.string(t) ? je(i, t, n) : g.element(t) ? $t(t, i) : !1;
  }
  fire(t) {
    return this.events.fire(t), this;
  }
  _onOff(t, n, i, o, r) {
    g.object(n) && !g.array(n) && (o = i, i = null);
    const a = Bt(n, i, r);
    for (let s in a) {
      s === "wheel" && (s = Q.wheelEvent);
      for (const c of a[s])
        re(s, this._actions) ? this.events[t === Ct.On ? "on" : "off"](s, c) : g.string(this.target) ? this._scopeEvents[t === Ct.On ? "addDelegate" : "removeDelegate"](this.target, this._context, s, c, o) : this._scopeEvents[t === Ct.On ? "add" : "remove"](this.target, s, c, o);
    }
    return this;
  }
  on(t, n, i) {
    return this._onOff(Ct.On, t, n, i);
  }
  off(t, n, i) {
    return this._onOff(Ct.Off, t, n, i);
  }
  set(t) {
    const n = this._defaults;
    g.object(t) || (t = {}), this.options = qt(n.base);
    for (const i in this._actions.methodDict) {
      const o = i, r = this._actions.methodDict[o];
      this.options[o] = {}, this.setPerAction(o, C(C({}, n.perAction), n.actions[o])), this[r](t[o]);
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
        } = i, r = g.string(o) ? this.selectorMap[o] : o[this.scope.id], a = Ie(r, (s) => s === i);
        r.splice(a, 1);
      }
    });
  }
  new(t, n) {
    n = C(n || {}, {
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
      return ve(r, (a) => a._context === i && (o || a.inContext(t)));
  }
  forEachMatch(t, n) {
    for (const i of this.list) {
      let o;
      if ((g.string(i.target) ? g.element(t) && Wt(t, i.target) : t === i.target) && i.inContext(t) && (o = n(i)), o !== void 0)
        return o;
    }
  }
}
function nr(e) {
  const t = (n, i) => {
    let o = e.interactables.getExisting(n, i);
    return o || (o = e.interactables.new(n, i), o.events.global = t.globalEvents), o;
  };
  return t.getPointerAverage = si, t.getTouchBBox = ko, t.getTouchDistance = Ro, t.getTouchAngle = Ho, t.getElementRect = Ve, t.getElementClientRect = Ue, t.matchesSelector = Wt, t.closest = Un, t.globalEvents = {}, t.version = "1.10.27", t.scope = e, t.use = function(n, i) {
    return this.scope.usePlugin(n, i), this;
  }, t.isSet = function(n, i) {
    return !!this.scope.interactables.get(n, i && i.context);
  }, t.on = ie(function(i, o, r) {
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
    return re(i, this.scope.actions) ? this.globalEvents[i] ? this.globalEvents[i].push(o) : this.globalEvents[i] = [o] : this.scope.events.add(this.scope.document, i, o, {
      options: r
    }), this;
  }, "The interact.on() method is being deprecated"), t.off = ie(function(i, o, r) {
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
    if (re(i, this.scope.actions)) {
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
    this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = Q, this.defaults = qt(ui), this.Eventable = ii, this.actions = {
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
    const i = Lt(t);
    n = n ? C({}, n) : {}, this.documents.push({
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
    const n = this.getDocIndex(t), i = Lt(t), o = this.documents[n].options;
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
  return e.isInitialized = !0, g.window(t) && Gn(t), U.init(t), Q.init(t), Gt.init(t), e.window = t, e.document = t.document, e.usePlugin(Qo), e.usePlugin(Wo), e;
}
function wn(e) {
  return e && e.replace(/\/.*$/, "");
}
const hi = new ir(), zt = hi.interactStatic, rr = typeof globalThis < "u" ? globalThis : window;
hi.init(rr);
zt.use(To);
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
    O.isScrolling = !0, Gt.cancel(O.i), e.autoScroll = O, O.interaction = e, O.prevTime = O.now(), O.i = Gt.request(O.scroll);
  },
  stop() {
    O.isScrolling = !1, O.interaction && (O.interaction.autoScroll = null), Gt.cancel(O.i);
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
    O.isScrolling && (Gt.cancel(O.i), O.i = Gt.request(O.scroll));
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
  return (g.string(e) ? li(e, t, n) : e) || Lt(n);
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
zt.use(ar);
function lr(e) {
  const {
    actions: t,
    Interactable: n,
    defaults: i
  } = e;
  n.prototype.draggable = me.draggable, t.map.drag = me, t.methodDict.drag = "draggable", i.actions.drag = me.defaults;
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
}, me = {
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
zt.use(me);
function ur(e) {
  const {
    actions: t,
    browser: n,
    Interactable: i,
    defaults: o
  } = e;
  Tt.cursors = pr(n), Tt.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, i.prototype.resizable = function(r) {
    return dr(this, r, e);
  }, t.map.resize = Tt, t.methodDict.resize = "resizable", o.actions.resize = Tt.defaults;
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
  const a = C({}, t.coords.cur.page), s = n.options.resize;
  if (!(!(s && s.enabled) || t.pointerIsDown && /mouse|pointer/.test(t.pointerType) && (r & s.mouseButtons) === 0)) {
    if (g.object(s.edges)) {
      const c = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      };
      for (const l in c)
        c[l] = hr(l, s.edges[l], a, t._latestPointer.eventTarget, i, o, s.margin || Tt.defaultMargin);
      c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
        name: "resize",
        edges: c
      });
    } else {
      const c = s.axis !== "y" && a.x > o.right - Tt.defaultMargin, l = s.axis !== "x" && a.y > o.bottom - Tt.defaultMargin;
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
    start: C({}, o),
    corrected: C({}, o),
    previous: C({}, o),
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
  if (C(f, l), a) {
    if (C(l, s), r === "reposition") {
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
const Tt = {
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
    const o = Tt.cursors;
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
zt.use(Tt);
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
    t.snappers = C(t.snappers || {}, wr), t.createSnapGrid = t.snappers.grid;
  }
};
class pi {
  constructor(t) {
    this.states = [], this.startOffset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = ge(), this.edges = {
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
    this.prepareStates(r), this.startEdges = C({}, o.edges), this.edges = C({}, this.startEdges), this.startOffset = Ir(o.rect, n), this.startDelta = {
      x: 0,
      y: 0
    };
    const a = this.fillArg({
      phase: i,
      pageCoords: n,
      preEnd: !1
    });
    return this.result = ge(), this.startAll(a), this.result = this.setAll(a);
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
    t.coords = C({}, t.pageCoords), t.rect = C({}, r), t.edges = C({}, a);
    const s = o ? this.states.slice(o) : this.states, c = ge(t.coords, t.rect);
    for (const h of s) {
      var l;
      const {
        options: m
      } = h, x = C({}, t.coords);
      let I = null;
      (l = h.methods) != null && l.set && this.shouldDo(m, i, n) && (t.state = h, I = h.methods.set(t), Ze(t.edges, t.rect, {
        x: t.coords.x - x.x,
        y: t.coords.y - x.y
      })), c.eventProps.push(I);
    }
    C(this.edges, t.edges), c.delta.x = t.coords.x - t.pageCoords.x, c.delta.y = t.coords.y - t.pageCoords.y, c.rectDelta.left = t.rect.left - r.left, c.rectDelta.right = t.rect.right - r.right, c.rectDelta.top = t.rect.top - r.top, c.rectDelta.bottom = t.rect.bottom - r.bottom;
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
    i === "start" && C(this.startDelta, a.delta);
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
    const i = C({
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
    this.startOffset = t.startOffset, this.startDelta = t.startDelta, this.startEdges = t.startEdges, this.edges = t.edges, this.states = t.states.map((n) => qt(n)), this.result = ge(C({}, t.result.coords), C({}, t.result.rect));
  }
  destroy() {
    for (const t in this)
      this[t] = null;
  }
}
function ge(e, t) {
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
function At(e, t) {
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
    r === "preserve" && (r = n.width / n.height), t.startCoords = C({}, o), t.startRect = C({}, n), t.ratio = r, t.equalDelta = s;
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
    if (a !== !1 && C(i, l), !(c != null && c.length))
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
    } = t, r = C({}, i), a = t.equalDelta ? _r : Mr;
    if (C(e.edges, o), a(t, t.xIsPrimaryAxis, i, n), !t.subModification)
      return null;
    const s = C({}, n);
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
      a(t, u, c.coords, c.rect), C(i, c.coords);
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
function Mr(e, t, n, i) {
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
var Dr = At(zr, "aspectRatio");
function Cr(e) {
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
  } = a, c = C({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }, a.offset || {});
  if (t && s) {
    const l = Ft(a.restriction, o, r);
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
  } = i, a = Ft(o.restriction, n, t);
  if (!a)
    return;
  const s = Go(a);
  t.x = Math.max(Math.min(s.right - r.right, t.x), s.left + r.left), t.y = Math.max(Math.min(s.bottom - r.bottom, t.y), s.top + r.top);
}
function Ft(e, t, n) {
  return g.func(e) ? oe(e, t.interactable, t.element, [n.x, n.y, t]) : oe(e, t.interactable, t.element);
}
const Or = {
  restriction: null,
  elementRect: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, xe = {
  start: Cr,
  set: Pr,
  defaults: Or
};
var Ar = At(xe, "restrict");
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
    const a = Ft(o.offset, t, t.coords.start.page);
    r = ze(a);
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
  const s = C({}, t), c = Ft(a.inner, i, s) || {}, l = Ft(a.outer, i, s) || {};
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
}, ee = {
  noInner: gi,
  noOuter: vi,
  start: kr,
  set: Rr,
  defaults: Hr
};
var $r = At(ee, "restrictEdges");
const Br = C({
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
}, xe.defaults), Lr = {
  start: xe.start,
  set: xe.set,
  defaults: Br
};
var Wr = At(Lr, "restrictRect");
const Fr = {
  width: -1 / 0,
  height: -1 / 0
}, Nr = {
  width: 1 / 0,
  height: 1 / 0
};
function jr(e) {
  return ee.start(e);
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
  const a = yn(Ft(r.min, t, e.coords)) || Fr, s = yn(Ft(r.max, t, e.coords)) || Nr;
  n.options = {
    endOnly: r.endOnly,
    inner: C({}, ee.noInner),
    outer: C({}, ee.noOuter)
  }, o.top ? (n.options.inner.top = i.bottom - a.height, n.options.outer.top = i.bottom - s.height) : o.bottom && (n.options.inner.bottom = i.top + a.height, n.options.outer.bottom = i.top + s.height), o.left ? (n.options.inner.left = i.right - a.width, n.options.outer.left = i.right - s.width) : o.right && (n.options.inner.right = i.left + a.width, n.options.outer.right = i.left + s.width), ee.set(e), n.options = r;
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
var qr = At(Gr, "restrictSize");
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
    const f = oe(s.offset, n, i, [t]);
    l = ze(f) || {
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
  } = i, a = Qe(t.interactable, t.element, t.prepared.name), s = C({}, n), c = [];
  o.offsetWithOrigin || (s.x -= a.x, s.y -= a.y);
  for (const u of r) {
    const f = s.x - u.x, h = s.y - u.y;
    for (let m = 0, x = o.targets.length; m < x; m++) {
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
    const f = u.range, h = u.x - s.x, m = u.y - s.y, x = Te(h, m);
    let I = x <= f;
    f === 1 / 0 && l.inRange && l.range !== 1 / 0 && (I = !1), (!l.target || (I ? l.inRange && f !== 1 / 0 ? x / f < l.distance / l.range : f === 1 / 0 && l.range !== 1 / 0 || x < l.distance : !l.inRange && x < l.distance)) && (l.target = u, l.distance = x, l.range = f, l.inRange = I, l.delta.x = h, l.delta.y = m);
  }
  return l.inRange && (n.x = l.target.x, n.y = l.target.y), i.closest = l, l;
}
function Kr(e) {
  const {
    element: t
  } = e.interaction;
  return ze(oe(e.state.options.origin, null, null, [t])) || Qe(e.interactable, t, e.interaction.prepared.name);
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
var Zr = At(en, "snap");
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
  n.options = C({}, o), n.options.targets = [];
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
}, we = {
  start: Qr,
  set: ts,
  defaults: es
};
var ns = At(we, "snapSize");
function is(e) {
  const {
    edges: t
  } = e;
  return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], we.start(e)) : null;
}
const os = {
  start: is,
  set: we.set,
  defaults: C(qt(we.defaults), {
    targets: void 0,
    range: void 0,
    offset: {
      x: 0,
      y: 0
    }
  })
};
var rs = At(os, "snapEdges");
const Zt = () => {
};
Zt._defaults = {};
var He = {
  aspectRatio: Dr,
  restrictEdges: $r,
  restrict: Ar,
  restrictRect: Wr,
  restrictSize: qr,
  snapEdges: rs,
  snap: Zr,
  snapSize: ns,
  spring: Zt,
  avoid: Zt,
  transform: Zt,
  rubberband: Zt
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
zt.use(ss);
var ne = /* @__PURE__ */ function(e) {
  return e.touchAction = "touchAction", e.boxSizing = "boxSizing", e.noListeners = "noListeners", e;
}(ne || {});
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
    return r ? (C(this.options.devTools, r), this) : this.options.devTools;
  };
  const {
    _onOff: o
  } = n.prototype;
  n.prototype._onOff = function(r, a, s, c, l) {
    if (g.string(this.target) || this.target.addEventListener)
      return o.call(this, r, a, s, c, l);
    g.object(a) && !g.array(a) && (c = s, s = null);
    const u = Bt(a, s, l);
    for (const f in u)
      re(f, e.actions) || e.logger.warn(Ge + `Can't add native "${f}" event listener to target without \`addEventListener(type, listener, options)\` prop.`);
    return o.call(this, r, u, c);
  };
}
const _n = [{
  name: ne.touchAction,
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
  name: ne.boxSizing,
  perform(e) {
    const {
      element: t
    } = e;
    return e.prepared.name === "resize" && t instanceof U.HTMLElement && !mi(t, "boxSizing", /border-box/);
  },
  text: 'Consider adding CSS "box-sizing: border-box" to this resizable element',
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, qe.boxSizing];
  }
}, {
  name: ne.noListeners,
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
  const i = e.style[t] || Pt.getComputedStyle(e)[t];
  return n.test((i || "").toString());
}
function ls(e, t, n) {
  let i = e;
  for (; g.element(i); ) {
    if (mi(i, t, n))
      return !0;
    i = Ot(i);
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
  CheckName: ne,
  links: qe,
  prefix: Ge
};
zt.use(us);
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
    const { proxy: i } = fs(), o = i == null ? void 0 : i.$parent, r = zi("eventBus"), a = n, s = e, c = A({}), l = A(1), u = A(100), f = A(30), h = A([10, 10]), m = A(1 / 0), x = A(null), I = A(null), y = A(1), _ = A(!0), T = A(!0), M = A(!1), v = A(null), d = A(!1), D = A(null), E = A(NaN), F = A(NaN), nt = A(NaN), j = A(NaN), V = A({}), R = A(!1), b = A(!1), B = A(!1), L = A(null), J = A(null), tt = A(null), it = A(null), z = A(s.x), st = A(s.y), ot = A(s.w), K = A(s.h), ct = A(null), q = A(null), se = jt(() => I.value && !s.static), _e = jt(() => (x.value || I.value) && !s.static), Me = jt(() => navigator.userAgent.toLowerCase().indexOf("android") !== -1), ut = jt(() => o != null && o.isMirrored ? !R.value : R.value), S = jt(() => ({
      "vue-resizable": se.value,
      static: s.static,
      "grid-item-selected": s.selected,
      resizing: d.value,
      "vue-draggable-dragging": M.value,
      cssTransforms: _.value,
      "render-rtl": ut.value,
      "disable-userselect": M.value,
      "no-touch": Me.value && _e.value
    })), $ = jt(() => ut.value ? "vue-resizable-handle vue-rtl-resizable-handle" : "vue-resizable-handle");
    Y(
      () => s.isDraggable,
      (p) => {
        x.value = p;
      }
    ), Y(
      () => s.static,
      () => {
        sn(), xt();
      }
    ), Y(x, () => {
      sn();
    }), Y(
      () => s.isResizable,
      (p) => {
        I.value = p;
      }
    ), Y(
      () => s.isBounded,
      (p) => {
        ct.value = p;
      }
    ), Y(I, () => {
      xt();
    }), Y(f, () => {
      et(), yt();
    }), Y(l, () => {
      xt(), et(), yt();
    }), Y(u, () => {
      xt(), et();
    }), Y(
      () => s.x,
      (p) => {
        z.value = p, et();
      }
    ), Y(
      () => s.y,
      (p) => {
        st.value = p, et();
      }
    ), Y(
      () => s.h,
      (p) => {
        K.value = p, et();
      }
    ), Y(
      () => s.w,
      (p) => {
        ot.value = p, et();
      }
    ), Y(ut, () => {
      xt(), et();
    }), Y(
      () => s.minH,
      () => {
        xt();
      }
    ), Y(
      () => s.maxH,
      () => {
        xt();
      }
    ), Y(
      () => s.minW,
      () => {
        xt();
      }
    ), Y(
      () => s.maxW,
      () => {
        xt();
      }
    ), Y(
      () => o == null ? void 0 : o.margin,
      (p) => {
        !p || p[0] == h.value[0] && p[1] == h.value[1] || (h.value = p.map((w) => Number(w)), et(), yt());
      }
    );
    function G(p) {
      Ut(p);
    }
    function ht(p) {
      he();
    }
    function vt(p) {
      s.isDraggable === null && (x.value = p);
    }
    function wt(p) {
      s.isResizable === null && (I.value = p);
    }
    function Et(p) {
      s.isBounded === null && (ct.value = p);
    }
    function at(p) {
      y.value = p;
    }
    function X(p) {
      f.value = p;
    }
    function ft(p) {
      m.value = p;
    }
    function mt() {
      R.value = dn() === "rtl", he();
    }
    function pt(p) {
      const w = p.toString();
      l.value = parseInt(w);
    }
    r.on("updateWidth", G), r.on("compact", ht), r.on("setDraggable", vt), r.on("setResizable", wt), r.on("setBounded", Et), r.on("setTransformScale", at), r.on("setRowHeight", X), r.on("setMaxRows", ft), r.on("directionchange", mt), r.on("setColNum", pt), R.value = dn() === "rtl", Rn(() => {
      r.off("updateWidth", G), r.off("compact", ht), r.off("setDraggable", vt), r.off("setResizable", wt), r.off("setBounded", Et), r.off("setTransformScale", at), r.off("setRowHeight", X), r.off("setMaxRows", ft), r.off("directionchange", mt), r.off("setColNum", pt), q.value && q.value.unset();
    }), Hn(() => {
      (o == null ? void 0 : o.responsive) && o.lastBreakpoint ? l.value = Ne(o.lastBreakpoint, o == null ? void 0 : o.cols) : l.value = o == null ? void 0 : o.colNum, f.value = o == null ? void 0 : o.rowHeight, u.value = (o == null ? void 0 : o.width) !== null ? o == null ? void 0 : o.width : 100, h.value = (o == null ? void 0 : o.margin) !== void 0 ? o.margin : [10, 10], m.value = o == null ? void 0 : o.maxRows, s.isDraggable === null ? x.value = o == null ? void 0 : o.isDraggable : x.value = s.isDraggable, s.isResizable === null ? I.value = o == null ? void 0 : o.isResizable : I.value = s.isResizable, s.isBounded === null ? ct.value = o == null ? void 0 : o.isBounded : ct.value = s.isBounded, y.value = o == null ? void 0 : o.transformScale, _.value = o == null ? void 0 : o.useCssTransforms, T.value = o == null ? void 0 : o.useStyleCursor, et();
    });
    function et() {
      var k, H, P, N, lt;
      s.x + s.w > l.value ? (z.value = 0, ot.value = s.w > l.value ? l.value : s.w) : (z.value = s.x, ot.value = s.w);
      let p = dt(z.value, st.value, ot.value, K.value);
      M.value && (p.top = (k = v.value) == null ? void 0 : k.top, ut.value ? p.right = (H = v.value) == null ? void 0 : H.left : p.left = (P = v.value) == null ? void 0 : P.left), d.value && (p.width = (N = D.value) == null ? void 0 : N.width, p.height = (lt = D.value) == null ? void 0 : lt.height);
      let w;
      _.value ? ut.value ? w = Li(p.top, p.right, p.width, p.height) : w = Bi(p.top, p.left, p.width, p.height) : ut.value ? w = Fi(p.top, p.right, p.width, p.height) : w = Wi(p.top, p.left, p.width, p.height), V.value = w;
    }
    function yt() {
      let p = {};
      for (let w of ["width", "height"]) {
        let H = V.value[w].match(/^(\d+)px$/);
        if (!H)
          return;
        p[w] = H[1];
      }
      a("container-resized", s.i, s.h, s.w, p.height, p.width);
    }
    function ae(p) {
      var w, k, H;
      {
        if (s.static)
          return;
        const P = un(p);
        if (P == null)
          return;
        const { x: N, y: lt } = P, Z = { width: 0, height: 0 };
        let W;
        switch (p.type) {
          case "resizestart": {
            xt(), L.value = ot.value, J.value = K.value, W = dt(z.value, st.value, ot.value, K.value), Z.width = W.width, Z.height = W.height, D.value = Z, d.value = !0;
            break;
          }
          case "resizemove": {
            const _t = fn(nt.value, j.value, N, lt);
            ut.value ? Z.width = Number((w = D.value) == null ? void 0 : w.width) - _t.deltaX / y.value : Z.width = Number((k = D.value) == null ? void 0 : k.width) + _t.deltaX / y.value, Z.height = Number((H = D.value) == null ? void 0 : H.height) + _t.deltaY / y.value, D.value = Z;
            break;
          }
          case "resizeend": {
            W = dt(z.value, st.value, ot.value, K.value), Z.width = W.width, Z.height = W.height, D.value = null, d.value = !1;
            break;
          }
        }
        W = de(Z.height, Z.width), W.w < s.minW && (W.w = s.minW), W.w > s.maxW && (W.w = s.maxW), W.h < s.minH && (W.h = s.minH), W.h > s.maxH && (W.h = s.maxH), W.h < 1 && (W.h = 1), W.w < 1 && (W.w = 1), nt.value = N, j.value = lt, (ot.value !== W.w || K.value !== W.h) && a("resize", s.i, W.h, W.w, Z.height, Z.width), p.type === "resizeend" && (L.value !== ot.value || J.value !== K.value) && a("resized", s.i, W.h, W.w, Z.height, Z.width);
        const Nt = {
          eventType: p.type,
          i: s.i,
          x: z.value,
          y: st.value,
          h: W.h,
          w: W.w
        };
        r.emit("resizeEvent", Nt);
      }
    }
    function kt(p, w) {
      if (!w && s.selected && s.selectedItems.length > 1 && s.selectedItems.filter((lt) => lt !== s.i).forEach((lt) => {
        r.emit("dragSelected", {
          event: p,
          i: lt
        });
      }), s.static || d.value)
        return;
      const k = un(p);
      if (k === null)
        return;
      const { x: H, y: P } = k;
      let N = {
        top: 0,
        left: 0
      };
      switch (p.type) {
        case "dragstart": {
          N = le();
          break;
        }
        case "dragend": {
          if (!M.value)
            return;
          N = ue(p);
          break;
        }
        case "dragmove": {
          N = ce(p, k);
          break;
        }
      }
      rt(N, H, P, p);
    }
    function le() {
      const p = {
        top: 0,
        left: 0
      };
      tt.value = z.value, it.value = st.value;
      const w = c.value;
      let H = w.offsetParent.getBoundingClientRect(), P = w.getBoundingClientRect();
      const N = P.left / y.value, lt = H.left / y.value, Z = P.right / y.value, W = H.right / y.value, Nt = P.top / y.value, _t = H.top / y.value;
      return ut.value ? p.left = (Z - W) * -1 : p.left = N - lt, p.top = Nt - _t, v.value = p, M.value = !0, p;
    }
    function ce(p, w) {
      var lt, Z, W;
      const { x: k, y: H } = w, P = {
        top: 0,
        left: 0
      };
      a("dragging", p, s.i);
      const N = fn(E.value, F.value, k, H);
      if (ut.value ? P.left = Number((lt = v.value) == null ? void 0 : lt.left) - N.deltaX / y.value : P.left = Number((Z = v.value) == null ? void 0 : Z.left) + N.deltaX / y.value, P.top = Number((W = v.value) == null ? void 0 : W.top) + N.deltaY / y.value, ct.value) {
        const Ce = p.target.offsetParent.clientHeight - fe(s.h, f.value, h.value[1]);
        P.top = Rt(P.top, 0, Ce);
        const Si = gt(), Ii = u.value - fe(s.w, Si, h.value[0]);
        P.left = Rt(P.left, 0, Ii);
      }
      return v.value = P, P;
    }
    function ue(p) {
      const w = {
        top: 0,
        left: 0
      };
      a("dragend", p, s.i);
      const k = c.value;
      let P = k.offsetParent.getBoundingClientRect(), N = k.getBoundingClientRect();
      const lt = N.left / y.value, Z = P.left / y.value, W = N.right / y.value, Nt = P.right / y.value, _t = N.top / y.value, Ce = P.top / y.value;
      return ut.value ? w.left = (W - Nt) * -1 : w.left = lt - Z, w.top = _t - Ce, v.value = null, M.value = !1, w;
    }
    function rt(p, w, k, H) {
      let P;
      ut.value, P = bt(p.top, p.left), E.value = w, F.value = k, (z.value !== P.x || st.value !== P.y) && a("move", s.i, P.x, P.y), H.type === "dragend" && (tt.value !== z.value || it.value !== st.value) && a("moved", s.i, P.x, P.y);
      const N = {
        eventType: H.type,
        i: s.i,
        x: P.x,
        y: P.y,
        h: K.value,
        w: ot.value
      };
      r.emit("dragEvent", N);
    }
    function dt(p, w, k, H) {
      const P = gt();
      let N;
      return ut.value ? N = {
        right: Math.round(P * p + (p + 1) * h.value[0]),
        top: Math.round(f.value * w + (w + 1) * h.value[1]),
        width: k === 1 / 0 ? k : Math.round(P * k + Math.max(0, k - 1) * h.value[0]),
        height: H === 1 / 0 ? H : Math.round(f.value * H + Math.max(0, H - 1) * h.value[1])
      } : N = {
        left: Math.round(P * p + (p + 1) * h.value[0]),
        top: Math.round(f.value * w + (w + 1) * h.value[1]),
        width: k === 1 / 0 ? k : Math.round(P * k + Math.max(0, k - 1) * h.value[0]),
        height: H === 1 / 0 ? H : Math.round(f.value * H + Math.max(0, H - 1) * h.value[1])
      }, N;
    }
    function bt(p, w) {
      const k = gt();
      let H = Math.round((w - h.value[0]) / (k + h.value[0])), P = Math.round((p - h.value[1]) / (f.value + h.value[1]));
      return H = Math.max(Math.min(H, l.value - ot.value), 0), P = Math.max(Math.min(P, m.value - K.value), 0), { x: H, y: P };
    }
    function gt() {
      return (u.value - h.value[0] * (l.value + 1)) / l.value;
    }
    function fe(p, w, k) {
      return Number.isFinite(p) ? Math.round(w * p + Math.max(0, p - 1) * k) : p;
    }
    function Rt(p, w, k) {
      return Math.max(Math.min(p, k), w);
    }
    function de(p, w, k = !1) {
      const H = gt();
      let P = Math.round((w + h.value[0]) / (H + h.value[0])), N = 0;
      return k ? N = Math.ceil((p + h.value[1]) / (f.value + h.value[1])) : N = Math.round((p + h.value[1]) / (f.value + h.value[1])), P = Math.max(Math.min(P, l.value - z.value), 0), N = Math.max(Math.min(N, m.value - st.value), 0), { w: P, h: N };
    }
    function Ut(p, w) {
      u.value = p, w != null && (l.value = w);
    }
    function he(p) {
      et();
    }
    function sn() {
      if ((q.value === null || q.value === void 0) && (q.value = zt(c.value), T.value || q.value.styleCursor(!1)), x.value && !s.static) {
        const p = {
          ignoreFrom: s.dragIgnoreFrom,
          allowFrom: s.dragAllowFrom,
          ...s.dragOption
        };
        q.value.draggable(p), b.value || (b.value = !0, q.value.on("dragstart dragmove dragend", function(w) {
          kt(w);
        }), r.on("dragSelected", ({ event: w, i: k }) => {
          k === s.i && kt(w, !0);
        }));
      } else
        q.value.draggable({
          enabled: !1
        });
    }
    function xt() {
      if ((q.value === null || q.value === void 0) && (q.value = zt(c.value), T.value || q.value.styleCursor(!1)), I.value && !s.static) {
        let p = dt(0, 0, s.maxW, s.maxH), w = dt(0, 0, s.minW, s.minH);
        const k = {
          edges: {
            left: !1,
            right: "." + $.value.trim().replace(" ", "."),
            bottom: "." + $.value.trim().replace(" ", "."),
            top: !1
          },
          ignoreFrom: s.resizeIgnoreFrom,
          restrictSize: {
            min: {
              height: w.height * y.value,
              width: w.width * y.value
            },
            max: {
              height: p.height * y.value,
              width: p.width * y.value
            }
          },
          ...s.resizeOption
        };
        s.preserveAspectRatio && (k.modifiers = [
          zt.modifiers.aspectRatio({
            ratio: "preserve"
          })
        ]), q.value.resizable(k), B.value || (B.value = !0, q.value.on("resizestart resizemove resizeend", function(H) {
          ae(H);
        }));
      } else
        q.value.resizable({
          enabled: !1
        });
    }
    const De = _i();
    function Ei() {
      L.value = ot.value, J.value = K.value;
      let p = De == null ? void 0 : De.default[0].elm.getBoundingClientRect(), w = de(p.height, p.width, !0);
      if (w.w < s.minW && (w.w = s.minW), w.w > s.maxW && (w.w = s.maxW), w.h < s.minH && (w.h = s.minH), w.h > s.maxH && (w.h = s.maxH), w.h < 1 && (w.h = 1), w.w < 1 && (w.w = 1), (ot.value !== w.w || K.value !== w.h) && a("resize", s.i, w.h, w.w, p.height, p.width), L.value !== w.w || J.value !== w.h) {
        a("resized", s.i, w.h, w.w, p.height, p.width);
        const k = {
          eventType: "resizeend",
          i: s.i,
          x: z.value,
          y: st.value,
          h: w.h,
          w: w.w
        };
        r.emit("resizeEvent", k);
      }
    }
    return t({
      autoSize: Ei,
      calcXY: bt,
      dragging: v,
      ...s
    }), (p, w) => ($e(), Be("div", {
      ref_key: "this$refsItem",
      ref: c,
      class: an(["vue-grid-item", S.value]),
      style: Le(V.value)
    }, [
      $n(p.$slots, "default", {
        style: Le(V.value)
      }),
      se.value ? ($e(), Be("span", {
        key: 0,
        ref: "handle",
        class: an($.value)
      }, null, 2)) : Mi("", !0)
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
var Mn = xi.exports, Es = function(t) {
  t = t || {};
  var n = t.reporter, i = Mn.getOption(t, "async", !0), o = Mn.getOption(t, "auto", !0);
  o && !i && (n && n.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), i = !0);
  var r = Dn(), a, s = !1;
  function c(x, I) {
    !s && o && i && r.size() === 0 && f(), r.add(x, I);
  }
  function l() {
    for (s = !0; r.size(); ) {
      var x = r;
      r = Dn(), x.process();
    }
    s = !1;
  }
  function u(x) {
    s || (x === void 0 && (x = i), a && (h(a), a = null), x ? f() : l());
  }
  function f() {
    a = m(l);
  }
  function h(x) {
    var I = clearTimeout;
    return I(x);
  }
  function m(x) {
    var I = function(y) {
      return setTimeout(y, 0);
    };
    return I(x);
  }
  return {
    add: c,
    force: u
  };
};
function Dn() {
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
}, Jt = on.exports, zs = function(e) {
  e = e || {};
  var t = e.reporter, n = e.batchProcessor, i = e.stateHandler.getState;
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  function o(l, u) {
    function f() {
      u(l);
    }
    if (Jt.isIE(8))
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
    function h(m, x) {
      var I = r(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]), y = !1, _ = window.getComputedStyle(m), T = m.offsetWidth, M = m.offsetHeight;
      i(m).startSize = {
        width: T,
        height: M
      };
      function v() {
        function d() {
          if (_.position === "static") {
            m.style.setProperty("position", "relative", l.important ? "important" : "");
            var F = function(nt, j, V, R) {
              function b(L) {
                return L.replace(/[^-\d\.]/g, "");
              }
              var B = V[R];
              B !== "auto" && b(B) !== "0" && (nt.warn("An element that is positioned static has style." + R + "=" + B + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + R + " will be set to 0. Element: ", j), j.style.setProperty(R, "0", l.important ? "important" : ""));
            };
            F(t, m, _, "top"), F(t, m, _, "right"), F(t, m, _, "bottom"), F(t, m, _, "left");
          }
        }
        function D() {
          y || d();
          function F(j, V) {
            if (!j.contentDocument) {
              var R = i(j);
              R.checkForObjectDocumentTimeoutId && window.clearTimeout(R.checkForObjectDocumentTimeoutId), R.checkForObjectDocumentTimeoutId = setTimeout(function() {
                R.checkForObjectDocumentTimeoutId = 0, F(j, V);
              }, 100);
              return;
            }
            V(j.contentDocument);
          }
          var nt = this;
          F(nt, function(V) {
            x(m);
          });
        }
        _.position !== "" && (d(), y = !0);
        var E = document.createElement("object");
        E.style.cssText = I, E.tabIndex = -1, E.type = "text/html", E.setAttribute("aria-hidden", "true"), E.onload = D, Jt.isIE() || (E.data = "about:blank"), i(m) && (m.appendChild(E), i(m).object = E, Jt.isIE() && (E.data = "about:blank"));
      }
      n ? n.add(v) : v();
    }
    Jt.isIE(8) ? f(u) : h(u, f);
  }
  function s(l) {
    return i(l).object;
  }
  function c(l) {
    if (!!i(l)) {
      var u = s(l);
      !u || (Jt.isIE(8) ? l.detachEvent("onresize", u.proxy) : l.removeChild(u), i(l).checkForObjectDocumentTimeoutId && window.clearTimeout(i(l).checkForObjectDocumentTimeoutId), delete i(l).object);
    }
  }
  return {
    makeDetectable: a,
    addListener: o,
    uninstall: c
  };
}, _s = nn.exports.forEach, Ms = function(e) {
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
    var v = 500, d = 500, D = document.createElement("div");
    D.style.cssText = l(["position: absolute", "width: " + v * 2 + "px", "height: " + d * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var E = document.createElement("div");
    E.style.cssText = l(["position: absolute", "width: " + v + "px", "height: " + d + "px", "overflow: scroll", "visibility: none", "top: " + -v * 3 + "px", "left: " + -d * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]), E.appendChild(D), document.body.insertBefore(E, document.body.firstChild);
    var F = v - E.clientWidth, nt = d - E.clientHeight;
    return document.body.removeChild(E), {
      width: F,
      height: nt
    };
  }
  function f(v, d, D) {
    function E(V, R) {
      R = R || function(B) {
        v.head.appendChild(B);
      };
      var b = v.createElement("style");
      return b.innerHTML = V, b.id = d, R(b), b;
    }
    if (!v.getElementById(d)) {
      var F = D + "_animation", nt = D + "_animation_active", j = `/* Created by the element-resize-detector library. */
`;
      j += "." + D + " > div::-webkit-scrollbar { " + l(["display: none"]) + ` }

`, j += "." + nt + " { " + l(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + F, "animation-name: " + F]) + ` }
`, j += "@-webkit-keyframes " + F + ` { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
`, j += "@keyframes " + F + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", E(j);
    }
  }
  function h(v) {
    v.className += " " + s + "_animation_active";
  }
  function m(v, d, D) {
    if (v.addEventListener)
      v.addEventListener(d, D);
    else if (v.attachEvent)
      v.attachEvent("on" + d, D);
    else
      return t.error("[scroll] Don't know how to add event listeners.");
  }
  function x(v, d, D) {
    if (v.removeEventListener)
      v.removeEventListener(d, D);
    else if (v.detachEvent)
      v.detachEvent("on" + d, D);
    else
      return t.error("[scroll] Don't know how to remove event listeners.");
  }
  function I(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[0];
  }
  function y(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[1];
  }
  function _(v, d) {
    var D = i(v).listeners;
    if (!D.push)
      throw new Error("Cannot add listener to an element that is not detectable.");
    i(v).listeners.push(d);
  }
  function T(v, d, D) {
    D || (D = d, d = v, v = null), v = v || {};
    function E() {
      if (v.debug) {
        var S = Array.prototype.slice.call(arguments);
        if (S.unshift(o.get(d), "Scroll: "), t.log.apply)
          t.log.apply(null, S);
        else
          for (var $ = 0; $ < S.length; $++)
            t.log(S[$]);
      }
    }
    function F(S) {
      function $(G) {
        var ht = G.getRootNode && G.getRootNode().contains(G);
        return G === G.ownerDocument.body || G.ownerDocument.body.contains(G) || ht;
      }
      return !$(S) || window.getComputedStyle(S) === null;
    }
    function nt(S) {
      var $ = i(S).container.childNodes[0], G = window.getComputedStyle($);
      return !G.width || G.width.indexOf("px") === -1;
    }
    function j() {
      var S = window.getComputedStyle(d), $ = {};
      return $.position = S.position, $.width = d.offsetWidth, $.height = d.offsetHeight, $.top = S.top, $.right = S.right, $.bottom = S.bottom, $.left = S.left, $.widthCSS = S.width, $.heightCSS = S.height, $;
    }
    function V() {
      var S = j();
      i(d).startSize = {
        width: S.width,
        height: S.height
      }, E("Element start size", i(d).startSize);
    }
    function R() {
      i(d).listeners = [];
    }
    function b() {
      if (E("storeStyle invoked."), !i(d)) {
        E("Aborting because element has been uninstalled");
        return;
      }
      var S = j();
      i(d).style = S;
    }
    function B(S, $, G) {
      i(S).lastWidth = $, i(S).lastHeight = G;
    }
    function L(S) {
      return I(S).childNodes[0];
    }
    function J() {
      return 2 * r.width + 1;
    }
    function tt() {
      return 2 * r.height + 1;
    }
    function it(S) {
      return S + 10 + J();
    }
    function z(S) {
      return S + 10 + tt();
    }
    function st(S) {
      return S * 2 + J();
    }
    function ot(S) {
      return S * 2 + tt();
    }
    function K(S, $, G) {
      var ht = I(S), vt = y(S), wt = it($), Et = z(G), at = st($), X = ot(G);
      ht.scrollLeft = wt, ht.scrollTop = Et, vt.scrollLeft = at, vt.scrollTop = X;
    }
    function ct() {
      var S = i(d).container;
      if (!S) {
        S = document.createElement("div"), S.className = s, S.style.cssText = l(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), i(d).container = S, h(S), d.appendChild(S);
        var $ = function() {
          i(d).onRendered && i(d).onRendered();
        };
        m(S, "animationstart", $), i(d).onAnimationStart = $;
      }
      return S;
    }
    function q() {
      function S() {
        var rt = i(d).style;
        if (rt.position === "static") {
          d.style.setProperty("position", "relative", v.important ? "important" : "");
          var dt = function(bt, gt, fe, Rt) {
            function de(he) {
              return he.replace(/[^-\d\.]/g, "");
            }
            var Ut = fe[Rt];
            Ut !== "auto" && de(Ut) !== "0" && (bt.warn("An element that is positioned static has style." + Rt + "=" + Ut + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + Rt + " will be set to 0. Element: ", gt), gt.style[Rt] = 0);
          };
          dt(t, d, rt, "top"), dt(t, d, rt, "right"), dt(t, d, rt, "bottom"), dt(t, d, rt, "left");
        }
      }
      function $(rt, dt, bt, gt) {
        return rt = rt ? rt + "px" : "0", dt = dt ? dt + "px" : "0", bt = bt ? bt + "px" : "0", gt = gt ? gt + "px" : "0", ["left: " + rt, "top: " + dt, "right: " + gt, "bottom: " + bt];
      }
      if (E("Injecting elements"), !i(d)) {
        E("Aborting because element has been uninstalled");
        return;
      }
      S();
      var G = i(d).container;
      G || (G = ct());
      var ht = r.width, vt = r.height, wt = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]), Et = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat($(-(1 + ht), -(1 + vt), -vt, -ht))), at = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), X = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), ft = l(["position: absolute", "left: 0", "top: 0"]), mt = l(["position: absolute", "width: 200%", "height: 200%"]), pt = document.createElement("div"), et = document.createElement("div"), yt = document.createElement("div"), ae = document.createElement("div"), kt = document.createElement("div"), le = document.createElement("div");
      pt.dir = "ltr", pt.style.cssText = wt, pt.className = s, et.className = s, et.style.cssText = Et, yt.style.cssText = at, ae.style.cssText = ft, kt.style.cssText = X, le.style.cssText = mt, yt.appendChild(ae), kt.appendChild(le), et.appendChild(yt), et.appendChild(kt), pt.appendChild(et), G.appendChild(pt);
      function ce() {
        var rt = i(d);
        rt && rt.onExpand ? rt.onExpand() : E("Aborting expand scroll handler: element has been uninstalled");
      }
      function ue() {
        var rt = i(d);
        rt && rt.onShrink ? rt.onShrink() : E("Aborting shrink scroll handler: element has been uninstalled");
      }
      m(yt, "scroll", ce), m(kt, "scroll", ue), i(d).onExpandScroll = ce, i(d).onShrinkScroll = ue;
    }
    function se() {
      function S(at, X, ft) {
        var mt = L(at), pt = it(X), et = z(ft);
        mt.style.setProperty("width", pt + "px", v.important ? "important" : ""), mt.style.setProperty("height", et + "px", v.important ? "important" : "");
      }
      function $(at) {
        var X = d.offsetWidth, ft = d.offsetHeight, mt = X !== i(d).lastWidth || ft !== i(d).lastHeight;
        E("Storing current size", X, ft), B(d, X, ft), n.add(0, function() {
          if (!!mt) {
            if (!i(d)) {
              E("Aborting because element has been uninstalled");
              return;
            }
            if (!G()) {
              E("Aborting because element container has not been initialized");
              return;
            }
            if (v.debug) {
              var et = d.offsetWidth, yt = d.offsetHeight;
              (et !== X || yt !== ft) && t.warn(o.get(d), "Scroll: Size changed before updating detector elements.");
            }
            S(d, X, ft);
          }
        }), n.add(1, function() {
          if (!i(d)) {
            E("Aborting because element has been uninstalled");
            return;
          }
          if (!G()) {
            E("Aborting because element container has not been initialized");
            return;
          }
          K(d, X, ft);
        }), mt && at && n.add(2, function() {
          if (!i(d)) {
            E("Aborting because element has been uninstalled");
            return;
          }
          if (!G()) {
            E("Aborting because element container has not been initialized");
            return;
          }
          at();
        });
      }
      function G() {
        return !!i(d).container;
      }
      function ht() {
        function at() {
          return i(d).lastNotifiedWidth === void 0;
        }
        E("notifyListenersIfNeeded invoked");
        var X = i(d);
        if (at() && X.lastWidth === X.startSize.width && X.lastHeight === X.startSize.height)
          return E("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        if (X.lastWidth === X.lastNotifiedWidth && X.lastHeight === X.lastNotifiedHeight)
          return E("Not notifying: Size already notified");
        E("Current size not notified, notifying..."), X.lastNotifiedWidth = X.lastWidth, X.lastNotifiedHeight = X.lastHeight, _s(i(d).listeners, function(ft) {
          ft(d);
        });
      }
      function vt() {
        if (E("startanimation triggered."), nt(d)) {
          E("Ignoring since element is still unrendered...");
          return;
        }
        E("Element rendered.");
        var at = I(d), X = y(d);
        (at.scrollLeft === 0 || at.scrollTop === 0 || X.scrollLeft === 0 || X.scrollTop === 0) && (E("Scrollbars out of sync. Updating detector elements..."), $(ht));
      }
      function wt() {
        if (E("Scroll detected."), nt(d)) {
          E("Scroll event fired while unrendered. Ignoring...");
          return;
        }
        $(ht);
      }
      if (E("registerListenersAndPositionElements invoked."), !i(d)) {
        E("Aborting because element has been uninstalled");
        return;
      }
      i(d).onRendered = vt, i(d).onExpand = wt, i(d).onShrink = wt;
      var Et = i(d).style;
      S(d, Et.width, Et.height);
    }
    function _e() {
      if (E("finalizeDomMutation invoked."), !i(d)) {
        E("Aborting because element has been uninstalled");
        return;
      }
      var S = i(d).style;
      B(d, S.width, S.height), K(d, S.width, S.height);
    }
    function Me() {
      D(d);
    }
    function ut() {
      E("Installing..."), R(), V(), n.add(0, b), n.add(1, q), n.add(2, se), n.add(3, _e), n.add(4, Me);
    }
    E("Making detectable..."), F(d) ? (E("Element is detached"), ct(), E("Waiting until element is attached..."), i(d).onRendered = function() {
      E("Element is now attached"), ut();
    }) : ut();
  }
  function M(v) {
    var d = i(v);
    !d || (d.onExpandScroll && x(I(v), "scroll", d.onExpandScroll), d.onShrinkScroll && x(y(v), "scroll", d.onShrinkScroll), d.onAnimationStart && x(d.container, "animationstart", d.onAnimationStart), d.container && v.removeChild(d.container));
  }
  return {
    makeDetectable: T,
    addListener: _,
    uninstall: M,
    initDocument: c
  };
}, Qt = nn.exports.forEach, Ds = gs, Cs = vs, Ps = ms, Os = ys, As = bs, Cn = on.exports, ks = Es, Mt = Ts, Rs = zs, Hs = Ms;
function Pn(e) {
  return Array.isArray(e) || e.length !== void 0;
}
function On(e) {
  if (Array.isArray(e))
    return e;
  var t = [];
  return Qt(e, function(n) {
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
      stateHandler: Mt
    });
    t = i;
  }
  var o = e.reporter;
  if (!o) {
    var r = o === !1;
    o = As(r);
  }
  var a = Dt(e, "batchProcessor", ks({ reporter: o })), s = {};
  s.callOnAdd = !!Dt(e, "callOnAdd", !0), s.debug = !!Dt(e, "debug", !1);
  var c = Cs(t), l = Ds({
    stateHandler: Mt
  }), u, f = Dt(e, "strategy", "object"), h = Dt(e, "important", !1), m = {
    reporter: o,
    batchProcessor: a,
    stateHandler: Mt,
    idHandler: t,
    important: h
  };
  if (f === "scroll" && (Cn.isLegacyOpera() ? (o.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), f = "object") : Cn.isIE(9) && (o.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), f = "object")), f === "scroll")
    u = Hs(m);
  else if (f === "object")
    u = Rs(m);
  else
    throw new Error("Invalid strategy name: " + f);
  var x = {};
  function I(T, M, v) {
    function d(V) {
      var R = c.get(V);
      Qt(R, function(B) {
        B(V);
      });
    }
    function D(V, R, b) {
      c.add(R, b), V && b(R);
    }
    if (v || (v = M, M = T, T = {}), !M)
      throw new Error("At least one element required.");
    if (!v)
      throw new Error("Listener required.");
    if (An(M))
      M = [M];
    else if (Pn(M))
      M = On(M);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    var E = 0, F = Dt(T, "callOnAdd", s.callOnAdd), nt = Dt(T, "onReady", function() {
    }), j = Dt(T, "debug", s.debug);
    Qt(M, function(R) {
      Mt.getState(R) || (Mt.initState(R), t.set(R));
      var b = t.get(R);
      if (j && o.log("Attaching listener to element", b, R), !l.isDetectable(R)) {
        if (j && o.log(b, "Not detectable."), l.isBusy(R)) {
          j && o.log(b, "System busy making it detectable"), D(F, R, v), x[b] = x[b] || [], x[b].push(function() {
            E++, E === M.length && nt();
          });
          return;
        }
        return j && o.log(b, "Making detectable..."), l.markBusy(R, !0), u.makeDetectable({ debug: j, important: h }, R, function(L) {
          if (j && o.log(b, "onElementDetectable"), Mt.getState(L)) {
            l.markAsDetectable(L), l.markBusy(L, !1), u.addListener(L, d), D(F, L, v);
            var J = Mt.getState(L);
            if (J && J.startSize) {
              var tt = L.offsetWidth, it = L.offsetHeight;
              (J.startSize.width !== tt || J.startSize.height !== it) && d(L);
            }
            x[b] && Qt(x[b], function(z) {
              z();
            });
          } else
            j && o.log(b, "Element uninstalled before being detectable.");
          delete x[b], E++, E === M.length && nt();
        });
      }
      j && o.log(b, "Already detecable, adding listener."), D(F, R, v), E++;
    }), E === M.length && nt();
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
    Qt(T, function(M) {
      c.removeAllListeners(M), u.uninstall(M), Mt.cleanState(M);
    });
  }
  function _(T) {
    u.initDocument && u.initDocument(T);
  }
  return {
    listenTo: I,
    removeListener: c.removeListener,
    removeAllListeners: c.removeAllListeners,
    uninstall: y,
    initDocument: _
  };
};
function Dt(e, t, n) {
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
    preventCollision: { type: Boolean, default: !1 },
    useStyleCursor: { type: Boolean, default: !0 }
  },
  emits: ["layout-created", "layout-before-mount", "layout-mounted", "layout-updated", "layout-ready", "update:layout", "breakpoint-changed", "reset-selected"],
  setup(e, { expose: t, emit: n }) {
    const i = e, o = A(null), r = A({}), a = A(0), s = A(!1), c = A({ x: 0, y: 0, w: 0, h: 0, i: -1 }), l = A({}), u = A(null), f = A(null), h = A(null), m = A(), x = A({}), I = A(), y = hs();
    Di("eventBus", y);
    const _ = n;
    function T(b) {
      if (!b)
        nt();
      else {
        const { eventType: B, i: L, x: J, y: tt, h: it, w: z } = b;
        nt(B, L, J, tt, it, z);
      }
    }
    function M(b) {
      if (!b)
        F();
      else {
        const { eventType: B, i: L, x: J, y: tt, h: it, w: z } = b;
        F(B, L, J, tt);
      }
    }
    y.on("resizeEvent", T), y.on("dragEvent", M), _("layout-created", i.layout), Rn(() => {
      y.off("resizeEvent", T), y.off("dragEvent", M), Ki("resize", D), h.value && h.value.uninstall(x.value);
    }), Ci(() => {
      _("layout-before-mount", i.layout);
    }), Hn(() => {
      _("layout-mounted", i.layout), St(function() {
        Ni(i.layout), f.value = i.layout, St(() => {
          V(), D(), Vi("resize", D), Yt(i.layout, i.verticalCompact), _("layout-updated", i.layout), d(), St(() => {
            h.value = $s({
              strategy: "scroll",
              callOnAdd: !1
            }), h.value.listenTo(x.value, function() {
              D();
            });
          });
        });
      });
    }), Y(o, (b, B) => {
      St(() => {
        y.emit("updateWidth", b), B === null && St(() => {
          _("layout-ready", i.layout);
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
      (b) => {
        y.emit("setColNum", b);
      }
    ), Y(
      () => i.rowHeight,
      (b) => {
        y.emit("setRowHeight", b);
      }
    ), Y(
      () => i.isDraggable,
      (b) => {
        y.emit("setDraggable", b);
      }
    ), Y(
      () => i.isResizable,
      (b) => {
        y.emit("setResizable", b);
      }
    ), Y(
      () => i.isBounded,
      (b) => {
        y.emit("setBounded", b);
      }
    ), Y(
      () => i.transformScale,
      (b) => {
        y.emit("setTransformScale", b);
      }
    ), Y(
      () => i.responsive,
      (b) => {
        b || (_("update:layout", f.value || []), y.emit("setColNum", i.colNum)), D();
      }
    ), Y(
      () => i.maxRows,
      (b) => {
        y.emit("setMaxRows", b);
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
          let b = R(i.layout, f.value);
          b.length > 0 && (i.layout.length > f.value.length ? f.value = f.value.concat(b) : f.value = f.value.filter((B) => !b.some((L) => B.i === L.i))), a.value = i.layout.length, V();
        }
        Yt(i.layout, i.verticalCompact), y.emit("updateWidth", o.value), d(), _("layout-updated", i.layout);
      }
    }
    function d() {
      r.value = {
        height: E()
      };
    }
    function D() {
      x.value !== null && x.value !== void 0 && (o.value = x.value.offsetWidth), y.emit("resizeEvent");
    }
    function E() {
      return i.autoSize ? ki(i.layout) * (i.rowHeight + i.margin[1]) + i.margin[1] + "px" : "";
    }
    function F(b, B, L, J, tt, it) {
      let z = ln(i.layout, B);
      z != null && z.selected || _("reset-selected"), z == null && (z = { x: 0, y: 0 }), b === "dragstart" && !i.verticalCompact && (m.value = i.layout.reduce(
        (ot, { i: K, x: ct, y: q }) => ({
          ...ot,
          [K]: { x: ct, y: q }
        }),
        {}
      ), console.log("positionsBeforeDrag.value", m.value)), b === "dragmove" || b === "dragstart" ? (St(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : St(function() {
        s.value = !1;
      });
      const st = Fe(i.layout, z, L, J, !0, i.preventCollision);
      _("update:layout", st), i.restoreOnDrag ? (z.static = !0, Yt(i.layout, i.verticalCompact, m.value), z.static = !1) : Yt(i.layout, i.verticalCompact), y.emit("compact"), d(), b === "dragend" && (m.value = void 0, _("layout-updated", st));
    }
    function nt(b, B, L, J, tt, it) {
      let z = ln(i.layout, B);
      z == null && (z = { h: 0, w: 0 }), it = Number(it), tt = Number(tt);
      let st;
      if (i.preventCollision) {
        const ot = Ln(i.layout, { ...z, w: it, h: tt }).filter(
          (K) => K.i !== (z == null ? void 0 : z.i)
        );
        if (st = ot.length > 0, st) {
          let K = 1 / 0, ct = 1 / 0;
          ot.forEach((q) => {
            q.x > Number(z == null ? void 0 : z.x) && (K = Math.min(K, q.x)), q.y > Number(z == null ? void 0 : z.y) && (ct = Math.min(ct, q.y));
          }), Number.isFinite(K) && (z.w = K - z.x), Number.isFinite(ct) && (z.h = ct - z.y);
        }
      }
      st || (z.w = it, z.h = tt), b === "resizestart" || b === "resizemove" ? (c.value.i = B, c.value.x = L, c.value.y = J, c.value.w = z.w, c.value.h = z.h, St(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : St(function() {
        s.value = !1;
      }), i.responsive && j(), Yt(i.layout, i.verticalCompact), y.emit("compact"), d(), b === "resizeend" && _("layout-updated", i.layout);
    }
    function j() {
      let b = Yi(i.breakpoints, o.value), B = Ne(b, i.cols);
      u.value != null && !l.value[u.value] && (l.value[u.value] = We(i.layout));
      let L = Gi(
        f.value,
        l.value,
        i.breakpoints,
        b,
        u.value,
        B,
        i.verticalCompact
      );
      l.value[b] = L, u.value !== b && _("breakpoint-changed", b, L), _("update:layout", L), u.value = b, y.emit("setColNum", Ne(b, i.cols));
    }
    function V() {
      l.value = Object.assign({}, i.responsiveLayouts);
    }
    function R(b, B) {
      let L = b.filter(function(tt) {
        return !B.some(function(it) {
          return tt.i === it.i;
        });
      }), J = B.filter(function(tt) {
        return !b.some(function(it) {
          return tt.i === it.i;
        });
      });
      return L.concat(J);
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
      dragEvent: F
    }), (b, B) => ($e(), Be("div", {
      ref_key: "this$refsLayout",
      ref: x,
      class: "vue-grid-layout",
      style: Le(r.value)
    }, [
      $n(b.$slots, "default"),
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
