import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Ticket,
  CheckCircle2,
  Circle,
  ShieldCheck,
  TrendingUp,
  Calendar,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

const GroupedBarChart = ({ data, height = 300 }) => {
  const W = 560;
  const H = height;
  const padL = 28;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = Math.max(...data.flatMap((d) => [d.open, d.closed]), 1);
  const groupW = chartW / data.length;
  const barPad = groupW * 0.18;
  const barW = (groupW - barPad * 2) / 2 - 2;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + chartH * (1 - t),
    label: Math.round(maxVal * t),
  }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H }}>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={padL} y1={t.y} x2={W - padR} y2={t.y} stroke="var(--bg-muted)" strokeWidth={1} />
          <text x={padL - 4} y={t.y + 4} textAnchor="end" fontSize={9} fill="var(--text-quaternary)" fontFamily="inherit">{t.label}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const groupX = padL + i * groupW + barPad;
        const openH = (d.open / maxVal) * chartH;
        const closedH = (d.closed / maxVal) * chartH;
        return (
          <g key={i}>
            <rect x={groupX} y={padT + chartH - openH} width={barW} height={openH} fill="#f59e0b" rx={2} />
            <rect x={groupX + barW + 2} y={padT + chartH - closedH} width={barW} height={closedH} fill="var(--bg-brand)" rx={2} opacity={0.75} />
            {(i % Math.ceil(data.length / 7) === 0 || i === data.length - 1) && (
              <text x={groupX + groupW / 2 - barPad} y={H - 6} textAnchor="middle" fontSize={9} fill="var(--text-quaternary)" fontFamily="inherit">{d.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const PieChart = ({ segments, size = 160 }) => {
  const r = 60;
  const cx = size / 2;
  const cy = size / 2;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const arcs = segments.reduce((acc, seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(acc.currentAngle);
    const y1 = cy + r * Math.sin(acc.currentAngle);
    const nextAngle = acc.currentAngle + angle;
    const x2 = cx + r * Math.cos(nextAngle);
    const y2 = cy + r * Math.sin(nextAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
    acc.arcs.push({ d, color: seg.color });
    acc.currentAngle = nextAngle;
    return acc;
  }, { currentAngle: -Math.PI / 2, arcs: [] }).arcs;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      {arcs.map((arc, i) => <path key={i} d={arc.d} fill={arc.color} stroke="white" strokeWidth={2} />)}
      <circle cx={cx} cy={cy} r={r * 0.48} fill="white" />
    </svg>
  );
};

const TICKET_LIST = [
  { id: 'TK-001', subject: 'Unable to login to dashboard', category: 'Account Access', date: '2026-04-01', status: 'Open', createdBy: 'David Fayemi' },
  { id: 'TK-002', subject: 'Payment not reflecting', category: 'Billing', date: '2026-04-03', status: 'Resolved', createdBy: 'Sarah Host' },
  { id: 'TK-003', subject: 'Visitor QR code not working', category: 'Technical Issue', date: '2026-04-05', status: 'Open', createdBy: 'John Resident' },
  { id: 'TK-004', subject: 'Request for bulk visitor import', category: 'Feature Request', date: '2026-04-07', status: 'Closed', createdBy: 'Alice Manager' },
  { id: 'TK-005', subject: 'Appointment notifications not sending', category: 'Technical Issue', date: '2026-04-09', status: 'Open', createdBy: 'David Fayemi' },
];

const STATUS_COLORS = {
  Open: { bg: '#fffbeb', color: '#d97706' },
  Closed: { bg: 'var(--bg-danger-subtle)', color: '#dc2626' },
  Resolved: { bg: '#f0fdf4', color: '#16a34a' },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateBarData = () =>
  Array.from({ length: 30 }, (_, i) => ({
    label: String(i + 1),
    open: Math.floor(Math.random() * 14) + 1,
    closed: Math.floor(Math.random() * 10) + 1,
  }));

const SupportDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split('/')[1];
  const [selectedMonth, setSelectedMonth] = useState('Apr');
  const [monthOpen, setMonthOpen] = useState(false);
  const chartData = useMemo(() => generateBarData(), [selectedMonth]);

  const stats = [
    { label: 'Total Tickets', value: 148, icon: <Ticket size={20} />, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Open Tickets', value: 42, icon: <Circle size={20} />, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Closed Tickets', value: 78, icon: <CheckCircle2 size={20} />, color: 'var(--text-danger)', bg: 'var(--bg-danger-subtle)' },
    { label: 'Resolved Tickets', value: 28, icon: <ShieldCheck size={20} />, color: 'var(--text-success)', bg: '#f0fdf4' },
  ];

  const pieSegments = [
    { label: 'Open', value: 42, color: '#f59e0b' },
    { label: 'Closed', value: 78, color: 'var(--text-danger)' },
    { label: 'Resolved', value: 28, color: 'var(--text-success)' },
  ];

  return (
    <div className="sp-dashboard">
      <div className="sp-page-header"><h1>Support Dashboard</h1></div>

      <div className="sp-stats-grid">
        {stats.map((s, i) => (
          <motion.div key={i} className="sp-stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="sp-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="sp-stat-body">
              <span className="sp-stat-label">{s.label}</span>
              <span className="sp-stat-value">{s.value}</span>
            </div>
            <TrendingUp size={14} className="sp-trend" style={{ color: s.color }} />
          </motion.div>
        ))}
      </div>

      <div className="sp-charts-row">
        <div className="sp-chart-card sp-bar-card">
          <div className="sp-chart-header">
            <div>
              <h3>Ticket Trends</h3>
              <p>Daily open &amp; closed tickets — {selectedMonth} 2026</p>
            </div>
            <div className="sp-chart-controls">
              <div className="sp-bar-legend">
                <span className="sp-legend-dot" style={{ background: '#f59e0b' }} />
                <span className="sp-legend-tag">Open</span>
                <span className="sp-legend-dot" style={{ background: 'var(--bg-brand)', opacity: 0.75 }} />
                <span className="sp-legend-tag">Closed</span>
              </div>
              <div className="sp-month-picker" onClick={() => setMonthOpen(!monthOpen)}>
                <Calendar size={14} />
                <span>{selectedMonth}</span>
                <ChevronDown size={14} className={monthOpen ? 'rotated' : ''} />
                {monthOpen && (
                  <div className="sp-month-dropdown">
                    {MONTHS.map((m) => (
                      <button key={m} className={m === selectedMonth ? 'active' : ''} onClick={(e) => { e.stopPropagation(); setSelectedMonth(m); setMonthOpen(false); }}>{m}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sp-bar-chart-wrap"><GroupedBarChart data={chartData} height={300} /></div>
        </div>

        <div className="sp-chart-card sp-pie-card">
          <div className="sp-chart-header">
            <div><h3>Ticket Breakdown</h3><p>Distribution by status</p></div>
          </div>
          <div className="sp-pie-wrap">
            <PieChart segments={pieSegments} size={180} />
            <div className="sp-pie-center-text">
              <span className="sp-pie-total">148</span>
              <span className="sp-pie-label-sm">Total</span>
            </div>
          </div>
          <div className="sp-legend">
            {pieSegments.map((seg, i) => (
              <div key={i} className="sp-legend-item">
                <span className="sp-legend-dot" style={{ background: seg.color }} />
                <span className="sp-legend-name">{seg.label}</span>
                <span className="sp-legend-val">{seg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sp-recent-card">
        <div className="sp-recent-header">
          <div><h3>Recent Tickets</h3><p>Last 5 submitted tickets</p></div>
          <button className="sp-btn-see-all" onClick={() => navigate(`/${role}/support/tickets`)}>
            See all <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="sp-recent-table">
            <thead>
              <tr>
                <th>Ticket ID</th><th>Subject</th><th>Category</th><th>Created By</th><th>Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TICKET_LIST.map((t) => {
                const sc = STATUS_COLORS[t.status] || {};
                return (
                  <tr key={t.id} className="sp-recent-row" onClick={() => navigate(`/${role}/support/tickets/${t.id}`)}>
                    <td className="sp-id-cell">{t.id}</td>
                    <td className="sp-subject-cell">{t.subject}</td>
                    <td className="sp-gray">{t.category}</td>
                    <td className="sp-gray">{t.createdBy}</td>
                    <td className="sp-gray">{t.date}</td>
                    <td><span className="sp-status-pill" style={{ background: sc.bg, color: sc.color }}>{t.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx="true">{`
        .sp-dashboard { display: flex; flex-direction: column; gap: 1.75rem; padding-bottom: 3rem; }
        .sp-page-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0; }
        .sp-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .sp-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; position: relative; }
        .sp-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sp-stat-body { display: flex; flex-direction: column; gap: 2px; }
        .sp-stat-label { font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; }
        .sp-stat-value { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        .sp-trend { position: absolute; top: 1.25rem; right: 1.25rem; opacity: 0.6; }
        .sp-charts-row { display: grid; grid-template-columns: 1fr 320px; gap: 1.25rem; }
        .sp-chart-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; }
        .sp-chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
        .sp-chart-header h3 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 2px; }
        .sp-chart-header p { font-size: 0.75rem; color: var(--text-quaternary); font-weight: 500; }
        .sp-chart-controls { display: flex; align-items: center; gap: 0.875rem; flex-wrap: wrap; }
        .sp-bar-legend { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); }
        .sp-legend-tag { margin-right: 6px; }
        .sp-month-picker { position: relative; display: flex; align-items: center; gap: 6px; background: var(--bg-subtle); border: 1px solid var(--border-default); border-radius: 8px; padding: 6px 10px; font-size: 0.75rem; font-weight: 700; color: var(--text-primary); cursor: pointer; user-select: none; }
        .sp-month-picker .rotated { transform: rotate(180deg); }
        .sp-month-dropdown { position: absolute; top: calc(100% + 6px); right: 0; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 200; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; padding: 8px; width: 160px; }
        .sp-month-dropdown button { background: none; border: none; padding: 6px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: var(--text-tertiary); cursor: pointer; text-align: center; }
        .sp-month-dropdown button:hover { background: var(--bg-muted); color: var(--bg-brand); }
        .sp-month-dropdown button.active { background: var(--bg-brand); color: var(--text-inverse); }
        .sp-bar-chart-wrap { width: 100%; overflow: hidden; }
        .sp-pie-wrap { position: relative; display: flex; justify-content: center; align-items: center; margin: 0.5rem 0 1.5rem; }
        .sp-pie-center-text { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }
        .sp-pie-total { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        .sp-pie-label-sm { font-size: 0.6875rem; color: var(--text-quaternary); font-weight: 600; }
        .sp-legend { display: flex; flex-direction: column; gap: 0.75rem; }
        .sp-legend-item { display: flex; align-items: center; gap: 0.75rem; }
        .sp-legend-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
        .sp-legend-name { font-size: 0.8125rem; color: var(--text-secondary); font-weight: 600; flex: 1; }
        .sp-legend-val { font-size: 0.875rem; font-weight: 800; color: var(--text-primary); }
        .sp-recent-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; }
        .sp-recent-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
        .sp-recent-header h3 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 2px; }
        .sp-recent-header p { font-size: 0.75rem; color: var(--text-quaternary); font-weight: 500; }
        .sp-btn-see-all { background: none; border: none; font-size: 0.8125rem; font-weight: 700; color: var(--text-tertiary); display: flex; align-items: center; gap: 4px; cursor: pointer; }
        .sp-recent-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 600px; }
        .sp-recent-table th { padding: 0.75rem 0; font-size: 0.75rem; font-weight: 600; color: var(--text-quaternary); border-bottom: 1px solid var(--bg-muted); }
        .sp-recent-table td { padding: 1rem 0; font-size: 0.875rem; border-bottom: 1px solid var(--bg-muted); }
        .sp-recent-table tbody tr:last-child td { border-bottom: none; }
        .sp-recent-row { cursor: pointer; transition: background 0.15s; }
        .sp-recent-row:hover td { background: var(--bg-subtle); }
        .sp-id-cell { font-weight: 700; color: var(--text-primary); padding-right: 0.5rem; }
        .sp-subject-cell { font-weight: 600; color: var(--text-primary); max-width: 200px; }
        .sp-gray { color: var(--text-tertiary); }
        .sp-status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }

        @media (max-width: 1100px) {
          .sp-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .sp-charts-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .sp-dashboard { padding: 1rem; }
          .sp-page-header h1 { font-size: 1.5rem; }
          .sp-stats-grid { grid-template-columns: 1fr; }
          .sp-chart-header { flex-direction: column; gap: 1rem; }
          .sp-chart-controls { width: 100%; justify-content: space-between; }
          .sp-recent-card { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default SupportDashboard;
