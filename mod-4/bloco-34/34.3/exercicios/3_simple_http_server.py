from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        print('idk')
        print(f'GET request\
                     \nPath: {str(self.path)}\
                     \nHeaders:{str(self.headers)}')
        self.send_response(200)
        self.end_headers()


server = HTTPServer(('localhost', 8000), Handler)

server.serve_forever()
