// Portfolio JavaScript Functions

// Portfolio Manager Class
class PortfolioManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.currentFilter = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.setupFilterButtons();
        this.setupPortfolioItems();
        this.setupModal();
        this.setupLightbox();
        this.addKeyboardNavigation();
    }
    
    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.filterPortfolio(filter);
                this.updateActiveFilter(button);
            });
        });
    }
    
    setupPortfolioItems() {
        this.portfolioItems.forEach((item, index) => {
            // Add stagger animation delay
            item.style.animationDelay = `${index * 0.1}s`;
            
            // Add click handlers for project links
            const projectLinks = item.querySelectorAll('.project-link');
            projectLinks.forEach(link => {
                if (link.hasAttribute('data-project')) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const projectId = link.getAttribute('data-project');
                        this.openProjectModal(projectId);
                    });
                }
            });
            
            // Add hover effects for touch devices
            item.addEventListener('touchstart', () => {
                item.classList.add('touch-active');
            });
            
            item.addEventListener('touchend', () => {
                setTimeout(() => {
                    item.classList.remove('touch-active');
                }, 300);
            });
        });
    }
    
    filterPortfolio(filter) {
        if (this.isAnimating || filter === this.currentFilter) return;
        
        this.isAnimating = true;
        this.currentFilter = filter;
        
        // Hide all items first
        this.portfolioItems.forEach(item => {
            item.classList.add('filtering');
        });
        this.allCounter = 0;

        setTimeout(() => {
            this.portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                let shouldShow = false;

if (filter === 'all') {
    if (!this.allCounter) this.allCounter = 0;

    if (this.allCounter < 5) {
        shouldShow = true;
        this.allCounter++;
    }
} else {
    shouldShow = categories.includes(filter);
}
                
                if (shouldShow) {
                    item.style.display = 'block';
                    item.classList.remove('filtering');
                    item.classList.add('filter-show');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('filtering', 'filter-show');
                }
            });
            
            // Re-layout masonry if using masonry layout
            this.relayoutMasonry();
            
            setTimeout(() => {
                this.isAnimating = false;
                
                // Remove animation classes
                this.portfolioItems.forEach(item => {
                    item.classList.remove('filter-show');
                });
            }, 300);
        }, 150);
    }
    
    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
    
    relayoutMasonry() {
        // If using a masonry library, trigger relayout here
        // Example for Masonry.js:
        // if (window.masonry) {
        //     window.masonry.layout();
        // }
    }
    
    openProjectModal(projectId) {
        const projectData = this.getProjectData(projectId);
        if (!projectData) return;
        
        const modal = this.createProjectModal(projectData);
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal handlers
        this.setupModalCloseHandlers(modal);
    }
    
    getProjectData(projectId) {
        // Project data - in a real application, this would come from an API or database
        const projects = {
            ecommerce: {
                title: 'About Communication Skills',
                category: 'Publik Speaking',
                description: 'Define a clear professional identity based on strengths, experience, and career goals.',
                challenge: 'Differences in perspective and interests often make strategic messages difficult to fully understand by various parties.',
                solution: 'I deliver information in a clear, structured, and tailored manner to the audience of leaders, teams, and partners—combining data, context, and easy-to-understand language.',
                results: [
                    'The decision-making process has become faster',
                    'Miscommunication has been significantly reduced',
                    'Working relationships with stakeholders have become more solid',
                    'Broader relationships have been established'
                ],
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Figma'],
                images: [
                'images/portfolio/MC_Wisuda.jpeg',
                'images/portfolio/Wahyu_Narasumber.jpeg',
                'images/portfolio/MC.jpeg',
                ],
                liveUrl: 'https://shopease-demo.com',
                githubUrl: 'https://github.com/wahyu/shopease',
                duration: '3 bulan',
                client: 'StartupCommerce Inc.'
            },
            banking: {
                title: 'Duta Wisata Kabupaten Pati',
                category: 'Prestasi Kabupaten',
                description: 'Aplikasi mobile banking dengan desain yang clean dan fitur-fitur inovatif untuk kemudahan transaksi keuangan sehari-hari.',
                challenge: 'Menciptakan aplikasi banking yang aman, mudah digunakan, dan dapat dipercaya oleh pengguna dari berbagai kalangan usia.',
                solution: 'Menerapkan prinsip security by design, menggunakan biometric authentication, dan menyederhanakan user flow untuk transaksi umum.',
                results: [
                    'Download rate 50K+ dalam 3 bulan',
                    'Security rating 5/5 dari audit eksternal',
                    'Average session time 8 menit',
                    'Customer support tickets turun 30%'
                ],
                technologies: ['React Native', 'Firebase', 'Biometric API', 'Figma', 'Principle'],
                images: [
                    'images/portfolio/Duwis_Pati1.jpg',
                    'images/portfolio/Duwis_Pati2.jpg',
                    'images/portfolio/Duwis_Pati3.jpg'
                ],
                duration: '4 bulan',
                client: 'FinTech Solutions'
            },
             // PT JOGJA TAMA TRI CITA 
            dashboard: {
                title: 'Work Experience',
                category: 'Employment',
                description: 'Secretary to the Board of Directors of PT. Jogja Tama Tri Cita',
                challenge: 'Tantangan utama: mengatur jadwal perjalanan dinas direksi yang padat dan dinamis, menyusun estimasi anggaran perjalanan secara akurat, serta menangani komunikasi dengan klien-klien strategis direktur secara profesional dan cepat.',
                solution: 'Solusi baru...',
                results: [
                    'Membangun relasi lebih tepat sasaran lebih',
                    'Meningkatkakn Citra dan Kepercayaan Bisnis 85%',
          
                ],
                technologies: ['CRM', 'LinkedIn', 'Communication Tool'],
                images: [
                    'images/portfolio/Membangunrelasi1.jpg',
                    'images/portfolio/Membangunrelasi2.jpg',
                    'images/portfolio/Sekretariat_Direksi.jpeg',
                    'images/portfolio/Foto_Client1.jpeg',
                    'images/portfolio/FotoClient_Bluebird.jpeg',

                ],
                liveUrl: 'https://dataviz-pro-demo.com',
                duration: '2 Tahun',
                client: 'Kerjasama'
            },
            dashboard2: {   // ✅ PUSKESMAS DUKUHSETI
    title: 'DINAS KESEHATAN KABUPATEN PATI',
    category: 'Employment',
    description: 'Deskripsi baru...',
    challenge: 'Challenge baru...',
    solution: 'Solusi baru...',
    results: [
        'Result baru 1',
        'Result baru 2'
    ],
    technologies: ['CRM'],
    images: [
        'images/portfolio/Pekerjaan_Pusk2.jpeg',
        'images/portfolio/Pekerjaan_Pusk4.jpeg',
         'images/portfolio/Pekerjaan_Pusk3.jpeg',
    ],
    liveUrl: '#',
    duration: '1 Tahun',
    client: 'Client Baru'
},
 // Training & Certifications 
            branding: {
                title: 'certificate',
                category: 'Branding • Visual Identity',
                description: 'Identitas visual lengkap untuk startup teknologi hijau, termasuk logo, color palette, dan brand guidelines yang comprehensive.',
                challenge: 'Menciptakan brand identity yang mencerminkan nilai sustainability dan inovasi teknologi secara bersamaan.',
                solution: 'Mengembangkan visual language yang menggabungkan elemen natural dengan sentuhan teknologi modern.',
                results: [
                    'Brand recognition meningkat 200%',
                    'Social media engagement +150%',
                    'Investor interest meningkat signifikan',
                    'Brand consistency score 98%'
                ],
                technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
                images: [
                    'images/portfolio/WahyuYogaPratama_TOEFL-ITP.PNG',

                ],
                duration: '2 bulan',
                client: 'GreenTech Innovations'
            },
            // SERTIFIKAT BNSP
            branding2: {
                title: 'certificate BNSP ',
                category: 'Branding • Visual Identity',
                description: 'Identitas visual lengkap untuk startup teknologi hijau, termasuk logo, color palette, dan brand guidelines yang comprehensive.',
                challenge: 'Menciptakan brand identity yang mencerminkan nilai sustainability dan inovasi teknologi secara bersamaan.',
                solution: 'Mengembangkan visual language yang menggabungkan elemen natural dengan sentuhan teknologi modern.',
                results: [
                    'Brand recognition meningkat 200%',
                    'Social media engagement +150%',
                    'Investor interest meningkat signifikan',
                    'Brand consistency score 98%'
                ],
                technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
                images: [
                    'images/portfolio/WahyuYogaPratama_TOEFL-ITP.PNG',

                ],
                duration: '2 bulan',
                client: 'GreenTech Innovations'
                 },
                  // CONTENT CREATOR
                 branding3: {
                title: 'CONTENT CREATOR',
                category: 'Branding • Visual Identity',
                description: 'Identitas visual lengkap untuk startup teknologi hijau, termasuk logo, color palette, dan brand guidelines yang comprehensive.',
                challenge: 'Menciptakan brand identity yang mencerminkan nilai sustainability dan inovasi teknologi secara bersamaan.',
                solution: 'Mengembangkan visual language yang menggabungkan elemen natural dengan sentuhan teknologi modern.',
                results: [
                    'Brand recognition meningkat 200%',
                    'Social media engagement +150%',
                    'Investor interest meningkat signifikan',
                    'Brand consistency score 98%'
                ],
                technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
                images: [
                    'images/portfolio/WahyuYogaPratama_TOEFL-ITP.PNG',

                ],
                duration: '2 bulan',
                client: 'GreenTech Innovations'
                 },

                  // SERTIFIKAT DUTA WISATA PATI
                 branding4: {
                title: 'CONTENT CREATOR',
                category: 'Branding • Visual Identity',
                description: 'Identitas visual lengkap untuk startup teknologi hijau, termasuk logo, color palette, dan brand guidelines yang comprehensive.',
                challenge: 'Menciptakan brand identity yang mencerminkan nilai sustainability dan inovasi teknologi secara bersamaan.',
                solution: 'Mengembangkan visual language yang menggabungkan elemen natural dengan sentuhan teknologi modern.',
                results: [
                    'Brand recognition meningkat 200%',
                    'Social media engagement +150%',
                    'Investor interest meningkat signifikan',
                    'Brand consistency score 98%'
                ],
                technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
                images: [
                    'images/portfolio/WahyuYogaPratama_TOEFL-ITP.PNG',

                ],
                duration: '2 bulan',
                client: 'GreenTech Innovations'
                 },
                  // SERTIFIKAT MAS MBAK JAWA TENGAH 
                 branding5: {
                title: 'CONTENT CREATOR',
                category: 'Branding • Visual Identity',
                description: 'Identitas visual lengkap untuk startup teknologi hijau, termasuk logo, color palette, dan brand guidelines yang comprehensive.',
                challenge: 'Menciptakan brand identity yang mencerminkan nilai sustainability dan inovasi teknologi secara bersamaan.',
                solution: 'Mengembangkan visual language yang menggabungkan elemen natural dengan sentuhan teknologi modern.',
                results: [
                    'Brand recognition meningkat 200%',
                    'Social media engagement +150%',
                    'Investor interest meningkat signifikan',
                    'Brand consistency score 98%'
                ],
                technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
                images: [
                    'images/portfolio/WahyuYogaPratama_TOEFL-ITP.PNG',

                ],
                duration: '2 bulan',
                client: 'GreenTech Innovations'
                 },
            lms: {
                title: 'CRM (Customer Relationship Management)',
                category: '• Marketing Konvensional',
                description: 'Meningkatkan retensi pelanggan, repeat order dan life time value pelanggan.',
                challenge: 'Pengelolaan Data dan Segmentasi Pelanggan, Perancangan dan Implementasi Kampanye CRM,Analisis Kinerja dan Penguatan Hubungan Pelanggan..',
                solution: 'Implementasi Sales Courtesy untuk menjaga kepercayaan pelanggan, Mengadakan Sales Call dan Visit serta Telemarketing dan Analisis Kebutuhan serta jaringan pelanggan.',
                results: [
                    'Strategic Thinking & Customer Journey 90%',
                    'productivity meningkat 60%',
                ],
                technologies: ['CRM Website', 'Microsoft Excel'],
                images: [
                    'images/portfolio/Sales1.png',
                    'images/portfolio/Sales2.png',
                    'images/portfolio/Sales3.png'
                ],
                duration: '1 Tahun',
                client: 'Sertifikasi dan Pelatihan'
            },
            fooddelivery: {
                title: 'Mas Mbak Jawa Tengah 2024',
                category: 'Prestasi Provinsi',
                description: 'keterampilan komunikasi, pengetahuan pariwisata, dan soft skills yang mendukung peran sebagai representatif daerah.',
                challenge: 'Kurangnya Minat Generasi Muda terhadap Pariwisata Lokal,Tantangan Bahasa dan Pengetahuan Global.',
                solution: 'Rutin melatih kemampuan bahasa Inggris atau bahasa asing lain.Update pengetahuan umum dan isu pariwisata global serta lokal secara berkala.',
                results: [
                    'Tumbuhnya Wisata Alternatif dan Ekonomi Lokal UMKM di Pati 20%',
                    'Branding Positif Duta Wisata di Media dan Masyarakat 89%',
                    'Kompetensi Pribadi yang Meningkat 70%',
                    'Peningkatan Kesadaran dan Minat Wisata Lokal 50%'
                ],
                technologies: ['Instagram', 'Youtube', 'Tiktok', 'Website', 'Meta Business Suite'],
                images: [
                    'images/portfolio/MasMbak1.jpg',
                    'images/portfolio/MasMbak2.jpg',
                    'images/portfolio/MasMbak3.jpg'
                ],
                duration: '1 Tahun',
                client: 'Desa Wisata dan Wisatawan'
            }
        };
        
        return projects[projectId] || null;
    }
    
    createProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="modal-header">
                    <span class="project-category">${project.category}</span>
                    <h2 class="project-title">${project.title}</h2>
                    <p class="project-description">${project.description}</p>
                </div>
                
                <div class="modal-body">
                    <div class="project-images">
                        <div class="main-image">
                            <img src="${project.images[0]}" alt="${project.title}" class="project-main-img">
                        </div>
                        <div class="image-thumbnails">
                            ${project.images.map((img, index) => `
                                <img src="${img}" alt="${project.title} ${index + 1}" 
                                     class="thumbnail ${index === 0 ? 'active' : ''}" 
                                     data-index="${index}">
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="project-details">
                        <div class="detail-section">
                            <h3>Challenge</h3>
                            <p>${project.challenge}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Solution</h3>
                            <p>${project.solution}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Results</h3>
                            <ul class="results-list">
                                ${project.results.map(result => `<li>${result}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Technologies</h3>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="project-meta">
                            <div class="meta-item">
                                <strong>Duration:</strong> ${project.duration}
                            </div>
                            <div class="meta-item">
                                <strong>Client:</strong> ${project.client}
                            </div>
                        </div>
                        
                        <div class="project-links">
                            ${project.liveUrl ? `
                                <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">
                                    <i class="fas fa-external-link-alt"></i>
                                    View Live Project
                                </a>
                            ` : ''}
                            ${project.githubUrl ? `
                                <a href="${project.githubUrl}" target="_blank" class="btn btn-outline">
                                    <i class="fab fa-github"></i>
                                    View Code
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Setup image gallery
        this.setupModalImageGallery(modal);
        
        return modal;
    }
    
    setupModalImageGallery(modal) {
        const mainImg = modal.querySelector('.project-main-img');
        const thumbnails = modal.querySelectorAll('.thumbnail');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const index = thumbnail.getAttribute('data-index');
                const newSrc = thumbnail.src;
                
                // Update main image
                mainImg.src = newSrc;
                
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
    }
    
    setupModalCloseHandlers(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Keyboard navigation
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    setupModal() {
        // Add modal styles to document
        const modalStyles = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: var(--z-modal);
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition-normal);
            }
            
            .project-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--overlay-bg);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                max-width: 1200px;
                max-height: 90vh;
                margin: 5vh auto;
                background: var(--bg-primary);
                border-radius: var(--radius-xl);
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform var(--transition-normal);
            }
            
            .project-modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: var(--spacing-lg);
                right: var(--spacing-lg);
                width: 40px;
                height: 40px;
                background: var(--bg-secondary);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                transition: all var(--transition-normal);
            }
            
            .modal-close:hover {
                background: var(--gradient-primary);
                color: white;
            }
            
            .modal-header {
                padding: var(--spacing-3xl) var(--spacing-2xl) var(--spacing-xl);
                text-align: center;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-body {
                padding: var(--spacing-2xl);
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--spacing-3xl);
            }
            
            .project-images {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-lg);
            }
            
            .main-image {
                border-radius: var(--radius-lg);
                overflow: hidden;
                box-shadow: 0 10px 30px var(--shadow-medium);
            }
            
            .project-main-img {
                width: 100%;
                height: 300px;
                object-fit: cover;
            }
            
            .image-thumbnails {
                display: flex;
                gap: var(--spacing-sm);
                justify-content: center;
            }
            
            .thumbnail {
                width: 80px;
                height: 60px;
                object-fit: cover;
                border-radius: var(--radius-md);
                cursor: pointer;
                opacity: 0.6;
                transition: opacity var(--transition-normal);
                border: 2px solid transparent;
            }
            
            .thumbnail.active,
            .thumbnail:hover {
                opacity: 1;
                border-color: var(--primary-color);
            }
            
            .project-details {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-xl);
            }
            
            .detail-section h3 {
                color: var(--text-primary);
                margin-bottom: var(--spacing-md);
                font-size: 1.25rem;
            }
            
            .results-list {
                list-style: none;
                padding: 0;
            }
            
            .results-list li {
                padding: var(--spacing-sm) 0;
                border-bottom: 1px solid var(--border-color);
                position: relative;
                padding-left: var(--spacing-lg);
            }
            
            .results-list li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--success-color);
                font-weight: bold;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: var(--spacing-sm);
            }
            
            .project-meta {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--spacing-md);
                padding: var(--spacing-lg);
                background: var(--bg-secondary);
                border-radius: var(--radius-lg);
            }
            
            .project-links {
                display: flex;
                gap: var(--spacing-md);
                justify-content: center;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    margin: 2vh auto;
                    max-height: 96vh;
                    border-radius: var(--radius-lg);
                }
                
                .modal-body {
                    grid-template-columns: 1fr;
                    gap: var(--spacing-xl);
                    padding: var(--spacing-lg);
                }
                
                .modal-header {
                    padding: var(--spacing-xl) var(--spacing-lg);
                }
                
                .project-meta {
                    grid-template-columns: 1fr;
                }
                
                .project-links {
                    flex-direction: column;
                }
            }
        `;
        
        if (!document.querySelector('#modal-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'modal-styles';
            styleSheet.textContent = modalStyles;
            document.head.appendChild(styleSheet);
        }
    }
    
    setupLightbox() {
        // Simple lightbox for portfolio images
        this.portfolioItems.forEach(item => {
            const images = item.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('click', (e) => {
                    if (e.target.closest('.portfolio-overlay')) return;
                    this.openLightbox(img.src, img.alt);
                });
            });
        });
    }
    
    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}" class="lightbox-image">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);
        
        // Close handlers
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const overlay = lightbox.querySelector('.lightbox-overlay');
        
        const closeLightbox = () => {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', closeLightbox);
        
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Number keys for filter shortcuts
            const filterMap = {
                '1': 'all',
                '2': 'uiux',
                '3': 'web',
                '4': 'mobile',
                '5': 'branding'
            };
            
            if (filterMap[e.key]) {
                e.preventDefault();
                const filter = filterMap[e.key];
                const button = document.querySelector(`[data-filter="${filter}"]`);
                if (button) {
                    this.filterPortfolio(filter);
                    this.updateActiveFilter(button);
                }
            }
        });
    }
    
    // Public methods
    filterByCategory(category) {
        const button = document.querySelector(`[data-filter="${category}"]`);
        if (button) {
            this.filterPortfolio(category);
            this.updateActiveFilter(button);
        }
    }
    
    getCurrentFilter() {
        return this.currentFilter;
    }
    
    getVisibleItems() {
        return Array.from(this.portfolioItems).filter(item => 
            item.style.display !== 'none'
        );
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const portfolioManager = new PortfolioManager();
    portfolioManager.filterPortfolio('all');
    
    // Make portfolio manager globally available
    window.portfolioManager = portfolioManager;
    
    // Add portfolio-specific styles
    const portfolioStyles = `
        .portfolio-item.filtering {
            opacity: 0.3;
            transform: scale(0.8);
        }
        
        .portfolio-item.filter-show {
            opacity: 1;
            transform: scale(1);
        }
        
        .portfolio-item.touch-active .portfolio-overlay {
            opacity: 1;
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: var(--z-modal);
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-normal);
        }
        
        .lightbox.show {
            opacity: 1;
            visibility: visible;
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
        }
        
        .lightbox-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-xl);
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: var(--radius-lg);
        }
        
        .lightbox-close {
            position: absolute;
            top: var(--spacing-xl);
            right: var(--spacing-xl);
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            font-size: 1.25rem;
            transition: background var(--transition-normal);
        }
        
        .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    
    if (!document.querySelector('#portfolio-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'portfolio-styles';
        styleSheet.textContent = portfolioStyles;
        document.head.appendChild(styleSheet);
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioManager };
}

