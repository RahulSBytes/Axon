// utils/exportPDF.js
import html2pdf from "html2pdf.js";

export const exportPDF = (options = {}) => {
  const { title = "Conversation", userName = "User", userEmail = "" } = options;

  const element = document.getElementById("pdf-printable");

  if (!element) {
    alert("Nothing to export!");
    return;
  }

  // Clone the element
  const clonedElement = element.cloneNode(true);

  // Create hidden container
  const hiddenContainer = document.createElement("div");
  hiddenContainer.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: ${element.offsetWidth}px;
    visibility: hidden;
    pointer-events: none;
  `;
  document.body.appendChild(hiddenContainer);

  // Style cloned element
  clonedElement.style.cssText = `
    display: flex;
    flex-direction: column;
    width: 100%;
    background: white;
    color: black;
  `;

  // Header HTML
  const headerHTML = `
    <div style="
      width: 100%;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 3px solid #D96E6E;
    ">
      <h1 style="
        font-size: 28px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 12px 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      ">${title}</h1>
      <div style="
        font-size: 13px;
        color: #666666;
        line-height: 1.6;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      ">
        <p style="margin: 0 0 4px 0;">
          <strong>Exported:</strong> ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        ${
          userName
            ? `<p style="margin: 0;"><strong>By:</strong> ${userName}${
                userEmail ? ` • ${userEmail}` : ""
              }</p>`
            : ""
        }
      </div>
    </div>
  `;

  clonedElement.insertAdjacentHTML("afterbegin", headerHTML);

  
  const codeBlocks = clonedElement.querySelectorAll("pre");
  codeBlocks.forEach((block) => {
    block.style.cssText = `
      display: block !important;
      overflow: visible !important;
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
      max-width: 100% !important;
      font-size: 11px !important;
      line-height: 1.5 !important;
      page-break-inside: auto !important;
      break-inside: auto !important;
    `;
  });

  const codeElements = clonedElement.querySelectorAll("pre code");
  codeElements.forEach((code) => {
    code.style.cssText = `
      display: block !important;
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
      page-break-inside: auto !important;
      break-inside: auto !important;
    `;
  });

  // ✅ Keep message containers together (these are usually small)
  const messages = clonedElement.querySelectorAll(
    '[class*="message"], [class*="Message"]'
  );
  messages.forEach((msg) => {
    // Only prevent breaks for short messages
    const height = msg.offsetHeight;
    if (height < 300) {
      // Only small messages stay together
      msg.style.pageBreakInside = "avoid";
      msg.style.breakInside = "avoid";
    } else {
      // Allow long messages to split
      msg.style.pageBreakInside = "auto";
      msg.style.breakInside = "auto";
    }
    msg.style.marginBottom = "16px";
  });

  // ✅ Keep headings with their next element
  const headings = clonedElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach((heading) => {
    heading.style.pageBreakAfter = "avoid";
    heading.style.breakAfter = "avoid";
    heading.style.pageBreakInside = "avoid";
  });

  // ✅ Keep list items together if short
  const listItems = clonedElement.querySelectorAll("li");
  listItems.forEach((li) => {
    if (li.offsetHeight < 100) {
      li.style.pageBreakInside = "avoid";
    }
  });

  // Ensure proper text color
  const textElements = clonedElement.querySelectorAll("p, span, div, li");
  textElements.forEach((el) => {
    if (!el.closest("pre") && !el.closest("code")) {
      el.style.color = "#1a1a1a";
    }
  });

  hiddenContainer.appendChild(clonedElement);

  // Generate PDF
  html2pdf()
    .set({
      margin: [12, 12, 12, 12],
      filename: `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${
        new Date().toISOString().split("T")[0]
      }.pdf`,
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true,
        scrollY: 0,
        scrollX: 0,
        windowWidth: element.offsetWidth,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      pagebreak: {
        mode: ["css", "legacy"], // ✅ Removed 'avoid-all'
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: "h1, h2, h3, h4, h5, h6", // ✅ Only avoid breaking headings
      },
    })
    .from(clonedElement)
    .save()
    .then(() => {
      if (document.body.contains(hiddenContainer)) {
        document.body.removeChild(hiddenContainer);
      }
    })
    .catch((error) => {
      console.error("PDF generation error:", error);
      if (document.body.contains(hiddenContainer)) {
        document.body.removeChild(hiddenContainer);
      }
    });
};
