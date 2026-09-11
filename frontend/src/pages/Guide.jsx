import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, UploadCloud, ShieldCheck, Activity, AlertTriangle, UserCheck, History, Calendar, Wifi, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Guide() {
  const { t } = useApp();
  const navigate = useNavigate();

  const sections = [
    {
      id: 1,
      icon: UploadCloud,
      title: "1. Retinal Image Acquisition and Upload",
      badge: "Workflow Step 1",
      steps: [
        {
          heading: "Image Specifications",
          detail: "Upload high-resolution color fundus photographs in JPEG or PNG formats. The application is optimized for standard 45-degree field-of-view scans, either macula-centered or optic disc-centered."
        },
        {
          heading: "Upload Methods",
          detail: "Drag and drop the fundus scan directly into the dashed upload area, or click the box to browse your local computer storage."
        },
        {
          heading: "Sample Image Testing",
          detail: "For training or demonstration, click any of the five preloaded sample fundus images (Normal, Mild, Moderate, Severe, or Unclear) to test the complete workflow."
        }
      ]
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "2. Image Quality Verification and Rejection Protocol",
      badge: "Automated Validation",
      steps: [
        {
          heading: "Automated Quality Assessment",
          detail: "Immediately upon selection, the scan undergoes automated analysis to verify focus sharpness, media clarity, and adequate illumination of major retinal vessels."
        },
        {
          heading: "Quality Passed Criteria",
          detail: "Scans meeting clinical criteria display 'Image OK' and 'Passed'. You may proceed to click 'Run Diabetic Retinopathy Analysis'."
        },
        {
          heading: "Action on Image Rejection",
          detail: "If an image displays 'Image unclear - please re-upload clear fundus scan', the system has detected motion blur, severe lens flare, or cataract media opacity. Do not proceed. Recapture the fundus photograph after ensuring steady fixation, pupil dilation if necessary, and clean lens optics."
        }
      ]
    },
    {
      id: 3,
      icon: Activity,
      title: "3. Reading DR Severity Results and Grad-CAM Heatmaps",
      badge: "Diagnosis and Explainability",
      steps: [
        {
          heading: "5-Stage Severity Classification",
          detail: "The deep neural network classifies the fundus scan into one of five standardized clinical stages: No DR (Normal), Mild NPDR, Moderate NPDR, Severe NPDR, or Proliferative DR (PDR)."
        },
        {
          heading: "Clinical Finding Indicators",
          detail: "The result card provides estimated counts for microaneurysms, detection status of hard lipid exudates, and overall macular edema risk assessment."
        },
        {
          heading: "Interpreting Grad-CAM Explainable AI Heatmaps",
          detail: "The side-by-side view displays the raw scan next to the Grad-CAM attention heatmap. Red and orange hot-spots pinpoint specific retinal zones where hemorrhages, cotton wool spots, or exudates triggered the model classification. Use the intensity slider to adjust heatmap transparency over the retinal anatomy."
        }
      ]
    },
    {
      id: 4,
      icon: AlertTriangle,
      title: "4. AI Confidence Scores and Doctor Review Triggers",
      badge: "Clinical Safety",
      steps: [
        {
          heading: "Confidence Score Interpretation",
          detail: "Each prediction is accompanied by a percentage score (0% to 100%) indicating the model classification certainty."
        },
        {
          heading: "High Confidence (85% and Above)",
          detail: "A green badge indicates the model identified clear, unequivocal morphological biomarkers consistent with the diagnosis."
        },
        {
          heading: "Low Confidence Alert (Below 85%)",
          detail: "An amber alert 'AI is not sure - Doctor Review Required' appears when the model encounters subtle, borderline, or atypical features."
        },
        {
          heading: "High Risk Urgent Attention",
          detail: "Any scan graded as Severe NPDR or Proliferative DR immediately produces a high-priority red alert banner demanding rapid ophthalmology intervention."
        }
      ]
    },
    {
      id: 5,
      icon: UserCheck,
      title: "5. Doctor Validation and Reclassification Workflow",
      badge: "Clinical Verification",
      steps: [
        {
          heading: "Clinician Decision Panel",
          detail: "Located immediately below the screening results, the Doctor Validation Panel allows attending healthcare providers to oversee and govern AI findings."
        },
        {
          heading: "Confirming Diagnosis",
          detail: "If the AI diagnosis matches clinical assessment, keep 'Confirm AI Diagnosis' selected, enter clinical remarks, and click 'Save Doctor Verification'."
        },
        {
          heading: "Modifying Diagnosis",
          detail: "Select 'Modify Diagnosis' to reveal the Reclassified DR Grade dropdown. Choose the corrected clinical stage (e.g., from Moderate to Severe). The system records the physician correction as authoritative."
        },
        {
          heading: "Clinical Notes Persistence",
          detail: "Enter treatment recommendations, HbA1c values, medication adjustments, or referral notes into the observation area. Saved notes are permanently stored with the screening record."
        }
      ]
    },
    {
      id: 6,
      icon: History,
      title: "6. Patient Screening History and Digital Health Passport",
      badge: "Longitudinal Care",
      steps: [
        {
          heading: "Accessing Patient Records",
          detail: "Navigate to 'Patient History' from the left sidebar to view a comprehensive registry of past screenings with screening IDs, patient IDs, dates, grades, and progression trends."
        },
        {
          heading: "Search and Grade Filtering",
          detail: "Filter records by severity grade (e.g., Severe or Proliferative) or search by patient name or ID to review longitudinal disease progression."
        },
        {
          heading: "Digital Screening Passport",
          detail: "Navigate to 'Screening Passport' to generate a portable patient health credential. It includes verified clinical sign-off, latest fundus scan snapshot, scheduled follow-up dates, and a digital security QR verification code. Click 'Print Passport' for physical copies or referral documentation."
        }
      ]
    },
    {
      id: 7,
      icon: Calendar,
      title: "7. Follow-up Intervals and Screening Reminders",
      badge: "Interval Protocol",
      steps: [
        {
          heading: "Recommended Screening Intervals",
          detail: "No DR: Re-screen in 12 months. Mild NPDR: Re-screen in 6 to 9 months. Moderate NPDR: Re-screen in 3 to 6 months. Severe NPDR / Proliferative DR: Immediate specialist ophthalmology consultation within 2 to 4 weeks."
        },
        {
          heading: "Reminder Notice Banner",
          detail: "When a patient reaches a screening reminder date, an alert banner appears along the interface. Clinicians can review the recommended target date or dismiss the banner after scheduling."
        }
      ]
    },
    {
      id: 8,
      icon: Wifi,
      title: "8. Offline Operations and Data Synchronization",
      badge: "Remote Healthcare",
      steps: [
        {
          heading: "Local-First Architecture",
          detail: "NEyes is engineered to operate seamlessly in rural clinics, outreach camps, and locations with intermittent or absent internet connectivity."
        },
        {
          heading: "Offline Mode Toggle",
          detail: "Use the Network State toggle in the left sidebar to switch between 'Online - synced' and 'Offline - data saved locally'."
        },
        {
          heading: "Data Integrity & Cloud Sync",
          detail: "While offline, patient records and doctor reviews are stored safely in local browser memory. When online connectivity is restored, all stored screening records synchronize automatically with the central health repository."
        }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #270612 0%, #4A1224 50%, #3B0A1A 100%)',
        border: '1px solid #5A1830',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        color: '#F5EBDD',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ background: '#F5EBDD', padding: '0.5rem', borderRadius: '10px', color: '#3B0A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={24} />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D8C7AE' }}>
            Clinical User Manual & Standard Procedures
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 0.75rem 0', letterSpacing: '-0.02em' }}>
          NEyes AI Screening Platform Guide
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#F5EBDD', opacity: 0.95, maxWidth: '850px', lineHeight: 1.6, margin: 0 }}>
          Comprehensive operational manual explaining retinal image acquisition, quality verification criteria, AI severity grading, Grad-CAM heatmap visualization, clinical sign-off workflows, and offline synchronization protocols.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/screening')}
          >
            Go to Screening Workflow <ArrowRight size={18} />
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/history')}
          >
            View Patient History
          </button>
        </div>
      </div>

      {/* Guide Sections Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sections.map((sec) => {
          const IconComp = sec.icon;
          return (
            <div key={sec.id} className="card" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: '#3B0A1A', color: '#F5EBDD', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={20} />
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
                    {sec.title}
                  </h2>
                </div>
                <span style={{ background: '#3B0A1A', color: '#F5EBDD', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '20px' }}>
                  {sec.badge}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {sec.steps.map((step, idx) => (
                  <div key={idx} style={{
                    background: 'var(--card-bg-subtle, #EFE1CE)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.1rem'
                  }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.45rem' }}>
                      {step.heading}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
