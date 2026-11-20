import * as React from "react";

export interface PengurusItem {
  nama: string;
  jabatan: string;
  divisi?: string;
  foto?: string;
}

export interface KepengurusanItem {
  _id: string;
  periode: string;
  tahun: number;
  tema?: string;
  fotoBersama?: string;
  pengurus?: PengurusItem[];
  catatan?: string;
}

const FALLBACK: KepengurusanItem[] = [
  { _id: "k2025", periode: "2025–2026", tahun: 2025, tema: "Sauyunan Salawasna", pengurus: [
    { nama: "M. Fauzan", jabatan: "Ketua Umum", divisi: "Pimpinan" },
    { nama: "Siti Fatimah", jabatan: "Sekretaris Umum", divisi: "Pimpinan" },
    { nama: "Ahmad Reza", jabatan: "Bendahara Umum", divisi: "Pimpinan" },
    { nama: "Rizqi Rehan", jabatan: "Ketua Bidang PIK", divisi: "Bidang PIK" },
    { nama: "M. Isfahani F.", jabatan: "Ketua Bidang KOMINFO", divisi: "Bidang KOMINFO" },
  ]},
  { _id: "k2024", periode: "2024–2025", tahun: 2024, tema: "Ngahiji Dina Rido Ilahi", pengurus: [
    { nama: "Yusuf Hidayat", jabatan: "Ketua Umum", divisi: "Pimpinan" },
    { nama: "Nurul Aini", jabatan: "Sekretaris Umum", divisi: "Pimpinan" },
    { nama: "Bagas Firmansyah", jabatan: "Bendahara Umum", divisi: "Pimpinan" },
  ]},
  { _id: "k2023", periode: "2023–2024", tahun: 2023, tema: "Santri Perantau Berdaya", pengurus: [
    { nama: "Rahmat Hidayat", jabatan: "Ketua Umum", divisi: "Pimpinan" },
  ]},
  { _id: "k2022", periode: "2022–2023", tahun: 2022, tema: "Bangkit Bersama", pengurus: [] },
  { _id: "k2021", periode: "2021–2022", tahun: 2021, tema: "Sadulur Ngahiji", pengurus: [] },
];

function sanityImageUrl(ref: string) {
  if (!ref) return "";
  const id = ref.replace("image-", "").replace(/-([a-zA-Z0-9]+)$/, ".$1");
  return `https://cdn.sanity.io/images/86ednba2/production/${id}`;
}

function groupByDivisi(pengurus: PengurusItem[]) {
  const map: Record<string, PengurusItem[]> = {};
  for (const p of pengurus) {
    const key = p.divisi || "Umum";
    if (!map[key]) map[key] = [];
    map[key].push(p);
  }
  return map;
}

// Flip card — dark navy, same vibe as existing lanyard section
function BadgeCard({ p, isChief = false, isDemisioner = false }: { p: PengurusItem; isChief?: boolean; isDemisioner?: boolean }) {
  const [flipped, setFlipped] = React.useState(false);
  const initials = p.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const W = isChief ? 148 : 124;
  const H = isChief ? 215 : 185;

  const front: React.CSSProperties = {
    position: "absolute", inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden" as any,
    borderRadius: 12,
    background: "#0b1930",
    border: isChief ? "1.5px solid rgba(201,138,44,0.65)" : "1px solid rgba(255,255,255,0.08)",
    boxShadow: isChief ? "0 8px 32px rgba(201,138,44,0.18)" : "0 4px 20px rgba(0,0,0,0.35)",
    overflow: "hidden",
    display: "flex", flexDirection: "column", alignItems: "center",
  };

  const back: React.CSSProperties = {
    ...front,
    transform: "rotateY(180deg)",
    background: isChief ? "linear-gradient(150deg,#1c1000,#2e1800)" : "linear-gradient(150deg,#071020,#0d1f3c)",
    justifyContent: "center", gap: 10, padding: "16px 10px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: W }}>
      {/* Lanyard string */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: -1 }}>
        <div style={{ width: 2, height: 22, background: "linear-gradient(to bottom, #374151, #94a3b8)" }} />
        <div style={{ width: 20, height: 9, borderRadius: 2, background: "linear-gradient(90deg,#94a3b8,#e2e8f0 50%,#94a3b8)", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
      </div>

      {/* 3D card */}
      <div
        style={{ width: W, height: H, perspective: 900, cursor: "pointer" }}
        onClick={() => setFlipped(f => !f)}
      >
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(.34,1.4,.64,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>

          {/* ── FRONT ── */}
          <div style={front}>
            {/* dot pattern */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.055) 1px,transparent 1px)", backgroundSize: "13px 13px" }} />

            {/* header stripe */}
            <div style={{
              width: "100%", padding: "7px 0 5px", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              background: isChief ? "linear-gradient(135deg,rgba(201,138,44,0.28),rgba(201,138,44,0.1))" : "rgba(255,255,255,0.03)",
              borderBottom: isChief ? "1px solid rgba(201,138,44,0.3)" : "1px solid rgba(255,255,255,0.05)",
              position: "relative", zIndex: 1,
            }}>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
              </div>
              <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: "0.12em", color: isChief ? "#c98a2c" : "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
                IKAPMI BANDUNG
              </span>
            </div>

            {/* photo */}
            <div style={{ position: "relative", zIndex: 1, marginTop: 13, marginBottom: 10 }}>
              <div style={{
                width: isChief ? 70 : 58, height: isChief ? 70 : 58, borderRadius: "50%",
                border: isChief ? "2.5px solid #c98a2c" : "2px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.07)", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {p.foto ? (
                  <img src={sanityImageUrl(p.foto)} alt={p.nama} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                ) : (
                  <span style={{ fontWeight: 900, color: isChief ? "#c98a2c" : "#93c5fd", fontSize: isChief ? 22 : 18 }}>{initials}</span>
                )}
              </div>
            </div>

            {/* name + role */}
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 8px" }}>
              <p style={{ fontWeight: 700, color: "#fff", fontSize: isChief ? 10.5 : 9, lineHeight: 1.3, marginBottom: 3 }}>{p.nama}</p>
              <p style={{ fontWeight: 700, color: isChief ? "#c98a2c" : "#93c5fd", fontSize: 7.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.jabatan}</p>
            </div>

            {/* DEMISIONER stamp */}
            {isDemisioner && (
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%) rotate(-22deg)",
                border: "2px solid rgba(239,68,68,0.8)", borderRadius: 4,
                padding: "3px 8px", zIndex: 10, pointerEvents: "none",
                background: "rgba(239,68,68,0.06)",
              }}>
                <span style={{ color: "rgba(239,68,68,0.9)", fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", fontFamily: "monospace", textTransform: "uppercase" }}>
                  DEMISIONER
                </span>
              </div>
            )}

            {/* flip hint */}
            <span style={{ position: "absolute", bottom: 5, right: 7, fontSize: 7, color: "rgba(255,255,255,0.18)", fontStyle: "italic", zIndex: 1 }}>↻</span>
          </div>

          {/* ── BACK ── */}
          <div style={back}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "10px 10px" }} />

            <div style={{ position: "relative", zIndex: 1, width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${isChief ? "rgba(201,138,44,0.4)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: 20 }}>🕌</span>
            </div>

            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 8px" }}>
              {p.divisi && (
                <p style={{ color: isChief ? "#c98a2c" : "#93c5fd", fontSize: 8, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 5 }}>{p.divisi}</p>
              )}
              <p style={{ color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{p.nama}</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 8 }}>{p.jabatan}</p>
            </div>

            {isDemisioner && (
              <div style={{ position: "relative", zIndex: 1, border: "1px solid rgba(239,68,68,0.5)", borderRadius: 100, padding: "2px 10px" }}>
                <span style={{ color: "rgba(239,68,68,0.8)", fontSize: 7.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Periode Berakhir</span>
              </div>
            )}

            <span style={{ position: "absolute", bottom: 5, right: 7, fontSize: 7, color: "rgba(255,255,255,0.18)", fontStyle: "italic", zIndex: 1 }}>↻</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionDivider({ label, gold = false }: { label: string; gold?: boolean }) {
  const c = gold ? "rgba(201,138,44,0.5)" : "rgba(15,46,89,0.12)";
  const tc = gold ? "#c98a2c" : "#64748b";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${c},transparent)` }} />
      <span style={{ color: tc, fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg,${c},transparent)` }} />
    </div>
  );
}

function PengurusModal({ item, onClose, isCurrent }: { item: KepengurusanItem; onClose: () => void; isCurrent: boolean }) {
  const grouped = groupByDivisi(item.pengurus || []);
  const pimpinan = grouped["Pimpinan"] || grouped["Pimpinan Umum"] || [];
  const lainnya = Object.keys(grouped).filter(k => k !== "Pimpinan" && k !== "Pimpinan Umum");
  const isDemisioner = !isCurrent;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0", background: "rgba(4,10,22,0.82)", backdropFilter: "blur(12px)" }}
      className="sm:items-center sm:p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="rounded-t-3xl sm:rounded-3xl"
        style={{ position: "relative", width: "100%", maxWidth: 760, maxHeight: "92vh", overflowY: "auto", background: "#f1f5f9", boxShadow: "0 -12px 80px rgba(0,0,0,0.35)" }}
      >
        {/* drag handle mobile */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div style={{ width: 36, height: 4, borderRadius: 9999, background: "#cbd5e1" }} />
        </div>

        {/* close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 20, width: 34, height: 34, borderRadius: "50%", background: "rgba(15,46,89,0.07)", border: "1px solid rgba(15,46,89,0.1)", color: "#0f2e59", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13, fontWeight: 700 }}
        >✕</button>

        {/* ── TOP HEADER: year badge centered, navy bg ── */}
        <div style={{
          background: "linear-gradient(160deg,#0f2e59,#1a4a7a)",
          borderRadius: "24px 24px 0 0",
          padding: "32px 24px 28px",
          display: "flex", flexDirection: "column", alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* dot pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />

          {/* Year badge */}
          <div style={{
            position: "relative", zIndex: 1,
            width: 76, height: 76, borderRadius: 20,
            background: "linear-gradient(135deg,#c98a2c 0%,#f5d485 50%,#c98a2c 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(201,138,44,0.4), 0 2px 8px rgba(0,0,0,0.3)",
            border: "3px solid rgba(255,255,255,0.25)", color: "#040a16",
          }}>
            <span style={{ fontWeight: 900, fontSize: 30, lineHeight: 1 }}>'{String(item.tahun).slice(2)}</span>
          </div>

          <span style={{ position: "relative", zIndex: 1, color: "#c98a2c", fontWeight: 700, fontSize: 14, marginTop: 14, letterSpacing: "0.02em" }}>{item.periode}</span>

          {item.tema && (
            <h3 style={{ position: "relative", zIndex: 1, color: "#fff", fontWeight: 800, fontSize: 20, marginTop: 4, textAlign: "center", lineHeight: 1.3 }}>"{item.tema}"</h3>
          )}

          {isDemisioner && (
            <div style={{
              position: "relative", zIndex: 1, marginTop: 12,
              background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.5)",
              borderRadius: 9999, padding: "4px 14px",
            }}>
              <span style={{ color: "#fca5a5", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>DEMISIONER</span>
            </div>
          )}
        </div>

        {/* foto bersama (optional) */}
        {item.fotoBersama && (
          <div style={{ padding: "16px 20px 0" }}>
            <img src={sanityImageUrl(item.fotoBersama)} alt={item.periode} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 14, display: "block" }} />
          </div>
        )}

        {/* ── CARDS CONTENT ── */}
        <div style={{ padding: "24px 20px 40px", display: "flex", flexDirection: "column", gap: 28 }}>

          {pimpinan.length > 0 && (
            <div>
              <SectionDivider label="Pimpinan" gold />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
                {pimpinan.map((p, i) => <BadgeCard key={i} p={p} isChief isDemisioner={isDemisioner} />)}
              </div>
            </div>
          )}

          {lainnya.map(divisi => (
            <div key={divisi}>
              <SectionDivider label={divisi} />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                {grouped[divisi].map((p, i) => <BadgeCard key={i} p={p} isDemisioner={isDemisioner} />)}
              </div>
            </div>
          ))}

          {(item.pengurus?.length || 0) === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <span style={{ fontSize: 36, opacity: 0.3 }}>📋</span>
              <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 8 }}>Data pengurus belum tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const COLS = ["15%", "50%", "85%", "50%"];

function MapNode({ item, index, onClick }: { item: KepengurusanItem; index: number; onClick: () => void }) {
  const isLatest = index === 0;
  const col = COLS[index % COLS.length];
  const pengurusCount = item.pengurus?.length || 0;

  return (
    <div style={{ left: col, transform: "translateX(-50%)", position: "absolute", top: `${index * 160 + 40}px`, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {isLatest && (
        <div className="animate-ping" style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(201,138,44,0.12)", margin: "auto", top: -8, left: -8 }} />
      )}
      <button onClick={onClick} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, cursor: "pointer", border: "none", background: "transparent" }}>
        <div
          style={{
            width: 64, height: 64, borderRadius: "50%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transition: "transform 0.3s",
            background: isLatest
              ? "linear-gradient(135deg,#c98a2c 0%,#e6b84a 50%,#c98a2c 100%)"
              : "linear-gradient(135deg,#1a4a7a 0%,#0f2e59 60%,#040a16 100%)",
            border: isLatest ? "2px solid #f5d485" : "2px solid rgba(201,138,44,0.5)",
            boxShadow: isLatest ? "0 0 24px rgba(201,138,44,0.5),0 4px 16px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "scale(1.12)"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"}
        >
          <span style={{ fontWeight: 900, fontSize: 18, color: isLatest ? "#040a16" : "#c98a2c" }}>'{String(item.tahun).slice(2)}</span>
          {pengurusCount > 0 && (
            <span style={{ fontSize: 9, fontWeight: 600, color: isLatest ? "#040a16" : "#94a3b8", marginTop: 2 }}>{pengurusCount} org</span>
          )}
        </div>
        <div
          style={{
            marginTop: 8, padding: "6px 12px", borderRadius: 12, textAlign: "center", maxWidth: 130,
            background: "rgba(13,31,60,0.85)", border: "1px solid rgba(201,138,44,0.2)", backdropFilter: "blur(8px)",
            transition: "transform 0.3s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
        >
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{item.periode}</p>
          {item.tema && <p style={{ color: "#c98a2c", fontSize: 10, marginTop: 2, lineHeight: 1.3 }}>"{item.tema}"</p>}
        </div>
      </button>
    </div>
  );
}

function WindingPath({ count }: { count: number }) {
  const points = Array.from({ length: count }, (_, i) => ({ x: parseFloat(COLS[i % COLS.length]), y: i * 160 + 80 }));
  if (points.length < 2) return null;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1], curr = points[i], midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", pointerEvents: "none", height: count * 160 + 120 }} viewBox={`0 0 100 ${count * 160 + 120}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke="rgba(201,138,44,0.08)" strokeWidth="6" strokeLinecap="round" />
      <path d={d} fill="none" stroke="rgba(201,138,44,0.3)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
    </svg>
  );
}

export function KepengurusanSection() {
  const [items, setItems] = React.useState<KepengurusanItem[]>(FALLBACK);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<KepengurusanItem | null>(null);

  React.useEffect(() => {
    try {
      const sanity = (window as any).Sanity;
      if (sanity && typeof sanity.fetchKepengurusan === "function") {
        sanity.fetchKepengurusan()
          .then((data: KepengurusanItem[]) => {
            if (Array.isArray(data) && data.length > 0) setItems(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } catch { setLoading(false); }
  }, []);

  const displayItems = loading ? FALLBACK : (items.length > 0 ? items : FALLBACK);
  const mapHeight = displayItems.length * 160 + 160;

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", paddingTop: 64, paddingBottom: 96 }}>
      <div style={{ position: "relative", zIndex: 10, margin: "0 auto", maxWidth: 560, padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 64, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ height: 1, width: 48, background: "linear-gradient(to right,transparent,#c98a2c)" }} />
            <span style={{ color: "#c98a2c", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>Estafet Kepemimpinan</span>
            <div style={{ height: 1, width: 48, background: "linear-gradient(to left,transparent,#c98a2c)" }} />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 32, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2 }}>Linimasa Kepengurusan</h2>
          <p style={{ marginTop: 12, maxWidth: 400, color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>
            Telusuri estafet kepemimpinan IKAPMI Regional Bandung. Klik titik untuk melihat struktur kepengurusan.
          </p>
        </div>

        {/* Map */}
        <div style={{ position: "relative", width: "100%", height: mapHeight }}>
          <WindingPath count={displayItems.length} />
          {displayItems.map((item, i) => (
            <MapNode key={item._id} item={item} index={i} onClick={() => setSelected(item)} />
          ))}
        </div>
      </div>

      {selected && (
        <PengurusModal
          item={selected}
          onClose={() => setSelected(null)}
          isCurrent={selected._id === displayItems[0]?._id}
        />
      )}
    </div>
  );
}
