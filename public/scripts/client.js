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
          <p>${escape(tweetObject.content.text)}</p>
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
      url: 'http://localhost:8080/tweets'
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
    event.preventDefault();
    const $tweetBox = $(this).find('#tweet-text');
    const tweetSerialized = $(this).serialize();
    const textLength = $("#tweet-text").val().length;

    if (textLength === 0) {
      $(".error").text("Tweet cannot be empty");
      $(".error").slideDown(500).delay(3000).slideUp();
    } else if (textLength > 140) {
      $(".error").text("Tweet must be less than 140 characters");
      $(".error").slideUp(500).delay(3000).slideDown();
    } else {
      $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/tweets',
        data: tweetSerialized
      })
        .then(function(data) {
          console.log('Success', data);
          $("#tweet-text").val("");
        })
        .catch(function(err){
          console.log("Submit error:")
          console.log(err);
        })
    }
  });

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

console.log("Test");

});


