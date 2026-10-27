'use strict';
// This restructures fictional presentation teams, retaining every payroll row and its amount.
function ensureSmallTeams(data,force=false){
 if(data?.version!==4||data.teamSizeLayout===1&&!force)return data;
 const periods=Object.values(data.periods),plan=data.teamSplitPlan||{},usedIds=new Set(periods.flatMap(p=>p.batches.map(b=>b.id)));let next=Math.max(0,...usedIds)+1;
 for(const p of periods)for(const b of p.batches.filter(b=>!b.direct&&!b.staff)){
  const parts=Math.ceil(b.rows.length/20);if(parts<=1)continue;plan[b.id]??=[];while(plan[b.id].length<parts-1){while(usedIds.has(next))next++;plan[b.id].push(next);usedIds.add(next++);}
 }
 for(const [code,p] of Object.entries(data.periods)){
  const links=presentationLeaderBindings(p),usedPeople=new Set(links.values()),original=p.batches.filter(b=>!b.direct&&!b.staff&&b.rows.length>20),index=new Map(p.org.map(n=>[n.id,n]));
  if(!original.length)continue;
  p.teamSplitHistory??=[];
  for(const b of original){
   const oldNode=index.get('team'+b.id);if(!oldNode)throw Error('Tím nemá organizačnú kartu: '+b.id);
   const rows=b.rows.slice(),parts=Math.ceil(rows.length/20),size=Math.floor(rows.length/parts),remainder=rows.length%parts,groups=[];let at=0;
   for(let part=0;part<parts;part++){const count=size+(part<remainder?1:0);groups.push(rows.slice(at,at+count));at+=count;}
   p.teamSplitHistory.push({teamId:b.id,manager:b.manager,stage:b.stage,submitted:b.submitted,members:rows.map(r=>r.number),newTeams:[b.id,...plan[b.id].slice(0,parts-1)]});
   const originalBatch=structuredClone(b);b.versions??=[];b.versions.push({rows:structuredClone(rows),stage:b.stage,source:b.source,hash:b.hash,note:'Pred prezentačným rozdelením tímu'});delete b.hash;b.rows=groups[0];b.history??=[];b.history.push('Prezentačný tím rozdelený na skupiny do 20 ľudí; osobné čísla, sumy a pôvodný ilustračný stav zachované.');
   for(let part=1;part<parts;part++){
    const id=plan[b.id][part-1],chunk=groups[part],leader=chunk.find(r=>r.group==='HUMAN'&&!usedPeople.has(r.number))||chunk.find(r=>r.group==='HUMAN')||chunk[0];usedPeople.add(leader.number);
    const batch={...structuredClone(originalBatch),id,manager:leader.name,rows:chunk,source:originalBatch.source?'Rozdelenie prezentačného tímu · '+originalBatch.source:'',history:[...originalBatch.history,'Menší prezentačný tím vytvorený z tímu '+b.manager+'.'],versions:[],splitFrom:b.id};delete batch.hash;
    p.batches.push(batch);const branch={id:'team'+id,parent:oldNode.parent,kind:'team',name:'Tím · '+leader.name,leader:leader.name,batchId:id,rewardNumber:leader.number,splitFrom:b.id};p.org.push(branch);index.set(branch.id,branch);
    for(const row of chunk){const person=index.get(row.number);if(person)person.parent=branch.id;}
   }
  }
  p.history.unshift({at:'27. 10. 2026',text:'Prezentačné tímy upravené na najviac 20 členov vrátane externistov. Sumy a jedinečné osobné čísla zostali zachované.'});
 }
 data.teamSplitPlan=plan;data.teamSizeLayout=1;return data;
}
