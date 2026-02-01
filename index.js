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
        
        // Interactive hero section - typing effect for slogan
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after page loads
        window.addEventListener('load', function() {
            setTimeout(typeWriter, 500);
        });
        
        // Stats counter animation
        const statNumbers = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-count'));
                    
                    if (target) {
                        let count = 0;
                        const increment = target / 40;
                        
                        const updateCount = () => {
                            if (count < target) {
                                count += increment;
                                statNumber.textContent = Math.ceil(count);
                                setTimeout(updateCount, 50);
                            } else {
                                statNumber.textContent = target;
                            }
                        };
                        
                        updateCount();
                    }
                    observer.unobserve(statNumber);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (target) {
                stat.textContent = '0';
                observer.observe(stat);
            }
        });
        
        // Countdown timer to 2027 elections (August 9, 2027)
        function updateCountdown() {
            const electionDate = new Date('August 9, 2027 00:00:00').getTime();
            const now = new Date().getTime();
            const timeLeft = electionDate - now;
            
            if (timeLeft < 0) {
                document.querySelector('.countdown').innerHTML = '<h3>The 2027 Elections Have Arrived!</h3>';
                return;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(3, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
        // Hero background slider
const heroBg = document.querySelector('.hero-bg');

const heroImages = [
    'image - 2026-02-01T130322.250.webp',
    'image - 2026-02-01T131442.150.webp',
    'image - 2026-02-01T123527.257.webp',
];

let currentIndex = 0;

function changeHeroBackground() {
    heroBg.style.backgroundImage = `
        linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.6)),
        url('${heroImages[currentIndex]}')
    `;
    currentIndex = (currentIndex + 1) % heroImages.length;
}

changeHeroBackground();
setInterval(changeHeroBackground, 8000);

        
        // Add animation to elements when they come into view
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe vision cards, policy cards, and news cards
        document.querySelectorAll('.vision-card, .policy-card, .news-card').forEach(el => {
            scrollObserver.observe(el);
        });
        
        // Donate button functionality
        document.querySelectorAll('a[href="#donate"]').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a modal for donation
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 20px;
                `;
                
                modal.innerHTML = `
                    <div style="background: white; padding: 50px; border-radius: 15px; max-width: 550px; width: 100%; position: relative; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                        <button id="closeModal" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--gray); transition: color 0.3s ease;">&times;</button>
                        <h2 style="color: var(--black); margin-bottom: 25px; font-size: 2rem; text-align: center;">Support Our Campaign</h2>
                        <p style="color: var(--gray); margin-bottom: 25px; text-align: center; font-size: 1.1rem; line-height: 1.6;">Your contribution helps us reach more voters, organize events, and build a better langa'ta. Every shilling makes a difference.</p>
                        
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: var(--black); margin-bottom: 18px; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;"><i class="fas fa-mobile-alt" style="color: var(--emerald);"></i> M-Pesa Payment</h3>
                            <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid var(--emerald);">
                                <p style="margin-bottom: 12px; font-weight: 600;">Paybill Number: <span style="color: var(--emerald); font-size: 1.2rem;">247247</span></p>
                                <p style="margin-bottom: 12px; font-weight: 600;">Account Number: <span style="color: var(--emerald); font-size: 1.2rem;">ABBASKHALIF</span></p>
                                <p style="color: var(--gray); font-size: 0.95rem;">Send any amount via M-Pesa to support our campaign</p>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 35px;">
                            <h3 style="color: var(--black); margin-bottom: 18px; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;"><i class="fas fa-university" style="color: var(--emerald);"></i> Bank Transfer</h3>
                            <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid var(--gold);">
                                <p style="margin-bottom: 10px;"><strong>Bank:</strong> Equity Bank</p>
                                <p style="margin-bottom: 10px;"><strong>Account Name:</strong> Abbas Khalif Campaign Fund</p>
                                <p style="margin-bottom: 10px;"><strong>Account Number:</strong> 0760 1234 5678</p>
                                <p style="margin-bottom: 10px;"><strong>Branch:</strong> Lang'ata</p>
                                <p style="margin-bottom: 10px;"><strong>Swift Code:</strong> EQBLKENA</p>
                            </div>
                        </div>
                        
                        <p style="color: var(--gray); font-size: 0.9rem; text-align: center; padding-top: 20px; border-top: 1px solid var(--gray-light);">All donations are recorded and reported in accordance with Kenyan election laws. We are committed to transparency in campaign financing.</p>
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
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
                
                // Re-enable scrolling when modal is closed
                modal.addEventListener('click', function(e) {
                    if (e.target === modal || e.target.id === 'closeModal') {
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });