var tl = gsap.timeline();

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


gsap.from(".page2 h4", {
    // y: 60,
    // opacity: 0,
    x: 150,
    duration: 0.7,
    delay: 0.5,
    scrollTrigger: {
        trigger: ".page2 ",
        scroller: "body",
        start: "top 70%",
        end: "top -10%",
        // markers: true,
        scrub: 2,
    },
});

gsap.to(".page3 h4", {
    // y: 60,
    // opacity: 0,
    transform: "translateX(-200%)",
    // duration: 1.5,
    // delay: 0.5,
    scrollTrigger: {
        trigger: ".page3",
        scroller: "body",
        start: "top 0%",
        end: "top -250%",
        // markers: true,
        scrub: 3,
        pin: true,
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



// contact form

// Contact form handling
// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button to prevent double submission
    const submitButton = e.target.querySelector('button[type="submit"]');
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
            throw new Error('Please fill in all fields');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Please enter a valid email address');
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            throw new Error('Please enter a valid phone number');
        }

        const response = await fetch('https://dadhicheventss.onrender.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error sending message');
        }

        // Show success message
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();

    } catch (error) {
        // Show error message
        alert(error.message || 'Error sending message. Please try again.');
        console.error('Error:', error);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
    }
});


