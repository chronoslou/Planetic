
function newPost(event) {
    event.preventDefault();
    console.log("HELOOOOO")
  
 const postContent = document.querySelector("#password-signup").value.trim();
  
  if (postContent) {
       const response = await fetch("/api/posts", {
       method: "POST",
        body: JSON.stringify({ postContent }),
        headers: { "Content-Type": "application/json" },
      });
  
     if (response.ok) {
        location.reload();
       } else {
        alert(response.statusText);
      }
   }

  };
  
  
   document
     .querySelector("#newPostBtn")
     .addEventListener("click", newPost);
  