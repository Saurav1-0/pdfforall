# PDFforAll.in — Project Documentation

PDFforAll.in is a browser-based PDF toolkit. The project is built primarily with HTML, CSS and JavaScript, with PDF-processing libraries loaded by individual tool pages. It provides a homepage, informational/legal pages, and 27 standalone PDF tools.

> **Project status:** This README describes the source package supplied for this update. It is not a guarantee that every feature has been independently security-audited or tested in every browser.

---

## Contents

- [Project overview](#project-overview)
- [Features](#features)
- [Available PDF tools](#available-pdf-tools)
- [Project structure](#project-structure)
- [Technology stack](#technology-stack)
- [How processing works](#how-processing-works)
- [Run locally](#run-locally)
- [Deploy to Vercel](#deploy-to-vercel)
- [Site-wide navigation upgrades](#site-wide-navigation-upgrades)
- [Merge PDF: selecting multiple files](#merge-pdf-selecting-multiple-files)
- [Privacy and security notes](#privacy-and-security-notes)
- [Maintenance and future improvements](#maintenance-and-future-improvements)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Legal notice](#legal-notice)

---

## Project overview

The website offers common PDF operations without requiring a traditional desktop application. Each tool is implemented as its own HTML page under `tools/`. The shared stylesheet is located at `css/tool.css`.

The supplied source is a static front-end project. The source package does **not** contain an application server, API service, database, user-account backend, or server-side PDF-processing service. Do not describe those capabilities as implemented unless they are added separately.

### Main site pages

- `index.html` — homepage and tool directory.
- `about.html` — about page.
- `contact.html` — contact page.
- `faq.html` — frequently asked questions.
- `privacy.html` — privacy information.
- `terms.html` — terms of use.
- `support.html` — support page.

## Features

The project includes:

- A directory of PDF tools on the homepage.
- Individual pages for each PDF tool.
- Shared visual styling through `css/tool.css`.
- Drag-and-drop file areas on supported tools.
- File selection through browser file pickers.
- Tool-specific processing options and result/download controls.
- A search control on tool pages to find other tools.
- A Home link on tool pages.
- A small support prompt on tool pages.
- Change/reselect controls that invoke the relevant existing file input where supported.
- A multiple-PDF selection notice in the Merge PDF tool.
- Vercel rewrite rules for clean page URLs.
- Basic response security headers configured in `vercel.json`.

Some tools use different upload workflows. For example, Compare PDFs accepts two separate files, Merge PDF accepts multiple PDFs, and Images to PDF accepts multiple images. Their replacement controls are therefore not identical.

---

## Available PDF tools

The project contains 27 tool pages:

| Tool | Purpose |
|---|---|
| **Merge PDF** | Combine multiple PDF files into one document and arrange their order before merging. |
| **Split PDF** | Split a PDF into multiple documents using page ranges or intervals. |
| **Compress PDF** | Reduce PDF file size by optimizing page images. |
| **Rotate PDF** | Rotate individual pages or the document by 90°, 180° or 270°. |
| **Reorder Pages** | Rearrange pages using page thumbnails. |
| **Remove Pages** | Select and delete pages from a PDF. |
| **Extract Pages** | Extract selected pages into a new PDF. |
| **Crop PDF** | Select crop areas for PDF pages. |
| **Watermark PDF** | Add custom text watermarks to pages. |
| **Page Numbers** | Add page numbers with configurable position and style. |
| **Stamp PDF** | Add stamps such as DRAFT, APPROVED or CONFIDENTIAL. |
| **Sign PDF** | Draw a signature and place it on a PDF page; the page also supports uploading a signature image. |
| **Protect PDF** | Password-protect a PDF. |
| **Unlock PDF** | Remove password protection when the required password is supplied. |
| **Redact PDF** | Mark sensitive areas and remove visible content from the exported document. |
| **Flatten PDF** | Flatten supported form fields and annotations into page content. |
| **Grayscale PDF** | Convert PDF pages to grayscale. |
| **Repair PDF** | Attempt to recover readable content from damaged PDFs. |
| **PDF Info** | Inspect file information, metadata and page dimensions. |
| **PDF to Text** | Extract selectable text and use OCR for scanned/image-only pages. |
| **PDF to HTML** | Convert PDF content into HTML, including OCR support for scanned pages. |
| **PDF to Images** | Render PDF pages as images and download them individually or in a ZIP. |
| **Text to PDF** | Convert plain text into a PDF document. |
| **Images to PDF** | Combine image files into a PDF and arrange their order. |
| **HTML to PDF** | Convert HTML content or an HTML file into PDF. |
| **SVG to PDF** | Convert SVG graphics into PDF. |
| **Compare PDFs** | Compare two PDF versions visually, page by page. |

Tool behavior depends on the capabilities and limitations of the PDF format and the libraries used. Always inspect the output before relying on it.

---

## Project structure

```text
pdfforall-main/
├── index.html
├── about.html
├── contact.html
├── faq.html
├── privacy.html
├── terms.html
├── support.html
├── logo.png
├── favicon.png
├── favicon.ico
├── vercel.json
├── css/
│   └── tool.css
└── tools/
    ├── merge.html
    ├── split.html
    ├── compress.html
    ├── rotate.html
    ├── reorder.html
    ├── remove-pages.html
    ├── extract-pages.html
    ├── crop.html
    ├── watermark.html
    ├── page-numbers.html
    ├── stamp.html
    ├── sign.html
    ├── protect.html
    ├── unlock.html
    ├── redact.html
    ├── flatten.html
    ├── grayscale.html
    ├── repair.html
    ├── pdf-info.html
    ├── pdf-to-text.html
    ├── pdf-to-html.html
    ├── pdf-to-images.html
    ├── text-to-pdf.html
    ├── images-to-pdf.html
    ├── html-to-pdf.html
    ├── svg-to-pdf.html
    └── compare.html
```

The exact file list in the repository is authoritative. If a tool is renamed, update the homepage links and the tool-search directory in the shared page script as well.

---

## Technology stack

The project uses plain browser technologies:

- **HTML5** — page structure and controls.
- **CSS3** — layouts, responsive styling and shared visual design.
- **Vanilla JavaScript** — file selection, user interactions and processing workflows.
- **PDF.js 3.11.174** — PDF parsing, page rendering and text extraction on pages that include it.
- **pdf-lib 1.17.1** — PDF creation and modification on pages that include it.
- **Tesseract.js 5** — OCR on PDF-to-Text and PDF-to-HTML pages.
- **JSZip 3.10.1** — ZIP packaging for selected multi-file downloads on pages that include it.
- **jsPDF 2.5.1** — PDF generation for SVG-to-PDF and HTML-to-PDF workflows.
- **html2canvas 1.4.1** — HTML rendering support in HTML-to-PDF.
- **Vercel Web Analytics** — analytics script reference in the pages where configured.
- **Google Fonts** — Inter and Playfair Display font resources referenced by the pages.

Libraries are loaded from external CDNs in the current source. This means a user may need an internet connection for the relevant library, font, OCR engine or OCR language data to load. The project does not currently vendor all these libraries locally.

---

## How processing works

The tools run in the user's browser using JavaScript and browser file APIs. Depending on the tool, a page may read a selected file into memory, parse or render it with a library, generate a result, and create a browser download.

### Important distinctions

- A browser-based workflow does not automatically mean that absolutely no network requests occur. External scripts, fonts, analytics and OCR language resources may be requested.
- OCR is different from normal text extraction. OCR recognizes text from rendered page images and may take longer or make recognition mistakes.
- PDF files can contain complex fonts, forms, annotations, signatures, embedded files, layers, encryption and unusual structures. Not every feature is preserved by every operation.
- Very large PDFs or image-heavy PDFs can consume substantial browser memory and may fail on low-memory devices.
- Password-protected PDF handling depends on the relevant tool and the password supplied by the user.

Do not promise “100% private”, “unlimited”, “perfectly accurate” or “all files supported” unless those claims have been verified against the actual implementation and operating environment.

---

## Run locally

This is a static website. A build step or package installation is not required for the supplied source.

### Option A: VS Code Live Server

1. Download and extract the project ZIP.
2. Open the `pdfforall-main` folder in Visual Studio Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. Open the local URL shown by VS Code, usually similar to `http://127.0.0.1:5500`.

### Option B: Python local server

Install Python 3, open a terminal in the `pdfforall-main` folder, and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

On some Windows installations, use:

```bash
py -m http.server 8000
```

Use a local web server rather than opening HTML files directly with `file://`. Relative paths, browser security rules and worker scripts may not behave as expected when pages are opened directly.

---

## Deploy to Vercel

The repository includes `vercel.json` with clean URL rewrites and response headers.

### Deploy using the Vercel dashboard

1. Push the project folder to a GitHub repository.
2. Sign in to Vercel.
3. Choose **Add New → Project**.
4. Import the GitHub repository.
5. Set the project root to the directory containing `index.html` and `vercel.json` (normally `pdfforall-main` if the repository contains an outer wrapper folder).
6. For this static project, do not configure a framework build command unless you later add a build system.
7. Deploy.
8. Test the homepage and several tool URLs on the deployed domain.

### Clean URLs

The supplied Vercel configuration includes rewrites equivalent to:

- `/tools/merge` → `/tools/merge.html`
- `/privacy` → `/privacy.html`
- `/terms` → `/terms.html`

Direct `.html` URLs may also work. Keep internal links consistent with the deployed routing behavior.

### After deployment

Test:

- Homepage and every tool page.
- Search links from a tool page.
- Home navigation.
- Support links.
- File selection and drag-and-drop.
- Change/reselect file workflows.
- Output generation and downloads.
- Browser console errors.
- Mobile layout and touch interactions.

Deploy to a preview/staging URL before replacing the production site.

---

## Site-wide navigation upgrades

The supplied upgraded source adds shared UI elements to the tool pages:

### Find tools

The search control filters the list of available tools by tool name and links to the selected tool. It is intended for navigation; it does not search inside PDF documents.

### Home link

A Home link allows users to return to the homepage without first navigating back through the browser history.

### Support prompt

A small support message links to the support page. It is a navigation prompt and does not itself collect a payment or create a donation.

### Change PDF / Change files

The change controls trigger the page's existing file input. This avoids requiring users to return to the homepage to choose another file.

Because tools use different input patterns, verify the correct behavior for each workflow:
- Single-PDF tools normally have one PDF input.
- Compare PDFs uses two PDF inputs.
- Merge PDF accepts multiple PDFs in one input.
- Images to PDF accepts multiple image files.
- Sign PDF has a separate image input for a signature in addition to its PDF input.

Changing a file may reset current selections or results according to the tool's own upload handler. Users should download any result they need before replacing source files.

---

## Merge PDF: selecting multiple files

Merge PDF accepts multiple PDF files in its file picker. The upload input uses the HTML `multiple` attribute.

The page displays a reminder:

> Select as many PDF files as you want to merge. You can choose multiple PDFs together in the file picker, or add more files later. You can also drag the files to arrange their order before merging.

Typical workflow:

1. Open **Merge PDF**.
2. Select **Browse Files** or drag PDF files into the upload area.
3. In the file picker, select multiple PDFs. On most desktop systems, use Ctrl-click (Windows/Linux) or Command-click (macOS) to select individual files, or Shift-click to select a range.
4. On mobile, use the file picker's multi-select feature if the device's picker supports it.
5. Review the selected files.
6. Drag files to change their order if required.
7. Select **Merge PDFs**.
8. Download the merged output and open it to verify page order and content.

The actual practical limit depends on the browser, available memory, device and PDF sizes. Do not interpret “select as many as you want” as a guarantee of infinite capacity.

---

## Privacy and security notes

Security and privacy must be assessed from the actual data flow, not just from the fact that processing happens in JavaScript.

### File handling

- Treat every user-selected PDF and image as untrusted input.
- Validate file type and size, but do not rely only on the filename extension or browser-provided MIME type.
- Handle malformed, encrypted, oversized and resource-intensive files safely.
- Avoid storing file contents longer than necessary.
- Revoke object URLs when they are no longer needed.
- Avoid logging document contents, filenames or sensitive metadata unless there is a clear and disclosed need.

### Front-end security

- Avoid inserting user-controlled content into `innerHTML`.
- Prefer `textContent`, safe DOM creation and context-appropriate output encoding.
- Keep dependencies updated and load them from trusted sources.
- Consider pinning CDN assets with Subresource Integrity (SRI) where supported.
- Consider a restrictive Content Security Policy (CSP), tested against required PDF workers, CDNs, fonts and analytics.
- Do not place secret API keys, private credentials or server secrets in browser JavaScript.
- Validate any future server-side input independently on the server.

### Current Vercel headers

The supplied `vercel.json` sets:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

These headers are a starting point, not a complete security configuration. Consider adding and testing a Content Security Policy, `Referrer-Policy` and an appropriate `Permissions-Policy`. Modern browser protection should rely primarily on safe coding practices and CSP rather than the legacy `X-XSS-Protection` header.

### Legal and privacy documents

The Terms of Use and Privacy Policy should accurately describe the real operator, contact details, data collection, analytics, third-party resources, retention and applicable legal obligations. Have a qualified lawyer review the documents before relying on them for legal protection.

---

## Maintenance and future improvements

Recommended work for future releases:

1. **Automated regression tests** — test every tool's main happy path and common error cases.
2. **Browser/device testing** — Chrome, Firefox, Safari and mobile browsers.
3. **File stress tests** — test large files, many pages, unusual PDFs and low-memory devices.
4. **Dependency management** — inventory versions, update dependencies and review security advisories.
5. **CDN resilience** — consider self-hosting critical libraries or adding fallbacks.
6. **Accessibility** — keyboard navigation, focus states, labels, screen-reader announcements and contrast.
7. **Performance** — lazy-load libraries, reduce unnecessary rendering and release memory after processing.
8. **Privacy verification** — inspect network requests and confirm the actual file-processing path for each tool.
9. **Content Security Policy** — introduce a tested policy compatible with PDF.js workers and required CDNs.
10. **Legal review** — align Terms of Use, Privacy Policy and contact information with the actual business operation.

Before each release, retain a known-good backup and deploy to a staging environment.

---

## Troubleshooting

### A tool page does not load

- Confirm the page and its assets exist at the expected paths.
- Check the browser developer console for missing scripts or CSS.
- Check whether a CDN is blocked or unavailable.
- Confirm that the deployed project root is correct.

### PDF processing fails

- Try another PDF to determine whether the file is malformed or encrypted.
- Confirm that required external libraries loaded successfully.
- Try a smaller PDF if the file is very large.
- Check the browser console for worker loading or memory errors.
- Do not overwrite the original document; keep a backup.

### OCR does not recognize text

- OCR requires the OCR library and language data to load.
- Confirm the browser has an internet connection if language data is fetched from a CDN.
- Choose the correct OCR language.
- Low-resolution, rotated, blurred or handwritten text may be recognized poorly.

### Search does not show a tool

- Search by the tool's displayed name.
- Confirm the tool exists in the tool list used by the shared navigation script.
- If a tool is renamed, update the search directory and homepage links.

### Change PDF does not reset a workflow as expected

- Check whether the page has one or multiple file inputs.
- Check the original file-input `change` handler and any state-reset logic.
- For multi-file tools, use the correct replacement control.
- Test selecting the same file again as well as selecting a different file.

---

## Contributing

When modifying the project:

1. Start from the latest known-good source.
2. Make focused changes and avoid unnecessary rewrites of working tools.
3. Keep page paths and shared assets consistent.
4. Test the changed tool manually.
5. Test navigation and responsive layout.
6. Check browser console errors.
7. Test output files by opening them in a PDF reader.
8. Update this README when adding or removing tools, libraries, configuration or deployment steps.
9. Keep credentials and secrets out of the repository.
10. Create a backup or Git commit before deploying.

## Legal notice

This README is technical project documentation, not legal, security or compliance advice. It does not certify the application as secure, compliant, accessible, or suitable for any particular regulated use. Review the actual implementation and consult qualified professionals where appropriate.
