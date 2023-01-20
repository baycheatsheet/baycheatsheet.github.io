
function renderRichText(richText) {
    var data = richText.content[0].content;

    var paragraph = "";

    for (var node of data) {
        var text = '';

        if (node.nodeType == "text") {
            text = node.value;
        }
        else if (node.nodeType == "entry-hyperlink") {
            var buttonTitle = node.data.target.fields.title;

            text = "<a onclick=linkToBasicCommand('" + buttonTitle +"')>" + node.content[0].value + "</a>";
        }

        paragraph = paragraph + text;
    }

    return paragraph;
}