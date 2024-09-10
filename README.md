<div align='center'><img style="width:15%" src='Frontend/public/logo.png'/></div>

# About the project

**BiletFest** is a platform where tickets are sold for various events, such as festivals, concerts or stand-up comedy shows.

<h1>Technologies used:</h1>
<h2>Frontend:</h2>

   - **React:** Utilized for building the user interface, including the **useReducer** hook for state management.
   - **TailwindCSS:** Used for styling the application with utility-first CSS.
   - **Integrations:**
       * **EmailJS:** Implemented for sending emails directly from the client-side.
       * **Stripe:** Integrated for handling secure payment processing.
   - **Other Tools:**
       * **Axios:** Used for making HTTP requests to the backend.
       * **qrcode.React**: Used for generating and displaying QR codes.

<h2>Backend:</h2>

   - **.NET (C#):** Developed RESTful APIs to handle the application's server-side logic.
   - **EntityFrameworkCore:** Used as an Object-Relational Mapper (ORM) to interact with the SQL database.
   - **SQL:** Chosen as the database for data storage and retrieval.

<h1>Presentation images:</h1>
<h3>Home page</h3>
<img src="https://i.imgur.com/emOKPXc.png" />
<h4>On the main page we have cards to navigate to events (Festivals, Concerts, Stand-Up Comendy) and a banner where you can subscribe to the newsletter. After subscribing to the newsletter, you will receive this email:</h4>
<img src="https://i.imgur.com/Cqvn3Nk.png"/>
<h4>Next, we will choose to see all the festivals:</h4>
<img src="https://i.imgur.com/nj2q5oE.png" />
<h4>Let's choose Beach, Please Festival! and let's see the presentation page of the festival, I added some tickets and applied a discount code:</h4>
<img src="https://i.imgur.com/v4RtEAu.png" />
<h4>Now let's go to the checkout page:</h4>
<img src="https://i.imgur.com/HkDjgvP.png" />
<h4>Now we have to pay, the payment will be made using Stripe, we have a test card (4242 4242 42424 4242 / ANY CVV / ANY EXPIRE DATE):</h4>
<img src="https://i.imgur.com/apiskR8.png" />
<h4>After the payment was made successfully we will be redirected to the order confirmation page where we can see all the tickets we bought:</h4>
<img src="https://i.imgur.com/21fdBXZ.png" />
<h4>We will also receive an email with the order:</h4>
<img src="https://i.imgur.com/xwnuaCD.png" />
<h4>We also have an admin panel where you can check if the ticket is valid, you can add a new festival or a new voucher code:</h4>
<img src="https://i.imgur.com/UTfTYKP.png" />

<h2>New Features in This Project:</h2>

- **useReducer Hook:** Implemented for more complex state management in React, allowing for better handling of multiple state transitions.
- **Stripe and EmailJS Integrations:** Integrated Stripe for secure payment processing and EmailJS for sending emails directly from the client-side.
- **QR Code Generation API:** Added a feature for generating and displaying QR codes using an API.
- **.NET and EntityFrameworkCore:** Developed RESTful APIs using .NET and EntityFrameworkCore for more robust server-side logic and database interactions.
- **Database Relationships in SQL:** Utilized relational database management by establishing and managing relationships between SQL tables.
