export async function getVideoSectionApi() {
    const latestNewsplaylistId = process.env.NEXT_PUBLIC_YOUTUBE_LATEST_NEWS_PLAYLIST_ID;
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const url = `${process.env.NEXT_PUBLIC_VIDEO_API}/?part=snippet&playlistId=${latestNewsplaylistId}&maxResults=10&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}