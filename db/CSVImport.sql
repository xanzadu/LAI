\c bills;

-- Overivew
\COPY overview FROM 'db/bills.csv' WITH DELIMITER ',' CSV HEADER NULL AS 'null';