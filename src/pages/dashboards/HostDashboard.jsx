import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  UserCheck,
  Plus,
  Clock,
  MoreVertical,
  Check,
  FileText,
  Share2,
  RefreshCcw,
  Copy,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

const HostDashboard = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = React.useState(false);
  const [isAddVisitorModalOpen, setIsAddVisitorModalOpen] = React.useState(false);
  const [isAddSuccess, setIsAddSuccess] = React.useState(false);
  const [isVisitorSuccess, setIsVisitorSuccess] = React.useState(false);
  const [activeAddTab, setActiveAddTab] = React.useState('Visitor');
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);

  const handleConfirmClick = (appt) => {
    setSelectedAppointment(appt);
    setIsConfirmModalOpen(true);
  };

  const handleRescheduleClick = (appt) => {
    setSelectedAppointment(appt);
    setIsRescheduleModalOpen(true);
  };

  const handleQuickAction = (action) => {
    if (action.title.includes('Appointment')) {
      setIsAddModalOpen(true);
    } else if (action.title.includes('Add a Visitor')) {
      setIsAddVisitorModalOpen(true);
    }
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

  const handleAddVisitorSubmit = () => {
    setIsVisitorSuccess(true);
  };

  const resetVisitorModal = () => {
    setIsAddVisitorModalOpen(false);
    setTimeout(() => {
      setIsVisitorSuccess(false);
    }, 300);
  };
  const stats = [
    { label: 'Visitors', value: '1250', change: '5%', color: '#22c55e', icon: <Users size={20} /> },
    { label: 'Front Desk Officer', value: '50', change: '5%', color: '#00a3ff', icon: <UserCheck size={20} /> },
    { label: 'Appointments', value: '50', change: '5%', color: '#f59e0b', icon: <Calendar size={20} /> },
  ];

  const quickActions = [
    { title: 'Create an Appointment', desc: 'Schedule an appointment for a visitor', icon: <Calendar size={20} /> },
    { title: 'Add a Visitor', desc: 'Create a Visitor account', icon: <Plus size={20} /> },
    { title: 'Add a Front Desk Officer', desc: 'Create a Front Desk Officer Account', icon: <Plus size={20} /> },
  ];

  const upcomingAppointments = [
    { name: 'Dr. Alison Ogaga', role: 'General Practitioner', time: 'Today 12:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alison' },
    { name: 'Dr. Jennifer Johnson', role: 'Primary Care Physician', time: '11/15/2024 12:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer' },
    { name: 'Dr. Anish Patel', role: 'General Practitioner', time: '11/16/2024 12:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anish' },
    { name: 'Dr. Samuel Smith', role: 'Cardiologist', time: '11/17/2024 10:00 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel' },
  ];

  return (
    <div className="host-dashboard">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome Manager,</h1>
        </div>
        <div className="date-badge">
          <div className="calendar-icon-box">
            <Calendar size={18} />
          </div>
          <div className="date-text">
            <span>Today's Date</span>
            <strong>1st July, 2023</strong>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="main-col">
          <div className="stats-row">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="stat-content">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                  <div className="stat-meta">
                    <span className="change-badge" style={{ color: stat.color }}>
                      <TrendingUp size={12} /> {stat.change}
                    </span>
                    <span className="meta-period">This Month</span>
                  </div>
                </div>
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="subscription-section">
            <div className="section-title"><h3>Your Subscription</h3></div>
            <div className="subscription-card-detailed">
              <div className="sub-main-info">
                <div className="sub-card-icon">
                  <ShieldCheck size={28} />
                </div>
                <div className="sub-card-text">
                  <h4>Current Subscription</h4>
                  <p>Annual</p>
                </div>
              </div>
              <div className="sub-metrics">
                <div className="metric-item">
                  <label>Max Number Of Users</label>
                  <span>1500</span>
                </div>
                <div className="metric-item">
                  <label>Max Number Of Co-Host</label>
                  <span>25</span>
                </div>
                <div className="metric-item">
                  <label>Start Date</label>
                  <span>24-07-2024</span>
                </div>
                <div className="metric-item">
                  <label>Expiry Day</label>
                  <span>24-07-2025 (365)</span>
                </div>
                <div className="metric-item">
                  <label>Status</label>
                  <span className="status-pill">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-row-split">
            <div className="quick-actions-box">
              <h3>Quick Actions</h3>
              <div className="actions-list">
                {quickActions.map((action, idx) => (
                  <div key={idx} className="action-row" onClick={() => handleQuickAction(action)}>
                    <div className="action-icon-circle">
                      {action.icon}
                    </div>
                    <div className="action-meta">
                      <h5>{action.title}</h5>
                      <p>{action.desc}</p>
                    </div>
                    <ArrowRight size={18} className="row-arrow" />
                  </div>
                ))}
              </div>
            </div>

            <div className="upcoming-box">
              <div className="box-header">
                <h3>Upcoming Appointments</h3>
                <button className="btn-see-all">See all <ArrowRight size={14} /></button>
              </div>
              <div className="upcoming-list">
                {upcomingAppointments.map((appt, idx) => (
                  <div key={idx} className="upcoming-item">
                    <img src={appt.avatar} alt="" />
                    <div className="appt-meta">
                      <h5>{appt.name}</h5>
                      <p>{appt.role}</p>
                      <span className="appt-time">{appt.time}</span>
                    </div>
                    <button className="btn-reschedule-mini" onClick={() => handleRescheduleClick(appt)}>Reschedule</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-col">
          <div className="next-appointment-card">
            <h3>Next Appointment</h3>
            <div className="appointment-focus">
              <h4>Friday, 6 July</h4>
              <div className="focus-row">
                <Clock size={14} />
                <span>11.30 - 12.00 (30 min)</span>
              </div>
              <div className="focus-row">
                <Calendar size={14} />
                <span>Mr. Collis Makanju</span>
              </div>
              
              <div className="invitee-box">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alison" alt="" />
                <div className="invitee-meta">
                  <h5>Dr. Alison Ogaga</h5>
                  <p>General Visitor</p>
                </div>
                <div className="check-mark">✓</div>
              </div>

              <div className="focus-actions-vertical">
                <button className="btn-light" onClick={() => handleRescheduleClick({
                  name: 'Dr. Alison Ogaga',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alison',
                  date: 'Friday, 6 July',
                  time: '11:30'
                })}>Reschedule</button>
                <button className="btn-dark" onClick={() => handleConfirmClick({
                  name: 'Dr. Alison Ogaga',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alison',
                  type: 'General Visitor'
                })}>Confirm appointment</button>
              </div>
            </div>
          </div>
        </div>
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
                  View Dashboard
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
                        <input type="text" placeholder="0814 609 2019" />
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
                        </select>
                      </div>
                      <div className="form-field">
                        <label>HOST NAME</label>
                        <select defaultValue="Harvey Specter">
                          <option>Harvey Specter</option>
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

      {/* Add Visitor Modal */}
      <AnimatePresence>
        {isAddVisitorModalOpen && (
          <Modal 
            isOpen={isAddVisitorModalOpen} 
            onClose={resetVisitorModal}
            maxWidth={isVisitorSuccess ? "500px" : "850px"}
          >
            {isVisitorSuccess ? (
              <div className="success-modal-content-compact">
                <h2 className="confirm-title">Visitor Added Successfully</h2>
                <div className="success-icon-container">
                  <div className="success-circle-large green">
                    <Check size={48} strokeWidth={4} />
                  </div>
                </div>
                <button className="btn-view-appointments" onClick={resetVisitorModal}>
                  View Dashboard
                </button>
              </div>
            ) : (
              <div className="add-appointment-modal-content">
                <header className="add-modal-header">
                  <h2 className="add-modal-title">Add a New Visitor</h2>
                  <p className="add-modal-subtitle">Create a profile for a new visitor</p>
                </header>

                <div className="tab-content-area">
                  <div className="form-grid-2-col">
                    <div className="form-field">
                      <label>VISITOR NAME</label>
                      <input type="text" placeholder="Enter Full Name" />
                    </div>
                    <div className="form-field">
                      <label>GENDER</label>
                      <select defaultValue="Male">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>PHONE NUMBER</label>
                      <input type="text" placeholder="0814 609 2019" />
                    </div>
                    <div className="form-field">
                      <label>EMAIL ADDRESS (Optional)</label>
                      <input type="text" placeholder="visitor@email.com" />
                    </div>
                    <div className="form-field">
                      <label>COMPANY NAME (Optional)</label>
                      <input type="text" placeholder="Enter Company Name" />
                    </div>
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
                      <input type="text" placeholder="e.g. 123456789" />
                    </div>
                  </div>

                  <div className="add-modal-actions" style={{ marginTop: '4rem' }}>
                    <button className="btn-confirm-large" onClick={handleAddVisitorSubmit}>Add Visitor</button>
                    <button className="btn-cancel-large" onClick={resetVisitorModal}>Cancel</button>
                  </div>
                </div>
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
              <p className="confirm-subtext">Invitation code has been sent</p>

              <div className="visitor-confirm-card" style={{ boxShadow: 'none', border: '1px solid #f1f5f9' }}>
                <div className="avatar-wrapper larger" style={{ margin: '0 auto' }}>
                  <img src={selectedAppointment?.avatar} alt="" className="v-avatar" style={{ borderRadius: '50%' }} />
                </div>
                <div className="v-text-center" style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <span className="v-name-large" style={{ display: 'block' }}>{selectedAppointment?.name}</span>
                  <span className="v-role-large">{selectedAppointment?.type || 'Visitor'}</span>
                </div>
              </div>

              <div className="invite-code-display" style={{ fontSize: '2.5rem', margin: '2rem 0' }}>
                453566RC
              </div>

              <div className="modal-footer-actions">
                <button className="btn-footer-primary"><Share2 size={18} /> Share</button>
                <button className="btn-footer-outline"><Copy size={18} /> Copy</button>
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
                <p className="add-modal-subtitle">Update visit time for {selectedAppointment?.name}</p>
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
                </div>

                <div className="add-modal-actions" style={{ marginTop: '4rem' }}>
                  <button className="btn-confirm-large" onClick={() => setIsRescheduleModalOpen(false)}>Reschedule</button>
                  <button className="btn-cancel-large" onClick={() => setIsRescheduleModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .host-dashboard { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 3rem; }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(13, 35, 49, 0.4); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-container {
          background: white; width: 100%; border-radius: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); position: relative;
        }
        .modal-header-simple { position: absolute; top: 1.5rem; right: 1.5rem; z-index: 100; }
        .btn-close-circle {
          background: white; border: 1px solid #e2e8f0; border-radius: 50%;
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #1e293b;
        }
        .modal-body-p-0 { padding: 0; }

        .add-appointment-modal-content { padding: 3rem; display: flex; flex-direction: column; gap: 2rem; }
        .add-modal-title { font-size: 1.5rem; font-weight: 800; color: #0d2331; margin-bottom: 0.5rem; }
        .add-modal-subtitle { color: #94a3b8; font-size: 1rem; font-weight: 600; }
        
        .add-modal-tabs { display: flex; gap: 3rem; border-bottom: 1px solid #f1f5f9; }
        .add-modal-tab {
          background: none; border: none; padding: 1rem 0; display: flex; align-items: center; gap: 0.75rem;
          font-weight: 700; font-size: 1.125rem; color: #94a3b8; cursor: pointer; position: relative;
        }
        .add-modal-tab.active { color: #0d2331; }
        .add-modal-tab.active::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: #0d2331; border-radius: 3px 3px 0 0;
        }

        .form-grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem; }
        .form-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-field label { font-size: 0.75rem; font-weight: 800; color: #1e293b; letter-spacing: 0.5px; }
        .form-field select, .form-field input {
          width: 100%; padding: 0.875rem; border-radius: 10px; border: 1.5px solid #e2e8f0;
          font-size: 0.875rem; color: #1e293b; font-weight: 600; outline: none;
        }
        .input-with-icon { position: relative; }
        .input-with-icon .field-icon { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }

        .add-modal-actions { display: flex; gap: 1rem; margin-top: 3rem; }
        .btn-confirm-large { background: #0d2331; color: white; border: none; padding: 1.125rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .btn-cancel-large { background: white; border: 1px solid #e2e8f0; color: #1e293b; padding: 1.125rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }

        .success-modal-content-compact { padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .success-icon-container { margin: 1.5rem 0 2.5rem; }
        .success-circle-large.green { background: #22c55e; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; }
        .btn-view-appointments { background: white; border: 1px solid #e2e8f0; color: #0d2331; padding: 0.875rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }

        .confirmation-modal-content { padding: 4rem 3rem; text-align: center; }
        .confirm-title { font-size: 2rem; font-weight: 800; color: #0d2331; }
        .confirm-subtext { color: #475569; font-weight: 600; margin: 1rem 0 2rem; }
        .invite-code-display { font-weight: 800; color: #0d2331; letter-spacing: 2px; }
        .modal-footer-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%; }
        .btn-footer-primary { background: #0d2331; color: white; border: none; padding: 1rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; }
        .btn-footer-outline { background: white; border: 1px solid #e2e8f0; color: #0d2331; padding: 1rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; }

        /* Dashboard Styles */
        .dashboard-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .dashboard-header h1 { font-size: 1.5rem; font-weight: 800; color: #1a202c; }
        
        .date-badge {
          background: white; border: 1px solid #e2e8f0; border-radius: 16px;
          display: flex; align-items: center; padding: 0.75rem 1.25rem; gap: 1rem;
        }
        .calendar-icon-box {
          background: #f8fafc; color: #64748b; padding: 0.5rem; border-radius: 10px;
          border: 1px solid #e2e8f0;
        }
        .date-text span { display: block; font-size: 0.75rem; color: #94a3b8; font-weight: 500; }
        .date-text strong { display: block; font-size: 0.875rem; color: #1e293b; }

        .dashboard-grid { display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; }
        .main-col { display: flex; flex-direction: column; gap: 1.5rem; }
        
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .stat-card {
           background: white; border: 1px solid #e2e8f0; border-radius: 20px;
           padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;
        }
        .stat-label { font-size: 0.875rem; color: #94a3b8; font-weight: 600; display: block; margin-bottom: 0.5rem; }
        .stat-value { font-size: 1.75rem; font-weight: 800; color: #1e293b; display: block; }
        .stat-meta { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }
        .change-badge { font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 2px; border-radius: 6px; }
        .meta-period { font-size: 0.75rem; color: #94a3b8; font-weight: 500; }
        .stat-icon-wrapper { background: #f8fafc; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #1e293b; border: 1px solid #e2e8f0; }

        .subscription-section { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .subscription-section h3 { font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; }
        .subscription-card-detailed { display: grid; grid-template-columns: 240px 1fr; border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden; }
        .sub-main-info { padding: 1.5rem; background: white; border-right: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 1rem; }
        .sub-card-icon { background: #1a202c; color: white; width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .sub-card-text h4 { font-size: 0.8125rem; font-weight: 800; color: #1e293b; margin-bottom: 2px; }
        .sub-card-text p { font-size: 0.75rem; color: #94a3b8; }
        .sub-metrics { padding: 1.5rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; background: white; }
        .metric-item label { display: block; font-size: 0.625rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem; }
        .metric-item span { display: block; font-size: 0.875rem; font-weight: 800; color: #1a202c; }
        .status-pill { background: #dcfce7; color: #15803d; padding: 2px 10px; border-radius: 20px; width: fit-content; font-size: 0.75rem !important; font-weight: 700; }

        .dashboard-row-split { display: grid; grid-template-columns: 1fr 1.2fr; gap: 1.5rem; }
        .quick-actions-box, .upcoming-box { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .quick-actions-box h3, .upcoming-box h3 { font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; }
        
        .actions-list { display: flex; flex-direction: column; gap: 1rem; }
        .action-row { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f8fafc; border-radius: 16px; cursor: pointer; transition: all 0.2s; }
        .action-row:hover { transform: translateX(4px); background: #f1f5f9; }
        .action-icon-circle { background: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1a202c; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .action-meta h5 { font-size: 0.875rem; font-weight: 800; color: #1a202c; }
        .action-meta p { font-size: 0.75rem; color: #94a3b8; }
        .row-arrow { color: #cbd5e1; margin-left: auto; }

        .box-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .btn-see-all { background: none; border: none; font-size: 0.8125rem; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 4px; cursor: pointer; }
        .upcoming-list { display: flex; flex-direction: column; gap: 1rem; }
        .upcoming-item { display: flex; align-items: center; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f1f5f9; }
        .upcoming-item:last-child { border-bottom: none; padding-bottom: 0; }
        .upcoming-item img { width: 44px; height: 44px; border-radius: 12px; }
        .appt-meta h5 { font-size: 0.8125rem; font-weight: 800; color: #1a202c; }
        .appt-meta p { font-size: 0.75rem; color: #94a3b8; }
        .appt-meta .appt-time { font-size: 0.6875rem; color: #94a3b8; font-weight: 600; }
        .btn-reschedule-mini { margin-left: auto; background: white; border: 1px solid #e2e8f0; padding: 4px 12px; border-radius: 8px; font-size: 0.6875rem; font-weight: 700; color: #64748b; cursor: pointer; }

        .next-appointment-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .next-appointment-card h3 { font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; }
        .appointment-focus h4 { font-size: 1.125rem; font-weight: 800; color: #1e293b; margin-bottom: 1rem; }
        .focus-row { display: flex; align-items: center; gap: 0.75rem; color: #64748b; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
        
        .invitee-box { margin: 1.5rem 0; background: #f8fafc; padding: 1rem; border-radius: 16px; border: 1px solid #f1f5f9; display: flex; align-items: center; gap: 1rem; position: relative; }
        .invitee-box img { width: 44px; height: 44px; border-radius: 50%; }
        .invitee-meta h5 { font-size: 0.8125rem; font-weight: 800; color: #1a202c; }
        .invitee-meta p { font-size: 0.75rem; color: #94a3b8; }
        .check-mark { position: absolute; right: 1rem; color: #00a3ff; font-weight: 800; }

        .focus-actions-vertical { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem; }
        .btn-light { background: white; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 12px; font-size: 0.8125rem; font-weight: 800; color: #64748b; cursor: pointer; }
        .btn-dark { background: #013745; color: white; border: none; padding: 0.75rem; border-radius: 12px; font-size: 0.8125rem; font-weight: 800; cursor: pointer; }

        @media (max-width: 1200px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .sidebar-col { display: none; }
        }
      `}</style>
    </div>
  );
};

export default HostDashboard;
