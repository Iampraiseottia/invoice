<?php
require_once '../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $full_name = trim($_POST['full_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone_number = trim($_POST['phone_number'] ?? '');
    $country = trim($_POST['Country'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    
    // Validation
    if (empty($full_name) || empty($email) || empty($password)) {
        throw new Exception('Please fill all required fields');
    }
    
    if ($password !== $confirm_password) {
        throw new Exception('Passwords do not match');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Check if email already exists
    $check_query = "SELECT id FROM users WHERE email = :email";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(':email', $email);
    $check_stmt->execute();
    
    if ($check_stmt->rowCount() > 0) {
        throw new Exception('Email already registered');
    }
    
    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user
    $query = "INSERT INTO users (full_name, email, phone_number, country, password_hash) 
              VALUES (:full_name, :email, :phone_number, :country, :password_hash)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':full_name', $full_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone_number', $phone_number);
    $stmt->bindParam(':country', $country);
    $stmt->bindParam(':password_hash', $password_hash);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful',
            'redirect' => '../html/login.html'
        ]);
    } else {
        throw new Exception('Registration failed');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
?>




































<!-- <style>
        *{
            background: lightblue;
            text-align: center;
        }

        .message{
            margin-top: 200px;
            font-size: 35px;
            color: white;
        }

        .full{
            height: 50px;
            width: 150px;
            background: white;
            color: blue;
            border: 1px solid blue;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
        }

        span{
            color: blue;
        }
      </style> -->
      
      <!----php code-->
      <!-- <?php
//             include("config.php");
//             if(isset($_POST['submit'])) {
//                 $full_name = $_POST['full_name'];
//                 $email = $_POST['email'];
//                 $phone_number = $_POST['phone_number'];
//                 $Country = $_POST['Country'];
//                 $password = $_POST['password'];
//                 $confirm_password = $_POST['confirm_password'];

//     mysqli_query($con,"INSERT INTO user(full_name,email,phone_number,Country,Password,confirm_password) VALUES('$full_name','$email','$phone_number','$Country','$password','$confirm_password')") or die("Erro occureded");
//     echo "<div class='message'><p> Registration successfully!. Welcome to <span>EASE INVOICE</span></p></div><br>";
//     echo "<a href='../html/invoice.html'><button class='btn full'>Continue...</button></a>";
//             }
//  else{
   
//         }
        ?> -->