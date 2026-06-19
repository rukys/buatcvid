import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { formatPeriod, getDegreeLabel, getLanguageLevelLabel } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
  language: 'id' | 'en';
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#1E293B',
    lineHeight: 1.45,
  },
  headerContainer: {
    borderBottomWidth: 1.5,
    paddingBottom: 8,
    marginBottom: 14,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#0A0F1E',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactInfo: {
    fontSize: 8,
    color: '#475569',
  },
  sectionContainer: {
    marginBottom: 12,
  },
  sectionHeader: {
    borderBottomWidth: 1.5,
    paddingBottom: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.4,
  },
  expItem: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  itemRoleCompany: {
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
    fontSize: 9.5,
  },
  itemPeriod: {
    fontSize: 8.5,
    color: '#475569',
  },
  itemSub: {
    fontSize: 8.5,
    color: '#64748B',
    marginBottom: 3,
  },
  bulletList: {
    marginLeft: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2.5,
  },
  bulletDot: {
    width: 6,
    fontSize: 9,
    color: '#475569',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.35,
  },
  simpleText: {
    fontSize: 9,
    color: '#475569',
    paddingLeft: 6,
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
  },
  eduItem: {
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eduLeft: {
    flex: 1,
  },
  eduInstitutionMajor: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#1E293B',
  },
  eduGPA: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  eduRight: {
    fontSize: 8.5,
    color: '#475569',
  },
  skillsLanguagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  columnHalf: {
    width: '48%',
  },
  skillText: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.4,
  },
  langItem: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 2,
  },
  langName: {
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
  }
});

export default function TemplateElegant({ data, accentColor, language }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, languages, summary } = data;

  const labels = {
    summary: language === 'id' ? 'Ringkasan Profil' : 'Profile Summary',
    experience: data.isFreshGrad
      ? (language === 'id' ? 'Organisasi & Proyek' : 'Organizations & Projects')
      : (language === 'id' ? 'Pengalaman Kerja' : 'Work Experience'),
    education: language === 'id' ? 'Pendidikan' : 'Education',
    skills: language === 'id' ? 'Keahlian' : 'Skills',
    languages: language === 'id' ? 'Bahasa' : 'Languages',
  };

  const contactString = [
    personalInfo.city,
    personalInfo.email,
    personalInfo.phone,
    personalInfo.linkedIn,
    personalInfo.portfolio,
  ]
    .filter(Boolean)
    .join('   |   ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.headerContainer, { borderColor: accentColor }]}>
          <Text style={styles.name}>{personalInfo.fullName || 'Nama Lengkap'}</Text>
          <View style={styles.subHeader}>
            <Text style={[styles.title, { color: accentColor }]}>
              {personalInfo.targetPosition || 'Posisi Yang Dilamar'}
            </Text>
            <Text style={styles.contactInfo}>{contactString}</Text>
          </View>
        </View>

        {/* Profile Summary */}
        {summary ? (
          <View style={styles.sectionContainer}>
            <View style={[styles.sectionHeader, { borderColor: accentColor }]}>
              <Text style={[styles.sectionTitle, { color: '#0A0F1E' }]}>{labels.summary}</Text>
            </View>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Work Experience */}
        {experiences && experiences.length > 0 ? (
          <View style={styles.sectionContainer}>
            <View style={[styles.sectionHeader, { borderColor: accentColor }]}>
              <Text style={[styles.sectionTitle, { color: '#0A0F1E' }]}>{labels.experience}</Text>
            </View>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemRoleCompany}>
                    {exp.position} — {exp.companyName || ''}
                  </Text>
                  <Text style={styles.itemPeriod}>
                    {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrentJob, language)}
                  </Text>
                </View>
                {exp.location ? <Text style={styles.itemSub}>{exp.location}</Text> : null}
                {exp.bullets && exp.bullets.length > 0 ? (
                  <View style={styles.bulletList}>
                    {exp.bullets.map((bullet, idx) => (
                      <View key={idx} style={styles.bulletItem}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                ) : exp.userDescription ? (
                  <Text style={styles.simpleText}>{exp.userDescription}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {educations && educations.length > 0 ? (
          <View style={styles.sectionContainer}>
            <View style={[styles.sectionHeader, { borderColor: accentColor }]}>
              <Text style={[styles.sectionTitle, { color: '#0A0F1E' }]}>{labels.education}</Text>
            </View>
            {educations.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <View style={styles.eduLeft}>
                  <Text style={styles.eduInstitutionMajor}>
                    {edu.institution} — {getDegreeLabel(edu.degree, language)} {edu.major ? `(${edu.major})` : ''}
                  </Text>
                  {edu.gpa ? <Text style={styles.eduGPA}>{language === 'id' ? 'IPK' : 'GPA'}: {edu.gpa}</Text> : null}
                </View>
                <Text style={styles.eduRight}>
                  {edu.isOngoing
                    ? (language === 'id' ? 'Sekarang' : 'Present')
                    : edu.graduationYear}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills & Languages */}
        <View style={styles.skillsLanguagesContainer}>
          {skills && skills.length > 0 ? (
            <View style={styles.columnHalf}>
              <View style={[styles.sectionHeader, { borderColor: accentColor }]}>
                <Text style={[styles.sectionTitle, { color: '#0A0F1E' }]}>{labels.skills}</Text>
              </View>
              <Text style={styles.skillText}>{skills.join(', ')}</Text>
            </View>
          ) : null}

          {languages && languages.length > 0 ? (
            <View style={styles.columnHalf}>
              <View style={[styles.sectionHeader, { borderColor: accentColor }]}>
                <Text style={[styles.sectionTitle, { color: '#0A0F1E' }]}>{labels.languages}</Text>
              </View>
              {languages.map((lang) => (
                <Text key={lang.id} style={styles.langItem}>
                  <Text style={styles.langName}>{lang.name}</Text> ({getLanguageLevelLabel(lang.level, language)})
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
