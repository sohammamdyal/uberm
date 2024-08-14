import React, { useEffect } from 'react';

const Chat = () => {
    useEffect(() => {
        (function(d, m){
            var kommunicateSettings = 
                {"appId":"1abe7ca2809c5bfd1ed1527f8bfc7adb8","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
        </div>
    );
};

export default Chat;
