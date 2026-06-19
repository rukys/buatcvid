import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { formatPeriod, getDegreeLabel, getLanguageLevelLabel } from '@/lib/utils';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
  language: 'id' | 'en';
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#1E293B',
    lineHeight: 1.4,
  },
  sidebar: {
    width: 180,
    padding: 20,
    color: '#FFFFFF',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  sidebarHeader: {
    alignItems: 'center',
    marginBottom: 16,
    textAlign: 'center',
  },
  sidebarName: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sidebarTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  sidebarSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 12,
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.95,
  },
  contactItem: {
    fontSize: 8,
    marginBottom: 6,
    opacity: 0.9,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 7.5,
  },
  sidebarLangItem: {
    fontSize: 8,
    marginBottom: 4,
    opacity: 0.9,
  },
  mainSection: {
    marginBottom: 16,
  },
  mainSectionHeader: {
    marginBottom: 6,
  },
  mainSectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#1E293B',
  },
  mainSectionDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 3,
  },
  summaryText: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.4,
  },
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  expRole: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#1E293B',
  },
  expPeriod: {
    fontSize: 8,
    color: '#64748B',
  },
  expSub: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#475569',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 6,
    fontSize: 9,
    color: '#475569',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: '#475569',
    lineHeight: 1.35,
  },
  simpleText: {
    fontSize: 8.5,
    color: '#475569',
    paddingLeft: 6,
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
  },
  eduItem: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eduLeft: {
    flex: 1,
  },
  eduInstitution: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#1E293B',
  },
  eduMajor: {
    fontSize: 8.5,
    color: '#475569',
    marginTop: 1,
  },
  eduGPA: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  eduRight: {
    fontSize: 8,
    color: '#64748B',
  }
});

export default function TemplateModern({ data, accentColor, language }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, languages, summary } = data;

  const labels = {
    summary: language === 'id' ? 'Ringkasan Profil' : 'Profile Summary',
    experience: data.isFreshGrad
      ? (language === 'id' ? 'Organisasi & Proyek' : 'Organizations & Projects')
      : (language === 'id' ? 'Pengalaman Kerja' : 'Work Experience'),
    education: language === 'id' ? 'Pendidikan' : 'Education',
    skills: language === 'id' ? 'Keahlian' : 'Skills',
    languages: language === 'id' ? 'Bahasa' : 'Languages',
    contact: language === 'id' ? 'Kontak' : 'Contact',
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: accentColor }]}>
          {personalInfo.photoUrl ? (
            <View style={styles.avatarContainer}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={personalInfo.photoUrl} style={styles.avatar} />
            </View>
          ) : null}

          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarName}>{personalInfo.fullName || 'Nama Lengkap'}</Text>
            <Text style={styles.sidebarTitle}>{personalInfo.targetPosition || 'Posisi'}</Text>
          </View>

          {/* Contact Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>{labels.contact}</Text>
            {personalInfo.email ? <Text style={styles.contactItem}>📧  {personalInfo.email}</Text> : null}
            {personalInfo.phone ? <Text style={styles.contactItem}>📞  {personalInfo.phone}</Text> : null}
            {personalInfo.city ? <Text style={styles.contactItem}>📍  {personalInfo.city}</Text> : null}
            {personalInfo.linkedIn ? <Text style={styles.contactItem}>🔗  LinkedIn</Text> : null}
            {personalInfo.portfolio ? <Text style={styles.contactItem}>🌐  Portfolio</Text> : null}
          </View>

          {/* Skills Section */}
          {skills && skills.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>{labels.skills}</Text>
              <View style={styles.skillContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillChip}>{skill}</Text>
                ))}
              </View>
            </View>
          ) : null}

          {/* Languages Section */}
          {languages && languages.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>{labels.languages}</Text>
              {languages.map((lang) => (
                <Text key={lang.id} style={styles.sidebarLangItem}>
                  {lang.name} ({getLanguageLevelLabel(lang.level, language)})
                </Text>
              ))}
            </View>
          ) : null}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Profile Summary */}
          {summary ? (
            <View style={styles.mainSection}>
              <View style={styles.mainSectionHeader}>
                <Text style={styles.mainSectionTitle}>{labels.summary}</Text>
                <View style={styles.mainSectionDivider} />
              </View>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {experiences && experiences.length > 0 ? (
            <View style={styles.mainSection}>
              <View style={styles.mainSectionHeader}>
                <Text style={styles.mainSectionTitle}>{labels.experience}</Text>
                <View style={styles.mainSectionDivider} />
              </View>
              {experiences.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expRole}>{exp.position}</Text>
                    <Text style={styles.expPeriod}>
                      {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrentJob, language)}
                    </Text>
                  </View>
                  <Text style={styles.expSub}>
                    {exp.companyName}{exp.location ? ` · ${exp.location}` : ''}
                  </Text>
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
            <View style={styles.mainSection}>
              <View style={styles.mainSectionHeader}>
                <Text style={styles.mainSectionTitle}>{labels.education}</Text>
                <View style={styles.mainSectionDivider} />
              </View>
              {educations.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <View style={styles.eduLeft}>
                    <Text style={styles.eduInstitution}>{edu.institution}</Text>
                    <Text style={styles.eduMajor}>
                    {getDegreeLabel(edu.degree, language)} {edu.major ? `— ${edu.major}` : ''}
                  </Text>
                  {edu.gpa ? <Text style={styles.eduGPA}>{language === 'id' ? 'IPK' : 'GPA'}: {edu.gpa}</Text> : null}
                  </View>
                  <Text style={styles.eduRight}>
                    {edu.isOngoing
                      ? (language === 'id' ? 'Sedang Kuliah' : 'Ongoing')
                      : edu.graduationYear}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
