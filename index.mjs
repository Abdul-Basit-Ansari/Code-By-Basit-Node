import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000


const projectSchema = new mongoose.Schema({

	title: { type: String, required: true },
	desc: { type: String },
	url: { type: String, required: true },
	createdOn: { type: Date, default: Date.now },
});
const projectModel = mongoose.model('project', projectSchema);


const skillSchema = new mongoose.Schema({

	name : { type: String, required: true },
	range: { type: Number, required: true },
	createdOn: { type: Date, default: Date.now },
});
const skillModel = mongoose.model('skill', skillSchema);
mongoose

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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})




let dbURL = 'mongodb+srv://<user-name>:<password>@cluster0.c4vgdpp.mongodb.net/?retryWrites=true&w=majority';
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


