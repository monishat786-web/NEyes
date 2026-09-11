import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Eye, ShieldCheck, Printer, Calendar, QrCode } from 'lucide-react';

export default function Passport() {
  const { currentScan, t } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText color="#F5EBDD" size={28} /> Diabetic Retinopathy Digital Screening Passport
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#D8C7AE', marginTop: '0.2rem' }}>
            Portable health credential summarizing retinal screening status, severity grade, doctor signatures, and follow-up schedule.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={18} /> Print Passport
          </button>
        </div>
      </div>

      {/* Passport Card Box */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--primary-50) 100%)',
        border: '2px solid var(--primary-600)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header Ribbon */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--primary-600)', padding: '0.6rem', borderRadius: '12px', color: 'white' }}>
              <Eye size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>NEyes Health Passport</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>ID: PASSPORT-DR-892401-2026</p>
            </div>
          </div>
          <span style={{
            background: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0',
            padding: '0.4rem 0.9rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <ShieldCheck size={18} /> Verified Clinical Record
          </span>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
              {t.patientName}
            </span>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0.2rem 0' }}>Rajesh Kumar</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>ID: DR-892401 | Male, 54 yrs</p>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
              Latest Scan Date
            </span>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0.2rem 0' }}>Sep 02, 2026</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Facility: General Hospital Clinic #4</p>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
              Assessed DR Severity Grade
            </span>
            <div style={{ marginTop: '0.3rem' }}>
              <span className={`severity-badge severity-${(currentScan.grade || 'Mild').toLowerCase().replace(' ', '')}`} style={{ fontSize: '0.95rem' }}>
                {currentScan.grade || 'Mild NPDR'}
              </span>
            </div>
          </div>
        </div>

        {/* Scan & Verification Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          background: 'var(--card-bg)',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Fundus Scan & Analysis</h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img 
                src={currentScan.image} 
                alt="Retina Scan" 
                style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
              />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <p style={{ margin: '0 0 0.3rem 0' }}><strong>Quality:</strong> {currentScan.qualityStatus === 'ok' ? 'Passed' : 'Unclear'}</p>
                <p style={{ margin: '0 0 0.3rem 0' }}><strong>AI Confidence:</strong> {currentScan.confidence ? (currentScan.confidence * 100).toFixed(1) + '%' : 'N/A'}</p>
                <p style={{ margin: 0 }}><strong>Clinician Signoff:</strong> Dr. S. Ramanathan</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--primary-50)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--primary-100)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <Calendar size={18} color="var(--primary-600)" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-700)' }}>Next Follow-up Recommendation</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary-700)', margin: 0 }}>
              Based on current NPDR grade: <strong>Re-screen within 6 months (by Nov 15, 2026)</strong>. Maintain tight HbA1c control.
            </p>
          </div>
        </div>

        {/* Digital Verification QR Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ border: '2px solid var(--primary-600)', padding: '0.4rem', borderRadius: '8px', background: 'var(--card-bg)' }}>
              <QrCode size={40} color="var(--primary-600)" />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>Digital Security QR Verification</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Scan to verify authenticity on digital health registry</p>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>NEyes AI v1.0 • Clinical Protocol Standard</span>
        </div>
      </div>
    </div>
  );
}
