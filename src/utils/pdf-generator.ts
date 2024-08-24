import PDFDocument from 'pdfkit';
import fs from 'fs';

export function generateEventPDF(report: any, filePath: string) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));
    
    doc.fontSize(25).text('Event Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Event Name: ${report.name}`);
    doc.text(`Date: ${report.date}`);
    doc.text(`Location: ${report.location}`);
    doc.text(`Participants Limit: ${report.participantsLimit}`);
    
    doc.end();
}
