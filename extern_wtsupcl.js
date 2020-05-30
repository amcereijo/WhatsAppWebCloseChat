// functionality of the plugin
var ExternFunction = (function() {
	var closeChatButton = $('<button title="Close chat"><span data-icon="x" class=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".45" fill="#263238" d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"></path></svg></span></button>'),

		textClose = chrome.i18n.getMessage("closeChatText"),
		titleClose = chrome.i18n.getMessage("closeChatTitle"),
		activeChat,

		onDocumentReady = function() {
			var doc = $(document);
			closeChatButton.on('click', onCloseChat);
			//add listener to add close button when add a new chat window

			insertionQ('#main > header').summary(function(el) {
				var menus = el[0].querySelectorAll('._3Kxus');
				var correctMenu = menus.length > 1? (menus.length-1) : 0;
				$(menus[correctMenu]).append(closeChatButton);
			});

			doc.off('click', '._2wP_Y', onDocumentReady);
			doc.on('click', '._2wP_Y', onChatClick);
			doc.off('ready', onDocumentReady);
			doc.keyup(onKeyUp);
		},
		onKeyUp = function(e) {
			// esc and any image not or emoji panel visible
			if (e.keyCode === 27 && !document.querySelector('.media-viewer') &&
				!document.querySelector('.emoji-panel')) {
				onCloseChat();
			}
		},
		isShowingMedia = function() {
			return $(document).find("div[data-animate-media-viewer]").length !== 0;
		},
		onCloseChat = function() {
			if(isShowingMedia()) {
				return;
			}
			if(activeChat) {
				activeChat.closest('.active').removeClass('active');
			}
			getPaneChat().style.display = "none";
		},
		onChatClick = function(ev) {
			var paneChat = getPaneChat();
			if(paneChat && paneChat.style.display === 'none') {
				paneChat.style.display = 'block' ;
			}
			activeChat = $(ev.target).closest('._2wP_Y').addClass('active');
		},
		getPaneChat = function () {
			return document.querySelector('#main').parentElement;
		};

	//public methods
	return {
		initPlugin : function () {
			var doc = $(document);
			//two events, the one which ocurrs first rules!!
			doc.on('ready', onDocumentReady);
			doc.on('click', '._2wP_Y', onDocumentReady);
		}
	};
})();

//execute when load
ExternFunction.initPlugin();

