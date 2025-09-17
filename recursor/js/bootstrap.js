// Minimal collapse/toggler (no dependencies)
(function(){
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-bs-toggle="collapse"]');
    if(!t) return;
    var sel = t.getAttribute('data-bs-target');
    if(!sel) return;
    var el = document.querySelector(sel);
    if(!el) return;
    el.classList.toggle('hidden');
  });
})();
