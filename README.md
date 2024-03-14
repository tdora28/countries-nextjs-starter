# Countries

## React/Redux Toolkit App

This project is a React application built with Vite and Redux Toolkit, aimed at providing users with a comprehensive view of countries around the world. It utilizes Firebase for authentication, Firestore for data storage, and integrates with various APIs to fetch country information, weather data, and mapping services.

### Features

- **User Authentication**: Login and authentication functionalities are provided by Firebase, ensuring secure access to the application.
- **Country Information**: Users can explore a list of countries fetched from [REST Countries](https://restcountries.com/) and view detailed information about each country.
- **Weather Information**: Weather data for each country is fetched from OpenWeatherMap API, providing users with current weather conditions.
- **Mapping Services**: Integrated Google Maps enable users to visualize the location of each country.
- **Favourites Management**: Logged-in users can save their favourite countries and view them on a dedicated Favourites page. They can also remove countries from their favourites list.
- **Redux Toolkit**: State management is handled efficiently with Redux Toolkit.
- **Styling with React Bootstrap**: The application's UI is styled using React Bootstrap, offering responsive and visually appealing components.

### Technologies Used

- Vite
- React
- Redux Toolkit
- Firebase (Authentication)
- Firestore (Data Storage)
- REST Countries API
- OpenWeatherMap API
- Google Maps API
- npm
- React Bootstrap

### Installation

1. Clone the repository
2. Install dependencies in the project directory: `npm install`
3. Create a Firebase project then set up authentication and Firestore according to the Firebase documentation.
4. Obtain API keys for REST Countries, OpenWeatherMap and Google Maps, and add them to a `.env` file.
5. Start the development server: `npm run dev`.

### Acknowledgments

This project was developed as an assignment for the React Advanced course (REACT23S) at [Business College Helsinki](https://www.bc.fi/), and it builds on the course material.
