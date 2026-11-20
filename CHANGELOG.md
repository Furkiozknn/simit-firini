# Değişiklik günlüğü

## v2.1 · Kasım 2026

Yeni
- **Son koşular:** bitirdiğin her oyunun (zafer, iflas ya da süre doldu) günü, kasası ve itibarı bu cihazda saklanır; son 10 oyun ana ekrandaki "Son koşular" penceresinde listelenir. Günlük meydan okuma koşuları "(günlük)" diye işaretlenir. Otomatik bot (`?auto`) ve kayıtsız modlar listeye yazmaz.
- **Sürüm etiketi ve Yenilikler penceresi:** ana ekranda `v2.1 · Kasım 2026 · Yenilikler`; tıklayınca bu sürümün maddeleri açılır (Esc ile kapanır, TR/EN).
- **Diğer oyunlar bağlantısı:** ana ekranda https://furkiozknn.github.io/ adresine bağlantı (oyun portallarında gizlenir).

Düzeltme
- **Telefonda ana ekran:** dikey telefonda Ayarlar ve Dil düğmeleri ekranın altında kalıyor, kaydırmadan görünmüyordu (390x844'te alt kenar 861 px). Logo ve açıklama listesi sıkıştırıldı; kısa telefonlarda (yükseklik 800 px ve altı) açıklama listesi gizlenir, düğmeler ilk ekrana sığar.

Teknik
- `tools/duman.mjs`: ana ekran, Yenilikler, Son koşular (boş, dolu, bozuk kayıt), oyuna geçiş ve telefon görünümü için duman testi.
- `project-meta.json` sürümü 2.1.0.

Değişmeyenler: oyun adresi, dosya yolları, localStorage anahtarları (`arena.simitfirini.*`; yalnızca yeni `runs` eklendi) ve oynanış. Eski kayıtla açılış çalışır.
