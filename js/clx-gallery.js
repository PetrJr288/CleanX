/* PRELOADER */
window.addEventListener('load', function () {
  setTimeout(function () {
    var preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1700);
});

/* DARK / LIGHT MODE TOGGLE */
var html        = document.documentElement;
var themeToggle = document.getElementById('themeToggle');
var themeIcon   = document.getElementById('themeIcon');

(function initTheme() {
  var saved = localStorage.getItem('cleanx-theme') || 'light';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
})();

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    var next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('cleanx-theme', next);
    updateThemeIcon(next);
    themeToggle.style.transform = 'scale(0.85) rotate(20deg)';
    setTimeout(function () { themeToggle.style.transform = ''; }, 200);
  });
}

/* NAVBAR SCROLL SHADOW */
var mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', function () {
  if (mainNav) mainNav.classList.toggle('scrolled', window.scrollY > 40);
  handleScrollTop();
});

/* MOBILE NAV TOGGLE */
var navToggle = document.getElementById('navToggle');
var navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', function () {
    var isOpen = navMobile.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navMobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMobile.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

document.addEventListener('click', function (e) {
  if (!navMobile || !navToggle) return;
  if (navMobile.classList.contains('open') &&
      !navMobile.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* GALLERY FILTER */
var filterBtns = document.querySelectorAll('.filter-btn');
var galItems   = document.querySelectorAll('.gal-item');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    /* Update active button */
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var filter = btn.getAttribute('data-filter');

    galItems.forEach(function (item) {
      var cat = item.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeUp .4s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });

    /* Reset load-more after filter change */
    updateLoadMore();
  });
});

/* LIGHTBOX */
var lightbox  = document.getElementById('lightbox');
var lbImg     = document.getElementById('lbImg');
var lbCaption = document.getElementById('lbCaption');
var lbClose   = document.getElementById('lbClose');
var lbPrev    = document.getElementById('lbPrev');
var lbNext    = document.getElementById('lbNext');

var visibleItems = [];
var currentIndex = 0;

function getVisibleItems() {
  return Array.from(galItems).filter(function (item) {
    return !item.classList.contains('hidden');
  });
}

function openLightbox(index) {
  visibleItems = getVisibleItems();
  currentIndex = index;
  showLbImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLbImage() {
  var item = visibleItems[currentIndex];
  if (!item) return;
  var img     = item.querySelector('img');
  var caption = item.querySelector('.gal-overlay span');
  lbImg.src        = img.src;
  lbImg.alt        = img.alt;
  lbCaption.textContent = caption ? caption.textContent : '';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

galItems.forEach(function (item, i) {
  item.addEventListener('click', function () {
    visibleItems = getVisibleItems();
    var visibleIndex = visibleItems.indexOf(item);
    if (visibleIndex !== -1) openLightbox(visibleIndex);
  });
});

if (lbClose) lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) closeLightbox();
});

if (lbPrev) {
  lbPrev.addEventListener('click', function () {
    visibleItems = getVisibleItems();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLbImage();
  });
}

if (lbNext) {
  lbNext.addEventListener('click', function () {
    visibleItems = getVisibleItems();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLbImage();
  });
}

/* Keyboard navigation */
document.addEventListener('keydown', function (e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   lbPrev && lbPrev.click();
  if (e.key === 'ArrowRight')  lbNext && lbNext.click();
});

/* LOAD MORE */
var loadMoreBtn   = document.getElementById('loadMoreBtn');
var ITEMS_PER_PAGE = 12;
var shownCount     = 0;

function showInitialItems() {
  var all = Array.from(galItems);
  shownCount = 0;
  all.forEach(function (item) { item.style.display = 'none'; });
  var limit = Math.min(ITEMS_PER_PAGE, all.length);
  for (var i = 0; i < limit; i++) {
    all[i].style.display = 'block';
    shownCount++;
  }
  updateLoadMore();
}

function updateLoadMore() {
  var visible = Array.from(galItems).filter(function (item) {
    return !item.classList.contains('hidden');
  });
  var shown   = visible.filter(function (item) {
    return item.style.display !== 'none';
  });
  if (loadMoreBtn) {
    loadMoreBtn.style.display = shown.length >= visible.length ? 'none' : 'inline-flex';
  }
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function () {
    var visible = Array.from(galItems).filter(function (item) {
      return !item.classList.contains('hidden') && item.style.display === 'none';
    });
    var toShow = visible.slice(0, ITEMS_PER_PAGE);
    toShow.forEach(function (item) {
      item.style.display = 'block';
      item.style.animation = 'fadeUp .4s ease forwards';
    });
    updateLoadMore();
  });
}

/* Initialise on page load */
showInitialItems();

// PROGRESS RING + SCROLL TO TOP
const progressTop = document.getElementById("progress-top");
const progressRing = document.getElementById("progress-ring");
function setProgress(percent) {
  const degrees = (percent / 100) * 360;
  progressRing.style.background = `conic-gradient(var(--primary) ${degrees}deg, #e0e0e0 0deg)`;
}
window.addEventListener("scroll", function () {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (winScroll / height) * 100;
  setProgress(scrolled);
  if (winScroll > 200) {
    progressTop.classList.add("active");
  } else {
    progressTop.classList.remove("active");
  }
});
progressTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* WHATSAPP CHAT WIDGET*/
// Whatsapp Chatbot
const chatBox = document.getElementById("chatBox");
const chatToggle = document.querySelector(".chat-toggle");

function toggleChat() {
  if (chatBox.classList.contains("show")) {
    // Close: shrink into bubble
    chatBox.classList.remove("show");
    chatBox.classList.add("hide");

    // After animation ends, hide completely
    chatBox.addEventListener("animationend", function handler() {
      chatBox.style.display = "none";
      chatBox.classList.remove("hide");
      chatBox.removeEventListener("animationend", handler);
    });
  } else {
    // Open: expand from bubble
    chatBox.style.display = "flex";
    chatBox.classList.add("show");
  }
}

// Optional: add pop effect to close button
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("mousedown", () => {
  closeBtn.style.transform = "scale(0.9)";
});
closeBtn.addEventListener("mouseup", () => {
  closeBtn.style.transform = "scale(1)";
});

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (text === "") return;

  // Detect service type
  let serviceType = null;
  if (text.toLowerCase().includes("wash")) serviceType = "Washing";
  if (text.toLowerCase().includes("dry")) serviceType = "Dry Cleaning";
  let needsAddress =
    text.toLowerCase().includes("pickup") ||
    text.toLowerCase().includes("delivery");

  // Add user message
  addMessage(text, "user");

  // Save to CRM
  saveToCRM(text, "user", serviceType, needsAddress ? "Pending Address" : null);

  input.value = "";

  // Show bot typing
  showTyping();
  setTimeout(() => {
    removeTyping();
    let reply = aiReply(text);
    addMessage(reply, "bot");
    saveToCRM(reply, "bot");
  }, 1000);
}

// Add message to chat
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "message " + type;
  msg.innerHTML = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Typing animation
function showTyping() {
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.id = "typing";
  typing.innerText = "CleanX is typing...";
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function removeTyping() {
  document.getElementById("typing").remove();
}

// Simple AI responses
function aiReply(message) {
  message = message.toLowerCase();
  if (
    message.includes("price") ||
    message.includes("pricing") ||
    message.includes("cost") ||
    message.includes("how much")
  )
    return "💰 Washing: ₦1,500 | Dry Cleaning: ₦2,000 | Bulk discounts available. Starting from ₦6,000 with free pickup & delivery.";
  if (message.includes("pickup") || message.includes("delivery"))
    return "🚚 Yes! We offer free pickup & delivery across Imo State. Share your address and we'll schedule a time.";
  if (
    message.includes("location") ||
    message.includes("where") ||
    message.includes("address")
  )
    return "📍 We're at 12 Old Obinze Road, Umuijem, Avu, Owerri-West, Imo State.";
  if (
    message.includes("hour") ||
    message.includes("time") ||
    message.includes("open")
  )
    return "🕐 We're open Monday – Saturday, 6:30am to 6:30pm.";
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  )
    return "👋 Hello! Welcome to CleanX. How can we help you today?";
  if (message.includes("negoti") || message.includes("discount") || message.includes("negotiable"))
    return "✅ For special rates, please continue on WhatsApp: +234 703 878 5039";
  if (message.includes("thank"))
    return "😊 You're welcome! Is there anything else we can help with?";
  if (message.includes('reach') || message.includes('contact') || message.includes('get in touch'))
  return "You can continue this chat on whatsapp or call us on +234 703 878 5039.";
}
//  Ask about pricing, pickup, delivery, or working hours ✨ I can help with pricing, pickup & delivery, our location, or working hours. Or.
// Save messages to CRM (localStorage)
function saveToCRM(message, type = "user", service = null, address = null) {
  let crm = JSON.parse(localStorage.getItem("cleanx_crm")) || [];
  crm.push({
    customer: "Website User",
    type: type,
    message: message,
    service: service,
    address: address,
    time: new Date().toLocaleString(),
    status: type === "user" ? "New" : "Sent",
  });
  localStorage.setItem("cleanx_crm", JSON.stringify(crm));
  updateAdminDashboard();
}

// Dashboard update (simulated)
function updateAdminDashboard() {
  let orders = JSON.parse(localStorage.getItem("cleanx_crm")) || [];
  // For demo: logs to console
  console.clear();
  console.log("CleanX CRM Orders:");
  console.table(orders);
}
// Auto scroll like whatsapp
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "message " + type;
  msg.innerHTML = text;
  chatBody.appendChild(msg);
  // Auto-scroll to bottom smoothly
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}

window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
