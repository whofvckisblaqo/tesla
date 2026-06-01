"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("gt-script")) return;

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "gt-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div id="google_translate_element" style={{ display: "none" }} />
  );
}
