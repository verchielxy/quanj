/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);



// popupalert
function popupalert(options)
{
	var $popupalert=$(
	'<div class="popupalert">'+
		'<div class="popupalert-box">'+
			'<div class="popupalert-overlay"></div>'+
			'<div class="popupalert-container">'+
				'<div class="popupalert-body">'+
					'<div class="popupalert-icon-box">'+
					'</div>'+
					'<div class="popupalert-text-box">'+
						'<p>'+options.content+'</p>'+
					'</div>'+
					'<div class="popupalert-btn-box">'+
						'<a class="popupalert-btn popupalert-close" href="#"><i class="fa fa-times"></i></a>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>');

	var $box=$popupalert.find('.popupalert-box');
	var $overlay=$popupalert.find('.popupalert-overlay');
	var $container=$popupalert.find('.popupalert-container');
	var $body=$popupalert.find('.popupalert-body');
	var $iconBox=$popupalert.find('.popupalert-icon-box');
	var $textBox=$popupalert.find('.popupalert-text-box');
	var $btnBox=$popupalert.find('.popupalert-btn-box');

	if( options.type == 'warning' )
		$iconBox.addClass('bg-warning c-white').html('<i class="fa fa-exclamation"></i>');
	else if( options.type == 'error' )
		$iconBox.addClass('bg-danger c-white').html('<i class="fa fa-close"></i>');
	else if( options.type == 'confirm')
	{
		$iconBox.addClass('bg-info c-white').html('<i class="fa fa-question"></i>');
		$btnBox.html('<a class="popupalert-btn popupalert-sure" href="#"><i class="fa fa-check"></i></a><a class="popupalert-btn popupalert-cancl" href="#"><i class="fa fa-times"></i></a>');
	}
	else // success
		$iconBox.addClass('bg-green c-white').html('<i class="fa fa-lg fa-check"></i>');

	// 定义事件
	$popupalert.showAction=function(){
		$('body').append($popupalert);
		$(this).addClass('popupalert-open');

		$overlay.transition({'opacity': 1}, 300);

		if( options.animate=='svgDash' )
		{
			var svg_width=$container.width();
			var svg_height=$container.height();
			var perimeter=svg_width*2 + svg_height*2;
			// 调整偏移量
			perimeter+=150;

			var $svg=$(
					'<svg class="popupalert-animation-dash" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
						'<rect x="0.3%" y="0.3%" rx="50" ry="50" fill="none" width="99.4%" height="99.4%" />'+
					'</svg>');

			$container.append($svg);

			$svg.find('rect').css({
				strokeDasharray: perimeter,
				strokeDashoffset: perimeter
			}).animate({strokeDashoffset: 0},650).transition({'opacity': 0, duration: 200});

			$body.delay(250).transition({'opacity': 1}, 650);
		}
		else if( options.animate=='slideUp' )
			$body.delay(250).css({'y':'600px'}).transition({'opacity':'1', 'y': '0', 'easing': 'snap', 'duration': 650 });
		else if( options.animate=='slideDown' )
			$body.delay(250).css({'y':'-200px'}).transition({'opacity':'1', 'y': '0', 'easing': 'snap', 'duration': 650 });
		else if( options.animate=='scale' )
			$body.delay(250).css({'transform':'scale(0.5)'}).transition({'opacity':'1', 'transform': 'scale(1)', 'easing': 'snap', 'duration': 650 });
		else
			$body.delay(250).animate({'opacity': 1}, 700);
	};

	$popupalert.hideAction=function(){
		$(this).fadeOut('400', function() { $(this).remove(); });
	};

	// position setting
	if(options.position) $box.css('verticalAlign',options.position);
	if(options.offset) $box.css('paddingTop',options.offset);
	if(options.maxWidth) $container.css('maxWidth',options.maxWidth);
	if(options.overlayBg) $overlay.css('backgroundColor',options.overlayBg);

	// 绑定事件
	$popupalert.find('.popupalert-close').click(function(event) { event.preventDefault(); $popupalert.hideAction(); });
	if( options.type != 'confirm')
		$overlay.click(function(event) { $popupalert.hideAction(); });
	$('body').keyup(function(event){ if(event.which == 27) $popupalert.hideAction(); });
	
	$popupalert.find('.popupalert-sure').click(function(event) {
		$popupalert.hideAction();
		options.confirmCallback(1);
	});
	$popupalert.find('.popupalert-cancl').click(function(event) {
		$popupalert.hideAction();
		options.confirmCallback(0);
	});

	// showAction
	$popupalert.showAction();

	// autoClose
	if( options.autoClose )
	{
		var timer=setTimeout(function(){
			$popupalert.hideAction();

			clearTimeout(timer);
		}, options.autoClose);
	}
}

// svgloader
function svgloader(options)
{
	var defaultOptions={
		type : 'gears',
		width : 200,
		height : 200,
		fill : '#ffffff',
	};

	var options=$.extend(defaultOptions,options);

	switch (options.type)
	{
		case 'gears':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gears"> <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect> <g transform="translate(-20,-20)"> <path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="'+options.fill+'"> <animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform> </path> </g> <g transform="translate(20,20) rotate(15 50 50)"> <path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="'+options.fill+'"> <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform> </path> </g> </svg>';
			break;
		case 'audio':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg"> <g transform="matrix(1 0 0 -1 0 80)"> <rect width="10" height="20" rx="3"> <animate attributeName="height"begin="0s" dur="4.3s"values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="15" width="10" height="80" rx="3"> <animate attributeName="height"begin="0s" dur="2s"values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="30" width="10" height="50" rx="3"> <animate attributeName="height"begin="0s" dur="1.4s"values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="45" width="10" height="30" rx="3"> <animate attributeName="height"begin="0s" dur="2s"values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"repeatCount="indefinite" /> </rect> </g> </svg>';
			break;
		case 'ball-triangle':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle cx="5" cy="50" r="5"> <animate attributeName="cy"begin="0s" dur="2.2s"values="50;5;50;50"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="cx"begin="0s" dur="2.2s"values="5;27;49;5"calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="27" cy="5" r="5"> <animate attributeName="cy"begin="0s" dur="2.2s"from="5" to="5"values="5;50;50;5"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="cx"begin="0s" dur="2.2s"from="27" to="27"values="27;49;5;27"calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="49" cy="50" r="5"> <animate attributeName="cy"begin="0s" dur="2.2s"values="50;50;5;50"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="cx"from="49" to="49"begin="0s" dur="2.2s"values="49;5;27;49"calcMode="linear"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
			break;
		case 'bars':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg"> <rect y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="30" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="60" width="15" height="140" rx="6"> <animate attributeName="height"begin="0s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="90" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="120" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> </svg>';
			break;
		case 'circles':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg"> <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"> <animateTransform attributeName="transform"type="rotate"from="0 67 67"to="-360 67 67"dur="2.5s"repeatCount="indefinite"/> </path> <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z"> <animateTransform attributeName="transform"type="rotate"from="0 67 67"to="360 67 67"dur="8s"repeatCount="indefinite"/> </path> </svg>';
			break;
		case 'grid':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg"> <circle cx="12.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity"begin="0s" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"> <animate attributeName="fill-opacity"begin="100ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="52.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity"begin="300ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="52.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity"begin="600ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="92.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity"begin="800ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="92.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity"begin="400ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="12.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity"begin="700ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="52.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity"begin="500ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="92.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity"begin="200ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> </svg>';
			break;
		case 'hearts':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 140 64" xmlns="http://www.w3.org/2000/svg"> <path d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z" fill-opacity=".5"> <animate attributeName="fill-opacity"begin="0s" dur="1.4s"values="0.5;1;0.5"calcMode="linear"repeatCount="indefinite" /> </path> <path d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z" fill-opacity=".5"> <animate attributeName="fill-opacity"begin="0.7s" dur="1.4s"values="0.5;1;0.5"calcMode="linear"repeatCount="indefinite" /> </path> <path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" /> </svg>';
			break;
		case 'oval':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="1s"repeatCount="indefinite"/> </path> </g> </g> </svg>';
			break;
		case 'puff':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="0s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="0s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="-0.9s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="-0.9s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> </g> </svg>';
			break;
		case 'rings':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2"> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="1.5s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="1.5s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="1.5s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="3s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="3s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="3s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="8"> <animate attributeName="r"begin="0s" dur="1.5s"values="6;1;2;3;4;5;6"calcMode="linear"repeatCount="indefinite" /> </circle> </g> </svg>';
			break;
		case 'spinning-circles':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd"> <g transform="translate(2 1)" stroke="'+options.fill+'" stroke-width="1.5"> <circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="1;0;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;1;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;1;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;1;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;1;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;1;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;1;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="27" cy="5" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;0;1" calcMode="linear"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
			break;
		case 'tail-spin':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"> <stop stop-color="'+options.fill+'" stop-opacity="0" offset="0%"/> <stop stop-color="'+options.fill+'" stop-opacity=".631" offset="63.146%"/> <stop stop-color="'+options.fill+'" offset="100%"/> </linearGradient> </defs> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)"> <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </path> <circle fill="'+options.fill+'" cx="36" cy="18" r="1"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
			break;
		case 'three-dots':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg"> <circle cx="15" cy="15" r="15"> <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="60" cy="15" r="9" fill-opacity="0.3"> <animate attributeName="r" from="9" to="9"begin="0s" dur="0.8s"values="9;15;9" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="0.5" to="0.5"begin="0s" dur="0.8s"values=".5;1;.5" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="105" cy="15" r="15"> <animate attributeName="r" from="15" to="15"begin="0s" dur="0.8s"values="15;9;15" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1"begin="0s" dur="0.8s"values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> </svg>';
			break;
		case 'squares':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-squares"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="15" y="15" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.0s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="40" y="15" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.125s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="15" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.25s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="15" y="40" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.875s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="40" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.375" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="15" y="65" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.75s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="40" y="65" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.625s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="65" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.5s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect></svg>';
			break;
		case 'gear':	
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gear"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M75,50.5l5-1.5c-0.1-2.2-0.4-4.3-0.9-6.3l-5.2-0.1c-0.2-0.6-0.4-1.1-0.6-1.7l4-3.3c-0.9-1.9-2-3.8-3.2-5.5L69.2,34 c-0.4-0.5-0.8-0.9-1.2-1.3l2.4-4.6c-1.6-1.4-3.3-2.7-5.1-3.8l-3.7,3.6c-0.5-0.3-1.1-0.5-1.6-0.8l0.5-5.2c-2-0.7-4-1.3-6.2-1.6 l-2.1,4.8c-0.6-0.1-1.2-0.1-1.8-0.1l-1.5-5c-2.2,0.1-4.3,0.4-6.3,0.9l-0.1,5.2c-0.6,0.2-1.1,0.4-1.7,0.6l-3.3-4 c-1.9,0.9-3.8,2-5.5,3.2l1.9,4.9c-0.5,0.4-0.9,0.8-1.3,1.2l-4.6-2.4c-1.4,1.6-2.7,3.3-3.8,5.1l3.6,3.7c-0.3,0.5-0.5,1.1-0.8,1.6 l-5.2-0.5c-0.7,2-1.3,4-1.6,6.2l4.8,2.1c-0.1,0.6-0.1,1.2-0.1,1.8l-5,1.5c0.1,2.2,0.4,4.3,0.9,6.3l5.2,0.1c0.2,0.6,0.4,1.1,0.6,1.7 l-4,3.3c0.9,1.9,2,3.8,3.2,5.5l4.9-1.9c0.4,0.5,0.8,0.9,1.2,1.3l-2.4,4.6c1.6,1.4,3.3,2.7,5.1,3.8l3.7-3.6c0.5,0.3,1.1,0.5,1.6,0.8 l-0.5,5.2c2,0.7,4,1.3,6.2,1.6l2.1-4.8c0.6,0.1,1.2,0.1,1.8,0.1l1.5,5c2.2-0.1,4.3-0.4,6.3-0.9l0.1-5.2c0.6-0.2,1.1-0.4,1.7-0.6 l3.3,4c1.9-0.9,3.8-2,5.5-3.2L66,69.2c0.5-0.4,0.9-0.8,1.3-1.2l4.6,2.4c1.4-1.6,2.7-3.3,3.8-5.1l-3.6-3.7c0.3-0.5,0.5-1.1,0.8-1.6 l5.2,0.5c0.7-2,1.3-4,1.6-6.2l-4.8-2.1C74.9,51.7,75,51.1,75,50.5z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15 C65,58.3,58.3,65,50,65z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></svg>';
			break;
		case 'cube':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-cube"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g transform="translate(25 25)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.9" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 25)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.8" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.1s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(25 75)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.7" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.3s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 75)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.6" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.2s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g></svg>';
			break;
		case 'battery':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-battery"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M65,19v-6c0-3.3-2.7-6-6-6H41c-3.3,0-6,2.7-6,6v6H65z" fill="'+options.fill+'"></path><path d="M76,17H24.1c-2.3,0-4.1,1.8-4.1,4v70c0,2.2,1.9,4,4.1,4H76c2.3,0,4-1.8,4-4V21C80,18.8,78.3,17,76,17z M72,29v54v4h-4.3 H32.4H28v-4V29v-4h4.4h35.3H72V29z" fill="'+options.fill+'"></path><rect x="35" y="72" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.1;0.3;1"></animate></rect><rect x="35" y="58" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.3;0.5;1"></animate></rect><rect x="35" y="44" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.5;0.7;1"></animate></rect><rect x="35" y="30" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.7;0.9;1"></animate></rect></svg>';
			break;
		case 'clock':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-clock"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="30" fill="none" stroke="'+options.fill+'" stroke-width="8px"></circle><line x1="50" y1="50" x2="50" y2="30" stroke="'+options.fill+'" stroke-width="5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite"></animateTransform></line><line x1="50" y1="50" x2="50" y2="20" stroke="'+options.fill+'" stroke-width="2px" stroke-linecap="round" opacity="1"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"></animateTransform></line></svg>';
			break;
		case 'magnify':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-magnify"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g><circle fill="none" cx="47" cy="47" r="20" opacity="0.5"></circle><path d="M77.5,69.3l-6.2-6.2c-0.7-0.7-1.3-1.2-1.9-1.6c2.6-4,4.1-8.8,4.1-14c0-14.4-11.7-26.1-26.1-26.1S21.3,33.2,21.3,47.5 S33,73.6,47.4,73.6c5.4,0,10.4-1.6,14.5-4.4c0.5,0.7,1.1,1.4,1.9,2.2l5.8,5.8c2.9,2.9,7.1,3.5,9.2,1.3C81,76.4,80.4,72.2,77.5,69.3z M47.4,66.2c-10.3,0-18.7-8.4-18.7-18.6s8.4-18.6,18.7-18.6s18.7,8.4,18.7,18.6S57.7,66.2,47.4,66.2z" fill="'+options.fill+'"></path><animateTransform attributeName="transform" type="translate" from="15 15" to="15 15" dur="1s" repeatCount="indefinite" values="15 15;-15 15;0 -10.98;15 15" keyTimes="0;0.33;0.66;1"></animateTransform></g></svg>';
			break;
		case 'gps':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gps"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="20" fill="'+options.fill+'"><animate attributeName="opacity" from="1" to="1" dur="1s" repeatCount="indefinite" values="1;1;0;0;1" keyTimes="0;0.4;0.5;0.9;1"></animate></circle><path d="M90,45h-1.3C86.4,27.5,72.5,13.6,55,11.3V10c0-2.8-2.2-5-5-5s-5,2.2-5,5v1.3C27.5,13.6,13.6,27.5,11.3,45H10 c-2.8,0-5,2.2-5,5s2.2,5,5,5h1.3C13.6,72.5,27.5,86.4,45,88.7V90c0,2.8,2.2,5,5,5s5-2.2,5-5v-1.3C72.5,86.4,86.4,72.5,88.7,55H90 c2.8,0,5-2.2,5-5S92.8,45,90,45z M55,80.6V80c0-2.8-2.2-5-5-5s-5,2.2-5,5v0.6C31.9,78.5,21.5,68.1,19.4,55H20c2.8,0,5-2.2,5-5 s-2.2-5-5-5h-0.6C21.5,31.9,31.9,21.5,45,19.4V20c0,2.8,2.2,5,5,5s5-2.2,5-5v-0.6C68.1,21.5,78.5,31.9,80.6,45H80c-2.8,0-5,2.2-5,5 s2.2,5,5,5h0.6C78.5,68.1,68.1,78.5,55,80.6z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite" values="0 50 50;90 50 50;90 50 50" keyTimes="0;0.5;1"></animateTransform></path></svg>';
			break;
		case 'ball':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ball"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g transform="translate(50 50)"><g><circle cx="0" cy="0" r="15" fill="'+options.fill+'" transform=""><animate attributeName="cy" calcMode="spline" dur="1s" repeatCount="indefinite" from="30" to="30" values="30;-30;30" keySplines="0.4 0.8 0.4 0.8;0.8 0.4 0.8 0.4" keyTimes="0;0.5;1"></animate></circle><animateTransform  type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite"></animateTransform></g></g></svg>';
			break;
		case 'infinity':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" class="uil-inf"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path id="uil-inf-path" d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40 C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z" fill="none" stroke="'+options.fill+'" stroke-width="1px" stroke-dasharray="5px"></path><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.12s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.25s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.37s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.5s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle></svg>';
			break;
		case 'triangle':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-triangle"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M34.5,52.4c-0.8,1.4-2.2,1.4-3,0L17.2,27.6C16.4,26.2,17,25,18.7,25h28.6c1.6,0,2.3,1.2,1.5,2.6L34.5,52.4z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 33 35" to="120 33 35" repeatCount="indefinite" dur="1s"></animateTransform></path><path d="M68.5,52.4c-0.8,1.4-2.2,1.4-3,0L51.2,27.6C50.4,26.2,51,25,52.7,25h28.6c1.7,0,2.3,1.2,1.5,2.6L68.5,52.4z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 67 35" to="120 67 35" repeatCount="indefinite" dur="1s"></animateTransform></path><path d="M51.5,82.4c-0.8,1.4-2.2,1.4-3,0L34.2,57.6C33.4,56.2,34,55,35.7,55h28.6c1.7,0,2.3,1.2,1.5,2.6L51.5,82.4z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 50 65" to="120 50 65" repeatCount="indefinite" dur="1s"></animateTransform></path></svg>';
			break;	
		case 'ring-alt':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring-alt"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="none" fill="none" stroke-width="10" stroke-linecap="round"></circle><circle cx="50" cy="50" r="40" stroke="'+options.fill+'" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg>';
			break;
	}

	return svg;
}

// pageloading
function pageloading(options)
{
	var defaultOptions={
		loader : 'gears',
		length : 200,
		backgroundColor : 'rgb(26, 188, 156)',
	};

	var options=$.extend(defaultOptions,options);

	var $overlay=$(
		'<div class="display-table" id="load-overlay">'+
			'<div class="display-tablecell center">'+
				svgloader({type:options.loader})+
			'</div>'+
		'</div>').css({
			position: 'fixed',
			left: 0,
			top: 0,
			zIndex: 999,
			height: '100%',
			width: '100%',
			backgroundColor: options.backgroundColor,
		});

	$(function(){
		$('body').prepend($overlay);
	});

	$(window).load(function() {
		$overlay.fadeOut(800,function(){
			$(this).remove();
		});
	});
}



// other plugin
(function($){
	var buttonLoading = function(element, options) {
		this.init('buttonLoading', element, options);
	};

	buttonLoading.VERSION = '1.0.0';

	buttonLoading.DEFAULTS = {
    	svg: 'oval',
    	animate: 'fade',
    	disabled: true,
    };

    buttonLoading.prototype.init = function(type, element, options) {
    	this.$element = $(element);
    	this.options = this.getOptions(options);

    	switch (this.options.svg) 
    	{
    		case 'puff':
        		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="0s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="0s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="-0.9s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="-0.9s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> </g> </svg>';
	    		break;
	    	case 'bars':
	    		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="#fff"> <rect y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="30" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="60" width="15" height="140" rx="6"> <animate attributeName="height"begin="0s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="90" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="120" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> </svg>';
	    		break;
	    	case 'rings':
	    		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2"> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="1.5s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="1.5s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="1.5s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="3s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="3s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="3s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="8"> <animate attributeName="r"begin="0s" dur="1.5s"values="6;1;2;3;4;5;6"calcMode="linear"repeatCount="indefinite" /> </circle> </g> </svg>';
	    		break;
	    	case 'tail-spin':
	    		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"> <stop stop-color="#fff" stop-opacity="0" offset="0%"/> <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/> <stop stop-color="#fff" offset="100%"/> </linearGradient> </defs> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)"> <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </path> <circle fill="#fff" cx="36" cy="18" r="1"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
	    		break;
	    	case 'three-dots':
	    		this.svg='<svg style="width:auto;height:100%;padding:5px 0;" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff"> <circle cx="15" cy="15" r="15"> <animate attributeName="r" from="15" to="15"begin="0s" dur="0.8s"values="15;9;15" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1"begin="0s" dur="0.8s"values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="60" cy="15" r="9" fill-opacity="0.3"> <animate attributeName="r" from="9" to="9"begin="0s" dur="0.8s"values="9;15;9" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="0.5" to="0.5"begin="0s" dur="0.8s"values=".5;1;.5" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="105" cy="15" r="15"> <animate attributeName="r" from="15" to="15"begin="0s" dur="0.8s"values="15;9;15" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1"begin="0s" dur="0.8s"values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> </svg>';
	    		break;
	    	case 'gear':
	    		this.svg='<svg style="width:auto;height:100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gear"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M75,50.5l5-1.5c-0.1-2.2-0.4-4.3-0.9-6.3l-5.2-0.1c-0.2-0.6-0.4-1.1-0.6-1.7l4-3.3c-0.9-1.9-2-3.8-3.2-5.5L69.2,34 c-0.4-0.5-0.8-0.9-1.2-1.3l2.4-4.6c-1.6-1.4-3.3-2.7-5.1-3.8l-3.7,3.6c-0.5-0.3-1.1-0.5-1.6-0.8l0.5-5.2c-2-0.7-4-1.3-6.2-1.6 l-2.1,4.8c-0.6-0.1-1.2-0.1-1.8-0.1l-1.5-5c-2.2,0.1-4.3,0.4-6.3,0.9l-0.1,5.2c-0.6,0.2-1.1,0.4-1.7,0.6l-3.3-4 c-1.9,0.9-3.8,2-5.5,3.2l1.9,4.9c-0.5,0.4-0.9,0.8-1.3,1.2l-4.6-2.4c-1.4,1.6-2.7,3.3-3.8,5.1l3.6,3.7c-0.3,0.5-0.5,1.1-0.8,1.6 l-5.2-0.5c-0.7,2-1.3,4-1.6,6.2l4.8,2.1c-0.1,0.6-0.1,1.2-0.1,1.8l-5,1.5c0.1,2.2,0.4,4.3,0.9,6.3l5.2,0.1c0.2,0.6,0.4,1.1,0.6,1.7 l-4,3.3c0.9,1.9,2,3.8,3.2,5.5l4.9-1.9c0.4,0.5,0.8,0.9,1.2,1.3l-2.4,4.6c1.6,1.4,3.3,2.7,5.1,3.8l3.7-3.6c0.5,0.3,1.1,0.5,1.6,0.8 l-0.5,5.2c2,0.7,4,1.3,6.2,1.6l2.1-4.8c0.6,0.1,1.2,0.1,1.8,0.1l1.5,5c2.2-0.1,4.3-0.4,6.3-0.9l0.1-5.2c0.6-0.2,1.1-0.4,1.7-0.6 l3.3,4c1.9-0.9,3.8-2,5.5-3.2L66,69.2c0.5-0.4,0.9-0.8,1.3-1.2l4.6,2.4c1.4-1.6,2.7-3.3,3.8-5.1l-3.6-3.7c0.3-0.5,0.5-1.1,0.8-1.6 l5.2,0.5c0.7-2,1.3-4,1.6-6.2l-4.8-2.1C74.9,51.7,75,51.1,75,50.5z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15 C65,58.3,58.3,65,50,65z" fill="#ffffff"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></svg>';
     			break;
    		default:
				this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="1s"repeatCount="indefinite"/> </path> </g> </g> </svg> ';
    			break;
    	}

    	this.text=this.$element.text();

    	this.$svgBox=$('<span class="btnloading-svg-box">'+this.svg+'</span>').css({
    		display: 'inline-block',
			position: 'absolute',
			left: '0',
			top: '0',
			width: '100%',
			height: this.$element.outerHeight(),
			textAlign: 'center',
			padding: '5px 0',
    	});

    	this.$contentBox=$('<span class="btnloading-content-box">'+this.text+'</span>').css({
    		display: 'inline-block',
    	});

    	this.$element.css({
  			position: 'relative',
  			overflow: 'hidden',
  		}).html( this.$contentBox );
    };

    buttonLoading.prototype.getDefaults = function() {
    	return buttonLoading.DEFAULTS;
	};

	buttonLoading.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);

        return options;
    };

	buttonLoading.prototype.start = function() {
		this.$element.append( this.$svgBox );

		if(this.options.disabled)
			this.$element.prop('disabled', true);

		switch (this.options.animate) 
		{
			case 'slide':
				this.$contentBox.css({y: 0}).transition({y: 40});
			this.$svgBox.css({y: -40}).transition({y: 0});
				break;
			case 'scale':
				this.$contentBox.css({scale: [1,1]}).transition({scale: [0,0]});
			this.$svgBox.css({scale: [0,0]}).transition({scale: [1,1]});
				break;
				
			default:
				this.$contentBox.css({opacity: 1}).transition({opacity: 0});
			this.$svgBox.css({opacity: 0}).transition({opacity: 1});
				break;
		}
	};

	buttonLoading.prototype.end = function() {
		switch (this.options.animate) 
		{
			case 'slide':
			this.$contentBox.css({y: 40}).transition({y: 0});
			this.$svgBox.css({y: 0}).transition({y: -40});
				break;
			case 'scale':
				this.$contentBox.css({scale: [0,0]}).transition({scale: [1,1]});
			this.$svgBox.css({scale: [1,1]}).transition({scale: [0,0]});
				break;

			default:
				this.$svgBox.css({opacity: 1}).transition({opacity: 0});
			this.$contentBox.css({opacity: 0}).transition({opacity: 1});
				break;
		}

		if(this.options.disabled)
			this.$element.prop('disabled', false);
	};


	function Plugin(option) {
    	return this.each(function() {
    		var $this = $(this);
        	var data = $this.data('unit.buttonLoading');
        	var options = typeof option == 'object' && option;

        	if (!data && /destroy|hide/.test(option)) 
        		return;

        	if (!data)
        		$this.data('unit.buttonLoading', (data = new buttonLoading(this, options)));
        	
        	if (typeof option == 'string') 
        		data[option]();
    	});
	};

	var old = $.fn.buttonLoading;

	$.fn.buttonLoading = Plugin;
	$.fn.buttonLoading.Constructor = buttonLoading;

	$.fn.buttonLoading.noConflict = function() {
    	$.fn.buttonLoading = old;
    	return this;
	}

})(jQuery);



// ready function
function ready(){

	$('body').on('click','.img_refresh',function(){
	    var $refreshEle=$($(this).data('refresh')),
	        originImgSrc=$refreshEle.data('originImgSrc');

	    if(!originImgSrc)
	    {
	        originImgSrc=$refreshEle.attr('src');
	        $refreshEle.data('originImgSrc',originImgSrc); 
	    }

	    $refreshEle.attr('src',originImgSrc+'?v='+Math.random()); 
	})

	$('body').on('mouseover mouseout','.img_hover',function(){
	    var tagName=$(this).prop("tagName");

	    if(tagName=='A')
	    {
	        var $imgs=$(this).find('img');
	        
	        $imgs.each(function(index, el) {
	            var dataImg=$(this).data('hover'),
	                img=$(this).attr('src');

	            $(this).attr('src',dataImg).data('hover',img);
	        });
	    }
	    else if(tagName=='IMG')
	    {
	        var dataImg=$(this).data('hover'),
	            img=$(this).attr('src');

	        $(this).attr('src',dataImg).data('hover',img);
	    }
	})

	$('body').on('focusin', '.input-group-inner input.form-control', function(event) {
		var $parent=$(this).closest('.input-group-inner');

		$parent.addClass('focus');   	
	});

	$('body').on('focusout', '.input-group-inner input.form-control', function(event) {
		var $parent=$(this).closest('.input-group-inner');

		$parent.removeClass('focus');
	});

	$('i.loader').each(function(index, el) {
		var $this=$(el);

		$(this).css({
			width : $this.attr('width'),
			height : $this.attr('height'),
			display : 'inline-block',
		}).append(svgloader({
			type : $this.attr('rel'),
			fill : $this.attr('fill'),
			width : '100%',
			height : '100%',
		}));
	});

	$.fn.dropdown.Constructor.prototype.change = function(e){
	    e.preventDefault();
	    var $item = $(e.target), $select, $checked = false, $menu, $label;
	    !$item.is('a') && ($item = $item.closest('a'));
	    $menu = $item.closest('.dropdown-menu');
	    $label = $menu.parent().find('.dropdown-label');
	    $labelHolder = $label.text();
	    $select = $item.parent().find('input');
	    $checked = $select.is(':checked');

	    if($select.is(':disabled')) 
	        return;

	    if($select.attr('type') == 'radio' && $checked) 
	        return;
	    if($select.attr('type') == 'radio') 
	        $menu.find('li').removeClass('active');

	    $item.parent().removeClass('active');
	    !$checked && $item.parent().addClass('active');
	    $select.prop("checked", !$select.prop("checked"));

	    $items = $menu.find('li > input:checked');
	    if ($items.length) 
	    {
	        $text = [];
	        $items.each(function () {
	            var $str = $(this).parent().text();
	            $str && $text.push($.trim($str));
	        });

	        $text = $text.length < 4 ? $text.join(', ') : $text.length + ' selected';
	        $label.html($text);
	    }
	    else
	    {
	        $label.html($label.data('placeholder'));
	    }
	}

	$(document).on('click.dropdown-menu', '.dropdown-select > li > a', $.fn.dropdown.Constructor.prototype.change);


}

ready();


//# sourceMappingURL=unit.min.js.map
