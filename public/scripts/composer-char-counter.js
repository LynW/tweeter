$(document).ready(function() {
  const counter = $(".counter")
  $("#tweet-text").on("input", (event)=>{
    const value = event.target.value;
    const length = value.length;
    const remaining = 140 - length;
    counter.text(remaining)
    if (remaining < 0) {
      counter.addClass("counter-warning");
    } else {
      counter.removeClass("counter-warning");
    }
  })
});