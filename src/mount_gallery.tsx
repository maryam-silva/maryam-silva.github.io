import * as React from "react";
import { createRoot } from "react-dom/client";
import { CoverflowCarousel } from "./components/ui/coverflow-carousel";

const SANITY_PROJECT_ID = '86ednba2';
const SANITY_DATASET = 'production';

function imageUrl(ref: string): string {
  const id = ref.replace('image-', '').replace(/-([a-zA-Z0-9]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}`;
}

function GalleryApp() {
  const [slides, setSlides] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const query = encodeURIComponent(
      `*[_type == "galeri"] | order(urutan asc) { _id, judul, subtitle, kategori, "foto": foto.asset._ref }`
    );
    fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${query}`
    )
      .then((r) => r.json())
      .then((data) => {
        const items: any[] = data.result || [];
        const mapped = items
          .filter((item) => item.foto)
          .map((item, i) => ({
            id: item._id,
            src: imageUrl(item.foto),
            alt: item.judul || `Galeri IKAPMI Bandung #${i + 1}`,
            title: item.judul || '',
            subtitle: item.subtitle || '',
            meta: [
              { label: 'Kategori', value: item.kategori || '' },
              { label: 'Regional', value: 'Bandung' },
            ],
          }));
        if (mapped.length > 0) setSlides(mapped);
        setLoading(false);
      })
      .catch((err) => { console.error('[IKAPMI] Galeri fetch error:', err); setLoading(false); });
  }, []);

  if (loading) return <div style={{textAlign:'center',padding:'2rem',color:'#64748b',fontSize:'0.875rem'}}>Memuat galeri...</div>;
  if (slides.length === 0) return null;

  return (
    <CoverflowCarousel
      slides={slides}
      cardWidth="clamp(210px, 26vw, 340px)"
      rotate={42}
      depth={0.65}
      perspective={3.2}
      falloff={0.58}
      fade={0.12}
      gap={0.07}
      loop={true}
      showCaption={false}
      showNavigation={true}
      autoplay={true}
      autoplayInterval={3500}
      label="Galeri Momen IKAPMI Regional Bandung"
    />
  );
}

const container = document.getElementById("coverflow-gallery-root");
if (container) {
  const root = createRoot(container);
  root.render(<GalleryApp />);
}
