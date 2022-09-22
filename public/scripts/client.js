/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


  const createTweetElement = function (tweetObject) {
    const tweet = `
    <section class="tweet-container">
          <header class="tweet-header">
            <section>
              <img class="tweet-header-right" src="${tweetObject.user.avatars}">
              <span class="small-margin">${tweetObject.user.name}</span>
            </section>
            <section class="handle">
              <span>${tweetObject.user.handle}</span>
            </section>
          </header>
          <p>${tweetObject.content.text}</p>
          <footer class="tweet-footer">
            <section>${tweetObject['created_at']}</section>
            <section>
              <i class="fa-solid fa-flag small-margin blue-icon-colour"></i>
              <i class="fa-solid fa-retweet small-margin blue-icon-colour"></i>
              <i class="fa-solid fa-heart small-margin blue-icon-colour"></i></section>
      </section>
    `;
    return tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
       const tweetElement = createTweetElement(tweet);
       // Appends entry to tweets container
       $('.tweets').prepend(tweetElement);
    }
  }

 // Fake data taken from initial-tweets.json
 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);



