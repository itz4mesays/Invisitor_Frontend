import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Clock, Share2, Bookmark, Link, Copy } from 'lucide-react';
import { MOCK_BLOGS } from '../../data/mockBlogs';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const post = MOCK_BLOGS.find(p => p.id === parseInt(id)) || MOCK_BLOGS[0];

  // Get related posts (exclude current post, match category if possible, limit to 3)
  const relatedPosts = MOCK_BLOGS
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);
    
  // If not enough related posts by category, just grab some other ones
  if (relatedPosts.length < 3) {
    const filler = MOCK_BLOGS.filter(p => p.id !== post.id && p.category !== post.category);
    relatedPosts.push(...filler.slice(0, 3 - relatedPosts.length));
  }

  return (
    <div className="post-page">
      {/* Navigation Bar */}
      <nav className="blog-nav">
        <div className="nav-content">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', margin: 0, color: 'var(--bg-brand)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo_white.png" alt="InVisitor Logo" style={{ height: '30px', filter: 'invert(1)' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>InVisitor</span>
          </div>
          <button onClick={() => navigate('/blog')} className="btn-back"><ArrowLeft size={16} /> Back to Blog</button>
        </div>
      </nav>

      <main className="post-main">
        <article className="post-article">
          <header className="post-header">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="post-category">{post.category}</span>
              <h1 className="post-title">{post.title}</h1>
              
              <div className="post-meta">
                <div className="author-info">
                  <img src={post.authorAvatar} alt={post.author} className="author-avatar" />
                  <div>
                    <div className="author-name">{post.author}</div>
                    <div className="author-role">{post.authorRole}</div>
                  </div>
                </div>
                <div className="post-stats">
                  <span><Calendar size={16} /> {post.date}</span>
                  <span className="dot-separator">•</span>
                  <span><Clock size={16} /> {post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </header>

          <motion.figure 
            className="post-figure"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={post.image} alt={post.title} className="post-hero-image" />
          </motion.figure>

          <div className="post-content-wrapper">
            {/* Sticky Sidebar */}
            <aside className="post-sidebar">
              <div className="sticky-actions">
                <span className="share-text">Share</span>
                <button className="action-btn" title="Share Article"><Share2 size={18} /></button>
                <button className="action-btn" title="Copy Link"><Copy size={18} /></button>
                <div className="divider"></div>
                <button className="action-btn bookmark" title="Save for later"><Bookmark size={18} /></button>
              </div>
            </aside>

            {/* Main Content */}
            <motion.div 
              className="post-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              
              {/* Post Tags (Mock) */}
              <div className="post-tags">
                <span className="tag">#WorkplaceSecurity</span>
                <span className="tag">#FutureOfWork</span>
                <span className="tag">#{post.category.replace(/\s+/g, '')}</span>
              </div>

              {/* Author Bio Card */}
              <div className="author-bio-card">
                <img src={post.authorAvatar} alt={post.author} className="bio-avatar" />
                <div className="bio-content">
                  <span className="written-by">Written by</span>
                  <h4>{post.author}</h4>
                  <p>{post.author} is the {post.authorRole} at InVisitor, specializing in creating seamless and secure environments for modern enterprises. With over 10 years of experience in the physical security space, they regularly share insights on the intersection of technology and hospitality.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      {/* Related Posts Section */}
      <section className="related-posts-section">
        <div className="related-container">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {relatedPosts.map((relatedPost, index) => (
              <div 
                key={relatedPost.id} 
                className="related-card"
                onClick={() => navigate(`/blog/${relatedPost.id}`)}
              >
                <div className="related-image-wrapper">
                  <img src={relatedPost.image} alt={relatedPost.title} />
                </div>
                <div className="related-content">
                  <span className="related-category">{relatedPost.category}</span>
                  <h3>{relatedPost.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .post-page {
          min-height: 100vh;
          background: #ffffff;
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-back:hover {
          color: var(--bg-brand);
        }
        .post-main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 2rem 0;
        }
        .post-header {
          text-align: center;
          margin-bottom: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .post-category {
          color: var(--accent-primary);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          display: inline-block;
          background: rgba(0, 163, 255, 0.1);
          padding: 0.4rem 1rem;
          border-radius: 30px;
        }
        .post-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 2.5rem;
        }
        .post-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          text-align: left;
        }
        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .author-name {
          font-weight: 800;
          color: var(--text-primary);
          font-size: 1.05rem;
        }
        .author-role {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }
        .post-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.95rem;
        }
        .post-stats span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .dot-separator {
          color: var(--border-heavy);
          font-size: 1.2rem;
        }
        .post-figure {
          margin: 0 0 4rem 0;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border: 1px solid var(--border-default);
        }
        .post-hero-image {
          width: 100%;
          height: auto;
          display: block;
          max-height: 600px;
          object-fit: cover;
        }
        
        /* Post Content Area */
        .post-content-wrapper {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 3rem;
          max-width: 850px;
          margin: 0 auto;
        }
        .post-sidebar {
          position: relative;
        }
        .sticky-actions {
          position: sticky;
          top: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .share-text {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .divider {
          height: 1px;
          width: 30px;
          background: var(--border-heavy);
          margin: 0.5rem 0;
        }
        .action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-default);
          background: white;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .action-btn.twitter:hover { color: #1DA1F2; border-color: #1DA1F2; }
        .action-btn.linkedin:hover { color: #0077b5; border-color: #0077b5; }
        .action-btn.facebook:hover { color: #1877f2; border-color: #1877f2; }
        .action-btn.bookmark:hover { color: var(--accent-primary); border-color: var(--accent-primary); }

        .post-body {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-primary);
        }
        .post-body :global(p) {
          margin-bottom: 1.75rem;
          color: #334155;
        }
        .post-body :global(h2) {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 3.5rem 0 1.5rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .post-body :global(h3) {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 2.5rem 0 1.25rem;
          letter-spacing: -0.01em;
        }
        .post-body :global(ul), .post-body :global(ol) {
          margin-bottom: 2rem;
          padding-left: 2rem;
          color: #334155;
        }
        .post-body :global(li) {
          margin-bottom: 0.75rem;
        }
        .post-body :global(blockquote) {
          border-left: 4px solid var(--accent-primary);
          padding-left: 1.5rem;
          margin: 2.5rem 0;
          font-size: 1.35rem;
          font-style: italic;
          color: #1e293b;
          font-weight: 500;
          line-height: 1.6;
          background: rgba(0, 163, 255, 0.03);
          padding: 1.5rem;
          border-radius: 0 12px 12px 0;
        }

        /* Tags */
        .post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-default);
        }
        .tag {
          background: #f1f5f9;
          color: #475569;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tag:hover {
          background: #e2e8f0;
        }

        /* Author Bio */
        .author-bio-card {
          display: flex;
          gap: 2rem;
          background: #f8fafc;
          padding: 2.5rem;
          border-radius: 20px;
          margin-top: 3rem;
          border: 1px solid var(--border-default);
        }
        .bio-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }
        .written-by {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-tertiary);
          font-weight: 800;
          display: block;
          margin-bottom: 0.25rem;
        }
        .bio-content h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }
        .bio-content p {
          font-size: 0.95rem !important;
          color: var(--text-secondary) !important;
          margin-bottom: 0 !important;
          line-height: 1.6 !important;
        }

        /* Related Posts */
        .related-posts-section {
          background: #f8fafc;
          padding: 6rem 2rem;
          margin-top: 4rem;
          border-top: 1px solid var(--border-default);
        }
        .related-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .related-container h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 2.5rem;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .related-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          border: 1px solid var(--border-default);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.08);
        }
        .related-image-wrapper {
          height: 180px;
          overflow: hidden;
        }
        .related-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .related-card:hover img {
          transform: scale(1.05);
        }
        .related-content {
          padding: 1.5rem;
        }
        .related-category {
          color: var(--accent-primary);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }
        .related-content h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
        }

        @media (max-width: 992px) {
          .post-content-wrapper {
            grid-template-columns: 1fr;
          }
          .post-sidebar {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .post-title { font-size: 2.5rem; }
          .post-meta { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .author-bio-card { flex-direction: column; gap: 1.5rem; }
          .bio-avatar { width: 60px; height: 60px; }
          .related-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
