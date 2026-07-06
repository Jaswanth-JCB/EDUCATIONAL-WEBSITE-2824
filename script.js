/* ============================================================
   GOOD SHEPHERD ACADEMY - PREMIUM SCRIPT
   WITH AI CHATBOT - FULLY WORKING
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. MOBILE MENU
    // ============================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ============================================================
    // 2. ANIMATED COUNTERS
    // ============================================================
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length > 0) {
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                const suffix = (target === 90 || target === 95 || target === 92 || target === 88 || target === 85) ? '%' : '+';

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    counter.textContent = current + suffix;
                    if (progress < 1) requestAnimationFrame(updateCounter);
                    else counter.textContent = target + suffix;
                };
                requestAnimationFrame(updateCounter);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); observer.disconnect(); } });
        }, { threshold: 0.3 });
        counters.forEach(counter => observer.observe(counter));
    }

    // ============================================================
    // 3. CONTACT FORM
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            if (name && email && subject && message) {
                this.innerHTML = `
                    <div style="text-align:center; padding:30px 0;">
                        <div style="font-size:4rem; margin-bottom:16px;">✅</div>
                        <h3 style="color:#6C3CE1; font-size:1.5rem;">Message Sent!</h3>
                        <p style="color:#666;">Thank you, ${name}! We'll get back to you within 24 hours.</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="margin-top:20px;">Send Another Message</button>
                    </div>
                `;
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // ============================================================
    // 4. COURSE FILTER
    // ============================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    if (filterBtns.length > 0 && courseCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                courseCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ============================================================
    // 5. AI CHATBOT - FULLY WORKING
    // ============================================================
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotMinimize = document.getElementById('chatbotMinimize');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickReplies = document.getElementById('quickReplies');

    let isChatbotOpen = false;
    let isTyping = false;

    if (chatbotToggle && chatbotWidget) {
        chatbotToggle.addEventListener('click', function() {
            isChatbotOpen = !isChatbotOpen;
            this.classList.toggle('active');
            chatbotWidget.classList.toggle('open');
            if (isChatbotOpen) chatbotInput.focus();
        });
    }

    if (chatbotMinimize) {
        chatbotMinimize.addEventListener('click', function() {
            isChatbotOpen = false;
            chatbotToggle.classList.remove('active');
            chatbotWidget.classList.remove('open');
        });
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message || isTyping) return;
        addMessage(message, 'user');
        chatbotInput.value = '';
        showTyping();
        setTimeout(() => {
            hideTyping();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 800 + Math.random() * 600);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ' + sender;
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = text;
        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(time);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTyping() {
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        isTyping = false;
    }

    function getBotResponse(message) {
        const msg = message.toLowerCase();
        if (msg.includes('course') || msg.includes('program') || msg.includes('offer')) {
            return '📚 We offer <strong>5 premium courses</strong>:<br><br>• <strong>B.Tech Computer Science</strong> - 4 Years, 90% Placement<br>• <strong>M.Sc Data Science</strong> - 2 Years, 88% Placement<br>• <strong>MBA Business Management</strong> - 2 Years, 92% Placement<br>• <strong>B.Tech Artificial Intelligence</strong> - 4 Years, 90% Placement<br>• <strong>BBA Business Administration</strong> - 3 Years, 85% Placement<br><br>Want to know more? 🎓';
        }
        if (msg.includes('placement') || msg.includes('job') || msg.includes('career')) {
            return '💼 Our <strong>placement record is 90%</strong>!<br><br>• <strong>2000+</strong> alumni<br>• Top recruiters: Google, Amazon, Microsoft<br>• Average package: ₹8-20 LPA<br>• Dedicated placement cell<br><br>Ready to start your career? 🚀';
        }
        if (msg.includes('faculty') || msg.includes('teacher') || msg.includes('professor')) {
            return '👨‍🏫 We have <strong>150+ expert faculty members</strong>!<br><br>• All hold Ph.D. degrees<br>• 12+ years experience<br>• Industry experts<br>• 13:1 student-to-faculty ratio<br><br>Learn from the best! 🌟';
        }
        if (msg.includes('fee') || msg.includes('cost') || msg.includes('price')) {
            return '💰 Our <strong>fee structure</strong>:<br><br>• B.Tech: ₹1.5 Lakhs/year<br>• M.Sc: ₹1.2 Lakhs/year<br>• MBA: ₹2 Lakhs/year<br>• BBA: ₹80,000/year<br><br>Scholarships available! 🎯';
        }
        if (msg.includes('enroll') || msg.includes('admission') || msg.includes('apply') || msg.includes('join')) {
            return '📝 Ready to <strong>enroll</strong>?<br><br>• Visit our <a href="contact.html" style="color:#6C3CE1;text-decoration:underline;">Contact Page</a><br>• Call: <strong>+91-98765-43210</strong><br>• Email: <strong>info@goodshepherd.edu</strong><br><br>Admissions open for 2026-27! 🎓';
        }
        if (msg.includes('student') || msg.includes('alumni')) {
            return '🎓 We have <strong>2000+ students</strong>!<br><br>• Diverse community from across India<br>• 2000+ alumni network<br>• Placed in top companies<br>• Active student clubs<br><br>Join our community! 🌍';
        }
        if (msg.includes('about') || msg.includes('history') || msg.includes('established')) {
            return '🏛️ Established in <strong>2005</strong>.<br><br>• 19+ years of excellence<br>• 2000+ students educated<br>• 150+ faculty<br>• 5 premium programs<br>• 90% placement<br><br>Building leaders for two decades! 🌟';
        }
        if (msg.includes('location') || msg.includes('address') || msg.includes('campus')) {
            return '📍 We\'re at:<br><br><strong>123 Education Street</strong><br>Knowledge Park, New Delhi - 110001<br><br>🕐 Mon-Fri: 9AM-6PM, Sat: 9AM-2PM<br><br>Visit our 50-acre campus! 🏫';
        }
        if (msg.includes('facility') || msg.includes('library') || msg.includes('lab') || msg.includes('sports')) {
            return '🏫 <strong>Premium facilities</strong>:<br><br>• Smart Classrooms with 4K displays<br>• Digital Library (50,000+ e-books)<br>• Modern Computer Labs<br>• Indoor & Outdoor Sports<br>• Hostel Accommodation<br><br>World-class infrastructure! 🌟';
        }
        return '🤖 I\'m here to help!<br><br>Ask me about:<br>📚 <strong>Courses</strong> • 💼 <strong>Placement</strong> • 👨‍🏫 <strong>Faculty</strong><br>💰 <strong>Fees</strong> • 📝 <strong>Enroll</strong> • 🎓 <strong>Students</strong><br>🏛️ <strong>About</strong> • 📍 <strong>Location</strong> • 🏫 <strong>Facilities</strong><br><br>Just type your question! 😊';
    }

    if (chatbotSend) chatbotSend.addEventListener('click', sendMessage);
    if (chatbotInput) {
        chatbotInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }
        });
    }
    if (quickReplies) {
        quickReplies.querySelectorAll('.quick-reply').forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                if (question) { chatbotInput.value = question; sendMessage(); }
            });
        });
    }

    // ============================================================
    // 6. NAVBAR SCROLL EFFECT
    // ============================================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(26,26,46,0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
        } else {
            navbar.style.background = 'rgba(26,26,46,0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        }
    });

    console.log('🎓 Good Shepherd Academy - Premium Website Loaded!');
    console.log('🤖 Chatbot is ready to help!');
});