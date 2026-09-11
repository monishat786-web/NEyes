import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { sampleFundusImages } from '../translations';
import { UploadCloud, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function ImageUpload() {
  const { currentScan, updateScanImage, t } = useApp();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateScanImage(event.target.result, file.name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        updateScanImage(event.target.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card">
      <h3 className="card-title">
        <UploadCloud size={22} className="text-primary" />
        Retinal Fundus Image Upload
      </h3>
      <p className="card-subtitle">
        Upload a high-resolution color fundus photograph (JPG/PNG) for automated preliminary screening.
      </p>

      {/* Drag & Drop Area */}
      <div 
        className="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        <div className="dropzone-icon">📷</div>
        <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary-700)', marginBottom: '0.25rem' }}>
          {t.dragDropText}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Supports standard 45° fundus images (macula or disc centered)
        </p>
      </div>

      {/* Preview Section if uploaded */}
      {currentScan.image && (
        <div style={{ marginTop: '1.25rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '10px', backgroundColor: 'var(--primary-50)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ImageIcon size={18} color="var(--primary-600)" /> Selected Scan: {currentScan.imageName}
            </span>
            <span style={{ fontSize: '0.75rem', background: 'var(--primary-100)', color: 'var(--primary-800)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 700 }}>
              Preview Ready
            </span>
          </div>
          <div style={{ maxHeight: '220px', display: 'flex', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000' }}>
            <img src={currentScan.image} alt="Fundus Preview" style={{ maxHeight: '220px', width: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      )}

      {/* Sample Image Presets for Easy Demoing */}
      <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
          {t.selectSample}
        </p>
        <div className="sample-grid">
          {sampleFundusImages.map(sample => (
            <div 
              key={sample.id} 
              className="sample-item"
              style={{
                borderColor: currentScan.image === sample.url ? 'var(--primary-600)' : 'var(--border-color)',
                backgroundColor: currentScan.image === sample.url ? 'var(--primary-50)' : 'var(--card-bg)'
              }}
              onClick={() => updateScanImage(sample.url, sample.name)}
            >
              <img src={sample.url} alt={sample.name} className="sample-thumb" />
              <div className="sample-label">{sample.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
