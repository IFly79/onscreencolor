 "use strict";


(function () {
    var namespace = "on_screen_color_app";
    var urlImg = "assets/images";
    var browser = "mobile";
    var lang = "Fr";
    var datUpload = "?";
    var maxFileGallery = 20;
    var maxFileSize = 20;
    var nightMode = false;
    //Arrays
    var images = JSON.parse(window.localStorage.getItem(namespace)) || [];
    var userInfos = [];
    var menuItems = [];
    var acceptableExtension = ["jpg", "png"];
    //Nodes
    var gallery = window.document.querySelector("#gallery");
    var header = window.document.querySelector("#header");
    var footer = window.document.querySelector("#footer");
    var navBar = window.document.querySelector(".navbar-nav.ml-auto");
    var preview = window.document.querySelector("#preview");
    var colorBar = window.document.querySelector("#colorBar");
    var deleteAll = window.document.querySelector("#deleteAll");


    deleteAll.addEventListener("click", function (event) {
       clearAllGallery();
       images=[];
       window.localStorage.setItem(namespace, JSON.stringify(images));
      
       //clearDisplayColor();
       //onClickDelete(event, imageElement);
    });


    var file = window.document.querySelector("#file")
    var imagesColor = window.document.querySelector("#imagesColor")
    /**
     * @param {Objet} image
     * @returns {Boolean}
     */
     function isExtensionValide(image) {
        for (var key in acceptableExtension) {
            if (image.extension === acceptableExtension[key]) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {objet} color
     * @param {String} imgname 
     * @param {Sting} imgurl 
     * @param {Number} imgtaille 
     * @param {String} imgextension 
     * @param {} imgalt 
     */
    function pushImage(imageColor, imgname, imgurl, imgtaille, imgextension, imgalt) {
        images.push({
            color: imageColor,
            url: imgurl,
            taille: imgtaille,
            extension: imgextension,
            name: imgname,
            alt: imgalt,
        });
    }

    /**
     * @returns {Boolean}
     */
    function isGalleryFull() {
        return (images.length >= maxFileGallery);
    }

    /**
     * Display items menu
     */
    function displayMenuItem() {
        for (var key in menuItems) {
            var liBar = window.document.createElement("li");
            liBar.setAttribute("class", "nav-item text-center");
            var itemElement = window.document.createElement("a");
            var itemTextNode = document.createTextNode(menuItems[key].name);
            itemElement.appendChild(itemTextNode);
            itemElement.setAttribute("href", menuItems[key].url);
            itemElement.setAttribute("class", "nav-link");
            liBar.appendChild(itemElement);
            navBar.appendChild(liBar);
        }
    }

    /**
     * Display Title
     */
    function displayTitle() {
        var choixLang = "Fr";
        var afficheLang = "OnScreenColor";
        if ("En" === lang) {
            choixLang = "En";
            afficheLang = "OnScreenColor";
        } else if ("De" === lang) {
            choixLang = "De";
            afficheLang = "Kolorimetrische Analyse";
        }
        var itemLang = window.document.createTextNode(choixLang);
        var createBaliseLangue = window.document.createElement("p");
        //createBaliseLangue.appendChild(itemLang);
        header.appendChild(createBaliseLangue);
        var itemMessage = window.document.createTextNode(afficheLang);
        var createBaliseLangue = window.document.createElement("h1");
        createBaliseLangue.appendChild(itemMessage);
        header.appendChild(createBaliseLangue);
    }

    /**
     * @return Diplay Button
     */
    function displayButton() {
        if (!isGalleryFull()) {
            var myButton = textInElement("button", "Importer", upload);
            myButton.setAttribute("class", "btn btn-secondary btn-lg btn-block");
            var form = textInElement("form", "", upload);
            var inputUrl = textInElement("input", "", form);
            var inputSubmit = textInElement("input", "", form);
            form.setAttribute("action", "");
            form.setAttribute("method", "get");
            form.style.margin = "1em 0";
            inputUrl.setAttribute("type", "url");
            inputUrl.setAttribute("required", "required");
            inputUrl.setAttribute("class", "form-control");
            inputSubmit.setAttribute("type", "submit");
            inputSubmit.setAttribute("value", "envoyer");
            inputUrl.setAttribute("placeholder", "Entrez une url")
            inputSubmit.setAttribute("class", "btn btn-primary btn-lg btn-block");
            inputSubmit.style.margin = "1em 0";
         /*    form.addEventListener("submit", function (event) {
                onSubmitForm(event, this)
            }); */
            
            file.addEventListener("change", onChangeFile);{
            form.addEventListener("submit", onSubmitForm); 
            }
            myButton.addEventListener("click", function () {
                file.click();
            });
            
            return;
        }
        textInElement("b", "Galery is Full", upload);
    }

    /**
     * 
     * @param {Event} event 
     */
    function onSubmitForm(event) {
        event.preventDefault();
        var xhr = new XMLHttpRequest;
        xhr.open("GET",
        "https://api.imagga.com/v2/colors?image_url=" + this.elements[0].value);
        var form = this;
        xhr.onload = function (event) {
            var colorObject = JSON.parse(this.responseText);
            if (200 === this.status) {
                pushImage(
                    colorObject.result.colors,
                    form.elements[0].value,
                    form.elements[0].value,
                    null,
                    null
                );
                window.localStorage.setItem(namespace, JSON.stringify(images));
                displayImage();
                onClickImage("click", gallery.lastChild.lastChild);
                return;
            }
            alert("Format non pris en charge");
        };
        xhr.setRequestHeader(
            "Authorization",
            "Basic YWNjXzEyMTBlYjc3NWNjMjJhZTo4OGQxOWQxNzY0MTc4Nzk5ZTU2YTY0OTE5YzI0MzJlOQ==");
        xhr.send();
    }

    /**
     * @param {Event} event 
     * @param {File} uploadedFile 
     */
    function onChangeFile(event) {
        var uploadedFile = this.files[0];
        var xhr = new XMLHttpRequest;
        xhr.open("POST", "https://api.imagga.com/v2/colors");
        xhr.onload = function (event) {
            var colorObject = JSON.parse(this.responseText);
            if (200 === this.status) {
                var reader = new FileReader;
                reader.onload = function () {
                    pushImage(colorObject.result.colors, null, reader.result, null, null, null);
                    displayImage();
                    window.localStorage.setItem(namespace, JSON.stringify(images));
                    onClickImage("click", gallery.lastChild.lastChild);
                };
                reader.onerror = function (event) {
                    alert("erreur readAsData");
                };
                reader.readAsDataURL(uploadedFile);
                return;
            }
            alert("erreur dataurl");
        }
        xhr.setRequestHeader(
            "Authorization",
            "Basic YWNjXzEyMTBlYjc3NWNjMjJhZTo4OGQxOWQxNzY0MTc4Nzk5ZTU2YTY0OTE5YzI0MzJlOQ==");
        var body = new FormData;
        body.append("image", uploadedFile);
        xhr.send(body);
    }

    /**
     * Diplay Image
     */
    function displayImage() {
        gallery.innerHTML = "";
        for (var key in images) {
            if (null === images[key].extension || isExtensionValide(images[key])) {
                var div1 = textInElement("div", "", gallery);
                var itemLink = textInElement("img", "", div1);
                div1.setAttribute("class", "col-6 col-md-4 col-lg-2");
                itemLink.setAttribute("class", "img-fluid rounded border dark");
                itemLink.setAttribute("src", images[key].url);
                itemLink.setAttribute("alt", images[key].alt);
                // var test = textInElement("div", "tesqsdfdddddt", gallery);
                registerEvent(itemLink);
            }
        }
    }
 
 
    function clearAllGallery () {
    gallery.innerHTML = "";
 }



    /**
     * 
     * @param {HTMLElement} imageElement 
     */
    function registerEvent(imageElement) {
        imageElement.addEventListener("click", function (event) {
            onClickImage(event, this);
        });
    }

    /**
     * 
     * @param {Event} event 
     * @param {HTMLement} imageElement 
     */
    function onClickImage(event, imageElement) {
        preview.innerHTML = "";
        /*  var preview = document.getElementById("preview"); */
        var btnDelete = window.document.createElement("button");
        var text = window.document.createTextNode("delete");

        btnDelete.appendChild(text);
        preview.appendChild(btnDelete);
        clearDisplayColor();
        btnDelete.setAttribute("class", "btn btn-danger");
        preview.style.backgroundImage = "url(" + imageElement.getAttribute("src") + ")";
        var imageFound = images.find(function (elem) {
            return elem.url === imageElement.getAttribute("src");
        });
        displayColor(imageFound.color.background_colors);
        displayColor(imageFound.color.foreground_colors);
        displayColor(imageFound.color.image_colors);
        btnDelete.addEventListener("click", function (event) {
            onClickDelete(event, imageElement);
            clearDisplayColor();
        });
      
    }



    function displayColor(colorElement) {
        for (var key in colorElement) {
            var div = window.document.createElement("div");
            var text = window.document.createTextNode(colorElement[key].html_code);
            div.setAttribute("class", "col-1 btn");
            div.style.background = colorElement[key].html_code;
            div.appendChild(text);
            colorBar.appendChild(div);

            // console.log(colorElement[key].html_code);
        }
    }




    /**
     * efface les couleurs
     */
    function clearDisplayColor() {
        colorBar.innerHTML = "" ;
    }

    function onClickDelete(event, imageElement) {
        var imageFound = images.find(function (elem) {
            return elem.url === imageElement.getAttribute("src");
        })
        var imageFoundKey = images.indexOf(imageFound);
        images.splice(imageFoundKey, 1);
        window.localStorage.setItem(namespace, JSON.stringify(images));
        displayImage();
        preview.style.backgroundImage = "url(" + ("assets/images/noimage.png") + ")";
        preview.innerHTML = "";

    }

    function displayExtensions() {
        textInElement("h5", "", footer)
        var ulExtention = textInElement("ul", "", "")
        for (var key in acceptableExtension) {
            var liExtention = textInElement("li", "", "");
            liExtention.setAttribute("class", "btn btn-primary");
            ulExtention.appendChild(liExtention);
            var extentionText = acceptableExtension[key]
            var extentionname = window.document.createTextNode(extentionText)
            liExtention.appendChild(extentionname)
        };
        footer.appendChild(ulExtention);
    }

    /**
     * 
     * @param {Sting} itname 
     * @param {String} iturl 
     */
    function pushItem(itname, iturl) {
        menuItems.push({
            url: iturl,
            name: itname,
        });
    }

    /**
     * @param {Sting} tagName 
     * @param {Sting} text 
     * @param {HTMLElement} parent 
     * @returns {HTLMElement}
     */
    function textInElement(tagName, text, parent) {
        if ("string" !== typeof tagName) {
            // throw new Error("textInElement requires a tag name");
        }
        var element = window.document.createElement(tagName);
        if ("undefined" !== typeof text) {
            element.appendChild(window.document.createTextNode(text));
        }
        if (parent instanceof HTMLElement) {
            parent.appendChild(element)
        }
        return element;
    }




    textInElement();
    pushItem("Index", "url");
    pushItem("Gallerie", "url");
    pushItem("Contact", "mcflycomeback@gmail.com");
    displayMenuItem();
    displayTitle();
    displayButton();
    displayImage();
    displayExtensions();
    textInElement();
})();