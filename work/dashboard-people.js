'use strict';
const employeeOriginalOrgEditor=orgEditor,employeeOriginalReviewAction=reviewAction,employeeOriginalPerson=personalPerson,employeeOriginalCandidates=personalCandidates,employeeOriginalInspector=reviewInspector;
function employeeNumber(){const ids=new Set([...org().map(n=>n.id),...unassigned().map(n=>n.number)]);let i=351;while(ids.has('P'+String(i).padStart(3,'0')))i++;return 'P'+String(i).padStart(3,'0');}
function employeeTeamTarget(id){const n=node(id);return n?.managerNode&&node(n.managerNode)?n.managerNode:id;}
function employeeEditor(id=null,parent=null){
 if(demoRole!=='hr'||period().closed)return toast('Údaje môže upraviť HR v otvorenom mesiaci.',true);
 mapEditMode=true;let n=node(id);if(n?.kind!=='person'&&n?.rewardNumber)n=node(n.rewardNumber);if(id&&!n)return;
 const team=n?.managerNode?node(n.managerNode):null,selected=parent||n?.parent||'',dept=mapPath(selected||mapState.focus).slice().reverse().find(x=>x.kind==='department'),owners=org().filter(x=>staffKinds.includes(x.kind)),departments=org().filter(x=>x.kind==='department'),row=n?mapBatch(n)?.rows.find(r=>r.number===n.number):null;
 modal(n?'Upraviť údaje pracovníka':'Nový pracovník',`<form id="employee-form"><input type="hidden" id="employee-original" value="${esc(n?.id||'')}"><div class="formgrid"><label>Meno a priezvisko<input id="employee-name" required maxlength="100" value="${esc(n?.name||'')}"></label><label>Osobné číslo<input id="employee-number" required maxlength="20" value="${esc(n?.number||employeeNumber())}" ${n?'readonly':''}></label><label>Pracovná pozícia<input id="employee-position" required maxlength="100" value="${esc(n?.position||'')}" placeholder="Napr. sieťový technik"></label><label>Výstup<select id="employee-group"><option value="HUMAN">Zamestnanec · HUMAN</option><option value="EXTERNISTI" ${row?.group==='EXTERNISTI'?'selected':''}>Externista</option></select></label><label>E-mail<input type="email" id="employee-email" maxlength="150" value="${esc(n?.email||'')}"></label><label>Telefón<input id="employee-phone" maxlength="30" value="${esc(n?.phone||'')}"></label><label class="full">Nadriadený / tím<select id="employee-parent"><option value="">Zatiaľ nezaradený · zaradím presunutím karty</option>${owners.map(x=>`<option value="${x.id}" ${x.id===selected?'selected':''}>${esc(x.name)}${x.leader?' · '+esc(x.leader):''}</option>`).join('')}</select></label></div><p class="notice">Oddelenie a nákladové stredisko sa preberú z vybraného nadriadeného. Sumu a dôvod odmeny zadáte následne v podklade.</p><label class="recurring-control"><input type="checkbox" id="employee-manager" ${team?'checked disabled':''}> Táto osoba vedie vlastný tím a môže mať podriadených</label><div class="employee-team-fields formgrid"><label>Názov vlastného tímu<input id="employee-team-name" maxlength="100" value="${esc(team?.name||'')}" placeholder="Napr. Servis zákazníckych sietí"></label><label>Oddelenie pre vlastný tím<select id="employee-team-parent">${departments.map(x=>`<option value="${x.id}" ${x.id===(team?.parent||dept?.id)?'selected':''}>${esc(x.name)} · ${esc(x.leader||'')}</option>`).join('')}</select></label><p class="notice full">Vedúci sa zaradí priamo pod vybrané oddelenie. Jeho podriadení budú patriť do vlastného tímu. Vedúci zostáva jednou osobou v odmeňovaní.</p></div><div id="employee-error" role="alert"></div><button type="submit" class="primary">${n?'Uložiť údaje a zaradenie':'Vytvoriť pracovníka'}</button></form>`);
}
function employeeCommit(data){
 if(demoRole!=='hr'||period().closed||!reviewEditing())throw Error('Úprava je povolená iba HR v režime úprav otvoreného mesiaca.');
 const name=String(data.name||'').trim(),number=String(data.number||'').trim(),position=String(data.position||'').trim(),email=String(data.email||'').trim(),phone=String(data.phone||'').trim(),group=data.group,existing=data.id?node(data.id):null,own=!!data.manager;
 if(!name||name.length>100||!position||position.length>100)throw Error('Doplňte meno a pracovnú pozíciu (najviac 100 znakov).');
 if(!/^[A-Za-z0-9_-]{1,20}$/.test(number)||!['HUMAN','EXTERNISTI'].includes(group))throw Error('Skontrolujte osobné číslo a výstup.');
 if(email.length>150||email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||phone.length>30)throw Error('Skontrolujte e-mail a telefón.');
 if(data.id&&(!existing||existing.kind!=='person'||existing.number!==number))throw Error('Osobné číslo existujúcej osoby nemožno zmeniť.');
 if(!existing&&(org().some(n=>n.id===number)||unassigned().some(n=>n.number===number)))throw Error('Osobné číslo už existuje.');
 const department=own?node(data.teamParent):null,parent=own?department?.id:data.parent;
 if(own&&(!department||department.kind!=='department'||group!=='HUMAN'))throw Error('Vyberte oddelenie pre vlastný tím; vedúci musí byť zamestnanec HUMAN.');
 if(db.teamSizeLayout===1&&node(parent)?.kind==='team'&&existing?.parent!==parent&&(mapBatch(node(parent))?.rows.length||0)>=20)throw Error('Tím už má 20 členov. Vyberte iný tím alebo vytvorte nový.');
 if(parent&&!staffKinds.includes(node(parent)?.kind))throw Error('Vyberte platného nadriadeného.');
 if(existing&&!parent)throw Error('Existujúcu osobu treba ponechať zaradenú pod nadriadeným.');
 if(existing?.managerNode&&!own)throw Error('Osoba už vedie tím; vlastný tím musí zostať zachovaný.');
 const teamName=String(data.teamName||'').trim()||'Tím · '+name;if(teamName.length>100)throw Error('Názov tímu môže mať najviac 100 znakov.');
 const before=structuredClone(period()),undoLength=reviewUndo.length;
 try{
  let n=existing;
  if(!n){const draft=reviewCreatePerson(name,number,group);Object.assign(unassigned().find(x=>x.number===number),{position,email,phone});if(!parent)return {id:draft,parent:null};reviewMove(draft,parent);n=node(number);}
  else if(n.parent!==parent)reviewMove(n.id,parent);
  const base=mapBatch(n),row=base?.rows.find(r=>r.number===number);if(!row)throw Error('Pracovník nemá platný podklad.');
  if(row.name!==name||row.group!==group){invalidateBatch(base);for(const b of allBatches().filter(b=>b.direct&&!b.cancelled&&b.rows.some(r=>r.number===number))){b.rows.forEach(r=>{if(r.number===number){r.name=name;r.group=group;}});if(b.submitted){b.stage=-2;b.comment='HR zmenilo údaje príjemcu; skontrolujte a znova odošlite návrh.';}b.manager='Samostatná odmena · '+name;b.history.push('HR zmenilo údaje príjemcu.');}}
  row.name=name;row.group=group;Object.assign(n,{name,position,email,phone,center:base.center});
  if(own){let team=n.managerNode?node(n.managerNode):null;if(!team){const id=Math.max(-1,...allBatches().map(b=>b.id))+1;team={id:'team'+id,kind:'team',parent:department.id,name:teamName,leader:name,batchId:id,rewardNumber:number,personNumber:number};org().push(team);allBatches().push({id,manager:name,center:department.center??base.center,stage:-1,submitted:false,source:'',uploader:'',rows:[],history:[],versions:[],reminders:0,comment:''});n.managerNode=team.id;}else{if(team.parent!==department.id){assertOrgMove(team.id,department.id);team.parent=department.id;invalidateBatch(mapBatch(team));}team.name=teamName;team.leader=name;team.rewardNumber=number;mapBatch(team).manager=name;mapBatch(team).center=department.center??base.center;}}
  log('HR uložilo údaje pracovníka '+name+' ('+number+').'+(own?' Vlastný tím: '+teamName+'.':''));return {id:n.id,parent:n.managerNode||parent};
 }catch(error){db.periods[active]=before;reviewUndo.splice(undoLength);persist();throw error;}
}
orgEditor=function(id,edit=false){const n=node(id);if(n?.kind==='person'&&edit||n?.personNumber&&edit)return employeeEditor(id);if(!edit&&n?.kind==='team')return employeeEditor(null,id);return employeeOriginalOrgEditor(id,edit);};
reviewNewPerson=function(){return employeeEditor();};
reviewAction=function(a,arg){
 if(a==='review-page'){reviewPeoplePage+=arg==='next'?1:-1;mapState.selected=mapState.focus;reviewPose=null;render();return true;}
 if(a==='employee-edit'){employeeEditor(arg);return true;}
 if(a==='employee-add-report'){const n=node(arg),target=employeeTeamTarget(arg);if(target===arg&&n?.kind==='person'){employeeEditor(arg);$('#employee-manager').checked=true;return true;}employeeEditor(null,target);return true;}
 return employeeOriginalReviewAction(a,arg);
};
personalCandidates=function(){const all=employeeOriginalCandidates(),byNumber=new Map();for(const p of all){const old=byNumber.get(p.number);if(!old||node(p.nodeId)?.personNumber)byNumber.set(p.number,p);}return [...byNumber.values()];};
personalPerson=function(id){employeeOriginalPerson(id);let n=node(id);if(n?.personNumber)n=node(n.personNumber);if(!n)return;const scope=demoRole==='hr'||demoRole==='director'||inside(n.id,enterpriseScopeId());$('#dialog-content').insertAdjacentHTML('beforeend',`<dl class="employee-details"><dt>Pracovná pozícia</dt><dd>${esc(n.position||'Údaje ešte nie sú doplnené')}</dd>${scope?`<dt>E-mail</dt><dd>${esc(n.email||'Neuvedený')}</dd><dt>Telefón</dt><dd>${esc(n.phone||'Neuvedený')}</dd>`:''}</dl>${demoRole==='hr'&&!period().closed?`<div class="buttonrow">${button('Upraviť údaje','employee-edit:'+n.id)}${button(n.managerNode?'Pridať podriadeného':'Vytvoriť vlastný tím','employee-add-report:'+n.id)}</div>`:''}`);};
document.addEventListener?.('submit',e=>{if(e.target.id!=='employee-form')return;e.preventDefault();try{const result=employeeCommit({id:$('#employee-original').value,name:$('#employee-name').value,number:$('#employee-number').value,position:$('#employee-position').value,email:$('#employee-email').value,phone:$('#employee-phone').value,group:$('#employee-group').value,parent:$('#employee-parent').value,manager:$('#employee-manager').checked,teamName:$('#employee-team-name').value,teamParent:$('#employee-team-parent').value});$('#dialog').close();reviewPose=null;if(result.id.startsWith('draft:'))reviewSelectedDraft=result.id;else{reviewSelectedDraft=null;reviewFocus(result.parent,'focus');mapState.selected=node(result.id)?.managerNode||result.id;employeeReveal(mapState.selected,result.parent);render();}persist();toast(result.id.startsWith('draft:')?'Karta je vytvorená. Zaraďte ju pod vedúceho.':node(result.id)?.managerNode?'Údaje sú uložené. Vlastný tím môžete otvoriť a pridať podriadených.':'Údaje pracovníka sú uložené. Nadriadený a stredisko sa prebrali zo zaradenia.');}catch(error){$('#employee-error').textContent=error.message;}});

reviewInspector=function(){let html=employeeOriginalInspector(),selected=node(mapState.selected);const n=selected?.personNumber?node(selected.personNumber):selected?.kind==='person'?selected:null;if(n){const b=mapBatch(n),parent=node(n.parent);html=`<section class="employee-summary"><h3>Údaje pracovníka</h3><p><strong>${esc(n.position||'Pracovná pozícia chýba')}</strong> · ${esc(n.number)}</p><p>Nadriadený: ${esc(parent?.leader||parent?.name||'Nezaradený')} · Stredisko: ${esc(centers[b?.center]||'Doplní sa zaradením')}</p>${demoRole==='hr'&&!period().closed?`<div class="buttonrow">${button('Upraviť údaje','employee-edit:'+n.id,'class="primary"')}${button(n.managerNode?'Pridať podriadeného':'Vytvoriť vlastný tím','employee-add-report:'+n.id)}</div>`:''}</section>`+html;}return html;};

function employeeReveal(id,parent){const l=reviewDirectLayout(parent,$('#content')?.clientWidth||1160),at=l.allReportIds.indexOf(id);if(at>=0)reviewPeoplePage=Math.floor(at/l.pageSize);}

const employeeOriginalMapStatus=mapStatus;
mapStatus=function(n){const status=employeeOriginalMapStatus(n);if(db.version!==4)return status;const award=allBatches().find(b=>b.direct&&!b.cancelled&&(b.recipientNode===n?.id||n?.number===b.rows[0]?.number)&&b.stage<endStage()),b=award||mapBatch(n);if(b?.submitted&&b.stage>=0&&b.stage<endStage()&&['person','team'].includes(n?.kind))return {...status,label:(award?'Samostatná odmena · ':'')+namedApprovalState(b)};return status;};

// A real manager's payroll identity and management card must move together.
const employeeOriginalMove=reviewMove;
reviewMove=function(id,target,sibling=null,after=false){
 const source=node(id),team=source?.personNumber?source:source?.managerNode?node(source.managerNode):null;
 if(!team)return employeeOriginalMove(id,target,sibling,after);
 target=employeeTeamTarget(target);if(node(target)?.kind!=='department')throw Error('Vedúceho s vlastným tímom presuňte pod oddelenie alebo použite Upraviť údaje.');
 const person=node(team.personNumber),before=structuredClone(period()),undo=reviewUndo.slice();
 try{const result=employeeOriginalMove(team.id,target,source.kind==='team'?sibling:null,after);if(person.parent!==target)employeeOriginalMove(person.id,target);person.center=mapBatch(person)?.center;reviewUndo.splice(0,reviewUndo.length,...undo);reviewUndo.push({code:active,before,title:person.name});if(reviewUndo.length>5)reviewUndo.shift();return {...result,selected:team.id};}
 catch(error){db.periods[active]=before;reviewUndo.splice(0,reviewUndo.length,...undo);persist();throw error;}
};

document.addEventListener?.('change',e=>{if(e.target.id==='org-kind'&&e.target.value==='person'){const parent=$('#org-parent')?.value;e.stopImmediatePropagation();employeeEditor(null,parent);}});
