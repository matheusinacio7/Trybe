CREATE DATABASE IF NOT EXISTS trybe_hotel;
-- SQL for the Cars table

USE trybe_hotel;
CREATE TABLE IF NOT EXISTS Cars(Id INTEGER PRIMARY KEY, Name VARCHAR(50),
Cost INTEGER);
INSERT INTO Cars VALUES(1,'Audi',52642);
INSERT INTO Cars VALUES(2,'Mercedes',57127);
INSERT INTO Cars VALUES(3,'Skoda',9000);
INSERT INTO Cars VALUES(4,'Volvo',29000);
INSERT INTO Cars VALUES(5,'Bentley',350000);
INSERT INTO Cars VALUES(6,'Citroen',21000);
INSERT INTO Cars VALUES(7,'Hummer',41400);
INSERT INTO Cars VALUES(8,'Volkswagen',21600);
-- SQL for the Customers, Reservations tables

USE trybe_hotel;

CREATE TABLE IF NOT EXISTS Customers(CustomerId INTEGER AUTO_INCREMENT
    PRIMARY KEY, Name VARCHAR(55));
INSERT INTO Customers(Name) VALUES('Paul Novak');
INSERT INTO Customers(Name) VALUES('Terry Neils');
INSERT INTO Customers(Name) VALUES('Jack Fonda');
INSERT INTO Customers(Name) VALUES('Tom Willis');

CREATE TABLE IF NOT EXISTS Reservations(Id INTEGER AUTO_INCREMENT
    PRIMARY KEY, CustomerId INTEGER, Day DATE);
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-11-22');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-11-28');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-11-29');
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-11-29');
INSERT INTO Reservations(CustomerId, Day) VALUES(3, '2009-12-2');

-- Creating CarSales Page
CREATE TABLE IF NOT EXISTS CarSales(CarID INTEGER PRIMARY KEY, CustomerID INTEGER);
INSERT INTO CarSales VALUES(3,1);
INSERT INTO CarSales VALUES(4,4);
INSERT INTO CarSales VALUES(5,4);
INSERT INTO CarSales VALUES(1,2);
INSERT INTO CarSales VALUES(2,2);

-- SQL for the Books table
USE trybe_hotel;

CREATE TABLE IF NOT EXISTS Books(Id INTEGER PRIMARY KEY,
    Title VARCHAR(100), Author VARCHAR(60));
INSERT INTO Books VALUES(1,'War and Peace','Leo Tolstoy');
INSERT INTO Books VALUES(2,'The Brothers Karamazov','Fyodor Dostoyevsky');
INSERT INTO Books VALUES(3,'Paradise Lost','John Milton');
INSERT INTO Books VALUES(4,'Crime and Punishment','Fyodor Dostoyevsky');
INSERT INTO Books VALUES(5,'Cousin Bette','Honore de Balzac');
INSERT INTO Books VALUES(6,'Refactorign','Martin Fowler');
INSERT INTO Books VALUES(7,'The Complete Software Developer’s Career Guide ','John Sonmez');


USE trybe_hotel;
CREATE TABLE IF NOT EXISTS Books_Lent(book_rental INTEGER AUTO_INCREMENT PRIMARY KEY, book_id INTEGER , customer_id int, rental_date datetime, rental_return_date datetime null, returned bool);
INSERT INTO Books_Lent (book_id, customer_id, rental_date, rental_return_date, returned) VALUES(1, 2, '2020-02-05', null ,0);
INSERT INTO Books_Lent (book_id, customer_id, rental_date, rental_return_date, returned) VALUES(2, 2,'2020-02-05 16:17:39', now(), true);
INSERT INTO Books_Lent (book_id, customer_id, rental_date, rental_return_date, returned) VALUES(3, 2,'2020-02-05 16:17:39',null , false);
INSERT INTO Books_Lent (book_id, customer_id, rental_date, rental_return_date, returned) VALUES(2, 2,'2020-02-05 16:17:39', now(), true);
INSERT INTO Books_Lent (book_id, customer_id, rental_date, rental_return_date, returned) VALUES(4, 2,'2020-02-05 16:17:39',now() , true);
INSERT INTO Books_Lent (book_id, customer_id, rental_date, rental_return_date, returned) VALUES(5, 2,'2020-02-05 16:17:39', null, false);
INSERT INTO Books_Lent (book_id, customer_id, rental_date, rental_return_date, returned) VALUES(4, 2,'2020-02-05 16:17:39',  now(), true);
