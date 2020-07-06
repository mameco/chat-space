# README

## usersテーブル

|Column|Type|Option|
|------|----|------|
|username|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups, through: :groups_users
- has_many :messages

## groupsテーブル

|Column|Type|Option|
|------|----|------|
|group_name|string|null: false, unique: true|

### Association
- has_many :users,　through: :groups_users
- has_many :comments

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Option|
|------|----|------|
|text|text|null: false|
|image|string||
|groups_users_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group