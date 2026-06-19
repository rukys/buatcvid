'use server';

import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { ResumeData, TemplateId } from '@/types/resume';
import TemplateClean from '@/components/resume/templates/TemplateClean';
import TemplateModern from '@/components/resume/templates/TemplateModern';
import TemplateElegant from '@/components/resume/templates/TemplateElegant';

export interface GeneratePDFInput {
  resumeData: ResumeData;
  templateId: TemplateId;
  accentColor: string;
}

export interface GeneratePDFOutput {
  pdfBase64: string | null;
  error?: string;
}

export async function generatePDF(input: GeneratePDFInput): Promise<GeneratePDFOutput> {
  const { resumeData, templateId, accentColor } = input;

  try {
    let element: React.ReactElement;
    const language = resumeData.outputLanguage || 'id';

    switch (templateId) {
      case 'clean':
        element = React.createElement(TemplateClean, {
          data: resumeData,
          accentColor,
          language,
        });
        break;
      case 'modern':
        element = React.createElement(TemplateModern, {
          data: resumeData,
          accentColor,
          language,
        });
        break;
      case 'elegant':
        element = React.createElement(TemplateElegant, {
          data: resumeData,
          accentColor,
          language,
        });
        break;
      default:
        element = React.createElement(TemplateClean, {
          data: resumeData,
          accentColor,
          language,
        });
    }

    const buffer = await renderToBuffer(element);
    const pdfBase64 = buffer.toString('base64');

    return {
      pdfBase64,
    };
  } catch (err: any) {
    console.error('generatePDF server error:', err);
    return {
      pdfBase64: null,
      error: `Gagal membuat file PDF: ${err.message || 'Error tidak diketahui'}.`,
    };
  }
}
