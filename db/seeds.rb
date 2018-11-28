# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
10.times do
  User.create(
    name: Faker::Internet.username,
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    created_at: Faker::Time.between(2.days.ago,Date.today,:all),
    updated_at: Faker::Time.between(1.days.ago,Date.today,:all)
    )
end
