window.PeopleApp = {

  initialize: function (path) {
    $.getJSON(path, this.printPeople);
    $(document).on("submit", "[data-behavior=create-person]", this.addPersonForm.bind(this));
  },

  printPeople: function (response) {
    $("[data-container=main]").append(JST['layouts/new']({url: response._links.self.href}));

    $.each(response._embedded.people, function(){
      var $personDiv = $("<div class='person person-div' data-container='person'>")
      var $html = $(JST['layouts/index'](this))
      $personDiv.append($html)

      var person = new PersonView(this.first_name, this.last_name, this.address, this._links.self.href, $personDiv );

      $("[data-container=people]").append($personDiv);
    });
  },

  addPersonForm: function (event) {
    event.preventDefault();

    var form = event.target;

    var person_data = {};
    $.each(form, function(){
      person_data[this.name] = this.value;
    });



    var jqxhr = $.post(event.target.action, JSON.stringify(person_data), 'json');

    jqxhr.done(function (response) {this.successfulPost(form, response);}.bind(this));
  },

  successfulPost: function (form, response) {
    form.reset();

    $html = $(JST['layouts/index'](response));

    var person = new PersonView(response.first_name, response.last_name, response.address, response._links.self.href, $html );

    $("[data-container=people]").append($html);
  }
};