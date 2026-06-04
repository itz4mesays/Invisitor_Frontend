import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Lock, Bell, Shield, Key, UserX, Camera, Check, X,
  Eye, EyeOff, Smartphone, Mail, AlertTriangle, Copy, RefreshCw,
  CheckCircle, MessageSquare, Volume2, MonitorSmartphone, Globe,
  BellOff, BellRing, Moon, Sun
} from 'lucide-react';

/* ─── Mock Admin Profile Data ─────────────────────────────── */
const ADMIN_PROFILE = {
  name: 'David Fayemi',
  email: 'david@invisitor.com',
  phone: '+234 801 234 5678',
  role: 'Super Administrator',
  department: 'Platform Engineering',
  timezone: 'Africa/Lagos (WAT, UTC+1)',
  language: 'English (Nigeria)',
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`,
  lastLogin: 'Today, 10:30 AM from Lagos, NG',
  joinedDate: 'March 12, 2023',
};

/* ─── Password Strength Helper ─────────────────────────────── */
const getPasswordStrength = (pwd) => {
  if (!pwd) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 2) return { score, label: 'Weak', color: '#ef4444' };
  if (score === 3) return { score, label: 'Fair', color: '#f59e0b' };
  if (score === 4) return { score, label: 'Good', color: '#3b82f6' };
  return { score, label: 'Strong', color: '#10b981' };
};

/* ─── 2FA Mock TOTP Secret ─────────────────────────────────── */
const TOTP_SECRET = 'JBSWY3DPEHPK3PXP';

/* ─── Notification Category Config ────────────────────────── */
const NOTIF_CATEGORIES = [
  {
    group: 'Platform Alerts',
    icon: <MonitorSmartphone size={18} />,
    items: [
      { id: 'new_host', label: 'New Host Registration', desc: 'When a new host signs up on the platform.' },
      { id: 'new_manager', label: 'New Estate Manager Added', desc: 'When a new estate manager account is created.' },
      { id: 'subscription_change', label: 'Subscription Changes', desc: 'When a host upgrades, downgrades, or cancels.' },
      { id: 'system_alert', label: 'System Alerts', desc: 'Critical platform errors or downtime warnings.' },
    ],
  },
  {
    group: 'Financial',
    icon: <Bell size={18} />,
    items: [
      { id: 'invoice_created', label: 'Invoice Created', desc: 'When a new invoice is generated in the system.' },
      { id: 'payment_received', label: 'Payment Received', desc: 'When a payment is successfully recorded.' },
      { id: 'overdue_invoice', label: 'Overdue Invoice Alerts', desc: 'When an invoice passes its due date unpaid.' },
    ],
  },
  {
    group: 'Security',
    icon: <Shield size={18} />,
    items: [
      { id: 'login_new_device', label: 'New Device Login', desc: 'When your account is accessed from an unrecognised device.' },
      { id: 'password_changed', label: 'Password Changes', desc: 'When the account password is updated.' },
      { id: 'failed_logins', label: 'Repeated Failed Login Attempts', desc: 'When 5+ consecutive login failures occur.' },
    ],
  },
  {
    group: 'Support & Tickets',
    icon: <MessageSquare size={18} />,
    items: [
      { id: 'new_ticket', label: 'New Support Ticket', desc: 'When a user submits a new support ticket.' },
      { id: 'ticket_reply', label: 'Ticket Replies', desc: 'When a user replies to an open ticket.' },
      { id: 'ticket_resolved', label: 'Ticket Resolved', desc: 'When a support ticket is marked as resolved.' },
    ],
  },
];

const DELIVERY_CHANNELS = [
  { id: 'email', label: 'Email', icon: <Mail size={16} /> },
  { id: 'sms', label: 'SMS', icon: <Smartphone size={16} /> },
  { id: 'in_app', label: 'In-App', icon: <BellRing size={16} /> },
];

/* ─── Main Component ───────────────────────────────────────── */
const Settings = () => {
  const location = useLocation();
  const role = location.pathname.split('/')[1];

  const tabs =
    role === 'resident'
      ? [
          { id: 'security', label: 'Change Password', icon: <Key size={18} /> },
          { id: '2fa', label: 'Setup 2FA', icon: <Shield size={18} /> },
          { id: 'deactivate', label: 'Deactivate Account', icon: <UserX size={18} /> },
        ]
      : [
          { id: 'profile', label: 'Profile Options', icon: <User size={18} /> },
          { id: 'security', label: 'Security', icon: <Lock size={18} /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  /* Profile state */
  const [profile, setProfile] = useState({ ...ADMIN_PROFILE });
  const [profileSaved, setProfileSaved] = useState(false);
  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  /* Password state */
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, newPwd: false, confirm: false });
  const [pwdSaved, setPwdSaved] = useState(false);
  const strength = getPasswordStrength(pwdForm.newPwd);
  const pwdMatch = pwdForm.newPwd && pwdForm.confirm && pwdForm.newPwd === pwdForm.confirm;
  const pwdMismatch = pwdForm.confirm && pwdForm.newPwd !== pwdForm.confirm;
  const handlePwdSubmit = (e) => {
    e.preventDefault();
    if (!pwdMatch || !pwdForm.current) return;
    setPwdSaved(true);
    setPwdForm({ current: '', newPwd: '', confirm: '' });
    setTimeout(() => setPwdSaved(false), 3500);
  };

  /* 2FA state */
  const [twoFAStep, setTwoFAStep] = useState('idle'); // idle | setup | verify | done
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [secretCopied, setSecretCopied] = useState(false);
  const handleCopySecret = () => {
    navigator.clipboard.writeText(TOTP_SECRET);
    setSecretCopied(true);
    setTimeout(() => setSecretCopied(false), 2000);
  };
  const handleVerifyOTP = () => {
    // Mock: accept any 6-digit code
    if (/^\d{6}$/.test(otpInput)) {
      setTwoFAEnabled(true);
      setTwoFAStep('done');
      setOtpInput('');
      setOtpError('');
    } else {
      setOtpError('Invalid code. Please enter the 6-digit code from your authenticator app.');
    }
  };
  const handleDisable2FA = () => {
    if (window.confirm('Are you sure you want to disable Two-Factor Authentication? Your account will be less secure.')) {
      setTwoFAEnabled(false);
      setTwoFAStep('idle');
    }
  };

  /* Notifications state */
  const buildDefaultNotifState = () => {
    const state = {};
    NOTIF_CATEGORIES.forEach(cat =>
      cat.items.forEach(item => {
        state[item.id] = { email: true, sms: false, in_app: true };
      })
    );
    return state;
  };
  const [notifSettings, setNotifSettings] = useState(buildDefaultNotifState());
  const [quietHours, setQuietHours] = useState({ enabled: false, from: '22:00', to: '07:00' });
  const [notifSaved, setNotifSaved] = useState(false);
  const toggleNotif = (itemId, channel) => {
    setNotifSettings(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], [channel]: !prev[itemId][channel] }
    }));
  };
  const handleNotifSave = () => {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 3000);
  };

  /* Deactivate (resident only) */
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canConfirmDelete = deleteInput === 'delete-me' && deletePassword.length >= 6;
  const handleDeactivate = () => {
    if (!canConfirmDelete) return;
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeactivateModal(false);
      setDeleteInput(''); setDeletePassword('');
      alert('Account deactivated. You will be redirected to the login page.');
    }, 1500);
  };

  /* ─── Tab Content ──────────────────────────────────────────── */
  const renderProfile = () => (
    <div className="set-card">
      <h2>Profile Information</h2>
      <p>Update your personal details and how they appear across the platform.</p>

      {/* Avatar */}
      <div className="profile-avatar-row">
        <div className="profile-avatar-wrap">
          <img src={profile.avatar} alt="avatar" className="profile-avatar" />
          <button className="profile-avatar-edit">
            <Camera size={16} />
          </button>
        </div>
        <div>
          <div className="profile-avatar-name">{profile.name}</div>
          <div className="profile-avatar-role">{profile.role}</div>
          <div className="profile-last-login">Last login: {profile.lastLogin}</div>
        </div>
      </div>

      <form className="profile-form" onSubmit={handleProfileSave}>
        <div className="profile-form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
          </div>
        </div>
        <div className="profile-form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" value={profile.department} onChange={e => setProfile(p => ({ ...p, department: e.target.value }))} />
          </div>
        </div>
        <div className="profile-form-row">
          <div className="form-group">
            <label>Timezone</label>
            <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}>
              <option>Africa/Lagos (WAT, UTC+1)</option>
              <option>Africa/Accra (GMT, UTC+0)</option>
              <option>Europe/London (GMT/BST)</option>
              <option>America/New_York (EST/EDT)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select value={profile.language} onChange={e => setProfile(p => ({ ...p, language: e.target.value }))}>
              <option>English (Nigeria)</option>
              <option>English (United Kingdom)</option>
              <option>English (United States)</option>
            </select>
          </div>
        </div>

        <div className="profile-meta-row">
          <div className="profile-meta-item">
            <span className="profile-meta-label">Role</span>
            <span className="profile-meta-value badge-role">{profile.role}</span>
          </div>
          <div className="profile-meta-item">
            <span className="profile-meta-label">Member Since</span>
            <span className="profile-meta-value">{profile.joinedDate}</span>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            {profileSaved ? <><Check size={16} /> Saved!</> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderSecurity = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Change Password */}
      <div className="set-card">
        <h2>Change Password</h2>
        <p>Ensure your account uses a strong, unique password that you don't use elsewhere.</p>

        {pwdSaved && (
          <div className="success-banner">
            <CheckCircle size={18} /> Password updated successfully.
          </div>
        )}

        <form className="set-form" onSubmit={handlePwdSubmit}>
          {/* Current */}
          <div className="form-group">
            <label>Current Password</label>
            <div className="pwd-input-wrap">
              <input
                type={showPwd.current ? 'text' : 'password'}
                placeholder="Enter current password"
                value={pwdForm.current}
                onChange={e => setPwdForm(p => ({ ...p, current: e.target.value }))}
              />
              <button type="button" className="pwd-eye" onClick={() => setShowPwd(p => ({ ...p, current: !p.current }))}>
                {showPwd.current ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {/* New */}
          <div className="form-group">
            <label>New Password</label>
            <div className="pwd-input-wrap">
              <input
                type={showPwd.newPwd ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={pwdForm.newPwd}
                onChange={e => setPwdForm(p => ({ ...p, newPwd: e.target.value }))}
              />
              <button type="button" className="pwd-eye" onClick={() => setShowPwd(p => ({ ...p, newPwd: !p.newPwd }))}>
                {showPwd.newPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {pwdForm.newPwd && (
              <div className="strength-bar-wrap">
                <div className="strength-bar">
                  {[1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className="strength-segment"
                      style={{ background: i <= strength.score ? strength.color : 'var(--bg-muted)' }}
                    />
                  ))}
                </div>
                <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>
              </div>
            )}
          </div>
          {/* Confirm */}
          <div className="form-group">
            <label>Confirm New Password</label>
            <div className="pwd-input-wrap">
              <input
                type={showPwd.confirm ? 'text' : 'password'}
                placeholder="Repeat new password"
                value={pwdForm.confirm}
                onChange={e => setPwdForm(p => ({ ...p, confirm: e.target.value }))}
                style={{ borderColor: pwdMismatch ? '#ef4444' : pwdMatch ? '#10b981' : undefined }}
              />
              <button type="button" className="pwd-eye" onClick={() => setShowPwd(p => ({ ...p, confirm: !p.confirm }))}>
                {showPwd.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {pwdMatch && <Check size={16} style={{ position:'absolute', right:'2.75rem', top:'50%', transform:'translateY(-50%)', color:'#10b981' }} />}
            </div>
            {pwdMismatch && <span className="pwd-error">Passwords do not match.</span>}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={!pwdMatch || !pwdForm.current || strength.score < 2}>
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* 2FA */}
      <div className="set-card">
        <div className="two-fa-header-row">
          <div>
            <h2>Two-Factor Authentication</h2>
            <p style={{ marginBottom: 0 }}>Add an extra layer of security by requiring a one-time code at login.</p>
          </div>
          <span className={`tfa-status-badge ${twoFAEnabled ? 'enabled' : 'disabled'}`}>
            {twoFAEnabled ? <><Check size={14}/> Enabled</> : <><X size={14}/> Disabled</>}
          </span>
        </div>

        {twoFAStep === 'idle' && !twoFAEnabled && (
          <div className="two-fa-box" style={{ marginTop: '1.5rem' }}>
            <div className="two-fa-icon"><Smartphone size={28} /></div>
            <div style={{ flex: 1 }}>
              <h3>Authenticator App</h3>
              <p>Use an app like Google Authenticator, Authy, or 1Password to generate time-based one-time codes.</p>
            </div>
            <button className="btn-setup" onClick={() => setTwoFAStep('setup')}>Setup Now</button>
          </div>
        )}

        {twoFAStep === 'setup' && (
          <div className="tfa-setup-flow" style={{ marginTop: '1.5rem' }}>
            <div className="tfa-step-card">
              <div className="tfa-step-num">1</div>
              <div>
                <h4>Install an Authenticator App</h4>
                <p>Download <strong>Google Authenticator</strong>, <strong>Authy</strong>, or any TOTP-compatible app on your phone.</p>
              </div>
            </div>
            <div className="tfa-step-card">
              <div className="tfa-step-num">2</div>
              <div>
                <h4>Scan the QR Code or Enter the Key</h4>
                <p>Use your authenticator app to scan the QR code below, or manually enter the secret key.</p>
                <div className="tfa-qr-placeholder">
                  <div className="tfa-qr-inner">
                    {/* Simulated QR code visual */}
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ display:'block' }}>
                      {[...Array(12)].map((_, r) =>
                        [...Array(12)].map((__, c) => {
                          const on = (r + c + r * c) % 3 !== 0;
                          return on ? <rect key={`${r}-${c}`} x={c*10} y={r*10} width={9} height={9} fill="var(--text-primary)" rx={1} /> : null;
                        })
                      )}
                      <rect x="0" y="0" width="30" height="30" fill="none" stroke="var(--text-primary)" strokeWidth="3" rx="4"/>
                      <rect x="90" y="0" width="30" height="30" fill="none" stroke="var(--text-primary)" strokeWidth="3" rx="4"/>
                      <rect x="0" y="90" width="30" height="30" fill="none" stroke="var(--text-primary)" strokeWidth="3" rx="4"/>
                      <rect x="5" y="5" width="20" height="20" fill="var(--text-primary)" rx="2"/>
                      <rect x="95" y="5" width="20" height="20" fill="var(--text-primary)" rx="2"/>
                      <rect x="5" y="95" width="20" height="20" fill="var(--text-primary)" rx="2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="tfa-secret-label">Secret Key</div>
                    <div className="tfa-secret-box">
                      <code>{TOTP_SECRET}</code>
                      <button className="tfa-copy-btn" onClick={handleCopySecret}>
                        {secretCopied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tfa-step-card">
              <div className="tfa-step-num">3</div>
              <div style={{ width: '100%' }}>
                <h4>Enter Verification Code</h4>
                <p>Enter the 6-digit code generated by your authenticator app to complete setup.</p>
                <div className="tfa-otp-row">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    className="tfa-otp-input"
                    value={otpInput}
                    onChange={e => { setOtpInput(e.target.value.replace(/\D/g,'')); setOtpError(''); }}
                  />
                  <button className="btn-save" onClick={handleVerifyOTP} disabled={otpInput.length !== 6}>Verify & Enable</button>
                </div>
                {otpError && <p className="pwd-error">{otpError}</p>}
              </div>
            </div>
            <button className="btn-outline-subtle" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} onClick={() => { setTwoFAStep('idle'); setOtpInput(''); setOtpError(''); }}>
              Cancel
            </button>
          </div>
        )}

        {(twoFAStep === 'done' || twoFAEnabled) && (
          <div className="tfa-enabled-card" style={{ marginTop: '1.5rem' }}>
            <div className="tfa-enabled-icon"><CheckCircle size={32} /></div>
            <div>
              <h4>2FA is Active</h4>
              <p>Your account is protected with two-factor authentication. You'll be asked for a code each time you log in.</p>
            </div>
            <button className="btn-danger-outline" onClick={handleDisable2FA}>Disable 2FA</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Quiet Hours */}
      <div className="set-card">
        <div className="notif-section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Moon size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 className="notif-group-title" style={{ marginBottom: '0.15rem' }}>Quiet Hours</h3>
              <p className="notif-group-desc">Suppress all notifications during these hours.</p>
            </div>
          </div>
          <button
            className={`notif-master-toggle ${quietHours.enabled ? 'on' : 'off'}`}
            onClick={() => setQuietHours(q => ({ ...q, enabled: !q.enabled }))}
          >
            <span className="toggle-knob" />
          </button>
        </div>
        {quietHours.enabled && (
          <div className="quiet-hours-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>From</label>
              <input type="time" value={quietHours.from} onChange={e => setQuietHours(q => ({ ...q, from: e.target.value }))} />
            </div>
            <div className="quiet-to-label">to</div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Until</label>
              <input type="time" value={quietHours.to} onChange={e => setQuietHours(q => ({ ...q, to: e.target.value }))} />
            </div>
          </div>
        )}
      </div>

      {/* Channel Legend */}
      <div className="notif-legend-row">
        {DELIVERY_CHANNELS.map(ch => (
          <div key={ch.id} className="notif-legend-item">
            <span className="notif-ch-icon">{ch.icon}</span> {ch.label}
          </div>
        ))}
      </div>

      {/* Per-Category Matrix */}
      {NOTIF_CATEGORIES.map(cat => (
        <div className="set-card" key={cat.group} style={{ padding: 0, overflow: 'hidden' }}>
          <div className="notif-cat-header">
            <span className="notif-cat-icon">{cat.icon}</span>
            <h3>{cat.group}</h3>
          </div>
          <table className="notif-matrix">
            <thead>
              <tr>
                <th className="notif-th-label">Notification</th>
                {DELIVERY_CHANNELS.map(ch => (
                  <th key={ch.id} className="notif-th-channel">
                    <span className="notif-ch-icon">{ch.icon}</span>
                    <span className="notif-ch-label">{ch.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cat.items.map(item => (
                <tr key={item.id} className="notif-row">
                  <td className="notif-td-label">
                    <div className="notif-item-name">{item.label}</div>
                    <div className="notif-item-desc">{item.desc}</div>
                  </td>
                  {DELIVERY_CHANNELS.map(ch => (
                    <td key={ch.id} className="notif-td-channel">
                      <button
                        className={`notif-toggle-btn ${notifSettings[item.id]?.[ch.id] ? 'on' : 'off'}`}
                        onClick={() => toggleNotif(item.id, ch.id)}
                      >
                        <span className="toggle-knob" />
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="form-actions">
        <button className="btn-save" onClick={handleNotifSave}>
          {notifSaved ? <><Check size={16} /> Saved!</> : 'Save Preferences'}
        </button>
      </div>
    </div>
  );

  const renderResidentContent = () => {
    switch(activeTab) {
      case 'security': return (
        <div className="set-card">
          <h2>Change Password</h2>
          <p>Ensure your account is using a long, random password to stay secure.</p>
          <div className="set-form">
            <div className="form-group"><label>Current Password</label><input type="password" placeholder="••••••••" /></div>
            <div className="form-group"><label>New Password</label><input type="password" placeholder="••••••••" /></div>
            <div className="form-group"><label>Confirm New Password</label><input type="password" placeholder="••••••••" /></div>
            <button className="btn-save">Update Password</button>
          </div>
        </div>
      );
      case '2fa': return (
        <div className="set-card">
          <h2>Two-Factor Authentication</h2>
          <p>Add an extra layer of security to your account.</p>
          <div className="two-fa-box">
            <div className="two-fa-icon"><Shield size={32} /></div>
            <div style={{ flex: 1 }}>
              <h3>Authenticator App</h3>
              <p>Use an authenticator app (like Google Authenticator) to generate one-time security codes.</p>
            </div>
            <button className="btn-setup">Setup</button>
          </div>
        </div>
      );
      case 'deactivate': return (
        <div className="set-card danger-zone">
          <h2 style={{ color: 'var(--text-danger)' }}>Deactivate Account</h2>
          <p>Once you deactivate your account, there is no going back. Please be certain.</p>
          <div className="danger-box">
            <p>Deactivating your account will immediately revoke your access to the estate portal.</p>
            <button className="btn-danger" onClick={() => setShowDeactivateModal(true)}>Deactivate My Account</button>
          </div>
        </div>
      );
      default: return null;
    }
  };

  const renderContent = () => {
    if (role === 'resident') return renderResidentContent();
    switch(activeTab) {
      case 'profile': return renderProfile();
      case 'security': return renderSecurity();
      case 'notifications': return renderNotifications();
      default: return null;
    }
  };

  return (
    <div className="set-page">
      <div className="set-header">
        <h1>Settings</h1>
        <p>Manage your account, security, and notification preferences.</p>
      </div>

      <div className="set-layout">
        <aside className="set-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`set-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="set-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </aside>

        <main className="set-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Deactivate Modal */}
      <AnimatePresence>
        {showDeactivateModal && (
          <motion.div
            className="deact-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowDeactivateModal(false); setDeleteInput(''); setDeletePassword(''); }}
          >
            <motion.div
              className="deact-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="deact-icon-ring"><UserX size={36} /></div>
              <h2 className="deact-title">Deactivate Account?</h2>
              <p className="deact-body">This action is <strong>irreversible</strong>. Your access to the estate portal will be immediately revoked.</p>
              <p className="deact-body">To confirm, type <strong className="deact-code">delete-me</strong> below and enter your current password.</p>
              <div className="deact-form">
                <div className="deact-field">
                  <label>Type "delete-me" to confirm</label>
                  <input type="text" placeholder="delete-me" value={deleteInput} onChange={e => setDeleteInput(e.target.value)} className={deleteInput && deleteInput !== 'delete-me' ? 'deact-input-error' : ''} autoComplete="off" />
                  {deleteInput && deleteInput !== 'delete-me' && <span className="deact-hint-error">Must match exactly: delete-me</span>}
                </div>
                <div className="deact-field">
                  <label>Your Password</label>
                  <input type="password" placeholder="Enter your password" value={deletePassword} onChange={e => setDeletePassword(e.target.value)} autoComplete="current-password" />
                </div>
              </div>
              <div className="deact-actions">
                <button className={`deact-confirm-btn ${canConfirmDelete ? 'enabled' : 'disabled'}`} onClick={handleDeactivate} disabled={!canConfirmDelete || isDeleting}>
                  {isDeleting ? 'Deactivating...' : 'Yes, Deactivate My Account'}
                </button>
                <button className="deact-cancel-btn" onClick={() => { setShowDeactivateModal(false); setDeleteInput(''); setDeletePassword(''); }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Page Shell ── */
        .set-page { padding-bottom: 3rem; max-width: 1100px; }
        .set-header { margin-bottom: 2rem; }
        .set-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .set-header p { color: var(--text-tertiary); }
        .set-layout { display: flex; gap: 2.5rem; align-items: flex-start; }
        .set-sidebar { width: 230px; flex-shrink: 0; display: flex; flex-direction: column; gap: 0.25rem; position: sticky; top: 1rem; }
        .set-tab { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; border: none; background: transparent; color: var(--text-tertiary); font-weight: 600; font-size: 0.95rem; text-align: left; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
        .set-tab:hover { background: var(--bg-muted); color: var(--text-primary); }
        .set-tab.active { background: var(--bg-brand); color: var(--text-inverse); font-weight: 700; }
        .set-tab-icon { display: flex; align-items: center; }
        .set-content { flex: 1; min-width: 0; }
        .set-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 2rem; }
        .set-card h2 { font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.35rem; }
        .set-card p { color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.6; }
        .set-form { display: flex; flex-direction: column; gap: 1.25rem; max-width: 460px; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
        .form-group input, .form-group select { padding: 0.75rem 1rem; border: 1.5px solid var(--border-heavy); border-radius: 10px; font-size: 0.95rem; color: var(--text-primary); background: var(--bg-surface); transition: border-color 0.2s, box-shadow 0.2s; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(0,163,255,0.12); }
        .form-actions { display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; }
        .btn-save { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: opacity 0.2s, transform 0.1s; width: fit-content; }
        .btn-save:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Profile ── */
        .profile-avatar-row { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; background: var(--bg-subtle); border-radius: 14px; border: 1px solid var(--border-default); margin-bottom: 2rem; }
        .profile-avatar-wrap { position: relative; flex-shrink: 0; }
        .profile-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--border-default); }
        .profile-avatar-edit { position: absolute; bottom: 0; right: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--bg-brand); color: var(--text-inverse); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .profile-avatar-name { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.15rem; }
        .profile-avatar-role { font-size: 0.8rem; font-weight: 600; color: var(--accent-primary); background: rgba(0,163,255,0.1); padding: 2px 10px; border-radius: 20px; display: inline-block; margin-bottom: 0.4rem; }
        .profile-last-login { font-size: 0.78rem; color: var(--text-quaternary); }
        .profile-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .profile-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .profile-meta-row { display: flex; gap: 2rem; padding: 1.25rem; background: var(--bg-subtle); border-radius: 10px; border: 1px solid var(--border-default); margin-top: 0.5rem; }
        .profile-meta-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .profile-meta-label { font-size: 0.75rem; font-weight: 600; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.04em; }
        .profile-meta-value { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
        .badge-role { background: rgba(0,163,255,0.1); color: var(--accent-primary); padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem !important; }

        /* ── Password ── */
        .pwd-input-wrap { position: relative; }
        .pwd-input-wrap input { width: 100%; padding-right: 3rem; }
        .pwd-eye { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: 0.25rem; display: flex; }
        .strength-bar-wrap { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; }
        .strength-bar { display: flex; gap: 4px; flex: 1; }
        .strength-segment { height: 5px; flex: 1; border-radius: 99px; transition: background 0.3s; }
        .strength-label { font-size: 0.78rem; font-weight: 700; white-space: nowrap; }
        .pwd-error { font-size: 0.78rem; color: var(--text-danger); margin-top: 0.35rem; display: block; }
        .success-banner { display: flex; align-items: center; gap: 0.75rem; background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; border-radius: 10px; padding: 0.875rem 1rem; font-weight: 600; font-size: 0.9rem; margin-bottom: 1.5rem; }

        /* ── 2FA ── */
        .two-fa-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0; gap: 1rem; }
        .tfa-status-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.875rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 0.25rem; }
        .tfa-status-badge.enabled { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
        .tfa-status-badge.disabled { background: var(--bg-subtle); color: var(--text-quaternary); border: 1px solid var(--border-default); }
        .two-fa-box { display: flex; align-items: center; gap: 1.5rem; border: 1px solid var(--border-default); padding: 1.5rem; border-radius: 12px; }
        .two-fa-icon { width: 64px; height: 64px; background: rgba(0,163,255,0.08); color: var(--accent-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .two-fa-box h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        .two-fa-box p { margin: 0; font-size: 0.875rem; color: var(--text-tertiary); line-height: 1.5; }
        .btn-setup { background: var(--bg-surface); border: 1.5px solid var(--border-heavy); color: var(--bg-brand); font-weight: 700; font-size: 0.9rem; padding: 0.65rem 1.25rem; border-radius: 9px; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
        .btn-setup:hover { background: var(--bg-subtle); }
        .tfa-setup-flow { display: flex; flex-direction: column; gap: 1.25rem; }
        .tfa-step-card { display: flex; gap: 1.25rem; align-items: flex-start; }
        .tfa-step-num { width: 32px; height: 32px; border-radius: 50%; background: var(--bg-brand); color: var(--text-inverse); font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.15rem; }
        .tfa-step-card h4 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem; }
        .tfa-step-card p { font-size: 0.875rem; color: var(--text-tertiary); margin-bottom: 0.75rem; line-height: 1.55; }
        .tfa-qr-placeholder { display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; }
        .tfa-qr-inner { width: 130px; height: 130px; border: 2px solid var(--border-default); border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--bg-surface); padding: 5px; }
        .tfa-secret-label { font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .tfa-secret-box { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-subtle); border: 1px solid var(--border-default); border-radius: 8px; padding: 0.75rem 1rem; }
        .tfa-secret-box code { font-family: monospace; font-size: 1rem; font-weight: 700; color: var(--text-primary); letter-spacing: 0.12em; }
        .tfa-copy-btn { background: none; border: none; cursor: pointer; color: var(--text-tertiary); display: flex; padding: 0; }
        .tfa-copy-btn:hover { color: var(--text-primary); }
        .tfa-otp-row { display: flex; gap: 1rem; align-items: center; }
        .tfa-otp-input { padding: 0.75rem 1rem; border: 1.5px solid var(--border-heavy); border-radius: 10px; font-size: 1.5rem; letter-spacing: 0.3em; font-weight: 700; text-align: center; width: 180px; color: var(--text-primary); background: var(--bg-surface); outline: none; transition: border-color 0.2s; }
        .tfa-otp-input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(0,163,255,0.12); }
        .tfa-enabled-card { display: flex; align-items: center; gap: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; padding: 1.5rem; }
        .tfa-enabled-icon { color: #10b981; flex-shrink: 0; }
        .tfa-enabled-card h4 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .tfa-enabled-card p { font-size: 0.875rem; color: var(--text-tertiary); margin: 0; line-height: 1.5; }
        .btn-danger-outline { background: none; border: 1.5px solid var(--text-danger); color: var(--text-danger); font-weight: 700; font-size: 0.875rem; padding: 0.6rem 1.1rem; border-radius: 9px; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: background 0.2s; }
        .btn-danger-outline:hover { background: var(--bg-danger-subtle); }
        .btn-outline-subtle { background: none; border: 1.5px solid var(--border-default); color: var(--text-secondary); font-weight: 600; font-size: 0.875rem; padding: 0.6rem 1.1rem; border-radius: 9px; cursor: pointer; transition: background 0.2s; }
        .btn-outline-subtle:hover { background: var(--bg-subtle); }

        /* ── Notifications ── */
        .notif-section-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .notif-group-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
        .notif-group-desc { font-size: 0.82rem; color: var(--text-quaternary); }
        .quiet-hours-row { display: flex; align-items: flex-end; gap: 1rem; margin-top: 1.25rem; }
        .quiet-to-label { font-weight: 700; color: var(--text-secondary); padding-bottom: 0.75rem; }
        .notif-legend-row { display: flex; gap: 1.5rem; align-items: center; padding: 0 0.25rem; }
        .notif-legend-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; font-weight: 600; color: var(--text-tertiary); }
        .notif-ch-icon { display: flex; align-items: center; color: var(--text-tertiary); }
        .notif-cat-header { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-default); background: var(--bg-subtle); }
        .notif-cat-header h3 { font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0; }
        .notif-cat-icon { color: var(--accent-primary); display: flex; }
        .notif-matrix { width: 100%; border-collapse: collapse; }
        .notif-th-label { padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-default); }
        .notif-th-channel { padding: 0.75rem 1rem; text-align: center; font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); border-bottom: 1px solid var(--border-default); width: 100px; }
        .notif-th-channel { display: table-cell; }
        .notif-th-channel { flex-direction: column; align-items: center; gap: 0.25rem; }
        .notif-ch-label { display: block; font-size: 0.7rem; }
        .notif-row { transition: background 0.15s; }
        .notif-row:hover { background: var(--bg-subtle); }
        .notif-row:not(:last-child) td { border-bottom: 1px solid var(--border-default); }
        .notif-td-label { padding: 1.1rem 1.5rem; }
        .notif-item-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.2rem; }
        .notif-item-desc { font-size: 0.78rem; color: var(--text-quaternary); line-height: 1.45; }
        .notif-td-channel { padding: 1rem; text-align: center; }

        /* Toggles */
        .notif-master-toggle, .notif-toggle-btn { position: relative; width: 44px; height: 24px; border-radius: 99px; border: none; cursor: pointer; transition: background 0.2s; flex-shrink: 0; padding: 0; }
        .notif-master-toggle.on, .notif-toggle-btn.on { background: var(--bg-brand); }
        .notif-master-toggle.off, .notif-toggle-btn.off { background: var(--border-heavy); }
        .toggle-knob { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        .notif-master-toggle.on .toggle-knob, .notif-toggle-btn.on .toggle-knob { transform: translateX(20px); }

        /* ── Danger Zone ── */
        .danger-zone { border-color: var(--text-danger); }
        .danger-box { display: flex; justify-content: space-between; align-items: center; gap: 1rem; border: 1px solid var(--text-danger); background: var(--bg-danger-subtle); padding: 1.5rem; border-radius: 12px; }
        .danger-box p { color: var(--text-danger); font-weight: 500; margin: 0; }
        .btn-danger { background: var(--text-danger); color: var(--text-inverse); border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; flex-shrink: 0; }
        .btn-danger:hover { opacity: 0.9; }

        /* Deactivate Modal */
        .deact-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .deact-modal { background: var(--bg-surface); border-radius: 24px; padding: 2.5rem; max-width: 460px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.15); text-align: center; }
        .deact-icon-ring { width: 80px; height: 80px; background: var(--bg-danger-subtle); border: 2px solid #fecaca; color: var(--text-danger); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .deact-title { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; }
        .deact-body { color: var(--text-tertiary); font-size: 0.9375rem; line-height: 1.6; margin-bottom: 0.75rem; text-align: left; }
        .deact-code { background: var(--bg-danger-subtle); color: var(--text-danger); padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 1rem; }
        .deact-form { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; text-align: left; }
        .deact-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .deact-field label { font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); }
        .deact-field input { padding: 0.75rem 1rem; border: 1.5px solid var(--border-heavy); border-radius: 10px; font-size: 0.9375rem; color: var(--text-primary); outline: none; transition: all 0.2s; }
        .deact-field input:focus { border-color: var(--text-danger); box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
        .deact-input-error { border-color: var(--text-danger) !important; }
        .deact-hint-error { font-size: 0.75rem; color: var(--text-danger); font-weight: 500; }
        .deact-actions { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem; }
        .deact-confirm-btn { width: 100%; padding: 0.875rem; border: none; border-radius: 12px; font-weight: 700; font-size: 0.9375rem; cursor: pointer; transition: all 0.2s; }
        .deact-confirm-btn.enabled { background: var(--text-danger); color: var(--text-inverse); }
        .deact-confirm-btn.enabled:hover { background: #dc2626; }
        .deact-confirm-btn.disabled { background: var(--bg-muted); color: var(--text-quaternary); cursor: not-allowed; }
        .deact-cancel-btn { width: 100%; padding: 0.875rem; background: var(--bg-surface); border: 1.5px solid var(--border-default); color: var(--text-primary); border-radius: 12px; font-weight: 700; font-size: 0.9375rem; cursor: pointer; }
        .deact-cancel-btn:hover { background: var(--bg-subtle); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .set-layout { flex-direction: column; }
          .set-sidebar { width: 100%; flex-direction: row; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 0.5rem; position: static; }
          .set-tab { white-space: nowrap; }
          .profile-form-row { grid-template-columns: 1fr; }
          .profile-avatar-row { flex-direction: column; text-align: center; align-items: center; }
          .profile-meta-row { flex-direction: column; gap: 1rem; }
          .two-fa-box { flex-direction: column; text-align: center; }
          .tfa-qr-placeholder { flex-direction: column; }
          .tfa-otp-row { flex-direction: column; align-items: flex-start; }
          .danger-box { flex-direction: column; align-items: flex-start; }
          .notif-matrix { font-size: 0.85rem; }
          .notif-td-label { padding: 0.875rem 1rem; }
          .quiet-hours-row { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default Settings;
