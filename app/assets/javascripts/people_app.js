window.PeopleApp = {

  initialize: function (path) {
    $.getJSON(path, this.printAllPeople);
    $(document).on("submit", "[data-behavior=create-person]", this.addPersonForm.bind(this));
  },

  printAllPeople: function (response) {
    $("[data-container=main]").append(JST['layouts/new']({url: response._links.self.href}));


    $.each(response._embedded.people, function(){
      $("[data-container=people]").append(JST['layouts/index'](this));
    });
  },

  addPersonForm: function (event) {
    event.preventDefault();

    var person_data = {};
    $.each(event.target, function(){
      person_data[this.name] = this.value;
    });
    var form = event.target
    form.reset();
    $.post(event.target.action, JSON.stringify(person_data), this.successfulPostOrNot,'json');
  },

  successfulPostOrNot: function (response) {
    $("[data-container=people]").append(JST['layouts/index'](response));

    //if response is the stuff we inputed the it's successful
    //then we append
    //if it's an error or something it's not
  }
};