// Initialize.
function init_rotator() {

  // Does element exist?
  if (!$('#rotator').length) {

    // If not, exit.
    return;
  }

  // Rotate speed.
  var speed = 2000;

  // Pause setting.
  var pause = false;

  // Rotator function.
  function rotate(element) {

    // Stop, if user has interacted.
    if (pause) {
      return;
    }

    // Either the next /first <li>.
    var $next_li = $(element).next('li').length ? $(element).next('li') : $('#rotator li:first');

    // Continue.
    function doIt() {
      rotate($next_li);
    }

    // Fade out <li>.
    $(element).fadeOut(speed);

    // Show next <li>.
    $($next_li).fadeIn(speed, function() {
      // Clear numbered buttons.
      $('#rotator_controls a.current').removeClass('current');

      // Either next / first control link.
      $('#rotator_controls a[href="#' + $(this).attr('id') + '"]').addClass('current');

      // Is it paused?
      if (!pause) {

        // Slight delay.
        setTimeout(doIt, speed);
      }
    });
  }

  // Add click listeners for controls.
  $('#rotator_controls a').click(function() {

    // Pause animation.
    pause = true;

    // Stop in-progress animations.
    $('#rotator li:animated').stop();

    // Change button text.
    $('#rotator_play_pause').html('PLAY');

    // Show target, hide other <li>.
    $($(this).attr('href')).show().css({
      opacity: 1
    }).siblings('li').hide().css({
      opacity: 1
    });

    // Add class="current" and remove from all others.
    $('#rotator_controls a.current').removeClass('current');
    $(this).addClass('current');

    // Nofollow.
    this.blur();
    return false;
  });

  // Pause / Play the animation.
  $('#rotator_play_pause').click(function() {

    // Is it paused?
    if (pause) {

      // Remove class="pause".
      pause = false;

      // Start the rotation.
      rotate('#rotator li:visible:first');

      // Change the text.
      $(this).html('PAUSE');
    }
    else {

      // Stop rotation.
      pause = true;

      // Change the text.
      $(this).html('PLAY');
    }

    // Nofollow.
    this.blur();
    return false;
  });

  // Hide all but first <li>.
  $('#rotator li:first').show();

  // Wait for page load.
  $(window).load(function() {

    // Begin rotation.
    rotate($('#rotator li:visible:first'));
  });
}

// Kick things off.
$(document).ready(function() {
  init_rotator();
});