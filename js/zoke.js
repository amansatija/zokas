$( document ).ready(function() {
    subreddit_url = ['http://www.reddit.com/r/oneliners/.json?','http://www.reddit.com/r/oneliners/top.json?t=all&',
                    'http://www.reddit.com/r/oneliners/top.json?t=month&','http://www.reddit.com/r/oneliners/top.json?t=week&',
                    'http://www.reddit.com/r/cleanjokes/.json?','http://www.reddit.com/r/cleanjokes/top.json?t=all&',
                    'http://www.reddit.com/r/cleanjokes/top.json?t=month&','http://www.reddit.com/r/cleanjokes/top.json?t=week&',
                    'http://www.reddit.com/r/Jokes/.json?','http://www.reddit.com/r/Jokes/top.json?t=all&',
                    'http://www.reddit.com/r/Jokes/top.json?t=month&','http://www.reddit.com/r/Jokes/top.json?t=week&']
    append = 'limit=100&jsonp=?'

    randomFrom = function(arr) {
        returnval = arr[Math.floor(Math.random() * arr.length)]
        console.log(returnval)
        return returnval
    }

    getSelfie = function(post) {
        result = ""
        if(post.selftext !== "") {
            var temp = document.createElement("div");
            temp.innerHTML = post.selftext_html; // trusting Reddit
            result = temp.childNodes[0].nodeValue;
            temp.removeChild(temp.firstChild);
        }
        return result;
    }

    pickShortPost = function(response, counter) {
        post = randomFrom(response.data.children).data
        return (counter === 0 || post.selftext.length < 1000)? post : pickShortPost(response, --counter)
    }

    getHTMLFrom = function(response) {
        post = pickShortPost(response, response.data.children.length)
        self = getSelfie(post)
        return "<strong>" + post.title + "</strong>...<br/>" + self
    }

    url = randomFrom(subreddit_url) + append
    $.ajaxSetup({ 
        cache: true,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp"
    });

    $.getJSON(url, function(response) {
        $("#reason").html(getHTMLFrom(response))
        $("body").addClass("clickable")
    });

    // Y U No unit tests?
    // Y U use functions so badly
});