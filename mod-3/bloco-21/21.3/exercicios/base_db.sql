CREATE DATABASE IF NOT EXISTS trybe_BeeMovies;

USE trybe_BeeMovies;

CREATE TABLE movies(
    movie_id INT PRIMARY KEY auto_increment,
    ticket_price DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ticket_price_estimation VARCHAR(15),
    release_year YEAR
) engine = InnoDB;

-- alteracao para ter o operador

CREATE TABLE movies_logs(
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    executed_action VARCHAR(15) NOT NULL,
    log_date DATE NOT NULL,
    operator VARCHAR(64) NOT NULL
) engine = InnoDB;