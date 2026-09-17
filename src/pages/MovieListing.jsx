import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { getAllShows, searchShows } from "../api/tvmaze";

export default function MovieListing() {
  const [allShows, setAllShows] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllShows()
      .then((data) => {
        if (cancelled) return;
        setAllShows(data);
        setResults(data);
        setError(null);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults(allShows);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      setLoading(true);
      searchShows(query)
        .then((data) => {
          if (cancelled) return;
          setResults(data);
          setError(null);
        })
        .catch((err) => !cancelled && setError(err.message))
        .finally(() => !cancelled && setLoading(false));
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, allShows]);

  return (
    <>
      <Navbar />
      <main className="listing">
        <div className="listing__header">
          <h1>Browse Movies</h1>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {loading && <p className="listing__status">Loading movies…</p>}
        {error && <p className="listing__status listing__status--error">{error}</p>}
        {!loading && !error && results.length === 0 && (
          <p className="listing__status">No movies found for "{query}".</p>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="movie-grid">
            {results.map((show) => (
              <MovieCard key={show.id} show={show} onSelect={setSelectedShow} />
            ))}
          </div>
        )}
      </main>
      <Footer />

      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </>
  );
}
