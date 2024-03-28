### Conceptual Exercise

Answer the following questions below:

#### What is PostgreSQL?

- PostgreSQL is a powerful, open-source, object-relational database management system (DBMS) that uses and extends the SQL language. It is known for its reliability, scalability, and extensive feature set, making it popular for various types of applications and industries.

#### What is the difference between SQL and PostgreSQL?

- SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. PostgreSQL, on the other hand, is a specific database management system that implements SQL along with additional features and extensions. SQL is a language specification, while PostgreSQL is an actual database software that adheres to that specification.

#### In `psql`, how do you connect to a database?

- In psql, you can connect to a database using the following command:
- psql -U username -d database_name -h hostname
- Replace username with your PostgreSQL username, database_name with the name of the database you want to connect to, and hostname with the host where PostgreSQL is running (usually localhost if it's on the same machine).

#### What is the difference between `HAVING` and `WHERE`?

- The WHERE clause is used to filter rows before grouping them in an SQL query, while the HAVING clause is used to filter groups after they have been formed by the GROUP BY clause. In simpler terms, WHERE is applied to individual rows, whereas HAVING is applied to groups of rows.

#### What is the difference between an `INNER` and `OUTER` join?

- An INNER JOIN returns only the rows that have matching values in both tables being joined based on the specified condition. An OUTER JOIN includes rows from one or both tables even if there is no match based on the join condition. OUTER JOIN can be further divided into LEFT OUTER JOIN and RIGHT OUTER JOIN.

#### What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?

- In a LEFT OUTER JOIN, all rows from the left table (first table mentioned in the join) are included, along with matching rows from the right table. In a RIGHT OUTER JOIN, all rows from the right table are included, along with matching rows from the left table. The choice between LEFT and RIGHT depends on which table's data you want to prioritize in the result set.

#### What is an ORM? What do they do?

- ORM (Object-Relational Mapping) is a programming technique used to convert data between incompatible type systems (e.g., object-oriented programming languages and relational databases). ORM frameworks automate the mapping between database tables and object-oriented models, allowing developers to work with database data in an object-oriented manner without writing raw SQL queries.

#### What are some differences between making HTTP requests using AJAX and from the server side using a library like `requests`?

- AJAX (Asynchronous JavaScript and XML) allows making HTTP requests from the client-side asynchronously, typically using JavaScript. It enables updating parts of a web page without reloading the entire page.
- Using a library like requests in server-side code (e.g., Python with Flask) allows making HTTP requests from the server to external resources or APIs. This is commonly used for tasks such as fetching data, processing requests, and interacting with other web services.

#### What is CSRF? What is the purpose of the CSRF token?

- CSRF (Cross-Site Request Forgery) is a type of web security vulnerability where an attacker tricks a user's browser into executing unauthorized actions on a website that the user is logged into. The purpose of a CSRF token is to mitigate this vulnerability by including a unique token in each form submission or request, which the server verifies to ensure that the request is legitimate and not forged.

#### What is the purpose of `form.hidden_tag()`?

- In Flask (a Python web framework), form.hidden_tag() is used to generate a hidden input field containing a CSRF token. This token helps protect against CSRF attacks by verifying the authenticity of form submissions. Including this hidden tag in forms ensures that the CSRF token is submitted along with the form data for validation on the server side.
