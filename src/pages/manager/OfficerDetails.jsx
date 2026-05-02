import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Shield, Mail, Phone, Clock, Key, Calendar } from 'lucide-react';

const OfficerDetails = () => {
  const { officerId } = useParams();
  const navigate = useNavigate();

  // Mock data fetching based on ID
  const officer = {
    id: officerId,
    name: 'James Wilson',
    email: 'james@estate.com',
    phone: '+234 801 234 5678',
    type: 'Security Officer',
    shift: 'Morning (6AM - 2PM)',
    badge: 'SEC001',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    joinedDate: 'Jan 15, 2026',
    idType: 'National ID',
    idNumber: '12345678901'
  };

  return (
    <div className="od-page">
      <div className="od-header">
        <button className="od-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Back
        </button>
        <div className="od-header-text">
          <h1>Officer Details</h1>
          <p>View full information about this officer.</p>
        </div>
        <button className="od-edit-btn">
          <Edit size={16} /> Edit Profile
        </button>
      </div>

      <div className="od-content-grid">
        <div className="od-profile-card">
          <div className="od-profile-header">
            <img src={officer.avatar} alt={officer.name} className="od-avatar" />
            <h2>{officer.name}</h2>
            <span className={`od-status ${officer.status}`}>
              {officer.status.toUpperCase()}
            </span>
          </div>

          <div className="od-quick-info">
            <div className="od-info-item">
              <Shield size={16} /> {officer.type}
            </div>
            <div className="od-info-item">
              <Key size={16} /> {officer.badge}
            </div>
          </div>
        </div>

        <div className="od-details-card">
          <h3>Personal Information</h3>
          <div className="od-details-grid">
            <div className="od-detail-field">
              <label>Email Address</label>
              <p><Mail size={16} /> {officer.email}</p>
            </div>
            <div className="od-detail-field">
              <label>Phone Number</label>
              <p><Phone size={16} /> {officer.phone}</p>
            </div>
            <div className="od-detail-field">
              <label>ID Document Type</label>
              <p>{officer.idType}</p>
            </div>
            <div className="od-detail-field">
              <label>ID Number</label>
              <p>{officer.idNumber}</p>
            </div>
          </div>

          <div className="od-divider" />

          <h3>Role & Shift</h3>
          <div className="od-details-grid">
            <div className="od-detail-field">
              <label>Assigned Shift</label>
              <p><Clock size={16} /> {officer.shift}</p>
            </div>
            <div className="od-detail-field">
              <label>Joined Date</label>
              <p><Calendar size={16} /> {officer.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .od-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .od-header { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.5rem; }
        .od-back-btn { background: white; border: 1px solid #e2e8f0; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #475569; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .od-back-btn:hover { background: #f8fafc; color: #0d2331; }
        .od-header-text { flex: 1; }
        .od-header-text h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0 0 0.25rem 0; }
        .od-header-text p { color: #64748b; margin: 0; font-size: 0.9375rem; }
        .od-edit-btn { background: white; border: 1px solid #e2e8f0; padding: 0.75rem 1.25rem; border-radius: 12px; font-weight: 700; color: #0d2331; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .od-edit-btn:hover { background: #f8fafc; }

        .od-content-grid { display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem; }

        .od-profile-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; align-items: center; text-align: center; height: fit-content; }
        .od-avatar { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #f8fafc; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 1.25rem; }
        .od-profile-header h2 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 0.5rem 0; }
        .od-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1.5rem; }
        .od-status.active { background: #dcfce7; color: #15803d; }
        
        .od-quick-info { width: 100%; display: flex; flex-direction: column; gap: 0.75rem; }
        .od-info-item { background: #f8fafc; padding: 0.875rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #475569; }

        .od-details-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 2rem; }
        .od-details-card h3 { font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0 0 1.25rem 0; }
        
        .od-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .od-detail-field label { display: block; font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .od-detail-field p { margin: 0; font-size: 0.9375rem; font-weight: 600; color: #1e293b; display: flex; align-items: center; gap: 0.5rem; }
        .od-detail-field p svg { color: #64748b; }

        .od-divider { height: 1px; background: #f1f5f9; margin: 2rem 0; }

        @media (max-width: 900px) {
          .od-content-grid { grid-template-columns: 1fr; }
          .od-header { align-items: flex-start; }
          .od-edit-btn { width: 100%; justify-content: center; margin-top: 1rem; }
        }
        @media (max-width: 600px) {
          .od-details-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default OfficerDetails;
