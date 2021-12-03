let submit = document.getElementById("submit");
let user = document.getElementById("user");
let userName, userFollowers, userFollowing, userRepos;
let setName = document.getElementById("userName");
let setId = document.getElementById("userId");
let setImage = document.getElementById("image");
let setFollowers = document.getElementById("followers");
let setFollowing = document.getElementById("following");
let setRepos = document.getElementById("repos");
let list = document.getElementById("repos_list");
let userData = document.getElementById("userData");
let request1 = new XMLHttpRequest();
let request2 = new XMLHttpRequest();

request1.addEventListener("load", () => {
  data = JSON.parse(event.target.responseText);
  userName = data.name;
  userFollowers = data.followers;
  userFollowing = data.following;
  userRepos = data.public_repos;
  userId = `(@${data.login})`;
  userImg = data.avatar_url;
  setName.innerHTML = userName;
  setId.innerHTML = userId;
  setImage.src = userImg;
  setFollowers.innerHTML = `Followers:${userFollowers}`;
  setFollowing.innerHTML = `Following:${userFollowing}`;
  setRepos.innerHTML = `Repos:${userRepos}`;
});

request2.addEventListener("load", () => {
  let repos = JSON.parse(event.target.responseText);
  repos.forEach((repo) => {
    let repoUrl = repo.html_url;
    let a = document.createElement("a");
    a.href = repoUrl;
    a.innerHTML = repo.name;
    a.className = "btn btn-danger";
    list.appendChild(a);
  });
  userData.style.display = "block";
});

submit.addEventListener("click", () => {
  list.innerHTML = "";
  userData.style.display = "none";
  request1.open("get", ` https://api.github.com/users/${user.value}`);
  request1.setRequestHeader("Content-type", "application/json");
  request1.send();

  request2.open("get", ` https://api.github.com/users/${user.value}/repos`);
  request2.setRequestHeader("Content-type", "application/json");
  request2.send();
});
