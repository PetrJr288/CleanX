/* CleanX Laundry Services */

/* 1. PRELOADER */
window.addEventListener("load", function () {
  setTimeout(function () {
    var preloader = document.getElementById("preloader");
    if (preloader) preloader.classList.add("hidden");
  }, 1600);
});

/* 2. NAVBAR SCROLL SHADOW */
var mainNav = document.getElementById("mainNav");
window.addEventListener("scroll", function () {
  if (mainNav) mainNav.classList.toggle("scrolled", window.scrollY > 40);
  handleScrollTop();
});

/* 3. MOBILE NAV TOGGLE */
var navToggle = document.getElementById("navToggle");
var navMobile = document.getElementById("navMobile");
if (navToggle && navMobile) {
  navToggle.addEventListener("click", function () {
    var isOpen = navMobile.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  navMobile.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMobile.classList.remove("open");
      navToggle.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* 4. HERO SLIDESHOW */
var heroSlides = document.querySelectorAll(".hero-slide");
var heroDots = document.querySelectorAll(".dot");
var currentSlide = 0;
var slideTimer;

function goToSlide(index) {
  heroSlides[currentSlide].classList.remove("active");
  heroDots[currentSlide].classList.remove("active");
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides[currentSlide].classList.add("active");
  heroDots[currentSlide].classList.add("active");
}
function startSlider() {
  slideTimer = setInterval(function () {
    goToSlide(currentSlide + 1);
  }, 5000);
}
if (heroSlides.length && heroDots.length) {
  heroDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      clearInterval(slideTimer);
      goToSlide(parseInt(dot.dataset.slide));
      startSlider();
    });
  });
  startSlider();
}
/* ── 2. DARK / LIGHT MODE TOGGLE  */
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

/* 6. TESTIMONIALS CAROUSEL */
var tSlides = document.querySelectorAll(".t-slide");
var tCurrent = 0;
function goToTestimonial(dir) {
  tSlides[tCurrent].classList.remove("active");
  tCurrent = (tCurrent + dir + tSlides.length) % tSlides.length;
  tSlides[tCurrent].classList.add("active");
}
var tPrevBtn = document.getElementById("tPrev");
var tNextBtn = document.getElementById("tNext");
if (tPrevBtn)
  tPrevBtn.addEventListener("click", function () {
    goToTestimonial(-1);
  });
if (tNextBtn)
  tNextBtn.addEventListener("click", function () {
    goToTestimonial(1);
  });
if (tSlides.length)
  setInterval(function () {
    goToTestimonial(1);
  }, 6000);

/* 6. SCROLL TO TOP */
// var scrollTopBtn = document.getElementById('scrollTop');
// function handleScrollTop() {
//   if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
// }
// if (scrollTopBtn) {
//   scrollTopBtn.addEventListener('click', function () {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   });
// }

/* NEWSLETTER SUBSCRIBE */
var newsletterBtn = document.getElementById('newsletterBtn');
var newsletterMsg = document.getElementById('newsletterMsg');

if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function () {
    var emailInput = document.getElementById('newsletterEmail');
    if (!emailInput) return;
    var email = emailInput.value.trim();

    if (email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (newsletterMsg) {
        newsletterMsg.textContent = 'Please enter a valid email address.';
        newsletterMsg.style.color = '#e74c3c';
      }
      return;
    }

    /* Simulate subscribe */
    newsletterBtn.textContent = 'Subscribing\u2026';
    newsletterBtn.disabled    = true;

    setTimeout(function () {
      emailInput.value          = '';
      newsletterBtn.textContent = 'Subscribe';
      newsletterBtn.disabled    = false;
      if (newsletterMsg) {
        newsletterMsg.textContent = '\u2705 Your review have been recieved! Thank you.';
        newsletterMsg.style.color = '#22c55e';
      }
      setTimeout(function () {
        if (newsletterMsg) newsletterMsg.textContent = '';
      }, 4000);
    }, 1200);
  });
}

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

/* 7. WHATSAPP CHAT WIDGET */
// var chatBox  = document.getElementById('chatBox');
// var chatBody = document.getElementById('chatBody');

// function toggleChat() {
//   if (!chatBox) return;
//   if (chatBox.classList.contains('show')) {
//     chatBox.classList.replace('show', 'hide');
//     chatBox.addEventListener('animationend', function handler() {
//       chatBox.style.display = 'none';
//       chatBox.classList.remove('hide');
//       chatBox.removeEventListener('animationend', handler);
//     });
//   } else {
//     chatBox.style.display = 'flex';
//     chatBox.classList.add('show');
//     var input = document.getElementById('userInput');
//     if (input) input.focus();
//   }
// }

// function addMessage(text, type) {
//   if (!chatBody) return;
//   var msg = document.createElement('div');
//   msg.className = 'chat-msg ' + type;
//   msg.innerHTML = text;
//   chatBody.appendChild(msg);
//   chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
// }

// function showTyping() {
//   if (!chatBody) return;
//   var typing = document.createElement('div');
//   typing.className = 'chat-typing';
//   typing.id = 'chatTyping';
//   typing.textContent = 'CleanX is typing…';
//   chatBody.appendChild(typing);
//   chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
// }

// function removeTyping() {
//   var el = document.getElementById('chatTyping');
//   if (el) el.remove();
// }

// function botReply(message) {
//   var m = message.toLowerCase();
//   if (m.includes('price') || m.includes('cost') || m.includes('how much'))
//     return '💰 Washing: ₦1,500 | Dry Cleaning: ₦2,000 | Bulk discounts available. Starting from ₦6,000 with free pickup & delivery.';
//   if (m.includes('pickup') || m.includes('delivery'))
//     return '🚚 Yes! We offer free pickup & delivery across Imo State. Share your address and we\'ll schedule a time.';
//   if (m.includes('location') || m.includes('where') || m.includes('address'))
//     return '📍 We\'re at 12 Old Obinze Road, Umuijem, Avu, Owerri-West, Imo State.';
//   if (m.includes('hour') || m.includes('time') || m.includes('open'))
//     return '🕐 We\'re open Monday – Saturday, 6:30am to 6:30pm.';
//   if (m.includes('hello') || m.includes('hi') || m.includes('hey'))
//     return '👋 Hello! Welcome to CleanX. How can we help you today?';
//   if (m.includes('negoti') || m.includes('discount'))
//     return '✅ For special rates, please continue on WhatsApp: +234 703 878 5039';
//   if (m.includes('thank'))
//     return '😊 You\'re welcome! Is there anything else we can help with?';
//   return '✨ I can help with pricing, pickup & delivery, our location, or working hours. Or call us on +234 802 316 7869.';
// }

// function sendMessage() {
//   var input = document.getElementById('userInput');
//   if (!input) return;
//   var text = input.value.trim();
//   if (!text) return;
//   addMessage(text, 'user');
//   input.value = '';
//   showTyping();
//   setTimeout(function () {
//     removeTyping();
//     addMessage(botReply(text), 'bot');
//   }, 1000);
// }
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
  // if (
  //   message.includes("pricing") ||
  //   message.includes("cost")
  // )
  //   return "💰For our pricing: Washing ₦1500, Dry Cleaning ₦2000, Bulk Discounts are also Available.";
  // if (message.includes("pickup") || message.includes("delivery"))
  //   return "🚚Yes, Pickup srvices are available! Please share your address for scheduling.";
  // if (message.includes("negotiable"))
  //   return "Yes, continue this chat on whatsapp by contacting +234 703 878 5039.";
  // if (message.includes("location") || message.includes("located"))
  //   return "We are located at #12 old Obinze road, Umuijem, Avu, Owerri west, Imo state";
  // if (message.includes("hello") || message.includes("hi"))
  //   return "👋 Hello!, Welcome to CleanX Laundry Services, we are ready to handle your laundry efficiently, Clean clothes, Less stress.";
  // return "✨ I'm here to assist!, continue your chat with our representative on whatsapp through the phone number +234 703 878 5039, i can also assist you with informations like, our pickup, our pricing and price range, our delivery or our working hours.";
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
