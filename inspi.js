// Inspirations rattachées aux projets. Chacun vote : 2 ♥ = coup de cœur, 2 ✕ = jeté.
(()=>{
const CSS=`
.insp-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.insp{background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:var(--sh);display:flex;flex-direction:column}
.insp.coeur{border:2px solid var(--pinkInk)}
.insp.jete{opacity:.5}
.vis{position:relative;width:100%;aspect-ratio:4/5;background:var(--seg)}
.vis .im{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.vis .lk{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;background:var(--lav);color:var(--lavInk);font-weight:900;font-size:13px;text-align:center;padding:12px;line-height:1.3}
.vis .lk svg{width:32px;height:32px}
.insp .bd{padding:10px 10px 8px;flex:1}
.insp .bd b{display:block;font-size:14px;line-height:1.25}
.insp .bd small{display:block;font-size:12px;color:var(--soft);font-weight:700;margin-top:2px}
.insp .vt{display:flex;gap:6px;padding:0 8px 10px}
.insp .vt button{flex:1;border:1.5px solid var(--line);border-radius:999px;padding:7px 0;font:800 14px Nunito,sans-serif;background:#fff;display:inline-flex;align-items:center;justify-content:center;gap:4px;color:var(--soft)}
.insp .vt button.me{border-color:var(--ink);color:var(--ink);background:var(--bg)}
.insp .vt button.like.me{background:var(--pink);color:var(--pinkInk);border-color:var(--pinkInk)}
.insp .vt button span{font-size:12px;opacity:.8}
.strip{display:flex;gap:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px}
.strip .th{position:relative;flex:none;width:62px;height:62px;border-radius:14px;overflow:hidden;background:var(--lav);display:flex;align-items:center;justify-content:center}
.strip .th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.strip .th svg{width:24px;height:24px;color:var(--lavInk)}
.strip .th b{position:absolute;right:3px;bottom:2px;font-size:11px;background:rgba(255,255,255,.92);border-radius:999px;padding:0 5px;color:var(--pinkInk)}
.strip .plus{flex:none;width:62px;height:62px;border-radius:14px;border:1.5px dashed var(--line);background:#fff;font-size:22px;font-weight:800;color:var(--soft)}
.insp-sec{display:flex;align-items:center;gap:8px;margin:14px 0 10px}
.insp-sec h3{font-size:17px;flex:1;font-weight:900}
.insp-pick{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;aspect-ratio:16/8;border:2px dashed var(--line);border-radius:16px;background:#fff;font:800 15px Nunito,sans-serif;color:var(--soft)}
.insp-pick img{max-height:220px;max-width:100%;border-radius:12px}
.insp-pick svg{width:34px;height:34px}
`;
const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

let LIST=[];try{LIST=JSON.parse(localStorage.getItem('maison:inspi')||'[]')}catch(e){}
const keep=()=>{try{localStorage.setItem('maison:inspi',JSON.stringify(LIST))}catch(e){}};
const moi=()=>{try{return localStorage.getItem('moi')||''}catch(e){return ''}};
const score=it=>{const v=Object.values(it.votes||{});return {up:v.filter(x=>x>0).length,down:v.filter(x=>x<0).length}};
const etat=it=>{const s=score(it);if(s.up>=2)return 'coeur';if(s.down>=2)return 'jete';return 'ouvert'};
const dom=u=>{try{const h=new URL(u).hostname.replace(/^www\./,'');return h.includes('instagram')?'Instagram':h.includes('pinterest')?'Pinterest':h.includes('tiktok')?'TikTok':h.includes('youtu')?'YouTube':h}catch(e){return 'Lien'}};
// Instagram sert l'image d'un post public sur /media/ ; si c'est bloqué, on retombe sur la tuile.
const insta=u=>{const m=/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/.exec(u||'');return m?'https://www.instagram.com/p/'+m[1]+'/media/?size=m':''};
const LINKSVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>';
const apercu=it=>it.img||insta(it.lien);
const sorted=xs=>xs.slice().sort((a,b)=>{const r={coeur:0,ouvert:1,jete:2};return (r[etat(a)]-r[etat(b)])||((b.ts||0)-(a.ts||0))});
const refresh=()=>{keep();if(window.refreshAll)refreshAll();else render()};

function visu(it){
  const u=apercu(it);
  return '<div class="vis" data-open="'+it.id+'"><div class="lk">'+LINKSVG+esc(dom(it.lien||''))+'</div>'+
  (u?'<img class="im" src="'+esc(u)+'" alt="" referrerpolicy="no-referrer" onerror="this.remove()">':'')+'</div>';
}
function card(it){
  const s=score(it),me=moi(),mv=(it.votes||{})[me]||0;
  return '<div class="insp '+etat(it)+'">'+visu(it)+'<div class="bd" data-open="'+it.id+'"><b>'+esc(it.t||dom(it.lien||'Inspi'))+'</b>'+(it.note?'<small>'+esc(it.note)+'</small>':'')+'</div>'+
  '<div class="vt"><button class="like'+(mv>0?' me':'')+'" data-vote="'+it.id+'/1">♥ <span>'+s.up+'</span></button><button class="'+(mv<0?'me':'')+'" data-vote="'+it.id+'/-1">✕ <span>'+s.down+'</span></button></div></div>';
}
// Bandeau de vignettes sur la carte d'un projet
window.inspiStrip=pid=>{const xs=sorted(LIST.filter(x=>x.projet===pid));if(!xs.length)return '';
  return '<div class="strip">'+xs.slice(0,6).map(it=>{const u=apercu(it),s=score(it);
    return '<span class="th">'+(u?'<img src="'+esc(u)+'" alt="" referrerpolicy="no-referrer" onerror="this.remove()">':'')+LINKSVG+(s.up>=2?'<b>♥</b>':'')+'</span>'}).join('')+
    (xs.length>6?'<span class="th" style="background:var(--seg);color:var(--soft);font-weight:900">+'+(xs.length-6)+'</span>':'')+'</div>'};
window.inspiCount=pid=>LIST.filter(x=>x.projet===pid).length;
// Inspis sans projet, en bas de l'onglet Projets
window.inspiVrac=()=>{const xs=sorted(LIST.filter(x=>!x.projet));
  let h='<div class="insp-sec"><h3>Inspirations en vrac</h3><button class="btn sm" data-newinspi="">+ Ajouter</button></div>';
  if(!xs.length)return h+'<p class="howto">Photos, captures, liens Insta ou Pinterest. Rattachez-les ensuite à un projet.</p>';
  return h+'<div class="insp-grid">'+xs.map(card).join('')+'</div>'};

// Fiche d'un projet : détails + ses inspirations
window.ficheProjet=function(p){
  openSheet({title:p.t,body:()=>{const xs=sorted(LIST.filter(x=>x.projet===p.id));
    const [fl,fc]=faisable(p),[sl,sc]=STATUTS[p.statut]||STATUTS.idee;
    let h='<div class="row" style="margin-top:0"><span class="tag '+sc+'">'+sl+'</span>'+(p.cout?'<span class="tag" style="background:var(--seg)">'+eur(p.cout)+'</span>':'')+(p.quand?'<span class="tag" style="background:var(--seg)">'+esc(p.quand)+'</span>':'')+(p.statut!=='fait'?'<span class="tag '+fc+'">'+fl+'</span>':'')+'</div>';
    if(p.desc)h+='<p class="howto" style="margin:12px 0 0">'+esc(p.desc)+'</p>';
    h+='<div class="field" style="margin-top:14px"><button class="btn" data-editpj="'+p.id+'">Modifier le projet</button></div>';
    if(!moi())h+='<div class="card tint butter"><h3 class="sec">C’est qui, ce téléphone ?</h3><p class="howto" style="margin:0 0 8px">Pour compter les votes à deux. Une fois par téléphone.</p><div class="add"><input id="moiIn" placeholder="Ton prénom"><button class="btn" id="moiOk">OK</button></div></div>';
    h+='<div class="insp-sec"><h3>Inspirations</h3><span class="n" style="font-size:12px;font-weight:800;background:var(--seg);border-radius:999px;padding:2px 9px;color:var(--soft)">'+xs.length+'</span><button class="btn sm" data-newinspi="'+p.id+'">+ Ajouter</button></div>';
    h+=xs.length?'<div class="insp-grid">'+xs.map(card).join('')+'</div>':'<p class="howto">Ajoute une photo, une capture ou un lien Insta. Avec 2 ♥ ça passe en coup de cœur, avec 2 ✕ c’est jeté.</p>';
    return h},
  onClick:b=>{
    if(b.id==='moiOk'){const v=g('moiIn').value.trim();if(!v){toast('Écris ton prénom');return false}try{localStorage.setItem('moi',v)}catch(e){}return}
    if(b.dataset.editpj){formProjet(p);return false}
    if(b.dataset.newinspi!==undefined){formInspi(null,b.dataset.newinspi);return false}
    if(b.dataset.vote||b.dataset.open)return false;
    return false}});
};

// Clics globaux (votes et ouverture d'une inspi)
document.addEventListener('click',e=>{const b=e.target.closest('[data-vote],[data-open],[data-newinspi],#moiOk');if(!b)return;
  if(b.id==='moiOk'&&!sheet.classList.contains('open')){const v=document.getElementById('moiIn').value.trim();if(!v){toast('Écris ton prénom');return}try{localStorage.setItem('moi',v)}catch(e){}refresh();return}
  if(b.dataset.newinspi!==undefined&&!sheet.classList.contains('open')){formInspi(null,b.dataset.newinspi);return}
  if(b.dataset.vote){const [id,v]=b.dataset.vote.split('/');const me=moi();if(!me){toast('Dis d’abord qui tu es');return}
    const it=LIST.find(x=>x.id===id);if(!it)return;it.votes=it.votes||{};it.votes[me]=(it.votes[me]===+v)?0:+v;if(!it.votes[me])delete it.votes[me];
    if(window.FB)window.FB.saveInspi(it);const s=score(it);if(s.up>=2)toast('Coup de cœur à deux ♥');else if(s.down>=2)toast('Jeté');refresh();return}
  if(b.dataset.open)formInspi(LIST.find(x=>x.id===b.dataset.open));
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='moiIn'){const ok=document.getElementById('moiOk');if(ok)ok.click()}});

// Image → vignette JPEG (max 720 px) pour rester léger dans Firestore
function shrink(file){return new Promise(res=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,720/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.72))};im.src=r.result};r.readAsDataURL(file)})}

window.formInspi=function(it,pid){
  const retour=it?it.projet:pid;
  const I=it?JSON.parse(JSON.stringify(it)):{id:uid(),t:'',lien:'',img:'',projet:pid||'',note:'',votes:{},ts:Date.now()};
  const projs=(window.getM().projets||[]).filter(p=>p.statut!=='fait');
  const apres=()=>{const p=(window.getM().projets||[]).find(x=>x.id===retour);closeSheet();if(p)setTimeout(()=>ficheProjet(p),10)};
  openSheet({title:it?'Inspiration':'Nouvelle inspiration',body:()=>
    '<div class="field"><label class="insp-pick" for="iFile">'+(I.img?'<img src="'+I.img+'" alt="">':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg>Photo ou capture d’écran')+'</label><input type="file" id="iFile" accept="image/*" style="display:none"></div>'+
    F.text('iL','Lien <small>· Insta, Pinterest, site…</small>',I.lien,'https://')+
    F.text('iT','Titre',I.t,'ex. Carrelage zellige vert')+
    F.chips('pj','Projet',[['','Aucun']].concat(projs.map(p=>[p.id,p.t])),I.projet||'')+
    F.area('iN','Note',I.note,'optionnel')+
    (I.lien?'<div class="field"><a class="btn" href="'+esc(I.lien)+'" target="_blank" rel="noopener">Ouvrir le lien ↗</a></div>':'')+
    F.bot(it?'Enregistrer':'Ajouter',!!it),
  onClick:b=>{const grab=()=>{I.lien=g('iL').value.trim();I.t=g('iT').value.trim();I.note=g('iN').value.trim()};
    if(b.dataset.chip){grab();I.projet=b.dataset.chip.split('/')[1];return}
    if(b.id==='del'){LIST=LIST.filter(x=>x.id!==I.id);keep();if(window.FB)window.FB.delInspi(I.id);apres();return false}
    if(b.id==='ok'){grab();if(!I.img&&!I.lien){toast('Ajoute une image ou un lien');return false}if(!I.t)I.t=I.lien?dom(I.lien):'Inspi';
      const i=LIST.findIndex(x=>x.id===I.id);if(i<0)LIST.push(I);else LIST[i]=I;keep();if(window.FB)window.FB.saveInspi(I);apres();return false}
    return false},
  onChange:async el=>{if(el.id==='iFile'&&el.files[0]){I.lien=g('iL').value.trim();I.t=g('iT').value.trim();I.note=g('iN').value.trim();I.img=await shrink(el.files[0]);drawSheet()}}});
};

// Synchro Firestore : une fiche par inspiration (maisons/{code}/inspi/{id})
window.applyInspi=list=>{LIST=list;keep();if(!sheet.classList.contains('open'))render()};
})();
