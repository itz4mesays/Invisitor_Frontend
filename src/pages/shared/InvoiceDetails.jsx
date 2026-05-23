import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, CreditCard, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_INVOICE = {
  id: 'INV-2041',
  amount: '₦50,000',
  description: 'Monthly Security Dues',
  date: '2026-05-01',
  dueDate: '2026-05-15',
  status: 'unpaid',
  items: [
    { name: 'Security Personnel Levy', cost: '₦35,000' },
    { name: 'Gate Maintenance', cost: '₦10,000' },
    { name: 'Administrative Fee', cost: '₦5,000' },
  ],
  billedTo: 'David Fayemi, Block A, Apt 101'
};

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split('/')[1];

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Paystack');

  // In a real app, you would fetch the invoice by id here
  const inv = MOCK_INVOICE;

  const handlePay = () => {
    // Simulate payment process
    alert(`Processing payment of ${inv.amount} via ${paymentMethod}...`);
    setShowPaymentModal(false);
  };

  return (
    <div className="invd-page">
      <button className="invd-back" onClick={() => navigate(`/${role}/invoices`)}>
        <ArrowLeft size={16} /> Back to Invoices
      </button>

      <div className="invd-header">
        <h1>Invoice {inv.id}</h1>
        <div className="invd-actions">
          <button className="invd-btn-download">
            <Download size={16} /> Download PDF
          </button>
          {inv.status !== 'paid' && (
            <button className="invd-btn-pay" onClick={() => setShowPaymentModal(true)}>
              <CreditCard size={16} /> Pay Now
            </button>
          )}
        </div>
      </div>

      <div className="invd-card">
        <div className="invd-top">
          <div>
            <div className="invd-label">Billed To</div>
            <div className="invd-val">{inv.billedTo}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="invd-label">Total Amount</div>
            <div className="invd-val-huge">{inv.amount}</div>
            <span className={`invd-status-pill ${inv.status}`}>{inv.status.toUpperCase()}</span>
          </div>
        </div>

        <div className="invd-dates">
          <div>
            <div className="invd-label">Date Issued</div>
            <div className="invd-val-small">{inv.date}</div>
          </div>
          <div>
            <div className="invd-label">Due Date</div>
            <div className="invd-val-small">{inv.dueDate}</div>
          </div>
        </div>

        <div className="invd-items">
          <h3>Invoice Items</h3>
          <table className="invd-items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td style={{ textAlign: 'right', color: '#0d2331' }}>{inv.amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
            <motion.div 
              className="payment-modal" 
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h2>Select Payment Method</h2>
              <p>Choose how you want to pay {inv.amount} for {inv.id}.</p>

              <div className="payment-options">
                {['Paystack', 'Flutterwave', 'Opay'].map(method => (
                  <div 
                    key={method} 
                    className={`pay-option ${paymentMethod === method ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    <div className="pay-radio">
                      {paymentMethod === method && <div className="pay-radio-inner" />}
                    </div>
                    <span>{method}</span>
                  </div>
                ))}
              </div>

              <div className="payment-modal-actions">
                <button className="btn-cancel" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                <button className="btn-confirm" onClick={handlePay}>Proceed to Pay</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .invd-page { max-width: 800px; margin: 0 auto; padding-bottom: 4rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .invd-back { background: none; border: none; color: #64748b; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; width: fit-content; transition: color 0.2s; }
        .invd-back:hover { color: #0d2331; }
        .invd-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .invd-header h1 { font-size: 2rem; font-weight: 800; color: #1e293b; margin: 0; letter-spacing: -0.02em; }
        .invd-actions { display: flex; gap: 1rem; }
        .invd-btn-download { background: white; border: 1px solid #e2e8f0; color: #0d2331; font-weight: 700; padding: 0.6rem 1.25rem; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .invd-btn-download:hover { background: #f8fafc; }
        .invd-btn-pay { background: #00a3ff; border: none; color: white; font-weight: 700; padding: 0.6rem 1.25rem; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .invd-btn-pay:hover { background: #008be6; transform: translateY(-1px); }
        .invd-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        .invd-top { display: flex; justify-content: space-between; border-bottom: 1px dashed #e2e8f0; padding-bottom: 2rem; margin-bottom: 2rem; }
        .invd-label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .invd-val { font-size: 1.1rem; font-weight: 600; color: #1e293b; max-width: 250px; line-height: 1.4; }
        .invd-val-huge { font-size: 2.5rem; font-weight: 800; color: #0d2331; line-height: 1; margin-bottom: 0.75rem; }
        .invd-val-small { font-size: 1rem; font-weight: 600; color: #1e293b; }
        .invd-status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; display: inline-block; }
        .invd-status-pill.unpaid { background: #fffbeb; color: #d97706; }
        .invd-status-pill.paid { background: #f0fdf4; color: #16a34a; }
        .invd-status-pill.overdue { background: #fef2f2; color: #dc2626; }
        .invd-dates { display: flex; gap: 4rem; margin-bottom: 3rem; }
        .invd-items h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
        .invd-items-table { width: 100%; border-collapse: collapse; }
        .invd-items-table th { font-size: 0.8rem; color: #64748b; font-weight: 600; padding: 1rem 0; border-bottom: 1px solid #f1f5f9; text-align: left; }
        .invd-items-table td { padding: 1rem 0; font-size: 0.95rem; color: #334155; border-bottom: 1px solid #f8fafc; }
        .invd-items-table tfoot td { font-weight: 800; font-size: 1.1rem; border-top: 2px solid #e2e8f0; border-bottom: none; padding-top: 1.5rem; }
        
        .payment-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; backdrop-filter: blur(2px); }
        .payment-modal { background: white; border-radius: 24px; padding: 2.5rem; width: 100%; max-width: 450px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .payment-modal h2 { font-size: 1.5rem; font-weight: 800; margin: 0 0 0.5rem 0; color: #1e293b; }
        .payment-modal p { color: #64748b; margin: 0 0 2rem 0; font-size: 0.95rem; }
        .payment-options { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .pay-option { border: 2px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s; font-weight: 600; color: #1e293b; }
        .pay-option:hover { border-color: #cbd5e1; background: #f8fafc; }
        .pay-option.selected { border-color: #00a3ff; background: #f0f9ff; }
        .pay-radio { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; }
        .pay-option.selected .pay-radio { border-color: #00a3ff; }
        .pay-radio-inner { width: 10px; height: 10px; border-radius: 50%; background: #00a3ff; }
        .payment-modal-actions { display: flex; gap: 1rem; }
        .btn-cancel { flex: 1; padding: 0.8rem; border-radius: 10px; background: white; border: 1px solid #e2e8f0; font-weight: 700; color: #64748b; cursor: pointer; }
        .btn-confirm { flex: 1; padding: 0.8rem; border-radius: 10px; background: #00a3ff; border: none; font-weight: 700; color: white; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default InvoiceDetails;
