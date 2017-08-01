var fback = document.createElement("script");
fback.src = "JS/fallback_list.min.js";
fback.onload = function () {
    window.addEventListener("error", function (e, url) {
        var eleArray = ["IMG", "SCRIPT", "LINK"];
        var resourceMap = {
            "IMG": "Picture file",
            "SCRIPT": "JavaScript file",
            "LINK": "CSS file"
        };

        var ele = e.target;

        if(eleArray.indexOf(ele.tagName) != -1){
            var url = ele.tagName == "LINK" ? ele.href: ele.src;
            console.log("src：" + url + " File" + resourceMap[ele.tagName] + "failed loading. Fallback: " + fbacks[url]);
            if (typeof fbacks[url] != 'undefined'){
                switch(ele.tagName){
                    case "SCRIPT":
                        document.write("<script src=" + fbacks[url] + "><\/script>");
                        break; 
                    case "LINK":
                        // Grab an element
                        var el = document.getElementsByTagName('head')[0];
                        // Make a new link
                        elChild = document.createElement('link');
                        // Set the attributes
                        elChild.setAttribute("rel", "stylesheet");
                        elChild.setAttribute("href", fbacks[url]);
                        // Jug it into the parent element
                        el.appendChild(elChild);
                        break;
                };
            }
            return true;// dont show in console
        }
    }, true);
};

document.head.appendChild(fback); //or something of the likes
