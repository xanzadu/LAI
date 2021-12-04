const pool = require('../db');

const getOverview = (req, res) => {
  const id = Number(req.params.id);
  pool.query(
    `SELECT * FROM overview WHERE bill_number = ${id}`,
    (error, results) => {
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).send(results.rows[0]);
      }
    }
  );
};

module.exports = {
  getOverview,
};
