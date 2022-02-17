from socketserver import BaseRequestHandler, TCPServer


class TCPEchoChamber(BaseRequestHandler):
    def handle(self):
        self.request.sendall(b'echo\n')
        client = self.client_address[0]
        received_message = self.request.recv(1024).strip().decode()
        response = f'{client} : {received_message}\n'
        self.request.send(response.encode())


if __name__ == '__main__':
    HOST = 'localhost'
    PORT = 8080

    with TCPServer((HOST, PORT), TCPEchoChamber) as server:
        server.serve_forever()
