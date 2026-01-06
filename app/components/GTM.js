"use client";

import { useEffect } from "react";

export default function GTM() {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Inject GTM script into head
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P92HFFRX');`;
    
    // Insert script as high as possible in head
    const head = document.head || document.getElementsByTagName('head')[0];
    if (head.firstChild) {
      head.insertBefore(script, head.firstChild);
    } else {
      head.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-P92HFFRX"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  );
}

