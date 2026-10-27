 'use strict';
// Every reporting level runs horizontally; opening a branch shows one level at native zoom.
function atlasLayout(focus='company',includePeople=true){
 const root=node(focus)||node('company'),children=new Map(),seen=new Set(),widths=new Map(),nodes=[],edges=[];
 for(const n of org()){if(!includePeople&&n.kind==='person')continue;if(!children.has(n.parent))children.set(n.parent,[]);children.get(n.parent).push(n);}
 function measure(n){if(seen.has(n.id))throw Error('Cyklus v organizačnej štruktúre.');seen.add(n.id);const cs=children.get(n.id)||[],w=Math.max(n.kind==='person'?208:300,cs.reduce((sum,c)=>sum+measure(c),0));seen.delete(n.id);widths.set(n.id,w);return w;}
 const width=measure(root)+32;
 function place(n,left,depth){const person=n.kind==='person',w=person?192:280,h=person?60:112,x=left+(widths.get(n.id)-w)/2,y=16+depth*166;nodes.push({...n,x,y,width:w,height:h});let next=left;for(const c of children.get(n.id)||[]){place(c,next,depth+1);edges.push({from:n.id,to:c.id,person:c.kind==='person'});next+=widths.get(c.id);}}
 place(root,16,0);
 if(focus!=='company'&&node(root.parent)){const parent=node(root.parent);nodes.forEach(n=>n.y+=166);nodes.unshift({...parent,x:(width-280)/2,y:16,width:280,height:112});edges.unshift({from:parent.id,to:root.id});}
 const positions=new Map(nodes.map(n=>[n.id,n]));for(const e of edges){const a=positions.get(e.from),b=positions.get(e.to),cx=a.x+a.width/2;e.path=`M${cx} ${a.y+a.height} V${a.y+a.height+24} H${b.x+b.width/2} V${b.y}`;}
 return {kind:'atlas',nodes,edges,groups:[],width,height:Math.max(...nodes.map(n=>n.y+n.height))+24};
}
function atlasGroupSvg(){return '';}
let reviewPeoplePage=0,reviewPeopleFocus='';
function reviewDirectLayout(focus='company',availableWidth=1160){
 const leader=node(focus)||node('company'),raw=org().filter(n=>n.parent===leader.id),reports=raw.filter(n=>!n.managerNode||!raw.some(c=>c.id===n.managerNode)),width=Math.max(340,availableWidth-24),people=reports.every(n=>n.kind==='person'),gap=16,pad=28,minCard=people?176:260,cols=Math.max(1,Math.min(reports.length||1,Math.floor((width-pad*2+gap)/(minCard+gap)))),cardWidth=Math.min(people?220:280,(width-pad*2-gap*(cols-1))/cols),cardHeight=people?76:140,top=220,rowStep=cardHeight+16;
 const nodes=[{...leader,x:(width-300)/2,y:16,width:300,height:132}],edges=[];
 reports.forEach((n,i)=>{const col=i%cols,row=Math.floor(i/cols),rowWidth=cols*cardWidth+(cols-1)*gap,x=(width-rowWidth)/2+col*(cardWidth+gap),y=top+row*rowStep;nodes.push({...n,x,y,width:cardWidth,height:cardHeight});edges.push({from:leader.id,to:n.id,person:n.kind==='person',grouped:reports.length>1,path:reports.length===1?`M${width/2} 148 V${y}`:`M${width/2} 148 V170 H20 V${y-8} H${x+cardWidth/2} V${y}`});});
 const height=Math.max(360,top+Math.ceil(reports.length/cols)*rowStep+28),group=reports.length>1?{x:12,y:182,width:width-24,height:height-198,count:reports.length}:null;
 return {kind:'direct',nodes,edges,groups:[],memberGroup:group,width,height,totalReports:reports.length,page:0,pageSize:reports.length,pageCount:1,allReportIds:reports.map(n=>n.id),rangeStart:reports.length?1:0,rangeEnd:reports.length};
}
