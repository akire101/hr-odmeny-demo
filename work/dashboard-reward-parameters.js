'use strict';
const rewardParameterNames={p1:'[parameter 1]',p2:'[parameter 2]',p3:'[parameter 3]',p4:'[parameter4]'};
function rewardParameters(row){return Array.isArray(row?.parameters)?Object.keys(rewardParameterNames).filter(p=>row.parameters.includes(p)):[];}
function rewardJustification(row){return row?.justification!==undefined?row.justification:row?.reason||'';}
function rewardParameterControls(context,index,row){const selected=rewardParameters(row);return `<fieldset class="reward-parameters"><legend>Parametre odmeny · možno vybrať viac</legend>${Object.entries(rewardParameterNames).map(([id,label])=>`<label><input type="checkbox" data-reward-context="${context}" data-reward-index="${index}" data-reward-parameter="${id}" data-${context}-parameter="${index}" value="${id}" ${selected.includes(id)?'checked':''}> ${label}</label>`).join('')}</fieldset>`;}
function readRewardParameters(context,index){return Object.keys(rewardParameterNames).filter(p=>$(`[data-${context}-parameter="${index}"][value="${p}"]`)?.checked);}
function rewardOptions(value){
 if(value.parameters===undefined){const regular=!!value.regular,reason=regular?recurringReason:String(value.reason||'').trim();if(!reason||reason.length>500)throw Error('Doplňte odôvodnenie alebo vyberte parameter.');return {regular,reason};}
 if(!Array.isArray(value.parameters)||value.parameters.some(p=>!Object.hasOwn(rewardParameterNames,p)))throw Error('Vyberte platné parametre odmeny.');
 const parameters=Object.keys(rewardParameterNames).filter(p=>value.parameters.includes(p)),justification=String(value.reason||'').trim(),prefix=parameters.map(p=>rewardParameterNames[p]).join(', '),reason=prefix+(prefix&&justification?' · ':'')+justification;
 if(!reason||reason.length>500)throw Error('Doplňte odôvodnenie alebo vyberte aspoň jeden parameter (najviac 500 znakov).');
 return {parameters,justification,reason,regular:!parameters.length&&!!value.legacyRegular&&justification===recurringReason};
}
document.addEventListener?.('change',e=>{const input=e.target;if(!input.matches('[data-reward-parameter]'))return;const context=input.dataset.rewardContext,index=input.dataset.rewardIndex,reason=$(`[data-${context}-reason="${index}"]`),selected=readRewardParameters(context,index);if(reason){reason.disabled=false;reason.required=selected.length===0;reason.placeholder=selected.length?'Nepovinné doplnenie k vybraným parametrom':'Odôvodnenie alebo aspoň jeden parameter';}});
