require 'rails_helper'

feature 'The one-page contact manager app' do

  scenario 'The homepage loads', js: true do
    visit '/'
    expect(page).to have_title("Contact Manager")
  end

  scenario 'People are printed on the home page', js: true do
    Person.create(first_name: 'Joe',
                  last_name: 'Example',
                  address: 'somewhere, Lala Land')
    Person.create(first_name: 'Edna',
                  last_name: 'Example',
                  address: 'somewhere, Lala Land')

    visit '/'
    expect(page).to have_content("Joe Example")
    expect(page).to have_content("somewhere, Lala Land")
    expect(page).to have_content("Edna Example")
  end

end