import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  MessageSquare,
  Smartphone,
  Phone,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Search,
  X,
  AlertTriangle,
  Wallet,
  Info,
  ChevronDown,
  BarChart3,
  Zap
} from 'lucide-react';
import Pagination from '../../components/Pagination';

const MOCK_PRICING = [
  { channel: 'sms', channel_label: 'SMS', cost_per_unit: 5.00, currency: 'NGN' },
  { channel: 'whatsapp', channel_label: 'WhatsApp', cost_per_unit: 10.00, currency: 'NGN' },
];

const MOCK_STATS = {
  total_sent: 142,
  total_failed: 3,
  total_queued: 1,
  total_cost: 1580.00,
  by_channel: { sms: 98, whatsapp: 47 },
};

const MOCK_WALLET_BALANCE = 12500.00;

const MOCK_LOGS = [
  { id: 1, recipient_phone: '+2348012345678', recipient_name: 'Adebayo Ogunlesi', channel: 'whatsapp', status: 'delivered', message: 'Your visitor John Doe has arrived at Gate A. Please confirm entry.', cost: 10.00, sent_by: 'Manager', created_at: '2026-06-22T14:30:00Z', twilio_sid: 'SM123abc' },
  { id: 2, recipient_phone: '+2348098765432', recipient_name: 'Chinwe Okafor', channel: 'sms', status: 'sent', message: 'Reminder: Your estate service charge of ₦15,000 is due on June 30th.', cost: 5.00, sent_by: 'Manager', created_at: '2026-06-22T13:15:00Z', twilio_sid: 'SM456def' },
  { id: 3, recipient_phone: '+2348055555555', recipient_name: 'Ibrahim Musa', channel: 'whatsapp', status: 'failed', message: 'Security alert: Unregistered vehicle detected at Block C.', cost: 10.00, sent_by: 'System', created_at: '2026-06-22T12:00:00Z', error_message: 'Number not registered on WhatsApp', twilio_sid: null },
  { id: 4, recipient_phone: '+2348011111111', recipient_name: 'Folake Adeyemi', channel: 'sms', status: 'delivered', message: 'Your access code for visitor pass is: VIS-4829. Valid until 6:00 PM today.', cost: 5.00, sent_by: 'Manager', created_at: '2026-06-21T16:45:00Z', twilio_sid: 'SM789ghi' },
  { id: 5, recipient_phone: '+2348022222222', recipient_name: 'Emeka Nwankwo', channel: 'whatsapp', status: 'delivered', message: 'Welcome to Lekki Gardens Estate. Your resident profile has been activated.', cost: 10.00, sent_by: 'System', created_at: '2026-06-21T10:00:00Z', twilio_sid: 'SM012jkl' },
  { id: 6, recipient_phone: '+2348033333333', recipient_name: 'Aisha Bello', channel: 'sms', status: 'queued', message: 'Maintenance scheduled for Block D water pump on June 25th.', cost: 5.00, sent_by: 'Manager', created_at: '2026-06-22T15:00:00Z', twilio_sid: null },
  { id: 7, recipient_phone: '+2348044444444', recipient_name: null, channel: 'sms', status: 'refunded', message: 'Gate access code: GA-9912', cost: 5.00, sent_by: 'Manager', created_at: '2026-06-20T09:30:00Z', error_message: 'Invalid phone number', twilio_sid: null },
];

const STATUS_CONFIG = {
  queued: { icon: <Clock size={14} />, color: '#f59e0b', bg: '#fffbeb', label: 'Queued' },
  sent: { icon: <Send size={14} />, color: '#3b82f6', bg: '#eff6ff', label: 'Sent' },
  delivered: { icon: <CheckCircle size={14} />, color: '#10b981', bg: '#ecfdf5', label: 'Delivered' },
  failed: { icon: <XCircle size={14} />, color: '#ef4444', bg: '#fef2f2', label: 'Failed' },
  refunded: { icon: <RefreshCw size={14} />, color: '#8b5cf6', bg: '#f5f3ff', label: 'Refunded' },
};

const CHANNEL_ICONS = {
  sms: <Smartphone size={16} />,
  whatsapp: <MessageSquare size={16} />,
};

const SendNotifications = () => {
  const [pricing] = useState(MOCK_PRICING);
  const [stats] = useState(MOCK_STATS);
  const [walletBalance] = useState(MOCK_WALLET_BALANCE);
  const [logs] = useState(MOCK_LOGS);

  // Send form state
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendChannel, setSendChannel] = useState('sms');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Log filters
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Detail modal
  const [selectedLog, setSelectedLog] = useState(null);

  const currentCost = useMemo(() => {
    const p = pricing.find(pr => pr.channel === sendChannel);
    return p ? p.cost_per_unit : 0;
  }, [sendChannel, pricing]);

  const filteredLogs = useMemo(() => {
    return logs.filter(l => {
      if (channelFilter !== 'all' && l.channel !== channelFilter) return false;
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !l.recipient_phone.includes(q) &&
          !(l.recipient_name || '').toLowerCase().includes(q) &&
          !l.message.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [logs, channelFilter, statusFilter, searchQuery]);

  const totalItems = filteredLogs.length;
  const currentTableData = useMemo(() => {
    const first = (currentPage - 1) * pageSize;
    return filteredLogs.slice(first, first + pageSize);
  }, [currentPage, filteredLogs, pageSize]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = () => {
    if (!recipientPhone || !messageBody) return;
    setIsSending(true);
    // TODO: Call POST /api/notifications/send
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setIsSendModalOpen(false);
        setRecipientPhone('');
        setRecipientName('');
        setMessageBody('');
      }, 1500);
    }, 1200);
  };

  const resetAndOpenModal = () => {
    setSendSuccess(false);
    setIsSendModalOpen(true);
  };

  return (
    <div className="ntf-page">
      <div className="ntf-page-header">
        <h1>Send Notifications</h1>
        <button className="ntf-send-btn" onClick={resetAndOpenModal}>
          <Send size={18} />
          Send Notification
        </button>
      </div>

      {/* Wallet + Pricing Bar */}
      <div className="ntf-info-bar">
        <div className="ntf-wallet-chip">
          <Wallet size={18} />
          <div className="ntf-wallet-chip-body">
            <span className="ntf-wallet-chip-label">Wallet Balance</span>
            <strong>₦{walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
          </div>
        </div>
        <div className="ntf-pricing-chips">
          {pricing.map(p => (
            <div key={p.channel} className="ntf-pricing-chip">
              {CHANNEL_ICONS[p.channel]}
              <span>{p.channel_label}</span>
              <strong>₦{p.cost_per_unit.toFixed(2)}/msg</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="ntf-stats-grid">
        <motion.div className="ntf-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ntf-stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
            <CheckCircle size={20} />
          </div>
          <div className="ntf-stat-body">
            <span className="ntf-stat-label">Delivered</span>
            <span className="ntf-stat-value">{stats.total_sent}</span>
          </div>
        </motion.div>

        <motion.div className="ntf-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="ntf-stat-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <XCircle size={20} />
          </div>
          <div className="ntf-stat-body">
            <span className="ntf-stat-label">Failed</span>
            <span className="ntf-stat-value">{stats.total_failed}</span>
          </div>
        </motion.div>

        <motion.div className="ntf-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="ntf-stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
            <Clock size={20} />
          </div>
          <div className="ntf-stat-body">
            <span className="ntf-stat-label">In Queue</span>
            <span className="ntf-stat-value">{stats.total_queued}</span>
          </div>
        </motion.div>

        <motion.div className="ntf-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="ntf-stat-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <BarChart3 size={20} />
          </div>
          <div className="ntf-stat-body">
            <span className="ntf-stat-label">Total Spent</span>
            <span className="ntf-stat-value">₦{stats.total_cost.toLocaleString()}</span>
          </div>
        </motion.div>

        <motion.div className="ntf-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="ntf-stat-icon" style={{ background: '#f0f9ff', color: '#0ea5e9' }}>
            <Smartphone size={20} />
          </div>
          <div className="ntf-stat-body">
            <span className="ntf-stat-label">SMS Sent</span>
            <span className="ntf-stat-value">{stats.by_channel.sms}</span>
          </div>
        </motion.div>

        <motion.div className="ntf-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="ntf-stat-icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <MessageSquare size={20} />
          </div>
          <div className="ntf-stat-body">
            <span className="ntf-stat-label">WhatsApp Sent</span>
            <span className="ntf-stat-value">{stats.by_channel.whatsapp}</span>
          </div>
        </motion.div>
      </div>

      {/* Notification Logs Table */}
      <div className="ntf-table-card">
        <div className="ntf-table-toolbar">
          <h2 className="ntf-table-title">Notification History</h2>
          <div className="ntf-table-actions">
            <div className="ntf-filter-pills">
              {['all', 'sms', 'whatsapp'].map(f => (
                <button
                  key={f}
                  className={`ntf-filter-pill ${channelFilter === f ? 'active' : ''}`}
                  onClick={() => { setChannelFilter(f); setCurrentPage(1); }}
                >
                  {f === 'all' ? 'All' : f === 'sms' ? 'SMS' : 'WhatsApp'}
                </button>
              ))}
            </div>

            <div className="ntf-status-select">
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="sent">Sent</option>
                <option value="queued">Queued</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <ChevronDown size={14} className="ntf-select-chevron" />
            </div>

            <div className="ntf-search-box">
              <Search size={16} className="ntf-search-icon" />
              <input
                type="text"
                placeholder="Search by name, phone, message..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
        </div>

        <table className="ntf-table">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Channel</th>
              <th>Message</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length > 0 ? currentTableData.map(log => {
              const sc = STATUS_CONFIG[log.status];
              return (
                <tr key={log.id} className="ntf-table-row" onClick={() => setSelectedLog(log)}>
                  <td className="ntf-recipient-cell">
                    <span className="ntf-recipient-name">{log.recipient_name || 'Unknown'}</span>
                    <span className="ntf-recipient-phone">{log.recipient_phone}</span>
                  </td>
                  <td>
                    <span className={`ntf-channel-badge ntf-channel-${log.channel}`}>
                      {CHANNEL_ICONS[log.channel]}
                      {log.channel === 'sms' ? 'SMS' : 'WhatsApp'}
                    </span>
                  </td>
                  <td className="ntf-message-cell">
                    <span className="ntf-message-text">{log.message}</span>
                  </td>
                  <td className="ntf-cost-cell">₦{log.cost.toFixed(2)}</td>
                  <td>
                    <span className="ntf-status-pill" style={{ background: sc.bg, color: sc.color }}>
                      {sc.icon} {sc.label}
                    </span>
                  </td>
                  <td className="ntf-date-cell">
                    <span>{formatDate(log.created_at)}</span>
                    <span className="ntf-time">{formatTime(log.created_at)}</span>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-quaternary)' }}>
                  No notification logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalCount={totalItems}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
          onPageSizeChange={size => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>

      {/* Send Notification Modal */}
      <AnimatePresence>
        {isSendModalOpen && (
          <div className="ntf-modal-overlay" onClick={() => !isSending && setIsSendModalOpen(false)}>
            <motion.div
              className="ntf-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="ntf-modal-close" onClick={() => !isSending && setIsSendModalOpen(false)}>
                <X size={20} />
              </button>

              {sendSuccess ? (
                <div className="ntf-success-state">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="ntf-success-icon"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h2>Notification Queued!</h2>
                  <p>Your {sendChannel === 'sms' ? 'SMS' : 'WhatsApp'} message has been queued for delivery.</p>
                </div>
              ) : (
                <>
                  <div className="ntf-send-header">
                    <div className="ntf-send-icon">
                      <Send size={24} />
                    </div>
                    <h2>Send Notification</h2>
                    <p>Choose a channel and compose your message</p>
                  </div>

                  <div className="ntf-send-body">
                    {/* Channel Selector */}
                    <div className="ntf-channel-selector">
                      <label>Channel</label>
                      <div className="ntf-channel-options">
                        <button
                          className={`ntf-channel-opt ${sendChannel === 'sms' ? 'active' : ''}`}
                          onClick={() => setSendChannel('sms')}
                        >
                          <Smartphone size={20} />
                          <div>
                            <strong>SMS</strong>
                            <span>₦{pricing.find(p => p.channel === 'sms')?.cost_per_unit.toFixed(2)}/msg</span>
                          </div>
                        </button>
                        <button
                          className={`ntf-channel-opt ${sendChannel === 'whatsapp' ? 'active' : ''}`}
                          onClick={() => setSendChannel('whatsapp')}
                        >
                          <MessageSquare size={20} />
                          <div>
                            <strong>WhatsApp</strong>
                            <span>₦{pricing.find(p => p.channel === 'whatsapp')?.cost_per_unit.toFixed(2)}/msg</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Recipient */}
                    <div className="ntf-form-group">
                      <label>Recipient Phone Number <span className="ntf-required">*</span></label>
                      <div className="ntf-input-wrap">
                        <Phone size={16} className="ntf-input-icon" />
                        <input
                          type="tel"
                          placeholder="+234 801 234 5678"
                          value={recipientPhone}
                          onChange={e => setRecipientPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="ntf-form-group">
                      <label>Recipient Name <span className="ntf-optional">(optional)</span></label>
                      <div className="ntf-input-wrap">
                        <Users size={16} className="ntf-input-icon" />
                        <input
                          type="text"
                          placeholder="e.g. Adebayo Ogunlesi"
                          value={recipientName}
                          onChange={e => setRecipientName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="ntf-form-group">
                      <label>Message <span className="ntf-required">*</span></label>
                      <textarea
                        placeholder="Type your notification message here..."
                        value={messageBody}
                        onChange={e => setMessageBody(e.target.value)}
                        maxLength={1600}
                        rows={4}
                      />
                      <div className="ntf-char-count">
                        <span>{messageBody.length} / 1600 characters</span>
                      </div>
                    </div>

                    {/* Cost Preview */}
                    <div className="ntf-cost-preview">
                      <div className="ntf-cost-row">
                        <span>Channel</span>
                        <span>{sendChannel === 'sms' ? 'SMS' : 'WhatsApp'}</span>
                      </div>
                      <div className="ntf-cost-row">
                        <span>Cost per message</span>
                        <strong>₦{currentCost.toFixed(2)}</strong>
                      </div>
                      <div className="ntf-cost-row ntf-cost-total">
                        <span>Wallet Balance After</span>
                        <strong>₦{(walletBalance - currentCost).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="ntf-modal-footer">
                    <button
                      className="ntf-submit-btn"
                      onClick={handleSend}
                      disabled={!recipientPhone || !messageBody || isSending}
                    >
                      {isSending ? (
                        <><RefreshCw size={16} className="spinning" /> Sending...</>
                      ) : (
                        <><Zap size={16} /> Send {sendChannel === 'sms' ? 'SMS' : 'WhatsApp'} · ₦{currentCost.toFixed(2)}</>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification Detail Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="ntf-modal-overlay" onClick={() => setSelectedLog(null)}>
            <motion.div
              className="ntf-detail-container"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="ntf-modal-close" onClick={() => setSelectedLog(null)}>
                <X size={20} />
              </button>

              <div className="ntf-detail-header">
                <div className={`ntf-detail-icon ntf-detail-${selectedLog.status}`}>
                  {STATUS_CONFIG[selectedLog.status].icon}
                </div>
                <h2>Notification Details</h2>
              </div>

              <div className="ntf-detail-body">
                <div className="ntf-detail-row">
                  <span>Recipient</span>
                  <strong>{selectedLog.recipient_name || 'Unknown'}</strong>
                </div>
                <div className="ntf-detail-row">
                  <span>Phone</span>
                  <strong>{selectedLog.recipient_phone}</strong>
                </div>
                <div className="ntf-detail-row">
                  <span>Channel</span>
                  <span className={`ntf-channel-badge ntf-channel-${selectedLog.channel}`}>
                    {CHANNEL_ICONS[selectedLog.channel]}
                    {selectedLog.channel === 'sms' ? 'SMS' : 'WhatsApp'}
                  </span>
                </div>
                <div className="ntf-detail-row">
                  <span>Status</span>
                  <span className="ntf-status-pill" style={{
                    background: STATUS_CONFIG[selectedLog.status].bg,
                    color: STATUS_CONFIG[selectedLog.status].color,
                  }}>
                    {STATUS_CONFIG[selectedLog.status].icon} {STATUS_CONFIG[selectedLog.status].label}
                  </span>
                </div>
                <div className="ntf-detail-row">
                  <span>Cost</span>
                  <strong>₦{selectedLog.cost.toFixed(2)}</strong>
                </div>
                <div className="ntf-detail-row">
                  <span>Sent At</span>
                  <strong>{formatDate(selectedLog.created_at)} at {formatTime(selectedLog.created_at)}</strong>
                </div>
                {selectedLog.twilio_sid && (
                  <div className="ntf-detail-row">
                    <span>Twilio SID</span>
                    <code>{selectedLog.twilio_sid}</code>
                  </div>
                )}
                {selectedLog.error_message && (
                  <div className="ntf-detail-error">
                    <AlertTriangle size={16} />
                    <span>{selectedLog.error_message}</span>
                  </div>
                )}
                <div className="ntf-detail-divider" />
                <div className="ntf-detail-message">
                  <span className="ntf-detail-msg-label">Message Content</span>
                  <p>{selectedLog.message}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .ntf-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .ntf-page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ntf-page-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .ntf-send-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-brand);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ntf-send-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        /* Info Bar */
        .ntf-info-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 14px;
          padding: 12px 20px;
          flex-wrap: wrap;
        }

        .ntf-wallet-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--bg-brand);
        }

        .ntf-wallet-chip-body {
          display: flex;
          flex-direction: column;
        }

        .ntf-wallet-chip-label {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-quaternary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .ntf-wallet-chip strong {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .ntf-pricing-chips {
          display: flex;
          gap: 12px;
        }

        .ntf-pricing-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--bg-subtle);
          border-radius: 10px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .ntf-pricing-chip strong {
          font-weight: 800;
          color: var(--text-primary);
        }

        /* Stats Grid */
        .ntf-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 1rem;
        }

        .ntf-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ntf-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ntf-stat-body { display: flex; flex-direction: column; }
        .ntf-stat-label { font-size: 0.75rem; color: var(--text-quaternary); font-weight: 700; }
        .ntf-stat-value { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); }

        /* Table Card */
        .ntf-table-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .ntf-table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .ntf-table-title {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .ntf-table-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .ntf-filter-pills {
          display: flex;
          gap: 4px;
          background: var(--bg-subtle);
          border-radius: 10px;
          padding: 3px;
        }

        .ntf-filter-pill {
          padding: 6px 14px;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .ntf-filter-pill.active {
          background: var(--bg-surface);
          color: var(--bg-brand);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }

        .ntf-status-select {
          position: relative;
        }

        .ntf-status-select select {
          appearance: none;
          padding: 8px 32px 8px 14px;
          border: 1px solid var(--border-default);
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 600;
          background: var(--bg-subtle);
          color: var(--text-primary);
          cursor: pointer;
          outline: none;
        }

        .ntf-select-chevron {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-quaternary);
          pointer-events: none;
        }

        .ntf-search-box {
          position: relative;
          width: 250px;
        }

        .ntf-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-quaternary);
        }

        .ntf-search-box input {
          width: 100%;
          padding: 10px 14px 10px 36px;
          border: 1px solid var(--border-default);
          border-radius: 10px;
          font-size: 0.8125rem;
          outline: none;
          background: var(--bg-subtle);
        }

        .ntf-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .ntf-table th {
          padding: 14px 12px 14px 0;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-tertiary);
          border-bottom: 1px solid var(--bg-muted);
        }

        .ntf-table td {
          padding: 14px 12px 14px 0;
          font-size: 0.875rem;
          border-bottom: 1px solid var(--bg-muted);
          vertical-align: middle;
        }

        .ntf-table-row {
          cursor: pointer;
          transition: background 0.15s;
        }

        .ntf-table-row:hover {
          background: var(--bg-subtle);
        }

        .ntf-recipient-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ntf-recipient-name { font-weight: 700; color: var(--text-primary); font-size: 0.8125rem; }
        .ntf-recipient-phone { font-size: 0.75rem; color: var(--text-quaternary); font-family: monospace; }

        .ntf-channel-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .ntf-channel-sms { background: #f0f9ff; color: #0284c7; }
        .ntf-channel-whatsapp { background: #f0fdf4; color: #16a34a; }

        .ntf-message-cell {
          max-width: 300px;
        }

        .ntf-message-text {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .ntf-cost-cell { font-weight: 800; color: var(--text-primary); }

        .ntf-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .ntf-date-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .ntf-time { font-size: 0.75rem; color: var(--text-quaternary); }

        /* Modal Common */
        .ntf-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .ntf-modal-container,
        .ntf-detail-container {
          background: var(--bg-surface);
          border-radius: 20px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .ntf-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--bg-subtle);
          border: none;
          border-radius: 10px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          cursor: pointer;
          z-index: 10;
        }

        /* Send Modal */
        .ntf-send-header {
          text-align: center;
          padding: 2rem 2rem 1rem;
        }

        .ntf-send-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--bg-brand), #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: white;
        }

        .ntf-send-header h2 { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px; }
        .ntf-send-header p { font-size: 0.8125rem; color: var(--text-quaternary); margin: 0; }

        .ntf-send-body { padding: 0 2rem; }

        .ntf-channel-selector label,
        .ntf-form-group label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .ntf-required { color: #ef4444; }
        .ntf-optional { color: var(--text-quaternary); font-weight: 500; }

        .ntf-channel-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 1.25rem;
        }

        .ntf-channel-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border: 2px solid var(--border-default);
          border-radius: 14px;
          background: var(--bg-surface);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .ntf-channel-opt:hover { border-color: var(--bg-brand); }

        .ntf-channel-opt.active {
          border-color: var(--bg-brand);
          background: rgba(59, 130, 246, 0.04);
        }

        .ntf-channel-opt div { display: flex; flex-direction: column; }
        .ntf-channel-opt strong { font-size: 0.875rem; color: var(--text-primary); }
        .ntf-channel-opt span { font-size: 0.75rem; color: var(--text-quaternary); }

        .ntf-form-group {
          margin-bottom: 1.25rem;
        }

        .ntf-input-wrap {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--border-default);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .ntf-input-wrap:focus-within { border-color: var(--bg-brand); }

        .ntf-input-icon {
          margin-left: 14px;
          color: var(--text-quaternary);
          flex-shrink: 0;
        }

        .ntf-input-wrap input {
          flex: 1;
          padding: 12px 14px;
          border: none;
          outline: none;
          font-size: 0.875rem;
          background: transparent;
          color: var(--text-primary);
        }

        .ntf-form-group textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border-default);
          border-radius: 12px;
          font-size: 0.875rem;
          outline: none;
          resize: vertical;
          font-family: inherit;
          color: var(--text-primary);
          background: transparent;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .ntf-form-group textarea:focus { border-color: var(--bg-brand); }

        .ntf-char-count {
          display: flex;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .ntf-char-count span {
          font-size: 0.75rem;
          color: var(--text-quaternary);
        }

        .ntf-cost-preview {
          background: var(--bg-subtle);
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 0.5rem;
        }

        .ntf-cost-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .ntf-cost-row strong { color: var(--text-primary); font-weight: 800; }

        .ntf-cost-total {
          border-top: 1px solid var(--border-default);
          margin-top: 6px;
          padding-top: 10px;
        }

        .ntf-modal-footer {
          padding: 1.25rem 2rem 2rem;
        }

        .ntf-submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--bg-brand), #6366f1);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 0.9375rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .ntf-submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .ntf-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Success State */
        .ntf-success-state {
          text-align: center;
          padding: 3rem 2rem;
        }

        .ntf-success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #ecfdf5;
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }

        .ntf-success-state h2 { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 6px; }
        .ntf-success-state p { font-size: 0.875rem; color: var(--text-quaternary); margin: 0; }

        /* Detail Modal */
        .ntf-detail-header {
          text-align: center;
          padding: 2rem 2rem 1rem;
        }

        .ntf-detail-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .ntf-detail-delivered { background: #ecfdf5; color: #10b981; }
        .ntf-detail-sent { background: #eff6ff; color: #3b82f6; }
        .ntf-detail-queued { background: #fffbeb; color: #f59e0b; }
        .ntf-detail-failed { background: #fef2f2; color: #ef4444; }
        .ntf-detail-refunded { background: #f5f3ff; color: #8b5cf6; }

        .ntf-detail-header h2 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0; }

        .ntf-detail-body { padding: 0 2rem 2rem; }

        .ntf-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--bg-muted);
        }

        .ntf-detail-row span:first-child { font-size: 0.8125rem; color: var(--text-tertiary); font-weight: 600; }
        .ntf-detail-row strong { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
        .ntf-detail-row code { font-size: 0.75rem; color: var(--text-tertiary); font-family: monospace; }

        .ntf-detail-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 10px 14px;
          margin-top: 12px;
          color: #dc2626;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .ntf-detail-divider {
          height: 1px;
          background: var(--bg-muted);
          margin: 12px 0;
        }

        .ntf-detail-message {
          margin-top: 8px;
        }

        .ntf-detail-msg-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-quaternary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .ntf-detail-message p {
          font-size: 0.875rem;
          color: var(--text-primary);
          line-height: 1.6;
          margin: 8px 0 0;
          background: var(--bg-subtle);
          border-radius: 10px;
          padding: 14px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }

        @media (max-width: 768px) {
          .ntf-info-bar { flex-direction: column; align-items: flex-start; }
          .ntf-table-toolbar { flex-direction: column; align-items: flex-start; }
          .ntf-channel-options { grid-template-columns: 1fr; }
          .ntf-search-box { width: 100%; }
          .ntf-table { display: block; overflow-x: auto; }
        }
      `}</style>
    </div>
  );
};

export default SendNotifications;
