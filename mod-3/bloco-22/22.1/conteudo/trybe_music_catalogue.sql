DROP DATABASE IF EXISTS trybe_music_catalogue;

CREATE DATABASE trybe_music_catalogue;

USE trybe_music_catalogue;

CREATE TABLE album(
  album_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  release_date DATE NOT NULL
) ENGINE = InnoDb;

CREATE TABLE genre(
  genre_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
) ENGINE = InnoDb;

CREATE TABLE artist(
  artist_id INT PRIMARY KEY AUTO_INCREMENT,
  artistic_name VARCHAR(50) NOT NULL
) ENGINE = InnoDb;

CREATE TABLE song(
  song_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  length SMALLINT NOT NULL,
  release_date DATE NOT NULL,
  genre_id INT NOT NULL,

  FOREIGN KEY (genre_id) REFERENCES genre (genre_id)
) ENGINE = InnoDb;

CREATE TABLE song_artist(
  artist_id INT NOT NULL,
  song_id INT NOT NULL,

  CONSTRAINT PRIMARY KEY (artist_id, song_id),

  FOREIGN KEY (artist_id) REFERENCES artist (artist_id),
  FOREIGN KEY (song_id) REFERENCES song (song_id)
) ENGINE = InnoDb;

CREATE TABLE album_song(
  album_id INT NOT NULL,
  song_id INT NOT NULL,

  CONSTRAINT PRIMARY KEY (album_id, song_id),

  FOREIGN KEY (album_id) REFERENCES album (album_id),
  FOREIGN KEY (song_id) REFERENCES song (song_id)
) ENGINE = InnoDb;
