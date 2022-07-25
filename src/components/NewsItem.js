import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger px-2">
            {source}
          </span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://previews.123rf.com/images/mitdesign/mitdesign1707/mitdesign170700858/82922397-news-flash-in-red-stamp-style-stamped-on-white-background.jpg"
            }
            style={{
              height: 200,
            }}
            className="card-img-top"
            alt="News Snap"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description && description.slice(0, 50)}
              {description && description.length > 50 && "..."}
            </p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} <br /> on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
