const fs = require('fs');

function snippet(file, needle, radius = 180) {
  const f = fs.readFileSync(file, 'utf8');
  let idx = 0;
  let n = 0;
  while ((idx = f.indexOf(needle, idx)) !== -1 && n < 8) {
    console.log(`\n[${file} @${idx}]`);
    console.log(f.slice(Math.max(0, idx - 40), idx + radius));
    idx += needle.length;
    n += 1;
  }
}

snippet('content/shared/footer.html', '1234567890');
snippet('content/shared/footer.html', 'Contact');
snippet('content/shared/footer.html', 'Quick');
snippet('content/shared/footer.html', 'Legal');
snippet('content/shared/footer.html', 'copyright', 220);
snippet('content/pages/contact-us/section-01.html', '1234567890');
snippet('content/pages/contact-us/section-01.html', 'privacypolicy');
snippet('content/pages/contact-us/section-01.html', 'name="name"');
snippet('content/pages/contact-us/section-01.html', 'Your Name');
