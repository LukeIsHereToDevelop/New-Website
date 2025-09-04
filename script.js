/*
    © 2021-2025, LukeDev
*/

// Utilities
function extractProjectName(text) {
    const m = text.match(/^In\s+(.+)\s*-\s*/);
    return m ? m[1].trim() : null;
}

function extractProjectFile(text) {
    const m = text.match(/([^\/\\:\s]+)(?=:\d+:\d+)/);
    return m ? m[1] : null;
}

function extractProjectImage(text) {
    return `https://${text.split("https/")[1]}`;
}

/*function shortenText(text) {
    return text.length > 12 ? text.slice(0, 9) + "..." : text;
}*/

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
        const status = document.getElementsByClassName("status")[0];
        status.classList.replace(status.classList.item(1), json.discord_status);

        const presence = document.getElementsByClassName("presence")[0];

        if (json.spotify) {
            presence.classList.remove("hidden");

            let image = document.getElementsByClassName("image")[0];
            let action = document.getElementsByClassName("action")[0];
            let details = document.getElementsByClassName("details")[0];
            let state = document.getElementsByClassName("state")[0];

            presence.onclick = () => window.open(`https://open.spotify.com/track/${json.spotify.track_id}`);
            image.src = json.spotify.album_art_url;
            action.textContent = "Listening to...";
            details.textContent = json.spotify.song;
            state.textContent = json.spotify.artist;
        }
        else if (json.activities.find((el) => el.application_id === "782685898163617802")) {
            presence.classList.remove("hidden");

            const activity = json.activities.find((el) => el.application_id === "782685898163617802");

            let image = document.getElementsByClassName("image")[0];
            let action = document.getElementsByClassName("action")[0];
            let details = document.getElementsByClassName("details")[0];
            let state = document.getElementsByClassName("state")[0];

            presence.onclick = () => window.open(`https://github.com/LukeIsHereToDevelop/${extractProjectName(activity.details)}`);
            action.textContent = "Coding...";
            details.textContent = extractProjectName(activity.details);
            state.textContent = extractProjectFile(activity.state);
            image.src = extractProjectImage(activity.assets.large_image);
        }
        else {
            presence.classList.add("hidden");
        }
    }
});