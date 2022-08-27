
// Animation transition between pages
// ----------------------------------

// ---- OPENING of the page
function openPage() {

  // if there's the class transition applied to the main, remove it
  let main = document.querySelector('main.transition')
  if(main) main.classList.remove('transition')

}


window.addEventListener('load', function() {

  //once the page has loaded, the opening animation runs.
  openPage()

  // ---- CLOSING the page
  // when the user clicks on a menu link
  document.querySelectorAll('a.menu-link').forEach( link => {
    
    link.addEventListener("click", (event) => {
    
      // we stop the browser from going to the page
      event.preventDefault();
      // we save the page address for later
      const href = link.href

      //we scroll to the top of the page
      window.scrollTo(0,0);

      // we remove all the divs that were added
      document.querySelectorAll('span.more').forEach(span => {
        span.remove()
      })
      // we run the animations
      document.querySelector('main').classList.add('transition')

      // find out how long is the timing of the animation, so that we know when to leave the page
      section = document.querySelector('main section')
      transitionDuration = getComputedStyle(section).transitionDuration
      // we remove the 's' at the end of the string and we change the unit from seconds to milliseconds
      timing = parseInt(1000 * transitionDuration.slice(0, -1)) 

      // once the animation has run, we go to the page
      setTimeout(function() {
        window.location.href = href;
      }, timing)

    })
  })
})

// this piece of code is needed for when the user navigates between pages using the browser arrow
// without it, the browser would show the page as it was after the transition ran
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted ||
                          ( typeof window.performance != "undefined" &&
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});
