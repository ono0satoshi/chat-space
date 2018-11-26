FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image Rack::Test::UploadedFile.new(File.join(Rails.root, 'test/fixtures/cat1.png'))
    user
    group
  end
end
