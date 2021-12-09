const pool = require('../db');

const getOverview = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT bill_id, bill_number, status_date, title, description FROM overview WHERE bill_number LIKE '${id}%'`,
    (error, results) => {
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).send(results.rows);
      }
    }
  );
};

module.exports = {
  getOverview,
};
