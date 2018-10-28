# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belonhs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|email|string|null: false|
|password|string|null: false|
|message_id|integer|null: false|

### Association
- has_many :members
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: failse|

### Asociation
- has_many :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|created_at|string|null :false|


### Asociation
- belongs_to :user
- belongs_to :group


