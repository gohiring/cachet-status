(function () {
  var CachetStatus = function (url, callback) {
    this.init(url, callback);
  }

  CachetStatus.DEFAULTS = {
    endpointPath: '/api/components'
  }

  CachetStatus.prototype.init = function (url, callback) {
    this.url = url.concat(CachetStatus.DEFAULTS.endpointPath);
    this.callback = callback || function () {};

    var self = this;

    new Request(
      this.url,
      function (response) {
        var data = response.data,
            components = [];

        for (var i = 0; i < data.length; i++) {
          components.push({
            name: data[i].name,
            status: data[i].status.toLowerCase()
          });
        }

        self.callback.call(null, components);
      },
      function (response) {
        throw new Error(response);
      }
    );
  }

  var Request = function (url, success, error) {
    this.init(url, success, error);
  }

  Request.prototype.init = function (url, success, error) {
    this.url = url;
    this.success = success;
    this.error = error;
    this.async = true;

    var self = this;
        xhr = typeof XMLHttpRequest != undefined
              ? new XMLHttpRequest()
              : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.onload = function (event) { self.onLoad.call(self, event); }
    xhr.onerror = function (event) { self.onError.call(self, event); }

    xhr.open('get', this.url, this.async);
    xhr.send();
  }

  Request.prototype.onLoad = function (event) {
    var xhr = event.currentTarget,
        response = JSON.parse(xhr.response);

    if (xhr.status == 200) {
      this.success.call(null, response);
    } else {
      this.error.call(null, response);
    }
  }

  Request.prototype.onError = function (event) {
    var xhr = event.currentTarget,
        response = JSON.parse(xhr.response);

    this.error.call(null, response);
  }

  window.CachetStatus = CachetStatus;
})();
