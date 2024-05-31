const ds = "modulepreload",
    fs = function (e) {
        return "/extensions/ComfyUI-Mape-Helpers/tweak/" + e
    },
    Ro = {},
    Et = function (t, n, o) {
        let i = Promise.resolve();
        if (n && n.length > 0) {
            const s = document.getElementsByTagName("link");
            i = Promise.all(n.map(r => {
                if (r = fs(r), r in Ro) return;
                Ro[r] = !0;
                const l = r.endsWith(".css"),
                    a = l ? '[rel="stylesheet"]' : "";
                if (!!o)
                    for (let p = s.length - 1; p >= 0; p--) {
                        const h = s[p];
                        if (h.href === r && (!l || h.rel === "stylesheet")) return
                    } else if (document.querySelector(`link[href="${r}"]${a}`)) return;
                const c = document.createElement("link");
                if (c.rel = l ? "stylesheet" : ds, l || (c.as = "script", c.crossOrigin = ""), c.href = r, document.head.appendChild(c), l) return new Promise((p, h) => {
                    c.addEventListener("load", p), c.addEventListener("error", () => h(new Error(`Unable to preload CSS for ${r}`)))
                })
            }))
        }
        return i.then(() => t()).catch(s => {
            const r = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (r.payload = s, window.dispatchEvent(r), !r.defaultPrevented) throw s
        })
    },
    ps = (e, t) => e === t,
    ht = Symbol("solid-proxy"),
    lo = Symbol("solid-track"),
    $n = {
        equals: ps
    };
let gi = $i;
const st = 1,
    wn = 2,
    vi = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var me = null;
let Bn = null,
    hs = null,
    $e = null,
    je = null,
    Ve = null,
    Tn = 0;

function dn(e, t) {
    const n = $e,
        o = me,
        i = e.length === 0,
        s = t === void 0 ? o : t,
        r = i ? vi : {
            owned: null,
            cleanups: null,
            context: s ? s.context : null,
            owner: s
        },
        l = i ? e : () => e(() => Xe(() => Ln(r)));
    me = r, $e = null;
    try {
        return Tt(l, !0)
    } finally {
        $e = n, me = o
    }
}

function ne(e, t) {
    t = t ? Object.assign({}, $n, t) : $n;
    const n = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: t.equals || void 0
        },
        o = i => (typeof i == "function" && (i = i(n.value)), _i(n, i));
    return [yi.bind(n), o]
}

function F(e, t, n) {
    const o = Ao(e, t, !1, st);
    tn(o)
}

function Le(e, t, n) {
    gi = ws;
    const o = Ao(e, t, !1, st),
        i = Ho && vs(Ho);
    i && (o.suspense = i), (!n || !n.render) && (o.user = !0), Ve ? Ve.push(o) : tn(o)
}

function le(e, t, n) {
    n = n ? Object.assign({}, $n, n) : $n;
    const o = Ao(e, t, !0, 0);
    return o.observers = null, o.observerSlots = null, o.comparator = n.equals || void 0, tn(o), yi.bind(o)
}

function ms(e) {
    return Tt(e, !1)
}

function Xe(e) {
    if ($e === null) return e();
    const t = $e;
    $e = null;
    try {
        return e()
    } finally {
        $e = t
    }
}

function Qe(e) {
    Le(() => Xe(e))
}

function Vt(e) {
    return me === null || (me.cleanups === null ? me.cleanups = [e] : me.cleanups.push(e)), e
}

function ao() {
    return $e
}

function gs() {
    return me
}

function vs(e) {
    return me && me.context && me.context[e.id] !== void 0 ? me.context[e.id] : e.defaultValue
}

function ys(e) {
    const t = le(e),
        n = le(() => co(t()));
    return n.toArray = () => {
        const o = n();
        return Array.isArray(o) ? o : o != null ? [o] : []
    }, n
}
let Ho;

function yi() {
    if (this.sources && this.state)
        if (this.state === st) tn(this);
        else {
            const e = je;
            je = null, Tt(() => kn(this), !1), je = e
        } if ($e) {
        const e = this.observers ? this.observers.length : 0;
        $e.sources ? ($e.sources.push(this), $e.sourceSlots.push(e)) : ($e.sources = [this], $e.sourceSlots = [e]), this.observers ? (this.observers.push($e), this.observerSlots.push($e.sources.length - 1)) : (this.observers = [$e], this.observerSlots = [$e.sources.length - 1])
    }
    return this.value
}

function _i(e, t, n) {
    let o = e.value;
    return (!e.comparator || !e.comparator(o, t)) && (e.value = t, e.observers && e.observers.length && Tt(() => {
        for (let i = 0; i < e.observers.length; i += 1) {
            const s = e.observers[i],
                r = Bn && Bn.running;
            r && Bn.disposed.has(s), (r ? !s.tState : !s.state) && (s.pure ? je.push(s) : Ve.push(s), s.observers && wi(s)), r || (s.state = st)
        }
        if (je.length > 1e6) throw je = [], new Error
    }, !1)), t
}

function tn(e) {
    if (!e.fn) return;
    Ln(e);
    const t = Tn;
    _s(e, e.value, t)
}

function _s(e, t, n) {
    let o;
    const i = me,
        s = $e;
    $e = me = e;
    try {
        o = e.fn(t)
    } catch (r) {
        return e.pure && (e.state = st, e.owned && e.owned.forEach(Ln), e.owned = null), e.updatedAt = n + 1, bi(r)
    } finally {
        $e = s, me = i
    }(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? _i(e, o) : e.value = o, e.updatedAt = n)
}

function Ao(e, t, n, o = st, i) {
    const s = {
        fn: e,
        state: o,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: me,
        context: me ? me.context : null,
        pure: n
    };
    return me === null || me !== vi && (me.owned ? me.owned.push(s) : me.owned = [s]), s
}

function bn(e) {
    if (e.state === 0) return;
    if (e.state === wn) return kn(e);
    if (e.suspense && Xe(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const t = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < Tn);) e.state && t.push(e);
    for (let n = t.length - 1; n >= 0; n--)
        if (e = t[n], e.state === st) tn(e);
        else if (e.state === wn) {
        const o = je;
        je = null, Tt(() => kn(e, t[0]), !1), je = o
    }
}

function Tt(e, t) {
    if (je) return e();
    let n = !1;
    t || (je = []), Ve ? n = !0 : Ve = [], Tn++;
    try {
        const o = e();
        return $s(n), o
    } catch (o) {
        n || (Ve = null), je = null, bi(o)
    }
}

function $s(e) {
    if (je && ($i(je), je = null), e) return;
    const t = Ve;
    Ve = null, t.length && Tt(() => gi(t), !1)
}

function $i(e) {
    for (let t = 0; t < e.length; t++) bn(e[t])
}

function ws(e) {
    let t, n = 0;
    for (t = 0; t < e.length; t++) {
        const o = e[t];
        o.user ? e[n++] = o : bn(o)
    }
    for (t = 0; t < n; t++) bn(e[t])
}

function kn(e, t) {
    e.state = 0;
    for (let n = 0; n < e.sources.length; n += 1) {
        const o = e.sources[n];
        if (o.sources) {
            const i = o.state;
            i === st ? o !== t && (!o.updatedAt || o.updatedAt < Tn) && bn(o) : i === wn && kn(o, t)
        }
    }
}

function wi(e) {
    for (let t = 0; t < e.observers.length; t += 1) {
        const n = e.observers[t];
        n.state || (n.state = wn, n.pure ? je.push(n) : Ve.push(n), n.observers && wi(n))
    }
}

function Ln(e) {
    let t;
    if (e.sources)
        for (; e.sources.length;) {
            const n = e.sources.pop(),
                o = e.sourceSlots.pop(),
                i = n.observers;
            if (i && i.length) {
                const s = i.pop(),
                    r = n.observerSlots.pop();
                o < i.length && (s.sourceSlots[r] = o, i[o] = s, n.observerSlots[o] = r)
            }
        }
    if (e.owned) {
        for (t = e.owned.length - 1; t >= 0; t--) Ln(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0
}

function bs(e) {
    return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
        cause: e
    })
}

function bi(e, t = me) {
    throw bs(e)
}

function co(e) {
    if (typeof e == "function" && !e.length) return co(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const o = co(e[n]);
            Array.isArray(o) ? t.push.apply(t, o) : t.push(o)
        }
        return t
    }
    return e
}
const ks = Symbol("fallback");

function zo(e) {
    for (let t = 0; t < e.length; t++) e[t]()
}

function xs(e, t, n = {}) {
    let o = [],
        i = [],
        s = [],
        r = 0,
        l = t.length > 1 ? [] : null;
    return Vt(() => zo(s)), () => {
        let a = e() || [],
            u, c;
        return a[lo], Xe(() => {
            let h = a.length,
                d, f, m, w, $, b, _, k, x;
            if (h === 0) r !== 0 && (zo(s), s = [], o = [], i = [], r = 0, l && (l = [])), n.fallback && (o = [ks], i[0] = dn(j => (s[0] = j, n.fallback())), r = 1);
            else if (r === 0) {
                for (i = new Array(h), c = 0; c < h; c++) o[c] = a[c], i[c] = dn(p);
                r = h
            } else {
                for (m = new Array(h), w = new Array(h), l && ($ = new Array(h)), b = 0, _ = Math.min(r, h); b < _ && o[b] === a[b]; b++);
                for (_ = r - 1, k = h - 1; _ >= b && k >= b && o[_] === a[k]; _--, k--) m[k] = i[_], w[k] = s[_], l && ($[k] = l[_]);
                for (d = new Map, f = new Array(k + 1), c = k; c >= b; c--) x = a[c], u = d.get(x), f[c] = u === void 0 ? -1 : u, d.set(x, c);
                for (u = b; u <= _; u++) x = o[u], c = d.get(x), c !== void 0 && c !== -1 ? (m[c] = i[u], w[c] = s[u], l && ($[c] = l[u]), c = f[c], d.set(x, c)) : s[u]();
                for (c = b; c < h; c++) c in m ? (i[c] = m[c], s[c] = w[c], l && (l[c] = $[c], l[c](c))) : i[c] = dn(p);
                i = i.slice(0, r = h), o = a.slice(0)
            }
            return i
        });

        function p(h) {
            if (s[c] = h, l) {
                const [d, f] = ne(c);
                return l[c] = f, t(a[c], d)
            }
            return t(a[c])
        }
    }
}
let Ss = !1;

function Ae(e, t) {
    return Xe(() => e(t || {}))
}
const As = e => `Stale read from <${e}>.`;

function ki(e) {
    const t = "fallback" in e && {
        fallback: () => e.fallback
    };
    return le(xs(() => e.each, e.children, t || void 0))
}

function xi(e) {
    let t = !1;
    const n = (s, r) => (t ? s[1] === r[1] : !s[1] == !r[1]) && s[2] === r[2],
        o = ys(() => e.children),
        i = le(() => {
            let s = o();
            Array.isArray(s) || (s = [s]);
            for (let r = 0; r < s.length; r++) {
                const l = s[r].when;
                if (l) return t = !!s[r].keyed, [r, l, s[r]]
            }
            return [-1]
        }, void 0, {
            equals: n
        });
    return le(() => {
        const [s, r, l] = i();
        if (s < 0) return e.fallback;
        const a = l.children;
        return typeof a == "function" && a.length > 0 ? Xe(() => a(t ? r : () => {
            if (Xe(i)[0] !== s) throw As("Match");
            return l.when
        })) : a
    }, void 0, void 0)
}

function dt(e) {
    return e
}

function Es(e, t, n) {
    let o = n.length,
        i = t.length,
        s = o,
        r = 0,
        l = 0,
        a = t[i - 1].nextSibling,
        u = null;
    for (; r < i || l < s;) {
        if (t[r] === n[l]) {
            r++, l++;
            continue
        }
        for (; t[i - 1] === n[s - 1];) i--, s--;
        if (i === r) {
            const c = s < o ? l ? n[l - 1].nextSibling : n[s - l] : a;
            for (; l < s;) e.insertBefore(n[l++], c)
        } else if (s === l)
            for (; r < i;)(!u || !u.has(t[r])) && t[r].remove(), r++;
        else if (t[r] === n[s - 1] && n[l] === t[i - 1]) {
            const c = t[--i].nextSibling;
            e.insertBefore(n[l++], t[r++].nextSibling), e.insertBefore(n[--s], c), t[i] = n[s]
        } else {
            if (!u) {
                u = new Map;
                let p = l;
                for (; p < s;) u.set(n[p], p++)
            }
            const c = u.get(t[r]);
            if (c != null)
                if (l < c && c < s) {
                    let p = r,
                        h = 1,
                        d;
                    for (; ++p < i && p < s && !((d = u.get(t[p])) == null || d !== c + h);) h++;
                    if (h > c - l) {
                        const f = t[r];
                        for (; l < c;) e.insertBefore(n[l++], f)
                    } else e.replaceChild(n[l++], t[r++])
                } else r++;
            else t[r++].remove()
        }
    }
}
const Do = "_$DX_DELEGATE";

function Si(e, t, n, o = {}) {
    let i;
    return dn(s => {
        i = s, t === document ? e() : L(t, e(), t.firstChild ? null : void 0, n)
    }, o.owner), () => {
        i(), t.textContent = ""
    }
}

function S(e, t, n) {
    let o;
    const i = () => {
            const r = document.createElement("template");
            return r.innerHTML = e, n ? r.content.firstChild.firstChild : r.content.firstChild
        },
        s = t ? () => Xe(() => document.importNode(o || (o = i()), !0)) : () => (o || (o = i())).cloneNode(!0);
    return s.cloneNode = s, s
}

function yt(e, t = window.document) {
    const n = t[Do] || (t[Do] = new Set);
    for (let o = 0, i = e.length; o < i; o++) {
        const s = e[o];
        n.has(s) || (n.add(s), t.addEventListener(s, Os))
    }
}

function he(e, t, n) {
    n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
}

function Cs(e, t) {
    t == null ? e.removeAttribute("class") : e.className = t
}

function Eo(e, t, n, o) {
    if (o) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
    else if (Array.isArray(n)) {
        const i = n[0];
        e.addEventListener(t, n[0] = s => i.call(e, n[1], s))
    } else e.addEventListener(t, n)
}

function Fo(e, t, n) {
    if (!t) return n ? he(e, "style") : t;
    const o = e.style;
    if (typeof t == "string") return o.cssText = t;
    typeof n == "string" && (o.cssText = n = void 0), n || (n = {}), t || (t = {});
    let i, s;
    for (s in n) t[s] == null && o.removeProperty(s), delete n[s];
    for (s in t) i = t[s], i !== n[s] && (o.setProperty(s, i), n[s] = i);
    return n
}

function Ct(e, t, n) {
    return Xe(() => e(t, n))
}

function L(e, t, n, o) {
    if (n !== void 0 && !o && (o = []), typeof t != "function") return xn(e, t, o, n);
    F(i => xn(e, t(), i, n), o)
}

function Os(e) {
    const t = `$$${e.type}`;
    let n = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== n && Object.defineProperty(e, "target", {
            configurable: !0,
            value: n
        }), Object.defineProperty(e, "currentTarget", {
            configurable: !0,
            get() {
                return n || document
            }
        }); n;) {
        const o = n[t];
        if (o && !n.disabled) {
            const i = n[`${t}Data`];
            if (i !== void 0 ? o.call(n, i, e) : o.call(n, e), e.cancelBubble) return
        }
        n = n._$host || n.parentNode || n.host
    }
}

function xn(e, t, n, o, i) {
    for (; typeof n == "function";) n = n();
    if (t === n) return n;
    const s = typeof t,
        r = o !== void 0;
    if (e = r && n[0] && n[0].parentNode || e, s === "string" || s === "number")
        if (s === "number" && (t = t.toString()), r) {
            let l = n[0];
            l && l.nodeType === 3 ? l.data !== t && (l.data = t) : l = document.createTextNode(t), n = $t(e, n, o, l)
        } else n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
    else if (t == null || s === "boolean") n = $t(e, n, o);
    else {
        if (s === "function") return F(() => {
            let l = t();
            for (; typeof l == "function";) l = l();
            n = xn(e, l, n, o)
        }), () => n;
        if (Array.isArray(t)) {
            const l = [],
                a = n && Array.isArray(n);
            if (uo(l, t, n, i)) return F(() => n = xn(e, l, n, o, !0)), () => n;
            if (l.length === 0) {
                if (n = $t(e, n, o), r) return n
            } else a ? n.length === 0 ? Bo(e, l, o) : Es(e, n, l) : (n && $t(e), Bo(e, l));
            n = l
        } else if (t.nodeType) {
            if (Array.isArray(n)) {
                if (r) return n = $t(e, n, o, t);
                $t(e, n, null, t)
            } else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
            n = t
        }
    }
    return n
}

function uo(e, t, n, o) {
    let i = !1;
    for (let s = 0, r = t.length; s < r; s++) {
        let l = t[s],
            a = n && n[s],
            u;
        if (!(l == null || l === !0 || l === !1))
            if ((u = typeof l) == "object" && l.nodeType) e.push(l);
            else if (Array.isArray(l)) i = uo(e, l, a) || i;
        else if (u === "function")
            if (o) {
                for (; typeof l == "function";) l = l();
                i = uo(e, Array.isArray(l) ? l : [l], Array.isArray(a) ? a : [a]) || i
            } else e.push(l), i = !0;
        else {
            const c = String(l);
            a && a.nodeType === 3 && a.data === c ? e.push(a) : e.push(document.createTextNode(c))
        }
    }
    return i
}

function Bo(e, t, n = null) {
    for (let o = 0, i = t.length; o < i; o++) e.insertBefore(t[o], n)
}

function $t(e, t, n, o) {
    if (n === void 0) return e.textContent = "";
    const i = o || document.createTextNode("");
    if (t.length) {
        let s = !1;
        for (let r = t.length - 1; r >= 0; r--) {
            const l = t[r];
            if (i !== l) {
                const a = l.parentNode === e;
                !s && !r ? a ? e.replaceChild(i, l) : e.insertBefore(i, n) : a && l.remove()
            } else s = !0
        }
    } else e.insertBefore(i, n);
    return [i]
}
const Ps = async () => {
    const {
        ImagePreviews: e
    } = await Et(() => Promise.resolve().then(() => Vs), void 0), t = document.createElement("div");
    document.body.appendChild(t), Si(() => Ae(e, {}), t)
}, js = async () => {
    const {
        registerPlugin: e
    } = await Et(() => Promise.resolve().then(() => Lr), void 0);
    e(), async function t() {
        if (typeof app > "u") {
            setTimeout(t);
            return
        }
        const {
            MapeTweak: n
        } = await Et(() => Promise.resolve().then(() => Wa), void 0), o = document.createElement("div");
        document.body.appendChild(o), Si(() => Ae(n, {}), o)
    }()
};
window.standaloneImagePreview ? Ps() : js();

function se(e) {
    let t = e.type;
    return e.IS_MAPE_VARIABLE ? !0 : (t === void 0 && (t = e.comfyClass), t ? t.startsWith(Ye) : !1)
}
const pt = e => {
        var t, n, o;
        return !!(se(e) && ((o = (n = (t = e.outputs) == null ? void 0 : t[0]) == null ? void 0 : n.links) != null && o.length))
    },
    Ie = e => {
        var t, n;
        return !!(se(e) && ((n = (t = e.inputs) == null ? void 0 : t[0]) != null && n.link))
    },
    cn = "mape_tweak_",
    Is = "mape_imagepreview_",
    tt = "mape_tweak_pos_",
    Un = "mape_group",
    Ye = "mape Variable",
    Ns = "*",
    He = () => graph._nodes,
    ae = (e, t) => t ? t.find(n => n.id === e) : graph.getNodeById(e),
    nn = (e = He()) => e.filter(se),
    Ai = (e = He()) => nn(e).filter(Ie),
    fn = () => graph._groups,
    Ts = () => {
        var e;
        return (e = Ze()) == null ? void 0 : e[0]
    },
    Ze = () => Object.values(graph.list_of_graphcanvas[0].selected_nodes),
    et = e => e ? `/view?filename=${e.filename}&subfolder=${e.subfolder}&type=${e.type}&rand=42` : void 0,
    Sn = (e, t, n, o) => {
        const i = n - e,
            s = o - t;
        return Math.sqrt(i ** 2 + s ** 2)
    },
    Ei = e => {
        const t = Object.fromEntries(Object.values(e).map(s => [s.name, s.pos ?? [0, 0]])),
            n = Math.min(...Object.values(t).map(([s, r]) => s)),
            o = Math.min(...Object.values(t).map(([s, r]) => r)),
            i = Object.fromEntries(Object.entries(t).map(([s, [r, l]]) => [s, Sn(n, o, r, l)]));
        return (s, r) => i[s.name] - i[r.name]
    },
    Ls = (e, t, n) => {
        const o = Object.fromEntries(e.map(l => [l[t], l[n] ?? [0, 0]])),
            i = Math.min(...Object.values(o).map(([l, a]) => l)),
            s = Math.min(...Object.values(o).map(([l, a]) => a)),
            r = Object.fromEntries(Object.entries(o).map(([l, [a, u]]) => [l, Sn(i, s, a, u)]));
        return (l, a) => r[l[t]] - r[a[t]]
    },
    Ms = (e, t, n = .35) => {
        let o = 1,
            i = 1,
            s = 1,
            r = 1,
            l = 1,
            a = 1,
            u = 1;
        const c = e[0],
            p = e[1],
            h = p / c;
        for (let d = 1; d <= t; d++) {
            const f = d,
                m = Math.ceil(t / f);
            m / f * n > h ? (u = Math.floor(p / m), a = Math.floor(u / n)) : (a = Math.floor(c / f), u = Math.floor(a * n));
            const w = a * u * t;
            (o === void 0 || w > o) && (o = w, r = u, l = a, i = f, s = m)
        }
        return {
            targetCols: i,
            targetRows: s,
            targetHeight: r,
            targetWidth: l
        }
    };
var Rs = S("<div class=imagePreviews>"),
    Hs = S("<div class=imagePreviewTweaks><label>Image Previews</label><label>Display type"),
    Uo = S("<img class=fullImage>"),
    zs = S("<div class=mosaicGrid><div class=inner>"),
    Ds = S('<div class=flipbookFps><label for="">FPS</label><input type=number step=1 min=1 max=120><label for=flipflop title="Reverse at end of clip instead of restarting">Flip Flop</label><input id=flipflop type=checkbox>'),
    Fs = S("<div class=content><div class=bigPreview><div class=zoom>x"),
    Go = S("<div class=button>"),
    Bs = S("<div class=thumbnails>"),
    Us = S("<div class=thumb><img class=smallImage>"),
    Gs = S("<div class=mosaicImage><img class=smallImage>"),
    Ks = S("<div class=imagePreviewHelp><p>Shift + Click a link and enable tweak to have it show up in the images preview window.</p><video src=https://comfyui.ma.pe/help/imagePreview.mp4>");
const Ut = "mape_image_previews",
    Gn = `${Is}FPS`,
    Ws = () => {
        const [e, t] = ne(1), [n, o] = ne([0, 0]), [i, s] = ne(0), [r, l] = ne("images"), [a, u] = ne({}), [c, p] = ne(localStorage.mapeImageDisplayType ?? "single");
        let h;
        Le(() => {
            r(), f(0)
        });
        const [d, f] = ne(0), [m, w] = ne(localStorage[Gn] ? JSON.parse(localStorage[Gn]) : {}), [$, b] = ne(!!localStorage.mape_tweak_flipflop);
        Le(() => {
            localStorage[Gn] = JSON.stringify(m())
        }), Le(() => {
            $() ? localStorage.mape_tweak_flipflop = !0 : delete localStorage.mape_tweak_flipflop
        });
        let _ = 1;
        const k = () => {
            if (clearTimeout(h), c() === "flipbook") {
                if (h = setTimeout(k, 1e3 / (m()[r()] ?? 12)), !j() || !j().value) {
                    f(0);
                    return
                }
                const M = j().value.length;
                if (M === 1) {
                    f(0);
                    return
                }
                if ($()) {
                    const Q = d() + _;
                    (Q < 0 || Q >= M) && (_ = -_);
                    const Z = d() + _;
                    f(Z)
                } else {
                    let Q = d() + 1;
                    Q >= M && (Q = 0), f(Q)
                }
            }
        };
        Vt(() => {
            clearTimeout(h)
        }), Le(() => {
            localStorage.mapeImageDisplayType = c(), f(0), _ = 1, c() === "flipbook" && (f(0), setTimeout(k))
        }), localStorage[Ut] && u(JSON.parse(localStorage[Ut]));

        function x(M) {
            const {
                key: Q,
                newValue: Z
            } = M;
            Q === Ut && Z && (u(JSON.parse(Z)), j() || l(Object.keys(a())[0] ?? ""), j() && j().value && j().value.length <= i() && s(0))
        }
        window.addEventListener("storage", x);
        const j = () => a()[r()],
            H = () => `scale(${U()}) translate(calc(-50% + ${n()[0]}px), calc(-50% + ${n()[1]}px))`;
        let z;
        const [R, V] = ne([100, 100]);
        Le(() => {
            c(), z && V([z.clientWidth, z.clientHeight])
        }), window.addEventListener("resize", () => {
            z && V([z.clientWidth, z.clientHeight])
        });
        const [v, C] = ne(1), [B, K] = ne([1, 1]);
        Le(() => {
            const M = J()[0];
            if (!M) return;
            const Q = et(M),
                Z = new Image;
            Z.addEventListener("load", () => {
                C(Z.height / Z.width), K([Z.width, Z.height])
            }), Z.src = Q
        });
        const E = () => {
                const M = Ms(R(), J().length, v()),
                    Q = M.targetHeight * M.targetRows,
                    Z = M.targetWidth * M.targetCols;
                return {
                    imageWidth: Math.min(B()[0], M.targetWidth),
                    imageHeight: Math.min(B()[1], M.targetHeight),
                    containerHeight: Q,
                    containerWidth: Z,
                    ratio: Math.min(1, Math.max(M.targetWidth, M.targetHeight) / Math.max(...B()))
                }
            },
            q = (M = !1) => {
                s(0), M && (o([0, 0]), t(1))
            },
            J = () => (j() ?? {}).value ?? [],
            W = M => Math.pow(M, 2.5),
            U = () => W(e());
        return (() => {
            var M = Rs();
            return L(M, (() => {
                var Q = le(() => !!j());
                return () => Q() ? [(() => {
                    var Z = Hs(),
                        de = Z.firstChild,
                        ke = de.nextSibling;
                    return L(Z, () => Object.values(a()).sort(Ei(a())).map(Ee => (() => {
                        var T = Go();
                        return T.$$click = () => {
                            q(), s(0), l(Ee.name)
                        }, L(T, () => Ee.name), F(() => T.classList.toggle("active", Ee.name === r())), T
                    })()), ke), L(Z, () => [{
                        id: "single",
                        text: "Single image"
                    }, {
                        id: "mosaic",
                        text: "Grid view"
                    }, {
                        id: "flipbook",
                        text: "Flipbook"
                    }].map(Ee => (() => {
                        var T = Go();
                        return T.$$click = () => {
                            q(), p(Ee.id)
                        }, L(T, () => Ee.text), F(() => T.classList.toggle("active", c() === Ee.id)), T
                    })()), null), Z
                })(), (() => {
                    var Z = Fs(),
                        de = Z.firstChild,
                        ke = de.firstChild,
                        Ee = ke.firstChild;
                    return L(Z, (() => {
                        var T = le(() => c() === "single" && J().length > 1);
                        return () => T() ? (() => {
                            var oe = Bs();
                            return L(oe, () => J().map((g, y) => (() => {
                                var A = Us(),
                                    O = A.firstChild;
                                return A.$$click = () => {
                                    s(y)
                                }, F(I => {
                                    var N = y === i(),
                                        P = et(g);
                                    return N !== I.e && A.classList.toggle("active", I.e = N), P !== I.t && he(O, "src", I.t = P), I
                                }, {
                                    e: void 0,
                                    t: void 0
                                }), A
                            })())), oe
                        })() : null
                    })(), de), de.addEventListener("wheel", T => {
                        const oe = z.getClientRects()[0],
                            [g, y] = [T.clientX, T.clientY],
                            {
                                x: A,
                                y: O,
                                width: I,
                                height: N
                            } = oe,
                            P = (g - A) / I,
                            G = (y - O) / N;
                        t(Math.max(.1, e() - (T.deltaY > 0 ? .075 : -.075))), (() => {
                            o([0, 0]);
                            const ee = z.getClientRects()[0],
                                {
                                    x: ce,
                                    y: X,
                                    width: re,
                                    height: ie
                                } = ee,
                                xe = (g - ce) / re,
                                Ce = (y - X) / ie,
                                D = xe - P,
                                fe = Ce - G,
                                pe = D * re / U(),
                                Se = fe * ie / U();
                            o([n()[0] + pe, n()[1] + Se])
                        })()
                    }), de.$$mousedown = T => {
                        const oe = T.clientX,
                            g = T.clientY,
                            [y, A] = n(),
                            O = N => {
                                N.preventDefault();
                                const P = N.clientX,
                                    G = N.clientY,
                                    ee = oe - P,
                                    ce = g - G;
                                o([y - ee / U(), A - ce / U()])
                            },
                            I = () => {
                                document.removeEventListener("mousemove", O), document.removeEventListener("mouseup", I)
                            };
                        document.addEventListener("mousemove", O), document.addEventListener("mouseup", I)
                    }, de.$$dblclick = () => {
                        q(!0)
                    }, L(de, Ae(xi, {
                        get children() {
                            return [Ae(dt, {
                                get when() {
                                    return c() === "single"
                                },
                                get children() {
                                    var T = Uo(),
                                        oe = z;
                                    return typeof oe == "function" ? Ct(oe, T) : z = T, F(g => {
                                        var y = H(),
                                            A = et((j().value ?? [])[i()]);
                                        return y !== g.e && ((g.e = y) != null ? T.style.setProperty("transform", y) : T.style.removeProperty("transform")), A !== g.t && he(T, "src", g.t = A), g
                                    }, {
                                        e: void 0,
                                        t: void 0
                                    }), T
                                }
                            }), Ae(dt, {
                                get when() {
                                    return c() === "mosaic"
                                },
                                get children() {
                                    var T = zs(),
                                        oe = T.firstChild;
                                    T.$$dblclick = () => {
                                        q(!0)
                                    };
                                    var g = z;
                                    return typeof g == "function" ? Ct(g, T) : z = T, L(oe, () => J().map((y, A) => (() => {
                                        var O = Gs(),
                                            I = O.firstChild;
                                        return O.$$click = () => {
                                            s(A)
                                        }, F(N => {
                                            var P = `${E().imageWidth}px`,
                                                G = `${E().imageHeight}px`,
                                                ee = et(y);
                                            return P !== N.e && ((N.e = P) != null ? O.style.setProperty("width", P) : O.style.removeProperty("width")), G !== N.t && ((N.t = G) != null ? O.style.setProperty("height", G) : O.style.removeProperty("height")), ee !== N.a && he(I, "src", N.a = ee), N
                                        }, {
                                            e: void 0,
                                            t: void 0,
                                            a: void 0
                                        }), O
                                    })())), F(y => {
                                        var A = H(),
                                            O = `${E().containerWidth}px`,
                                            I = `${E().containerHeight}px`;
                                        return A !== y.e && ((y.e = A) != null ? T.style.setProperty("transform", A) : T.style.removeProperty("transform")), O !== y.t && ((y.t = O) != null ? oe.style.setProperty("width", O) : oe.style.removeProperty("width")), I !== y.a && ((y.a = I) != null ? oe.style.setProperty("height", I) : oe.style.removeProperty("height")), y
                                    }, {
                                        e: void 0,
                                        t: void 0,
                                        a: void 0
                                    }), T
                                }
                            }), Ae(dt, {
                                get when() {
                                    return c() === "flipbook"
                                },
                                get children() {
                                    return [(() => {
                                        var T = Ds(),
                                            oe = T.firstChild,
                                            g = oe.nextSibling,
                                            y = g.nextSibling,
                                            A = y.nextSibling;
                                        return g.$$input = O => {
                                            w({
                                                ...m(),
                                                [r()]: Math.max(1, parseInt(O.currentTarget.value, 10))
                                            })
                                        }, A.addEventListener("change", () => {
                                            b(!$())
                                        }), F(() => g.value = m()[r()] ?? 12), F(() => A.checked = $()), T
                                    })(), (() => {
                                        var T = Uo(),
                                            oe = z;
                                        return typeof oe == "function" ? Ct(oe, T) : z = T, F(g => {
                                            var y = H(),
                                                A = et((j().value ?? [])[d()]);
                                            return y !== g.e && ((g.e = y) != null ? T.style.setProperty("transform", y) : T.style.removeProperty("transform")), A !== g.t && he(T, "src", g.t = A), g
                                        }, {
                                            e: void 0,
                                            t: void 0
                                        }), T
                                    })()]
                                }
                            })]
                        }
                    }), ke), ke.$$click = () => {
                        q(!0)
                    }, L(ke, (() => {
                        var T = le(() => c() === "mosaic");
                        return () => T() ? parseFloat((E().ratio * U()).toFixed(2)) : parseFloat(U().toFixed(2))
                    })(), Ee), Z
                })()] : null
            })(), null), L(M, (() => {
                var Q = le(() => !j());
                return () => Q() ? (() => {
                    var Z = Ks(),
                        de = Z.firstChild,
                        ke = de.nextSibling;
                    return ke.muted = !0, ke.autoplay = !0, ke.loop = !0, Z
                })() : null
            })(), null), F(() => {
                var Q, Z;
                return M.classList.toggle("hasMultiple", ((Z = (Q = j()) == null ? void 0 : Q.value) == null ? void 0 : Z.length) > 0)
            }), M
        })()
    };
yt(["dblclick", "mousedown", "input", "click"]);
const Vs = Object.freeze(Object.defineProperty({
        __proto__: null,
        ImagePreviews: Ws,
        localStoragePreviewImagesKey: Ut
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    fo = Symbol("store-raw"),
    Ot = Symbol("store-node"),
    Ke = Symbol("store-has"),
    Ci = Symbol("store-self");

function Oi(e) {
    let t = e[ht];
    if (!t && (Object.defineProperty(e, ht, {
            value: t = new Proxy(e, Xs)
        }), !Array.isArray(e))) {
        const n = Object.keys(e),
            o = Object.getOwnPropertyDescriptors(e);
        for (let i = 0, s = n.length; i < s; i++) {
            const r = n[i];
            o[r].get && Object.defineProperty(e, r, {
                enumerable: o[r].enumerable,
                get: o[r].get.bind(t)
            })
        }
    }
    return t
}

function it(e) {
    let t;
    return e != null && typeof e == "object" && (e[ht] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
}

function jt(e, t = new Set) {
    let n, o, i, s;
    if (n = e != null && e[fo]) return n;
    if (!it(e) || t.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
        for (let r = 0, l = e.length; r < l; r++) i = e[r], (o = jt(i, t)) !== i && (e[r] = o)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
        const r = Object.keys(e),
            l = Object.getOwnPropertyDescriptors(e);
        for (let a = 0, u = r.length; a < u; a++) s = r[a], !l[s].get && (i = e[s], (o = jt(i, t)) !== i && (e[s] = o))
    }
    return e
}

function An(e, t) {
    let n = e[t];
    return n || Object.defineProperty(e, t, {
        value: n = Object.create(null)
    }), n
}

function Yt(e, t, n) {
    if (e[t]) return e[t];
    const [o, i] = ne(n, {
        equals: !1,
        internal: !0
    });
    return o.$ = i, e[t] = o
}

function Ys(e, t) {
    const n = Reflect.getOwnPropertyDescriptor(e, t);
    return !n || n.get || !n.configurable || t === ht || t === Ot || (delete n.value, delete n.writable, n.get = () => e[ht][t]), n
}

function Pi(e) {
    ao() && Yt(An(e, Ot), Ci)()
}

function Js(e) {
    return Pi(e), Reflect.ownKeys(e)
}
const Xs = {
    get(e, t, n) {
        if (t === fo) return e;
        if (t === ht) return n;
        if (t === lo) return Pi(e), n;
        const o = An(e, Ot),
            i = o[t];
        let s = i ? i() : e[t];
        if (t === Ot || t === Ke || t === "__proto__") return s;
        if (!i) {
            const r = Object.getOwnPropertyDescriptor(e, t);
            ao() && (typeof s != "function" || e.hasOwnProperty(t)) && !(r && r.get) && (s = Yt(o, t, s)())
        }
        return it(s) ? Oi(s) : s
    },
    has(e, t) {
        return t === fo || t === ht || t === lo || t === Ot || t === Ke || t === "__proto__" ? !0 : (ao() && Yt(An(e, Ke), t)(), t in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: Js,
    getOwnPropertyDescriptor: Ys
};

function Fe(e, t, n, o = !1) {
    if (!o && e[t] === n) return;
    const i = e[t],
        s = e.length;
    n === void 0 ? (delete e[t], e[Ke] && e[Ke][t] && i !== void 0 && e[Ke][t].$()) : (e[t] = n, e[Ke] && e[Ke][t] && i === void 0 && e[Ke][t].$());
    let r = An(e, Ot),
        l;
    if ((l = Yt(r, t, i)) && l.$(() => n), Array.isArray(e) && e.length !== s) {
        for (let a = e.length; a < s; a++)(l = r[a]) && l.$();
        (l = Yt(r, "length", s)) && l.$(e.length)
    }(l = r[Ci]) && l.$()
}

function ji(e, t) {
    const n = Object.keys(t);
    for (let o = 0; o < n.length; o += 1) {
        const i = n[o];
        Fe(e, i, t[i])
    }
}

function qs(e, t) {
    if (typeof t == "function" && (t = t(e)), t = jt(t), Array.isArray(t)) {
        if (e === t) return;
        let n = 0,
            o = t.length;
        for (; n < o; n++) {
            const i = t[n];
            e[n] !== i && Fe(e, n, i)
        }
        Fe(e, "length", o)
    } else ji(e, t)
}

function Ft(e, t, n = []) {
    let o, i = e;
    if (t.length > 1) {
        o = t.shift();
        const r = typeof o,
            l = Array.isArray(e);
        if (Array.isArray(o)) {
            for (let a = 0; a < o.length; a++) Ft(e, [o[a]].concat(t), n);
            return
        } else if (l && r === "function") {
            for (let a = 0; a < e.length; a++) o(e[a], a) && Ft(e, [a].concat(t), n);
            return
        } else if (l && r === "object") {
            const {
                from: a = 0,
                to: u = e.length - 1,
                by: c = 1
            } = o;
            for (let p = a; p <= u; p += c) Ft(e, [p].concat(t), n);
            return
        } else if (t.length > 1) {
            Ft(e[o], t, [o].concat(n));
            return
        }
        i = e[o], n = [o].concat(n)
    }
    let s = t[0];
    typeof s == "function" && (s = s(i, n), s === i) || o === void 0 && s == null || (s = jt(s), o === void 0 || it(i) && it(s) && !Array.isArray(s) ? ji(i, s) : Fe(e, o, s))
}

function xt(...[e, t]) {
    const n = jt(e || {}),
        o = Array.isArray(n),
        i = Oi(n);

    function s(...r) {
        ms(() => {
            o && r.length === 1 ? qs(n, r[0]) : Ft(n, r)
        })
    }
    return [i, s]
}
const po = Symbol("store-root");

function wt(e, t, n, o, i) {
    const s = t[n];
    if (e === s) return;
    const r = Array.isArray(e);
    if (n !== po && (!it(e) || !it(s) || r !== Array.isArray(s) || i && e[i] !== s[i])) {
        Fe(t, n, e);
        return
    }
    if (r) {
        if (e.length && s.length && (!o || i && e[0] && e[0][i] != null)) {
            let u, c, p, h, d, f, m, w;
            for (p = 0, h = Math.min(s.length, e.length); p < h && (s[p] === e[p] || i && s[p] && e[p] && s[p][i] === e[p][i]); p++) wt(e[p], s, p, o, i);
            const $ = new Array(e.length),
                b = new Map;
            for (h = s.length - 1, d = e.length - 1; h >= p && d >= p && (s[h] === e[d] || i && s[p] && e[p] && s[h][i] === e[d][i]); h--, d--) $[d] = s[h];
            if (p > d || p > h) {
                for (c = p; c <= d; c++) Fe(s, c, e[c]);
                for (; c < e.length; c++) Fe(s, c, $[c]), wt(e[c], s, c, o, i);
                s.length > e.length && Fe(s, "length", e.length);
                return
            }
            for (m = new Array(d + 1), c = d; c >= p; c--) f = e[c], w = i && f ? f[i] : f, u = b.get(w), m[c] = u === void 0 ? -1 : u, b.set(w, c);
            for (u = p; u <= h; u++) f = s[u], w = i && f ? f[i] : f, c = b.get(w), c !== void 0 && c !== -1 && ($[c] = s[u], c = m[c], b.set(w, c));
            for (c = p; c < e.length; c++) c in $ ? (Fe(s, c, $[c]), wt(e[c], s, c, o, i)) : Fe(s, c, e[c])
        } else
            for (let u = 0, c = e.length; u < c; u++) wt(e[u], s, u, o, i);
        s.length > e.length && Fe(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let u = 0, c = l.length; u < c; u++) wt(e[l[u]], s, l[u], o, i);
    const a = Object.keys(s);
    for (let u = 0, c = a.length; u < c; u++) e[a[u]] === void 0 && Fe(s, a[u], void 0)
}

function ho(e, t = {}) {
    const {
        merge: n,
        key: o = "id"
    } = t, i = jt(e);
    return s => {
        if (!it(s) || !it(i)) return i;
        const r = wt(i, {
            [po]: s
        }, po, n, o);
        return r === void 0 ? s : r
    }
}
var St = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    mo = {},
    Ii = {};
Object.defineProperty(Ii, "__esModule", {
    value: !0
});
var Je = {},
    Zs = St && St.__extends || function () {
        var e = function (t, n) {
            return e = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function (o, i) {
                o.__proto__ = i
            } || function (o, i) {
                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (o[s] = i[s])
            }, e(t, n)
        };
        return function (t, n) {
            if (typeof n != "function" && n !== null) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);

            function o() {
                this.constructor = t
            }
            t.prototype = n === null ? Object.create(n) : (o.prototype = n.prototype, new o)
        }
    }();
Object.defineProperty(Je, "__esModule", {
    value: !0
});
Je.TokenReader = Je.TokenError = Je.tokenizePrompt = void 0;

function Qs(e) {
    var t = [],
        n = "",
        o = 0,
        i = 0,
        s = !1;

    function r() {
        n !== "" && (t.push([n, o]), n = ""), o = i
    }

    function l(h) {
        n += h, i++
    }

    function a() {
        i++
    }
    for (var u = 0, c = e.replace(/，/g, ",").replace(/：/g, ":").replace(/（/g, "(").replace(/）/g, ")"); u < c.length; u++) {
        var p = c[u];
        if (s) s = !1, l(p);
        else switch (p) {
            case "\\": {
                s = !0, l(p);
                break
            }
            case "(":
            case ")":
            case "[":
            case "]":
            case "<":
            case ">":
            case ":":
            case ",":
            case "|": {
                r(), l(p), r();
                break
            }
            case " ": {
                a(), r();
                break
            }
            default:
                l(p)
        }
    }
    return r(), t
}
Je.tokenizePrompt = Qs;
var go = function (e) {
    Zs(t, e);

    function t(n, o, i) {
        var s = e.call(this, n) || this;
        return s.token = o, s.position = i, s
    }
    return t
}(Error);
Je.TokenError = go;
var er = function () {
    function e(t) {
        this.tokens = t, this.index = 0
    }
    return e.prototype.position = function () {
        if (this.index < this.tokens.length) return this.tokens[this.index][1]
    }, e.prototype.look = function () {
        if (this.index < this.tokens.length) return this.tokens[this.index][0]
    }, e.prototype.lookMany = function (t) {
        return this.tokens.slice(this.index, this.index + t).map(function (n) {
            var o = n[0];
            return o
        })
    }, e.prototype.next = function () {
        this.index < this.tokens.length && this.index++
    }, e.prototype.error = function (t) {
        var n = this.look();
        if (n === void 0) throw new go("Error happened at the end of the input: ".concat(t));
        var o = this.position();
        throw new go("Error happened at (".concat(n, ",").concat(o, "):").concat(t), n, o)
    }, e
}();
Je.TokenReader = er;
var Mn = {};
Object.defineProperty(Mn, "__esModule", {
    value: !0
});
Mn.parsePrompt = void 0;
var Kn = Je;

function Ni(e) {
    return e.replace(/\\(.)/g, "$1")
}

function tr(e) {
    var t = [];
    e: for (;;) {
        var n = e.look();
        switch (n) {
            case "(":
            case ")":
            case "[":
            case "]":
            case "<":
            case ">":
            case ":":
            case ",":
            case "|":
            case void 0:
                break e;
            default:
                t.push(n), e.next()
        }
    }
    if (t.length === 0) e.error("Tag expected");
    else return {
        kind: "tag",
        name: t.map(Ni).join(" "),
        tokens: t
    }
}

function nr(e) {
    e.next();
    for (var t = En(e, !1);;) {
        var n = e.lookMany(2),
            o = n[0],
            i = n[1];
        if (o !== ":" || !Number.isNaN(Number.parseFloat(i))) break;
        e.next(), t.push.apply(t, En(e, !1))
    }
    if (e.look() === ":") {
        e.next();
        var s = Mi(e),
            r = s[0],
            l = s[1];
        return e.look() === "," && e.next(), (e.look() === ")" || e.look() === "}" || e.look() === void 0) && e.next(), {
            kind: "ew",
            weight: r,
            weightText: l,
            contents: t
        }
    }
    return (e.look() === ")" || e.look() === "}" || e.look() === void 0) && e.next(), {
        kind: "pw",
        contents: t
    }
}

function or(e) {
    e.next();
    var t = En(e, !1);
    return (e.look() === "]" || e.look() === "}" || e.look() === void 0) && e.next(), {
        kind: "nw",
        contents: t
    }
}

function Ti(e, t) {
    var n = e.look();
    switch (n) {
        case "(":
        case ")":
        case "[":
        case "]":
        case "<":
        case ">":
        case ":":
        case ",":
        case void 0:
            e.error("".concat(t, " expected"));
        default:
            return Ni(n)
    }
}

function ir(e) {
    var t = Ti(e, "Filename");
    return e.next(), t
}

function Li(e, t) {
    function n(c) {
        var p = Number.parseInt(c);
        return !Number.isNaN(p) && "".concat(p) === c
    } {
        var o = e.lookMany(3),
            i = o[0],
            s = o[1],
            r = o[2];
        if (n(i) && s === "," && n(r)) return e.next(), e.next(), e.next(), [Number.parseFloat("".concat(i, ".").concat(r)), "".concat(i).concat(s).concat(r)]
    } {
        var l = e.lookMany(2),
            i = l[0],
            s = l[1];
        if (i.endsWith(".") && n(i.substring(0, i.length - 1)) && n(s)) return e.next(), e.next(), [Number.parseFloat("".concat(i).concat(s)), "".concat(i, " ").concat(s)]
    }
    var a = Ti(e, t),
        u = Number.parseFloat(a);
    return Number.isNaN(u) && e.error("Incorrect ".concat(t.toLowerCase(), " format: ").concat(a)), e.next(), [u, a]
}

function Mi(e) {
    return Li(e, "Weight")
}

function sr(e) {
    return Li(e, "Multiplier")
}

function rr(e, t) {
    e.next(), e.next(), e.look() !== ":" && e.error('":" expected'), e.next();
    var n = ir(e);
    if (e.look() === ":") {
        e.next();
        var o = sr(e),
            i = o[0],
            s = o[1];
        if (e.look() === ">") return e.next(), {
            kind: t,
            filename: n,
            multiplier: i,
            multiplierText: s
        }
    }
    if (e.look() === ">") return e.next(), {
        kind: t,
        filename: n
    };
    e.next(), e.error('">" expected')
}

function lr(e, t) {
    switch (e.look()) {
        case "(":
            return nr(e);
        case "[":
            return or(e);
        case "<": {
            var n = e.lookMany(2)[1];
            switch (n) {
                case "lora":
                case "hypernet":
                    return rr(e, n);
                default: {
                    e.next();
                    return
                }
            }
            break
        }
        case ",":
            e.error("Prompt expected");
        default: {
            var o = tr(e);
            if (t && e.look() === ":" && !Number.isNaN(Number.parseFloat(e.lookMany(2)[1]))) {
                e.next();
                var i = Mi(e),
                    s = i[0],
                    r = i[1];
                return {
                    kind: "ew",
                    weight: s,
                    weightText: r,
                    contents: [o]
                }
            } else return o
        }
    }
}

function En(e, t) {
    for (var n = [];;) {
        var o = e.look();
        switch (o) {
            case ",": {
                e.next();
                break
            }
            case ":":
            case ")":
            case "]":
            case ">":
            case "|":
            case void 0:
                return n;
            default: {
                var i = lr(e, t);
                i !== void 0 && n.push(i)
            }
        }
    }
}

function ar(e) {
    var t, n = typeof e == "string" ? new Kn.TokenReader((0, Kn.tokenizePrompt)(e)) : e instanceof Array ? new Kn.TokenReader(e) : e,
        o = [],
        i = !1;
    e: for (;;) {
        i = !1;
        t: for (;;) switch (n.look()) {
            case "|": {
                i = !0, n.next();
                break
            }
            case ")":
            case "]":
            case ">":
            case ":": {
                n.next();
                continue e
            }
            case void 0:
                return o;
            default:
                break t
        }
        var s = En(n, !0);
        i || o.length === 0 ? o.push({
            kind: "prompt",
            contents: s
        }) : (t = o[o.length - 1].contents).push.apply(t, s)
    }
}
Mn.parsePrompt = ar;
var Rn = {};
Object.defineProperty(Rn, "__esModule", {
    value: !0
});
Rn.printPrompt = void 0;

function pn(e) {
    for (var t = "", n = !1, o = 0, i = e; o < i.length; o++) {
        var s = i[o];
        switch (s.kind === "tag" && n ? t += ", " : t !== "" && (t += " "), s.kind) {
            case "pw": {
                t += "(".concat(pn(s.contents), ")");
                break
            }
            case "nw": {
                t += "[".concat(pn(s.contents), "]");
                break
            }
            case "ew": {
                t += "(".concat(pn(s.contents), ":").concat(s.weightText ? s.weightText : s.weight, ")");
                break
            }
            case "lora":
            case "hypernet": {
                t += "<".concat(s.kind, ":").concat(s.filename, ":").concat(s.multiplierText ? s.multiplierText : s.multiplier, ">");
                break
            }
            default:
                t += s.name
        }
        n = s.kind === "tag"
    }
    return t
}

function cr(e) {
    return pn(e.contents)
}
Rn.printPrompt = cr;
var Hn = {};
Object.defineProperty(Hn, "__esModule", {
    value: !0
});
Hn.evaluatePrompt = void 0;

function hn(e, t, n, o) {
    for (var i, s, r = 0, l = e; r < l.length; r++) {
        var a = l[r];
        switch (a.kind) {
            case "pw": {
                hn(a.contents, t * n, n, o);
                break
            }
            case "nw": {
                hn(a.contents, t / n, n, o);
                break
            }
            case "ew": {
                hn(a.contents, t * a.weight, n, o);
                break
            }
            case "lora": {
                o.loras.push({
                    filename: a.filename,
                    multiplier: (i = a.multiplier) !== null && i !== void 0 ? i : 1
                });
                break
            }
            case "hypernet": {
                o.hypernets.push({
                    filename: a.filename,
                    multiplier: (s = a.multiplier) !== null && s !== void 0 ? s : 1
                });
                break
            }
            default:
                o.tags.push({
                    tag: a.name,
                    weight: t
                })
        }
    }
}

function ur(e, t) {
    t === void 0 && (t = 1.1);
    var n = {
        tags: [],
        loras: [],
        hypernets: []
    };
    return hn(e.contents, 1, t, n), n
}
Hn.evaluatePrompt = ur;
(function (e) {
    var t = St && St.__createBinding || (Object.create ? function (o, i, s, r) {
            r === void 0 && (r = s);
            var l = Object.getOwnPropertyDescriptor(i, s);
            (!l || ("get" in l ? !i.__esModule : l.writable || l.configurable)) && (l = {
                enumerable: !0,
                get: function () {
                    return i[s]
                }
            }), Object.defineProperty(o, r, l)
        } : function (o, i, s, r) {
            r === void 0 && (r = s), o[r] = i[s]
        }),
        n = St && St.__exportStar || function (o, i) {
            for (var s in o) s !== "default" && !Object.prototype.hasOwnProperty.call(i, s) && t(i, o, s)
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), n(Ii, e), n(Je, e), n(Mn, e), n(Rn, e), n(Hn, e)
})(mo);
const nt = e => JSON.parse(JSON.stringify(e));
var dr = S('<div class=prompt><div class=arrows><div class="arrow down"title="Move down">▼</div></div><label><input></label><div class=weight title="Click scroll wheel button to reset to 1"></div><button class=less title="Use Scroll Wheel to quickly change value">- 0.05</button><input type=range step=0.05><button class=more title="Use Scroll Wheel to quickly change value">+ 0.05</button><button class=remove title="Remove token">X</button><input type=checkbox>'),
    fr = S('<div class="arrow up"title="Move up">▲'),
    pr = S('<div class=promptTweaker><div class=buttons><button title="Use Scroll Wheel to quickly change all values">- 0.05 All</button><button title="Move all values 5% towards 1">Compress 5%</button><button title="Converts weights so they all add up to 1">Normalize</button><button title="Use Scroll Wheel to quickly change all values">+ 0.05 All</button></div><div class=promptTweakerPrompts>');
const mn = "🔒",
    gn = "🔏",
    hr = e => {
        const t = n => {
            var o, i;
            return n.kind === "pw" && (n = {
                kind: "ew",
                weight: 1.1,
                weightText: "1.1",
                contents: (o = n.contents) == null ? void 0 : o.map(t)
            }), n.kind === "nw" && (n = {
                kind: "ew",
                weight: .9,
                weightText: "0.9",
                contents: (i = n.contents) == null ? void 0 : i.map(t)
            }), n
        };
        return e.map(n => (n.contents = n.contents.flatMap(o => {
            const i = t(o);
            return Ri(i)
        }), n))
    };

function Ri(e, t = 1) {
    if (e.contents && e.contents.length > 0) return e.contents.flatMap(n => Ri(n, t * (e.weight ?? 1))); {
        const n = vo(t);
        return {
            kind: "ew",
            weight: n,
            weightText: n.toString(),
            contents: [e]
        }
    }
}

function mr(e, t, n) {
    return e + n * (t - e)
}

function De(e, t) {
    if (e) {
        if (typeof e[t] < "u") return e[t];
        if (e.contents)
            for (const n of e.contents) {
                const o = De(n, t);
                if (o !== void 0) return o
            }
    }
}
const vo = e => parseFloat(e.toFixed(2)),
    gr = e => {
        const [t, n] = xt([]), o = () => {
            e.update([{
                contents: t
            }].map(mo.printPrompt).join(", "))
        };
        Le(() => {
            const h = mo.parsePrompt(e.prompt),
                d = hr(h);
            n(d[0] ? ho(d[0].contents) : [])
        });
        const i = le(() => Math.min(...t.map(h => h.weight ?? 1))),
            s = le(() => Math.max(...t.map(h => h.weight ?? 1))),
            r = (h, d) => {
                const f = t.findIndex(k => De(k, "name") === h),
                    m = f + d;
                if (m < 0) return;
                const w = t.length;
                if (m === w) return;
                const $ = nt(t),
                    b = $[f],
                    _ = $[m];
                $[m] = b, $[f] = _, n(ho($)), o()
            },
            l = h => {
                for (const [d, f] of t.entries()) n(d, "weight", vo(h(f.weight ?? -666))), n(d, "weightText", (f.weight ?? -666).toString());
                o()
            },
            a = (h, d, f = "weight") => {
                var w;
                const m = t.findIndex($ => De($, "name") === h);
                f === "weight" ? (n(m, f, vo(d(t[m][f]))), n(m, "weightText", (w = t[m].weight) == null ? void 0 : w.toString())) : f === "name" ? n(m, "contents", 0, f, d(t[m][f])) : alert(`Implement ${f}`), o()
            },
            u = h => {
                const d = h.deltaY < 0 ? .05 : -.05;
                l(f => f + d)
            },
            c = () => {
                const h = t.reduce((d, f) => d + (f.weight ?? 0), 0);
                l(d => parseFloat((d / h).toFixed(3)))
            },
            p = (h, d) => {
                const f = () => De(h, "name") ?? "",
                    m = () => f().includes(mn) && f().includes(gn);
                return (() => {
                    var w = dr(),
                        $ = w.firstChild,
                        b = $.firstChild,
                        _ = $.nextSibling,
                        k = _.firstChild,
                        x = _.nextSibling,
                        j = x.nextSibling,
                        H = j.nextSibling,
                        z = H.nextSibling,
                        R = z.nextSibling,
                        V = R.nextSibling;
                    return w.addEventListener("wheel", v => {
                        const C = v.deltaY < 0 ? .05 : -.05;
                        a(f(), B => B + C)
                    }), L($, (() => {
                        var v = fr();
                        return v.$$click = () => {
                            r(f(), -1)
                        }, v
                    })(), b), b.$$click = () => {
                        r(f(), 1)
                    }, k.addEventListener("change", v => {
                        const C = v.currentTarget.value;
                        a(f(), () => C, "name")
                    }), x.$$mousedown = v => {
                        v.which === 2 && (a(f(), () => 1), o())
                    }, x.$$dblclick = () => {
                        document.querySelector(".comfy-queue-btn").click()
                    }, L(x, () => (De(h, "weight") ?? 1).toFixed(2)), j.$$click = () => {
                        a(f(), v => v - .05)
                    }, H.addEventListener("change", v => {
                        a(f(), () => parseFloat(v.currentTarget.value))
                    }), H.$$input = v => {
                        const C = t[d()].weight;
                        !C || C < 0 || C > 2 || a(f(), () => parseFloat(v.currentTarget.value))
                    }, z.$$click = () => {
                        a(f(), v => v + .05)
                    }, R.$$click = () => {
                        n(t.filter(v => De(v, "name") !== De(h, "name"))), o()
                    }, V.addEventListener("change", () => {
                        m() ? a(f(), () => {
                            var v;
                            return (v = De(h, "name")) == null ? void 0 : v.replace(mn, "").replace(gn, "")
                        }, "name") : a(f(), () => mn + (De(h, "name") ?? "") + gn, "name"), o()
                    }), F(v => {
                        var C = !!m(),
                            B = De(h, "name"),
                            K = Math.min(i(), 0),
                            E = Math.max(s(), 2),
                            q = m() ? "Temporarily disabled token" : "Click to temporarily disable token";
                        return C !== v.e && w.classList.toggle("tmp", v.e = C), B !== v.t && he(k, "title", v.t = B), K !== v.a && he(H, "min", v.a = K), E !== v.o && he(H, "max", v.o = E), q !== v.i && he(V, "title", v.i = q), v
                    }, {
                        e: void 0,
                        t: void 0,
                        a: void 0,
                        o: void 0,
                        i: void 0
                    }), F(() => k.value = De(h, "name")), F(() => H.value = De(h, "weight")), F(() => V.checked = !m()), w
                })()
            };
        return (() => {
            var h = pr(),
                d = h.firstChild,
                f = d.firstChild,
                m = f.nextSibling,
                w = m.nextSibling,
                $ = w.nextSibling,
                b = d.nextSibling;
            return d.addEventListener("wheel", u), f.$$click = () => {
                l(_ => _ - .05)
            }, m.$$click = () => {
                l(_ => mr(_, 1, .05))
            }, w.$$click = c, $.$$click = () => {
                l(_ => _ + .05)
            }, L(b, Ae(ki, {
                each: t,
                children: p
            })), h
        })()
    };
yt(["click", "dblclick", "mousedown", "input"]);
var vr = S("<div class=settingsPopup><div class=close>❌</div><div class=header>Settings</div><div class=modalContent><div class=mapeSettings>"),
    yr = S("<input type=text>"),
    _r = S("<input type=color>"),
    $r = S("<input type=number>"),
    wr = S("<input type=checkbox>"),
    br = S('<div class=mapeSetting><label class=name></label><div class=reset title="Reset to default value">♻️</div><label class=value>');
const Hi = {
        nodeAlignOffsetY: {
            name: "Offset Y pixel amount",
            value: {
                type: "number",
                value: 50
            }
        },
        nodeOrganizeSpacingInputY: {
            name: "Node organize input Y spacing",
            value: {
                type: "number",
                value: 15
            }
        },
        nodeOrganizeSpacingOutputY: {
            name: "Node organize output Y spacing",
            value: {
                type: "number",
                value: 34
            }
        },
        nodeOrganizeSpacingInputX: {
            name: "Node organize input X spacing",
            value: {
                type: "number",
                value: 200
            }
        },
        nodeOrganizeSpacingOutputX: {
            name: "Node organize output X spacing",
            value: {
                type: "number",
                value: 60
            }
        },
        alwaysPromptVariableName: {
            name: "Prompt for variable name",
            value: {
                type: "bool",
                value: !1
            }
        },
        collapseNodesOnOrganize: {
            name: "Collapse GET/SET when organizing node",
            value: {
                type: "bool",
                value: !0
            }
        },
        resizeNodeWidthOnAlignment: {
            name: "Resize node on left alignment",
            value: {
                type: "bool",
                value: !0
            }
        },
        showAllConnectionsOnFocus: {
            name: "Show connections for all nodes when focusing variable",
            value: {
                type: "bool",
                value: !0
            }
        },
        organizeSideNodes: {
            name: "Organize variables when dragging/selecting parent node",
            value: {
                type: "bool",
                value: !0
            }
        },
        replaceSearch: {
            name: "Hijack Comfy node search to allow fuzzy search (Might break)",
            value: {
                type: "bool",
                value: !0
            }
        },
        showConnectionOnNodeHover: {
            name: "Show connections when hovering a node",
            value: {
                type: "bool",
                value: !1
            }
        },
        showAllConnectionsOnNodeHover: {
            name: "Show all connections when hovering a node",
            value: {
                type: "bool",
                value: !1
            }
        },
        animateSelectedNode: {
            name: "Animate connections of the selected node",
            value: {
                type: "bool",
                value: !1
            }
        },
        animateAllNodes: {
            name: "Animate connections of all nodes",
            value: {
                type: "bool",
                value: !1
            }
        },
        selectedNodeConnectionOpacity: {
            name: "Opacity % of selected node connections",
            value: {
                type: "number",
                value: 100
            }
        },
        nodeConnectionOpacity: {
            name: "Opacity % of node connections",
            value: {
                type: "number",
                value: 10
            }
        },
        dblClickToRename: {
            name: "Double click regular node to set title",
            value: {
                type: "bool",
                value: !0
            }
        },
        setIcon: {
            name: "Set title icon",
            value: {
                type: "string",
                value: "💾 "
            }
        },
        setBackgroundColor: {
            name: "Set title background color",
            value: {
                type: "color",
                value: "#212121"
            }
        },
        getIcon: {
            name: "Get title icon",
            value: {
                type: "string",
                value: ""
            }
        },
        getBackgroundColor: {
            name: "Get title background",
            value: {
                type: "color",
                value: "#212121"
            }
        },
        dblClickToRenameGroup: {
            name: "Double click groups to set title",
            value: {
                type: "bool",
                value: !0
            }
        },
        profileNodes: {
            name: "Show node runtime duration",
            value: {
                type: "bool",
                value: !0
            }
        },
        ignorePromptForExplodeHeal: {
            name: "Ignore prompt when splitting/healing links",
            value: {
                type: "bool",
                value: !1
            }
        }
    },
    [vn, bt] = xt(JSON.parse(JSON.stringify(Hi))),
    Ko = localStorage.mape_helpers_settings;
if (Ko) try {
    const e = JSON.parse(Ko);
    for (const [t, n] of Object.entries(e)) bt(t, "value", "value", n)
} catch {
    console.error("Failed to parse settings")
}
const te = e => vn[e].value.value,
    kr = e => {
        const t = () => {
            localStorage.mape_helpers_settings = JSON.stringify(Object.fromEntries(Object.entries(vn).map(([n, o]) => [n, o.value.value])))
        };
        return Le(() => {
            JSON.stringify(vn), t()
        }), (() => {
            var n = vr(),
                o = n.firstChild,
                i = o.nextSibling,
                s = i.nextSibling,
                r = s.firstChild;
            return Eo(o, "click", e.close, !0), L(r, () => Object.entries(vn).map(([l, {
                name: a,
                value: u
            }]) => (() => {
                var c = br(),
                    p = c.firstChild,
                    h = p.nextSibling,
                    d = h.nextSibling;
                return he(p, "for", l), L(p, a), h.$$click = () => {
                    bt(l, "value", "value", Hi[l].value.value)
                }, L(d, Ae(xi, {
                    get children() {
                        return [Ae(dt, {
                            get when() {
                                return u.type === "string"
                            },
                            get children() {
                                var f = yr();
                                return f.$$input = m => {
                                    bt(l, "value", "value", m.currentTarget.value)
                                }, he(f, "id", l), F(() => f.value = u.value), f
                            }
                        }), Ae(dt, {
                            get when() {
                                return u.type === "color"
                            },
                            get children() {
                                var f = _r();
                                return f.$$input = m => {
                                    bt(l, "value", "value", m.currentTarget.value)
                                }, he(f, "id", l), F(() => f.value = u.value), f
                            }
                        }), Ae(dt, {
                            get when() {
                                return u.type === "number"
                            },
                            get children() {
                                var f = $r();
                                return f.$$input = m => {
                                    bt(l, "value", "value", parseFloat(m.currentTarget.value))
                                }, he(f, "id", l), F(() => f.value = u.value), f
                            }
                        }), Ae(dt, {
                            get when() {
                                return u.type === "bool"
                            },
                            get children() {
                                var f = wr();
                                return f.addEventListener("change", m => {
                                    bt(l, "value", "value", m.currentTarget.checked)
                                }), he(f, "id", l), F(() => f.checked = u.value), f
                            }
                        })]
                    }
                })), c
            })())), n
        })()
    };
yt(["click", "input"]);
const Cn = e => e.toLowerCase().replace(/_./g, t => t.replace("_", "").toUpperCase()),
    _t = () => graph.links ?? [],
    Ne = (e, t = _t()) => t[e],
    Y = (e, t = 0) => {
        var n;
        if (e) {
            if (e.widgets && e.widgets[t]) return e.widgets[t].value;
            if (e.widgets_values) return (n = e.widgets_values) == null ? void 0 : n[t]
        }
    },
    Gt = e => {
        graph.add(e)
    },
    Te = (e, t, n = 0) => {
        e.widgets_values || (e.widgets_values = []), e.widgets_values[n] = t, e.widgets[n].value = t
    },
    At = e => {
        graph.remove(e)
    },
    zi = (e, t = 0) => {
        var r, l;
        if (e.type !== "Reroute") return [e, t];
        const n = e,
            o = (l = (r = n.inputs) == null ? void 0 : r[0]) == null ? void 0 : l.link;
        if (!o) return [n, t];
        const i = Ne(o);
        if (!i) return [n, t];
        const s = ae(i.origin_id);
        return s ? (setTimeout(() => {
            At(n)
        }), zi(s, i.origin_slot)) : [n, t]
    },
    Di = e => {
        var r, l;
        if (e.type !== "Reroute") return e;
        const t = e,
            n = (r = t.outputs[0]) == null ? void 0 : r.links;
        if (!n) return t;
        const o = n[0];
        if (!o) return t;
        const i = Ne(o);
        if (!i) return t;
        const s = ae(i.target_id);
        return s ? (((l = t.outputs[0].links) == null ? void 0 : l.length) === 1 && setTimeout(() => {
            At(t)
        }), Di(s)) : t
    },
    Fi = (e, t = !1) => {
        var m, w, $, b, _, k, x, j, H, z;
        const {
            type: n
        } = e;
        if (n === "*") return;
        let {
            origin_id: o,
            target_id: i,
            origin_slot: s,
            target_slot: r
        } = e, l = ae(o), a = ae(i);
        if (!l || !a) return !1;
        if (l.type === "Reroute") {
            let R = 0;
            [l, R] = zi(l), o = l == null ? void 0 : l.id, s = R, (typeof s > "u" || s === -1) && (s = 0)
        }
        if (a.type === "Reroute" && (a = Di(a), i = a == null ? void 0 : a.id, r = a == null ? void 0 : a.inputs.findIndex(R => R.type === n), (typeof r > "u" || r === -1) && (r = 0)), typeof o > "u" || typeof i > "u" || !l || !a || t && (se(l) || se(a))) return !1;
        let u = Cn(((m = a.getInputInfo(r)) == null ? void 0 : m.name) ?? n.toLowerCase());
        u || (u = Cn((($ = (w = l == null ? void 0 : l.outputs) == null ? void 0 : w[s]) == null ? void 0 : $.name) ?? ((_ = (b = l == null ? void 0 : l.outputs) == null ? void 0 : b[s]) == null ? void 0 : _.type.toString()) ?? `newVariable_from_${o}_to_${i}`));
        let c = !1,
            p = !1;
        if (se(l)) u = Y(l), p = !0;
        else {
            const R = (x = (k = l.outputs) == null ? void 0 : k[s]) == null ? void 0 : x.links;
            if (R)
                for (const V of R) {
                    const v = ae(((j = Ne(V)) == null ? void 0 : j.target_id) ?? -1);
                    v && se(v) && Ie(v) && (u = Y(v), p = !0)
                }
            if (!p) {
                for (const V of nn()) {
                    const v = Y(V);
                    if (!(u === v && Ie(V))) continue;
                    const B = (H = V.inputs[0]) == null ? void 0 : H.link;
                    ((z = Ne(B)) == null ? void 0 : z.origin_id) === l.id ? p = !0 : c = !0
                }
                c && (u += `_from_${o}_to_${i}`)
            }
        }
        let h;
        if (!p) {
            h = LiteGraph.createNode("mape Variable");
            const R = l.getConnectionPos(!1, s);
            h.pos = [R[0] + 20, R[1]], h.inputs[0].name = n, h.inputs[0].type = n, h.inputs[0].widget = a.inputs[r].widget, Te(h, u), Gt(h), h.flags.collapsed = !0;
            let V = [];
            l.widgets ? V = Object.values(l.widgets).map(v => v.value) : l.widgets_values && (V = nt(l.widgets_values)), l.connect(s, h, 0), l.widgets_values = V, l.type === "PrimitiveNode" && setTimeout(() => {
                if (l) {
                    l.connect(s, h, 0);
                    for (const [v, C] of V.entries()) Te(l, C, v);
                    h == null || h.setSize(h.computeSize())
                }
            })
        }
        const d = LiteGraph.createNode("mape Variable"),
            f = a.getConnectionPos(!0, r);
        d.pos = [f[0] - 150, f[1]], d.outputs[0].name = n, d.outputs[0].type = n, d.outputs[0].widget = a.inputs[r].widget, Gt(d), Te(d, u), d.flags.collapsed = !0, d == null || d.setSize(d.computeSize()), d.connect(0, a, r), !(t || !c || te("alwaysPromptVariableName")) && setTimeout(() => {
            window.setPrompt("Variable name", graph.list_of_graphcanvas[0].last_mouse_position, R => {
                Te(d, R), h && Te(h, R)
            }, u)
        }, 100)
    },
    Jt = (e = "valueUpdated") => {
        window.dispatchEvent(new CustomEvent("mapeTweak", {
            detail: {
                message: e
            }
        }))
    },
    ut = ((e = "valueUpdated") => {
        let t, n = 0;
        const o = 250;
        return () => {
            Date.now() - n > o && (n = Date.now(), Jt(e)), clearTimeout(t), t = setTimeout(() => {
                n = Date.now(), Jt(e)
            }, o)
        }
    })();

function xr(e, t) {
    t && (e.save(), e.fillStyle = "#000", e.fillText(t, 6, -LiteGraph.NODE_TITLE_HEIGHT - 2 + 1), e.fillStyle = "#fff", e.fillText(t, 5, -LiteGraph.NODE_TITLE_HEIGHT - 2), e.restore())
}
const Wo = e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    Vo = "eexxaacctt",
    Yo = (e, t) => t == 0 ? "" : t == 1 ? `${e}??` : t == 1 / 0 ? `${e}*?` : `${e}{0,${t}}?`;

function Sr() {
    const e = {
            interSplit: "[^A-Za-z\\d']+",
            intraSplit: "[a-z][A-Z]",
            intraBound: "[A-Za-z]\\d|\\d[A-Za-z]|[a-z][A-Z]",
            interChars: ".",
            interIns: 1 / 0,
            intraChars: "[a-z\\d']",
            intraIns: 0,
            intraContr: "'[a-z]{1,2}\\b"
        },
        {
            intraIns: t,
            intraContr: n,
            intraSplit: o,
            interSplit: i,
            intraBound: s,
            intraChars: r
        } = e,
        l = '".+?"',
        a = new RegExp(l, "gi"),
        u = new RegExp(`(?:\\s+|^)-(?:${r}+|${l})`, "gi"),
        c = !!o,
        p = new RegExp(o, "g"),
        h = new RegExp(i, "g"),
        d = new RegExp(`^${i}|${i}$`, "g"),
        f = new RegExp(n, "gi"),
        m = _ => {
            const k = [];
            _ = _.replace(a, j => (k.push(j), Vo)), _ = _.replace(d, "").toLocaleLowerCase(), c && (_ = _.replace(p, j => `${j[0]} ${j[1]}`));
            let x = 0;
            return _.split(h).filter(j => j != "").map(j => j === Vo ? k[x++] : j)
        },
        w = _ => {
            let k = m(_);
            if (k.length == 0) return [void 0];
            const x = Array(k.length).fill("");
            k = k.map((R, V) => R.replace(f, v => (x[V] = v, "")));
            const j = Yo(r, t);
            let H = k.map((R, V) => R[0] === '"' ? Wo(R.slice(1, -1)) : R.split("").join(j) + x[V]);
            const z = Yo(e.interChars, e.interIns);
            return H = H.join(z), [new RegExp(H, "i")]
        },
        $ = (_, k, x) => {
            const [j] = w(k);
            if (!j) return [];
            const H = [];
            if (x != null)
                for (let z = 0; z < x.length; z++) {
                    const R = x[z];
                    j.test(_[R]) && H.push(R)
                } else
                    for (let z = 0; z < _.length; z++) j.test(_[z]) && H.push(z.toString());
            return H
        };
    return (_, k) => {
        let x, H = null,
            z = [];
        k = k.replace(u, V => {
            let v = V.trim().slice(1);
            return v[0] === '"' && (v = Wo(v.slice(1, -1))), ""
        });
        const R = m(k);
        if (R.length == 0) return [];
        if (R.length > 1) {
            const V = R.slice().sort((C, B) => B.length - C.length);
            for (let C = 0; C < V.length; C++) {
                if ((x == null ? void 0 : x.length) == 0) return [];
                x = $(_, V[C], x)
            }
            if (R.length > 2) return x;
            H = Ar(R).map(C => C.join(" ")), z.length = 0;
            const v = new Set;
            for (let C = 0; C < H.length; C++)
                if (v.size < (x == null ? void 0 : x.length)) {
                    const B = x == null ? void 0 : x.filter(E => !v.has(E)),
                        K = $(_, H[C], B);
                    for (let E = 0; E < K.length; E++) v.add(K[E]);
                    z.push(K)
                } else z.push([])
        }
        return H == null && (H = [k], z = [(x == null ? void 0 : x.length) > 0 ? x : $(_, k)]), z.flat()
    }
}

function Ar(e) {
    e = e.slice();
    const t = e.length,
        n = [e.slice()],
        o = new Array(t).fill(0);
    let i = 1,
        s, r;
    for (; i < t;) o[i] < i ? (s = i % 2 && o[i], r = e[i], e[i] = e[s], e[s] = r, ++o[i], i = 1, n.push(e.slice())) : (o[i] = 0, ++i);
    return n
}
const Er = Sr();

function Cr(e, t) {
    return Er([t], e).length > 0
}
const Or = e => {
        const t = Y(e);
        return Ai().find(n => Y(n) === t)
    },
    yn = (e, t) => {
        const n = He().filter(se);
        return (t === "get" ? n.filter(pt) : n.filter(Ie)).filter(i => Y(i) === e)
    },
    Co = () => {
        const e = Object.fromEntries(Ze().map(o => [o.id, !0])),
            t = Object.keys(e).length,
            n = Object.keys(Object.fromEntries(Ai().map(o => [Y(o), !0])));
        for (const o of n) {
            const i = yn(o, "set")[0];
            if (!i) continue;
            const s = i.inputs[0].link;
            if (!s) continue;
            const {
                origin_id: r,
                origin_slot: l,
                target_id: a
            } = Ne(s), u = ae(r);
            if (!u) continue;
            let c = !1;
            const p = yn(o, "get");
            for (const h of p) {
                let d = !1;
                for (const f of h.outputs)
                    if (f.links)
                        for (const m of f.links) {
                            const {
                                target_id: w,
                                target_slot: $,
                                origin_id: b
                            } = Ne(m), _ = ae(w);
                            try {
                                (t === 0 || e[b] || e[w] || e[r] || e[a]) && (u.connect(l, _, $), d = !0, c = !0)
                            } catch (k) {
                                console.error(k)
                            }
                        }
                d && At(h)
            }
            if (c) {
                const h = yn(o, "get");
                (t === 0 || h.length === 0) && At(i)
            }
        }
        if (t === 0)
            for (const o of nn()) At(o)
    };

function Pr(e) {
    return .5 - .5 * Math.cos(Math.PI * e)
}

function Jo(e, t, n) {
    return n = Pr(n), e + n * (t - e)
}
const Oo = ([e, t], n) => {
        const o = n.ds,
            i = document.body.clientWidth,
            s = document.body.clientHeight,
            r = o.scale,
            l = -e + i * .5 / r,
            a = -t + s * .5 / r,
            u = 250,
            c = Date.now() + u,
            p = o.offset[0],
            h = o.offset[1],
            d = () => {
                const f = c - Date.now();
                if (Date.now() < c) requestAnimationFrame(d);
                else {
                    o.offset[0] = l, o.offset[1] = a, n.setDirty(!0, !0);
                    return
                }
                const m = 1 - f / u;
                o.offset[0] = Jo(p, l, m), o.offset[1] = Jo(h, a, m), n.setDirty(!0, !0)
            };
        requestAnimationFrame(d)
    },
    Pt = e => {
        var r;
        const t = (r = e.graph) == null ? void 0 : r.list_of_graphcanvas[0],
            [n, o] = e.pos,
            [i, s] = e.size;
        Oo([n + i / 2, o + s / 2], t), t == null || t.selectNode(e)
    },
    On = (e, t = !1) => {
        var r, l, a;
        if (e.length === 0) return;
        const n = te("nodeOrganizeSpacingInputX"),
            o = te("nodeOrganizeSpacingOutputX");
        if (e.filter(u => !se(u)).length === 0) return;
        for (const u of e) {
            let c = 0,
                p = 0;
            const h = te("nodeOrganizeSpacingInputY"),
                d = te("nodeOrganizeSpacingOutputY"),
                f = [];
            if (u.graph) {
                for (const m of u.inputs ?? []) {
                    const w = m.link;
                    if (!w) continue;
                    const {
                        origin_id: $,
                        target_slot: b
                    } = Ne(w), _ = ae($);
                    if (!_ || _.type !== Ye) continue;
                    if (_.outputs && _.outputs[0] && _.outputs[0].links && _.outputs[0].links.length > 1) return;
                    const k = u.getConnectionPos(!0, b);
                    _.pos = [k[0] - n, k[1] + 15 + c * h], c += 1, f.push(_), _.flags.collapsed = te("collapseNodesOnOrganize")
                }
                for (const m of u.outputs ?? [])
                    if (m.links && u.graph)
                        for (const w of m.links) {
                            const {
                                target_id: $
                            } = Ne(w), b = ae($);
                            if (!b) {
                                console.error("Failed", u.id, ">", $);
                                continue
                            }
                            if (b.type !== Ye) continue;
                            const _ = (l = (r = b.outputs) == null ? void 0 : r[0]) == null ? void 0 : l.links;
                            if (_ && _.length > 1) return;
                            const k = u.getConnectionPos(!1, 0);
                            b.pos = [k[0] + o, k[1] + 15 + p * d], p += 1, f.push(b), b.flags.collapsed = te("collapseNodesOnOrganize")
                        }
                if (t && e.length === 1) {
                    const m = [u, ...f];
                    u.graph.list_of_graphcanvas[0].selectNodes(m)
                }
            }
        }
        const i = e[0];
        if (!i) return;
        ((a = i.graph) == null ? void 0 : a.list_of_graphcanvas[0]).setDirty(!0, !0), ut()
    },
    jr = e => e ? e.mode === 0 ? !0 : e.mode !== 2 : !1,
    Bt = (e, t = He(), n = _t(), o, i = "", s) => {
        var u, c, p, h, d, f, m, w;
        if (!e) return;
        const r = ae(e.origin_id, t),
            l = i || ((c = (u = r == null ? void 0 : r.outputs) == null ? void 0 : u[e.origin_slot]) == null ? void 0 : c.name);
        if (!r) return;
        if (se(r)) {
            const $ = Y(r);
            for (const b of t.filter(se).filter(Ie))
                if (Y(b) === $) {
                    const k = b.inputs[0];
                    if (k.link) return Bt(n[k.link], t, n, o, l)
                } throw new Error("Failed to resolve virtual link")
        }
        if (r.mode === 4) {
            if (!r.inputs) return;
            const b = r.inputs.map(k => n[k.link]).filter(k => (k == null ? void 0 : k.type) === o).sort((k, x) => {
                var z, R, V, v;
                const j = (R = (z = ae(k.target_id, t)) == null ? void 0 : z.outputs[k.target_slot]) == null ? void 0 : R.name,
                    H = (v = (V = ae(x.target_id, t)) == null ? void 0 : V.outputs[x.target_slot]) == null ? void 0 : v.name;
                return j === l ? -1 : H === l ? 1 : k.type === o ? -1 : x.type === o ? 1 : 0
            })[0];
            if (b && b.type === o) return Bt(b, t, n, o, l);
            const _ = (p = r.inputs[0]) == null ? void 0 : p.link;
            return _ ? Bt(n[_], t, n, o, l) : void 0
        }
        if (r.type === "Reroute") {
            const $ = (h = r.inputs[0]) == null ? void 0 : h.link;
            return $ ? Bt(n[$], t, n, o, l) : void 0
        }
        if (!s && r.outputs) {
            const $ = r.outputs.filter(b => (b == null ? void 0 : b.type) === o);
            if ($.length === 1 && $[0]) {
                const b = (f = (d = $ == null ? void 0 : $[0]) == null ? void 0 : d.links) == null ? void 0 : f[0];
                if (b) {
                    const _ = Ne(b, n);
                    if (_) return {
                        originId: _.origin_id,
                        originIndex: _.origin_slot
                    }
                }
            } else {
                const b = $.sort((_, k) => {
                    const x = _ == null ? void 0 : _.name,
                        j = k == null ? void 0 : k.name;
                    return x === l ? -1 : j === l ? 1 : _.type === o ? -1 : k.type === o ? 1 : 0
                });
                if (b[0]) {
                    const _ = (w = (m = b == null ? void 0 : b[0]) == null ? void 0 : m.links) == null ? void 0 : w[0];
                    if (_) {
                        const k = Ne(_, n);
                        if (k) return {
                            originId: k.origin_id,
                            originIndex: k.origin_slot
                        }
                    }
                }
            }
        }
        if (e.type === o) return {
            originId: e.origin_id,
            originIndex: e.origin_slot
        }
    },
    Xo = (e = He(), t = _t()) => {
        const n = {},
            o = {};
        for (const a of e.filter(se).filter(Ie)) {
            const u = Y(a),
                c = a.inputs[0];
            if (c.link) {
                const p = Ne(c.link, t);
                if (p) {
                    const h = Bt(p, e, t, p.type, void 0, !0);
                    h ? o[u] = h : o[u] = {
                        originId: p.origin_id,
                        originIndex: p.origin_slot
                    }
                }
            }
        }
        for (const a of e.filter(se).filter(pt)) {
            const u = Y(a);
            n[a.id] = u
        }
        const i = {},
            r = e.filter(jr).filter(se),
            l = r.filter(Ie);
        for (const a of l) {
            i[a.id] = [];
            const u = Y(a);
            for (const c of r) {
                const p = Y(c);
                u === p && a.id !== c.id && i[a.id].push(c.id)
            }
        }
        return {
            nodeSet: o,
            nodeGet: n,
            internalLinks: i
        }
    };

function yo(e, t, n = []) {
    const o = [];
    if (typeof e != typeof t) return o.push(`Type mismatch at ${n.join(".")}: ${typeof e} !== ${typeof t}`), o.push(`Type mismatch at ${n.join(".")}: ${JSON.stringify(e)} !== ${JSON.stringify(t)}`), o;
    if (e instanceof Array && t instanceof Array)
        if (e.length !== t.length) o.push(`Array length mismatch at ${n.join(".")}: ${e.length} !== ${t.length}`);
        else
            for (const [i, s] of e.entries()) {
                const r = [...n, i.toString()];
                o.push(...yo(s, t[i], r))
            } else if (e instanceof Object && t instanceof Object) {
                const i = Object.keys(e),
                    s = Object.keys(t),
                    r = new Set([...i, ...s]);
                for (const l of r) {
                    const a = [...n, l];
                    l in e ? l in t ? o.push(...yo(e[l], t[l], a)) : o.push(`Key missing in object2 at ${a.join(".")}`) : o.push(`Key missing in object1 at ${a.join(".")}`)
                }
            } else e !== t && o.push(`Value mismatch at ${n.join(".")}: ${e} !== ${t}`);
    return o
}
const _o = e => {
        const t = ae(e);
        t && Pt(t)
    },
    Ir = () => Object.values(graph.list_of_graphcanvas[0].selected_nodes),
    Po = () => {
        const e = Object.fromEntries(Ir().map(n => [n.id, !0])),
            t = Object.keys(e).length;
        Object.values(_t()).filter(Boolean).sort((n, o) => n.origin_id - o.origin_id).map(n => {
            (t === 0 || e[n.target_id] || e[n.origin_id]) && Fi(n, !0)
        }), On(He())
    },
    Nr = (e, t) => {
        window.run_mape_tests = async n => {
            if (!localStorage.mape_internal_test) return;
            app.graph.list_of_graphcanvas[0].setZoom(.5), e.addEventListener("executing", d => {
                _o(parseFloat(d.detail))
            });
            const o = document.querySelector("#comfy-view-queue-button");
            (o == null ? void 0 : o.innerText) === "View Queue" && (o == null || o.click());
            const i = async d => {
                const f = {
                        client_id: e.clientId,
                        prompt: d.output,
                        extra_data: {
                            extra_pnginfo: {
                                workflow: d.workflow
                            }
                        },
                        number: Math.floor(Math.random() * 1e4)
                    },
                    m = await e.fetchApi("/prompt", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(f)
                    });
                if (m.status !== 200) throw {
                    response: await m.json()
                };
                return await m.json()
            }, s = () => new Promise(d => {
                const f = () => {
                    !!document.querySelector(".comfy-list-items button") ? setTimeout(f, 50) : d(!0)
                };
                setTimeout(f, 50)
            }), l = await (await fetch("http://127.0.0.1:5823/")).json(), a = [], u = async () => {
                app.loadGraphData(l.reset[0].workflow), await p(50), h(), await s(), await p(50)
            }, c = d => new Promise(async f => {
                console.log(`${d.file}: Running`), app.loadGraphData(d.workflow), await p(50);
                const {
                    originalPrompt: m
                } = await t(), w = await i(m);
                await s(), await p(50), await u(), app.loadGraphData(d.workflow), await p(50), console.log(`${d.file}: Splitting all connections`), Po(), await p(50);
                const {
                    prompt: $
                } = await t();
                await p(50);
                const b = await i($);
                await s(), await p(50), console.log(`${d.file}: Joining all connections`), app.graph.list_of_graphcanvas[0].selectNode(), Co();
                const {
                    originalPrompt: _
                } = await t(), k = await i(_);
                await s(), await p(50);
                for (const x of [w, b, k]) {
                    const j = Object.values(x.node_errors);
                    if (j.length > 0) throw console.error(j), new Error("Invalid response")
                }
                if (JSON.stringify(m.output) !== JSON.stringify($.output) || JSON.stringify(m.output) !== JSON.stringify(_.output)) {
                    console.log({
                        preJson: w,
                        postJson: b,
                        originalPrompt: m,
                        prompt: $
                    }), console.log("Original", m.output), console.log("Converted", $.output);
                    for (const x of yo(m.output, $.output)) console.error(x);
                    throw new Error("MISMATCH")
                }
                console.log(`${d.file}: Finished with matching outcome`), f(!0)
            }), p = d => new Promise(f => {
                setTimeout(f, d)
            }), h = () => document.querySelector(".comfy-queue-btn").click();
            for (const d of l.regular) a.push({
                file: d.file,
                cb: () => c(d)
            });
            (async () => {
                await u();
                for (const d of a)(!n || n && d.file.match(new RegExp(n, "i"))) && await d.cb();
                console.log("Finished tests...")
            })()
        }
    },
    Wn = (e, t) => {
        var s, r, l;
        const n = (s = app.canvas) == null ? void 0 : s.default_connection_color_byType,
            o = (r = e.inputs) == null ? void 0 : r[0],
            i = (l = e.outputs) == null ? void 0 : l[0];
        o && (o.name = t, o.type = t, o.color_on = n[t]), i && (i.name = t, i.type = t, i.color_on = n[t])
    },
    qo = e => {
        const t = (n, o = !1, i = s => {}) => {
            if (!e.graph) return;
            const s = Object.values(_t()).filter(Boolean).find(l => l.id === n);
            if (!s) return;
            if (o) {
                const l = ae(s.origin_id);
                if (!l) return;
                const a = l.outputs[s.origin_slot].type.toString();
                Wn(e, a), i(a);
                return
            }
            if (!s) {
                Wn(e, Ns);
                return
            }
            const r = s.type;
            Wn(e, r), i(r)
        };
        setTimeout(() => {
            var n, o, i, s, r, l;
            if (Ie(e)) {
                const a = (o = (n = e.inputs) == null ? void 0 : n[0]) == null ? void 0 : o.link;
                if (!a) return;
                t(a, !0, u => {
                    const c = Y(e);
                    localStorage[`mape_tweak_${c}`] && (localStorage[`mape_tweak_${c}`] = u)
                })
            } else if (pt(e)) {
                const a = (r = (s = (i = e.outputs) == null ? void 0 : i[0]) == null ? void 0 : s.links) == null ? void 0 : r[0];
                a && t(a)
            }
            if (Ie(e)) {
                const a = Y(e);
                (l = e.widgets) != null && l[1] || e.addWidget("toggle", "tweak", !!localStorage[`mape_tweak_${a}`], u => {
                    var h, d;
                    const c = (d = (h = e.inputs) == null ? void 0 : h[0]) == null ? void 0 : d.type,
                        p = Y(e);
                    u ? localStorage[`mape_tweak_${p}`] = c : delete localStorage[`mape_tweak_${p}`], ut()
                }), e.setProperty("tweak", !!localStorage[`mape_tweak_${a}`])
            }
        })
    },
    Vn = "",
    Tr = async () => {
        const {
            app: e
        } = await Et(() => import(`${Vn}/scripts/app.js`), __vite__mapDeps([]));
        let t;
        e.registerExtension({
            name: "cg.customnodes.mape_helpers_boostrap",
            async init() {
                const d = e.graph.onConfigure;
                e.graph.onConfigure = function (...f) {
                    [t] = f, d.apply(this, f)
                }
            }
        });
        const {
            api: n
        } = await Et(() => import(`${Vn}/scripts/api.js`), __vite__mapDeps([])), {
            setWidgetConfig: o
        } = await Et(() => import(`${Vn}/extensions/core/widgetInputs.js`), __vite__mapDeps([]));
        let i;
        async function s() {
            const d = nt(await i.apply(e)),
                f = nt(await i.apply(e)),
                {
                    nodeGet: m,
                    nodeSet: w
                } = Xo(f.workflow.nodes, Object.fromEntries(f.workflow.links.map(([b, _, k, x, j, H]) => [b, {
                    id: b,
                    origin_id: _,
                    origin_slot: k,
                    target_id: x,
                    target_slot: j,
                    type: H
                }])));
            f.output = Object.fromEntries(Object.entries(f.output).filter(([b, _]) => _.class_type !== Ye).map(([b, _]) => (_.inputs = Object.fromEntries(Object.entries(_.inputs).map(([k, x]) => {
                if (Array.isArray(x)) {
                    const [j, H] = x, z = m[j], R = w[z];
                    if (!z || !R) return [k, x];
                    const V = ae(R.originId);
                    if (!V) return [k, x];
                    if (V.type === "PrimitiveNode") return [k, Y(V)];
                    if (V.updateLink) {
                        const v = V.updateLink({
                            origin_id: R.originId,
                            origin_slot: R.originIndex
                        });
                        if (v) return [k, [v.origin_id, v.origin_slot]]
                    }
                    return [k, [R.originId.toString(), R.originIndex]]
                } else return [k, x]
            })), [b, _])));
            const $ = new RegExp(`${mn}.*?${gn}`, "g");
            return f.output = Object.fromEntries(Object.entries(f.output).map(([b, _]) => (_.inputs = Object.fromEntries(Object.entries(_.inputs).map(([k, x]) => Array.isArray(x) ? [k, x] : typeof x == "string" ? [k, x.replaceAll($, "").replace(/\(:\d+\.?\d+?\)/g, "")] : [k, x])), [b, _])).filter(Boolean)), localStorage.debugOutput && console.info(JSON.stringify(f, null, "  ")), {
                prompt: f,
                originalPrompt: d
            }
        }
        let r = !1,
            l = !1,
            a;
        const u = LGraphCanvas.prototype.showLinkMenu,
            c = function (d, f) {
                return f.shiftKey ? (Fi(d), !1) : (u.apply(this, [d, f]), !1)
            },
            p = d => {
                setTimeout(() => {
                    for (const f of d.nodes) {
                        if (f.type !== "PrimitiveNode") continue;
                        const m = ae(f.id);
                        if (m)
                            for (const [w, $] of (f.widgets_values ?? []).entries()) m.widgets && m.widgets[w] && Te(m, $, w)
                    }
                    e.graph.setDirtyCanvas(!0, !0), ut()
                })
            },
            h = {
                name: "cg.customnodes.mape_helpers",
                async beforeRegisterNodeDef(d, f) {
                    for (const w of ["onAdded", "onConnectInput", "onConnectionsChange", "onConnectOutput", "onRemoved", "onSelected", "onDeselected", "onPropertyChanged", "onWidgetChanged", "onMouseMove"]) {
                        const $ = d.prototype[w];
                        d.prototype[w] = function (...b) {
                            ut(), $ == null || $.apply(this, b)
                        }
                    }
                    if (f.display_name !== Ye) {
                        const w = d.prototype.onDblClick;
                        d.prototype.onDblClick = function (...b) {
                            w == null || w.apply(this, b);
                            const _ = b[1],
                                [, k] = _;
                            if (!te("dblClickToRename") || k > 0) return;
                            const x = prompt("Name", this.title);
                            x && (this.title = x)
                        };
                        const $ = d.prototype.onDrawForeground;
                        d.prototype.onDrawForeground = function (...b) {
                            if (te("profileNodes")) {
                                const [_] = b;
                                xr(_, this.executionDuration || "")
                            }
                            return $ == null ? void 0 : $.apply(this, b)
                        };
                        return
                    }
                    typeof window.graph > "u" && (window.graph = e.graph), typeof window.app > "u" && (window.app = e);
                    const m = d.prototype.onConnectionsChange;
                    d.prototype.onConnectionsChange = function (...w) {
                        const [$] = w, b = this;
                        if (($ === 2 ? "output" : "input") === "output") {
                            if (Ie(b)) {
                                b.disconnectOutput(0);
                                return
                            }
                        } else if (pt(b)) {
                            b.disconnectInput(0);
                            return
                        }
                        se(b) && $ == 1 && qo(b), m == null || m.apply(b, w)
                    }, d.prototype.getTitle = function () {
                        const w = this,
                            $ = Ie(w),
                            b = te($ ? "setIcon" : "getIcon");
                        d.title_color = te($ ? "setBackgroundColor" : "getBackgroundColor");
                        const _ = Y(w);
                        return _ ? `${b}${_}` : w.title
                    }, d.prototype.onSelected = function () {
                        r = !0
                    }, d.prototype.onMouseEnter = function () {
                        a = this, l = !0
                    }, d.prototype.onMouseLeave = function () {
                        a = void 0, l = !1
                    }, d.prototype.onDeselected = () => {
                        r = !1
                    }, d.prototype.onRemoved = () => {
                        r = !1
                    }, d.prototype.onDblClick = function () {
                        const w = this;
                        w.flags.collapsed = !w.flags.collapsed
                    }
                },
                async nodeCreated(d) {
                    const f = d;
                    if (f.IS_MAPE_VARIABLE = se(d), !f.IS_MAPE_VARIABLE) return;
                    d.onGraphConfigured = () => {};
                    const m = d.configure;
                    d.configure = function (...w) {
                        m.apply(this, w);
                        const $ = {
                            FLOAT: {
                                min: Number.MIN_SAFE_INTEGER,
                                max: Number.MAX_SAFE_INTEGER,
                                step: .1,
                                round: .01
                            },
                            INT: {
                                min: Number.MIN_SAFE_INTEGER,
                                max: Number.MAX_SAFE_INTEGER
                            },
                            STRING: {
                                default: ""
                            }
                        };
                        d.inputs = nt(w[0].inputs).map(b => (o(b, [b.type, $[b.type]]), b)), qo(d)
                    }
                },
                async setup() {
                    var V;
                    i = e.graphToPrompt, t && p(t);
                    const d = e.graph.onConfigure;
                    e.graph.onConfigure = function (...v) {
                        p(v[0]), d.apply(this, v)
                    }, te("replaceSearch") && (String.prototype.__indexOf = String.prototype.indexOf, String.prototype.indexOf = function (v, C) {
                        var K;
                        const B = this;
                        return (K = new Error().stack) != null && K.match(/refreshHelper/) ? Cr(v, B) ? 1 : -1 : this.__indexOf(v, C)
                    }), document.addEventListener("keydown", v => {
                        v.key === "z" && v.ctrlKey && v.preventDefault()
                    });
                    let f = !0;
                    e.graphToPrompt = async function () {
                        return f && nn().length > 0 ? (await s()).prompt : i.apply(e)
                    };
                    for (const v of ["status", "reconnecting", "reconnected", "executing", "executed", "execution_start", "execution_error", "b_preview", "progress"]) n.addEventListener(v, ut);
                    const m = new Map;
                    let w = 0;
                    for (const v of ["executing"]) n.addEventListener(v, C => {
                        var q;
                        const B = ((q = C == null ? void 0 : C.detail) == null ? void 0 : q.node) ?? (C == null ? void 0 : C.detail),
                            K = ae(B);
                        K && (K.executionDuration = "");
                        const E = m.get(w);
                        if (m.delete(w), w && E) {
                            const J = Date.now() - E,
                                W = ae(w);
                            W && (W.executionDuration = `${(J/1e3).toFixed(2)}s`)
                        }
                        w = B, m.set(B, Date.now())
                    });
                    let $;
                    n.addEventListener("progress", v => {
                        clearTimeout($);
                        const {
                            value: C,
                            max: B,
                            node: K
                        } = v.detail, E = ae(K);
                        C && B && K && (document.title = `${E&&E.title?`${E.title}: `:""}${C}/${B} (${(C/B*100).toFixed(0)}%)`, C === B && (document.title = "Completed!", $ = setTimeout(() => {
                            document.title = "ComfyUI"
                        }, 2e3))), ut()
                    });
                    const b = e.ui.dialog.show;
                    window.mapeErrors = [], e.ui.dialog.show = function (...v) {
                        setTimeout(() => {
                            if (e.lastNodeErrors) {
                                for (const [C, B] of Object.entries(e.lastNodeErrors)) {
                                    const K = ae(parseFloat(C));
                                    for (const E of B.errors) window.mapeErrors.push({
                                        text: E.message,
                                        type: E.details,
                                        node: K
                                    })
                                }
                                ut(), window.showWarnings(!0)
                            }
                        }), b.apply(this, v)
                    };
                    const _ = document.getElementById("comfy-save-button");
                    if (_) {
                        const v = _.onclick;
                        _.onclick = function (C) {
                            f = !1, v(C), f = !0
                        }
                    }
                    const k = document.getElementById("comfy-dev-save-api-button");
                    if (k) {
                        const v = k.onclick;
                        k.onclick = function (C) {
                            f = !1, v(C), f = !0
                        }
                    }
                    const x = LGraphCanvas.prototype.drawFrontCanvas;
                    LGraphCanvas.prototype.drawFrontCanvas = function (...v) {
                        var J, W;
                        if (x.apply(this, v), !r && !l) return;
                        let C = Ts();
                        if (!C && a && te("showAllConnectionsOnNodeHover") && (C = a), !C && a && te("showConnectionOnNodeHover") && (pt(a) ? C = Or(a) : C = a), !C || !e.canvas) return;
                        const B = !r && l && !te("showAllConnectionsOnNodeHover") && te("showConnectionOnNodeHover"),
                            K = this.ctx,
                            {
                                nodeSet: E,
                                internalLinks: q
                            } = Xo();
                        for (const U of He().filter(M => se(M))) {
                            const M = U;
                            if (B && U.id !== C.id || (U.id, M.id, pt(U))) continue;
                            const Q = q[M.id];
                            if (!Q) continue;
                            const Z = window.innerWidth,
                                de = window.innerHeight;
                            for (const ke of Q) {
                                const Ee = ae(ke);
                                if (!Ee) {
                                    console.error("failed", M.id, ke);
                                    continue
                                }
                                const T = Y(C),
                                    oe = Y(Ee);
                                let g = !0;
                                const y = (W = (J = Ee.outputs) == null ? void 0 : J[0]) == null ? void 0 : W.links;
                                if (y)
                                    for (const Me of y) {
                                        const ze = Ne(Me);
                                        if (ze) {
                                            const lt = ae(ze.target_id);
                                            lt && lt.mode !== 4 && (g = !1)
                                        }
                                    }
                                if (g || !te("showAllConnectionsOnFocus") && T !== oe) continue;
                                let A = M,
                                    O = 0;
                                if (E[oe] && E[oe].originId !== M.id) {
                                    const Me = ae(E[oe].originId);
                                    Me && (A = Me, O = E[oe].originIndex)
                                }
                                const I = !1,
                                    N = !0,
                                    P = A.getConnectionPos(I, O),
                                    G = Ee.getConnectionPos(N, 0),
                                    ee = e.canvas.ds.scale,
                                    ce = e.canvas.ds.offset;
                                P[0] = P[0] * ee + ce[0] * ee, P[1] = P[1] * ee + ce[1] * ee, G[0] = G[0] * ee + ce[0] * ee, G[1] = G[1] * ee + ce[1] * ee;
                                const X = G[0] - P[0],
                                    re = G[1] - P[1],
                                    ie = LiteGraph.LEFT,
                                    xe = Math.abs(re) > Math.abs(X) ? re > 0 ? LiteGraph.DOWN : LiteGraph.UP : X < 0 ? LiteGraph.LEFT : LiteGraph.RIGHT,
                                    Ce = P[0] > 0 && P[1] > 0 && P[0] < Z && P[1] < de,
                                    D = G[0] > 0 && G[1] > 0 && G[0] < Z && G[1] < de;
                                if (!Ce && !D) continue;
                                K.save(), K.shadowColor = "#000", K.shadowBlur = 15, K.lineCap = "round";
                                const pe = T === oe,
                                    Se = te("animateAllNodes") || pe && te("animateSelectedNode") || !1;
                                e.canvas.renderLink(K, P, G, void 0, !0, Se, pe ? `rgba(255,244,53,${te("selectedNodeConnectionOpacity")/100})` : `rgba(255,255,255,${te("nodeConnectionOpacity")/100})`, xe, ie), K.restore()
                            }
                        }
                    }, LGraphCanvas.prototype.showLinkMenu = c;
                    const j = LGraphCanvas.prototype.showConnectionMenu;
                    LGraphCanvas.prototype.showConnectionMenu = function (...v) {
                        H || (this.use_original_menu = !0, j.apply(this, v), this.use_original_menu = !1)
                    };
                    let H = !1,
                        z = !1;
                    document.addEventListener("keydown", v => {
                        z = v.ctrlKey, H = v.shiftKey
                    }), e.canvas._mousemove_callback = () => {
                        if (!te("organizeSideNodes")) return;
                        const v = Ze();
                        On(v)
                    }, document.addEventListener("keyup", v => {
                        var K;
                        const C = document.activeElement;
                        if (C.tagName === "INPUT" && (C.type === "text" || C.type === "number") || C.tagName === "TEXTAREA") return;
                        if (v.key === "A" && v.shiftKey) {
                            document.querySelector(".comfy-queue-btn").click();
                            return
                        }
                        if (v.key === "ArrowLeft" && v.shiftKey) {
                            const E = Ze(),
                                q = Math.min(...E.map(W => W.pos[0])),
                                J = Math.max(...E.map(W => W.size[0]));
                            for (const W of E) W.pos = [q, W.pos[1]], te("resizeNodeWidthOnAlignment") && (W.size = [J, W.size[1]]);
                            return
                        }
                        if (v.key === "ArrowDown" && v.shiftKey) {
                            const E = Ze().filter(U => !se(U)),
                                q = Math.min(...E.map(U => U.pos[1])),
                                J = te("nodeAlignOffsetY");
                            let W = 0;
                            for (const U of E.sort((M, Q) => M.pos[1] - Q.pos[1])) {
                                U.pos = [U.pos[0], q + W];
                                const M = U.size[1] + J;
                                W += M
                            }
                            return
                        }
                        if (v.key === "ArrowUp" && v.shiftKey) {
                            const E = Ze(),
                                q = Math.min(...E.map(J => J.pos[1]));
                            for (const J of E) J.pos = [J.pos[0], q];
                            return
                        }
                        if (v.key === "O" && v.shiftKey) {
                            const E = Ze();
                            On(E, !0);
                            return
                        }
                        const B = Ze()[0];
                        if (B && v.key === "S" && v.shiftKey) {
                            Po();
                            return
                        }
                        if (B && v.key === "J" && v.shiftKey) {
                            Co();
                            return
                        }
                        if (!(!B || !B.type || B.type !== Ye)) {
                            if (v.key === "w") {
                                const E = Y(B);
                                setTimeout(() => {
                                    var q, J, W;
                                    window.setPrompt("Variable name", ((W = (J = (q = B.graph) == null ? void 0 : q.list_of_graphcanvas) == null ? void 0 : J[0]) == null ? void 0 : W.last_mouse_position) ?? [document.body.clientWidth / 2, document.body.clientHeight / 2], U => {
                                        if (U) {
                                            localStorage[`mape_tweak_${E}`] && (localStorage[`mape_tweak_${U}`] = localStorage[`mape_tweak_${E}`], delete localStorage[`mape_tweak_${E}`]), localStorage[`${tt}${E}`] && (localStorage[`${tt}${U}`] = localStorage[`${tt}${E}`], delete localStorage[`${tt}${E}`]);
                                            for (const M of graph._nodes) Y(M) === E && Te(M, U);
                                            Jt("rename")
                                        }
                                    }, E)
                                });
                                return
                            }
                            if (v.key === "s") {
                                const E = Y(B);
                                for (const q of graph._nodes) Y(q) === E && (K = q.inputs) != null && K[0].link && Pt(q);
                                return
                            }
                            if (v.key === "ArrowLeft" || v.key === "ArrowRight") {
                                const E = v.key === "ArrowLeft" ? -1 : 1,
                                    q = B,
                                    J = Y(q);
                                let W = graph._nodes.filter(de => Y(de) === J);
                                const U = W.find(Ie);
                                if (!U) return;
                                W = W.sort((de, ke) => {
                                    const Ee = Sn(U.pos[0], U.pos[1], de.pos[0], de.pos[1]),
                                        T = Sn(U.pos[0], U.pos[1], ke.pos[0], ke.pos[1]);
                                    return Ee - T
                                });
                                const Q = W.findIndex(de => de.id === q.id) + E,
                                    Z = W.length;
                                if (Q > Z - 1 || Q < 0) return;
                                Pt(W[Q]);
                                return
                            }
                            if (v.key.match(/^\d+$/)) {
                                const E = parseFloat(v.key) - 1,
                                    J = Y(B),
                                    U = graph._nodes.filter(M => Y(M) === J)[E];
                                U && Pt(U);
                                return
                            }
                        }
                    }), document.body.addEventListener("keyup", () => {
                        z = !1, H = !1
                    });
                    let R = (V = e.canvas) == null ? void 0 : V.allow_searchbox;
                    Object.defineProperty(e.canvas, "allow_searchbox", {
                        get: function () {
                            var B;
                            const v = this.graph.getGroupOnPos(...this.canvas_mouse),
                                C = this.connecting_node && se(this.connecting_node);
                            if (!H || C) return R;
                            if (this.connecting_input) {
                                const K = Cn((B = this.connecting_input.name) == null ? void 0 : B.toLowerCase()),
                                    E = LiteGraph.createNode("mape Variable");
                                E.pos = [this.canvas_mouse[0] + 10, this.canvas_mouse[1]], Gt(E);
                                const q = this.connecting_input.slot_index;
                                return Te(E, K), E.connect(0, this.connecting_node, q), E.flags.collapsed = !0, E.setSize(E.computeSize()), setTimeout(() => {
                                    var J, W;
                                    window.setPrompt("Variable name", ((W = (J = graph.list_of_graphcanvas) == null ? void 0 : J[0]) == null ? void 0 : W.last_mouse_position) ?? [document.body.clientWidth / 2, document.body.clientHeight / 2], U => {
                                        Te(E, U)
                                    }, K)
                                }), !1
                            } else if (this.connecting_output) {
                                const K = Cn(this.connecting_output.name ?? this.connecting_output.type),
                                    E = LiteGraph.createNode("mape Variable");
                                E.pos = [this.canvas_mouse[0] + 10, this.canvas_mouse[1]], Gt(E);
                                const q = this.connecting_output.slot_index;
                                if (Te(E, K), this.connecting_node.connect(q, E, 0), E.flags.collapsed = !0, E.setSize(E.computeSize()), !z) return setTimeout(() => {
                                    var W, U;
                                    window.setPrompt("Variable name", ((U = (W = graph.list_of_graphcanvas) == null ? void 0 : W[0]) == null ? void 0 : U.last_mouse_position) ?? [document.body.clientWidth / 2, document.body.clientHeight / 2], M => {
                                        Te(E, M)
                                    }, K)
                                }), !1;
                                const J = LiteGraph.createNode("mape Variable");
                                return J.pos = [this.canvas_mouse[0] + 10, this.canvas_mouse[1] + 50], Gt(J), Te(J, K), J.flags.collapsed = !0, J.setSize(J.computeSize()), setTimeout(() => {
                                    var W, U;
                                    window.setPrompt("Variable name", ((U = (W = graph.list_of_graphcanvas) == null ? void 0 : W[0]) == null ? void 0 : U.last_mouse_position) ?? [document.body.clientWidth / 2, document.body.clientHeight / 2], M => {
                                        Te(E, M), Te(J, M)
                                    }, K)
                                }), !1
                            }
                            return v && H && te("dblClickToRenameGroup") ? (H = !1, setTimeout(() => {
                                const K = prompt("Change group name", v.title);
                                K && (v.title = K, e.graph.setDirtyCanvas(!0, !0), Jt("rename"))
                            }, 100), !1) : !0
                        },
                        set: function (v) {
                            R = v
                        }
                    }), Nr(n, s)
                }
            };
        e.registerExtension(h)
    }, Lr = Object.freeze(Object.defineProperty({
        __proto__: null,
        registerPlugin: Tr
    }, Symbol.toStringTag, {
        value: "Module"
    })), Yn = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : !1;

function Jn(e, t, n, o) {
    e.addEventListener ? e.addEventListener(t, n, o) : e.attachEvent && e.attachEvent("on".concat(t), n)
}

function Rt(e, t, n, o) {
    e.removeEventListener ? e.removeEventListener(t, n, o) : e.deachEvent && e.deachEvent("on".concat(t), n)
}

function Bi(e, t) {
    const n = t.slice(0, t.length - 1);
    for (let o = 0; o < n.length; o++) n[o] = e[n[o].toLowerCase()];
    return n
}

function Ui(e) {
    typeof e != "string" && (e = ""), e = e.replace(/\s/g, "");
    const t = e.split(",");
    let n = t.lastIndexOf("");
    for (; n >= 0;) t[n - 1] += ",", t.splice(n, 1), n = t.lastIndexOf("");
    return t
}

function Mr(e, t) {
    const n = e.length >= t.length ? e : t,
        o = e.length >= t.length ? t : e;
    let i = !0;
    for (let s = 0; s < n.length; s++) o.indexOf(n[s]) === -1 && (i = !1);
    return i
}
const Xt = {
        backspace: 8,
        "⌫": 8,
        tab: 9,
        clear: 12,
        enter: 13,
        "↩": 13,
        return: 13,
        esc: 27,
        escape: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        del: 46,
        delete: 46,
        ins: 45,
        insert: 45,
        home: 36,
        end: 35,
        pageup: 33,
        pagedown: 34,
        capslock: 20,
        num_0: 96,
        num_1: 97,
        num_2: 98,
        num_3: 99,
        num_4: 100,
        num_5: 101,
        num_6: 102,
        num_7: 103,
        num_8: 104,
        num_9: 105,
        num_multiply: 106,
        num_add: 107,
        num_enter: 108,
        num_subtract: 109,
        num_decimal: 110,
        num_divide: 111,
        "⇪": 20,
        ",": 188,
        ".": 190,
        "/": 191,
        "`": 192,
        "-": Yn ? 173 : 189,
        "=": Yn ? 61 : 187,
        ";": Yn ? 59 : 186,
        "'": 222,
        "[": 219,
        "]": 221,
        "\\": 220
    },
    Ue = {
        "⇧": 16,
        shift: 16,
        "⌥": 18,
        alt: 18,
        option: 18,
        "⌃": 17,
        ctrl: 17,
        control: 17,
        "⌘": 91,
        cmd: 91,
        command: 91
    },
    $o = {
        16: "shiftKey",
        18: "altKey",
        17: "ctrlKey",
        91: "metaKey",
        shiftKey: 16,
        ctrlKey: 17,
        altKey: 18,
        metaKey: 91
    },
    Oe = {
        16: !1,
        18: !1,
        17: !1,
        91: !1
    },
    ye = {};
for (let e = 1; e < 20; e++) Xt["f".concat(e)] = 111 + e;
let ue = [],
    Kt = null,
    Gi = "all";
const Ge = new Map,
    on = e => Xt[e.toLowerCase()] || Ue[e.toLowerCase()] || e.toUpperCase().charCodeAt(0),
    Rr = e => Object.keys(Xt).find(t => Xt[t] === e),
    Hr = e => Object.keys(Ue).find(t => Ue[t] === e);

function Ki(e) {
    Gi = e || "all"
}

function qt() {
    return Gi || "all"
}

function zr() {
    return ue.slice(0)
}

function Dr() {
    return ue.map(e => Rr(e) || Hr(e) || String.fromCharCode(e))
}

function Fr() {
    const e = [];
    return Object.keys(ye).forEach(t => {
        ye[t].forEach(n => {
            let {
                key: o,
                scope: i,
                mods: s,
                shortcut: r
            } = n;
            e.push({
                scope: i,
                shortcut: r,
                mods: s,
                keys: o.split("+").map(l => on(l))
            })
        })
    }), e
}

function Br(e) {
    const t = e.target || e.srcElement,
        {
            tagName: n
        } = t;
    let o = !0;
    return (t.isContentEditable || (n === "INPUT" || n === "TEXTAREA" || n === "SELECT") && !t.readOnly) && (o = !1), o
}

function Ur(e) {
    return typeof e == "string" && (e = on(e)), ue.indexOf(e) !== -1
}

function Gr(e, t) {
    let n, o;
    e || (e = qt());
    for (const i in ye)
        if (Object.prototype.hasOwnProperty.call(ye, i))
            for (n = ye[i], o = 0; o < n.length;) n[o].scope === e ? n.splice(o, 1).forEach(r => {
                let {
                    element: l
                } = r;
                return jo(l)
            }) : o++;
    qt() === e && Ki(t || "all")
}

function Kr(e) {
    let t = e.keyCode || e.which || e.charCode;
    const n = ue.indexOf(t);
    if (n >= 0 && ue.splice(n, 1), e.key && e.key.toLowerCase() === "meta" && ue.splice(0, ue.length), (t === 93 || t === 224) && (t = 91), t in Oe) {
        Oe[t] = !1;
        for (const o in Ue) Ue[o] === t && (ge[o] = !1)
    }
}

function Wi(e) {
    if (typeof e > "u") Object.keys(ye).forEach(i => {
        Array.isArray(ye[i]) && ye[i].forEach(s => un(s)), delete ye[i]
    }), jo(null);
    else if (Array.isArray(e)) e.forEach(i => {
        i.key && un(i)
    });
    else if (typeof e == "object") e.key && un(e);
    else if (typeof e == "string") {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
        let [i, s] = n;
        typeof i == "function" && (s = i, i = ""), un({
            key: e,
            scope: i,
            method: s,
            splitKey: "+"
        })
    }
}
const un = e => {
    let {
        key: t,
        scope: n,
        method: o,
        splitKey: i = "+"
    } = e;
    Ui(t).forEach(r => {
        const l = r.split(i),
            a = l.length,
            u = l[a - 1],
            c = u === "*" ? "*" : on(u);
        if (!ye[c]) return;
        n || (n = qt());
        const p = a > 1 ? Bi(Ue, l) : [],
            h = [];
        ye[c] = ye[c].filter(d => {
            const m = (o ? d.method === o : !0) && d.scope === n && Mr(d.mods, p);
            return m && h.push(d.element), !m
        }), h.forEach(d => jo(d))
    })
};

function Zo(e, t, n, o) {
    if (t.element !== o) return;
    let i;
    if (t.scope === n || t.scope === "all") {
        i = t.mods.length > 0;
        for (const s in Oe) Object.prototype.hasOwnProperty.call(Oe, s) && (!Oe[s] && t.mods.indexOf(+s) > -1 || Oe[s] && t.mods.indexOf(+s) === -1) && (i = !1);
        (t.mods.length === 0 && !Oe[16] && !Oe[18] && !Oe[17] && !Oe[91] || i || t.shortcut === "*") && (t.keys = [], t.keys = t.keys.concat(ue), t.method(e, t) === !1 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0)))
    }
}

function Qo(e, t) {
    const n = ye["*"];
    let o = e.keyCode || e.which || e.charCode;
    if (!ge.filter.call(this, e)) return;
    if ((o === 93 || o === 224) && (o = 91), ue.indexOf(o) === -1 && o !== 229 && ue.push(o), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(l => {
            const a = $o[l];
            e[l] && ue.indexOf(a) === -1 ? ue.push(a) : !e[l] && ue.indexOf(a) > -1 ? ue.splice(ue.indexOf(a), 1) : l === "metaKey" && e[l] && ue.length === 3 && (e.ctrlKey || e.shiftKey || e.altKey || (ue = ue.slice(ue.indexOf(a))))
        }), o in Oe) {
        Oe[o] = !0;
        for (const l in Ue) Ue[l] === o && (ge[l] = !0);
        if (!n) return
    }
    for (const l in Oe) Object.prototype.hasOwnProperty.call(Oe, l) && (Oe[l] = e[$o[l]]);
    e.getModifierState && !(e.altKey && !e.ctrlKey) && e.getModifierState("AltGraph") && (ue.indexOf(17) === -1 && ue.push(17), ue.indexOf(18) === -1 && ue.push(18), Oe[17] = !0, Oe[18] = !0);
    const i = qt();
    if (n)
        for (let l = 0; l < n.length; l++) n[l].scope === i && (e.type === "keydown" && n[l].keydown || e.type === "keyup" && n[l].keyup) && Zo(e, n[l], i, t);
    if (!(o in ye)) return;
    const s = ye[o],
        r = s.length;
    for (let l = 0; l < r; l++)
        if ((e.type === "keydown" && s[l].keydown || e.type === "keyup" && s[l].keyup) && s[l].key) {
            const a = s[l],
                {
                    splitKey: u
                } = a,
                c = a.key.split(u),
                p = [];
            for (let h = 0; h < c.length; h++) p.push(on(c[h]));
            p.sort().join("") === ue.sort().join("") && Zo(e, a, i, t)
        }
}

function ge(e, t, n) {
    ue = [];
    const o = Ui(e);
    let i = [],
        s = "all",
        r = document,
        l = 0,
        a = !1,
        u = !0,
        c = "+",
        p = !1,
        h = !1;
    for (n === void 0 && typeof t == "function" && (n = t), Object.prototype.toString.call(t) === "[object Object]" && (t.scope && (s = t.scope), t.element && (r = t.element), t.keyup && (a = t.keyup), t.keydown !== void 0 && (u = t.keydown), t.capture !== void 0 && (p = t.capture), typeof t.splitKey == "string" && (c = t.splitKey), t.single === !0 && (h = !0)), typeof t == "string" && (s = t), h && Wi(e, s); l < o.length; l++) e = o[l].split(c), i = [], e.length > 1 && (i = Bi(Ue, e)), e = e[e.length - 1], e = e === "*" ? "*" : on(e), e in ye || (ye[e] = []), ye[e].push({
        keyup: a,
        keydown: u,
        scope: s,
        mods: i,
        shortcut: o[l],
        method: n,
        key: o[l],
        splitKey: c,
        element: r
    });
    if (typeof r < "u" && window) {
        if (!Ge.has(r)) {
            const d = function () {
                    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
                    return Qo(m, r)
                },
                f = function () {
                    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
                    Qo(m, r), Kr(m)
                };
            Ge.set(r, {
                keydownListener: d,
                keyupListenr: f,
                capture: p
            }), Jn(r, "keydown", d, p), Jn(r, "keyup", f, p)
        }
        if (!Kt) {
            const d = () => {
                ue = []
            };
            Kt = {
                listener: d,
                capture: p
            }, Jn(window, "focus", d, p)
        }
    }
}

function Wr(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
    Object.keys(ye).forEach(n => {
        ye[n].filter(i => i.scope === t && i.shortcut === e).forEach(i => {
            i && i.method && i.method()
        })
    })
}

function jo(e) {
    const t = Object.values(ye).flat();
    if (t.findIndex(o => {
            let {
                element: i
            } = o;
            return i === e
        }) < 0) {
        const {
            keydownListener: o,
            keyupListenr: i,
            capture: s
        } = Ge.get(e) || {};
        o && i && (Rt(e, "keyup", i, s), Rt(e, "keydown", o, s), Ge.delete(e))
    }
    if ((t.length <= 0 || Ge.size <= 0) && (Object.keys(Ge).forEach(i => {
            const {
                keydownListener: s,
                keyupListenr: r,
                capture: l
            } = Ge.get(i) || {};
            s && r && (Rt(i, "keyup", r, l), Rt(i, "keydown", s, l), Ge.delete(i))
        }), Ge.clear(), Object.keys(ye).forEach(i => delete ye[i]), Kt)) {
        const {
            listener: i,
            capture: s
        } = Kt;
        Rt(window, "focus", i, s), Kt = null
    }
}
const Xn = {
    getPressedKeyString: Dr,
    setScope: Ki,
    getScope: qt,
    deleteScope: Gr,
    getPressedKeyCodes: zr,
    getAllKeyCodes: Fr,
    isPressed: Ur,
    filter: Br,
    trigger: Wr,
    unbind: Wi,
    keyMap: Xt,
    modifier: Ue,
    modifierMap: $o
};
for (const e in Xn) Object.prototype.hasOwnProperty.call(Xn, e) && (ge[e] = Xn[e]);
if (typeof window < "u") {
    const e = window.hotkeys;
    ge.noConflict = t => (t && window.hotkeys === ge && (window.hotkeys = e), ge), window.hotkeys = ge
}
const _n = window,
    Io = _n.ShadowRoot && (_n.ShadyCSS === void 0 || _n.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    No = Symbol(),
    ei = new WeakMap;
let Vi = class {
    constructor(t, n, o) {
        if (this._$cssResult$ = !0, o !== No) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = n
    }
    get styleSheet() {
        let t = this.o;
        const n = this.t;
        if (Io && t === void 0) {
            const o = n !== void 0 && n.length === 1;
            o && (t = ei.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), o && ei.set(n, t))
        }
        return t
    }
    toString() {
        return this.cssText
    }
};
const Vr = e => new Vi(typeof e == "string" ? e : e + "", void 0, No),
    zn = (e, ...t) => {
        const n = e.length === 1 ? e[0] : t.reduce((o, i, s) => o + (r => {
            if (r._$cssResult$ === !0) return r.cssText;
            if (typeof r == "number") return r;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
        })(i) + e[s + 1], e[0]);
        return new Vi(n, e, No)
    },
    Yr = (e, t) => {
        Io ? e.adoptedStyleSheets = t.map(n => n instanceof CSSStyleSheet ? n : n.styleSheet) : t.forEach(n => {
            const o = document.createElement("style"),
                i = _n.litNonce;
            i !== void 0 && o.setAttribute("nonce", i), o.textContent = n.cssText, e.appendChild(o)
        })
    },
    ti = Io ? e => e : e => e instanceof CSSStyleSheet ? (t => {
        let n = "";
        for (const o of t.cssRules) n += o.cssText;
        return Vr(n)
    })(e) : e;
var qn;
const Pn = window,
    ni = Pn.trustedTypes,
    Jr = ni ? ni.emptyScript : "",
    oi = Pn.reactiveElementPolyfillSupport,
    wo = {
        toAttribute(e, t) {
            switch (t) {
                case Boolean:
                    e = e ? Jr : null;
                    break;
                case Object:
                case Array:
                    e = e == null ? e : JSON.stringify(e)
            }
            return e
        },
        fromAttribute(e, t) {
            let n = e;
            switch (t) {
                case Boolean:
                    n = e !== null;
                    break;
                case Number:
                    n = e === null ? null : Number(e);
                    break;
                case Object:
                case Array:
                    try {
                        n = JSON.parse(e)
                    } catch {
                        n = null
                    }
            }
            return n
        }
    },
    Yi = (e, t) => t !== e && (t == t || e == e),
    Zn = {
        attribute: !0,
        type: String,
        converter: wo,
        reflect: !1,
        hasChanged: Yi
    },
    bo = "finalized";
let kt = class extends HTMLElement {
    constructor() {
        super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu()
    }
    static addInitializer(t) {
        var n;
        this.finalize(), ((n = this.h) !== null && n !== void 0 ? n : this.h = []).push(t)
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((n, o) => {
            const i = this._$Ep(o, n);
            i !== void 0 && (this._$Ev.set(i, o), t.push(i))
        }), t
    }
    static createProperty(t, n = Zn) {
        if (n.state && (n.attribute = !1), this.finalize(), this.elementProperties.set(t, n), !n.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const o = typeof t == "symbol" ? Symbol() : "__" + t,
                i = this.getPropertyDescriptor(t, o, n);
            i !== void 0 && Object.defineProperty(this.prototype, t, i)
        }
    }
    static getPropertyDescriptor(t, n, o) {
        return {
            get() {
                return this[n]
            },
            set(i) {
                const s = this[t];
                this[n] = i, this.requestUpdate(t, s, o)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || Zn
    }
    static finalize() {
        if (this.hasOwnProperty(bo)) return !1;
        this[bo] = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
            const n = this.properties,
                o = [...Object.getOwnPropertyNames(n), ...Object.getOwnPropertySymbols(n)];
            for (const i of o) this.createProperty(i, n[i])
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0
    }
    static finalizeStyles(t) {
        const n = [];
        if (Array.isArray(t)) {
            const o = new Set(t.flat(1 / 0).reverse());
            for (const i of o) n.unshift(ti(i))
        } else t !== void 0 && n.push(ti(t));
        return n
    }
    static _$Ep(t, n) {
        const o = n.attribute;
        return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0
    }
    _$Eu() {
        var t;
        this._$E_ = new Promise(n => this.enableUpdating = n), this._$AL = new Map, this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach(n => n(this))
    }
    addController(t) {
        var n, o;
        ((n = this._$ES) !== null && n !== void 0 ? n : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((o = t.hostConnected) === null || o === void 0 || o.call(t))
    }
    removeController(t) {
        var n;
        (n = this._$ES) === null || n === void 0 || n.splice(this._$ES.indexOf(t) >>> 0, 1)
    }
    _$Eg() {
        this.constructor.elementProperties.forEach((t, n) => {
            this.hasOwnProperty(n) && (this._$Ei.set(n, this[n]), delete this[n])
        })
    }
    createRenderRoot() {
        var t;
        const n = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return Yr(n, this.constructor.elementStyles), n
    }
    connectedCallback() {
        var t;
        this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach(n => {
            var o;
            return (o = n.hostConnected) === null || o === void 0 ? void 0 : o.call(n)
        })
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t;
        (t = this._$ES) === null || t === void 0 || t.forEach(n => {
            var o;
            return (o = n.hostDisconnected) === null || o === void 0 ? void 0 : o.call(n)
        })
    }
    attributeChangedCallback(t, n, o) {
        this._$AK(t, o)
    }
    _$EO(t, n, o = Zn) {
        var i;
        const s = this.constructor._$Ep(t, o);
        if (s !== void 0 && o.reflect === !0) {
            const r = (((i = o.converter) === null || i === void 0 ? void 0 : i.toAttribute) !== void 0 ? o.converter : wo).toAttribute(n, o.type);
            this._$El = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$El = null
        }
    }
    _$AK(t, n) {
        var o;
        const i = this.constructor,
            s = i._$Ev.get(t);
        if (s !== void 0 && this._$El !== s) {
            const r = i.getPropertyOptions(s),
                l = typeof r.converter == "function" ? {
                    fromAttribute: r.converter
                } : ((o = r.converter) === null || o === void 0 ? void 0 : o.fromAttribute) !== void 0 ? r.converter : wo;
            this._$El = s, this[s] = l.fromAttribute(n, r.type), this._$El = null
        }
    }
    requestUpdate(t, n, o) {
        let i = !0;
        t !== void 0 && (((o = o || this.constructor.getPropertyOptions(t)).hasChanged || Yi)(this[t], n) ? (this._$AL.has(t) || this._$AL.set(t, n), o.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = new Map), this._$EC.set(t, o))) : i = !1), !this.isUpdatePending && i && (this._$E_ = this._$Ej())
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_
        } catch (n) {
            Promise.reject(n)
        }
        const t = this.scheduleUpdate();
        return t != null && await t, !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach((i, s) => this[s] = i), this._$Ei = void 0);
        let n = !1;
        const o = this._$AL;
        try {
            n = this.shouldUpdate(o), n ? (this.willUpdate(o), (t = this._$ES) === null || t === void 0 || t.forEach(i => {
                var s;
                return (s = i.hostUpdate) === null || s === void 0 ? void 0 : s.call(i)
            }), this.update(o)) : this._$Ek()
        } catch (i) {
            throw n = !1, this._$Ek(), i
        }
        n && this._$AE(o)
    }
    willUpdate(t) {}
    _$AE(t) {
        var n;
        (n = this._$ES) === null || n === void 0 || n.forEach(o => {
            var i;
            return (i = o.hostUpdated) === null || i === void 0 ? void 0 : i.call(o)
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t)
    }
    _$Ek() {
        this._$AL = new Map, this.isUpdatePending = !1
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$E_
    }
    shouldUpdate(t) {
        return !0
    }
    update(t) {
        this._$EC !== void 0 && (this._$EC.forEach((n, o) => this._$EO(o, this[o], n)), this._$EC = void 0), this._$Ek()
    }
    updated(t) {}
    firstUpdated(t) {}
};
kt[bo] = !0, kt.elementProperties = new Map, kt.elementStyles = [], kt.shadowRootOptions = {
    mode: "open"
}, oi == null || oi({
    ReactiveElement: kt
}), ((qn = Pn.reactiveElementVersions) !== null && qn !== void 0 ? qn : Pn.reactiveElementVersions = []).push("1.6.3");
var Qn;
const jn = window,
    It = jn.trustedTypes,
    ii = It ? It.createPolicy("lit-html", {
        createHTML: e => e
    }) : void 0,
    In = "$lit$",
    We = `lit$${(Math.random()+"").slice(9)}$`,
    To = "?" + We,
    Xr = `<${To}>`,
    mt = document,
    Zt = () => mt.createComment(""),
    Qt = e => e === null || typeof e != "object" && typeof e != "function",
    Ji = Array.isArray,
    Xi = e => Ji(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function",
    eo = `[ 	
\f\r]`,
    Ht = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    si = /-->/g,
    ri = />/g,
    at = RegExp(`>|${eo}(?:([^\\s"'>=/]+)(${eo}*=${eo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"),
    li = /'/g,
    ai = /"/g,
    qi = /^(?:script|style|textarea|title)$/i,
    qr = e => (t, ...n) => ({
        _$litType$: e,
        strings: t,
        values: n
    }),
    Pe = qr(1),
    Re = Symbol.for("lit-noChange"),
    ve = Symbol.for("lit-nothing"),
    ci = new WeakMap,
    ft = mt.createTreeWalker(mt, 129, null, !1);

function Zi(e, t) {
    if (!Array.isArray(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return ii !== void 0 ? ii.createHTML(t) : t
}
const Qi = (e, t) => {
    const n = e.length - 1,
        o = [];
    let i, s = t === 2 ? "<svg>" : "",
        r = Ht;
    for (let l = 0; l < n; l++) {
        const a = e[l];
        let u, c, p = -1,
            h = 0;
        for (; h < a.length && (r.lastIndex = h, c = r.exec(a), c !== null);) h = r.lastIndex, r === Ht ? c[1] === "!--" ? r = si : c[1] !== void 0 ? r = ri : c[2] !== void 0 ? (qi.test(c[2]) && (i = RegExp("</" + c[2], "g")), r = at) : c[3] !== void 0 && (r = at) : r === at ? c[0] === ">" ? (r = i ?? Ht, p = -1) : c[1] === void 0 ? p = -2 : (p = r.lastIndex - c[2].length, u = c[1], r = c[3] === void 0 ? at : c[3] === '"' ? ai : li) : r === ai || r === li ? r = at : r === si || r === ri ? r = Ht : (r = at, i = void 0);
        const d = r === at && e[l + 1].startsWith("/>") ? " " : "";
        s += r === Ht ? a + Xr : p >= 0 ? (o.push(u), a.slice(0, p) + In + a.slice(p) + We + d) : a + We + (p === -2 ? (o.push(void 0), l) : d)
    }
    return [Zi(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : "")), o]
};
class en {
    constructor({
        strings: t,
        _$litType$: n
    }, o) {
        let i;
        this.parts = [];
        let s = 0,
            r = 0;
        const l = t.length - 1,
            a = this.parts,
            [u, c] = Qi(t, n);
        if (this.el = en.createElement(u, o), ft.currentNode = this.el.content, n === 2) {
            const p = this.el.content,
                h = p.firstChild;
            h.remove(), p.append(...h.childNodes)
        }
        for (;
            (i = ft.nextNode()) !== null && a.length < l;) {
            if (i.nodeType === 1) {
                if (i.hasAttributes()) {
                    const p = [];
                    for (const h of i.getAttributeNames())
                        if (h.endsWith(In) || h.startsWith(We)) {
                            const d = c[r++];
                            if (p.push(h), d !== void 0) {
                                const f = i.getAttribute(d.toLowerCase() + In).split(We),
                                    m = /([.?@])?(.*)/.exec(d);
                                a.push({
                                    type: 1,
                                    index: s,
                                    name: m[2],
                                    strings: f,
                                    ctor: m[1] === "." ? ts : m[1] === "?" ? ns : m[1] === "@" ? os : sn
                                })
                            } else a.push({
                                type: 6,
                                index: s
                            })
                        } for (const h of p) i.removeAttribute(h)
                }
                if (qi.test(i.tagName)) {
                    const p = i.textContent.split(We),
                        h = p.length - 1;
                    if (h > 0) {
                        i.textContent = It ? It.emptyScript : "";
                        for (let d = 0; d < h; d++) i.append(p[d], Zt()), ft.nextNode(), a.push({
                            type: 2,
                            index: ++s
                        });
                        i.append(p[h], Zt())
                    }
                }
            } else if (i.nodeType === 8)
                if (i.data === To) a.push({
                    type: 2,
                    index: s
                });
                else {
                    let p = -1;
                    for (;
                        (p = i.data.indexOf(We, p + 1)) !== -1;) a.push({
                        type: 7,
                        index: s
                    }), p += We.length - 1
                } s++
        }
    }
    static createElement(t, n) {
        const o = mt.createElement("template");
        return o.innerHTML = t, o
    }
}

function gt(e, t, n = e, o) {
    var i, s, r, l;
    if (t === Re) return t;
    let a = o !== void 0 ? (i = n._$Co) === null || i === void 0 ? void 0 : i[o] : n._$Cl;
    const u = Qt(t) ? void 0 : t._$litDirective$;
    return (a == null ? void 0 : a.constructor) !== u && ((s = a == null ? void 0 : a._$AO) === null || s === void 0 || s.call(a, !1), u === void 0 ? a = void 0 : (a = new u(e), a._$AT(e, n, o)), o !== void 0 ? ((r = (l = n)._$Co) !== null && r !== void 0 ? r : l._$Co = [])[o] = a : n._$Cl = a), a !== void 0 && (t = gt(e, a._$AS(e, t.values), a, o)), t
}
class es {
    constructor(t, n) {
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    u(t) {
        var n;
        const {
            el: {
                content: o
            },
            parts: i
        } = this._$AD, s = ((n = t == null ? void 0 : t.creationScope) !== null && n !== void 0 ? n : mt).importNode(o, !0);
        ft.currentNode = s;
        let r = ft.nextNode(),
            l = 0,
            a = 0,
            u = i[0];
        for (; u !== void 0;) {
            if (l === u.index) {
                let c;
                u.type === 2 ? c = new Lt(r, r.nextSibling, this, t) : u.type === 1 ? c = new u.ctor(r, u.name, u.strings, this, t) : u.type === 6 && (c = new is(r, this, t)), this._$AV.push(c), u = i[++a]
            }
            l !== (u == null ? void 0 : u.index) && (r = ft.nextNode(), l++)
        }
        return ft.currentNode = mt, s
    }
    v(t) {
        let n = 0;
        for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, n), n += o.strings.length - 2) : o._$AI(t[n])), n++
    }
}
class Lt {
    constructor(t, n, o, i) {
        var s;
        this.type = 2, this._$AH = ve, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = o, this.options = i, this._$Cp = (s = i == null ? void 0 : i.isConnected) === null || s === void 0 || s
    }
    get _$AU() {
        var t, n;
        return (n = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && n !== void 0 ? n : this._$Cp
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const n = this._$AM;
        return n !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = n.parentNode), t
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(t, n = this) {
        t = gt(this, t, n), Qt(t) ? t === ve || t == null || t === "" ? (this._$AH !== ve && this._$AR(), this._$AH = ve) : t !== this._$AH && t !== Re && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Xi(t) ? this.T(t) : this._(t)
    }
    k(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB)
    }
    $(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.k(t))
    }
    _(t) {
        this._$AH !== ve && Qt(this._$AH) ? this._$AA.nextSibling.data = t : this.$(mt.createTextNode(t)), this._$AH = t
    }
    g(t) {
        var n;
        const {
            values: o,
            _$litType$: i
        } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = en.createElement(Zi(i.h, i.h[0]), this.options)), i);
        if (((n = this._$AH) === null || n === void 0 ? void 0 : n._$AD) === s) this._$AH.v(o);
        else {
            const r = new es(s, this),
                l = r.u(this.options);
            r.v(o), this.$(l), this._$AH = r
        }
    }
    _$AC(t) {
        let n = ci.get(t.strings);
        return n === void 0 && ci.set(t.strings, n = new en(t)), n
    }
    T(t) {
        Ji(this._$AH) || (this._$AH = [], this._$AR());
        const n = this._$AH;
        let o, i = 0;
        for (const s of t) i === n.length ? n.push(o = new Lt(this.k(Zt()), this.k(Zt()), this, this.options)) : o = n[i], o._$AI(s), i++;
        i < n.length && (this._$AR(o && o._$AB.nextSibling, i), n.length = i)
    }
    _$AR(t = this._$AA.nextSibling, n) {
        var o;
        for ((o = this._$AP) === null || o === void 0 || o.call(this, !1, !0, n); t && t !== this._$AB;) {
            const i = t.nextSibling;
            t.remove(), t = i
        }
    }
    setConnected(t) {
        var n;
        this._$AM === void 0 && (this._$Cp = t, (n = this._$AP) === null || n === void 0 || n.call(this, t))
    }
}
class sn {
    constructor(t, n, o, i, s) {
        this.type = 1, this._$AH = ve, this._$AN = void 0, this.element = t, this.name = n, this._$AM = i, this.options = s, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String), this.strings = o) : this._$AH = ve
    }
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t, n = this, o, i) {
        const s = this.strings;
        let r = !1;
        if (s === void 0) t = gt(this, t, n, 0), r = !Qt(t) || t !== this._$AH && t !== Re, r && (this._$AH = t);
        else {
            const l = t;
            let a, u;
            for (t = s[0], a = 0; a < s.length - 1; a++) u = gt(this, l[o + a], n, a), u === Re && (u = this._$AH[a]), r || (r = !Qt(u) || u !== this._$AH[a]), u === ve ? t = ve : t !== ve && (t += (u ?? "") + s[a + 1]), this._$AH[a] = u
        }
        r && !i && this.j(t)
    }
    j(t) {
        t === ve ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "")
    }
}
class ts extends sn {
    constructor() {
        super(...arguments), this.type = 3
    }
    j(t) {
        this.element[this.name] = t === ve ? void 0 : t
    }
}
const Zr = It ? It.emptyScript : "";
class ns extends sn {
    constructor() {
        super(...arguments), this.type = 4
    }
    j(t) {
        t && t !== ve ? this.element.setAttribute(this.name, Zr) : this.element.removeAttribute(this.name)
    }
}
class os extends sn {
    constructor(t, n, o, i, s) {
        super(t, n, o, i, s), this.type = 5
    }
    _$AI(t, n = this) {
        var o;
        if ((t = (o = gt(this, t, n, 0)) !== null && o !== void 0 ? o : ve) === Re) return;
        const i = this._$AH,
            s = t === ve && i !== ve || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive,
            r = t !== ve && (i === ve || s);
        s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t
    }
    handleEvent(t) {
        var n, o;
        typeof this._$AH == "function" ? this._$AH.call((o = (n = this.options) === null || n === void 0 ? void 0 : n.host) !== null && o !== void 0 ? o : this.element, t) : this._$AH.handleEvent(t)
    }
}
class is {
    constructor(t, n, o) {
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = o
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t) {
        gt(this, t)
    }
}
const Qr = {
        O: In,
        P: We,
        A: To,
        C: 1,
        M: Qi,
        L: es,
        R: Xi,
        D: gt,
        I: Lt,
        V: sn,
        H: ns,
        N: os,
        U: ts,
        F: is
    },
    ui = jn.litHtmlPolyfillSupport;
ui == null || ui(en, Lt), ((Qn = jn.litHtmlVersions) !== null && Qn !== void 0 ? Qn : jn.litHtmlVersions = []).push("2.8.0");
const el = (e, t, n) => {
    var o, i;
    const s = (o = n == null ? void 0 : n.renderBefore) !== null && o !== void 0 ? o : t;
    let r = s._$litPart$;
    if (r === void 0) {
        const l = (i = n == null ? void 0 : n.renderBefore) !== null && i !== void 0 ? i : null;
        s._$litPart$ = r = new Lt(t.insertBefore(Zt(), l), l, void 0, n ?? {})
    }
    return r._$AI(e), r
};
var to, no;
let ot = class extends kt {
    constructor() {
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0
    }
    createRenderRoot() {
        var t, n;
        const o = super.createRenderRoot();
        return (t = (n = this.renderOptions).renderBefore) !== null && t !== void 0 || (n.renderBefore = o.firstChild), o
    }
    update(t) {
        const n = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = el(n, this.renderRoot, this.renderOptions)
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0)
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1)
    }
    render() {
        return Re
    }
};
ot.finalized = !0, ot._$litElement$ = !0, (to = globalThis.litElementHydrateSupport) === null || to === void 0 || to.call(globalThis, {
    LitElement: ot
});
const di = globalThis.litElementPolyfillSupport;
di == null || di({
    LitElement: ot
});
((no = globalThis.litElementVersions) !== null && no !== void 0 ? no : globalThis.litElementVersions = []).push("3.3.3");
const Dn = e => t => typeof t == "function" ? ((n, o) => (customElements.define(n, o), o))(e, t) : ((n, o) => {
    const {
        kind: i,
        elements: s
    } = o;
    return {
        kind: i,
        elements: s,
        finisher(r) {
            customElements.define(n, r)
        }
    }
})(e, t);
const tl = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? {
        ...t,
        finisher(n) {
            n.createProperty(t.key, e)
        }
    } : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: t.key,
        initializer() {
            typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this))
        },
        finisher(n) {
            n.createProperty(t.key, e)
        }
    },
    nl = (e, t, n) => {
        t.constructor.createProperty(n, e)
    };

function be(e) {
    return (t, n) => n !== void 0 ? nl(e, t, n) : tl(e, t)
}

function rt(e) {
    return be({
        ...e,
        state: !0
    })
}
var oo;
((oo = window.HTMLSlotElement) === null || oo === void 0 ? void 0 : oo.prototype.assignedElements) != null;
const Be = {
        ATTRIBUTE: 1,
        CHILD: 2,
        PROPERTY: 3,
        BOOLEAN_ATTRIBUTE: 4,
        EVENT: 5,
        ELEMENT: 6
    },
    rn = e => (...t) => ({
        _$litDirective$: e,
        values: t
    });
class ln {
    constructor(t) {}
    get _$AU() {
        return this._$AM._$AU
    }
    _$AT(t, n, o) {
        this._$Ct = t, this._$AM = n, this._$Ci = o
    }
    _$AS(t, n) {
        return this.update(t, n)
    }
    update(t, n) {
        return this.render(...n)
    }
}
const {
    I: ol
} = Qr, ss = e => e.strings === void 0, fi = () => document.createComment(""), zt = (e, t, n) => {
    var o;
    const i = e._$AA.parentNode,
        s = t === void 0 ? e._$AB : t._$AA;
    if (n === void 0) {
        const r = i.insertBefore(fi(), s),
            l = i.insertBefore(fi(), s);
        n = new ol(r, l, e, e.options)
    } else {
        const r = n._$AB.nextSibling,
            l = n._$AM,
            a = l !== e;
        if (a) {
            let u;
            (o = n._$AQ) === null || o === void 0 || o.call(n, e), n._$AM = e, n._$AP !== void 0 && (u = e._$AU) !== l._$AU && n._$AP(u)
        }
        if (r !== s || a) {
            let u = n._$AA;
            for (; u !== r;) {
                const c = u.nextSibling;
                i.insertBefore(u, s), u = c
            }
        }
    }
    return n
}, ct = (e, t, n = e) => (e._$AI(t, n), e), il = {}, rs = (e, t = il) => e._$AH = t, sl = e => e._$AH, io = e => {
    var t;
    (t = e._$AP) === null || t === void 0 || t.call(e, !1, !0);
    let n = e._$AA;
    const o = e._$AB.nextSibling;
    for (; n !== o;) {
        const i = n.nextSibling;
        n.remove(), n = i
    }
};
const pi = (e, t, n) => {
        const o = new Map;
        for (let i = t; i <= n; i++) o.set(e[i], i);
        return o
    },
    rl = rn(class extends ln {
        constructor(e) {
            if (super(e), e.type !== Be.CHILD) throw Error("repeat() can only be used in text expressions")
        }
        ct(e, t, n) {
            let o;
            n === void 0 ? n = t : t !== void 0 && (o = t);
            const i = [],
                s = [];
            let r = 0;
            for (const l of e) i[r] = o ? o(l, r) : r, s[r] = n(l, r), r++;
            return {
                values: s,
                keys: i
            }
        }
        render(e, t, n) {
            return this.ct(e, t, n).values
        }
        update(e, [t, n, o]) {
            var i;
            const s = sl(e),
                {
                    values: r,
                    keys: l
                } = this.ct(t, n, o);
            if (!Array.isArray(s)) return this.ut = l, r;
            const a = (i = this.ut) !== null && i !== void 0 ? i : this.ut = [],
                u = [];
            let c, p, h = 0,
                d = s.length - 1,
                f = 0,
                m = r.length - 1;
            for (; h <= d && f <= m;)
                if (s[h] === null) h++;
                else if (s[d] === null) d--;
            else if (a[h] === l[f]) u[f] = ct(s[h], r[f]), h++, f++;
            else if (a[d] === l[m]) u[m] = ct(s[d], r[m]), d--, m--;
            else if (a[h] === l[m]) u[m] = ct(s[h], r[m]), zt(e, u[m + 1], s[h]), h++, m--;
            else if (a[d] === l[f]) u[f] = ct(s[d], r[f]), zt(e, s[h], s[d]), d--, f++;
            else if (c === void 0 && (c = pi(l, f, m), p = pi(a, h, d)), c.has(a[h]))
                if (c.has(a[d])) {
                    const w = p.get(l[f]),
                        $ = w !== void 0 ? s[w] : null;
                    if ($ === null) {
                        const b = zt(e, s[h]);
                        ct(b, r[f]), u[f] = b
                    } else u[f] = ct($, r[f]), zt(e, s[h], $), s[w] = null;
                    f++
                } else io(s[d]), d--;
            else io(s[h]), h++;
            for (; f <= m;) {
                const w = zt(e, u[m + 1]);
                ct(w, r[f]), u[f++] = w
            }
            for (; h <= d;) {
                const w = s[h++];
                w !== null && io(w)
            }
            return this.ut = l, rs(e, u), Re
        }
    });
const ll = rn(class extends ln {
    constructor(e) {
        if (super(e), e.type !== Be.PROPERTY && e.type !== Be.ATTRIBUTE && e.type !== Be.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
        if (!ss(e)) throw Error("`live` bindings can only contain a single expression")
    }
    render(e) {
        return e
    }
    update(e, [t]) {
        if (t === Re || t === ve) return t;
        const n = e.element,
            o = e.name;
        if (e.type === Be.PROPERTY) {
            if (t === n[o]) return Re
        } else if (e.type === Be.BOOLEAN_ATTRIBUTE) {
            if (!!t === n.hasAttribute(o)) return Re
        } else if (e.type === Be.ATTRIBUTE && n.getAttribute(o) === t + "") return Re;
        return rs(e), t
    }
});
const Wt = (e, t) => {
        var n, o;
        const i = e._$AN;
        if (i === void 0) return !1;
        for (const s of i)(o = (n = s)._$AO) === null || o === void 0 || o.call(n, t, !1), Wt(s, t);
        return !0
    },
    Nn = e => {
        let t, n;
        do {
            if ((t = e._$AM) === void 0) break;
            n = t._$AN, n.delete(e), e = t
        } while ((n == null ? void 0 : n.size) === 0)
    },
    ls = e => {
        for (let t; t = e._$AM; e = t) {
            let n = t._$AN;
            if (n === void 0) t._$AN = n = new Set;
            else if (n.has(e)) break;
            n.add(e), ul(t)
        }
    };

function al(e) {
    this._$AN !== void 0 ? (Nn(this), this._$AM = e, ls(this)) : this._$AM = e
}

function cl(e, t = !1, n = 0) {
    const o = this._$AH,
        i = this._$AN;
    if (i !== void 0 && i.size !== 0)
        if (t)
            if (Array.isArray(o))
                for (let s = n; s < o.length; s++) Wt(o[s], !1), Nn(o[s]);
            else o != null && (Wt(o, !1), Nn(o));
    else Wt(this, e)
}
const ul = e => {
    var t, n, o, i;
    e.type == Be.CHILD && ((t = (o = e)._$AP) !== null && t !== void 0 || (o._$AP = cl), (n = (i = e)._$AQ) !== null && n !== void 0 || (i._$AQ = al))
};
class dl extends ln {
    constructor() {
        super(...arguments), this._$AN = void 0
    }
    _$AT(t, n, o) {
        super._$AT(t, n, o), ls(this), this.isConnected = t._$AU
    }
    _$AO(t, n = !0) {
        var o, i;
        t !== this.isConnected && (this.isConnected = t, t ? (o = this.reconnected) === null || o === void 0 || o.call(this) : (i = this.disconnected) === null || i === void 0 || i.call(this)), n && (Wt(this, t), Nn(this))
    }
    setValue(t) {
        if (ss(this._$Ct)) this._$Ct._$AI(t, this);
        else {
            const n = [...this._$Ct._$AH];
            n[this._$Ci] = t, this._$Ct._$AI(n, this, 0)
        }
    }
    disconnected() {}
    reconnected() {}
}
const as = () => new fl;
let fl = class {};
const so = new WeakMap,
    cs = rn(class extends dl {
        render(e) {
            return ve
        }
        update(e, [t]) {
            var n;
            const o = t !== this.G;
            return o && this.G !== void 0 && this.ot(void 0), (o || this.rt !== this.lt) && (this.G = t, this.dt = (n = e.options) === null || n === void 0 ? void 0 : n.host, this.ot(this.lt = e.element)), ve
        }
        ot(e) {
            var t;
            if (typeof this.G == "function") {
                const n = (t = this.dt) !== null && t !== void 0 ? t : globalThis;
                let o = so.get(n);
                o === void 0 && (o = new WeakMap, so.set(n, o)), o.get(this.G) !== void 0 && this.G.call(this.dt, void 0), o.set(this.G, e), e !== void 0 && this.G.call(this.dt, e)
            } else this.G.value = e
        }
        get rt() {
            var e, t, n;
            return typeof this.G == "function" ? (t = so.get((e = this.dt) !== null && e !== void 0 ? e : globalThis)) === null || t === void 0 ? void 0 : t.get(this.G) : (n = this.G) === null || n === void 0 ? void 0 : n.value
        }
        disconnected() {
            this.rt === this.lt && this.ot(void 0)
        }
        reconnected() {
            this.ot(this.lt)
        }
    });
const ko = rn(class extends ln {
    constructor(e) {
        var t;
        if (super(e), e.type !== Be.ATTRIBUTE || e.name !== "class" || ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")
    }
    render(e) {
        return " " + Object.keys(e).filter(t => e[t]).join(" ") + " "
    }
    update(e, [t]) {
        var n, o;
        if (this.it === void 0) {
            this.it = new Set, e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter(s => s !== "")));
            for (const s in t) t[s] && !(!((n = this.nt) === null || n === void 0) && n.has(s)) && this.it.add(s);
            return this.render(t)
        }
        const i = e.element.classList;
        this.it.forEach(s => {
            s in t || (i.remove(s), this.it.delete(s))
        });
        for (const s in t) {
            const r = !!t[s];
            r === this.it.has(s) || !((o = this.nt) === null || o === void 0) && o.has(s) || (r ? (i.add(s), this.it.add(s)) : (i.remove(s), this.it.delete(s)))
        }
        return Re
    }
});
var an = function (e, t, n, o) {
    var i = arguments.length,
        s = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o,
        r;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(e, t, n, o);
    else
        for (var l = e.length - 1; l >= 0; l--)(r = e[l]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, n, s) : r(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s
};
let vt = class extends ot {
    constructor() {
        super(...arguments), this.placeholder = "", this.hideBreadcrumbs = !1, this.breadcrumbHome = "Home", this.breadcrumbs = [], this._inputRef = as()
    }
    render() {
        let t = "";
        if (!this.hideBreadcrumbs) {
            const n = [];
            for (const o of this.breadcrumbs) n.push(Pe `<button tabindex="-1" @click="${()=>this.selectParent(o)}" class="breadcrumb">${o}</button>`);
            t = Pe `<div class="breadcrumb-list"><button tabindex="-1" @click="${()=>this.selectParent()}" class="breadcrumb">${this.breadcrumbHome}</button> ${n}</div>`
        }
        return Pe `${t}<div part="ninja-input-wrapper" class="search-wrapper"><input part="ninja-input" type="text" id="search" spellcheck="false" autocomplete="off" @input="${this._handleInput}" ${cs(this._inputRef)} placeholder="${this.placeholder}" class="search"></div>`
    }
    setSearch(t) {
        this._inputRef.value && (this._inputRef.value.value = t)
    }
    focusSearch() {
        requestAnimationFrame(() => this._inputRef.value.focus())
    }
    _handleInput(t) {
        const n = t.target;
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                search: n.value
            },
            bubbles: !1,
            composed: !1
        }))
    }
    selectParent(t) {
        this.dispatchEvent(new CustomEvent("setParent", {
            detail: {
                parent: t
            },
            bubbles: !0,
            composed: !0
        }))
    }
    firstUpdated() {
        this.focusSearch()
    }
    _close() {
        this.dispatchEvent(new CustomEvent("close", {
            bubbles: !0,
            composed: !0
        }))
    }
};
vt.styles = zn `:host{flex:1;position:relative}.search{padding:1.25em;flex-grow:1;flex-shrink:0;margin:0;border:none;appearance:none;font-size:1.125em;background:0 0;caret-color:var(--ninja-accent-color);color:var(--ninja-text-color);outline:0;font-family:var(--ninja-font-family)}.search::placeholder{color:var(--ninja-placeholder-color)}.breadcrumb-list{padding:1em 4em 0 1em;display:flex;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:initial}.breadcrumb{background:var(--ninja-secondary-background-color);text-align:center;line-height:1.2em;border-radius:var(--ninja-key-border-radius);border:0;cursor:pointer;padding:.1em .5em;color:var(--ninja-secondary-text-color);margin-right:.5em;outline:0;font-family:var(--ninja-font-family)}.search-wrapper{display:flex;border-bottom:var(--ninja-separate-border)}`;
an([be()], vt.prototype, "placeholder", void 0);
an([be({
    type: Boolean
})], vt.prototype, "hideBreadcrumbs", void 0);
an([be()], vt.prototype, "breadcrumbHome", void 0);
an([be({
    type: Array
})], vt.prototype, "breadcrumbs", void 0);
vt = an([Dn("ninja-header")], vt);
class xo extends ln {
    constructor(t) {
        if (super(t), this.et = ve, t.type !== Be.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings")
    }
    render(t) {
        if (t === ve || t == null) return this.ft = void 0, this.et = t;
        if (t === Re) return t;
        if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
        if (t === this.et) return this.ft;
        this.et = t;
        const n = [t];
        return n.raw = n, this.ft = {
            _$litType$: this.constructor.resultType,
            strings: n,
            values: []
        }
    }
}
xo.directiveName = "unsafeHTML", xo.resultType = 1;
const pl = rn(xo);

function* hl(e, t) {
    const n = typeof t == "function";
    if (e !== void 0) {
        let o = -1;
        for (const i of e) o > -1 && (yield n ? t(o) : t), o++, yield i
    }
}

function ml(e, t, n, o) {
    var i = arguments.length,
        s = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o,
        r;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(e, t, n, o);
    else
        for (var l = e.length - 1; l >= 0; l--)(r = e[l]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, n, s) : r(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s
}
const gl = zn `:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:400;font-style:normal;font-size:var(--mdc-icon-size,24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;
let So = class extends ot {
    render() {
        return Pe `<span><slot></slot></span>`
    }
};
So.styles = [gl];
So = ml([Dn("mwc-icon")], So);
var Fn = function (e, t, n, o) {
    var i = arguments.length,
        s = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o,
        r;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(e, t, n, o);
    else
        for (var l = e.length - 1; l >= 0; l--)(r = e[l]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, n, s) : r(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s
};
let Nt = class extends ot {
    constructor() {
        super(), this.selected = !1, this.hotKeysJoinedView = !0, this.addEventListener("click", this.click)
    }
    ensureInView() {
        requestAnimationFrame(() => this.scrollIntoView({
            block: "nearest"
        }))
    }
    click() {
        this.dispatchEvent(new CustomEvent("actionsSelected", {
            detail: this.action,
            bubbles: !0,
            composed: !0
        }))
    }
    updated(t) {
        t.has("selected") && this.selected && this.ensureInView()
    }
    render() {
        let t;
        this.action.mdIcon ? t = Pe `<mwc-icon part="ninja-icon" class="ninja-icon">${this.action.mdIcon}</mwc-icon>` : this.action.icon && (t = pl(this.action.icon || ""));
        let n;
        this.action.hotkey && (this.hotKeysJoinedView ? n = this.action.hotkey.split(",").map(i => {
            const s = i.split("+"),
                r = Pe `${hl(s.map(l=>Pe`<kbd>${l}</kbd>`),"+")}`;
            return Pe `<div class="ninja-hotkey ninja-hotkeys">${r}</div>`
        }) : n = this.action.hotkey.split(",").map(i => {
            const r = i.split("+").map(l => Pe `<kbd class="ninja-hotkey">${l}</kbd>`);
            return Pe `<kbd class="ninja-hotkeys">${r}</kbd>`
        }));
        const o = {
            selected: this.selected,
            "ninja-action": !0
        };
        return Pe `<div class="ninja-action" part="ninja-action ${this.selected?"ninja-selected":""}" class="${ko(o)}">${t}<div class="ninja-title">${this.action.title}</div>${n}</div>`
    }
};
Nt.styles = zn `:host{display:flex;width:100%}.ninja-action{padding:.75em 1em;display:flex;border-left:2px solid transparent;align-items:center;justify-content:start;outline:0;transition:color 0s ease 0s;width:100%}.ninja-action.selected{cursor:pointer;color:var(--ninja-selected-text-color);background-color:var(--ninja-selected-background);border-left:2px solid var(--ninja-accent-color);outline:0}.ninja-action.selected .ninja-icon{color:var(--ninja-selected-text-color)}.ninja-icon{font-size:var(--ninja-icon-size);max-width:var(--ninja-icon-size);max-height:var(--ninja-icon-size);margin-right:1em;color:var(--ninja-icon-color);margin-right:1em;position:relative}.ninja-title{flex-shrink:.01;margin-right:.5em;flex-grow:1;font-size:.8125em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ninja-hotkeys{flex-shrink:0;width:min-content;display:flex}.ninja-hotkeys kbd{font-family:inherit}.ninja-hotkey{background:var(--ninja-secondary-background-color);padding:.06em .25em;border-radius:var(--ninja-key-border-radius);text-transform:capitalize;color:var(--ninja-secondary-text-color);font-size:.75em;font-family:inherit}.ninja-hotkey+.ninja-hotkey{margin-left:.5em}.ninja-hotkeys+.ninja-hotkeys{margin-left:1em}`;
Fn([be({
    type: Object
})], Nt.prototype, "action", void 0);
Fn([be({
    type: Boolean
})], Nt.prototype, "selected", void 0);
Fn([be({
    type: Boolean
})], Nt.prototype, "hotKeysJoinedView", void 0);
Nt = Fn([Dn("ninja-action")], Nt);
const vl = Pe `<div class="modal-footer" slot="footer"><span class="help"><svg version="1.0" class="ninja-examplekey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1280"><path d="M1013 376c0 73.4-.4 113.3-1.1 120.2a159.9 159.9 0 0 1-90.2 127.3c-20 9.6-36.7 14-59.2 15.5-7.1.5-121.9.9-255 1h-242l95.5-95.5 95.5-95.5-38.3-38.2-38.2-38.3-160 160c-88 88-160 160.4-160 161 0 .6 72 73 160 161l160 160 38.2-38.3 38.3-38.2-95.5-95.5-95.5-95.5h251.1c252.9 0 259.8-.1 281.4-3.6 72.1-11.8 136.9-54.1 178.5-116.4 8.6-12.9 22.6-40.5 28-55.4 4.4-12 10.7-36.1 13.1-50.6 1.6-9.6 1.8-21 2.1-132.8l.4-122.2H1013v110z"/></svg> to select </span><span class="help"><svg xmlns="http://www.w3.org/2000/svg" class="ninja-examplekey" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" class="ninja-examplekey" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg> to navigate </span><span class="help"><span class="ninja-examplekey esc">esc</span> to close </span><span class="help"><svg xmlns="http://www.w3.org/2000/svg" class="ninja-examplekey backspace" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd"/></svg> move to parent</span></div>`,
    yl = zn `:host{--ninja-width:640px;--ninja-backdrop-filter:none;--ninja-overflow-background:rgba(255, 255, 255, 0.5);--ninja-text-color:rgb(60, 65, 73);--ninja-font-size:16px;--ninja-top:20%;--ninja-key-border-radius:0.25em;--ninja-accent-color:rgb(110, 94, 210);--ninja-secondary-background-color:rgb(239, 241, 244);--ninja-secondary-text-color:rgb(107, 111, 118);--ninja-selected-background:rgb(248, 249, 251);--ninja-icon-color:var(--ninja-secondary-text-color);--ninja-icon-size:1.2em;--ninja-separate-border:1px solid var(--ninja-secondary-background-color);--ninja-modal-background:#fff;--ninja-modal-shadow:rgb(0 0 0 / 50%) 0px 16px 70px;--ninja-actions-height:300px;--ninja-group-text-color:rgb(144, 149, 157);--ninja-footer-background:rgba(242, 242, 242, 0.4);--ninja-placeholder-color:#8e8e8e;font-size:var(--ninja-font-size);--ninja-z-index:1}:host(.dark){--ninja-backdrop-filter:none;--ninja-overflow-background:rgba(0, 0, 0, 0.7);--ninja-text-color:#7d7d7d;--ninja-modal-background:rgba(17, 17, 17, 0.85);--ninja-accent-color:rgb(110, 94, 210);--ninja-secondary-background-color:rgba(51, 51, 51, 0.44);--ninja-secondary-text-color:#888;--ninja-selected-text-color:#eaeaea;--ninja-selected-background:rgba(51, 51, 51, 0.44);--ninja-icon-color:var(--ninja-secondary-text-color);--ninja-separate-border:1px solid var(--ninja-secondary-background-color);--ninja-modal-shadow:0 16px 70px rgba(0, 0, 0, 0.2);--ninja-group-text-color:rgb(144, 149, 157);--ninja-footer-background:rgba(30, 30, 30, 85%)}.modal{display:none;position:fixed;z-index:var(--ninja-z-index);left:0;top:0;width:100%;height:100%;overflow:auto;background:var(--ninja-overflow-background);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-backdrop-filter:var(--ninja-backdrop-filter);backdrop-filter:var(--ninja-backdrop-filter);text-align:left;color:var(--ninja-text-color);font-family:var(--ninja-font-family)}.modal.visible{display:block}.modal-content{position:relative;top:var(--ninja-top);margin:auto;padding:0;display:flex;flex-direction:column;flex-shrink:1;-webkit-box-flex:1;flex-grow:1;min-width:0;will-change:transform;background:var(--ninja-modal-background);border-radius:.5em;box-shadow:var(--ninja-modal-shadow);max-width:var(--ninja-width);overflow:hidden}.bump{animation:zoom-in-zoom-out .2s ease}@keyframes zoom-in-zoom-out{0%{transform:scale(.99)}50%{transform:scale(1.01,1.01)}100%{transform:scale(1,1)}}.ninja-github{color:var(--ninja-keys-text-color);font-weight:400;text-decoration:none}.actions-list{max-height:var(--ninja-actions-height);overflow:auto;scroll-behavior:smooth;position:relative;margin:0;padding:.5em 0;list-style:none;scroll-behavior:smooth}.group-header{height:1.375em;line-height:1.375em;padding-left:1.25em;padding-top:.5em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;font-size:.75em;line-height:1em;color:var(--ninja-group-text-color);margin:1px 0}.modal-footer{background:var(--ninja-footer-background);padding:.5em 1em;display:flex;border-top:var(--ninja-separate-border);color:var(--ninja-secondary-text-color)}.modal-footer .help{display:flex;margin-right:1em;align-items:center;font-size:.75em}.ninja-examplekey{background:var(--ninja-secondary-background-color);padding:.06em .25em;border-radius:var(--ninja-key-border-radius);color:var(--ninja-secondary-text-color);width:1em;height:1em;margin-right:.5em;font-size:1.25em;fill:currentColor}.ninja-examplekey.esc{width:auto;height:auto;font-size:1.1em}.ninja-examplekey.backspace{opacity:.7}`;
var we = function (e, t, n, o) {
    var i = arguments.length,
        s = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o,
        r;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(e, t, n, o);
    else
        for (var l = e.length - 1; l >= 0; l--)(r = e[l]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, n, s) : r(t, n)) || s);
    return i > 3 && s && Object.defineProperty(t, n, s), s
};
let _e = class extends ot {
    constructor() {
        super(...arguments), this.placeholder = "Type a command or search...", this.disableHotkeys = !1, this.hideBreadcrumbs = !1, this.openHotkey = "cmd+k,ctrl+k", this.navigationUpHotkey = "up,shift+tab", this.navigationDownHotkey = "down,tab", this.closeHotkey = "esc", this.goBackHotkey = "backspace", this.selectHotkey = "enter", this.hotKeysJoinedView = !1, this.noAutoLoadMdIcons = !1, this.data = [], this.visible = !1, this._bump = !0, this._actionMatches = [], this._search = "", this._flatData = [], this._headerRef = as()
    }
    open(t = {}) {
        this._bump = !0, this.visible = !0, this._headerRef.value.focusSearch(), this._actionMatches.length > 0 && (this._selected = this._actionMatches[0]), this.setParent(t.parent)
    }
    close() {
        this._bump = !1, this.visible = !1
    }
    setParent(t) {
        t ? this._currentRoot = t : this._currentRoot = void 0, this._selected = void 0, this._search = "", this._headerRef.value.setSearch("")
    }
    get breadcrumbs() {
        var t;
        const n = [];
        let o = (t = this._selected) === null || t === void 0 ? void 0 : t.parent;
        if (o)
            for (n.push(o); o;) {
                const i = this._flatData.find(s => s.id === o);
                i != null && i.parent && n.push(i.parent), o = i ? i.parent : void 0
            }
        return n.reverse()
    }
    connectedCallback() {
        super.connectedCallback(), this.noAutoLoadMdIcons || document.fonts.load("24px Material Icons", "apps").then(() => {}), this._registerInternalHotkeys()
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._unregisterInternalHotkeys()
    }
    _flattern(t, n) {
        let o = [];
        return t || (t = []), t.map(i => {
            const s = i.children && i.children.some(l => typeof l == "string"),
                r = {
                    ...i,
                    parent: i.parent || n
                };
            return s || (r.children && r.children.length && (n = i.id, o = [...o, ...r.children]), r.children = r.children ? r.children.map(l => l.id) : []), r
        }).concat(o.length ? this._flattern(o, n) : o)
    }
    update(t) {
        t.has("data") && !this.disableHotkeys && (this._flatData = this._flattern(this.data), this._flatData.filter(n => !!n.hotkey).forEach(n => {
            ge(n.hotkey, o => {
                o.preventDefault(), n.handler && n.handler(n)
            })
        })), super.update(t)
    }
    _registerInternalHotkeys() {
        this.openHotkey && ge(this.openHotkey, t => {
            t.preventDefault(), this.visible ? this.close() : this.open()
        }), this.selectHotkey && ge(this.selectHotkey, t => {
            this.visible && (t.preventDefault(), this._actionSelected(this._actionMatches[this._selectedIndex]))
        }), this.goBackHotkey && ge(this.goBackHotkey, t => {
            this.visible && (this._search || (t.preventDefault(), this._goBack()))
        }), this.navigationDownHotkey && ge(this.navigationDownHotkey, t => {
            this.visible && (t.preventDefault(), this._selectedIndex >= this._actionMatches.length - 1 ? this._selected = this._actionMatches[0] : this._selected = this._actionMatches[this._selectedIndex + 1])
        }), this.navigationUpHotkey && ge(this.navigationUpHotkey, t => {
            this.visible && (t.preventDefault(), this._selectedIndex === 0 ? this._selected = this._actionMatches[this._actionMatches.length - 1] : this._selected = this._actionMatches[this._selectedIndex - 1])
        }), this.closeHotkey && ge(this.closeHotkey, () => {
            this.visible && this.close()
        })
    }
    _unregisterInternalHotkeys() {
        this.openHotkey && ge.unbind(this.openHotkey), this.selectHotkey && ge.unbind(this.selectHotkey), this.goBackHotkey && ge.unbind(this.goBackHotkey), this.navigationDownHotkey && ge.unbind(this.navigationDownHotkey), this.navigationUpHotkey && ge.unbind(this.navigationUpHotkey), this.closeHotkey && ge.unbind(this.closeHotkey)
    }
    _actionFocused(t, n) {
        this._selected = t, n.target.ensureInView()
    }
    _onTransitionEnd() {
        this._bump = !1
    }
    _goBack() {
        const t = this.breadcrumbs.length > 1 ? this.breadcrumbs[this.breadcrumbs.length - 2] : void 0;
        this.setParent(t)
    }
    render() {
        const t = {
                bump: this._bump,
                "modal-content": !0
            },
            n = {
                visible: this.visible,
                modal: !0
            },
            i = this._flatData.filter(l => {
                var a;
                const u = new RegExp(this._search, "gi"),
                    c = l.title.match(u) || ((a = l.keywords) === null || a === void 0 ? void 0 : a.match(u));
                return (!this._currentRoot && this._search || l.parent === this._currentRoot) && c
            }).reduce((l, a) => l.set(a.section, [...l.get(a.section) || [], a]), new Map);
        this._actionMatches = [...i.values()].flat(), this._actionMatches.length > 0 && this._selectedIndex === -1 && (this._selected = this._actionMatches[0]), this._actionMatches.length === 0 && (this._selected = void 0);
        const s = l => Pe `${rl(l,a=>a.id,a=>{var u;return Pe`<ninja-action exportparts="ninja-action,ninja-selected,ninja-icon" .selected="${ll(a.id===((u=this._selected)===null||u===void 0?void 0:u.id))}" .hotKeysJoinedView="${this.hotKeysJoinedView}" @mouseover="${c=>this._actionFocused(a,c)}" @actionsSelected="${c=>this._actionSelected(c.detail)}" .action="${a}"></ninja-action>`})}`,
            r = [];
        return i.forEach((l, a) => {
            const u = a ? Pe `<div class="group-header">${a}</div>` : void 0;
            r.push(Pe `${u}${s(l)}`)
        }), Pe `<div @click="${this._overlayClick}" class="${ko(n)}"><div class="${ko(t)}" @animationend="${this._onTransitionEnd}"><ninja-header exportparts="ninja-input,ninja-input-wrapper" ${cs(this._headerRef)} .placeholder="${this.placeholder}" .hideBreadcrumbs="${this.hideBreadcrumbs}" .breadcrumbs="${this.breadcrumbs}" @change="${this._handleInput}" @setParent="${l=>this.setParent(l.detail.parent)}" @close="${this.close}"></ninja-header><div class="modal-body"><div class="actions-list" part="actions-list">${r}</div></div><slot name="footer">${vl}</slot></div></div>`
    }
    get _selectedIndex() {
        return this._selected ? this._actionMatches.indexOf(this._selected) : -1
    }
    _actionSelected(t) {
        var n;
        if (this.dispatchEvent(new CustomEvent("selected", {
                detail: {
                    search: this._search,
                    action: t
                },
                bubbles: !0,
                composed: !0
            })), !!t) {
            if (t.children && ((n = t.children) === null || n === void 0 ? void 0 : n.length) > 0 && (this._currentRoot = t.id, this._search = ""), this._headerRef.value.setSearch(""), this._headerRef.value.focusSearch(), t.handler) {
                const o = t.handler(t);
                o != null && o.keepOpen || this.close()
            }
            this._bump = !0
        }
    }
    async _handleInput(t) {
        this._search = t.detail.search, await this.updateComplete, this.dispatchEvent(new CustomEvent("change", {
            detail: {
                search: this._search,
                actions: this._actionMatches
            },
            bubbles: !0,
            composed: !0
        }))
    }
    _overlayClick(t) {
        var n;
        !((n = t.target) === null || n === void 0) && n.classList.contains("modal") && this.close()
    }
};
_e.styles = [yl];
we([be({
    type: String
})], _e.prototype, "placeholder", void 0);
we([be({
    type: Boolean
})], _e.prototype, "disableHotkeys", void 0);
we([be({
    type: Boolean
})], _e.prototype, "hideBreadcrumbs", void 0);
we([be()], _e.prototype, "openHotkey", void 0);
we([be()], _e.prototype, "navigationUpHotkey", void 0);
we([be()], _e.prototype, "navigationDownHotkey", void 0);
we([be()], _e.prototype, "closeHotkey", void 0);
we([be()], _e.prototype, "goBackHotkey", void 0);
we([be()], _e.prototype, "selectHotkey", void 0);
we([be({
    type: Boolean
})], _e.prototype, "hotKeysJoinedView", void 0);
we([be({
    type: Boolean
})], _e.prototype, "noAutoLoadMdIcons", void 0);
we([be({
    type: Array,
    hasChanged() {
        return !0
    }
})], _e.prototype, "data", void 0);
we([rt()], _e.prototype, "visible", void 0);
we([rt()], _e.prototype, "_bump", void 0);
we([rt()], _e.prototype, "_actionMatches", void 0);
we([rt()], _e.prototype, "_search", void 0);
we([rt()], _e.prototype, "_currentRoot", void 0);
we([rt()], _e.prototype, "_flatData", void 0);
we([rt()], _e.prototype, "breadcrumbs", null);
we([rt()], _e.prototype, "_selected", void 0);
_e = we([Dn("ninja-keys")], _e);
var _l = S("<ninja-keys>", !0, !1);
const $l = e => (() => {
        var t = _l();
        return t._$owner = gs(), F(n => {
            var o = e.hotkeys,
                i = e.placeholder,
                s = e.disableHotkeys,
                r = e.hideBreadcrumbs,
                l = e.openHotkey,
                a = e.navigationUpHotkey,
                u = e.navigationDownHotkey,
                c = e.closeHotkey,
                p = e.goBackHotkey,
                h = e.selectHotkey,
                d = e.hotKeysJoinedView,
                f = e.noAutoLoadMdIcons,
                m = e.isDark ? "dark" : "light";
            return o !== n.e && (t.data = n.e = o), i !== n.t && (t.placeholder = n.t = i), s !== n.a && (t.disablehotkeys = n.a = s), r !== n.o && (t.hidebreadcrumbs = n.o = r), l !== n.i && (t.openhotkey = n.i = l), a !== n.n && (t.navigationuphotkey = n.n = a), u !== n.s && (t.navigationdownhotkey = n.s = u), c !== n.h && (t.closehotkey = n.h = c), p !== n.r && (t.gobackhotkey = n.r = p), h !== n.d && (t.selecthotkey = n.d = h), d !== n.l && (t.hotkeysjoinedview = n.l = d), f !== n.u && (t.noautoloadmdicons = n.u = f), m !== n.c && Cs(t, n.c = m), n
        }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0,
            i: void 0,
            n: void 0,
            s: void 0,
            h: void 0,
            r: void 0,
            d: void 0,
            l: void 0,
            u: void 0,
            c: void 0
        }), t
    })(),
    wl = $l;

function bl() {
    let e;
    return Qe(() => {
        e = document.querySelector("ninja-keys")
    }), {
        open: i => {
            e == null || e.open(i ? {
                parent: i
            } : void 0)
        },
        close: () => {
            e == null || e.close()
        },
        setParent: i => {
            e == null || e.setParent(i)
        }
    }
}
var kl = S("<p>Click <code>Shift</code> + <code>Left Mouse Button</code> to split a link into <code>💾Set</code> / <code>Get</code>."),
    xl = S("<p>Or <code>Shift + Drag</code> to create a <code>💾Set</code> / <code>Get</code> node."),
    Sl = S("<p>Split hotkey: <code>Shift</code> + <code>S</code> (only works when nodes are selected)."),
    Al = S("<p>Join hotkey: <code>Shift</code> + <code>J</code> (only works when nodes are selected)."),
    El = S("<p>Click <code>Convert links to set/get</code> button to split all links to<code>💾Set</code> / <code>Get</code> nodes."),
    Cl = S("<p>Select specific nodes and click <code>Convert links to set/get</code> button to split related links into<code>💾Set</code> / <code>Get</code> nodes."),
    Ol = S("<p>Click <code>Convert set/get to links</code> button to join all<code>💾Set</code> / <code>Get</code> nodes into links."),
    Pl = S("<p>Select specific nodes and click <code>Convert set/get to links</code> button to join related <code>💾Set</code> / <code>Get</code> nodes into links."),
    hi = S("<p>Select a <code>💾Set</code> node and enable tweak."),
    jl = S("<p>Make sure the <code>Get</code> node is assigned to a <code>Preview Image</code> or <code>Save Image</code> node."),
    Il = S("<p>Select a node and press <code>W</code> to rename all instances."),
    Nl = S("<p>Convert the text input into a separate node.<br>Assign that node to a <code>💾Set</code> node and enable tweak."),
    Tl = S("<p>You can use your scroll wheel to increase/decrease the weight for a token or all tokens."),
    Ll = S("<p>Click the pin icon to cause the prompt tweak window to float."),
    Ml = S("<p>The position in the graph will dictate it's position in the bar."),
    Rl = S("<p>You can use the scroll wheel to change numerical values."),
    Hl = S("<p>Click the 🚦 icon in the top bar to show available groups."),
    zl = S("<p>Click a group to toggle all nodes inside it."),
    Dl = S("<p>Press <code>Shift</code> + <code>P</code> to access command palette"),
    Fl = S("<p>Select a <code>Get</code> node and press <code>S</code> to jump to it's setter position."),
    Bl = S("<p>Select a <code>💾Set</code> or <code>Get</code> node and press <code>Arrow Left</code>/<code>Arrow Right</code> to jump to it's siblings."),
    Ul = S("<p>Enable the checkbox next to the token you want to temporarily disable."),
    Gl = S("<p><code>Double Click</code> the node title to rename it."),
    Kl = S("<p>Note that this doesn't work on some special nodes."),
    Wl = S("<p>This extension overrides the default ComfyUi search allowing you to be more flexible with your search."),
    Vl = S("<p>For example <code>lo mo onl</code> will match the <code>LoraLoaderModelOnly</code> node."),
    Yl = S("<p><code>Shift</code> + <code>Double Click</code> the group title to rename it."),
    Jl = S("<p>When an error is detected, you can open the Warning panel and navigate directly to the affected node."),
    Xl = S("<p>After a node completes execution, you can view its execution time."),
    ql = S("<p><code>Shift</code> + <code>Arrow Up</code> aligns nodes to the top."),
    Zl = S("<p><code>Shift</code> + <code>Arrow Left</code> aligns nodes to the left."),
    Ql = S("<p><code>Shift</code> + <code>Arrow Down</code> stacks the nodes with an even spacing downwards."),
    ea = S("<p>If you select a <code>💾Set</code> or <code>Get</code> node it will show all connections."),
    ta = S("<p>Optionally you can change settings so that it shows connections as you hover a node. <br>Either the specific link, or all."),
    na = S("<div class=helpPopup><div class=close>❌</div><div class=header>Get Started</div><div class=modalContent><div class=help><div class=info><div class=title></div><div class=text></div></div></div><ul class=menu>"),
    oa = S("<video class=video>"),
    ia = S("<li class=help>");
const sa = e => {
    const [t, n] = ne(0), o = [{
        name: "Assign Variables",
        text: [kl(), xl()],
        video: "https://comfyui.ma.pe/help/assign.mp4"
    }, {
        name: "Split/Join Connections",
        text: [Sl(), Al(), El(), Cl(), Ol(), Pl()],
        video: "https://comfyui.ma.pe/help/splitJoin.mp4"
    }, {
        name: "Add image to image preview window",
        text: [hi(), jl()],
        video: "https://comfyui.ma.pe/help/imagePreview.mp4"
    }, {
        name: "Rename Variables",
        text: Il(),
        video: "https://comfyui.ma.pe/help/rename.mp4"
    }, {
        name: "Make prompt tweakable",
        text: [Nl(), Tl()],
        video: "https://comfyui.ma.pe/help/prompt.mp4"
    }, {
        name: "Floating prompt tweak window",
        text: Ll(),
        video: "https://comfyui.ma.pe/help/pinPromptTweak.mp4"
    }, {
        name: "Add variables to top bar",
        text: [hi(), Ml(), Rl()],
        video: "https://comfyui.ma.pe/help/tweak.mp4"
    }, {
        name: "Toggle entire groups",
        text: [Hl(), zl()],
        video: "https://comfyui.ma.pe/help/groupToggle.mp4"
    }, {
        name: "Access command palette",
        text: Dl(),
        video: "https://comfyui.ma.pe/help/command.mp4"
    }, {
        name: "Jump to Set node",
        text: Fl(),
        video: "https://comfyui.ma.pe/help/jump.mp4"
    }, {
        name: "Jump to sibling nodes",
        text: Bl(),
        video: "https://comfyui.ma.pe/help/jumpSiblings.mp4"
    }, {
        name: "Temporarily disable tokens",
        text: Ul(),
        video: "https://comfyui.ma.pe/help/tmpPrompt.mp4"
    }, {
        name: "Rename Node",
        text: [Gl(), Kl()],
        video: "https://comfyui.ma.pe/help/renameNode.mp4"
    }, {
        name: "Fuzzy Search",
        text: [Wl(), Vl()],
        video: "https://comfyui.ma.pe/help/fuzzySearch.mp4"
    }, {
        name: "Rename Group",
        text: Yl(),
        video: "https://comfyui.ma.pe/help/renameGroup.mp4"
    }, {
        name: "Warnings",
        text: Jl(),
        video: "https://comfyui.ma.pe/help/warnings.mp4"
    }, {
        name: "Node runtime",
        text: Xl(),
        video: "https://comfyui.ma.pe/help/duration.mp4"
    }, {
        name: "Organize nodes",
        text: [ql(), Zl(), Ql()],
        video: "https://comfyui.ma.pe/help/organize.mp4"
    }, {
        name: "Show connections",
        text: [ea(), ta()],
        video: "https://comfyui.ma.pe/help/connections.mp4"
    }], i = () => o[t()];
    return (() => {
        var s = na(),
            r = s.firstChild,
            l = r.nextSibling,
            a = l.nextSibling,
            u = a.firstChild,
            c = u.firstChild,
            p = c.firstChild,
            h = p.nextSibling,
            d = u.nextSibling;
        return Eo(r, "click", e.close, !0), L(u, (() => {
            var f = le(() => !!i().video);
            return () => f() ? (() => {
                var m = oa();
                return m.muted = !0, m.loop = !0, m.autoplay = !0, m.controls = !0, F(() => he(m, "src", i().video)), m
            })() : null
        })(), c), L(p, () => i().name), L(h, () => i().text), L(d, () => o.map((f, m) => (() => {
            var w = ia();
            return w.$$click = () => {
                n(m)
            }, L(w, () => f.name), F(() => w.classList.toggle("active", m === t())), w
        })())), s
    })()
};
yt(["click"]);

function ra(e, t) {
    let n = t;
    for (; n !== null;) {
        if (n === e) return !0;
        n = n.parentElement
    }
    return !1
}

function la(e) {
    return e.filter((t, n, o) => o.indexOf(t) === n)
}
var aa = S("<div class=mapeConfirmPrompt><div class=title></div><input type=text><div class=suggestions>"),
    ca = S("<div class=suggestion>");
const ua = ({
    title: e,
    position: t,
    callback: n,
    exit: o,
    fallback: i
}) => {
    const [s, r] = ne(-1);
    let l, a;
    Qe(() => {
        a.focus(), a.select()
    });
    const [u, c] = ne(""), [p] = ne(la(nn().map(m => Y(m, 0)))), h = m => {
        ra(l, m.target) || o()
    }, d = m => {
        if (m.key === "ArrowUp" || m.key === "ArrowDown") {
            m.preventDefault(), m.key === "ArrowUp" && r(s() - 1), m.key === "ArrowDown" && r(s() + 1), s() < 0 && r(0), s() > p().length - 1 && r(p().length - 1), a.select();
            return
        }
        if (m.key === "Enter") {
            s() !== -1 && c(p().filter(f)[s()]), n((u() || i) ?? "");
            return
        }
        if (m.key === "Escape") {
            o();
            return
        }
        r(-1)
    };
    Qe(() => {
        document.body.addEventListener("click", h), document.body.addEventListener("keyup", d)
    }), Vt(() => {
        document.body.removeEventListener("click", h), document.body.removeEventListener("keyup", d)
    });
    const f = m => u().trim() === "" ? !0 : m.match(new RegExp(u(), "i"));
    return (() => {
        var m = aa(),
            w = m.firstChild,
            $ = w.nextSibling,
            b = $.nextSibling,
            _ = l;
        typeof _ == "function" ? Ct(_, m) : l = m, L(w, e), $.$$keyup = x => {
            x.key !== "Shift" && c(x.currentTarget.value)
        };
        var k = a;
        return typeof k == "function" ? Ct(k, $) : a = $, he($, "placeholder", i), L(b, () => p().filter(f).map((x, j) => (() => {
            var H = ca();
            return H.$$click = () => {
                n(x)
            }, L(H, x), F(() => H.classList.toggle("selected", s() === j)), H
        })())), F(x => {
            var j = `${t.x}px`,
                H = `${t.y}px`;
            return j !== x.e && ((x.e = j) != null ? m.style.setProperty("left", j) : m.style.removeProperty("left")), H !== x.t && ((x.t = H) != null ? m.style.setProperty("top", H) : m.style.removeProperty("top")), x
        }, {
            e: void 0,
            t: void 0
        }), F(() => $.value = u()), m
    })()
};
yt(["keyup", "click"]);
const ro = () => {
        const e = document.activeElement;
        return e.tagName === "INPUT" && (e.type === "text" || e.type === "number") || e.tagName === "TEXTAREA"
    },
    da = e => {
        var s, r;
        const t = (r = (s = e.inputs) == null ? void 0 : s[0]) == null ? void 0 : r.link;
        if (!e.graph || !t) return;
        const n = Ne(t);
        if (!n) return;
        const o = n.origin_id;
        return ae(o)
    },
    fa = e => {
        var i, s, r, l, a;
        let t, n, o;
        for (const u of graph._nodes) {
            if (u.type !== Ye || Y(u) !== e || !u.graph) continue;
            const c = (s = (i = u.inputs) == null ? void 0 : i[0]) == null ? void 0 : s.link;
            if (!c) continue;
            const p = Ne(c);
            if (typeof p > "u") continue;
            const h = p.origin_id;
            if (typeof h > "u") continue;
            const d = p.origin_slot;
            if (typeof d > "u") continue;
            const f = u.graph.getNodeById(h);
            if (!f) continue;
            if (f.outputs[d] && f.outputs[d].type === "IMAGE") {
                let w;
                for (const $ of He()) {
                    if (!se($) || Y($) !== e || Ie($)) continue;
                    const b = (l = (r = $.outputs) == null ? void 0 : r[0].links) == null ? void 0 : l[0];
                    if (typeof b > "u") continue;
                    const _ = Ne(b);
                    if (!_) continue;
                    const k = _.target_id,
                        x = u.graph.getNodeById(k);
                    if (!x || !((a = x.type) != null && a.match(/(PreviewImage|SaveImage)/))) continue;
                    const j = app.nodeOutputs[x.id];
                    j && j.images ? w = nt(j.images) : w = x.images
                }
                return n = f.id, t = w, o = u.id, [w, n, o]
            }
            if (typeof f > "u" || !f.widgets) continue;
            const m = f.widgets[d];
            typeof m > "u" || (n = f.id, o = u.id, t = m.value)
        }
        return [t, n, o]
    },
    pa = e => {
        const t = fn().find(n => n.title === e);
        t && Oo([t.pos[0] + t.size[0] / 2, t.pos[1] + t.size[1] / 2], graph.list_of_graphcanvas[0])
    },
    ha = e => {
        Oo([e.pos[0] + e.size[0] / 2, e.pos[1] + e.size[1] / 2], graph.list_of_graphcanvas[0])
    },
    Dt = e => {
        for (const t of He()) t.type !== Ye || !Ie(t) || Y(t) !== e || Pt(t)
    },
    ma = () => {
        const e = nt(Object.values(_t()).filter(Boolean)),
            t = {},
            n = {};
        for (const o of He().filter(se)) {
            const i = Y(o);
            if (o.inputs[0].link) {
                const r = e.find(c => {
                    const {
                        target_id: p
                    } = c;
                    return p === o.id
                });
                if (!r) continue;
                const {
                    id: l,
                    origin_id: a,
                    origin_slot: u
                } = r;
                n[i] = {
                    id: l,
                    originId: a,
                    originSlot: u
                };
                continue
            } else {
                t[i] || (t[i] = []);
                const r = e.find(c => {
                    const {
                        origin_id: p
                    } = c;
                    return p === o.id
                });
                if (!r) continue;
                const {
                    id: l,
                    target_id: a,
                    target_slot: u
                } = r;
                t[i].push({
                    id: l,
                    targetId: a,
                    targetSlot: u
                })
            }
        }
        return {
            nodeSet: n,
            nodeGet: t
        }
    },
    ga = () => {
        var u;
        let e = [];
        const t = [],
            n = {},
            o = {},
            i = {},
            s = ma(),
            r = _t();
        for (const c of He().filter(p => !se(p))) {
            n[c.id] = c;
            let p = 0;
            if (c.inputs)
                for (let h = 0, d = c.inputs.length; h < d; h++) c.inputs[h] && c.inputs[h].link != null && (p += 1);
            p == 0 ? t.push(c) : i[c.id] = p
        }
        let l = !1;
        for (; !l;) {
            if (t.length == 0) {
                l = !0;
                break
            }
            const c = t.shift();
            if (e.push(c), delete n[c.id], !!c.outputs)
                for (let p = 0; p < c.outputs.length; p++) {
                    const h = c.outputs[p],
                        d = (u = h.links) == null ? void 0 : u.flatMap(m => {
                            const w = r[m],
                                $ = ae(w.target_id);
                            if (!$) return m;
                            if (se($)) {
                                const b = Y($);
                                return s.nodeGet[b] ? s.nodeGet[b].map(k => k.id) : m
                            }
                            return m
                        });
                    if (!(!h || !d || h == null || d == null || d.length == 0))
                        for (let m = 0; m < d.length; m++) {
                            const w = d[m],
                                $ = r[w];
                            if (!$ || o[$.id]) continue;
                            const _ = ae($.target_id);
                            if (_ == null) {
                                o[$.id] = !0;
                                continue
                            }
                            o[$.id] = !0, i[_.id] -= 1, i[_.id] === 0 && t.push(_)
                        }
                }
        }
        for (const c in n) e.push(n[c]);
        const a = e.length;
        for (let c = 0; c < a; ++c) e[c].order = c;
        e = e.sort((c, p) => {
            const h = c.constructor.priority || c.priority || 0,
                d = p.constructor.priority || p.priority || 0;
            return h === d ? c.order - p.order : h - d
        });
        for (let c = 0; c < a; ++c) e[c].order = c;
        return e
    },
    va = () => {
        const e = ga();
        let t = 50;
        for (const s of e) s.pos = [700, t], t += 10;
        const n = Math.min(...e.map(s => s.pos[1])),
            o = te("nodeAlignOffsetY");
        let i = 0;
        for (const s of e.sort((r, l) => r.pos[1] - l.pos[1])) {
            s.pos = [s.pos[0], n + i];
            const r = s.size[1] + o;
            i += r
        }
        On(e, !1), app.graph.setDirtyCanvas(!0, !0)
    },
    mi = e => {
        const [t, n, o] = e.split(".").map(parseFloat);
        return {
            major: t,
            minor: n,
            patch: o
        }
    },
    ya = (e, t) => {
        const n = mi(e),
            o = mi(t);
        return o.major > n.major || o.major === n.major && (o.minor > n.minor || o.minor === n.minor && o.patch > n.patch)
    },
    _a = e => {
        const t = document.createElement("style");
        return t.appendChild(document.createTextNode(e)), t
    },
    qe = (e, t) => {
        var n, o, i;
        for (const s of graph._nodes) {
            if (s.type !== Ye || Y(s) !== e || !s.inputs[0]) continue;
            const r = (o = (n = s.inputs) == null ? void 0 : n[0]) == null ? void 0 : o.link;
            if (r === null) continue;
            const l = Ne(r);
            if (typeof l > "u") continue;
            const a = l.origin_id;
            if (typeof a > "u") continue;
            const u = l.origin_slot;
            if (typeof u > "u" || !s.graph) continue;
            const c = s.graph.getNodeById(a);
            if (typeof c > "u") continue;
            const p = (i = c.widgets) == null ? void 0 : i[u];
            typeof p > "u" || (p.options && p.options.setValue ? typeof t == "function" ? p.options.setValue(t(p.value)) : p.options.setValue(t) : typeof t == "function" ? p.value = t(p.value) : p.value = t, app.graph.setDirtyCanvas(!0, !0), Jt())
        }
    };
var $a = S("<div class=warningsPopup><div class=close>❌</div><div class=header>Warnings</div><div class=modalContent><div class=mapeSettings>"),
    wa = S("<div class=mapeSetting><label class=name><small></small></label><button>Jump to node");
const ba = e => (() => {
    var t = $a(),
        n = t.firstChild,
        o = n.nextSibling,
        i = o.nextSibling,
        s = i.firstChild;
    return Eo(n, "click", e.close, !0), L(s, () => e.warnings.map(r => (() => {
        var l = wa(),
            a = l.firstChild,
            u = a.firstChild,
            c = a.nextSibling;
        return L(a, (() => {
            var p = le(() => !!se(r.node));
            return () => {
                var h, d;
                return p() ? Y(r.node) : `${((h=r.node)==null?void 0:h.title)??((d=r.node)==null?void 0:d.type)}: ${r.type}`
            }
        })(), u), L(u, () => r.text), c.$$click = () => {
            Pt(r.node)
        }, l
    })())), t
})();
yt(["click"]);
var ka = S('<div class="tweak numberWrapper"><label></label><div class=value><input type=number step=1>'),
    xa = S('<div class="tweak numberWrapper"><label></label><div class=value><input type=number step=0.1>'),
    Sa = S('<div class="tweak stringContainer"><label class=interactable></label><div class=value>'),
    Aa = S("<div class=moveBar><div class=moveArea><div class=name></div></div><div class=toggleFloating>📌"),
    Ea = S("<textarea>"),
    Ca = S("<input type=text>"),
    Oa = S('<div class="tweak imageContainer"><label>'),
    Pa = S("<div class=thumbnails>"),
    ja = S("<img class=fullImage>"),
    Ia = S("<div class=thumb><img class=smallImage>"),
    Na = S("<div class=missing>"),
    Ta = S("<div class=value>"),
    La = S("<div class=missingImage>?"),
    Ma = S("<div class=image>"),
    Ra = S('<div class="tweak defaultContainer"><label>'),
    Ha = S('<div class=mapeRoot><div class=mapeBar><div class=logo title=https://twitter.com/mape></div><div class=tweaks></div><div class=options><div class=groupToggle title="Toggle groups"><span>🚦</span></div><div class="warnings interact"title="Organize workflow (Hold Shift-key to skip prompt)">✨</div><div class="warnings interact">💥</div><div class="warnings interact">🩹</div><div class="imagePreview interact"title="Open separate window for image previews">🖥️<small>🎨</small></div><div class="clear interact"title="Clear favourites">❌</div><div class="settings interact"title=Settings>⚙️</div><div class="help interact"title=Help>❔</div></div></div><div>'),
    za = S("<div class=tweakHighlight>"),
    Da = S('<div class="warnings blink interact"title="Show potentially broken nodes">⚠️'),
    Fa = S('<div class="warnings blink interact">🆕'),
    Ba = S("<div class=groups>"),
    Ua = S("<div class=group><span class=groupName>No groups in workflow"),
    Ga = S("<div class=group><span class=groupName></span><input type=checkbox>");
const Ka = () => {
    const [e, t] = ne([]), [n, o] = xt({}), [i, s] = xt({}), [r, l] = xt({}), a = () => {
        const g = window.innerHeight - 200,
            y = window.innerWidth - 200;
        try {
            for (const A of Object.keys(localStorage))
                if (A.match(new RegExp(tt))) {
                    const O = localStorage[A],
                        I = A.replace(tt, ""),
                        N = JSON.parse(O);
                    N.position.x = Math.min(y, N.position.x), N.position.y = Math.min(g, N.position.y), l(I, N)
                }
        } catch {}
    };
    a(), Le(() => {
        for (const [g, y] of Object.entries(r)) localStorage[`${tt}${g}`] = JSON.stringify(y)
    });
    const [u, c] = ne([]), [p, h] = ne(!1), [d, f] = ne(!1), [m, w] = ne(!1), [$, b] = ne(""), [_, k] = ne(!!localStorage[Un]);
    Le(() => {
        _() ? (V(), localStorage[Un] = "1") : delete localStorage[Un]
    });
    const [x, j] = xt([]), H = () => {
        const g = [],
            y = {},
            A = He().filter(se);
        for (const O of A.filter(Ie)) {
            const I = Y(O);
            y[I] || (y[I] = 0), y[I] += 1;
            const N = da(O);
            if (N && se(N)) {
                const P = Y(N);
                I === P && g.push({
                    node: O,
                    text: "Can't point a set to a get of itself"
                })
            }
        }
        for (const O of A.filter(pt)) {
            const I = Y(O);
            I && typeof y[I] > "u" && g.push({
                node: O,
                text: "Missing set node"
            })
        }
        for (const O of A.filter(Ie)) {
            const I = Y(O);
            y[I] && y[I] > 1 && g.push({
                text: "Can't have multiple set nodes of the same name",
                node: O
            })
        }
        c([...window.mapeErrors ?? [], ...g])
    };
    Le(() => {
        u().length === 0 && w(!1)
    });
    const z = setInterval(H, 1e3);
    Vt(() => {
        clearInterval(z)
    });
    const R = () => {
            o(ho(Object.fromEntries(Object.entries(localStorage).filter(([g]) => g.startsWith(cn)).map(([g, y]) => {
                const A = g.replace(cn, ""),
                    [O, I, N] = fa(A),
                    P = ae(N);
                if (!P) return null;
                const G = P != null && P.pos ? [P == null ? void 0 : P.pos[0], P == null ? void 0 : P.pos[1]] : [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
                return [A, {
                    name: A,
                    type: y,
                    value: O,
                    pos: G
                }]
            }).filter(Boolean)))), localStorage[Ut] = JSON.stringify(Object.fromEntries(Object.entries(n).filter(([, g]) => g.type === "IMAGE"))), V()
        },
        V = () => {
            const g = fn();
            j(fn().sort(Ls(g, "id", "pos")).map(y => (y.recomputeInsideNodes(), y)).map(y => ({
                title: y.title,
                enabled: !!y._nodes.filter(A => !se(A)).find(A => A.mode !== 4),
                group: y
            })))
        };
    Qe(R), Qe(async () => {
        const y = (await (await fetch(`https://comfyui.ma.pe/VERSION?c=${Date.now()}`)).text()).trim();
        ya("0.4.2", y) && b(`New version ${y} is available.`)
    }), window.addEventListener("mapeTweak", g => {
        var y;
        R(), ((y = g.detail) == null ? void 0 : y.message) === "rename" && a()
    });
    const v = g => {
            const y = (g ?? 0).toString().length * 6 + 35;
            return `${Math.max(55,y)}px`
        },
        C = {
            INT: g => (() => {
                var y = ka(),
                    A = y.firstChild,
                    O = A.nextSibling,
                    I = O.firstChild;
                return y.addEventListener("wheel", N => {
                    const P = N.deltaY > 0 ? -1 : 1;
                    qe(g.name, G => G + P)
                }), y.$$click = N => {
                    if (N.shiftKey) return Dt(g.name)
                }, L(A, () => g.name), I.$$input = N => {
                    const P = parseInt(N.currentTarget.value, 10);
                    o(g.name, "value", P), qe(g.name, P)
                }, F(() => v(g.value) != null ? O.style.setProperty("width", v(g.value)) : O.style.removeProperty("width")), F(() => I.value = g.value), y
            })(),
            FLOAT: g => {
                const y = A => typeof A < "u" ? parseFloat(parseFloat(A.toString()).toFixed(3)) : 0;
                return (() => {
                    var A = xa(),
                        O = A.firstChild,
                        I = O.nextSibling,
                        N = I.firstChild;
                    return A.addEventListener("wheel", P => {
                        const G = P.deltaY > 0 ? -.1 : .1;
                        qe(g.name, g.value + G)
                    }), A.$$click = P => {
                        if (P.shiftKey) return Dt(g.name)
                    }, L(O, () => g.name), N.$$input = P => {
                        const G = parseFloat(P.currentTarget.value);
                        o(g.name, "value", G), qe(g.name, G)
                    }, F(() => v(y(g.value)) != null ? I.style.setProperty("width", v(y(g.value))) : I.style.removeProperty("width")), F(() => N.value = y(g.value)), A
                })()
            },
            STRING: g => {
                const [y, A] = ne(i[g.name] ?? !1), O = P => {
                    const G = P.currentTarget.value;
                    o(g.name, "value", G), qe(g.name, G)
                };
                let I;
                Qe(() => {});
                let N;
                return Le(() => {
                    if (!r[g.name] || !I) return;
                    const P = () => {
                        clearTimeout(N), N = setTimeout(() => {
                            r[g.name] && l(g.name, "height", I.offsetHeight)
                        }, 100)
                    };
                    new MutationObserver(P).observe(I, {
                        attributes: !0,
                        attributeFilter: ["style"]
                    })
                }), (() => {
                    var P = Sa(),
                        G = P.firstChild,
                        ee = G.nextSibling;
                    return G.$$click = ce => {
                        if (ce.shiftKey) return Dt(g.name);
                        A(!y())
                    }, L(G, () => g.name), L(ee, (() => {
                        var ce = le(() => !!(y() || r[g.name]));
                        return () => ce() ? [(() => {
                            var X = Aa(),
                                re = X.firstChild,
                                ie = re.firstChild,
                                xe = re.nextSibling;
                            return re.$$mousedown = Ce => {
                                const D = {
                                        x: Ce.clientX,
                                        y: Ce.clientY
                                    },
                                    fe = nt(r[g.name].position),
                                    pe = Me => {
                                        const ze = {
                                                x: Me.clientX,
                                                y: Me.clientY
                                            },
                                            lt = {
                                                x: ze.x - D.x,
                                                y: ze.y - D.y
                                            };
                                        l(g.name, "position", {
                                            x: fe.x + lt.x,
                                            y: fe.y + lt.y
                                        })
                                    },
                                    Se = () => {
                                        document.removeEventListener("mousemove", pe), document.removeEventListener("mouseup", Se)
                                    };
                                document.addEventListener("mousemove", pe), document.addEventListener("mouseup", Se)
                            }, L(ie, () => g.name), xe.$$click = () => {
                                r[g.name] ? (l(g.name, void 0), delete localStorage[`${tt}${g.name}`], A(!1)) : l(g.name, {
                                    position: {
                                        x: 10,
                                        y: 40
                                    },
                                    height: 60
                                })
                            }, F(() => he(xe, "title", r[g.name] ? "Pin the window to top bar" : "Unpin the window")), X
                        })(), (() => {
                            var X = Ea();
                            X.$$input = O;
                            var re = I;
                            return typeof re == "function" ? Ct(re, X) : I = X, F(ie => Fo(X, r[g.name] ? {
                                height: `${r[g.name].height}px`
                            } : {}, ie)), F(() => X.value = g.value), X
                        })(), Ae(gr, {
                            get prompt() {
                                return g.value
                            },
                            update: X => {
                                qe(g.name, X)
                            }
                        })] : (() => {
                            var X = Ca();
                            return X.$$input = O, X.addEventListener("focus", () => {
                                A(!0)
                            }), F(() => X.value = g.value), X
                        })()
                    })()), F(ce => {
                        var X = !!(y() || r[g.name]),
                            re = !!r[g.name],
                            ie = r[g.name] ? {
                                position: "fixed",
                                top: `${r[g.name].position.y}px`,
                                left: `${r[g.name].position.x}px`
                            } : {};
                        return X !== ce.e && P.classList.toggle("focused", ce.e = X), re !== ce.t && P.classList.toggle("floating", ce.t = re), ce.a = Fo(P, ie, ce.a), ce
                    }, {
                        e: void 0,
                        t: void 0,
                        a: void 0
                    }), P
                })()
            },
            IMAGE: g => {
                const [y, A] = ne(!1), [O, I] = ne(0);
                Le(() => {
                    const ee = document.querySelector(".comfy-menu");
                    ee && (y() ? ee.style.display = "none" : ee.style.display = "block")
                });
                const N = () => `mape_tweak_image_cache_${g.name}`;
                Le(() => {
                    g.value && (sessionStorage[N()] = JSON.stringify(g.value))
                });
                const P = () => `Connect "${g.name}" variable to a Preview Image node or Regenerate the image`,
                    G = () => g.value ?? (sessionStorage[N()] ? JSON.parse(sessionStorage[N()]) : void 0);
                return (() => {
                    var ee = Oa(),
                        ce = ee.firstChild;
                    return ee.$$click = X => {
                        if (X.shiftKey) return Dt(g.name);
                        X.target.tagName === "IMG" || X.target.className === "thumbnails" || X.target.className === "thumb" || (A(!y()), y() || I(0))
                    }, L(ce, () => g.name), L(ee, (() => {
                        var X = le(() => !!y());
                        return () => X() ? (() => {
                            var re = le(() => !!G());
                            return () => re() ? [(() => {
                                var ie = Pa();
                                return L(ie, () => (G() ?? []).map((xe, Ce) => (() => {
                                    var D = Ia(),
                                        fe = D.firstChild;
                                    return D.$$click = () => {
                                        I(Ce)
                                    }, F(() => he(fe, "src", et(xe))), D
                                })())), ie
                            })(), (() => {
                                var ie = ja();
                                return F(() => {
                                    var xe;
                                    return he(ie, "src", et((xe = G()) == null ? void 0 : xe[O()]))
                                }), ie
                            })()] : (() => {
                                var ie = Na();
                                return L(ie, P), ie
                            })()
                        })() : (() => {
                            var re = Ta();
                            return L(re, (() => {
                                var ie = le(() => !!G());
                                return () => ie() ? "" : (() => {
                                    var xe = La();
                                    return F(() => he(xe, "title", P())), xe
                                })()
                            })(), null), L(re, () => (G() ?? []).map(ie => {
                                const xe = `url("${et(ie)}")`;
                                return (() => {
                                    var Ce = Ma();
                                    return xe != null ? Ce.style.setProperty("background-image", xe) : Ce.style.removeProperty("background-image"), Ce
                                })()
                            }), null), re
                        })()
                    })(), null), F(X => {
                        var re = !!y(),
                            ie = (G() ?? []).length > 1;
                        return re !== X.e && ee.classList.toggle("focused", X.e = re), ie !== X.t && ee.classList.toggle("hasMultiple", X.t = ie), X
                    }, {
                        e: void 0,
                        t: void 0
                    }), ee
                })()
            },
            DEFAULT: g => (() => {
                var y = Ra(),
                    A = y.firstChild;
                return y.$$click = O => {
                    if (O.shiftKey) return Dt(g.name)
                }, L(A, () => g.name), F(() => he(y, "title", JSON.stringify(g, null, "  "))), y
            })()
        },
        [B, K] = ne([]),
        {
            open: E
        } = bl();
    Qe(() => {
        const g = document.querySelector("ninja-keys");
        g && g.shadowRoot.appendChild(_a(`
			* {
				will-change: unset !important;
				&::-webkit-scrollbar {
					width: 5px;
					height: 5px;
					background: linear-gradient(to right, #111, #222);
				}
				&::-webkit-scrollbar-thumb {
					background: linear-gradient(to bottom, #fff, #aaa);
					border: 1px solid #fff;
					border-radius: 10px;
				}
			}
			`))
    });
    const q = g => {
            if (g.key === "P" && g.shiftKey) {
                if (ro()) return;
                E(), K([...He().filter(y => {
                    var A, O;
                    return y.type !== "mape Variable" || y.type === "mape Variable" && ((O = (A = y.inputs) == null ? void 0 : A[0]) == null ? void 0 : O.type) !== "*"
                }).map(y => y.type === "mape Variable" ? {
                    id: y.id,
                    title: `Jump to variable: ${Y(y)??y.title??y.type} (${y.id})`,
                    mdIcon: "timeline",
                    handler: () => {
                        _o(y.id)
                    }
                } : {
                    id: y.id,
                    title: `Jump to node: ${y.title??y.type} (${y.id}) ${y.widgets_values&&Array.isArray(y.widgets_values)?` - ${y.widgets_values.join(", ")}`:""}`.slice(0, 90),
                    mdIcon: "circle",
                    handler: () => {
                        _o(y.id)
                    }
                }), ...fn().map(y => ({
                    title: `Jump to group: ${y.title}`,
                    mdIcon: "workspaces",
                    handler: () => {
                        pa(y.title)
                    }
                }))])
            }
        },
        J = [],
        [W, U] = ne({
            1: !1,
            2: !1,
            3: !1,
            4: !1,
            5: !1,
            6: !1,
            7: !1,
            8: !1,
            9: !1
        }),
        M = g => Object.fromEntries(Object.keys(W()).map((y, A) => [y, g === A]));
    Qe(() => {
        document.body.addEventListener("keydown", q);
        for (const g of [1, 2, 3, 4, 5, 6, 7, 8, 9])
            for (const y of ["up", "down"]) {
                const A = `${g}+${y}`;
                ge(A, () => {
                    if (ro()) return;
                    const O = T()[g - 1];
                    if (!O) return;
                    const I = O.type;
                    if (I === "INT") {
                        const N = y === "up" ? 1 : -1;
                        qe(O.name, O.value + N)
                    }
                    if (I === "FLOAT") {
                        const N = y === "up" ? .1 : -.1;
                        qe(O.name, O.value + N)
                    }
                }), J.push(() => {
                    ge.unbind(A)
                })
            }
    });
    const Q = g => {
            if (ro()) return;
            const y = g.key.match(/^\d+$/);
            if (y) {
                const A = T()[parseInt(y[0], 10) - 1];
                if (!A) return;
                A.type === "STRING" ? s(A.name, !i[A.name]) : U(M(parseFloat(g.key) - 1))
            }
        },
        Z = g => {
            g.key.match(/^\d+$/) && U(M(-1))
        };
    document.body.addEventListener("keypress", Q), document.body.addEventListener("keyup", Z), Vt(() => {
        document.body.addEventListener("keydown", q);
        for (const g of J) g();
        document.body.removeEventListener("keypress", Q), document.body.removeEventListener("keyup", Z)
    });
    const [de, ke] = ne([]);
    window.setPrompt = (g, y, A, O) => {
        const I = Math.random(),
            N = () => {
                ke(de().filter(P => P.id !== I))
            };
        ke([...de(), {
            callback: P => (A(P), N(), setTimeout(() => {
                app.graph.setDirtyCanvas(!0, !0)
            }), !0),
            exit: () => {
                N()
            },
            position: {
                x: y[0],
                y: y[1]
            },
            title: g,
            id: I,
            fallback: O
        }])
    };
    const Ee = le(() => Object.values(W()).filter(Boolean).length > 0),
        T = le(() => Object.values(n).sort(Ei(n))),
        oe = () => {
            const g = window.open("", "_blank", "width=1280,height=720,location=no,toolbar=no,menubar=no");
            if (g.document.write(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<title>mape's Helpers - Image Preview</title>
			</head>
			<body>
				<script>
					window.standaloneImagePreview = true;
					import('/extensions/ComfyUI-mape-Helpers/tweak/mape-helpers.js');
				<\/script>
			</body>
		</html>
		`), g) {
                let y = !0;
                g.addEventListener("unload", () => {
                    if (y) {
                        y = !1;
                        return
                    }
                    t([...e().filter(A => A !== g)])
                }), t([...e(), g])
            } else console.error("Failed to open a new window.")
        };
    return window.showWarnings = (g = !0) => {
        w(g)
    }, (() => {
        var g = Ha(),
            y = g.firstChild,
            A = y.firstChild,
            O = A.nextSibling,
            I = O.nextSibling,
            N = I.firstChild,
            P = N.firstChild,
            G = N.nextSibling,
            ee = G.nextSibling,
            ce = ee.nextSibling,
            X = ce.nextSibling,
            re = X.nextSibling,
            ie = re.nextSibling,
            xe = ie.nextSibling,
            Ce = y.nextSibling;
        return A.$$click = R, L(O, Ae(ki, {
            get each() {
                return T()
            },
            children: (D, fe) => (() => {
                var pe = za();
                return L(pe, (() => {
                    var Se = le(() => !!(C[D.type] && typeof D.value < "u"));
                    return () => Se() ? C[D.type](D) : C.DEFAULT(D)
                })()), F(Se => {
                    var Me = !!W()[fe() + 1],
                        ze = !!Ee();
                    return Me !== Se.e && pe.classList.toggle("active", Se.e = Me), ze !== Se.t && pe.classList.toggle("siblingActive", Se.t = ze), Se
                }, {
                    e: void 0,
                    t: void 0
                }), pe
            })()
        })), L(I, (() => {
            var D = le(() => u().length > 0);
            return () => D() ? (() => {
                var fe = Da();
                return fe.$$click = () => {
                    w(!m())
                }, fe
            })() : null
        })(), N), L(I, (() => {
            var D = le(() => !!$());
            return () => D() ? (() => {
                var fe = Fa();
                return fe.$$click = () => {
                    b("")
                }, F(() => he(fe, "title", $())), fe
            })() : null
        })(), N), P.$$click = () => {
            k(!_())
        }, L(N, (() => {
            var D = le(() => !!_());
            return () => D() ? (() => {
                var fe = Ba();
                return L(fe, (() => {
                    var pe = le(() => x.length === 0);
                    return () => pe() ? Ua() : null
                })(), null), L(fe, () => x.map((pe, Se) => (() => {
                    var Me = Ga(),
                        ze = Me.firstChild,
                        lt = ze.nextSibling;
                    return Me.$$click = us => {
                        if (us.shiftKey) {
                            ha(pe.group);
                            return
                        }
                        j(Se, "enabled", !x[Se].enabled);
                        const Lo = pe.group;
                        if (!Lo) return;
                        const Mo = Lo._nodes.filter(Mt => !se(Mt));
                        if (x[Se].enabled)
                            for (const Mt of Mo) Mt.mode = 0;
                        else
                            for (const Mt of Mo) Mt.mode = 4;
                        app.graph.setDirtyCanvas(!0, !0)
                    }, L(ze, () => pe.title), F(() => he(ze, "title", pe.title.length > 50 ? pe.title : "")), F(() => lt.checked = x[Se].enabled), Me
                })()), null), fe
            })() : null
        })(), null), G.$$click = D => {
            (D.shiftKey || confirm("Do you want to organize workflow?")) && va()
        }, ee.$$click = D => {
            (te("ignorePromptForExplodeHeal") || D.shiftKey || confirm("Do you want to convert all links to set/get nodes?")) && Po()
        }, ce.$$click = D => {
            (te("ignorePromptForExplodeHeal") || D.shiftKey || confirm(`Do you want to convert all set/get nodes to connections?
This is finicky with PrimitiveNodes...`)) && Co()
        }, X.$$click = () => {
            oe()
        }, re.$$click = () => {
            if (confirm("Clear all favourites?")) {
                for (const D of Object.keys(localStorage))
                    if (D.startsWith(cn)) {
                        const fe = D.replace(cn, "");
                        for (const pe of yn(fe, "set")) Te(pe, !1, 1);
                        delete localStorage[D]
                    } R()
            }
        }, ie.$$click = () => {
            f(!d()), d() && h(!1)
        }, xe.$$click = () => {
            h(!p()), p() && f(!1)
        }, Ce.style.setProperty("--ninja-font-family", "Arial"), Ce.style.setProperty("position", "relative"), Ce.style.setProperty("z-index", "10000000"), L(Ce, Ae(wl, {
            isDark: !0,
            get hotkeys() {
                return B()
            }
        })), L(g, () => de().map(D => Ae(ua, D)), null), L(g, (() => {
            var D = le(() => !!d());
            return () => D() ? Ae(kr, {
                close: () => {
                    f(!1)
                }
            }) : null
        })(), null), L(g, (() => {
            var D = le(() => !!p());
            return () => D() ? Ae(sa, {
                close: () => {
                    h(!1)
                }
            }) : null
        })(), null), L(g, (() => {
            var D = le(() => !!m());
            return () => D() ? Ae(ba, {
                get warnings() {
                    return u()
                },
                close: () => {
                    window.mapeErrors = [], w(!1)
                }
            }) : null
        })(), null), F(D => {
            var fe = `Convert links to set/get ${te("ignorePromptForExplodeHeal")?"":"(Hold Shift-key to skip prompt)"}`,
                pe = `Convert set/get to links ${te("ignorePromptForExplodeHeal")?"":"(Hold Shift-key to skip prompt)"}`;
            return fe !== D.e && he(ee, "title", D.e = fe), pe !== D.t && he(ce, "title", D.t = pe), D
        }, {
            e: void 0,
            t: void 0
        }), g
    })()
};
yt(["click", "input", "mousedown"]);
const Wa = Object.freeze(Object.defineProperty({
    __proto__: null,
    MapeTweak: Ka
}, Symbol.toStringTag, {
    value: "Module"
}));

function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = []
    }
    return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=mape-helpers.js.map
(function () {
    "use strict";
    try {
        if (typeof document < "u") {
            var e = document.createElement("style");
            e.appendChild(document.createTextNode('@import"https://fonts.googleapis.com/css?family=Material+Icons&display=block";.imagePreviews{background:repeating-radial-gradient(#181818 0,#181818 4px,#1f1f1f 5px,#1f1f1f 5px);font-family:arial;color:#fff;position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;margin:0;background-size:10px 10px;display:flex;flex-direction:column}.imagePreviews .content{display:flex;height:100%}.imagePreviews .image{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%}.imagePreviews .imagePreviewTweaks{display:flex;background:#111;padding:10px;justify-content:space-around;border-bottom:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px inset #00000080;gap:10px}.imagePreviews .imagePreviewTweaks .button{flex:auto;vertical-align:top;border:0;text-transform:uppercase;text-shadow:2px 2px 1px #000000;-webkit-user-select:none;user-select:none;position:relative;display:inline-block;color:#fff;border-top:1px solid #0f0f12;background:#0f0f0f;margin:2px;border-radius:4px;cursor:pointer;line-height:1;transition:color 1s;outline:none;text-align:center;opacity:.5;padding:8px 10px}.imagePreviews .imagePreviewTweaks .button.active{background:#490000}.imagePreviews .imagePreviewTweaks .button:before{position:absolute;top:0;right:0;bottom:0;left:0;border-radius:4px;background:linear-gradient(to bottom,#ffffff17,#ffffff0a);box-shadow:inset 0 1px #ffffff0d,inset 0 0 1px #fff3;content:"";pointer-events:none}.imagePreviews .imagePreviewTweaks .button:hover:before{background:linear-gradient(to bottom,#ffffff1f,#ffffff0f)}.imagePreviews .imagePreviewTweaks .button:active:before{box-shadow:inset 0 1px 3px #0000004d;background:linear-gradient(to bottom,#ffffff0f,#fff0)}.imagePreviews .imagePreviewTweaks .button:active{transform:translate(1px,1px)}.imagePreviews .imagePreviewTweaks .button.active{opacity:1}.imagePreviews .imagePreviewTweaks label{text-transform:uppercase;padding:8px 10px;color:#ffffff80;line-height:21px}.imagePreviews .value{width:50px}.imagePreviews .value{position:static}.imagePreviews .bigPreview{width:100%;height:100%;overflow:hidden;position:relative;cursor:move}.imagePreviews .fullImage{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:98%;max-height:calc(100vh - 80px);border:1px solid rgba(255,255,255,.2);box-shadow:0 0 60px #0000004d,0 0 30px #0000004d;transform-origin:top left}.imagePreviews .thumbnails{display:flex;left:0;right:0;bottom:0;background:#111;padding:10px;justify-content:flex-start;border-bottom:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px inset #00000080;flex-direction:column;max-width:100px;gap:10px;width:100px}.imagePreviews .thumbnails .thumb{width:100%;opacity:.2;cursor:pointer;position:relative;height:100%}.imagePreviews .thumbnails .thumb:hover{opacity:.7}.imagePreviews .thumbnails .thumb.active{opacity:1}.imagePreviews .thumbnails .thumb img{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:10px}.imagePreviews .thumbnails .smallImage{border-radius:5px;max-width:100%;max-height:100%;margin:0 auto;display:block}.imagePreviews .mosaicGrid{width:100%;height:100%;position:absolute;top:50%;left:50%;transform-origin:top left}.imagePreviews .mosaicGrid .inner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;display:flex;flex-direction:row;align-content:center;flex-wrap:wrap;justify-content:center}.imagePreviews .mosaicGrid .mosaicImage{display:inline-block;transform:none;box-shadow:0 0 60px #0000004d,0 0 30px #0000004d}.imagePreviews .mosaicGrid .mosaicImage img{width:100%;height:100%}.imagePreviews .zoom{font-size:20px;font-weight:700;position:absolute;top:16px;right:15px;text-shadow:2px 2px 4px rgba(0,0,0,.7);cursor:pointer!important;cursor:pointer}.imagePreviews .zoom:hover{transform:scale(1.1);filter:saturate(1)}.imagePreviews .zoom:active{transform:scale(.9)}.imagePreviews .flipbookFps{font-size:20px;font-weight:700;position:absolute;top:15px;right:100px;text-shadow:2px 2px 4px rgba(0,0,0,.7);cursor:pointer!important}.imagePreviews .flipbookFps label{margin-right:10px}.imagePreviews .flipbookFps input{background:transparent;color:#fff;border:0;background:#0003;padding:5px 3px;border-radius:5px;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;border-right:0;font-size:11px;color:#fff9;line-height:10px;width:40px;position:relative;font-size:16px;top:-1px;margin-right:20px}.imagePreviews .flipbookFps input[type=checkbox]{vertical-align:top;min-width:15px;max-width:15px;min-height:15px;max-height:15px;background-color:#0003;display:inline-block;margin-right:.8vh;border-radius:100%;margin-top:.45vh;box-shadow:0 0 0 .1vh #fff3;padding:.5vh;-webkit-appearance:none;outline:none;position:relative;top:3px}.imagePreviews .flipbookFps input[type=checkbox]:hover{background-color:#ffffff1a}.imagePreviews .flipbookFps input[type=checkbox]:checked{background:#fff}.imagePreviews .flipbookFps input[type=checkbox]:disabled{opacity:.2}.imagePreviews .imagePreviewHelp{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;background:#0003;padding:5px 3px;border-radius:5px;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset}.imagePreviews .imagePreviewHelp p{padding:0 20px}.imagePreviews .imagePreviewHelp video{max-width:90vw;max-height:calc(90vh - 50px);float:left}.mapeBar .tweaks .promptTweaker{background:#333;padding:5px 0 10px;border-radius:0 0 5px 5px;position:relative;top:-5px}.mapeBar .tweaks .promptTweaker *{box-sizing:border-box}.mapeBar .tweaks .promptTweaker .promptTweakerPrompts{max-height:calc(100vh - 310px);overflow:auto}.mapeBar .tweaks .promptTweaker .buttons{display:flex;padding:0 10px 10px}.mapeBar .tweaks .promptTweaker button{flex:auto;vertical-align:top;border:0;text-transform:uppercase;text-shadow:2px 2px 1px #000000;-webkit-user-select:none;user-select:none;position:relative;display:inline-block;color:#fff;border-top:1px solid #0f0f12;background:#0f0f0f;margin:2px;border-radius:4px;cursor:pointer;line-height:1;transition:color 1s;outline:none;white-space:nowrap;font-size:11px;height:23px;padding:5px 8px}.mapeBar .tweaks .promptTweaker button.active{background:#490000}.mapeBar .tweaks .promptTweaker button:before{position:absolute;top:0;right:0;bottom:0;left:0;border-radius:4px;background:linear-gradient(to bottom,#ffffff17,#ffffff0a);box-shadow:inset 0 1px #ffffff0d,inset 0 0 1px #fff3;content:"";pointer-events:none}.mapeBar .tweaks .promptTweaker button:hover:before{background:linear-gradient(to bottom,#ffffff1f,#ffffff0f)}.mapeBar .tweaks .promptTweaker button:active:before{box-shadow:inset 0 1px 3px #0000004d;background:linear-gradient(to bottom,#ffffff0f,#fff0)}.mapeBar .tweaks .promptTweaker button:active{transform:translate(1px,1px)}.mapeBar .tweaks .promptTweaker button.remove{width:25px;padding:5px 8px}.mapeBar .tweaks .promptTweaker .prompt{display:flex;padding:0 5px}.mapeBar .tweaks .promptTweaker .prompt label{max-width:130px;min-width:130px;height:auto;line-height:1.5;padding:2px;border-radius:5px}.mapeBar .tweaks .promptTweaker .prompt .weight{padding:0 10px;line-height:26px;min-width:43px;max-width:43px}.mapeBar .tweaks .promptTweaker .prompt input[type=range]{-moz-appearance:none;appearance:none;-webkit-appearance:none}.mapeBar .tweaks .promptTweaker .prompt input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;height:10px;width:10px;border-radius:50%;background:#fff;margin-top:-3px;box-shadow:1px 1px 2px #00000080;cursor:pointer}.mapeBar .tweaks .promptTweaker .prompt input[type=range]::-webkit-slider-runnable-track{width:60%;height:5px;background:#fff3;border-radius:3rem;transition:all .5s;cursor:pointer}.mapeBar .tweaks .promptTweaker .prompt input[type=range]:hover::-webkit-slider-runnable-track{background:#ffffff4d}.mapeBar .tweaks .promptTweaker .prompt.tmp{opacity:.5}.mapeBar .tweaks .promptTweaker .prompt input[type=checkbox]{vertical-align:top;min-width:15px;max-width:15px;min-height:15px;max-height:15px;background-color:#0003;display:inline-block;margin-right:.8vh;border-radius:100%;margin-top:.45vh;box-shadow:0 0 0 .1vh #fff3;padding:.5vh;-webkit-appearance:none;outline:none}.mapeBar .tweaks .promptTweaker .prompt input[type=checkbox]:hover{background-color:#ffffff1a}.mapeBar .tweaks .promptTweaker .prompt input[type=checkbox]:checked{background:#fff}.mapeBar .tweaks .promptTweaker .prompt input[type=checkbox]:disabled{opacity:.2}.mapeBar .tweaks .promptTweaker .prompt .arrows{padding:3px 5px 3px 0;position:relative;top:0}.mapeBar .tweaks .promptTweaker .prompt .arrows .arrow{color:#fff3;font-size:12px;line-height:10px}.mapeBar .tweaks .promptTweaker .prompt .arrows .arrow.disabled{pointer-events:none;opacity:0}.mapeBar .tweaks .promptTweaker .prompt .arrows .arrow:hover{cursor:pointer;color:#ffffffe6}.settingsPopup{position:fixed;background:#333;top:30px;right:0;color:#fff;font-family:arial;min-width:500px;z-index:1111111111;box-shadow:0 10px 20px #0000004d;border:1px solid #444}.settingsPopup .close{cursor:pointer;position:absolute;top:10px;right:10px;filter:saturate(0)}.settingsPopup .close:hover{transform:scale(1.1);filter:saturate(1)}.settingsPopup .close:active{transform:scale(.9)}.settingsPopup .header{background:#0000004d;border-bottom:1px solid rgba(255,255,255,.1);font-size:20px;padding:10px 15px;text-transform:uppercase}.settingsPopup .modalContent{max-height:calc(100vh - 100px);overflow:auto}.settingsPopup .mapeSetting{display:flex;position:relative;padding:1px 0;margin:0 3px;z-index:1}.settingsPopup .mapeSetting .name{background:#0003;padding:8px 10px;border-radius:5px 0 0 5px;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;border-right:0;font-size:11px;color:#fff9;line-height:10px;min-width:400px;line-height:1.5}.settingsPopup .mapeSetting input{padding:5px;height:22px;color:#fff;font-size:11px;width:100%;border:0;background:transparent;resize:none;font-family:monospace}.settingsPopup .mapeSetting input:focus,.settingsPopup .mapeSetting input:active{outline:1px solid transparent}.settingsPopup .mapeSetting input[type=checkbox]{vertical-align:top;min-width:15px;max-width:15px;min-height:15px;max-height:15px;background-color:#0003;display:inline-block;margin-right:.8vh;border-radius:100%;margin-top:.45vh;box-shadow:0 0 0 .1vh #fff3;padding:.5vh;-webkit-appearance:none;outline:none;margin:0 auto;display:block}.settingsPopup .mapeSetting input[type=checkbox]:hover{background-color:#ffffff1a}.settingsPopup .mapeSetting input[type=checkbox]:checked{background:#fff}.settingsPopup .mapeSetting input[type=checkbox]:disabled{opacity:.2}.settingsPopup .mapeSetting input:focus{color:#ffa}.settingsPopup .mapeSetting input[type=color]{margin:-15px 0 -10px;height:36px;position:relative;top:4px}.settingsPopup .mapeSetting .reset{padding:5px;filter:saturate(0)}.settingsPopup .mapeSetting .reset:hover{filter:saturate(1)}.settingsPopup .mapeSetting .value{width:100%;position:relative;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;background:#222;border-radius:0 5px 5px 0;padding:8px 10px}.helpPopup{position:fixed;background:#333;top:30px;right:0;color:#fff;font-family:arial;min-width:500px;z-index:1111111111;box-shadow:0 10px 20px #0000004d;border:1px solid #444}.helpPopup .close{cursor:pointer;position:absolute;top:10px;right:10px;filter:saturate(0)}.helpPopup .close:hover{transform:scale(1.1);filter:saturate(1)}.helpPopup .close:active{transform:scale(.9)}.helpPopup .header{background:#0000004d;border-bottom:1px solid rgba(255,255,255,.1);font-size:20px;padding:10px 15px;text-transform:uppercase}.helpPopup .modalContent{max-height:calc(100vh - 100px);overflow:auto}.helpPopup .modalContent{display:flex}.helpPopup .modalContent .help{padding:15px}.helpPopup .modalContent .help .video,.helpPopup .modalContent .help .image{width:720px;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 20px #0009;background:#000c}.helpPopup .modalContent .help .info{border:1px solid rgba(255,255,255,.1);background:#0000001a;margin:10px 0;border-radius:10px;overflow:hidden}.helpPopup .modalContent .help .title{font-size:25px;padding:15px 20px;font-weight:700;text-transform:uppercase;background:#0003;border-bottom:1px solid rgba(255,255,255,.1)}.helpPopup .modalContent .help .text{max-width:720px;font-size:15px;padding:20px 0;font-size:17px;color:#fffc;white-space:pre-wrap}.helpPopup .modalContent .help .text p{margin:0;padding:0 20px 1em;line-height:1.5}.helpPopup .modalContent .help .text p:last-child{padding-bottom:0}.helpPopup .modalContent .help .text code{outline:1px solid rgba(0,0,0,.3);background:#0000001a;border-radius:5px;padding:5px;margin:0 .2em}.helpPopup .modalContent .menu{background-color:#222;margin:0;padding:0}.helpPopup .modalContent .menu li{background:linear-gradient(to right,#0000001a,#0000 20%,#0000);border-left:1px solid #555;padding:10px 15px;list-style:none;color:#ffffff80;border-bottom:1px solid rgba(0,0,0,.2)}.helpPopup .modalContent .menu li:nth-child(odd){background:linear-gradient(to right,#0003,#0000001a 20%,#0000001a);border-bottom:1px solid rgba(0,0,0,.1)}.helpPopup .modalContent .menu li:hover{color:#fff;cursor:pointer}.helpPopup .modalContent .menu li.active{background:#333;color:#fff;box-shadow:6px 2px 6px #0003;border-left:1px solid transparent;border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(0,0,0,.1);background:linear-gradient(to right,#333,#424242 20%,#333)}.helpPopup .modalContent .menu li.active:first-child{border-top:0}.mapeConfirmPrompt{font-family:arial;position:fixed;padding:10px;background:#333;border-bottom:1px solid #444;font-size:13px;z-index:111;border-radius:10px;border:2px solid #555;box-shadow:0 0 20px #0003;transform:translate(-50%,-50%)}.mapeConfirmPrompt *{box-sizing:border-box}.mapeConfirmPrompt .title{white-space:nowrap;text-transform:uppercase;padding:0 0 5px;text-align:center}.mapeConfirmPrompt input{position:relative;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;background:#222;color:#fff;border-radius:5px;padding:8px 10px;width:100%}.mapeConfirmPrompt input:focus,.mapeConfirmPrompt input:active{outline:1px solid transparent}.mapeConfirmPrompt .suggestions{background:#333;border-bottom:1px solid #444;font-size:13px;z-index:111;border:2px solid #555;box-shadow:0 0 20px #0003;position:absolute;top:100%;left:0;right:0;border-radius:5px}.mapeConfirmPrompt .suggestions .suggestion{padding:5px}.mapeConfirmPrompt .suggestions .suggestion:nth-child(odd){background:#0000001a}.mapeConfirmPrompt .suggestions .suggestion:hover,.mapeConfirmPrompt .suggestions .suggestion.selected{color:#ffa;background:#0000004d;cursor:pointer}.warningsPopup{position:fixed;background:#333;top:30px;right:0;color:#fff;font-family:arial;min-width:500px;z-index:1111111111;box-shadow:0 10px 20px #0000004d;border:1px solid #444}.warningsPopup .close{cursor:pointer;position:absolute;top:10px;right:10px;filter:saturate(0)}.warningsPopup .close:hover{transform:scale(1.1);filter:saturate(1)}.warningsPopup .close:active{transform:scale(.9)}.warningsPopup .header{background:#0000004d;border-bottom:1px solid rgba(255,255,255,.1);font-size:20px;padding:10px 15px;text-transform:uppercase}.warningsPopup .modalContent{max-height:calc(100vh - 100px);overflow:auto}.warningsPopup .mapeSetting{display:flex;position:relative;padding:4px 0;margin:0 3px;z-index:1}.warningsPopup .mapeSetting .name{background:#0003;padding:8px 10px;border-radius:5px 0 0 5px;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;border-right:0;font-size:11px;color:#fff;line-height:10px;line-height:1.5;width:100%;font-size:16px}.warningsPopup .mapeSetting .name small{padding:0 10px;color:#fff9}.warningsPopup .mapeSetting button{flex:auto;vertical-align:top;border:0;text-transform:uppercase;text-shadow:2px 2px 1px #000000;-webkit-user-select:none;user-select:none;position:relative;display:inline-block;color:#fff;border-top:1px solid #0f0f12;background:#0f0f0f;margin:2px;border-radius:4px;cursor:pointer;line-height:1;transition:color 1s;outline:none;padding:0 10px;white-space:nowrap}.warningsPopup .mapeSetting button.active{background:#490000}.warningsPopup .mapeSetting button:before{position:absolute;top:0;right:0;bottom:0;left:0;border-radius:4px;background:linear-gradient(to bottom,#ffffff17,#ffffff0a);box-shadow:inset 0 1px #ffffff0d,inset 0 0 1px #fff3;content:"";pointer-events:none}.warningsPopup .mapeSetting button:hover:before{background:linear-gradient(to bottom,#ffffff1f,#ffffff0f)}.warningsPopup .mapeSetting button:active:before{box-shadow:inset 0 1px 3px #0000004d;background:linear-gradient(to bottom,#ffffff0f,#fff0)}.warningsPopup .mapeSetting button:active{transform:translate(1px,1px)}@media only screen and (max-height: 850px){html body .comfy-menu{top:30px!important}}.mapeRoot *{box-sizing:border-box;font-family:arial;-webkit-user-select:none;user-select:none}.mapeRoot *::-webkit-scrollbar{width:5px;height:5px;background:linear-gradient(to right,#111,#222)}.mapeRoot *::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,#fff,#aaa);border:1px solid #fff;border-radius:10px}.mapeBar{position:fixed;top:0;left:0;right:0;height:30px;background:#333;border-bottom:1px solid #444;display:flex;font-size:13px;z-index:1111111;border-top:1px solid rgba(255,255,255,.1);background:linear-gradient(to bottom,#353535,#313131 30%,#333)}.mapeBar:after{content:"";display:block;position:absolute;top:100%;left:0;right:0;height:20px;background:linear-gradient(to bottom,#0000002f,#0000);border-top:2px solid rgba(0,0,0,.3);pointer-events:none}.mapeBar .logo{background:url(https://comfyui.ma.pe/logo.svg);background-size:contain;background-repeat:no-repeat;min-width:26px;max-width:26px;margin:8px;cursor:pointer}.mapeBar .logo:hover{transform:scale(1.1);filter:saturate(1)}.mapeBar .logo:active{transform:scale(.9)}.mapeBar .tweakHighlight{position:relative}.mapeBar .tweakHighlight.siblingActive{opacity:.1}.mapeBar .tweakHighlight.active{opacity:1}.mapeBar .tweaks{display:flex}.mapeBar .tweaks .tweak{display:flex;position:relative;padding:4px 0;margin:0 3px;z-index:1}.mapeBar .tweaks .tweak label{background:#0003;padding:5px 8px;height:22px;border-radius:5px 0 0 5px;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;border-right:0;font-size:11px;color:#fff9;line-height:10px}.mapeBar .tweaks .tweak label.interactable{cursor:pointer}.mapeBar .tweaks .tweak label.interactable:hover{color:#fff}.mapeBar .tweaks .tweak.defaultContainer label{border-radius:5px}.mapeBar .tweaks .tweak input,.mapeBar .tweaks .tweak textarea{padding:5px;height:22px;color:#fff;font-size:11px;width:100%;border:0;background:transparent;resize:none;font-family:monospace}.mapeBar .tweaks .tweak input:focus,.mapeBar .tweaks .tweak textarea:focus,.mapeBar .tweaks .tweak input:active,.mapeBar .tweaks .tweak textarea:active{outline:1px solid transparent}.mapeBar .tweaks .tweak input:focus{color:#ffa}.mapeBar .tweaks .tweak .image{position:absolute;top:0;left:0;width:50px;height:50px;border-radius:5px;background:#000;background-size:contain;background-repeat:no-repeat;background-position:center center}.mapeBar .tweaks .tweak .value{width:70px;position:relative;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;background:#222;height:22px;border-radius:0 5px 5px 0}.mapeBar .tweaks .tweak.stringContainer.focused .value{width:450px}.mapeBar .tweaks .tweak.stringContainer.focused textarea{height:150px;padding:10px;line-height:1.5;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px #0000004d inset;background:#222}.mapeBar .tweaks .tweak.imageContainer{cursor:pointer}.mapeBar .tweaks .tweak.imageContainer .value{width:50px}.mapeBar .tweaks .tweak.imageContainer .missingImage{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#ffffff80;width:50px;text-align:center}.mapeBar .tweaks .tweak.imageContainer .missing{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:20px}.mapeBar .tweaks .tweak.imageContainer.focused{display:block;background:repeating-radial-gradient(#181818 0,#181818 4px,#1f1f1f 5px,#1f1f1f 5px);position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;margin:0;background-size:10px 10px}.mapeBar .tweaks .tweak.imageContainer.focused label{display:none}.mapeBar .tweaks .tweak.imageContainer.focused .value{position:static}.mapeBar .tweaks .tweak.imageContainer.focused .image{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%}.mapeBar .tweaks .tweak.imageContainer.focused.hasMultiple{top:150px}.mapeBar .tweaks .tweak.imageContainer .fullImage{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:98%;max-height:98%;border:1px solid rgba(255,255,255,.2);box-shadow:0 0 60px #0000004d,0 0 30px #0000004d}.mapeBar .tweaks .tweak.imageContainer .thumbnails{display:flex;position:absolute;height:150px;left:0;right:0;bottom:100%;background:#111;padding:10px;justify-content:space-around;border-bottom:1px solid rgba(255,255,255,.1);box-shadow:0 0 10px inset #00000080}.mapeBar .tweaks .tweak.imageContainer .thumbnails .thumb{width:100%}.mapeBar .tweaks .tweak.imageContainer .thumbnails .smallImage{border-radius:5px;max-width:100%;max-height:100%;margin:0 auto;display:block}.mapeBar button{width:100px}.mapeBar .options{position:absolute;top:0;font-weight:900;color:#fff;line-height:28px;font-size:18px;background:linear-gradient(to bottom,#353535,#313131 30%,#333);display:flex;right:5px;height:29px;gap:5px;padding:0 5px;z-index:9}.mapeBar .options .interact{filter:saturate(.8);cursor:pointer}.mapeBar .options .interact:hover{transform:scale(1.1);filter:saturate(1)}.mapeBar .options .interact:active{transform:scale(.9)}.mapeBar .options .interact small{position:absolute;top:6px;left:12px;font-size:62%}@keyframes fadeInOut{0%{opacity:.5}50%{opacity:1}to{opacity:.5}}.mapeBar .options .blink{animation:fadeInOut 1s ease-in-out infinite}.mapeBar .tweak.floating{display:block;box-shadow:0 0 20px #00000080;padding:0}.mapeBar .tweak.floating .promptTweaker{margin:0 0 -5px;border-radius:0}.mapeBar .tweak.floating>label{display:none}.mapeBar .tweak.floating .moveArea{cursor:move}.mapeBar .tweak.floating .moveArea .name{display:block}.mapeBar .tweak.floating textarea{resize:vertical}.mapeBar .tweak.floating .value{height:auto;border-radius:0}.mapeBar .moveBar{position:relative;height:20px;background:repeating-linear-gradient(45deg,#0000004d,#0000004d 2px,#0003 2px,#0003 9px)}.mapeBar .moveBar .moveArea{position:absolute;top:0;left:0;bottom:0;right:30px}.mapeBar .moveBar .moveArea .name{font-size:11px;padding:4px 6px;display:none}.mapeBar .moveBar .toggleFloating{position:absolute;top:-1px;right:5px;filter:saturate(0);cursor:pointer;font-size:15px}.mapeBar .moveBar .toggleFloating:hover{filter:saturate(1)}.mapeBar .groupToggle{position:relative}.mapeBar .groupToggle>span{cursor:pointer;display:block}.mapeBar .groupToggle>span:hover{transform:scale(1.1);filter:saturate(1)}.mapeBar .groupToggle>span:active{transform:scale(.9)}.mapeBar .groupToggle .groups{position:absolute;top:100%;left:0;background:#333;padding:0 5px;border-radius:0 0 5px 5px;transform:translate(-50%)}.mapeBar .groupToggle .groups .group{display:flex;white-space:nowrap;border-right:0;font-size:11px;color:#fff9;font-weight:400;border:1px solid rgba(255,255,255,.1);border-radius:5px;padding:0 10px;margin:5px 0}.mapeBar .groupToggle .groups .group:nth-child(odd){background:#0000001a}.mapeBar .groupToggle .groups .group .groupName{width:100%;padding-right:10px;line-height:22px;max-width:300px;overflow:hidden;text-overflow:ellipsis}.mapeBar .groupToggle .groups input[type=checkbox]{vertical-align:top;min-width:15px;max-width:15px;min-height:15px;max-height:15px;background-color:#0003;display:inline-block;margin-right:.8vh;border-radius:100%;margin-top:.45vh;box-shadow:0 0 0 .1vh #fff3;padding:.5vh;-webkit-appearance:none;outline:none;position:relative;top:6px;margin:0;min-width:10px;min-height:10px;height:10px;width:10px}.mapeBar .groupToggle .groups input[type=checkbox]:hover{background-color:#ffffff1a}.mapeBar .groupToggle .groups input[type=checkbox]:checked{background:#fff}.mapeBar .groupToggle .groups input[type=checkbox]:disabled{opacity:.2}')), document.head.appendChild(e)
        }
    } catch (t) {
        console.error("vite-plugin-css-injected-by-js", t)
    }
})();