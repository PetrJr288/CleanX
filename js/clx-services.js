/* ── 1. PRELOADER ─────────────────────────────────────────── */
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

/* SERVICE CARD ENTRANCE ANIMATION */
var serviceCards = document.querySelectorAll('.service-card');
var howSteps     = document.querySelectorAll('.how-step');
var priceCards   = document.querySelectorAll('.price-card');

/* Set initial hidden state */
serviceCards.forEach(function (card) {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = 'opacity .55s ease, transform .55s ease';
});
howSteps.forEach(function (step) {
  step.style.opacity   = '0';
  step.style.transform = 'translateY(24px)';
  step.style.transition = 'opacity .5s ease, transform .5s ease';
});
priceCards.forEach(function (card) {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity .5s ease, transform .5s ease';
});

function revealOnScroll(elements, stagger) {
  elements.forEach(function (el, i) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && el.style.opacity === '0') {
      setTimeout(function () {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, i * (stagger || 80));
    }
  });
}

function runReveal() {
  revealOnScroll(serviceCards, 80);
  revealOnScroll(howSteps,     100);
  revealOnScroll(priceCards,   100);
}

window.addEventListener('scroll', runReveal);
window.addEventListener('load',   runReveal);
runReveal();

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

// Subscribe now modal
var subPlans = {
  basic: {
    name:  'Basic',
    badge: 'BASIC PLAN',
    price: '&#8358;65,000',
    desc:  'Perfect for individuals with light laundry needs.'
  },
  premium: {
    name:  'Premium',
    badge: 'MOST POPULAR',
    price: '&#8358;95,000',
    desc:  'Ideal for families and regular laundry users.'
  },
  unlimited: {
    name:  'Unlimited',
    badge: 'BEST CHOICE',
    price: '&#8358;250,000',
    desc:  'For businesses, hotels, and high-volume households.'
  }
};

function openSubscribeModal(planKey) {
  var plan  = subPlans[planKey];
  if (!plan) return;

  document.getElementById('modalBadge').textContent    = plan.badge;
  document.getElementById('modalPlanName').textContent = plan.name;
  document.getElementById('modalPrice').innerHTML      = plan.price;
  document.getElementById('modalDesc').textContent     = plan.desc;
  document.getElementById('summaryPlan').textContent   = plan.name;
  document.getElementById('summaryAmount').innerHTML   = plan.price;

  // Reset payment to bank transfer view on open
  var bankInfo   = document.getElementById('subBankInfo');
  var cardFields = document.getElementById('subCardFields');
  if (bankInfo)   bankInfo.style.display = 'flex';
  if (cardFields) cardFields.classList.remove('visible');

  // Reset radio buttons
  var bankRadio = document.querySelector('input[name="subPayment"][value="bank_transfer"]');
  if (bankRadio) bankRadio.checked = true;

  // Reset form
  var form = document.getElementById('subscribeForm');
  if (form) form.reset();

  var modal = document.getElementById('subscribeModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSubscribeModal() {
  var modal = document.getElementById('subscribeModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close subscribe modal when clicking overlay backdrop
document.addEventListener('DOMContentLoaded', function () {
  var subModal = document.getElementById('subscribeModal');
  if (subModal) {
    subModal.addEventListener('click', function (e) {
      if (e.target === subModal) closeSubscribeModal();
    });
  }

  // Payment method toggle
  document.querySelectorAll('input[name="subPayment"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var cardFields = document.getElementById('subCardFields');
      var bankInfo   = document.getElementById('subBankInfo');
      if (cardFields) cardFields.classList.toggle('visible', this.value === 'card');
      if (bankInfo)   bankInfo.style.display = (this.value === 'bank_transfer') ? 'flex' : 'none';
    });
  });

  // Format card number input with spaces
  var cardNumInput = document.getElementById('subCardNum');
  if (cardNumInput) {
    cardNumInput.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    });
  }
});

function copyAccountNumber() {
  navigator.clipboard.writeText('3012345678').then(function () {
    var btn = document.getElementById('subCopyBtn');
    if (!btn) return;
    btn.textContent = 'Copied!';
    btn.style.background = '#16a34a';
    setTimeout(function () {
      btn.textContent = 'Copy';
      btn.style.background = '';
    }, 2500);
  }).catch(function () {
    // Fallback for older browsers
    var el = document.createElement('textarea');
    el.value = '3012345678';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    var btn = document.getElementById('subCopyBtn');
    if (btn) {
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = 'Copy'; }, 2500);
    }
  });
}

function handleSubscribe(e) {
  e.preventDefault();
  closeSubscribeModal();

  // Show success toast
  var toast = document.getElementById('subSuccessToast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 4500);
}

window.openSubscribeModal  = openSubscribeModal;
window.closeSubscribeModal = closeSubscribeModal;
window.copyAccountNumber   = copyAccountNumber;
window.handleSubscribe     = handleSubscribe;

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
