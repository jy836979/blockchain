function Native(){}
Native.prototype.callback = {};
Native.prototype.event = {};
Native.prototype.api = {};
Native.prototype.SETTINGS_INFO = {
	fingerPossible: 	false,	// 지문 인증 서비스 지원여부
	locationPossible: 	false,	// 위치 서비스 지원여부
	loPassword: 		false,	// 잠금설정 - 비밀번호 등록 
	loFinger: 			false, 	// 잠금설정 - 지문 등록
	push: 				false, 	// 푸시설정
	location: 			false,	// 위치설정 
	beacon: 			false, 	// 비콘설정
	alStart: 			false, 	// 알림설정 - 시작 시간
	alEnd: 				false	// 알림설정 - 끝 시간
};


//##################################################################
//						   ## 네이티브 API ##
//##################################################################

// 인앱브라우저 오픈
Native.prototype.api.popupOpen = function(title, url, fn) {
	if (!title || !url) {
		return;
	}
	if(typeof fn != 'function') {
		fn = function(){};
	}
	Native.callback.popupClose = function(data) {
		fn(data.data);
	}
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.popupOpen(title, url);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'popupOpen',
				title: title,
				url: url
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 인앱브라우저 오픈 - 닫기 확인창 띄움
Native.prototype.api.popupOpenByCloseConfirm = function(title, url, confMsg, fn) {
	if (!title || !url) {
		return;
	}
	if(typeof fn != 'function') {
		fn = function(){};
	}
	confMsg = confMsg || '팝업창을 닫으시겠습니까?';
	Native.callback.popupClose = function(data) {
		fn(data.data);
	}
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.popupOpenByCloseConfirm(title, url, confMsg);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'popupOpenByCloseConfirm',
				title: title,
				url: url,
				confMsg: confMsg
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

//인앱브라우저 오픈 - 닫기 확인창 설정
Native.prototype.api.closeConfirmUpdate = function(isConf, confMsg) {
	isConf = isConf || false;
	confMsg = confMsg || '창을 닫으시겠습니까?';

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.closeConfirmUpdate(isConf, confMsg);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'closeConfirmUpdate',
				isConf: isConf,
				confMsg: confMsg
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 인앱브라우저 클로즈
Native.prototype.api.popupClose = function(object) {
	var data = {data: object||''};
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.popupClose(JSON.stringify(data), 'Native.callback.popupClose');
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'popupClose',
				parameters: data,
				callback: 'Native.callback.popupClose'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.popupClose = function(data) {};

// 앱 저장소 저장
Native.prototype.api.storageSet = function(name, object) {
	if (!name) {
		return;
	}
	object = object || '';
	var data = {data: object};
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.storageSet(name, JSON.stringify(data));
	} else if(window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'storageSet',
				name: name,
				value: data
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 앱 저장소 불러오기
Native.prototype.api.storageGet = function(name, fn) {
	if (!name) {
		return;
	}
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.storageGet = function(data){
		fn(data.hasOwnProperty('data')? data.data : '');
	};
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.storageGet(name, 'Native.callback.storageGet');
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'storageGet',
				name: name,
				callback: 'Native.callback.storageGet'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.storageGet = function(data) {};

//인앱브라우저 제목 변경
Native.prototype.api.popupTitle = function(title) {
	if (!title) {
		return;
	}
	
	if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'popupTitle',
				title: title
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 시스템 브라우저 오픈
Native.prototype.api.browserOpen = function(url) {
	if (!url) {
		return;
	}
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.browserOpen(url);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'browserOpen',
				url: url
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

//지문 인증 가능여부
Native.prototype.api.isAvailable = function(params) {
	var options = {
			success: function(){},
			error: function(error){console.error(error)}
	};
	$.extend(options, params? params : {});
	Native.callback.isAvailableSuccess = options.success;
	Native.callback.isAvailableError = options.error;
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				successCallback: 'Native.callback.isAvailableSuccess',
				errorCallback: 'Native.callback.isAvailableError'
		};
		window.ScriptInterface.isAvailable(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'isAvailable',
				successCallback: 'Native.callback.isAvailableSuccess',
				errorCallback: 'Native.callback.isAvailableError'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.isAvailableSuccess = function(){};
Native.prototype.callback.isAvailableError = function(){};

// 지문인식 다이얼로그 오픈
Native.prototype.api.authentication = function(params) {
	var options = {
			reason: 'Authentication',
			success: function(){},
			error: function(error){console.error(error)}
	};
	$.extend(options, params? params : {});
	Native.callback.authenticationSuccess = options.success;
	Native.callback.authenticationError = options.error;
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				successCallback: 'Native.callback.authenticationSuccess',
				errorCallback: 'Native.callback.authenticationError'
		};
		window.ScriptInterface.authentication(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'authentication',
				localizedReason: options.reason,	// (iOS 전용) : 인증 대화 상자에 설명이 있습니다.
				successCallback: 'Native.callback.authenticationSuccess',
				errorCallback: 'Native.callback.authenticationError'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.authenticationSuccess = function(){};
Native.prototype.callback.authenticationError = function(){};

// 진동
Native.prototype.api.vibrate = function() {
	
	if (window.ScriptInterface && navigator.vibrate) {
		navigator.vibrate(300);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'vibrate'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 화면밝기를 최대로
Native.prototype.api.maxBrightness = function() {
	
	if (window.ScriptInterface) {
		window.ScriptInterface.maxBrightness();
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'maxBrightness'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

//화면밝기를 원상태로
Native.prototype.api.undoBrightness = function() {
	
	if (window.ScriptInterface) {
		window.ScriptInterface.undoBrightness();
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'undoBrightness'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

//앱 설정
Native.prototype.api.settingsSet = function(name, value, fn) {
	if(Object.keys(Native.SETTINGS_INFO).indexOf(name) < 0) {
		console.error('No settings name found. >> ' + name);
		return;
	}
	if(typeof value != 'boolean'){
		console.error("Not is boolean type.");
		return;
	}
	Native.callback.settingsSet = function(data) {
		// 셋팅정보 업데이트
		$.extend(Native.SETTINGS_INFO, data);
		if(typeof fn == 'function') fn(data);
	};
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				name:  name,
				value: value,
				callback: 'Native.callback.settingsSet'
		};
		window.ScriptInterface.settingsSet(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'settingsSet',
				name:  name,
				value: value,
				callback: 'Native.callback.settingsSet'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.settingsSet = function(data) {};

// 앱 설정정보
Native.prototype.api.settingsInfo = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.settingsInfo = function(data) {
		// 셋팅정보 업데이트
		$.extend(Native.SETTINGS_INFO, data);
		fn(data);
	};
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.settingsInfo('Native.callback.settingsInfo');
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'settingsInfo',
				callback: 'Native.callback.settingsInfo'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.settingsInfo = function(data) {};

// 위치 서비스 상태
Native.prototype.api.locationStatus = function(params) {
	var options = {
			success: function(){},
			error: function(error){console.error(error)}
	};
	$.extend(options, params? params : {});
	Native.callback.locationStatusSuccess = function(data) {
		// 셋팅정보 업데이트
		$.extend(Native.SETTINGS_INFO, data);
		options.success(data);
	}
	Native.callback.locationStatusError = function(data) {
		// 셋팅정보 업데이트
		$.extend(Native.SETTINGS_INFO, data);
		options.error(data);
	}
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				successCallback: 'Native.callback.locationStatusSuccess',
				errorCallback: 'Native.callback.locationStatusError',
		};
		window.ScriptInterface.locationStatus(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'locationStatus',
				successCallback: 'Native.callback.locationStatusSuccess',
				errorCallback: 'Native.callback.locationStatusError',
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.locationStatusSuccess = function(){};
Native.prototype.callback.locationStatusError = function(){};

// 위치 정보 조회
Native.prototype.api.location = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.location = fn;
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.location('Native.callback.location');
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'location',
				callback: 'Native.callback.location'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.location = function(data) {};

// 위치 정보 업데이트
Native.prototype.api.locationUpdate = function() {
	
//	if (window.ScriptInterface) {
//		// Call Android interface
//		window.ScriptInterface.locationUpdate();
//	} else 
	if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'locationUpdate'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 위치 서비스 설정 얼럿
Native.prototype.api.locationDeniedAlert = function() {
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.locationDeniedAlert();
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'locationDeniedAlert'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.locationDeniedAlertSuccess = function(){};
Native.prototype.callback.locationDeniedAlertError = function(){};

//화면밝기를 최대로
Native.prototype.api.localPush = function() {
	
	if (window.ScriptInterface) {
		
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'localPush'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// cache size
Native.prototype.api.cacheSize = function(fn) {

	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.cacheSize = function(data){
		fn(data);
	};

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.cacheSize('Native.callback.cacheSize');
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.cacheSize = function(data) {};

// cache 삭제
Native.prototype.api.clearCache = function() {

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.clearCache();
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// FCM 토픽 등록
Native.prototype.api.addFCMTopic = function(topic) {
	if (!topic) {
		return;
	}
	
	if (window.ScriptInterface) {
		// Call Android interface
		console.log(topic);
		window.ScriptInterface.addFCMTopic(topic);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'addFCMTopic',
				topic: topic
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

//FCM 토픽 등록
Native.prototype.api.showToast = function(message, replaceWord) {
	if (!message) {
		return;
	}
	if (replaceWord) {
		message = message.replace('%s', replaceWord);
	}
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.showToast(message);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'showToast',
				message: message
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 블루투스 설정 요청
Native.prototype.api.bluetoothRequest = function() {
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.bluetoothRequest();
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'bluetoothRequest'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 비콘 신호 업데이트
Native.prototype.api.updateBeaconMonitoring = function() {
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.updateBeaconMonitoring();
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'updateBeaconMonitoring'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

// 패스워드 체크
Native.prototype.api.passwordCheck = function(params) {
	var options = {
			data: "",
			success: function(){},
			error: function(error){console.error(error)}
	};
	$.extend(options, params? params : {});
	Native.callback.passwordCheckSuccess = options.success;
	Native.callback.passwordCheckError = options.error;
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				value: options.data,
				successCallback: 'Native.callback.passwordCheckSuccess',
				errorCallback: 'Native.callback.passwordCheckError'
		};
		window.ScriptInterface.passwordCheck(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'passwordCheck',
				value: options.data,
				successCallback: 'Native.callback.passwordCheckSuccess',
				errorCallback: 'Native.callback.passwordCheckError'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.passwordCheckSuccess = function(){};
Native.prototype.callback.passwordCheckError = function(){};

/**
 * 앱 실행
 * @param {String} intentUrl (android) 실행할 앱의 인텐트 url [필수]
 * @param {String} scheme (ios) 실행할 앱의 scheme [필수]
 * @param {callback} success 성공
 * @param {callback} error 실패
 * @description 
 *	
 */
Native.prototype.api.launchApp = function(params) {
	var options = {
			intentUrl: "",
			scheme: "",
			success: function(){},
			error: function(error){console.error(error)}
	};
	$.extend(options, params? params : {});
	Native.callback.launchAppSuccess = options.success;
	Native.callback.launchAppError = options.error;
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				intentUrl: options.intentUrl,
				successCallback: 'Native.callback.launchAppSuccess',
				errorCallback: 'Native.callback.launchAppError'
		};
		window.ScriptInterface.launchApp(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'launchApp',
				scheme: options.scheme,
				successCallback: 'Native.callback.launchAppSuccess',
				errorCallback: 'Native.callback.launchAppError'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.launchAppSuccess = function(){};
Native.prototype.callback.launchAppError = function(){};

/**
 * 스토어 이동
 * @param {String} packageName (android) 플레이 스토어에 이동할 패키지명 [필수]
 * @param {String} storeId (ios) 앱 스토어에 이동할 스토어 아이디 [필수]
 * @param {callback} success 성공
 * @param {callback} error 실패
 */
Native.prototype.api.goStore = function(params) {
	var options = {
			packageName: "",
			storeId: "",
			success: function(){},
			error: function(error){console.error(error)}
	};
	$.extend(options, params? params : {});
	Native.callback.goStoreSuccess = options.success;
	Native.callback.goStoreError = options.error;
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				packageName: options.packageName,
				successCallback: 'Native.callback.goStoreSuccess',
				errorCallback: 'Native.callback.goStoreError'
		};
		window.ScriptInterface.goStore(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'goStore',
				storeId: options.storeId,
				successCallback: 'Native.callback.goStoreSuccess',
				errorCallback: 'Native.callback.goStoreError'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.goStoreSuccess = function(){};
Native.prototype.callback.goStoreError = function(){};


Native.prototype.api.test1 = function(name, value, fn) {
	if (!name || !value) {
		return;
	}
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.test1 = fn;
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.setUserProperty(name, value);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'test1',
				name: name,
				value: value,
				callback: 'Native.callback.test1'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};
Native.prototype.callback.test1 = function() {};

Native.prototype.api.test2 = function(name, params) {
	if (!name) {
		return;
	}

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.test2(name, JSON.stringify(params));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'test2',
				name: name,
				parameters: params
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

//##################################################################


//##################################################################
//					  	  ## 네이티브 이벤트 ##
//##################################################################

//포그라운드 이벤트 핸들러 등록
Native.prototype.event.registForeground = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.foregroundCallback = fn;
};
Native.prototype.callback.foregroundCallback = function(settingsInfo){};

//백그라운드 이벤트 핸들러 등록
Native.prototype.event.registBackground = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.backgroundCallback = fn;
};
Native.prototype.callback.backgroundCallback = function(){};

//비활성 상태 이벤트 핸들러 등록
Native.prototype.event.registResignActive = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.resignActiveCallback = fn;
};
Native.prototype.callback.resignActiveCallback = function(){};

//활성화 상태 이벤트 핸들러 등록
Native.prototype.event.registBecomeActive = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.becomeActiveCallback = fn;
};
Native.prototype.callback.becomeActiveCallback = function(){};

//푸시 이벤트 핸들러 등록
Native.prototype.event.registNotification = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.notificationCallback = fn;
};
Native.prototype.callback.notificationCallback = function(){};

//비콘 지역 입장 핸들러 등록
Native.prototype.event.registEnterRegion = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.enterRegionCallback = fn;
};
Native.prototype.callback.enterRegionCallback = function(data){};

//비콘 지역 퇴장 핸들러 등록
Native.prototype.event.registExitRegion = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.exitRegionCallback = fn;
};
Native.prototype.callback.exitRegionCallback = function(){};

//인앱브라우저 닫기 핸들러 등록
Native.prototype.event.registInAppClosed = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.inAppClosedCallback = fn;
};
Native.prototype.callback.inAppClosedCallback = function(){};

//랜딩페이지 이벤트 핸들러 등록
Native.prototype.event.registLandingPage = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.landingPageCallback = fn;
};
Native.prototype.callback.landingPageCallback = function(){};

// 포그라운드 상태
Native.prototype.event.foreground = function(data) {
	Native.callback.foregroundCallback(data);
};

// 백그라운드 상태
Native.prototype.event.background = function() {
	Native.callback.backgroundCallback();
};

// 비활성 상태
Native.prototype.event.resignActive = function() {
	Native.callback.resignActiveCallback();
};

// 비활성 상태
Native.prototype.event.becomeActive = function() {
	Native.callback.becomeActiveCallback();
};

// 푸시 이벤트
Native.prototype.event.notification = function(data) {
	Native.callback.notificationCallback(data);
};

// 비콘 지역 입장
Native.prototype.event.enterRegion = function(data) {
	Native.callback.enterRegionCallback(data);
};
	
// 비콘 지역 퇴장
Native.prototype.event.exitRegion = function(data) {
	Native.callback.exitRegionCallback(data);
};

// 인앱브라우저 닫기
Native.prototype.event.inAppClosed = function() {
	Native.callback.inAppClosedCallback();
};

// 랜딩페이지 이벤트
Native.prototype.event.landingPage = function(data) {
	Native.callback.landingPageCallback(data);
};

//##################################################################


//##################################################################
//					  ## Android Back Pressed ##
//##################################################################

// Android Back Pressed 이벤트
// 백버튼을 누르면 Native.event.backPressed()를 호출한다.
Native.prototype.event.backPressed = function() {
	Native.callback.backPressedCallback();
};
//Android Back Pressed 이벤트 핸들러 등록
Native.prototype.event.registBackPressed = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.backPressedCallback = fn;
};
Native.prototype.callback.backPressedCallback = function(){};
// Android 메인 페이지 설정
// 설정할 경우 백버튼을 누르면 앱을 종료한다.
Native.prototype.api.mainPageArrive = function() {
	if (window.ScriptInterface) {
		window.ScriptInterface.mainPageArrive();
	}
};
// Android 메인 페이지 해지
// 해지할 경우 백버튼을 누르면 Native.event.backPressed()를 호출한다.
Native.prototype.api.mainPageLeave = function() {
	if (window.ScriptInterface) {
		window.ScriptInterface.mainPageLeave();
	}
};

//##################################################################

//##################################################################
//					  ## Block Chain ##
//##################################################################

/**
 * 인증서발급
 * @processID CREATE_CERT
 * @param name 사용자명(예: 서*영) [선택]
 * @param hash ci [필수]
 * @param deviceNo 휴대폰 번호(etcInfo) [선택]
 * @param eMail 메일 주소(etcInfo) [선택]
 */ 
Native.prototype.api.createCert = function(params) {
	var options = {
			name: "",
			hash: "",
			deviceNo: "",
			eMail: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.createCert(options.name, options.hash, options.deviceNo, options.eMail);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "createCert" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서인증
 * @processID CERT_AUTH
 * @param name 사용자명(예: 서*영) [선택]
 * @param hash ci [필수]
 * @param oriDoc 거래시 시민카드 서버에서 생성한 원문 [선택]
 */ 
Native.prototype.api.certAuth = function(params) {
	var options = {
			name: "",
			hash: "",
			oriDoc: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certAuth(options.name, options.hash, options.oriDoc);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certAuth" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 인증서 체크
 * @processID CERT_MNG_CHECK
 * @param hash ci [필수]
 */ 
Native.prototype.api.certMngCheck = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngCheck(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngCheck" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 비밀번호 재설정
 * @processID CERT_MNG_RESET_PWD
 * @param hash ci [필수]
 */ 
Native.prototype.api.certMngResetPwd = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngResetPwd(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngResetPwd" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 지문 설정 추가
 * @processID CERT_MNG_ADD_FINGER
 * @param hash ci [필수]
 */ 
Native.prototype.api.certMngAddFinger = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngAddFinger(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngAddFinger" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 패턴 설정 추가
 * @processID CERT_MNG_ADD_PATTERN
 * @param hash ci [필수]
 */ 
Native.prototype.api.certMngAddPattern = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngAddPattern(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngAddPattern" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 멀티인증(PC로그인) - 푸시 인증
 * @processID MULTI_AUTH_PUSH
 * @param hash ci [필수]
 * @param pushValue sync data [선택]
 */ 
Native.prototype.api.multiAuthPush = function(params) {
	var options = {
			hash: "",
			pushValue: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthPush(options.hash, options.pushValue);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthPush" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 멀티인증(PC로그인) - QR 인증
 * @processID MULTI_AUTH_QR
 * @param hash ci [필수]
 */ 
Native.prototype.api.multiAuthQR = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthQR(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthQR" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 멀티인증(PC로그인) - 인증번호 인증
 * @processID MULTI_AUTH_NUMBER
 * @param hash ci [필수]
 */ 
Native.prototype.api.multiAuthNumber = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthNumber(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthNumber" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 멀티인증(PC로그인) - 인증방법 선택화면
 * @processID MULTI_AUTH_SELECT
 * @param hash ci [필수]
 */ 
Native.prototype.api.multiAuthSelect = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthSelect(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthSelect" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서폐기
 * @processID CERT_REVOC
 * @param hash ci [필수]
 */
Native.prototype.api.certRevoc = function(params) {
	var options = {
			hash: ""
	};
	$.extend(options, params? params : {});

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certRevoc(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certRevoc" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서 블록체인 아이디 조회
 * callback result {
 *     code {Number}: 0	// 성공 여부 코드
 *     result {String}: ""// 블록체인 결과(bcID)
 * }
 * @param {callback} success(result)
 * @param {callback} error(result)
 */
Native.prototype.api.getBcID = function(params) {
	var options = {
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = { 
		success: "", error: "",
		successCallback: 'Native.callback.getBcIDSuccess',
		errorCallback: 'Native.callback.getBcIDError' 
	};
	$.extend(options, params? params : {});
	Native.callback.getBcIDSuccess = options.success;
	Native.callback.getBcIDError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.getBcID(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "getBcID" }, options, callback);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.getBcIDSuccess = function(){};
Native.prototype.callback.getBcIDError = function(){};

/**
 * 추가 인증수단 조회
 * callback result {
 *     code {Number}: 0	// 조회 성공 여부
 *     result {Number}: 1 // 조회 결과(1: 지문, 2:패턴)
 * }
 * @param {callback} success(result)
 * @param {callback} error(result)
 */
Native.prototype.api.getAuthType = function(params) {
	var options = {
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = {
		success: "", error: "",
		successCallback: 'Native.callback.getAuthTypeSuccess',
		errorCallback: 'Native.callback.getAuthTypeError'
	};
	$.extend(options, params? params : {});
	Native.callback.getAuthTypeSuccess = options.success;
	Native.callback.getAuthTypeError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.getAuthType(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "getAuthType" }, options, callback);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.getAuthTypeSuccess = function(){};
Native.prototype.callback.getAuthTypeError = function(){};

/**
 * 추가 인증수단 삭제
 * callback result {
 *     code {Number}: 0	// 성공 : 0, 실패 : 에러코드
 * }
 * @param {callback} success(result)
 * @param {callback} error(result)
 */
Native.prototype.api.deleteAuthType = function(params) {
	var options = {
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = {
		success: "", error: "",
		successCallback: 'Native.callback.deleteAuthTypeSuccess',
		errorCallback: 'Native.callback.deleteAuthTypeError'
	};
	$.extend(options, params? params : {});
	Native.callback.deleteAuthTypeSuccess = options.success;
	Native.callback.deleteAuthTypeError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.deleteAuthType(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "deleteAuthType" }, options, callback);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.deleteAuthTypeSuccess = function(){};
Native.prototype.callback.deleteAuthTypeError = function(){};

/**
 * 알파 테스트 버전조회
 * callback result {
 *     version {String}: V1	// V1 or V2 or empty string
 * }
 * @param {callback} success(result)
 * @param {callback} error(result)
 */
Native.prototype.api.getAlpaVersion = function(params) {
	var options = {
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = {
		success: "", error: "",
		successCallback: 'Native.callback.getAlpaVersionSuccess',
		errorCallback: 'Native.callback.getAlpaVersionError'
	};
	$.extend(options, params? params : {});
	Native.callback.getAlpaVersionSuccess = options.success;
	Native.callback.getAlpaVersionError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.getAlpaVersion(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'getAlpaVersion',
				value: options.data,
				successCallback: 'Native.callback.getAlpaVersionSuccess',
				errorCallback: 'Native.callback.getAlpaVersionError'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.getAlpaVersionSuccess = function(){};
Native.prototype.callback.getAlpaVersionError = function(){};

/**
 * 회원가입
 * @param hash ci [필수]
 * @param userName 고객이름 [필수]
 * @param birth 생년월일(yyyymmdd) [필수]
 * @param phone 전화번호 [필수]
 * @param {callback} success
 * @param {callback} error
 */
Native.prototype.api.signup = function(params) {
	var options = {
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = { success: "", error: "" };
	$.extend(options, params? params : {});
	Native.callback.signupSuccess = options.success;
	Native.callback.signupError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.signup(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "signup" }, options, callback);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.signupSuccess = function(){};
Native.prototype.callback.signupError = function(){};

//##################################################################

//##################################################################
//					  ## Block Chain Corp ##
//##################################################################

/**
 * (법인) 인증서발급
 * @processID CORP_CREATE_CERT
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.createCertCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.createCertCorp(options.name, options.bizNo, options.loginId, options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "createCertCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * (법인) 인증서인증
 * @processID CORP_CERT_AUTH
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.certAuthCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certAuthCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certAuthCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * (법인) 인증서관리 - 인증서 체크
 * @processID CORP_CERT_MNG_CHECK
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.certMngCheckCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngCheckCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngCheckCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * (법인) 인증서관리 - 비밀번호 재설정
 * @processID CORP_CERT_MNG_RESET_PWD
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.certMngResetPwdCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngResetPwdCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngResetPwdCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};


/**
 * (법인) 인증서관리 - 지문 설정 추가
 * @processID CORP_CERT_MNG_ADD_FINGER
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.certMngAddFingerCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngAddFingerCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngAddFingerCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};


/**
 * (법인) 인증서관리 - 패턴 설정 추가
 * @processID CORP_CERT_MNG_ADD_PATTERN
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.certMngAddPatternCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certMngAddPatternCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certMngAddPatternCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};


/**
 * (법인) 멀티인증(PC로그인) - 푸시 인증
 * @processID CORP_MULTI_AUTH_PUSH
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @param {String} pushValue 푸시로 전달받은 EXT jsonObject 내부에 있는txId 값 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.multiAuthPushCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: "",
			pushValue: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthPushCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId, options.pushValue);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthPushCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};


/**
 * (법인) 멀티인증(PC로그인) - QR 인증
 * @processID CORP_MULTI_AUTH_QR
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.multiAuthQRCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthQRCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthQRCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};


/**
 * (법인) 멀티인증(PC로그인) - 인증번호 인증
 * @processID CORP_MULTI_AUTH_NUMBER
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.multiAuthNumberCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthNumberCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthNumberCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};


/**
 * (법인) 멀티인증(PC로그인) - 인증방법 선택화면
 * @processID CORP_MULTI_AUTH_SELECT
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */ 
Native.prototype.api.multiAuthSelectCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthSelectCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "multiAuthSelectCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};


/**
 * (법인) 인증서폐기
 * @processID CORP_CERT_REVOC
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @param {String} certId 인증서 아이디 [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */
Native.prototype.api.certRevocCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: "",
			certId: ""
	};
	$.extend(options, params? params : {});

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certRevocCorp(options.name, options.bizNo, options.loginId, options.hash, options.certId);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certRevocCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * (법인) 인증서 발급 가능 목록
 * @processID CORP_POSSIBLE_CERT_LIST
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} hash ci [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */
Native.prototype.api.possibleCertListCorp = function(params) {
	var options = {
			name: "",
			hash: ""
	};
	$.extend(options, params? params : {});

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.possibleCertListCorp(options.name, options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "possibleCertListCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * (법인) 인증서 발급전 인증서인증
 * @processID CORP_CERT_AUTH_BEFORE_ISSUE
 * @param {String} name 사용자명(예: 서*영) [필수]
 * @param {String} bizNo 사업자 번호 [필수]
 * @param {String} loginId 로그인 아이디 [필수]
 * @param {String} hash ci [필수]
 * @description 
 * 	- HAuthSuccessCallback 성공 시 콜백 호출
 * 	- HAuthErrorCallback 실패 시 콜백 호출
 */
Native.prototype.api.certAuthBeforeIssueCorp = function(params) {
	var options = {
			name: "",
			bizNo: "",
			loginId: "",
			hash: ""
	};
	$.extend(options, params? params : {});

	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.certAuthBeforeIssueCorp(options.name, options.bizNo, options.loginId, options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "certAuthBeforeIssueCorp" }, options);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * (법인) 발급된 인증서 목록 조회
 * @return {Array} result success 콜백 파라미터, 발급된 인증서 목록 데이터
 * @param {callback} success(result)
 * @param {callback} error(result)
 */
Native.prototype.api.getCorpCertificateList = function(params) {
	var options = {
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = {
		success: "", error: "",
		successCallback: 'Native.callback.getCorpCertificateListSuccess',
		errorCallback: 'Native.callback.getCorpCertificateListError'
	};
	$.extend(options, params? params : {});
	Native.callback.getCorpCertificateListSuccess = options.success;
	Native.callback.getCorpCertificateListError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.getCorpCertificateList(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "getCorpCertificateList" }, options, callback);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.getCorpCertificateListSuccess = function(){};
Native.prototype.callback.getCorpCertificateListError = function(){};

/**
 * (법인) 등록된 인증 타입을 삭제
 * @param {String} certId 인증서 아이디 [필수]
 * @param {callback} success(result) 성공
 * @param {callback} error(result) 실패
 */
Native.prototype.api.deleteAuth = function(params) {
	var options = {
		certId: "",
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = {
		success: "", error: "",
		successCallback: 'Native.callback.deleteAuthSuccess',
		errorCallback: 'Native.callback.deleteAuthError'
	};
	$.extend(options, params? params : {});
	Native.callback.deleteAuthSuccess = options.success;
	Native.callback.deleteAuthError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.deleteAuth(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "deleteAuth" }, options, callback);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.deleteAuthSuccess = function(){};
Native.prototype.callback.deleteAuthError = function(){};

/**
 * (법인) 추가 인증수단 조회
 * @param {String} certId 인증서 아이디 [필수]
 * @param {callback} success(result) 성공
 * @param {callback} error(result) 실패
 */
Native.prototype.api.getAuthTypeCorp = function(params) {
	var options = {
		certId: "",
		success: function(result){},
		error: function(result){console.error(result)}
	};
	var callback = {
		success: "", error: "",
		successCallback: 'Native.callback.getAuthTypeCorpSuccess',
		errorCallback: 'Native.callback.getAuthTypeCorpError'
	};
	$.extend(options, params? params : {});
	Native.callback.getAuthTypeCorpSuccess = options.success;
	Native.callback.getAuthTypeCorpError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = $.extend(options, callback);
		window.ScriptInterface.getAuthTypeCorp(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = $.extend({ command: "getAuthTypeCorp" }, options, callback);
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.getAuthTypeCorpSuccess = function(){};
Native.prototype.callback.getAuthTypeCorpError = function(){};

/**
 * 통합인증 API 응답을 받기 위한 콜백 등록 - 성공
 * @return {String} processID 응답 구분을 위한 프로세스 아이디
 * @return {Number} stepCode 프로세스 진행 로그를 확인하기 위해 전달하는 스텝 코드 
 * @return {String} message 결과에 대한 메세지 
 * @return {Object} result 통합인증 API 결과값
 * @description
 * 	document.ready 시점에 Native.event.registHAuthSuccess(fn) 이벤트를 등록하면
 *  통합인증 API 요청 시 성공에 대한 HAuthSuccessCallback 콜백을 받을 수 있습니다.
 */
Native.prototype.event.registHAuthSuccess = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.HAuthSuccessCallback = fn;
};
Native.prototype.callback.HAuthSuccessCallback = function(){};

/**
 * 통합인증 API 응답을 받기 위한 콜백 등록 - 실패
 * @return {String} processID 응답 구분을 위한 프로세스 아이디
 * @return {Number} stepCode 프로세스 진행 로그를 확인하기 위해 전달하는 스텝 코드 
 * @return {String} message 결과에 대한 메세지
 * @return {String} errorCode 통합인증 API 문서의 Appendix A(결과코드표) 참고
 * @return {String} systemMessage 통합인증 API 문서의 Appendix A(결과코드표) 참고
 * @description
 * 	document.ready 시점에 Native.event.registHAuthError(fn) 이벤트를 등록하면
 *  통합인증 API 요청 시 실패에 대한 HAuthErrorCallback 콜백을 받을 수 있습니다.
 */
Native.prototype.event.registHAuthError = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.HAuthErrorCallback = fn;
};
Native.prototype.callback.HAuthErrorCallback = function(){};

//##################################################################

window.Native = new Native();
