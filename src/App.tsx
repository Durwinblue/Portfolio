import { Menu, X, Download, ExternalLink, Mail, Linkedin, Github, Twitter, Phone, MapPin, Calendar, User, Briefcase, FileText, Send, Brain, Settings, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Test Supabase connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
        } else {
          console.log('Supabase connection successful');
        }
      } catch (error) {
        console.error('Supabase connection test failed:', error);
      }
    };

    testConnection();
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    // Log the data being sent
    console.log('Submitting form data:', formData);

    try {
      // Validate data before sending
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('All fields are required');
      }

      const { data, error } = await supabase
        .from('messages')
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        }])
        .select();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Success response:', data);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus('error');
      console.error('Detailed error:', error);
    }
  };

  const educationEntries = [
    {
      degree: 'Bachelor of Information Technology',
      institution: 'Eastern Mediterranean University',
      year: '2021 – 2025',
      highlights: [
        'Graduating with a 3.2 CGPA, specializing in web technologies and software engineering.'
      ]
    },
    {
      degree: 'Harvard CS50 Certificate',
      institution: 'Harvard University (Online)',
      year: '2024',
      highlights: [
        'Completed an intensive computer science course covering algorithms, data structures, and web development.'
      ]
    },
    {
      degree: 'Python Course Certificate',
      institution: 'Kaggle (Online)',
      year: '2024',
      highlights: [
        'Completed Kaggle’s Python programming course with hands-on experience in Python syntax, data structures, and analysis workflows for data science and automation.'
      ]
    }
  ];

  const experienceEntries = [
    {
      position: 'Freelance Web Developer / Student Projects',
      company: 'Self-Initiated',
      year: '2023 – Present',
      highlights: [
        'Designed and developed academic and personal web projects showcasing modern front-end and back-end development.',
        'Worked with technologies like HTML, CSS, JavaScript, React, and Node.js to build responsive and interactive applications.',
        'Focused on improving user experience, clean UI design, and performance optimization.'
      ]
    },
    {
      position: 'Web Development Intern (Remote / Academic)',
      company: 'University / Self-Learning Projects',
      year: '2022 – 2023',
      highlights: [
        'Assisted in building and maintaining web interfaces for class assignments and mock client projects.',
        'Practiced version control using Git and GitHub for collaborative development.',
        'Gained hands-on experience deploying simple web apps using free hosting services like Vercel and Netlify.'
      ]
    },
    {
      position: 'Tech Enthusiast & Learner',
      company: 'Personal Growth Journey',
      year: '2021 – 2022',
      highlights: [
        'Explored programming fundamentals, databases, and software engineering concepts through coursework and self-learning.',
        'Completed online tutorials and challenges to strengthen problem-solving and algorithmic thinking skills.',
        'Developed a strong passion for continuous learning in web development and technology innovation.'
      ]
    }
  ];

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
                src="https://d2ylp2v14p0sub.cloudfront.net/openai-user/base_images/4efef6d4-feb7-41bd-939b-4209df539586/5387d44c-4a8e-4d13-9449-4d3c0a61c19a.png"
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
                <span className="text-white/80">24 Years Old</span>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <MapPin className="text-[#9ef01a]" size={20} />
                <span className="text-white/80">Famagusta, Cyprus</span>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <Briefcase className="text-[#9ef01a]" size={20} />
                <span className="text-white/80">Web Developer & IT Student</span>
              </div>

              <p className="text-white/80 leading-relaxed mt-6">
                I’m an Information Technology student with a strong interest in web development and artificial intelligence.
                My journey in tech started with a curiosity about how websites and digital systems work, which grew into a
                passion for creating interactive and functional web applications.
              </p>

              <p className="text-white/80 leading-relaxed">
                Through my academic projects and self-learning, I’ve gained experience in front-end and back-end development,
                working with technologies like HTML, CSS, JavaScript, and React. At the same time, I’ve been exploring Python
                and AI fundamentals, aiming to build a solid foundation for advanced studies in machine learning and data science.
              </p>

              <p className="text-white/80 leading-relaxed">
                My goal is to continue my studies in Artificial Intelligence, focusing on how intelligent systems can improve
                human experiences and decision-making. I’m deeply motivated by innovation, problem-solving, and the endless
                possibilities that AI brings to the future of technology.
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
                <Settings size={24} />
                <span>⚙️ Technical Skills</span>
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 text-xs uppercase tracking-[0.2em] text-white/50 pb-2 border-b border-white/10">
                  <span>Skill</span>
                  <span className="text-right">Level</span>
                </div>
                {[
                  { name: 'Python', level: '90%' },
                  { name: 'JavaScript', level: '85%' },
                  { name: 'HTML/CSS', level: '85%' },
                  { name: 'React.js', level: '80%' },
                  { name: 'SQL & Databases', level: '75%' },
                  { name: 'Git & GitHub', level: '80%' },
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="grid grid-cols-2 items-center py-2 border-b border-white/5 last:border-b-0"
                  >
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-white/70 text-right">{skill.level}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60 mt-4">(Focus: solid web foundations + core Python &amp; data skills)</p>
            </div>

            {/* AI & Data Skills */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
              <h3 className="text-2xl font-bold mb-6 text-[#9ef01a] flex items-center gap-3">
                <Brain size={24} />
                <span>🤖 AI &amp; Data Skills</span>
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 text-xs uppercase tracking-[0.2em] text-white/50 pb-2 border-b border-white/10">
                  <span>Skill</span>
                  <span className="text-right">Level</span>
                </div>
                {[
                  { name: 'Machine Learning (basics)', level: '80%' },
                  { name: 'Data Analysis (Pandas, NumPy)', level: '85%' },
                  { name: 'Data Visualization (Matplotlib, Seaborn)', level: '80%' },
                  { name: 'Jupyter Notebooks', level: '90%' },
                  { name: 'TensorFlow / PyTorch (beginner)', level: '60%' },
                  { name: 'Kaggle / Colab', level: '85%' },
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="grid grid-cols-2 items-center py-2 border-b border-white/5 last:border-b-0"
                  >
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-white/70 text-right">{skill.level}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60 mt-4">(Focus: shows growing strength in Python for AI and familiar tools for learning &amp; experimentation)</p>
            </div>

            {/* Soft Skills */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-400">
              <h3 className="text-2xl font-bold mb-6 text-[#9ef01a] flex items-center gap-3">
                <Sparkles size={24} />
                <span>💡 Soft Skills</span>
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 text-xs uppercase tracking-[0.2em] text-white/50 pb-2 border-b border-white/10">
                  <span>Skill</span>
                  <span className="text-right">Level</span>
                </div>
                {[
                  { name: 'Problem Solving', level: '95%' },
                  { name: 'Curiosity & Research', level: '90%' },
                  { name: 'Communication', level: '85%' },
                  { name: 'Time Management', level: '85%' },
                  { name: 'Adaptability', level: '90%' },
                  { name: 'Collaboration', level: '80%' },
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="grid grid-cols-2 items-center py-2 border-b border-white/5 last:border-b-0"
                  >
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-white/70 text-right">{skill.level}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60 mt-4">(Focus: personal traits that matter in both research and team-based tech work)</p>
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
                  {educationEntries.map((edu, index) => (
                    <div
                      key={index}
                      className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-[#9ef01a] before:rounded-full before:z-10"
                    >
                      <span className="text-[#9ef01a]/80 block mb-1 text-sm">{edu.year}</span>
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-white/60 mb-2 italic">{edu.institution}</p>
                      {edu.highlights && (
                        <ul className="space-y-2 text-white/80 list-disc list-outside pl-4">
                          {edu.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex}>{highlight}</li>
                          ))}
                        </ul>
                      )}
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
                  {experienceEntries.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-[#9ef01a] before:rounded-full before:z-10"
                    >
                      <span className="text-[#9ef01a]/80 block mb-1 text-sm">{exp.year}</span>
                      <h4 className="text-xl font-bold text-white mb-2">{exp.position}</h4>
                      <p className="text-white/60 mb-2 italic">{exp.company}</p>
                      {exp.highlights && (
                        <ul className="space-y-2 text-white/80 list-disc list-outside pl-4">
                          {exp.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex}>{highlight}</li>
                          ))}
                        </ul>
                      )}
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
              <a
                href="https://certificates.cs50.io/a85c3e19-45ee-46e8-8e81-0ed0f6a90d8e.pdf?size=letter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#9ef01a] transition-colors group"
              >
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                Download Certificate
              </a>
            </div>

            {/* Tech Enthusiast & Innovator */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors group animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
              <h3 className="text-2xl font-bold mb-4 text-[#9ef01a]">Tech Enthusiast & Innovator</h3>
              <p className="text-white/80 mb-6">
                Passionate about exploring innovative technologies, experimenting with new frameworks, and building creative solutions to real-world problems.
              </p>
              <a
                href="https://github.com/Durwinblue/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#9ef01a] transition-colors group"
              >
                <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                Explore Projects
              </a>
            </div>

            {/* Kaggle Python Course */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
              <h3 className="text-2xl font-bold mb-4 text-[#9ef01a]">Kaggle (Online) — 2024</h3>
              <p className="text-white/80 mb-6">
                Successfully completed Kaggle’s Python Course, gaining practical skills in programming fundamentals, data manipulation, and problem-solving through real-world coding exercises.
              </p>
              <a
                href="https://www.kaggle.com/certification/badges/neginarabzade/30"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#9ef01a] transition-colors group"
              >
                <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                View Certificate
              </a>
            </div>

            {/* Academic Excellence */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-400">
              <h3 className="text-2xl font-bold mb-4 text-[#9ef01a]">3.2 CGPA Academic Excellence</h3>
              <p className="text-white/80">
                Graduated with high honors while maintaining outstanding academic performance and demonstrating dedication to excellence in studies.
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
                title: 'MediWise Scheduler',
                image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
                description: 'Smart appointment scheduling for healthcare teams with automated reminders and role-based dashboards.',
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
                link: 'https://mediwise-scheduler.vercel.app/'
              },
              {
                title: 'Emoji Mood Maker',
                image: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=1600&q=80',
                description: 'Playful emoji-powered mood board that generates animated gradients based on your current vibe.',
                technologies: ['Vercel v0', 'React', 'Framer Motion'],
                link: 'https://v0-emoji-mood-maker.vercel.app/'
              },
              {
                title: 'Verto Car Rental Platform',
                image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1600&q=80',
                description: 'Graduation capstone project delivering booking flows, fleet management, and customer dashboards for a local rental brand.',
                technologies: ['PHP', 'MySQL', 'SCSS', 'jQuery'],
                link: '/downloads/verto-project.zip',
                download: 'verto-project.zip'
              },
              {
                title: 'Flavoro Online Restaurant',
                image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80',
                description: 'University team build showcasing a digital dining experience with interactive menu browsing and checkout.',
                technologies: ['PHP', 'MySQL', 'Alpine.js', 'Sass'],
                link: '/downloads/flavoro-restaurant-project.zip',
                download: 'flavoro-restaurant-project.zip'
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
                    target={project.download ? undefined : '_blank'}
                    rel={project.download ? undefined : 'noopener noreferrer'}
                    download={project.download}
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#9ef01a]"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="flex items-center gap-2 bg-[#9ef01a] text-black px-6 py-3 rounded-md hover:bg-[#8ad00a] transition-colors font-medium group disabled:opacity-50"
                >
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus === 'success' && (
                  <p className="text-green-500">Message sent successfully!</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-500">Failed to send message. Please try again.</p>
                )}
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
                  natearabcyp@gmail.com
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
      <style>{`
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