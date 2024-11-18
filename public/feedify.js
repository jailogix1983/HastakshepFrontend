var feedify = feedify || {};
window.feedify_options = { fedify_url: "https://app.feedify.net/", pkey: "BMf5hGKmqsTWoGvzHifCB6TzLr0dF4EtmCyaESpSazFZkDqmcSNZhSnf6q4WhgJfkYuLQSH2T9tMPv3SVEc8KR0=" };
(function (window, document) {
    function addScript(script_url) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = script_url;
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    addScript('https://cdn.feedify.net/getjs/feedbackembad-min-3.0.js');
})(window, document);
