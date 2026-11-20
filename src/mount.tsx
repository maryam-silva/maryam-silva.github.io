import * as React from "react";
import { createRoot } from "react-dom/client";
import { TeamLanyardRail, LanyardMember } from "./components/ui/team-lanyard-rail";

const SANITY_PROJECT_ID = '86ednba2';
const SANITY_DATASET = 'production';

function imageUrl(ref: string | null | undefined): string {
  if (!ref) return '';
  const id = ref.replace('image-', '').replace(/-([a-zA-Z0-9]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}`;
}

const DIVISI_TO_TEAM: Record<string, string> = {
  pimpinan: 'Ex Officio',
  sekretariat: 'Ex Officio',
  bendahara: 'Ex Officio',
  kaderisasi: 'KETUA BIDANG',
  humas: 'KETUA BIDANG',
  akademik: 'KETUA BIDANG',
  sosial: 'KETUA BIDANG',
  media: 'KETUA BIDANG',
};

const DROP_OFFSETS = [4, 8, 12, 16, 20, 4, 8, 12];

function App() {
  const [officers, setOfficers] = React.useState<LanyardMember[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const query = encodeURIComponent(
      `*[_type == "pengurus"] | order(urutan asc) { _id, nama, jabatan, divisi, kampus, bio, urutan, "foto": foto.asset._ref }`
    );
    fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${query}`
    )
      .then((r) => r.json())
      .then((data) => {
        const items: any[] = data.result || [];
        const mapped: LanyardMember[] = items.map((p, i) => ({
          id: p._id,
          name: p.nama,
          role: p.jabatan,
          team: DIVISI_TO_TEAM[p.divisi] || 'PENGURUS',
          image: imageUrl(p.foto),
          bio: p.bio || '',
          tags: [p.jabatan, p.kampus].filter(Boolean),
          links: [{ label: 'Instagram', href: 'https://instagram.com/ikapmi.bandung' }],
          drop: DROP_OFFSETS[i % DROP_OFFSETS.length],
        }));
        if (mapped.length > 0) setOfficers(mapped);
        setLoading(false);
      })
      .catch((err) => { console.error('[IKAPMI] Pengurus fetch error:', err); setLoading(false); });
  }, []);

  if (loading) return <div style={{textAlign:'center',padding:'2rem',color:'#64748b',fontSize:'0.875rem'}}>Memuat data pengurus...</div>;
  if (officers.length === 0) return null;

  return (
    <TeamLanyardRail
      items={officers}
      autoplay={true}
      interval={3500}
      labels={{ flip: "", back: "", show: "Tampilkan" }}
      action={
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <a
            href="https://instagram.com/ikapmi.bandung"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-blue-700 transition-colors text-xs font-semibold shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow @ikapmi.bandung di Instagram
          </a>
        </div>
      }
    />
  );
}

const container = document.getElementById("team-lanyard-root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
