
import React, { createContext, useContext, useState } from 'react';
import { translations, initialPatientHistory, sampleFundusImages } from '../translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [language, setLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(true);
  const [showReminder, setShowReminder] = useState(true);
  const [historyList, setHistoryList] = useState(initialPatientHistory);

  // ==================================================
  // CURRENT SCREENING SESSION
  // ==================================================

  const [currentScan, setCurrentScan] = useState({

    image: sampleFundusImages[1].url,
    imageName: sampleFundusImages[1].name,

    // Actual uploaded file
    file: null,

    // Quality
    isQualityChecking: false,
    qualityStatus: 'ok',

    // AI analysis
    isAnalyzing: false,
    analyzed: true,

    // AI result
    grade: 'Mild',
    confidence: 0.941,
    uncertain: false,

    // Grad-CAM
    gradcam: null,

    // Doctor review
    doctorReview: {
      action: 'Confirm',
      modifiedGrade: 'Mild',
      notes: 'Slight microaneurysms near macula area. Advised blood sugar control and 6-month re-check.',
      saved: true
    }

  });


  const t = translations[language] || translations.en;


  // ==================================================
  // ONLINE / OFFLINE TOGGLE
  // ==================================================

  const toggleOnline = () => {

    setIsOnline(prev => !prev);

  };


  // ==================================================
  // UPDATE SELECTED IMAGE
  // ==================================================

  const updateScanImage = (
    imageUrl,
    name = 'Uploaded_Fundus.jpg',
    file = null
  ) => {

    setCurrentScan({

      image: imageUrl,

      imageName: name,

      file: file,

      isQualityChecking: true,

      qualityStatus: 'checking',

      isAnalyzing: false,

      analyzed: false,

      grade: null,

      confidence: null,

      uncertain: false,

      gradcam: null,

      doctorReview: {

        action: 'Confirm',

        modifiedGrade: '',

        notes: '',

        saved: false

      }

    });


    // ----------------------------------------------
    // Temporary frontend quality check
    // ----------------------------------------------

    setTimeout(() => {

      const lowerName = name.toLowerCase();

      const isUnclear =
        lowerName.includes('unclear') ||
        lowerName.includes('blur');


      setCurrentScan(prev => ({

        ...prev,

        isQualityChecking: false,

        qualityStatus: isUnclear
          ? 'unclear'
          : 'ok'

      }));

    }, 900);

  };


  // ==================================================
  // RUN REAL AI ANALYSIS
  // ==================================================

  const runAnalysis = async () => {

    // Do not analyze poor-quality image
    if (
      currentScan.qualityStatus === 'unclear'
    ) {

      return;

    }


    // No actual file
    if (!currentScan.file) {

      alert(
        'Please upload a retinal image first.'
      );

      return;

    }


    setCurrentScan(prev => ({

      ...prev,

      isAnalyzing: true

    }));


    try {

      // --------------------------------------------
      // Create form data
      // --------------------------------------------

      const formData = new FormData();

      formData.append(
        'file',
        currentScan.file
      );


      // --------------------------------------------
      // Send image to FastAPI
      // --------------------------------------------

      const response = await fetch(
        'http://127.0.0.1:8000/predict',
        {
          method: 'POST',
          body: formData
        }
      );


      // --------------------------------------------
      // Check API response
      // --------------------------------------------

      if (!response.ok) {

        throw new Error(
          `API Error: ${response.status}`
        );

      }


      const result = await response.json();


      // --------------------------------------------
      // Convert confidence
      // --------------------------------------------

      const confidence =
        result.confidence / 100;


      // --------------------------------------------
      // Update frontend
      // --------------------------------------------

      setCurrentScan(prev => ({

        ...prev,

        isAnalyzing: false,

        analyzed: true,

        grade: result.prediction,

        confidence: confidence,

        uncertain: result.uncertain,

        gradcam: result.gradcam,

        doctorReview: {

          action: 'Confirm',

          modifiedGrade: result.prediction,

          notes: '',

          saved: false

        }

      }));


    } catch (error) {

      console.error(
        'AI analysis failed:',
        error
      );


      setCurrentScan(prev => ({

        ...prev,

        isAnalyzing: false,

        analyzed: false

      }));


      alert(
        'Unable to connect to the AI server. Make sure FastAPI is running.'
      );

    }

  };


  // ==================================================
  // SAVE DOCTOR REVIEW
  // ==================================================

  const saveDoctorReview = (
    action,
    modifiedGrade,
    notes
  ) => {

    setCurrentScan(prev => ({

      ...prev,

      doctorReview: {

        action,

        modifiedGrade,

        notes,

        saved: true

      }

    }));

  };


  // ==================================================
  // CONTEXT
  // ==================================================

  return (

    <AppContext.Provider
      value={{

        language,

        setLanguage,

        t,

        isOnline,

        toggleOnline,

        showReminder,

        setShowReminder,

        currentScan,

        updateScanImage,

        runAnalysis,

        saveDoctorReview,

        historyList,

        setHistoryList

      }}
    >

      {children}

    </AppContext.Provider>

  );

};


export const useApp = () =>
  useContext(AppContext);
