document.querySelectorAll("[data-load]").forEach((element) => {
  const href = element.getAttribute("data-load");
  const id = element.getAttribute("data-id");
  fetch(href)
    .then((response) => {
      return response.text();
    })
    .then(
      (data) => {
        element.innerHTML = data;
        if (id) {
          element.setAttribute("id", id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
});
