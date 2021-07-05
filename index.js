/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import { plc_config_JSON } from "./conf/config.js";
import { connections } from "./conf/connections.js";
import { S7PLC, createS7Connection, createHttpServer, attachWSServer } from "./lib/index.js";

// ===== create a VPLC server
const s7plc = new S7PLC(plc_config_JSON);
s7plc.on("event", (event) => {
    console.log(s7plc.EventText(event));
});
s7plc.on("read", (tagObj, buffer) => {
    console.log("read ret: ", buffer);
})
s7plc.on("write", (tagObj, buffer) => {
    console.log("write: ", buffer);
})
s7plc.start_serve();

// ===== create HTTP Server for HMI serve and create WebSocket Server for JSON serve
const host = "0.0.0.0"; // plc_config_JSON.host;
const port = plc_config_JSON.port;
const httpserver = createHttpServer();
attachWSServer(httpserver, s7plc);
httpserver.listen(port, host, () => {
    console.log(`HTTP Server is running on http://${host}:${port}`);
});

// ===== create S7TcpClient to send and receive S7PLC data
const conn_options = connections[0];
const client = createS7Connection(
    s7plc.get_mem(...conn_options.send).buffer,
    s7plc.get_mem(...conn_options.receive).buffer,
    conn_options
);

let timeout = { _destroyed: true },
    delay = 4000;
function delay_connect() {
    if (timeout._destroyed) timeout = setTimeout(() => {
        client.connect(conn_options);
        console.log("try connect to ", conn_options.host, conn_options.port);
    }, delay);
    delay = delay < 300000 ? delay * 2 : 300000;
}
client.on('connect', () => {
    console.log("connect the ESD-JS-AS!", conn_options.name);
    client.cyclic_send(1000);
})
client.on('data', (data) => {
    // 连接成功，接收 data
    client.receive(data);
});
client.on("end", function () {
    console.log("data end");
})
client.on("error", function (err) {
    console.log("can't connect.");
    delay_connect();
    this.stop_send();
})
client.on("close", function () {
    console.log("connection closed");
    this.stop_send();
    client.destroy();
    delay_connect();
})
