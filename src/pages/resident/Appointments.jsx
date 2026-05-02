import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  Search, 
  MoreVertical, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Check,
  ArrowRight,
  Share2,
  RefreshCcw,
  Copy,
  X,
  Users,
  FileText,
  Trash2,
  Eye
} from 'lucide-react';

// Reusable Modal Component
const Modal = ({ isOpen, onClose, children, maxWidth = '850px' }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="modal-container" 
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-simple">
          <button className="btn-close-circle" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body-p-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const ResidentAppointments = () => {
  const [activeTab, setActiveTab] = React.useState('All');
  const [activePage, setActivePage] = React.useState(3);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = React.useState(false);
  const [isAddSuccess, setIsAddSuccess] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);
  const [activeAddTab, setActiveAddTab] = React.useState('Visitor');
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [activeDropdown, setActiveDropdown] = React.useState(null);

  const handleConfirmClick = (appt) => {
    setSelectedAppointment(appt);
    setIsConfirmModalOpen(true);
  };

  const handleViewDetails = (appt) => {
    setSelectedAppointment(appt);
    setIsDetailModalOpen(true);
    setActiveDropdown(null);
  };

  const handleRescheduleClick = (appt) => {
    setSelectedAppointment(appt);
    setIsRescheduleModalOpen(true);
  };

  const confirmReschedule = () => {
    setIsRescheduleModalOpen(false);
  };

  const handleAddSubmit = () => {
    setIsAddSuccess(true);
  };

  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => {
      setIsAddSuccess(false);
      setActiveAddTab('Visitor');
    }, 300);
  };

  const handleDeleteClick = (appt) => {
    setSelectedAppointment(appt);
    setIsDeleteModalOpen(true);
    setActiveDropdown(null);
  };

  const confirmDelete = () => {
    // Mock delete
    setIsDeleteModalOpen(false);
  };

  const appointments = [
    { 
      id: '1', 
      name: 'Alison Ogaga', 
      type: 'General Visitor', 
      date: 'Friday, 6 July', 
      time: '11.30 - 12.00', 
      duration: '30 min', 
      host: 'Mr. Collis Makanju', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alison',
      status: 'Ongoing Appointment' 
    },
    { 
      id: '2', 
      name: 'Michelle Sanders', 
      type: 'General Visitor', 
      date: 'Friday, 6 July', 
      time: '11.30 - 12.00', 
      duration: '30 min', 
      host: 'Mr. Collis Makanju', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michelle',
      status: 'Upcoming Appointment' 
    },
    { 
      id: '3', 
      name: 'Michelle Sanders', 
      type: 'General Visitor', 
      date: 'Friday, 6 July', 
      time: '11.30 - 12.00', 
      duration: '30 min', 
      host: 'Mr. Collis Makanju', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      status: 'Upcoming Appointment' 
    },
    { 
      id: '4', 
      name: 'Michelle Sanders', 
      type: 'General Visitor', 
      date: 'Thursday, 5 July', 
      time: '11.30 - 12.00', 
      duration: '30 min', 
      host: 'Mr. Collis Makanju', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanders',
      status: 'Checked Out Appointment' 
    },
    { 
      id: '5', 
      name: 'Michelle Sanders', 
      type: 'General Visitor', 
      date: 'Thursday, 5 July', 
      time: '11.30 - 12.00', 
      duration: '30 min', 
      host: 'Mr. Collis Makanju', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mummy',
      status: 'Checked Out Appointment' 
    },
    { 
      id: '6', 
      name: 'Michelle Sanders', 
      type: 'General Visitor', 
      date: 'Thursday, 5 July', 
      time: '11.30 - 12.00', 
      duration: '30 min', 
      host: 'Mr. Collis Makanju', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      status: 'Checked Out Appointment' 
    },
  ];

  return (
    <div className="appointments-page">
      {/* Top Navigation / Search Header */}
      <div className="global-header-row">
        <div className="header-search-box">
          <Search size={18} className="search-icon-gray" />
          <input type="text" placeholder="Search for Visitor..." />
        </div>
        {/* <div className="header-right-actions">
          <button className="icon-btn-circle">
            <Bell size={20} />
          </button>
          <div className="user-profile-circle-small">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host" alt="Host" />
          </div>
        </div> */}
      </div>

      <header className="page-title-row">
        <h1>Appointments</h1>
      </header>

      <div className="top-tabs-and-action">
        <div className="status-tabs-group">
          <button 
            className={`status-tab ${activeTab === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTab('All')}
          >
            <Calendar size={18} /> All Appointments <span className="tab-pill">100</span>
          </button>
          <button 
            className={`status-tab ${activeTab === 'Upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('Upcoming')}
          >
            <Clock size={18} /> Upcoming Appointment <span className="tab-pill">75</span>
          </button>
          <button 
            className={`status-tab ${activeTab === 'Checked' ? 'active' : ''}`}
            onClick={() => setActiveTab('Checked')}
          >
            <ArrowRight size={18} style={{ transform: 'rotate(-45deg)' }} /> Checked out <span className="tab-pill">25</span>
          </button>
        </div>
        <button className="btn-add-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} /> Add an Appointment
        </button>
      </div>

      <div className="list-subheader">
        <h2 className="list-title">All Appointments</h2>
        <div className="list-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Start:</span>
            <input type="date" style={{ border: 'none', outline: 'none', fontSize: '0.75rem', color: '#1e293b' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>End:</span>
            <input type="date" style={{ border: 'none', outline: 'none', fontSize: '0.75rem', color: '#1e293b' }} />
          </div>
          <button className="text-btn">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="appointments-cards-grid">
        {appointments.map((appt, idx) => (
          <motion.div 
            key={appt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="appointment-card"
          >
            <div className={`status-strip ${appt.status.startsWith('Ongoing') ? 'ongoing' : appt.status.startsWith('Upcoming') ? 'upcoming' : 'checked-out'}`}>
              {appt.status}
            </div>
            
            <div className="card-content-padding">
              <h3 className="card-date-title">{appt.date}</h3>
              
              <div className="card-info-row">
                <Clock size={18} className="icon-gray" />
                <span>{appt.time} ({appt.duration})</span>
              </div>
              <div className="card-info-row">
                <Calendar size={18} className="icon-gray" />
                <span>{appt.host}</span>
              </div>

              <div className="card-visitor-section">
                <div className="visitor-main-info">
                  <div className="avatar-wrapper">
                    <img src={appt.avatar} alt="" className="v-avatar" />
                    <div className="verify-badge">
                      <Check size={8} strokeWidth={4} color="white" />
                    </div>
                  </div>
                  <div className="v-text">
                    <span className="v-name">{appt.name}</span>
                    <span className="v-role">{appt.type}</span>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <button 
                    className="icon-btn-ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === appt.id ? null : appt.id);
                    }}
                  >
                    <MoreVertical size={20} />
                  </button>
                  {activeDropdown === appt.id && (
                    <div className="card-dropdown-menu">
                      <button className="dropdown-item" onClick={() => handleViewDetails(appt)}>
                        <Eye size={16} /> View Appointment Details
                      </button>
                      <button className="dropdown-item delete" onClick={() => handleDeleteClick(appt)}>
                        <Trash2 size={16} /> Delete Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card-action-btns">
                <button 
                  className="btn-reschedule"
                  onClick={() => handleRescheduleClick(appt)}
                >
                  Reschedule
                </button>                <button 
                  className={`btn-confirm ${appt.status.startsWith('Checked') ? 'disabled' : ''}`}
                  onClick={() => !appt.status.startsWith('Checked') && handleConfirmClick(appt)}
                >
                  Confirm appointment
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pagination-bar">
        <button className="pagination-btn-nav">
          <ChevronLeft size={18} /> Previous
        </button>
        <div className="page-numbers">
          <button className="page-num">1</button>
          <button className="page-num">2</button>
          <button className={`page-num ${activePage === 3 ? 'active' : ''}`}>3</button>
          <span className="page-ellipsis">...</span>
          <button className="page-num">10</button>
          <button className="page-num">11</button>
          <button className="page-num">12</button>
        </div>
        <button className="pagination-btn-nav">
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Add Appointment Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <Modal 
            isOpen={isAddModalOpen} 
            onClose={resetAddModal}
            maxWidth={isAddSuccess ? "500px" : "850px"}
          >
            {isAddSuccess ? (
              <div className="success-modal-content-compact">
                <h2 className="confirm-title">Appointment Created</h2>
                <div className="success-icon-container">
                  <div className="success-circle-large green">
                    <Check size={48} strokeWidth={4} />
                  </div>
                </div>
                <button className="btn-view-appointments" onClick={resetAddModal}>
                  View Appointments
                </button>
              </div>
            ) : (
              <div className="add-appointment-modal-content">
                <header className="add-modal-header">
                  <h2 className="add-modal-title">Add An Appointment</h2>
                  <p className="add-modal-subtitle">Create an appointment for a visitor</p>
                </header>

                <div className="add-modal-tabs">
                  <button 
                    className={`add-modal-tab ${activeAddTab === 'Visitor' ? 'active' : ''}`}
                    onClick={() => setActiveAddTab('Visitor')}
                  >
                    <Users size={18} /> Visitor Details
                  </button>
                  <button 
                    className={`add-modal-tab ${activeAddTab === 'Appointment' ? 'active' : ''}`}
                    onClick={() => setActiveAddTab('Appointment')}
                  >
                    <Calendar size={18} /> Appointment Details
                  </button>
                </div>

                {activeAddTab === 'Visitor' ? (
                  <div className="tab-content-area">
                    <div className="form-grid-2-col">
                      <div className="form-field">
                        <label>VISITOR NAME</label>
                        <select defaultValue="">
                          <option value="" disabled>Select Visitor Name</option>
                          <option>David Awolowo</option>
                          <option>Alison Ogaga</option>
                        </select>
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
                          <input type="date" />
                          <Calendar size={18} className="field-icon" />
                        </div>
                      </div>
                      <div className="form-field">
                        <label>PHONE NUMBER</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <select style={{ width: '80px', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                            <option>+234</option>
                            <option>+1</option>
                            <option>+44</option>
                          </select>
                          <input type="text" placeholder="814 609 2019" style={{ flex: 1, padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>EMAIL ADDRESS</label>
                        <input type="text" placeholder="sokotosultan@yandex.com" />
                      </div>
                      <div className="form-field">
                        <label>COMPANY NAME (Optional)</label>
                        <select defaultValue="Acme Corps">
                          <option>Acme Corps</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label>IDENTIFICATION DOCUMENT</label>
                        <select defaultValue="Passport">
                          <option>Passport</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label>ID NUMBER</label>
                        <input type="text" placeholder="56398897654" />
                      </div>
                    </div>

                    <div className="attachment-row">
                      <div className="file-info-box">
                        <div className="file-icon-box">
                          <FileText size={18} />
                        </div>
                        <span className="file-name">ID CARD.PDF</span>
                      </div>
                      <button className="btn-view-outline-small">View ID Card</button>
                    </div>

                    <div className="add-modal-actions">
                      <button className="btn-confirm-large" onClick={handleAddSubmit}>Create Appointment</button>
                      <button className="btn-cancel-large" onClick={resetAddModal}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="tab-content-area">
                    <div className="form-grid-2-col">
                      <div className="form-field">
                        <label>VISIT PURPOSE</label>
                        <select defaultValue="Business Meeting">
                          <option>Business Meeting</option>
                          <option>Personal</option>
                          <option>Interview</option>
                          <option>Delivery</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label>HOST NAME</label>
                        <select defaultValue="Harvey Specter">
                          <option>Harvey Specter</option>
                          <option>Mike Ross</option>
                          <option>Louis Litt</option>
                          <option>Donna Paulsen</option>
                        </select>
                      </div>
                      
                      <div className="form-field">
                        <label>APPOINTMENT DATE</label>
                        <div className="input-with-icon">
                          <input type="date" />
                          <Calendar size={18} className="field-icon" />
                        </div>
                      </div>
                      <div className="form-field">
                        <label>ARRIVAL TIME</label>
                        <div className="input-with-icon">
                          <input type="time" />
                          <Clock size={18} className="field-icon" />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>DURATION</label>
                        <select defaultValue="30 Minutes">
                          <option>30 Minutes</option>
                          <option>1 Hour</option>
                          <option>2 Hours</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label>VISITOR TYPE</label>
                        <select defaultValue="General Visitor">
                          <option>General Visitor</option>
                          <option>VIP</option>
                          <option>Contractor</option>
                        </select>
                      </div>
                    </div>

                    <div className="add-modal-actions" style={{ marginTop: 'auto', paddingTop: '4rem' }}>
                      <button className="btn-confirm-large" onClick={handleAddSubmit}>Create Appointment</button>
                      <button className="btn-cancel-large" onClick={resetAddModal}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>

      {/* Confirmation Success Modal */}
      <AnimatePresence>
        {isConfirmModalOpen && (
          <Modal 
            isOpen={isConfirmModalOpen} 
            onClose={() => setIsConfirmModalOpen(false)}
            maxWidth="550px"
          >
            <div className="confirmation-modal-content">
              <h2 className="confirm-title">Appointment Confirmed</h2>
              <p className="confirm-subtext">
                We have sent an invitation code<br/>
                to the phone & email address of<br/>
                the visitor
              </p>

              <div className="visitor-confirm-card">
                <div className="avatar-wrapper larger">
                  <img src={selectedAppointment?.avatar} alt="" className="v-avatar" />
                  <div className="verify-badge">
                    <Check size={8} strokeWidth={4} color="white" />
                  </div>
                </div>
                <div className="v-text-center">
                  <span className="v-name-large">{selectedAppointment?.name}</span>
                  <span className="v-role-large">{selectedAppointment?.type}</span>
                </div>
              </div>

              <div className="invite-code-display">
                453566RC
              </div>

              <div className="modal-footer-actions">
                <button className="btn-footer-primary">
                  <Share2 size={18} /> Share Code
                </button>
                <button className="btn-footer-outline">
                  <RefreshCcw size={18} /> Resend Code
                </button>
                <button className="btn-footer-outline">
                  <Copy size={18} /> Copy Code
                </button>
              </div>
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
            maxWidth="500px"
          >
            <div className="confirmation-modal-content-compact">
              <h2 className="confirm-title">Delete Appointment</h2>
              <p className="confirm-subtext">
                Are you sure you want to delete<br/>
                this appointment?
              </p>

              <div className="delete-icon-container">
                <Trash2 size={80} className="text-gray-light" strokeWidth={1.5} />
              </div>

              <div className="modal-footer-actions-delete">
                <button className="btn-delete-full" onClick={confirmDelete}>
                  Yes, Delete
                </button>
                <button className="btn-footer-outline" onClick={() => setIsDeleteModalOpen(false)}>
                  No, Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {isRescheduleModalOpen && (
          <Modal 
            isOpen={isRescheduleModalOpen} 
            onClose={() => setIsRescheduleModalOpen(false)}
            maxWidth="600px"
          >
            <div className="add-appointment-modal-content">
              <header className="add-modal-header">
                <h2 className="add-modal-title">Reschedule Appointment</h2>
                <p className="add-modal-subtitle">Update appointment time for {selectedAppointment?.name}</p>
              </header>

              <div className="tab-content-area">
                <div className="form-grid-2-col">
                  <div className="form-field">
                    <label>APPOINTMENT DATE</label>
                    <div className="input-with-icon">
                      <input type="date" />
                      <Calendar size={18} className="field-icon" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>ARRIVAL TIME</label>
                    <div className="input-with-icon">
                      <input type="time" />
                      <Clock size={18} className="field-icon" />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>DURATION</label>
                    <select defaultValue={selectedAppointment?.duration || "30 Minutes"}>
                      <option>30 Minutes</option>
                      <option>1 Hour</option>
                      <option>2 Hours</option>
                    </select>
                  </div>
                </div>

                <div className="add-modal-actions" style={{ marginTop: '4rem' }}>
                  <button className="btn-confirm-large" onClick={confirmReschedule}>Reschedule Appointment</button>
                  <button className="btn-cancel-large" onClick={() => setIsRescheduleModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Appointment Details Modal */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <Modal 
            isOpen={isDetailModalOpen} 
            onClose={() => setIsDetailModalOpen(false)}
            maxWidth="600px"
          >
            <div className="add-appointment-modal-content">
              <header className="add-modal-header">
                <h2 className="add-modal-title">Appointment Details</h2>
                <p className="add-modal-subtitle">Full information for this visit</p>
              </header>

              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div className="visitor-confirm-card" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', flex: 1 }}>
                  <div className="avatar-wrapper larger">
                    <img src={selectedAppointment?.avatar} alt="" className="v-avatar" />
                    <div className="verify-badge">
                      <Check size={8} strokeWidth={4} color="white" />
                    </div>
                  </div>
                  <div className="v-text-center" style={{ textAlign: 'center' }}>
                    <span className="v-name-large">{selectedAppointment?.name}</span>
                    <span className="v-role-large">{selectedAppointment?.type}</span>
                  </div>
                </div>

                {/* QR Code Section */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Appointment QR Code</h3>
                  <div style={{ 
                    display: 'inline-block', 
                    padding: '1rem', 
                    background: 'white', 
                    borderRadius: '12px', 
                    border: '2px solid #e2e8f0',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                  }}>
                    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                      {/* QR Code pattern - simplified representation */}
                      <rect x="0" y="0" width="120" height="120" fill="white"/>
                      {/* Corner squares */}
                      <rect x="0" y="0" width="28" height="28" fill="black"/>
                      <rect x="4" y="4" width="20" height="20" fill="white"/>
                      <rect x="8" y="8" width="12" height="12" fill="black"/>
                      
                      <rect x="92" y="0" width="28" height="28" fill="black"/>
                      <rect x="96" y="4" width="20" height="20" fill="white"/>
                      <rect x="100" y="8" width="12" height="12" fill="black"/>
                      
                      <rect x="0" y="92" width="28" height="28" fill="black"/>
                      <rect x="4" y="96" width="20" height="20" fill="white"/>
                      <rect x="8" y="100" width="12" height="12" fill="black"/>
                      
                      {/* Center pattern */}
                      <rect x="44" y="44" width="32" height="32" fill="black"/>
                      <rect x="48" y="48" width="24" height="24" fill="white"/>
                      <rect x="52" y="52" width="16" height="16" fill="black"/>
                      
                      {/* Random data squares */}
                      <rect x="32" y="8" width="4" height="4" fill="black"/>
                      <rect x="40" y="8" width="4" height="4" fill="black"/>
                      <rect x="76" y="8" width="4" height="4" fill="black"/>
                      <rect x="84" y="8" width="4" height="4" fill="black"/>
                      
                      <rect x="8" y="32" width="4" height="4" fill="black"/>
                      <rect x="8" y="40" width="4" height="4" fill="black"/>
                      <rect x="8" y="76" width="4" height="4" fill="black"/>
                      <rect x="8" y="84" width="4" height="4" fill="black"/>
                      
                      <rect x="32" y="32" width="4" height="4" fill="black"/>
                      <rect x="40" y="32" width="4" height="4" fill="black"/>
                      <rect x="32" y="40" width="4" height="4" fill="black"/>
                      <rect x="40" y="40" width="4" height="4" fill="black"/>
                      
                      <rect x="76" y="32" width="4" height="4" fill="black"/>
                      <rect x="84" y="32" width="4" height="4" fill="black"/>
                      <rect x="76" y="40" width="4" height="4" fill="black"/>
                      <rect x="84" y="40" width="4" height="4" fill="black"/>
                      
                      <rect x="32" y="76" width="4" height="4" fill="black"/>
                      <rect x="40" y="76" width="4" height="4" fill="black"/>
                      <rect x="32" y="84" width="4" height="4" fill="black"/>
                      <rect x="40" y="84" width="4" height="4" fill="black"/>
                      
                      <rect x="76" y="76" width="4" height="4" fill="black"/>
                      <rect x="84" y="76" width="4" height="4" fill="black"/>
                      <rect x="76" y="84" width="4" height="4" fill="black"/>
                      <rect x="84" y="84" width="4" height="4" fill="black"/>
                      
                      <rect x="108" y="32" width="4" height="4" fill="black"/>
                      <rect x="108" y="40" width="4" height="4" fill="black"/>
                      <rect x="108" y="76" width="4" height="4" fill="black"/>
                      <rect x="108" y="84" width="4" height="4" fill="black"/>
                      
                      <rect x="32" y="108" width="4" height="4" fill="black"/>
                      <rect x="40" y="108" width="4" height="4" fill="black"/>
                      <rect x="76" y="108" width="4" height="4" fill="black"/>
                      <rect x="84" y="108" width="4" height="4" fill="black"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-grid-2-col" style={{ marginTop: '1rem' }}>
                <div className="detail-row">
                  <label className="detail-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.25rem' }}>DATE</label>
                  <span className="detail-value" style={{ fontSize: '1rem', fontWeight: '700', color: '#0d2331' }}>{selectedAppointment?.date || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <label className="detail-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.25rem' }}>TIME</label>
                  <span className="detail-value" style={{ fontSize: '1rem', fontWeight: '700', color: '#0d2331' }}>{selectedAppointment?.time || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <label className="detail-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.25rem' }}>DURATION</label>
                  <span className="detail-value" style={{ fontSize: '1rem', fontWeight: '700', color: '#0d2331' }}>{selectedAppointment?.duration || '30 Minutes'}</span>
                </div>
                <div className="detail-row">
                  <label className="detail-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.25rem' }}>HOST</label>
                  <span className="detail-value" style={{ fontSize: '1rem', fontWeight: '700', color: '#0d2331' }}>{selectedAppointment?.host || 'David Fayemi'}</span>
                </div>
                <div className="detail-row">
                  <label className="detail-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.25rem' }}>PHONE NUMBER</label>
                  <span className="detail-value" style={{ fontSize: '1rem', fontWeight: '700', color: '#0d2331' }}>{selectedAppointment?.phone || '+234 814 609 2019'}</span>
                </div>
                <div className="detail-row">
                  <label className="detail-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.25rem' }}>GENDER</label>
                  <span className="detail-value" style={{ fontSize: '1rem', fontWeight: '700', color: '#0d2331' }}>{selectedAppointment?.gender || 'Male'}</span>
                </div>
              </div>

              <div className="add-modal-actions" style={{ marginTop: '2.5rem' }}>
                <button className="btn-confirm-large" style={{ width: '100%' }} onClick={() => setIsDetailModalOpen(false)}>Close Details</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .appointments-page {
          display: flex;
          flex-direction: column;
          padding-bottom: 3rem;
        }

        /* Top Header Row */
        .global-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .header-search-box {
          position: relative;
          background: #f8fafc;
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 600px;
        }

        .header-search-box input {
          background: none;
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.9375rem;
          color: #1e293b;
        }

        .search-icon-gray {
          color: #94a3b8;
        }

        .header-right-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn-circle {
          background: white;
          border: 1px solid #e2e8f0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
        }

        .user-profile-circle-small {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .user-profile-circle-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Page Title */
        .page-title-row h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #0d2331;
          margin-bottom: 2rem;
        }

        /* Tabs and Add Button */
        .top-tabs-and-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .status-tabs-group {
          display: flex;
          gap: 1.25rem;
        }

        .status-tab {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          background: #f1f5f9;
          border: 1px solid transparent;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .status-tab.active {
          background: white;
          border-color: #e2e8f0;
          color: #0d2331;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .tab-pill {
          background: #0d2331;
          color: white;
          font-size: 0.75rem;
          padding: 2px 10px;
          border-radius: 10px;
          font-weight: 700;
        }

        .btn-add-primary {
          background: #0d2331;
          color: white;
          border: none;
          padding: 0.875rem 1.75rem;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        /* List Subheader */
        .list-subheader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .list-title {
          font-size: 1.125rem;
          font-weight: 800;
          color: #1e293b;
        }

        .list-actions {
          display: flex;
          gap: 1rem;
        }

        .text-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
        }

        /* Appointment Cards Grid */
        .appointments-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .appointment-card {
          background: white;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }

        .appointment-card:hover {
          transform: translateY(-4px);
        }

        .status-strip {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          border-bottom: 1px solid #f1f5f9;
        }

        .status-strip.ongoing { background: #f0fdf4; color: #15803d; }
        .status-strip.upcoming { background: #f8fafc; color: #1e293b; }
        .status-strip.checked-out { background: #fef2f2; color: #b91c1c; }

        .card-content-padding {
          padding: 1.5rem;
        }

        .card-date-title {
          font-size: 1.125rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 1.25rem;
        }

        .card-info-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #475569;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .icon-gray { color: #94a3b8; }

        .card-visitor-section {
          background: #f8fafc;
          border-radius: 16px;
          padding: 1rem;
          margin: 1.5rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .visitor-main-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar-wrapper {
          position: relative;
          width: 56px;
          height: 56px;
        }

        .v-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .verify-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #2563eb;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .v-text {
          display: flex;
          flex-direction: column;
        }

        .v-name {
          font-size: 0.875rem;
          font-weight: 800;
          color: #1e293b;
        }

        .v-role {
          font-size: 0.75rem;
          color: #64748b;
        }

        .icon-btn-ghost {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }

        .card-action-btns {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1rem;
        }

        .btn-reschedule {
          background: white;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 0.875rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-confirm {
          background: #0d2331;
          color: white;
          border: none;
          padding: 0.875rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-confirm.disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        /* Pagination */
        .pagination-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid #f1f5f9;
        }

        .pagination-btn-nav {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          color: #1e293b;
          cursor: pointer;
        }

        .page-numbers {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .page-num {
          background: none;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          color: #94a3b8;
          cursor: pointer;
        }

        .page-num.active {
          border: 2px solid #0d2331;
          color: #0d2331;
        }

        .page-ellipsis {
          color: #cbd5e1;
        }

        @media (max-width: 1200px) {
          .appointments-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .appointments-cards-grid {
            grid-template-columns: 1fr;
          }
          .header-search-box {
            width: 100%;
          }
        }

        /* Modal Base Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 35, 49, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-container {
          background: white;
          width: 100%;
          max-width: 650px;
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
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1e293b;
        }

        .modal-body-p-0 {
          padding: 0;
        }

        /* Confirmation Modal Content */
        .confirmation-modal-content {
          padding: 4rem 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .confirm-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0d2331;
          margin-bottom: 1.5rem;
        }

        .confirm-subtext {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #475569;
          font-weight: 600;
          margin-bottom: 2.5rem;
        }

        .visitor-confirm-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .avatar-wrapper.larger {
          width: 80px;
          height: 80px;
        }

        .v-text-center {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .v-name-large {
          font-size: 1.125rem;
          font-weight: 800;
          color: #1e293b;
        }

        .v-role-large {
          font-size: 0.875rem;
          color: #64748b;
        }

        .invite-code-display {
          font-size: 3rem;
          font-weight: 800;
          color: #0d2331;
          letter-spacing: 2px;
          margin-bottom: 3rem;
        }

        .modal-footer-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
        }

        .btn-footer-primary {
          background: #0d2331;
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .btn-footer-outline {
          background: white;
          border: 1px solid #e2e8f0;
          color: #0d2331;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        /* Add Appointment Modal Styles */
        .add-appointment-modal-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .add-modal-header {
          margin-bottom: 1rem;
        }

        .add-modal-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0d2331;
          margin-bottom: 0.5rem;
        }

        .add-modal-subtitle {
          color: #94a3b8;
          font-size: 1rem;
          font-weight: 600;
        }

        .add-modal-tabs {
          display: flex;
          gap: 3rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .add-modal-tab {
          background: none;
          border: none;
          padding: 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 0.875rem;
          color: #94a3b8;
          cursor: pointer;
          position: relative;
        }

        .add-modal-tab.active {
          color: #0d2331;
        }

        .add-modal-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #0d2331;
          border-radius: 3px 3px 0 0;
        }

        .tab-content-area {
          margin-top: 1rem;
        }

        /* Forms */
        .form-grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem 2rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field label {
          font-size: 0.75rem;
          font-weight: 800;
          color: #1e293b;
          letter-spacing: 0.5px;
        }

        .form-field select,
        .form-field input {
          width: 100%;
          padding: 0.875rem;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-size: 0.875rem;
          color: #1e293b;
          font-weight: 600;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-field select:focus,
        .form-field input:focus {
          border-color: #0d2331;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .field-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        /* Attachments */
        .attachment-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .file-info-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .file-icon-box {
          width: 44px;
          height: 44px;
          background: #f8fafc;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d2331;
        }

        .file-name {
          font-weight: 800;
          color: #0d2331;
          font-size: 1rem;
        }

        .btn-view-outline-small {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 0.625rem 1.25rem;
          border-radius: 10px;
          font-weight: 700;
          color: #0d2331;
          cursor: pointer;
        }

        .add-modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 3rem;
        }

        .btn-confirm-large {
          background: #0d2331;
          color: white;
          border: none;
          padding: 1.125rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
        }

        .btn-cancel-large {
          background: white;
          border: 1px solid #e2e8f0;
          color: #1e293b;
          padding: 1.125rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
        }

        /* Card Dropdown */
        .card-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 50;
          width: 200px;
          overflow: hidden;
        }

        .dropdown-item {
          width: 100%;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: background 0.2s;
          text-align: left;
        }

        .dropdown-item:hover {
          background: #f8fafc;
        }

        .dropdown-item.delete {
          color: #ef4444;
        }

        /* Compact Modals */
        .success-modal-content-compact,
        .confirmation-modal-content-compact {
          padding: 3rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-container {
          margin: 1.5rem 0 2.5rem;
        }

        .success-circle-large.green {
          width: 80px;
          height: 80px;
          background: #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 16px rgba(34, 197, 94, 0.2);
        }

        .btn-view-appointments {
          background: white;
          border: 1px solid #e2e8f0;
          color: #0d2331;
          padding: 0.875rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .delete-icon-container {
          margin: 1rem 0 2.5rem;
          color: #94a3b8;
        }

        .modal-footer-actions-delete {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          width: 100%;
        }

        .btn-delete-full {
          background: #ef4444;
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .text-gray-light {
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default ResidentAppointments;
