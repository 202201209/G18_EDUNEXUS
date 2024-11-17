const pool = require("../config/db");

// Takes CID from the req params and sending back all the note links in JSON format.

const courseNotes = async (req, res) => {
    const { CID } = req.params;

    try {
        // Query to fetch the note_links
        const { rows } = await pool.query('SELECT note_link FROM Notes WHERE CID = $1', [CID]);

        // If there are no entries then: 
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Notes are not found for this particular course' });
        }

        res.json({ notes: rows });
    } catch (error) {
        console.error('Error during querying the database:', error);
        res.status(500).json({ error: 'Error in the server side!' });
    }
};

module.exports = {courseNotes}
