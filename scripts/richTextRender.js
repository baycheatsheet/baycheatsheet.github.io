
function renderRichText(richText, parent) {
    if (richText == undefined) {
        return ["FAILURE"];
    }

    var data = richText.content;

    for (var node of data) {
        renderNode(node, parent);
    }

    return ["SUCCESS"]
}

//render the node to html elements
function renderNode(node, parent) {
    //render node by its type
    if (node.nodeType == "paragraph") {
        //plain text
        renderParagraph(node, parent);
    }
    else if (node.nodeType == "unordered-list") {
        //unordered lists
        renderList(node, parent, listType = "ul");
    }
    else if (node.nodeType == "ordered-list") {
        renderList(node, parent, listType = "ol");
    }
}

//render paragraph elements
function renderParagraph(node, parent, textType = "p") {
    var openParagraph = undefined;

    for (var nodeData of node.content) {
        //render plain text
        if (nodeData.nodeType == "text") {
            var innerHTML = renderMarks(nodeData);

            if (openParagraph == undefined) {
                openParagraph = generateEmptyParagraph(textType, parent);
                openParagraph.innerHTML = innerHTML;
            }
            else {
                openParagraph.insertAdjacentHTML("beforeend", innerHTML);
            }
        }
        else if (nodeData.nodeType == "entry-hyperlink") {
            if (openParagraph == undefined) {
                openParagraph = generateEmptyParagraph(textType, parent);
            }

            var linkedEntry = nodeData.data.target;
            var elem = document.createElement("a");

            elem.innerHTML = renderMarks(nodeData.content[0]);
            elem.value = linkedEntry.fields.title;
            elem.addEventListener("click", linkToBasicCommand);

            openParagraph.appendChild(elem);
        }
        else if (nodeData.nodeType == "asset-hyperlink") {
            if (openParagraph == undefined) {
                openParagraph = generateEmptyParagraph(textType, parent);
            }

            var linkedAsset = nodeData.data.target;
            var elem = document.createElement("a");

            elem.innerHTML = renderMarks(nodeData.content[0]);
            elem.value = "https:" + linkedAsset.fields.file.url;
            elem.addEventListener("click", linkToAsset);

            openParagraph.appendChild(elem);
        }
    }
}

function generateEmptyParagraph(textType, parent) {
    var paragraph = document.createElement(textType);
    parent.appendChild(paragraph);

    return paragraph;
}

//render unordered and ordered lists, default unordered list
function renderList(node, parent, listType = "ul") {
    var listElem = document.createElement(listType);
    parent.appendChild(listElem);

    for (var nodeData of node.content) {
        var listNode = nodeData.content[0];
        if (listNode.nodeType == "paragraph") {
            renderParagraph(listNode, listElem, textType = "li");
        }
    }
}

//render underlines, bolds, italics, etc.
function renderMarks(nodeData) {
    var innerHTML = nodeData.value;

    if (nodeData.marks.length == 0) {
        return innerHTML;
    }

    var mark = document.createElement("mark");

    for (var mark of nodeData.marks) {
        if (mark.type == "underline") {
            innerHTML = "<u>" + innerHTML + "</u>";
        }
        else if (mark.type == "italic") {
            innerHTML = "<i>" + innerHTML + "</i>";
        }
        else if (mark.type == "bold") {
            innerHTML = "<b>" + innerHTML + "</b>";
        }
    }
    
    return innerHTML;
}