var gameolive = gameolive || {};
/**
 *
 * @param {token:string} configuration
 */
gameolive.launch = function(configuration) {
//   if (!configuration.token) {
//     alert('Please provide a valid user token');
//     return;
//   }
  if (!configuration.gameid) {
    alert('Please provide a valid game');
    return;
  }
  var gameIframe = gameolive.createIFrame(
    'https://static.luckybeetlegames.com/brandable-optin-wheel/dist/?gameid=' + configuration.gameid+ '&configid='+ configuration.configid + "&operatorid="+  configuration.operatorid
  );
  gameolive.createModal(gameIframe);
};
gameolive.createIFrame = function(url) {
  var iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.name = 'frame';
  iframe.setAttribute('style', 'width:100%; height:100%;');
  return iframe;
};
gameolive.createModal = function(contentToShow) {
  var modal = document.createElement('div');
  modal.className = 'gameoliveModal';
  modal.setAttribute(
    'style',
    'position:absolute; width:100%; height:100%;z-index:9999; background: rgba(0, 0, 0, 0.5);top:0;left:0'
  );

  var modalContent = document.createElement('div');
  modalContent.className = 'gameoliveModalContent';
  modalContent.setAttribute(
    'style',
    'position:absolute; width:70%; height:70%; top:15%; left:15%;zIndex:99999'
  );

  modalContent.appendChild(contentToShow);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
};
