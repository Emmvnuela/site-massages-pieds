const M=[["Massage relaxant","Détente complète du corps",60,70],["Massage dos et nuque","Apaise les tensions",30,40],["Massage aux huiles chaudes","Chaleur et lâcher-prise",90,100]];
const P=[["Soin express des pieds","Gommage et hydratation",30,35,"img/photo-7.jpg"],["Soin complet des pieds","Bain, gommage, soin des ongles",60,55,"img/photo-8.jpg"],["Pédicure beauté","Pose de vernis incluse",75,65,"img/photo-9.jpg"]];
const B=[["Huile de massage","100 ml",24,"img/photo-10.jpg"],["Crème pour les pieds","75 ml",18,"img/photo-11.jpg"],["Gommage doux","150 g",22,"img/photo-12.jpg"]];
const S=[...M.map(x=>({n:x[0],p:x[3],m:1})),...P.map(x=>({n:x[0],p:x[3],m:0}))];
let promos=[{n:"-10 % sur les soins des pieds",pc:10,t:"p",on:true},{n:"-10 % sur les massages",pc:10,t:"m",on:false},{n:"-10 % sur la boutique",pc:10,t:"b",on:false}];
let slots=["Lundi 10:00","Lundi 14:00","Mardi 11:00","Jeudi 16:00","Samedi 09:30"],pick=null;
const $=i=>document.getElementById(i),eur=v=>v.toFixed(2).replace('.',',')+' €';
$('lm').innerHTML=M.map(x=>`<div class="row"><div><h3 style="margin:0">${x[0]}</h3><p>${x[1]} · ${x[2]} min</p></div><b>${x[3]} €</b></div>`).join('');
$('gp').innerHTML=P.map(x=>`<div class="card"><img src="${x[4]}" alt=""><small>${x[2]} min</small><div class="nm"><h3>${x[0]}</h3></div><div class="pr">${x[3]} €</div><a class="btn d" href="#rdv">Réserver</a></div>`).join('');
$('gb').innerHTML=B.map(x=>`<div class="card"><img src="${x[3]}" alt=""><small>${x[1]}</small><div class="nm"><h3>${x[0]}</h3></div><div class="pr">${x[2]} €</div><button class="btn d">Ajouter au panier</button></div>`).join('');
$('sv').innerHTML=S.map((x,i)=>`<option value="${i}">${x.n} (${x.p} €)</option>`).join('');
const disc=t=>{const a=promos.filter(p=>p.on&&p.t==t);return a.length?a[0]:null};
function draw(){
 const s=S[$('sv').value],pr=disc(s.m?'m':'p'),tot=s.p*(pr?1-pr.pc/100:1);
 $('wn').style.display=s.m?'block':'none';
 $('sl').innerHTML=slots.map(x=>`<button class="slot${x==pick?' on':''}" data-s="${x}">${x}</button>`).join('');
 $('rs').textContent=s.n;$('rc').textContent=pick||'–';$('rr').style.display=pr?'flex':'none';$('rp').textContent=pr?pr.n:'';$('rt').textContent=eur(tot);
 const on=promos.filter(p=>p.on);$('pb').style.display=on.length?'block':'none';$('pb').textContent=on.map(p=>p.n).join(' · ');
 $('ap').innerHTML=promos.map((p,i)=>`<div class="sw"><span>${p.n}</span><input type="checkbox" data-p="${i}" ${p.on?'checked':''} aria-label="${p.n}"></div>`).join('');
 $('as').innerHTML=slots.map((x,i)=>`<button class="slot" data-r="${i}" title="Retirer">${x} ✕</button>`).join('');
}
document.addEventListener('click',e=>{const t=e.target;
 if(t.dataset.s){pick=t.dataset.s;draw()}if(t.dataset.r){slots.splice(t.dataset.r,1);draw()}
 if(t.dataset.p){promos[t.dataset.p].on=t.checked;draw()}});
$('sv').onchange=draw;
$('ad').innerHTML=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"].map(d=>`<option>${d}</option>`).join('');
$('ah').innerHTML=["09:00","10:00","11:00","14:00","15:00","16:00","17:00"].map(d=>`<option>${d}</option>`).join('');
$('aa').onclick=()=>{slots.push($('ad').value+' '+$('ah').value);draw()};
$('go').onclick=()=>{const s=S[$('sv').value],o=$('ok');o.style.display='block';
 if(s.m&&!$('wc').checked)return o.textContent='Pour réserver un massage, confirme que tu es une femme.';
 if(!pick)return o.textContent='Choisis un créneau pour continuer.';
 o.textContent=`Question avant validation : confirmes-tu ${s.n} le ${pick} ? Si oui, le paiement s'ouvre ici.`};
function route(){const h=(location.hash||'#accueil').slice(1);document.querySelectorAll('.page').forEach(p=>p.classList.toggle('on',p.id==h));
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.hash=='#'+h));scrollTo(0,0)}
addEventListener('hashchange',route);route();draw();
