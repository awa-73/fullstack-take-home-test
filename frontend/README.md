# Task Implementation Documentation

This project has the following functionalities:
- Ability to view all books
- Ability to search books 
- Ability to add a book to reading list 
- Ability to view your reading list 
- Ability to remove a book from the reading list 
- Tests for the different components

For simplicity the reading list is stored in context state

## Running the application
- Follow the instructions on the main README.md file before proceeding 
- While in the root directory, run `npm install` to install dependencies 
- To start the application run `npm start` 
- Access the application through the url [http://localhost:3000](http://localhost:3000)


## Initial display

### Main dashboard 

This consists of the following functionalities:
- A grid view of all books , paginated.
- An option to change the pagination.
- An option to navigate to the next or previous page.
- A searchbar to search for a specific book.
- Each of the books listed on the grid has a button to add to reading list.
- A navbar that consists of the name ELLO and a button to link one to the reafing list.

### Search 

- Displays a dropdown of books 
- Each book has an image and a button to add to reading list 
  
### Reading List

- A grid view of all books that have been selected for reading list  

