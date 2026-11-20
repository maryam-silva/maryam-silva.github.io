/**
 * Sanity API helper untuk IKAPMI Regional Bandung
 */
(function () {
  var SANITY_PROJECT_ID = '86ednba2';
  var SANITY_DATASET = 'production';
  var SANITY_API_VERSION = '2021-10-21';

  function sanityUrl(query) {
    var encoded = encodeURIComponent(query);
    return 'https://' + SANITY_PROJECT_ID + '.api.sanity.io/v' + SANITY_API_VERSION + '/data/query/' + SANITY_DATASET + '?query=' + encoded;
  }

  function imageUrl(ref) {
    if (!ref) return null;
    var id = ref.replace('image-', '').replace(/-(\w+)$/, '.$1');
    return 'https://cdn.sanity.io/images/' + SANITY_PROJECT_ID + '/' + SANITY_DATASET + '/' + id;
  }

  async function sanityFetch(query) {
    try {
      var res = await fetch(sanityUrl(query));
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var data = await res.json();
      return data.result || [];
    } catch (err) {
      console.warn('Sanity fetch error:', err.message);
      return [];
    }
  }

  async function fetchWarta() {
    return sanityFetch('*[_type == "warta"] | order(tanggal desc) { _id, judul, slug, tanggal, kategori, ringkasan, isi, "fotoCover": fotoCover.asset._ref }');
  }

  async function fetchGaleri() {
    return sanityFetch('*[_type == "galeri"] | order(urutan asc) { _id, judul, subtitle, kategori, urutan, "foto": foto.asset._ref }');
  }

  async function fetchPengurus() {
    return sanityFetch('*[_type == "pengurus"] | order(urutan asc) { _id, nama, jabatan, divisi, kampus, urutan, "foto": foto.asset._ref }');
  }

  async function fetchTestimoni() {
    return sanityFetch('*[_type == "testimoni" && tampilkan == true] { _id, nama, kampus, isi, "foto": foto.asset._ref }');
  }

  async function fetchKampus() {
    return sanityFetch('*[_type == "kampus"] | order(urutan asc) { _id, nama, singkatan, jenis, badge, lokasi, deskripsi, namaKoor, kontakKoor, urutan, "foto": foto.asset._ref }');
  }

  async function fetchPelindung() {
    return sanityFetch('*[_type == "pelindung"] | order(urutan asc) { _id, nama, jabatan, temaTampilan, urutan, "foto": foto.asset._ref }');
  }

  async function fetchBeasiswa() {
    return sanityFetch('*[_type == "beasiswa" && tampilkan == true] { _id, nama, penyelenggara, kategori, deskripsi, syarat, tahapan, linkResmi }');
  }

  async function fetchJalurKampus() {
    return sanityFetch('*[_type == "jalurKampus"] | order(urutan asc) { _id, namaKampus, "kampusId": kampusId.current, badge, lokasi, deskripsi, linkPortalPmb, jalur, urutan, "logo": logo.asset._ref }');
  }

  async function fetchBeranda() {
    const result = await sanityFetch('*[_type == "beranda"][0] { taglineSeries, taglinePlain, leadText, stats }');
    return Array.isArray(result) ? result[0] : result;
  }

  async function fetchTentang() {
    const result = await sanityFetch('*[_type == "tentang"][0] { heading, paragraf1, paragraf2 }');
    return Array.isArray(result) ? result[0] : result;
  }

  async function fetchKontak() {
    const result = await sanityFetch('*[_type == "kontak"][0] { alamat, titikKumpul, instagram, whatsapp, email }');
    return Array.isArray(result) ? result[0] : result;
  }

  window.Sanity = {
    imageUrl,
    fetchWarta,
    fetchGaleri,
    fetchPengurus,
    fetchTestimoni,
    fetchKampus,
    fetchPelindung,
    fetchBeasiswa,
    fetchJalurKampus,
    fetchBeranda,
    fetchTentang,
    fetchKontak,
  };
})();
