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
  { _id: "p1", nama: "M. Rizqi Rehan Hamdillah", judul: "Juara 2 Musabaqah Qiraatil Kutub se-Bandung Raya", kategori: "lomba", keterangan: "Universal Milad Event (UME) 2026 tingkat Bandung Raya.", tanggal: "2026-11-19" },
  { _id: "p2", nama: "Ahmad Ghozie Ibrahim", judul: "Juara 1 Lomba Futsal Tingkat Nasional SILATWIL DPW ITHLA", kategori: "lomba", keterangan: "Lomba Futsal Tingkat Nasional pada acara SILATWIL DPW ITHLA.", tanggal: "2026-10-20" },
  { _id: "p3", nama: "Muhammad Rizqi Rehan Hamdillah", judul: "Juara 2 Musabaqah Qiraatil Kutub Hari Santri Nasional 2026", kategori: "lomba", keterangan: "Hari Santri Nasional 2026 Se-Kota Bandung.", tanggal: "2026-10-20" },
  { _id: "p4", nama: "Tim Inovasi IKAPMI Regional Bandung", judul: "Juara II Kompetisi Inovasi Bandung Bedas", kategori: "lomba", keterangan: "Kompetisi Inovasi Bandung Bedas oleh BAPPERIDA Kabupaten Bandung.", tanggal: "2026-07-01" },
];

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

// Extract juara rank from title: "Juara 1", "Juara I", "Juara II" → "1", "2"
function extractRank(judul: string): string {
  const roman: Record<string, string> = { I: "1", II: "2", III: "3", IV: "4", V: "5" };
  const matchRoman = judul.match(/[Jj]uara\s+([IVXivx]+)\b/);
  if (matchRoman) return roman[matchRoman[1].toUpperCase()] ?? matchRoman[1];
  const matchNum = judul.match(/[Jj]uara\s+(\d+)/);
  if (matchNum) return matchNum[1];
  return "🏆";
}

function MedalPin({ rank, shine }: { rank: string; shine: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: -18,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
        filter: shine ? "drop-shadow(0 0 10px rgba(15,46,89,0.5))" : "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
        transition: "filter 0.3s ease",
      }}
    >
      {/* Ribbon */}
      <div style={{ width: 10, height: 22, background: "linear-gradient(180deg, #1a4a7a 0%, #0f2e59 100%)", borderRadius: "2px 2px 0 0" }} />
      {/* Medal circle */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: shine
            ? "linear-gradient(135deg, #1e5fa0 0%, #3b82f6 40%, #1e5fa0 70%, #0f2e59 100%)"
            : "linear-gradient(135deg, #0f2e59 0%, #1a4a7a 50%, #0f2e59 100%)",
          border: "3px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -4,
          boxShadow: shine ? "0 0 0 3px rgba(59,130,246,0.3)" : "0 2px 8px rgba(0,0,0,0.3)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <span style={{ color: "#fff", fontWeight: 900, fontSize: rank.length > 1 ? 11 : 15, fontFamily: "monospace", letterSpacing: -1 }}>
          {rank}
        </span>
      </div>
    </div>
  );
}

function PrestasiCard({ item }: { item: PrestasiItem }) {
  const [hovered, setHovered] = React.useState(false);
  const rank = extractRank(item.judul);

  // Extract "Juara X" prefix separately for display
  const judulMatch = item.judul.match(/^([Jj]uara\s+[IVXivx\d]+)\s+(.*)/i);
  const judulRank = judulMatch ? judulMatch[1] : "";
  const judulClean = judulMatch ? judulMatch[2] : item.judul;

  return (
    <div
      style={{
        position: "relative",
        paddingTop: 32,
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MedalPin rank={rank} shine={hovered} />

      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          background: "#fff",
          border: hovered ? "1.5px solid rgba(15,46,89,0.25)" : "1.5px solid rgba(15,46,89,0.08)",
          boxShadow: hovered
            ? "0 20px 50px rgba(15,46,89,0.18), 0 0 0 4px rgba(15,46,89,0.06)"
            : "0 4px 20px rgba(15,46,89,0.07)",
          transform: hovered ? "translateY(-8px) scale(1.025)" : "translateY(0) scale(1)",
          transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.3s ease",
        }}
      >
        {/* Top accent stripe */}
        <div style={{ height: 4, background: hovered ? "linear-gradient(90deg, #0f2e59, #3b82f6)" : "linear-gradient(90deg, #0f2e59, #1a4a7a)", transition: "background 0.4s ease" }} />

        {/* Photo area */}
        <div
          style={{
            height: 220,
            background: "linear-gradient(135deg, #e8f0fb 0%, #f0f4ff 100%)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {item.foto ? (
            <img
              src={sanityImageUrl(item.foto)}
              alt={item.nama}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(.25,.46,.45,.94)",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                opacity: hovered ? 0.8 : 0.5,
                transform: hovered ? "scale(1.1) rotate(-8deg)" : "scale(1) rotate(0deg)",
                transition: "opacity 0.3s, transform 0.4s cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              🏆
            </div>
          )}
          {/* Bottom fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.7) 0%, transparent 60%)" }} />
        </div>

        {/* Content */}
        <div style={{ padding: "16px 18px 20px" }}>
          {/* Name — big and prominent */}
          <p
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: hovered ? "#0f2e59" : "#1a3a6b",
              lineHeight: 1.3,
              margin: "0 0 10px 0",
              transition: "color 0.2s",
            }}
          >
            {item.nama}
          </p>

          {/* Divider */}
          <div
            style={{
              height: 1.5,
              background: hovered ? "linear-gradient(90deg, #0f2e59, transparent)" : "linear-gradient(90deg, rgba(15,46,89,0.15), transparent)",
              marginBottom: 10,
              transition: "background 0.3s",
            }}
          />

          {/* Juara rank badge */}
          {judulRank && (
            <span
              style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 800,
                color: "#fff",
                background: hovered ? "linear-gradient(90deg,#0f2e59,#1a4a7a)" : "#1a4a7a",
                borderRadius: 6,
                padding: "2px 8px",
                marginBottom: 6,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "background 0.3s",
              }}
            >
              {judulRank}
            </span>
          )}

          {/* Achievement */}
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: hovered ? "#0f2e59" : "#475569",
              lineHeight: 1.5,
              margin: "0 0 8px 0",
              transition: "color 0.2s",
            }}
          >
            {judulClean}
          </p>

          {item.tanggal && (
            <p style={{ fontSize: 10.5, color: "#94a3b8", margin: 0, fontFamily: "monospace" }}>
              {formatTanggal(item.tanggal)}
            </p>
          )}
        </div>

        {/* Hover glow border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            pointerEvents: "none",
            boxShadow: hovered ? "inset 0 0 0 1.5px rgba(15,46,89,0.2)" : "none",
            transition: "box-shadow 0.3s",
          }}
        />
      </div>
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
      {/* Subtle background dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(15,46,89,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-3">
            <div style={{ height: 1, width: 48, background: "linear-gradient(to right, transparent, #0f2e59)" }} />
            <span style={{ color: "#0f2e59", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Kebanggaan Keluarga
            </span>
            <div style={{ height: 1, width: 48, background: "linear-gradient(to left, transparent, #0f2e59)" }} />
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-[#0f2e59] tracking-tight leading-snug">
            Jejak Prestasi
          </h2>
          <p className="mt-3 text-slate-500 text-sm max-w-sm leading-relaxed">
            Pencapaian membanggakan anggota & alumni IKAPMI Regional Bandung.
          </p>
        </div>

        {/* Cards grid — narrower cards, max 4 cols but constrained width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start" style={{ maxWidth: 960, margin: "0 auto" }}>
          {displayItems.map((item) => (
            <PrestasiCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
