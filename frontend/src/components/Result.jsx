import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertCircle, AlertTriangle, Activity, BarChart2 } from 'lucide-react';

export default function Result() {
  const { currentScan, t } = useApp();
  const { grade, confidence, analyzed } = currentScan;

  if (!analyzed || !grade) {
    return null;
  }

  const isHighRisk = grade === 'Severe' || grade === 'Proliferative';
  const isHighConfidence = confidence >= 0.85;

  const getSeverityBadgeClass = (g) => {
    switch (g) {
      case 'No DR': return 'severity-nodr';
      case 'Mild': return 'severity-mild';
      case 'Moderate': return 'severity-moderate';
      case 'Severe': return 'severity-severe';
      case 'Proliferative': return 'severity-proliferative';
      default: return 'severity-unclear';
    }
  };

  const getSeverityLabel = (g) => {
    switch (g) {
      case 'No DR': return t.noDr;
      case 'Mild': return t.mild;
      case 'Moderate': return t.moderate;
      case 'Severe': return t.severe;
      case 'Proliferative': return t.proliferative;
      default: return g;
    }
  };

  return (
    <div>
      {/* High-Risk Alert Banner for Severe or Proliferative DR */}
      {isHighRisk && (
        <div className="high-risk-alert-box">
          <AlertTriangle size={32} />
          <div>
            <div>{t.highRiskAlert}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 500, marginTop: '0.2rem' }}>
              Immediate ophthalmologist referral required. Risk of vision loss if untreated.
            </div>
          </div>
        </div>
      )}

      {/* Main Result Card */}
      <div className="card">
        <h3 className="card-title">
          <Activity size={22} color="var(--primary-600)" />
          {t.drSeverity}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1.25rem 0', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
              AI Predicted Diagnosis
            </span>
            <span className={`severity-badge ${getSeverityBadgeClass(grade)}`} style={{ fontSize: '1.1rem', padding: '0.5rem 1.25rem' }}>
              {getSeverityLabel(grade)}
            </span>
          </div>

          <div style={{ textAlignment: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
              Model Score / Probability
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {(confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Confidence Check Alert Banner */}
        {isHighConfidence ? (
          <div className="confidence-banner confidence-high">
            <ShieldCheck size={20} />
            <span>{t.confidenceHigh} ({(confidence * 100).toFixed(1)}% Score)</span>
          </div>
        ) : (
          <div className="confidence-banner confidence-low">
            <AlertCircle size={20} />
            <span>{t.confidenceLow} (Low Score: {(confidence * 100).toFixed(1)}%)</span>
          </div>
        )}

        {/* Micro Clinical Breakdown Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ background: 'var(--primary-50)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Microaneurysms</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
              {grade === 'No DR' ? '0' : grade === 'Mild' ? '3 - 5' : '15+'}
            </p>
          </div>
          <div style={{ background: 'var(--primary-50)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hard Exudates</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
              {grade === 'No DR' || grade === 'Mild' ? 'None' : 'Detected'}
            </p>
          </div>
          <div style={{ background: 'var(--primary-50)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Macular Edema Risk</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: isHighRisk ? '#dc2626' : '#059669', margin: 0 }}>
              {isHighRisk ? 'High' : grade === 'Moderate' ? 'Moderate' : 'Low'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
