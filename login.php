       
       <?php
    session_start();

    include("config.php");

    if(isset($_POST['submit'])){
        $full_name = mysqli_real_escape_string($con, $_POST['full_name']);
        $password = mysqli_real_escape_string($con, $_POST['password']);
        $email = mysqli_real_escape_string($con, $_POST['email']);

        $result = mysqli_query($con, "SELECT * FROM user WHERE full_name = '$full_name' AND email = '$email' AND password = '$password'") or die("Select Error");
        $row = mysqli_fetch_assoc($result);
            
       if(is_array($row) && !empty($row)){
          $_SESSION['valid'] = $row['password'];
         $_SESSION['full_name'] = $row['full_name'];
         $_SESSION['email'] = $row['email'];

        } else{
          echo "<div class='message'><p><b>Wrong Full Name OR Email Address OR Password!!!</b></p></div><br>";
           echo "<a href='login.html'><button class='btn'>Try Again!!!</button></a>";
      }
    }

    if(isset($_SESSION['valid'])){
        header("Location: invoice.html");
        exit(); 
   } else{

             }
        ?>
