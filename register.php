<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="register.css">
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    <link rel="icon" href="img/ottiatech.png">
    <style>
        body{
            display: flex;
            margin-top: 33px;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: fit-content;
            background: url(img/register.png) no-repeat;
            background-size: cover;
            background-position: center;
        }

        
    </style>
</head>
<body>
    <div class="container">
        <div class=" box form-box">

            <!----php code-->
            <?php
            include("config.php");
            if(isset($_POST['submit'])){
                $full_name = $_POST['full_name'];
                $lname = $_POST['lname'];
                $psuedo = $_POST['psuedo'];
                $password = $_POST['password'];


    mysqli_query($con,"INSERT INTO user(full_name,lname,psuedo,Password) VALUES('$full_name','$lname','$psuedo','$password')") or die("Erro occureded");
    echo "<div class='message'><p> Registration successfully!</p></div><br>";
    echo "<a href='index.php'><button class='btn'>Login Now</button></a>";
            }
 else{
     ?>
            <h1>Sign Up</h1>
            <form method="post">
               <div class="field input">
                <label for="username"><span>Full Name</span></label><br>
                <input type="text" name="full_name" id="username" autocomplete="off"  required>
               </div>
               <div class="field input">
                <label for="email"><span>lname</span></label><br>
                <input type="text" name="lname" id="email" autocomplete="off"  required>
               </div>
               <div class="field input">
                <label for="age"><span>psuedo</span></label><br>
                <input type="number" name="psuedo" id="age" autocomplete="off" required>
               </div>
               <div class="field input">
                <label for="password"><span>Password</span></label><br>
                <input type="password" name="password" id="password" autocomplete="off" required>
                
               </div>
               <div class="field">
                <input type="submit" class="btn" name="submit" value="login" required>
               </div> 
               <div class="links">
                Aready a memeber? <a href="./index.php">sign_in</a>
               </div>
            </form>
        </div>
        <?php
        }
        ?>
    </div>
</body>
</html>