import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MOCK_EVENTS = [
  { id: 1, title: 'Estate Board Meeting', date: '2026-05-15', time: '10:00 AM', location: 'Main Hall', type: 'meeting' },
  { id: 2, title: 'Plumbing Maintenance', date: '2026-05-18', time: '02:00 PM', location: 'Block B', type: 'maintenance' },
  { id: 3, title: 'Community Townhall', date: '2026-05-25', time: '06:00 PM', location: 'Clubhouse', type: 'event' },
  { id: 4, title: 'Pest Control', date: '2026-05-05', time: '09:00 AM', location: 'All Blocks', type: 'maintenance' },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const pad = (num) => String(num).padStart(2, '0');

  // Generate grid cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="cal-cell empty"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(d)}`;
    const dayEvents = MOCK_EVENTS.filter(e => e.date === dateStr);
    
    cells.push(
      <div key={`day-${d}`} className="cal-cell">
        <span className="cal-day-num">{d}</span>
        <div className="cal-events-container">
          {dayEvents.map(ev => (
            <div key={ev.id} className={`cal-event-pill ${ev.type}`} title={ev.title}>
              {ev.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cal-page">
      <div className="cal-header">
        <div>
          <h1>Calendar</h1>
          <p>Manage and view your schedule and estate events.</p>
        </div>
      </div>

      <div className="cal-layout">
        {/* Main Calendar Grid */}
        <div className="cal-main-card">
          <div className="cal-toolbar">
            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="cal-nav">
              <button onClick={prevMonth}><ChevronLeft size={20} /></button>
              <button onClick={() => setCurrentDate(new Date(2026, 4, 1))}>Today</button>
              <button onClick={nextMonth}><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="cal-grid-header">
            {DAYS.map(d => <div key={d} className="cal-grid-hcell">{d}</div>)}
          </div>
          <div className="cal-grid-body">
            {cells}
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <aside className="cal-sidebar">
          <h3>Upcoming Events</h3>
          <div className="upcoming-list">
            {MOCK_EVENTS.map((ev, i) => (
              <motion.div 
                key={ev.id} 
                className="upcoming-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`upcoming-indicator ${ev.type}`} />
                <div className="upcoming-info">
                  <h4>{ev.title}</h4>
                  <div className="upcoming-meta">
                    <span><Clock size={12} /> {ev.time}</span>
                    <span><MapPin size={12} /> {ev.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>

      <style jsx>{`
        .cal-page { padding-bottom: 3rem; }
        .cal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .cal-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .cal-header p { color: var(--text-tertiary); }
        .btn-add-event { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.6rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: background 0.2s; }
        .btn-add-event:hover { background: var(--bg-brand-hover); }
        
        .cal-layout { display: flex; gap: 2rem; align-items: flex-start; }
        .cal-main-card { flex: 1; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .cal-sidebar { width: 320px; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.5rem; }
        .cal-sidebar h3 { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem; }
        
        .cal-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .cal-toolbar h2 { font-size: 1.5rem; font-weight: 800; color: var(--bg-brand); margin: 0; }
        .cal-nav { display: flex; align-items: center; gap: 0.5rem; }
        .cal-nav button { background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.5rem; border-radius: 8px; cursor: pointer; color: var(--text-tertiary); font-weight: 600; display: flex; align-items: center; transition: all 0.2s; }
        .cal-nav button:hover { background: var(--bg-subtle); color: var(--text-primary); }
        
        .cal-grid-header { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 0.5rem; }
        .cal-grid-hcell { text-align: right; padding: 0.5rem; font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; }
        
        .cal-grid-body { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--border-default); border: 1px solid var(--border-default); border-radius: 8px; overflow: hidden; }
        .cal-cell { background: var(--bg-surface); min-height: 120px; padding: 0.5rem; display: flex; flex-direction: column; transition: background 0.2s; }
        .cal-cell:hover:not(.empty) { background: var(--bg-subtle); cursor: pointer; }
        .cal-day-num { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); align-self: flex-end; margin-bottom: 0.5rem; }
        .cal-events-container { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; overflow-y: auto; }
        
        .cal-event-pill { font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cal-event-pill.meeting { background: #e0f2fe; color: #0369a1; border-left: 3px solid #0ea5e9; }
        .cal-event-pill.maintenance { background: #fffbeb; color: #d97706; border-left: 3px solid #f59e0b; }
        .cal-event-pill.event { background: #f3e8ff; color: #7e22ce; border-left: 3px solid #a855f7; }
        
        .upcoming-list { display: flex; flex-direction: column; gap: 1rem; }
        .upcoming-card { display: flex; gap: 0.75rem; padding: 1rem; border: 1px solid var(--bg-muted); border-radius: 12px; transition: all 0.2s; cursor: pointer; }
        .upcoming-card:hover { border-color: var(--border-heavy); background: var(--bg-subtle); }
        .upcoming-indicator { width: 4px; border-radius: 4px; }
        .upcoming-indicator.meeting { background: #0ea5e9; }
        .upcoming-indicator.maintenance { background: #f59e0b; }
        .upcoming-indicator.event { background: #a855f7; }
        .upcoming-info h4 { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.25rem 0; }
        .upcoming-meta { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem; color: var(--text-tertiary); font-weight: 500; }
        .upcoming-meta span { display: flex; align-items: center; gap: 0.4rem; }
        
        @media (max-width: 1024px) {
          .cal-layout { flex-direction: column; }
          .cal-sidebar { width: 100%; }
        }
        @media (max-width: 768px) {
          .cal-cell { min-height: 80px; }
          .cal-event-pill { display: none; } /* Hide pills on mobile, maybe just show dots */
        }
      `}</style>
    </div>
  );
};

export default Calendar;
