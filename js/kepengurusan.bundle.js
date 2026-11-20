var __kepengurusan = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/components/ui/kepengurusan-section.tsx
  function sanityImageUrl(ref) {
    if (!ref) return "";
    const id = ref.replace("image-", "").replace(/-([a-zA-Z0-9]+)$/, ".$1");
    return `https://cdn.sanity.io/images/86ednba2/production/${id}`;
  }
  function groupByDivisi(pengurus) {
    const map = {};
    for (const p of pengurus) {
      const key = p.divisi || "Umum";
      if (!map[key]) map[key] = [];
      map[key].push(p);
    }
    return map;
  }
  function nameToCode(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) & 268435455;
    return String(h).padStart(9, "0").slice(0, 9);
  }
  function BadgeCard({ p, isChief = false }) {
    const initials = p.nama.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const code = nameToCode(p.nama);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "relative flex flex-col items-center group",
        style: { width: isChief ? 130 : 108 }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center", style: { marginBottom: -1 } }, /* @__PURE__ */ React.createElement("div", { className: "w-px h-6", style: { background: "linear-gradient(to bottom, #94a3b8, #cbd5e1)" } }), /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "w-6 h-2.5 rounded-sm",
          style: { background: "linear-gradient(90deg, #94a3b8, #e2e8f0 50%, #94a3b8)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }
        }
      )),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "relative w-full rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl",
          style: {
            background: "#fff",
            border: isChief ? "1.5px solid rgba(201,138,44,0.5)" : "1px solid rgba(15,46,89,0.1)",
            boxShadow: isChief ? "0 4px 20px rgba(201,138,44,0.12), 0 2px 8px rgba(0,0,0,0.08)" : "0 2px 12px rgba(15,46,89,0.08)"
          }
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "flex items-center gap-1.5 px-2 py-1.5",
            style: {
              background: isChief ? "linear-gradient(135deg, #c98a2c 0%, #e6b84a 100%)" : "linear-gradient(135deg, #0f2e59 0%, #1a4a7a 100%)"
            }
          },
          /* @__PURE__ */ React.createElement("div", { className: "w-3.5 h-3.5 rounded-full flex items-center justify-center", style: { background: "rgba(255,255,255,0.2)" } }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full", style: { background: "rgba(255,255,255,0.5)" } })),
          /* @__PURE__ */ React.createElement("span", { className: "text-[7px] font-black tracking-widest uppercase", style: { color: isChief ? "#040a16" : "#fff", letterSpacing: "0.08em" } }, "IKAPMI BANDUNG")
        ),
        /* @__PURE__ */ React.createElement("div", { className: "flex justify-center px-3 pt-3 pb-1.5" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "relative overflow-hidden rounded-full",
            style: {
              width: isChief ? 70 : 56,
              height: isChief ? 70 : 56,
              border: isChief ? "2.5px solid #c98a2c" : "2px solid #e2e8f0",
              background: "#f1f5f9"
            }
          },
          p.foto ? /* @__PURE__ */ React.createElement("img", { src: sanityImageUrl(p.foto), alt: p.nama, className: "w-full h-full object-cover object-top" }) : /* @__PURE__ */ React.createElement("div", { className: "w-full h-full flex items-center justify-center font-black", style: { color: "#0f2e59", fontSize: isChief ? 22 : 18 } }, initials)
        )),
        /* @__PURE__ */ React.createElement("div", { className: "px-2 pb-1 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-[#0f2e59] leading-tight", style: { fontSize: isChief ? 10 : 9 } }, p.nama), /* @__PURE__ */ React.createElement("p", { className: "font-semibold mt-0.5 leading-tight text-slate-500 uppercase tracking-wider", style: { fontSize: 7 } }, p.jabatan)),
        /* @__PURE__ */ React.createElement("div", { className: "mx-2 mb-2 mt-1.5 rounded overflow-hidden", style: { background: "#f8fafc", border: "1px solid #e2e8f0", paddingTop: 3, paddingBottom: 2 } }, /* @__PURE__ */ React.createElement("div", { className: "flex items-end justify-center gap-px px-2", style: { height: 16 } }, [2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 1, 2, 3, 1, 2, 1, 2].map((w, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { width: w, height: `${60 + i % 3 * 15}%`, background: "#0f2e59", borderRadius: 1, opacity: 0.6 + i % 4 * 0.1 } }))), /* @__PURE__ */ React.createElement("p", { className: "text-center font-mono text-[6px] text-slate-400 mt-0.5" }, code))
      )
    );
  }
  function PengurusModal({ item, onClose }) {
    const grouped = groupByDivisi(item.pengurus || []);
    const pimpinan = grouped["Pimpinan"] || grouped["Pimpinan Umum"] || [];
    const lainnya = Object.keys(grouped).filter((k) => k !== "Pimpinan" && k !== "Pimpinan Umum");
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
        style: { background: "rgba(4,10,22,0.92)", backdropFilter: "blur(10px)" },
        onClick: (e) => {
          if (e.target === e.currentTarget) onClose();
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "relative w-full sm:max-w-4xl max-h-[94vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl",
          style: { background: "#f8fafc", border: "1px solid rgba(15,46,89,0.1)", boxShadow: "0 -8px 80px rgba(0,0,0,0.3)" }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex justify-center pt-3 pb-1 sm:hidden" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-1 rounded-full bg-slate-200" })),
        /* @__PURE__ */ React.createElement("div", { className: "relative" }, item.fotoBersama ? /* @__PURE__ */ React.createElement("div", { className: "relative h-48 sm:h-56 w-full overflow-hidden rounded-t-3xl" }, /* @__PURE__ */ React.createElement("img", { src: sanityImageUrl(item.fotoBersama), alt: item.periode, className: "w-full h-full object-cover" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0", style: { background: "linear-gradient(to top, #f8fafc 0%, rgba(248,250,252,0.1) 50%, transparent 100%)" } })) : /* @__PURE__ */ React.createElement("div", { className: "h-32 w-full rounded-t-3xl relative overflow-hidden", style: { background: "linear-gradient(135deg, #0f2e59 0%, #1a4a7a 50%, #0f2e59 100%)" } }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 opacity-10", style: { backgroundImage: "radial-gradient(circle, rgba(201,138,44,1) 1px, transparent 1px)", backgroundSize: "20px 20px" } })), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-6 translate-y-1/2 z-10" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-xl",
            style: { background: "linear-gradient(135deg, #c98a2c 0%, #f5d485 50%, #c98a2c 100%)", color: "#040a16", border: "3px solid #fff" }
          },
          /* @__PURE__ */ React.createElement("span", { className: "font-black text-xl leading-none" }, "'", String(item.tahun).slice(2))
        )), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10",
            style: { background: "rgba(15,46,89,0.08)", backdropFilter: "blur(4px)", border: "1px solid rgba(15,46,89,0.12)", color: "#0f2e59" }
          },
          "\u2715"
        )),
        /* @__PURE__ */ React.createElement("div", { className: "px-6 pt-12 pb-10 flex flex-col gap-10" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[#c98a2c] text-sm font-bold" }, item.periode), item.tema && /* @__PURE__ */ React.createElement("h3", { className: "text-[#0f2e59] font-extrabold text-2xl leading-snug mt-1" }, '"', item.tema, '"'), item.catatan && /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-sm mt-2 leading-relaxed" }, item.catatan)), pimpinan.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "h-px flex-1", style: { background: "linear-gradient(90deg, rgba(201,138,44,0.5), transparent)" } }), /* @__PURE__ */ React.createElement("span", { className: "text-[#c98a2c] text-[11px] font-bold uppercase tracking-widest" }, "Pimpinan"), /* @__PURE__ */ React.createElement("div", { className: "h-px flex-1", style: { background: "linear-gradient(270deg, rgba(201,138,44,0.5), transparent)" } })), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap justify-center gap-5" }, pimpinan.map((p, i) => /* @__PURE__ */ React.createElement(BadgeCard, { key: i, p, isChief: true })))), lainnya.map((divisi) => /* @__PURE__ */ React.createElement("div", { key: divisi }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "h-px flex-1", style: { background: "linear-gradient(90deg, rgba(15,46,89,0.12), transparent)" } }), /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 text-[11px] font-bold uppercase tracking-widest" }, divisi), /* @__PURE__ */ React.createElement("div", { className: "h-px flex-1", style: { background: "linear-gradient(270deg, rgba(15,46,89,0.12), transparent)" } })), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap justify-center gap-4" }, grouped[divisi].map((p, i) => /* @__PURE__ */ React.createElement(BadgeCard, { key: i, p }))))), (item.pengurus?.length || 0) === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-10" }, /* @__PURE__ */ React.createElement("div", { className: "text-4xl mb-3 opacity-30" }, "\u{1F4CB}"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-sm" }, "Data pengurus belum tersedia.")))
      )
    );
  }
  function MapNode({ item, index, total, onClick }) {
    const isLatest = index === 0;
    const col = COLS[index % COLS.length];
    const pengurusCount = item.pengurus?.length || 0;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "relative flex flex-col items-center",
        style: { left: col, transform: "translateX(-50%)", position: "absolute", top: `${index * 160 + 40}px` }
      },
      isLatest && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 rounded-full animate-ping", style: { background: "rgba(201,138,44,0.15)", width: 80, height: 80, margin: "auto", top: -8, left: -8 } }),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick,
          className: "relative group flex flex-col items-center",
          style: { zIndex: 2 }
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110",
            style: {
              background: isLatest ? "linear-gradient(135deg, #c98a2c 0%, #e6b84a 50%, #c98a2c 100%)" : "linear-gradient(135deg, #1a4a7a 0%, #0f2e59 60%, #040a16 100%)",
              border: isLatest ? "2px solid #f5d485" : "2px solid rgba(201,138,44,0.5)",
              boxShadow: isLatest ? "0 0 24px rgba(201,138,44,0.5), 0 4px 16px rgba(0,0,0,0.4)" : "0 0 0 0 transparent, 0 4px 16px rgba(0,0,0,0.4)"
            }
          },
          /* @__PURE__ */ React.createElement("span", { className: `font-black text-lg leading-none ${isLatest ? "text-[#040a16]" : "text-[#c98a2c]"}` }, "'", String(item.tahun).slice(2)),
          pengurusCount > 0 && /* @__PURE__ */ React.createElement("span", { className: `text-[9px] font-semibold mt-0.5 ${isLatest ? "text-[#040a16]/70" : "text-slate-400"}` }, pengurusCount, " org")
        ),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "mt-2 px-3 py-1.5 rounded-xl text-center max-w-[130px] transition-all duration-300 group-hover:-translate-y-1",
            style: {
              background: "rgba(13,31,60,0.85)",
              border: "1px solid rgba(201,138,44,0.2)",
              backdropFilter: "blur(8px)"
            }
          },
          /* @__PURE__ */ React.createElement("p", { className: "text-white font-bold text-xs leading-tight" }, item.periode),
          item.tema && /* @__PURE__ */ React.createElement("p", { className: "text-[#c98a2c] text-[10px] mt-0.5 leading-tight line-clamp-2" }, '"', item.tema, '"')
        )
      )
    );
  }
  function WindingPath({ count }) {
    const points = Array.from({ length: count }, (_, i) => {
      const col = COLS[i % COLS.length];
      const pct = parseFloat(col);
      return { x: pct, y: i * 160 + 80 };
    });
    if (points.length < 2) return null;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        className: "absolute inset-0 w-full pointer-events-none",
        style: { height: count * 160 + 120 },
        viewBox: `0 0 100 ${count * 160 + 120}`,
        preserveAspectRatio: "none"
      },
      /* @__PURE__ */ React.createElement("path", { d, fill: "none", stroke: "rgba(201,138,44,0.08)", strokeWidth: "6", strokeLinecap: "round" }),
      /* @__PURE__ */ React.createElement("path", { d, fill: "none", stroke: "rgba(201,138,44,0.3)", strokeWidth: "2", strokeLinecap: "round", strokeDasharray: "6 4" }),
      /* @__PURE__ */ React.createElement("path", { d, fill: "none", stroke: "rgba(201,138,44,0.15)", strokeWidth: "1", strokeLinecap: "round" })
    );
  }
  function KepengurusanSection() {
    const [items, setItems] = React.useState(FALLBACK);
    const [loading, setLoading] = React.useState(true);
    const [selected, setSelected] = React.useState(null);
    React.useEffect(() => {
      try {
        const sanity = window.Sanity;
        if (sanity && typeof sanity.fetchKepengurusan === "function") {
          sanity.fetchKepengurusan().then((data) => {
            if (Array.isArray(data) && data.length > 0) setItems(data);
            setLoading(false);
          }).catch(() => setLoading(false));
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    }, []);
    const displayItems = loading ? FALLBACK : items.length > 0 ? items : FALLBACK;
    const mapHeight = displayItems.length * 160 + 160;
    return /* @__PURE__ */ React.createElement("div", { className: "relative w-full overflow-hidden py-16 sm:py-24" }, /* @__PURE__ */ React.createElement("div", { className: "relative z-10 mx-auto max-w-2xl px-6" }, /* @__PURE__ */ React.createElement("div", { className: "mb-16 flex flex-col items-center text-center" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "h-px w-12 bg-gradient-to-r from-transparent to-[#c98a2c]" }), /* @__PURE__ */ React.createElement("span", { className: "text-[#c98a2c] text-xs font-bold uppercase tracking-[0.2em]" }, "Estafet Kepemimpinan"), /* @__PURE__ */ React.createElement("div", { className: "h-px w-12 bg-gradient-to-l from-transparent to-[#c98a2c]" })), /* @__PURE__ */ React.createElement("h2", { className: "font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-snug" }, "Linimasa Kepengurusan"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed" }, "Telusuri perjalanan estafet kepemimpinan IKAPMI Regional Bandung. Klik titik untuk melihat struktur kepengurusan.")), /* @__PURE__ */ React.createElement("div", { className: "relative w-full", style: { height: mapHeight } }, /* @__PURE__ */ React.createElement(WindingPath, { count: displayItems.length }), displayItems.map((item, i) => /* @__PURE__ */ React.createElement(
      MapNode,
      {
        key: item._id,
        item,
        index: i,
        total: displayItems.length,
        onClick: () => setSelected(item)
      }
    )))), selected && /* @__PURE__ */ React.createElement(PengurusModal, { item: selected, onClose: () => setSelected(null) }));
  }
  var React, FALLBACK, COLS;
  var init_kepengurusan_section = __esm({
    "src/components/ui/kepengurusan-section.tsx"() {
      React = __toESM(__require("react"));
      FALLBACK = [
        { _id: "k2025", periode: "2025\u20132026", tahun: 2025, tema: "Sauyunan Salawasna", pengurus: [{ nama: "M. Fauzan", jabatan: "Ketua Umum", divisi: "Pimpinan" }, { nama: "Siti Fatimah", jabatan: "Sekretaris Umum", divisi: "Pimpinan" }, { nama: "Ahmad Reza", jabatan: "Bendahara Umum", divisi: "Pimpinan" }] },
        { _id: "k2024", periode: "2024\u20132025", tahun: 2024, tema: "Ngahiji Dina Rido Ilahi", pengurus: [{ nama: "Yusuf Hidayat", jabatan: "Ketua Umum", divisi: "Pimpinan" }, { nama: "Nurul Aini", jabatan: "Sekretaris Umum", divisi: "Pimpinan" }] },
        { _id: "k2023", periode: "2023\u20132024", tahun: 2023, tema: "Santri Perantau Berdaya", pengurus: [{ nama: "Rahmat Hidayat", jabatan: "Ketua Umum", divisi: "Pimpinan" }] },
        { _id: "k2022", periode: "2022\u20132023", tahun: 2022, tema: "Bangkit Bersama", pengurus: [] },
        { _id: "k2021", periode: "2021\u20132022", tahun: 2021, tema: "Sadulur Ngahiji", pengurus: [] }
      ];
      COLS = ["15%", "50%", "85%", "50%"];
    }
  });

  // src/mount_kepengurusan.tsx
  var require_mount_kepengurusan = __commonJS({
    "src/mount_kepengurusan.tsx"() {
      var React2 = __toESM(__require("react"));
      var import_client = __require("react-dom/client");
      init_kepengurusan_section();
      var el = document.getElementById("kepengurusan-root");
      if (el) (0, import_client.createRoot)(el).render(/* @__PURE__ */ React2.createElement(KepengurusanSection, null));
    }
  });
  return require_mount_kepengurusan();
})();
