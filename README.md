# Invoice App Solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl).

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Key Features](#key-features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Features Added](#features-added)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Create, read, update, and delete invoices.
- Receive form validations when trying to create/edit an invoice.
- Save draft invoices and mark pending invoices as paid.
- Filter invoices by status (draft/pending/paid).
- Toggle light and dark mode.
- Download invoices as PDF files.
- **Bonus**: Keep track of any changes, even after refreshing the browser, using persistent data storage.

### Key Features

- **Login and Registration**: Secure user authentication and personalized invoice management.
- **Responsive Design**: Optimized for various screen sizes.
- **PDF Generation**: Users can download invoices as PDF files.
- **Data Persistence**: Backend support for invoice management and user accounts using MongoDB.

### Screenshot

![App Screenshot](/public/icons/screenshot.png)

### Links

- **Solution URL**: [GitHub Repository](https://github.com/margaux-works/invoice-app-client)
- **Live Site URL**: [Live Demo](https://margaux-works.github.io/invoice-app-client/welcome)

## My Process

### Built With

- **Frontend**: Angular, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **PDF Generation**: pdfMake library
- **Responsive Design**: Tailwind CSS utilities

### Features Added on the top of the challenge

- Secure login and registration feature, enhancing user-specific invoice management.
- PDF invoice downloads using the pdfMake library.
- Backend implementation for managing user accounts and invoices with MongoDB.

### What I Learned

This project helped solidify my understanding of full-stack development, especially:

- Building modular, standalone components in Angular.
- Managing data flow between frontend and backend using RESTful APIs.
- Implementing responsive design with Tailwind CSS.
- Integrating third-party libraries like pdfMake for advanced functionalities.

#### Code Snippet

Here’s an example of generating a PDF using pdfMake:

```typescript
const generatePDF = (invoice: Invoice) => {
  const documentDefinition = {
    content: [
      { text: `Invoice #${invoice.id}`, style: "header" },
      { text: `Amount: ${invoice.amount}`, style: "subheader" },
    ],
  };
  pdfMake.createPdf(documentDefinition).download(`invoice_${invoice.id}.pdf`);
};
```

### Continued Development

In future projects, I aim to:

- Integrate OAuth for third-party login options.
- Optimise PDF creation with company logo.

### Useful Resources

- [Angular Documentation](https://angular.io/docs): Essential for understanding Angular concepts.
- [pdfMake Documentation](https://pdfmake.github.io/docs/0.1/): For generating PDFs dynamically.
- [Tailwind CSS](https://tailwindcss.com/): A fantastic utility-first CSS framework.

## Author

- **Frontend Mentor**: [@margaux-works](https://www.frontendmentor.io/profile/margaux-works)
- **GitHub**: [margaux-works](https://github.com/margaux-works)

## Acknowledgments

Special thanks to Frontend Mentor for providing this challenge, and to the developers behind pdfMake for their intuitive library. I also appreciate feedback my mentor Faizal through the development process.
