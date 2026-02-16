import net from "net";
import crypto from "crypto";
import axios from "axios";

const server = net.createServer(socket => {

    socket.write("220 W3SMTP Ready\r\n");

    let email = null;

    socket.on("data", async data => {

        const msg = data.toString().trim();

        if (msg.startsWith("W3ID")) {
            email = msg.split(" ")[1];

            const hash = crypto
              .createHash("sha256")
              .update(email)
              .digest("hex");

            const res = await axios.get(
              `http://registry:3000/canSend/${hash}`
            );

            if (!res.data.allowed) {
                socket.write("550 Not authorized\r\n");
                socket.end();
            } else {
                socket.write("250 Authorized\r\n");
            }
        }

        if (msg === "QUIT") {
            socket.write("221 Bye\r\n");
            socket.end();
        }

    });

});

server.listen(2525);
