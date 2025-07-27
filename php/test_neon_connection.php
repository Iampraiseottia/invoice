<?php
require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        echo "✅ Successfully connected to Neon PostgreSQL!<br>";
        
        // Test query
        $stmt = $db->query("SELECT version()");
        $version = $stmt->fetchColumn();
        echo "PostgreSQL Version: " . $version;
    } else {
        echo "❌ Failed to connect to database";
    }
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
