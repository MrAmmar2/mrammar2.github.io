// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      // update URL hash without jump
      history.replaceState(null,null,href);
    }
  });
});

// Simple reveal-on-scroll using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      // optionally unobserve so it doesn't run again
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});

reveals.forEach(r=>io.observe(r));

// Basic contact form handler (no backend) - just a friendly toast
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if(!name||!email||!message){
    alert('Please fill all fields.');
    return false;
  }
  // For now, open mailto as fallback
  const subject = encodeURIComponent(`Message from ${name} via portfolio`);
  const body = encodeURIComponent(message + '\n\nContact: ' + email);
  window.location.href = `mailto:ammarpauzan@gmail.com?subject=${subject}&body=${body}`;
  return false;
}

// small UX: open resume links in a new tab for the "open" button
document.querySelectorAll('a[href$=".pdf"]').forEach(a=>{
  a.setAttribute('target','_blank');
  a.setAttribute('rel','noopener noreferrer');
});

// ===== Loader fade-out =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 3200); // matches the loader bar animation duration
});

