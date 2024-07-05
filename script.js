/*
    © 2021-2024, LukeDev
*/

// Song
window.addEventListener("load", () => {
    const audio = new Audio("assets/resonance slowed.mp3");
    audio.play();
    audio.volume = 0.2;
});

// Discord Status
lanyard({
    userId: "1095455197121237103",
    socket: true,
    onPresenceUpdate: (json) => {
        console.log(json);

        const status = document.getElementsByClassName("status")[0];
        
        status.classList.replace(status.classList.item(1), json.discord_status);

        const presence = document.getElementsByClassName("presence")[0];

        if (json.spotify) {
            presence.style.display = null;

            let image = document.getElementsByClassName("image")[0];
            let name = document.getElementsByClassName("name")[0];

            presence.onclick = () => window.open(`https://open.spotify.com/track/${json.spotify.track_id}`);
            image.src = json.spotify.album_art_url;
            name.innerHTML = `${json.spotify.song.length > 12 ? json.spotify.song.slice(0, 9) + "..." : json.spotify.song}<br>${json.spotify.artist.length > 12 ? json.spotify.artist.slice(0, 9) + "..." : json.spotify.artist}`;
        }
        else if (json.activities.find((el) => el.application_id === "782685898163617802")) {
            presence.style.display = null;

            const activity = json.activities.find((el) => el.application_id === "782685898163617802");
            
            let image = document.getElementsByClassName("image")[0];
            let name = document.getElementsByClassName("name")[0];

            if (activity.details.includes("Not in a file")) name.innerHTML = `VSCode<br>No file`;
            else name.innerHTML = `VSCode<br>${(activity.state.split(" ")[2]).split(":")[0]}`;

            image.src = `https://${activity.assets.large_image.split("https/")[1]}`;
        }
        else {
            let presence = document.getElementsByClassName("presence")[0];
            presence.style.display = "none";
        }
    }
});