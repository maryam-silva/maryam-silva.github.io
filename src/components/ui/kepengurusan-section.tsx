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

// Flip card — matches existing lanyard section style (screenshot 3)
function BadgeCard({ p, isChief = false, isDemisioner = false }: { p: PengurusItem; isChief?: boolean; isDemisioner?: boolean }) {
  const [flipped, setFlipped] = React.useState(false);
  const initials = p.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const W = isChief ? 185 : 162;
  const H = isChief ? 288 : 258;

  const cardBase: React.CSSProperties = {
    position: "absolute", inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden" as any,
    borderRadius: 14,
    overflow: "hidden",
    display: "flex", flexDirection: "column", alignItems: "center",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: W }}>
      {/* Lanyard cord — woven look */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: -1 }}>
        <div style={{
          width: 3, height: 28,
          background: "repeating-linear-gradient(180deg,#334155 0px,#334155 3px,#1e293b 3px,#1e293b 6px)",
        }} />
        <div style={{
          width: 24, height: 11, borderRadius: 3,
          background: "linear-gradient(90deg,#94a3b8,#e2e8f0 45%,#94a3b8)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
        }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#cbd5e1,#64748b)", boxShadow: "0 2px 4px rgba(0,0,0,0.5)", marginTop: 2 }} />
      </div>

      {/* 3D flip wrapper */}
      <div style={{ width: W, height: H, perspective: 900, cursor: "pointer" }} onClick={() => setFlipped(f => !f)}>
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(.34,1.4,.64,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>

          {/* ── FRONT ── matches lanyard section card exactly */}
          <div style={{
            ...cardBase,
            background: "linear-gradient(170deg,#0f1f3d 0%,#0a1628 60%,#060e1e 100%)",
            border: isChief ? "1.5px solid rgba(201,138,44,0.6)" : "1px solid rgba(255,255,255,0.07)",
            boxShadow: isChief
              ? "0 12px 40px rgba(201,138,44,0.2), 0 4px 16px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(0,0,0,0.4)",
          }}>
            {/* dot pattern */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "14px 14px" }} />

            {/* top header */}
            <div style={{
              width: "100%", padding: "9px 10px 7px",
              display: "flex", alignItems: "center", gap: 6,
              background: isChief ? "rgba(201,138,44,0.12)" : "rgba(255,255,255,0.025)",
              borderBottom: `1px solid ${isChief ? "rgba(201,138,44,0.25)" : "rgba(255,255,255,0.06)"}`,
              position: "relative", zIndex: 1,
            }}>
              {/* logo circle */}
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: isChief ? "rgba(201,138,44,0.7)" : "rgba(147,197,253,0.5)" }} />
              </div>
              <span style={{ fontSize: 7.5, fontWeight: 900, letterSpacing: "0.1em", color: isChief ? "#c98a2c" : "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                IKAPMI BANDUNG
              </span>
            </div>

            {/* photo */}
            <div style={{ position: "relative", zIndex: 1, marginTop: 16, marginBottom: 12 }}>
              <div style={{
                width: isChief ? 90 : 78, height: isChief ? 90 : 78, borderRadius: "50%",
                border: isChief ? "3px solid #c98a2c" : "2px solid rgba(255,255,255,0.18)",
                background: "linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))",
                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: isChief ? "0 0 0 4px rgba(201,138,44,0.1)" : "none",
              }}>
                {p.foto ? (
                  <img src={sanityImageUrl(p.foto)} alt={p.nama} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                ) : (
                  <span style={{ fontWeight: 900, color: isChief ? "#c98a2c" : "#93c5fd", fontSize: isChief ? 28 : 24 }}>{initials}</span>
                )}
              </div>
            </div>

            {/* name */}
            <p style={{ position: "relative", zIndex: 1, fontWeight: 700, color: "#fff", fontSize: isChief ? 13 : 11.5, lineHeight: 1.3, textAlign: "center", padding: "0 10px", marginBottom: 5 }}>{p.nama}</p>

            {/* jabatan + role chip */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "0 8px" }}>
              <p style={{ color: isChief ? "#c98a2c" : "#93c5fd", fontSize: isChief ? 9 : 8, fontWeight: 700, letterSpacing: "0.06em", textAlign: "center", lineHeight: 1.3 }}>{p.jabatan}</p>
              {p.divisi && p.divisi !== "Pimpinan" && p.divisi !== "Pimpinan Umum" && (
                <span style={{
                  fontSize: 7, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "2px 6px",
                }}>{p.divisi}</span>
              )}
            </div>

            {/* bottom: demisioner OR barcode-style lines */}
            <div style={{ position: "relative", zIndex: 1, marginTop: "auto", width: "100%", padding: "0 10px 10px" }}>
              {isDemisioner ? (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.4)",
                  borderRadius: 6, padding: "5px 0",
                }}>
                  <span style={{ color: "rgba(239,68,68,0.9)", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace" }}>DEMISIONER</span>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 18 }}>
                    {[2,1,3,1,2,1,2,3,1,2,1,2,3,1,2].map((w, i) => (
                      <div key={i} style={{ width: w * 1.4, height: `${55 + (i % 4) * 12}%`, background: "rgba(255,255,255,0.35)", borderRadius: 1 }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.08em" }}>IKAPMI-BDG</span>
                </div>
              )}
            </div>

            {/* flip hint */}
            <span style={{ position: "absolute", bottom: 7, right: 8, fontSize: 8, color: "rgba(255,255,255,0.15)", zIndex: 2 }}>↻</span>
          </div>

          {/* ── BACK ── */}
          <div style={{
            ...cardBase,
            transform: "rotateY(180deg)",
            background: isChief ? "linear-gradient(150deg,#1c1000,#2e1a00)" : "linear-gradient(150deg,#060e20,#0d1f40)",
            border: isChief ? "1.5px solid rgba(201,138,44,0.4)" : "1px solid rgba(255,255,255,0.06)",
            boxShadow: isChief ? "0 12px 40px rgba(201,138,44,0.15)" : "0 8px 32px rgba(0,0,0,0.4)",
            justifyContent: "center", gap: 12, padding: "20px 12px",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px)", backgroundSize: "11px 11px" }} />

            <div style={{ position: "relative", zIndex: 1, width: 50, height: 50, borderRadius: "50%", border: `1.5px solid ${isChief ? "rgba(201,138,44,0.35)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 24 }}>🕌</span>
            </div>

            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              {p.divisi && (
                <p style={{ color: isChief ? "#c98a2c" : "#93c5fd", fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>{p.divisi}</p>
              )}
              <p style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1.4, marginBottom: 5 }}>{p.nama}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, lineHeight: 1.4 }}>{p.jabatan}</p>
            </div>

            {isDemisioner && (
              <div style={{ position: "relative", zIndex: 1, border: "1px solid rgba(239,68,68,0.4)", borderRadius: 100, padding: "3px 12px", background: "rgba(239,68,68,0.08)" }}>
                <span style={{ color: "rgba(239,68,68,0.8)", fontSize: 8, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>Periode Berakhir</span>
              </div>
            )}

            <span style={{ position: "absolute", bottom: 7, right: 8, fontSize: 8, color: "rgba(255,255,255,0.15)", zIndex: 2 }}>↻</span>
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
