'use strict';
const presentationNames=(()=>{
 const male=['Adam','Adrián','Alexej','Andrej','Anton','Benedikt','Boris','Branislav','Dalibor','Daniel','David','Denis','Dominik','Eduard','Emil','Erik','Filip','František','Gabriel','Gregor','Henrich','Hugo','Igor','Ivan','Jakub','Ján','Juraj','Karol','Kristián','Ladislav','Leo','Lukáš','Ľubomír','Marcel','Marek','Marián','Martin','Matej','Matúš','Michal','Milan','Miroslav','Oliver','Ondrej','Pavol','Peter','Radoslav','Richard','Róbert','Roman','Samuel','Sebastián','Stanislav','Šimon','Štefan','Tadeáš','Teodor','Tomáš','Viktor','Viliam'];
 const female=['Adela','Adriana','Agáta','Alena','Alexandra','Alžbeta','Andrea','Aneta','Anna','Barbora','Beáta','Bianka','Daniela','Darina','Denisa','Diana','Dominika','Dorota','Ela','Elena','Eliška','Emília','Emma','Erika','Eva','Gabriela','Hana','Helena','Ingrid','Ivana','Jana','Jarmila','Júlia','Karolína','Katarína','Klaudia','Kristína','Laura','Lenka','Linda','Lucia','Ľubica','Magdaléna','Mária','Martina','Michaela','Miriam','Monika','Natália','Nela','Nikoleta','Nina','Patrícia','Paulína','Petra','Radka','Rebeka','Renáta','Romana','Sabína','Silvia','Simona','Soňa','Sofia','Stanislava','Tamara','Tatiana','Terézia','Veronika','Viera','Viktória','Zdenka','Zora','Zuzana'];
 const surnames=['Baláž|Balážová','Bartoš|Bartošová','Bednár|Bednárová','Belák|Beláková','Benčík|Benčíková','Bielik|Bieliková','Blaško|Blašková','Bodnár|Bodnárová','Brezina|Brezinová','Bujna|Bujnová','Caban|Cabanová','Čapek|Čapková','Černák|Černáková','Červeň|Červeňová','Čičman|Čičmanová','Danko|Danková','Dobrovič|Dobrovičová','Dolinský|Dolinská','Drozd|Drozdová','Dúbravský|Dúbravská','Dudáš|Dudášová','Fabian|Fabianová','Farkaš|Farkašová','Fedor|Fedorová','Ferenc|Ferencová','Fiala|Fialová','Filipko|Filipková','Gašpar|Gašparová','Gavenda|Gavendová','Gregor|Gregorová','Habán|Habánová','Hanus|Hanusová','Havran|Havranová','Hlinka|Hlinková','Hodál|Hodálová','Holub|Holubová','Horák|Horáková','Horváth|Horváthová','Hronček|Hrončeková','Hruška|Hrušková','Hudec|Hudcová','Chovan|Chovanová','Ivančík|Ivančíková','Jankovič|Jankovičová','Janota|Janotová','Jaroš|Jarošová','Jelínek|Jelínková','Jurík|Juríková','Kamenický|Kamenická','Klimko|Klimková','Kmeť|Kmeťová','Kollár|Kollárová','Kováč|Kováčová','Králik|Králiková','Krajčír|Krajčírová','Krupka|Krupková','Kučera|Kučerová','Lacko|Lacková','Lipták|Liptáková','Lučan|Lučanová','Lukáč|Lukáčová','Madaras|Madarasová','Majer|Majerová','Marko|Marková','Matiaš|Matiašová','Mihál|Mihálová','Mikluš|Miklušová','Minárik|Mináriková','Moravčík|Moravčíková','Mráz|Mrázová','Nagy|Nagyová','Novák|Nováková','Novotný|Novotná','Ondrejka|Ondrejková','Oravec|Oravcová','Pavlík|Pavlíková','Petrovič|Petrovičová','Polák|Poláková','Procházka|Procházková','Rácz|Ráczová','Remeň|Remeňová','Repa|Repová','Rybár|Rybárová','Sabol|Sabolová','Sedlák|Sedláková','Slávik|Sláviková','Smrek|Smreková','Sokol|Sokolová','Stanko|Stanková','Straka|Straková','Šimko|Šimková','Šoltés|Šoltésová','Štefánik|Štefániková','Tichý|Tichá','Urbanec|Urbancová','Valach|Valachová','Vaňo|Vaňová','Varga|Vargová','Veselý|Veselá','Vlček|Vlčková','Vrábel|Vráblová','Záhradník|Záhradníková','Zelený|Zelená','Žák|Žáková','Žitný|Žitná'];
 const result=new Map([['P001','Matej Hruška'],['P002','Viktória Šimková'],['P003','Samuel Vrábel'],['P004','Šimon Hanus'],['P005','Sofia Králiková'],['P006','Andrej Varga'],['P014','Nina Lacková']]),used=new Set(result.values());
 for(let i=0;i<374;i++){const id=i<350?'P'+String(i+1).padStart(3,'0'):'X'+String(i-349).padStart(3,'0');if(result.has(id))continue;const gender=i%2,first=gender?female:male;let salt=0,name;do{const surname=surnames[(i*37+Math.floor(i/surnames.length)*17+salt)%surnames.length].split('|')[gender];name=first[(Math.floor(i/2)*17+Math.floor(i/first.length)*11+salt)%first.length]+' '+surname;salt++;}while(used.has(name));used.add(name);result.set(id,name);}
 return result;
})();
function presentationLeaderBindings(p){
 const index=new Map((p.org||[]).map(n=>[n.id,n])),rows=new Map(p.batches.filter(b=>!b.direct).flatMap(b=>b.rows.map(r=>[r.number,r]))),humans=(p.org||[]).filter(n=>n.kind==='person'&&rows.get(n.number)?.group==='HUMAN'),leaders=(p.org||[]).filter(n=>n.leader&&n.kind!=='person'),used=new Set(),links=new Map();
 const inside=(id,parent)=>{let n=index.get(id),seen=new Set();while(n&&!seen.has(n.id)){if(n.id===parent)return true;seen.add(n.id);n=index.get(n.parent);}return false;};
 const depth=n=>{let count=0,seen=new Set();while(n&&!seen.has(n.id)){seen.add(n.id);count++;n=index.get(n.parent);}return count;};
 for(const n of leaders.filter(n=>n.rewardNumber)){if(humans.some(p=>p.number===n.rewardNumber)&&!used.has(n.rewardNumber)){links.set(n.id,n.rewardNumber);used.add(n.rewardNumber);}}
 for(const n of leaders.sort((a,b)=>depth(b)-depth(a))){if(links.has(n.id))continue;const person=humans.find(p=>!used.has(p.number)&&inside(p.id,n.id))||humans.find(p=>!used.has(p.number));if(person){links.set(n.id,person.number);used.add(person.number);}}
 return links;
}
function applyPresentationNames(data){
 if(data.version!==4||data.demoNamesVersion===1)return data;
 for(const p of Object.values(data.periods)){const links=presentationLeaderBindings(p),index=new Map((p.org||[]).map(n=>[n.id,n]));
  for(const n of p.org||[]){if(n.kind==='person'&&presentationNames.has(n.number))n.name=presentationNames.get(n.number);if(/^(director|division[0-2]|region[0-3]|unit[0-4]|dept[0-7]|team(?:[0-9]|10|11))$/.test(n.id)&&links.has(n.id)){n.rewardNumber=links.get(n.id);n.leader=presentationNames.get(n.rewardNumber)||n.leader;if(n.kind==='team')n.name='Tím · '+n.leader;}}
  for(const b of p.batches){for(const r of [...b.rows,...(b.versions||[]).flatMap(v=>v.rows||[])])if(presentationNames.has(r.number))r.name=presentationNames.get(r.number);if(b.direct)b.manager='Samostatná odmena · '+b.rows[0].name;else if(b.staff)b.manager='Priami podriadení · '+(index.get(b.scopeNode)?.leader||index.get(b.scopeNode)?.name||b.manager);else if(index.get('team'+b.id))b.manager=index.get('team'+b.id).leader;}
 }
 data.demoNamesVersion=1;return data;
}

// Management cards represent the same person as their payroll identity, never their own report.
function alignLeaderParents(data){
 for(const p of Object.values(data.periods)){
  const index=new Map((p.org||[]).map(n=>[n.id,n]));
  for(const [id,number] of presentationLeaderBindings(p)){
   const manager=index.get(id),person=index.get(number);
   if(!manager||!person)continue;
   manager.rewardNumber=number;
   person.parent=manager.parent;
  }
 }
 return data;
}
function ownRewardRow(row){return db.version===4&&demoRole!=='hr'&&row.number===leaderBindings().get(personalManagerScope());}
function manualRowVisible(row){return db.version!==4||demoRole==='hr'||ownRewardRow(row)||inside(row.number,personalManagerScope());}
function manualRowEditable(row){return db.version!==4||demoRole==='hr'||!ownRewardRow(row)&&inside(row.number,personalManagerScope());}
function assertNoSelfAward(rows,b){
 for(const own of rows.filter(r=>!manualRowEditable(r))){
 const before=b.rows.find(r=>r.number===own.number);
 if(!before||own.cents!==before.cents||rewardJustification(own)!==rewardJustification(before)||JSON.stringify(rewardParameters(own))!==JSON.stringify(rewardParameters(before)))throw Error('Vlastnú odmenu nemôžete meniť. Zadáva ju váš nadriadený.');
 }
}
