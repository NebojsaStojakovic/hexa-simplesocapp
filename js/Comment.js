class Comment {
  post_id = "";
  content = "";
  user_id = "";
  api_url = "https://62b18f29196a9e9870380ad8.mockapi.io";

  create() {
    let data = {
      user_id: this.user_id,
      content: this.content,
      post_id: this.post_id,
    };

    data = JSON.stringify(data);

    fetch(this.api_url + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Postavljen komentar");
      });
  }

  async get(post_id) {
    let api_url = this.api_url + "/comments";

    const response = await fetch(api_url);
    const data = await response.json();
    let post_comments = [];

    let i = 0;
    data.forEach((item) => {
      if (item.post_id === post_id) {
        post_comments[i] = item;
        i++;
      }
    });

    return post_comments;
  }
}
