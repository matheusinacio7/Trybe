
SELECT * FROM Pieces;
SELECT * FROM Providers;
SELECT * FROM Provides;

-- 1
SELECT Name, Provider, Price FROM 
  (
    SELECT *
    FROM Provides
    JOIN Pieces ON Provides.Piece = Pieces.Code
    WHERE Provides.Provider = 'HAL' 
  ) AS HalPieces;

-- 2
SELECT * FROM Provides
ORDER BY Price DESC
LIMIT 5;

-- 3
SELECT Provider, Price FROM Provides
ORDER BY Price DESC
LIMIT 4
OFFSET 2;

-- 4
SELECT * FROM Provides
JOIN Pieces ON Provides.Piece = Pieces.Code
WHERE Provider = 'HAL'
ORDER BY Price DESC;

-- 5
SELECT COUNT(DISTINCT Provider) FROM 
  (
    SELECT * FROM Provides
    WHERE Piece = 1 
  ) AS ProvidersPiece1
