import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';

const MOCK_BLOGS = {
  1: { id: 1, title: 'The Future of Workplace Security in 2026', category: 'Security', date: 'May 12, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', author: 'Sarah Jenkins', authorRole: 'Head of Security Product', content: '<p>The workplace has fundamentally changed over the past five years. What used to be a standard 9-to-5 operation is now a fluid environment where employees, contractors, and visitors intermingle at all hours. This presents unique security challenges that legacy access control systems simply cannot handle.</p><h2>The Rise of Biometrics</h2><p>We are seeing a massive shift towards biometric authentication. Not only does this reduce the friction of forgotten badges, but it drastically improves security posture by ensuring the person entering is exactly who they claim to be. Integrating this with modern VMS (Visitor Management Systems) means a seamless experience from the lobby to the boardroom.</p><h2>Predictive Analytics in Security</h2><p>It is no longer enough to just log who came in. Building managers now expect predictive insights. By analyzing visitor trends, AI can predict peak lobby hours and automatically alert front desk staff or scale up temporary security personnel.</p><p>As we move further into 2026, the lines between physical security and digital identity will continue to blur, creating safer and more efficient workplaces for everyone.</p>' },
  // Adding a fallback for all other IDs to simplify mock
  default: { id: 0, title: 'Understanding Modern Visitor Dynamics', category: 'Industry News', date: 'May 08, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1200', author: 'Michael Chang', authorRole: 'VP of Operations', content: '<p>Every day, thousands of visitors pass through corporate lobbies. How we manage them defines not only the security of our buildings but also our brand identity.</p><p>In this article, we explore how touchless check-ins, dynamic QR codes, and instant host notifications are revolutionizing the guest experience.</p><h2>Why First Impressions Matter</h2><p>A visitor’s experience begins the moment they step into your lobby. Long queues and paper logbooks immediately signal outdated technology. By digitizing the process, you show guests that you value their time and their privacy.</p>' }
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = MOCK_BLOGS[id] || MOCK_BLOGS.default;

  return (
    <div className="post-page">
      {/* Navigation Bar */}
      <nav className="blog-nav">
        <div className="nav-content">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', margin: 0, color: 'var(--bg-brand)' }}>
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="25" r="15" fill="var(--bg-brand)" />
              <path d="M20 55C20 49.4772 24.4772 45 30 45H70C75.5228 45 80 49.4772 80 55V60H20V55Z" fill="var(--bg-brand)" />
              <path d="M20 65H80V75C80 80.5228 75.5228 85 70 85H30C24.4772 85 20 80.5228 20 75V65Z" fill="var(--bg-brand)" />
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>InVisitor</span>
          </div>
          <button onClick={() => navigate('/blog')} className="btn-back"><ArrowLeft size={16} /> Back to Blog</button>
        </div>
      </nav>

      <main className="post-main">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="post-article"
        >
          <header className="post-header">
            <span className="post-category">{post.category}</span>
            <h1 className="post-title">{post.title}</h1>
            
            <div className="post-meta">
              <div className="author-info">
                <div className="author-avatar">{post.author.charAt(0)}</div>
                <div>
                  <div className="author-name">{post.author}</div>
                  <div className="author-role">{post.authorRole}</div>
                </div>
              </div>
              <div className="post-stats">
                <span><Calendar size={16} /> {post.date}</span>
                <span><Clock size={16} /> {post.readTime}</span>
              </div>
            </div>
          </header>

          <figure className="post-figure">
            <img src={post.image} alt={post.title} className="post-hero-image" />
          </figure>

          <div className="post-content-wrapper">
            <div className="post-actions">
              <button className="action-btn" title="Share"><Share2 size={20} /></button>
              <button className="action-btn" title="Save"><Bookmark size={20} /></button>
            </div>
            <div 
              className="post-body" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </motion.article>
      </main>

      <style jsx>{`
        .post-page {
          min-height: 100vh;
          background: var(--bg-surface);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .blog-nav {
          background: var(--bg-surface);
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
          color: var(--text-tertiary);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-back:hover {
          color: var(--bg-brand);
        }
        .post-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }
        .post-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .post-category {
          color: var(--accent-primary);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .post-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--bg-brand);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 2.5rem;
        }
        .post-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border-default);
          text-align: left;
        }
        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .author-avatar {
          width: 48px;
          height: 48px;
          background: var(--bg-brand);
          color: var(--text-inverse);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .author-name {
          font-weight: 700;
          color: var(--text-primary);
        }
        .author-role {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .post-stats {
          display: flex;
          gap: 1.5rem;
          color: var(--text-tertiary);
          font-weight: 500;
          font-size: 0.9rem;
        }
        .post-stats span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .post-figure {
          margin: 0 0 4rem 0;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .post-hero-image {
          width: 100%;
          height: auto;
          display: block;
          max-height: 600px;
          object-fit: cover;
        }
        .post-content-wrapper {
          display: flex;
          gap: 4rem;
        }
        .post-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: sticky;
          top: 100px;
          height: fit-content;
        }
        .action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-default);
          background: var(--bg-surface);
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .action-btn:hover {
          color: var(--bg-brand);
          border-color: var(--bg-brand);
        }
        .post-body {
          flex: 1;
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-primary);
        }
        .post-body :global(p) {
          margin-bottom: 1.5rem;
        }
        .post-body :global(h2) {
          font-size: 2rem;
          font-weight: 800;
          color: var(--bg-brand);
          margin: 3rem 0 1.5rem;
          letter-spacing: -0.02em;
        }
        @media (max-width: 768px) {
          .post-title { font-size: 2.5rem; }
          .post-meta { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .post-content-wrapper { flex-direction: column; gap: 2rem; }
          .post-actions { flex-direction: row; position: static; }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
