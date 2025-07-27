<?php

class Database {
    private $connection;
    private $host;
    private $dbname;
    private $username;
    private $password;
    private $port;

    public function __construct() {
        // Parse Neon connection string from environment
        $databaseUrl = $_ENV['DATABASE_URL'] ?? getenv('DATABASE_URL');
        
        if ($databaseUrl) {
            $this->parseConnectionString($databaseUrl);
        } else {
            // Fallback to individual environment variables
            $this->host = $_ENV['DB_HOST'] ?? getenv('DB_HOST') ?? 'localhost';
            $this->dbname = $_ENV['DB_NAME'] ?? getenv('DB_NAME') ?? 'ease_invoice';
            $this->username = $_ENV['DB_USER'] ?? getenv('DB_USER') ?? 'postgres';
            $this->password = $_ENV['DB_PASSWORD'] ?? getenv('DB_PASSWORD') ?? '';
            $this->port = $_ENV['DB_PORT'] ?? getenv('DB_PORT') ?? '5432';
        }
    }

    private function parseConnectionString($url) {
        $parsed = parse_url($url);
        $this->host = $parsed['host'];
        $this->port = $parsed['port'] ?? 5432;
        $this->dbname = ltrim($parsed['path'], '/');
        $this->username = $parsed['user'];
        $this->password = $parsed['pass'];
    }

    public function connect() {
        try {
            $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname};sslmode=require";
            
            $this->connection = new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            
            return $this->connection;
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        if (!$this->connection) {
            $this->connect();
        }
        return $this->connection;
    }

    public function testConnection() {
        try {
            $pdo = $this->connect();
            $stmt = $pdo->query("SELECT version()");
            $version = $stmt->fetchColumn();
            return [
                'status' => 'success',
                'message' => 'Connected to PostgreSQL',
                'version' => $version
            ];
        } catch (Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}