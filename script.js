sessionStorage.removeItem("commandTitle");

var client = contentful.createClient({
    space: 'k2un8xhj1nyv',
    environment: 'master', // defaults to 'master' if not set
    accessToken: '8O-QJRrwUtMJBP_VQy9UdgEoy98G1_cGPUcn_q1dvfw'
})

const PAGES = {};
const pageContentType = "troublePage";

var homeButtonWrapper = document.getElementById("home-button-wrapper");

client.getEntries().then(function (entries) {
    try {
        for (let index = entries.items.length - 1; index >= 0; index--) {
            const entry = entries.items[index];

            loadEntry(entry);
        }
    }
    catch (err) {
        alert(err.message);
    }
});

function loadEntry(entry) {
    var contentType = entry.sys.contentType.sys.id;

    if (contentType == pageContentType) {
        var pageName = entry.fields.title.toLowerCase();
        PAGES[pageName] = entry;

        if (pageName != "basic commands") {
            buildPageButton(pageName);
        }
    }
}

function LinkButtonClick(elem) {
    var pageName = elem.innerHTML.toLowerCase();
    sessionStorage.setItem("pageName", pageName);
    sessionStorage.setItem("pages", JSON.stringify(PAGES));

    var cmsPage = window.open("troubleTemplate.html", "_self");
}

function buildPageButton(pageName) {
    var button = document.createElement("button");
    button.classList.add("red", "link");
    button.type = "button";
    button.setAttribute("onclick", "LinkButtonClick(this)")
    button.innerHTML = pageName;

    homeButtonWrapper.appendChild(button);
}