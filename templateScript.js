
var commandTitle = sessionStorage.getItem("commandTitle");
sessionStorage.removeItem("commandTitle");

if (commandTitle == undefined) {
    var pageName = sessionStorage.getItem("pageName");
}
else {
    var pageName = "basic commands";
}

var pageEntry = JSON.parse(sessionStorage.getItem("pages"))[pageName];

var pageHeader = document.getElementById("page-name");
pageHeader.innerHTML = pageName;

var bubbles = {};
var toggleOnValues = new Set();
var toggleOffValues = new Set();

try {
    generateBubbles();
}
catch (err) {
    alert(err.name + " || " + err.message);
}

function toggleButtonClick(elem) {
    var buttonName = elem.innerHTML;

    if (toggleOffValues.has(buttonName)) {
        toggleOffValues.delete(buttonName);
        toggleOnValues.add(buttonName);
        elem.classList.add("on");
    }
    else {
        toggleOffValues.add(buttonName);
        toggleOnValues.delete(buttonName);
        elem.classList.remove("on");
    }

    try {
        refreshBubbles();
    }
    catch (err) {
        alert(err.message);
    }
}

function refreshBubbles() {
    if (toggleOnValues.size == 0) {
        switchBubbles(toggleOffValues, true);
    }
    else {
        switchBubbles(toggleOnValues, true);
        switchBubbles(toggleOffValues, false);
    }
}

// True displays the bubbles, False hides them
function switchBubbles(bubbleList, turnOn) {
    for (var link of bubbleList) {

        var selectedBubbles = bubbles[link];

        for (var bubble of selectedBubbles) {
            if (turnOn) {
                bubble.classList.remove("hidden");
            }
            else {
                if (!bubble.classList.contains("hidden")) {
                    bubble.classList.add("hidden");
                }
            }
        }
    }
}

function generateBubbles() {
    var bubbleContainer = document.getElementById("bubble-container");
    var buttonContainer = document.getElementById("link-buttons");

    var usedNames = [];

    for (var bubble of pageEntry.fields.bubbleChildren) {
        var bubbleName = bubble.fields.title;

        if (!usedNames.includes(bubbleName)) {
            var newButton = makeToggleButton(bubbleName, buttonContainer);
            usedNames.push(newButton.innerHTML);

            if (bubbleName == commandTitle) {
                newButton.classList.add("on");
                toggleOnValues.add(newButton.innerHTML);
            }
            else {
                toggleOffValues.add(newButton.innerHTML);
            }
        }

        var newBubble = makeBubble(bubble.fields, bubbleContainer);
        var bubbleGroup = bubbles[bubbleName];

        if (bubbleGroup == undefined) {
            bubbles[bubbleName] = [newBubble];
        }
        else {
            bubbles[bubbleName].push(newBubble);
        }
    }

    refreshBubbles();
}

function makeToggleButton(buttonName, parent) {
    var newButton = document.createElement("button");
    newButton.type = "button";
    newButton.classList.add("toggle-button");
    newButton.setAttribute("onclick", "toggleButtonClick(this)");
    newButton.innerHTML = buttonName;

    parent.appendChild(newButton);

    return newButton;
}

function makeBubble(fields, parent) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("question-bubble", "light-bg");
    parent.appendChild(wrapper);

    var title = document.createElement("h3");
    title.innerHTML = fields.title;
    wrapper.appendChild(title);

    var issue = document.createElement("h5");
    issue.innerHTML = fields.issue;
    wrapper.appendChild(issue);

    var answer = document.createElement("p");
    answer.innerHTML = renderRichText(fields.answer);
    wrapper.appendChild(answer);

    return wrapper;
}

function linkToBasicCommand(buttonName) {
    sessionStorage.setItem("commandTitle", buttonName);

    var cmsPage = window.open("basicCommands.html", "_self");
}

