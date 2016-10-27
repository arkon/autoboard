import blobStream from 'blob-stream';
import PDFDocument from 'pdfkit';

import CardTypes from '../constants/CardTypes';

export default function createPDF (cardData) {
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  // Height of valid rendering area of page, used to check against drawing overflow
  // 1 inch = 72 pdf unit, with 20 pdf unit margin
  const threshold = (72 * 11) - 20;

  // Various dimensions
  const width = 572;
  const marginBottom = 50;
  const marginTop = 20;
  const textMargin = 5;
  const bottomDividerXPos = 429;

  let cursorX = 20;
  let cursorY = 20;

  cardData.map((data, i) => {
    // Determine height of card using the number of items it contains
    const maxItems = Math.max(data.responsibilities.length, data.collaborators.length);
    const height = maxItems * 15 + 100;

    // Check for overflow
    if (cursorY + height > threshold) {
      doc.addPage();
      cursorY = marginTop;
    }

    let type = '';
    if (data.type == CardTypes.ABSTRACT) {
      type = 'Abstract';
    } else if (data.type == CardTypes.INTERFACE) {
      type = 'Interface';
    }

    let superclasses = data.superclasses;
    let name = data.name;
    let subclasses = data.subclasses;

    doc.fontSize(15);
    doc.text(type, cursorX + textMargin, cursorY + 10);

    // Setting xPos to width - doc.widthOfString(superclasses) + textMargin + 10 is proxy for marginLeft
    // Need to add 10 because doc.widthOfString is not accurate and adding unwanted space
    doc.text(superclasses, width - doc.widthOfString(superclasses) + textMargin + 10, cursorY + 10, { width: doc.widthOfString(superclasses) });
    doc.text(subclasses, width - doc.widthOfString(subclasses) + textMargin + 10, cursorY + 50, { width: doc.widthOfString(subclasses) });
    doc.fontSize(20);

    // Center align
    doc.text(name, (width - doc.widthOfString(name) / 2) / 2, cursorY + 36, { width: doc.widthOfString(name) });
    doc.fontSize(15);

    doc.rect(cursorX, cursorY, width, height).stroke();

    cursorY += 72;

    // Make minimum spacing as if maxItems=1
    const bottomBoxHeight = Math.max(43, 28 + maxItems*15);
    doc.moveTo(cursorX, cursorY).lineTo(cursorX + width, cursorY).stroke();
    doc.moveTo(cursorX + bottomDividerXPos, cursorY).lineTo(cursorX + bottomDividerXPos, cursorY + bottomBoxHeight).stroke();

    doc.fontSize(12);

    // marginTop - 5 because doc.List has some weird spacing at the top
    doc.list(data.responsibilities, cursorX + textMargin, cursorY + marginTop - 5, { bulletIndex: true });
    doc.list(data.collaborators, cursorX + textMargin + bottomDividerXPos, cursorY + marginTop - 5, { bulletIndex: true });

    cursorY += bottomBoxHeight + marginBottom;
  });

  doc.info.Title = 'crc';
  doc.end();

  // Open generated PDF in new window/tab
  stream.on('finish', () => {
    window.open(stream.toBlobURL('application/pdf'));
  });
};
