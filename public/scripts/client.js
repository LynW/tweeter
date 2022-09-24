/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
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
            <section>${timeago.format(tweetObject.created_at)} </section>
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

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
      .then(function(data) {
        console.log("loadTweets success:");
        renderTweets(data);
      })
      .catch(function(err) {
        console.log("loadTweets error:");
        console.log(err);
      })
  };

  loadTweets();

  $('.tweet-form').submit(function(event) {
    console.log('Button clicked, performing ajax call...')
    event.preventDefault();
    const $tweetBox = $(this).find('#tweet-text');
    const tweetSerialized = $tweetBox.serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetSerialized
    })
      .then(function(data) {
        console.log('Success');
      })
      .catch(function(err){
        console.log("Submit error:")
        console.log(err);
      })
  });

console.log("Test");

});


