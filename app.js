const http = require("http");
const PORT = process.env.PORT || 5999;
const { getReqData } = require("./util");
const {
    Email,
} = require("./api");
const { BadRequestError, NotFoundError, ApiError } = require("./util/apiErrors");

const server = http.createServer(async (req, res) => {
    if (req.url === "/api" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("v1");
        res.end();
    }

    if (req.url.match(/\/api\/email(\/)?/) && req.method === "POST") {
        // TODO: handle getReqData errors.
        const email_data = await getReqData(req);
        
        let email;
        let result;
        try {
            email = await new Email().createEmail(JSON.parse(email_data));
            result = await email.send();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        } catch(e) {
            if (e instanceof BadRequestError || e instanceof ApiError) {
                res.writeHead(e.status_code, { "Content-Type": "application/json" });
                res.end(e.message);
            } else {
                const genericError = new ApiError();
                res.writeHead(genericError.status_code, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: genericError.message }));
            }
        }
    }
    else {
        const err = new NotFoundError();
        res.writeHead(err.status_code, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: err.message }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
