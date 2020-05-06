class lite {
  constructor(e) {
    if( (e instanceof HTMLCollection) || (e instanceof NodeList) ) {
      this.elements = [...e];
    }
    else {
      this.elements = [e];
    }
  }
  getFirst() {
    return this.elements[0];
  }
  //DOM
  html(value = null) {
    if(value !== null) {
      this.getFirst().innerHTML = value;
      return this;
    }
    else
      return this.getFirst().innerHTML;
  }
  text(value = null) {
    if(value !== null) {
      this.getFirst().textContent = value;
      return this;
    }
    else
      return this.getFirst().textContent;
  }
  prev() {
    return new lite(this.getFirst().previousElementSibling);
  }
  next() {
    return new lite(this.getFirst().nextElementSibling);
  }
  remove() {
    this.getFirst().parentNode.removeChild(this.getFirst());
    return this;
  }
  empty() {
    [...this.elements].forEach((e) => e.innerHTML = "");
    return this;
  }

  //Selector Extenders
  find(q) {
    let e = this.getFirst().querySelectorAll(q);
    return new lite(e);
  }
  parent() {
    let e = this.getFirst().parentNode;
    return new lite(e);
  }
  closest(q) {
    let e = this.getFirst().closest(q);
    return new lite(e);
  }

  //Classes
  addClass(c) {
    [...this.elements].forEach((e) => e.classList.add(c));
    return this;
  }
  removeClass(c) {
    [...this.elements].forEach((e) => e.classList.remove(c));
    return this;
  }
  toggleClass(c) {
    [...this.elements].forEach((e) => e.classList.toggle(c));
    return this;
  }
  hasClass(c) {
    return this.getFirst().classList.contains(c);
  }

  //CSS
  css(property, value = null) {
    if(value !== null) {
      [...this.elements].forEach(function(e) {
        e.style[property] = value;
      });
      return this;
    }
    else {
      if(property instanceof Object) {
        for(const prop in property) {
          this.css(prop, property[prop]);
        }
      }
      else {
        const val = this.getFirst().style[property];
        if(val === "")
          return getDefaultComputedStyle(this.getFirst(), null).getPropertyValue(property);
        else
          return val;
      }
    }
  }
  hide() {
    this.css("display", "none");
    return this;
  }
  show() {
    this.css("display", "");
    return this;
  }

  //Attributes
  attr(property, value = null) {
    if(value !== null) {
      [...this.elements].forEach(function(e) {
        e.setAttribute(property, value);
      });
      return this;
    }
    else
      return this.getFirst().getAttribute(property);
  }
  val(value = null) {
    if(value !== null) {
      [...this.elements].forEach((e) => e.value = value);
      return this;
    }
    else {
      return this.getFirst().value;
    }
  }
  data(property, value = null) {
    if(value !== null) {
      if(value instanceof Object) {
        value = JSON.stringify(value);
      }
      [...this.elements].forEach((e) => e.dataset[property] = value);
      return this;
    }
    else {
      return this.getFirst().dataset[property];
    }
  }

  //Event Listeners
  on(event, func) {
    [...this.elements].forEach((e) => e.addEventListener(event, func));
  }
  click(func) {
    this.on("click", func);
  }
  focus(func) {
    this.on("focus", func);
  }

  //Extract Element(s)
  extract() {
    return this.elements;
  }

  // Filtering
  eq(index) {
    return new lite(this.elements[index]);
  }
  filter(func) {
    let new_elements = [];
    for(const e of this.elements) {
      if(!func(e))
        new_elements.push(e);
    }
    this.elements = new_elements;
    return this;
  }

  // Animation
  animate(styles_end, duration = 500, div = 100) {
    let styles_start = {};
    let styles_increment = {};
    for(const prop in styles_end) {
      styles_start[prop] = parseInt(this.css(prop));
      styles_increment[prop] = (styles_end[prop] - styles_start[prop]) / div;
    }

     let loops = 0;
     let intvl = window.setInterval(function() {
       this.css(Object.keys(myObject).map(function(key, index) {
         myObject[key] += styles;
       }));

     }, duration / div);
  }

  fadeOut(duration = 500, div = 100) {
    const timestep = duration / div;

    let startfade = this.css("opacity");

    const fadestep = startfade / div;

    let obj = this;
    let loops = 0;
    let intvl = window.setInterval(function() {
      obj.css("opacity", startfade - (fadestep*loops));
      loops++;
      if(loops == div) {
        clearInterval(intvl);
        obj.hide();
        obj.css("opacity", 1.0);
      }
    }, timestep);
  }


}

function s(q) {
  if( q instanceof Element) {
    return new lite(q);
  }
  const firstLetter = q.charAt(0);
  let e;
  if( (q.includes(",")) || (q.includes(":")) || (q.includes(" ")) || (q.includes("*")) ) {
    e = document.querySelectorAll(q);
  }
  else {
    switch(firstLetter) {
      case "#":
        e = document.getElementById(q.slice(1));
        break;
      case ".":
        e = document.getElementsByClassName(q.slice(1));
        break;
      default:
        e = document.querySelectorAll(q);
        break;
    }
  }
  return new lite(e);
}
