import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { 
  Users, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  UserPlus,
  DollarSign,
  Building,
  MessageSquare
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Visitors', value: '1,250', change: '+5%', color: 'var(--text-success)', icon: <Users size={20} /> },
    { label: 'Active Hosts', value: '145', change: '+12%', color: 'var(--bg-brand)', icon: <Building size={20} /> },
    { label: 'Estate Managers', value: '38', change: '+2%', color: '#10b981', icon: <ShieldCheck size={20} /> },
    { label: 'Active Tickets', value: '45', change: '-8%', color: '#ef4444', icon: <MessageSquare size={20} /> },
    { label: 'New Leads', value: '12', change: '+15%', color: '#f59e0b', icon: <UserPlus size={20} /> },
    { label: 'Total Revenue', value: '$124.5k', change: '+22%', color: 'var(--text-success)', icon: <DollarSign size={20} /> },
  ];

  const invoicesDue = [
    { id: 'INV-001', host: 'TechCorp Industries', amount: '$1,200', dueDate: 'Today' },
    { id: 'INV-002', host: 'Victoria Garden City', amount: '$4,500', dueDate: 'Tomorrow' },
    { id: 'INV-003', host: 'Acme Corp', amount: '$850', dueDate: '12th July, 2023' },
    { id: 'INV-004', host: 'Sunrise Estates', amount: '$2,100', dueDate: '15th July, 2023' },
  ];

  const invoiceStats = [
    { name: 'Paid', value: 65, color: '#10b981' },
    { name: 'Pending', value: 25, color: '#f59e0b' },
    { name: 'Overdue', value: 10, color: '#ef4444' },
  ];

  const recentHosts = [
    { name: 'TechCorp Industries', plan: 'Enterprise', date: '2 hours ago' },
    { name: 'Acme Corp', plan: 'Pro', date: '5 hours ago' },
    { name: 'Global Tech', plan: 'Basic', date: 'Yesterday' },
    { name: 'Nexus Solutions', plan: 'Enterprise', date: 'Yesterday' },
    { name: 'Alpha Dynamics', plan: 'Pro', date: '2 days ago' },
    { name: 'Omega Systems', plan: 'Pro', date: '3 days ago' },
    { name: 'Zeta Corp', plan: 'Basic', date: '3 days ago' },
    { name: 'Beta Ltd', plan: 'Enterprise', date: '4 days ago' },
    { name: 'Gamma Inc', plan: 'Basic', date: '4 days ago' },
    { name: 'Delta Partners', plan: 'Pro', date: '5 days ago' },
  ];

  const monthlySignups = [
    { month: 'Jan', hosts: 12, managers: 2 },
    { month: 'Feb', hosts: 15, managers: 3 },
    { month: 'Mar', hosts: 22, managers: 5 },
    { month: 'Apr', hosts: 18, managers: 4 },
    { month: 'May', hosts: 30, managers: 8 },
    { month: 'Jun', hosts: 35, managers: 7 },
    { month: 'Jul', hosts: 42, managers: 10 },
    { month: 'Aug', hosts: 38, managers: 9 },
    { month: 'Sep', hosts: 45, managers: 12 },
    { month: 'Oct', hosts: 55, managers: 15 },
    { month: 'Nov', hosts: 60, managers: 18 },
    { month: 'Dec', hosts: 75, managers: 25 },
  ];

  const recentEstateManagers = [
    { name: 'Victoria Garden City', manager: 'John Doe', date: '1 hour ago' },
    { name: 'Sunrise Estates', manager: 'Jane Smith', date: '4 hours ago' },
    { name: 'Oakwood Residences', manager: 'Michael Johnson', date: 'Yesterday' },
    { name: 'Pine Valley', manager: 'Emily Davis', date: 'Yesterday' },
    { name: 'Maple View', manager: 'Chris Wilson', date: '2 days ago' },
    { name: 'Cedar Ridge', manager: 'Sarah Brown', date: '3 days ago' },
    { name: 'Birch Wood', manager: 'David Miller', date: '3 days ago' },
    { name: 'Willow Creek', manager: 'Lisa Taylor', date: '4 days ago' },
    { name: 'Aspen Hills', manager: 'Mark Anderson', date: '5 days ago' },
    { name: 'Elm Heights', manager: 'Amy Thomas', date: '5 days ago' },
  ];

  const heatmapDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const heatmapData = heatmapDays.map(day => ({
    day,
    hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50))
  }));

  const getHeatmapColor = (val) => {
    if (val === 0) return 'var(--bg-subtle)';
    if (val < 10) return 'rgba(0, 144, 230, 0.2)';
    if (val < 25) return 'rgba(0, 144, 230, 0.5)';
    if (val < 40) return 'rgba(0, 144, 230, 0.8)';
    return 'var(--bg-brand)';
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Welcome Admin,</h1>
        <div className="date-display">
          <Calendar size={16} />
          <span>Today's Date: <strong>1st July, 2023</strong></span>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Main Section */}
        <div className="main-stats">
          <div className="stats-row">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="stat-card"
              >
                <div className="stat-info">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-change" style={{ color: stat.color }}>
                    <TrendingUp size={12} style={{ marginRight: '4px' }} /> {stat.change} This Month
                  </span>
                </div>
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="charts-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="dashboard-card">
              <h3>Invoice Status</h3>
              <div style={{ height: '300px', marginTop: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {invoiceStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Invoices Due</h3>
              <div className="list-container" style={{ marginTop: '1rem' }}>
                {invoicesDue.map((invoice, idx) => (
                  <div key={idx} className="list-item">
                    <div className="list-item-info">
                      <h4>{invoice.host}</h4>
                      <p>Invoice {invoice.id}</p>
                    </div>
                    <div className="list-item-meta" style={{ textAlign: 'right' }}>
                      <span className="amount" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{invoice.amount}</span>
                      <p style={{ fontSize: '0.75rem', fontWeight: 600, color: invoice.dueDate === 'Today' ? '#ef4444' : 'var(--text-tertiary)', marginTop: '0.25rem' }}>Due {invoice.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="growth-charts-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className="dashboard-card">
              <h3>Hosts Added Per Month</h3>
              <div style={{ height: '300px', marginTop: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySignups} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-default)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} />
                    <RechartsTooltip cursor={{ fill: 'var(--bg-subtle)' }} contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-default)' }} />
                    <Bar dataKey="hosts" name="Hosts" fill="var(--bg-brand)" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Estate Managers Added Per Month</h3>
              <div style={{ height: '300px', marginTop: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySignups} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-default)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} />
                    <RechartsTooltip cursor={{ fill: 'var(--bg-subtle)' }} contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-default)' }} />
                    <Bar dataKey="managers" name="Estate Managers" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="dashboard-card" style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
            <h3>Last Login Users (Heatmap)</h3>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Login frequency across the system over the last week.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '700px' }}>
              <div style={{ display: 'flex', gap: '4px', paddingLeft: '40px' }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{i}h</div>
                ))}
              </div>
              {heatmapData.map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div style={{ width: '36px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.day}</div>
                  {row.hours.map((val, j) => (
                    <div key={j} title={`${val} logins at ${j}:00 on ${row.day}`} style={{ flex: 1, aspectRatio: '1/1', background: getHeatmapColor(val), borderRadius: '4px', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}></div>
                  ))}
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <span>Less</span>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'var(--bg-subtle)' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(0, 144, 230, 0.2)' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(0, 144, 230, 0.5)' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(0, 144, 230, 0.8)' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'var(--bg-brand)' }}></div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="secondary-content">
          <div className="dashboard-card">
            <div className="section-header">
              <h3>Last 10 Hosts</h3>
            </div>
            <div className="list-container">
              {recentHosts.map((host, idx) => (
                <div key={idx} className="list-item small">
                  <div className="list-icon" style={{ color: 'var(--bg-brand)', backgroundColor: 'rgba(0, 144, 230, 0.1)' }}><Building size={16} /></div>
                  <div className="list-item-info">
                    <h4>{host.name}</h4>
                    <p>{host.plan} Plan</p>
                  </div>
                  <span className="time">{host.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="section-header">
              <h3>Last 10 Estate Managers</h3>
            </div>
            <div className="list-container">
              {recentEstateManagers.map((estate, idx) => (
                <div key={idx} className="list-item small">
                  <div className="list-icon" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}><ShieldCheck size={16} /></div>
                  <div className="list-item-info">
                    <h4>{estate.name}</h4>
                    <p>{estate.manager}</p>
                  </div>
                  <span className="time">{estate.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .admin-dashboard {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--bg-brand);
        }

        .date-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-surface);
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          border: 1px solid var(--border-default);
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .date-display strong {
          color: var(--text-primary);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .main-stats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          background: var(--bg-surface);
          padding: 1.5rem;
          border-radius: 24px;
          border: 1px solid var(--border-default);
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--bg-brand);
        }

        .stat-change {
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .dashboard-card {
          background: var(--bg-surface);
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid var(--border-default);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        .dashboard-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .section-header h3 {
          margin-bottom: 0;
        }

        .list-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .list-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-subtle);
          border-radius: 12px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .list-item.small {
          padding: 0.75rem;
        }

        .list-item:hover {
          background: var(--bg-surface);
          border-color: var(--border-default);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.02);
        }

        .list-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .list-item-info {
          flex: 1;
        }

        .list-item-info h4 {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.25rem 0;
        }

        .list-item-info p {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .time {
          font-size: 0.75rem;
          color: var(--text-quaternary);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .charts-container { grid-template-columns: 1fr !important; }
          .growth-charts-container { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .admin-dashboard { padding: 1rem; gap: 1.5rem; }
          .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .dashboard-header h1 { font-size: 1.4rem; }
          .stats-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
