import React from "react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="pokeball-loader"></div>
    <p className="text-lg font-semibold text-gray-300">Gerando time...</p>
  </div>
);

export default Loader;
