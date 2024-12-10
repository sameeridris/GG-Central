import '../style/Home.css'; 
import { Link } from 'react-router-dom';
const startImgArray = ["https://m.media-amazon.com/images/M/MV5BNDRhZjkyNWItMjkzOS00ZjUwLTk4NDctODY2ZjZkZGE4OGY2XkEyXkFqcGc@._V1_.jpg", "https://howlongtobeat.com/games/5203_League_of_Legends.jpg"];
const loadingImgArray = ["https://www.lego.com/cdn/cs/set/assets/blt0f703dfbce999d88/Video-games-Juno-Carousel-card.jpg?fit=crop&format=jpg&quality=80&width=635&height=440&dpr=1"];
const playedImgArray = ["https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png"];

const Home = () => {

  return (
    <main>
      <div className="home-container">
        <div className="column-wrapper">
          <h2>Press Start</h2>
          <div className="column not-yet-played">
            {startImgArray &&
              startImgArray.map((img) => (
                <div className="card mb-3">
                  {/* Create a link to this thought's page to view its comments using `<Link>` component */}
                  <img src={img} width={'100%'} alt="" />
                  <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/thoughts/6754f48c45fb31fb1e09facd`}
                  >
                    Join the discussion on this game.
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="column-wrapper">
          <h2>Loading</h2>
          <div className="column playing">
            {loadingImgArray &&
              loadingImgArray.map((img) => (
                <div className="card mb-3">
                  {/* Create a link to this thought's page to view its comments using `<Link>` component */}
                  <img src={img} width={'100%'} alt="" />
                  <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/thoughts/6754f48c45fb31fb1e09facd`}
                  >
                    Join the discussion on this game.
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="column-wrapper">
          <h2>Well Played</h2>
          <div className="column played">
            {playedImgArray &&
              playedImgArray.map((img) => (
                <div className="card mb-3">
                  {/* Create a link to this thought's page to view its comments using `<Link>` component */}
                  <img src={img} width={'100%'} alt="" />
                  <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/thoughts/6754f48c45fb31fb1e09facd`}
                  >
                    Join the discussion on this game.
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
