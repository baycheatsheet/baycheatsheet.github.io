
function renderRichText(richText, parent) {
    var data = richText.content;

    for (var node of data) {
        renderNode(node, parent);
    }
}

function renderNode(node, parent) {

    if (node.nodeType == "paragraph") {
        renderParagraph(node, parent);
    }
    else if (node.nodeType == "unordered-list") {
        var unorderedList = document.createElement("ul");
        parent.appendChild(unorderedList);

        for (var nodeData of node.content) {
            var listNode = nodeData.content[0];
            if (listNode.nodeType == "paragraph") {
                renderParagraph(listNode, unorderedList, textType = "li");
            }
        }
    }
}

function renderParagraph(node, parent, textType = "p") {
    var openParagraph = undefined;

    for (var nodeData of node.content) {

        if (nodeData.nodeType == "text") {
            if (openParagraph == undefined) {
                var elem = document.createElement(textType);
                elem.innerHTML = nodeData.value;
                openParagraph = elem;
                parent.appendChild(elem);
            }
            else {
                openParagraph.innerHTML = openParagraph.innerHTML + nodeData.value;
            }
        }
        else if (nodeData.nodeType == "entry-hyperlink") {
            var linkedEntry = nodeData.data.target;
            var elem = document.createElement("a");

            elem.innerHTML = nodeData.content[0].value;
            elem.value = linkedEntry.fields.title;
            elem.addEventListener("click", linkToBasicCommand);

            if (openParagraph == undefined) {
                var paragraph = document.createElement(textType);
                parent.appendChild(paragraph);
                openParagraph = paragraph;

                paragraph.appendChild(elem);
            }
            else {
                openParagraph.appendChild(elem);
            }
        }
    }
}