"use client";

import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintReceipt = () => {
  const componentRef = useRef<HTMLDivElement>(null); // Create a ref
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Reference the content to print
    documentTitle: "My Awesome Document", // Set the printed file name
    pageStyle: `@page { size: auto; margin: 20mm; }`, // Optional custom page styles
  });

  useEffect(() => {
    console.log("ref:", componentRef.current);
  }, []);

  return (
    <div>
      {/* The button that triggers the print dialog */}
      <button onClick={handlePrint}>Print this out</button>

      {/* The component to be printed (can be hidden on the screen if needed) */}
      <div>
        {/* <ComponentToPrint /> */}
        <div style={{ padding: "20px" }} ref={componentRef}>
          <h1>Printable Document Title</h1>
          <p>This is the content that will be included in the printout.</p>
          {/* Include tables, images, etc. */}
        </div>
      </div>
    </div>
  );
};

export default PrintReceipt;
