var tl = gsap.timeline();

var ma = gsap.matchMedia();
ma.add("(min-width: 801px)", () => {
    // Desktop animation
    
    tl.from(".page1", {
        opacity: 0,
        duration: 1,
        // delay: 0.5,
    });
    
    tl.from("#elems", {
        y: -20,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        stagger: 0.3,
    });
    
    tl.from(".page1 h3", {
        y: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
    });
    
    tl.from(".page1 h1", {
        y: -80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
    });
});

ma.add("(max-width: 800px)", () => {
    // Mobile animation
    tl.from(".page1 h3", {
        y: -20,
        opacity: 0,
        duration: 0.2,
        stagger: 0,
    });
    
    tl.from(".page1 h1", {
        y: -80,
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
    });
});


gsap.from(".services",{
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 1,
    stagger: 1,
    scrollTrigger: {
        trigger: ".services",
        scroller: "body",
        start: "top 90%",
        end: "top 30%",
        // markers: true,
        scrub: 2
    },
});


gsap.from(".about-section",{
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 1,
    stagger: 1,
    scrollTrigger: {
        trigger: ".about-container",
        scroller: "body",
        start: "top 90%",
        end: "top 30%",
        // markers: true,
        scrub: 2
    },
});


gsap.from(".contact-section",{
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 1,
    stagger: 1,
    scrollTrigger: {
        trigger: ".contact-container",
        scroller: "body",
        start: "top 90%",
        end: "top 30%",
        // markers: true,
        scrub: 2
    },
});



    // about section

    gsap.from(".about-text", {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        scrollTrigger: {
            trigger: ".about-section",
            scroller: "body",
            start: "top 60%",
            end: "top -10%",
            scrub: 1
        },
    });
    
    gsap.from(".about-image", {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        scrollTrigger: {
            trigger: ".about-section",
            scroller: "body",
            start: "top 60%",
            end: "top -10%",
            scrub: 1
        },
    });


//     gsap.from(".page2 h4", {
//         // y: 60,
//         // opacity: 0,
//         x: 150,
//         duration: 0.7,
//         delay: 0.5,
//         scrollTrigger: {
//             trigger: ".page2 ",
//             scroller: "body",
//             start: "top 70%",
//             end: "top -10%",
//             // markers: true,
//             scrub: 2,
//         },
//     });
    
//     let mm = gsap.matchMedia();

// mm.add("(min-width: 801px)", () => {
//     // Desktop animation
//     gsap.to(".page3 h4", {
//         transform: "translateX(-200%)",
//         scrollTrigger: {
//             trigger: ".page3",
//             scroller: "body",
//             start: "top 0%",
//             end: "top -170%",
//             scrub: 3,
//             pin: true,
//             pinSpacing: true,
//             onLeave: self => {
//                 gsap.set(".page3 h4", { clearProps: "all" });
//             },
//             onEnterBack: self => {
//                 gsap.set(".page3 h4", { clearProps: "all" });
//             }
//         },
//     });
// });

// mm.add("(max-width: 800px)", () => {
//     // Mobile animation
//     gsap.to(".page3 h4", {
//         transform: "translateX(-200%)",
//         scrollTrigger: {
//             trigger: ".page3",
//             scroller: "body",
//             start: "top 0%",
//             end: "top -100%", // Reduced scroll distance for mobile
//             scrub: 2,         // Faster scrub for mobile
//             pin: true,
//             pinSpacing: true,
//             onLeave: self => {
//                 gsap.set(".page3 h4", { clearProps: "all" });
//             },
//             onEnterBack: self => {
//                 gsap.set(".page3 h4", { clearProps: "all" });
//             }
//         },
//     });
// });

function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Add click event to close button
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}


    
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://dadhichevents.onrender.com';

  
// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button to prevent double submission
    // const submitButton = e.target.querySelector('button[type="submit"]');
    
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = true;
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'block';
    submitButton.disabled = true;

    try {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            showToast('Please fill in all fields', 'error');
        return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address', 'error');
        return;
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            showToast('Please enter a valid 10-digit phone number', 'error');
        return;
        }

        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            showToast(data.message || 'Something went wrong. Please try again.', 'error');
        }
        document.getElementById('contactForm').reset();

    } catch (error) {
        // Show error message
        showToast('Network error. Please try again later.', 'error');
        console.error('Error:', error);
    } finally {
        // Re-enable submit button
        buttonText.style.display = 'block';
        loadingSpinner.style.display = 'none';
        submitButton.disabled = false;
    }
});


// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('#elems');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#elems a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// back button

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

// Show button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

