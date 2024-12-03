<script>
  function enterSite() {
    const overlay = document.getElementById('overlay');
    const content = document.querySelector('.terminal');

    overlay.style.opacity = '0'; // Start fade-out animation
    overlay.style.pointerEvents = 'none'; // Disable interactions on the overlay
    overlay.style.visibility = 'hidden'; // Ensure it's invisible but remains in the DOM
    content.classList.add('fade-in'); // Fade-in the main content

    const audio = new Audio('music.mp3');
    audio.play();
  }
</script>
