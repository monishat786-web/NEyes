import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, Layers, Info } from 'lucide-react';

export default function GradCAM() {
  const { currentScan, t } = useApp();
  const { image, grade, analyzed } = currentScan;
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.7);

  if (!analyzed || !image) {
    return null;
  }

  return (
    <div className="card">
      <h3 className="card-title">
        <Layers size={22} color="var(--primary-600)" />
        {t.gradcamTitle}
      </h3>
      <p className="card-subtitle">
        {t.gradcamDesc}
      </p>

      {/* Control Opacity Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', background: 'var(--primary-50)', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Heatmap Overlay Intensity:
        </span>
        <input 
          type="range" 
          min="0.2" 
          max="1.0" 
          step="0.05" 
          value={heatmapOpacity}
          onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
          style={{ cursor: 'pointer', flex: 1, accentColor: 'var(--primary-600)' }}
        />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '40px', color: 'var(--text-dark)' }}>
          {Math.round(heatmapOpacity * 100)}%
        </span>
      </div>

      {/* Side-by-Side Image Display */}
      <div className="side-by-side">
        {/* Original Image */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Eye size={16} color="var(--primary-600)" /> Original Fundus Scan
          </div>
          <div className="image-container">
            <img src={image} alt="Original Fundus" />
          </div>
        </div>

        {/* Grad-CAM Heatmap Overlay */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Layers size={16} color="#dc2626" /> Grad-CAM Attention Map
          </div>
          <div className="image-container">
            <img src={image} alt="GradCAM Base" />
            <div 
              className="gradcam-overlay"
              style={{ opacity: heatmapOpacity }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--primary-50)', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid var(--primary-100)' }}>
        <Info size={16} color="var(--primary-600)" />
        <span>
          Red/orange highlights indicate region-of-interest attention activations focused on hemorrhages, cotton wool spots, or exudates.
        </span>
      </div>
    </div>
  );
}
