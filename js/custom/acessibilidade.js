"use strict";require(["jquery-ui"],function(t){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(t,o){$(this).css(t),$("<div>").addClass("arrow").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}}),jQuery(document).ready(function(t){t(".scroll").click(function(o){o.preventDefault(),t("html,body").animate({scrollTop:t(this.hash).offset().top},800)})})});