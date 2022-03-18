export function fetchNews(state) {
    return new Promise((resolve, reject) => {
        const queryParams = {
            q: state.filter.query,
            sources: [state.filter.source],
            apiKey: process.env.REACT_APP_NEWS_API_TOKEN,
            pageSize: state.pageSize,
            page: Math.round(state.news.length / state.pageSize) + 1,
            country: !state.filter.query && !state.filter.source ? 'gb' : null
        };
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => !!value ? `${key}=${encodeURIComponent(value)}` : null)
            .filter(p => !!p)
            .join('&');
        const xhr = new XMLHttpRequest();
        const url = `https://newsapi.org/v2/top-headlines?${queryString}`;

        xhr.open('GET', url)
        xhr.send();
        xhr.onload = () => {
            resolve(JSON.parse(xhr.response).articles);
        }
    })
}
