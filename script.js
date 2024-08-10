const url = "https://api.github.com/users/";
const search = document.getElementsByClassName("search")[0];
const profileContainer = document.getElementsByClassName("profileContainer")[0];
const noResult = document.getElementsByClassName("noResult")[0];
const input = document.getElementsByClassName("input")[0];
const pic = document.getElementsByClassName("pic")[0];
const namee = document.getElementsByClassName("name")[0];
const user = document.getElementsByClassName("user")[0];
const date = document.getElementsByClassName("date")[0];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = document.getElementsByClassName("bio")[0];
const repos = document.getElementById("repos");
const following = document.getElementById("following");
const followers = document.getElementById("followers");
const locationInfo = document.getElementById("location");
const company = document.getElementById("company");
const page = document.getElementById("page");
const twitter = document.getElementById("twitter");

const btn = document.getElementsByClassName("btn")[0];

btn.addEventListener("click", () => {
    if (input.value !== "") {
        getUserData(url + input.value);
    }
});

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value !== "") {
        getUserData(url + input.value);
    }
}, false);

async function getUserData(gUrl) {
    try {
        let response = await fetch(gUrl);
        if (!response.ok) {
            throw new Error("Not properly executed");
        }
        let data = await response.json();
        updateProfile(data);
    } catch (e) {
        console.log(e);
    }
}

input.addEventListener("input", () => {
    noResult.style.display = "none";
});

function updateProfile(data) {
    if (data.message !== "Not Found") {
        noResult.style.display = "none";
        
        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            } else {
                return true;
            }
        }

        pic.src = data.avatar_url;
        namee.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = data.html_url;
        
        let dateSegments = data.created_at.split("T")[0].split("-");
        date.innerText = `Joined ${dateSegments[2]} ${months[dateSegments[1] - 1]} ${dateSegments[0]}`;
        
        bio.innerText = data.bio == null ? "No Bio" : data.bio;
        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        locationInfo.innerText = checkNull(data.location, locationInfo) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";

        search.classList.toggle("active");
        profileContainer.classList.toggle("active");
    } else {
        noResult.style.display = "block";
    }
}

getUserData(url + "pranayaaaa");
