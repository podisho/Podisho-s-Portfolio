<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields and remove whitespace
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Validate the fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo 'Please fill all the fields.';
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email format';
        exit;
    }

    // Prepare the email
    $to = 'podisho346@gmail.com'; // Your receiving email address
    $email_subject = "New contact form submission: $subject";
    $email_body = "You have received a new message from $name.\n\n".
                  "Email: $email\n\n".
                  "Message:\n$message";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo 'Your message has been sent. Thank you!';
    } else {
        echo 'Sorry, there was an error sending your message. Please try again later.';
    }
}
?>

