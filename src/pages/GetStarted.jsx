import { User, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const GetStarted = () => {
  const [selected, setSelected] = useState('individual');
  const navigate = useNavigate();

  const handleProceed = () => {
    if (selected === 'business') {
      navigate('/business-type');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h1 className="card-title">Sign Up</h1>
      <p className="card-subtitle">Choose account type to get started on inVisitor</p>

      <div className="stepper" style={{ width: '60%', margin: '0 auto 2.5rem' }}>
        <div className="step active">
          <div className="step-circle" />
          <span className="step-label">Get started</span>
        </div>
        <div className="step">
          <div className="step-circle" />
          <span className="step-label">Register</span>
        </div>
        <div className="step">
          <div className="step-circle" />
          <span className="step-label">Payment</span>
        </div>
      </div>

      <div className="options-grid">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`option-card ${selected === 'individual' ? 'selected' : ''}`}
          onClick={() => setSelected('individual')}
        >
          <div className="option-icon" style={{ backgroundColor: selected === 'individual' ? '#fff4eb' : '#f1f5f9' }}>
            <User size={32} color={selected === 'individual' ? '#f97316' : '#64748b'} />
          </div>
          <span className="option-title">Individual Account</span>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`option-card ${selected === 'business' ? 'selected' : ''}`}
          onClick={() => setSelected('business')}
        >
          <div className="option-icon" style={{ backgroundColor: selected === 'business' ? '#eff6ff' : '#f1f5f9' }}>
            <Briefcase size={32} color={selected === 'business' ? '#3b82f6' : '#64748b'} />
          </div>
          <span className="option-title">Business Account</span>
        </motion.div>
      </div>

      <button onClick={handleProceed} className="btn btn-primary">Proceed</button>
    </div>
  );
};

export default GetStarted;
