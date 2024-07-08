import './style.css';
import { getCurrentInstance as Ti, defineComponent as kn, inject as zi, ref as O, computed as Lt, watch as G, onBeforeUnmount as Rn, onMounted as Hn, useSlots as _i, openBlock as $e, createElementBlock as Be, normalizeClass as an, normalizeStyle as Le, renderSlot as $n, createCommentVNode as Ci, provide as Mi, onBeforeMount as Di, nextTick as zt, withDirectives as Pi, createVNode as Oi, vShow as Ai } from "vue";
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
function Ut(e, t, n) {
  const i = Wn(e), o = Fn(e), r = Array(e.length);
  for (let a = 0, s = o.length; a < s; a++) {
    let c = o[a];
    c.static || (c = Hi(i, c, t, n), i.push(c)), r[e.indexOf(c)] = c, c.moved = !1;
  }
  return r;
}
function Hi(e, t, n, i) {
  if (n)
    for (; t.y > 0 && !ie(e, t); )
      t.y--;
  else if (i) {
    const r = i[t.i].y;
    for (; t.y > r && !ie(e, t); )
      t.y--;
  }
  let o;
  for (; o = ie(e, t); )
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
      for (; ie(n, r); )
        r.y++;
  }
  return e;
}
function ln(e, t) {
  for (let n = 0, i = e.length; n < i; n++)
    if (e[n].i === t)
      return e[n];
}
function ie(e, t) {
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
  for (let f = 0, d = u.length; f < d; f++) {
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
    if (r.y = Math.max(t.y - n.h, 0), !ie(e, r))
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
    const d = l[u];
    if (t[d]) {
      s = t[d];
      break;
    }
  }
  return s = We(s || []), Ut($i(s, { cols: r }), a);
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
const V = {
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
function qt() {
}
function Ji(e) {
  const t = e;
  V.document = t.document, V.DocumentFragment = t.DocumentFragment || qt, V.SVGElement = t.SVGElement || qt, V.SVGSVGElement = t.SVGSVGElement || qt, V.SVGElementInstance = t.SVGElementInstance || qt, V.Element = t.Element || qt, V.HTMLElement = t.HTMLElement || V.Element, V.Event = t.Event, V.Touch = t.Touch || qt, V.PointerEvent = t.PointerEvent || t.MSPointerEvent;
}
var Xn = (e) => !!(e && e.Window) && e instanceof e.Window;
let Yn, kt;
function Gn(e) {
  Yn = e;
  const t = e.document.createTextNode("");
  t.ownerDocument !== e.document && typeof e.wrap == "function" && e.wrap(t) === t && (e = e.wrap(e)), kt = e;
}
typeof window < "u" && !!window && Gn(window);
function jt(e) {
  return Xn(e) ? e : (e.ownerDocument || e).defaultView || kt.window;
}
const Zi = (e) => e === kt || Xn(e), Qi = (e) => Ie(e) && e.nodeType === 11, Ie = (e) => !!e && typeof e == "object", qn = (e) => typeof e == "function", to = (e) => typeof e == "number", eo = (e) => typeof e == "boolean", no = (e) => typeof e == "string", io = (e) => {
  if (!e || typeof e != "object")
    return !1;
  const t = jt(e) || kt;
  return /object|function/.test(typeof Element) ? e instanceof Element || e instanceof t.Element : e.nodeType === 1 && typeof e.nodeName == "string";
}, oo = (e) => Ie(e) && !!e.constructor && /function Object\b/.test(e.constructor.toString()), ro = (e) => Ie(e) && typeof e.length < "u" && qn(e.splice);
var g = {
  window: Zi,
  docFrag: Qi,
  object: Ie,
  func: qn,
  number: to,
  bool: eo,
  string: no,
  element: io,
  plainObject: oo,
  array: ro
};
const tt = {
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
  const t = V.Element, n = e.navigator || {};
  tt.supportsTouch = "ontouchstart" in e || g.func(e.DocumentTouch) && V.document instanceof e.DocumentTouch, tt.supportsPointerEvent = n.pointerEnabled !== !1 && !!V.PointerEvent, tt.isIOS = /iP(hone|od|ad)/.test(n.platform), tt.isIOS7 = /iP(hone|od|ad)/.test(n.platform) && /OS 7[^\d]/.test(n.appVersion), tt.isIe9 = /MSIE 9/.test(n.userAgent), tt.isOperaMobile = n.appName === "Opera" && tt.supportsTouch && /Presto/.test(n.userAgent), tt.prefixedMatchesSelector = "matches" in t.prototype ? "matches" : "webkitMatchesSelector" in t.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in t.prototype ? "mozMatchesSelector" : "oMatchesSelector" in t.prototype ? "oMatchesSelector" : "msMatchesSelector", tt.pEventTypes = tt.supportsPointerEvent ? V.PointerEvent === e.MSPointerEvent ? {
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
  } : null, tt.wheelEvent = V.document && "onmousewheel" in V.document ? "mousewheel" : "wheel";
}
function Ft(e, t) {
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
    if (Xt(e, t))
      return e;
    e = Rt(e);
  }
  return null;
}
function Rt(e) {
  let t = e.parentNode;
  if (g.docFrag(t)) {
    for (; (t = t.host) && g.docFrag(t); )
      ;
    return t;
  }
  return t;
}
function Xt(e, t) {
  return kt !== Yn && (t = t.replace(/\/deep\//g, " ")), e[tt.prefixedMatchesSelector](t);
}
function je(e, t, n) {
  for (; g.element(e); ) {
    if (Xt(e, t))
      return !0;
    if (e = Rt(e), e === n)
      return Xt(e, t);
  }
  return !1;
}
function hn(e) {
  return e.correspondingUseElement || e;
}
function ao(e) {
  return e = e || kt, {
    x: e.scrollX || e.document.documentElement.scrollLeft,
    y: e.scrollY || e.document.documentElement.scrollTop
  };
}
function Ue(e) {
  const t = e instanceof V.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
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
  if (!tt.isIOS7 && t) {
    const n = ao(jt(e));
    t.left += n.x, t.right += n.x, t.top += n.y, t.bottom += n.y;
  }
  return t;
}
function pn(e) {
  return g.string(e) ? (V.document.querySelector(e), !0) : !1;
}
function M(e, t) {
  for (const i in t)
    e[i] = t[i];
  return e;
}
function se(e, t) {
  let n = !1;
  return function() {
    return n || (kt.console.warn(t), n = !0), e.apply(this, arguments);
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
  }, t.prototype.ignoreFrom = se(function(n) {
    return this._backCompatOption("ignoreFrom", n);
  }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), t.prototype.allowFrom = se(function(n) {
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
    withinInteractionLimit: Te,
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
  o && i && (i.options[o].manualStart || !Te(i, n.element, n.prepared, t) ? n.stop() : (n.start(n.prepared, i, n.element), ti(n, t)));
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
  return t.testIgnoreAllow(t.options[e.name], n, i) && t.options[e.name].enabled && Te(t, n, e, o) ? e : null;
}
function bo(e, t, n, i, o, r, a) {
  for (let s = 0, c = i.length; s < c; s++) {
    const l = i[s], u = o[s], f = l.getAction(t, n, e, u);
    if (!f)
      continue;
    const d = Kn(f, l, u, r, a);
    if (d)
      return {
        action: d,
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
    s = Rt(s);
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
function Te(e, t, n, i) {
  const o = e.options, r = o[n.name].max, a = o[n.name].maxPerElement, s = i.autoStart.maxInteractions;
  let c = 0, l = 0, u = 0;
  if (!(r && a && s))
    return !1;
  for (const f of i.interactions.list) {
    const d = f.prepared.name;
    if (!!f.interacting()) {
      if (c++, c >= s)
        return !1;
      if (f.interactable === e && (l += d === n.name ? 1 : 0, l >= r || f.element === t && (u++, d === n.name && u >= a)))
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
  withinInteractionLimit: Te,
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
    const d = function(m) {
      if (m === n.interactable)
        return;
      const b = n.interactable.options.drag;
      if (!b.manualStart && m.testIgnoreAllow(b, f, i)) {
        const T = m.getAction(n.downPointer, n.downEvent, n, f);
        if (T && T.name === "drag" && wo(u, m) && Ke.validateAction(T, m, f, i, t))
          return m;
      }
    };
    for (; g.element(f); ) {
      const m = t.interactables.forEachMatch(f, d);
      if (m) {
        n.prepared.name = "drag", n.interactable = m, n.element = f;
        break;
      }
      f = Rt(f);
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
}, ni = (e) => ei([], e), ze = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (t(e[n], n, e))
      return n;
  return -1;
}, ye = (e, t) => e[ze(e, t)];
function Kt(e) {
  const t = {};
  for (const n in e) {
    const i = e[n];
    g.plainObject(i) ? t[n] = Kt(i) : g.array(i) ? t[n] = ni(i) : t[n] = i;
  }
  return t;
}
let gn = 0, _t, Wt;
function zo(e) {
  if (_t = e.requestAnimationFrame, Wt = e.cancelAnimationFrame, !_t) {
    const t = ["ms", "moz", "webkit", "o"];
    for (const n of t)
      _t = e[`${n}RequestAnimationFrame`], Wt = e[`${n}CancelAnimationFrame`] || e[`${n}CancelRequestAnimationFrame`];
  }
  _t = _t && _t.bind(e), Wt = Wt && Wt.bind(e), _t || (_t = (t) => {
    const n = Date.now(), i = Math.max(0, 16 - (n - gn)), o = e.setTimeout(() => {
      t(n + i);
    }, i);
    return gn = n + i, o;
  }, Wt = (t) => clearTimeout(t));
}
var Vt = {
  request: (e) => _t(e),
  cancel: (e) => Wt(e),
  init: zo
};
function Nt(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (o) => !0, i = arguments.length > 3 ? arguments[3] : void 0;
  if (i = i || {}, g.string(e) && e.search(" ") !== -1 && (e = vn(e)), g.array(e))
    return e.forEach((o) => Nt(o, t, n, i)), i;
  if (g.object(e) && (t = e, e = ""), g.func(t) && n(e))
    i[e] = i[e] || [], i[e].push(t);
  else if (g.array(t))
    for (const o of t)
      Nt(e, o, n, i);
  else if (g.object(t))
    for (const o in t) {
      const r = vn(o).map((a) => `${e}${a}`);
      Nt(r, t[o], n, i);
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
    const i = Nt(t, n);
    for (t in i)
      this.types[t] = ei(this.types[t] || [], i[t]);
  }
  off(t, n) {
    const i = Nt(t, n);
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
var _e = (e, t) => Math.sqrt(e * e + t * t);
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
  return e instanceof V.Event || e instanceof V.Touch;
}
function xe(e, t, n) {
  return n = n || {}, e = e || "page", n.x = t[e + "X"], n.y = t[e + "Y"], n;
}
function Po(e, t) {
  return t = t || {
    x: 0,
    y: 0
  }, tt.isOperaMobile && ri(e) ? (xe("screen", e, t), t.x += window.scrollX, t.y += window.scrollY) : xe("page", e, t), t;
}
function Oo(e, t) {
  return t = t || {}, tt.isOperaMobile && ri(e) ? xe("screen", e, t) : xe("client", e, t), t;
}
function we(e) {
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
  return _e(r, a);
}
function Ho(e, t) {
  const n = t + "X", i = t + "Y", o = Je(e), r = o[1][n] - o[0][n], a = o[1][i] - o[0][i];
  return 180 * Math.atan2(a, r) / Math.PI;
}
function $o(e) {
  return g.string(e.pointerType) ? e.pointerType : g.number(e.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][e.pointerType] : /touch/.test(e.type || "") || e instanceof V.Touch ? "touch" : "mouse";
}
function ai(e) {
  const t = g.func(e.composedPath) ? e.composedPath() : e.path;
  return [hn(t ? t[0] : e.target), hn(e.currentTarget)];
}
function Zt() {
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
  function a(d, m, b, T) {
    if (!d.addEventListener)
      return;
    const y = Qt(T);
    let k = ye(n, (S) => S.eventTarget === d);
    k || (k = {
      eventTarget: d,
      events: {}
    }, n.push(k)), k.events[m] || (k.events[m] = []), ye(k.events[m], (S) => S.func === b && ve(S.options, y)) || (d.addEventListener(m, b, r.supportsOptions ? y : y.capture), k.events[m].push({
      func: b,
      options: y
    }));
  }
  function s(d, m, b, T) {
    if (!d.addEventListener || !d.removeEventListener)
      return;
    const y = ze(n, (v) => v.eventTarget === d), k = n[y];
    if (!k || !k.events)
      return;
    if (m === "all") {
      for (m in k.events)
        k.events.hasOwnProperty(m) && s(d, m, "all");
      return;
    }
    let S = !1;
    const _ = k.events[m];
    if (_)
      if (b === "all") {
        for (let v = _.length - 1; v >= 0; v--) {
          const p = _[v];
          s(d, m, p.func, p.options);
        }
        return;
      } else {
        const v = Qt(T);
        for (let p = 0; p < _.length; p++) {
          const C = _[p];
          if (C.func === b && ve(C.options, v)) {
            d.removeEventListener(m, b, r.supportsOptions ? v : v.capture), _.splice(p, 1), _.length === 0 && (delete k.events[m], S = !0);
            break;
          }
        }
      }
    S && !Object.keys(k.events).length && n.splice(y, 1);
  }
  function c(d, m, b, T, y) {
    const k = Qt(y);
    if (!i[b]) {
      i[b] = [];
      for (const v of o)
        a(v, b, u), a(v, b, f, !0);
    }
    const S = i[b];
    let _ = ye(S, (v) => v.selector === d && v.context === m);
    _ || (_ = {
      selector: d,
      context: m,
      listeners: []
    }, S.push(_)), _.listeners.push({
      func: T,
      options: k
    });
  }
  function l(d, m, b, T, y) {
    const k = Qt(y), S = i[b];
    let _ = !1, v;
    if (!!S)
      for (v = S.length - 1; v >= 0; v--) {
        const p = S[v];
        if (p.selector === d && p.context === m) {
          const {
            listeners: C
          } = p;
          for (let w = C.length - 1; w >= 0; w--) {
            const N = C[w];
            if (N.func === T && ve(N.options, k)) {
              C.splice(w, 1), C.length || (S.splice(v, 1), s(m, b, u), s(m, b, f, !0)), _ = !0;
              break;
            }
          }
          if (_)
            break;
        }
      }
  }
  function u(d, m) {
    const b = Qt(m), T = new Lo(d), y = i[d.type], [k] = ai(d);
    let S = k;
    for (; g.element(S); ) {
      for (let _ = 0; _ < y.length; _++) {
        const v = y[_], {
          selector: p,
          context: C
        } = v;
        if (Xt(S, p) && Ft(C, k) && Ft(C, S)) {
          const {
            listeners: w
          } = v;
          T.currentTarget = S;
          for (const N of w)
            ve(N.options, b) && N.func(T);
        }
      }
      S = Rt(S);
    }
  }
  function f(d) {
    return u.call(this, d, !0);
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
function Qt(e) {
  return g.object(e) ? {
    capture: !!e.capture,
    passive: !!e.passive
  } : {
    capture: !!e,
    passive: !1
  };
}
function ve(e, t) {
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
      const o = jt(n.target).document, r = t.getDocOptions(o);
      if (!(r && r.events) || r.events.passive !== !1)
        return;
    }
    /^(mouse|pointer|touch)*(down|start)/i.test(n.type) || g.element(n.target) && Xt(n.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n.preventDefault();
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
        if (i.element && (i.element === n.target || Ft(i.element, n.target))) {
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
  return e === "parent" ? Rt(n) : e === "self" ? t.getRect(n) : Un(n, e);
}
function ae(e, t, n, i) {
  let o = e;
  return g.string(o) ? o = li(o, t, n) : g.func(o) && (o = o(...i)), g.element(o) && (o = Ve(o)), o;
}
function Ce(e) {
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
  const i = n && e.options[n], r = i && i.origin || e.options.origin, a = ae(r, e, t, [e && t]);
  return Ce(a) || {
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
    const c = t.interactable, l = (c && c.options || ui).deltaSource, u = Qe(c, r, i), f = o === "start", d = o === "end", m = f ? this : t.prevEvent, b = f ? t.coords.start : d ? {
      page: m.page,
      client: m.client,
      timeStamp: t.coords.cur.timeStamp
    } : t.coords.cur;
    this.page = M({}, b.page), this.client = M({}, b.client), this.rect = M({}, t.rect), this.timeStamp = b.timeStamp, d || (this.page.x -= u.x, this.page.y -= u.y, this.client.x -= u.x, this.client.y -= u.y), this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.button = n.button, this.buttons = n.buttons, this.target = r, this.currentTarget = r, this.preEnd = a, this.type = s || i + (o || ""), this.interactable = c, this.t0 = f ? t.pointers[t.pointers.length - 1].downTime : m.t0, this.x0 = t.coords.start.page.x - u.x, this.y0 = t.coords.start.page.y - u.y, this.clientX0 = t.coords.start.client.x - u.x, this.clientY0 = t.coords.start.client.y - u.y, f || d ? this.delta = {
      x: 0,
      y: 0
    } : this.delta = {
      x: this[l].x - m[l].x,
      y: this[l].y - m[l].y
    }, this.dt = t.coords.delta.timeStamp, this.duration = this.timeStamp - this.t0, this.velocity = M({}, t.coords.velocity[l]), this.speed = _e(this.velocity.x, this.velocity.y), this.swipe = d || o === "inertiastart" ? this.getSwipe() : null;
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
    }, this.prevEvent = null, this.pointerIsDown = !1, this.pointerWasMoved = !1, this._interacting = !1, this._ending = !1, this._stopped = !0, this._proxy = void 0, this.simulation = null, this.doMove = se(function(r) {
      this.move(r);
    }, "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = {
      start: Zt(),
      prev: Zt(),
      cur: Zt(),
      delta: Zt(),
      velocity: Zt()
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
    this.pointerIsDown && !this.pointerWasMoved && (r = this.coords.cur.client.x - this.coords.start.client.x, a = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = _e(r, a) > this.pointerMoveTolerance);
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
    const n = we(t);
    return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : ze(this.pointers, (i) => i.id === n);
  }
  getPointerInfo(t) {
    return this.pointers[this.getPointerIndex(t)];
  }
  updatePointer(t, n, i, o) {
    const r = we(t);
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
          a = Rt(a);
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
  const n = tt.pEventTypes;
  let i;
  V.PointerEvent ? i = [{
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
            return Ft(c, a.downTarget);
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
        const l = c, u = we(l), f = {
          pointer: l,
          pointerId: u,
          pointerType: o,
          eventType: n.type,
          eventTarget: r,
          curEventTarget: a,
          scope: t
        }, d = xn(f);
        s.push([f.pointer, f.eventTarget, f.curEventTarget, d]);
      }
    } else {
      let c = !1;
      if (!tt.supportsPointerEvent && /mouse/.test(n.type)) {
        for (let l = 0; l < i.length && !c; l++)
          c = i[l].pointerType !== "mouse" && i[l].pointerIsDown;
        c = c || t.now() - t.prevTouchTime < 500 || n.timeStamp === 0;
      }
      if (!c) {
        const l = {
          pointer: n,
          pointerId: we(n),
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
function le(e, t) {
  if (t.phaselessTypes[e])
    return !0;
  for (const n in t.map)
    if (e.indexOf(n) === 0 && e.substr(n.length) in t.phases)
      return !0;
  return !1;
}
var At = /* @__PURE__ */ function(e) {
  return e[e.On = 0] = "On", e[e.Off = 1] = "Off", e;
}(At || {});
class tr {
  get _defaults() {
    return {
      base: {},
      perAction: {},
      actions: {}
    };
  }
  constructor(t, n, i, o) {
    this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new ii(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n.actions, this.target = t, this._context = n.context || i, this._win = jt(pn(t) ? this._context : t), this._doc = this._win.document, this._scopeEvents = o, this.set(n);
  }
  setOnEvents(t, n) {
    return g.func(n.onstart) && this.on(`${t}start`, n.onstart), g.func(n.onmove) && this.on(`${t}move`, n.onmove), g.func(n.onend) && this.on(`${t}end`, n.onend), g.func(n.oninertiastart) && this.on(`${t}inertiastart`, n.oninertiastart), this;
  }
  updatePerActionListeners(t, n, i) {
    var o;
    const r = (o = this._actions.map[t]) == null ? void 0 : o.filterEventType, a = (s) => (r == null || r(s)) && le(s, this._actions);
    (g.array(n) || g.object(n)) && this._onOff(At.Off, t, n, void 0, a), (g.array(i) || g.object(i)) && this._onOff(At.On, t, i, void 0, a);
  }
  setPerAction(t, n) {
    const i = this._defaults;
    for (const o in n) {
      const r = o, a = this.options[t], s = n[r];
      r === "listeners" && this.updatePerActionListeners(t, a.listeners, s), g.array(s) ? a[r] = ni(s) : g.plainObject(s) ? (a[r] = M(a[r] || {}, Kt(s)), g.object(i.perAction[r]) && "enabled" in i.perAction[r] && (a[r].enabled = s.enabled !== !1)) : g.bool(s) && g.object(i.perAction[r]) ? a[r].enabled = s : a[r] = s;
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
    return this._context === t.ownerDocument || Ft(this._context, t);
  }
  testIgnoreAllow(t, n, i) {
    return !this.testIgnore(t.ignoreFrom, n, i) && this.testAllow(t.allowFrom, n, i);
  }
  testAllow(t, n, i) {
    return t ? g.element(i) ? g.string(t) ? je(i, t, n) : g.element(t) ? Ft(t, i) : !1 : !1 : !0;
  }
  testIgnore(t, n, i) {
    return !t || !g.element(i) ? !1 : g.string(t) ? je(i, t, n) : g.element(t) ? Ft(t, i) : !1;
  }
  fire(t) {
    return this.events.fire(t), this;
  }
  _onOff(t, n, i, o, r) {
    g.object(n) && !g.array(n) && (o = i, i = null);
    const a = Nt(n, i, r);
    for (let s in a) {
      s === "wheel" && (s = tt.wheelEvent);
      for (const c of a[s])
        le(s, this._actions) ? this.events[t === At.On ? "on" : "off"](s, c) : g.string(this.target) ? this._scopeEvents[t === At.On ? "addDelegate" : "removeDelegate"](this.target, this._context, s, c, o) : this._scopeEvents[t === At.On ? "add" : "remove"](this.target, s, c, o);
    }
    return this;
  }
  on(t, n, i) {
    return this._onOff(At.On, t, n, i);
  }
  off(t, n, i) {
    return this._onOff(At.Off, t, n, i);
  }
  set(t) {
    const n = this._defaults;
    g.object(t) || (t = {}), this.options = Kt(n.base);
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
        } = i, r = g.string(o) ? this.selectorMap[o] : o[this.scope.id], a = ze(r, (s) => s === i);
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
      return ye(r, (a) => a._context === i && (o || a.inContext(t)));
  }
  forEachMatch(t, n) {
    for (const i of this.list) {
      let o;
      if ((g.string(i.target) ? g.element(t) && Xt(t, i.target) : t === i.target) && i.inContext(t) && (o = n(i)), o !== void 0)
        return o;
    }
  }
}
function nr(e) {
  const t = (n, i) => {
    let o = e.interactables.getExisting(n, i);
    return o || (o = e.interactables.new(n, i), o.events.global = t.globalEvents), o;
  };
  return t.getPointerAverage = si, t.getTouchBBox = ko, t.getTouchDistance = Ro, t.getTouchAngle = Ho, t.getElementRect = Ve, t.getElementClientRect = Ue, t.matchesSelector = Xt, t.closest = Un, t.globalEvents = {}, t.version = "1.10.27", t.scope = e, t.use = function(n, i) {
    return this.scope.usePlugin(n, i), this;
  }, t.isSet = function(n, i) {
    return !!this.scope.interactables.get(n, i && i.context);
  }, t.on = se(function(i, o, r) {
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
    return le(i, this.scope.actions) ? this.globalEvents[i] ? this.globalEvents[i].push(o) : this.globalEvents[i] = [o] : this.scope.events.add(this.scope.document, i, o, {
      options: r
    }), this;
  }, "The interact.on() method is being deprecated"), t.off = se(function(i, o, r) {
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
    if (le(i, this.scope.actions)) {
      let a;
      i in this.globalEvents && (a = this.globalEvents[i].indexOf(o)) !== -1 && this.globalEvents[i].splice(a, 1);
    } else
      this.scope.events.remove(this.scope.document, i, o, r);
    return this;
  }, "The interact.off() method is being deprecated"), t.debug = function() {
    return this.scope;
  }, t.supportsTouch = function() {
    return tt.supportsTouch;
  }, t.supportsPointerEvent = function() {
    return tt.supportsPointerEvent;
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
    this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`, this.isInitialized = !1, this.listenerMaps = [], this.browser = tt, this.defaults = Kt(ui), this.Eventable = ii, this.actions = {
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
    const i = jt(t);
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
    const n = this.getDocIndex(t), i = jt(t), o = this.documents[n].options;
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
  return e.isInitialized = !0, g.window(t) && Gn(t), V.init(t), tt.init(t), Vt.init(t), e.window = t, e.document = t.document, e.usePlugin(Qo), e.usePlugin(Wo), e;
}
function wn(e) {
  return e && e.replace(/\/.*$/, "");
}
const hi = new ir(), Mt = hi.interactStatic, rr = typeof globalThis < "u" ? globalThis : window;
hi.init(rr);
Mt.use(To);
function sr(e) {
  const {
    defaults: t,
    actions: n
  } = e;
  e.autoScroll = P, P.now = () => e.now(), n.phaselessTypes.autoscroll = !0, t.perAction.autoScroll = P.defaults;
}
const P = {
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
    P.isScrolling = !0, Vt.cancel(P.i), e.autoScroll = P, P.interaction = e, P.prevTime = P.now(), P.i = Vt.request(P.scroll);
  },
  stop() {
    P.isScrolling = !1, P.interaction && (P.interaction.autoScroll = null), Vt.cancel(P.i);
  },
  scroll() {
    const {
      interaction: e
    } = P, {
      interactable: t,
      element: n
    } = e, i = e.prepared.name, o = t.options[i].autoScroll, r = En(o.container, t, n), a = P.now(), s = (a - P.prevTime) / 1e3, c = o.speed * s;
    if (c >= 1) {
      const l = {
        x: P.x * c,
        y: P.y * c
      };
      if (l.x || l.y) {
        const u = Sn(r);
        g.window(r) ? r.scrollBy(l.x, l.y) : r && (r.scrollLeft += l.x, r.scrollTop += l.y);
        const f = Sn(r), d = {
          x: f.x - u.x,
          y: f.y - u.y
        };
        (d.x || d.y) && t.fire({
          type: "autoscroll",
          target: n,
          interactable: t,
          delta: d,
          interaction: e,
          container: r
        });
      }
      P.prevTime = a;
    }
    P.isScrolling && (Vt.cancel(P.i), P.i = Vt.request(P.scroll));
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
    if (!(t.interacting() && P.check(t.interactable, t.prepared.name)))
      return;
    if (t.simulation) {
      P.x = P.y = 0;
      return;
    }
    let i, o, r, a;
    const {
      interactable: s,
      element: c
    } = t, l = t.prepared.name, u = s.options[l].autoScroll, f = En(u.container, s, c);
    if (g.window(f))
      a = n.clientX < P.margin, i = n.clientY < P.margin, o = n.clientX > f.innerWidth - P.margin, r = n.clientY > f.innerHeight - P.margin;
    else {
      const d = Ue(f);
      a = n.clientX < d.left + P.margin, i = n.clientY < d.top + P.margin, o = n.clientX > d.right - P.margin, r = n.clientY > d.bottom - P.margin;
    }
    P.x = o ? 1 : a ? -1 : 0, P.y = r ? 1 : i ? -1 : 0, P.isScrolling || (P.margin = u.margin, P.speed = u.speed, P.start(t));
  }
};
function En(e, t, n) {
  return (g.string(e) ? li(e, t, n) : e) || jt(n);
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
      t.autoScroll = null, P.stop(), P.interaction && (P.interaction = null);
    },
    "interactions:stop": P.stop,
    "interactions:action-move": (e) => P.onInteractionMove(e)
  }
};
Mt.use(ar);
function lr(e) {
  const {
    actions: t,
    Interactable: n,
    defaults: i
  } = e;
  n.prototype.draggable = be.draggable, t.map.drag = be, t.methodDict.drag = "draggable", i.actions.drag = be.defaults;
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
}, be = {
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
Mt.use(be);
function ur(e) {
  const {
    actions: t,
    browser: n,
    Interactable: i,
    defaults: o
  } = e;
  Ct.cursors = pr(n), Ct.defaultMargin = n.supportsTouch || n.supportsPointerEvent ? 20 : 10, i.prototype.resizable = function(r) {
    return dr(this, r, e);
  }, t.map.resize = Ct, t.methodDict.resize = "resizable", o.actions.resize = Ct.defaults;
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
        c[l] = hr(l, s.edges[l], a, t._latestPointer.eventTarget, i, o, s.margin || Ct.defaultMargin);
      c.left = c.left && !c.right, c.top = c.top && !c.bottom, (c.left || c.right || c.top || c.bottom) && (e.action = {
        name: "resize",
        edges: c
      });
    } else {
      const c = s.axis !== "y" && a.x > o.right - Ct.defaultMargin, l = s.axis !== "x" && a.y > o.bottom - Ct.defaultMargin;
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
        const d = l.top;
        l.top = l.bottom, l.bottom = d;
      }
      if (l.left > l.right) {
        const d = l.left;
        l.left = l.right, l.right = d;
      }
    }
  } else
    l.top = Math.min(s.top, c.bottom), l.bottom = Math.max(s.bottom, c.top), l.left = Math.min(s.left, c.right), l.right = Math.max(s.right, c.left);
  l.width = l.right - l.left, l.height = l.bottom - l.top;
  for (const d in l)
    u[d] = l[d] - f[d];
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
const Ct = {
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
    const o = Ct.cursors;
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
Mt.use(Ct);
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
      const f = Math.round((i - s.x) / e[l]), d = Math.round((o - s.y) / e[u]);
      c[l] = Math.max(a.left, Math.min(a.right, f * e[l] + s.x)), c[u] = Math.max(a.top, Math.min(a.bottom, d * e[u] + s.y));
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
    }, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = t, this.result = me(), this.edges = {
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
    return this.result = me(), this.startAll(a), this.result = this.setAll(a);
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
    const s = o ? this.states.slice(o) : this.states, c = me(t.coords, t.rect);
    for (const d of s) {
      var l;
      const {
        options: m
      } = d, b = M({}, t.coords);
      let T = null;
      (l = d.methods) != null && l.set && this.shouldDo(m, i, n) && (t.state = d, T = d.methods.set(t), Ze(t.edges, t.rect, {
        x: t.coords.x - b.x,
        y: t.coords.y - b.y
      })), c.eventProps.push(T);
    }
    M(this.edges, t.edges), c.delta.x = t.coords.x - t.pageCoords.x, c.delta.y = t.coords.y - t.pageCoords.y, c.rectDelta.left = t.rect.left - r.left, c.rectDelta.right = t.rect.right - r.right, c.rectDelta.top = t.rect.top - r.top, c.rectDelta.bottom = t.rect.bottom - r.bottom;
    const u = this.result.coords, f = this.result.rect;
    if (u && f) {
      const d = c.rect.left !== f.left || c.rect.right !== f.right || c.rect.top !== f.top || c.rect.bottom !== f.bottom;
      c.changed = d || u.x !== c.coords.x || u.y !== c.coords.y;
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
    for (const [f, d] of [[r, s], [o, c]])
      f.page.x += d.x, f.page.y += d.y, f.client.x += d.x, f.client.y += d.y;
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
    this.startOffset = t.startOffset, this.startDelta = t.startDelta, this.startEdges = t.startEdges, this.edges = t.edges, this.states = t.states.map((n) => Kt(n)), this.result = me(M({}, t.result.coords), M({}, t.result.rect));
  }
  destroy() {
    for (const t in this)
      this[t] = null;
  }
}
function me(e, t) {
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
function Ht(e, t) {
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
var Mr = Ht(zr, "aspectRatio");
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
    const l = Yt(a.restriction, o, r);
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
  } = i, a = Yt(o.restriction, n, t);
  if (!a)
    return;
  const s = Go(a);
  t.x = Math.max(Math.min(s.right - r.right, t.x), s.left + r.left), t.y = Math.max(Math.min(s.bottom - r.bottom, t.y), s.top + r.top);
}
function Yt(e, t, n) {
  return g.func(e) ? ae(e, t.interactable, t.element, [n.x, n.y, t]) : ae(e, t.interactable, t.element);
}
const Or = {
  restriction: null,
  elementRect: null,
  offset: null,
  endOnly: !1,
  enabled: !1
}, Ee = {
  start: Dr,
  set: Pr,
  defaults: Or
};
var Ar = Ht(Ee, "restrict");
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
    const a = Yt(o.offset, t, t.coords.start.page);
    r = Ce(a);
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
  const s = M({}, t), c = Yt(a.inner, i, s) || {}, l = Yt(a.outer, i, s) || {};
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
}, oe = {
  noInner: gi,
  noOuter: vi,
  start: kr,
  set: Rr,
  defaults: Hr
};
var $r = Ht(oe, "restrictEdges");
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
}, Ee.defaults), Lr = {
  start: Ee.start,
  set: Ee.set,
  defaults: Br
};
var Wr = Ht(Lr, "restrictRect");
const Fr = {
  width: -1 / 0,
  height: -1 / 0
}, Nr = {
  width: 1 / 0,
  height: 1 / 0
};
function jr(e) {
  return oe.start(e);
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
  const a = yn(Yt(r.min, t, e.coords)) || Fr, s = yn(Yt(r.max, t, e.coords)) || Nr;
  n.options = {
    endOnly: r.endOnly,
    inner: M({}, oe.noInner),
    outer: M({}, oe.noOuter)
  }, o.top ? (n.options.inner.top = i.bottom - a.height, n.options.outer.top = i.bottom - s.height) : o.bottom && (n.options.inner.bottom = i.top + a.height, n.options.outer.bottom = i.top + s.height), o.left ? (n.options.inner.left = i.right - a.width, n.options.outer.left = i.right - s.width) : o.right && (n.options.inner.right = i.left + a.width, n.options.outer.right = i.left + s.width), oe.set(e), n.options = r;
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
var qr = Ht(Gr, "restrictSize");
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
    const f = ae(s.offset, n, i, [t]);
    l = Ce(f) || {
      x: 0,
      y: 0
    }, l.x += c.x, l.y += c.y;
  }
  const {
    relativePoints: u
  } = s;
  r.offsets = o && u && u.length ? u.map((f, d) => ({
    index: d,
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
    const f = s.x - u.x, d = s.y - u.y;
    for (let m = 0, b = o.targets.length; m < b; m++) {
      const T = o.targets[m];
      let y;
      g.func(T) ? y = T(f, d, t._proxy, u, m) : y = T, y && c.push({
        x: (g.number(y.x) ? y.x : f) + u.x,
        y: (g.number(y.y) ? y.y : d) + u.y,
        range: g.number(y.range) ? y.range : o.range,
        source: T,
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
    const f = u.range, d = u.x - s.x, m = u.y - s.y, b = _e(d, m);
    let T = b <= f;
    f === 1 / 0 && l.inRange && l.range !== 1 / 0 && (T = !1), (!l.target || (T ? l.inRange && f !== 1 / 0 ? b / f < l.distance / l.range : f === 1 / 0 && l.range !== 1 / 0 || b < l.distance : !l.inRange && b < l.distance)) && (l.target = u, l.distance = b, l.range = f, l.inRange = T, l.delta.x = d, l.delta.y = m);
  }
  return l.inRange && (n.x = l.target.x, n.y = l.target.y), i.closest = l, l;
}
function Kr(e) {
  const {
    element: t
  } = e.interaction;
  return Ce(ae(e.state.options.origin, null, null, [t])) || Qe(e.interactable, t, e.interaction.prepared.name);
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
var Zr = Ht(en, "snap");
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
}, Se = {
  start: Qr,
  set: ts,
  defaults: es
};
var ns = Ht(Se, "snapSize");
function is(e) {
  const {
    edges: t
  } = e;
  return t ? (e.state.targetFields = e.state.targetFields || [[t.left ? "left" : "right", t.top ? "top" : "bottom"]], Se.start(e)) : null;
}
const os = {
  start: is,
  set: Se.set,
  defaults: M(Kt(Se.defaults), {
    targets: void 0,
    range: void 0,
    offset: {
      x: 0,
      y: 0
    }
  })
};
var rs = Ht(os, "snapEdges");
const ee = () => {
};
ee._defaults = {};
var He = {
  aspectRatio: Mr,
  restrictEdges: $r,
  restrict: Ar,
  restrictRect: Wr,
  restrictSize: qr,
  snapEdges: rs,
  snap: Zr,
  snapSize: ns,
  spring: ee,
  avoid: ee,
  transform: ee,
  rubberband: ee
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
Mt.use(ss);
var re = /* @__PURE__ */ function(e) {
  return e.touchAction = "touchAction", e.boxSizing = "boxSizing", e.noListeners = "noListeners", e;
}(re || {});
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
    const u = Nt(a, s, l);
    for (const f in u)
      le(f, e.actions) || e.logger.warn(Ge + `Can't add native "${f}" event listener to target without \`addEventListener(type, listener, options)\` prop.`);
    return o.call(this, r, u, c);
  };
}
const _n = [{
  name: re.touchAction,
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
  name: re.boxSizing,
  perform(e) {
    const {
      element: t
    } = e;
    return e.prepared.name === "resize" && t instanceof V.HTMLElement && !mi(t, "boxSizing", /border-box/);
  },
  text: 'Consider adding CSS "box-sizing: border-box" to this resizable element',
  getInfo(e) {
    let {
      element: t
    } = e;
    return [t, qe.boxSizing];
  }
}, {
  name: re.noListeners,
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
  const i = e.style[t] || kt.getComputedStyle(e)[t];
  return n.test((i || "").toString());
}
function ls(e, t, n) {
  let i = e;
  for (; g.element(i); ) {
    if (mi(i, t, n))
      return !0;
    i = Rt(i);
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
  CheckName: re,
  links: qe,
  prefix: Ge
};
Mt.use(us);
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
    const { proxy: i } = fs(), o = i == null ? void 0 : i.$parent, r = zi("eventBus"), a = n, s = e, c = O({}), l = O(1), u = O(100), f = O(30), d = O([10, 10]), m = O(1 / 0), b = O(null), T = O(null), y = O(1), k = O(!0), S = O(!0), _ = O(!1), v = O(null), p = O(!1), C = O(null), w = O(NaN), N = O(NaN), et = O(NaN), W = O(NaN), K = O({}), R = O(!1), L = O(!1), rt = O(!1), E = O(null), j = O(null), J = O(null), st = O(null), X = O(s.x), U = O(s.y), z = O(s.w), it = O(s.h), pt = O(null), Z = O(null), dt = Lt(() => T.value && !s.static), mt = Lt(() => (b.value || T.value) && !s.static), yt = Lt(() => navigator.userAgent.toLowerCase().indexOf("android") !== -1), ct = Lt(() => o != null && o.isMirrored ? !R.value : R.value), I = Lt(() => ({
      "vue-resizable": dt.value,
      static: s.static,
      "grid-item-selected": s.selected,
      resizing: p.value,
      "vue-draggable-dragging": _.value,
      cssTransforms: k.value,
      "render-rtl": ct.value,
      "disable-userselect": _.value,
      "no-touch": yt.value && mt.value
    })), $ = Lt(() => ct.value ? "vue-resizable-handle vue-rtl-resizable-handle" : "vue-resizable-handle");
    G(
      () => s.isDraggable,
      (h) => {
        b.value = h;
      }
    ), G(
      () => s.static,
      () => {
        sn(), St();
      }
    ), G(b, () => {
      sn();
    }), G(
      () => s.isResizable,
      (h) => {
        T.value = h;
      }
    ), G(
      () => s.isBounded,
      (h) => {
        pt.value = h;
      }
    ), G(T, () => {
      St();
    }), G(f, () => {
      nt(), wt();
    }), G(l, () => {
      St(), nt(), wt();
    }), G(u, () => {
      St(), nt();
    }), G(
      () => s.x,
      (h) => {
        X.value = h, nt();
      }
    ), G(
      () => s.y,
      (h) => {
        U.value = h, nt();
      }
    ), G(
      () => s.h,
      (h) => {
        it.value = h, nt();
      }
    ), G(
      () => s.w,
      (h) => {
        z.value = h, nt();
      }
    ), G(ct, () => {
      St(), nt();
    }), G(
      () => s.minH,
      () => {
        St();
      }
    ), G(
      () => s.maxH,
      () => {
        St();
      }
    ), G(
      () => s.minW,
      () => {
        St();
      }
    ), G(
      () => s.maxW,
      () => {
        St();
      }
    ), G(
      () => o == null ? void 0 : o.margin,
      (h) => {
        !h || h[0] == d.value[0] && h[1] == d.value[1] || (d.value = h.map((x) => Number(x)), nt(), wt());
      }
    );
    function q(h) {
      Jt(h);
    }
    function ht(h) {
      ge();
    }
    function bt(h) {
      s.isDraggable === null && (b.value = h);
    }
    function It(h) {
      s.isResizable === null && (T.value = h);
    }
    function Tt(h) {
      s.isBounded === null && (pt.value = h);
    }
    function at(h) {
      y.value = h;
    }
    function Y(h) {
      f.value = h;
    }
    function ut(h) {
      m.value = h;
    }
    function xt() {
      R.value = dn() === "rtl", ge();
    }
    function gt(h) {
      const x = h.toString();
      l.value = parseInt(x);
    }
    r.on("updateWidth", q), r.on("compact", ht), r.on("setDraggable", bt), r.on("setResizable", It), r.on("setBounded", Tt), r.on("setTransformScale", at), r.on("setRowHeight", Y), r.on("setMaxRows", ut), r.on("directionchange", xt), r.on("setColNum", gt), R.value = dn() === "rtl", Rn(() => {
      r.off("updateWidth", q), r.off("compact", ht), r.off("setDraggable", bt), r.off("setResizable", It), r.off("setBounded", Tt), r.off("setTransformScale", at), r.off("setRowHeight", Y), r.off("setMaxRows", ut), r.off("directionchange", xt), r.off("setColNum", gt), Z.value && Z.value.unset();
    }), Hn(() => {
      (o == null ? void 0 : o.responsive) && o.lastBreakpoint ? l.value = Ne(o.lastBreakpoint, o == null ? void 0 : o.cols) : l.value = o == null ? void 0 : o.colNum, f.value = o == null ? void 0 : o.rowHeight, u.value = (o == null ? void 0 : o.width) !== null ? o == null ? void 0 : o.width : 100, d.value = (o == null ? void 0 : o.margin) !== void 0 ? o.margin : [10, 10], m.value = o == null ? void 0 : o.maxRows, s.isDraggable === null ? b.value = o == null ? void 0 : o.isDraggable : b.value = s.isDraggable, s.isResizable === null ? T.value = o == null ? void 0 : o.isResizable : T.value = s.isResizable, s.isBounded === null ? pt.value = o == null ? void 0 : o.isBounded : pt.value = s.isBounded, y.value = o == null ? void 0 : o.transformScale, k.value = o == null ? void 0 : o.useCssTransforms, S.value = o == null ? void 0 : o.useStyleCursor, nt();
    });
    function nt() {
      var A, H, D, F, lt;
      s.x + s.w > l.value ? (X.value = 0, z.value = s.w > l.value ? l.value : s.w) : (X.value = s.x, z.value = s.w);
      let h = ft(X.value, U.value, z.value, it.value);
      _.value && (h.top = (A = v.value) == null ? void 0 : A.top, ct.value ? h.right = (H = v.value) == null ? void 0 : H.left : h.left = (D = v.value) == null ? void 0 : D.left), p.value && (h.width = (F = C.value) == null ? void 0 : F.width, h.height = (lt = C.value) == null ? void 0 : lt.height);
      let x;
      k.value ? ct.value ? x = Li(h.top, h.right, h.width, h.height) : x = Bi(h.top, h.left, h.width, h.height) : ct.value ? x = Fi(h.top, h.right, h.width, h.height) : x = Wi(h.top, h.left, h.width, h.height), K.value = x;
    }
    function wt() {
      let h = {};
      for (let x of ["width", "height"]) {
        let H = K.value[x].match(/^(\d+)px$/);
        if (!H)
          return;
        h[x] = H[1];
      }
      a("container-resized", s.i, s.h, s.w, h.height, h.width);
    }
    function ce(h) {
      var x, A, H;
      {
        if (s.static)
          return;
        const D = un(h);
        if (D == null)
          return;
        const { x: F, y: lt } = D, Q = { width: 0, height: 0 };
        let B;
        switch (h.type) {
          case "resizestart": {
            St(), E.value = z.value, j.value = it.value, B = ft(X.value, U.value, z.value, it.value), Q.width = B.width, Q.height = B.height, C.value = Q, p.value = !0;
            break;
          }
          case "resizemove": {
            const Dt = fn(et.value, W.value, F, lt);
            ct.value ? Q.width = Number((x = C.value) == null ? void 0 : x.width) - Dt.deltaX / y.value : Q.width = Number((A = C.value) == null ? void 0 : A.width) + Dt.deltaX / y.value, Q.height = Number((H = C.value) == null ? void 0 : H.height) + Dt.deltaY / y.value, C.value = Q;
            break;
          }
          case "resizeend": {
            B = ft(X.value, U.value, z.value, it.value), Q.width = B.width, Q.height = B.height, C.value = null, p.value = !1;
            break;
          }
        }
        B = pe(Q.height, Q.width), B.w < s.minW && (B.w = s.minW), B.w > s.maxW && (B.w = s.maxW), B.h < s.minH && (B.h = s.minH), B.h > s.maxH && (B.h = s.maxH), B.h < 1 && (B.h = 1), B.w < 1 && (B.w = 1), et.value = F, W.value = lt, (z.value !== B.w || it.value !== B.h) && a("resize", s.i, B.h, B.w, Q.height, Q.width), h.type === "resizeend" && (E.value !== z.value || j.value !== it.value) && a("resized", s.i, B.h, B.w, Q.height, Q.width);
        const Gt = {
          eventType: h.type,
          i: s.i,
          x: X.value,
          y: U.value,
          h: B.h,
          w: B.w
        };
        r.emit("resizeEvent", Gt);
      }
    }
    function $t(h, x) {
      if (!x && s.selected && s.selectedItems.length > 1 && s.selectedItems.filter((lt) => lt !== s.i).forEach((lt) => {
        r.emit("dragSelected", {
          event: h,
          i: lt
        });
      }), s.static || p.value)
        return;
      const A = un(h);
      if (A === null)
        return;
      const { x: H, y: D } = A;
      let F = {
        top: 0,
        left: 0
      };
      switch (h.type) {
        case "dragstart": {
          F = ue();
          break;
        }
        case "dragend": {
          if (!_.value)
            return;
          F = de(h);
          break;
        }
        case "dragmove": {
          F = fe(h, A);
          break;
        }
      }
      ot(F, H, D, h);
    }
    function ue() {
      const h = {
        top: 0,
        left: 0
      };
      J.value = X.value, st.value = U.value;
      const x = c.value;
      let H = x.offsetParent.getBoundingClientRect(), D = x.getBoundingClientRect();
      const F = D.left / y.value, lt = H.left / y.value, Q = D.right / y.value, B = H.right / y.value, Gt = D.top / y.value, Dt = H.top / y.value;
      return ct.value ? h.left = (Q - B) * -1 : h.left = F - lt, h.top = Gt - Dt, v.value = h, _.value = !0, h;
    }
    function fe(h, x) {
      var lt, Q, B;
      const { x: A, y: H } = x, D = {
        top: 0,
        left: 0
      };
      a("dragging", h, s.i);
      const F = fn(w.value, N.value, A, H);
      if (ct.value ? D.left = Number((lt = v.value) == null ? void 0 : lt.left) - F.deltaX / y.value : D.left = Number((Q = v.value) == null ? void 0 : Q.left) + F.deltaX / y.value, D.top = Number((B = v.value) == null ? void 0 : B.top) + F.deltaY / y.value, pt.value) {
        const De = h.target.offsetParent.clientHeight - he(s.h, f.value, d.value[1]);
        D.top = Bt(D.top, 0, De);
        const Si = vt(), Ii = u.value - he(s.w, Si, d.value[0]);
        D.left = Bt(D.left, 0, Ii);
      }
      return v.value = D, D;
    }
    function de(h) {
      const x = {
        top: 0,
        left: 0
      };
      a("dragend", h, s.i);
      const A = c.value;
      let D = A.offsetParent.getBoundingClientRect(), F = A.getBoundingClientRect();
      const lt = F.left / y.value, Q = D.left / y.value, B = F.right / y.value, Gt = D.right / y.value, Dt = F.top / y.value, De = D.top / y.value;
      return ct.value ? x.left = (B - Gt) * -1 : x.left = lt - Q, x.top = Dt - De, v.value = null, _.value = !1, x;
    }
    function ot(h, x, A, H) {
      let D;
      ct.value, D = Et(h.top, h.left), w.value = x, N.value = A, (X.value !== D.x || U.value !== D.y) && a("move", s.i, D.x, D.y), H.type === "dragend" && (J.value !== X.value || st.value !== U.value) && a("moved", s.i, D.x, D.y);
      const F = {
        eventType: H.type,
        i: s.i,
        x: D.x,
        y: D.y,
        h: it.value,
        w: z.value
      };
      r.emit("dragEvent", F);
    }
    function ft(h, x, A, H) {
      const D = vt();
      let F;
      return ct.value ? F = {
        right: Math.round(D * h + (h + 1) * d.value[0]),
        top: Math.round(f.value * x + (x + 1) * d.value[1]),
        width: A === 1 / 0 ? A : Math.round(D * A + Math.max(0, A - 1) * d.value[0]),
        height: H === 1 / 0 ? H : Math.round(f.value * H + Math.max(0, H - 1) * d.value[1])
      } : F = {
        left: Math.round(D * h + (h + 1) * d.value[0]),
        top: Math.round(f.value * x + (x + 1) * d.value[1]),
        width: A === 1 / 0 ? A : Math.round(D * A + Math.max(0, A - 1) * d.value[0]),
        height: H === 1 / 0 ? H : Math.round(f.value * H + Math.max(0, H - 1) * d.value[1])
      }, F;
    }
    function Et(h, x) {
      const A = vt();
      let H = Math.round((x - d.value[0]) / (A + d.value[0])), D = Math.round((h - d.value[1]) / (f.value + d.value[1]));
      return H = Math.max(Math.min(H, l.value - z.value), 0), D = Math.max(Math.min(D, m.value - it.value), 0), { x: H, y: D };
    }
    function vt() {
      return (u.value - d.value[0] * (l.value + 1)) / l.value;
    }
    function he(h, x, A) {
      return Number.isFinite(h) ? Math.round(x * h + Math.max(0, h - 1) * A) : h;
    }
    function Bt(h, x, A) {
      return Math.max(Math.min(h, A), x);
    }
    function pe(h, x, A = !1) {
      const H = vt();
      let D = Math.round((x + d.value[0]) / (H + d.value[0])), F = 0;
      return A ? F = Math.ceil((h + d.value[1]) / (f.value + d.value[1])) : F = Math.round((h + d.value[1]) / (f.value + d.value[1])), D = Math.max(Math.min(D, l.value - X.value), 0), F = Math.max(Math.min(F, m.value - U.value), 0), { w: D, h: F };
    }
    function Jt(h, x) {
      u.value = h, x != null && (l.value = x);
    }
    function ge(h) {
      nt();
    }
    function sn() {
      if ((Z.value === null || Z.value === void 0) && (Z.value = Mt(c.value), S.value || Z.value.styleCursor(!1)), b.value && !s.static) {
        const h = {
          ignoreFrom: s.dragIgnoreFrom,
          allowFrom: s.dragAllowFrom,
          ...s.dragOption
        };
        Z.value.draggable(h), L.value || (L.value = !0, Z.value.on("dragstart dragmove dragend", function(x) {
          $t(x);
        }), r.on("dragSelected", ({ event: x, i: A }) => {
          A === s.i && $t(x, !0);
        }));
      } else
        Z.value.draggable({
          enabled: !1
        });
    }
    function St() {
      if ((Z.value === null || Z.value === void 0) && (Z.value = Mt(c.value), S.value || Z.value.styleCursor(!1)), T.value && !s.static) {
        let h = ft(0, 0, s.maxW, s.maxH), x = ft(0, 0, s.minW, s.minH);
        const A = {
          edges: {
            left: !1,
            right: "." + $.value.trim().replace(" ", "."),
            bottom: "." + $.value.trim().replace(" ", "."),
            top: !1
          },
          ignoreFrom: s.resizeIgnoreFrom,
          restrictSize: {
            min: {
              height: x.height * y.value,
              width: x.width * y.value
            },
            max: {
              height: h.height * y.value,
              width: h.width * y.value
            }
          },
          ...s.resizeOption
        };
        s.preserveAspectRatio && (A.modifiers = [
          Mt.modifiers.aspectRatio({
            ratio: "preserve"
          })
        ]), Z.value.resizable(A), rt.value || (rt.value = !0, Z.value.on("resizestart resizemove resizeend", function(H) {
          ce(H);
        }));
      } else
        Z.value.resizable({
          enabled: !1
        });
    }
    const Me = _i();
    function Ei() {
      E.value = z.value, j.value = it.value;
      let h = Me == null ? void 0 : Me.default[0].elm.getBoundingClientRect(), x = pe(h.height, h.width, !0);
      if (x.w < s.minW && (x.w = s.minW), x.w > s.maxW && (x.w = s.maxW), x.h < s.minH && (x.h = s.minH), x.h > s.maxH && (x.h = s.maxH), x.h < 1 && (x.h = 1), x.w < 1 && (x.w = 1), (z.value !== x.w || it.value !== x.h) && a("resize", s.i, x.h, x.w, h.height, h.width), E.value !== x.w || j.value !== x.h) {
        a("resized", s.i, x.h, x.w, h.height, h.width);
        const A = {
          eventType: "resizeend",
          i: s.i,
          x: X.value,
          y: U.value,
          h: x.h,
          w: x.w
        };
        r.emit("resizeEvent", A);
      }
    }
    return t({
      autoSize: Ei,
      calcXY: Et,
      dragging: v,
      ...s
    }), (h, x) => ($e(), Be("div", {
      ref_key: "this$refsItem",
      ref: c,
      class: an(["vue-grid-item", I.value]),
      style: Le(K.value)
    }, [
      $n(h.$slots, "default", {
        style: Le(K.value)
      }),
      dt.value ? ($e(), Be("span", {
        key: 0,
        ref: "handle",
        class: an($.value)
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
  function c(b, T) {
    !s && o && i && r.size() === 0 && f(), r.add(b, T);
  }
  function l() {
    for (s = !0; r.size(); ) {
      var b = r;
      r = Mn(), b.process();
    }
    s = !1;
  }
  function u(b) {
    s || (b === void 0 && (b = i), a && (d(a), a = null), b ? f() : l());
  }
  function f() {
    a = m(l);
  }
  function d(b) {
    var T = clearTimeout;
    return T(b);
  }
  function m(b) {
    var T = function(y) {
      return setTimeout(y, 0);
    };
    return T(b);
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
}, te = on.exports, zs = function(e) {
  e = e || {};
  var t = e.reporter, n = e.batchProcessor, i = e.stateHandler.getState;
  if (!t)
    throw new Error("Missing required dependency: reporter.");
  function o(l, u) {
    function f() {
      u(l);
    }
    if (te.isIE(8))
      i(l).object = {
        proxy: f
      }, l.attachEvent("onresize", f);
    else {
      var d = s(l);
      if (!d)
        throw new Error("Element is not detectable by this strategy.");
      d.contentDocument.defaultView.addEventListener("resize", f);
    }
  }
  function r(l) {
    var u = e.important ? " !important; " : "; ";
    return (l.join(u) + u).trim();
  }
  function a(l, u, f) {
    f || (f = u, u = l, l = null), l = l || {}, l.debug;
    function d(m, b) {
      var T = r(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]), y = !1, k = window.getComputedStyle(m), S = m.offsetWidth, _ = m.offsetHeight;
      i(m).startSize = {
        width: S,
        height: _
      };
      function v() {
        function p() {
          if (k.position === "static") {
            m.style.setProperty("position", "relative", l.important ? "important" : "");
            var N = function(et, W, K, R) {
              function L(E) {
                return E.replace(/[^-\d\.]/g, "");
              }
              var rt = K[R];
              rt !== "auto" && L(rt) !== "0" && (et.warn("An element that is positioned static has style." + R + "=" + rt + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + R + " will be set to 0. Element: ", W), W.style.setProperty(R, "0", l.important ? "important" : ""));
            };
            N(t, m, k, "top"), N(t, m, k, "right"), N(t, m, k, "bottom"), N(t, m, k, "left");
          }
        }
        function C() {
          y || p();
          function N(W, K) {
            if (!W.contentDocument) {
              var R = i(W);
              R.checkForObjectDocumentTimeoutId && window.clearTimeout(R.checkForObjectDocumentTimeoutId), R.checkForObjectDocumentTimeoutId = setTimeout(function() {
                R.checkForObjectDocumentTimeoutId = 0, N(W, K);
              }, 100);
              return;
            }
            K(W.contentDocument);
          }
          var et = this;
          N(et, function(K) {
            b(m);
          });
        }
        k.position !== "" && (p(), y = !0);
        var w = document.createElement("object");
        w.style.cssText = T, w.tabIndex = -1, w.type = "text/html", w.setAttribute("aria-hidden", "true"), w.onload = C, te.isIE() || (w.data = "about:blank"), i(m) && (m.appendChild(w), i(m).object = w, te.isIE() && (w.data = "about:blank"));
      }
      n ? n.add(v) : v();
    }
    te.isIE(8) ? f(u) : d(u, f);
  }
  function s(l) {
    return i(l).object;
  }
  function c(l) {
    if (!!i(l)) {
      var u = s(l);
      !u || (te.isIE(8) ? l.detachEvent("onresize", u.proxy) : l.removeChild(u), i(l).checkForObjectDocumentTimeoutId && window.clearTimeout(i(l).checkForObjectDocumentTimeoutId), delete i(l).object);
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
    var p = e.important ? " !important; " : "; ";
    return (v.join(p) + p).trim();
  }
  function u() {
    var v = 500, p = 500, C = document.createElement("div");
    C.style.cssText = l(["position: absolute", "width: " + v * 2 + "px", "height: " + p * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
    var w = document.createElement("div");
    w.style.cssText = l(["position: absolute", "width: " + v + "px", "height: " + p + "px", "overflow: scroll", "visibility: none", "top: " + -v * 3 + "px", "left: " + -p * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]), w.appendChild(C), document.body.insertBefore(w, document.body.firstChild);
    var N = v - w.clientWidth, et = p - w.clientHeight;
    return document.body.removeChild(w), {
      width: N,
      height: et
    };
  }
  function f(v, p, C) {
    function w(K, R) {
      R = R || function(rt) {
        v.head.appendChild(rt);
      };
      var L = v.createElement("style");
      return L.innerHTML = K, L.id = p, R(L), L;
    }
    if (!v.getElementById(p)) {
      var N = C + "_animation", et = C + "_animation_active", W = `/* Created by the element-resize-detector library. */
`;
      W += "." + C + " > div::-webkit-scrollbar { " + l(["display: none"]) + ` }

`, W += "." + et + " { " + l(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + N, "animation-name: " + N]) + ` }
`, W += "@-webkit-keyframes " + N + ` { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
`, W += "@keyframes " + N + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", w(W);
    }
  }
  function d(v) {
    v.className += " " + s + "_animation_active";
  }
  function m(v, p, C) {
    if (v.addEventListener)
      v.addEventListener(p, C);
    else if (v.attachEvent)
      v.attachEvent("on" + p, C);
    else
      return t.error("[scroll] Don't know how to add event listeners.");
  }
  function b(v, p, C) {
    if (v.removeEventListener)
      v.removeEventListener(p, C);
    else if (v.detachEvent)
      v.detachEvent("on" + p, C);
    else
      return t.error("[scroll] Don't know how to remove event listeners.");
  }
  function T(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[0];
  }
  function y(v) {
    return i(v).container.childNodes[0].childNodes[0].childNodes[1];
  }
  function k(v, p) {
    var C = i(v).listeners;
    if (!C.push)
      throw new Error("Cannot add listener to an element that is not detectable.");
    i(v).listeners.push(p);
  }
  function S(v, p, C) {
    C || (C = p, p = v, v = null), v = v || {};
    function w() {
      if (v.debug) {
        var I = Array.prototype.slice.call(arguments);
        if (I.unshift(o.get(p), "Scroll: "), t.log.apply)
          t.log.apply(null, I);
        else
          for (var $ = 0; $ < I.length; $++)
            t.log(I[$]);
      }
    }
    function N(I) {
      function $(q) {
        var ht = q.getRootNode && q.getRootNode().contains(q);
        return q === q.ownerDocument.body || q.ownerDocument.body.contains(q) || ht;
      }
      return !$(I) || window.getComputedStyle(I) === null;
    }
    function et(I) {
      var $ = i(I).container.childNodes[0], q = window.getComputedStyle($);
      return !q.width || q.width.indexOf("px") === -1;
    }
    function W() {
      var I = window.getComputedStyle(p), $ = {};
      return $.position = I.position, $.width = p.offsetWidth, $.height = p.offsetHeight, $.top = I.top, $.right = I.right, $.bottom = I.bottom, $.left = I.left, $.widthCSS = I.width, $.heightCSS = I.height, $;
    }
    function K() {
      var I = W();
      i(p).startSize = {
        width: I.width,
        height: I.height
      }, w("Element start size", i(p).startSize);
    }
    function R() {
      i(p).listeners = [];
    }
    function L() {
      if (w("storeStyle invoked."), !i(p)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var I = W();
      i(p).style = I;
    }
    function rt(I, $, q) {
      i(I).lastWidth = $, i(I).lastHeight = q;
    }
    function E(I) {
      return T(I).childNodes[0];
    }
    function j() {
      return 2 * r.width + 1;
    }
    function J() {
      return 2 * r.height + 1;
    }
    function st(I) {
      return I + 10 + j();
    }
    function X(I) {
      return I + 10 + J();
    }
    function U(I) {
      return I * 2 + j();
    }
    function z(I) {
      return I * 2 + J();
    }
    function it(I, $, q) {
      var ht = T(I), bt = y(I), It = st($), Tt = X(q), at = U($), Y = z(q);
      ht.scrollLeft = It, ht.scrollTop = Tt, bt.scrollLeft = at, bt.scrollTop = Y;
    }
    function pt() {
      var I = i(p).container;
      if (!I) {
        I = document.createElement("div"), I.className = s, I.style.cssText = l(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), i(p).container = I, d(I), p.appendChild(I);
        var $ = function() {
          i(p).onRendered && i(p).onRendered();
        };
        m(I, "animationstart", $), i(p).onAnimationStart = $;
      }
      return I;
    }
    function Z() {
      function I() {
        var ot = i(p).style;
        if (ot.position === "static") {
          p.style.setProperty("position", "relative", v.important ? "important" : "");
          var ft = function(Et, vt, he, Bt) {
            function pe(ge) {
              return ge.replace(/[^-\d\.]/g, "");
            }
            var Jt = he[Bt];
            Jt !== "auto" && pe(Jt) !== "0" && (Et.warn("An element that is positioned static has style." + Bt + "=" + Jt + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + Bt + " will be set to 0. Element: ", vt), vt.style[Bt] = 0);
          };
          ft(t, p, ot, "top"), ft(t, p, ot, "right"), ft(t, p, ot, "bottom"), ft(t, p, ot, "left");
        }
      }
      function $(ot, ft, Et, vt) {
        return ot = ot ? ot + "px" : "0", ft = ft ? ft + "px" : "0", Et = Et ? Et + "px" : "0", vt = vt ? vt + "px" : "0", ["left: " + ot, "top: " + ft, "right: " + vt, "bottom: " + Et];
      }
      if (w("Injecting elements"), !i(p)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      I();
      var q = i(p).container;
      q || (q = pt());
      var ht = r.width, bt = r.height, It = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]), Tt = l(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat($(-(1 + ht), -(1 + bt), -bt, -ht))), at = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), Y = l(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]), ut = l(["position: absolute", "left: 0", "top: 0"]), xt = l(["position: absolute", "width: 200%", "height: 200%"]), gt = document.createElement("div"), nt = document.createElement("div"), wt = document.createElement("div"), ce = document.createElement("div"), $t = document.createElement("div"), ue = document.createElement("div");
      gt.dir = "ltr", gt.style.cssText = It, gt.className = s, nt.className = s, nt.style.cssText = Tt, wt.style.cssText = at, ce.style.cssText = ut, $t.style.cssText = Y, ue.style.cssText = xt, wt.appendChild(ce), $t.appendChild(ue), nt.appendChild(wt), nt.appendChild($t), gt.appendChild(nt), q.appendChild(gt);
      function fe() {
        var ot = i(p);
        ot && ot.onExpand ? ot.onExpand() : w("Aborting expand scroll handler: element has been uninstalled");
      }
      function de() {
        var ot = i(p);
        ot && ot.onShrink ? ot.onShrink() : w("Aborting shrink scroll handler: element has been uninstalled");
      }
      m(wt, "scroll", fe), m($t, "scroll", de), i(p).onExpandScroll = fe, i(p).onShrinkScroll = de;
    }
    function dt() {
      function I(at, Y, ut) {
        var xt = E(at), gt = st(Y), nt = X(ut);
        xt.style.setProperty("width", gt + "px", v.important ? "important" : ""), xt.style.setProperty("height", nt + "px", v.important ? "important" : "");
      }
      function $(at) {
        var Y = p.offsetWidth, ut = p.offsetHeight, xt = Y !== i(p).lastWidth || ut !== i(p).lastHeight;
        w("Storing current size", Y, ut), rt(p, Y, ut), n.add(0, function() {
          if (!!xt) {
            if (!i(p)) {
              w("Aborting because element has been uninstalled");
              return;
            }
            if (!q()) {
              w("Aborting because element container has not been initialized");
              return;
            }
            if (v.debug) {
              var nt = p.offsetWidth, wt = p.offsetHeight;
              (nt !== Y || wt !== ut) && t.warn(o.get(p), "Scroll: Size changed before updating detector elements.");
            }
            I(p, Y, ut);
          }
        }), n.add(1, function() {
          if (!i(p)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!q()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          it(p, Y, ut);
        }), xt && at && n.add(2, function() {
          if (!i(p)) {
            w("Aborting because element has been uninstalled");
            return;
          }
          if (!q()) {
            w("Aborting because element container has not been initialized");
            return;
          }
          at();
        });
      }
      function q() {
        return !!i(p).container;
      }
      function ht() {
        function at() {
          return i(p).lastNotifiedWidth === void 0;
        }
        w("notifyListenersIfNeeded invoked");
        var Y = i(p);
        if (at() && Y.lastWidth === Y.startSize.width && Y.lastHeight === Y.startSize.height)
          return w("Not notifying: Size is the same as the start size, and there has been no notification yet.");
        if (Y.lastWidth === Y.lastNotifiedWidth && Y.lastHeight === Y.lastNotifiedHeight)
          return w("Not notifying: Size already notified");
        w("Current size not notified, notifying..."), Y.lastNotifiedWidth = Y.lastWidth, Y.lastNotifiedHeight = Y.lastHeight, _s(i(p).listeners, function(ut) {
          ut(p);
        });
      }
      function bt() {
        if (w("startanimation triggered."), et(p)) {
          w("Ignoring since element is still unrendered...");
          return;
        }
        w("Element rendered.");
        var at = T(p), Y = y(p);
        (at.scrollLeft === 0 || at.scrollTop === 0 || Y.scrollLeft === 0 || Y.scrollTop === 0) && (w("Scrollbars out of sync. Updating detector elements..."), $(ht));
      }
      function It() {
        if (w("Scroll detected."), et(p)) {
          w("Scroll event fired while unrendered. Ignoring...");
          return;
        }
        $(ht);
      }
      if (w("registerListenersAndPositionElements invoked."), !i(p)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      i(p).onRendered = bt, i(p).onExpand = It, i(p).onShrink = It;
      var Tt = i(p).style;
      I(p, Tt.width, Tt.height);
    }
    function mt() {
      if (w("finalizeDomMutation invoked."), !i(p)) {
        w("Aborting because element has been uninstalled");
        return;
      }
      var I = i(p).style;
      rt(p, I.width, I.height), it(p, I.width, I.height);
    }
    function yt() {
      C(p);
    }
    function ct() {
      w("Installing..."), R(), K(), n.add(0, L), n.add(1, Z), n.add(2, dt), n.add(3, mt), n.add(4, yt);
    }
    w("Making detectable..."), N(p) ? (w("Element is detached"), pt(), w("Waiting until element is attached..."), i(p).onRendered = function() {
      w("Element is now attached"), ct();
    }) : ct();
  }
  function _(v) {
    var p = i(v);
    !p || (p.onExpandScroll && b(T(v), "scroll", p.onExpandScroll), p.onShrinkScroll && b(y(v), "scroll", p.onShrinkScroll), p.onAnimationStart && b(p.container, "animationstart", p.onAnimationStart), p.container && v.removeChild(p.container));
  }
  return {
    makeDetectable: S,
    addListener: k,
    uninstall: _,
    initDocument: c
  };
}, ne = nn.exports.forEach, Ms = gs, Ds = vs, Ps = ms, Os = ys, As = bs, Dn = on.exports, ks = Es, Pt = Ts, Rs = zs, Hs = Cs;
function Pn(e) {
  return Array.isArray(e) || e.length !== void 0;
}
function On(e) {
  if (Array.isArray(e))
    return e;
  var t = [];
  return ne(e, function(n) {
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
      get: function(S) {
        return e.idHandler.get(S, !0);
      },
      set: e.idHandler.set
    };
  else {
    var n = Ps(), i = Os({
      idGenerator: n,
      stateHandler: Pt
    });
    t = i;
  }
  var o = e.reporter;
  if (!o) {
    var r = o === !1;
    o = As(r);
  }
  var a = Ot(e, "batchProcessor", ks({ reporter: o })), s = {};
  s.callOnAdd = !!Ot(e, "callOnAdd", !0), s.debug = !!Ot(e, "debug", !1);
  var c = Ds(t), l = Ms({
    stateHandler: Pt
  }), u, f = Ot(e, "strategy", "object"), d = Ot(e, "important", !1), m = {
    reporter: o,
    batchProcessor: a,
    stateHandler: Pt,
    idHandler: t,
    important: d
  };
  if (f === "scroll" && (Dn.isLegacyOpera() ? (o.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), f = "object") : Dn.isIE(9) && (o.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), f = "object")), f === "scroll")
    u = Hs(m);
  else if (f === "object")
    u = Rs(m);
  else
    throw new Error("Invalid strategy name: " + f);
  var b = {};
  function T(S, _, v) {
    function p(K) {
      var R = c.get(K);
      ne(R, function(rt) {
        rt(K);
      });
    }
    function C(K, R, L) {
      c.add(R, L), K && L(R);
    }
    if (v || (v = _, _ = S, S = {}), !_)
      throw new Error("At least one element required.");
    if (!v)
      throw new Error("Listener required.");
    if (An(_))
      _ = [_];
    else if (Pn(_))
      _ = On(_);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    var w = 0, N = Ot(S, "callOnAdd", s.callOnAdd), et = Ot(S, "onReady", function() {
    }), W = Ot(S, "debug", s.debug);
    ne(_, function(R) {
      Pt.getState(R) || (Pt.initState(R), t.set(R));
      var L = t.get(R);
      if (W && o.log("Attaching listener to element", L, R), !l.isDetectable(R)) {
        if (W && o.log(L, "Not detectable."), l.isBusy(R)) {
          W && o.log(L, "System busy making it detectable"), C(N, R, v), b[L] = b[L] || [], b[L].push(function() {
            w++, w === _.length && et();
          });
          return;
        }
        return W && o.log(L, "Making detectable..."), l.markBusy(R, !0), u.makeDetectable({ debug: W, important: d }, R, function(E) {
          if (W && o.log(L, "onElementDetectable"), Pt.getState(E)) {
            l.markAsDetectable(E), l.markBusy(E, !1), u.addListener(E, p), C(N, E, v);
            var j = Pt.getState(E);
            if (j && j.startSize) {
              var J = E.offsetWidth, st = E.offsetHeight;
              (j.startSize.width !== J || j.startSize.height !== st) && p(E);
            }
            b[L] && ne(b[L], function(X) {
              X();
            });
          } else
            W && o.log(L, "Element uninstalled before being detectable.");
          delete b[L], w++, w === _.length && et();
        });
      }
      W && o.log(L, "Already detecable, adding listener."), C(N, R, v), w++;
    }), w === _.length && et();
  }
  function y(S) {
    if (!S)
      return o.error("At least one element is required.");
    if (An(S))
      S = [S];
    else if (Pn(S))
      S = On(S);
    else
      return o.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
    ne(S, function(_) {
      c.removeAllListeners(_), u.uninstall(_), Pt.cleanState(_);
    });
  }
  function k(S) {
    u.initDocument && u.initDocument(S);
  }
  return {
    listenTo: T,
    removeListener: c.removeListener,
    removeAllListeners: c.removeAllListeners,
    uninstall: y,
    initDocument: k
  };
};
function Ot(e, t, n) {
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
    rowHeight: { default: 0 },
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
    keepAspectRatio: { type: Boolean, default: !1 },
    responsiveLayouts: { default: () => ({}) },
    transformScale: { default: 1 },
    breakpoints: { default: () => ({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }) },
    cols: { default: () => ({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }) },
    preventCollision: { type: [Boolean, Function], default: !1 },
    useStyleCursor: { type: Boolean, default: !0 }
  },
  emits: ["layout-created", "layout-before-mount", "layout-mounted", "layout-updated", "layout-ready", "update:layout", "breakpoint-changed", "reset-selected", "update-width"],
  setup(e, { expose: t, emit: n }) {
    const i = e, o = O(null), r = O({}), a = O(0), s = O(!1), c = O({ x: 0, y: 0, w: 0, h: 0, i: -1 }), l = O({}), u = O(null), f = O(null), d = O(null), m = O(), b = O({}), T = O(), y = hs(), k = Lt(() => !i.rowHeight && o.value && i.keepAspectRatio ? (o.value - i.margin[0] * (i.colNum + 1)) / i.colNum : i.rowHeight || 100);
    Mi("eventBus", y);
    const S = n;
    function _(E) {
      if (!E)
        K();
      else {
        const { eventType: j, i: J, x: st, y: X, h: U, w: z } = E;
        K(j, J, st, X, U, z);
      }
    }
    function v(E) {
      if (!E)
        et();
      else {
        const { eventType: j, i: J, x: st, y: X, h: U, w: z } = E;
        et(j, J, st, X);
      }
    }
    y.on("resizeEvent", _), y.on("dragEvent", v), S("layout-created", i.layout), Rn(() => {
      y.off("resizeEvent", _), y.off("dragEvent", v), Ki("resize", w), d.value && d.value.uninstall(b.value);
    }), Di(() => {
      S("layout-before-mount", i.layout);
    }), Hn(() => {
      S("layout-mounted", i.layout), zt(function() {
        Ni(i.layout), f.value = i.layout, zt(() => {
          L(), w(), Vi("resize", w), Ut(i.layout, i.verticalCompact), S("layout-updated", i.layout), C(), zt(() => {
            d.value = $s({
              strategy: "scroll",
              callOnAdd: !1
            }), d.value.listenTo(b.value, function() {
              w();
            });
          });
        });
      });
    }), G(o, (E, j) => {
      zt(() => {
        y.emit("updateWidth", E), E != null && S("update-width", {
          width: E,
          marginX: i.margin[0]
        }), j === null && zt(() => {
          S("layout-ready", i.layout);
        }), C();
      });
    }), G(
      () => i.layout,
      () => {
        p();
      }
    ), G(
      () => i.layout.length,
      () => {
        p();
      }
    ), G(
      () => i.colNum,
      (E) => {
        y.emit("setColNum", E);
      }
    ), G(
      () => k.value,
      (E) => {
        y.emit("setRowHeight", E);
      }
    ), G(
      () => i.isDraggable,
      (E) => {
        y.emit("setDraggable", E);
      }
    ), G(
      () => i.isResizable,
      (E) => {
        y.emit("setResizable", E);
      }
    ), G(
      () => i.isBounded,
      (E) => {
        y.emit("setBounded", E);
      }
    ), G(
      () => i.transformScale,
      (E) => {
        y.emit("setTransformScale", E);
      }
    ), G(
      () => i.responsive,
      (E) => {
        E || (S("update:layout", f.value || []), y.emit("setColNum", i.colNum)), w();
      }
    ), G(
      () => i.maxRows,
      (E) => {
        y.emit("setMaxRows", E);
      }
    ), G(
      () => i.margin,
      () => {
        C();
      }
    );
    function p() {
      if (i.layout !== void 0 && f.value !== null) {
        if (i.layout.length !== f.value.length) {
          let E = rt(i.layout, f.value);
          E.length > 0 && (i.layout.length > f.value.length ? f.value = f.value.concat(E) : f.value = f.value.filter((j) => !E.some((J) => j.i === J.i))), a.value = i.layout.length, L();
        }
        Ut(i.layout, i.verticalCompact), y.emit("updateWidth", o.value), C(), S("layout-updated", i.layout);
      }
    }
    function C() {
      r.value = {
        height: N()
      };
    }
    function w() {
      b.value !== null && b.value !== void 0 && (o.value = b.value.offsetWidth), y.emit("resizeEvent");
    }
    function N() {
      return i.autoSize ? ki(i.layout) * (k.value + i.margin[1]) + i.margin[1] + "px" : "";
    }
    function et(E, j, J, st, X, U) {
      let z = ln(i.layout, j);
      z != null && z.selected || S("reset-selected"), z == null && (z = { x: 0, y: 0 }), E === "dragstart" && !i.verticalCompact && (m.value = i.layout.reduce(
        (Z, { i: dt, x: mt, y: yt }) => ({
          ...Z,
          [dt]: { x: mt, y: yt }
        }),
        {}
      )), E === "dragmove" || E === "dragstart" ? (zt(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : zt(function() {
        s.value = !1;
      });
      const it = W(z), pt = Fe(i.layout, z, J, st, !0, it);
      S("update:layout", pt), i.restoreOnDrag ? (z.static = !0, Ut(i.layout, i.verticalCompact, m.value), z.static = !1) : Ut(i.layout, i.verticalCompact), y.emit("compact"), C(), E === "dragend" && (m.value = void 0, S("layout-updated", pt));
    }
    function W(E) {
      return typeof i.preventCollision == "function" ? i.preventCollision({
        layout: i.layout,
        layoutItem: E
      }) : i.preventCollision;
    }
    function K(E, j, J, st, X, U) {
      let z = ln(i.layout, j);
      z == null && (z = { h: 0, w: 0 }), U = Number(U), X = Number(X);
      let it;
      if (W(z)) {
        const Z = Ln(i.layout, { ...z, w: U, h: X }).filter(
          (dt) => dt.i !== (z == null ? void 0 : z.i)
        );
        if (it = Z.length > 0, it) {
          let dt = 1 / 0, mt = 1 / 0;
          Z.forEach((yt) => {
            yt.x > Number(z == null ? void 0 : z.x) && (dt = Math.min(dt, yt.x)), yt.y > Number(z == null ? void 0 : z.y) && (mt = Math.min(mt, yt.y));
          }), Number.isFinite(dt) && (z.w = dt - z.x), Number.isFinite(mt) && (z.h = mt - z.y);
        }
      }
      it || (z.w = U, z.h = X), E === "resizestart" || E === "resizemove" ? (c.value.i = j, c.value.x = J, c.value.y = st, c.value.w = z.w, c.value.h = z.h, zt(function() {
        s.value = !0;
      }), y.emit("updateWidth", o.value)) : zt(function() {
        s.value = !1;
      }), i.responsive && R(), Ut(i.layout, i.verticalCompact), y.emit("compact"), C(), E === "resizeend" && S("layout-updated", i.layout);
    }
    function R() {
      let E = Yi(i.breakpoints, o.value), j = Ne(E, i.cols);
      u.value != null && !l.value[u.value] && (l.value[u.value] = We(i.layout));
      let J = Gi(
        f.value,
        l.value,
        i.breakpoints,
        E,
        u.value,
        j,
        i.verticalCompact
      );
      l.value[E] = J, u.value !== E && S("breakpoint-changed", E, J), S("update:layout", J), u.value = E, y.emit("setColNum", Ne(E, i.cols));
    }
    function L() {
      l.value = Object.assign({}, i.responsiveLayouts);
    }
    function rt(E, j) {
      let J = E.filter(function(X) {
        return !j.some(function(U) {
          return X.i === U.i;
        });
      }), st = j.filter(function(X) {
        return !E.some(function(U) {
          return X.i === U.i;
        });
      });
      return J.concat(st);
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
      erd: d,
      defaultGridItem: T,
      dragEvent: et
    }), (E, j) => ($e(), Be("div", {
      ref_key: "this$refsLayout",
      ref: b,
      class: "vue-grid-layout",
      style: Le(r.value)
    }, [
      $n(E.$slots, "default"),
      Pi(Oi(yi, {
        ref_key: "defaultGridItem",
        ref: T,
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
