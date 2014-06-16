function PersonView(firstName, lastName, address, url, $personDiv) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.url = url;
  this.$personDiv = $personDiv;

  $personDiv.on("click", "[data-behavior=edit-person]", this.clickedEdit.bind(this));
  $personDiv.on("submit", "[data-behavior=update-person]", this.clickedEditSubmit.bind(this));
}

PersonView.prototype.clickedEdit = function () {
  event.preventDefault();
  $(this.$personDiv).html(JST['layouts/edit'](this));
};

PersonView.prototype.clickedEditSubmit = function () {
  event.preventDefault();

  var form = event.target;

  var person_data = {};
  $.each(form, function () {
    person_data[this.name] = this.value;
  });

  var jqxr = $.ajax({
      type: "PATCH",
      url: form.action,
      data: JSON.stringify(person_data),
      dataType: 'json'
    }
  )

  jqxr.done(function (response) {
    var $html = $(JST['layouts/index'](response));

    $(this.$personDiv).html($html);
  }.bind(this));

};



//  var jqxhr = $.post(event.target.action, JSON.stringify(person_data), 'json');
//
//  jqxhr.done(function (response) {this.successfulPost(form, response);}.bind(this));
//},
//
//successfulPost: function (form, response) {
//  form.reset();
//
//  $html = $(JST['layouts/index'](response));
//
//  var person = new PersonView(response.first_name, response.last_name, response.address, response._links.self.href, $html );
//
//  $("[data-container=people]").append($html);
//}
//}