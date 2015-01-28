// functionality of the plugin
var ExternFunction = (function() {
	var closeChatButton = $('<div class="menu-item"><button class="icon closeChat icon-x" title="Close chat">Close</button></div>'),
		textClose = chrome.i18n.getMessage("closeChatText"),
		titleClose = chrome.i18n.getMessage("closeChatTitle"),

		onDocumentReady = function() {
			var doc = $(document);
			closeChatButton.on('click', onCloseChat);	
			//add listener to add close button when add a new chat window
			insertionQ('div.pane-chat').summary(function(el) {
				var menus = el[0].querySelectorAll('.menu-horizontal'),
					correctMenu = menus.length > 1? (menus.length-1):0;
				$(menus[correctMenu]).append(closeChatButton);
			});
			doc.off('click', '.chat', onDocumentReady);
			doc.off('ready', onDocumentReady);
		},
		onCloseChat = function() {
			document.querySelector('.pane-chat').style.display = 'none';
		};

	//public methods
	return {
		initPlugin : function () {
			var doc = $(document);
			//two events, the one which ocurrs first rules!! 
			doc.on('ready', onDocumentReady);
			doc.on('click', '.chat', onDocumentReady);
		}
	}
})();

//execute when load
ExternFunction.initPlugin();

