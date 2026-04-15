import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Clock,
  MapPin,
  X
} from 'lucide-react';

const FrontDeskOfficers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const officers = [
    { id: '1', name: 'John Doe', shift: 'Morning', status: 'On Duty', estate: 'Shalom Heights', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { id: '2', name: 'Sarah Parker', shift: 'Evening', status: 'Off Duty', estate: 'Simmons Estates', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahP' },
    { id: '3', name: 'Michael Chen', shift: 'Night', status: 'On Duty', estate: 'Shalom Heights', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  ];

  return (
    <div className="frontdesk-page">
      <header className="page-header">
        <div className="header-left">
          <h1>Front-Desk Officers</h1>
          <p className="subtitle">Manage security personnel and desk officers for your estates</p>
        </div>
        <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          Add New Officer
        </button>
      </header>

      <div className="table-container">
        <div className="table-header">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search officers..." />
          </div>
          <button className="btn-filter">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <table className="officers-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Name</th>
              <th>Shift</th>
              <th>Assigned Estate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="user-cell">
                    <img src={officer.avatar} alt="" />
                    <span>{officer.name}</span>
                  </div>
                </td>
                <td>
                  <div className="shift-cell">
                    <Clock size={14} />
                    {officer.shift}
                  </div>
                </td>
                <td>
                  <div className="estate-cell">
                    <MapPin size={14} />
                    {officer.estate}
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${officer.status === 'On Duty' ? 'active' : 'inactive'}`}>
                    {officer.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon"><Eye size={16} /></button>
                    <button className="btn-icon"><Edit size={16} /></button>
                    <button className="btn-icon delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx="true">{`
        .frontdesk-page { display: flex; flex-direction: column; gap: 2rem; }
        .page-header { display: flex; justify-content: space-between; align-items: center; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; color: #0d2331; margin-bottom: 0.25rem; }
        .subtitle { color: #64748b; font-size: 0.875rem; }
        
        .btn-add { background: #0d2331; color: white; padding: 0.75rem 1.5rem; border-radius: 12px; border: none; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }

        .table-container { background: white; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; }
        .table-header { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        
        .search-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; display: flex; align-items: center; padding: 0.5rem 1rem; gap: 0.75rem; width: 300px; }
        .search-box input { background: none; border: none; outline: none; font-size: 0.875rem; width: 100%; }
        .search-box svg { color: #94a3b8; }

        .btn-filter { background: white; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 10px; font-size: 0.875rem; font-weight: 600; color: #64748b; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }

        .officers-table { width: 100%; border-collapse: collapse; }
        .officers-table th { background: #f8fafc; padding: 1rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
        .officers-table td { padding: 1.25rem 1.5rem; font-size: 0.875rem; color: #1e293b; border-bottom: 1px solid #f1f5f9; }
        
        .user-cell { display: flex; align-items: center; gap: 0.75rem; }
        .user-cell img { width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9; }
        
        .shift-cell, .estate-cell { display: flex; align-items: center; gap: 0.5rem; color: #64748b; }
        
        .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .status-pill.active { background: #dcfce7; color: #15803d; }
        .status-pill.inactive { background: #f1f5f9; color: #64748b; }

        .action-btns { display: flex; gap: 0.5rem; }
        .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; }
        .btn-icon:hover { background: #f1f5f9; color: #0d2331; }
        .btn-icon.delete:hover { background: #fee2e2; color: #ef4444; border-color: #fca5a5; }
      `}</style>
    </div>
  );
};

export default FrontDeskOfficers;
