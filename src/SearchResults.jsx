import React from "react";
import "./App.css";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerDiamond } from "spinners-react";
export default function SearchResults() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setRes] = useState([]);
  const [offset, setOffset] = useState(1);
  const navigate = useNavigate();
  const params = useParams();

  function callBack() {
    console.log("I'm at the bottom!");
    setOffset(offset + 20);
  }

  async function getTrendings(searchField) {
    const searchModified = modifyText(searchField);
    await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const trendingRes = await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=${searchModified}&api_key=Rs9WA4FkrqdRNGs5j6QnVIUjfrIJGvIw&limit=10&offset=${offset}`
    );
    if (trendingRes.status === 200) {
      if (offset === 1) setRes(trendingRes.data.data);
      else setRes((res) => res.concat(trendingRes.data.data));
    }
    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setOffset(1);
    setLoading(true);
    navigate(`/search/${search}`, { replace: true });
  };

  function modifyText(text) {
    const textSplited = text.split(" ");
    return textSplited.reduce((prev, cur) => prev + "+" + cur, "");
  }

  useEffect(() => {
    if (!search) setSearch(params.field);
    getTrendings(params.field);
  }, [params.field, offset]);


  return (
    <div className="App">
      <nav>
        <div className="headIcon">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
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
          value={search}
          style={{ width: "100%", height: "40px", marginTop: "5px" }}
        />

        <button>
          <SearchOutlined style={{ color: "white", fontSize: "20px" }} />
        </button>
      </form>

      {/* Show the results  */}

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
        <div className="trending">
          {/* show trending ones  */}
          <h3>Results 🦉 </h3>
          <InfiniteScroll
            dataLength={results.length} //This is important field to render the next data
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
              {results &&
                results.map((res, index) => (
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
