const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

module.exports.addWorkout = async(req, res) => {
	try{
		let newWorkout = new Workout ({
			userId: req.user.id,
			name: req.body.name,
			duration: req.body.duration,
		})
		const savedWorkout =  await newWorkout.save();
		return res.status(201).json({
			success: true,
			message: "Workout added"
		});

	}catch(error){
		return errorHandler(error, req, res);
	}
}

module.exports.getMyWorkouts = async(req, res) => {
	try{
		const foundWorkouts = await Workout.find({ userId: req.user.id })
		res.status(200).json({
			success: true,
			workouts: foundWorkouts
		})
	}catch(error){
		return errorHandler(error, req, res);
	}
}

module.exports.updateWorkout = async(req, res) => {
	try{
		let workoutUpdate = {
			name: req.body.name,
			duration: req.body.duration,
			lastUpdated: Date.now()
		}
		const updatedWorkout = await Workout.findByIdAndUpdate(req.params.workoutId, workoutUpdate, { new: true })
		if(!updatedWorkout){
			return res.status(404).json({ message: "Workout not found" })
		}else{
			return res.status(200).json({
				success: true,
				message: "Workout updated successfully",
				updatedWorkout: updatedWorkout
			});
		}
	}catch(error){
		return errorHandler(error, req, res);
	}
}

module.exports.deleteWorkout = async(req, res) => {
	try{
		const deletedWorkout = await Workout.deleteOne({ _id: req.params.workoutId });
		if(deletedWorkout.deletedCount === 0){
			return res.status(404).json({ message: "Workout not found" });
		}else{
			return res.status(200).json({
				success: true,
				message: "Workout deleted successfully"
			});
		}
	}catch(error){
		return errorHandler(error, req, res);
	}
}

module.exports.completeWorkout = async(req, res) => {
	try{
		const completedWorkout = await Workout.findByIdAndUpdate(req.params.workoutId, { status: "completed" }, { new: true });
		if(!completedWorkout){
			return res.status(404).json({ message: "Workout not found" });
		}else{
			return res.status(200).json({
				success: true,
				message: "Workout status updated successfully",
				completedWorkout: completedWorkout
			})
		}
	}catch(error){
		return errorHandler(error, req, res);
	}
}