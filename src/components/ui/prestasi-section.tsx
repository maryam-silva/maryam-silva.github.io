import * as React from "react";

export interface PrestasiItem {
  _id: string;
  nama: string;
  judul: string;
  kategori?: string;
  keterangan?: string;
  tanggal?: string;
  foto?: string;
}

const FALLBACK: PrestasiItem[] = [
  { _id: "p1", nama: "M. Rizqi Rehan Hamdillah", judul: "Juara 2 Musabaqah Qiraatil Kutub se-Bandung Raya", kategori: "lomba", keterangan: "Meraih Juara 2 dalam ajang Universal Milad Event (UME) 2026 kategori Musabaqah Qiraatil Kutub tingkat Bandung Raya.", tanggal: "2026-11-19" },
  { _id: "p2", nama: "Diki Andriana", judul: "Kepala Kantor DPC PKB Kab. Bandung", kategori: "profesi", keterangan: "Alumni IKAPMI yang berhasil menjabat sebagai Kepala Kantor DPC PKB Kabupaten Bandung.", tanggal: "2025-01-10" },
  { _id: "p3", nama: "Yeyen Hamidah, M.Pd.", judul: "Dosen Tetap Telkom University", kategori: "akademik", keterangan: "Berhasil menjadi dosen tetap di Universitas Telkom Bandung.", tanggal: "2024-08-01" },
];

const KATEGORI: Record<string, { label: string; color: string; light: string; emoji: string }> = {
  akademik:   { label: "Akademik",   color: "#15803d", light: "#dcfce7", emoji: "🎓" },
  lomba:      { label: "Lomba",      color: "#c2410c", light: "#fff7ed", emoji: "🥇" },
  organisasi: { label: "Organisasi", color: "#1d4ed8", light: "#eff6ff", emoji: "🏛️" },
  profesi:    { label: "Profesi",    color: "#7e22ce", light: "#faf5ff", emoji: "💼" },
  lainnya:    { label: "Lainnya",    color: "#475569", light: "#f1f5f9", emoji: "⭐" },
};

function sanityImageUrl(ref: string) {
  if (!ref) return "";
  const id = ref.replace("image-", "").replace(/-([a-zA-Z0-9]+)$/, ".$1");
  return `https://cdn.sanity.io/images/86ednba2/production/${id}`;
}

function formatTanggal(d?: string) {
  if (!d) return "";
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  const [y, m, day] = d.split("-");
  return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
}

// SVG ribbon medal decoration
function RibbonMedal({ color, rank }: { color: string; rank: number }) {
  return (
    <div className="absolute -top-2 right-5 z-10 flex flex-col items-center drop-shadow-lg" style={{ userSelect: "none" }}>
      <div className="w-5 h-8 rounded-b-sm" style={{ background: color, opacity: 0.9 }} />
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-md"
        style={{ background: `linear-gradient(135deg, #c98a2c 0%, #f5d485 50%, #c98a2c 100%)`, color: "#040a16", border: "2px solid #f5d485", marginTop: -6 }}
      >
        #{rank}
      </div>
    </div>
  );
}

function PrestasiCard({ item, rank }: { item: PrestasiItem; rank: number }) {
  const k = KATEGORI[item.kategori || "lainnya"] || KATEGORI.lainnya;
  const isEven = rank % 2 === 0;

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden group cursor-default"
      style={{
        background: "#fff",
        border: "1px solid rgba(15,46,89,0.08)",
        boxShadow: "0 4px 24px rgba(15,46,89,0.08)",
        transform: `rotate(${isEven ? "0.5" : "-0.5"}deg)`,
        transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease",
        marginTop: isEven ? "12px" : "0",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "rotate(0deg) translateY(-6px) scale(1.02)";
        el.style.boxShadow = "0 20px 48px rgba(15,46,89,0.16)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = `rotate(${isEven ? "0.5" : "-0.5"}deg)`;
        el.style.boxShadow = "0 4px 24px rgba(15,46,89,0.08)";
      }}
    >
      {/* Top color bar */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${k.color}, #c98a2c)` }} />

      {/* Medal ribbon */}
      <RibbonMedal color={k.color} rank={rank} />

      {/* Photo / icon area */}
      <div
        className="relative mx-4 mt-4 h-44 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${k.light}, #f8fafc)` }}
      >
        {item.foto ? (
          <img
            src={sanityImageUrl(item.foto)}
            alt={item.nama}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-6xl opacity-60 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">{k.emoji}</span>
        )}
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 pb-5 pt-3 flex flex-col gap-2">
        {/* Category chip */}
        <span
          className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors duration-200 group-hover:opacity-80"
          style={{ background: k.light, color: k.color }}
        >
          {k.label}
        </span>

        <h3 className="font-bold text-[#0f2e59] text-sm leading-snug line-clamp-2 mt-0.5 transition-colors duration-200 group-hover:text-[#1a4a7a]">
          {item.judul}
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#c98a2c" }} />
          <p className="text-[#b07820] text-xs font-semibold leading-tight">{item.nama}</p>
        </div>

        {item.keterangan && (
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{item.keterangan}</p>
        )}

        {item.tanggal && (
          <p className="text-slate-300 text-[11px] mt-1 pt-2 border-t border-slate-100">{formatTanggal(item.tanggal)}</p>
        )}
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 0 1.5px ${k.color}30` }}
      />
    </div>
  );
}

export function PrestasiSection() {
  const [items, setItems] = React.useState<PrestasiItem[]>(FALLBACK);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const sanity = (window as any).Sanity;
      if (sanity && typeof sanity.fetchPrestasi === "function") {
        sanity.fetchPrestasi()
          .then((data: PrestasiItem[]) => {
            if (Array.isArray(data) && data.length > 0) setItems(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, []);

  const displayItems = loading ? FALLBACK : (items.length > 0 ? items : FALLBACK);

  return (
    <section id="prestasi" className="scroll-mt-20 sm:scroll-mt-24 relative w-full overflow-hidden py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c98a2c]" />
            <span className="text-[#c98a2c] text-xs font-bold uppercase tracking-[0.2em]">Kebanggaan Keluarga</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c98a2c]" />
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-[#0f2e59] tracking-tight leading-snug">
            Jejak Prestasi
          </h2>
          <p className="mt-3 text-slate-500 text-sm max-w-sm leading-relaxed">
            Pencapaian membanggakan anggota & alumni IKAPMI Regional Bandung.
          </p>
        </div>

        {/* Staggered grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
          {displayItems.map((item, i) => (
            <PrestasiCard key={item._id} item={item} rank={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
