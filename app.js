
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  const lnk=document.getElementById('nav-'+id);
  if(lnk)lnk.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(initReveal,100);
}

function filterGamme(gamme){
  const btns=document.querySelectorAll('.filtre-btn');
  btns.forEach(b=>b.classList.remove('active'));
  const idx=['table','cosmetique','derive','all'].indexOf(gamme);
  if(idx>=0)btns[idx].classList.add('active');
  document.querySelectorAll('.produit-card').forEach(c=>{
    if(gamme==='all')c.style.display='flex';
    else c.style.display=(c.dataset.gamme===gamme)?'flex':'none';
  });
  setTimeout(initReveal,50);
}

function initReveal(){
  const els=document.querySelectorAll('.page.active .reveal:not(.in)');
  if(!els.length)return;
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i*90);obs.unobserve(e.target);}
    });
  },{threshold:0.1});
  els.forEach(el=>obs.observe(el));
}

window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);
});

function handleSubmit(e){
  e.preventDefault();
  const nom=document.getElementById('f-nom').value;
  const tel=document.getElementById('f-tel').value;
  const type=document.getElementById('f-type').value;
  const vol=document.getElementById('f-volume').value;
  const msg=document.getElementById('f-msg').value;
  const btn=document.getElementById('submitBtn');
  btn.textContent='✓ Demande envoyée';
  btn.style.background='#25D366';
  btn.style.borderColor='#25D366';
  btn.disabled=true;
  const txt=encodeURIComponent('Bonjour HUPAC SARL,\n\nNom : '+nom+'\nTél : '+tel+'\nDemande : '+type+'\nVolume : '+vol+'\n\nMessage : '+msg);
  setTimeout(()=>window.open('https://wa.me/237698127515?text='+txt,'_blank'),700);
}

// Init
initReveal();
// Collection Table par défaut sur page produits
document.querySelectorAll('.produit-card').forEach(c=>{if(c.dataset.gamme!=='table')c.style.display='none';});
