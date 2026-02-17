// Portfolio JavaScript Functions

// Portfolio Manager Class
class PortfolioManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.initialLimit = 5;
        this.itemsToShow = this.initialLimit;
        this.currentFilter = null;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupLoadMoreButton();
        this.setupPortfolioItems();
        this.setupModal();
        this.setupLightbox();
        this.addKeyboardNavigation();
    }

    setupLoadMoreButton() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if (this.itemsToShow < this.portfolioItems.length) {
                    // Expand
                    this.itemsToShow = this.portfolioItems.length;
                } else {
                    // Collapse
                    this.itemsToShow = this.initialLimit;

                    // Scroll to portfolio section top
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                        portfolioSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                this.filterPortfolio(this.currentFilter, true);
            });
        }
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

    filterPortfolio(filter, force = false) {
        if (this.isAnimating || (filter === this.currentFilter && !force)) return;

        this.isAnimating = true;
        this.currentFilter = filter;

        // Reset limit if not forced (meaning it's a new filter selection)
        if (!force) {
            this.itemsToShow = this.initialLimit;
        }

        // Toggle Load More button visibility
        if (this.loadMoreBtn) {
            if (filter === 'all' && this.portfolioItems.length > this.initialLimit) {
                this.loadMoreBtn.style.display = 'inline-block';
                // Update button text
                if (this.itemsToShow >= this.portfolioItems.length) {
                    this.loadMoreBtn.textContent = 'Less';
                } else {
                    this.loadMoreBtn.textContent = 'More';
                }
            } else {
                this.loadMoreBtn.style.display = 'none';
            }
        }

        // Hide all items first
        this.portfolioItems.forEach(item => {
            item.classList.add('filtering');
        });

        setTimeout(() => {
            let visibleCount = 0;
            this.portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                let shouldShow = false;

                if (filter === 'all') {
                    if (visibleCount < this.itemsToShow) {
                        shouldShow = true;
                        visibleCount++;
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
                category: 'Public Speaking',
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
                duration: '3 Months',
                client: 'StartupCommerce Inc.'
            },
            //DUTA WISATA PATI
            custom_banking: {
                title: 'Pati Regency Tourism Ambassador',
                category: 'Regency Achievements',
                description: '',
                challenge: 'Recognized as a top regional Tourism Ambassador, demonstrating strong communication, cultural expertise, and stakeholder engagement in collaboration with Dinas Pariwisata Pati.',
                solution: 'Built strong expertise in local tourism and culture through intensive communication training and practical interview and case study simulations.',
                results: [
                    'Achieved 2nd place at regency level competition',
                    'Served as an official representative for Pati tourism promotion',
                    'Built strong networks with government institutions, tourism stakeholders, and community organizations',

                ],
                technologies: ['PowerPoint', 'Canva', 'social media platforms', 'Figma', 'Online Research'],
                images: [
                    'images/portfolio/Duwis_Pati.jpg',
                    'images/portfolio/Duwis_Pati1.jpg',
                    'images/portfolio/Duwis_Pati2.jpg',
                    'images/portfolio/Duwis_Pati3.jpg'
                ],
                duration: '12 Months',
                client: 'Dinas Pariwisata Pati, local communities, and tourists'
            },
            campus_ambassador: {
                title: 'Campus Ambassador 2024',
                category: 'University Achievements',
                description: 'Campus Ambassador Winner',
                challenge: 'Representation of high-achieving and communicative students.',
                solution: 'Actively participated in campus events and promoted university programs to prospective students.',
                results: [
                    'Winner Campus Ambassador 2024',
                    'Increased student engagement in campus activities',
                ],
                technologies: ['Public Speaking', 'Social Media', 'Event Management'],
                images: [
                    'images/portfolio/Dupus_Stie.jpg',
                ],
                duration: '1 Year',
                client: 'University'
            },
            // PT JOGJA TAMA TRI CITA 
            dashboard: {
                title: 'PT JOGJA TAMA TRI CITA ',
                category: 'Work Experience',
                description: 'Secretary to the Board of Directors of PT. Jogja Tama Tri Cita',
                challenge: 'Jogja Tama Tri Cita is a holding company engaged in certification, training and human resource development, event organizer, creative production, as well as program study and business development consultants.',
                solution: 'Managed executive business travel scheduling and budgeting, coordinated strategic client communications and meetings, and maintained systematic documentation of correspondence and meeting records.',

                results: [
                    'Service schedule accuracy ↑ 95%',
                    'More accurate budgeting, minimized cost overruns',
                    'Fast client response, maintained professional relationships',
                    'Risk of miscommunication & administrative delays ↓ significantly',
                ],
                technologies: ['MS Office', 'Google Workspace', 'Travel app', 'Digital Archiving'],
                images: [
                    'images/portfolio/Membangunrelasi1.jpg',
                    'images/portfolio/Membangunrelasi2.jpg',
                    'images/portfolio/Foto_Client1.jpeg',
                    'images/portfolio/FotoClient_Bluebird.jpeg',

                ],
                liveUrl: 'https://www.instagram.com/sekretariatdireksi?igsh=MTljczRqaHh6eTB4MQ==',
                duration: '2 Years',
                client: 'Board of Directors PT. Jogja Tama Tri Cita'
            },
            dashboard2: {   // ✅ PUSKESMAS DUKUHSETI
                title: 'Pati Regency Health Office',
                category: 'Government Agencies',
                description: 'Administrative Staff',
                challenge: 'A regional public health authority overseeing the planning, implementation, and administration of community health programs, supported by integrated service units and standardized operational procedures to enhance public healthcare delivery and administrative efficiency.',
                solution: 'Managed incoming and outgoing correspondence (manual and digital), verified document completeness and reports, ensured timely document distribution, and supported meetings through scheduling, minute-taking, and administrative coordination.',
                results: [
                    'Improved public service efficiency through structured administrative support',
                    'Standardized SOPs via cross-unit collaboration',
                    'Boosted document retrieval speed by 40% with a coding system',
                    'Supported 10+ health programs reaching 5,000+ participants',
                ],
                technologies: ['MS Office', 'Google Workspace', 'scanner'],
                images: [
                    'images/portfolio/Membangunrelasi3.jpeg',
                    'images/portfolio/Pekerjaan_Pusk2.jpeg',
                    'images/portfolio/Pekerjaan_Pusk4.jpeg',
                    'images/portfolio/Pekerjaan_Pusk3.jpeg',
                ],

                duration: '2 Years',
                client: 'Internal (all areas of Pati Health Office) & External (Community Health Centers, Hospitals, partner agencies, community)'
            },
            // PROJECT
            // JKPI 
            toefl: {
                title: 'Certifications: TOEFL ITP (ETS)',
                category: 'Certifications',
                description: 'English Proficiency Certification',
                challenge: 'Demonstrating English language proficiency for academic and professional purposes.',
                solution: 'Achieved a score demonstrating competency in listening, structure, and reading comprehension.',
                results: [
                    'TOEFL ITP Certification from ETS'
                ],
                technologies: ['English Language'],
                images: [
                    'images/portfolio/WahyuYogaPratama_TOEFL-ITP.PNG',
                ],
                duration: '-',
                client: 'ETS'
            },
            // RAKERNAS JKPI 
            rakernas: {
                title: 'JKPI NATIONAL MEETING INDONESIA',
                category: 'National Event',
                description: 'Stage Manager of Indonesian Heritage Cities Network',
                challenge: 'Managing stage operations for a national level event involving multiple stakeholders.',
                solution: 'Coordinated stage activities, ensured smooth flow of the event, and managed technical requirements.',
                results: [
                    'Successful execution of the national working meeting',
                    'Successfully Holding the Indonesian Heritage City Network Event',
                    'Presenting 3 speakers from UNESCO, Malaysia and Indonesia',
                ],
                technologies: ['Event Management', 'Coordination', 'Stage Management'],
                images: [
                    'images/portfolio/Rakernas_JKPI2.jpeg',
                    'images/portfolio/Rakernas_JKPI1.jpeg',
                    'images/portfolio/Rakernas_JKPI3.jpeg',
                ],
                duration: 'Event Duration',
                client: 'Jaringan Kota Pusaka Indonesia'
            },
            content_creator: {
                title: 'CONTENT CREATOR',
                category: 'Video Production',
                description: 'Social Media',
                challenge: 'Demonstrating competency in content creation professionally.',
                solution: 'Completed certification process for content creation, proving skills in planning, producing, and evaluating content.',
                results: [
                    'CNN Indonesia Video Production in Pati Regency',
                ],
                technologies: ['Content Creation', 'Social Media Strategy'],
                images: [
                    'images/portfolio/Pembuatan_Konten.jpeg',


                ],

                client: 'CNN Indonesia'
            },

            // PENDAMPINGAN PERJALANAN DINAS
            travel_management: {
                title: 'OFFICIAL TRAVEL SUPPORT',
                category: 'Out of Town Meeting Agenda',
                description: 'Executive Secretary',
                challenge: 'Managing executive travel and meeting schedules efficiently.',
                solution: 'Arranged travel logistics, accompanied directors, and ensured meeting objectives were met.',
                results: [
                    'Smooth execution of official travel',
                    'Effective meeting facilitation',
                ],
                technologies: ['Travel Management', 'Scheduling', 'Coordination'],
                images: [
                    'images/portfolio/Perjalanan_Dinas1.jpeg',
                    'images/portfolio/Perjalanan_Dinas4.jpeg',
                ],
                duration: 'Ongoing',
                client: 'Company Directors'
            },
            // MENJAGA HUBUNGAN CLIENT
            client_relations: {
                title: 'CLIENT RELATIONSHIP MAINTENANCE',
                category: 'Client Relationship Management',
                description: 'Maintaining professional relationships with clients.',
                challenge: 'Building and sustaining long-term professional relationships.',
                solution: 'Engaged with clients regularly, addressed their needs, and ensured satisfaction.',
                results: [
                    'Improved client retention',
                    'Stronger professional network',
                    'Increased client satisfaction',
                    'Enhanced client loyalty',

                ],
                technologies: ['Communication', 'Relationship Management'],
                images: [
                    'images/portfolio/MenjagaHubunganClient4.jpeg',
                    'images/portfolio/MenjagaHubunganClient2.jpeg',
                    'images/portfolio/MenjagaHubunganClient3.jpeg',
                    'images/portfolio/MenjagaHubunganClient1.jpeg',
                ],
                duration: 'Ongoing',
                client: 'Various Clients'
            },
            lms: {
                title: 'CRM (Customer Relationship Management)',
                category: 'Conventional Marketing',
                description: 'Increasing customer retention, repeat orders, and customer lifetime value.',
                challenge: 'Data Management and Customer Segmentation, Design and Implementation of CRM Campaigns, Performance Analysis and Strengthening Customer Relationships.',
                solution: 'Implementation of Sales Courtesy to maintain customer trust, Conducting Sales Calls and Visits as well as Telemarketing and Analysis of Needs and customer networks.',
                results: [
                    'Strategic Thinking & Customer Journey 90%',
                    'productivity increased 60%',
                ],
                technologies: ['CRM Website', 'Microsoft Excel'],
                images: [
                    'images/portfolio/Sales1.png',
                    'images/portfolio/Sales2.png',
                    'images/portfolio/Sales3.png'
                ],
                duration: '1 Year',
                client: 'PT'
            },
            fooddelivery: {
                title: 'Mas & Mbak Central Java 2024',
                category: 'Provincial Achievements',
                description: 'Favorite Mas of Central Java title.',
                challenge: 'A competitive program organized by the provincial tourism authority of Dinas Pariwisata Provinsi Jawa Tengah to identify and develop high-potential young talents to support and promote tourism across Central Java.',
                solution: 'Conducted regional tourism research and completed intensive professional coaching, strengthened through bilingual interviews, debates, and presentation training to enhance communication and analytical skills across Central Java Province.',
                results: [
                    'Ranked among the Top 10 finalists at the provincial level',
                    'Selected as an official icon for tourism and cultural promotion in Central Java',
                    'Served as master of ceremonies, keynote speaker, and tourism advertising ambassador',
                    'Built extensive networks with provincial government bodies, media partners, and creative industries',

                ],
                technologies: ['Instagram', 'Youtube', 'Tiktok', 'Website', 'Meta Business Suite'],
                images: [
                    'images/portfolio/MasMbak1.jpg',
                    'images/portfolio/MasMbak2.jpg',
                    'images/portfolio/MasMbak3.jpg'
                ],
                duration: '1 year',
                client: 'Tourist Villages and Tourists'
            },
            narasumber: {
                title: 'Guest Speaker',
                category: 'Public Speaking',
                description: 'Professional Speaker & Resource Person',
                challenge: 'Delivering impactful presentations and sharing knowledge with diverse audiences.',
                solution: 'Structured content delivery and interactive sessions to engage participants effectively.',
                results: [
                    'Speaker for various professional events',
                    'Shared expertise on communication and leadership',
                    'Engaged with diverse audience groups'
                ],
                technologies: ['Public Speaking', 'Presentation', 'Communication'],
                images: [
                    'images/portfolio/Wahyu_Narasumber.jpeg'
                ],
                duration: 'Ongoing',
                client: 'Various Organizations'
            },
            mc: {
                title: 'Master of Ceremonies',
                category: 'Master of Ceremonies',
                description: 'Professional Master of Ceremonies for various events.',
                challenge: 'Ensuring smooth event flow and engaging the audience.',
                solution: 'Led the event with energy, professionalism, and adherence to the rundown.',
                results: [
                    'Hosted formal and informal events',
                    'Maintained audience engagement',
                    'Ensured timely execution of event agenda'
                ],
                technologies: ['Public Speaking', 'Event Management'],
                images: [
                    'images/portfolio/MC.jpeg',
                    'images/portfolio/MC_Wisuda.jpeg',
                    'images/portfolio/MCWisuda2.jpeg'
                ],
                duration: 'Ongoing',
                client: 'Various Clients'
            }
        };

        return projects[projectId] || null;
    }

    createProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';

        // Check if the current project is meant to be displayed in simplified view
        // The user wants "Project" button items (data-filter="branding") to have simplified view
        // We can check if the project object matches one of the known "branding" projects
        // Based on the data structure, keys like 'toefl', 'rakernas', 'content_creator', 'travel_management', 'client_relations' 
        // seem to be the ones under "Project" or similar.
        // However, a more robust way is to check the category string or add a flag to the project data.
        // Let's check the category for keywords that user associates with "Project" button items.
        // The button has data-filter="branding". Let's look at the mapping.
        // It seems 'branding' filter corresponds to various categories.
        // Let's rely on the specific keys or a list of keys that serve as "Project" items,
        // OR better, let's look at how filterPortfolio works. It filters by matching data-category.
        // But here we are inside createProjectModal, we have the 'project' object.
        // We need to know if this project falls under the "Project" button group.
        // Based on previous context, the user wants this for "Project" button items.
        // Let's assume projects with specific categories or keys are "Project" items.
        // Looking at the data:
        // 'rakernas' -> category: 'Event Nasional'
        // 'toefl' -> category: 'Certifications'
        // 'travel_management' -> category: 'Agenda Meeting Luar Kota'
        // 'client_relations' -> category: 'Sertifikat Provinsi'
        // These seem to be the ones.
        // 'lms' (CRM) -> category: '• Marketing Konvensional' which might be under 'branding' filter in HTML? 
        // Wait, the HTML shows data-filter="branding" for "Project" button.
        // We need to verify which items have class 'branding'.
        // Since we don't see the HTML classes for items here, let's use a list of keys that we know are "Projects".

        const projectKeys = ['toefl', 'rakernas', 'content_creator', 'travel_management', 'client_relations', 'lms'];
        /* Note: 'lms' Key was 'CRM (Customer Relationship Management)' which user mentioned earlier. 
           In the data, 'lms' has category '• Marketing Konvensional'. 
           We verify if this is considered a "Project". User said "tombol project".
           Let's assume the user refers to the items shown when "Project" filter is active.
           If we look at the portfolio items in HTML (not fully shown), they likely have categories.
           A safer bet is to check if the modal is triggered from a context, but we don't have that.
           
           Let's look at the user request: "ketika aku klik tombol project ... aku hanya berfokus di tombol proect"
           This implies the specific filter "branding" (Project).
           
           Let's try to identify them by checking if they are NOT "Work Experience" (uiux) or "Achievements" (web).
           Work Experience keys: 'dashboard' (PT JOGJA...), 'dashboard2' (Pats Regency...)
           Achievements keys: 'custom_banking' (Duta Wisata), 'campus_ambassador', 'fooddelivery' (Mas Mbak), 'ecommerce' (About Comm Skills - maybe?)
           
           Let's explicitly define the "Project" group based on exclusion or inclusion.
           Inclusion list seems safer.
        */
        const textOnlyProjects = ['toefl', 'rakernas', 'content_creator', 'travel_management', 'client_relations']; // 'lms' has detailed results so maybe keep it? User said "CRM" earlier. 
        // User said: "tombol project ... jadi contoh ketika saya klik tombol salah satu card tidak ada tulisan About..."
        // So ALL cards under "Project" button.

        // Let's modify the condition to be broader if needed, or stick to specific categories.
        // Categories for "Project" seem to be: 'Certifications', 'Event Nasional', 'Sertifikat BNSP', 'Agenda Meeting Luar Kota', 'Sertifikat Provinsi'.
        // 'lms' category is '• Marketing Konvensional'.

        const simplifiedCategories = ['Certifications', 'National Event', 'BNSP Certificate', 'Out of Town Meeting Agenda', 'Provincial Certificate', 'Conventional Marketing', 'Public Speaking', 'Master of Ceremonies', 'Client Relationship Management', 'Video Production'];

        if (simplifiedCategories.includes(project.category) || project.category.includes('Sertifikat') || project.category.includes('Event')) {
            // Simplified view

            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-content simple-view">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="modal-header">
                        <span class="project-category">${project.category}</span>
                        <h2 class="project-title">${project.title}</h2>
                        <p class="project-description">${project.description}</p>
                    </div>
                    
                    <div class="modal-body">
                        <div class="simple-gallery">
                            ${project.images.map((img, index) => {
                // Logic to map descriptions to images based on index
                // For now, we use the main description or specific ones if added to data
                let desc = project.description;
                // If specific image descriptions exist in future, use them here.
                // Currently using main description repeating or empty for subsequent

                // Custom description logic per your request: 1 image 1 desc, 2 images 2 desc...
                // Since current data structure has one main description, we will use it for the first image
                // or if you add an array of descriptions to the data, use that.
                // START TEMPORARY LOGIC:
                // If project has a 'results' array, use those as captions for multiple images
                if (project.results && project.results[index]) {
                    desc = project.results[index];
                } else if (index === 0) {
                    desc = project.challenge || project.description;
                } else {
                    desc = '';
                }
                // END TEMPORARY LOGIC

                return `
                                <div class="gallery-item">
                                    <img src="${img}" alt="${project.title} ${index + 1}" class="gallery-image">
                                    ${desc ? `<p class="gallery-description">${desc}</p>` : ''}
                                </div>
                                `;
            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Standard detailed view for Work Experience and Achievements
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
                                <h3>About</h3>
                                <p>${project.challenge}</p>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Main Areas of Responsibility</h3>
                                <p>${project.solution}</p>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Performance Outcomes</h3>
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

            // Setup image gallery only for standard view
            this.setupModalImageGallery(modal);
        }

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
            
            .modal-content.simple-view {
                max-width: 800px;
            }

            .modal-content.simple-view .modal-body {
                grid-template-columns: 1fr;
                gap: var(--spacing-xl);
            }

            .simple-gallery {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-2xl);
            }

            .gallery-item {
                text-align: center;
                background: var(--bg-secondary);
                padding: var(--spacing-lg);
                border-radius: var(--radius-lg);
            }

            .gallery-image {
                width: 100%;
                height: auto;
                border-radius: var(--radius-md);
                margin-bottom: var(--spacing-md);
                box-shadow: 0 4px 15px var(--shadow-light);
            }

            .gallery-description {
                font-size: 1rem;
                color: var(--text-secondary);
                font-style: italic;
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

// Skills Manager Class
class SkillsManager {
    constructor() {
        this.skillsSection = document.querySelector('.skills-section');
        this.skillsGrid = document.querySelector('.skills-grid');
        this.limit = 4;
    }

    init() {
        if (!this.skillsSection || !this.skillsGrid) return;
        this.processCategories();
    }

    processCategories() {
        const categories = this.skillsGrid.querySelectorAll('.skill-category');

        categories.forEach(category => {
            const tagsContainer = category.querySelector('.skill-tags');
            const tags = tagsContainer.querySelectorAll('.skill-tag');

            if (tags.length > this.limit) {
                // Hide excess skills
                tags.forEach((tag, index) => {
                    if (index >= this.limit) {
                        tag.classList.add('hidden-skill');
                    }
                });

                // Create button for this category
                this.createCategoryButton(category);
            }
        });
    }

    createCategoryButton(category) {
        const btn = document.createElement('button');
        btn.className = 'skill-expand-btn';
        btn.innerHTML = 'Learn More <i class="fas fa-chevron-down"></i>';

        let isExpanded = false;

        btn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            const hiddenTags = category.querySelectorAll('.skill-tag');

            if (isExpanded) {
                hiddenTags.forEach((tag, index) => {
                    if (index >= this.limit) {
                        tag.classList.remove('hidden-skill');
                        tag.style.animation = 'scaleIn 0.3s ease forwards';
                    }
                });
                btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
                btn.classList.add('active');
            } else {
                hiddenTags.forEach((tag, index) => {
                    if (index >= this.limit) {
                        tag.classList.add('hidden-skill');
                    }
                });
                btn.innerHTML = 'Learn More <i class="fas fa-chevron-down"></i>';
                btn.classList.remove('active');
            }
        });

        // Append button to category
        category.appendChild(btn);
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const portfolioManager = new PortfolioManager();
    const skillsManager = new SkillsManager();

    portfolioManager.filterPortfolio('all');
    skillsManager.init();

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

        .hidden-skill {
            display: none !important;
        }

        .skill-expand-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            font-family: var(--font-primary);
            color: var(--text-secondary);
            background: transparent;
            border: 1px solid var(--border-color);
            padding: 0.4rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 1rem;
            transition: all 0.3s ease;
            outline: none;
        }

        .skill-expand-btn:hover, .skill-expand-btn.active {
            border-color: var(--primary-color);
            color: var(--primary-color);
            background: rgba(102, 126, 234, 0.05);
        }

        .skill-expand-btn i {
            font-size: 0.7rem;
            transition: transform 0.3s ease;
        }

        .skill-expand-btn.active i {
            transform: rotate(180deg);
        }

        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
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

