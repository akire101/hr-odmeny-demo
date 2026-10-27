'use strict';
const staffKinds=['team','department','unit','region','division','director'];
const batchAnchor=b=>b.direct?b.recipientNode:b.staff?b.scopeNode:'team'+b.id;
function staffOwnerStage(n){return Math.max(0,stageRoles.indexOf(n.kind));}
function staffBatch(owner,create=false){
 if(owner?.kind==='team')return allBatches().find(b=>!b.direct&&b.id===owner.batchId);
 if(!owner||!staffKinds.includes(owner.kind))return null;
 let b=allBatches().find(b=>b.staff&&b.scopeNode===owner.id);
 if(!b&&create){const ancestor=mapPath(owner.id).slice().reverse().find(n=>Number.isInteger(n.center)),center=ancestor?.center??0;
  b={id:Math.max(-1,...allBatches().map(b=>b.id))+1,staff:true,scopeNode:owner.id,startStage:staffOwnerStage(owner),manager:'Priami podriadení · '+(owner.leader||owner.name),center,stage:-1,submitted:false,source:'',uploader:'',rows:[],history:[],versions:[],reminders:0,comment:''};allBatches().push(b);
 }
 return b;
}
function staffCanSubmit(b){return !!b?.staff&&demoRole===node(b.scopeNode)?.kind&&(enterpriseScopeId()===b.scopeNode||demoRole==='director'&&b.scopeNode==='director');}
function staffPlacePerson(person,target){const b=staffBatch(target,true);if(!b)throw Error('Vyberte vedúceho tímu alebo vyššej vetvy.');invalidateBatch(b);b.rows.push({number:person.number,name:person.name,group:person.group,cents:0,regular:false,reason:'Potvrdenie bez odmeny – doplňte v podklade',type:'Výkonová'});return b;}
function staffMapReadability(){
 const zoom=mapState.zoom;document.querySelectorAll('.atlas-group').forEach(el=>el.style.strokeWidth=((el.classList.contains('atlas-group-division')?1.6:.8)/zoom)+'px');
 document.querySelectorAll('.review-map .map-edge:not(.my-route-edge)').forEach(el=>{el.style.strokeWidth=((el.classList.contains('person-link')?.8:1.7)/zoom)+'px';el.style.opacity=el.classList.contains('person-link')?'.45':'.85';});
 document.querySelectorAll('.review-map .review-node').forEach(el=>{
  const overview=reviewMode==='overview',factor=overview?1/Math.max(.5,zoom):1;
  for(const [selector,size] of [['strong',14],['.node-leader',12],['.node-kind',10],['.map-node-state',10]]){const text=el.querySelector(selector);if(text){text.style.fontSize=overview?size*factor+'px':'';text.style.lineHeight=overview?'1.2':'';if(selector==='strong')text.style.maxHeight=overview?'none':'';}}
 });
}
function staffMountMap(){const vp=$('#map-viewport');if(!vp)return;const lens=document.createElement('div');lens.className='map-readable-card';lens.hidden=true;lens.setAttribute('role','tooltip');vp.append(lens);
 const show=e=>{const card=e.target.closest('.review-node');if(!card||mapState.zoom>=.7){lens.hidden=true;return;}const n=node(card.dataset.dragId);if(!n)return;const s=mapStatus(n);lens.innerHTML=`<strong>${esc(n.name)}</strong>${n.leader?`<span>${esc(n.leader)}</span>`:''}<span>${esc(s.label)}</span><small>Dvojklik otvorí ${n.kind==='person'?'človeka':'vetvu'}</small>`;lens.hidden=false;};
 vp.addEventListener('pointerover',show);vp.addEventListener('focusin',show);vp.addEventListener('pointerleave',()=>lens.hidden=true);vp.addEventListener('focusout',()=>lens.hidden=true);
}
