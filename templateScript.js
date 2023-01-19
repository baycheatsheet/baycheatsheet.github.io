
var pageName = sessionStorage.getItem("pageName");
var pageEntry = JSON.parse(sessionStorage.getItem("pageBubbles"));

var pageHeader = document.getElementById("page-name");
pageHeader.innerHTML = pageName;

var toggleButtons = [];
var toggleOnValues = new Set();

try {
    generateBubbles();
}
catch (err) {
    alert(err.name + " || " + err.message);
}

function toggleButtonClick(elem) {
    var wasDeleted = toggleOnValues.delete(elem.innerHTML);

    if (!wasDeleted) {
        toggleOnValues.add(elem.innerHTML);
        elem.classList.add("on");
    }
    else {
        elem.classList.remove("on");
    }

    refreshBubbles();
}

function refreshBubbles() {
    for (var button of toggleButtons) {
        if (toggleOnValues.has(button.innerHTML)) {
            //alert(button.innerHTML + " ON");
        }
        else {
            //alert(button.innerHTML + " OFF");
        }
    }
}

function generateBubbles() {
    alert("generating bubbles");

    var bubbleContainer = document.getElementById("bubble-container");
    var buttonContainer = document.getElementById("link-buttons");

    for (var bubble of pageEntry.fields.bubbleChildren) {
        var bubbleName = bubble.fields.title;

        if (!toggleButtons.includes(bubbleName)) {
            makeToggleButton(bubbleName, buttonContainer);
        }

        makeBubble(bubble.fields, bubbleContainer);
    }
}

function makeToggleButton(buttonName, parent) {
    var newButton = document.createElement("button");
    newButton.type = "button";
    newButton.classList.add("toggle-button");
    newButton.setAttribute("onclick", "toggleButtonClick(this)");
    newButton.innerHTML = buttonName;

    parent.appendChild(newButton);
    toggleButtons.push(buttonName);
}

function makeBubble(fields, parent) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("question-bubble", "light-bg");
    parent.appendChild(wrapper);

    var title = document.createElement("h3");
    title.innerHTML = fields.title;
    wrapper.appendChild(title);

    var issue = document.createElement("h5");
    issue.classList.add("red");
    issue.innerHTML = fields.issue;
    wrapper.appendChild(issue);

    var answer = document.createElement("p");
    answer.innerHTML = fields.answer.content[0].data;
    wrapper.appendChild(answer);
}

