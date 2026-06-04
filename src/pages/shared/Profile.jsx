import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Shield, Save, Edit3, CheckCircle, Eye, EyeOff } from 'lucide-react';

const DIAL_CODES = [
  { code: '+234', country: 'Nigeria' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+27', country: 'South Africa' },
  { code: '+233', country: 'Ghana' },
];

const Profile = () => {
  const location = useLocation();
  const role = location.pathname.split('/')[1];

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'David',
    lastName: 'Fayemi',
    email: 'david@invisitor.com',
    dialCode: '+234',
    phone: '814 609 2019',
    role: role.charAt(0).toUpperCase() + role.slice(1),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });

  const handleSave = () => {
    setProfile({ ...editForm });
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <p>Manage your personal information and account security settings.</p>
      </div>

      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="save-toast"
        >
          <CheckCircle size={18} /> Profile updated successfully!
        </motion.div>
      )}

      <div className="profile-grid">
        {/* Left: Avatar + Info */}
        <div className="profile-card avatar-card">
          <div className="avatar-wrapper">
            <img src={profile.avatar} alt={profile.firstName} className="profile-avatar" />
            <div className="role-pill">{profile.role}</div>
          </div>
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p className="profile-email">{profile.email}</p>
        </div>

        {/* Right: Form */}
        <div className="profile-card info-card">
          <div className="card-header">
            <div className="card-title-group">
              <User size={20} />
              <h3>Personal Information</h3>
            </div>
            {!isEditing ? (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                <Edit3 size={16} /> Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn-cancel" onClick={() => { setIsEditing(false); setEditForm({ ...profile }); }}>Cancel</button>
                <button className="btn-save" onClick={handleSave}><Save size={16} /> Save</button>
              </div>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              {isEditing ? (
                <input value={editForm.firstName} onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} />
              ) : <p className="field-value">{profile.firstName}</p>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              {isEditing ? (
                <input value={editForm.lastName} onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} />
              ) : <p className="field-value">{profile.lastName}</p>}
            </div>
            <div className="form-group">
              <label>Email Address</label>
              {isEditing ? (
                <div className="input-icon"><Mail size={16} /><input value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></div>
              ) : <p className="field-value">{profile.email}</p>}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              {isEditing ? (
                <div className="phone-input-group">
                  <select value={editForm.dialCode} onChange={e => setEditForm({ ...editForm, dialCode: e.target.value })}>
                    {DIAL_CODES.map(d => <option key={d.code} value={d.code}>{d.code} ({d.country})</option>)}
                  </select>
                  <input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} />
                </div>
              ) : <p className="field-value">{profile.dialCode} {profile.phone}</p>}
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="profile-card security-card">
          <div className="card-header">
            <div className="card-title-group">
              <Lock size={20} />
              <h3>Change Password</h3>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Current Password</label>
              <div className="input-icon">
                <Lock size={16} />
                <input type={showCurrentPw ? 'text' : 'password'} value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} placeholder="Enter current password" />
                <button className="btn-eye" onClick={() => setShowCurrentPw(!showCurrentPw)}>{showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <div className="input-icon">
                <Lock size={16} />
                <input type={showNewPw ? 'text' : 'password'} value={pwForm.newPw} onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })} placeholder="Enter new password" />
                <button className="btn-eye" onClick={() => setShowNewPw(!showNewPw)}>{showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="input-icon">
                <Lock size={16} />
                <input type="password" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} placeholder="Confirm new password" />
              </div>
            </div>
          </div>
          <button className="btn-update-pw">Update Password</button>
        </div>

        {/* 2FA */}
        <div className="profile-card twofa-card">
          <div className="card-header">
            <div className="card-title-group">
              <Shield size={20} />
              <h3>Two-Factor Authentication</h3>
            </div>
            <div className={`toggle-switch ${twoFAEnabled ? 'on' : ''}`} onClick={() => setTwoFAEnabled(!twoFAEnabled)}>
              <div className="toggle-thumb" />
            </div>
          </div>
          <p className="twofa-desc">
            {twoFAEnabled
              ? 'Two-factor authentication is enabled. Your account has an extra layer of security.'
              : 'Enable 2FA to add an extra layer of security. You will be required to verify your identity when logging in.'}
          </p>
        </div>
      </div>

      <style jsx="true">{`
        .profile-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .profile-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--bg-brand);
          margin-bottom: 0.25rem;
        }
        .profile-header p { color: var(--text-tertiary); font-size: 0.9375rem; }

        .save-toast {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: var(--text-success);
          padding: 0.875rem 1.25rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          grid-template-rows: auto auto;
          gap: 1.5rem;
        }

        .avatar-card {
          grid-row: span 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-align: center;
          padding: 2.5rem 1.5rem;
        }

        .profile-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .avatar-wrapper { position: relative; }
        .profile-avatar { width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--bg-surface); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .role-pill { position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); background: var(--bg-brand); color: var(--text-inverse); padding: 3px 14px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; white-space: nowrap; }
        .avatar-card h2 { font-size: 1.25rem; font-weight: 800; color: var(--bg-brand); margin-top: 0.5rem; }
        .profile-email { font-size: 0.875rem; color: var(--text-tertiary); }

        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem; }
        .card-title-group { display: flex; align-items: center; gap: 0.75rem; color: var(--bg-brand); }
        .card-title-group h3 { font-size: 1rem; font-weight: 800; margin: 0; }

        .btn-edit { background: var(--bg-muted); border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.8125rem; color: var(--bg-brand); cursor: pointer; display: flex; align-items: center; gap: 0.4rem; }
        .edit-actions { display: flex; gap: 0.75rem; }
        .btn-cancel { background: var(--bg-surface); border: 1.5px solid var(--border-default); padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; color: var(--text-tertiary); cursor: pointer; }
        .btn-save { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
        .full-width { grid-column: span 2; }

        label { font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.03em; }
        .field-value { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin: 0; }

        input, select {
          width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border-default);
          border-radius: 10px; font-size: 0.875rem; color: var(--text-primary);
          outline: none; transition: border-color 0.2s; box-sizing: border-box;
        }
        input:focus, select:focus { border-color: var(--bg-brand); }

        .input-icon { position: relative; display: flex; align-items: center; }
        .input-icon svg:first-child { position: absolute; left: 0.875rem; color: var(--text-quaternary); pointer-events: none; }
        .input-icon input { padding-left: 2.5rem; padding-right: 2.5rem; }
        .btn-eye { position: absolute; right: 0.875rem; background: none; border: none; cursor: pointer; color: var(--text-quaternary); display: flex; align-items: center; padding: 0; }

        .phone-input-group { display: flex; gap: 0.5rem; }
        .phone-input-group select { width: 160px; flex-shrink: 0; }

        .btn-update-pw { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.875rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; margin-top: 1rem; }

        .twofa-desc { font-size: 0.875rem; color: var(--text-tertiary); line-height: 1.6; margin: 0; }

        .toggle-switch { width: 48px; height: 26px; background: var(--border-default); border-radius: 999px; cursor: pointer; position: relative; transition: background 0.25s; flex-shrink: 0; }
        .toggle-switch.on { background: var(--text-success); }
        .toggle-thumb { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; background: var(--bg-surface); border-radius: 50%; transition: transform 0.25s; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
        .toggle-switch.on .toggle-thumb { transform: translateX(22px); }

        @media (max-width: 1024px) {
          .profile-grid { grid-template-columns: 1fr; }
          .avatar-card { grid-row: span 1; }
        }

        @media (max-width: 768px) {
          .profile-page { padding: 1rem 0; }
          .profile-header h1 { font-size: 1.4rem; }
          .form-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .edit-actions { flex-direction: column; }
          .btn-save, .btn-cancel { width: 100%; justify-content: center; }
          .phone-input-group { flex-direction: column; }
          .phone-input-group select { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
