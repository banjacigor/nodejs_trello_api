# Trello API

Trello API

# How to run

To run a local instance

    npm run dev

# API Usage

Here's an API overview:

| Description                    | Method   | Endpoint                                    |
| :----------------------------- | :------- | :------------------------------------------ |
| Create member                  | `POST`   | `/1/members`                                |
| Login member                   | `POST`   | `/1/members/login`                          |
| Logout member                  | `POST`   | `/1/members/logout`                         |
| Get member by ID               | `GET`    | `/1/members/{id}`                           |
| Update member                  | `PUT`    | `/1/members/{id}`                           |
| Delete member                  | `DELETE` | `/1/members/{id}`                           |
| Create a new board             | `POST`   | `/1/boards`                                 |
| Get a board                    | `GET`    | `/1/boards/{id}`                            |
| Delete a board                 | `DELETE` | `/1/boards/{id}`                            |
| Create a new list              | `POST`   | `/1/lists`                                  |
| Get a list                     | `GET`    | `/1/lists/{id}`                             |
| Update a list                  | `PUT`    | `/1/lists/{id}`                             |
| Get cards in a list            | `GET`    | `/1/lists/{id}/cards`                       |
| Get the board a list is on     | `GET`    | `/1/lists/{id}/board`                       |
| Move list to board             | `PUT`    | `/1/lists/{id}/idBoard`                     |
| Move all cards in list         | `POST`   | `/1/lists/{id}/moveAllCards`                |
| Create a new card              | `POST`   | `/1/cards`                                  |
| Get a card                     | `GET`    | `/1/cards/{id}`                             |
| Update a card                  | `PUT`    | `/1/cards/{id}`                             |
| Add new comment to a card      | `POST`   | `/1/cards/{id}/actions/comments`            |
| Add a member to a card         | `POST`   | `/1/cards/{id}/idMembers`                   |
| Delete a comment on a card     | `DELETE` | `/1/cards/{id}/actions/{idAction}/comments` |
| Delete a member from a card    | `DELETE` | `/1/cards/{id}/idMembers/{idMember}`        |
| Delete a card and its comments | `DELETE` | `/1/cards/{id}`                             |
