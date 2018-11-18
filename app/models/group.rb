class Group < ApplicationRecord
  has_may :members
  has_may :users, through: :members
  validates :name, presence: true
end
