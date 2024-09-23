import express from "express";
import Person from "../models/person.js"; // assuming person.js is the file containing the schema
import authenticateToken from "../middleware/authentication.js";

const router = express.Router();

// CREATE a new person
router.post("/add", authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { first_name, last_name, date_of_birth, cnic } = req.body;

        // Check if the person already exists for this user
        const existingPerson = await Person.findOne({ user: user_id });
        if (existingPerson) {
            return res.status(400).json({ message: "Person already exists for this user." });
        }

        const newPerson = new Person({
            first_name,
            last_name,
            date_of_birth,
            cnic,
            user: user_id,
        });

        const savedPerson = await newPerson.save();
        res.status(201).json({message: "Person added successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all persons
router.get("/persons", async (req, res) => {
    try {
        const persons = await Person.find().populate('user');
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single person by ID
router.get("/person/:id", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id).populate('user');
        if (!person) return res.status(404).json({ message: "Person not found" });

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a person by ID
router.put("/person/:id", async (req, res) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        if (!updatedPerson)
            return res.status(404).json({ message: "Person not found" });

        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a person by ID
router.delete("/person/:id", async (req, res) => {
    try {
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);
        if (!deletedPerson)
            return res.status(404).json({ message: "Person not found" });

        res.status(200).json({ message: "Person deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;