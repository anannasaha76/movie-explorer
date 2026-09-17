import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Experience Cinema Without Limits</h1>
        <p className="hero__subtitle">
          Explore thousands of titles, search for old favorites, and pull up
          the full story behind any show in seconds.
        </p>
        <Link to="/movies" className="btn btn--primary">
          Explore Now
        </Link>
      </div>
    </section>
  );
}
