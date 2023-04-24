/*
    © 2021-2022, LukeDev
*/

// Song
window.addEventListener("load", () => {
    const audio = new Audio("assets/resonance slowed.mp3");
    audio.play();
    audio.volume = 0.2;
});

// Discord Status
const updatePresence = (async () => {
    const request = await fetch("https://api.lanyard.rest/v1/users/1095455197121237103");
    const json = await request.json();
    
    if (json.success) {
        const status = document.getElementsByClassName("status")[0];

        switch (json.data.discord_status) {
            case "online":
                status.classList.replace(status.classList.item(1), "online");
                break;
            case "dnd":
                status.classList.replace(status.classList.item(1), "dnd");
                break;
            case "idle":
                status.classList.replace(status.classList.item(1), "idle");
                break;
            case "offline":
                status.classList.replace(status.classList.item(1), "offline");
                break;
        };

        const presence = document.getElementsByClassName("presence")[0];

        if (json.data.spotify) {
            let image = document.getElementsByClassName("image")[0];
            let name = document.getElementsByClassName("name")[0];

            presence.onclick = () => window.open(`https://open.spotify.com/track/${json.data.spotify.track_id}`);
            image.src = json.data.spotify.album_art_url;
            name.innerHTML = `${json.data.spotify.song.length > 12 ? json.data.spotify.song.slice(0, 9) + "..." : json.data.spotify.song}<br>${json.data.spotify.artist.length > 12 ? json.data.spotify.artist.slice(0, 9) + "..." : json.data.spotify.artist}`;
        }
        else if (json.data.activities.find((el) => el.application_id === "810516608442695700")) {
            const activity = json.data.activities.find((el) => el.application_id === "810516608442695700");
            
            let image = document.getElementsByClassName("image")[0];
            let name = document.getElementsByClassName("name")[0];

            image.src = `https://${activity.assets.large_image.split("https/")[1]}`;
            name.innerHTML = `VSCode<br>${(activity.state.split(" ")[2]).split(":")[0]}`;
        }
        else {
            let presence = document.getElementsByClassName("presence")[0];
            presence.style.display = "none";
        }
    };
});

updatePresence();
setInterval(updatePresence, 15_000);