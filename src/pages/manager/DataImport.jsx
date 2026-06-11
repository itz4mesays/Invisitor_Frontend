import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, CheckCircle, AlertCircle, X, Download } from 'lucide-react';

const DataImport = () => {
  const [activeTab, setActiveTab] = useState('residents');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, success, error
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const validTypes = [
      'text/csv', 
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
      setUploadState('idle');
    } else {
      alert("Please upload a valid CSV or XLSX file.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setUploadState('idle');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploadState('uploading');
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadState('success'), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleDownloadTemplate = () => {
    const headers = activeTab === 'residents' 
      ? "Name,Email,Phone,Unit Number,Move-In Date (YYYY-MM-DD)\nJohn Doe,john@example.com,1234567890,A-101,2026-01-01"
      : "Time (YYYY-MM-DD HH:mm),Location,Event Type,Status,Details\n2026-06-11 08:45,Main Gate,Unauthorized Access,Investigating,Attempted entry without code";
      
    const blob = new Blob([headers], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeTab}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="di-page">
      <div className="di-header">
        <div>
          <h1>Data Import</h1>
          <p>Migrate and sync data smoothly into the system.</p>
        </div>
      </div>

      <div className="di-content-grid">
        {/* Left Column: Import Form */}
        <div className="di-card">
          <div className="di-tabs">
            <button 
              className={`di-tab ${activeTab === 'residents' ? 'active' : ''}`}
              onClick={() => { setActiveTab('residents'); clearFile(); }}
            >
              Residents Data
            </button>
            <button 
              className={`di-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => { setActiveTab('security'); clearFile(); }}
            >
              Security Logs
            </button>
          </div>

          <div className="di-instructions">
            <h3>Upload {activeTab === 'residents' ? 'Residents' : 'Security'}</h3>
            <p>
              Please upload your data in CSV or XLSX format. 
              Make sure to follow the required columns format to avoid errors during the migration.
            </p>
            <button className="di-template-btn" onClick={handleDownloadTemplate}>
              <Download size={14} /> Download {activeTab === 'residents' ? 'Resident' : 'Security'} Template
            </button>
          </div>

          <AnimatePresence mode="wait">
            {uploadState === 'idle' && (
              <motion.div 
                key="upload-zone"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className={`di-dropzone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                  style={{ display: 'none' }} 
                />
                
                {file ? (
                  <div className="di-file-info">
                    <FileSpreadsheet size={32} color="var(--brand-primary)" />
                    <div className="di-file-details">
                      <span className="di-file-name">{file.name}</span>
                      <span className="di-file-size">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                    <button className="di-remove-file" onClick={(e) => { e.stopPropagation(); clearFile(); }}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="di-drop-content">
                    <div className="di-upload-icon"><UploadCloud size={32} /></div>
                    <p className="di-drop-title">Click to upload or drag and drop</p>
                    <p className="di-drop-sub">CSV or XLSX (max. 5MB)</p>
                  </div>
                )}
              </motion.div>
            )}

            {uploadState === 'uploading' && (
              <motion.div 
                key="uploading-state"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="di-status-box uploading"
              >
                <div className="di-spinner"></div>
                <h3>Processing your data...</h3>
                <div className="di-progress-bar">
                  <div className="di-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p>{progress}% completed</p>
              </motion.div>
            )}

            {uploadState === 'success' && (
              <motion.div 
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="di-status-box success"
              >
                <div className="di-status-icon"><CheckCircle size={48} /></div>
                <h3>Upload Successful!</h3>
                <p>The {activeTab} data has been migrated successfully and synced with your database.</p>
                <button className="di-primary-btn" onClick={clearFile} style={{ marginTop: '1rem' }}>
                  Upload Another File
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {uploadState === 'idle' && file && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="di-actions">
              <button className="di-primary-btn" onClick={handleUpload}>
                Start Data Migration
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Column: Information/Guidance */}
        <div className="di-info-card">
          <h3>Migration Guidelines</h3>
          
          <div className="di-guideline-item">
            <div className="di-guideline-icon"><AlertCircle size={20} /></div>
            <div>
              <h4>Format Requirements</h4>
              <p>Ensure the first row of your document exactly matches the header format provided in the template.</p>
            </div>
          </div>
          
          <div className="di-guideline-item">
            <div className="di-guideline-icon"><AlertCircle size={20} /></div>
            <div>
              <h4>Data Validation</h4>
              <p>Empty required fields will cause that specific row to be skipped. A partial success report will be generated.</p>
            </div>
          </div>

          <div className="di-guideline-item">
            <div className="di-guideline-icon"><AlertCircle size={20} /></div>
            <div>
              <h4>Duplicate Handling</h4>
              <p>If an entry with the same email or ID already exists, the system will automatically update the existing record.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .di-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .di-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .di-header p { color: var(--text-tertiary); margin: 0; }
        
        .di-content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        
        .di-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 1.5rem; }
        
        .di-tabs { display: flex; gap: 1rem; border-bottom: 1px solid var(--border-default); padding-bottom: 0; }
        .di-tab { background: transparent; border: none; padding: 0.75rem 1rem; font-size: 0.9375rem; font-weight: 600; color: var(--text-tertiary); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; position: relative; bottom: -1px; }
        .di-tab:hover { color: var(--text-primary); }
        .di-tab.active { color: var(--bg-brand); border-bottom-color: var(--bg-brand); }
        
        .di-instructions h3 { font-size: 1.125rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.5rem 0; }
        .di-instructions p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1rem 0; }
        .di-template-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--bg-subtle); border: 1px solid var(--border-default); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
        .di-template-btn:hover { background: var(--bg-muted); }
        
        .di-dropzone { border: 2px dashed var(--border-default); border-radius: 12px; padding: 3rem 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; transition: all 0.2s; background: var(--bg-subtle); min-height: 200px; }
        .di-dropzone:hover { border-color: var(--brand-primary); background: var(--bg-surface); }
        .di-dropzone.dragging { border-color: var(--brand-primary); background: var(--bg-brand-subtle); transform: scale(1.01); }
        .di-dropzone.has-file { padding: 1.5rem; cursor: default; }
        
        .di-upload-icon { width: 64px; height: 64px; background: var(--bg-surface); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .di-drop-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0 0 0.25rem 0; }
        .di-drop-sub { font-size: 0.8125rem; color: var(--text-tertiary); margin: 0; }
        
        .di-file-info { display: flex; align-items: center; width: 100%; gap: 1rem; background: var(--bg-surface); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-default); }
        .di-file-details { display: flex; flex-direction: column; flex: 1; align-items: flex-start; text-align: left; }
        .di-file-name { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem; word-break: break-all; }
        .di-file-size { font-size: 0.75rem; color: var(--text-tertiary); }
        .di-remove-file { background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: 0.5rem; border-radius: 50%; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .di-remove-file:hover { background: var(--bg-danger-subtle); color: var(--text-danger); }

        .di-actions { display: flex; justify-content: flex-end; }
        .di-primary-btn { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; font-size: 0.9375rem; cursor: pointer; transition: opacity 0.2s; }
        .di-primary-btn:hover { opacity: 0.9; }
        
        .di-status-box { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 3rem 2rem; border-radius: 12px; min-height: 200px; border: 1px solid var(--border-default); }
        .di-status-box.uploading { background: var(--bg-subtle); }
        .di-status-box.success { background: var(--bg-success-subtle); border-color: rgba(34, 197, 94, 0.2); }
        .di-status-box h3 { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 1rem 0 0.5rem 0; }
        .di-status-box p { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
        
        .di-status-icon { color: var(--text-success); margin-bottom: 0.5rem; }
        
        .di-progress-bar { width: 100%; max-width: 300px; height: 8px; background: var(--border-default); border-radius: 999px; margin: 1rem 0 0.5rem 0; overflow: hidden; }
        .di-progress-fill { height: 100%; background: var(--bg-brand); transition: width 0.1s linear; }
        
        .di-spinner { width: 40px; height: 40px; border: 3px solid var(--border-default); border-top-color: var(--bg-brand); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .di-info-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); height: fit-content; }
        .di-info-card h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0 0 1.5rem 0; }
        
        .di-guideline-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .di-guideline-item:last-child { margin-bottom: 0; }
        .di-guideline-icon { color: var(--text-warning); flex-shrink: 0; margin-top: 0.125rem; }
        .di-guideline-item h4 { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.25rem 0; }
        .di-guideline-item p { font-size: 0.8125rem; color: var(--text-secondary); margin: 0; line-height: 1.5; }

        @media (max-width: 1024px) {
          .di-content-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default DataImport;
