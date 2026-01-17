// utils/exportPDF.js
import html2pdf from 'html2pdf.js';

export const exportPDF = () => {
  const element = document.getElementById('pdf-printable');
  
  if (!element) {
    alert('Nothing to export!');
    return;
  }

  html2pdf()
    .set({
      margin: 10,
      filename: 'export.pdf',
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { format: 'a4' },
    })
    .from(element)
    .save();
};