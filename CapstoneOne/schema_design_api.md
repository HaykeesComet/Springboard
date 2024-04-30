# Schema Design and API Selection

## Project Overview

### Project Name: Drink Up! - Cocktail Search Application

### Project Description:

The Drink Up! Cocktail Search Application is a web-based platform designed to allow users to search for cocktails using an external Cocktails API. Users can input the name of a cocktail they are interested in, and the application will display a list of matching cocktails along with their names and images. Additionally, users can click on a cocktail to view more detailed information about it.

## Schema Design

### Entities:

1. **Cocktail**

   - Attributes:
     - Cocktail ID (Primary Key)
     - Name
     - Image URL
     - Ingredients
     - Instructions

### Functionality:

- Each User can perform searches and view cocktails.

## Technology and API Selection

### Frontend Technologies:

- HTML and CSS for content and structure
- Vanilla JavaScript for dynamic client-side experience

### Backend Technologies:

- JWT for authentication
- Cocktails API (e.g., TheCocktailDB API) for cocktail data

### API:

1. **Cocktail API**

   - Endpoints:
     - GET /api/cocktails - Get all cocktails
     - GET /api/cocktails/:cocktailID - Get cocktail details
     - POST /api/cocktails - Add a new cocktail
     - PUT /api/cocktails/:cocktailID - Update cocktail details
     - DELETE /api/cocktails/:cocktailID - Delete a cocktail

## Conclusion

This schema design and API selection aim to provide a scalable and user-friendly solution for the Drink Up! Cocktail Search Application. By leveraging HTML, CSS, Vanilla JavaScript, JWT, and an external Cocktails API, the application can provide users with a seamless experience for searching and exploring various cocktails.
