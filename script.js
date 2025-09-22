// ---------- HAMBURGER ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click",()=>navLinks.classList.toggle("active"));

// ---------- DARK MODE ----------
const themeToggle=document.getElementById('themeToggle');
themeToggle.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent=document.body.classList.contains('dark-mode')?'☀️':'🌙';
});

// ---------- TYPING EFFECT ----------
const words=["Technovator.","Web & Mobile Developer.","AI & Automation Enthusiast.","Blogger & Tech Writer.","Open Source Contributor."];
let wordIndex=0,charIndex=0,deleting=false;
const typingEl=document.getElementById('typing');
function type(){
  const currentWord=words[wordIndex];
  if(!deleting){
    typingEl.textContent=currentWord.substring(0,charIndex+1);
    charIndex++;
    if(charIndex===currentWord.length){deleting=true;setTimeout(type,1200);return;}
  }else{
    typingEl.textContent=currentWord.substring(0,charIndex-1);
    charIndex--;
    if(charIndex===0){deleting=false;wordIndex=(wordIndex+1)%words.length;}
  }
  setTimeout(type,deleting?80:150);
}
type();

// ---------- FILTER CATEGORY ----------
function filterCategory(category){
  const cards=document.querySelectorAll('#blogGrid .blog-card');
  cards.forEach(card=>{
    card.style.display=(category==='all'||card.dataset.category===category)?'flex':'none';
  });
}

// ---------- HERO CANVAS PARTICLES ----------
const canvas=document.getElementById('heroCanvas');
const ctx=canvas.getContext('2d');
let particlesArray=[];
function initParticles(){
  canvas.width=canvas.offsetWidth;
  canvas.height=canvas.offsetHeight;
  particlesArray=[];
  for(let i=0;i<80;i++){
    particlesArray.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,size:Math.random()*3+1,speedX:(Math.random()-0.5)*1.5,speedY:(Math.random()-0.5)*1.5});
  }
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle='rgba(76,175,239,0.8)';
    ctx.fill();
    p.x+=p.speedX;p.y+=p.speedY;
    if(p.x>canvas.width)p.x=0;if(p.x<0)p.x=canvas.width;
    if(p.y>canvas.height)p.y=0;if(p.y<0)p.y=canvas.height;
  });
  requestAnimationFrame(animateParticles);
}
window.addEventListener('resize',()=>{initParticles();});
initParticles();
animateParticles();
