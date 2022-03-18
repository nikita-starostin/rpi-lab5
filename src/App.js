import './App.scss';
import {useAppState} from "./useAppState";

export default function App() {
    const {query, news, source, setQueryFilter, fetchMoreNews, setSourceFilter} = useAppState();

    return <>
        <header>
            <h3>News API</h3>
        </header>
        <section className="filters">
            <form className="filter-form">
                <input type="text"
                       value={source}
                       onInput={e => setSourceFilter(e.target.value)}
                       className="input-source"
                       placeholder="Source"/>
                <input type="text"
                       value={query}
                       onInput={e => setQueryFilter(e.target.value)}
                       className="input-query"
                       placeholder="Query"/>
            </form>
        </section>
        <section className="news">
            <div className="news-items">
                {news.map(({title, author, publishedAt, url}) => {
                    return <div className="news-item">
                        <div className="news-title">{title}</div>
                        <div className="news-author">Published by {author} at {publishedAt}</div>
                        <a href="{url}">Read more</a>
                    </div>
                })}
            </div>
            <button className="load-more"
                    onClick={fetchMoreNews}>Load More
            </button>
            <span>! the News API has a restriction - it is not allowed to fetch news from browser, only from localhost</span>
        </section>
    </>;
}
