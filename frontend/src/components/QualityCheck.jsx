import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Loader2, Play } from 'lucide-react';

export default function QualityCheck() {
  const { currentScan, runAnalysis, t } = useApp();
  const { isQualityChecking, qualityStatus, isAnalyzing, analyzed } = currentScan;

  return (
    <div className="card">
      <h3 className="card-title">
        Image Quality Verification
      </h3>

      {/* Loading state when verifying image quality */}
      {isQualityChecking && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'var(--primary-50)', borderRadius: '8px', border: '1px solid var(--primary-100)' }}>
          <Loader2 className="animate-spin" size={24} color="var(--primary-600)" />
          <span style={{ fontWeight: 600, color: 'var(--primary-700)' }}>
            {t.checkingQuality}
          </span>
        </div>
      )}

      {/* Quality OK State */}
      {!isQualityChecking && qualityStatus === 'ok' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={24} color="#059669" />
              <div>
                <span style={{ fontWeight: 700, color: '#047857', fontSize: '1rem' }}>
                  {t.qualityOk}
                </span>
                <p style={{ fontSize: '0.8rem', color: '#065f46', margin: 0 }}>
                  Illumination, focus, and field-of-view meet clinical diagnostic standards.
                </p>
              </div>
            </div>
            <span className="severity-badge severity-nodr">Passed</span>
          </div>

          {/* Action to trigger AI screening */}
          {!analyzed && (
            <button 
              className="btn btn-primary"
              disabled={isAnalyzing}
              onClick={runAnalysis}
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing Retina with Deep Neural Network...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Run Diabetic Retinopathy Analysis
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Quality Unclear State */}
      {!isQualityChecking && qualityStatus === 'unclear' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={24} color="#dc2626" />
            <span style={{ fontWeight: 700, color: '#991b1b', fontSize: '1rem' }}>
              {t.qualityUnclear}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#b91c1c' }}>
            The uploaded photograph is out of focus, poorly illuminated, or obstructed by lens flare. Please recapture or upload a higher quality fundus scan.
          </p>
        </div>
      )}
    </div>
  );
}
