import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppState, type Pokemon } from './types';
import { POKEMON_CSV_DATA } from './constants';
import { generateCostumeImage } from './services/geminiService';
import Header from './components/Header';
import WebcamCapture from './components/WebcamCapture';
import PokemonSelector from './components/PokemonSelector';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { CameraIcon, SparklesIcon, RefreshIcon } from './components/Icons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string>('');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsedPokemon = POKEMON_CSV_DATA.split('\n')
      .slice(1) // Skip header
      .map(line => {
        const [id, ...nameParts] = line.split(',');
        const name = nameParts.join(','); // Handle names with commas if any
        return { id: id.trim(), name: name.trim() };
      })
      .filter(p => p.id && p.name);
    setPokemonList(parsedPokemon);
    setSelectedPokemon(parsedPokemon[0]?.name || '');
  }, []);

  const handleStart = () => {
    setAppState(AppState.CAPTURING);
    setError(null);
  };

  const handleCapture = (imageDataUrl: string) => {
    setUserImage(imageDataUrl);
    setAppState(AppState.CAPTURED);
  };

  const handleRetake = () => {
    setUserImage(null);
    setGeneratedImage(null);
    setAppState(AppState.CAPTURING);
  };
  
  const handleStartOver = () => {
    setUserImage(null);
    setGeneratedImage(null);
    setError(null);
    setAppState(AppState.INITIAL);
  };

  const handleGenerate = useCallback(async () => {
    if (!userImage || !selectedPokemon) {
      setError("Please capture an image and select a Pokémon.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAppState(AppState.GENERATING);

    try {
      const result = await generateCostumeImage(userImage, selectedPokemon);
      setGeneratedImage(result);
      setAppState(AppState.RESULT);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
      setAppState(AppState.CAPTURED); // Revert to captured state on error
    } finally {
      setIsLoading(false);
    }
  }, [userImage, selectedPokemon]);

  const renderContent = () => {
    switch (appState) {
      case AppState.INITIAL:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-yellow-300 tracking-wider">Welcome to PokéCostume AI!</h2>
            <p className="text-gray-300 max-w-md mx-auto">
              Get ready to transform! Use your webcam to snap a picture, pick your favorite Gen 1 Pokémon, and see yourself in a fun, AI-generated costume.
            </p>
            <button
              onClick={handleStart}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-500 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 shadow-lg text-lg"
            >
              <CameraIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
              Start Camera
            </button>
          </div>
        );

      case AppState.CAPTURING:
        return <WebcamCapture onCapture={handleCapture} />;

      case AppState.CAPTURED:
      case AppState.RESULT:
      case AppState.GENERATING:
        return (
          <div className="w-full space-y-6">
            {appState === AppState.GENERATING ? (
              <div className="flex flex-col items-center space-y-4 text-center p-8 bg-gray-900/50 rounded-lg">
                <Loader />
                <h3 className="text-xl font-semibold text-cyan-400 animate-pulse">Generating your {selectedPokemon} costume...</h3>
                <p className="text-gray-400">The AI is working its magic. This might take a moment!</p>
              </div>
            ) : generatedImage && userImage ? (
              <ResultDisplay originalImage={userImage} generatedImage={generatedImage} />
            ) : userImage && (
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Your Photo</h3>
                <img src={userImage} alt="User capture" className="rounded-lg shadow-lg max-w-sm w-full aspect-square object-cover" />
              </div>
            )}
            
            {error && (
               <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg my-4">{error}</div>
            )}

            <div className="p-4 bg-slate-700/50 rounded-lg space-y-4">
              <PokemonSelector
                pokemonList={pokemonList}
                selectedPokemon={selectedPokemon}
                onChange={(e) => setSelectedPokemon(e.target.value)}
                disabled={isLoading}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button
                    onClick={handleGenerate}
                    disabled={isLoading || !selectedPokemon}
                    className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                    <SparklesIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    <span>{appState === AppState.RESULT ? 'Generate New' : 'Generate'}</span>
                  </button>
                 <button
                    onClick={handleRetake}
                    disabled={isLoading}
                    className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                    <CameraIcon className="w-5 h-5" />
                    <span>Retake Photo</span>
                  </button>
              </div>
            </div>
             {appState === AppState.RESULT && (
                <div className="text-center">
                    <button
                        onClick={handleStartOver}
                        className="group flex items-center justify-center gap-2 px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                    >
                         <RefreshIcon className="w-5 h-5 transition-transform group-hover:rotate-[-90deg]" />
                         <span>Start Over</span>
                    </button>
                </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-3xl bg-red-700 rounded-xl border-8 border-black shadow-2xl">
        <Header />
        <div className="p-4 sm:p-8 bg-gray-800 rounded-b-lg">
          <div className="bg-black/20 p-4 sm:p-6 rounded-md min-h-[400px] flex items-center justify-center">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
