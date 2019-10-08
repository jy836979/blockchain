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
 * @param name 사용자명(예: 서*영) [선택]
 * @param hash ci [필수]
 */ 
Native.prototype.api.createCert = function(params) {
	var options = {
			name: "",
			hash: ""
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.createCert(options.name, options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서인증
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 체크
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 비밀번호 재설정
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 지문 설정 추가
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서관리 - 패턴 설정 추가
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 멀티인증(PC로그인) - 푸시 인증
 * @param hash ci [필수]
 * @param pushValue sync data [선택]
 */ 
Native.prototype.api.multiAuthPush = function(params) {
	var options = {
			hash: "",
			pushValue
	};
	$.extend(options, params? params : {});
	
	if (window.ScriptInterface) {
		// Call Android interface
		window.ScriptInterface.multiAuthPush(options.hash);
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 멀티인증(PC로그인) - QR 인증
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 멀티인증(PC로그인) - 인증번호 인증
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

/**
 * 인증서폐기
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
		// var message = {
		// 		command: 'passwordCheck',
		// 		value: options.data,
		// 		successCallback: 'Native.callback.passwordCheckSuccess',
		// 		errorCallback: 'Native.callback.passwordCheckError'
		// };
		// window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
};

Native.prototype.event.registHAuthSuccess = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.HAuthSuccessCallback = fn;
};
Native.prototype.callback.HAuthSuccessCallback = function(){};

Native.prototype.event.registHAuthError = function(fn) {
	if(typeof fn != 'function') {
		console.error('Not is function');
		return;
	}
	Native.callback.HAuthErrorCallback = fn;
};
Native.prototype.callback.HAuthErrorCallback = function(){};

/**
 * 인증서 블록체인 아이디 조회
 * callback result {
 *     code {Number}: 0	// 성공 여부 코드
 *     result {Number}: 0 // 블록체인 결과
 * }
 * @param {callback} success(result)
 * @param {callback} error(result)
 */
Native.prototype.api.getBcID = function(params) {
	var options = {
		data: "",
		success: function(result){},
		error: function(result){console.error(result)}
	};
	$.extend(options, params? params : {});
	Native.callback.getBcIDSuccess = options.success;
	Native.callback.getBcIDError = options.error;
	
	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				value: options.data,
				successCallback: 'Native.callback.getBcIDSuccess',
				errorCallback: 'Native.callback.getBcIDError'
		};
		window.ScriptInterface.getBcID(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'getBcID',
				value: options.data,
				successCallback: 'Native.callback.getBcIDSuccess',
				errorCallback: 'Native.callback.getBcIDError'
		};
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
		data: "",
		success: function(result){},
		error: function(result){console.error(result)}
	};
	$.extend(options, params? params : {});
	Native.callback.getAuthTypeSuccess = options.success;
	Native.callback.getAuthTypeError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				value: options.data,
				successCallback: 'Native.callback.getAuthTypeSuccess',
				errorCallback: 'Native.callback.getAuthTypeError'
		};
		window.ScriptInterface.getAuthType(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'getAuthType',
				value: options.data,
				successCallback: 'Native.callback.getAuthTypeSuccess',
				errorCallback: 'Native.callback.getAuthTypeError'
		};
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
		data: "",
		success: function(result){},
		error: function(result){console.error(result)}
	};
	$.extend(options, params? params : {});
	Native.callback.deleteAuthTypeSuccess = options.success;
	Native.callback.deleteAuthTypeError = options.error;

	if (window.ScriptInterface) {
		// Call Android interface
		var message = {
				value: options.data,
				successCallback: 'Native.callback.deleteAuthTypeSuccess',
				errorCallback: 'Native.callback.deleteAuthTypeError'
		};
		window.ScriptInterface.deleteAuthType(JSON.stringify(message));
	} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.api) {
		// Call iOS interface
		var message = {
				command: 'deleteAuthType',
				value: options.data,
				successCallback: 'Native.callback.deleteAuthTypeSuccess',
				errorCallback: 'Native.callback.deleteAuthTypeError'
		};
		window.webkit.messageHandlers.api.postMessage(message);
	} else {
		// No Android or iOS interface found
		console.log("No native APIs found.");
	}
}
Native.prototype.callback.deleteAuthTypeSuccess = function(){};
Native.prototype.callback.deleteAuthTypeError = function(){};

//##################################################################

window.Native = new Native();
