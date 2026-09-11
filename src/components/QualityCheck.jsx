import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Play
} from 'lucide-react';

export default function QualityCheck() {

  const {
    currentScan,
    runAnalysis
  } = useApp();

  const {
    isQualityChecking,
    qualityStatus,
    qualityMessage,
    qualityScore,
    isAnalyzing,
    analyzed
  } = currentScan;


  return (
    <div className="card">

      {/* ==================================================
          TITLE
      ================================================== */}

      <h3 className="card-title">
        Image Quality Verification
      </h3>


      {/* ==================================================
          CHECKING QUALITY
      ================================================== */}

      {isQualityChecking && (

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            background: 'var(--primary-50)',
            borderRadius: '8px',
            border: '1px solid var(--primary-100)'
          }}
        >

          <Loader2
            className="animate-spin"
            size={24}
            color="var(--primary-600)"
          />

          <div>

            <span
              style={{
                fontWeight: 700,
                color: 'var(--primary-700)',
                fontSize: '0.95rem'
              }}
            >
              Checking Image Quality...
            </span>

            <p
              style={{
                margin: '0.25rem 0 0',
                fontSize: '0.8rem',
                color: 'var(--primary-600)'
              }}
            >
              Checking focus, brightness, and image clarity.
            </p>

          </div>

        </div>

      )}


      {/* ==================================================
          GOOD QUALITY
      ================================================== */}

      {!isQualityChecking &&
        qualityStatus === 'ok' && (

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: '#ecfdf5',
              borderRadius: '8px',
              border: '1px solid #a7f3d0'
            }}
          >

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >

              <CheckCircle2
                size={26}
                color="#059669"
              />

              <div>

                <span
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    color: '#047857',
                    fontSize: '1rem'
                  }}
                >
                  Image Quality: Good
                </span>

                <p
                  style={{
                    fontSize: '0.8rem',
                    color: '#065f46',
                    margin: '0.25rem 0 0'
                  }}
                >
                  {qualityMessage ||
                    'Image is clear and suitable for screening.'}
                </p>

              </div>

            </div>


            <span
              style={{
                background: '#d1fae5',
                color: '#047857',
                padding: '0.3rem 0.7rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              PASSED
            </span>

          </div>


          {/* QUALITY SCORE */}

          {qualityScore !== null &&
            qualityScore !== undefined && (

            <div
              style={{
                padding: '0.8rem 1rem',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}
            >

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem'
                }}
              >

                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#475569'
                  }}
                >
                  Image Quality Score
                </span>

                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#047857'
                  }}
                >
                  {qualityScore}%
                </span>

              </div>


              <div
                style={{
                  height: '7px',
                  background: '#e2e8f0',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >

                <div
                  style={{
                    width: `${qualityScore}%`,
                    height: '100%',
                    background: '#10b981',
                    borderRadius: '10px'
                  }}
                />

              </div>

            </div>

          )}


          {/* RUN AI ANALYSIS */}

          {!analyzed && (

            <button
              className="btn btn-primary"
              disabled={isAnalyzing}
              onClick={runAnalysis}
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >

              {isAnalyzing ? (

                <>

                  <Loader2
                    className="animate-spin"
                    size={20}
                  />

                  Analyzing Retina...

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


      {/* ==================================================
          POOR QUALITY
      ================================================== */}

      {!isQualityChecking &&
        qualityStatus === 'unclear' && (

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            padding: '1.25rem',
            background: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}
        >

          {/* WARNING TITLE */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >

            <AlertTriangle
              size={26}
              color="#dc2626"
            />

            <span
              style={{
                fontWeight: 700,
                color: '#991b1b',
                fontSize: '1rem'
              }}
            >
              Image Quality: Poor
            </span>

          </div>


          {/* BACKEND MESSAGE */}

          <p
            style={{
              fontSize: '0.85rem',
              color: '#b91c1c',
              margin: 0,
              lineHeight: 1.5
            }}
          >

            {qualityMessage ||
              'The uploaded image is not suitable for reliable screening.'}

          </p>


          {/* QUALITY SCORE */}

          {qualityScore !== null &&
            qualityScore !== undefined && (

            <div
              style={{
                padding: '0.75rem',
                background: '#fff',
                borderRadius: '6px',
                border: '1px solid #fecaca'
              }}
            >

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem'
                }}
              >

                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#7f1d1d'
                  }}
                >
                  Quality Score
                </span>

                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#dc2626'
                  }}
                >
                  {qualityScore}%
                </span>

              </div>


              <div
                style={{
                  height: '7px',
                  background: '#fee2e2',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >

                <div
                  style={{
                    width: `${qualityScore}%`,
                    height: '100%',
                    background: '#ef4444',
                    borderRadius: '10px'
                  }}
                />

              </div>

            </div>

          )}


          {/* RETAKE MESSAGE */}

          <div
            style={{
              padding: '0.75rem',
              background: '#fff7ed',
              borderRadius: '6px',
              border: '1px solid #fed7aa',
              color: '#9a3412',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >

            Please retake the fundus photograph or
            upload another clearer image before continuing.

          </div>

        </div>

      )}


      {/* ==================================================
          NO IMAGE / INITIAL STATE
      ================================================== */}

      {!isQualityChecking &&
        qualityStatus !== 'ok' &&
        qualityStatus !== 'unclear' && (

        <div
          style={{
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            color: '#64748b',
            fontSize: '0.85rem'
          }}
        >

          Upload a retinal fundus image to begin
          quality verification.

        </div>

      )}

    </div>
  );
}