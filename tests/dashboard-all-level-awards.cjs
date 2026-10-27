const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const source=['dashboard-team.js','dashboard-map.js','dashboard-enterprise.js','dashboard-review.js','dashboard-personal.js','dashboard-staff.js','dashboard-analytics.js','dashboard-atlas.js','dashboard-names.js','dashboard-people.js','dashboard-withdraw.js','dashboard-small-teams.js','dashboard-reward-parameters.js'].map(f=>fs.readFileSync('work/'+f,'utf8')).join('\n')+'\n'+fs.readFileSync('work/dashboard.js','utf8').split("document.addEventListener('submit'")[0];
const nodes=new Map(),document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,{value:'',checked:false,textContent:'',innerHTML:'',disabled:false,dataset:{},classList:{toggle(){}},close(){this.open=false},showModal(){this.open=true},focus(){}});return nodes.get(s);}};
let count=0;const check=(name,fn)=>{fn();count++;console.log('PASS',name)};
vm.runInNewContext(source+`
render=()=>{};toast=()=>{};
function fresh(){db=seedEnterprise(false);active='2026-10';demoRole='hr';mapEditMode=true;reviewUndo.length=0;reviewSelectedDraft=null;demoTeam=0;demoDepartment='dept0';}

function identity(role,id){demoRole=role;if(role==='team')demoTeam=node(id).batchId;if(role==='department')demoDepartment=id;if(role==='unit')demoUnit=id;if(role==='region')demoRegion=id;if(role==='division')demoDivision=id;}
fresh();const authorRoles=['team','department','unit','region','division','director'];const scenarios=org().filter(n=>authorRoles.includes(n.kind)).map(n=>({role:n.kind,id:n.id}));
for(const spec of scenarios)check(spec.role+' '+spec.id+': strict direct reports and complete approval route',()=>{
 fresh();active='2026-09';identity(spec.role,spec.id);
 const expected=org().filter(n=>n.parent===spec.id&&(n.leader||n.kind==='person')&&n.number!==leaderBindings().get(spec.id)).map(n=>n.id).sort(),people=personalCandidates();
 assert.deepEqual(Array.from(people.map(p=>p.nodeId)).sort(),Array.from(expected));assert.ok(people.length);assert.ok(people.every(p=>node(p.nodeId).parent===spec.id));assert.ok(people.every(p=>p.nodeId!==spec.id));
 const foreign=org().find(n=>(n.leader||n.kind==='person')&&n.id!==spec.id&&!expected.includes(n.id));personalDraft=null;personalEditor([foreign.id]);assert.equal(personalDraft,null);
 const recipient=people[0],otherMonth=JSON.stringify(db.periods['2026-10']),baseSum=total(allBatches().flatMap(b=>b.rows));
 personalEditor([recipient.nodeId]);const draft=structuredClone(personalDraft),before=JSON.stringify(period());personalDraft.people[0].nodeId=foreign.id;assert.throws(()=>personalSave([{amount:'123,45',reason:'Výsledky priameho podriadeného',regular:false}]));assert.equal(JSON.stringify(period()),before);personalDraft=draft;
 const [id]=personalSave([{amount:'123,45',reason:'Výsledky priameho podriadeného',regular:false}]),b=allBatches().find(b=>b.id===id);
 assert.equal(b.startStage,stageRoles.indexOf(spec.role)+1);assert.equal(b.authorScope,spec.id);assert.equal(canDecide(b),false);assert.equal(personalCanEdit(b),true);assert.ok(personalDirectReportsPanel().includes('Moji priami podriadení'));
 const otherAuthor=org().find(n=>n.kind===spec.role&&n.id!==spec.id);if(otherAuthor){identity(spec.role,otherAuthor.id);assert.equal(personalCanEdit(b),false);assert.ok(!batches().some(item=>item.id===id));identity(spec.role,spec.id);}
 while(b.stage<7){const role=stageRoles[b.stage],scope=mapPath(b.recipientNode).find(n=>n.kind===role)?.id;identity(role,scope);assert.equal(canDecide(b),true);const wrong=org().find(n=>n.kind===role&&n.id!==scope);if(wrong){identity(role,wrong.id);assert.equal(canDecide(b),false);identity(role,scope);}decision(id,false);}
 assert.equal(b.stage,7);assert.equal(JSON.stringify(db.periods['2026-10']),otherMonth);assert.equal(personalExportRows(allBatches()).length,374);assert.equal(total(personalExportRows(allBatches())),baseSum+12345);
});
check('closed periods reject candidates and saved proposals for every manager role',()=>{for(const role of authorRoles){fresh();const manager=org().find(n=>n.kind===role);identity(role,manager.id);personalEditor([personalCandidates()[0].nodeId]);period().closed=true;const before=JSON.stringify(period());assert.equal(personalCandidates().length,0);assert.throws(()=>personalSave([{amount:'10',reason:'Výsledok',regular:false}]));assert.equal(JSON.stringify(period()),before);}});
check('HR retains all-company selection; team leader includes own external people only',()=>{fresh();assert.equal(personalCandidates().length,374);identity('team','team0');assert.ok(personalCandidates().some(p=>p.nodeId==='X001'));assert.ok(!personalCandidates().some(p=>p.nodeId==='X003'));personalEditor(['X001']);const [id]=personalSave([{amount:'10,75',reason:'Dodaná služba',regular:false}]);const b=allBatches().find(b=>b.id===id);assert.equal(b.rows[0].group,'EXTERNISTI');assert.equal(b.stage,1);demoRole='department';demoDepartment='dept0';assert.equal(canDecide(b),true);});

`,{document,localStorage:{getItem:()=>null,setItem(){}},assert,check,Intl,Date,console,crypto,TextDecoder,TextEncoder,setTimeout:()=>0,clearTimeout(){},structuredClone});
console.log('PASSED',count,'all-level scope and approval scenarios');
