import toast from "react-hot-toast";

export const exportPDF = (options = {}) => {
  const { title = "Conversation", userName = "User", userEmail = "" } = options;

  const element = document.getElementById("pdf-printable");

  if (!element) {
    toast.error("Nothing to export!");
    return;
  }

  // Scroll to top
  element.scrollTop = 0;
  window.scrollTo(0, 0);

  // Store originals
  const originalTitle = document.title;
  const originalStyles = new Map();

  // ═══════════════════════════════════════════════════════════
  // 🔥 FIX: Force ALL elements inside #pdf-printable to be
  //         full width and non-scrollable
  // ═══════════════════════════════════════════════════════════

  const allElements = element.querySelectorAll('*');
  
  allElements.forEach((el) => {
    // Store original styles
    originalStyles.set(el, {
      cssText: el.style.cssText,
      className: el.className
    });

    // Get computed style to check current values
    const computed = window.getComputedStyle(el);

    // Fix width constraints
    if (computed.maxWidth !== 'none' && computed.maxWidth !== '100%') {
      el.style.maxWidth = '100%';
    }
    
    // Fix overflow (especially for code blocks)
    if (computed.overflow !== 'visible' || 
        computed.overflowX !== 'visible' || 
        computed.overflowY !== 'visible') {
      el.style.overflow = 'visible';
      el.style.overflowX = 'visible';
      el.style.overflowY = 'visible';
    }

    // Fix height constraints
    if (computed.maxHeight !== 'none') {
      el.style.maxHeight = 'none';
    }

    // Fix fixed heights on scrollable containers
    if (el.scrollHeight > el.clientHeight) {
      el.style.height = 'auto';
    }

    // Remove margin auto (centering)
    if (computed.marginLeft === 'auto' || computed.marginRight === 'auto') {
      el.style.marginLeft = '0';
      el.style.marginRight = '0';
    }
  });

  // ═══════════════════════════════════════════════════════════
  // 🔥 FIX: Specifically target code blocks
  // ═══════════════════════════════════════════════════════════

  const codeBlocks = element.querySelectorAll('pre, code, [class*="syntax"], [class*="highlight"], [class*="prism"]');
  
  codeBlocks.forEach((block) => {
    originalStyles.set(block, {
      cssText: block.style.cssText,
      className: block.className
    });

    block.style.cssText += `
      overflow: visible !important;
      overflow-x: visible !important;
      overflow-y: visible !important;
      max-height: none !important;
      height: auto !important;
      max-width: 100% !important;
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
      word-break: break-word !important;
    `;
  });

  // ═══════════════════════════════════════════════════════════
  // 🔥 FIX: Target the printable element itself
  // ═══════════════════════════════════════════════════════════

  const originalElementStyle = element.style.cssText;
  element.style.cssText += `
    overflow: visible !important;
    height: auto !important;
    max-height: none !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
  `;

  // ═══════════════════════════════════════════════════════════
  // 🔥 FIX: Target all ancestors
  // ═══════════════════════════════════════════════════════════

  const ancestors = [];
  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    ancestors.push({
      element: parent,
      originalStyle: parent.style.cssText
    });
    parent.style.cssText += `
      overflow: visible !important;
      height: auto !important;
      max-height: none !important;
    `;
    parent = parent.parentElement;
  }

  // Store body/html originals
  const originalBodyStyle = document.body.style.cssText;
  const originalHtmlStyle = document.documentElement.style.cssText;

  document.body.style.overflow = 'visible';
  document.documentElement.style.overflow = 'visible';

  // Set filename
  const filename = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${
    new Date().toISOString().split("T")[0]
  }`;
  document.title = filename;

  // Create header
  const header = document.createElement("div");
  header.id = "print-header";
  header.innerHTML = `
    <h1 style="
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 12px 0;
    ">${title}</h1>
    <div style="
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      padding-bottom: 12px;
      border-bottom: 3px solid #D96E6E;
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
  `;

  element.insertBefore(header, element.firstChild);
  document.body.classList.add("printing-pdf");

  // Print after styles apply
  setTimeout(() => {
    window.print();
  }, 300);

  // Cleanup
  const cleanup = () => {
    // Remove print class
    document.body.classList.remove("printing-pdf");
    
    // Restore title
    document.title = originalTitle;
    
    // Restore element styles
    element.style.cssText = originalElementStyle;
    
    // Restore all child elements
    originalStyles.forEach((original, el) => {
      if (el && el.style) {
        el.style.cssText = original.cssText;
      }
    });

    // Restore ancestors
    ancestors.forEach(({ element: el, originalStyle }) => {
      el.style.cssText = originalStyle;
    });

    // Restore body/html
    document.body.style.cssText = originalBodyStyle;
    document.documentElement.style.cssText = originalHtmlStyle;
    
    // Remove header
    if (header.parentNode) {
      header.parentNode.removeChild(header);
    }

    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);
  setTimeout(cleanup, 15000);
};