import React from 'react';
import { Page } from '@react-pdf/renderer';

export const PdfContainer = () => {
  <>
    <Page size="A4">
      <p>Hello World</p>
    </Page>
    <Page size="A4">
      <p>Page 2</p>
    </Page>
  </>;
  return <div>pdfContainer</div>;
};
