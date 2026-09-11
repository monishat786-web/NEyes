import React from 'react';
import ImageUpload from '../components/ImageUpload';
import QualityCheck from '../components/QualityCheck';
import Result from '../components/Result';
import GradCAM from '../components/GradCAM';
import DoctorReview from '../components/DoctorReview';
import { useApp } from '../context/AppContext';
import { Activity } from 'lucide-react';

export default function Screening() {
  const { t } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Activity color="var(--primary-600)" size={28} /> Diabetic Retinopathy Screening Workflow
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Step-by-step image upload, quality verification, AI severity prediction, Grad-CAM heatmap, and doctor validation.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Step 1: Image Upload */}
        <ImageUpload />

        {/* Step 2: Quality Check */}
        <QualityCheck />

        {/* Step 3: Result & Severity Classification */}
        <Result />

        {/* Step 4: Explainable AI Heatmap (Grad-CAM) */}
        <GradCAM />

        {/* Step 5: Doctor Review Panel */}
        <DoctorReview />
      </div>
    </div>
  );
}
