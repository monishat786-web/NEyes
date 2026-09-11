import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, CheckCircle2, Save, FileText, Edit3 } from 'lucide-react';

export default function DoctorReview() {
  const { currentScan, saveDoctorReview, t } = useApp();
  const { grade, doctorReview, analyzed } = currentScan;

  const [action, setAction] = useState(doctorReview?.action || 'Confirm');
  const [modifiedGrade, setModifiedGrade] = useState(doctorReview?.modifiedGrade || grade || 'Mild');
  const [notes, setNotes] = useState(doctorReview?.notes || '');
  const [justSaved, setJustSaved] = useState(false);

  if (!analyzed) {
    return null;
  }

  const handleSave = (e) => {
    e.preventDefault();
    saveDoctorReview(action, modifiedGrade, notes);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3000);
  };

  return (
    <div className="card" style={{ border: '2px solid var(--primary-600)', backgroundColor: 'var(--card-bg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 className="card-title" style={{ margin: 0 }}>
          <UserCheck size={24} color="var(--primary-600)" />
          {t.doctorReviewTitle}
        </h3>
        {doctorReview?.saved && (
          <span style={{ fontSize: '0.8rem', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={14} /> Verified & Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          {/* Action Dropdown: Confirm vs Modify */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>
              Doctor Action:
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600, background: 'var(--card-bg)', color: 'var(--text-dark)' }}
            >
              <option value="Confirm">{t.actionConfirm}</option>
              <option value="Modify">{t.actionModify}</option>
            </select>
          </div>

          {/* Revised Diagnosis if Modify */}
          {action === 'Modify' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.4rem' }}>
                Reclassified DR Grade:
              </label>
              <select
                value={modifiedGrade}
                onChange={(e) => setModifiedGrade(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #fecaca', fontWeight: 700, background: '#fff1f2', color: '#991b1b' }}
              >
                <option value="No DR">{t.noDr}</option>
                <option value="Mild">{t.mild}</option>
                <option value="Moderate">{t.moderate}</option>
                <option value="Severe">{t.severe}</option>
                <option value="Proliferative">{t.proliferative}</option>
              </select>
            </div>
          )}
        </div>

        {/* Doctor Clinical Notes */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>
            <FileText size={16} color="var(--primary-600)" /> Clinical Notes & Advice:
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t.notesPlaceholder}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-dark)', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'vertical' }}
          />
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={18} />
            {t.saveReview}
          </button>
          {justSaved && (
            <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.9rem' }}>
              {t.savedSuccess}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
