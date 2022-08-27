// Animation of the titles that translate left on hover
// ----------------------------------------------------


// 1. -- copy the titles text:
// we add more copies of the same text for every title,
// so that the marquee keeps scrolling
function addText () {
    document.querySelectorAll('.font-anim').forEach( (scritta) => {
        let titleText = scritta.innerHTML

        toAdd = 20;

        // if we are in the home, the text needs to be also prepended
        if(document.body.classList.contains('home'))
        {
            for (i = 0; i < 3; i++)
            {
                let span = document.createElement('span')
                span.innerHTML =  titleText
                span.classList.add('more', 'hide', 'added')
                scritta.prepend(span)
            }
            // in the homepage, the text can be less because the font size it's bigger
            toAdd = 3;
        }

        // in all the pages, we add the hidden elements after the one that's already there
        for (i = 0; i < toAdd; i++)
        {
            let span = document.createElement('span')
            span.innerHTML = titleText
            span.classList.add('more', 'hide', 'added')
            scritta.append(span)
        }
    } )
}

// on page load we add the text copies
window.addEventListener('load', () => {
    addText()
})

// 2. -- Animate the text

// variables that control the trigger of the animation, so that it doesn't run more than necessary
let isAnimation = false
var animation_id;

// we CREATE THE ANIMATION of the titles that translates left
function animation(scritta) {

    let left = scritta.offsetLeft
    // the speed of the translation
    let factor = 1.5

    if (scritta.classList.contains('font-big')) factor = 2
    if (scritta.classList.contains('font-base')) factor = 0.6

    // we translate the title using a recurring function
    // we can then stop it using the id animation_id
    function repeat() {
            isAnimation = true
            scritta.style.left = left+'px';
            left -= factor;
            animation_id = window.requestAnimationFrame(repeat)
            if (left < -scritta.offsetWidth)
            {
                scritta.style.left = 100+'vw';
            }
    }

    animation_id = window.requestAnimationFrame(repeat) ;
}

// we RUN THE ANIMATION while hovering on the titles
document.querySelectorAll('.scroller').forEach( (scroller) => {

    let scritta = scroller.querySelector('.font-anim')

    // if the scroller div contains an element to animate:
    if (scritta) {
        var originalLeft = scritta.style.left

        // while hovering on the scroller
        // we change the color of the titles and we run the animation
        scroller.addEventListener('mouseover', event => {

            scritta.classList.add('black')

            scritta.querySelectorAll('span.hide').forEach(
                (span) => span.classList.remove('hide')
            )

            if (!isAnimation) animation(scritta)

        })

        // when the user moves out of the scroller, we stop the animation
        scroller.addEventListener('mouseout', event => {

            scritta.style.left = originalLeft;
            cancelAnimationFrame(animation_id);
            isAnimation = false
            scritta.classList.remove('black')
            scritta.querySelectorAll('span.more').forEach(
                (span) => span.classList.add('hide')
            )

        })

    }
})


// this is just a bootstrap code that is needed to show the tooltips :)
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})