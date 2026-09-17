const FALLBACK_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='420'>
      <rect width='100%' height='100%' fill='#161B26'/>
      <text x='50%' y='50%' fill='#8B93A7' font-family='sans-serif' font-size='16'
        text-anchor='middle' dominant-baseline='middle'>No Poster</text>
    </svg>`
  );

export default function MovieCard({ show, onSelect }) {
  const poster = show.image?.medium || FALLBACK_POSTER;
  const year = show.premiered ? show.premiered.slice(0, 4) : "—";
  const rating = show.rating?.average ? show.rating.average.toFixed(1) : "N/A";

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          src={poster}
          alt={show.name}
          className="movie-card__poster"
          loading="lazy"
        />
      </div>
      <div className="movie-card__body">
        <h3 className="movie-card__title">{show.name}</h3>
        <p className="movie-card__meta">
          <span>⭐ {rating}</span>
          <span aria-hidden="true">•</span>
          <span>📅 {year}</span>
        </p>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => onSelect(show)}
        >
          See Details
        </button>
      </div>
    </article>
  );
}
