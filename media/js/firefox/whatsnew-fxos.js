;(function($) {
    $('#fxos-learn-more').click(function(e) {
        e.preventDefault();

        var href = this.href;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'whatsnew-interaction',
          interaction: 'button click',
          browserAction: 'Learn more about Firefox OS',
          eventCallback: function() {
            window.location = href;
          }
        });
    });
})(window.jQuery);
