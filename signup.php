      <style>
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
      
      <!----php code-->
      <?php
            include("config.php");
            if(isset($_POST['submit'])){
                $full_name = $_POST['full_name'];
                $email = $_POST['email'];
                $phone_number = $_POST['phone_number'];
                $Country = $_POST['Country'];
                $password = $_POST['password'];
                $confirm_password = $_POST['confirm_password'];

    mysqli_query($con,"INSERT INTO user(full_name,email,phone_number,Country,Password,confirm_password) VALUES('$full_name','$email','$phone_number','$Country','$password','$confirm_password')") or die("Erro occureded");
    echo "<div class='message'><p> Registration successfully!. Welcome to <span>EASE INVOICE</span></p></div><br>";
    echo "<a href='invoice.html'><button class='btn full'>Continue...</button></a>";
            }
 else{
   
        }
        ?>