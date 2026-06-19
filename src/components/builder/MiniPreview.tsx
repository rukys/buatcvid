'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { useUIStore } from '@/store/useUIStore';
import { formatPeriod, getDegreeLabel, getLanguageLevelLabel } from '@/lib/utils';

export default function MiniPreview() {
  const resume = useResumeStore();
  const selectedTemplate = useUIStore((state) => state.selectedTemplate);
  const accentColor = useUIStore((state) => state.accentColor);

  const { personalInfo, experiences, educations, skills, languages, summary } = resume;
  const lang = resume.outputLanguage || 'id';

  // Dynamic Scale and Height calculation based on parent container width
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // p-4 padding is 16px on each side (32px total available padding)
        const availableWidth = width - 32; 
        const newScale = Math.min(1, availableWidth / 420);
        setScale(newScale);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  // English & Indonesian Translation labels mapping
  const labels = {
    summary: lang === 'id' ? 'Ringkasan Profil' : 'Profile Summary',
    experience: resume.isFreshGrad
      ? (lang === 'id' ? 'Organisasi & Proyek' : 'Organizations & Projects')
      : (lang === 'id' ? 'Pengalaman Kerja' : 'Work Experience'),
    education: lang === 'id' ? 'Pendidikan' : 'Education',
    skills: lang === 'id' ? 'Keahlian' : 'Skills',
    languages: lang === 'id' ? 'Bahasa' : 'Languages',
    contact: lang === 'id' ? 'Kontak' : 'Contact',
    gpa: lang === 'id' ? 'IPK' : 'GPA',
  };

  // Helper component to render section headers consistently
  const renderSectionHeader = (title: string) => {
    if (selectedTemplate === 'elegant') {
      return (
        <div className="border-b-2 pb-0.5 mb-1.5 mt-3" style={{ borderColor: accentColor }}>
          <h4 className="text-[10px] font-bold text-gray-950 uppercase tracking-wide font-heading">
            {title}
          </h4>
        </div>
      );
    }
    return (
      <div className="mb-1.5 mt-3">
        <h4 className="text-[10px] font-bold uppercase tracking-wide" style={{ color: selectedTemplate === 'modern' ? '#1E293B' : accentColor }}>
          {title}
        </h4>
        <div className="h-[1px] bg-gray-200 w-full mt-0.5" />
      </div>
    );
  };

  // 1. Template: CLEAN
  const renderClean = () => (
    <div className="w-full h-full bg-white p-6 shadow-sm overflow-y-auto text-left text-gray-800 text-[10px] space-y-3 leading-relaxed">
      {/* Header */}
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-gray-950 tracking-tight font-heading leading-none">
          {personalInfo.fullName || (lang === 'id' ? 'Nama Lengkap Kamu' : 'Your Full Name')}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider leading-none" style={{ color: accentColor }}>
          {personalInfo.targetPosition || (lang === 'id' ? 'Posisi Yang Dilamar' : 'Target Position')}
        </p>
        <p className="text-[9px] text-gray-500">
          {[
            personalInfo.city,
            personalInfo.email,
            personalInfo.phone,
            personalInfo.linkedIn,
            personalInfo.portfolio,
          ]
            .filter(Boolean)
            .join('  ·  ')}
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <div className="space-y-1">
          {renderSectionHeader(labels.summary)}
          <p className="text-gray-600 text-[9px] leading-normal">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="space-y-2">
          {renderSectionHeader(labels.experience)}
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-start font-semibold text-gray-900">
                <span>
                  {exp.position} {exp.companyName ? (lang === 'id' ? `di ${exp.companyName}` : `at ${exp.companyName}`) : ''}
                </span>
                <span className="text-[8.5px] font-normal text-gray-500">
                  {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrentJob, lang)}
                </span>
              </div>
              {exp.location && <p className="text-[8.5px] text-gray-400 -mt-1">{exp.location}</p>}
              {exp.bullets.length > 0 ? (
                <ul className="list-disc pl-4 space-y-0.5 text-gray-600 text-[9px]">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : exp.userDescription ? (
                <p className="text-gray-600 text-[9px] pl-2 border-l border-gray-200">{exp.userDescription}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div className="space-y-2">
          {renderSectionHeader(labels.education)}
          {educations.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">
                  {getDegreeLabel(edu.degree, lang)} {edu.major ? `— ${edu.major}` : ''} — {edu.institution}
                </p>
                {edu.gpa && <p className="text-[8.5px] text-gray-500">{labels.gpa}: {edu.gpa}</p>}
              </div>
              <span className="text-[8.5px] text-gray-500">
                {edu.isOngoing ? (lang === 'id' ? 'Sedang Kuliah' : 'Ongoing') : edu.graduationYear}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-2 gap-4">
        {skills.length > 0 && (
          <div>
            {renderSectionHeader(labels.skills)}
            <p className="text-gray-600 text-[9px]">{skills.join(', ')}</p>
          </div>
        )}
        {languages.length > 0 && (
          <div>
            {renderSectionHeader(labels.languages)}
            <div className="space-y-0.5">
              {languages.map((langItem) => (
                <p key={langItem.id} className="text-gray-600 text-[9px]">
                  <span className="font-semibold text-gray-800">{langItem.name}</span> ({getLanguageLevelLabel(langItem.level, lang)})
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 2. Template: MODERN (2 Columns sidebar)
  const renderModern = () => (
    <div className="w-full h-full bg-white shadow-sm overflow-hidden text-left text-gray-800 text-[10px] flex">
      {/* Sidebar Accent block */}
      <div className="w-1/3 p-4 text-white space-y-4 flex flex-col justify-start" style={{ backgroundColor: accentColor }}>
        {/* Profile Avatar / Photo if present */}
        {personalInfo.photoUrl && (
          <div className="w-16 h-16 rounded-full border-2 border-white/60 overflow-hidden mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
        
        {/* Sidebar Header details */}
        <div className="space-y-1 text-center">
          <h3 className="text-xs font-bold font-heading leading-tight">
            {personalInfo.fullName || (lang === 'id' ? 'Nama Lengkap' : 'Full Name')}
          </h3>
          <p className="text-[8px] text-white/80 font-medium uppercase tracking-wider">
            {personalInfo.targetPosition || (lang === 'id' ? 'Posisi' : 'Position')}
          </p>
        </div>

        {/* Sidebar Info contact */}
        <div className="space-y-2 text-[8px] border-t border-white/20 pt-3 text-white/90">
          <h4 className="text-[8.5px] font-bold uppercase tracking-wider text-white mb-1.5">{labels.contact}</h4>
          {personalInfo.email && <p className="truncate">📧 {personalInfo.email}</p>}
          {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
          {personalInfo.city && <p>📍 {personalInfo.city}</p>}
          {personalInfo.linkedIn && <p className="truncate">🔗 LinkedIn</p>}
          {personalInfo.portfolio && <p className="truncate">🌐 Portfolio</p>}
        </div>

        {/* Sidebar Skills */}
        {skills.length > 0 && (
          <div className="space-y-1.5 border-t border-white/20 pt-3">
            <h4 className="text-[9px] font-bold uppercase tracking-wider text-white/90">{labels.skills}</h4>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 8).map((s, idx) => (
                <span key={idx} className="bg-white/20 text-white px-1.5 py-0.5 rounded-sm text-[7.5px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sidebar Languages */}
        {languages.length > 0 && (
          <div className="space-y-1.5 border-t border-white/20 pt-3 flex-1 flex flex-col justify-end">
            <h4 className="text-[9px] font-bold uppercase tracking-wider text-white/90">{labels.languages}</h4>
            {languages.map((langItem) => (
              <p key={langItem.id} className="text-[8px] text-white/80">
                {langItem.name} ({getLanguageLevelLabel(langItem.level, lang)})
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Main Column */}
      <div className="w-2/3 p-5 space-y-4 overflow-y-auto flex flex-col justify-start">
        {/* Summary */}
        {summary && (
          <div className="space-y-1">
            {renderSectionHeader(labels.summary)}
            <p className="text-gray-600 text-[9px] leading-normal">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div className="space-y-2">
            {renderSectionHeader(labels.experience)}
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-start font-semibold text-gray-900">
                  <span>{exp.position}</span>
                  <span className="text-[8px] font-normal text-gray-500">
                    {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrentJob, lang)}
                  </span>
                </div>
                <p className="text-[8.5px] font-medium text-gray-600 -mt-1">
                  {exp.companyName} {exp.location ? `· ${exp.location}` : ''}
                </p>
                {exp.bullets.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-0.5 text-gray-600 text-[8.5px]">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                ) : exp.userDescription ? (
                  <p className="text-gray-600 text-[8.5px] pl-2 border-l border-gray-200">{exp.userDescription}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <div className="space-y-2">
            {renderSectionHeader(labels.education)}
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">
                    {getDegreeLabel(edu.degree, lang)} {edu.major ? `— ${edu.major}` : ''}
                  </p>
                  <p className="text-[8.5px] text-gray-500">
                    {edu.institution} {edu.gpa ? `(${labels.gpa}: ${edu.gpa})` : ''}
                  </p>
                </div>
                <span className="text-[8px] text-gray-500">
                  {edu.isOngoing ? (lang === 'id' ? 'Sedang Kuliah' : 'Ongoing') : edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // 3. Template: ELEGANT
  const renderElegant = () => (
    <div className="w-full h-full bg-white p-7 shadow-sm overflow-y-auto text-left text-gray-800 text-[9.5px] space-y-3.5 leading-normal">
      {/* Header */}
      <div className="border-b pb-2.5" style={{ borderColor: accentColor }}>
        <h3 className="text-xl font-bold text-gray-950 font-heading tracking-tight leading-none mb-1">
          {personalInfo.fullName || (lang === 'id' ? 'Nama Lengkap Kamu' : 'Your Full Name')}
        </h3>
        <div className="flex justify-between items-center text-[8.5px] text-gray-500">
          <span>{personalInfo.targetPosition || (lang === 'id' ? 'Posisi Yang Dilamar' : 'Target Position')}</span>
          <span>
            {[
              personalInfo.city,
              personalInfo.email,
              personalInfo.phone,
            ]
              .filter(Boolean)
              .join('  |  ')}
          </span>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="space-y-1">
          {renderSectionHeader(labels.summary)}
          <p className="text-gray-600 text-[8.5px] leading-normal">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="space-y-2.5">
          {renderSectionHeader(labels.experience)}
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-start font-semibold text-gray-950">
                <span>{exp.position} — {exp.companyName}</span>
                <span className="text-[8.5px] font-normal text-gray-500">
                  {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrentJob, lang)}
                </span>
              </div>
              {exp.location && <p className="text-[8px] text-gray-400 -mt-1">{exp.location}</p>}
              {exp.bullets.length > 0 ? (
                <ul className="list-disc pl-4 space-y-0.5 text-gray-600 text-[8.5px]">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : exp.userDescription ? (
                <p className="text-gray-600 text-[8.5px] pl-2 border-l border-gray-200">{exp.userDescription}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div className="space-y-2">
          {renderSectionHeader(labels.education)}
          {educations.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-950">
                  {edu.institution} — {getDegreeLabel(edu.degree, lang)} {edu.major ? `(${edu.major})` : ''}
                </p>
                {edu.gpa && <p className="text-[8px] text-gray-500">{labels.gpa}: {edu.gpa}</p>}
              </div>
              <span className="text-[8.5px] text-gray-500">
                {edu.isOngoing ? (lang === 'id' ? 'Sekarang' : 'Present') : edu.graduationYear}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-2 gap-4">
        {skills.length > 0 && (
          <div>
            {renderSectionHeader(labels.skills)}
            <p className="text-gray-600 text-[8.5px]">{skills.join(', ')}</p>
          </div>
        )}
        {languages.length > 0 && (
          <div>
            {renderSectionHeader(labels.languages)}
            <div className="space-y-0.5">
              {languages.map((langItem) => (
                <p key={langItem.id} className="text-gray-600 text-[8.5px]">
                  <span className="font-semibold text-gray-800">{langItem.name}</span> ({getLanguageLevelLabel(langItem.level, lang)})
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="w-full border border-gray-200 rounded-lg shadow-inner overflow-hidden select-none bg-gray-100 flex items-center justify-center p-4"
      style={{ height: `${550 * scale + 32}px` }}
    >
      <div 
        className="w-[420px] h-[550px] transform origin-center transition-all duration-300 border border-gray-200 shadow-lg bg-white overflow-hidden rounded-xs relative"
        style={{ transform: `scale(${scale})` }}
      >
        {selectedTemplate === 'clean' && renderClean()}
        {selectedTemplate === 'modern' && renderModern()}
        {selectedTemplate === 'elegant' && renderElegant()}
      </div>
    </div>
  );
}
