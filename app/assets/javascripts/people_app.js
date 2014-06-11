window.PeopleApp = {
  initialize: function (path) {
    $.getJSON(path, this.printAllPeople);
  },

  printAllPeople: function (response) {
    $.each(response._embedded.people, function(){
      $("[data-container=people]").append(JST['layouts/index'](this));
    });
  }
};