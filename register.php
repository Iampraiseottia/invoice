<?php
// Assuming you have already established a database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = $_POST['title'];
    $email = $_POST['email'];
    $phoneNumber = $_POST['phone'];
    $country = $_POST['Country'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    // Validate the form data (you can add further validation as needed)
    $errors = [];

    if (empty($fullName)) {
        $errors[] = "Full Name is required.";
    }

    if (empty($email)) {
        $errors[] = "Email Address is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid Email Address.";
    }

    if (empty($phoneNumber)) {
        $errors[] = "Phone Number is required.";
    }

    if (empty($country)) {
        $errors[] = "Country is required.";
    }

    if (empty($password)) {
        $errors[] = "Password is required.";
    }

    if (empty($confirmPassword)) {
        $errors[] = "Confirm Password is required.";
    } elseif ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }

    // If there are no errors, insert the data into the database
    if (empty($errors)) {
        // Perform any necessary data sanitization or encryption before storing in the database

        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO users (full_name, email, phone_number, country, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $fullName, $email, $phoneNumber, $country, $password);

        // Execute the statement
        if ($stmt->execute()) {
            // Data inserted successfully
            echo "Registration successful. Redirecting to invoice page...";
            header("Location: invoice.html");
            exit();
        } else {
            // Failed to insert the data
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        // Display the validation errors
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }
}
?>