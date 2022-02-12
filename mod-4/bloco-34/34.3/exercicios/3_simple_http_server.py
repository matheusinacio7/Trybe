from http.server import BaseHTTPRequestHandler, HTTPServer
import logging

logging.basicConfig(level=logging.INFO)


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        logging.info(f'\
                     \nGET request\
                     \nPath: {str(self.path)}\
                     \nHeaders:{str(self.headers)}')
        self.send_response(200)
        self.end_headers()


server = HTTPServer(('localhost', 8000), Handler)

server.serve_forever()
