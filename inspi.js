// Inspirations : captures, liens Insta, votes à deux. Coup de cœur à 2 likes, jeté à 2 dislikes.
(()=>{
const CSS=`
.insp-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.insp{background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:var(--sh);display:flex;flex-direction:column}
.insp.coeur{border:2px solid var(--pinkInk)}
.insp.jete{opacity:.55}
.insp .im{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;background:var(--seg)}
.insp .lk{display:flex;align-items:center;justify-content:center;aspect-ratio:4/5;background:var(--lav);color:var(--lavInk);font-weight:900;font-size:13px;text-align:center;padding:12px;line-height:1.3;gap:6px;flex-direction:column}
.insp .lk svg{width:34px;height:34px}
.insp .bd{padding:10px 10px 8px;flex:1}
.insp .bd b{display:block;font-size:14px;line-height:1.25}
.insp .bd small{display:block;font-size:12px;color:var(--soft);font-weight:700;margin-top:2px}
.insp .vt{display:flex;gap:6px;padding:0 8px 10px}
.insp .vt button{flex:1;border:1.5px solid var(--line);border-radius:999px;padding:7px 0;font:800 14px Nunito,sans-serif;background:#fff;display:inline-flex;align-items:center;justify-content:center;gap:4px;color:var(--soft)}
.insp .vt button.me{border-color:var(--ink);color:var(--ink);background:var(--bg)}
.insp .vt button.like.me{background:var(--pink);color:var(--pinkInk);border-color:var(--pinkInk)}
.insp .vt button span{font-size:12px;opacity:.8}
.insp .more{position:absolute}
.insp-head{display:flex;align-items:center;gap:8px;margin:4px 0 10px}
.insp-head h3{font-size:17px;flex:1;font-weight:900}
.insp-filt{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;margin-bottom:10px;-webkit-overflow-scrolling:touch}
.insp-filt .chip{flex:none}
.insp-pick{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;aspect-ratio:16/8;border:2px dashed var(--line);border-radius:16px;background:#fff;font:800 15px Nunito,sans-serif;color:var(--soft)}
.insp-pick img{max-height:220px;max-width:100%;border-radius:12px}
.insp-pick svg{width:34px;height:34px}
`;
const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

let LIST=[];try{LIST=JSON.parse(localStorage.getItem('maison:inspi')||'[]')}catch(e){}
const keep=()=>{try{localStorage.setItem('maison:inspi',JSON.stringify(LIST))}catch(e){}};
let FILT='';
const moi=()=>{try{return localStorage.getItem('moi')||''}catch(e){return ''}};
const score=it=>{const v=Object.values(it.votes||{});return {up:v.filter(x=>x>0).length,down:v.filter(x=>x<0).length}};
const etat=it=>{const s=score(it);if(s.up>=2)return 'coeur';if(s.down>=2)return 'jete';return 'ouvert'};
const dom=u=>{try{const h=new URL(u).hostname.replace(/^www\./,'');return h.includes('instagram')?'Instagram':h.includes('pinterest')?'Pinterest':h.includes('tiktok')?'TikTok':h.includes('youtu')?'YouTube':h}catch(e){return 'Lien'}};
const LINKSVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>';
const projName=id=>{const p=(window.getM().projets||[]).find(x=>x.id===id);return p?p.t:''};

function card(it){
  const s=score(it),e=etat(it),me=moi(),mv=(it.votes||{})[me]||0;
  const visu=it.img?'<img class="im" src="'+it.img+'" alt="" data-open="'+it.id+'">':'<div class="lk" data-open="'+it.id+'">'+LINKSVG+esc(dom(it.lien||''))+'</div>';
  return '<div class="insp '+e+'">'+visu+'<div class="bd" data-open="'+it.id+'"><b>'+esc(it.t||dom(it.lien||'Inspi'))+'</b>'+(it.projet?'<small>'+esc(projName(it.projet))+'</small>':'')+'</div>'+
  '<div class="vt"><button class="like'+(mv>0?' me':'')+'" data-vote="'+it.id+'/1">♥ <span>'+s.up+'</span></button><button class="'+(mv<0?'me':'')+'" data-vote="'+it.id+'/-1">✕ <span>'+s.down+'</span></button></div></div>';
}
window.renderInspi=function(){
  const M=window.getM();const projs=(M.projets||[]).filter(p=>p.statut!=='fait');
  let L=LIST.slice().sort((a,b)=>(b.ts||0)-(a.ts||0));
  if(FILT)L=L.filter(x=>x.projet===FILT);
  let h='';
  if(!moi())h+='<div class="card tint butter"><h3 class="sec">C’est qui, ce téléphone ?</h3><p class="howto" style="margin:0 0 8px">Pour compter les votes à deux. À régler une fois par téléphone.</p><div class="add"><input id="moiIn" placeholder="Ton prénom"><button class="btn" id="moiOk">OK</button></div></div>';
  h+='<div class="insp-filt"><button class="chip'+(FILT?'':' on')+'" data-filt="">Tout</button>'+projs.map(p=>'<button class="chip'+(FILT===p.id?' on':'')+'" data-filt="'+p.id+'">'+esc(p.t)+'</button>').join('')+'</div>';
  if(!LIST.length)h+='<div class="card"><div class="head">'+mascot('projets')+'<div><h2>Vos inspirations</h2><small>Captures, liens Insta ou Pinterest. Chacun vote : 2 ♥ = coup de cœur, 2 ✕ = jeté.</small></div></div></div>';
  const grp=[['coeur','Coups de cœur','♥'],['ouvert','À trancher',''],['jete','Jetés','']];
  grp.forEach(([k,lab])=>{const xs=L.filter(x=>etat(x)===k);if(!xs.length)return;
    h+='<div class="insp-head"><h3>'+lab+'</h3><span class="n" style="font-size:12px;font-weight:800;background:var(--seg);border-radius:999px;padding:2px 9px;color:var(--soft)">'+xs.length+'</span></div><div class="insp-grid">'+xs.map(card).join('')+'</div>'});
  return h;
};
window.inspiCount=pid=>LIST.filter(x=>x.projet===pid).length;
window.inspiFilter=pid=>{FILT=pid};

// Clics
document.addEventListener('click',e=>{const b=e.target.closest('[data-vote],[data-filt],[data-open],#moiOk');if(!b)return;
  if(b.id==='moiOk'){const v=document.getElementById('moiIn').value.trim();if(!v){toast('Écris ton prénom');return}try{localStorage.setItem('moi',v)}catch(e){}render();return}
  if(b.dataset.filt!==undefined){FILT=b.dataset.filt;render();return}
  if(b.dataset.vote){const [id,v]=b.dataset.vote.split('/');const me=moi();if(!me){toast('Dis d’abord qui tu es (en haut)');return}
    const it=LIST.find(x=>x.id===id);if(!it)return;it.votes=it.votes||{};it.votes[me]=(it.votes[me]===+v)?0:+v;if(!it.votes[me])delete it.votes[me];
    keep();if(window.FB)window.FB.saveInspi(it);const s=score(it);if(s.up>=2)toast('Coup de cœur à deux ♥');else if(s.down>=2)toast('Jeté');render();return}
  if(b.dataset.open){formInspi(LIST.find(x=>x.id===b.dataset.open))}
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='moiIn')document.getElementById('moiOk').click()});

// Image → vignette JPEG (max 720 px) pour rester léger dans Firestore
function shrink(file){return new Promise(res=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,720/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.72))};im.src=r.result};r.readAsDataURL(file)})}

window.formInspi=function(it){
  const I=it?JSON.parse(JSON.stringify(it)):{id:uid(),t:'',lien:'',img:'',projet:FILT||'',note:'',votes:{},ts:Date.now()};
  const projs=(window.getM().projets||[]).filter(p=>p.statut!=='fait');
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
    if(b.id==='del'){LIST=LIST.filter(x=>x.id!==I.id);keep();if(window.FB)window.FB.delInspi(I.id);closeSheet();return false}
    if(b.id==='ok'){grab();if(!I.img&&!I.lien){toast('Ajoute une image ou un lien');return false}if(!I.t)I.t=I.lien?dom(I.lien):'Inspi';
      const i=LIST.findIndex(x=>x.id===I.id);if(i<0)LIST.push(I);else LIST[i]=I;keep();if(window.FB)window.FB.saveInspi(I);closeSheet();return false}
    return false},
  onChange:async el=>{if(el.id==='iFile'&&el.files[0]){I.lien=g('iL').value.trim();I.t=g('iT').value.trim();I.note=g('iN').value.trim();I.img=await shrink(el.files[0]);drawSheet()}}});
};

// Synchro Firestore : une fiche par inspiration (maisons/{code}/inspi/{id})
window.applyInspi=list=>{LIST=list;keep();if(!sheet.classList.contains('open'))render()};
})();
