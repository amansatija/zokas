$( document ).ready(function() {
    subreddit_url = ['http://www.reddit.com/r/oneliners/.json?',
                    'http://www.reddit.com/r/oneliners/top.json?t=all&',
                    'http://www.reddit.com/r/oneliners/top.json?t=month&',
                    'http://www.reddit.com/r/oneliners/top.json?t=week&',
                    'http://www.reddit.com/r/cleanjokes/.json?',
                    'http://www.reddit.com/r/cleanjokes/top.json?t=all&',
                    'http://www.reddit.com/r/cleanjokes/top.json?t=month&',
                    'http://www.reddit.com/r/cleanjokes/top.json?t=week&',
                    'http://www.reddit.com/r/Jokes/.json?',
                    'http://www.reddit.com/r/Jokes/top.json?t=all&',
                    'http://www.reddit.com/r/Jokes/top.json?t=month&',
                    'http://www.reddit.com/r/Jokes/top.json?t=week&']
    append = 'limit=100&jsonp=?'

    random = function(arr) { return arr[Math.floor(Math.random() * arr.length)] }

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

    pickShortPost = function(posts, counter) {
        post = random(posts).data
        return (counter === 0 || post.selftext.length < 1000)? post : pickShortPost(posts, --counter)
    }

    pickZoke = function(response) {
        posts = response.data.children
        post = pickShortPost(posts, posts.length)
        self = getSelfie(post)
        return "<strong>" + post.title + "</strong>...<br/>" + self
    }

    $.ajaxSetup({ 
        cache: true,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp"
    });

    $.getJSON(random(subreddit_url) + append, function(response) {
        $("#reason").html(pickZoke(response))
        $("body").addClass("clickable")
    });

    // Y U No unit tests?
    // Y U use functions so badly
});