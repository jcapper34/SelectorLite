function ajax(options){
  const set_defaults = function(obj) {
      const defaults = {
        type: "GET",
        success: function(){},
        error: function(){},
      };
      for(const key in defaults) {
        if(obj[key] === undefined)
          obj[key] = defaults[key];
      }
      return obj;
    };

    const param = function(object) {
      if(typeof object === String)
        return object;

      var encodedString = '';
      for (const key in object) {
          if (object.hasOwnProperty(key)) {
              if (encodedString.length > 0) {
                  encodedString += '&';
              }
              encodedString += encodeURI(key + '=' + String(object[key]));
          }
        }
      return encodedString;
    };

    options = set_defaults(options);

    if(options.data !== undefined)
      options.url += '?' + param(options.data);

    let xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            options.success(xhr.responseText);
          } else {
            options.error(xhr);
          }
        }
    };
}
