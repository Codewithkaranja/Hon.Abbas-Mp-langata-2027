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
        
        // Media filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const mediaCards = document.querySelectorAll('.media-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide media cards based on filter
                mediaCards.forEach(card => {
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
        
        // Lightbox functionality for viewing full images
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const closeLightbox = document.getElementById('closeLightbox');
        
        // Open lightbox when clicking on view image links
        document.querySelectorAll('.view-image').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const imageUrl = this.getAttribute('data-image');
                lightboxImage.src = imageUrl;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close lightbox
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
        
        // Featured video play button
        const playFeaturedVideo = document.getElementById('playFeaturedVideo');
        playFeaturedVideo.addEventListener('click', function() {
            window.open('https:///www.youtube.com/channel/UCyTL4fNBFS6BdrJDQ6pdvPA', '_blank');
        });
        
        // Download file functionality
        function downloadFile(fileType) {
            let fileName, fileSize;
            
            switch(fileType) {
                case 'manifesto':
                    fileName = 'Abbas_Khalif_Campaign_Manifesto_2027.pdf';
                    fileSize = '2.4MB';
                    break;
                case 'speech':
                    fileName = 'Campaign_Launch_Speech_Transcript.doc';
                    fileSize = '1.1MB';
                    break;
                case 'policy':
                    fileName = 'Economic_Policy_Brief_Langata_2027.pdf';
                    fileSize = '3.2MB';
                    break;
            }
            
            // In a real implementation, this would trigger a file download
            // For this demo, we'll show a success message
            alert(`Thank you! Your download of "${fileName}" (${fileSize}) has started. In a real implementation, this would download the actual file.`);
        }
        
        // Load more media functionality
        const loadMoreBtn = document.getElementById('loadMoreMedia');
        let additionalMedia = [
            {
                category: "photos",
                date: "May 25, 2025",
                title: "Meeting with Business Leaders",
                excerpt: "Abbas Khalif discussing economic policies with Lang'ata' business community at the Weston Hotel.",
                image: "image - 2026-02-01T125917.409.webp",
                type: "photo"
            },
            {
                category: "videos",
                date: "May 22, 2025",
                title: "Environmental Policy Announcement",
                excerpt: "Watch the full announcement of Abbas Khalif's plan to increase Lang'ata' green spaces by 30%.",
                image: "image - 2026-02-01T130019.282.webp",
                type: "https://www.youtube.com/channel/UCyTL4fNBFS6BdrJDQ6pdvPA"
            },
            {
                category: "community",
                date: "May 18, 2025",
                title: "Visit to South C Health Clinic",
                excerpt: "Abbas Khalif visiting a health clinic in South C to understand healthcare challenges in informal settlements.",
                image: "image - 2026-02-01T131442.150.webp",
                type: "photo"
            }
        ];
        
        loadMoreBtn.addEventListener('click', function() {
            const mediaGrid = document.querySelector('.media-grid');
            
            additionalMedia.forEach((mediaItem, index) => {
                const mediaCard = document.createElement('div');
                mediaCard.className = 'media-card';
                mediaCard.setAttribute('data-category', mediaItem.category);
                mediaCard.style.opacity = '0';
                mediaCard.style.transform = 'translateY(20px)';
                
                const isVideo = mediaItem.type === 'video';
                
                mediaCard.innerHTML = `
                    <div class="media-image" style="background-image: url('${mediaItem.image}');">
                        <span class="media-category">${mediaItem.category.charAt(0).toUpperCase() + mediaItem.category.slice(1)}</span>
                        ${isVideo ? '<div class="video-icon"><i class="fas fa-play"></i></div>' : ''}
                    </div>
                    <div class="media-content">
                        <div class="media-date"><i class="far fa-calendar"></i> ${mediaItem.date}</div>
                        <h3>${mediaItem.title}</h3>
                        <p>${mediaItem.excerpt}</p>
                        ${isVideo ? 
                            `<a href="https://www.youtube.com/channel/UCyTL4fNBFS6BdrJDQ6pdvPA" target="_blank" class="media-link">Watch Video <i class="fas fa-external-link-alt"></i></a>` : 
                            `<a href="#" class="media-link view-image" data-image="${mediaItem.image}">View Full Image <i class="fas fa-external-link-alt"></i></a>`
                        }
                    </div>
                `;
                
                mediaGrid.appendChild(mediaCard);
                
                // Re-attach lightbox event listener for new image links
                if (!isVideo) {
                    const viewImageLink = mediaCard.querySelector('.view-image');
                    viewImageLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        const imageUrl = this.getAttribute('data-image');
                        lightboxImage.src = imageUrl;
                        lightbox.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    });
                }
                
                // Animate the new card
                setTimeout(() => {
                    mediaCard.style.opacity = '1';
                    mediaCard.style.transform = 'translateY(0)';
                    mediaCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }, index * 200);
            });
            
            // Disable button after loading all additional media
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'All Media Loaded';
            loadMoreBtn.style.opacity = '0.6';
            loadMoreBtn.style.cursor = 'default';
        });
        
        // Add animation to media cards when they come into view
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
        
        // Animate media cards
        document.querySelectorAll('.media-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Animate speech cards
        document.querySelectorAll('.speech-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
            
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