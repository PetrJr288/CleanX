/* PRELOADER */
window.addEventListener('load', function () {
  setTimeout(function () {
    var preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1700);
});

/* 2. DARK / LIGHT MODE TOGGLE */
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

/* BLOG CATEGORY FILTER */
var filterBtns = document.querySelectorAll('.blog-filter-btn');
var blogCards  = document.querySelectorAll('#blogGrid .blog-card');
var blogFeatured = document.querySelector('.blog-featured');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var filter = btn.getAttribute('data-filter');

    /* Handle featured post visibility */
    if (blogFeatured) {
      var featuredCat = blogFeatured.getAttribute('data-category');
      blogFeatured.style.display = (filter === 'all' || filter === featuredCat) ? '' : 'none';
    }

    /* Handle grid cards */
    blogCards.forEach(function (card) {
      var cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp .4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* NEWSLETTER SUBSCRIBE */
var newsletterBtn = document.getElementById('newsletterBtn');
var newsletterMsg = document.getElementById('newsletterMsg');

if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function () {
    var emailInput = document.getElementById('newsletterEmail');
    if (!emailInput) return;
    var email = emailInput.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        newsletterMsg.textContent = '\u2705 You\u2019re subscribed! Thank you.';
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

/* WHATSAPP CHAT WIDGET */
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

// Auto-filter from URL hash (e.g. clx-blog.html#articles)
window.addEventListener('load', function () {
  var hash = window.location.hash.replace('#', '').trim().toLowerCase();
  if (!hash) return;

  var btn = document.querySelector('.blog-filter-btn[data-filter="' + hash + '"]');
  if (btn) btn.click();
});
