// functionality of the plugin
var ExternFunction = (function() {
	var closeChatButton = $('<div class="menu-item"><button class="icon closeChat icon-x" title="Close chat">Close</button></div>'),
		textClose = chrome.i18n.getMessage("closeChatText"),
		titleClose = chrome.i18n.getMessage("closeChatTitle"),
		activeChat,

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
			doc.on('click', '.chat', onChatClick);
			doc.off('ready', onDocumentReady);
			doc.keyup(onKeyUp);
		},
		onKeyUp = function(e) {
			// esc and any image not visible
			if (e.keyCode === 27 && !document.querySelector('.media-viewer')) { 
				onCloseChat();
			}   
		},
		onCloseChat = function() {
			if(activeChat) {
				activeChat.closest('.active').removeClass('active');
			}
			getPaneChat().style.visibility = "hidden";
		},
		onChatClick = function(ev) {
			var paneChat = getPaneChat();
			if(paneChat && paneChat.style.visibility === 'hidden') {
				paneChat.style.visibility = 'visible' ;
			}
			activeChat = $(ev.target).closest('.chat').addClass('active');
		},
		getPaneChat = function () {
			return document.querySelector('.pane-chat');
		};

	//public methods
	return {
		initPlugin : function () {
			var doc = $(document);
			//two events, the one which ocurrs first rules!!
			doc.on('ready', onDocumentReady);
			doc.on('click', '.chat', onDocumentReady);
		}
	};
})();

//execute when load
ExternFunction.initPlugin();

