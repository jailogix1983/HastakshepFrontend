
export default async function getYouTubeDbVideos({ playlistID, maxResults = 100 }) {
    const YouTubeApiKey = process.env.NEXT_PUBLIC_DB_YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&maxResults=${maxResults}&key=${YouTubeApiKey}`

    const res = await fetch(url);
    const data = await res.json();

    return data;
}
