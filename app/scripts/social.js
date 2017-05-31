module.exports = {
  init: function() {
    // this.$modal = $('#myModal');
    this.$modal = document.querySelector('#rv-modal');

    // cache
    this.headline = encodeURIComponent("HEADLINE OF STORY"),
    this.url = window.location.href;

    // turn on click event for share button
    this.shareButton();
    // turn on events for model dialogue
    this.modalDialogue();
  },

  shareButton: function() {
    var that = this;

    var $shareButton = document.querySelectorAll('#shareButton')[0];

    $shareButton.addEventListener('click', function() {
      console.log("share button clicked");

      that.openModal();
    });

  },
  closeModal: function() {
    this.$modal.style.display = 'none';
    this.$modal.style.opacity = 0;
  },
  openModal: function() {
    var self = this;

    this.$modal.style.display = 'block';
    this.$modal.style.opacity = '1';

    // add close events elsewhere
    this.$modal.addEventListener('click', function() {
      self.closeModal();
    });


  },
  modalDialogue: function() {
    var self = this;

    // close button
    var $button = this.$modal.querySelectorAll('.close')[0];

    $button.addEventListener('click', function() {
      self.closeModal();
    });

    // twitter
    this.$modal.querySelectorAll('.twitter-button')[0].setAttribute('href',
      'https://twitter.com/intent/tweet?via=revealnews&text=' +
      self.headline +
      ' ' + self.url);

    // facebook
    document.querySelectorAll('.facebook-button')[0].addEventListener('click', function() {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(self.url),
        'facebook-share-dialog',
        'width=626,height=436'
      );
      return false;
    });

    // email
    document.querySelectorAll('.email-button')[0].setAttribute('href',
      'mailto:friend@example.com&subject=Read%20this%20story%20from%20RevealNews.org');
  }

};
