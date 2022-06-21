let session = new Session();
session_id = session.getSession();

if (session_id !== "") {
  async function populateUserData() {
    let user = new User();
    user = await user.get(session_id);

    document.querySelector("#username").innerText = user["username"];
    document.querySelector("#email").innerText = user["email"];

    document.querySelector("#korisnicko_Ime").value = user["username"];
    document.querySelector("#edit_email").value = user["email"];
  }

  populateUserData();
} else {
  window.location.href = "/";
}

document.querySelector("#logout").addEventListener("click", (e) => {
  e.preventDefault();

  session.destroySession();
  window.location.href = "/";
});

const editAccount = document
  .querySelector("#editAccount")
  .addEventListener("click", () => {
    document.querySelector(".custom-modal").style.display = "block";
  });

const close_modal = document
  .querySelector("#closeModal")
  .addEventListener("click", () => {
    document.querySelector(".custom-modal").style.display = "none";
  });

const editForm = document
  .querySelector("#editForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector("#korisnicko_Ime").value;
    user.email = document.querySelector("#edit_email").value;
    user.edit();
  });

document.querySelector("#deleteProfile").addEventListener("click", (e) => {
  e.preventDefault();

  let text = "Da li ste sigurni da zelite da obrisete profil?";

  if (confirm(text) === true) {
    let user = new User(session_id);
    user.delete();
  }
});

document.querySelector("#postForm").addEventListener("submit", (e) => {
  e.preventDefault();

  async function createPost() {
    let content = document.querySelector("#postContent").value;
    document.querySelector("#postContent").value = "";
    let post = new Post();
    post.post_content = content;
    post = await post.create();

    let current_user = new User();
    current_user = await current_user.get(session_id);

    document.querySelector("#allPostsWrapper").innerHTML = `
      <div class="single-post" data-post_id="${post.id}">
        <div class="post-content">${post.content}</div>

        <div class="post-comments">
          <form>
          <input type="text" placeholder="Napisi komentar..." />
          <button onclick="commentPostSubmit(event)">Comment</button>
          </form>
        </div>
      </div>
    `;
  }

  createPost();
});

const commentPostSubmit = (event) => {};
