import React, { useState, useEffect, useCallback } from "react";
import Loader from "./components/Loader";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Agora a função busca os dados do nosso próprio back-end
  const generateTeam = useCallback(async () => {
    setLoading(true);
    setError(null);
    setTeam([]);
    try {
      // A URL do nosso servidor back-end
      const response = await fetch("http://localhost:3001/api/generate-team");
      if (!response.ok) {
        throw new Error("A resposta da rede não foi ok");
      }
      const newTeam = await response.json();
      setTeam(newTeam);
    } catch (err) {
      setError(
        "Ocorreu um erro ao gerar o time. Verifique se o servidor back-end está rodando."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateTeam();
  }, [generateTeam]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Gerador de Times Pokémon VGC
          </h1>
          <p className="mt-2 text-lg text-gray-400">Regulation Set G</p>
        </header>

        <div className="flex justify-center mb-8">
          <button
            onClick={generateTeam}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Gerando...
              </>
            ) : (
              "Gerar Novo Time"
            )}
          </button>
        </div>

        {loading && <Loader />}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && team.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((pokemon) => (
              <PokemonCard key={pokemon.id + pokemon.item} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>
          Criado com a ajuda da PokéAPI. Pokémon e seus nomes são marcas
          registradas da Nintendo.
        </p>
      </footer>
    </div>
  );
}

export default App;
