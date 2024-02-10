<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./stylesheet.css">
    <title>login </title>
</head>
<body>
    <div class="container">
        <div class=" box form-box">

       <?php
    session_start();

    include("config.php");

    if(isset($_POST['submit'])){
        $fname = mysqli_real_escape_string($con, $_POST['fname']);
        $password = mysqli_real_escape_string($con, $_POST['password']);
    
        $result = mysqli_query($con, "SELECT * FROM user WHERE fname = '$fname' AND passWord = '$password'") or die("Select Error");
        $row = mysqli_fetch_assoc($result);
            
       if(is_array($row) && !empty($row)){
          $_SESSION['valid'] = $row['Email'];
         $_SESSION['username'] = $row['Username'];
        } else{
          echo "<div class='message'><p>Wrong Username or Password!</p></div><br>";
           echo "<a href='index.php'><button class='btn'>Go Back</button></a>";
      }
    }

    if(isset($_SESSION['valid'])){
        header("Location: message.php");
        exit(); 
   } else{
   
?>

            <header>Login</header>
            <form action="" method="post">
               <div class="field input">
                <label for="username"><span>fname</span></label><br>
                <input type="text" name="fname" id="username" required>
               </div>
               <div class="field input">
                <label for="password"><span>Password</span></label><br>
                <input type="password" name="password" id="password" required>
                
               </div>
               <div class="field">
                <input type="submit" class="btn" name="submit" value="login" required>
               </div> 
               <div class="links">
                Don't have account? <a href="./sign_up.php">sign_up Now</a>
               </div>
            </form>
        </div>
        <?php
             }
        ?>
    </div>    
</body>
</html>