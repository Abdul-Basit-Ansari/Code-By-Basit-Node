import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 7000


// Data baseSchema



const projectSchema = new mongoose.Schema({

	title: { type: String, required: true },
	desc: { type: String },
	url: { type: String, required: true },
	createdOn: { type: Date, default: Date.now }

});


const skillSchema = new mongoose.Schema({

	name : { type: String, required: true },
	range: { type: Number, required: true },
	createdOn: { type: Date, default: Date.now }

});


const contactSchema = new mongoose.Schema({

	name : { type: String, required: true },
	email: { type: String },
	phone: { type: String, required: true },
	desc: { type: String, required: true },
	createdOn: { type: Date, default: Date.now }

});


const feedbackSchema = new mongoose.Schema({
    
	name : { type: String, required: true },
	desc : { type: String, required: true },
	createdOn: { type: Date, default: Date.now }

});




// Database Models

const projectModel = mongoose.model('project', projectSchema);

const skillModel = mongoose.model('skill', skillSchema);

const contactModel = mongoose.model('contact', contactSchema);

const feedbackModel = mongoose.model('feedback', feedbackSchema);



// start project rout



app.get("/project/:id" , async (req , res) =>{ 
	let _id = req.params.id;
    let body = req.body;

    try {
		let project = await projectModel
        .findOne({_id:_id})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting all projects" });
            return
        })

    res.send({
        message: "all projects success ",
        data: project
    });
// });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})
app.get("/projects" , async (req ,res) =>{

	let project = await projectModel
        .find({})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting all project" });
            return
        })

    res.send({
        message: "all project success ",
        data: project
    });
});


app.post("/projects", async (req, res) => {





	let body = req.body;

	if (!body.title
		|| !body.desc
		|| !body.url
	) {
		res.status(400).send(
			`required fields missing, request example: 
                {
                    "title": "This Is Demo Title",
                    "desc": "This Is Demo Desc",
                    "url": "https://*****.com",
                }`
		);
		return;
	}


	


	let project = await projectModel.create({

        title: body.title,
        desc: body.desc,
        url: body.url,

    }).catch(e => {
        console.log("error in db: ", e);
        res.status(500).send({ message: "db error in saving prroject" });
    })

    console.log("project: ", project);
    res.send({ message: "project is added in database" });
});


app.delete("/project/:id", async (req, res) => {

    let _id = req.params.id;

    try {
        const project = await projectModel.findByIdAndDelete(_id);
        console.log("Deleted project: ", project);
        res.send({
            message: "deleted"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }



})


app.put("/project/:id", async (req, res) => {

    let _id = req.params.id;
    let body = req.body;

    try {
        const project = await projectModel.findByIdAndUpdate(_id, body);
        console.log("updated project: ", project);
        res.send({
            message: "updated"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})






// start skill rout 









app.get("/skill/:id" , async (req , res) =>{ 
	let _id = req.params.id;
    let body = req.body;

    try {
		let skill = await skillModel
        .findOne({_id:_id})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting skill" });
            return
        })

    res.send({
        message: "skill success ",
        data: skill
    });
// });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})
app.get("/skills" , async (req ,res) =>{

	let skill = await skillModel
        .find({})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting all skills" });
            return
        })

    res.send({
        message: "all skills success ",
        data: skill
    });
});


app.post("/skills", async (req, res) => {





	let body = req.body;

	if (!body.name || !body.range ) {
		res.status(400).send(
			`required fields missing, request example: 
                {
                    "name": "My Demo Skill",
                    "range": 75,
                }`
		);
		return;
	}


	


	let skill = await skillModel.create({

        name : body.name,
        range : body.range,

    }).catch(e => {
        console.log("error in db: ", e);
        res.status(500).send({ message: "db error in saving skill" });
    })

    console.log("skill: ", skill);
    res.send({ message: "skill is added in database" });
});


app.delete("/skill/:id", async (req, res) => {

    let _id = req.params.id;

    try {
        const skill = await skillModel.findByIdAndDelete(_id);
        console.log("Deleted skill: ", skill);
        res.send({
            message: "deleted"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }



})


app.put("/skill/:id", async (req, res) => {

    let _id = req.params.id;
    let body = req.body;

    try {
        const skill = await skillModel.findByIdAndUpdate(_id, body);
        console.log("updated skill: ", skill);
        res.send({
            message: "updated"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})









// start contactus rout






app.get("/contact/:id" , async (req , res) =>{ 
	let _id = req.params.id;
    let body = req.body;

    try {
		let contact = await contactModel
        .findOne({_id:_id})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting contact messages" });
            return
        })

    res.send({
        message: "contact send success ",
        data: contact
    });
// });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})
app.get("/contacts" , async (req ,res) =>{

	let contact = await contactModel
        .find({})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting all contact messages" });
            return
        })

    res.send({
        message: "all contacts message success ",
        data: contact
    });
});








app.post("/contacts", async (req, res) => {




	let body = req.body;

	if (!body.name || !body.phone || !body.desc ) {
		res.status(400).send(
			`required fields missing, request example: 
                {
                    "name": "My Demo Name",
                    "email": "mydemoemail@gmail.com",
                    "phone": "example number",
                    "desc": "My Demo Desc",
                }`
		);
		return;
	}


	

	let contact = await contactModel.create({

        name : body.name,
        email : body.email,
        phone : body.phone,
        desc : body.desc

    }).catch(e => {
        console.log("error in db: ", e);
        res.status(500).send({ message: "db error in saving contact message" });
    })

    console.log("contact: ", contact);
    res.send({ message: "contact is added in database" });
});












app.delete("/contact/:id", async (req, res) => {

    let _id = req.params.id;

    try {
        const contact = await contactModel.findByIdAndDelete(_id);
        console.log("Deleted contact: ", contact);
        res.send({
            message: "Contact Message Is Deleted"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }



})


app.put("/contact/:id", async (req, res) => {

    let _id = req.params.id;
    let body = req.body;

    try {
        const contact = await contactModel.findByIdAndUpdate(_id, body);
        console.log("updated contact: ", contact);
        res.send({
            message: "Contact Message Is Updated"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})










// start feedback rout





app.get("/feedback/:id" , async (req , res) =>{ 
	let _id = req.params.id;
    let body = req.body;

    try {
		let feedback = await feedbackModel
        .findOne({_id:_id})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting feedback" });
            return
        })

    res.send({
        message: "feddback success ",
        data: feedback
    });
// });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})
app.get("/feedbacks" , async (req ,res) =>{

	let feedback = await feedbackModel
        .find({})
        .exec()
        .catch(e => {
            console.log("error in db: ", e);
            res.status(500).send({ message: "error in getting all feddback" });
            return
        })

    res.send({
        message: "all feedback messages success ",
        data: feedback
    });
});


app.post("/feedbacks", async (req, res) => {





	let body = req.body;

	if (!body.name || !body.desc ) {
		res.status(400).send(
			`required fields missing, request example: 
                {
                    "name": "My Demo Name",
                    "desc": "My Demo Descreption",
                }`
		);
		return;
	}


	


	let feedback = await feedbackModel.create({

        name : body.name,
        desc : body.desc,

    }).catch(e => {
        console.log("error in db: ", e);
        res.status(500).send({ message: "db error in saving feedback message" });
    })

    console.log("feedback: ", feedback);
    res.send({ message: "feedback message is added in database" });
});


app.delete("/feedback/:id", async (req, res) => {

    let _id = req.params.id;

    try {
        const feedback = await feedbackModel.findByIdAndDelete(_id);
        console.log("Deleted feedback: ", feedback);
        res.send({
            message: "feedback message deleted"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }



})


app.put("/feedback/:id", async (req, res) => {

    let _id = req.params.id;
    let body = req.body;

    try {
        const feedback = await feedbackModel.findByIdAndUpdate(_id, body);
        console.log("updated feedback: ", feedback);
        res.send({
            message: "feedback message updated"
        });
        return;

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "db error"
        })
    }
})




















let userName = 'abdulbasit' ;  
let password = 'mo2881928' ;  
let otherUrl = '@cluster0.c4vgdpp.mongodb.net/?retryWrites=true&w=majority' ;  

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})



let dbURL = `mongodb+srv://${userName}:${password}${otherUrl}`;
mongoose.connect(dbURL);

mongoose.connection.on('connected', function () {
	console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
	console.log("Mongoose is disconnected");
	process.exit(1);
});

mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ', err);
	process.exit(1);
});

process.on('SIGINT', function () {
	console.log("app is terminating");
	mongoose.connection.close(function () {
		console.log('Mongoose default connection closed');
		process.exit(0);
	});
});


