async function resolv(r) {
    try {
        const reply = await ngx.fetch('http://127.0.0.1:8090/api/7/http/requests');
        const body = await reply.json();

        if (parseInt(body.current) > 145) {
            r.headersOut['upstream'] = "httpbin_server/delay/3";
        } else {
            r.headersOut['upstream'] = "juice_server";
        }
        r.return(200);
    } catch (e) {
        r.return(500, "resolv: " + e);
    }
}

export default {resolv};
