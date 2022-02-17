import ssl
import http.server


ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)

ssl_context.load_cert_chain('cert.pem', 'key.pem')

server = http.server.HTTPServer(('localhost', 8000),
                                http.server.SimpleHTTPRequestHandler)

ssl_socket = ssl_context.wrap_socket(server.socket)

server.socket = ssl_socket

server.serve_forever()
