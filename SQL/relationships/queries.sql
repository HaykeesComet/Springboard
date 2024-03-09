-- first query
SELECT * FROM owners o 
FULL JOIN vehicles v 
ON o.id=v.owner_id;

-- second query
SELECT first_name, last_name, COUNT(*) AS no_cars 
FROM owners JOIN vehicles ON owners.id = vehicles.owner_id 
GROUP BY owners.id ORDER BY no_cars;


-- third query
SELECT first_name, last_name, ROUND(AVG(price)) AS average_price, COUNT(*) AS no_cars 
FROM owners JOIN vehicles ON owners.id = vehicles.owner_id GROUP BY owners.id 
HAVING COUNT(*) > 1 AND ROUND(AVG(price)) > 10000 ORDER BY first_name DESC;