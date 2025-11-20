# PDF Accessibility and HTML Alternatives

Accessible documents ensure everyone can consume your content. Use this guide to remediate PDFs and know when to provide HTML alternatives.

## When to Remediate vs. Convert to HTML
- **Remediate the PDF** when the layout is simple (text, headings, basic tables) and the PDF will remain a primary deliverable.
- **Provide an HTML alternative** when the PDF is complex (scanned forms, infographics, multi-column marketing pieces) or cannot be fully tagged within your timeline.
- **Always** provide HTML when the PDF contains interactive elements that are difficult to make accessible (e.g., form widgets without proper tags).

## Remediation Checklist
1. **Set document language.** Declare the correct language in the PDF properties.
2. **Add tagging structure.** Use headings, lists, and table tags that reflect the visual hierarchy.
3. **Order content for screen readers.** Verify the reading order matches the visual order.
4. **Provide alt text for images and figures.** Describe meaning, not appearance.
5. **Check color contrast.** Ensure text and key visuals meet WCAG 2.1 AA contrast ratios.
6. **Add document title metadata.** Set a clear, descriptive title (not just the filename).
7. **Verify links and bookmarks.** Ensure links have descriptive text and bookmarks mirror the heading structure.
8. **Tag form fields (if any).** Include labels, tooltips, and tab order for every field.
9. **Run an accessibility checker.** Use Adobe Acrobat Preflight/Accessibility Checker or PAC 2024 to confirm tagging quality.

## Creating HTML Alternatives
- Publish the full content as HTML in your site’s rich text fields or link to an existing accessible HTML page.
- Match the PDF content: include headings, lists, tables, and descriptions for images.
- Keep the HTML in sync with the PDF so users always have an up-to-date accessible option.

## Tools and References
- [Adobe Acrobat Accessibility Checker](https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html)
- [PAC 2024 (PDF Accessibility Checker)](https://pac.pdf-accessibility.org/)
- [W3C PDF Accessibility Guidance](https://www.w3.org/WAI/standards-guidelines/pdf/)
