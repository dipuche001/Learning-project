import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerDiamond } from "spinners-react";
function App() {
  const [search, setSearch] = useState("");
  const [trendings, setTrendings] = useState([]); 
  const [offset, setOffset] = useState(1);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };
  function callBack() {
    console.log("I'm at the bottom!");
    setOffset(offset + 20);
  }
  useEffect(() => {
    async function getTrendings() { 
      
    await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

      const trendingRes = await axios.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=Rs9WA4FkrqdRNGs5j6QnVIUjfrIJGvIw&limit=10&offset=${offset}`
      );
     if(trendingRes.status === 200 && offset ===1) 
      setTrendings(trendingRes.data.data)  
    if(trendingRes.status===200 && offset!==1) {
       setTrendings(trendings=> trendings.concat(trendingRes.data.data))
    }
    }
    getTrendings();
  }, [offset]);

  return (
    <div className="App">
      <nav>
        <div className="headIcon">
        <Link to='/' style={{textDecoration:"none",color:'#fff' ,display:'flex' ,alignItems:'center'}}> 
          <img
            src="https://media2.giphy.com/media/3o85xqlAQLrPgXH29O/giphy.gif?cid=ecf05e47x5ffa5ut1x3mg8rvjap0ijotowb8jegzugko4m56&rid=giphy.gif&ct=g"
            alt=""
            height={"40px"}
            style={{ borderRadius: "10px" }}
          />
          GIFs
        </Link>
        </div>
      </nav>
      <form className="inputs" onSubmit={handleSubmit}>
        {/* for search bar  */}
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for any kind of gifs"
          style={{ width: "100%", height: "40px", marginTop: "5px" }}
        />

        <button>
          <SearchOutlined style={{ color: "white", fontSize: "20px" }} />
        </button>
      </form>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <SpinnerDiamond
            size={200}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </div>
      ) : (
        <div className="trending" >
          {/* show trending ones  */}
          <h3>Trending 🔥  </h3>
          <InfiniteScroll
            dataLength={trendings.length} //This is important field to render the next data
            next={callBack}
            hasMore={true}
            loader={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <SpinnerDiamond
                  size={200}
                  thickness={100}
                  speed={100}
                  color="#36ad47"
                  secondaryColor="rgba(0, 0, 0, 0.44)"
                />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="trending-gif">
              {trendings &&
                trendings.map((res, index) => (
                  <div className="trending-gif-item" key={index}>
                    <img src={res.images.original.url} />
                  </div>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

export default App;
