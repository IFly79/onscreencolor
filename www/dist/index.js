/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function () {\n  var namespace = \"on_screen_color_app\";\n  var urlImg = \"assets/images\";\n  var browser = \"mobile\";\n  var lang = \"Fr\";\n  var datUpload = \"?\";\n  var maxFileGallery = 20;\n  var maxFileSize = 20;\n  var nightMode = false; //Arrays\n\n  var images = JSON.parse(window.localStorage.getItem(namespace)) || [];\n  var userInfos = [];\n  var menuItems = [];\n  var acceptableExtension = [\"jpg\", \"png\"]; //Nodes\n\n  var gallery = window.document.querySelector(\"#gallery\");\n  var header = window.document.querySelector(\"#header\");\n  var footer = window.document.querySelector(\"#footer\");\n  var navBar = window.document.querySelector(\".navbar-nav.ml-auto\");\n  var preview = window.document.querySelector(\"#preview\");\n  var colorBar = window.document.querySelector(\"#colorBar\");\n  var deleteAll = window.document.querySelector(\"#deleteAll\");\n  deleteAll.addEventListener(\"click\", function (event) {\n    clearAllGallery();\n    images = [];\n    window.localStorage.setItem(namespace, JSON.stringify(images)); //clearDisplayColor();\n    //onClickDelete(event, imageElement);\n  });\n  var file = window.document.querySelector(\"#file\");\n  var imagesColor = window.document.querySelector(\"#imagesColor\");\n  /**\r\n   * @param {Objet} image\r\n   * @returns {Boolean}\r\n   */\n\n  function isExtensionValide(image) {\n    for (var key in acceptableExtension) {\n      if (image.extension === acceptableExtension[key]) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n  /**\r\n   * @param {objet} color\r\n   * @param {String} imgname \r\n   * @param {Sting} imgurl \r\n   * @param {Number} imgtaille \r\n   * @param {String} imgextension \r\n   * @param {} imgalt \r\n   */\n\n\n  function pushImage(imageColor, imgname, imgurl, imgtaille, imgextension, imgalt) {\n    images.push({\n      color: imageColor,\n      url: imgurl,\n      taille: imgtaille,\n      extension: imgextension,\n      name: imgname,\n      alt: imgalt\n    });\n  }\n  /**\r\n   * @returns {Boolean}\r\n   */\n\n\n  function isGalleryFull() {\n    return images.length >= maxFileGallery;\n  }\n  /**\r\n   * Display items menu\r\n   */\n\n\n  function displayMenuItem() {\n    for (var key in menuItems) {\n      var liBar = window.document.createElement(\"li\");\n      liBar.setAttribute(\"class\", \"nav-item text-center\");\n      var itemElement = window.document.createElement(\"a\");\n      var itemTextNode = document.createTextNode(menuItems[key].name);\n      itemElement.appendChild(itemTextNode);\n      itemElement.setAttribute(\"href\", menuItems[key].url);\n      itemElement.setAttribute(\"class\", \"nav-link\");\n      liBar.appendChild(itemElement);\n      navBar.appendChild(liBar);\n    }\n  }\n  /**\r\n   * Display Title\r\n   */\n\n\n  function displayTitle() {\n    var choixLang = \"Fr\";\n    var afficheLang = \"OnScreenColor\";\n\n    if (\"En\" === lang) {\n      choixLang = \"En\";\n      afficheLang = \"OnScreenColor\";\n    } else if (\"De\" === lang) {\n      choixLang = \"De\";\n      afficheLang = \"Kolorimetrische Analyse\";\n    }\n\n    var itemLang = window.document.createTextNode(choixLang);\n    var createBaliseLangue = window.document.createElement(\"p\"); //createBaliseLangue.appendChild(itemLang);\n\n    header.appendChild(createBaliseLangue);\n    var itemMessage = window.document.createTextNode(afficheLang);\n    var createBaliseLangue = window.document.createElement(\"h1\");\n    createBaliseLangue.appendChild(itemMessage);\n    header.appendChild(createBaliseLangue);\n  }\n  /**\r\n   * @return Diplay Button\r\n   */\n\n\n  function displayButton() {\n    if (!isGalleryFull()) {\n      var myButton = textInElement(\"button\", \"Importer\", upload);\n      myButton.setAttribute(\"class\", \"btn btn-secondary btn-lg btn-block\");\n      var form = textInElement(\"form\", \"\", upload);\n      var inputUrl = textInElement(\"input\", \"\", form);\n      var inputSubmit = textInElement(\"input\", \"\", form);\n      form.setAttribute(\"action\", \"\");\n      form.setAttribute(\"method\", \"get\");\n      form.style.margin = \"1em 0\";\n      inputUrl.setAttribute(\"type\", \"url\");\n      inputUrl.setAttribute(\"required\", \"required\");\n      inputUrl.setAttribute(\"class\", \"form-control\");\n      inputSubmit.setAttribute(\"type\", \"submit\");\n      inputSubmit.setAttribute(\"value\", \"envoyer\");\n      inputUrl.setAttribute(\"placeholder\", \"Entrez une url\");\n      inputSubmit.setAttribute(\"class\", \"btn btn-primary btn-lg btn-block\");\n      inputSubmit.style.margin = \"1em 0\";\n      /*    form.addEventListener(\"submit\", function (event) {\r\n             onSubmitForm(event, this)\r\n         }); */\n\n      file.addEventListener(\"change\", onChangeFile);\n      {\n        form.addEventListener(\"submit\", onSubmitForm);\n      }\n      myButton.addEventListener(\"click\", function () {\n        file.click();\n      });\n      return;\n    }\n\n    textInElement(\"b\", \"Galery is Full\", upload);\n  }\n  /**\r\n   * \r\n   * @param {Event} event \r\n   */\n\n\n  function onSubmitForm(event) {\n    event.preventDefault();\n    var xhr = new XMLHttpRequest();\n    xhr.open(\"GET\", \"https://api.imagga.com/v2/colors?image_url=\" + this.elements[0].value);\n    var form = this;\n\n    xhr.onload = function (event) {\n      var colorObject = JSON.parse(this.responseText);\n\n      if (200 === this.status) {\n        pushImage(colorObject.result.colors, form.elements[0].value, form.elements[0].value, null, null);\n        window.localStorage.setItem(namespace, JSON.stringify(images));\n        displayImage();\n        onClickImage(\"click\", gallery.lastChild.lastChild);\n        return;\n      }\n\n      alert(\"Format non pris en charge\");\n    };\n\n    xhr.setRequestHeader(\"Authorization\", \"Basic YWNjXzEyMTBlYjc3NWNjMjJhZTo4OGQxOWQxNzY0MTc4Nzk5ZTU2YTY0OTE5YzI0MzJlOQ==\");\n    xhr.send();\n  }\n  /**\r\n   * @param {Event} event \r\n   * @param {File} uploadedFile \r\n   */\n\n\n  function onChangeFile(event) {\n    var uploadedFile = this.files[0];\n    var xhr = new XMLHttpRequest();\n    xhr.open(\"POST\", \"https://api.imagga.com/v2/colors\");\n\n    xhr.onload = function (event) {\n      var colorObject = JSON.parse(this.responseText);\n\n      if (200 === this.status) {\n        var reader = new FileReader();\n\n        reader.onload = function () {\n          pushImage(colorObject.result.colors, null, reader.result, null, null, null);\n          displayImage();\n          window.localStorage.setItem(namespace, JSON.stringify(images));\n          onClickImage(\"click\", gallery.lastChild.lastChild);\n        };\n\n        reader.onerror = function (event) {\n          alert(\"erreur readAsData\");\n        };\n\n        reader.readAsDataURL(uploadedFile);\n        return;\n      }\n\n      alert(\"erreur dataurl\");\n    };\n\n    xhr.setRequestHeader(\"Authorization\", \"Basic YWNjXzEyMTBlYjc3NWNjMjJhZTo4OGQxOWQxNzY0MTc4Nzk5ZTU2YTY0OTE5YzI0MzJlOQ==\");\n    var body = new FormData();\n    body.append(\"image\", uploadedFile);\n    xhr.send(body);\n  }\n  /**\r\n   * Diplay Image\r\n   */\n\n\n  function displayImage() {\n    gallery.innerHTML = \"\";\n\n    for (var key in images) {\n      if (null === images[key].extension || isExtensionValide(images[key])) {\n        var div1 = textInElement(\"div\", \"\", gallery);\n        var itemLink = textInElement(\"img\", \"\", div1);\n        div1.setAttribute(\"class\", \"col-6 col-md-4 col-lg-2\");\n        itemLink.setAttribute(\"class\", \"img-fluid rounded border dark\");\n        itemLink.setAttribute(\"src\", images[key].url);\n        itemLink.setAttribute(\"alt\", images[key].alt); // var test = textInElement(\"div\", \"tesqsdfdddddt\", gallery);\n\n        registerEvent(itemLink);\n      }\n    }\n  }\n\n  function clearAllGallery() {\n    gallery.innerHTML = \"\";\n  }\n  /**\r\n   * \r\n   * @param {HTMLElement} imageElement \r\n   */\n\n\n  function registerEvent(imageElement) {\n    imageElement.addEventListener(\"click\", function (event) {\n      onClickImage(event, this);\n    });\n  }\n  /**\r\n   * \r\n   * @param {Event} event \r\n   * @param {HTMLement} imageElement \r\n   */\n\n\n  function onClickImage(event, imageElement) {\n    preview.innerHTML = \"\";\n    /*  var preview = document.getElementById(\"preview\"); */\n\n    var btnDelete = window.document.createElement(\"button\");\n    var text = window.document.createTextNode(\"delete\");\n    btnDelete.appendChild(text);\n    preview.appendChild(btnDelete);\n    clearDisplayColor();\n    btnDelete.setAttribute(\"class\", \"btn btn-danger\");\n    preview.style.backgroundImage = \"url(\" + imageElement.getAttribute(\"src\") + \")\";\n    var imageFound = images.find(function (elem) {\n      return elem.url === imageElement.getAttribute(\"src\");\n    });\n    displayColor(imageFound.color.background_colors);\n    displayColor(imageFound.color.foreground_colors);\n    displayColor(imageFound.color.image_colors);\n    btnDelete.addEventListener(\"click\", function (event) {\n      onClickDelete(event, imageElement);\n      clearDisplayColor();\n    });\n  }\n\n  function displayColor(colorElement) {\n    for (var key in colorElement) {\n      var div = window.document.createElement(\"div\");\n      var text = window.document.createTextNode(colorElement[key].html_code);\n      div.setAttribute(\"class\", \"col-1 btn\");\n      div.style.background = colorElement[key].html_code;\n      div.appendChild(text);\n      colorBar.appendChild(div); // console.log(colorElement[key].html_code);\n    }\n  }\n  /**\r\n   * efface les couleurs\r\n   */\n\n\n  function clearDisplayColor() {\n    colorBar.innerHTML = \"\";\n  }\n\n  function onClickDelete(event, imageElement) {\n    var imageFound = images.find(function (elem) {\n      return elem.url === imageElement.getAttribute(\"src\");\n    });\n    var imageFoundKey = images.indexOf(imageFound);\n    images.splice(imageFoundKey, 1);\n    window.localStorage.setItem(namespace, JSON.stringify(images));\n    displayImage();\n    preview.style.backgroundImage = \"url(\" + \"assets/images/noimage.png\" + \")\";\n    preview.innerHTML = \"\";\n  }\n\n  function displayExtensions() {\n    textInElement(\"h5\", \"\", footer);\n    var ulExtention = textInElement(\"ul\", \"\", \"\");\n\n    for (var key in acceptableExtension) {\n      var liExtention = textInElement(\"li\", \"\", \"\");\n      liExtention.setAttribute(\"class\", \"btn btn-primary\");\n      ulExtention.appendChild(liExtention);\n      var extentionText = acceptableExtension[key];\n      var extentionname = window.document.createTextNode(extentionText);\n      liExtention.appendChild(extentionname);\n    }\n\n    ;\n    footer.appendChild(ulExtention);\n  }\n  /**\r\n   * \r\n   * @param {Sting} itname \r\n   * @param {String} iturl \r\n   */\n\n\n  function pushItem(itname, iturl) {\n    menuItems.push({\n      url: iturl,\n      name: itname\n    });\n  }\n  /**\r\n   * @param {Sting} tagName \r\n   * @param {Sting} text \r\n   * @param {HTMLElement} parent \r\n   * @returns {HTLMElement}\r\n   */\n\n\n  function textInElement(tagName, text, parent) {\n    if (\"string\" !== typeof tagName) {// throw new Error(\"textInElement requires a tag name\");\n    }\n\n    var element = window.document.createElement(tagName);\n\n    if (\"undefined\" !== typeof text) {\n      element.appendChild(window.document.createTextNode(text));\n    }\n\n    if (parent instanceof HTMLElement) {\n      parent.appendChild(element);\n    }\n\n    return element;\n  }\n\n  textInElement();\n  pushItem(\"Index\", \"url\");\n  pushItem(\"Gallerie\", \"url\");\n  pushItem(\"Contact\", \"mcflycomeback@gmail.com\");\n  displayMenuItem();\n  displayTitle();\n  displayButton();\n  displayImage();\n  displayExtensions();\n  textInElement();\n})();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.scss?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/index.js ./src/index.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/index.scss */\"./src/index.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/index.scss?");

/***/ })

/******/ });