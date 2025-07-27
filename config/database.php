<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct() {
        // Load .env file
        if (file_exists(__DIR__ . '/../.env')) {
            $lines = file(__DIR__ . '/../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                    list($key, $value) = explode('=', $line, 2);
                    $_ENV[trim($key)] = trim($value);
                }
            }
        }
        
        // Parse Neon connection string from environment
        $database_url = $_ENV['DATABASE_URL'] ?? getenv('DATABASE_URL');
        
        if ($database_url) {
            $parsed = parse_url($database_url);
            $this->host = $parsed['host'];
            $this->port = $parsed['port'] ?? 5432;
            $this->db_name = ltrim($parsed['path'], '/');
            $this->username = $parsed['user'];
            $this->password = $parsed['pass'];
        } else {
            // Fallback for local development
            $this->host = "localhost";
            $this->port = 5432;
            $this->db_name = "easeinvoice";
            $this->username = "postgres";
            $this->password = "password";
        }
    }

    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "pgsql:host=" . $this->host . 
                   ";port=" . $this->port . 
                   ";dbname=" . $this->db_name;
            
            // Add SSL mode for Neon
            if (strpos($this->host, 'neon.tech') !== false) {
                $dsn .= ";sslmode=require";
            }
            
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            echo "Connection error: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
}
?>