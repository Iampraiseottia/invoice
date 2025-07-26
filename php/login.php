<?php
session_start();
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
    
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        throw new Exception('Please fill all fields');
    }
    
    // Get user by email
    $query = "SELECT id, full_name, email, phone_number, country, password_hash 
              FROM users WHERE email = :email";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        throw new Exception('Invalid credentials');
    }
    
    $user = $stmt->fetch();
    
    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        throw new Exception('Invalid credentials');
    }
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['full_name'];
    $_SESSION['user_email'] = $user['email'];
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'name' => $user['full_name'],
            'email' => $user['email'],
            'phone' => $user['phone_number'],
            'country' => $user['country']
        ],
        'redirect' => '../html/invoice.html'
    ]);
    
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
      </style>
       <?php
    // session_start();

    // include("config.php");

    // if(isset($_POST['submit'])){
    //     $full_name = mysqli_real_escape_string($con, $_POST['full_name']);
    //     $password = mysqli_real_escape_string($con, $_POST['password']);
    //     $email = mysqli_real_escape_string($con, $_POST['email']);

    //     $result = mysqli_query($con, "SELECT * FROM user WHERE full_name = '$full_name' AND email = '$email' AND password = '$password'") or die("Select Error");
    //     $row = mysqli_fetch_assoc($result);
            
    //    if(is_array($row) && !empty($row)){
    //       $_SESSION['valid'] = $row['password'];
    //      $_SESSION['full_name'] = $row['full_name'];
    //      $_SESSION['email'] = $row['email'];

    //      echo "<div class='message'><p><b>Welcome!!!. <span>Sucessful Login</span></b></p></div><br>";
    //      echo "<a href='../html/invoice.html'><button class='btn full'>Proceed...</button></a>";


    //     } else{
    //       echo "<div class='message'><p><b>Wrong Full Name OR Email Address OR Password!!!</b></p></div><br>";
    //        echo "<a href='../html/login.html'><button class='btn full'>Try Again!!!</button></a>";
    //   }
    // }

        ?> -->
