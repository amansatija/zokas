$( document ).ready(function() {
    subreddit_url = ['http://www.reddit.com/r/oneliners/.json?','http://www.reddit.com/r/oneliners/top.json?t=all&',
                    'http://www.reddit.com/r/oneliners/top.json?t=month&','http://www.reddit.com/r/oneliners/top.json?t=week&',
                    'http://www.reddit.com/r/cleanjokes/.json?','http://www.reddit.com/r/cleanjokes/top.json?t=all&',
                    'http://www.reddit.com/r/cleanjokes/top.json?t=month&','http://www.reddit.com/r/cleanjokes/top.json?t=week&',
                    'http://www.reddit.com/r/Jokes/.json?','http://www.reddit.com/r/Jokes/top.json?t=all&',
                    'http://www.reddit.com/r/Jokes/top.json?t=month&','http://www.reddit.com/r/Jokes/top.json?t=week&']
    append = 'limit=100&jsonp=?'
    url = randomFrom(subreddit_url) + append
    $.ajaxSetup({ 
        cache: true,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp"
    });

    $.getJSON(url, function(response) {
        data = randomFrom(response.data.children)
        title = data.title
        self = getSelfie(data)

        $("#reason").html("<strong>" + title + "</strong>...<br/>" + self) // if too long, ain't nobody got time for that, pick another
        $("body").addClass("clickable")
    });

    randomFrom = function(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    getSelfie = function(data) {
        result = ""
        if(data.selftext !== "") {
            var temp = document.createElement("div");
            temp.innerHTML = data.selftext_html;
            result = temp.childNodes[0].nodeValue;
            temp.removeChild(temp.firstChild);
        }
        return result;
    }

    // Y U No unit tests?
});