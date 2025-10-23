const ga4Id = "G-45DHNXBNFZ";

const ga4Script = document.createElement("script");
ga4Script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
ga4Script.async = true;
document.head.appendChild(ga4Script);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", ga4Id);
