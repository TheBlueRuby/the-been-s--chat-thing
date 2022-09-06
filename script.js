function runChat() {
    var username = prompt("Enter a username", "Anonymous");
    if (username == null) {
        username = "Anonymous";
    }
    var pubnub = new PubNub({
        publishKey: 'demo',
        subscribeKey: 'demo'
    });
    function $(id) {
        return document.getElementById(id);
    }
    var box = $('box'),
        input = $('input'),
        channel = 'general';
    pubnub.addListener({
        message: function(obj) {
            box.innerHTML = (username + ': ' + obj.message).replace(/[<>]/g, '') + '<br>' + box.innerHTML
        }
    });
    pubnub.subscribe({
        channels: [channel]
    });
    input.addEventListener('keyup', function(e) {
        if ((e.keyCode || e.charCode) === 13) {
            pubnub.publish({
                channel: channel,
                message: input.value,
                x: (input.value = '')
            });
        }
    });
}
runChat();