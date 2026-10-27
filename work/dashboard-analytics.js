'use strict';
let chartIncludeDescendants=true;
function chartScopedBatches(code=active){
 const p=db.periods[code];if(!p)return [];
 if(db.version!==4){const ids=new Set(batches().map(b=>b.id));return p.batches.filter(b=>ids.has(b.id));}
 const scope=demoRole==='director'?'director':enterpriseScopeId(),index=new Map((p.org||[]).map(n=>[n.id,n]));
 const under=id=>{const seen=new Set();let n=index.get(id);while(n&&!seen.has(n.id)){if(n.id===scope)return true;seen.add(n.id);n=index.get(n.parent);}return false;};
 let directNumbers=null;
 if(demoRole!=='hr'&&!chartIncludeDescendants){
  directNumbers=new Set();const links=presentationLeaderBindings(p);
  for(const n of p.org||[])if(n.parent===scope&&!(n.kind==='person'&&n.number===links.get(scope))){if(n.kind==='person')directNumbers.add(n.number);else if(links.has(n.id))directNumbers.add(links.get(n.id));}
 }

 return p.batches.map(b=>{if(b.cancelled)return null;const anchor=b.direct?b.recipientNode:b.staff?b.scopeNode:'team'+b.id;if(demoRole!=='hr'&&!under(anchor))return null;const rows=b.rows.filter(r=>demoRole==='hr'||(directNumbers?directNumbers.has(r.number):under(r.number)));return rows.length?{...b,rows}:null;}).filter(Boolean);
}
function chartScopeControls(){const count=new Set(chartScopedBatches().flatMap(b=>b.rows.map(r=>r.number))).size;const root=demoRole==='hr'?node('company'):node(demoRole==='director'?'director':enterpriseScopeId());return `<section class="panel analytics-scope"><div><h2>Rozsah grafov: ${esc(root?.name||'Moja vetva')}</h2><p>${root?.leader?esc(root.leader)+' · ':''}${demoRole==='hr'?'HR · celá spoločnosť':chartIncludeDescendants?'Moja vetva vrátane všetkých nižších úrovní':'Iba moji priami podriadení'} · ${count} osôb vo výbere</p></div>${demoRole!=='hr'?`<label class="recurring-control"><input id="chart-descendants" type="checkbox" ${chartIncludeDescendants?'checked':''}> Zahrnúť aj nižšie organizačné úrovne</label>`:''}</section>`;}

function chartPalette(){return document.documentElement?.dataset?.theme==='dark'?{human:'#50b848',external:'#c2ad96',missing:'#ee8c7c',pending:'#f6ad68',approved:'#50b848'}:{human:'#c45412',external:'#807060',missing:'#aa3933',pending:'#b76b08',approved:'#357439'};}
