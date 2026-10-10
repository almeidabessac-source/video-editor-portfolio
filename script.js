const profile = window.portfolio;
document.querySelectorAll('[data-name]').forEach(el => el.textContent = profile.name);
document.title = "Christian | Video Editing Portfolio";
document.getElementById('bio').textContent = profile.bio;
document.getElementById('contact-cta').textContent = profile.contactCTA;
if(profile.photo){ const img=document.createElement('img'); img.src=profile.photo; img.alt='Portrait of the video editor'; const orb=document.querySelector('.orb'); orb.removeAttribute('role'); orb.removeAttribute('aria-label'); orb.replaceChildren(img); }
function renderVideos(ids, target, short){
 ids.forEach((id,i)=>{
  const card=document.createElement('article'); card.className='video-card';
  const frame=document.createElement('div'); frame.className='video-frame'+(short?' vertical':'');
  const local = id.endsWith('.mp4');
  if(local){const video=document.createElement('video');video.src=id;video.controls=true;video.setAttribute('controlsList','nodownload');video.addEventListener('contextmenu',event=>event.preventDefault());video.playsInline=true;video.preload='metadata';video.setAttribute('aria-label',`Short-form video ${i+1}`);frame.append(video);}
  const iframe=document.createElement('iframe'); iframe.src=`https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=0&playsinline=1&rel=0`;
  iframe.title=`${short?'Short-form':'Long-form'} demonstration ${i+1}`; iframe.loading='lazy'; iframe.referrerPolicy='strict-origin-when-cross-origin'; iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; iframe.allowFullscreen=true;
  if(!local)frame.append(iframe); card.append(frame);
  const caption=document.createElement('div'); caption.className='caption';
  const name=document.createElement('h4'); name.textContent=`${short?'Short-form':'Long-form'} / 0${i+1}`;
  const tag=document.createElement('span'); tag.textContent='DEMO'; caption.append(name); if(!local)caption.append(tag); card.append(caption);
  const fallback=document.createElement('a'); fallback.className='fallback'; fallback.href=local?id:`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`; fallback.target='_blank'; fallback.rel='noopener noreferrer'; fallback.textContent=local?'Open video ↗':'If playback is unavailable, watch on YouTube ↗'; 
  document.getElementById(target).append(card);
 });
}
[['long-edited',1,false],['long-original',1,false],['short-edited',3,true],['short-original',3,true]].forEach(([id,count,short])=>{for(let i=0;i<count;i++){const slot=document.createElement('div');slot.className='empty-slot'+(short?' portrait':'');slot.setAttribute('role','img');slot.setAttribute('aria-label',id.replace('-',' ')+' empty space '+(i+1));document.getElementById(id).append(slot);}});
function fillVideo(target, source, label, index=0){
 const slot=document.getElementById(target).children[index];slot.removeAttribute('role');slot.removeAttribute('aria-label');
 const video=document.createElement('video');video.src=source;video.controls=true;video.playsInline=true;video.preload='metadata';video.setAttribute('controlsList','nodownload');video.setAttribute('aria-label',label);video.addEventListener('contextmenu',e=>e.preventDefault());slot.append(video);
}
const editedSlot=document.getElementById('long-edited').firstElementChild;editedSlot.removeAttribute('role');editedSlot.removeAttribute('aria-label');
const cover=document.createElement('button');cover.className='video-cover';cover.setAttribute('aria-label','Play edited video 1');
const thumb=document.createElement('img');thumb.src='edited-thumbnail.png';thumb.alt='How to Plan an MVP — edited version by Christian for portfolio';cover.append(thumb);
const play=document.createElement('span');play.className='cover-play';play.textContent='▶';cover.append(play);editedSlot.append(cover);
cover.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src='https://www.youtube.com/embed/vDq9OvMkSVY?autoplay=1&playsinline=1&rel=0';frame.title='Edited video 1';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';frame.allowFullscreen=true;editedSlot.replaceChildren(frame);});
const originalSlot=document.getElementById('long-original').firstElementChild;originalSlot.removeAttribute('role');originalSlot.removeAttribute('aria-label');
const originalFrame=document.createElement('iframe');originalFrame.src='https://www.youtube.com/embed/1hHMwLxN6EM?playsinline=1&rel=0';originalFrame.title='Original video 1';originalFrame.loading='lazy';originalFrame.referrerPolicy='strict-origin-when-cross-origin';originalFrame.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';originalFrame.allowFullscreen=true;originalSlot.append(originalFrame);
[1,2,3].forEach((n,i)=>{fillVideo('short-edited',`short-0${n}.mp4`,`Edited short video ${n}`,i);fillVideo('short-original',`short-original-0${n}.mp4`,`Original short video ${n}`,i);});
const menu=document.querySelector('.menu'), nav=document.getElementById('navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu)); document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus();}});
const contacts=document.getElementById('contact-links');
function link(text,href,external){const a=document.createElement('a');a.className='button';a.textContent=text;a.href=href;if(external){a.target='_blank';a.rel='noopener noreferrer';}contacts.append(a);}
if(profile.email)link('Email ↗',`mailto:${profile.email}`,false);
if(profile.twitter)link('X ↗',`https://x.com/${encodeURIComponent(profile.twitter.replace(/^@/,''))}`,true);
if(profile.discord){const button=document.createElement('button');button.className='button';button.textContent=`Discord: ${profile.discord}`;button.addEventListener('click',async()=>{const status=document.getElementById('feedback');try{await navigator.clipboard.writeText(profile.discord);status.textContent='Copied!';setTimeout(()=>status.textContent='',2000);}catch{status.textContent=`Copy this username: ${profile.discord}`;}});contacts.append(button);}
document.getElementById('contact-pending').hidden=contacts.children.length>0;







