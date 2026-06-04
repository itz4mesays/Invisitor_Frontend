import React, { useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Send,
  Upload,
  X,
  FileText,
  Image,
  Download,
  Ticket,
  Calendar,
  Tag,
  User,
  MessageSquare,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   Shared mock ticket data
────────────────────────────────────────────── */
const TICKET_DB = {
  'TK-001': {
    id: 'TK-001',
    subject: 'Unable to login to dashboard',
    category: 'Account Access',
    date: '2026-04-01',
    status: 'Open',
    createdBy: 'David Fayemi',
    description:
      'I keep getting a 403 error when trying to log in. The issue started after I changed my password last week. I have tried resetting it again but the same error persists. Please assist.',
    attachments: [
      { name: 'screenshot_error.png', type: 'image', url: 'https://placehold.co/800x400/f1f5f9/94a3b8?text=Error+Screenshot' },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Support Team',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support',
        date: '2026-04-02',
        text: 'Hi David, we have received your ticket. Our team is looking into this. Can you confirm which browser you are using?',
        likes: 3,
        dislikes: 0,
        userReaction: null,
        attachments: [],
      },
      {
        id: 'c2',
        author: 'David Fayemi',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        date: '2026-04-02',
        text: 'I am using Chrome version 123. I also tried on Firefox with the same result.',
        likes: 1,
        dislikes: 0,
        userReaction: null,
        attachments: [
          { name: 'console_log.txt', type: 'file' },
        ],
      },
    ],
  },
  'TK-002': {
    id: 'TK-002',
    subject: 'Payment not reflecting',
    category: 'Billing',
    date: '2026-04-03',
    status: 'Resolved',
    createdBy: 'Sarah Host',
    description: 'Made payment 3 days ago, still not reflected on my account. Transaction reference: TXN-88293.',
    attachments: [
      { name: 'payment_receipt.pdf', type: 'file', url: '#' },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Billing Department',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Billing',
        date: '2026-04-04',
        text: 'Payment has been located and applied to your account. Please allow up to 2 hours for the dashboard to reflect the update.',
        likes: 5,
        dislikes: 0,
        userReaction: null,
        attachments: [],
      },
    ],
  },
  'TK-003': { id: 'TK-003', subject: 'Visitor QR code not working', category: 'Technical Issue', date: '2026-04-05', status: 'Open', createdBy: 'John Resident', description: 'Visitors scan the QR code but nothing happens on their end.', attachments: [], comments: [] },
  'TK-004': { id: 'TK-004', subject: 'Request for bulk visitor import', category: 'Feature Request', date: '2026-04-07', status: 'Closed', createdBy: 'Alice Manager', description: 'Would be great to upload a CSV file for multiple visitors at once.', attachments: [], comments: [] },
  'TK-005': { id: 'TK-005', subject: 'Appointment notifications not sending', category: 'Technical Issue', date: '2026-04-09', status: 'Open', createdBy: 'David Fayemi', description: 'Email notifications for new appointments stopped working.', attachments: [], comments: [] },
  'TK-006': { id: 'TK-006', subject: 'Update subscription plan', category: 'Billing', date: '2026-04-10', status: 'Resolved', createdBy: 'Sarah Host', description: 'Need help upgrading from basic to enterprise plan.', attachments: [], comments: [] },
  'TK-007': { id: 'TK-007', subject: 'Profile picture not uploading', category: 'General Inquiry', date: '2026-04-12', status: 'Closed', createdBy: 'Bob Visitor', description: 'I try to upload a profile image but it just spins forever.', attachments: [], comments: [] },
};

const STATUS_COLORS = {
  Open:     { bg: '#fffbeb', color: '#d97706' },
  Closed:   { bg: 'var(--bg-danger-subtle)', color: '#dc2626' },
  Resolved: { bg: '#f0fdf4', color: '#16a34a' },
};

/* ──────────────────────────────────────────────
   Attachment Preview Component
────────────────────────────────────────────── */
const AttachmentItem = ({ file }) => {
  const isImage = file.type === 'image';
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="tv-attach-item" onClick={() => isImage && setLightbox(true)}>
        <div className="tv-attach-icon">
          {isImage ? <Image size={18} color="#6366f1" /> : <FileText size={18} color="var(--bg-brand)" />}
        </div>
        <span className="tv-attach-name">{file.name}</span>
        <a
          href={file.url || '#'}
          download={file.name}
          className="tv-attach-download"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={14} />
        </a>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="tv-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button className="tv-lightbox-close"><X size={24} /></button>
            <motion.img
              src={file.url}
              alt={file.name}
              className="tv-lightbox-img"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="tv-lightbox-caption">{file.name}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ──────────────────────────────────────────────
   Single Comment Component
────────────────────────────────────────────── */
const Comment = ({ comment, onReact }) => {
  return (
    <motion.div
      className="tv-comment"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img src={comment.avatar} alt={comment.author} className="tv-comment-avatar" />
      <div className="tv-comment-body">
        <div className="tv-comment-header">
          <span className="tv-comment-author">{comment.author}</span>
          <span className="tv-comment-date">{comment.date}</span>
        </div>
        <p className="tv-comment-text">{comment.text}</p>

        {/* Comment attachments */}
        {comment.attachments && comment.attachments.length > 0 && (
          <div className="tv-comment-attachments">
            {comment.attachments.map((a, i) => (
              <div key={i} className="tv-attach-item small">
                <FileText size={14} color="var(--bg-brand)" />
                <span className="tv-attach-name">{a.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Like / Dislike */}
        <div className="tv-comment-reactions">
          <button
            className={`tv-react-btn ${comment.userReaction === 'like' ? 'liked' : ''}`}
            onClick={() => onReact(comment.id, 'like')}
            title="Helpful"
          >
            <ThumbsUp size={14} />
            <span>{comment.likes}</span>
          </button>
          <button
            className={`tv-react-btn ${comment.userReaction === 'dislike' ? 'disliked' : ''}`}
            onClick={() => onReact(comment.id, 'dislike')}
            title="Not helpful"
          >
            <ThumbsDown size={14} />
            <span>{comment.dislikes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Main Page
────────────────────────────────────────────── */
const TicketView = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split('/')[1];

  const baseTicket = TICKET_DB[ticketId];

  // Local state so we can mutate comments / reactions
  const [comments, setComments] = useState(baseTicket?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [commentFile, setCommentFile] = useState(null);
  const fileRef = useRef();

  if (!baseTicket) {
    return (
      <div className="tv-not-found">
        <Ticket size={48} color="var(--text-quaternary)" />
        <h2>Ticket not found</h2>
        <button className="tv-btn-back" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const sc = STATUS_COLORS[baseTicket.status] || {};

  /* Reactions */
  const handleReact = (commentId, reaction) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        const isToggle = c.userReaction === reaction;
        return {
          ...c,
          userReaction: isToggle ? null : reaction,
          likes:
            reaction === 'like'
              ? isToggle ? c.likes - 1 : c.likes + 1
              : c.userReaction === 'like' ? c.likes - 1 : c.likes,
          dislikes:
            reaction === 'dislike'
              ? isToggle ? c.dislikes - 1 : c.dislikes + 1
              : c.userReaction === 'dislike' ? c.dislikes - 1 : c.dislikes,
        };
      })
    );
  };

  /* Submit comment */
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newEntry = {
      id: `c-${Date.now()}`,
      author: 'You',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
      date: new Date().toISOString().split('T')[0],
      text: newComment.trim(),
      likes: 0,
      dislikes: 0,
      userReaction: null,
      attachments: commentFile ? [{ name: commentFile.name, type: commentFile.type.startsWith('image') ? 'image' : 'file' }] : [],
    };
    setComments((prev) => [...prev, newEntry]);
    setNewComment('');
    setCommentFile(null);
  };

  return (
    <div className="tv-page">

      {/* Back navigation */}
      <button className="tv-back-btn" onClick={() => navigate(`/${role}/support/tickets`)}>
        <ChevronLeft size={18} /> Back to Tickets
      </button>

      <div className="tv-layout">
        {/* ── Left: Main content ── */}
        <div className="tv-main">

          {/* Ticket header */}
          <div className="tv-ticket-header">
            <div className="tv-ticket-id-row">
              <span className="tv-ticket-id">{baseTicket.id}</span>
              <span
                className="tv-status-pill"
                style={{ background: sc.bg, color: sc.color }}
              >
                {baseTicket.status}
              </span>
            </div>
            <h1 className="tv-subject">{baseTicket.subject}</h1>
          </div>

          {/* Description */}
          <div className="tv-section-card">
            <h3 className="tv-section-title">Description</h3>
            <p className="tv-description">{baseTicket.description}</p>
          </div>

          {/* Attachments */}
          {baseTicket.attachments.length > 0 && (
            <div className="tv-section-card">
              <h3 className="tv-section-title">
                <Paperclip size={16} /> Attachments ({baseTicket.attachments.length})
              </h3>
              <div className="tv-attachments-list">
                {baseTicket.attachments.map((a, i) => (
                  <AttachmentItem key={i} file={a} />
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="tv-section-card">
            <h3 className="tv-section-title">
              <MessageSquare size={16} />
              Comments ({comments.length})
            </h3>

            <div className="tv-comments-list">
              {comments.length === 0 ? (
                <p className="tv-no-comments">No comments yet. Be the first to comment.</p>
              ) : (
                comments.map((c) => (
                  <Comment key={c.id} comment={c} onReact={handleReact} />
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form className="tv-comment-form" onSubmit={handleCommentSubmit}>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`}
                alt="You"
                className="tv-comment-avatar"
              />
              <div className="tv-comment-input-wrap">
                <textarea
                  className="tv-comment-textarea"
                  rows={3}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />

                {/* Attachment preview */}
                {commentFile && (
                  <div className="tv-comment-file-preview">
                    <Paperclip size={14} />
                    <span>{commentFile.name}</span>
                    <button type="button" className="tv-remove-file" onClick={() => setCommentFile(null)}>
                      <X size={12} />
                    </button>
                  </div>
                )}

                <div className="tv-comment-actions">
                  <button
                    type="button"
                    className="tv-btn-attach"
                    onClick={() => fileRef.current.click()}
                    title="Attach file"
                  >
                    <Upload size={16} /> Attach File
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setCommentFile(e.target.files[0] || null)}
                  />
                  <button
                    type="submit"
                    className="tv-btn-send"
                    disabled={!newComment.trim()}
                  >
                    <Send size={15} /> Post Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ── Right: Meta sidebar ── */}
        <div className="tv-sidebar">
          <div className="tv-meta-card">
            <h3 className="tv-meta-title">Ticket Details</h3>

            <div className="tv-meta-item">
              <span className="tv-meta-label"><Tag size={14} /> Category</span>
              <span className="tv-meta-value">{baseTicket.category}</span>
            </div>
            <div className="tv-meta-item">
              <span className="tv-meta-label"><User size={14} /> Created By</span>
              <span className="tv-meta-value">{baseTicket.createdBy}</span>
            </div>
            <div className="tv-meta-item">
              <span className="tv-meta-label"><Calendar size={14} /> Date Submitted</span>
              <span className="tv-meta-value">{baseTicket.date}</span>
            </div>
            <div className="tv-meta-item">
              <span className="tv-meta-label"><Ticket size={14} /> Ticket ID</span>
              <span className="tv-meta-value">{baseTicket.id}</span>
            </div>
            <div className="tv-meta-item">
              <span className="tv-meta-label">Status</span>
              <span
                className="tv-status-pill"
                style={{ background: sc.bg, color: sc.color }}
              >
                {baseTicket.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .tv-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        /* Back button */
        .tv-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 10px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          width: fit-content;
        }

        .tv-back-btn:hover {
          background: var(--bg-muted);
          color: var(--bg-brand);
        }

        /* Layout */
        .tv-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .tv-main {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Ticket header */
        .tv-ticket-header {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .tv-ticket-id-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .tv-ticket-id {
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--text-quaternary);
          letter-spacing: 0.5px;
        }

        .tv-status-pill {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .tv-subject {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
          margin: 0;
        }

        /* Section cards */
        .tv-section-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .tv-section-title {
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tv-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        /* Attachments */
        .tv-attachments-list {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .tv-attach-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          background: var(--bg-subtle);
          border: 1px solid var(--border-default);
          border-radius: 10px;
          padding: 0.625rem 0.875rem;
          cursor: pointer;
          transition: background 0.15s;
        }

        .tv-attach-item:hover {
          background: var(--bg-muted);
        }

        .tv-attach-item.small {
          padding: 0.375rem 0.625rem;
          font-size: 0.8125rem;
        }

        .tv-attach-icon {
          display: flex;
          align-items: center;
        }

        .tv-attach-name {
          flex: 1;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tv-attach-download {
          color: var(--text-quaternary);
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: color 0.15s;
        }

        .tv-attach-download:hover {
          color: var(--bg-brand);
        }

        /* Lightbox */
        .tv-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }

        .tv-lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: var(--bg-surface);
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-primary);
        }

        .tv-lightbox-img {
          max-width: 90vw;
          max-height: 75vh;
          border-radius: 12px;
          object-fit: contain;
        }

        .tv-lightbox-caption {
          margin-top: 1rem;
          color: var(--text-quaternary);
          font-size: 0.8125rem;
        }

        /* Comments */
        .tv-comments-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .tv-no-comments {
          font-size: 0.875rem;
          color: var(--text-quaternary);
          text-align: center;
          padding: 2rem 0;
          margin: 0;
        }

        .tv-comment {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
        }

        .tv-comment-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--border-default);
          flex-shrink: 0;
          object-fit: cover;
        }

        .tv-comment-body {
          flex: 1;
          background: var(--bg-subtle);
          border: 1px solid var(--border-default);
          border-radius: 14px;
          padding: 1rem 1.125rem;
        }

        .tv-comment-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .tv-comment-author {
          font-size: 0.875rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .tv-comment-date {
          font-size: 0.75rem;
          color: var(--text-quaternary);
          font-weight: 500;
        }

        .tv-comment-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 0.75rem;
        }

        .tv-comment-attachments {
          margin-bottom: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Reactions */
        .tv-comment-reactions {
          display: flex;
          gap: 0.5rem;
        }

        .tv-react-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border: 1px solid var(--border-default);
          border-radius: 20px;
          background: var(--bg-surface);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .tv-react-btn:hover {
          background: var(--bg-muted);
          color: var(--bg-brand);
        }

        .tv-react-btn.liked {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: var(--accent-primary);
        }

        .tv-react-btn.disliked {
          background: var(--bg-danger-subtle);
          border-color: #fecaca;
          color: #dc2626;
        }

        /* Comment form */
        .tv-comment-form {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
          border-top: 1px solid var(--bg-muted);
          padding-top: 1.25rem;
        }

        .tv-comment-input-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .tv-comment-textarea {
          width: 100%;
          padding: 0.875rem;
          border: 1.5px solid var(--border-default);
          border-radius: 12px;
          font-size: 0.875rem;
          color: var(--text-primary);
          font-family: inherit;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
          background: var(--bg-surface);
        }

        .tv-comment-textarea:focus {
          border-color: var(--bg-brand);
        }

        .tv-comment-file-preview {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-muted);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .tv-remove-file {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-quaternary);
          display: flex;
          align-items: center;
          margin-left: auto;
        }

        .tv-comment-actions {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .tv-btn-attach {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 0.5rem 0.875rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .tv-btn-attach:hover {
          background: var(--bg-muted);
          color: var(--bg-brand);
        }

        .tv-btn-send {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-brand);
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1.125rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-inverse);
          cursor: pointer;
          transition: opacity 0.2s;
          margin-left: auto;
        }

        .tv-btn-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .tv-btn-send:hover:not(:disabled) {
          opacity: 0.88;
        }

        /* Sidebar */
        .tv-sidebar {
          position: sticky;
          top: 88px;
        }

        .tv-meta-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .tv-meta-title {
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          padding-bottom: 0.875rem;
          border-bottom: 1px solid var(--bg-muted);
        }

        .tv-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 1rem;
        }

        .tv-meta-label {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--text-quaternary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .tv-meta-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Not found */
        .tv-not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          min-height: 50vh;
          color: var(--text-tertiary);
        }

        .tv-not-found h2 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .tv-btn-back {
          background: var(--bg-brand);
          color: var(--text-inverse);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .tv-layout { grid-template-columns: 1fr; }
          .tv-sidebar { position: static; order: 2; }
          .tv-main { order: 1; }
        }

        @media (max-width: 768px) {
          .tv-page { padding: 1rem; }
          .tv-subject { font-size: 1.125rem; }
          .tv-section-card, .tv-ticket-header { padding: 1.25rem; }
          .tv-comment-actions { flex-direction: column; align-items: stretch; }
          .tv-btn-attach, .tv-btn-send { width: 100%; justify-content: center; margin-left: 0; }
          .tv-comment { gap: 0.625rem; }
          .tv-comment-avatar { width: 32px; height: 32px; }
          .tv-comment-body { padding: 0.875rem 1rem; }
        }
      `}</style>
    </div>
  );
};

export default TicketView;
