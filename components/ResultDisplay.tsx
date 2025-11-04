import React from 'react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Your Photo</h3>
        <img src={originalImage} alt="Original user" className="rounded-lg shadow-lg w-full aspect-square object-cover" />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">Your PokéCostume</h3>
        <img src={generatedImage} alt="Generated costume" className="rounded-lg shadow-lg w-full aspect-square object-cover" />
      </div>
    </div>
  );
};

export default ResultDisplay;
