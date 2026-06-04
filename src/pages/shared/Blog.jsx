import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, Mail, Clock } from 'lucide-react';
import { MOCK_BLOGS } from '../../data/mockBlogs';

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ['All', 'Security', 'Industry News', 'Case Study', 'Design', 'Technology', 'Workplace'];

const Blog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filtering
  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'All') return MOCK_BLOGS;
    return MOCK_BLOGS.filter(blog => blog.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const gridPosts = filteredBlogs.slice(1);

  const totalPages = Math.ceil(gridPosts.length / ITEMS_PER_PAGE);
  const currentGridPosts = gridPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="blog-page">
      {/* Navigation Bar */}
      <nav className="blog-nav">
        <div className="nav-content">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', margin: 0, color: 'var(--bg-brand)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo_white.png" alt="InVisitor Logo" style={{ height: '30px', filter: 'invert(1)' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>InVisitor Blog</span>
          </div>
          <button onClick={() => navigate('/')} className="btn-back">Back to Home</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="blog-hero">
        <div className="hero-pattern"></div>
        <motion.div className="hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1>News & Insights</h1>
          <p>Discover the latest trends in workplace security, visitor management, and enterprise technology shaping the future of work.</p>
        </motion.div>
      </header>

      <main className="blog-main">
        {/* Category Filters */}
        <div className="category-filters">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && currentPage === 1 && (
          <motion.div 
            className="featured-post"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate(`/blog/${featuredPost.id}`)}
          >
            <div className="featured-image-wrapper">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className="featured-category">{featuredPost.category}</span>
            </div>
            <div className="featured-content">
              <div className="featured-meta">
                <span><Calendar size={14} /> {featuredPost.date}</span>
                <span><Clock size={14} /> {featuredPost.readTime}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              
              <div className="featured-footer">
                <div className="author-info">
                  <img src={featuredPost.authorAvatar} alt={featuredPost.author} className="author-avatar" />
                  <div className="author-details">
                    <span className="author-name">{featuredPost.author}</span>
                    <span className="author-role">{featuredPost.authorRole}</span>
                  </div>
                </div>
                <button className="read-more-btn">Read Article <ArrowRight size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="blog-grid">
          {currentGridPosts.map((blog, index) => (
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
                <div className="glass-category">
                  <span>{blog.category}</span>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date"><Calendar size={14} /> {blog.date}</span>
                  <span className="blog-read-time"><Clock size={14} /> {blog.readTime}</span>
                </div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <div className="blog-card-footer">
                   <div className="small-author">
                      <img src={blog.authorAvatar} alt={blog.author} />
                      <span>{blog.author}</span>
                   </div>
                  <button className="blog-read-more">Read <ArrowRight size={16} /></button>
                </div>
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

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-icon"><Mail size={32} /></div>
          <h2>Subscribe to our Newsletter</h2>
          <p>Get the latest insights on workplace security and visitor management delivered straight to your inbox every month.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your work email" required />
            <button type="submit">Subscribe</button>
          </form>
          <span className="newsletter-disclaimer">We care about your data in our <a href="#">privacy policy</a>.</span>
        </div>
      </section>

      <style jsx>{`
        .blog-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .blog-nav {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-bottom: 1px solid var(--border-default);
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
          color: var(--text-secondary);
          font-weight: 700;
          cursor: pointer;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .btn-back:hover {
          color: var(--bg-brand);
        }
        .blog-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          padding: 6rem 2rem 8rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.5;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }
        .blog-hero h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .blog-hero p {
          font-size: 1.25rem;
          color: #cbd5e1;
          line-height: 1.6;
        }
        .blog-main {
          max-width: 1200px;
          margin: -4rem auto 4rem;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
        }
        .category-filters {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scrollbar-width: none;
        }
        .category-filters::-webkit-scrollbar {
          display: none;
        }
        .cat-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .cat-btn.active, .cat-btn:hover {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: white;
        }
        
        /* Featured Post */
        .featured-post {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          margin-bottom: 4rem;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid var(--border-default);
        }
        .featured-post:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.12);
        }
        .featured-image-wrapper {
          position: relative;
          height: 100%;
          min-height: 400px;
        }
        .featured-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .featured-category {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: var(--bg-brand);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .featured-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .featured-meta {
          display: flex;
          gap: 1.5rem;
          color: var(--text-tertiary);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .featured-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .featured-content h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .featured-content p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .featured-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border-default);
        }
        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }
        .author-details {
          display: flex;
          flex-direction: column;
        }
        .author-name {
          font-weight: 800;
          color: var(--text-primary);
        }
        .author-role {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }
        .read-more-btn {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-weight: 800;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-bottom: 4rem;
        }
        .blog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-default);
        }
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(0, 163, 255, 0.3);
        }
        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }
        .blog-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .glass-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .blog-meta span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .blog-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }
        .blog-excerpt {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex: 1;
        }
        .blog-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-default);
        }
        .small-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .small-author img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .small-author span {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .blog-read-more {
          background: none;
          border: none;
          padding: 0;
          color: var(--accent-primary);
          font-weight: 800;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        .page-btn {
          background: white;
          border: 1px solid var(--border-default);
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .page-btn:hover:not(:disabled) {
          background: var(--bg-subtle);
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
          border: 1px solid transparent;
          background: white;
          color: var(--text-secondary);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .page-num:hover {
          border-color: var(--border-default);
        }
        .page-num.active {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 163, 255, 0.3);
        }

        /* Newsletter */
        .newsletter-section {
          background: white;
          padding: 6rem 2rem;
          border-top: 1px solid var(--border-default);
        }
        .newsletter-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          background: var(--bg-surface);
          padding: 4rem;
          border-radius: 32px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          border: 1px solid var(--border-default);
        }
        .newsletter-icon {
          width: 64px;
          height: 64px;
          background: rgba(0, 163, 255, 0.1);
          color: var(--accent-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .newsletter-container h2 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .newsletter-container p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .newsletter-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .newsletter-form input {
          flex: 1;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border-default);
          font-size: 1rem;
          background: #f8fafc;
        }
        .newsletter-form input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(0, 163, 255, 0.1);
        }
        .newsletter-form button {
          padding: 1rem 2rem;
          border-radius: 12px;
          background: var(--bg-brand);
          color: white;
          border: none;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .newsletter-form button:hover {
          background: var(--bg-brand-hover);
        }
        .newsletter-disclaimer {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .newsletter-disclaimer a {
          color: var(--accent-primary);
          text-decoration: none;
        }

        @media (max-width: 992px) {
          .featured-post {
            grid-template-columns: 1fr;
          }
          .featured-image-wrapper {
            min-height: 300px;
          }
        }

        @media (max-width: 768px) {
          .blog-hero h1 { font-size: 2.5rem; }
          .cat-btn { padding: 0.5rem 1rem; font-size: 0.85rem; }
          .category-filters { padding-bottom: 0.5rem; }
          .blog-grid { grid-template-columns: 1fr; }
          .featured-content { padding: 2rem; }
          .featured-content h2 { font-size: 1.75rem; }
          .newsletter-container { padding: 2rem; }
          .newsletter-form { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Blog;
