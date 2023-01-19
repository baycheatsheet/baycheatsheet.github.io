var client = contentful.createClient({
    space: 'k2un8xhj1nyv',
    environment: 'master', // defaults to 'master' if not set
    accessToken: '8O-QJRrwUtMJBP_VQy9UdgEoy98G1_cGPUcn_q1dvfw'
})

const PAGES = {};
const pageContentType = "troublePage";

client.getEntries().then(function (entries) {
    entries.items.forEach(loadEntry);
});

function loadEntry(entry) {
    var contentType = entry.sys.contentType.sys.id;

    if (contentType == pageContentType) {
        PAGES[entry.fields.title.toLowerCase()] = entry;
    }
}

function LinkButtonClick(elem) {
    var pageName = elem.innerHTML.toLowerCase();
    var pageBubbles = PAGES[pageName];
    sessionStorage.setItem("pageName", pageName);
    sessionStorage.setItem("pageBubbles", JSON.stringify(pageBubbles));

    var cmsPage = window.open("troubleTemplate.html", "_self");
}