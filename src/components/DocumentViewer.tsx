"use client";

import React from 'react';

export interface DocumentViewerProps {
  id?: string;
  title: string;
  description?: string;
  htmlUrl: string;
  pdfUrl: string;
  pdfFileSizeLabel?: string;
  showPreview?: boolean;
}

export default function DocumentViewer({
  id,
  title,
  description,
  htmlUrl,
  pdfUrl,
  pdfFileSizeLabel,
  showPreview = true,
}: DocumentViewerProps) {
  // stable heading id referenced by aria-labelledby
  const headingId = id ?? `doc-${String(title || 'document').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;

  const downloadText = pdfFileSizeLabel
    ? `Download PDF (${pdfFileSizeLabel})`
    : 'Download PDF';

  return (
    <section aria-labelledby={headingId} className="doc-viewer">
      <div className="doc-viewer__header">
        <h2 id={headingId} className="doc-viewer__title">{title}</h2>
        {description ? <p className="doc-viewer__description">{description}</p> : null}
      </div>

      <div className="doc-viewer__actions" role="group" aria-label={`Document actions for ${title}`}>
        {htmlUrl ? (
          <a href={htmlUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Read accessible HTML version
          </a>
        ) : null}

        {pdfUrl ? (
          <a href={pdfUrl} download className="btn-secondary" rel="noopener noreferrer">
            {downloadText}
          </a>
        ) : null}
      </div>

      {/* If an HTML accessible version exists, render it inline as the canonical accessible content */}
      {htmlUrl ? (
        <div className="doc-viewer__html-preview" style={{marginTop: 16}}>
          <div style={{border: '1px solid hsl(var(--dc-border)/0.6)', borderRadius: 6, overflow: 'hidden'}}>
            <iframe
              src={htmlUrl}
              title={`${title} — toegankelijke weergave`}
              width="100%"
              height={560}
              style={{border: 'none', display: 'block'}}
              role="document"
            />
          </div>
        </div>
      ) : (
        // If there's no HTML alternative, show the PDF preview (visual-only)
        showPreview && pdfUrl ? (
          <div className="doc-viewer__preview" aria-hidden="true" style={{marginTop: 16}}>
            <div className="doc-viewer__preview-inner" style={{border: '1px solid hsl(var(--dc-border)/0.6)', borderRadius: 6, overflow: 'hidden'}}>
              <iframe
                src={pdfUrl}
                title={`${title} — preview (visual only)`}
                width="100%"
                height={560}
                tabIndex={-1}
                style={{border: 'none', display: 'block'}}
              />
            </div>
          </div>
        ) : null
      )}
    </section>
  );
}
