import {
  linkEvent
} from 'inferno';

import $ from "jquery";

function getButton(event) {
  return event.target.tagName === "BUTTON" ? $(event.target) : event.target.tagName === "svg" ? $(event.target.parentNode) : $(event.target.parentNode.parentNode);
}

function mouseDown(props, event) {
  var target = getButton(event);
  var clickY = event.pageY - target.offset().top;
  var clickX = event.pageX - target.offset().left;

  var svg = '<svg class="ripple"><circle cx="' + parseInt(clickX) + '" cy="' + parseInt(clickY) + '" r="' + 0 + '"></circle></svg>'

  if (target.find('svg.ripple').size() > 0)
    target.find('svg.ripple').remove();

  target.append(svg);

  var c = target.find("circle");
  c.animate({
    "r": target.width() * 2
  }, {
    duration: 600,
    step: function (val) {
      c.attr("r", val);
    },
    complete: function () {
      c.animate({
        "opacity": 0
      }, 400);
    }
  });
}

function navigateTo(props, event) {
  var offset = $('.' + props.navigateTo).offset(),
		container = $('html, body');
	if (offset.top > 350 || offset.top < -90) {
    container.stop().animate({
      scrollTop: container.scrollTop() + offset.top
    }, 600, function(){
      var target = getButton(event);
      target.focus();
    });
	};
}

function mouseUp(props, event) {
  if (props.navigateTo) navigateTo(props, event);
  if (props.onClick) props.onClick(props, event);
}

export default function Button(props) {
  var classes = ['Button'];
  if (props.ripple) classes.push('ripple');
  if (props.link) classes.push('link');
  if (props.fab) classes.push('fab');

  return ( <button class={ classes.join(' ') } onMouseDown={ props.ripple ? linkEvent(props, mouseDown) : null }  onMouseUp={ linkEvent(props, mouseUp) } >{ props.label }</button>);
}