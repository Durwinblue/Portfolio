import React from 'react';
import { Menu, X, Download, ExternalLink, Mail, Linkedin, Github, Twitter, Phone, MapPin, Calendar, User, Code, Briefcase, FileText, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Get all elements that should be animated
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      animatedElements.forEach((element) => {
        // Check if element is in viewport
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.85;
        
        if (isInViewport) {
          element.classList.add('animate-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on mount to check initial elements
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <span className="text-[#9ef01a] text-2xl">★</span>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {['Home', 'About Me', 'Skills', 'Resume', 'Achievements', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                  className="text-white hover:text-[#9ef01a] transition-colors text-sm uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About Me', 'Skills', 'Resume', 'Achievements', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                  className="block w-full text-left px-3 py-2 text-white hover:text-[#9ef01a] text-sm uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1740592963142-cb920b0e56e2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-on-scroll animate-visible opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none">
              Negin<br />Arabzadeh
            </h1>
            <p className="text-lg text-white/80 max-w-xl">
              Hello, my name is Negin Arabzadeh, nice to meet you! I would like to welcome you with my personal portfolio.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="aboutme" className="py-24 bg-gradient-to-b from-black to-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
              <div className="absolute -inset-4 border border-[#9ef01a]/20 rounded-lg transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1740593178604-066b1fa1122a?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Negin Arabzadeh" 
                className="rounded-lg w-full h-auto relative z-10"
              />
            </div>
            
            <div className="space-y-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-500">
              <div className="flex items-center gap-3 text-lg">
                <User className="text-[#9ef01a]" size={20} />
                <span className="text-white/80">Negin Arabzadeh</span>
              </div>
              
              <div className="flex items-center gap-3 text-lg">
                <Calendar className="text-[#9ef01a]" size={20} />
                <span className="text-white/80">23 Years Old</span>
              </div>
              
              <div className="flex items-center gap-3 text-lg">
                <MapPin className="text-[#9ef01a]" size={20} />
                <span className="text-white/80">Famasguta, Cyprus</span>
              </div>
              
              <div className="flex items-center gap-3 text-lg">
                <Briefcase className="text-[#9ef01a]" size={20} />
                <span className="text-white/80">SaaS Entrepreneur & Web Developer</span>
              </div>
              
              <p className="text-white/80 leading-relaxed mt-6">
                I am a passionate web developer and entrepreneur with a strong background in computer science. 
                With over 5 years of experience in web development and a successful track record as a SaaS founder, 
                I combine technical expertise with business acumen to create innovative digital solutions.
              </p>
              
              <p className="text-white/80 leading-relaxed">
                My journey in technology began with a deep curiosity about how digital systems work, leading me to pursue 
                formal education in computer science and eventually launching my own SaaS business. I'm constantly learning 
                and exploring new technologies to stay at the forefront of digital innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-black/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
              <h3 className="text-2xl font-bold mb-6 text-[#9ef01a] flex items-center gap-3">
                <Code size={24} />
                Technical Skills
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: 'JavaScript', level: 90 },
                  { name: 'React.js', level: 85 },
                  { name: 'Node.js', level: 80 },
                  { name: 'TypeScript', level: 75 },
                  { name: 'HTML/CSS', level: 95 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-[#9ef01a] h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Design Skills */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
              <h3 className="text-2xl font-bold mb-6 text-[#9ef01a] flex items-center gap-3">
                <Briefcase size={24} />
                Design Skills
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: 'UI/UX Design', level: 85 },
                  { name: 'Figma', level: 80 },
                  { name: 'Adobe XD', level: 75 },
                  { name: 'Photoshop', level: 70 },
                  { name: 'Responsive Design', level: 90 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-[#9ef01a] h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Soft Skills */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-400">
              <h3 className="text-2xl font-bold mb-6 text-[#9ef01a] flex items-center gap-3">
                <User size={24} />
                Soft Skills
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Problem Solving', level: 95 },
                  { name: 'Communication', level: 90 },
                  { name: 'Team Leadership', level: 85 },
                  { name: 'Project Management', level: 80 },
                  { name: 'Adaptability', level: 90 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-[#9ef01a] h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 bg-gradient-to-b from-black/95 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">Resume</h2>
          
          <div className="bg-white/5 p-10 rounded-xl backdrop-blur-sm mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Education */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[#9ef01a] mb-8 flex items-center gap-3 pb-3 border-b border-white/10">
                  <FileText size={24} />
                  Education
                </h3>
                
                <div className="space-y-10">
                  {[
                    {
                      degree: 'Bachelor of Information Technology',
                      institution: 'Eastern Medditenaian University',
                      year: '2021 - 2025',
                      description: 'Graduated with a 3.55 CGPA, specializing in web technologies and software engineering.'
                    },
                    {
                      degree: 'Harvard CS50 Certificate',
                      institution: 'Harvard University (Online)',
                      year: '2024',
                      description: 'Completed intensive computer science course covering algorithms, data structures, and web development.'
                    }
                  ].map((edu, index) => (
                    <div 
                      key={index} 
                      className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-[#9ef01a] before:rounded-full before:z-10"
                    >
                      <span className="text-[#9ef01a]/80 block mb-1 text-sm">{edu.year}</span>
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-white/60 mb-2 italic">{edu.institution}</p>
                      <p className="text-white/80">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Experience */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[#9ef01a] mb-8 flex items-center gap-3 pb-3 border-b border-white/10">
                  <Briefcase size={24} />
                  Experience
                </h3>
                
                <div className="space-y-10">
                  {[
                    {
                      position: 'SaaS Founder & CEO',
                      company: 'MyTechStartup',
                      year: '2022 - Present',
                      description: 'Founded and developed a SaaS platform serving over 5,000 users. Managed a team of 5 developers and secured seed funding.'
                    },
                    {
                      position: 'Senior Web Developer',
                      company: 'Digital Solutions Inc.',
                      year: '2020 - 2022',
                      description: 'Led frontend development for enterprise clients. Implemented modern React architectures and mentored junior developers.'
                    },
                    {
                      position: 'Web Developer',
                      company: 'Creative Agency',
                      year: '2021 - 2025',
                      description: 'Developed responsive websites for various clients using modern JavaScript frameworks and CSS preprocessors.'
                    }
                  ].map((exp, index) => (
                    <div 
                      key={index} 
                      className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-[#9ef01a] before:rounded-full before:z-10"
                    >
                      <span className="text-[#9ef01a]/80 block mb-1 text-sm">{exp.year}</span>
                      <h4 className="text-xl font-bold text-white mb-2">{exp.position}</h4>
                      <p className="text-white/60 mb-2 italic">{exp.company}</p>
                      <p className="text-white/80">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
            <button 
              onClick={() => window.open('/path-to-resume.pdf', '_blank')}
              className="flex items-center gap-2 bg-[#9ef01a] text-black px-8 py-3 rounded-md hover:bg-[#8ad00a] transition-colors font-medium group"
            >
              <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              Download Full Resume
            </button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 bg-black/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">Achievements</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Harvard CS50 Certificate */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors group animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
              <h3 className="text-2xl font-bold mb-4 text-[#9ef01a]">Harvard CS50 Certificate</h3>
              <p className="text-white/80 mb-6">Successfully completed Harvard's CS50 course, demonstrating proficiency in computer science fundamentals.</p>
              <button 
                onClick={() => window.open('/path-to-certificate.pdf', '_blank')}
                className="flex items-center gap-2 text-white hover:text-[#9ef01a] transition-colors group"
              >
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                Download Certificate
              </button>
            </div>

            {/* SaaS Founder */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors group animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
              <h3 className="text-2xl font-bold mb-4 text-[#9ef01a]">SaaS Founder Entrepreneur</h3>
              <p className="text-white/80 mb-6">Founded and developed innovative SaaS solutions, demonstrating entrepreneurial leadership.</p>
              <a 
                href="https://your-saas-website.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#9ef01a] transition-colors group"
              >
                <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                Visit Website
              </a>
            </div>

            {/* Websites Developer */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
              <h3 className="text-2xl font-bold mb-4 text-[#9ef01a]">Websites Developer</h3>
              <p className="text-white/80">
                Developed and deployed numerous professional websites, specializing in modern web technologies and user experience design.
              </p>
            </div>

            {/* Academic Excellence */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-400">
              <h3 className="text-2xl font-bold mb-4 text-[#9ef01a]">3.55 CGPA Academic Excellence</h3>
              <p className="text-white/80">
                Maintained outstanding academic performance throughout the program, demonstrating dedication and excellence in studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'SaaS Platform',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                description: 'A comprehensive SaaS solution for project management with real-time collaboration features.',
                technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
                link: 'https://example.com/project1'
              },
              {
                title: 'E-commerce Website',
                image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
                description: 'Fully responsive e-commerce platform with payment integration and inventory management.',
                technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
                link: 'https://example.com/project2'
              },
              {
                title: 'Portfolio Template',
                image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                description: 'Customizable portfolio template for creative professionals with animation effects.',
                technologies: ['React', 'GSAP', 'Styled Components'],
                link: 'https://example.com/project3'
              },
              {
                title: 'Task Management App',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
                description: 'Mobile-first task management application with drag-and-drop interface and notifications.',
                technologies: ['React Native', 'Firebase', 'Redux'],
                link: 'https://example.com/project4'
              },
              {
                title: 'AI Content Generator',
                image: 'https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=800&q=80',
                description: 'Web application that leverages AI to generate content for marketing and social media.',
                technologies: ['Vue.js', 'OpenAI API', 'Express'],
                link: 'https://example.com/project5'
              },
              {
                title: 'Real Estate Platform',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
                description: 'Property listing and management platform with virtual tours and appointment scheduling.',
                technologies: ['Angular', 'Node.js', 'MySQL', 'Google Maps API'],
                link: 'https://example.com/project6'
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-white/5 rounded-lg overflow-hidden group hover:bg-white/10 transition-all duration-300 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#9ef01a]">{project.title}</h3>
                  <p className="text-white/80 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs bg-white/10 text-white/90 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-[#9ef01a] transition-colors group"
                  >
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-black to-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
              <h3 className="text-2xl font-bold text-[#9ef01a] mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="text-[#9ef01a]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Email</h4>
                    <a href="mailto:contact@example.com" className="text-white/80 hover:text-[#9ef01a] transition-colors">
                      natearabcyp@jmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="text-[#9ef01a]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Phone</h4>
                    <a href="tel:+1234567890" className="text-white/80 hover:text-[#9ef01a] transition-colors">
                      +90 533 846 77 57
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="text-[#9ef01a]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Location</h4>
                    <p className="text-white/80">
                      Famagusta, Cyprus
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <h4 className="text-lg font-medium text-white mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 p-3 rounded-lg text-white hover:bg-[#9ef01a] hover:text-black transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 p-3 rounded-lg text-white hover:bg-[#9ef01a] hover:text-black transition-colors"
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 p-3 rounded-lg text-white hover:bg-[#9ef01a] hover:text-black transition-colors"
                  >
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
              <h3 className="text-2xl font-bold text-[#9ef01a] mb-6">Send Me a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                    placeholder="Subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-[#9ef01a] text-black px-6 py-3 rounded-md hover:bg-[#8ad00a] transition-colors font-medium group"
                >
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-[#9ef01a] font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-2">
                <a href="natearabcyp@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-[#9ef01a] transition-colors">
                  <Mail size={16} />
                  contact@example.com
                </a>
                <p className="text-white/60">Famagusta, Cyprus</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[#9ef01a] font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                {['Home', 'About Me', 'Skills', 'Resume', 'Achievements', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                    className="block text-white/80 hover:text-[#9ef01a] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-[#9ef01a] font-bold text-lg mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#9ef01a] transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#9ef01a] transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#9ef01a] transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <h3 className="text-[#9ef01a] font-bold text-lg mb-4">Legal</h3>
              <div className="space-y-2 text-white/60">
                <p>© 2024 Negin Arabzadeh</p>
                <p>All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add CSS for animations */}
      <style jsx="true">{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default App;