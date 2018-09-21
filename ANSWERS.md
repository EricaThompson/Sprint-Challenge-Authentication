<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
    For UX, so that users, with authentication can access areas and be able to access multiple areas through authorization. 

2. What does bcrypt do to help us store passwords in a secure manner.
    bcrypt hashes the string to aid in security for the site and users.

3. What does bcrypt do to slow down attackers?
    It slows down the hashing, instead of speeding it up which would benefit them. 

4. What are the three parts of the JSON Web Token?
    - Header contains the algorithm used as well as the type
    - Payload usually contains the user id, unique name and date of issue
    - Signature contains a string with the header + payload base64 encoded.
