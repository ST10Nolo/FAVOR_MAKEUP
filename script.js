
// ==========================================
// FAVOUR MAKEUP - FINAL POE PART 3
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // CHANGE THIS TO THE BUSINESS'S REAL EMAIL ADDRESS
    const BUSINESS_EMAIL = "REPLACE_WITH_BUSINESS_EMAIL";


    // 1. AUTOMATIC FOOTER YEAR

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 2. PRODUCT SEARCH

    const searchInput = document.getElementById("productSearch");
    const productCards = document.querySelectorAll(".product-card");
    const noResults = document.getElementById("noResults");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const searchValue = searchInput.value.toLowerCase();
            let visibleProducts = 0;

            productCards.forEach(function (card) {

                const productName = card.textContent.toLowerCase();

                if (productName.includes(searchValue)) {
                    card.style.display = "";
                    visibleProducts++;
                } else {
                    card.style.display = "none";
                }
            });

            if (noResults) {
                noResults.style.display =
                    visibleProducts === 0 ? "block" : "none";
            }
        });
    }


    // 3. FAQ ACCORDION

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;

            if (answer) {
                const isOpen =
                    answer.style.display === "block";

                answer.style.display = isOpen ? "none" : "block";
                question.setAttribute("aria-expanded", String(!isOpen));
            }
        });
    });


    // 4. IMAGE GALLERY LIGHTBOX

    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    if (lightbox && lightboxImage) {

        galleryImages.forEach(function (image) {

            image.addEventListener("click", function () {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightbox.style.display = "flex";
            });
        });

        if (closeLightbox) {
            closeLightbox.addEventListener("click", function () {
                lightbox.style.display = "none";
            });
        }

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                lightbox.style.display = "none";
            }
        });
    }


    // 5. CHECK FORM INPUTS

    function validateForm(form) {

        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        const emailField = form.querySelector('input[type="email"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailField && !emailPattern.test(emailField.value.trim())) {
            emailField.setCustomValidity("Please enter a valid email address.");
            emailField.reportValidity();
            emailField.setCustomValidity("");
            return false;
        }

        return true;
    }


    // 6. ENQUIRY FORM

    const enquiryForm = document.getElementById("enquiryForm");
    const enquiryResponse = document.getElementById("enquiryResponse");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!validateForm(enquiryForm)) {
                return;
            }

            const enquiryType =
                document.getElementById("enquiryType").value;

            let responseMessage =
                "Thank you for your interest in Favour Makeup. ";

            if (enquiryType === "Makeup Service") {
                responseMessage +=
                    "Please contact us to confirm service pricing and availability.";
            } else if (enquiryType === "Beauty Product") {
                responseMessage +=
                    "Please contact us to confirm product prices and availability.";
            } else if (enquiryType === "Volunteer") {
                responseMessage +=
                    "Thank you for your interest in volunteering. Please enquire for more information.";
            } else if (enquiryType === "Sponsorship") {
                responseMessage +=
                    "Thank you for your sponsorship interest. Please contact us to discuss the opportunity.";
            } else {
                responseMessage +=
                    "Please contact us for more information about your enquiry.";
            }

            if (enquiryResponse) {
                enquiryResponse.textContent = responseMessage;
            }

            // Prepare an email if the real business address is configured.
            if (BUSINESS_EMAIL !== "REPLACE_WITH_BUSINESS_EMAIL") {

                const name = document.getElementById("enquiryName").value;
                const email = document.getElementById("enquiryEmail").value;
                const details = document.getElementById("enquiryDetails").value;

                const subject = encodeURIComponent("Favour Makeup Enquiry");

                const body = encodeURIComponent(
                    "Name: " + name +
                    "\nEmail: " + email +
                    "\nEnquiry Type: " + enquiryType +
                    "\nDetails: " + details
                );

                window.location.href =
                    "mailto:" + BUSINESS_EMAIL +
                    "?subject=" + subject +
                    "&body=" + body;

            } else if (enquiryResponse) {

                enquiryResponse.textContent +=
                    " Your details have been checked in this browser, " +
                    "but no message has been sent because the business email " +
                    "address has not been configured.";
            }
        });
    }


    // 7. CONTACT FORM

    const contactForm = document.getElementById("contactForm");
    const contactResponse = document.getElementById("contactResponse");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!validateForm(contactForm)) {
                return;
            }

            if (BUSINESS_EMAIL === "REPLACE_WITH_BUSINESS_EMAIL") {

                if (contactResponse) {
                    contactResponse.textContent =
                        "Your form is valid, but the business email address " +
                        "must be added before an email can be prepared.";
                }

                return;
            }

            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const messageType = document.getElementById("messageType").value;
            const message = document.getElementById("contactMessage").value;

            const subject = encodeURIComponent(
                "Favour Makeup - " + messageType
            );

            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\nMessage Type: " + messageType +
                "\nMessage: " + message
            );

            if (contactResponse) {
                contactResponse.textContent =
                    "Your email application will open so you can review and send your message.";
            }

            window.location.href =
                "mailto:" + BUSINESS_EMAIL +
                "?subject=" + subject +
                "&body=" + body;
        });
    }


    // 8. SCROLL REVEAL ANIMATION

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.15
        });

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

});
