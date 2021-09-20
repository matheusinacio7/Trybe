USE sakila;

SELECT DISTINCT last_name FROM actor;

SELECT * FROM actor
ORDER BY last_name, first_name DESC;

SELECT * FROM language
WHERE name != 'English';

SELECT title, description, release_year, rental_duration, rating, rental_rate FROM film
ORDER BY rental_duration DESC, rental_rate
LIMIT 20;

SELECT * FROM 
  (
    SELECT title, description, release_year, rental_duration, rating, rental_rate FROM film LIMIT 20
  ) AS T1
ORDER BY rental_duration DESC, rental_rate;

