"use client";

import React, {useEffect, useState} from 'react';
import type { DocumentAssetProps } from '@/types/sections';
import DocumentViewer from '@/components/DocumentViewer';

function humanFileSize(bytes: number | null) {
  if (bytes === null || bytes === undefined) return undefined;
  const thresh = 1024;
  if (Math.abs(bytes) < thresh) return bytes + ' B';
  const units = ['KB','MB','GB','TB'];
  let u = -1;
  let b = bytes;
  do {
    b /= thresh;
    ++u;
  } while(Math.abs(b) >= thresh && u < units.length - 1);
  return b.toFixed(1) + ' ' + units[u];
}

export default function DocumentAssetSection(props: DocumentAssetProps) {
  const { title, summary, documentFile, htmlAlternativePortableText, wcagStatus, language } = props;
  // Debug incoming props when developing — remove in production
  // eslint-disable-next-line no-console
  console.log('DocumentAssetSection props:', {title, summary, documentFile, htmlAlternativePortableText, wcagStatus, language});

  const originalPdfUrl = documentFile?.asset?.url;
  const [pdfSrc, setPdfSrc] = useState<string | undefined>(originalPdfUrl || undefined);
  const [htmlSrc, setHtmlSrc] = useState<string | undefined>(undefined);
  const [pdfFileSizeLabel, setPdfFileSizeLabel] = useState<string | undefined>(undefined);

  // Create blob URL for HTML alternative if the portable text contains a full HTML string
  useEffect(() => {
    if (!htmlAlternativePortableText || htmlAlternativePortableText.length === 0) return;
    try {
      // If the first block's first child looks like raw HTML, create a blob
      const first = htmlAlternativePortableText[0];
      const childText = Array.isArray(first.children) && first.children[0]?.text ? first.children[0].text : '';
      if (typeof childText === 'string' && childText.trim().length > 0) {
        const trimmed = childText.trim();
        const hasDoctype = /^<!doctype/i.test(trimmed);
        const hasHtmlTag = /<html[\s>]/i.test(trimmed);
        let htmlDocument = trimmed;
        if (!hasDoctype && !hasHtmlTag) {
          const lang = (language && typeof language === 'string') ? language : 'nl';
          const safeTitle = (title && typeof title === 'string') ? title.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Document';
          htmlDocument = `<!DOCTYPE html>\n<html lang="${lang}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${safeTitle}</title>\n</head>\n<body>\n${trimmed}\n</body>\n</html>`;
        }
        const blob = new Blob([htmlDocument], {type: 'text/html;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        setHtmlSrc(url);
        return () => URL.revokeObjectURL(url);
      }
    } catch (err) {
      // ignore
    }
  }, [htmlAlternativePortableText]);

  // Try to fetch PDF as a blob to avoid iframe frame-ancestors blocking.
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | undefined;

    async function tryFetch() {
      if (!originalPdfUrl) return;
      try {
        // First try HEAD to get content-length
        const head = await fetch(originalPdfUrl, {method: 'HEAD'});
        const len = head.headers.get('content-length');
        if (len) {
          const size = humanFileSize(parseInt(len, 10));
          if (size) setPdfFileSizeLabel(size);
        }
      } catch (e) {
        // HEAD may fail on some hosts; ignore
      }

      try {
        const res = await fetch(originalPdfUrl, {mode: 'cors'});
        if (!res.ok) throw new Error('Fetch failed');
        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) {
          setPdfSrc(objectUrl);
          // If size wasn't set from HEAD, use blob size
          if (!pdfFileSizeLabel && blob.size) setPdfFileSizeLabel(humanFileSize(blob.size));
        }
      } catch (err) {
        // Can't fetch as blob (CORS or network). Keep original URL as fallback.
        // eslint-disable-next-line no-console
        console.warn('Could not fetch PDF as blob, will use original URL as fallback.', err);
      }
    }

    tryFetch();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [originalPdfUrl]);

  return (
    <DocumentViewer
      id={`doc-${props._key ?? title}`}
      title={title ?? 'Document'}
      description={summary ?? undefined}
      htmlUrl={htmlSrc || ''}
      pdfUrl={pdfSrc || ''}
      pdfFileSizeLabel={pdfFileSizeLabel}
      showPreview={Boolean(originalPdfUrl)}
    />
  );
}

