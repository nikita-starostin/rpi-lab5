import {useState} from "react";
import {fetchNews} from "./news-api";

export function useAppState() {
    const [state, setState] = useState({
        pageSize: 5,
        news: [],
        filter: {
            query: '',
            source: ''
        }
    });

    return {
        query: state.filter.query,
        source: state.filter.source,
        news: state.news
            .filter(p => !state.filter.query || p.title.includes(state.filter.query))
            .filter(p => !state.filter.source || p.source.name.includes(state.filter.source)),
        setQueryFilter: (query) => {
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    query
                }
            })
        },
        setSourceFilter: (query) => {
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    query
                }
            })
        },
        fetchMoreNews: async () => {
            const news = await fetchNews(state);
            setState({
                ...state,
                news: [
                    ...state.news,
                    ...news
                ]
            })
        }
    }
}
