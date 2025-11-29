const API_URL = "http://localhost:5000/api";

function getToken() {
    return localStorage.getItem("token");
}

/* LOGIN */
async function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    let data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        alert("Login failed!");
    }
}

/* LOGOUT */
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

/* FETCH STORIES */
async function fetchStories() {
    let res = await fetch(`${API_URL}/stories`);
    let stories = await res.json();

    let html = "";
    stories.forEach(s => {
        html += `
        <div class="story-card">
            <img src="http://localhost:5000/uploads/${s.image}">
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <button class="delete-btn" onclick="deleteStory('${s._id}')">Delete</button>
        </div>`;
    });

    document.getElementById("stories").innerHTML = html;
}

/* ADD STORY */
async function addStory() {
    let formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("image", image.files[0]);

    let res = await fetch(`${API_URL}/stories/add`, {
        method: "POST",
        headers: { Authorization: "Bearer " + getToken() },
        body: formData
    });

    let data = await res.json();
    alert(data.message);

    window.location.href = "index.html";
}

/* DELETE STORY */
async function deleteStory(id) {
    if (!confirm("Delete this story?")) return;

    let res = await fetch(`${API_URL}/stories/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + getToken() }
    });

    let data = await res.json();
    alert(data.message);
    fetchStories();
}
