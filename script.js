
window.addEventListener('load',()=>{const loader=document.getElementById('loader'),bar=loader.querySelector('.loader-bar i'),pct=loader.querySelector('.loader-percent');let n=0;const timer=setInterval(()=>{n+=Math.floor(Math.random()*8)+3;if(n>100)n=100;bar.style.width=n+'%';pct.textContent=n+'%';if(n===100){clearInterval(timer);setTimeout(()=>loader.classList.add('hide'),450)}},70)});
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

document.querySelectorAll('.tilt-card').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${-y*9}deg) rotateY(${x*11}deg) translateZ(6px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
function make(){particles=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+0.4,v:Math.random()*.35+.08,a:Math.random()*.7+.2}))}
function draw(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.y-=p.v;if(p.y<0)p.y=H;ctx.globalAlpha=p.a;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}
resize();make();draw();addEventListener('resize',()=>{resize();make()});

document.getElementById('startBtn').onclick=()=>document.getElementById('roast').scrollIntoView({behavior:'smooth'});
document.getElementById('confettiBtn').onclick=confetti;

const cake=document.querySelector('.cake'), cakeMsg=document.getElementById('cakeMessage');
document.getElementById('cakeBtn').onclick=()=>{
  cake.classList.toggle('off');
  const off=cake.classList.contains('off');
  cakeMsg.textContent=off?'WISH LOCKED IN ✨':'TAP ME 👀';
  if(off) confetti();
};
function confetti(){
  for(let i=0;i<100;i++){
    const el=document.createElement('i');
    el.style.cssText=`position:fixed;z-index:99;left:${Math.random()*100}vw;top:-20px;width:7px;height:12px;border-radius:2px;background:hsl(${Math.random()*360},90%,65%);transform:rotate(${Math.random()*360}deg);pointer-events:none`;
    document.body.appendChild(el);
    const x=(Math.random()-.5)*500, rot=(Math.random()-.5)*1200, dur=1800+Math.random()*1800;
    el.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${x}px,110vh) rotate(${rot}deg)`,opacity:0}],{duration:dur,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>el.remove();
  }
}
let audioCtx;
document.getElementById('soundBtn').onclick=()=>{
  if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.frequency.value=520;g.gain.value=.04;o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.12);
};
