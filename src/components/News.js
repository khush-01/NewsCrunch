import React, { Component } from "react";
import PropTypes from "prop-types";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 15,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      articles: [],
      results: 0,
      page: 1,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsCrunch`;
  }

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      results: parsedData.totalResults,
      loading: false,
    });
  }

  fetchMore = async () => {
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${
      this.props.apiKey
    }&country=${this.props.country}&category=${this.props.category}&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      results: parsedData.totalResults,
      page: this.state.page + 1,
    });
  };

  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  render() {
    return (
      <>
        <h1 className="text-center mt-3 mb-5">
          NewsCrunch - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length !== this.state.results}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((el) => (
                  <div key={el.url} className="col-md-4 my-3">
                    <NewsItem
                      title={el.title}
                      description={el.description}
                      imageUrl={el.urlToImage}
                      newsUrl={el.url}
                      author={el.author}
                      date={el.publishedAt}
                      source={el.source.name}
                    />
                  </div>
                ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
