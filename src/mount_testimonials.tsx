import * as React from "react";
import { createRoot } from "react-dom/client";
import { TestimonialsSection } from "./components/ui/testimonials-6";

const SANITY_PROJECT_ID = '86ednba2';
const SANITY_DATASET = 'production';
// Must match the key used inside TestimonialsSection
const LOCAL_STORAGE_KEY = "ikapmi_testimonials_v4";
const CLOUD_URL_STORAGE_KEY = "ikapmi_cloud_api_url_v1";

function imageUrl(ref: string | null | undefined): string {
  if (!ref) return '';
  const id = ref.replace('image-', '').replace(/-([a-zA-Z0-9]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}`;
}

async function seedFromSanity(): Promise<void> {
  const query = encodeURIComponent(
    `*[_type == "testimoni" && tampilkan == true] { _id, nama, kampus, isi, "foto": foto.asset._ref }`
  );
  try {
    const res = await fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${query}`
    );
    const data = await res.json();
    const items: any[] = data.result || [];
    if (items.length > 0) {
      const testimonials = items.map((t) => ({
        name: t.nama,
        quote: t.isi,
        company: t.kampus || '',
        role: 'Santri Perantau',
        image: imageUrl(t.foto),
        date: '',
      }));
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(testimonials));
        // Disable Google Sheets cloud sync so Sanity data isn't overwritten
        localStorage.setItem(CLOUD_URL_STORAGE_KEY, '');
      } catch {}
    }
  } catch {}
}

const container = document.getElementById("testimonials-root");
if (container) {
  seedFromSanity().finally(() => {
    const root = createRoot(container);
    root.render(<TestimonialsSection />);
  });
}
