   // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Volunteer form submission handling
        const volunteerForm = document.getElementById('volunteerForm');
        const volunteerFormMessage = document.getElementById('volunteerFormMessage');
        
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('volunteer-name').value;
            const email = document.getElementById('volunteer-email').value;
            const phone = document.getElementById('volunteer-phone').value;
            const location = document.getElementById('volunteer-location').value;
            const availability = document.getElementById('volunteer-availability').value;
            
            // Get selected interests
            const selectedInterests = [];
            document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
                selectedInterests.push(checkbox.value);
            });
            
            if (selectedInterests.length === 0) {
                volunteerFormMessage.style.display = 'block';
                volunteerFormMessage.innerHTML = `
                    <div style="background-color: #fee2e2; color: #991b1b; padding: 15px; border-radius: 5px; border-left: 4px solid #ef4444;">
                        <h4 style="margin-bottom: 10px; color: #991b1b;">Please Select Areas of Interest</h4>
                        <p>Please select at least one area of interest to continue.</p>
                    </div>
                `;
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For this demo, we'll just show a success message
            
            volunteerFormMessage.style.display = 'block';
            volunteerFormMessage.innerHTML = `
                <div style="background-color: #d1fae5; color: #065f46; padding: 15px; border-radius: 5px; border-left: 4px solid var(--emerald);">
                    <h4 style="margin-bottom: 10px; color: #065f46;">Volunteer Application Submitted!</h4>
                    <p>Thank you, ${name}! Your application to volunteer has been received.</p>
                    <p>Our volunteer coordinator will contact you at ${phone} within 48 hours to discuss next steps.</p>
                    <p style="margin-top: 10px; font-size: 0.9rem;">For urgent inquiries, please call us at <a href="tel:+2547108649069" style="color: #065f46; font-weight: bold;">+254 727 329 860</a>.</p>
                </div>
            `;
            
            // Reset form
            volunteerForm.reset();
            
            // Scroll to show message
            volunteerFormMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 10 seconds
            setTimeout(() => {
                volunteerFormMessage.style.display = 'none';
            }, 10000);
        });
        
        // Add animation to opportunity cards when they come into view
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate opportunity cards
        document.querySelectorAll('.opportunity-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Animate benefit cards
        document.querySelectorAll('.benefit-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            cardObserver.observe(card);
        });
        
        // Donate button functionality
        document.querySelector('a[href="#donate"]').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a modal for donation
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            `;
            
            modal.innerHTML = `
                <div style="background: white; padding: 40px; border-radius: 10px; max-width: 500px; width: 90%; position: relative;">
                    <button id="closeModal" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray);">&times;</button>
                    <h2 style="color: var(--black); margin-bottom: 20px; font-size: 1.8rem;">Support Our Campaign</h2>
                    <p style="color: var(--gray); margin-bottom: 20px;">Your donation helps us reach more voters and build a better langa'ta. Choose your donation method:</p>
                    
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: var(--black); margin-bottom: 15px; font-size: 1.2rem;">M-Pesa Payment</h3>
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                            <p style="margin-bottom: 10px;"><strong>Paybill Number:</strong> 247247</p>
                            <p style="margin-bottom: 10px;"><strong>Account Number:</strong> ABBASKHALIF</p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: var(--black); margin-bottom: 15px; font-size: 1.2rem;">Bank Transfer</h3>
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
                            <p style="margin-bottom: 10px;"><strong>Bank:</strong> Equity Bank</p>
                            <p style="margin-bottom: 10px;"><strong>Account Name:</strong>Abbas Khalif Campaign</p>
                            <p style="margin-bottom: 10px;"><strong>Account Number:</strong> 0123456789</p>
                            <p><strong>Branch:</strong> langa'ta </p>
                        </div>
                    </div>
                    
                    <p style="color: var(--gray); font-size: 0.9rem; text-align: center;">All donations are recorded and reported in accordance with Kenyan election laws.</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal when X is clicked
            document.getElementById('closeModal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });