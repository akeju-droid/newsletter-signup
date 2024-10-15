import express from "express";
import bodyParser from "body-parser";
import got from "got";
import path from "path";
import {fileURLToPath} from "url";



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const {data} = await got.post('https://httpbin.org/anything', {
// 	json: {
// 		hello: 'world'
// 	}
// }).json();

// console.log(data);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;


    (async () => {
        try {
            const options = {
                headers: {
                    "Authorization": "tunmise1 7654db8e5680ac6a8e71e72986cf5db4-us17"
                },
                json: {
                    members: [
                        {
                            email_address: email,
                            status: "subscribed",
                            merge_fields: {
                                FNAME: firstName,
                                LNAME: lastName
                            }
                        }
                    ]
                },
            };
            var baseURL = "https://us17.api.mailchimp.com/3.0/lists/6f6ab77f7b"
            const response = await got.post(baseURL, options);
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "failure.html")
            }
            console.log(response.statusCode);
            console.log(response.body);
        } catch (error) {
            console.error(error.response.statusCode);
        }
    })();
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("server is listening on port 3000");
});