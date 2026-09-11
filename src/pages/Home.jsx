import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, Shield, Activity, ArrowRight, CheckCircle, Award, FileText } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4A1224 0%, #6D213C 60%, #5A1830 100%)',
        color: '#F5EBDD',
        borderRadius: '20px',
        padding: '3rem 2rem',
        boxShadow: '0 10px 30px rgba(109, 33, 60, 0.35)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '700px', position: 'relative', zIndex: 2 }}>
          <span style={{
            background: 'rgba(245, 235, 221, 0.2)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.9rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            color: '#F5EBDD'
          }}>
            <Eye size={16} /> Clinical Grade Retinal Screening
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            {t.homeHeroTitle}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.92, lineHeight: 1.6, marginBottom: '2rem', color: '#F5EBDD' }}>
            {t.homeHeroDesc}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn" 
              onClick={() => navigate('/screening')}
              style={{
                backgroundColor: '#F5EBDD',
                color: '#5A1830',
                padding: '0.85rem 1.75rem',
                fontSize: '1.05rem',
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              {t.startScreening} <ArrowRight size={20} />
            </button>
            <button 
              className="btn" 
              onClick={() => navigate('/history')}
              style={{
                backgroundColor: 'rgba(245,235,221,0.15)',
                color: '#F5EBDD',
                border: '1px solid rgba(245,235,221,0.3)',
                padding: '0.85rem 1.5rem',
                fontSize: '1rem'
              }}
            >
              {t.viewHistory}
            </button>
          </div>
        </div>

        {/* Hero Background Eye Graphic Accent */}
        <div style={{
          position: 'absolute',
          right: '-40px',
          top: '-40px',
          opacity: 0.12,
          pointerEvents: 'none'
        }}>
          <Eye size={380} color="#ffffff" />
        </div>
      </div>

      {/* Feature Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ background: 'var(--primary-100)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Activity size={26} color="var(--primary-600)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-dark)' }}>5-Stage DR Severity Grading</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Classifies fundus images from No DR (Normal) to Mild, Moderate, Severe, and Proliferative DR instantly.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ background: '#ecfdf5', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Shield size={26} color="#059669" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Quality & Confidence Check</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Automated image focus check ensures clear fundus input while model confidence metrics flag uncertain cases.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ background: 'var(--primary-50)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Award size={26} color="var(--primary-600)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Grad-CAM Heatmaps & Doctor Verification</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Explainable AI heatmap visualizer paired with clinician review panel for confirmation or reclassification.
          </p>
        </div>
      </div>

      {/* Quick Access Action Bar */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>Ready to perform a screening?</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Select sample images or upload a fundus photograph to test the system.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={() => navigate('/screening')}>
            {t.startScreening}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/passport')}>
            <FileText size={18} /> {t.viewPassport}
          </button>
        </div>
      </div>
    </div>
  );
}
