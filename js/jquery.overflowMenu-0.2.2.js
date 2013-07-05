$.fn.overflowMenu = function(){
  var el   = this,
      tabs = this.find('li'),
      overflowMenuIsActive = false;

  function toggleOverflowMenu(){
    overflowMenuIsActive = !overflowMenuIsActive;
    // if overflow menu isn't already active add a listener to hide it if clicking anywhere else
    // otherwise remove the listener.
    if(overflowMenuIsActive){
      $('*:not(.overflow-menu)').on('click.ellipsis', function(){
        $('*').off('click.ellipsis');
        el.find('li.overflowed').toggle();
        overflowMenuIsActive = false;
        // return false;
      });
    }
    el.find('li.overflowed').toggle();
    return false;
  }

  function init(){
    var itemsWidth = 0,
        items = el.find('li:not(.overflow-menu, .overflow-menu li)').show(),
        overflowMenuItems = menu.find('li:not(.ellipsis)'),
        threshold = el.width();
    menu.hide();
    
    // items.length - 1 because a dropdown menu only makes sense if it has more than 1 item tucked under it
    for(var i=0; i<items.length - 1; i++){
      var li = $(items[i]);
      itemsWidth += li.outerWidth(true);
      if(itemsWidth > (threshold - $(items[i]).outerWidth(true)) ){
        menu.find('.ellipsis').show().width(el.width() - itemsWidth);
        overflowMenuItems.hide();
        
        for(var j = i; j < items.length; j++){
          $(items[j]).hide();
          $(overflowMenuItems[j]).addClass('overflowed');
        }
        
        menu.show();
        break;
      }else{
        menu.hide();
        menu.find('.overflowed').removeClass('overflowed');
      }
        
    }

    // FIXME: select tab callback
    menu.on('click', 'li:not(.ellipsis)', function(e){
      menu.find('li').removeClass('ui-state-active');
      e.preventDefault();
      var self = $($(this).find('a'));
      $(this).addClass('ui-state-active');
      el.find("> li > a[href='" + self.attr('href') + "']").click();

    });
  }
  
  // insert the overflow menu
  this.append('<li class="overflow-menu"><ul><li class="ellipsis">&#8230;</li></ul></li>');
  // make a copy of the tabs for the overflow menu
  this.find('.overflow-menu > ul').append(tabs.clone());
  var menu= el.find('.overflow-menu');

  // apply event listeners
  $(window).on('resize', init);
  el.on('click', '.ellipsis', toggleOverflowMenu);

  // fire it up!
  init();
};

