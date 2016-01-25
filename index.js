(function(window, $) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  var clbr = window.clbr = window.clbr || {};

  clbr.projectsApi = function (url) {
    return {
      // Get project info
      get: function (id, access_token, fn) {
        if (!fn) {
          fn = access_token;
          access_token = null;
        }

        var headers = {};
        if (access_token) {
          headers['Authorization'] = 'JWT ' + access_token;
        }
        
        $.ajax({
            url: url + '/' + id,
            type: 'GET',
            headers: headers
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // List all projects for current user
      listMy: function (access_token, fn) {
        $.ajax({
            url: url,
            type: 'GET',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // List all projects for current user
      listByUser: function (user_id, fn) {
        $.ajax({
            url: url + '/user/' + user_id,
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // List all public projects
      listPublic: function (top, last_id, fn) {
        if (!fn) {
          fn = last_id;
          last_id = null;
        }

        last_id = last_id || '';

        $.ajax({
            url: url + '/all?' + 'top=' + (top || '') + '&last=' + (last_id || ''),
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Creates new project
      save: function (data, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'POST',
            headers: {'Authorization': 'JWT ' + access_token},
            data: data
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Update profile info
      update: function (id, data, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'PUT',
            headers: {'Authorization': 'JWT ' + access_token},
            data: data
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Update profile info
      delete: function (id, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function() {
            fn(null);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      }      
    };
  };

})(window, window.jQuery);