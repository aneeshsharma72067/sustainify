/**
 * Renders a loader component.
 *
 * @component
 * @returns {JSX.Element} The loader component.
 */
import React from "react";

function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-slate-100 bg-opacity-80 backdrop-opacity-80 flex items-center justify-center">
      <div className="loader spinner"></div>
    </div>
  );
}

export default Loader;
