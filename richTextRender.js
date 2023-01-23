
function renderRichText(richText, parent) {
    var data = richText.content;

    for (var node of data) {
        renderNode(node, parent);
    }
}

function renderNode(node, parent) {

    if (node.nodeType == "paragraph") {
        var openParagraph = undefined;

        for (var nodeData of node.content) {

            if (nodeData.nodeType == "text") {
                var elem = document.createElement("p");
                elem.innerHTML = nodeData.value;
                openParagraph = elem;
                parent.appendChild(elem);
            }
            else if (nodeData.nodeType == "entry-hyperlink") {
                var linkedEntry = nodeData.data.target;
                var elem = document.createElement("a");
                elem.innerHTML = nodeData.content[0].value;
                elem.value = linkedEntry.fields.title;
                elem.addEventListener("click", linkToBasicCommand);
                openParagraph.appendChild(elem);
            }
        }
    }
}