import { stringify } from "query-string";
import React, { useEffect } from "react";
import ErrorMessage from "../../components/errorMessage";
import Feed from "../../components/feed";
import FeedTogler from "../../components/feedTogler";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import PopularTags from "../../components/popularTags";
import { getPaginator, limit } from "../../components/utils";
import useFetch from "../../hooks/useFetch";

const TagFeed = ({ location, match }) => {
  const tagName = match.params.slug;

  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedTogler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={match.url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TagFeed;
