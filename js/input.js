
// if the content is deleted, make the feedback text disappear
let input = document.getElementById('friend')
let originalH1 = document.querySelector('section.section-main h1').innerHTML
let originalp = document.querySelector('section.section-main p').innerText

// when the user types
input.addEventListener('keyup', function(e) {

    let answer = input.value.toUpperCase()

    // if they type 'Mellon' run the animation
    if (answer.includes('MELLON')) {
        setTimeout(function() {

            document.body.classList.add('moria')
            document.querySelector('section.section-main h1').innerText = "You've opened the doors of Moria."
            document.querySelector('section.section-main p').innerText = "Press delete to close the doors."

        }, 150)
    }

    // when the user deletes, everything goes back to normal
    if(e.keyCode == 46 || e.keyCode == 8 )
    {
        if (document.body.classList.contains('moria')) document.body.classList.remove('moria')
        document.querySelector('section.section-main h1').innerHTML = originalH1
        document.querySelector('section.section-main p').innerText = originalp
    }
})