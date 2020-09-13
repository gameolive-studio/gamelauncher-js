var gameolive = gameolive || {};
        /**
         *
         * @param {gameid:string} configuration
         */
        gameolive.launch = function (configuration) {
            this.configuration = configuration;
            if (!configuration.gameid) {
                alert('Please provide a valid game');
                return;
            }
            var gameIframe = gameolive.createIFrame(
                'https://static.luckybeetlegames.com/' + configuration.gameid + '/dist/?gameid=' + configuration.gameid + '&configid=' + configuration.configid + "&operatorid=" + configuration.operatorid
            );
            this.modal = gameolive.createModal(gameIframe);
            this.gameIframe = gameIframe;
        };
        gameolive.createIFrame = function (url) {
            var iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.name = 'frame';
            iframe.setAttribute('style', 'width:100%; height:100%;');
            if (window.addEventListener) {
                window.addEventListener("message", this._onMessageReceieved.bind(this), false);
            }
            else {
                window.attachEvent("onmessage", this._onMessageReceieved.bind(this));
            }
            return iframe;
        };
        gameolive._onMessageReceieved = function (message) {
            var eve = message.data;
            var event = eve.event;
            var data = eve.message
            if (event === "GAMEOLIVE_SIGN_UP_BONUS_DIALOG_ENDED") {
                this.gameIframe = undefined;
                document.body.removeChild(this.modal);
            }
            if (event && this._evMap && this._evMap[event]) {
                this._evMap[event].forEach(function (cb) {
                    if (cb) {
                        cb(data);
                    }
                })
            }
        }
        gameolive.createModal = function (contentToShow) {
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
                'position:absolute; width:' + (this.configuration.width || "90%") + '; height:' + (this.configuration.height || "90%") + '; top:' + (this.configuration.top || "5%") + '; left:' + (this.configuration.left || "5%") + ';zIndex:99999'
            );

            modalContent.appendChild(contentToShow);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            return modal;
        };
        gameolive.publish = function (event, message) {
            if (!this.gameIframe) {
                console.log("It looks like either game is not initialized or not launched");
                return;
            }
            this.gameIframe.contentWindow.postMessage({ "event": event, "message": message }, "*");
        }
        gameolive.subscribe = function (event, callback) {
            if (!this.gameIframe) {
                console.log("It looks like eithergame is not initialized or not launched");
                return;
            }
            if (!this._evMap) {
                this._evMap = {}
            }
            if (!this._evMap[event]) {
                this._evMap[event] = [];
            }
            this._evMap[event].push(callback);
            return this._evMap[event].length - 1;
        }
