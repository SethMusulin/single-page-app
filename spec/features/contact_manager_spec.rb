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

  scenario 'People can be added', js: true do
    visit '/'
    fill_in 'First Name:', :with => 'Bob'
    fill_in 'Last Name:', :with => 'Harley'
    fill_in 'Address:', :with => 'Places Here and There'
    click_on 'Create Person'

    expect(page).to have_content("Bob Harley")
    expect(page).to have_content("Places Here and There")
  end

  scenario 'People can be edited', js: true do
    Person.create(first_name: 'Joe',
                  last_name: 'Example',
                  address: 'somewhere, Lala Land')

    visit '/'
    expect(page).to have_content("Joe Example")

    within ".person-div" do
      click_on "Edit"
      within "form" do
        fill_in "First Name:", with: "Joee"
        fill_in "Last Name:", with: "Sample"
        click_on "Update Person"
      end
    end

    expect(page).to have_content("Joee Sample")
    expect(page).to have_no_content("Joe Example")

    visit page.current_url
    expect(page).to have_content("Joee Sample")
    expect(page).to have_no_content("Joe Example")
  end
end