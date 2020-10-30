import React from "react";
import youtube from "../apis/youtube";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetails from "./VideoDetails";
import ReactPaginate from "react-paginate";
import "./app.css";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
    currentPage: 0,
    term: "",
    nextPageToken: "",
    prevPageToken: "",
  };

  retrieveVideos = async (term, nextPage) => {
    const { currentPage, nextPageToken, prevPageToken } = this.state;

    const pageToken = currentPage > nextPage ? prevPageToken : nextPageToken;
    // previous
    const response = await youtube.get("/search", {
      params: {
        q: term,
        pageToken: pageToken,
      },
    });
    this.setState({
      videos: response.data.items,
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken,
      selectedVideo: response.data.items[0],
    });
  };
  onSearchSubmit = async (term) => {
    // const videos = await youtube.get("/search", {
    //   params: {
    //     q: term,
    //     // pageToken: "CBQQAA",
    //   },
    // });
    // this.setState({
    //   videos: videos.data.items,
    //   selectedVideo: videos.data.items[0],
    // });
    this.setState({ term });
    this.retrieveVideos(term, 0);
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  componentDidMount() {
    this.onSearchSubmit("Buildings");
  }

  onPageChange = (e) => {
    this.setState({ currentPage: e.selected });
    debugger;
    this.retrieveVideos(this.state.term, e.selected);
  };

  render() {
    const { videos, selectedVideo } = this.state;
    return (
      <div className="ui container">
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetails video={selectedVideo} />

              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.onPageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
            <div className="five wide column">
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
