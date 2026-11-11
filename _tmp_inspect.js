const fs = require('fs');

function inspect(file) {
  const f = fs.readFileSync(file, 'utf8');
  console.log('\n===', file, '===');
  console.log('phones:', [...f.matchAll(/tel:[^"'>\s]+|1234567890|\+1[^<"']{0,30}|832[^<\s"']{0,20}/g)].map((m) => m[0]));
  console.log('emails:', [...f.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)].map((m) => m[0]));
  console.log(
    'privacy links:',
    [...f.matchAll(/href="([^"]*(?:privacy|terms|refund|optout)[^"]*)"/gi)].map((m) => m[1]),
  );
  console.log('all hrefs:', [...f.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
}

inspect('content/shared/footer.html');
inspect('content/pages/contact-us/section-01.html');
inspect('content/pages/contact-us/section-02.html');
inspect('content/pages/privacypolicy/section-01.html');
