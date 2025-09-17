// Build WhatsApp links for product cards
(function(){
  var phoneNumber = '51999999999'; // Ajusta tu número con código de país, sin +
  function buildWaUrl(productName){
    var text = 'Hola, me interesa el producto: ' + productName;
    return 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(text);
  }
  document.querySelectorAll('[data-product-name]').forEach(function(card){
    var name = card.getAttribute('data-product-name') || 'Producto';
    var wa = card.querySelector('[data-action="wa"]');
    if(wa){ wa.setAttribute('href', buildWaUrl(name)); }
  });
})();
