let ls;
fetch("/committee/resources/data.json").then((response) => {
  response.json().then((data) => {
    ls = data;
    content = "<ul>";
    for (let i = 0; i < Object.keys(ls).length; i++) {
      content += `<li class="text-center"><a href="#${Object.keys(ls)[i]}">${
        Object.keys(ls)[i]
      }</a></li>`;
    }
    document.querySelector("#committee_category").innerHTML = content + "</ul>";
    if (window.location.href.split("#").length > 1) {
      load_committee(window.location.href.split("#")[1].replace(/%20/g, " "));
    }
  });
});

const load_committee = (category) => {
  let content = `<span class="committee_view" style="display: flex; font-style: inherit;
  font-weight: inherit; box-sizing: inherit; align-items:baseline; justify-content: flex-start;"><button class="button is-primary is-light" id="goback" style="background-color: #ebfffc;
  color: #00947e; border-color: transparent; margin: 0 10px;
  height: 100%; border-width: 1px; cursor: pointer; justify-content: center;
  padding-bottom: calc(.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(.5em - 1px);
  text-align: center;
  white-space: nowrap;">Go Back</button> <h3 class='is-size-3'>${category}</h3></span><br><div id="members" style="display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  min-height: 50vh !important;">`;
  if (ls[category] == null) {
    content = `
        <h3 class="is-size-3 text-center">INVALID REQUEST RECIEVED. MEMBER TYPE ISN'T DEFINED</h3>
    `;
  } else {
    document.querySelector("#committee_category").classList.add("hide");
    document.querySelector("#committee_list").classList.remove("hide");
  }
  for (let i = 0; i < ls[category].length; i++) {
    content += `
    <div class="card" style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    padding: 2px 2px; color: #4a4a4a;
    max-width: 100%;
    position: relative; background-color: #fff; display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal; flex-direction: column;
    min-width: 0;
    word-wrap: break-word; background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);">
        <div class="card-content" style="background-color: transparent;
        padding: 1.5rem;">
            <div class="media" style="align-items: flex-start;
            display: flex;
            text-align: inherit;">
                <div class="media-left" style="margin-right: 1rem; flex-basis: auto;
                flex-grow: 0;
                flex-shrink: 0;">
                    <figure class="image is-48x48" style="height: 48px;
                    width: 48px;">
                        ${
                          ls[category][i].img != null &&
                          ls[category][i].img != ""
                            ? `<img style="display: block;
                            height: auto;
                            width: 100%;" src="${
                              ls[category][i].img.search("http") != 0
                                ? "/committee/resources/images/"
                                : ""
                            }${ls[category][i].img}" alt="${
                                ls[category][i].name
                              }" class="img-fluid">`
                            : ""
                        }
                    </figure>
                </div>
                <div class="media-content" style="flex-basis: auto;
                flex-grow: 1;
                flex-shrink: 1;
                text-align: inherit;">
                    <p class="title is-4" style="font-size: 2.2rem;">${
                      ls[category][i].name
                    }</p>
                    <p class="subtitle is-6" style="font-size: 1.5rem; margin-top: -1.25rem;">${
                      ls[category][i].designation
                    }</p>
                </div>
            </div>
        </div>
    </div>`;
  }
  document.querySelector("#committee_list").innerHTML = content + "</div>";
  document.getElementById("committee_list").scrollIntoView();
  document.querySelector("#goback").removeEventListener("click", () => {});
  document.querySelector("#goback").addEventListener("click", () => {
    document.querySelector("#committee_category").classList.remove("hide");
    document.querySelector("#committee_list").classList.add("hide");
    window.location.href = "#";
  });
};

window.addEventListener("popstate", function () {
  console.log(window.location.href.split("#")[1]);
  load_committee(window.location.href.split("#")[1].replace(/%20/g, " "));
});
