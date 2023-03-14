import SpotifyWebApi from "spotify-web-api-node";
import dotenv from 'dotenv';
dotenv.config({ path: ".env" })


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

class User {
    public name: string;
    public constructor(user_name: string) {
        this.name = user_name
    }
    private async refresh_token(): Promise<void> {
        const data = await spotifyApi.clientCredentialsGrant()
        spotifyApi.setAccessToken(data.body['access_token']);
    }
}

//var spotifyApi = new SpotifyWebApi();
//spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK')