from socketserver import BaseRequestHandler, UDPServer


class UDPEchoChamber(BaseRequestHandler):
    def handle(self):
        data = self.request[0].strip().decode()
        socket = self.request[1]
        socket.sendto(b'echo\n', self.client_address)
        client = self.client_address[0]
        message = f'{client} : {data}\n'
        socket.sendto(message.encode(), self.client_address)


if __name__ == '__main__':
    HOST = '0.0.0.0'
    PORT = 8080

    with UDPServer((HOST, PORT), UDPEchoChamber) as server:
        server.serve_forever()
