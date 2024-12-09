import '../style/Home.css'; // Ensure correct import path

const Home = () => {

  return (
    <main>
      <div className="home-container">
        <div className="column-wrapper">
          <h2>Press Start</h2>
          <div className="column not-yet-played">
            <p>*here a game pulled from the api will be displayed*</p> {/* Placeholder */}
          </div>
        </div>
        <div className="column-wrapper">
          <h2>Loading</h2>
          <div className="column playing">
            <p>*here a game pulled from the api will be displayed*</p> {/* Placeholder */}
          </div>
        </div>
        <div className="column-wrapper">
          <h2>Well Played</h2>
          <div className="column played">
            <p>*here a game pulled from the api will be displayed*</p> {/* Placeholder */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
