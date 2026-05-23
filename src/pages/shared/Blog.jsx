import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

const MOCK_BLOGS = [
  { id: 1, title: 'The Future of Workplace Security in 2026', category: 'Security', date: 'May 12, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', excerpt: 'Discover how AI and biometric integrations are shaping the way modern enterprises secure their facilities and manage visitors.' },
  { id: 2, title: 'Top 5 Visitor Management Trends', category: 'Industry News', date: 'May 08, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800', excerpt: 'From touchless check-ins to dynamic access control, see what trends are dominating the workspace management sector this year.' },
  { id: 3, title: 'How InVisitor Saves Front Desk Time', category: 'Case Study', date: 'May 01, 2026', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', excerpt: 'Learn how Acme Corp reduced their guest processing time by 80% using our streamlined pre-registration workflows.' },
  { id: 4, title: 'Creating a Welcoming Lobby Experience', category: 'Design', date: 'Apr 25, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800', excerpt: 'The lobby is your company’s first impression. Here are actionable tips to make it welcoming yet secure.' },
  { id: 5, title: 'Integrating Access Control Systems', category: 'Technology', date: 'Apr 18, 2026', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800', excerpt: 'A technical deep-dive into connecting cloud-based VMS solutions with legacy on-premise turnstiles and doors.' },
  { id: 6, title: 'The Rise of Hybrid Work and Visitor Tracking', category: 'Workplace', date: 'Apr 10, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800', excerpt: 'With employees splitting time between home and office, keeping track of who is actually in the building has never been more important.' },
  { id: 7, title: 'Understanding Data Privacy in Visitor Logs', category: 'Compliance', date: 'Apr 02, 2026', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800', excerpt: 'Are your visitor log books violating GDPR or CCPA? What you need to know about digital visitor privacy.' },
];

const ITEMS_PER_PAGE = 6;

const Blog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(MOCK_BLOGS.length / ITEMS_PER_PAGE);
  const currentBlogs = MOCK_BLOGS.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="blog-page">
      {/* Navigation Bar */}
      <nav className="blog-nav">
        <div className="nav-content">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', margin: 0, color: '#0d2331' }}>
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="25" r="15" fill="#0d2331" />
              <path d="M20 55C20 49.4772 24.4772 45 30 45H70C75.5228 45 80 49.4772 80 55V60H20V55Z" fill="#0d2331" />
              <path d="M20 65H80V75C80 80.5228 75.5228 85 70 85H30C24.4772 85 20 80.5228 20 75V65Z" fill="#0d2331" />
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>InVisitor</span>
          </div>
          <button onClick={() => navigate('/')} className="btn-back">Back to Home</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="blog-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1>News & Insights</h1>
          <p>Discover the latest trends in workplace security, visitor management, and enterprise technology.</p>
        </motion.div>
      </header>

      {/* Blog Grid */}
      <main className="blog-main">
        <div className="blog-grid">
          {currentBlogs.map((blog, index) => (
            <motion.div 
              key={blog.id} 
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <div className="blog-image-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <span className="blog-category">{blog.category}</span>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date"><Calendar size={14} /> {blog.date}</span>
                  <span className="blog-read-time">{blog.readTime}</span>
                </div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <button className="blog-read-more">Read Article <ArrowRight size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft size={18} /> Prev
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button 
                  key={num} 
                  className={`page-num ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ArrowRight size={18} />
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        .blog-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .blog-nav {
          background: white;
          padding: 1rem 2rem;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-back {
          background: none;
          border: none;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .btn-back:hover {
          color: #0d2331;
        }
        .blog-hero {
          background: linear-gradient(135deg, #0d2331 0%, #1a3c52 100%);
          color: white;
          padding: 6rem 2rem;
          text-align: center;
        }
        .blog-hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .blog-hero p {
          font-size: 1.25rem;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .blog-main {
          max-width: 1200px;
          margin: -4rem auto 4rem;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .blog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }
        .blog-card:hover .blog-read-more {
          color: #00a3ff;
          gap: 0.75rem;
        }
        .blog-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .blog-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(255, 255, 255, 0.9);
          color: #0d2331;
          padding: 0.4rem 1rem;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          backdrop-filter: blur(4px);
        }
        .blog-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .blog-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .blog-date {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .blog-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0d2331;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .blog-excerpt {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .blog-read-more {
          background: none;
          border: none;
          padding: 0;
          color: #0d2331;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: auto;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        .page-btn {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #0d2331;
          cursor: pointer;
          transition: all 0.2s;
        }
        .page-btn:hover:not(:disabled) {
          background: #f1f5f9;
        }
        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .page-numbers {
          display: flex;
          gap: 0.5rem;
        }
        .page-num {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .page-num:hover {
          background: #e2e8f0;
        }
        .page-num.active {
          background: #00a3ff;
          color: white;
        }
        @media (max-width: 768px) {
          .blog-hero h1 { font-size: 2.5rem; }
          .blog-grid { grid-template-columns: 1fr; }
          .blog-main { margin-top: -2rem; padding: 0 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Blog;
