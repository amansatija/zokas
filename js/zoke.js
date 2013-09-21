$( document ).ready(function() {
	subreddit_url = ['http://www.reddit.com/r/oneliners/.json?','http://www.reddit.com/r/oneliners/top.json?t=all&',
					'http://www.reddit.com/r/oneliners/top.json?t=month&','http://www.reddit.com/r/oneliners/top.json?t=week&',
					'http://www.reddit.com/r/cleanjokes/.json?','http://www.reddit.com/r/cleanjokes/top.json?t=all&',
					'http://www.reddit.com/r/cleanjokes/top.json?t=month&','http://www.reddit.com/r/cleanjokes/top.json?t=week&',
					'http://www.reddit.com/r/Jokes/.json?','http://www.reddit.com/r/Jokes/top.json?t=all&',
					'http://www.reddit.com/r/Jokes/top.json?t=month&','http://www.reddit.com/r/Jokes/top.json?t=week&']
	append = 'limit=100&jsonp=?'
	url = subreddit_url[Math.floor(Math.random() * subreddit_url.length)] + append
	$.ajaxSetup({ 
		cache: true,
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp"
	});

	$.getJSON(url, function(response) {
		total = response.data.children.length;
		random_index = Math.floor(Math.random() * total); // picking a random frm array is dup code, refactor
	    data = response.data.children[random_index].data 
		result = ""
	    if(data.selftext !== "") { // extrapolate
		    var temp = document.createElement("div");
	    	temp.innerHTML = data.selftext_html;
	    	result = temp.childNodes[0].nodeValue;
	    	temp.removeChild(temp.firstChild);
	    }

	    $("#reason").html("<strong>" + data.title + "</strong>...<br/>" + result) // if too long, ain't nobody got time for that, pick another
	    $("body").addClass("clickable")
	});
});