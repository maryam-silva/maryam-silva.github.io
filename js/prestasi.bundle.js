var __prestasi = (() => {
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

  // src/components/ui/prestasi-section.tsx
  function sanityImageUrl(ref) {
    if (!ref) return "";
    const id = ref.replace("image-", "").replace(/-([a-zA-Z0-9]+)$/, ".$1");
    return `https://cdn.sanity.io/images/86ednba2/production/${id}`;
  }
  function formatTanggal(d) {
    if (!d) return "";
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const [y, m, day] = d.split("-");
    return `${parseInt(day)} ${months[parseInt(m) - 1]} ${y}`;
  }
  function RibbonMedal({ color, rank }) {
    return /* @__PURE__ */ React.createElement("div", { className: "absolute -top-2 right-5 z-10 flex flex-col items-center drop-shadow-lg", style: { userSelect: "none" } }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-8 rounded-b-sm", style: { background: color, opacity: 0.9 } }), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-md",
        style: { background: `linear-gradient(135deg, #c98a2c 0%, #f5d485 50%, #c98a2c 100%)`, color: "#040a16", border: "2px solid #f5d485", marginTop: -6 }
      },
      "#",
      rank
    ));
  }
  function PrestasiCard({ item, rank }) {
    const k = KATEGORI[item.kategori || "lainnya"] || KATEGORI.lainnya;
    const isEven = rank % 2 === 0;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "relative flex flex-col rounded-2xl overflow-hidden group cursor-default",
        style: {
          background: "#fff",
          border: "1px solid rgba(15,46,89,0.08)",
          boxShadow: "0 4px 24px rgba(15,46,89,0.08)",
          transform: `rotate(${isEven ? "0.5" : "-0.5"}deg)`,
          transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease",
          marginTop: isEven ? "12px" : "0"
        },
        onMouseEnter: (e) => {
          const el = e.currentTarget;
          el.style.transform = "rotate(0deg) translateY(-6px) scale(1.02)";
          el.style.boxShadow = "0 20px 48px rgba(15,46,89,0.16)";
        },
        onMouseLeave: (e) => {
          const el = e.currentTarget;
          el.style.transform = `rotate(${isEven ? "0.5" : "-0.5"}deg)`;
          el.style.boxShadow = "0 4px 24px rgba(15,46,89,0.08)";
        }
      },
      /* @__PURE__ */ React.createElement("div", { className: "h-1.5 w-full", style: { background: `linear-gradient(90deg, ${k.color}, #c98a2c)` } }),
      /* @__PURE__ */ React.createElement(RibbonMedal, { color: k.color, rank }),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "relative mx-4 mt-4 h-44 rounded-xl overflow-hidden flex items-center justify-center",
          style: { background: `linear-gradient(135deg, ${k.light}, #f8fafc)` }
        },
        item.foto ? /* @__PURE__ */ React.createElement(
          "img",
          {
            src: sanityImageUrl(item.foto),
            alt: item.nama,
            className: "w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          }
        ) : /* @__PURE__ */ React.createElement("span", { className: "text-6xl opacity-60 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" }, k.emoji),
        /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" })
      ),
      /* @__PURE__ */ React.createElement("div", { className: "px-4 pb-5 pt-3 flex flex-col gap-2" }, /* @__PURE__ */ React.createElement(
        "span",
        {
          className: "self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors duration-200 group-hover:opacity-80",
          style: { background: k.light, color: k.color }
        },
        k.label
      ), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-[#0f2e59] text-sm leading-snug line-clamp-2 mt-0.5 transition-colors duration-200 group-hover:text-[#1a4a7a]" }, item.judul), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-1.5 h-1.5 rounded-full shrink-0", style: { background: "#c98a2c" } }), /* @__PURE__ */ React.createElement("p", { className: "text-[#b07820] text-xs font-semibold leading-tight" }, item.nama)), item.keterangan && /* @__PURE__ */ React.createElement("p", { className: "text-slate-400 text-xs leading-relaxed line-clamp-2" }, item.keterangan), item.tanggal && /* @__PURE__ */ React.createElement("p", { className: "text-slate-300 text-[11px] mt-1 pt-2 border-t border-slate-100" }, formatTanggal(item.tanggal))),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300",
          style: { boxShadow: `inset 0 0 0 1.5px ${k.color}30` }
        }
      )
    );
  }
  function PrestasiSection() {
    const [items, setItems] = React.useState(FALLBACK);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      try {
        const sanity = window.Sanity;
        if (sanity && typeof sanity.fetchPrestasi === "function") {
          sanity.fetchPrestasi().then((data) => {
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
    return /* @__PURE__ */ React.createElement("section", { id: "prestasi", className: "scroll-mt-20 sm:scroll-mt-24 relative w-full overflow-hidden py-16 sm:py-24" }, /* @__PURE__ */ React.createElement("div", { className: "relative z-10 mx-auto max-w-7xl px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "mb-14 flex flex-col items-center text-center" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "h-px w-12 bg-gradient-to-r from-transparent to-[#c98a2c]" }), /* @__PURE__ */ React.createElement("span", { className: "text-[#c98a2c] text-xs font-bold uppercase tracking-[0.2em]" }, "Kebanggaan Keluarga"), /* @__PURE__ */ React.createElement("div", { className: "h-px w-12 bg-gradient-to-l from-transparent to-[#c98a2c]" })), /* @__PURE__ */ React.createElement("h2", { className: "font-extrabold text-2xl sm:text-4xl text-[#0f2e59] tracking-tight leading-snug" }, "Jejak Prestasi"), /* @__PURE__ */ React.createElement("p", { className: "mt-3 text-slate-500 text-sm max-w-sm leading-relaxed" }, "Pencapaian membanggakan anggota & alumni IKAPMI Regional Bandung.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start" }, displayItems.map((item, i) => /* @__PURE__ */ React.createElement(PrestasiCard, { key: item._id, item, rank: i + 1 })))));
  }
  var React, FALLBACK, KATEGORI;
  var init_prestasi_section = __esm({
    "src/components/ui/prestasi-section.tsx"() {
      React = __toESM(__require("react"));
      FALLBACK = [
        { _id: "p1", nama: "M. Rizqi Rehan Hamdillah", judul: "Juara 2 Musabaqah Qiraatil Kutub se-Bandung Raya", kategori: "lomba", keterangan: "Meraih Juara 2 dalam ajang Universal Milad Event (UME) 2026 kategori Musabaqah Qiraatil Kutub tingkat Bandung Raya.", tanggal: "2026-11-19" },
        { _id: "p2", nama: "Diki Andriana", judul: "Kepala Kantor DPC PKB Kab. Bandung", kategori: "profesi", keterangan: "Alumni IKAPMI yang berhasil menjabat sebagai Kepala Kantor DPC PKB Kabupaten Bandung.", tanggal: "2025-01-10" },
        { _id: "p3", nama: "Yeyen Hamidah, M.Pd.", judul: "Dosen Tetap Telkom University", kategori: "akademik", keterangan: "Berhasil menjadi dosen tetap di Universitas Telkom Bandung.", tanggal: "2024-08-01" }
      ];
      KATEGORI = {
        akademik: { label: "Akademik", color: "#15803d", light: "#dcfce7", emoji: "\u{1F393}" },
        lomba: { label: "Lomba", color: "#c2410c", light: "#fff7ed", emoji: "\u{1F947}" },
        organisasi: { label: "Organisasi", color: "#1d4ed8", light: "#eff6ff", emoji: "\u{1F3DB}\uFE0F" },
        profesi: { label: "Profesi", color: "#7e22ce", light: "#faf5ff", emoji: "\u{1F4BC}" },
        lainnya: { label: "Lainnya", color: "#475569", light: "#f1f5f9", emoji: "\u2B50" }
      };
    }
  });

  // src/mount_prestasi.tsx
  var require_mount_prestasi = __commonJS({
    "src/mount_prestasi.tsx"() {
      var React2 = __toESM(__require("react"));
      var import_client = __require("react-dom/client");
      init_prestasi_section();
      var el = document.getElementById("prestasi-root");
      if (el) (0, import_client.createRoot)(el).render(/* @__PURE__ */ React2.createElement(PrestasiSection, null));
    }
  });
  return require_mount_prestasi();
})();
