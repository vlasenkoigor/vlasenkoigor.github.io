/**
 * IOS context interruption polyfill
 */
(function () {
    var global = window || {};
    var createjs = global.createjs || {};
    var Sound = createjs.Sound || {};

    if (!Sound) return;

    let _play = Sound.play;
    let _setMute = Sound.setMute;

    Sound.play = function (src, props) {
        let instance = _play(src, props);
        resumeContext();

        var _resume = instance.resume;

        instance.resume = function (arg1) {
            _resume.call(instance, arg1);
            resumeContext();
        }
        return instance
    };

    Sound.setMute = function (value) {
        Sound.muted = value;
        var res = _setMute.call(Sound, value)
        if (!value){
            resumeContext();
        }
        return res;
    }

    function resumeContext() {
        var context = Sound.activePlugin ? Sound.activePlugin.context : null;
        // logHTML('resume context = ' + context.state);
        if (context){
            if (context.state === 'interrupted'){
                context.resume();
            }
        }
    }
})()
