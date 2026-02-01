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
        
        // News filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const newsCards = document.querySelectorAll('.news-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide news cards based on filter
                newsCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Newsletter form submission
        const newsletterForm = document.getElementById('newsletterForm');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // In a real implementation, you would send this data to a server
            // For this demo, we'll just show a success message
            
            // Create a success message
            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div style="background-color: rgba(255, 255, 255, 0.9); color: #065f46; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
                    <h4 style="margin-bottom: 10px; color: #065f46;">Successfully Subscribed!</h4>
                    <p>Thank you for subscribing to our newsletter. You'll receive updates at ${email}.</p>
                </div>
            `;
            
            // Insert the message after the form
            this.parentNode.insertBefore(successMessage, this.nextSibling);
            
            // Reset form
            this.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
        
        // Load more button functionality
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        let additionalNews = [
            {
                category: "events",
                date: "May 25, 2025",
                title: "Women's Empowerment Forum Draws Hundreds in South C",
                excerpt: "Abbas Khalif hosted a women's empowerment forum focusing on economic opportunities, safety, and political participation for Lang'ata women.",
                image: "image - 2026-02-01T124941.124.webp"
            },
            {
                category: "policy",
                date: "May 22, 2025",
                title: "Environmental Policy: Abbas Pledges to Increase Lang'ata's Green Spaces by 30%",
                excerpt: "Detailed plan unveiled to combat climate change in Lang'ata through increased tree planting, waste management reforms, and green building incentives.",
                image: "image - 2026-02-01T124759.895.webp"
            },
            {
                category: "media",
                date: "May 18, 2025",
                title: "Interview with Business Daily: Abbas Outlines Economic Recovery Plan",
                excerpt: "In a detailed interview, Abbas Khalif discusses how he plans to revive Lang'ata's economy post-pandemic through strategic investments and business support.",
                image: "image - 2026-02-01T125653.005.webp"
            }
        ];
        
        loadMoreBtn.addEventListener('click', function() {
            const newsGrid = document.querySelector('.news-grid');
            
            additionalNews.forEach((newsItem, index) => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.setAttribute('data-category', newsItem.category);
                newsCard.style.opacity = '0';
                newsCard.style.transform = 'translateY(20px)';
                
                newsCard.innerHTML = `
                    <div class="news-image" style="background-image: url('${newsItem.image}');">
                        <span class="news-category">${newsItem.category.charAt(0).toUpperCase() + newsItem.category.slice(1)}</span>
                    </div>
                    <div class="news-content">
                        <div class="news-date"><i class="far fa-calendar"></i> ${newsItem.date}</div>
                        <h3>${newsItem.title}</h3>
                        <p>${newsItem.excerpt}</p>
                        <a href="#read-more" class="news-link">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                
                newsGrid.appendChild(newsCard);
                
                // Animate the new card
                setTimeout(() => {
                    newsCard.style.opacity = '1';
                    newsCard.style.transform = 'translateY(0)';
                    newsCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }, index * 200);
            });
            
            // Disable button after loading all additional news
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'All News Loaded';
            loadMoreBtn.style.opacity = '0.6';
            loadMoreBtn.style.cursor = 'default';
        });
        
        // Add animation to news cards when they come into view
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
        
        // Animate news cards
        document.querySelectorAll('.news-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
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
                    <p style="color: var(--gray); margin-bottom: 20px;">Your donation helps us reach more voters and build a better Lang'ata. Choose your donation method:</p>
                    
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
                            <p style="margin-bottom: 10px;"><strong>Account Name:</strong> Abbas Khalif Campaign</p>
                            <p style="margin-bottom: 10px;"><strong>Account Number:</strong> 0123456789</p>
                            <p><strong>Branch:</strong> Lang'ata Central</p>
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