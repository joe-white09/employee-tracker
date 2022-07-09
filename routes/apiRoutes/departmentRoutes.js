const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// shows all department names
router.get('/departments', (req, res) => {
    const sql = `select department_name from department;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});




module.exports = router;