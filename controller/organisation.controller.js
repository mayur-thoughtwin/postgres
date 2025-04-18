const { pool, closePool } = require("../connection/db");

const createOrganisation = async (req, res) => {
    const { name, description } = req.body;

    try {
        const checkDataQuery = `SELECT * FROM organizations WHERE name = $1`;
        const checkResult = await pool.query(checkDataQuery, [name]);

        if (checkResult.rows.length > 0) {
            return res.status(400).json({ msg: "Organization already exists" });
        }

        const insertQuery = `INSERT INTO organizations (name, description) VALUES ($1, $2) RETURNING *`;
        const insertResult = await pool.query(insertQuery, [name, description]);

        return res.status(201).json({
            msg: "Organization created successfully",
            organization: insertResult.rows[0],
        });
    } catch (error) {
        console.error("Error in createOrganisation:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const getAllOrganizations = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM organizations ORDER BY id");
        res.status(200).json({ organizations: result.rows });
        closePool();
    } catch (error) {
        console.error("Error fetching organizations:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const updateOrganization = async (req, res) => {
    const { id, name, description } = req.body;

    try {
        const checkNameQuery = `
            SELECT id 
            FROM organizations 
            WHERE name = $1 AND id != $2`;
        
        const checkResult = await pool.query(checkNameQuery, [name, id]);

        if (checkResult.rowCount > 0) {
            return res.status(400).json({ msg: "Already exists" });
        }
        const updateQuery = `
            UPDATE organizations 
            SET name = $1, description = $2 
            WHERE id = $3 
            RETURNING *`;
        
        const result = await pool.query(updateQuery, [name, description, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Organization not found" });
        }

        res.status(200).json({
            msg: "Organization updated successfully",
            organization: result.rows[0],
        });
    } catch (error) {
        console.error("Error updating organization:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const deleteOrganization = async (req, res) => {
    const { id } = req.params;

    try {
        // if (!id) {
        //     res.status(400).json({msg:"id is required"})
        // }
        const deleteQuery = `UPDATE organizations 
            SET delete_flag = 1 WHERE id = $1 RETURNING *`;
        const result = await pool.query(deleteQuery, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Organization not found" });
        }

        res.status(200).json({
            msg: "Organization deleted successfully",
            organization: result.rows[0],
        });
    } catch (error) {
        console.error("Error deleting organization:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { createOrganisation ,
    getAllOrganizations ,
    updateOrganization,
    deleteOrganization};
