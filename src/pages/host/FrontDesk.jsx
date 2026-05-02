import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye,
  Trash2,
  Check, 
  X,
  Edit2,
  Calendar,
  Image as ImageIcon,
  MoreVertical,
  Ban
} from 'lucide-react';
import Pagination from '../../components/Pagination';

const Modal = ({ isOpen, onClose, children, maxWidth = '850px' }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(13, 35, 49, 0.4)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="modal-container" 
        style={{ 
          maxWidth, background: 'white', width: '100%', borderRadius: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', position: 'relative',
          maxHeight: '90vh', overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-simple" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 100 }}>
          <button className="btn-close-circle" onClick={onClose} style={{
            background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%',
            width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#1e293b'
          }}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body-p-0" style={{ padding: 0 }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const FrontDeskOfficers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const officers = [
    { id: '1', firstName: 'Elizabeth', lastName: 'Alago', status: 'Active', phone: '0814 609 2019', email: 'alago@invisitor.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth' },
    { id: '2', firstName: 'Victoria', lastName: 'Santos', status: 'Active', phone: '0814 609 2019', email: 'santos@invisitor.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria' },
    { id: '3', firstName: 'John', lastName: 'Doe', status: 'Active', phone: '0814 609 2019', email: 'john@invisitor.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { id: '4', firstName: 'David', lastName: 'Fayemi', status: 'Active', phone: '0814 609 2019', email: 'david@invisitor.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    { id: '5', firstName: 'Michael', lastName: 'Ngo', status: 'Inactive', phone: '0814 609 2019', email: 'michael@invisitor.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleAddSubmit = () => {
    setIsAddModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleViewOfficer = (officer) => {
    setSelectedOfficer(officer);
    setIsEditMode(false);
    setIsViewModalOpen(true);
  };

  const handleEditOfficer = (officer) => {
    setSelectedOfficer(officer);
    setIsEditMode(true);
    setIsViewModalOpen(true);
  };

  const handleDeleteOfficer = (officer) => {
    setSelectedOfficer(officer);
    setIsDeleteModalOpen(true);
  };

  // Pagination Logic
  const totalItems = officers.length;
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return officers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);

  return (
    <div className="frontdesk-page">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div className="header-left">
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' }}>Front-Desk Officers</h1>
          <div className="status-tabs-group" style={{ display: 'flex', gap: '1.25rem' }}>
            <button className="status-tab active" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', color: '#0d2331', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              All Front-Desk Officers <span className="tab-pill" style={{ background: '#0d2331', color: 'white', fontSize: '0.75rem', padding: '2px 10px', borderRadius: '10px' }}>120</span>
            </button>
            <button className="status-tab" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', background: 'transparent', border: '1px solid transparent', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>
              Recently Added <span className="tab-pill" style={{ background: '#e2e8f0', color: '#64748b', fontSize: '0.75rem', padding: '2px 10px', borderRadius: '10px' }}>5</span>
            </button>
          </div>
        </div>
        <button className="btn-add-primary" onClick={() => setIsAddModalOpen(true)} style={{ background: '#0d2331', color: 'white', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <Plus size={18} />
          Add New Front-Desk Officer
        </button>
      </header>

      <div className="table-container" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
        <div className="table-header" style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', gap: '0.75rem', width: '300px' }}>
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Search officers..." style={{ background: 'none', border: 'none', outline: 'none', fontSize: '0.875rem', width: '100%', color: '#1e293b' }} />
          </div>
          <button className="btn-filter" style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: '600', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <Filter size={18} />
            Filter
          </button>
        </div>

        <table className="officers-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', background: '#f8fafc', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}><input type="checkbox" /></th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', background: '#f8fafc', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', background: '#f8fafc', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', background: '#f8fafc', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Phone</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', background: '#f8fafc', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Email Address</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}></th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((officer) => (
              <tr key={officer.id} style={{ cursor: 'pointer', transition: 'background 0.2s', position: 'relative' }} onClick={() => handleViewOfficer(officer)} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                <td style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }} onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                <td style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div className="user-cell" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={officer.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>{officer.firstName} {officer.lastName}</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{officer.status}</span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{officer.phone}</span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{officer.email}</span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', textAlign: 'right', position: 'relative' }}>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', height: '100%', padding: '0 0.5rem' }} 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setOpenDropdownId(openDropdownId === officer.id ? null : officer.id); 
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openDropdownId === officer.id && (
                    <div style={{ position: 'absolute', right: '1.5rem', top: '100%', marginTop: '-1rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', zIndex: 50, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', overflow: 'hidden', width: '200px', padding: '0.5rem' }}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', color: '#475569', borderRadius: '8px', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); handleViewOfficer(officer); setOpenDropdownId(null); }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0d2331'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                        <Eye size={16} color="#94a3b8" /> <span style={{ flex: 1 }}>View</span>
                      </button>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', color: '#475569', borderRadius: '8px', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); handleEditOfficer(officer); setOpenDropdownId(null); }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0d2331'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                        <Edit2 size={16} color="#94a3b8" /> <span style={{ flex: 1 }}>Edit</span>
                      </button>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', color: '#475569', borderRadius: '8px', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0d2331'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                        <Ban size={16} color="#94a3b8" /> <span style={{ flex: 1 }}>Suspend</span>
                      </button>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', color: '#ef4444', borderRadius: '8px', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); handleDeleteOfficer(officer); setOpenDropdownId(null); }} onMouseEnter={(e) => e.currentTarget.style.background = '#fee2e2'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <Trash2 size={16} color="#ef4444" /> <span style={{ flex: 1 }}>Delete</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
        onPageSizeChange={size => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} maxWidth="700px">
            <div className="modal-content-wrapper" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <header style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0d2331', marginBottom: '0.5rem' }}>Add a Front-Desk Officer</h2>
                <p style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: '600' }}>Create a front-desk officer account</p>
              </header>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', border: '2px dashed #cbd5e1' }}>
                  <ImageIcon size={32} color="#94a3b8" />
                </div>
                <button style={{ background: 'none', border: 'none', color: '#00a3ff', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Change Profile Picture</button>
              </div>

              <div className="form-grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>FIRST NAME</label>
                  <input type="text" placeholder="First Name" style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>LAST NAME</label>
                  <input type="text" placeholder="Last Name" style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>
                
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>GENDER</label>
                  <select style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>DATE OF BIRTH (Optional)</label>
                  <div style={{ position: 'relative' }}>
                    <input type="date" style={{ width: '100%', padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                    <Calendar size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>PHONE NUMBER</label>
                  <input type="text" placeholder="Enter phone" style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>EMAIL ADDRESS</label>
                  <input type="email" placeholder="example@email.com" style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>

                <div className="form-field" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>COMPANY NAME (Optional)</label>
                  <input type="text" placeholder="Enter Company Name" style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>IDENTIFICATION DOCUMENT</label>
                  <select style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }}>
                    <option>Passport</option>
                    <option>Driver's License</option>
                  </select>
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>ID NUMBER</label>
                  <input type="text" placeholder="ID number" style={{ padding: '0.875rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={handleAddSubmit} style={{ background: '#0d2331', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Create Front-Desk Officer Account</button>
                <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'white', color: '#0d2331', border: '1px solid #e2e8f0', padding: '1rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} maxWidth="500px">
            <div style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0d2331', marginBottom: '1.5rem' }}>Front-Desk Officer Account Created</h2>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.5rem 0 2.5rem' }}>
                <Check size={40} color="white" strokeWidth={3} />
              </div>
              <p style={{ fontSize: '0.875rem', color: '#475569', fontWeight: '600', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                We have sent an invitation email to the phone & email address of the Front-Desk Officer.
              </p>
              <button onClick={() => setIsSuccessModalOpen(false)} style={{ background: 'white', color: '#0d2331', border: '1px solid #e2e8f0', padding: '0.875rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>View Front-Desk Officers</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} maxWidth="500px">
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ width: '80px', height: '80px', background: '#fee2e2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Trash2 size={40} />
              </div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0d2331', marginBottom: '0.75rem' }}>Delete Officer Account?</h4>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '2rem' }}>Are you sure you want to remove <strong>{selectedOfficer?.firstName} {selectedOfficer?.lastName}</strong>? This action cannot be undone.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button style={{ background: '#ef4444', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer' }} onClick={() => setIsDeleteModalOpen(false)}>Yes, Delete Account</button>
                <button style={{ background: 'white', color: '#0d2331', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '700', cursor: 'pointer' }} onClick={() => setIsDeleteModalOpen(false)}>No, Cancel</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Profile/Edit Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedOfficer && (
          <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} maxWidth="700px">
             <div className="modal-content-wrapper" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0d2331' }}>{isEditMode ? 'Edit Front-Desk Officer' : 'Front-Desk Officer Profile'}</h2>
              </header>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={selectedOfficer.avatar} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '0.75rem', border: '2px dashed #e2e8f0', padding: '2px' }} />
                  {isEditMode && <button style={{ background: 'none', border: 'none', color: '#00a3ff', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Change Profile Picture</button>}
                </div>
                {!isEditMode && (
                  <button onClick={() => setIsEditMode(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: '#0d2331', border: '1px solid #e2e8f0', padding: '0.75rem 1.25rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>

              <div className="form-grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>FIRST NAME</label>
                  <input type="text" readOnly={!isEditMode} defaultValue={selectedOfficer.firstName} style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>LAST NAME</label>
                  <input type="text" readOnly={!isEditMode} defaultValue={selectedOfficer.lastName} style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>
                
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>GENDER</label>
                  <select disabled={!isEditMode} defaultValue="Male" style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none', opacity: 1, appearance: isEditMode ? 'auto' : 'none' }}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>DATE OF BIRTH</label>
                  <div style={{ position: 'relative' }}>
                    <input type="date" readOnly={!isEditMode} defaultValue="1994-12-24" style={{ width: '100%', padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                  </div>
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>PHONE NUMBER</label>
                  <input type="text" readOnly={!isEditMode} defaultValue={selectedOfficer.phone} style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>EMAIL ADDRESS</label>
                  <input type="email" readOnly={!isEditMode} defaultValue={selectedOfficer.email} style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>

                <div className="form-field" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>COMPANY NAME (Optional)</label>
                  <input type="text" readOnly={!isEditMode} defaultValue="Invisitor" style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>IDENTIFICATION DOCUMENT</label>
                  <select disabled={!isEditMode} defaultValue="Passport" style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none', opacity: 1, appearance: isEditMode ? 'auto' : 'none' }}>
                    <option>Passport</option>
                    <option>Driver's License</option>
                  </select>
                </div>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b' }}>ID NUMBER</label>
                  <input type="text" readOnly={!isEditMode} defaultValue="2459039304" style={{ padding: '0.875rem', border: isEditMode ? '1.5px solid #e2e8f0' : '1px solid #f1f5f9', background: isEditMode ? 'white' : '#f8fafc', borderRadius: '12px', fontSize: '0.875rem', color: '#1e293b', outline: 'none' }} />
                </div>
              </div>

              {isEditMode && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button onClick={() => setIsViewModalOpen(false)} style={{ background: '#0d2331', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Save Changes</button>
                  <button onClick={() => setIsEditMode(false)} style={{ background: 'white', color: '#0d2331', border: '1px solid #e2e8f0', padding: '1rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                </div>
              )}

            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FrontDeskOfficers;
