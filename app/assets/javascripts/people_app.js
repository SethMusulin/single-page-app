window.PeopleApp = {

  initialize: function (path) {
    $.getJSON(path, this.printPeople);
    $(document).on("submit", "[data-behavior=create-person]", this.addPersonForm.bind(this));
  },

  printPeople: function (response) {
    $("[data-container=main]").append(JST['layouts/new']({url: response._links.self.href}));


    $.each(response._embedded.people, function(){
      $("[data-container=people]").append(JST['layouts/index'](this));
    });
  },

  addPersonForm: function (event) {
    event.preventDefault();

    var form = event.target

    var person_data = {};
    $.each(form, function(){
      person_data[this.name] = this.value;
    });



    var jqxhr = $.post(event.target.action, JSON.stringify(person_data), 'json');

    jqxhr.done(function (response) {this.successfulPost(form, response);}.bind(this));
  },

  successfulPost: function (form, response) {
    form.reset();
    $("[data-container=people]").append(JST['layouts/index'](response));
  }
};