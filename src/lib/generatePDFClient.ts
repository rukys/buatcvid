import React from 'react';
import { ResumeData, TemplateId } from '@/types/resume';
import TemplateClean from '@/components/resume/templates/TemplateClean';
import TemplateModern from '@/components/resume/templates/TemplateModern';
import TemplateElegant from '@/components/resume/templates/TemplateElegant';

export interface GeneratePDFClientInput {
  resumeData: ResumeData;
  templateId: TemplateId;
  accentColor: string;
}

export async function generatePDFClient(input: GeneratePDFClientInput): Promise<Blob> {
  const { resumeData, templateId, accentColor } = input;
  
  // Dynamically import pdf from @react-pdf/renderer to keep the initial client bundle lightweight
  const { pdf } = await import('@react-pdf/renderer');
  
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

  // Generate and return the PDF Blob on the client
  const blob = await pdf(element).toBlob();
  return blob;
}
