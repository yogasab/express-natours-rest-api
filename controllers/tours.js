const mongoose = require("mongoose");
const Tour = require("../models/Tour");

// Params Method Middleware
exports.checkID = (req, res, next, val) => {
	// if (req.params.id * 1 > tours.length) {
	// 	return res
	// 		.status(404)
	// 		.json({ status: "failed", message: "Tour not found" });
	// }
	if (!mongoose.isValidObjectId(req.params.id)) {
		res.status(404).json({ status: "Failed", message: "Invalid ID of tour" });
	}
	req.id = req.params.id;
	next();
};
exports.checkBody = (req, res, next) => {
	if (!req.body.name || !req.body.price) {
		return res.status(400).json({
			status: "failed",
			message: "Missing name or price",
		});
	}
	next();
};

exports.createTours = async (req, res) => {
	try {
		const tour = await Tour.create(req.body);
		res.status(201).json({
			status: "Success",
			data: {
				tour,
			},
		});
	} catch (error) {
		const message = error.message.split(": ");
		res.status(400).json({ status: "Failed", message: message[2] });
	}
};

exports.getTours = async (req, res) => {
	try {
		const tours = await Tour.find();
		res.status(200).json({
			status: "Success",
			results: tours.length,
			data: {
				tours,
			},
		});
	} catch (error) {
		res.status(500).json({ status: "Error" });
	}
};

exports.getTour = async (req, res) => {
	console.log(req.id);
	try {
		const tour = await Tour.findById(req.id);
		res.status(200).json({
			status: "Success",
			data: {
				tour,
			},
		});
	} catch (error) {
		res.status(404).json({ status: "Failed", message: "Tour not found" });
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "Success",
			message: "Tour updated successfully",
			data: {
				tour,
			},
		});
	} catch (error) {
		res.status(400).json({ status: "Failed", message: error.message });
	}
};

exports.deleteTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndDelete(req.id);
		res
			.status(204)
			.json({ status: "Success", message: "Tour deleted successfully" });
	} catch (error) {
		res.status(400).json({ status: "Failed", message: error.message });
	}
};
