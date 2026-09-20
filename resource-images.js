// Re-source every site image in public/images from the real photos/maps in ../22.
const sharp = require('sharp');
const path = require('path');

const SRC = path.resolve(__dirname, '../22');
const OUT = path.resolve(__dirname, 'public/images');

const REV = p => path.join(SRC, 'PROJECT TEASER DESCRIPTION - REVISED', p);
const LOC = p => path.join(SRC, 'LOCATION', p);
const GOV = p => path.join(SRC, 'GOVERNMENT', p);
const TEASER = p => path.join(SRC, 'PROJECT DESCRIPTION - TEASER', p);

// [outputName, sourceFile, width, quality]
const MAP = [
  // leadership portraits
  ['leadership-franck.jpg', TEASER('Franck Nyimilongo.jpg'), 800, 85],
  ['leadership-serge.jpg', TEASER('Serge Ngandu.jpg'), 800, 85],
  // Mweka field / gallery photos
  ['mweka-site-1.jpg', REV('20250312_170745.jpg'), 1600, 80],
  ['mweka-site-2.jpg', REV('20250312_170758.jpg'), 1600, 80],
  ['mweka-site-3.jpg', REV('20250312_170808.jpg'), 1600, 80],
  ['mweka-site-4.jpg', REV('20250312_171004.jpg'), 1600, 80],
  ['mweka-site-5.jpg', REV('20250312_171007.jpg'), 1600, 80],
  ['mweka-site-6.jpg', REV('20250312_171009.jpg'), 1600, 80],
  ['mweka-site-7.jpg', REV('20250312_171014.jpg'), 1600, 80],
  ['mweka-site-8.jpg', REV('IMG-20250312-WA0018.jpg'), 1200, 82],
  ['mweka-field.jpg', REV('20250312_170808.jpg'), 1600, 80],
  // maps & satellite
  ['mweka-bloc-1.jpg', LOC('KASAI FERME 2023 -04 - 16 BLOC 1.jpg'), 1400, 85],
  ['mweka-bloc-2.jpg', LOC('KASAI FERME 2023-04-16 BLOC 2.png'), 1400, 85],
  ['mweka-bloc-b-satellite.jpg', LOC('KASAI FERME 2023-04-16 BLOC B GOOGLE EARTH_082025.png'), 1400, 85],
  ['mweka-inema-map.jpg', LOC('20230516 - INEMA MAPS BLOCKS A (blue) & B (red).jpg'), 1400, 85],
  // generic slots re-sourced to real 22 assets
  ['hero-drc.jpg', REV('20250312_170745.jpg'), 1920, 80],
  ['about-drc.jpg', LOC('CARTE PROV KASAI.jpg'), 1200, 85],
  ['office.jpg', GOV('IMG-20231204-WA0014.jpg'), 1000, 80],
  ['team.jpg', REV('20250312_170808.jpg'), 1600, 80],
  ['team-working.jpg', REV('20250312_170758.jpg'), 1600, 80],
  ['business-strategy.jpg', LOC('20230516 - INEMA MAPS BLOCKS A (blue) & B (red).jpg'), 1400, 85],
  ['diamond.jpg', LOC('CARTE PROV KASAI.jpg'), 1200, 85],
  ['cranes.jpg', REV('20250312_171004.jpg'), 1600, 80],
  ['industry.jpg', LOC('KASAI FERME 2023-04-16 BLOC B GOOGLE EARTH_082025.png'), 1400, 85],
  ['construction.jpg', LOC('KASAI FERME 2023-04-16 BLOC B GOOGLE EARTH_082025.png'), 1400, 85],
];

(async () => {
  for (const [out, src, width, quality] of MAP) {
    try {
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true })
        .toFile(path.join(OUT, out));
      console.log('OK   ' + out + '  <-  ' + path.basename(src));
    } catch (e) {
      console.log('ERR  ' + out + '  <-  ' + src + ' :: ' + e.message.split('\n')[0]);
    }
  }
})();
