const loader=document.querySelector('.loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),900));

const header=document.querySelector('.header'),menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.classList.toggle('open',open);menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const reveals=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;revealObserver.observe(el)});

const sections=[...document.querySelectorAll('main section[id]')],navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
function onScroll(){const y=scrollY;header.classList.toggle('scrolled',y>40);const media=document.querySelector('[data-parallax]');if(media&&y<innerHeight*1.2)media.style.transform=`translate3d(0,${y*.23}px,0) scale(1.02)`;document.querySelectorAll('[data-depth]').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const shift=(r.top-innerHeight/2)*Number(el.dataset.depth);el.style.setProperty('--img-y',`${shift}px`)}});document.querySelectorAll('.detail-card').forEach(card=>{const r=card.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)card.style.setProperty('--card-photo-y',`${Math.max(-18,Math.min(18,(r.top-innerHeight/2)*.035))}px`)});let current='inicio';sections.forEach(s=>{if(y>=s.offsetTop-220)current=s.id});navLinks.forEach(a=>{if(a.getAttribute('href').startsWith('#'))a.classList.toggle('active',a.getAttribute('href')===`#${current}`)})}
addEventListener('scroll',onScroll,{passive:true});onScroll();

const glow=document.querySelector('.cursor-glow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

const contactForm=document.querySelector('#contactForm');if(contactForm)contactForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const text=`Hola A.R.M Construcciones, soy ${data.get('nombre')} de ${data.get('localidad')}.%0A%0AServicio: ${data.get('servicio')}%0AConsulta: ${data.get('mensaje')}`;window.open(`https://wa.me/542995107672?text=${encodeURI(text)}`,'_blank','noopener')});
document.querySelector('#year').textContent=new Date().getFullYear();
