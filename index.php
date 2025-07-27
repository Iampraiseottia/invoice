<?php
// Load Composer autoloader
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}

// Load configuration
require_once __DIR__ . '/php/database.php';

// Start session
session_start();

// Basic routing
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

try {
    // Test database connection
    $db = new Database();
    $connectionTest = $db->testConnection();
    
    if ($connectionTest['status'] === 'error') {
        throw new Exception('Database connection failed: ' . $connectionTest['message']);
    }
    
    // Route handling
    switch ($path) {
        case '/':
        case '/index':
            include __DIR__ . '/index.html';
            break;
        case '/login':
            include __DIR__ . '/html/login.html';
            break;
        case '/register':
            include __DIR__ . '/html/register.html';
            break;
        case '/invoice':
            include __DIR__ . '/html/invoice.html';
            break;
        case '/api/test-db':
            header('Content-Type: application/json');
            echo json_encode($connectionTest);
            break;
        default:
            // Serve static files
            $file = __DIR__ . $path;
            if (file_exists($file) && !is_dir($file)) {
                $ext = pathinfo($file, PATHINFO_EXTENSION);
                $mimeTypes = [
                    'css' => 'text/css',
                    'js' => 'application/javascript',
                    'png' => 'image/png',
                    'jpg' => 'image/jpeg',
                    'gif' => 'image/gif',
                    'svg' => 'image/svg+xml'
                ];
                
                if (isset($mimeTypes[$ext])) {
                    header('Content-Type: ' . $mimeTypes[$ext]);
                }
                readfile($file);
            } else {
                http_response_code(404);
                echo "404 - Page not found";
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}