import React, { createContext, useContext, useState } from 'react';
import { translations, initialPatientHistory, sampleFundusImages } from '../translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(true);
  const [showReminder, setShowReminder] = useState(true);
  const [historyList, setHistoryList] = useState(initialPatientHistory);

  // Current screening session state
  const [currentScan, setCurrentScan] = useState({
    image: sampleFundusImages[1].url, // Default sample (Mild)
    imageName: sampleFundusImages[1].name,
    isQualityChecking: false,
    qualityStatus: 'ok', // 'ok' | 'unclear' | 'checking'
    isAnalyzing: false,
    analyzed: true,
    grade: 'Mild', // 'No DR' | 'Mild' | 'Moderate' | 'Severe' | 'Proliferative' | 'Unclear'
    confidence: 0.941,
    doctorReview: {
      action: 'Confirm', // 'Confirm' | 'Modify'
      modifiedGrade: 'Mild',
      notes: 'Slight microaneurysms near macula area. Advised blood sugar control and 6-month re-check.',
      saved: true
    }
  });

  const t = translations[language] || translations.en;

  const toggleOnline = () => {
    setIsOnline(prev => !prev);
  };

  const updateScanImage = (imageUrl, name = 'Uploaded_Fundus.jpg') => {
    setCurrentScan({
      image: imageUrl,
      imageName: name,
      isQualityChecking: true,
      qualityStatus: 'checking',
      isAnalyzing: false,
      analyzed: false,
      grade: null,
      confidence: null,
      doctorReview: {
        action: 'Confirm',
        modifiedGrade: '',
        notes: '',
        saved: false
      }
    });

    // Simulate Quality Check after 1s
    setTimeout(() => {
      // Check if it's a known unclear sample or default to ok
      const isUnclear = name.toLowerCase().includes('unclear') || name.toLowerCase().includes('blur');
      const qStatus = isUnclear ? 'unclear' : 'ok';

      setCurrentScan(prev => ({
        ...prev,
        isQualityChecking: false,
        qualityStatus: qStatus
      }));
    }, 900);
  };

  const runAnalysis = () => {
    if (currentScan.qualityStatus === 'unclear') return;

    setCurrentScan(prev => ({ ...prev, isAnalyzing: true }));

    // Simulate ML Analysis delay
    setTimeout(() => {
      // Pick severity based on name or random mock
      let grade = 'Moderate';
      let conf = 0.912;
      const lower = (currentScan.imageName || '').toLowerCase();
      if (lower.includes('normal') || lower.includes('no dr')) {
        grade = 'No DR';
        conf = 0.982;
      } else if (lower.includes('mild')) {
        grade = 'Mild';
        conf = 0.941;
      } else if (lower.includes('severe')) {
        grade = 'Severe';
        conf = 0.915;
      } else if (lower.includes('proliferative')) {
        grade = 'Proliferative';
        conf = 0.952;
      }

      setCurrentScan(prev => ({
        ...prev,
        isAnalyzing: false,
        analyzed: true,
        grade: grade,
        confidence: conf,
        doctorReview: {
          action: 'Confirm',
          modifiedGrade: grade,
          notes: '',
          saved: false
        }
      }));
    }, 1200);
  };

  const saveDoctorReview = (action, modifiedGrade, notes) => {
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

  return (
    <AppContext.Provider value={{
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
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
