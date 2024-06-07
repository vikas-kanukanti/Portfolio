<?php
  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'vikaskanukanti@example.com';

  // Check if the PHP Email Form library exists
  if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
  } else {
    die('Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  
  // Indicate that this is an AJAX request
  $contact->ajax = true;
  
  // Set the receiving email address
  $contact->to = $receiving_email_address;
  
  // Collect form data: name, email, and subject from the POST request
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment and configure this section if you want to use SMTP for sending emails
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  // Add form data to the email message
  $contact->add_message($_POST['name'], 'From');
  $contact->add_message($_POST['email'], 'Email');
  $contact->add_message($_POST['message'], 'Message', 10);

  // Send the email and output the result
  echo $contact->send();
?>
