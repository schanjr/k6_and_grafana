# or use this https://gist.github.com/tedmiston/5935757

require 'socket'

class LocalServer
  @servers ||= {}
  @mock_responses ||= {}
  @response_probabilities = {
    0.05 => 'internal_error',
    0.1 => 'not_found_response'
  }

  class << self
    def default_response
      <<-HEREDOC
HTTP/1.1 200 OK
Content-Type: application/json

{"message":"default good response"}
      HEREDOC
    end

    def not_found_response
      <<-HEREDOC
HTTP/1.1 404 Not Found
Content-Type: application/json

{"message":"not found"}
      HEREDOC
    end

    def internal_error
      <<-HEREDOC
HTTP/1.1 500 Internal Error
Content-Type: application/json

{"message":"internal error"}
      HEREDOC
    end

    def servers
      @servers
    end

    def mocked_responses
      @mock_responses
    end

    def save_mock(verb, path, response)
      @mock_responses["#{verb}-#{path}"] = response
    end

    def response
      curr_decimal = rand
      @response_probabilities.keys.each do |k|
        if curr_decimal < (1-k)
          return  send(@response_probabilities[k].to_sym)
        end
      end
      # probability was never lower than the assigned, so return 200 by default
      default_response
    end

    def start_server(port = 31000)
      return servers unless port_open?(port)
      server = TCPServer.open(port)
      loop do
        socket = server.accept

        verb, path, _http_version = socket.gets&.split(' ') || nil
        next if verb.nil?
        puts "Received verb: #{verb} path: #{path} http_version: #{_http_version}"
        while (request = socket.gets) && (request.chomp.length > 0)
          puts "Incoming request headers -- \"#{request.chomp}\"" # the server logs each response
        end
        if @mock_responses["#{verb}-#{path}"].nil?
          socket.write(response)
        else
          socket.write(@mock_responses["#{verb}-#{path}"])
        end
        socket.close
      end
    end

    def port_open?(port)
      begin
        TCPServer.open(port) do |client|
          client.close
        end
        return true
      rescue Errno::EADDRINUSE => e
        return false
      rescue Errno::ECONNREFUSED => e # Port is already taken by something else
        return false
      rescue IOError => e # Nothing being served at this port
        return true
      end
    end

    def stop_servers
      @servers.values.each(&:kill) if @servers
      @servers.clear
    end
  end
end

LocalServer.start_server
