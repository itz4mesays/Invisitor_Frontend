import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  User,
  Users,
  Mail,
  Phone,
  ArrowRight,
  X,
  Clock,
  List,
  Calendar,
  Upload,
  Check,
  Ban
} from 'lucide-react';
import Pagination from '../../components/Pagination';

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="modal-container rounded-extreme"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-simple">
          <button onClick={onClose} className="btn-close-circle"><X size={24} /></button>
        </div>
        <div className="modal-body-p-0">
          {children}
        </div>
      </motion.div>
      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        .modal-container {
          background: var(--bg-surface);
          width: 100%;
          max-width: 850px;
          border-radius: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          position: relative;
        }
        .modal-header-simple {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 100;
        }
        .btn-close-circle {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-primary);
        }
        .modal-body-p-0 {
          padding: 0;
          max-height: 85vh;
          overflow-y: auto;
          border-radius: 40px;
        }
        .modal-body-p-0::-webkit-scrollbar {
          width: 6px;
        }
        .modal-body-p-0::-webkit-scrollbar-thumb {
          background: var(--border-default);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

const HostVisitors = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const trackingData = [
    { date: '12th July, 2023', checkIn: '09:00 AM', checkOut: '05:00 PM', duration: '8h 0m', status: 'Completed', gate: 'Main Gate' },
    { date: '11th July, 2023', checkIn: '08:45 AM', checkOut: '04:30 PM', duration: '7h 45m', status: 'Completed', gate: 'West Gate' },
    { date: '10th July, 2023', checkIn: '09:15 AM', checkOut: '05:15 PM', duration: '8h 0m', status: 'Completed', gate: 'Main Gate' },
  ];

  const visitors = [
    { id: '1', name: 'Elizabeth Ateli', type: 'Contractor', doc: 'Passport', phone: '0814 609 2019', email: 'oyinbopepper@outlook.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElizabethA', isRecent: false },
    { id: '2', name: 'Victoria Salisu', type: 'Contractor', doc: "Driver's License", phone: '0814 609 2019', email: 'landonc@yandex.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria', isRecent: true },
    { id: '3', name: 'John Gambo', type: 'Contractor', doc: 'National Identity Card', phone: '0814 609 2019', email: 'akwaibom@gmail.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnG', isRecent: false },
    { id: '4', name: 'David Awolowo', type: 'Contractor', doc: 'National Identity Card', phone: '0814 609 2019', email: 'sokotosultan@yandex.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidA', isRecent: false },
    { id: '5', name: 'Michael Okujagu', type: 'VIP', doc: "Driver's License", phone: '0814 609 2019', email: 'graces@icloud.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelO', isRecent: true },
    { id: '6', name: 'Esther Agu', type: 'VIP', doc: 'Passport', phone: '0814 609 2019', email: 'zamfarasharia@aol.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther', isRecent: false },
    { id: '7', name: 'Rebecca Anigbogu', type: 'VIP', doc: 'Passport', phone: '0814 609 2019', email: 'warrinocarrylast@mail.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rebecca', isRecent: false },
    { id: '8', name: 'Margaret Ogunleye', type: 'General Visitors', doc: 'National Identity Card', phone: '0814 609 2019', email: 'wyattj@yandex.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Margaret', isRecent: true },
    { id: '9', name: 'Jane Doe', type: 'General Visitors', doc: "Driver's License", phone: '0814 609 2019', email: 'lukew@yahoo.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', isRecent: false },
  ];

  const [activeListTab, setActiveListTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [blacklisted, setBlacklisted] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');

  const handleViewDetails = (visitor) => {
    navigate(`/host/visitors/${visitor.id}`);
    setActiveDropdown(null);
  };

  const handleAddSubmit = () => {
    // Mock save logic
    setIsAddSuccess(true);
  };

  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => setIsAddSuccess(false), 300); // Reset for next time
  };

  const handleDeleteClick = (visitor) => {
    setSelectedVisitor(visitor);
    setIsDeleteModalOpen(true);
    setActiveDropdown(null);
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Mock save logic
      console.log("Saving changes for:", selectedVisitor?.name);
    }
    setIsEditing(!isEditing);
  };

  const filteredVisitors = visitors.filter((v) => {
    if (activeListTab === 'Recent' && !v.isRecent) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = v.name.toLowerCase().includes(q);
      const matchesEmail = v.email.toLowerCase().includes(q);
      const matchesType = v.type.toLowerCase().includes(q);
      const matchesDoc = v.doc.toLowerCase().includes(q);
      if (!matchesName && !matchesEmail && !matchesType && !matchesDoc) return false;
    }
    return true;
  });

  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredVisitors.slice(startIndex, endIndex);
  }, [filteredVisitors, currentPage, pageSize]);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const recentCount = visitors.filter(v => v.isRecent).length;

  return (
    <div className="visitors-page">
      <div className="page-header-simple">
        <h1>Visitors</h1>
      </div>

      <div className="top-actions-row">
        <div className="status-tabs-group">
          <button 
            className={`status-tab ${activeListTab === 'All' ? 'active' : ''}`}
            onClick={() => setActiveListTab('All')}
          >
            <Users size={16} /> All Visitors <span className="badge-count">100</span>
          </button>
          <button 
            className={`status-tab ${activeListTab === 'Recent' ? 'active' : ''}`}
            onClick={() => setActiveListTab('Recent')}
          >
            <Clock size={16} /> Recently Added 
            <span className={`badge-count ${recentCount === 0 ? 'empty' : ''}`}>{recentCount}</span>
          </button>
        </div>
        <button className="btn-add-visitor" onClick={() => navigate('/host/visitors/add')}>
          <Plus size={18} />
          Add New Visitor
        </button>
      </div>

      <div className="table-container">
        <div className="table-filters">
          <h2 className="table-title">{activeListTab === 'All' ? 'All Visitors' : 'Recently Added'}</h2>
          <div className="filter-actions">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search visitors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-filter-icon">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <table className="visitors-table">
          <thead>
            <tr>
              <th><div className="th-content">Name <MoreVertical size={14} className="sort-icon"/></div></th>
              <th><div className="th-content">Visitor Type <MoreVertical size={14} className="sort-icon"/></div></th>
              <th><div className="th-content">Identification Document <MoreVertical size={14} className="sort-icon"/></div></th>
              <th><div className="th-content">Phone no <MoreVertical size={14} className="sort-icon"/></div></th>
              <th><div className="th-content">Email address <MoreVertical size={14} className="sort-icon"/></div></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length > 0 ? (
              currentTableData.map((visitor) => (
                <tr key={visitor.id}>
                  <td>
                    <div className="user-cell">
                      <img src={visitor.avatar} alt="" />
                      <span className="user-name-bold">{visitor.name}</span>
                    </div>
                  </td>
                  <td className="text-gray">{visitor.type}</td>
                  <td className="text-gray">{visitor.doc}</td>
                  <td className="text-gray">{visitor.phone}</td>
                  <td className="text-gray">{visitor.email}</td>
                  <td className="actions-cell">
                    <div className="action-dropdown-container">
                      <button 
                        className="btn-action-dots" 
                        onClick={() => setActiveDropdown(activeDropdown === visitor.id ? null : visitor.id)}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === visitor.id && (
                          <>
                            <div className="dropdown-overlay" onClick={() => setActiveDropdown(null)} />
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 10 }}
                              className="action-dropdown-menu"
                            >
                              <button className="dropdown-item" onClick={() => handleViewDetails(visitor)}>
                                <Eye size={16} /> View Profile
                              </button>
                              <button className="dropdown-item" onClick={() => { navigate(`/host/visitors/${visitor.id}`); setActiveDropdown(null); }}>
                                <Edit size={16} /> Update Info
                              </button>
                              <button 
                                className={`dropdown-item ${blacklisted.has(visitor.id) ? 'whitelist' : 'blacklist'}`}
                                onClick={() => {
                                  setBlacklisted(prev => {
                                    const next = new Set(prev);
                                    if (next.has(visitor.id)) next.delete(visitor.id);
                                    else next.add(visitor.id);
                                    return next;
                                  });
                                  setActiveDropdown(null);
                                }}
                              >
                                <Ban size={16} /> {blacklisted.has(visitor.id) ? 'Whitelist Visitor' : 'Blacklist Visitor'}
                              </button>
                              <button className="dropdown-item delete" onClick={() => handleDeleteClick(visitor)}>
                                <Trash2 size={16} /> Delete Account
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-tertiary)' }}>
                  No visitors found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalCount={filteredVisitors.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {/* Add Visitor Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <Modal 
            isOpen={isAddModalOpen} 
            onClose={resetAddModal}
          >
            {isAddSuccess ? (
              <div className="success-modal-content">
                <h2 className="success-title">New visitor added<br/>successfully</h2>
                <div className="success-icon-container">
                  <div className="success-circle-large">
                    <Check size={48} strokeWidth={4} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-modal-content">
                <h2 className="modal-title-main" style={{ marginBottom: '2rem' }}>Add A Visitor</h2>
                
                <div className="profile-form-area">
                  <div className="profile-top-bar">
                    <div className="avatar-upload-group">
                      <div className="avatar-circle-large empty">
                        <User size={48} className="text-gray-light" />
                      </div>
                      <button className="btn-link-action">Upload Or Snap Profile Picture</button>
                    </div>
                  </div>

                  <div className="status-and-edit">
                    <div className="bg-check-badge">
                      <span>Background Check</span>
                      <span className="unverified-pill">Unverified</span>
                    </div>
                  </div>

                  <div className="form-grid-2-col">
                    <div className="form-field">
                      <label>VISITOR NAME</label>
                      <input type="text" placeholder="David Awolowo" />
                    </div>
                    <div className="form-field">
                      <label>EMAIL ADDRESS</label>
                      <input type="text" placeholder="sokotosultan@yandex.com" />
                    </div>
                    
                    <div className="form-field">
                      <label>GENDER (Optional)</label>
                      <select defaultValue="Male">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>DATE OF BIRTH (Optional)</label>
                      <div className="input-with-icon">
                        <input type="text" placeholder="10/20/1994" />
                        <Calendar size={18} className="field-icon" />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>PHONE NUMBER</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select style={{ width: '80px', padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
                          <option>+234</option>
                          <option>+1</option>
                          <option>+44</option>
                        </select>
                        <input type="text" placeholder="814 609 2019" style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '12px' }} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label>COMPANY NAME (Optional)</label>
                      <select defaultValue="Acme Corps">
                        <option>Acme Corps</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>VISIT PURPOSE</label>
                      <input type="text" placeholder="Meeting" />
                    </div>
                    <div className="form-field">
                      <label>HOST NAME</label>
                      <input type="text" placeholder="Harvey Specter" />
                    </div>

                    <div className="form-field">
                      <label>PHONE NUMBER</label>
                      <input type="text" placeholder="0814 609 2019" />
                    </div>
                    <div className="form-field">
                      <label>VISITOR TYPE</label>
                      <select defaultValue="Acme Corps">
                        <option>Acme Corps</option>
                        <option>General Visitor</option>
                        <option>VIP</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2-col">
                    <div className="form-field">
                      <label>IDENTIFICATION DOCUMENT</label>
                      <select defaultValue="Passport">
                        <option>Passport</option>
                        <option>Driver's License</option>
                        <option>National ID</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>ID NUMBER</label>
                      <input type="text" placeholder="56398897654" />
                    </div>
                  </div>

                  <div className="attachment-section">
                    <div className="flex-row-gap">
                      <button className="btn-upload-outline">
                        <Upload size={18} /> Upload ID Card
                      </button>
                      <div className="file-info-minimal">
                        <Shield size={18} />
                        <span>ID CARD.PDF</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions-bottom">
                    <button className="btn-add-primary-large" onClick={handleAddSubmit}>Add Visitor</button>
                    <button className="btn-cancel-outline-large" onClick={resetAddModal}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>

      {/* Visitor Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <Modal 
            isOpen={isDetailModalOpen} 
            onClose={() => setIsDetailModalOpen(false)}
          >
            <div className="profile-modal-content">
              <div className="modal-top-nav">
                <button className="btn-back-link" onClick={() => setIsDetailModalOpen(false)}>
                  <ChevronLeft size={18} /> Go Back
                </button>
                <h2 className="modal-title-main">Visitor Profile</h2>
              </div>
              
              <div className="modal-tabs-line">
                <button 
                  className={`line-tab ${activeTab === 'Profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Profile')}
                >
                  <Users size={18} /> Profile
                </button>
                <button 
                  className={`line-tab ${activeTab === 'Activity' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Activity')}
                >
                  <List size={18} /> Activity Log
                </button>
              </div>

              {activeTab === 'Profile' ? (
                <div className="profile-form-area">
                  <div className="profile-top-bar">
                    <div className="avatar-upload-group">
                      <div className="avatar-circle-large">
                        <img src={selectedVisitor?.avatar} alt="" />
                      </div>
                      <button className="btn-link-action">Change Profile Picture</button>
                    </div>
                  </div>

                  <div className="status-and-edit">
                    <div className="bg-check-badge">
                      <span>Background Check</span>
                      <span className="passed-pill">Passed</span>
                    </div>
                    <button 
                      className={`btn-edit-profile-action ${isEditing ? 'editing' : ''}`}
                      onClick={toggleEditMode}
                    >
                      {isEditing ? (
                        <Shield size={16} /> 
                      ) : (
                        <Edit size={16} />
                      )}
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="form-grid-2-col">
                    <div className="form-field">
                      <label>VISITOR NAME</label>
                      <input type="text" defaultValue={selectedVisitor?.name} readOnly={!isEditing} />
                    </div>
                    <div className="form-field">
                      <label>EMAIL ADDRESS</label>
                      <input type="text" defaultValue={selectedVisitor?.email} readOnly={!isEditing} />
                    </div>
                    
                    <div className="form-field">
                      <label>GENDER (Optional)</label>
                      <select defaultValue="Male" disabled={!isEditing}>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>DATE OF BIRTH (Optional)</label>
                      <div className="input-with-icon">
                        <input type="text" defaultValue="10/20/1994" readOnly={!isEditing} />
                        <Calendar size={18} className="field-icon" />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>PHONE NUMBER</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select style={{ width: '80px', padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '12px' }} disabled={!isEditing}>
                          <option>+234</option>
                          <option>+1</option>
                          <option>+44</option>
                        </select>
                        <input type="text" defaultValue={selectedVisitor?.phone} readOnly={!isEditing} style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '12px' }} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label>COMPANY NAME (Optional)</label>
                      <input type="text" defaultValue="Acme Corps" readOnly={!isEditing} />
                    </div>

                    <div className="form-field">
                      <label>HOST NAME</label>
                      <input type="text" defaultValue="Harvey Specter" readOnly={!isEditing} />
                    </div>
                    <div className="form-field">
                      <label>VISITOR TYPE</label>
                      <select defaultValue="Acme Corps" disabled={!isEditing}>
                        <option>Acme Corps</option>
                        <option>Contractor</option>
                        <option>VIP</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field full-width">
                    <label>VISIT PURPOSE</label>
                    <input type="text" defaultValue="Meeting" readOnly={!isEditing} />
                  </div>

                  <div className="form-grid-2-col">
                    <div className="form-field">
                      <label>IDENTIFICATION DOCUMENT</label>
                      <select defaultValue="Passport" disabled={!isEditing}>
                        <option>Passport</option>
                        <option>Driver's License</option>
                        <option>National ID</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>ID NUMBER</label>
                      <input type="text" defaultValue="56398897654" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="attachment-section">
                    <div className="file-preview-card">
                      <div className="file-info-group">
                        <Shield size={20} className="file-icon-blue" />
                        <span className="file-name">ID CARD.PDF</span>
                      </div>
                      <button className="btn-view-preview">View ID Card</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="activity-log-padding">
                  <table className="tracking-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Gate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trackingData.map((log, idx) => (
                        <tr key={idx}>
                          <td>{log.date}</td>
                          <td>{log.checkIn}</td>
                          <td>{log.checkOut}</td>
                          <td>{log.duration}</td>
                          <td><span className="status-badge-mini">{log.status}</span></td>
                          <td>{log.gate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <Modal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)}
            title="Delete Visitor Account"
          >
            <div className="delete-confirmation">
              <div className="delete-icon">
                <Trash2 size={40} />
              </div>
              <h4>Delete Visitor Account?</h4>
              <p>Are you sure you want to delete this visitor account? This action cannot be undone.</p>
              <div className="delete-actions">
                <button className="btn btn-danger">Yes, Delete</button>
                <button className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>No, Cancel</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .visitors-page {
          display: flex;
          flex-direction: column;
        }

        .page-header-simple h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .top-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .status-tabs-group {
          display: flex;
          gap: 1rem;
        }

        .status-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-default);
          background: var(--bg-subtle);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          cursor: pointer;
        }

        .status-tab.active {
          background: #e0f2fe;
          color: var(--bg-brand);
          border-color: #bae6fd;
        }

        .badge-count {
          background: var(--bg-brand);
          color: var(--text-inverse);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.6875rem;
          font-weight: 700;
        }

        .badge-count.empty {
          background: var(--bg-surface);
          color: var(--text-quaternary);
          border: 1px solid var(--border-default);
        }

        .btn-add-visitor {
          background: var(--bg-brand);
          color: var(--text-inverse);
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          border: none;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .table-container {
          background: var(--bg-surface);
          border-radius: 12px;
          border: 1px solid var(--border-default);
          padding: 1.5rem;
        }

        .table-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .table-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .filter-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-box {
          position: relative;
          width: 250px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-quaternary);
        }

        .search-box input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border: 1px solid var(--border-default);
          border-radius: 8px;
          font-size: 0.8125rem;
          background: var(--bg-subtle);
        }

        .btn-filter-icon {
          background: var(--bg-surface);
          border: none;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .visitors-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .visitors-table th {
          padding: 1rem 0;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-tertiary);
          border-bottom: 1px solid var(--bg-muted);
        }

        .th-content {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .sort-icon {
          color: var(--border-heavy);
          cursor: pointer;
        }

        .visitors-table td {
          padding: 1.25rem 0;
          font-size: 0.875rem;
          border-bottom: 1px solid var(--bg-muted);
        }

        .text-gray {
          color: var(--text-tertiary);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-cell img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .user-name-bold {
          font-weight: 700;
          color: var(--text-primary);
        }

        .actions-cell {
          text-align: right;
        }

        .action-dropdown-container {
          position: relative;
          display: inline-block;
        }

        .btn-action-dots {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-action-dots:hover {
          background: var(--bg-subtle);
          border-color: var(--border-heavy);
          color: var(--text-primary);
        }

        .action-dropdown-menu {
          position: absolute;
          right: 0;
          top: 110%;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          width: 200px;
          z-index: 100;
          overflow: hidden;
          padding: 0.5rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          text-align: left;
        }

        .dropdown-item:hover {
          background: var(--bg-muted);
          color: var(--bg-brand);
        }

        .dropdown-item svg {
          color: var(--text-quaternary);
        }

        .dropdown-item.delete {
          color: var(--text-danger);
        }

        .dropdown-item.delete:hover {
          background: #fee2e2;
        }

        .dropdown-item.delete svg {
          color: var(--text-danger);
        }

        .dropdown-item.blacklist {
          color: #dc2626;
        }
        .dropdown-item.blacklist:hover {
          background: var(--bg-danger-subtle);
        }
        .dropdown-item.whitelist {
          color: #16a34a;
        }
        .dropdown-item.whitelist:hover {
          background: #f0fdf4;
        }

        .dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 90;
        }

        .table-footer-center {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .btn-pagination-outline {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--bg-brand);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-page {
          background: none;
          border: none;
          color: var(--text-quaternary);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
        }

        .btn-page.active-page {
          border: 1px solid var(--text-primary);
          color: var(--text-primary);
          border-radius: 6px;
        }

        .page-dots {
          color: var(--text-quaternary);
        }

        /* Visitor Profile Modal Styles */
        .profile-modal-content {
          padding: 2.5rem;
        }

        .modal-top-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .btn-back-link {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--text-tertiary);
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .btn-back-link:hover {
          color: var(--bg-brand);
        }

        .modal-title-main {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .modal-tabs-line {
          display: flex;
          gap: 2.5rem;
          border-bottom: 1px solid var(--bg-muted);
          margin-bottom: 2.5rem;
        }

        .line-tab {
          background: none;
          border: none;
          padding: 0.75rem 0;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-quaternary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          position: relative;
        }

        .line-tab.active {
          color: var(--bg-brand);
        }

        .line-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--bg-brand);
        }

        .profile-form-area {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .profile-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1rem;
        }

        .avatar-circle-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background: var(--bg-subtle);
          border: 4px solid var(--bg-surface);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          margin-bottom: 0.75rem;
        }

        .avatar-circle-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-link-action {
          background: none;
          border: none;
          color: var(--bg-brand);
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
        }

        .status-and-edit {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bg-check-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .passed-pill {
          background: var(--text-success);
          color: var(--text-inverse);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .btn-edit-profile-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--bg-brand);
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
        }

        .form-grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .form-field.full-width {
          grid-column: 1 / -1;
        }

        .form-field label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .form-field input,
        .form-field select {
          width: 100%;
          padding: 0.875rem 1.25rem;
          border: 1px solid var(--border-default);
          border-radius: 12px;
          font-size: 0.9375rem;
          color: var(--text-primary);
          background: var(--bg-subtle);
          outline: none;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          right: 1.25rem;
          color: var(--text-quaternary);
        }

        .attachment-section {
          margin-top: 1rem;
        }

        .file-preview-card {
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .file-info-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .file-icon-blue {
          color: var(--bg-brand);
        }

        .file-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .btn-view-preview {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .unverified-pill {
          background: var(--text-quaternary);
          color: var(--text-inverse);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .avatar-circle-large.empty {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-muted);
          border: 2px dashed var(--border-heavy);
        }

        .text-gray-light {
          color: var(--text-quaternary);
        }

        .flex-row-gap {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .btn-upload-outline {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .file-info-minimal {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .form-actions-bottom {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-add-primary-large {
          background: var(--bg-brand);
          color: var(--text-inverse);
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.9375rem;
          cursor: pointer;
        }

        .btn-cancel-outline-large {
          background: var(--bg-surface);
          color: var(--text-tertiary);
          padding: 1rem 2.5rem;
          border: 1px solid var(--border-default);
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.9375rem;
          cursor: pointer;
        }

        .activity-log-padding {
          padding-top: 1rem;
        }

        /* Delete Confirmation Modal */
        .delete-confirmation {
          text-align: center;
          padding: 2.5rem;
        }
        
        .delete-icon {
          width: 80px;
          height: 80px;
          background: #fee2e2;
          color: var(--text-danger);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .delete-confirmation h4 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--bg-brand);
          margin-bottom: 0.75rem;
        }

        .delete-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .btn-danger {
          background: var(--text-danger);
          color: var(--text-inverse);
          padding: 1rem;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-outline {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          padding: 1rem;
          border-radius: 12px;
          color: var(--text-tertiary);
          font-weight: 700;
          cursor: pointer;
        }

        /* Tracking Table Mini Styles */
        .tracking-table {
          width: 100%;
          border-collapse: collapse;
        }
        .tracking-table th {
          text-align: left;
          padding: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-quaternary);
          border-bottom: 2px solid var(--bg-muted);
        }
        .tracking-table td {
          padding: 1.25rem 1rem;
          font-size: 0.8125rem;
          border-bottom: 1px solid var(--bg-muted);
        }
        .status-badge-mini {
          background: var(--bg-success-subtle);
          color: var(--text-success);
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: 700;
        }

        /* Success Modal Styles */
        .success-modal-content {
          padding: 5rem 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 3rem;
        }

        .success-circle-large {
          width: 100px;
          height: 100px;
          background: var(--text-success);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-inverse);
          box-shadow: 0 10px 20px rgba(34, 197, 94, 0.2);
        }
      `}</style>
    </div>
  );
};

export default HostVisitors;
