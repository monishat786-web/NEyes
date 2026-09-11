import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { History as HistoryIcon, Search, Filter, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const { historyList, t } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');

  const filteredHistory = historyList.filter(item => {
    const matchesSearch = item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || item.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <HistoryIcon color="#F5EBDD" size={28} /> Patient Screening History Log
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#D8C7AE', marginTop: '0.2rem' }}>
          Comprehensive record of past retina screenings, longitudinal progression trends, and physician validations.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="card" style={{ marginBottom: 0, padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-50)', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem', borderRadius: '8px', flex: '1', minWidth: '220px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by Patient Name, ID (e.g. DR-892401)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--text-dark)' }}
            />
          </div>

          {/* Filter dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} color="var(--text-muted)" />
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.875rem', fontWeight: 600, background: 'var(--card-bg)', color: 'var(--text-dark)' }}
            >
              <option value="All">All Grades</option>
              <option value="No DR">No DR</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
              <option value="Proliferative">Proliferative</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="medical-table">
            <thead>
              <tr>
                <th>Screening ID</th>
                <th>{t.patientId} / Name</th>
                <th>{t.date}</th>
                <th>{t.grade}</th>
                <th>Confidence</th>
                <th>Doctor Status</th>
                <th>{t.trend}</th>
                <th>Passport</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary-600)' }}>{row.id}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{row.patientName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.patientId} • {row.age}y/{row.gender}</div>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{row.date}</td>
                  <td>
                    <span className={`severity-badge ${getSeverityBadgeClass(row.grade)}`}>
                      {row.grade}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-dark)' }}>{row.confidence}</td>
                  <td style={{ fontSize: '0.8rem', color: row.doctorStatus.includes('Pending') ? '#d97706' : '#059669', fontWeight: 600 }}>
                    {row.doctorStatus}
                  </td>
                  <td>
                    <span style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: row.isHighRisk ? '#fef2f2' : 'var(--primary-50)',
                      color: row.isHighRisk ? '#dc2626' : 'var(--text-dark)',
                      border: row.isHighRisk ? '1px solid #fecaca' : '1px solid var(--border-color)'
                    }}>
                      {row.trend}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => navigate('/passport')}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                    >
                      <FileText size={14} /> Passport
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
