/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js" />

if (CodeCiphers === undefined) { var CodeCiphers = {}; }
CodeCiphers.FingerHelper = (function () {

   
   

    var os = (function () {
        var ua = navigator.userAgent.toLowerCase();
        return {
            isWin2K: /windows nt 5.0/.test(ua),
            isXP: /windows nt 5.1/.test(ua),
            isVista: /windows nt 6.0/.test(ua),
            isWin7: /windows nt 6.1/.test(ua),
            isWin8: /windows nt 6.2/.test(ua),
            isWin81: /windows nt 6.3/.test(ua)
        };
    }());


    var self = {};
    self.IsCapturing = false;
    var WsImpl = window.WebSocket || window.MozWebSocket;
    var SktSender = null;
    var Error = false;
    var ctError = 0;

    var urlServer = (location.protocol === 'https:' ? 'wss://localhost:8090/' : 'ws://localhost:8091/');

    var sktTemp = new WsImpl(urlServer);

    sktTemp.onopen = function () { ctError++; this.Active = true; };
    sktTemp.onmessage = function (evt) {
        if (evt.data == CmdFinger.IsYou) {
            ctError--;
            AnalizeMsg(this);
        }
    };

    sktTemp.onerror = function () {
        if (os.isXP) {
           alert('Windows XP não oferece suporte para login com Biometria');
        } else {
           alert('Componente [CCBrowserDeviceComponent] não encontrado, verifique a instalação');
        }
        Error = true;
    };

    function AnalizeMsg(kct) {

        if (!kct.Active) return;
        SktSender = kct;
        kct.onmessage = function (evt) {

            var cmd = evt.data.substring(0, 3);
            var data = evt.data.substring(4);

            switch (cmd) {
                case CmdFinger.GetDevices:
                    OnGetDevicesChanged(data);
                    break;
                case CmdFinger.CaptureFlat:
                    OnCaptureFlatChanged(data);
                case CmdFinger.CaptureRoll:
                    OnCaptureRollChanged(data);
                    break;
                case CmdFinger.Capture2Fingers:
                    OnCapture2FingersChanged(data);
                    break;
                case CmdFinger.CapturingImage:
                    OnCapturingImageChanged(data);
                    break;
                case CmdFinger.CheckFinger:
                    OnCheckFingerChanged(data);
                    break;
                case CmdFinger.VerifyMatch:
                    OnVerifyMatchChanged(data);
                    break;

                default:
            }
        };
    };

    function IsAlive() {
        return SktSender != null && !Error;
    };

    //send
    self.GetDevices = function () {
        if (IsAlive())
            SktSender.send(CmdFinger.GetDevices);
    };

    self.CaptureFlat = function (deviceId) {
        if (IsAlive()) {
            SktSender.send(CmdFinger.CaptureFlat + '|' + deviceId);
        }
    };

    self.CaptureRoll = function (deviceId) {
        if (IsAlive())
            SktSender.send(CmdFinger.CaptureRoll + '|' + deviceId);
    };

    self.Capture2Fingers = function (deviceId) {
        if (IsAlive())
            SktSender.send(CmdFinger.Capture2Fingers + '|' + deviceId);
    };

    self.CheckFinger = function (deviceId) {
        if (IsAlive())
            SktSender.send(CmdFinger.CheckFinger + '|' + deviceId);
    };

    self.VerifyMatch = function (fir0, fir1) {
        if (IsAlive())
            SktSender.send(CmdFinger.VerifyMatch + '|' + fir0 + '|' + fir1);
    };

    //receive
    function OnGetDevicesChanged(devices) {
        $(document).trigger('CodeCiphers.FingerHelper.OnGetDevicesChanged', { detail: devices });
    };

    function OnCaptureFlatChanged(fingerData) {
        self.FingerData = $.parseJSON(fingerData);
        $(document).trigger('CodeCiphers.FingerHelper.OnCaptureFlatChanged', { detail: self.FingerData });
    };

    function OnCaptureRollChanged(fingerData) {
        self.FingerData = $.parseJSON(fingerData);
        $(document).trigger('CodeCiphers.FingerHelper.OnCaptureRollChanged', { detail: self.FingerData });
    };

    function OnCapture2FingersChanged(fingerData) {
        self.FingerData = $.parseJSON(fingerData);
        $(document).trigger('CodeCiphers.FingerHelper.OnCapture2FingersChanged', { detail: self.FingerData });
    };

    function OnCapturingImageChanged(image) {
        $(document).trigger('CodeCiphers.FingerHelper.OnCapturingImageChanged', { detail: image });
    };

    function OnVerifyMatchChanged(isEqual) {
        $(document).trigger('CodeCiphers.FingerHelper.OnVerifyMatchChanged', { detail: isEqual });
    }

    function OnCheckFingerChanged(isCheck) {
        $(document).trigger('CodeCiphers.FingerHelper.OnCheckFingerChanged', { detail: isCheck });
    }

    self.FingerData = {
        Base64WsqImageComplete: '',
        Base64WsqImage0: '',
        Base64WsqImage1: '',
        Fir0: '',
        Fir1: '',
        ErrorDesc: '',
        Base64JpgImageComplete: '',
        Base64JpgImage0: '',
        Base64JpgImage1: '',
        JpgSize: 0,
        Quality: 0,
        NumMin: 0,
        ErrorNumber: 0
    };


    var CmdFinger = {
        IsYou: "isu",
        GetDevices: "gdv",
        CaptureFlat: "cpf",
        CaptureRoll: "cpr",
        Capture2Fingers: "cp2",
        CapturingImage: "img",
        CheckFinger: "ckf",
        VerifyMatch: "vrm"
    };

    return self;

}());