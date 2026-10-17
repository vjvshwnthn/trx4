(() => {
 const svg=document.querySelector('#radial-svg'); if(!svg)return;
 const NS='http://www.w3.org/2000/svg', grid=svg.querySelector('#radial-grid');
 function el(tag,attrs){const n=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));return n}
 // Fine, stationary spokes and arcs, inspired by the supplied radial-system reference.
 for(let i=0;i<24;i++){
   const a=(i*15-90)*Math.PI/180,inner=50,outer=i%3===0?198:185;
   grid.append(el('line',{x1:300+Math.cos(a)*inner,y1:210+Math.sin(a)*inner,x2:300+Math.cos(a)*outer,y2:210+Math.sin(a)*outer,class:'radial-spoke'+(i%3===0?' radial-spoke-strong':'')}));
 }
 for(let i=0;i<6;i++){
   const a=(i*60-90)*Math.PI/180,r=185;
   grid.append(el('circle',{cx:300+Math.cos(a)*r,cy:210+Math.sin(a)*r,r:2.5,class:'radial-pin'}));
 }
 const stages=[
  {name:'01 / MARKET INTELLIGENCE',tags:['ICP Refinement','Category Positioning','Competitive Battlecards','Messaging']},
  {name:'02 / BRAND BUILDING',tags:['Consistent Look & Feel','Content Arcs','Website Copy','Sales Assets','Investor Pitch Decks']},
  {name:'03 / GTM AUTOMATION',tags:['ICP Builder','Pipeline Generation','Outreach','Engagement','Conversion']}
 ];
 const nodes=[...svg.querySelectorAll('.radial-node')],progress=[...svg.querySelectorAll('.radial-progress')],name=document.querySelector('#radial-stage-name'),count=document.querySelector('#radial-stage-count'),tags=document.querySelector('#radial-tags'),toggle=document.querySelector('#radial-toggle');
 let active=0,playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,timer=null,tagTimers=[];
 function clear(){clearTimeout(timer);tagTimers.forEach(clearTimeout);tagTimers=[]}
 function show(i){
  clear();active=i;
  nodes.forEach((n,j)=>n.classList.toggle('active',j===i));
  progress.forEach((p,j)=>p.classList.toggle('active',j===i));
  name.textContent=stages[i].name;count.textContent=`${i+1} / 3`;tags.replaceChildren();
  stages[i].tags.forEach((label,j)=>{
    const insert=()=>{const item=document.createElement('span');item.className='radial-tag';item.textContent=label;tags.append(item)};
    if(!playing || j===0)insert();else tagTimers.push(setTimeout(insert,j*240));
  });
  if(playing)timer=setTimeout(()=>show((active+1)%3),3400);
 }
 nodes.forEach((n,i)=>{n.addEventListener('click',()=>show(i));n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(i)}})});
 toggle.addEventListener('click',()=>{playing=!playing;toggle.textContent=playing?'Ⅱ':'▶';toggle.setAttribute('aria-label',playing?'Pause animation':'Play animation');svg.classList.toggle('paused',!playing);show(active)});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();else show(active)});
 if(!playing){svg.classList.add('paused');toggle.textContent='▶';toggle.setAttribute('aria-label','Play animation')}
 show(0);
})();