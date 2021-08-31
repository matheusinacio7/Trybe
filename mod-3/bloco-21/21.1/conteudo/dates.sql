-- Monte uma query que exiba a diferença de dias entre '2030-01-20' e hoje.
SELECT
  DATEDIFF(CURRENT_DATE(), '2030-01-20');

-- Monte uma query exiba a diferença de horas entre '10:25:45' e '11:00:00' .
SELECT
  HOUR(TIMEDIFF('11:00:00', '10:25:45'));

SELECT
  TIMEDIFF('11:00:00', '10:25:45');
